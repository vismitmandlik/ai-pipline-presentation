import React from 'react';
import { motion } from 'framer-motion';

export default function LayerCard({ item, layerColor, isSelected, onSelect }) {
  return (
    <motion.button
      onClick={onSelect}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="w-full text-left"
    >
      <motion.div
        animate={{
          boxShadow: isSelected
            ? '0 10px 30px rgba(59, 130, 246, 0.3)'
            : '0 4px 12px rgba(0, 0, 0, 0.2)',
        }}
        className={`relative overflow-hidden rounded-lg p-4 border transition-all cursor-pointer ${
          isSelected
            ? `bg-gradient-to-r ${layerColor} bg-opacity-20 border-white/30`
            : 'bg-slate-800 border-slate-600 hover:border-slate-500'
        }`}
      >
        <div className="relative z-10">
          <div className="flex items-start gap-2">
            <span className="text-xl flex-shrink-0">{item.icon}</span>
            <div className="flex-1 min-w-0">
              <div className={`font-semibold text-sm truncate ${
                isSelected ? 'text-white' : 'text-slate-200'
              }`}>
                {item.name}
              </div>
              <div className={`text-xs mt-1 line-clamp-2 ${
                isSelected ? 'text-white/70' : 'text-slate-400'
              }`}>
                {item.description}
              </div>
            </div>
          </div>
        </div>

        {/* Animated background glow on hover */}
        <motion.div
          animate={{
            opacity: isSelected ? 0.1 : 0,
          }}
          className={`absolute inset-0 bg-gradient-to-r ${layerColor}`}
        />
      </motion.div>
    </motion.button>
  );
}
