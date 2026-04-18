import React from 'react';
import { motion } from 'framer-motion';

const STEPS = [
  {
    title: 'Phase 1: Research',
    emoji: '🔬',
    color: 'from-blue-500 to-cyan-500',
    description: 'User types /start-research <lang> (e.g., /start-research go) to investigate deployment patterns',
    detail: 'The deployment-researcher agent analyzes how Go applications are deployed across Linux systemd, Windows SC Manager, and other variants. Skills are created as reusable SKILL.md files.',
    action: 'deployment-researcher → creates skills',
  },
  {
    title: 'Phase 2: Environment Setup',
    emoji: '⚙️',
    color: 'from-purple-500 to-pink-500',
    description: 'User types /start-environment-setup to build test environment',
    detail: 'The environment-setup agent detects OS, uses Phase 1 skills to install runtimes, deploy real applications, and writes current-environment.md as ground truth for testing.',
    action: 'environment-setup → deploys apps',
  },
  {
    title: 'Phase 3: Code',
    emoji: '💻',
    color: 'from-emerald-500 to-green-500',
    description: 'User types /start-code python to add detection signals',
    detail: 'The add-detect-language-code agent reads the skill catalogue, compares with current language.go coverage, adds missing signals, writes tests, and rebuilds the binary.',
    action: 'add-detect-language-code → rebuilds binary',
  },
  {
    title: 'Phase 4: Test',
    emoji: '✅',
    color: 'from-amber-500 to-orange-500',
    description: 'User types /start-test to validate detection',
    detail: 'The test-language-detection agent runs the binary against deployed apps, compares expected vs detected language, and reports PASS/FAIL with the specific stage that failed.',
    action: 'test-language-detection → reports results',
  },
];

export default function StepThroughMode({ currentStep, onNext, onPrev, onClose }) {
  const step = STEPS[currentStep];
  const progress = ((currentStep + 1) / STEPS.length) * 100;

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -100, opacity: 0 }}
      transition={{ type: 'spring', damping: 20 }}
      className="sticky top-[80px] z-40 max-w-7xl mx-auto px-6 mt-4"
    >
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/90 backdrop-blur-xl shadow-2xl">
        {/* Progress bar */}
        <div className="h-1 bg-white/5">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
            className={`h-full bg-gradient-to-r ${step.color}`}
          />
        </div>

        <div className="p-6">
          <div className="flex items-start gap-6 flex-wrap">
            {/* Emoji */}
            <motion.div
              key={currentStep}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className={`text-5xl filter drop-shadow-2xl`}
            >
              {step.emoji}
            </motion.div>

            {/* Content */}
            <div className="flex-1 min-w-[300px]">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-bold tracking-widest uppercase text-slate-500">
                  Step {currentStep + 1} of {STEPS.length}
                </span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-md bg-gradient-to-r ${step.color} text-white`}>
                  ACTIVE
                </span>
              </div>
              <motion.h3
                key={`title-${currentStep}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`text-2xl font-black bg-gradient-to-r ${step.color} bg-clip-text text-transparent mb-2`}
              >
                {step.title}
              </motion.h3>
              <motion.p
                key={`desc-${currentStep}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-slate-300 font-medium mb-1"
              >
                {step.description}
              </motion.p>
              <motion.p
                key={`detail-${currentStep}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-slate-400 text-sm"
              >
                {step.detail}
              </motion.p>
              <motion.div
                key={`action-${currentStep}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-3 inline-flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded-full bg-white/5 border border-white/10"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-slate-300">{step.action}</span>
              </motion.div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onPrev}
                disabled={currentStep === 0}
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                ←
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onNext}
                disabled={currentStep === STEPS.length - 1}
                className={`px-5 h-10 rounded-full bg-gradient-to-r ${step.color} text-white font-semibold text-sm shadow-lg disabled:opacity-30 disabled:cursor-not-allowed`}
              >
                Next →
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all"
              >
                ✕
              </motion.button>
            </div>
          </div>

          {/* Step dots */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {STEPS.map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  width: i === currentStep ? 32 : 8,
                  opacity: i <= currentStep ? 1 : 0.3,
                }}
                className={`h-2 rounded-full ${
                  i <= currentStep
                    ? `bg-gradient-to-r ${STEPS[i].color}`
                    : 'bg-white/20'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
