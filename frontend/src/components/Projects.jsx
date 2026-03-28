import { Code2, ExternalLink } from 'lucide-react';

// Project data — update this array to add/edit your projects
const PROJECTS = [
  {
    title: 'AI Portfolio Chatbot',
    description:
      'A personal portfolio site with an integrated AI chatbot that answers visitor questions about skills, projects, and experience in real time.',
    tech: ['React', 'Vite', 'Tailwind CSS', 'FastAPI', 'Python'],
    github: 'https://github.com/',
    demo: '#',
  },
  {
    title: 'Task Management App',
    description:
      'A full-stack productivity app with real-time updates, drag-and-drop task boards, user authentication, and role-based access control.',
    tech: ['Next.js', 'Node.js', 'PostgreSQL', 'Prisma', 'TypeScript'],
    github: 'https://github.com/',
    demo: '#',
  },
  {
    title: 'E-Commerce Platform',
    description:
      'A scalable e-commerce solution with product catalog, cart, payment integration (Stripe), and an admin dashboard.',
    tech: ['React', 'Express', 'MongoDB', 'Stripe', 'Redux'],
    github: 'https://github.com/',
    demo: '#',
  },
  {
    title: 'Weather Forecast App',
    description:
      'A clean weather app that fetches real-time data from OpenWeatherMap, displays 7-day forecasts, and supports location search.',
    tech: ['React', 'Tailwind CSS', 'REST API', 'Axios'],
    github: 'https://github.com/',
    demo: '#',
  },
];

// Individual project card
function ProjectCard({ project }) {
  return (
    <div className="border border-white/10 rounded-2xl p-6 flex flex-col gap-4 hover:border-white/30 transition group">
      {/* Title */}
      <h3 className="text-white font-semibold text-lg group-hover:text-gray-200 transition">
        {project.title}
      </h3>

      {/* Description */}
      <p className="text-gray-500 text-sm leading-relaxed flex-1">{project.description}</p>

      {/* Tech stack badges */}
      <div className="flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <span
            key={t}
            className="text-xs px-2 py-0.5 rounded-full border border-white/15 text-gray-400"
          >
            {t}
          </span>
        ))}
      </div>

      {/* Links */}
      <div className="flex gap-4 pt-2">
        <a
          href={project.github}
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub repository"
          className="text-gray-500 hover:text-white transition flex items-center gap-1 text-sm"
        >
          <Code2 size={16} /> Code
        </a>
        <a
          href={project.demo}
          target="_blank"
          rel="noreferrer"
          aria-label="Live demo"
          className="text-gray-500 hover:text-white transition flex items-center gap-1 text-sm"
        >
          <ExternalLink size={16} /> Demo
        </a>
      </div>
    </div>
  );
}

// Projects section
export default function Projects() {
  return (
    <section id="projects" className="bg-black py-24 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Projects</h2>
        <div className="w-12 h-0.5 bg-white mb-10" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
