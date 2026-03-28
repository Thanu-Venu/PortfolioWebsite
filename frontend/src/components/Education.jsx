import { GraduationCap } from 'lucide-react';

// Education data — update with your real details
const EDUCATION = [
  {
    degree: 'Bachelor of Technology in Computer Science',
    institution: 'XYZ University',
    year: '2021 – 2025',
    description:
      'Focused on Data Structures, Algorithms, Web Development, and Machine Learning. Maintained a strong GPA throughout.',
  },
  {
    degree: 'Higher Secondary Education (12th)',
    institution: 'ABC School',
    year: '2019 – 2021',
    description: 'Science stream with Mathematics, Physics, and Computer Science.',
  },
];

// Education section
export default function Education() {
  return (
    <section id="education" className="bg-black py-24 px-6 border-t border-white/5">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Education</h2>
        <div className="w-12 h-0.5 bg-white mb-10" />

        <div className="space-y-6">
          {EDUCATION.map((edu) => (
            <div
              key={edu.degree}
              className="border border-white/10 rounded-2xl p-6 flex gap-4 hover:border-white/25 transition"
            >
              {/* Icon */}
              <div className="mt-1">
                <GraduationCap size={22} className="text-gray-500" />
              </div>

              {/* Content */}
              <div>
                <h3 className="text-white font-semibold text-base">{edu.degree}</h3>
                <p className="text-gray-400 text-sm mt-0.5">{edu.institution}</p>
                <span className="text-xs text-gray-600 mt-1 inline-block">{edu.year}</span>
                <p className="text-gray-500 text-sm mt-3 leading-relaxed">{edu.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
