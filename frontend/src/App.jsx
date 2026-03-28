import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import TechStack from './components/TechStack';
import Education from './components/Education';
import Certificates from './components/Certificates';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';

// Root application component — assembles all portfolio sections
export default function App() {
  return (
    <div className="bg-black min-h-screen">
      {/* Sticky navigation bar */}
      <Navbar />

      {/* Main content sections */}
      <main>
        <Hero />
        <About />
        <Projects />
        <TechStack />
        <Education />
        <Certificates />
        <Contact />
      </main>

      <Footer />

      {/* Floating AI chatbot — always visible at bottom-right */}
      <Chatbot />
    </div>
  );
}
