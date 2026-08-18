function Home() {
    return (
        <section id="Home" className="js-reveal section-reveal min-h-screen flex flex-col justify-center items-center text-center px-6 pt-24 pb-12 relative">
            <p className="text-[11px] md:text-xs uppercase tracking-[0.28em] text-[rgb(var(--fg-rgb)/94%)]0 mb-5 reveal reveal-delay-1">Software Engineer Portfolio</p>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight leading-[0.95] reveal reveal-delay-1">
                Hi, I'm <span className="hero-name-wrap"><span className="hero-sheen hero-name">Thanu</span></span>
            </h1>

            <p className="mt-3 text-xs md:text-sm tracking-wide text-[rgb(var(--fg-rgb)/58%)] reveal reveal-delay-2 stagger-item" style={{ "--reveal-delay": "140ms" }}>
                Undergraduate in Computer Science at UCSC
            </p>

            <p className="mt-7 text-[rgb(var(--fg-rgb)/72%)] max-w-2xl text-lg md:text-xl leading-relaxed reveal reveal-delay-2 stagger-item" style={{ "--reveal-delay": "180ms" }}>
                Building scalable software and AI-driven applications.
            </p>

            <div className="mt-10 flex gap-4 flex-wrap justify-center reveal reveal-delay-2 stagger-item" style={{ "--reveal-delay": "260ms" }}>
                <a
                    href="#Projects"
                    className="px-7 py-3.5 border rounded-full accent-cta ui-interactive"
                >
                    View Projects
                </a>

                <a
                    href="/Thanu-CV.pdf"
                    download="Thanu-CV.pdf"
                    className="px-7 py-3.5 border border-[rgb(var(--fg-rgb)/28%)] rounded-full hover:border-[rgb(var(--fg-rgb))] hover:bg-[rgb(var(--fg-rgb)/10%)] ui-interactive"
                >
                    Download CV
                </a>
            </div>

        </section>
    );
}

export default Home;