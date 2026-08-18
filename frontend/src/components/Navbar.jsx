import ThemeToggle from "./ThemeToggle";

function Navbar() {
    return (
        <nav className="fixed top-0 left-0 w-full h-16 bg-[rgb(var(--bg-rgb)/60%)] backdrop-blur-md md:backdrop-blur-xl border-b border-[rgb(var(--fg-rgb)/10%)] flex items-center justify-between px-6 md:px-8 z-50 shadow-[0_10px_30px_rgba(0,0,0,0.45)] reveal">

            <h1 className="text-lg md:text-xl font-semibold tracking-[0.2em] uppercase accent-text">
                Thanu
            </h1>

            <div className="flex items-center gap-3 md:gap-4">
                <div className="space-x-2 md:space-x-3 text-xs md:text-sm bg-[rgb(var(--fg-rgb)/3%)] border border-[rgb(var(--fg-rgb)/10%)] rounded-full px-2 py-1 premium-card">
                    <a href="#About" className="inline-block px-3 py-1.5 rounded-full text-[rgb(var(--fg-rgb)/72%)] hover:text-[rgb(var(--fg-rgb))] hover:bg-[rgb(var(--fg-rgb)/10%)] ui-interactive">About</a>
                    <a href="#Projects" className="inline-block px-3 py-1.5 rounded-full text-[rgb(var(--fg-rgb)/72%)] hover:text-[rgb(var(--fg-rgb))] hover:bg-[rgb(var(--fg-rgb)/10%)] ui-interactive">Projects</a>
                    <a href="#Contact" className="inline-block px-3 py-1.5 rounded-full text-[rgb(var(--fg-rgb)/72%)] hover:text-[rgb(var(--fg-rgb))] hover:bg-[rgb(var(--fg-rgb)/10%)] ui-interactive">Contact</a>
                </div>
                <ThemeToggle />
            </div>

        </nav>
    );
}

export default Navbar;