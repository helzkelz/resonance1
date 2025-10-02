import { motion } from "framer-motion";
import { usePortfolio } from "./hooks/usePortfolio";

export default function Dashboard() {
  const { items } = usePortfolio();

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h1 className="font-bebas text-4xl mb-4 text-brown-600">Dashboard</h1>
      <section className="mb-10">
        <h2 className="font-bebas text-2xl mb-3 text-teal-700">Your Portfolio (Live Preview)</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {items.length === 0 && <div className="italic text-slate-500">No items yet. Add some from your Portfolio builder!</div>}
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
      </section>
      {/* Add more dashboard stuff here */}
    </div>
  );
}