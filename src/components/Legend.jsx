import React from 'react';
import { motion } from 'framer-motion';

export default function Legend() {
  const items = [
    { label: 'Sequential Flow', description: 'Progress through 4 phases', icon: '→', color: 'text-blue-400', bg: 'from-blue-500/20 to-cyan-500/20' },
    { label: 'Interactive', description: 'Click to expand details', icon: '◆', color: 'text-purple-400', bg: 'from-purple-500/20 to-pink-500/20' },
    { label: 'Live Flow', description: 'Animated data pulses', icon: '●', color: 'text-emerald-400', bg: 'from-emerald-500/20 to-green-500/20' },
    { label: 'Hover Connections', description: 'See linked components', icon: '◈', color: 'text-amber-400', bg: 'from-amber-500/20 to-orange-500/20' },
  ];

  return (
    <div>
      <div className="text-center mb-6">
        <h3 className="text-sm font-bold tracking-widest uppercase text-slate-400">Legend & Interactions</h3>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -4, scale: 1.02 }}
            className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${item.bg} border border-white/10 p-4 backdrop-blur-md`}
          >
            <div className="flex items-center gap-3">
              <div className={`text-3xl ${item.color}`}>{item.icon}</div>
              <div>
                <div className="font-bold text-white text-sm">{item.label}</div>
                <div className="text-xs text-slate-400 mt-0.5">{item.description}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="text-center mt-8 text-xs text-slate-500">
        Built with React • Framer Motion • Tailwind CSS
      </div>
    </div>
  );
}
