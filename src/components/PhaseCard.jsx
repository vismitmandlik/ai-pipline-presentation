import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function PhaseCard({ phase, index, isSelected, isActive, onSelect, animationActive }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, type: 'spring', stiffness: 100 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onSelect}
      className="relative cursor-pointer group"
      style={{ perspective: 1000 }}
    >
      {/* Glow aura */}
      <motion.div
        animate={{
          opacity: isSelected || isActive ? 0.6 : isHovered ? 0.4 : 0.15,
        }}
        className={`absolute -inset-2 rounded-3xl bg-gradient-to-br ${phase.gradient} blur-2xl transition-opacity duration-500`}
      />

      {/* Card body */}
      <motion.div
        whileHover={{ y: -8, rotateX: 5, rotateY: 5 }}
        animate={
          isActive && animationActive
            ? {
                scale: [1, 1.05, 1],
              }
            : {}
        }
        transition={{ duration: 2, repeat: isActive ? Infinity : 0 }}
        className={`relative h-full rounded-3xl overflow-hidden border transition-all duration-300 ${
          isSelected
            ? 'border-white/40 bg-slate-900/90'
            : 'border-white/10 bg-slate-900/60 hover:border-white/20'
        } backdrop-blur-xl`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Gradient top bar */}
        <div className={`h-1 bg-gradient-to-r ${phase.gradient}`} />

        {/* Inner gradient wash */}
        <motion.div
          animate={{
            opacity: isSelected ? 0.15 : isHovered ? 0.1 : 0.05,
          }}
          className={`absolute inset-0 bg-gradient-to-br ${phase.gradient}`}
        />

        {/* Animated corner accents */}
        <div className="absolute top-0 right-0 w-24 h-24 overflow-hidden">
          <motion.div
            animate={{
              rotate: animationActive ? 360 : 0,
            }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            className={`absolute -top-12 -right-12 w-24 h-24 bg-gradient-to-br ${phase.gradient} opacity-20 rounded-full blur-2xl`}
          />
        </div>

        {/* Content */}
        <div className="relative p-6">
          {/* Phase number */}
          <div className="flex items-start justify-between mb-4">
            <motion.div
              whileHover={{ rotate: 15, scale: 1.1 }}
              className="relative"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${phase.gradient} blur-md opacity-50`}
              />
              <div
                className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${phase.gradient} flex items-center justify-center text-3xl shadow-2xl`}
                style={{ boxShadow: `0 10px 40px ${phase.glowColor}` }}
              >
                {phase.emoji}
              </div>
            </motion.div>

            <div className="text-right">
              <div className="text-[10px] font-bold tracking-widest uppercase text-slate-500">
                Phase
              </div>
              <div className={`text-3xl font-black bg-gradient-to-br ${phase.gradient} bg-clip-text text-transparent`}>
                {phase.order}
              </div>
            </div>
          </div>

          {/* Name */}
          <h3 className="text-2xl font-black mb-2 text-white">
            {phase.name}
          </h3>

          {/* Description */}
          <p className="text-sm text-slate-400 leading-relaxed mb-4 line-clamp-2">
            {phase.description}
          </p>

          {/* Model badge */}
          {phase.model && (
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="relative mb-3 overflow-hidden rounded-xl border border-white/10 p-2.5"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-r ${
                  phase.model.tier === 'opus'
                    ? 'from-rose-500/20 via-pink-500/20 to-purple-500/20'
                    : phase.model.tier === 'sonnet'
                    ? 'from-indigo-500/20 via-blue-500/20 to-cyan-500/20'
                    : 'from-emerald-500/20 via-green-500/20 to-teal-500/20'
                }`}
              />
              <div className="relative flex items-center gap-2">
                <span className="text-lg">
                  {phase.model.tier === 'opus' ? '🧠' : phase.model.tier === 'sonnet' ? '⚡' : '🚀'}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="text-[9px] font-bold tracking-wider uppercase text-slate-400">
                    Model
                  </div>
                  <div className="text-xs font-bold text-white truncate">
                    {phase.model.name}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Meta tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            <span
              className="text-[10px] font-bold px-2 py-1 rounded-md bg-white/5 border border-white/10 text-slate-300"
            >
              ⏱ {phase.duration}
            </span>
            <span
              className="text-[10px] font-bold px-2 py-1 rounded-md bg-white/5 border border-white/10 text-slate-300"
            >
              🤖 {phase.agents.length}
            </span>
          </div>

          {/* Command preview */}
          <div className="p-2 rounded-lg bg-black/40 border border-white/5">
            <code className="text-xs text-slate-400 font-mono truncate block">
              <span className="text-emerald-400">$</span> {phase.command}
            </code>
          </div>

          {/* Expand hint */}
          <motion.div
            animate={{ opacity: isHovered ? 1 : 0.4 }}
            className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-400"
          >
            <span>{isSelected ? 'Click to collapse' : 'Click for details'}</span>
            <motion.span
              animate={{ rotate: isSelected ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              ↓
            </motion.span>
          </motion.div>
        </div>

        {/* Flow indicator (right edge) */}
        {index < 3 && animationActive && (
          <div className="hidden lg:block absolute top-1/2 -right-6 -translate-y-1/2 z-10">
            <motion.div
              animate={{ x: [0, 12, 0], opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-xl"
              style={{ color: phase.accentColor }}
            >
              ▶
            </motion.div>
          </div>
        )}

        {/* Active step glow */}
        {isActive && (
          <motion.div
            animate={{
              boxShadow: [
                `0 0 20px ${phase.glowColor}`,
                `0 0 40px ${phase.glowColor}`,
                `0 0 20px ${phase.glowColor}`,
              ],
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute inset-0 rounded-3xl pointer-events-none"
          />
        )}
      </motion.div>
    </motion.div>
  );
}
