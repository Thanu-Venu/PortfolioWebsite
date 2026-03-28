"""
chatbot.py — Keyword-based chatbot response logic.

This module handles the chatbot response generation.
It uses simple keyword matching to provide relevant, human-like answers
about the portfolio owner's skills, projects, and experience.
No external AI APIs required.
"""

# Predefined keyword-to-response mapping
RESPONSES = {
    "about": (
        "I'm Thanu Venu, a full-stack developer passionate about building modern web apps "
        "and integrating AI into real-world products. I love clean code, good design, and "
        "solving challenging problems."
    ),
    "skill": (
        "My core skills include React, Next.js, Tailwind CSS on the frontend, "
        "and FastAPI, Node.js, Python on the backend. I also work with PostgreSQL, MongoDB, "
        "Docker, and Git. Always learning something new!"
    ),
    "tech": (
        "My tech stack includes React (Vite), Tailwind CSS, TypeScript, FastAPI, Python, "
        "Node.js, PostgreSQL, and MongoDB. I enjoy picking the right tool for the job."
    ),
    "project": (
        "I've built several projects including an AI-powered portfolio chatbot, a full-stack "
        "task management app, an e-commerce platform, and a weather forecast app. "
        "Check out the Projects section for details and source code links!"
    ),
    "experience": (
        "I have 2+ years of experience building full-stack web applications. "
        "I've worked on personal projects, freelance work, and open-source contributions."
    ),
    "education": (
        "I'm pursuing a B.Tech in Computer Science. My coursework covers Data Structures, "
        "Algorithms, Web Development, and Machine Learning."
    ),
    "contact": (
        "You can reach me via the Contact section on this page, or email me directly at "
        "hello@example.com. I'm always open to exciting opportunities and collaborations!"
    ),
    "hire": (
        "I'm open to full-time roles, freelance projects, and collaborations. "
        "Feel free to reach out through the Contact section — let's build something great together!"
    ),
    "hello": "Hey there! 👋 How can I help you today? Ask me about skills, projects, or experience.",
    "hi": "Hi! 👋 I'm Thanu's AI assistant. Ask me about skills, projects, or how to get in touch.",
    "help": (
        "I can answer questions about Thanu's skills, projects, experience, education, and "
        "how to get in touch. Try asking: 'What are your skills?' or 'Tell me about your projects'."
    ),
}

# Default fallback response
DEFAULT_RESPONSE = (
    "That's a great question! I'm not sure about that specific topic. "
    "You can ask me about skills, projects, experience, education, or how to contact Thanu."
)


def get_response(message: str) -> str:
    """
    Generate a chatbot response for the given user message.

    Args:
        message: The raw user input string.

    Returns:
        A relevant, human-friendly response string.
    """
    # Normalize to lowercase for matching
    lower_msg = message.lower().strip()

    # Check for keyword matches (order matters — more specific first)
    for keyword, response in RESPONSES.items():
        if keyword in lower_msg:
            return response

    return DEFAULT_RESPONSE
