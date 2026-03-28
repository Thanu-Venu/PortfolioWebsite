# PortfolioWebsite

A modern, responsive, AI-powered developer portfolio built with **React (Vite)** + **Tailwind CSS** (frontend) and **FastAPI** (backend).

## Features

- **Clean black-and-white UI** — minimal, professional design
- **Fully responsive** — works on mobile and desktop
- **Sections**: Navbar · Hero · About · Projects · Tech Stack · Education · Certificates · Contact
- **Floating AI Chatbot** — keyword-based assistant that answers questions about skills, projects, and experience
- **FastAPI backend** — simple REST API with `/chat` endpoint

---

## Project Structure

```
PortfolioWebsite/
├── frontend/          # React + Vite + Tailwind CSS
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── TechStack.jsx
│   │   │   ├── Education.jsx
│   │   │   ├── Certificates.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── Chatbot.jsx
│   │   │   └── Footer.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── backend/           # FastAPI chatbot API
    ├── main.py        # API routes (GET /, POST /chat)
    ├── chatbot.py     # Keyword-based response logic
    └── requirements.txt
```

---

## Getting Started

### Frontend

```bash
cd frontend
npm install
npm run dev        # Development server at http://localhost:5173
npm run build      # Production build
```

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

The Vite dev server proxies `/api/*` requests to `http://localhost:8000`, so the chatbot works seamlessly in development.

---

## Chatbot API

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/`      | GET    | Health check |
| `/chat`  | POST   | Send a message, get a response |

**Example request:**
```json
POST /chat
{ "message": "Tell me about your projects" }
```

**Example response:**
```json
{ "response": "I've built several projects including..." }
```
