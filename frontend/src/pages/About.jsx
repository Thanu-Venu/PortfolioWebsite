
function About() {
    return (
        <section id="About" className="js-reveal section-reveal px-6 md:px-20 py-20 border-t border-[rgb(var(--fg-rgb)/12%)] flex flex-col md:flex-row md:items-center gap-10 md:gap-14">
            {/* LEFT SIDE */}
            <div className="flex-1">

                <h2 className="text-3xl md:text-5xl font-bold mb-6 stagger-item" style={{ "--reveal-delay": "80ms" }}>
                    About Me
                </h2>

                <p className="stagger-item text-[rgb(var(--fg-rgb)/72%)] text-lg leading-relaxed max-w-xl rounded-2xl border border-[rgb(var(--fg-rgb)/10%)] bg-[rgb(var(--fg-rgb)/2%)] backdrop-blur-sm p-5 shadow-[inset_0_1px_0_rgb(var(--fg-rgb)/8%)] ui-interactive" style={{ "--reveal-delay": "160ms" }}>
                    I am a passionate Software Engineer with a strong interest in building
                    scalable applications and exploring AI-driven solutions. I enjoy working
                    on both frontend and backend technologies, creating seamless and efficient
                    user experiences.
                </p>

                <p className="stagger-item text-[rgb(var(--fg-rgb)/72%)] text-lg leading-relaxed mt-6 max-w-xl rounded-2xl border border-[rgb(var(--fg-rgb)/10%)] bg-[rgb(var(--fg-rgb)/2%)] backdrop-blur-sm p-5 shadow-[inset_0_1px_0_rgb(var(--fg-rgb)/8%)] ui-interactive" style={{ "--reveal-delay": "250ms" }}>
                    Currently, I am focusing on improving my skills in full-stack development
                    and learning more about machine learning and system design. I love solving
                    real-world problems through code and continuously pushing myself to learn
                    new technologies.
                </p>

            </div>

            <div className="flex-1 flex justify-center md:justify-end md:pr-2 lg:pr-6">
                <div className="relative w-56 h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 flex items-center justify-center stagger-item" style={{ "--reveal-delay": "220ms" }}>
                    <ProfileAura />
                    <div className="absolute inset-0 rounded-full bg-[rgb(var(--fg-rgb)/10%)] blur-2xl orbit-float orbit-float-delayed"></div>

                    <div className="relative z-10 p-[3px] rounded-full bg-[rgb(var(--bg-rgb))] border border-[rgb(var(--fg-rgb)/45%)] shadow-[0_0_30px_rgb(var(--fg-rgb)/35%)] orbit-float">
                        <img
                            src="/profile.jpg"
                            alt="Profile"
                            className="w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 object-cover rounded-full border border-[rgb(var(--fg-rgb)/55%)]"
                        />
                    </div>
                </div>
            </div>

        </section>
    );
}

function ProfileAura() {
    const spokeCount = 64;
    const spokes = Array.from({ length: spokeCount }, (_, i) => {
        const t = i / spokeCount;
        const angle = t * 360;
        // Alternate long/short spokes, then add uneven modulation to avoid uniformity.
        const isLong = i % 2 === 0;
        const waveA = Math.pow(Math.abs(Math.sin(t * Math.PI * 8)), 2);
        const waveB = Math.pow(Math.abs(Math.sin(t * Math.PI * 19)), 4);
        const base = isLong ? 28 : 10;
        const variance = isLong ? waveA * 18 + waveB * 6 : waveA * 7 + waveB * 3;
        const irregular = (i % 5 === 0 ? 4 : 0) - (i % 7 === 0 ? 2 : 0);
        const length = Math.max(8, base + variance + irregular);
        return { angle, length };
    });

    return (
        <svg
            viewBox="0 0 320 320"
            className="absolute -inset-10 md:-inset-12 lg:-inset-14 pointer-events-none opacity-90 orbit-float"
            aria-hidden="true"
        >
            <g transform="translate(160 160)">
                {spokes.map((spoke, i) => (
                    <line
                        key={i}
                        x1="0"
                        y1={-(118 + spoke.length)}
                        x2="0"
                        y2="-118"
                        stroke="rgba(255,255,255,0.9)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        transform={`rotate(${spoke.angle})`}
                    />
                ))}
            </g>
        </svg>
    );
}

export default About;

