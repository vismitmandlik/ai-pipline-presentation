import React from 'react';
import { motion } from 'framer-motion';

export default function Legend() {
  const items = [
    {
      label: 'Phase Flow',
      description: 'Forward progress through 4 sequential phases',
      icon: '→',
      color: 'text-blue-400',
    },
    {
      label: 'Feedback Loop',
      description: 'Iteration back to Phase 1 or 3 based on test failure',
      icon: '↩',
      color: 'text-red-400',
    },
    {
      label: 'Animated Dots',
      description: 'Shows active data flow through connections',
      icon: '●',
      color: 'text-cyan-400',
    },
    {
      label: 'Interactive Nodes',
      description: 'Click to expand and see detailed information',
      icon: '◆',
      color: 'text-purple-400',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
    >
      {items.map((item) => (
        <motion.div
          key={item.label}
          variants={itemVariants}
          className="flex items-start gap-3"
        >
          <div className={`text-2xl flex-shrink-0 ${item.color}`}>
            {item.icon}
          </div>
          <div>
            <div className="font-semibold text-slate-200">{item.label}</div>
            <div className="text-sm text-slate-400 mt-1">{item.description}</div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
