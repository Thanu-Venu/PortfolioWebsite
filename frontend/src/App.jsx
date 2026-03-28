import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import TechStack from "./pages/TechStack";
import Contact from "./pages/Contact";
import Education from "./pages/Education";
function App() {
  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />
      <Home />
      <About />
      <Projects />
      <TechStack />
      <Education />
      <Contact />

    </div>
  );
}

export default App;