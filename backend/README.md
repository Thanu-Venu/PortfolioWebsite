# Portfolio Chatbot Backend

FastAPI backend connected to Google Gemini API for an intelligent portfolio assistant.

## Setup Instructions

### 1. Get Gemini API Key (Free Tier)

1. Visit [Google AI Studio](https://aistudio.google.com/app/apikeys)
2. Click "Create API Key"
3. Copy your API key

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Configure API Key

1. Open `.env` file in the backend folder
2. Replace `your_gemini_api_key_here` with your actual API key:
   ```
   GEMINI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxx
   ```

### 4. Run the Backend

```bash
uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

You should see:
```
Uvicorn running on http://127.0.0.1:8000
```

### 5. Test the API

Open your browser and go to:
- http://127.0.0.1:8000 (to see status)
- http://127.0.0.1:8000/docs (interactive API documentation)

## API Endpoints

### GET /
Returns API status

### POST /chat
Accepts a message and returns an AI response

**Request:**
```json
{
  "message": "Tell me about your projects"
}
```

**Response:**
```json
{
  "reply": "I'd be happy to tell you about Thanu's projects..."
}
```

## Features

✅ Google Gemini API Integration
✅ Portfolio-specific prompt engineering
✅ CORS enabled for frontend integration
✅ Error handling with fallback messages
✅ Environment variable protection for API key

## Troubleshooting

- **"GEMINI_API_KEY not found"**: Make sure `.env` file exists and has your API key
- **Connection refused**: Ensure backend is running on http://127.0.0.1:8000
- **CORS errors**: Already handled in main.py, should work with frontend
