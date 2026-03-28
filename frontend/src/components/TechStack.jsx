// Tech stack data grouped by category
const TECH_CATEGORIES = [
  {
    category: 'Frontend',
    skills: ['React', 'Next.js', 'Vite', 'Tailwind CSS', 'TypeScript', 'JavaScript'],
  },
  {
    category: 'Backend',
    skills: ['FastAPI', 'Node.js', 'Express', 'Python', 'REST APIs'],
  },
  {
    category: 'Database',
    skills: ['PostgreSQL', 'MongoDB', 'MySQL', 'Prisma', 'Redis'],
  },
  {
    category: 'Tools & DevOps',
    skills: ['Git', 'GitHub', 'Docker', 'VS Code', 'Postman', 'Linux'],
  },
];

// TechStack section — displays skills in a clean grid
export default function TechStack() {
  return (
    <section id="skills" className="bg-black py-24 px-6 border-t border-white/5">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Tech Stack</h2>
        <div className="w-12 h-0.5 bg-white mb-10" />

        <div className="grid sm:grid-cols-2 gap-8">
          {TECH_CATEGORIES.map(({ category, skills }) => (
            <div key={category}>
              {/* Category label */}
              <h3 className="text-xs font-semibold tracking-widest text-gray-500 uppercase mb-4">
                {category}
              </h3>

              {/* Skill badges */}
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-sm px-3 py-1.5 rounded-lg border border-white/10 text-gray-300 hover:border-white/30 hover:text-white transition cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
