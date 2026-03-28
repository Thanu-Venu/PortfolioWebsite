function Navbar() {
    return (
        <nav className="fixed top-0 left-0 w-full h-16 bg-black border-b border-gray-800 flex items-center justify-between px-8 z-50">

            <h1 className="text-lg font-semibold tracking-wide">
                Thanu
            </h1>

            <div className="space-x-6 text-sm">
                <a href="#About" className="hover:text-gray-400 transition">About</a>
                <a href="#Projects" className="hover:text-gray-400 transition">Projects</a>
                <a href="#Contact" className="hover:text-gray-400 transition">Contact</a>
            </div>

        </nav>
    );
}

export default Navbar;