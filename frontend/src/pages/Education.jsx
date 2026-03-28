function Education() {
  return (
    <div className="min-h-screen px-6 md:px-20 py-20 border-t border-gray-800">

      <h2 className="text-3xl md:text-5xl font-bold mb-12">
        Education & Certifications
      </h2>

      {/* EDUCATION */}
      <div className="mb-16">
        <h3 className="text-xl font-semibold mb-4">Education</h3>

        <div className="border border-gray-800 p-6 rounded-xl">
          <h4 className="text-lg font-semibold">
            BSc in Computer Science
          </h4>
          <p className="text-gray-400">
                      University of Colombo School Of Computing • 2023 – Present<br></br>
                      current CGPA: 3.55/4.0
          </p>
        </div>
      </div>

      {/* CERTIFICATIONS */}
      <div>
        <h3 className="text-xl font-semibold mb-6">Certifications</h3>

        <div className="grid md:grid-cols-2 gap-6">

          {/* CERT CARD */}
          <a href="/cert1.pdf" target="_blank" className="border border-gray-800 p-4 rounded-xl hover:border-white transition hover:shadow-lg">
            <h4 className="text-md font-semibold">
              Python for Beginners
            </h4>
            <p className="text-gray-500 text-sm">
              University of Moratuwa • Nov 2025
            </p>
          </a>

          <a href="/cert3.pdf" target="_blank" className="border border-gray-800 p-4 rounded-xl hover:border-white transition hover:shadow-lg">
            <h4 className="text-md font-semibold">
              Software Engineer Intern
            </h4>
            <p className="text-gray-500 text-sm">
              HackerRank • Oct 2025
            </p>
          </a>

          <a href="/cert4.pdf" target="_blank" className="border border-gray-800 p-4 rounded-xl hover:border-white transition hover:shadow-lg">
            <h4 className="text-md font-semibold">
              Web Design for Beginners
            </h4>
            <p className="text-gray-500 text-sm">
              University of Moratuwa • May 2025
            </p>
          </a>

          <a href="/cert5.pdf" target="_blank" className="border border-gray-800 p-4 rounded-xl hover:border-white transition hover:shadow-lg">
            <h4 className="text-md font-semibold">
              CSS Basics
            </h4>
            <p className="text-gray-500 text-sm">
              HackerRank • May 2025
            </p>
          </a>

          <a href="/cert6.pdf" target="_blank" className="border border-gray-800 p-4 rounded-xl hover:border-white transition hover:shadow-lg">
            <h4 className="text-md font-semibold">
              SQL Basics
            </h4>
            <p className="text-gray-500 text-sm">
              HackerRank • May 2025
            </p>
          </a>

        </div>

      </div>

    </div>
  );
}

export default Education;

