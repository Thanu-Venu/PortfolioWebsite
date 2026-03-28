import { Award, ExternalLink } from 'lucide-react';

// Certificates data — update with your real certifications
const CERTIFICATES = [
  {
    title: 'The Complete Web Developer Bootcamp',
    issuer: 'Udemy',
    year: '2023',
    url: '#',
  },
  {
    title: 'Python for Data Science and Machine Learning',
    issuer: 'Coursera',
    year: '2023',
    url: '#',
  },
  {
    title: 'React – The Complete Guide',
    issuer: 'Udemy',
    year: '2024',
    url: '#',
  },
  {
    title: 'FastAPI Full Course',
    issuer: 'YouTube / freeCodeCamp',
    year: '2024',
    url: '#',
  },
];

// Certificates section
export default function Certificates() {
  return (
    <section id="certificates" className="bg-black py-24 px-6 border-t border-white/5">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Certificates</h2>
        <div className="w-12 h-0.5 bg-white mb-10" />

        <div className="grid sm:grid-cols-2 gap-4">
          {CERTIFICATES.map((cert) => (
            <div
              key={cert.title}
              className="border border-white/10 rounded-xl p-5 flex items-start gap-3 hover:border-white/25 transition group"
            >
              {/* Icon */}
              <Award size={20} className="text-gray-500 mt-0.5 shrink-0" />

              {/* Info */}
              <div className="flex-1">
                <h3 className="text-white text-sm font-semibold">{cert.title}</h3>
                <p className="text-gray-500 text-xs mt-1">
                  {cert.issuer} · {cert.year}
                </p>
              </div>

              {/* External link */}
              <a
                href={cert.url}
                target="_blank"
                rel="noreferrer"
                aria-label="View certificate"
                className="text-gray-600 hover:text-white transition mt-0.5 shrink-0"
              >
                <ExternalLink size={15} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
