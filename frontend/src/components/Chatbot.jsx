import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';
import axios from 'axios';

// A single chat message bubble
function Message({ msg }) {
  const isUser = msg.role === 'user';
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3`}>
      <div
        className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
          isUser
            ? 'bg-white text-black rounded-br-sm'
            : 'bg-white/10 text-gray-200 rounded-bl-sm'
        }`}
      >
        {msg.text}
      </div>
    </div>
  );
}

// Typing indicator shown while waiting for the bot response
function TypingIndicator() {
  return (
    <div className="flex justify-start mb-3">
      <div className="bg-white/10 px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1 items-center">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  );
}

// Floating AI Chatbot — sits at bottom-right of the screen
export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      text: "Hi! I'm Thanu's AI assistant 👋 Ask me about skills, projects, or experience.",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  // Auto-scroll to the latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Send user message and get bot response from FastAPI backend
  const sendMessage = async (e) => {
    e?.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    // Append user message immediately
    setMessages((prev) => [...prev, { role: 'user', text: trimmed }]);
    setInput('');
    setLoading(true);

    try {
      // POST to /api/chat — the Vite proxy forwards this to FastAPI at http://localhost:8000/chat
      const { data } = await axios.post('/api/chat', { message: trimmed });
      setMessages((prev) => [...prev, { role: 'bot', text: data.response }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'bot', text: "Sorry, I couldn't connect to the server. Please try again later." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Chat window */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 bg-black border border-white/15 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/5">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-white text-sm font-semibold">AI Assistant</span>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-gray-500 hover:text-white transition"
              aria-label="Close chat"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 max-h-80 min-h-48">
            {messages.map((msg, i) => (
              <Message key={i} msg={msg} />
            ))}
            {loading && <TypingIndicator />}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={sendMessage}
            className="flex items-center gap-2 px-4 py-3 border-t border-white/10"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything…"
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-white/30 transition"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="text-white/70 hover:text-white disabled:opacity-30 transition"
              aria-label="Send message"
            >
              {loading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
            </button>
          </form>
        </div>
      )}

      {/* Floating toggle button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-white text-black rounded-full shadow-lg flex items-center justify-center hover:bg-gray-200 transition"
        aria-label="Toggle AI chatbot"
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>
    </>
  );
}
