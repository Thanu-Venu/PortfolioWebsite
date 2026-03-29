function Navbar() {
    return (
        <nav className="fixed top-0 left-0 w-full h-16 bg-black/60 backdrop-blur-xl border-b border-white/10 flex items-center justify-between px-6 md:px-8 z-50 shadow-[0_10px_30px_rgba(0,0,0,0.45)] reveal">

            <h1 className="text-lg md:text-xl font-semibold tracking-[0.2em] uppercase accent-text">
                Thanu
            </h1>

            <div className="space-x-2 md:space-x-3 text-xs md:text-sm bg-white/[0.03] border border-white/10 rounded-full px-2 py-1">
                <a href="#About" className="inline-block px-3 py-1.5 rounded-full text-gray-300 hover:text-white hover:bg-white/10 ui-interactive">About</a>
                <a href="#Projects" className="inline-block px-3 py-1.5 rounded-full text-gray-300 hover:text-white hover:bg-white/10 ui-interactive">Projects</a>
                <a href="#Contact" className="inline-block px-3 py-1.5 rounded-full text-gray-300 hover:text-white hover:bg-white/10 ui-interactive">Contact</a>
            </div>

        </nav>
    );
}

export default Navbar;