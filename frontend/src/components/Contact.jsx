import { useState } from 'react';
import { Mail, Send } from 'lucide-react';

// Contact section with a simple form
export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'sent' | 'error'

  // Update form fields as user types
  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handle form submission — replace with your preferred service (EmailJS, Formspree, etc.)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      // Simulate a network request (replace with real API call)
      await new Promise((r) => setTimeout(r, 1200));
      setStatus('sent');
      setForm({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="bg-black py-24 px-6 border-t border-white/5">
      <div className="max-w-2xl mx-auto">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Get In Touch</h2>
        <div className="w-12 h-0.5 bg-white mb-6" />

        <p className="text-gray-500 text-sm mb-10">
          Whether you have a project idea, want to collaborate, or just want to say hi — my inbox
          is always open.
        </p>

        {/* Email link */}
        <a
          href="mailto:hello@example.com"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-10 transition"
        >
          <Mail size={16} />
          hello@example.com
        </a>

        {/* Contact form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-white/30 transition"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-white/30 transition"
            />
          </div>

          <textarea
            name="message"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            required
            rows={5}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-white/30 transition resize-none"
          />

          <button
            type="submit"
            disabled={status === 'sending' || status === 'sent'}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black text-sm font-semibold rounded-full hover:bg-gray-200 disabled:opacity-50 transition"
          >
            <Send size={15} />
            {status === 'sending' ? 'Sending…' : status === 'sent' ? 'Message Sent!' : 'Send Message'}
          </button>

          {status === 'error' && (
            <p className="text-red-400 text-xs mt-2">Something went wrong. Please try again.</p>
          )}
        </form>
      </div>
    </section>
  );
}
