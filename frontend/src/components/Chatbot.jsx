
import { useState, useRef, useEffect } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || (
    import.meta.env.DEV
        ? "http://127.0.0.1:8000"
        : "https://thanu-venu-portfolio.onrender.com"
);

const QUICK_PROMPTS = [
    "Projects",
    "Skills",
    "Education",
    "Experience",
    "Tech Stack",
    "Contact",
];

function renderInlineText(text, keyPrefix) {
    const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);

    return parts.map((part, idx) => {
        const key = `${keyPrefix}-${idx}`;

        if (part.startsWith("**") && part.endsWith("**")) {
            return <strong key={key} className="font-semibold text-[rgb(var(--fg-rgb))]">{part.slice(2, -2)}</strong>;
        }

        if (part.startsWith("`") && part.endsWith("`")) {
            return (
                <code key={key} className="rounded bg-[rgb(var(--bg-rgb)/35%)] px-1.5 py-0.5 text-[12px] text-[#f1e5ca]">
                    {part.slice(1, -1)}
                </code>
            );
        }

        return <span key={key}>{part}</span>;
    });
}

function renderStructuredText(text) {
    const lines = text.replace(/\r/g, "").split("\n");
    const blocks = [];
    let listItems = [];
    let listType = "ul";

    const flushList = () => {
        if (!listItems.length) return;

        if (listType === "ol") {
            blocks.push(
                <ol key={`list-${blocks.length}`} className="list-decimal space-y-1 pl-5 text-[rgb(var(--fg-rgb)/88%)]">
                    {listItems.map((item, idx) => (
                        <li key={`item-${idx}`}>{renderInlineText(item, `ol-${blocks.length}-${idx}`)}</li>
                    ))}
                </ol>
            );
        } else {
            blocks.push(
                <ul key={`list-${blocks.length}`} className="list-disc space-y-1 pl-5 text-[rgb(var(--fg-rgb)/88%)]">
                    {listItems.map((item, idx) => (
                        <li key={`item-${idx}`}>{renderInlineText(item, `ul-${blocks.length}-${idx}`)}</li>
                    ))}
                </ul>
            );
        }

        listItems = [];
    };

    lines.forEach((rawLine, idx) => {
        const line = rawLine.trim();

        if (!line) {
            flushList();
            return;
        }

        const orderedMatch = line.match(/^\d+\.\s+(.*)$/);
        if (orderedMatch) {
            if (listType !== "ol") {
                flushList();
            }
            listType = "ol";
            listItems.push(orderedMatch[1]);
            return;
        }

        const bulletMatch = line.match(/^[-*]\s+(.*)$/);
        if (bulletMatch) {
            if (listType !== "ul") {
                flushList();
            }
            listType = "ul";
            listItems.push(bulletMatch[1]);
            return;
        }

        flushList();

        const headingMatch = line.match(/^#{1,4}\s+(.*)$/);
        if (headingMatch) {
            blocks.push(
                <p key={`heading-${idx}`} className="font-semibold tracking-wide text-[rgb(var(--fg-rgb))]">
                    {renderInlineText(headingMatch[1], `heading-${idx}`)}
                </p>
            );
            return;
        }

        blocks.push(
            <p key={`p-${idx}`} className="text-[rgb(var(--fg-rgb)/88%)] leading-relaxed">
                {renderInlineText(line, `p-${idx}`)}
            </p>
        );
    });

    flushList();

    return <div className="space-y-2">{blocks}</div>;
}

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
    const [expanded, setExpanded] = useState(() => {
        if (typeof window === "undefined") return false;
        try {
            return localStorage.getItem("chatExpanded") === "1";
        } catch {
            return false;
        }
    });
    const messagesEndRef = useRef(null);

    useEffect(() => {
        try {
            localStorage.setItem("chatExpanded", expanded ? "1" : "0");
        } catch {
            // Storage may be unavailable (e.g. private browsing); ignore.
        }
    }, [expanded]);

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

    const handleSend = async (messageOverride) => {
        const userInput = typeof messageOverride === "string"
            ? messageOverride.trim()
            : input.trim();
        if (!userInput || loading) return;

        const userMessage = { text: userInput, sender: "user" };

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

    const handleQuickPrompt = (prompt) => {
        if (loading) return;
        handleSend(`Tell me about your ${prompt.toLowerCase()}.`);
    };

    return (
        <div className={`flex flex-col ${expanded
            ? "h-[85vh] max-h-[820px] w-[calc(100vw-2rem)] max-w-2xl sm:w-[560px] md:w-[640px]"
            : "h-[70vh] max-h-[500px] w-[calc(100vw-2rem)] max-w-sm sm:w-96"
            } bg-[rgb(var(--bg-rgb)/95%)] sm:bg-[rgb(var(--bg-rgb)/80%)] backdrop-blur-none sm:backdrop-blur-xl rounded-2xl border border-[rgb(var(--fg-rgb)/16%)] shadow-[0_20px_60px_rgba(0,0,0,0.6)] transition-[width,height] duration-300`}>
            {/* Header */}
            <div className="border-b border-[rgb(var(--fg-rgb)/16%)] p-5 rounded-t-2xl bg-[rgb(var(--bg-rgb)/90%)] sm:bg-gradient-to-r sm:from-[rgb(var(--fg-rgb)/10%)] sm:to-[rgb(var(--fg-rgb)/5%)]">
                <div className="flex items-center justify-between gap-3">
                    <div>
                        <h3 className="text-lg font-semibold accent-text tracking-wide">Chat Assistant</h3>
                        <p className="text-xs text-[rgb(var(--fg-rgb)/58%)] mt-1">AI-powered assistance</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                        <button
                            type="button"
                            onClick={() => setExpanded((prev) => !prev)}
                            aria-label={expanded ? "Compact chat window" : "Expand chat window"}
                            title={expanded ? "Compact view" : "Expand view for easier reading"}
                            className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-[rgb(var(--fg-rgb)/16%)] text-[rgb(var(--fg-rgb)/72%)] hover:text-[rgb(var(--fg-rgb))] hover:border-[rgb(var(--fg-rgb)/30%)] ui-interactive"
                        >
                            {expanded ? (
                                <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                    <path d="M12 8h4V4" />
                                    <path d="M8 12H4v4" />
                                    <path d="M16 4l-5 5" />
                                    <path d="M4 16l5-5" />
                                </svg>
                            ) : (
                                <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                    <path d="M8 4H4v4" />
                                    <path d="M12 16h4v-4" />
                                    <path d="M4 4l5 5" />
                                    <path d="M16 16l-5-5" />
                                </svg>
                            )}
                        </button>
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
                </div>
                <button
                    onClick={() => setShowMetrics((prev) => !prev)}
                    className="mt-3 text-[10px] uppercase tracking-[0.12em] text-[rgb(var(--fg-rgb)/72%)] hover:text-[rgb(var(--fg-rgb))]"
                >
                    {showMetrics ? "Hide Usage" : "Show Usage"}
                </button>
                {showMetrics && metrics && (
                    <div className="mt-2 grid grid-cols-2 gap-2 text-[10px] text-[rgb(var(--fg-rgb)/72%)]">
                        <div className="rounded-lg border border-[rgb(var(--fg-rgb)/14%)] px-2 py-1">Req: {metrics.total_requests}</div>
                        <div className="rounded-lg border border-[rgb(var(--fg-rgb)/14%)] px-2 py-1">Gemini: {metrics.gemini_responses}</div>
                        <div className="rounded-lg border border-[rgb(var(--fg-rgb)/14%)] px-2 py-1">Fallback: {metrics.fallback_responses}</div>
                        <div className="rounded-lg border border-[rgb(var(--fg-rgb)/14%)] px-2 py-1">Cache: {metrics.cache_hits}</div>
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
                                ? "bg-[#8f6f32] text-[#fffdf5] sm:bg-gradient-to-r sm:from-[var(--accent-gold)] sm:to-[#d4b97e] sm:text-black font-medium rounded-br-none shadow-[0_8px_24px_rgba(198,169,107,0.2)]"
                                : msg.isError
                                    ? "bg-red-600/40 border border-red-500/50 text-red-100 rounded-bl-none"
                                    : "bg-[rgb(var(--fg-rgb)/25%)] sm:bg-[rgb(var(--fg-rgb)/20%)] border border-[rgb(var(--fg-rgb)/22%)] text-[rgb(var(--fg-rgb)/94%)] rounded-bl-none"
                                }`}
                        >
                            {msg.sender === "bot" && !msg.isError ? renderStructuredText(msg.text) : msg.text}
                            {msg.sender === "bot" && msg.source && (
                                <div className="mt-2 text-[10px] tracking-[0.12em] uppercase text-[rgb(var(--fg-rgb)/62%)]">
                                    Source: {msg.source === "gemini" ? "Gemini" : "Fallback"}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
                {loading && (
                    <div className="flex justify-start">
                        <div className="bg-[rgb(var(--fg-rgb)/25%)] sm:bg-[rgb(var(--fg-rgb)/20%)] border border-[rgb(var(--fg-rgb)/22%)] px-4 py-3 rounded-2xl rounded-bl-none">
                            <div className="flex gap-1.5">
                                <div className="h-2 w-2 bg-[rgb(var(--fg-rgb)/70%)] rounded-full animate-bounce" style={{ animationDelay: "0s" }}></div>
                                <div className="h-2 w-2 bg-[rgb(var(--fg-rgb)/70%)] rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                                <div className="h-2 w-2 bg-[rgb(var(--fg-rgb)/70%)] rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-[rgb(var(--fg-rgb)/16%)] p-4 bg-[rgb(var(--bg-rgb)/85%)] sm:bg-gradient-to-t sm:from-[rgb(var(--fg-rgb)/5%)] sm:to-transparent rounded-b-2xl">
                <div className="mb-3">
                    <p className="mb-2 text-[10px] uppercase tracking-[0.14em] text-[rgb(var(--fg-rgb)/58%)]">Quick Topics</p>
                    <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                        {QUICK_PROMPTS.map((prompt) => (
                            <button
                                key={prompt}
                                type="button"
                                onClick={() => handleQuickPrompt(prompt)}
                                disabled={loading}
                                className="shrink-0 rounded-full border border-[rgb(var(--fg-rgb)/16%)] bg-[rgb(var(--fg-rgb)/4%)] px-3 py-1.5 text-[11px] uppercase tracking-[0.1em] text-[rgb(var(--fg-rgb)/72%)] hover:text-[rgb(var(--fg-rgb))] hover:border-[rgb(var(--fg-rgb)/30%)] ui-interactive disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                {prompt}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex gap-3">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && !loading && handleSend()}
                        placeholder="Type your message..."
                        disabled={loading}
                        className="flex-1 bg-[rgb(var(--fg-rgb)/20%)] sm:bg-[rgb(var(--fg-rgb)/15%)] border border-[rgb(var(--fg-rgb)/22%)] rounded-xl px-4 py-2.5 text-[rgb(var(--fg-rgb))] text-sm placeholder-[rgb(var(--fg-rgb)/55%)] focus:outline-none focus:border-[var(--accent-gold)]/60 focus:bg-[rgb(var(--fg-rgb)/25%)] sm:focus:bg-[rgb(var(--fg-rgb)/20%)] transition-all disabled:opacity-50"
                    />
                    <button
                        type="button"
                        onClick={() => handleSend()}
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

