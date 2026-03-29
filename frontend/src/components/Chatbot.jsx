
import { useState, useRef, useEffect } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

function Chatbot() {
    const [messages, setMessages] = useState([
        { text: "Hey! 👋 How can I help you today?", sender: "bot" }
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [lastSource, setLastSource] = useState("unknown");
    const [lastReason, setLastReason] = useState("");
    const [metrics, setMetrics] = useState(null);
    const [showMetrics, setShowMetrics] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        let timer;

        const loadMetrics = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/metrics`);
                if (!res.ok) return;
                const data = await res.json();
                setMetrics(data);
            } catch {
                // Metrics are optional; ignore fetch failures.
            }
        };

        if (showMetrics) {
            loadMetrics();
            timer = setInterval(loadMetrics, 10000);
        }

        return () => {
            if (timer) clearInterval(timer);
        };
    }, [showMetrics]);

    const handleSend = async () => {
        if (!input.trim() || loading) return;

        const userMessage = { text: input, sender: "user" };
        const userInput = input;

        setMessages(prev => [...prev, userMessage]);
        setInput("");
        setLoading(true);

        try {
            const res = await fetch(`${API_BASE_URL}/chat`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ message: userInput })
            });

            if (!res.ok) {
                throw new Error(`Server responded with status: ${res.status}`);
            }

            const data = await res.json();
            const source = data.source || "unknown";
            const reason = data.reason || "";
            setLastSource(source);
            setLastReason(reason);

            const botMessage = {
                text: data.reply || "I couldn't process that. Please try again.",
                sender: "bot",
                source,
                reason
            };
            setMessages(prev => [...prev, botMessage]);

        } catch (error) {
            console.error("Chat error:", error);
            let errorMsg = `Server error 😢. Make sure backend is running on ${API_BASE_URL}`;
            if (error.message.includes("Failed to fetch")) {
                errorMsg = "Connection failed. Is the backend running? 🔌";
            }
            setMessages(prev => [
                ...prev,
                { text: errorMsg, sender: "bot", isError: true, source: "local_fallback", reason: "network_error" }
            ]);
            setLastSource("local_fallback");
            setLastReason("network_error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-[500px] w-96 bg-black/80 backdrop-blur-xl rounded-2xl border border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
            {/* Header */}
            <div className="border-b border-white/20 p-5 rounded-t-2xl bg-gradient-to-r from-white/10 to-white/5">
                <div className="flex items-center justify-between gap-3">
                    <div>
                        <h3 className="text-lg font-semibold accent-text tracking-wide">Chat Assistant</h3>
                        <p className="text-xs text-gray-400 mt-1">AI-powered assistance</p>
                    </div>
                    <span
                        className={`text-[10px] uppercase tracking-[0.14em] px-2.5 py-1 rounded-full border ${lastSource === "gemini"
                            ? "border-emerald-400/50 text-emerald-300 bg-emerald-500/10"
                            : "border-amber-400/50 text-amber-300 bg-amber-500/10"
                            }`}
                        title={lastReason ? `Fallback reason: ${lastReason}` : ""}
                    >
                        {lastSource === "gemini" ? "Gemini" : "Fallback"}
                    </span>
                </div>
                <button
                    onClick={() => setShowMetrics((prev) => !prev)}
                    className="mt-3 text-[10px] uppercase tracking-[0.12em] text-gray-300 hover:text-white"
                >
                    {showMetrics ? "Hide Usage" : "Show Usage"}
                </button>
                {showMetrics && metrics && (
                    <div className="mt-2 grid grid-cols-2 gap-2 text-[10px] text-gray-300">
                        <div className="rounded-lg border border-white/15 px-2 py-1">Req: {metrics.total_requests}</div>
                        <div className="rounded-lg border border-white/15 px-2 py-1">Gemini: {metrics.gemini_responses}</div>
                        <div className="rounded-lg border border-white/15 px-2 py-1">Fallback: {metrics.fallback_responses}</div>
                        <div className="rounded-lg border border-white/15 px-2 py-1">Cache: {metrics.cache_hits}</div>
                    </div>
                )}
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 scroll-smooth">
                {messages.map((msg, idx) => (
                    <div
                        key={idx}
                        className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2 duration-300`}
                    >
                        <div
                            className={`max-w-xs px-4 py-3 rounded-2xl text-sm leading-relaxed ${msg.sender === "user"
                                ? "bg-gradient-to-r from-[var(--accent-gold)] to-[#d4b97e] text-black font-medium rounded-br-none shadow-[0_8px_24px_rgba(198,169,107,0.2)]"
                                : msg.isError
                                    ? "bg-red-600/40 border border-red-500/50 text-red-100 rounded-bl-none"
                                    : "bg-white/20 border border-white/30 text-gray-50 rounded-bl-none"
                                }`}
                        >
                            {msg.text}
                            {msg.sender === "bot" && msg.source && (
                                <div className="mt-2 text-[10px] tracking-[0.12em] uppercase text-gray-300/90">
                                    Source: {msg.source === "gemini" ? "Gemini" : "Fallback"}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
                {loading && (
                    <div className="flex justify-start">
                        <div className="bg-white/20 border border-white/30 px-4 py-3 rounded-2xl rounded-bl-none">
                            <div className="flex gap-1.5">
                                <div className="h-2 w-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "0s" }}></div>
                                <div className="h-2 w-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                                <div className="h-2 w-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-white/20 p-4 bg-gradient-to-t from-white/5 to-transparent rounded-b-2xl">
                <div className="flex gap-3">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && !loading && handleSend()}
                        placeholder="Type your message..."
                        disabled={loading}
                        className="flex-1 bg-white/15 border border-white/30 rounded-xl px-4 py-2.5 text-white text-sm placeholder-gray-300 focus:outline-none focus:border-[var(--accent-gold)]/60 focus:bg-white/20 transition-all disabled:opacity-50"
                    />
                    <button
                        onClick={handleSend}
                        disabled={loading || !input.trim()}
                        className="bg-[var(--accent-gold)] hover:bg-[#d4b97e] text-black px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ui-interactive disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_8px_24px_rgba(198,169,107,0.24)]"
                    >
                        {loading ? (
                            <svg className="h-5 w-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : (
                            "Send"
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Chatbot;

