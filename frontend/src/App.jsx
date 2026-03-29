import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import TechStack from "./pages/TechStack";
import Contact from "./pages/Contact";
import Education from "./pages/Education";
import FloatingChatButton from "./components/FloatingChatButton";
function App() {
  return (
    <div className="relative bg-black text-white min-h-screen overflow-hidden">
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