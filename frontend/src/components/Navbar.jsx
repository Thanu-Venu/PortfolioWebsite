import { useState } from "react";
import ThemeToggle from "./ThemeToggle";

const NAV_LINKS = [
    { href: "#About", label: "About" },
    { href: "#Projects", label: "Projects" },
    { href: "#Contact", label: "Contact" },
];

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 w-full bg-[rgb(var(--bg-rgb)/60%)] backdrop-blur-md md:backdrop-blur-xl border-b border-[rgb(var(--fg-rgb)/10%)] z-50 shadow-[0_10px_30px_rgba(0,0,0,0.45)] reveal">

            <div className="h-16 flex items-center justify-between px-6 md:px-8">
                <h1 className="text-lg md:text-xl font-semibold tracking-[0.2em] uppercase accent-text">
                    Thanu
                </h1>

                <div className="flex items-center gap-3 md:gap-4">
                    <div className="hidden md:flex md:space-x-3 text-sm bg-[rgb(var(--fg-rgb)/3%)] border border-[rgb(var(--fg-rgb)/10%)] rounded-full px-2 py-1 premium-card">
                        {NAV_LINKS.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className="inline-block px-3 py-1.5 rounded-full text-[rgb(var(--fg-rgb)/72%)] hover:text-[rgb(var(--fg-rgb))] hover:bg-[rgb(var(--fg-rgb)/10%)] ui-interactive"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>

                    <ThemeToggle />

                    <button
                        type="button"
                        onClick={() => setMenuOpen((open) => !open)}
                        aria-label={menuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={menuOpen}
                        className="md:hidden flex items-center justify-center w-9 h-9 rounded-full border border-[rgb(var(--fg-rgb)/15%)] bg-[rgb(var(--fg-rgb)/5%)] text-[rgb(var(--fg-rgb))] ui-interactive"
                    >
                        <span className="sr-only">Toggle menu</span>
                        {menuOpen ? (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                                <path d="M6 6l12 12M18 6L6 18" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                                <path d="M4 7h16M4 12h16M4 17h16" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {menuOpen && (
                <div className="md:hidden px-6 pb-4 flex flex-col gap-1 bg-[rgb(var(--bg-rgb)/95%)] backdrop-blur-md border-t border-[rgb(var(--fg-rgb)/10%)]">
                    {NAV_LINKS.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            onClick={() => setMenuOpen(false)}
                            className="px-3 py-3 rounded-xl text-[rgb(var(--fg-rgb)/80%)] hover:text-[rgb(var(--fg-rgb))] hover:bg-[rgb(var(--fg-rgb)/8%)] ui-interactive"
                        >
                            {link.label}
                        </a>
                    ))}
                </div>
            )}

        </nav>
    );
}

export default Navbar;