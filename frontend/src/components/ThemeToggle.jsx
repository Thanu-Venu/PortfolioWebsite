import { useEffect, useState } from "react";

function getStoredTheme() {
    if (typeof document === "undefined") return "dark";
    return document.documentElement.classList.contains("light") ? "light" : "dark";
}

function ThemeToggle() {
    const [theme, setTheme] = useState(getStoredTheme);

    useEffect(() => {
        const root = document.documentElement;
        if (theme === "light") {
            root.classList.add("light");
        } else {
            root.classList.remove("light");
        }
        try {
            localStorage.setItem("theme", theme);
        } catch {
            // Storage may be unavailable (e.g. private browsing); ignore.
        }
    }, [theme]);

    return (
        <button
            type="button"
            onClick={() => setTheme((prev) => (prev === "light" ? "dark" : "light"))}
            aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
            title={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[rgb(var(--fg-rgb)/16%)] bg-[rgb(var(--fg-rgb)/3%)] text-[rgb(var(--fg-rgb)/78%)] hover:text-[rgb(var(--fg-rgb))] hover:border-[rgb(var(--fg-rgb)/35%)] ui-interactive"
        >
            {theme === "light" ? (
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
                </svg>
            ) : (
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
                </svg>
            )}
        </button>
    );
}

export default ThemeToggle;
