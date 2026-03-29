from fastapi import FastAPI
from fastapi import Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import os
import requests
import time
from collections import defaultdict, deque

# Load environment variables
load_dotenv()

app = FastAPI()

allowed_origins_raw = os.getenv("ALLOWED_ORIGINS", "http://localhost:5173,http://127.0.0.1:5173")
ALLOWED_ORIGINS = [origin.strip() for origin in allowed_origins_raw.split(",") if origin.strip()]

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Get API key
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY not found in .env file")

# Gemini API endpoint (2.5-flash is available for new users)
GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent"

# Runtime protection knobs for public hosting.
RATE_LIMIT_WINDOW_SECONDS = int(os.getenv("RATE_LIMIT_WINDOW_SECONDS", "60"))
RATE_LIMIT_MAX_REQUESTS = int(os.getenv("RATE_LIMIT_MAX_REQUESTS", "20"))
CACHE_TTL_SECONDS = int(os.getenv("CACHE_TTL_SECONDS", "300"))

# In-memory stores.
request_times_by_ip = defaultdict(deque)
response_cache = {}
metrics = {
    "total_requests": 0,
    "gemini_responses": 0,
    "fallback_responses": 0,
    "rate_limited_requests": 0,
    "cache_hits": 0,
}

# Portfolio context for the AI
PORTFOLIO_CONTEXT = """You are an AI assistant for Thanu's developer portfolio.

CRITICAL FACT:
- UCSC here means University of Colombo School of Computing, Sri Lanka.
- Never expand UCSC as University of California, Santa Cruz.

ABOUT THANU:
- Bachelor of Science in Software Engineering student (3rd year, ongoing) at University of Colombo School of Computing (UCSC), Sri Lanka
- Full-stack developer with focus on backend systems, scalable architectures, and AI integration
- GPA: 3.55/4.0
- A/L Results: 2AB (Physical Science Stream)
- O/L Results: 9A's (including English Literature)
- Will graduate in 2027 or 2028

PROJECTS (what Thanu has built):
1. SwiftLogistics Middleware
   - Scalable middleware system using FastAPI, Docker, RabbitMQ, PostgreSQL
   - Integrates multiple logistics systems (CMS, ROS, WMS) with event-driven architecture

2. Caretaker Management System (SmartCare)
   - Full-stack web application for managing caretaker services
   - Tech: PHP, MySQL, JavaScript

3. Mini Compiler
   - Compiler built in C for lexical analysis, parsing, semantic validation

4. Pub/Sub Messaging System
   - Command-line publish-subscribe system using socket programming

5. Ludo Game Simulation
   - Console-based Ludo board game simulation in C

6. 30-Day Web Development Challenge
   - Collection of 30 mini projects

TECHNICAL SKILLS:
  - Languages: C, Python, JavaScript, PHP
  - Frontend: React, Tailwind CSS
  - Backend: FastAPI, PHP
  - Databases: MySQL, PostgreSQL
  - DevOps: Docker, Git, Linux

CONTACT:
  📧 Email: thanu.venu28@gmail.com
  💼 LinkedIn: https://www.linkedin.com/in/thanushya-venugoban/
  🐙 GitHub: https://github.com/Thanu-Venu

Be helpful, clear, and professional in responses."""

class ChatRequest(BaseModel):
    message: str


def get_client_ip(request: Request) -> str:
    forwarded_for = request.headers.get("x-forwarded-for", "")
    if forwarded_for:
        return forwarded_for.split(",")[0].strip()
    return request.client.host if request.client else "unknown"


def is_rate_limited(client_ip: str, now: float) -> bool:
    request_times = request_times_by_ip[client_ip]
    cutoff = now - RATE_LIMIT_WINDOW_SECONDS

    while request_times and request_times[0] < cutoff:
        request_times.popleft()

    if len(request_times) >= RATE_LIMIT_MAX_REQUESTS:
        return True

    request_times.append(now)
    return False


def get_cached_response(cache_key: str, now: float):
    item = response_cache.get(cache_key)
    if not item:
        return None

    if item["expires_at"] <= now:
        del response_cache[cache_key]
        return None

    return item["value"]


def put_cached_response(cache_key: str, value: dict, now: float) -> None:
    response_cache[cache_key] = {
        "value": value,
        "expires_at": now + CACHE_TTL_SECONDS,
    }


