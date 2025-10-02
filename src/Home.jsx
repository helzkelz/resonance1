import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto py-14 text-center"
    >
      <h1 className="font-bebas text-5xl md:text-6xl mb-4 text-teal-700">
        Resonance Vault
      </h1>
      <p className="text-xl mb-8 text-slate-600 max-w-2xl mx-auto">
        Your personal portfolio space for all things weird, wonderful, and professional.
        Build, preview, and share your creative work.
      </p>

      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <motion.div
          className="bg-cream-100 p-6 rounded-xl shadow"
          whileHover={{ scale: 1.05 }}
        >
          <h3 className="font-bebas text-2xl mb-3 text-brown-600">Portfolio Builder</h3>
          <p className="mb-4">Add your skills, projects, zines, and more to your portfolio.</p>
          <Link
            to="/portfolio"
            className="bg-orange-500 text-white px-4 py-2 rounded font-bebas uppercase hover:bg-orange-400 transition"
          >
            Build Portfolio
          </Link>
        </motion.div>

        <motion.div
          className="bg-cream-100 p-6 rounded-xl shadow"
          whileHover={{ scale: 1.05 }}
        >
          <h3 className="font-bebas text-2xl mb-3 text-brown-600">Live Preview</h3>
          <p className="mb-4">See your portfolio as others will see it, updating in real-time.</p>
          <Link
            to="/dashboard"
            className="bg-teal-600 text-white px-4 py-2 rounded font-bebas uppercase hover:bg-teal-500 transition"
          >
            View Dashboard
          </Link>
        </motion.div>

        <motion.div
          className="bg-cream-100 p-6 rounded-xl shadow"
          whileHover={{ scale: 1.05 }}
        >
          <h3 className="font-bebas text-2xl mb-3 text-brown-600">Public Portfolio</h3>
          <p className="mb-4">Share your public portfolio page with the world.</p>
          <Link
            to="/public"
            className="bg-brown-600 text-white px-4 py-2 rounded font-bebas uppercase hover:bg-brown-500 transition"
          >
            Go Public
          </Link>
        </motion.div>
      </div>

      <div className="text-slate-500">
        <p>Built with React, Tailwind CSS, and Framer Motion</p>
      </div>
    </motion.div>
  );
}