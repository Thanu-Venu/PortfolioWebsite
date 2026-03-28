function Home() {
    return (
        <div className="h-screen flex flex-col justify-center items-center text-center px-4 pt-20">

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
                Hi, I'm <span className="text-gray-300">Thanu</span>
            </h1>

            <p className="mt-6 text-gray-400 max-w-xl text-lg">
                Software Engineer passionate about building scalable systems
                and exploring AI-driven applications.
            </p>

            <div className="mt-8 flex gap-4">
                <button className="px-6 py-3 border border-white rounded-lg hover:bg-white hover:text-black transition duration-300">
                    View Projects
                </button>

                <button className="px-6 py-3 border border-gray-700 rounded-lg hover:bg-gray-800 transition duration-300">
                    Download CV
                </button>
            </div>

        </div>
    );
}

export default Home;