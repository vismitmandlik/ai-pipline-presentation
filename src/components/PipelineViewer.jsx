import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import PhaseCard from './PhaseCard';
import FlowArrow from './FlowArrow';
import FeedbackLoop from './FeedbackLoop';

const PHASES = [
  {
    id: 'phase1',
    order: 1,
    name: 'Research',
    command: '/start-research',
    emoji: '🔬',
    color: 'from-blue-500 to-blue-600',
    description: 'Research deployment patterns for a language across OS/supervisor variants',
    keyActivities: [
      'Analyze deployment patterns',
      'Document signals per stage',
      'Create reusable skills',
    ],
    output: 'SKILL.md files in .claude/skills/',
    agents: ['deployment-researcher'],
    duration: 'High (research time)',
    risk: 'Medium (knowledge can be wrong)',
    investment: 'High',
  },
  {
    id: 'phase2',
    order: 2,
    name: 'Provision',
    command: '/start-environment-setup',
    emoji: '⚙️',
    color: 'from-purple-500 to-purple-600',
    description: 'Stand up real applications using deployment skills from Phase 1',
    keyActivities: [
      'Detect host OS',
      'Install runtimes',
      'Deploy test apps',
      'Verify health checks',
    ],
    output: 'current-environment.md (ground truth)',
    agents: ['environment-setup', 'environment-infra-setup', 'environment-app-setup'],
    duration: 'High (5-20 minutes)',
    risk: 'High (complex provisioning)',
    investment: 'High',
  },
  {
    id: 'phase3',
    order: 3,
    name: 'Code',
    command: '/start-code <lang>',
    emoji: '💻',
    color: 'from-green-500 to-green-600',
    description: 'Add missing detection signals to language.go and rebuild binary',
    keyActivities: [
      'Compare coverage vs. skill catalogue',
      'Add missing signals',
      'Write test cases',
      'Build and verify',
    ],
    output: 'motadata-host-agent binary',
    agents: ['add-detect-language-code'],
    duration: 'Medium (seconds)',
    risk: 'Low (tested, automated)',
    investment: 'Medium',
  },
  {
    id: 'phase4',
    order: 4,
    name: 'Test',
    command: '/start-test',
    emoji: '✅',
    color: 'from-orange-500 to-orange-600',
    description: 'Validate rebuilt binary against deployed applications',
    keyActivities: [
      'Run binary against apps',
      'Compare detection results',
      'Report pass/fail per app',
      'Identify failed stage',
    ],
    output: 'Test report (PASS/FAIL per app)',
    agents: ['test-language-detection'],
    duration: 'Low (seconds)',
    risk: 'Low (just reporting)',
    investment: 'Low',
  },
];

const FEEDBACK_LOOPS = [
  {
    from: 'phase4',
    to: 'phase1',
    label: 'Signal missed',
    y: -80,
    color: 'from-red-500 to-red-600',
    description: 'Phase 4 test fails → Missing signal in Phase 1 research',
  },
  {
    from: 'phase4',
    to: 'phase3',
    label: 'Wrong signal',
    y: -40,
    color: 'from-yellow-500 to-yellow-600',
    description: 'Phase 4 test fails → Fix signal logic in Phase 3',
  },
];

export default function PipelineViewer({ selectedPhase, onSelectPhase, animationActive }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="space-y-12">
      {/* Overview */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="bg-gradient-to-r from-slate-800 to-slate-700 rounded-xl p-6 border border-slate-600"
      >
        <motion.h2 variants={itemVariants} className="text-2xl font-bold mb-2">
          4-Phase Language Detection Pipeline
        </motion.h2>
        <motion.p variants={itemVariants} className="text-slate-300">
          Sequential workflow where each phase builds on the previous. Phases 3 & 4 can iterate
          until all languages detect correctly, with feedback loops back to Phase 1 or 3.
        </motion.p>
      </motion.div>

      {/* Pipeline Diagram */}
      <div className="space-y-8">
        {/* Main Flow */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative"
        >
          <svg
            className="absolute inset-0 w-full pointer-events-none"
            style={{ height: '100%', minHeight: '600px' }}
            preserveAspectRatio="none"
          >
            {/* Forward arrows */}
            {PHASES.slice(0, -1).map((phase, idx) => (
              <FlowArrow
                key={`forward-${phase.id}`}
                from={`phase-${idx}`}
                to={`phase-${idx + 1}`}
                animated={animationActive}
              />
            ))}

            {/* Feedback loops */}
            {FEEDBACK_LOOPS.map((loop) => (
              <FeedbackLoop
                key={`feedback-${loop.from}-${loop.to}`}
                from={loop.from}
                to={loop.to}
                label={loop.label}
                color={loop.color}
                y={loop.y}
                animated={animationActive}
              />
            ))}
          </svg>

          {/* Phase Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PHASES.map((phase, idx) => (
              <PhaseCard
                key={phase.id}
                phase={phase}
                index={idx}
                isSelected={selectedPhase?.id === phase.id}
                onSelect={() => onSelectPhase(selectedPhase?.id === phase.id ? null : phase)}
                animationActive={animationActive}
              />
            ))}
          </div>
        </motion.div>

        {/* Expanded Details Panel */}
        {selectedPhase && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-slate-800 rounded-xl p-8 border border-slate-600 mt-8"
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Details */}
              <div className="lg:col-span-2">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <span className="text-3xl">{selectedPhase.emoji}</span>
                  {selectedPhase.name}
                </h3>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-slate-300 font-semibold mb-2">Description</h4>
                    <p className="text-slate-400">{selectedPhase.description}</p>
                  </div>

                  <div>
                    <h4 className="text-slate-300 font-semibold mb-3">Key Activities</h4>
                    <ul className="space-y-2">
                      {selectedPhase.keyActivities.map((activity, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="flex items-center gap-3 text-slate-300"
                        >
                          <span className="w-2 h-2 rounded-full bg-blue-400" />
                          {activity}
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-slate-300 font-semibold mb-2">Agents</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedPhase.agents.map((agent) => (
                        <span
                          key={agent}
                          className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-sm font-mono"
                        >
                          {agent}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Metrics */}
              <div className="space-y-4">
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <div className="text-slate-400 text-sm font-semibold mb-1">Command</div>
                  <div className="font-mono text-green-400 text-sm break-all">
                    {selectedPhase.command}
                  </div>
                </div>

                <div className="bg-slate-700/50 rounded-lg p-4">
                  <div className="text-slate-400 text-sm font-semibold mb-1">Output</div>
                  <div className="text-slate-300 text-sm">{selectedPhase.output}</div>
                </div>

                <div className="bg-slate-700/50 rounded-lg p-4">
                  <div className="text-slate-400 text-sm font-semibold mb-2">Characteristics</div>
                  <div className="space-y-1 text-sm text-slate-300">
                    <div>
                      <span className="text-slate-400">Duration:</span> {selectedPhase.duration}
                    </div>
                    <div>
                      <span className="text-slate-400">Risk:</span> {selectedPhase.risk}
                    </div>
                    <div>
                      <span className="text-slate-400">Investment:</span> {selectedPhase.investment}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Feedback Loops Explanation */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {FEEDBACK_LOOPS.map((loop) => (
          <motion.div
            key={`explain-${loop.from}-${loop.to}`}
            variants={itemVariants}
            className="bg-slate-800 rounded-lg p-4 border border-slate-600"
          >
            <div className="flex items-start gap-3">
              <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${loop.color} mt-1 flex-shrink-0`} />
              <div>
                <h4 className="font-semibold mb-1">{loop.label}</h4>
                <p className="text-slate-400 text-sm">{loop.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
