import { useState } from "react";
import Chatbot from "./Chatbot";

function FloatingChatButton() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <div className="group fixed bottom-6 right-6 z-50">
                {/* FLOATING BUTTON */}
                <button
                    onClick={() => setOpen(!open)}
                    aria-label={open ? "Close chat" : "Open chat"}
                    className={`ui-interactive inline-flex h-14 w-14 items-center justify-center rounded-2xl border transition duration-300 ${open
                        ? "border-[color:var(--accent-gold)] bg-[color:var(--accent-gold)] text-[#141006] shadow-[0_16px_44px_rgba(198,169,107,0.4)]"
                        : "border-[rgb(var(--fg-rgb)/10%)] bg-[rgb(var(--bg-rgb)/70%)] text-[#f3f3f3] shadow-[0_14px_34px_rgba(0,0,0,0.45)] hover:border-[color:var(--accent-gold-soft)]"
                        }`}
                >
                    {!open && (
                        <span className="pointer-events-none absolute -right-0.5 -top-0.5 h-3.5 w-3.5">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#c6a96b]/60" />
                            <span className="relative inline-flex h-3.5 w-3.5 rounded-full border border-[#1a1308] bg-[#d0b37a]" />
                        </span>
                    )}
                    {open ? (
                        <svg
                            viewBox="0 0 24 24"
                            className="h-5 w-5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                        >
                            <path d="m18 6-12 12" />
                            <path d="m6 6 12 12" />
                        </svg>
                    ) : (
                        <svg
                            viewBox="0 0 24 24"
                            className="h-5 w-5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                        >
                            <path d="M7 10h10" />
                            <path d="M7 14h6" />
                            <path d="M12 3c-4.97 0-9 3.66-9 8.17 0 2.53 1.27 4.78 3.27 6.29L5 21l4.57-1.55c.78.15 1.59.23 2.43.23 4.97 0 9-3.66 9-8.18C21 6.66 16.97 3 12 3Z" />
                        </svg>
                    )}
                </button>

                {!open && (
                    <div className="pointer-events-none absolute right-[calc(100%+10px)] top-1/2 hidden w-64 -translate-y-1/2 rounded-xl border border-[rgb(var(--fg-rgb)/14%)] bg-[rgb(var(--bg-rgb)/85%)] px-3 py-2 text-xs leading-relaxed text-[rgb(var(--fg-rgb)/80%)] opacity-0 shadow-[0_12px_30px_rgba(0,0,0,0.45)] transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100 md:block">
                        Chat with my AI Assistant.
                    </div>
                )}
            </div>

            {/* CHATBOX */}
            {open && (
                <div className="chat-pop fixed bottom-24 left-4 right-4 z-50 origin-bottom sm:left-auto sm:right-6 sm:w-auto sm:origin-bottom-right">
                    <Chatbot />
                </div>
            )}
        </>
    );
}

export default FloatingChatButton;

