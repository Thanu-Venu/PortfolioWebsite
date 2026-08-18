import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

function Contact() {
    return (
        <section id="Contact" className="js-reveal section-reveal min-h-screen px-6 md:px-20 py-20 border-t border-[rgb(var(--fg-rgb)/12%)] flex flex-col justify-center items-center text-center">

            <h2 className="text-3xl md:text-5xl font-bold mb-6 stagger-item" style={{ "--reveal-delay": "60ms" }}>
                Contact
            </h2>

            <div className="h-1 w-20 rounded-full accent-line mb-8 stagger-item" style={{ "--reveal-delay": "120ms" }}></div>

            <p className="text-[rgb(var(--fg-rgb)/72%)] mb-10 max-w-xl rounded-2xl border border-[rgb(var(--fg-rgb)/10%)] bg-[rgb(var(--fg-rgb)/2%)] backdrop-blur-sm px-6 py-5 shadow-[inset_0_1px_0_rgb(var(--fg-rgb)/8%)] ui-interactive stagger-item" style={{ "--reveal-delay": "200ms" }}>
                Feel free to reach out if you'd like to collaborate, discuss a project, or just connect.
            </p>

            {/* ICON LINKS */}
            <div className="flex gap-6 stagger-item" style={{ "--reveal-delay": "280ms" }}>

                <a
                    href="mailto:thanu.venu28@gmail.com"
                    className="w-12 h-12 flex items-center justify-center border border-[rgb(var(--fg-rgb)/16%)] bg-[rgb(var(--fg-rgb)/3%)] backdrop-blur-sm rounded-full hover:bg-[rgb(var(--fg-rgb))] hover:text-[rgb(var(--bg-rgb))] hover:border-[rgb(var(--fg-rgb))] hover:shadow-[0_0_18px_rgb(var(--fg-rgb)/35%)] ui-interactive"
                >
                    <FaEnvelope size={18} />
                </a>

                <a
                    href="https://github.com/Thanu-Venu"
                    target="_blank"
                    rel="noreferrer"
                    className="w-12 h-12 flex items-center justify-center border border-[rgb(var(--fg-rgb)/16%)] bg-[rgb(var(--fg-rgb)/3%)] backdrop-blur-sm rounded-full hover:bg-[rgb(var(--fg-rgb))] hover:text-[rgb(var(--bg-rgb))] hover:border-[rgb(var(--fg-rgb))] hover:shadow-[0_0_18px_rgb(var(--fg-rgb)/35%)] ui-interactive"
                >
                    <FaGithub size={18} />
                </a>

                <a
                    href="https://www.linkedin.com/in/thanushya-venugoban/"
                    target="_blank"
                    rel="noreferrer"
                    className="w-12 h-12 flex items-center justify-center border border-[rgb(var(--fg-rgb)/16%)] bg-[rgb(var(--fg-rgb)/3%)] backdrop-blur-sm rounded-full hover:bg-[rgb(var(--fg-rgb))] hover:text-[rgb(var(--bg-rgb))] hover:border-[rgb(var(--fg-rgb))] hover:shadow-[0_0_18px_rgb(var(--fg-rgb)/35%)] ui-interactive"
                >
                    <FaLinkedin size={18} />
                </a>

            </div>

        </section>
    );
}

export default Contact;