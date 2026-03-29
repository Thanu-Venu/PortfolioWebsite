function Education() {
    return (
        <section id="Education" className="min-h-screen px-6 md:px-20 py-20 border-t border-gray-800/80 reveal">

            <h2 className="text-3xl md:text-5xl font-bold mb-12">
                Education & Certifications
            </h2>

            <div className="h-1 w-20 rounded-full accent-line mb-10"></div>

            {/* EDUCATION */}
            <div className="mb-16">
                <h3 className="text-xl font-semibold mb-4">Education</h3>

                <div className="border border-white/15 bg-white/[0.02] backdrop-blur-sm p-6 rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] ui-interactive">
                    <h4 className="text-lg font-semibold">
                        BSc in Computer Science
                    </h4>
                    <p className="text-gray-300 mt-2 leading-relaxed">
                        University of Colombo School Of Computing • 2023 – Present<br></br>
                        current CGPA: 3.55/4.0
                    </p>
                </div>
            </div>

            {/* CERTIFICATIONS */}
            <div>
                <h3 className="text-xl font-semibold mb-6">Certifications</h3>

                <div className="grid md:grid-cols-2 gap-6">

                    {/* CERT CARD */}
                    <a href="/cert1.pdf" target="_blank" rel="noreferrer" className="border border-white/15 bg-white/[0.02] backdrop-blur-sm p-5 rounded-2xl hover:border-white/70 hover:shadow-[0_0_24px_rgba(255,255,255,0.12)] ui-interactive">
                        <h4 className="text-md font-semibold">
                            Python for Beginners
                        </h4>
                        <p className="text-gray-400 text-sm mt-1">
                            University of Moratuwa • Nov 2025
                        </p>
                    </a>

                    <a href="/cert3.pdf" target="_blank" rel="noreferrer" className="border border-white/15 bg-white/[0.02] backdrop-blur-sm p-5 rounded-2xl hover:border-white/70 hover:shadow-[0_0_24px_rgba(255,255,255,0.12)] ui-interactive">
                        <h4 className="text-md font-semibold">
                            Software Engineer Intern
                        </h4>
                        <p className="text-gray-400 text-sm mt-1">
                            HackerRank • Oct 2025
                        </p>
                    </a>

                    <a href="/cert4.pdf" target="_blank" rel="noreferrer" className="border border-white/15 bg-white/[0.02] backdrop-blur-sm p-5 rounded-2xl hover:border-white/70 hover:shadow-[0_0_24px_rgba(255,255,255,0.12)] ui-interactive">
                        <h4 className="text-md font-semibold">
                            Web Design for Beginners
                        </h4>
                        <p className="text-gray-400 text-sm mt-1">
                            University of Moratuwa • May 2025
                        </p>
                    </a>

                    <a href="/cert5.pdf" target="_blank" rel="noreferrer" className="border border-white/15 bg-white/[0.02] backdrop-blur-sm p-5 rounded-2xl hover:border-white/70 hover:shadow-[0_0_24px_rgba(255,255,255,0.12)] ui-interactive">
                        <h4 className="text-md font-semibold">
                            CSS Basics
                        </h4>
                        <p className="text-gray-400 text-sm mt-1">
                            HackerRank • May 2025
                        </p>
                    </a>

                    <a href="/cert6.pdf" target="_blank" rel="noreferrer" className="border border-white/15 bg-white/[0.02] backdrop-blur-sm p-5 rounded-2xl hover:border-white/70 hover:shadow-[0_0_24px_rgba(255,255,255,0.12)] ui-interactive">
                        <h4 className="text-md font-semibold">
                            SQL Basics
                        </h4>
                        <p className="text-gray-400 text-sm mt-1">
                            HackerRank • May 2025
                        </p>
                    </a>

                </div>

            </div>

        </section>
    );
}

export default Education;

