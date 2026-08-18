function Education() {
    return (
        <section id="Education" className="js-reveal section-reveal min-h-screen px-6 md:px-20 py-20 border-t border-[rgb(var(--fg-rgb)/12%)]">

            <h2 className="text-3xl md:text-5xl font-bold mb-12 stagger-item" style={{ "--reveal-delay": "60ms" }}>
                Education & Certifications
            </h2>

            <div className="h-1 w-20 rounded-full accent-line mb-10 stagger-item" style={{ "--reveal-delay": "120ms" }}></div>

            {/* EDUCATION */}
            <div className="mb-16 stagger-item" style={{ "--reveal-delay": "180ms" }}>
                <h3 className="text-xl font-semibold mb-4">Education</h3>

                <div className="border border-[rgb(var(--fg-rgb)/14%)] bg-[rgb(var(--fg-rgb)/2%)] backdrop-blur-sm p-6 rounded-2xl shadow-[inset_0_1px_0_rgb(var(--fg-rgb)/8%)] ui-interactive">
                    <h4 className="text-lg font-semibold">
                        BSc (HONS) in Computer Science
                    </h4>
                    <p className="text-[rgb(var(--fg-rgb)/72%)] mt-2 leading-relaxed">
                        University of Colombo School Of Computing • 2023 – Present<br></br>
                        current CGPA: 3.5964/4.0
                    </p>
                </div>

                <div className="mt-6 grid md:grid-cols-2 gap-4">
                    <div className="border border-[rgb(var(--fg-rgb)/14%)] bg-[rgb(var(--fg-rgb)/2%)] backdrop-blur-sm p-5 rounded-2xl shadow-[inset_0_1px_0_rgb(var(--fg-rgb)/8%)] ui-interactive">
                        <h4 className="text-md font-semibold">GCE Advanced Level (Physical Science)</h4>
                        <p className="text-[rgb(var(--fg-rgb)/72%)] text-sm mt-2 leading-relaxed">
                            School: Vavuniya Rambaikulam Girls' Maha Vidyalayam
                            <br />
                            Results: 2AB
                            <br />
                            Z Score: 1.8869
                        </p>
                    </div>

                    <div className="border border-[rgb(var(--fg-rgb)/14%)] bg-[rgb(var(--fg-rgb)/2%)] backdrop-blur-sm p-5 rounded-2xl shadow-[inset_0_1px_0_rgb(var(--fg-rgb)/8%)] ui-interactive">
                        <h4 className="text-md font-semibold">GCE Ordinary Level</h4>
                        <p className="text-[rgb(var(--fg-rgb)/72%)] text-sm mt-2 leading-relaxed">
                            School: Vavuniya Rambaikulam Girls' Maha Vidyalayam
                            <br />
                            Results: 9A's
                        </p>
                    </div>
                </div>
            </div>

            {/* CERTIFICATIONS */}
            <div className="stagger-item" style={{ "--reveal-delay": "250ms" }}>
                <h3 className="text-xl font-semibold mb-6">Certifications</h3>

                <div className="grid md:grid-cols-2 gap-6">

                    {/* CERT CARD */}
                    <a href="/cert1.pdf" target="_blank" rel="noreferrer" className="border border-[rgb(var(--fg-rgb)/14%)] bg-[rgb(var(--fg-rgb)/2%)] backdrop-blur-sm p-5 rounded-2xl hover:border-[rgb(var(--fg-rgb)/55%)] hover:shadow-[0_0_24px_rgb(var(--fg-rgb)/12%)] ui-interactive">
                        <h4 className="text-md font-semibold">
                            Python for Beginners
                        </h4>
                        <p className="text-[rgb(var(--fg-rgb)/58%)] text-sm mt-1">
                            University of Moratuwa • Nov 2025
                        </p>
                    </a>

                    <a href="/cert3.pdf" target="_blank" rel="noreferrer" className="border border-[rgb(var(--fg-rgb)/14%)] bg-[rgb(var(--fg-rgb)/2%)] backdrop-blur-sm p-5 rounded-2xl hover:border-[rgb(var(--fg-rgb)/55%)] hover:shadow-[0_0_24px_rgb(var(--fg-rgb)/12%)] ui-interactive">
                        <h4 className="text-md font-semibold">
                            Software Engineer Intern
                        </h4>
                        <p className="text-[rgb(var(--fg-rgb)/58%)] text-sm mt-1">
                            HackerRank • Oct 2025
                        </p>
                    </a>

                    <a href="/cert4.pdf" target="_blank" rel="noreferrer" className="border border-[rgb(var(--fg-rgb)/14%)] bg-[rgb(var(--fg-rgb)/2%)] backdrop-blur-sm p-5 rounded-2xl hover:border-[rgb(var(--fg-rgb)/55%)] hover:shadow-[0_0_24px_rgb(var(--fg-rgb)/12%)] ui-interactive">
                        <h4 className="text-md font-semibold">
                            Web Design for Beginners
                        </h4>
                        <p className="text-[rgb(var(--fg-rgb)/58%)] text-sm mt-1">
                            University of Moratuwa • May 2025
                        </p>
                    </a>

                    <a href="/cert5.pdf" target="_blank" rel="noreferrer" className="border border-[rgb(var(--fg-rgb)/14%)] bg-[rgb(var(--fg-rgb)/2%)] backdrop-blur-sm p-5 rounded-2xl hover:border-[rgb(var(--fg-rgb)/55%)] hover:shadow-[0_0_24px_rgb(var(--fg-rgb)/12%)] ui-interactive">
                        <h4 className="text-md font-semibold">
                            CSS Basics
                        </h4>
                        <p className="text-[rgb(var(--fg-rgb)/58%)] text-sm mt-1">
                            HackerRank • May 2025
                        </p>
                    </a>

                    <a href="/cert6.pdf" target="_blank" rel="noreferrer" className="border border-[rgb(var(--fg-rgb)/14%)] bg-[rgb(var(--fg-rgb)/2%)] backdrop-blur-sm p-5 rounded-2xl hover:border-[rgb(var(--fg-rgb)/55%)] hover:shadow-[0_0_24px_rgb(var(--fg-rgb)/12%)] ui-interactive">
                        <h4 className="text-md font-semibold">
                            SQL Basics
                        </h4>
                        <p className="text-[rgb(var(--fg-rgb)/58%)] text-sm mt-1">
                            HackerRank • May 2025
                        </p>
                    </a>

                </div>

            </div>

        </section>
    );
}

export default Education;

