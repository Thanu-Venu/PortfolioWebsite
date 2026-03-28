import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

function Contact() {
    return (
        <div className="min-h-screen px-6 md:px-20 py-20 border-t border-gray-800 flex flex-col justify-center items-center text-center">

            <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Contact
            </h2>

            <p className="text-gray-400 mb-10 max-w-xl">
                Feel free to reach out if you'd like to collaborate, discuss a project, or just connect.
            </p>

            {/* ICON LINKS */}
            <div className="flex gap-6">

                <a
                    href="mailto:your-email@gmail.com"
                    className="w-12 h-12 flex items-center justify-center border border-gray-700 rounded-full hover:bg-white hover:text-black transition duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.5)]"
                >
                    <FaEnvelope size={18} />
                </a>

                <a
                    href="https://github.com/your-username"
                    target="_blank"
                    className="w-12 h-12 flex items-center justify-center border border-gray-700 rounded-full hover:bg-white hover:text-black transition duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.5)]"
                >
                    <FaGithub size={18} />
                </a>

                <a
                    href="https://linkedin.com/in/your-profile"
                    target="_blank"
                    className="w-12 h-12 flex items-center justify-center border border-gray-700 rounded-full hover:bg-white hover:text-black transition duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.5)]"
                >
                    <FaLinkedin size={18} />
                </a>

            </div>

        </div>
    );
}

export default Contact;