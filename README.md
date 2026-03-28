# 🤖 AI-Powered Developer Portfolio

A modern, responsive, and interactive developer portfolio designed to showcase my skills, projects, and technical journey in a unique and engaging way. Unlike traditional portfolio websites, this platform integrates a custom-built AI chatbot that allows visitors to interactively learn more about me, my work, and my experience.

The portfolio features a clean black-and-white premium design, optimized for both desktop and mobile devices, ensuring a seamless user experience across all platforms.

---

## 🚀 Features

* 🎨 Clean black-and-white premium UI
* 📱 Fully responsive (mobile + desktop)
* 🤖 Interactive AI chatbot
* 🧑‍💻 Project showcase with details
* 🛠️ Tech stack display
* 🎓 Education section
* 📜 Certificates section
* 📄 Downloadable CV
* ⚡ Fast and lightweight performance

---

## 🧱 Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS
* Framer Motion (optional)

### Backend

* FastAPI
* Uvicorn

### Others

* GitHub (version control)
* Vercel (frontend deployment)
* Render (backend deployment)

---

## 📁 Project Structure

```
ai-portfolio/
│
├── frontend/        # React + Tailwind
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Chatbot.jsx
│   │   │   ├── ProjectCard.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│
├── backend/         # FastAPI
│   ├── main.py
│   ├── chatbot.py
│   └── data.json
│
└── README.md
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository

```
git clone https://github.com/your-username/ai-portfolio.git
cd ai-portfolio
```

### 2️⃣ Frontend Setup

```
cd frontend
npm install
npm run dev
```

### 3️⃣ Backend Setup

```
cd backend
python -m venv venv
venv\Scripts\activate   # Windows
pip install fastapi uvicorn
uvicorn main:app --reload
```

---

## 🔗 API Endpoints

### GET /

Test route to check if backend is running

### POST /chat

Request:

```
{
  "message": "Tell me about you"
}
```

Response:

```
{
  "reply": "I am a software engineer..."
}
```

---

## 🤖 Chatbot Logic

* Built using simple keyword-based responses
* No external AI APIs (fully free version)
* Easy to extend into real AI chatbot later

---

## 🌐 Deployment

* Frontend → Vercel
* Backend → Render

---

## 🎯 Project Goal

This project is not just a portfolio website, but a complete full-stack application that demonstrates:

* Frontend development (React + Tailwind)
* Backend API design (FastAPI)
* System integration
* Deployment to cloud platforms

It reflects my interest in combining software engineering with AI-driven user experiences.

---

## 📬 Contact

* GitHub: https://github.com/Thanu-Venu
* LinkedIn: https://linkedin.com/in/Thanushya-Venugoban
* Email: [your-email@example.com](mailto:thanu.venu28@gmail.com)

---

## ⭐ Future Improvements

* Integrate real AI (OpenAI API)
* Add voice-based chatbot interaction
* Implement dark/light mode toggle
* Improve animations and UX
* Add project filtering and search

---

💡 Built with the mindset of learning by building and creating something unique.
