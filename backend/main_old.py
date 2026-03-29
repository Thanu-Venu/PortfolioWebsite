
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import google.generativeai as genai
from dotenv import load_dotenv
import os

import google.genai as genai
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure Gemini API
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY not found in .env file")

genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel("models/gemini-1.5-flash")

# Portfolio context for the AI
PORTFOLIO_CONTEXT = """You are an AI assistant for Thanu's developer portfolio.

ABOUT THANU:
- Software Engineering student (3rd year, ongoing degree from UCSC)
- Full-stack developer with focus on backend systems, scalable architectures, and AI integration
- GPA: 3.55/4.0
- A/L Results: 2AB (Physical Science Stream)
- O/L Results: 9A's (including English Literature)
- Will graduate in 2027 or 2028

PROJECTS (what Thanu has built):
1. SwiftLogistics Middleware
   - Scalable middleware system using FastAPI, Docker, RabbitMQ, PostgreSQL
   - Integrates multiple logistics systems (CMS, ROS, WMS) with event-driven architecture
   - Features: async processing, retry mechanisms, system coordination
   - Tech: FastAPI, Docker, RabbitMQ, PostgreSQL

2. Caretaker Management System (SmartCare)
   - Full-stack web application for managing caretaker services (elder care, babysitting, household support)
   - Features: role-based authentication, service booking, management dashboard
   - Tech: PHP, MySQL, JavaScript

3. Mini Compiler
   - Compiler built in C for lexical analysis, parsing, semantic validation
   - Implements recursive descent parsing and structured error handling
   - Demonstrates core compiler design concepts

4. Pub/Sub Messaging System
   - Command-line publish-subscribe system using socket programming
   - Supports multiple clients and topic-based message distribution
   - Real-time communication and distributed systems

5. Ludo Game Simulation
   - Console-based Ludo board game simulation in C
   - Implements dice rolling, player turns, movement logic, capturing, safe zones, mystery cells
   - Game logic, data structures, and simulation techniques

6. 30-Day Web Development Challenge
   - Collection of 30 mini projects covering UI design, DOM manipulation, API integration, responsive layouts
   - Demonstrates consistent practice in web development

TECHNICAL SKILLS:
Programming Languages:
  - C (Compiler, Ludo, system logic)
  - Python (FastAPI, AI integration)
  - JavaScript (Frontend, DOM manipulation)
  - PHP (Full-stack development)

Frontend:
  - React (main UI framework)
  - Tailwind CSS (premium UI styling)
  - HTML/CSS

Backend:
  - FastAPI (APIs, AI backend)
  - PHP (web applications)

Databases:
  - MySQL (web applications)
  - PostgreSQL (middleware systems)

DevOps & Tools:
  - Docker (containerization)
  - Git & GitHub (version control)
  - Linux/WSL (development environment)

ADVANCED SKILLS (What makes Thanu different):
  ✨ System Design: Middleware architecture, Pub/Sub communication
  ✨ Low-Level Programming: Compiler design, game simulation
  ✨ AI Integration: FastAPI + Gemini, prompt engineering
  ✨ Full-Stack Development: End-to-end applications with deployment
  ✨ DevOps: Docker, containerization, production-ready systems

INTERESTS & PASSION:
- Full-stack software development with focus on backend systems
- Scalable architectures and DevOps practices
- AI-driven applications and ML integration
- System design and distributed systems
- Building reliable, production-ready solutions
- Writing clean, maintainable code
- Efficient, resilient, user-focused systems

CERTIFICATIONS:
  ✓ Python for Beginners (UCSC)
  ✓ Web Design for Beginners (UCSC)
  ✓ Gemini Certified Student (Google)
  ✓ HackerRank Certifications (CSS, SQL, Software Engineer Intern)

CONTACT:
  📧 Email: thanu.venu28@gmail.com
  💼 LinkedIn: https://www.linkedin.com/in/thanushya-venugoban/
  🐙 GitHub: https://github.com/Thanu-Venu

INSTRUCTIONS FOR AI:
- Answer ONLY based on this information about Thanu
- Be clear, concise, and professional
- Highlight Thanu's strengths in system design, AI integration, and full-stack development
- When asked unrelated questions, politely guide back to Thanu's portfolio
- Be enthusiastic about Thanu's projects and expertise
- If someone asks for contact, provide email, LinkedIn, and GitHub
- Be friendly and engaging while maintaining professionalism"""

class ChatRequest(BaseModel):
    message: str

@app.get("/")
def home():
    return {"message": "API running", "status": "Gemini chatbot ready"}

@app.post("/chat")
async def chat(req: ChatRequest):
    try:
        # Prepare the prompt with context
        full_prompt = f"""{PORTFOLIO_CONTEXT}

User Question: {req.message}

Respond in a helpful, engaging manner that's appropriate for a portfolio assistant."""
        
        # Generate response using Gemini
        response = model.generate_content(full_prompt)
        reply = response.text if response.text else "I couldn't generate a response. Please try again."
        
        return {"reply": reply}
    
    except Exception as e:
        error_msg = str(e)
        print(f"❌ Error in /chat endpoint: {error_msg}")
        print(f"Error type: {type(e).__name__}")
        
        # Provide more specific error messages for debugging
        if "API_KEY" in error_msg or "authenticate" in error_msg.lower():
            error_response = "API Key issue. Please check your .env file has a valid GEMINI_API_KEY"
        elif "rate" in error_msg.lower():
            error_response = "Gemini API rate limit reached. Please try again in a moment."
        elif "quota" in error_msg.lower():
            error_response = "Gemini API quota exceeded. Please check your account."
        else:
            error_response = f"Error: {error_msg}"
        
        print(f"Response to client: {error_response}")
        
        return {"reply": error_response}

