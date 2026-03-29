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

1. Open `.env` file in the backend folder and set:
  ```env
  GEMINI_API_KEY=your_real_key
  ALLOWED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
  RATE_LIMIT_WINDOW_SECONDS=60
  RATE_LIMIT_MAX_REQUESTS=20
  CACHE_TTL_SECONDS=300
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
  "reply": "I'd be happy to tell you about Thanu's projects...",
  "source": "gemini"
}
```

### GET /metrics
Returns lightweight runtime stats for monitoring.

Example:
```json
{
  "total_requests": 42,
  "gemini_responses": 30,
  "fallback_responses": 12,
  "rate_limited_requests": 3,
  "cache_hits": 10,
  "cache_size": 7,
  "rate_limit_window_seconds": 60,
  "rate_limit_max_requests": 20,
  "cache_ttl_seconds": 300
}
```

## Features

✅ Google Gemini API Integration
✅ Portfolio-specific prompt engineering
✅ Configurable CORS for frontend integration
✅ Error handling with fallback messages
✅ Per-IP rate limiting
✅ In-memory response caching
✅ Runtime metrics endpoint
✅ Environment variable protection for API key

## Frontend Environment

Set this in frontend environment for deployed backend URL:

```env
VITE_API_BASE_URL=https://your-backend-domain
```

If omitted, frontend defaults to `http://127.0.0.1:8000`.

## Deployment Notes

1. Deploy backend first (Render/Railway/VPS) and set backend env vars.
2. Set `ALLOWED_ORIGINS` to your real frontend domain(s).
3. Deploy frontend and set `VITE_API_BASE_URL` to backend URL.
4. Verify:
  - `GET /` works
  - `POST /chat` returns `source: gemini` for healthy Gemini calls
  - `GET /metrics` updates as traffic comes in

## Troubleshooting

- **"GEMINI_API_KEY not found"**: Make sure `.env` file exists and has your API key
- **Connection refused**: Ensure backend is running on http://127.0.0.1:8000
- **CORS errors**: Add your deployed frontend URL to `ALLOWED_ORIGINS`
- **Too many fallbacks**: Check `/metrics` and Gemini spend/rate limits
