import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import TechStack from "./pages/TechStack";
import Contact from "./pages/Contact";
import Education from "./pages/Education";
import FloatingChatButton from "./components/FloatingChatButton";

function getInitialScrollProgress() {
  if (typeof window === "undefined") return 0;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  return prefersReducedMotion ? 100 : 0;
}

function App() {
  const [scrollProgress, setScrollProgress] = useState(getInitialScrollProgress);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobileViewport = window.matchMedia("(max-width: 768px)").matches;
    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const shouldFastReveal = isMobileViewport || isCoarsePointer;

    if (prefersReducedMotion) {
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

    if (shouldFastReveal) {
      document.querySelectorAll(".js-reveal").forEach((node) => node.classList.add("is-visible"));
      return () => cancelAnimationFrame(rafId);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

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
    <div className="relative bg-[rgb(var(--bg-rgb))] text-[rgb(var(--fg-rgb))] min-h-screen overflow-hidden">
      <div className="scroll-progress-wrap" aria-hidden="true">
        <span className="scroll-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="page-ambient-gradient absolute inset-0"></div>
        <div className="page-ambient-dots absolute inset-0 [background-size:3px_3px]"></div>
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