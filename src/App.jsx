import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PipelineViewer from './components/PipelineViewer';
import ArchitectureLayerViewer from './components/ArchitectureLayerViewer';
import ParticleBackground from './components/ParticleBackground';
import Legend from './components/Legend';
import StepThroughMode from './components/StepThroughMode';

export default function App() {
  const [viewMode, setViewMode] = useState('pipeline');
  const [selectedPhase, setSelectedPhase] = useState(null);
  const [animationActive, setAnimationActive] = useState(true);
  const [stepMode, setStepMode] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouse = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden relative">
      {/* Animated background */}
      <ParticleBackground />

      {/* Mouse glow */}
      <div
        className="pointer-events-none fixed w-[500px] h-[500px] rounded-full opacity-20 blur-3xl transition-all duration-300 z-0"
        style={{
          background: 'radial-gradient(circle, rgba(99,102,241,0.4) 0%, transparent 70%)',
          left: mousePos.x - 250,
          top: mousePos.y - 250,
        }}
      />

      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100 }}
        className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/70 border-b border-white/5"
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-4"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="relative w-12 h-12"
              >
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 blur-md opacity-70" />
                <div className="relative w-full h-full rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-xl font-black">
                  C
                </div>
              </motion.div>
              <div>
                <h1 className="text-2xl font-black bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  APM AI Pipeline
                </h1>
                <p className="text-slate-500 text-xs tracking-wider uppercase mt-0.5">
                  Interactive Pipeline Explorer
                </p>
              </div>
            </motion.div>

            <div className="flex items-center gap-3 flex-wrap">
              {/* View toggle */}
              <div className="flex gap-1 bg-white/5 backdrop-blur-md rounded-full p-1 border border-white/10">
                {[
                  { id: 'pipeline', label: 'Pipeline', icon: '⚡' },
                  { id: 'architecture', label: 'Layers', icon: '🏗️' },
                ].map((mode) => (
                  <motion.button
                    key={mode.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setViewMode(mode.id)}
                    className={`relative px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                      viewMode === mode.id ? 'text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {viewMode === mode.id && (
                      <motion.div
                        layoutId="activeView"
                        className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                    <span className="relative flex items-center gap-2">
                      <span>{mode.icon}</span>
                      {mode.label}
                    </span>
                  </motion.button>
                ))}
              </div>

              {/* Step mode */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setStepMode(!stepMode);
                  setCurrentStep(0);
                }}
                className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
                  stepMode
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 border-amber-400 text-white'
                    : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                }`}
              >
                {stepMode ? '▶ Step Mode' : '⏯ Walk Through'}
              </motion.button>

              {/* Animation toggle */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setAnimationActive(!animationActive)}
                className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${
                  animationActive
                    ? 'bg-emerald-500/20 border-emerald-400/50 text-emerald-400'
                    : 'bg-white/5 border-white/10 text-slate-400'
                }`}
                title={animationActive ? 'Pause animations' : 'Resume animations'}
              >
                {animationActive ? '⏸' : '▶'}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Step Through Mode */}
      <AnimatePresence>
        {stepMode && (
          <StepThroughMode
            currentStep={currentStep}
            onNext={() => setCurrentStep((s) => Math.min(s + 1, 3))}
            onPrev={() => setCurrentStep((s) => Math.max(s - 1, 0))}
            onClose={() => setStepMode(false)}
          />
        )}
      </AnimatePresence>

      {/* Main content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          {viewMode === 'pipeline' ? (
            <motion.div
              key="pipeline"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4 }}
            >
              <PipelineViewer
                selectedPhase={selectedPhase}
                onSelectPhase={setSelectedPhase}
                animationActive={animationActive}
                activeStep={stepMode ? currentStep : null}
              />
            </motion.div>
          ) : (
            <motion.div
              key="architecture"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4 }}
            >
              <ArchitectureLayerViewer animationActive={animationActive} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 bg-slate-950/80 backdrop-blur-md mt-20">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Legend />
        </div>
      </footer>
    </div>
  );
}