def portfolio_fallback(user_message: str) -> str:
    msg = user_message.lower()

    if any(k in msg for k in ["swiftlogistics", "swift logistics", "middleware"]):
        return (
            "SwiftLogistics Middleware is a scalable integration layer Thanu built using "
            "FastAPI, Docker, RabbitMQ, and PostgreSQL. It connects logistics systems such as "
            "CMS, ROS, and WMS using an event-driven approach, with asynchronous processing and "
            "reliable coordination between services."
        )

    if any(k in msg for k in ["smartcare", "caretaker", "caretaker management"]):
        return (
            "SmartCare is a full-stack caretaker management system built with PHP, MySQL, and "
            "JavaScript. It supports role-based authentication, service booking flows, and "
            "management features for caretaker services such as elder care and babysitting."
        )

    if any(k in msg for k in ["mini compiler", "compiler", "lexical", "parsing"]):
        return (
            "Thanu's Mini Compiler project in C covers lexical analysis, parsing, and semantic "
            "validation. It demonstrates core compiler concepts including structured error handling "
            "and recursive-descent style parsing."
        )

    if any(k in msg for k in ["pub/sub", "pubsub", "publish", "subscribe", "socket"]):
        return (
            "The Pub/Sub Messaging System is a command-line project using socket programming with "
            "topic-based message distribution. It supports multiple clients and demonstrates real-time "
            "communication and distributed-system fundamentals."
        )

    if any(k in msg for k in ["ludo", "game simulation", "board game"]):
        return (
            "The Ludo Game Simulation is a console-based C project implementing dice logic, turn "
            "management, movement rules, captures, safe zones, and special cells. It highlights "
            "algorithmic thinking and state-based game design."
        )

    if any(k in msg for k in ["30-day", "30 day", "challenge", "mini projects"]):
        return (
            "Thanu's 30-Day Web Development Challenge is a collection of mini projects focused on "
            "UI design, DOM manipulation, API integration, and responsive layouts, showing consistency "
            "and hands-on frontend practice."
        )

    if any(k in msg for k in ["who is", "about thanu", "introduce"]):
        return (
            "Thanu is a 3rd-year Bachelor of Science in Software Engineering undergraduate at "
            "University of Colombo School of Computing (UCSC), Sri Lanka (GPA 3.55/4.0), and an "
            "aspiring full-stack developer focused on backend systems, scalable architecture, and "
            "AI-driven applications."
        )

    if any(k in msg for k in ["project", "build", "work", "portfolio"]):
        return (
            "Here are Thanu's key projects: SwiftLogistics Middleware (FastAPI, Docker, "
            "RabbitMQ, PostgreSQL), SmartCare Caretaker Management System (PHP, MySQL, JS), "
            "Mini Compiler in C, Pub/Sub Messaging System, Ludo Game Simulation, and a 30-Day "
            "Web Development Challenge."
        )

    if any(k in msg for k in ["skill", "tech", "stack", "language"]):
        return (
            "Thanu's main skills include C, Python, JavaScript, PHP, React, Tailwind CSS, "
            "FastAPI, MySQL, PostgreSQL, Docker, Git, and Linux. She is especially interested "
            "in scalable backend systems and AI integration."
        )

    if any(k in msg for k in ["education", "study", "gpa", "university", "degree"]):
        return (
            "Thanu is a 3rd-year Bachelor of Science in Software Engineering undergraduate at "
            "University of Colombo School of Computing (UCSC), Sri Lanka, with a current GPA of "
            "3.55/4.0, expected to graduate in 2027 or 2028."
        )

    if any(k in msg for k in ["contact", "email", "linkedin", "github", "reach"]):
        return (
            "You can contact Thanu at thanu.venu28@gmail.com, connect on LinkedIn at "
            "linkedin.com/in/thanushya-venugoban, or view projects on GitHub at "
            "github.com/Thanu-Venu."
        )

    return (
        "I can help with Thanu's portfolio details: projects, skills, education, and contact "
        "information. Ask me something like 'What are her main projects?'"
    )


@app.get("/")
def home():
    return {"message": "API running", "status": "Gemini chatbot ready"}


@app.get("/metrics")
def get_metrics():
    return {
        **metrics,
        "cache_size": len(response_cache),
        "rate_limit_window_seconds": RATE_LIMIT_WINDOW_SECONDS,
        "rate_limit_max_requests": RATE_LIMIT_MAX_REQUESTS,
        "cache_ttl_seconds": CACHE_TTL_SECONDS,
    }

@app.post("/chat")
async def chat(req: ChatRequest, request: Request):
    try:
        metrics["total_requests"] += 1
        user_message = req.message.strip()
        if not user_message:
            return {"reply": "Please enter a message so I can help you."}

        now = time.time()
        client_ip = get_client_ip(request)

        if is_rate_limited(client_ip, now):
            metrics["rate_limited_requests"] += 1
            metrics["fallback_responses"] += 1
            return {
                "reply": "Too many requests in a short time. " + portfolio_fallback(user_message),
                "source": "local_fallback",
                "reason": "local_rate_limited"
            }

        cache_key = user_message.lower()[:600]
        cached = get_cached_response(cache_key, now)
        if cached:
            metrics["cache_hits"] += 1
            return {**cached, "reason": "cache_hit"}

        # Prepare the prompt
        full_prompt = f"""{PORTFOLIO_CONTEXT}

User Question: {user_message[:600]}

Respond helpfully."""

        # Make request to Gemini API
        payload = {
            "contents": [
                {
                    "parts": [
                        {"text": full_prompt}
                    ]
                }
            ]
        }

        headers = {"Content-Type": "application/json"}
        params = {"key": GEMINI_API_KEY}

        response = requests.post(
            GEMINI_API_URL,
            json=payload,
            headers=headers,
            params=params,
            timeout=20
        )

        if response.status_code == 200:
            data = response.json()
            reply = data.get("candidates", [{}])[0].get("content", {}).get("parts", [{}])[0].get("text", "No response")
            result = {
                "reply": reply,
                "source": "gemini"
            }
            put_cached_response(cache_key, result, now)
            metrics["gemini_responses"] += 1
            return result
        elif response.status_code == 429:
            # Quota/rate-limit fallback so UI keeps working.
            print(f"Gemini 429 (quota/rate limited): {response.text}")
            metrics["fallback_responses"] += 1
            return {
                "reply": portfolio_fallback(user_message),
                "source": "local_fallback",
                "reason": "rate_limited"
            }
        else:
            print(f"API Error: {response.status_code} - {response.text}")
            metrics["fallback_responses"] += 1
            return {
                "reply": portfolio_fallback(user_message),
                "source": "local_fallback",
                "reason": f"gemini_status_{response.status_code}"
            }

    except Exception as e:
        print(f"Error: {str(e)}")
        metrics["fallback_responses"] += 1
        return {
            "reply": "Something went wrong 😢 " + portfolio_fallback(req.message),
            "source": "local_fallback",
            "reason": "exception"
        }
