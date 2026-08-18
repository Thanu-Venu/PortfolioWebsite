import { FaGithub } from "react-icons/fa";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const featuredProjects = [
    {
        title: "SwiftLogistics Middleware",
        description:
            "A scalable middleware system designed to integrate multiple logistics platforms such as CMS, ROS, and WMS using an event-driven microservices architecture. It focuses on asynchronous communication, reliability, and efficient system coordination.",
        stack: "FastAPI • RabbitMQ • Docker • React",
        href: "https://github.com/Thanu-Venu/SwiftLogistics_Middleware",
        details: [
            "Designed event-driven communication between multiple warehouse systems.",
            "Implemented queue-based workflows to reduce request bottlenecks.",
            "Containerized services with Docker for consistent deployment environments.",
        ],
        caseStudy: {
            overview:
                "This project was built to unify disconnected warehouse and order-management platforms under one reliable integration layer. The objective was to reduce manual syncing and improve data consistency across logistics operations.",
            challenge:
                "Each upstream system exposed different payload contracts and response patterns, which created brittle point-to-point integrations and frequent synchronization delays.",
            approach: [
                "Designed a message normalization layer so each service consumed a consistent internal schema.",
                "Introduced asynchronous processing queues to absorb traffic spikes and prevent downstream overload.",
                "Implemented retry and dead-letter strategies for failed deliveries to improve operational resilience.",
            ],
            architecture: [
                "FastAPI services for adapter endpoints and orchestration routes.",
                "RabbitMQ exchange routing for decoupled producer/consumer workflows.",
                "Dockerized service boundaries for repeatable local and staging deployments.",
            ],
            outcomes: [
                "Improved reliability of inter-system communication during high-volume windows.",
                "Reduced coupling between source systems and business logic services.",
                "Created a foundation for scaling integrations by adding adapters instead of rewriting the core.",
            ],
        },
    },
    {
        title: "Caretaker Management System",
        description:
            "A full-stack web application designed to connect clients with caretakers for services such as elder care, babysitting, and household support. The system includes role-based authentication, service booking, and management features.",
        stack: "PHP • MySQL • JavaScript",
        href: "https://github.com/Thanu-Venu/caretaker-management-system",
        details: [
            "Built role-based flows for clients, caretakers, and administrators.",
            "Added booking and availability logic for service scheduling.",
            "Structured relational database models for users, services, and requests.",
        ],
        caseStudy: {
            overview:
                "The platform was designed as a full service workflow from user onboarding to booking fulfillment, focusing on trust, discoverability, and scheduling clarity for both clients and caretakers.",
            challenge:
                "The primary challenge was balancing different user journeys while keeping the booking process straightforward and reducing scheduling conflicts.",
            approach: [
                "Mapped role-specific dashboards so each user group saw only relevant actions and data.",
                "Built service filtering and booking forms with validation to improve request quality.",
                "Introduced appointment-state transitions to track pending, accepted, and completed bookings.",
            ],
            architecture: [
                "PHP-based backend handling authentication and business rules.",
                "MySQL schema with relational links across users, services, and appointments.",
                "JavaScript-enhanced frontend interactions for smoother form and state feedback.",
            ],
            outcomes: [
                "Delivered a complete end-to-end booking cycle from discovery to confirmation.",
                "Made platform operations easier with clear role boundaries and status tracking.",
                "Provided a modular baseline that can be extended with payments and notifications.",
            ],
        },
    },
    {
        title: "DevFlow",
        description:
            "A full-stack task management platform with JWT-authenticated REST APIs, an automated Jest/Supertest test suite run in CI, and a GitHub Actions CI/CD pipeline that independently builds, tests, and deploys the frontend and backend. Instrumented with Prometheus and Grafana for live monitoring.",
        stack: "React • Node.js • MongoDB • Docker • GitHub Actions",
        href: "https://github.com/Thanu-Venu/devflow",
        details: [
            "Built JWT-authenticated REST APIs backed by an automated Jest/Supertest test suite run in CI.",
            "Set up a GitHub Actions CI/CD pipeline (lint, test, Docker build, deploy) with independent frontend/backend releases.",
            "Instrumented the Docker Compose stack with Prometheus metrics and Grafana dashboards for monitoring.",
        ],
        caseStudy: {
            overview:
                "DevFlow was built to explore a full DevOps lifecycle end to end — not just shipping features, but building the pipeline, automated tests, and observability around them on top of a real task-management product.",
            challenge:
                "Keeping the frontend and backend independently deployable while still guaranteeing every change passed automated tests and produced a working, monitorable build.",
            approach: [
                "Designed JWT-based authentication and per-user REST APIs across the Node/Express backend.",
                "Wrote an automated Jest/Supertest suite covering core API behavior and wired it into CI.",
                "Built a GitHub Actions pipeline that lints, tests, builds Docker images, and deploys the frontend and backend independently.",
            ],
            architecture: [
                "MERN stack (MongoDB, Express, React, Node.js) containerized with Docker Compose.",
                "GitHub Actions workflows for CI (test/lint) and CD (build and deploy to Render).",
                "Prometheus metrics scraping with Grafana dashboards for runtime visibility.",
            ],
            outcomes: [
                "Shipped a fully automated pipeline from commit to deployed build.",
                "Caught regressions before deployment via CI-enforced test runs.",
                "Gained hands-on experience with monitoring and observability, not just feature delivery.",
            ],
        },
    },
    {
        title: "Smart Home Monitoring & Control System",
        description:
            "A real-time smart-home platform pairing a native Android app with a React web simulator, sharing a single Firebase Realtime Database so device changes sync live across both clients. Includes per-device schedule automation and a safety-cutoff system.",
        stack: "Kotlin • Jetpack Compose • React • Firebase",
        href: "https://github.com/Thanu-Venu/smart-home-monitoring-system",
        details: [
            "Built a native Android app (Kotlin, Jetpack Compose, MVVM) and a React web simulator sharing one Firebase Realtime Database.",
            "Implemented per-device schedule automation and a safety-cutoff system that auto-disables devices past a configurable ON duration.",
            "Collaborated in a 3-member team on the shared data model, Firebase security rules, and real-time sync logic.",
        ],
        caseStudy: {
            overview:
                "This project explored real-time state synchronization across two very different clients — a native Android app and a web simulator — sharing one live data source, to model an actual IoT control system without physical hardware.",
            challenge:
                "Keeping device state consistent and instantly reflected across both clients, while preventing devices from being left on indefinitely or in conflicting states.",
            approach: [
                "Modeled devices and switches as Firebase Realtime Database nodes so both clients subscribe to the same live state.",
                "Implemented MVVM architecture on Android with Jetpack Compose for a reactive, declarative UI.",
                "Added schedule automation and a safety-cutoff watcher that auto-disables a device past a configurable ON duration.",
            ],
            architecture: [
                "Kotlin + Jetpack Compose native Android app following MVVM.",
                "React web simulator mirroring the same device state for cross-client testing.",
                "Firebase Realtime Database and Auth as the shared backend and security layer.",
            ],
            outcomes: [
                "Delivered live, bidirectional state sync between a mobile app and a web client.",
                "Reduced simulated device-safety risk with automated cutoff logic.",
                "Built real experience with Firebase security rules and multi-client real-time architecture.",
            ],
        },
    },
    {
        title: "Bank Turnover Analyzer",
        description:
            "A full-stack financial data pipeline that automatically ingests bank e-statements via the Gmail API, parses transactions from PDF statements into PostgreSQL, and presents monthly/yearly reporting through a React dashboard.",
        stack: "Python • FastAPI • PostgreSQL • React",
        href: "https://github.com/Thanu-Venu/bank-turnover-analysis",
        details: [
            "Built a pipeline that fetches bank e-statements via the Gmail API and parses transactions from PDF statements into PostgreSQL.",
            "Built a FastAPI backend and React dashboard for monthly/yearly reporting.",
            "Wrote dedicated audit, deduplication, and ownership-assignment scripts with documented verification steps.",
        ],
        caseStudy: {
            overview:
                "Built to turn a manual, error-prone process — reading bank statement PDFs by hand — into an automated pipeline running on real financial data.",
            challenge:
                "Bank statement PDFs vary in layout, and duplicate or misattributed transactions were a real risk once statements arrived automatically via email rather than manual entry.",
            approach: [
                "Automated statement retrieval directly from Gmail via the Gmail API instead of manual downloads.",
                "Built a PDF-parsing layer to extract transaction-level data into a structured PostgreSQL schema.",
                "Wrote dedicated audit and deduplication scripts to catch parsing errors and duplicate entries before they reached reports.",
            ],
            architecture: [
                "FastAPI and SQLAlchemy backend handling ingestion, parsing, and storage.",
                "PostgreSQL schema modeling accounts, statements, and transactions.",
                "React dashboard for monthly/yearly reporting and drill-down views.",
            ],
            outcomes: [
                "Replaced manual statement review with an automated ingestion pipeline.",
                "Improved data reliability through dedicated audit/deduplication tooling.",
                "Delivered a working reporting dashboard over real financial data.",
            ],
        },
    },
    {
        title: "Mini Compiler (C)",
        description:
            "A mini compiler implemented in C that performs lexical analysis, parsing, and semantic validation. It demonstrates core compiler design concepts including recursive descent parsing and structured error handling.",
        stack: "C • Compiler Design",
        href: "https://github.com/Thanu-Venu/mini-compiler-c",
        details: [
            "Implemented tokenization and grammar parsing using recursive descent techniques.",
            "Added semantic checks for variable usage and expression validity.",
            "Built error reporting flow to surface line-level parse issues.",
        ],
        caseStudy: {
            overview:
                "This compiler project focused on implementing the core phases of language processing in a structured and testable way, from lexical analysis through semantic validation.",
            challenge:
                "Keeping parser behavior predictable while preserving readable grammar logic and meaningful error messages required careful control over token flow and recovery rules.",
            approach: [
                "Defined token categories and lexical rules before implementing parser functions.",
                "Implemented recursive descent parsing aligned to grammar productions for maintainability.",
                "Added semantic validation passes for undeclared symbols and invalid expression types.",
            ],
            architecture: [
                "C modules separated by lexer, parser, symbol table, and semantic analyzer.",
                "Token stream interface shared between parser and semantic checks.",
                "Centralized error handling to report context with line-level precision.",
            ],
            outcomes: [
                "Demonstrated a complete educational compiler pipeline with clear phase boundaries.",
                "Improved debuggability through structured error output.",
                "Created a strong base for extending into intermediate code generation.",
            ],
        },
    },
    {
        title: "Pub/Sub Middleware",
        description:
            "A CLI-based publish-subscribe messaging system built using socket programming. It supports multiple clients with topic-based message routing and demonstrates real-time communication between distributed components.",
        stack: "Python • Socket Programming",
        href: "https://github.com/Thanu-Venu/pub_sub_assignment1",
        details: [
            "Created topic-based routing for publishers and subscribers.",
            "Managed concurrent client sessions with robust socket handling.",
            "Enabled near real-time delivery between distributed clients.",
        ],
        caseStudy: {
            overview:
                "The middleware explored real-time message distribution in a lightweight CLI environment, emphasizing reliable topic routing across concurrently connected clients.",
            challenge:
                "Handling client concurrency and preserving message delivery order across topics was difficult without introducing tight coupling between publishers and subscribers.",
            approach: [
                "Introduced topic registries to dynamically track active subscribers per channel.",
                "Implemented non-blocking socket interaction patterns for multi-client responsiveness.",
                "Separated connection handling from routing logic to simplify maintenance.",
            ],
            architecture: [
                "Python socket server managing client sessions and topic subscriptions.",
                "Routing module responsible for publish dispatch and subscriber fan-out.",
                "CLI clients for publisher/subscriber workflows with command parsing.",
            ],
            outcomes: [
                "Achieved consistent topic-based communication between distributed clients.",
                "Demonstrated core pub/sub patterns useful for larger event-driven systems.",
                "Provided a practical sandbox for networking, concurrency, and protocol design.",
            ],
        },
    },
    {
        title: "LUDO LIKE UCSC",
        description:
            "A console-based simulation of the classic Ludo board game implemented in C. It handles turn-based gameplay, dice rolling, piece movement, capturing logic, safe zones, and win conditions with dynamic mystery cell features.",
        stack: "C",
        href: "https://github.com/Thanu-Venu/LUDO-LIKE-UCSC",
        details: [
            "Modeled complete game rules including safe zones and capture mechanics.",
            "Built turn-based state management for multiple players and pieces.",
            "Added mystery-cell behavior to make gameplay outcomes dynamic.",
        ],
        caseStudy: {
            overview:
                "This project recreated a Ludo-style game loop in C with an emphasis on deterministic rule handling, board-state transitions, and replayable gameplay logic.",
            challenge:
                "The core challenge was implementing many interconnected game rules while keeping turn resolution predictable and avoiding state corruption after each move.",
            approach: [
                "Modeled board cells and piece positions as explicit state structures.",
                "Defined turn resolution rules for movement, captures, safe zones, and victory checks.",
                "Added mystery-cell events to introduce controlled unpredictability without breaking core rules.",
            ],
            architecture: [
                "C-based game engine with turn controller and board-state evaluators.",
                "Rule-check modules for captures, protection zones, and win conditions.",
                "CLI rendering loop for move prompts and game progress output.",
            ],
            outcomes: [
                "Delivered a complete playable simulation with robust turn handling.",
                "Improved confidence in complex state-machine implementation in C.",
                "Created an extensible codebase for adding AI players or richer UI later.",
            ],
        },
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
    const [expandedProjects, setExpandedProjects] = useState([]);
    const [allowMultipleExpanded, setAllowMultipleExpanded] = useState(false);
    const [activeCaseStudy, setActiveCaseStudy] = useState(null);

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

    useEffect(() => {
        const handleEsc = (event) => {
            if (event.key === "Escape") {
                setActiveCaseStudy(null);
            }
        };

        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, []);

    useEffect(() => {
        if (!activeCaseStudy) return undefined;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, [activeCaseStudy]);

    const scrollLeft = () => setIndex((prev) => Math.max(Math.min(prev, maxIndex) - 1, 0));
    const scrollRight = () => setIndex((prev) => Math.min(Math.min(prev, maxIndex) + 1, maxIndex));

    const toggleExpandMode = () => {
        setAllowMultipleExpanded((prevMode) => {
            const nextMode = !prevMode;
            if (!nextMode) {
                setExpandedProjects((prevExpanded) => (prevExpanded.length ? [prevExpanded[0]] : []));
            }
            return nextMode;
        });
    };

    const toggleExpandedProject = (title) => {
        setExpandedProjects((prev) => {
            const isOpen = prev.includes(title);
            if (allowMultipleExpanded) {
                return isOpen ? prev.filter((item) => item !== title) : [...prev, title];
            }
            return isOpen ? [] : [title];
        });
    };

    const caseStudyModal = activeCaseStudy && typeof document !== "undefined"
        ? createPortal(
            <div
                className="case-study-overlay fixed inset-0 z-[95] flex items-center justify-center bg-black/72 p-3 md:p-6 backdrop-blur-sm"
                role="dialog"
                aria-modal="true"
                aria-label={`${activeCaseStudy.title} case study`}
                onClick={() => setActiveCaseStudy(null)}
            >
                <div
                    className="case-study-panel w-full max-w-3xl rounded-2xl border border-white/20 bg-[#0a0a0a] shadow-[0_24px_80px_rgba(0,0,0,0.62)] max-h-[90vh] overflow-hidden"
                    onClick={(event) => event.stopPropagation()}
                >
                    <div className="flex items-start justify-between gap-3 border-b border-white/10 px-5 py-4 md:px-6 md:py-5">
                        <div>
                            <p className="text-[10px] uppercase tracking-[0.14em] text-[color:var(--accent-gold)] mb-1">Case Study</p>
                            <h4 className="text-xl md:text-2xl font-semibold text-white leading-tight">{activeCaseStudy.title}</h4>
                        </div>
                        <button
                            type="button"
                            onClick={() => setActiveCaseStudy(null)}
                            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-gray-300 hover:text-white hover:border-white ui-interactive"
                            aria-label="Close case study"
                        >
                            ×
                        </button>
                    </div>

                    <div className="case-study-scroll overflow-y-auto max-h-[64vh] px-5 py-4 md:px-6 md:py-5 overscroll-contain">
                        <p className="mb-4 text-sm text-gray-300 leading-relaxed">{activeCaseStudy.caseStudy.overview}</p>
                        <p className="mb-5 text-xs font-medium tracking-[0.08em] uppercase text-gray-400">{activeCaseStudy.stack}</p>

                        <div className="space-y-5 text-sm text-gray-200">
                            <div className="case-section">
                                <p className="mb-2 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-[color:var(--accent-gold)]">
                                    <svg
                                        viewBox="0 0 20 20"
                                        className="h-3.5 w-3.5"
                                        aria-hidden="true"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.7"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <circle cx="10" cy="10" r="7" />
                                        <path d="M10 6.5v4.3" />
                                        <circle cx="10" cy="13.8" r="0.7" fill="currentColor" stroke="none" />
                                    </svg>
                                    Challenge
                                </p>
                                <p className="leading-relaxed text-gray-300">{activeCaseStudy.caseStudy.challenge}</p>
                            </div>

                            <div className="case-section">
                                <p className="mb-2 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-[color:var(--accent-gold)]">
                                    <svg
                                        viewBox="0 0 20 20"
                                        className="h-3.5 w-3.5"
                                        aria-hidden="true"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.7"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M4 10h12" />
                                        <path d="m10 4 6 6-6 6" />
                                    </svg>
                                    Implementation Approach
                                </p>
                                <ul className="space-y-2 border-l border-white/20 pl-3 text-gray-200">
                                    {activeCaseStudy.caseStudy.approach.map((item) => (
                                        <li key={item} className="leading-relaxed">{item}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="case-section">
                                <p className="mb-2 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-[color:var(--accent-gold)]">
                                    <svg
                                        viewBox="0 0 20 20"
                                        className="h-3.5 w-3.5"
                                        aria-hidden="true"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.7"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <rect x="4" y="4" width="12" height="12" rx="1.8" />
                                        <path d="M10 4v12" />
                                        <path d="M4 10h12" />
                                    </svg>
                                    Architecture Highlights
                                </p>
                                <ul className="space-y-2 border-l border-white/20 pl-3 text-gray-200">
                                    {activeCaseStudy.caseStudy.architecture.map((item) => (
                                        <li key={item} className="leading-relaxed">{item}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="case-section">
                                <p className="mb-2 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-[color:var(--accent-gold)]">
                                    <svg
                                        viewBox="0 0 20 20"
                                        className="h-3.5 w-3.5"
                                        aria-hidden="true"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.7"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M4 10h12" />
                                        <path d="M10 4v12" />
                                        <path d="m5 12 3 3 7-7" />
                                    </svg>
                                    Outcomes
                                </p>
                                <ul className="space-y-2 border-l border-white/20 pl-3 text-gray-200">
                                    {activeCaseStudy.caseStudy.outcomes.map((item) => (
                                        <li key={item} className="leading-relaxed">{item}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-3 border-t border-white/10 px-5 py-4 md:px-6 md:py-5">
                        <button
                            type="button"
                            onClick={() => setActiveCaseStudy(null)}
                            className="rounded-full border border-white/20 px-4 py-2 text-xs uppercase tracking-[0.12em] text-gray-300 hover:text-white hover:border-white ui-interactive"
                        >
                            Close
                        </button>
                        <a
                            href={activeCaseStudy.href}
                            target="_blank"
                            rel="noreferrer"
                            className="rounded-full border border-[color:var(--accent-gold)] bg-[color:var(--accent-gold)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-black hover:bg-[#d4b97e] ui-interactive"
                        >
                            Open Repository
                        </a>
                    </div>
                </div>
            </div>,
            document.body
        )
        : null;

    return (
        <>
            <section id="Projects" className="js-reveal section-reveal min-h-screen px-6 md:px-20 py-20 border-t border-gray-700/40 backdrop-blur-sm">
                <div className="mb-12 stagger-item" style={{ "--reveal-delay": "60ms" }}>
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">Projects</h2>
                    <div className="h-1 w-20 rounded-full accent-line"></div>
                </div>

                <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between stagger-item" style={{ "--reveal-delay": "120ms" }}>
                    <h3 className="text-2xl font-bold text-gray-100">Featured Projects</h3>
                    <button
                        type="button"
                        onClick={toggleExpandMode}
                        className="w-fit rounded-full border border-white/20 bg-white/[0.03] px-4 py-2 text-xs uppercase tracking-[0.12em] text-gray-300 hover:border-white/40 hover:text-white ui-interactive"
                        aria-pressed={allowMultipleExpanded}
                    >
                        {allowMultipleExpanded ? "Mode: Multiple Open" : "Mode: Single Open"}
                    </button>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-20">
                    {featuredProjects.map((project, i) => {
                        const isExpanded = expandedProjects.includes(project.title);
                        return (
                            <div
                                key={project.title}
                                className="group stagger-item border border-gray-700/50 p-6 rounded-xl hover:border-gray-300/60 bg-gradient-to-br from-gray-900/50 to-gray-800/30 hover:from-gray-800/70 hover:to-gray-700/50 hover:shadow-glow backdrop-blur-sm ui-interactive"
                                style={{ "--reveal-delay": `${180 + i * 70}ms` }}
                            >
                                <h4 className="text-xl font-semibold mb-3 text-gray-100 group-hover:text-white transition">
                                    {project.title}
                                </h4>

                                <p className="text-gray-300 mb-4 leading-relaxed text-sm">{project.description}</p>

                                <p className="text-xs text-gray-300 mb-4 font-medium">{project.stack}</p>

                                <div
                                    id={`project-details-${i}`}
                                    className="overflow-hidden transition-all duration-300"
                                    style={{ maxHeight: isExpanded ? "260px" : "0px", opacity: isExpanded ? 1 : 0 }}
                                >
                                    <ul className="mb-4 space-y-2 text-sm text-gray-300/95 border-l border-white/20 pl-3">
                                        {project.details.map((detail) => (
                                            <li key={detail} className="leading-relaxed">{detail}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="mb-4">
                                    <button
                                        type="button"
                                        onClick={() => toggleExpandedProject(project.title)}
                                        className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] border border-white/30 rounded-full px-3 py-1.5 text-gray-200 hover:text-white hover:border-white ui-interactive"
                                        aria-expanded={isExpanded}
                                        aria-controls={`project-details-${i}`}
                                    >
                                        {isExpanded ? "Hide Details" : "More Details"}
                                        <svg
                                            viewBox="0 0 20 20"
                                            aria-hidden="true"
                                            className={`h-3.5 w-3.5 transition-transform duration-300 ${isExpanded ? "rotate-180" : "rotate-0"}`}
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.8"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="m5 8 5 5 5-5" />
                                        </svg>
                                    </button>
                                </div>

                                <div className="flex items-center gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setActiveCaseStudy(project)}
                                        className="inline-flex items-center rounded-full border border-[color:var(--accent-gold-soft)] px-3 py-1.5 text-xs uppercase tracking-[0.12em] text-[color:var(--accent-gold)] hover:border-[color:var(--accent-gold)] hover:bg-[color:var(--accent-gold-soft)]/20 ui-interactive"
                                    >
                                        View Case Study
                                    </button>

                                    <a
                                        href={project.href}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-gray-600 text-white group-hover:border-white hover:bg-white hover:text-black hover:shadow-glow ui-interactive"
                                    >
                                        <FaGithub size={18} />
                                    </a>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <h3 className="text-2xl font-bold mb-8 text-gray-100 stagger-item" style={{ "--reveal-delay": "320ms" }}>Mini Projects</h3>

                <div className="relative mx-auto mb-20 w-full max-w-[320px] px-2 sm:max-w-none sm:px-14 stagger-item" style={{ "--reveal-delay": "380ms" }}>
                    <button
                        onClick={scrollLeft}
                        disabled={clampedIndex === 0}
                        className="absolute left-0 top-1/2 -translate-y-1/2 bg-black border border-gray-500 px-3 py-2 z-10 hover:bg-white hover:text-black hover:border-white disabled:opacity-30 disabled:cursor-not-allowed shadow-glow text-white font-bold ui-interactive"
                    >
                        ←
                    </button>

                    <div
                        className="overflow-hidden mx-auto"
                        style={{ width: `${visibleCards * miniCardWidth + (visibleCards - 1) * cardGap}px` }}
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
                    </div>

                    <button
                        onClick={scrollRight}
                        disabled={clampedIndex === maxIndex}
                        className="absolute right-0 top-1/2 -translate-y-1/2 bg-black border border-gray-500 px-3 py-2 z-10 hover:bg-white hover:text-black hover:border-white disabled:opacity-30 disabled:cursor-not-allowed shadow-glow text-white font-bold ui-interactive"
                    >
                        →
                    </button>
                </div>

            </section>
            {caseStudyModal}
        </>
    );
}

export default Projects;
