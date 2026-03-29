import { FaGithub } from "react-icons/fa";
import { useEffect, useState } from "react";

const featuredProjects = [
    {
        title: "SwiftLogistics Middleware",
        description:
            "A scalable middleware system designed to integrate multiple logistics platforms such as CMS, ROS, and WMS using an event-driven microservices architecture. It focuses on asynchronous communication, reliability, and efficient system coordination.",
        stack: "FastAPI • RabbitMQ • Docker • React",
        href: "https://github.com/Thanu-Venu/SwiftLogistics_Middleware",
    },
    {
        title: "Caretaker Management System",
        description:
            "A full-stack web application designed to connect clients with caretakers for services such as elder care, babysitting, and household support. The system includes role-based authentication, service booking, and management features.",
        stack: "PHP • MySQL • JavaScript",
        href: "https://github.com/Thanu-Venu/caretaker-management-system",
    },
    {
        title: "Mini Compiler (C)",
        description:
            "A mini compiler implemented in C that performs lexical analysis, parsing, and semantic validation. It demonstrates core compiler design concepts including recursive descent parsing and structured error handling.",
        stack: "C • Compiler Design",
        href: "https://github.com/Thanu-Venu/mini-compiler-c",
    },
    {
        title: "Pub/Sub Middleware",
        description:
            "A CLI-based publish-subscribe messaging system built using socket programming. It supports multiple clients with topic-based message routing and demonstrates real-time communication between distributed components.",
        stack: "Python • Socket Programming",
        href: "https://github.com/Thanu-Venu/pub_sub_assignment1",
    },
    {
        title: "LUDO LIKE UCSC",
        description:
            "A console-based simulation of the classic Ludo board game implemented in C. It handles turn-based gameplay, dice rolling, piece movement, capturing logic, safe zones, and win conditions with dynamic mystery cell features.",
        stack: "C",
        href: "https://github.com/Thanu-Venu/LUDO-LIKE-UCSC",
    },
];

const miniProjects = [
    {
        title: "30-Day Web Dev Challenge",
        subtitle: "Daily frontend mini builds",
        image: "/mini0.png",
        href: "https://github.com/Thanu-Venu/mini-projects",
    },
    {
        title: "Weather App",
        subtitle: "API-based weather app",
        image: "/mini1.png",
        href: "https://github.com/Thanu-Venu/weather_App",
    },
    {
        title: "Login System",
        subtitle: "Responsive login and registration UI",
        image: "/login.png",
        href: "https://github.com/Thanu-Venu/LOGINFORM",
    },
    {
        title: "To-Do App",
        subtitle: "Task manager app",
        image: "/mini2.png",
        href: "https://github.com/Thanu-Venu/To-Do-app",
    },
    {
        title: "Digital Clock",
        subtitle: "Real-time clock UI",
        image: "/mini3.png",
        href: "https://github.com/Thanu_Venu/Digital-clock",
    },
    {
        title: "Task Manager",
        subtitle: "Manage daily tasks",
        image: "/mini4.png",
        href: "https://github.com/Thanu_Venu/Task-Manager",
    },
];

function Projects() {
    const [index, setIndex] = useState(0);

    const getVisibleCards = () => {
        if (window.innerWidth >= 1024) return 4;
        if (window.innerWidth >= 640) return 2;
        return 1;
    };

    const [visibleCards, setVisibleCards] = useState(getVisibleCards);
    const miniCardWidth = 232;
    const cardGap = 16;
    const cardStep = miniCardWidth + cardGap;
    const maxIndex = Math.max(miniProjects.length - visibleCards, 0);
    const clampedIndex = Math.min(index, maxIndex);

    useEffect(() => {
        const handleResize = () => setVisibleCards(getVisibleCards());
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const scrollLeft = () => setIndex((prev) => Math.max(Math.min(prev, maxIndex) - 1, 0));
    const scrollRight = () => setIndex((prev) => Math.min(Math.min(prev, maxIndex) + 1, maxIndex));

    return (
        <section id="Projects" className="min-h-screen px-6 md:px-20 py-20 border-t border-gray-700/40 backdrop-blur-sm reveal">
            <div className="mb-12">
                <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">Projects</h2>
                <div className="h-1 w-20 rounded-full accent-line"></div>
            </div>

            <h3 className="text-2xl font-bold mb-8 text-gray-100">Featured Projects</h3>

            <div className="grid md:grid-cols-2 gap-8 mb-20">
                {featuredProjects.map((project) => (
                    <div
                        key={project.title}
                        className="group border border-gray-700/50 p-6 rounded-xl hover:border-gray-300/60 bg-gradient-to-br from-gray-900/50 to-gray-800/30 hover:from-gray-800/70 hover:to-gray-700/50 hover:shadow-glow backdrop-blur-sm ui-interactive"
                    >
                        <h4 className="text-xl font-semibold mb-3 text-gray-100 group-hover:text-white transition">
                            {project.title}
                        </h4>

                        <p className="text-gray-300 mb-4 leading-relaxed text-sm">{project.description}</p>

                        <p className="text-xs text-gray-300 mb-4 font-medium">{project.stack}</p>

                        <a
                            href={project.href}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-gray-600 text-white group-hover:border-white hover:bg-white hover:text-black hover:shadow-glow ui-interactive"
                        >
                            <FaGithub size={18} />
                        </a>
                    </div>
                ))}
            </div>

            <h3 className="text-2xl font-bold mb-8 text-gray-100">Mini Projects</h3>

            <div className="relative px-12 sm:px-14 mb-20">
                <button
                    onClick={scrollLeft}
                    disabled={clampedIndex === 0}
                    className="absolute left-2 sm:left-0 top-1/2 -translate-y-1/2 bg-black border border-gray-500 px-3 py-2 z-10 hover:bg-white hover:text-black hover:border-white disabled:opacity-30 disabled:cursor-not-allowed shadow-glow text-white font-bold ui-interactive"
                >
                    ←
                </button>

                <div
                    className="overflow-hidden mx-auto"
                    style={{ maxWidth: `${visibleCards * miniCardWidth + (visibleCards - 1) * cardGap}px` }}
                >
                    <div
                        className="flex gap-4 transition-transform duration-500"
                        style={{ transform: `translateX(-${clampedIndex * cardStep}px)` }}
                    >
                        {miniProjects.map((project) => (
                            <div
                                key={project.title}
                                className="w-[232px] shrink-0 border border-gray-700/50 p-4 rounded-xl hover:scale-105 bg-gradient-to-br from-gray-900/50 to-gray-800/30 hover:shadow-glow hover:border-white/60 group backdrop-blur-sm ui-interactive"
                            >
                                <div className="overflow-hidden rounded-lg mb-3 relative h-30">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                                    />
                                </div>
                                <h4 className="text-sm font-semibold text-gray-100 group-hover:text-white transition">
                                    {project.title}
                                </h4>
                                <p className="text-gray-500 text-xs mt-1">{project.subtitle}</p>
                                <div className="flex justify-end mt-2">
                                    <a
                                        href={project.href}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-gray-600 text-white hover:border-white hover:bg-white hover:text-black ui-interactive"
                                    >
                                        <FaGithub size={14} />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={scrollRight}
                        disabled={clampedIndex === maxIndex}
                        className="absolute right-2 sm:right-0 top-1/2 -translate-y-1/2 bg-black border border-gray-500 px-3 py-2 z-10 hover:bg-white hover:text-black hover:border-white disabled:opacity-30 disabled:cursor-not-allowed shadow-glow text-white font-bold ui-interactive"
                    >
                        →
                    </button>
                </div>
            </div>
        </section>
    );
}

export default Projects;
