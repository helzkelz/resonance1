import { usePortfolio } from "./PortfolioContext";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Portfolio() {
  const { items, addItem, removeItem } = usePortfolio();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [type, setType] = useState("Skill");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim() || !desc.trim()) {
      setError("Title and description are required.");
      return;
    }
    addItem({ title, desc, type });
    setTitle(""); setDesc(""); setType("Skill"); setError("");
  }

  return (
    <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto py-14">
      <h1 className="font-bebas text-4xl md:text-5xl mb-4 text-teal-700">My Portfolio (Builder)</h1>
      <form className="bg-white rounded-xl shadow p-6 mb-7 flex flex-col gap-2" onSubmit={handleSubmit}>
        <div className="flex gap-3">
          <select className="border p-2 rounded" value={type} onChange={e => setType(e.target.value)}>
            <option>Skill</option>
            <option>Zine</option>
            <option>Project</option>
            <option>Service</option>
            <option>Workshop</option>
            <option>Other</option>
          </select>
          <input
            className="flex-grow border p-2 rounded"
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
        </div>
        <textarea
          className="border p-2 rounded"
          placeholder="Description (what makes this special?)"
          value={desc}
          onChange={e => setDesc(e.target.value)}
          required
          rows={2}
        />
        {error && <div className="text-red-500">{error}</div>}
        <button
          className="bg-orange-500 text-white px-6 py-2 rounded font-bebas uppercase hover:bg-orange-400 transition self-start"
          type="submit"
        >Add to Portfolio</button>
      </form>
      <div>
        <h2 className="font-bebas text-2xl mb-3 text-brown-600">Saved Items</h2>
        <AnimatePresence>
          {items.length === 0 && (
            <motion.div className="text-slate-500 italic py-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              No items yet. Add your first one above!
            </motion.div>
          )}
          <div className="grid md:grid-cols-2 gap-5">
            {items.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                layout
                className="bg-cream-100 p-5 rounded-xl shadow flex flex-col relative"
              >
                <span className="absolute top-2 right-2 text-red-500 cursor-pointer text-2xl"
                  title="Delete"
                  onClick={() => removeItem(idx)}
                >✕</span>
                <div className="uppercase text-xs mb-1 tracking-widest text-teal-700">{item.type}</div>
                <h3 className="font-bebas text-xl mb-1">{item.title}</h3>
                <p className="text-slate-800">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}