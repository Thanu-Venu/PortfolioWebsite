// About Me section
export default function About() {
  return (
    <section id="about" className="bg-black py-24 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Section heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">About Me</h2>
        <div className="w-12 h-0.5 bg-white mb-10" />

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <div className="space-y-5 text-gray-400 text-sm md:text-base leading-relaxed">
            <p>
              I&apos;m <span className="text-white font-semibold">Thanu Venu</span>, a passionate
              full-stack developer with a strong focus on building clean, scalable, and
              user-centric applications.
            </p>
            <p>
              I enjoy working across the entire stack — from crafting responsive UIs with React
              and Tailwind CSS, to building robust APIs with Python and FastAPI. I&apos;m
              particularly excited about integrating AI/ML features into real-world products.
            </p>
            <p>
              When I&apos;m not coding, I&apos;m exploring new technologies, contributing to
              open-source projects, or learning about system design and architecture.
            </p>
          </div>

          {/* Stats cards */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: '10+', label: 'Projects Built' },
              { value: '2+', label: 'Years Experience' },
              { value: '5+', label: 'Tech Stacks' },
              { value: '∞', label: 'Curiosity' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="border border-white/10 rounded-xl p-5 text-center hover:border-white/30 transition"
              >
                <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
