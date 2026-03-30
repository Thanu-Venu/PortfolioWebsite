import { FaReact, FaPython, FaDocker, FaGitAlt, FaNodeJs, FaLinux, FaCss3Alt } from "react-icons/fa";
import { SiJavascript, SiTailwindcss, SiMysql, SiPostgresql, SiFigma, SiPhp, SiJquery, SiHtml5, SiNginx } from "react-icons/si";
import { VscCode } from "react-icons/vsc";

function TechStack() {
    return (
        <section id="TechStack" className="js-reveal section-reveal min-h-screen px-6 md:px-20 py-20 border-t border-gray-800/80">

            <h2 className="text-3xl md:text-5xl font-bold mb-12 tracking-tight stagger-item" style={{ "--reveal-delay": "60ms" }}>
                Tech Stack
            </h2>

            <div className="h-1 w-20 rounded-full accent-line mb-10 stagger-item" style={{ "--reveal-delay": "120ms" }}></div>

            <div className="grid md:grid-cols-2 gap-8">

                {/* ===== Programming ===== */}
                <div className="stagger-item rounded-2xl border border-gray-800 bg-black/30 p-6 backdrop-blur-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] ui-interactive" style={{ "--reveal-delay": "180ms" }}>
                    <h3 className="text-xl font-semibold mb-5 tracking-wide">Programming</h3>
                    <div className="flex flex-wrap gap-4">
                        {[
                            { icon: <FaPython />, name: "Python" },
                            { icon: <SiJavascript />, name: "JavaScript" },
                            { icon: <SiPhp />, name: "PHP" },
                            { icon: <SiJquery />, name: "jQuery" },
                            { icon: <span className="font-bold">C</span>, name: "C" },
                        ].map((tech, i) => (
                            <Card key={i} tech={tech} />
                        ))}
                    </div>
                </div>

                {/* ===== Frontend ===== */}
                <div className="stagger-item rounded-2xl border border-gray-800 bg-black/30 p-6 backdrop-blur-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] ui-interactive" style={{ "--reveal-delay": "250ms" }}>
                    <h3 className="text-xl font-semibold mb-5 tracking-wide">Frontend</h3>
                    <div className="flex flex-wrap gap-4">
                        {[
                            { icon: <SiHtml5 />, name: "HTML" },
                            { icon: <FaCss3Alt />, name: "CSS" },
                            { icon: <SiJavascript />, name: "JavaScript" },
                            { icon: <FaReact />, name: "React" },
                            { icon: <SiTailwindcss />, name: "Tailwind" },
                        ].map((tech, i) => (
                            <Card key={i} tech={tech} />
                        ))}
                    </div>
                </div>

                {/* ===== Backend ===== */}
                <div className="stagger-item rounded-2xl border border-gray-800 bg-black/30 p-6 backdrop-blur-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] ui-interactive" style={{ "--reveal-delay": "320ms" }}>
                    <h3 className="text-xl font-semibold mb-5 tracking-wide">Backend</h3>
                    <div className="flex flex-wrap gap-4">
                        {[
                            { icon: <FaPython />, name: "Python" },
                            { icon: <FaNodeJs />, name: "Node.js" },
                            { icon: <SiPhp />, name: "PHP" },
                            { icon: <FaPython />, name: "FastAPI" },
                        ].map((tech, i) => (
                            <Card key={i} tech={tech} />
                        ))}
                    </div>
                </div>

                {/* ===== Databases ===== */}
                <div className="stagger-item rounded-2xl border border-gray-800 bg-black/30 p-6 backdrop-blur-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] ui-interactive" style={{ "--reveal-delay": "390ms" }}>
                    <h3 className="text-xl font-semibold mb-5 tracking-wide">Databases</h3>
                    <div className="flex flex-wrap gap-4">
                        {[
                            { icon: <SiMysql />, name: "MySQL" },
                            { icon: <SiPostgresql />, name: "PostgreSQL" },
                        ].map((tech, i) => (
                            <Card key={i} tech={tech} />
                        ))}
                    </div>
                </div>

                {/* ===== DevOps ===== */}
                <div className="stagger-item rounded-2xl border border-gray-800 bg-black/30 p-6 backdrop-blur-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] md:col-span-2 ui-interactive" style={{ "--reveal-delay": "460ms" }}>
                    <h3 className="text-xl font-semibold mb-5 tracking-wide">DevOps & Tools</h3>
                    <div className="flex flex-wrap gap-4">
                        {[
                            { icon: <FaDocker />, name: "Docker" },
                            { icon: <FaGitAlt />, name: "Git" },
                            { icon: <FaGitAlt />, name: "GitHub" },
                            { icon: <FaLinux />, name: "Linux" },
                            { icon: <VscCode />, name: "VS Code" },
                            { icon: <SiNginx />, name: "Nginx" },
                            { icon: <SiFigma />, name: "Figma" },
                        ].map((tech, i) => (
                            <Card key={i} tech={tech} />
                        ))}
                    </div>
                </div>

            </div>

        </section>
    );
}

function Card({ tech }) {
    return (
        <div className="flex flex-col items-center">
            <div className="w-16 h-16 flex items-center justify-center bg-gray-950 rounded-xl border border-gray-700 hover:scale-105 hover:border-white hover:shadow-[0_0_18px_rgba(255,255,255,0.25)] text-2xl ui-interactive">
                {tech.icon}
            </div>
            <p className="text-xs text-gray-300 mt-2 tracking-wide">{tech.name}</p>
        </div>
    );
}

export default TechStack;
