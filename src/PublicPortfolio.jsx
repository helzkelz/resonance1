import { motion } from "framer-motion";
import { usePortfolio } from "./hooks/usePortfolio";

export default function PublicPortfolio() {
  const { items } = usePortfolio();

  return (
    <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto py-14">
      <h1 className="font-bebas text-4xl md:text-5xl mb-4 text-teal-700">Public Portfolio</h1>
      <p className="mb-6 text-slate-600">Helen’s weird, wonderful, and wild portfolio, auto-updating. Only real shit here. No edits on this page.</p>
      <div className="grid md:grid-cols-2 gap-4">
        {items.length === 0 && <div className="italic text-slate-500">No items published yet.</div>}
        {items.map((item, idx) => (
          <motion.div
            key={idx}
            className="bg-cream-100 rounded-lg shadow p-4"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            layout
          >
            <div className="uppercase text-xs mb-1 tracking-widest text-teal-700">{item.type}</div>
            <h3 className="font-bebas text-xl mb-1">{item.title}</h3>
            <p className="text-slate-800">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}