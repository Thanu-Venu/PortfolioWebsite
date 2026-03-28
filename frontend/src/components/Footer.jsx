// Footer section
export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/5 py-8 px-6 text-center">
      <p className="text-gray-600 text-sm">
        © {new Date().getFullYear()} Thanu Venu · Built with React + FastAPI
      </p>
    </footer>
  );
}
