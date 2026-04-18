import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function PhaseCard({ phase, index, isSelected, onSelect, animationActive }) {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.1,
        duration: 0.5,
      },
    },
  };

  const pulseVariants = {
    animate: animationActive ? {
      boxShadow: [
        '0 0 0 0 rgba(59, 130, 246, 0)',
        '0 0 0 10px rgba(59, 130, 246, 0.1)',
        '0 0 0 0 rgba(59, 130, 246, 0)',
      ],
    } : {},
    transition: {
      duration: 2,
      repeat: Infinity,
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      id={`phase-${index}`}
      className="relative"
    >
      <motion.button
        variants={pulseVariants}
        animate="animate"
        onClick={onSelect}
        className={`w-full h-full text-left transition-all duration-300 cursor-pointer`}
      >
        <motion.div
          whileHover={{ scale: 1.02, y: -4 }}
          whileTap={{ scale: 0.98 }}
          className={`relative overflow-hidden rounded-xl p-6 border-2 backdrop-blur-sm transition-all ${
            isSelected
              ? `bg-gradient-to-br ${phase.color} border-white/30 shadow-2xl`
              : 'bg-slate-800 border-slate-600 hover:border-slate-500 shadow-lg'
          }`}
        >
          {/* Background gradient overlay */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${phase.color} opacity-0 transition-opacity ${
              isSelected ? 'opacity-10' : 'hover:opacity-5'
            }`}
          />

          {/* Phase number badge */}
          <div className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
            isSelected
              ? 'bg-white/20 text-white'
              : 'bg-slate-700 text-slate-300'
          }`}>
            {phase.order}
          </div>

          {/* Content */}
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">{phase.emoji}</span>
              <h3 className={`text-xl font-bold ${
                isSelected ? 'text-white' : 'text-slate-200'
              }`}>
                {phase.name}
              </h3>
            </div>

            <p className={`text-sm mb-4 leading-relaxed ${
              isSelected ? 'text-white/90' : 'text-slate-400'
            }`}>
              {phase.description.split(' ').slice(0, 15).join(' ')}...
            </p>

            {/* Quick Stats */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-xs">
                <span className={`inline-block w-2 h-2 rounded-full ${
                  isSelected ? 'bg-white/60' : 'bg-slate-500'
                }`} />
                <span className={isSelected ? 'text-white/80' : 'text-slate-400'}>
                  {phase.agents.length} agent{phase.agents.length !== 1 ? 's' : ''}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className={`inline-block w-2 h-2 rounded-full ${
                  isSelected ? 'bg-white/60' : 'bg-slate-500'
                }`} />
                <span className={isSelected ? 'text-white/80' : 'text-slate-400'}>
                  {phase.command}
                </span>
              </div>
            </div>

            {/* Expand indicator */}
            <motion.div
              animate={{ rotate: isSelected ? 180 : 0 }}
              className="flex justify-center mt-4"
            >
              <ChevronDown
                size={20}
                className={isSelected ? 'text-white' : 'text-slate-500'}
              />
            </motion.div>
          </div>
        </motion.div>
      </motion.button>
    </motion.div>
  );
}
