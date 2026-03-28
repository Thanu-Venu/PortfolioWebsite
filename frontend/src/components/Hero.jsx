import { ArrowDown, Code2, Globe, Mail } from 'lucide-react';

// Hero section — the first thing visitors see
export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-center items-center text-center bg-black px-6 pt-20"
    >
      {/* Greeting badge */}
      <span className="text-xs tracking-[0.3em] text-gray-500 uppercase mb-4">
        👋 Welcome to my portfolio
      </span>

      {/* Name */}
      <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-4">
        Thanu Venu
      </h1>

      {/* Title */}
      <p className="text-lg md:text-2xl text-gray-400 font-light mb-4">
        Full-Stack Developer &amp; AI Enthusiast
      </p>

      {/* Short intro */}
      <p className="max-w-xl text-gray-500 text-sm md:text-base leading-relaxed mb-10">
        I build modern, performant web applications and love integrating AI into
        real-world products. Open to collaborations and exciting opportunities.
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-wrap gap-4 justify-center mb-12">
        <a
          href="#projects"
          className="px-6 py-3 bg-white text-black text-sm font-semibold rounded-full hover:bg-gray-200 transition"
        >
          View Projects
        </a>
        <a
          href="#contact"
          className="px-6 py-3 border border-white/30 text-white text-sm font-semibold rounded-full hover:border-white transition"
        >
          Get In Touch
        </a>
      </div>

      {/* Social Icons */}
      <div className="flex gap-6 mb-16">
        <a
          href="https://github.com/"
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
          className="text-gray-500 hover:text-white transition"
        >
          <Code2 size={20} />
        </a>
        <a
          href="https://linkedin.com/"
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn"
          className="text-gray-500 hover:text-white transition"
        >
          <Globe size={20} />
        </a>
        <a
          href="mailto:hello@example.com"
          aria-label="Email"
          className="text-gray-500 hover:text-white transition"
        >
          <Mail size={20} />
        </a>
      </div>

      {/* Scroll hint */}
      <a
        href="#about"
        className="text-gray-600 hover:text-gray-400 transition animate-bounce"
        aria-label="Scroll down"
      >
        <ArrowDown size={24} />
      </a>
    </section>
  );
}
