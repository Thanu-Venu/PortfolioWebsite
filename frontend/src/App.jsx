import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import TechStack from "./pages/TechStack";
import Contact from "./pages/Contact";
import Education from "./pages/Education";
import FloatingChatButton from "./components/FloatingChatButton";

function App() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobileViewport = window.matchMedia("(max-width: 768px)").matches;
    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const shouldFastReveal = isMobileViewport || isCoarsePointer;

    if (prefersReducedMotion) {
      setScrollProgress(100);
      document.querySelectorAll(".js-reveal").forEach((node) => node.classList.add("is-visible"));
      return;
    }

    let rafId = 0;

    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progress = height > 0 ? Math.min((scrollTop / height) * 100, 100) : 0;
        setScrollProgress(progress);
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    if (shouldFastReveal) {
      document.querySelectorAll(".js-reveal").forEach((node) => node.classList.add("is-visible"));
      return () => {
        cancelAnimationFrame(rafId);
        window.removeEventListener("scroll", handleScroll);
      };
    }

    const revealElements = document.querySelectorAll(".js-reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.16,
        rootMargin: "0px 0px -12% 0px",
      }
    );

    revealElements.forEach((item) => observer.observe(item));

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="relative bg-black text-white min-h-screen overflow-hidden">
      <div className="scroll-progress-wrap" aria-hidden="true">
        <span className="scroll-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(255,255,255,0.09),transparent_35%),radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.06),transparent_30%),linear-gradient(to_bottom,#040404,#0a0a0a_40%,#070707)]"></div>
        <div className="absolute inset-0 opacity-[0.08] [background-image:radial-gradient(#ffffff_0.7px,transparent_0.7px)] [background-size:3px_3px]"></div>
        <div className="ambient-orb ambient-orb-a"></div>
        <div className="ambient-orb ambient-orb-b"></div>
      </div>
      <Navbar />
      <Home />
      <About />
      <Projects />
      <TechStack />
      <Education />
      <Contact />
      <FloatingChatButton />
    </div>
  );
}

export default App;