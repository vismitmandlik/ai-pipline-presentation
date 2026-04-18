import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PipelineViewer from './components/PipelineViewer';
import ArchitectureLayerViewer from './components/ArchitectureLayerViewer';
import Legend from './components/Legend';

export default function App() {
  const [viewMode, setViewMode] = useState('pipeline'); // 'pipeline' or 'architecture'
  const [selectedPhase, setSelectedPhase] = useState(null);
  const [animationActive, setAnimationActive] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-900/80 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Claude Code Architecture
              </h1>
              <p className="text-slate-400 text-sm mt-1">Interactive 4-Phase Pipeline Visualization</p>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4">
              {/* View Mode Toggle */}
              <div className="flex gap-2 bg-slate-800 rounded-lg p-1">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setViewMode('pipeline')}
                  className={`px-4 py-2 rounded-md font-medium transition-all ${
                    viewMode === 'pipeline'
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Pipeline Flow
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setViewMode('architecture')}
                  className={`px-4 py-2 rounded-md font-medium transition-all ${
                    viewMode === 'architecture'
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  3-Layer Model
                </motion.button>
              </div>

              {/* Animation Toggle */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setAnimationActive(!animationActive)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  animationActive
                    ? 'bg-cyan-600 text-white'
                    : 'bg-slate-700 text-slate-300'
                }`}
              >
                {animationActive ? '✓ Animate' : 'Paused'}
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <AnimatePresence mode="wait">
          {viewMode === 'pipeline' ? (
            <motion.div
              key="pipeline"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <PipelineViewer
                selectedPhase={selectedPhase}
                onSelectPhase={setSelectedPhase}
                animationActive={animationActive}
              />
            </motion.div>
          ) : (
            <motion.div
              key="architecture"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ArchitectureLayerViewer
                animationActive={animationActive}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Legend */}
      <footer className="border-t border-slate-700 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <Legend />
        </div>
      </footer>
    </div>
  );
}
