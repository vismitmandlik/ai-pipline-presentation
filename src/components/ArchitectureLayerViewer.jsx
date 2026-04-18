import React, { useState } from 'react';
import { motion } from 'framer-motion';
import LayerCard from './LayerCard';
import LayerConnection from './LayerConnection';

const ARCHITECTURE_DATA = [
  {
    id: 'layer-commands',
    name: 'Layer 1: Commands',
    description: 'User-facing slash commands that delegate work to agents',
    emoji: '⌘',
    color: 'from-blue-500 to-blue-600',
    items: [
      { id: 'cmd-code', name: '/start-code', description: 'Add detection signals', icon: '💻' },
      { id: 'cmd-setup', name: '/start-environment-setup', description: 'Provision environment', icon: '⚙️' },
      { id: 'cmd-test', name: '/start-test', description: 'Validate detection', icon: '✅' },
      { id: 'cmd-research', name: '/start-research', description: 'Research patterns', icon: '🔬' },
      { id: 'cmd-list', name: '/list-languages', description: 'Coverage status', icon: '📋' },
    ],
  },
  {
    id: 'layer-agents',
    name: 'Layer 2: Agents',
    description: 'Detailed procedural logic that executes phases and coordinates the pipeline',
    emoji: '🤖',
    color: 'from-purple-500 to-purple-600',
    items: [
      { id: 'agent-code', name: 'add-detect-language-code', description: 'Phase 3: Gap analysis & signal addition', icon: '🧩' },
      { id: 'agent-setup', name: 'environment-setup', description: 'Phase 2: OS detection & provisioning', icon: '🏗️' },
      { id: 'agent-test', name: 'test-language-detection', description: 'Phase 4: Binary validation', icon: '🔍' },
      { id: 'agent-research', name: 'deployment-researcher', description: 'Phase 1: Pattern research', icon: '📚' },
      { id: 'agent-lister', name: 'language-lister', description: 'Coverage reporting', icon: '📊' },
      { id: 'agent-infra', name: 'environment-infra-setup', description: 'Infrastructure provisioning', icon: '🔧' },
      { id: 'agent-app', name: 'environment-app-setup', description: 'Application deployment', icon: '🚀' },
    ],
  },
  {
    id: 'layer-skills',
    name: 'Layer 3: Skills',
    description: 'Reusable patterns for detection signals and deployment variants',
    emoji: '📖',
    color: 'from-green-500 to-green-600',
    items: [
      { id: 'skill-detect', name: 'detect-language/SKILL.md', description: 'Signal catalogue across 5 stages', icon: '🎯' },
      { id: 'skill-tomcat-linux', name: 'tomcat-linux-systemd', description: 'Tomcat on Linux deployment', icon: '🐱' },
      { id: 'skill-springboot', name: 'springboot-jar-*', description: 'Spring Boot deployment variants', icon: '🍃' },
      { id: 'skill-aspnet', name: 'aspnetcore-*', description: 'ASP.NET Core variants', icon: '.️⃣' },
      { id: 'skill-wildfly', name: 'jboss-wildfly-*', description: 'JBoss WildFly deployment', icon: '🐺' },
      { id: 'skill-infra', name: 'environment-setup/*', description: 'Infrastructure setup utilities', icon: '⚡' },
    ],
  },
];

const CONNECTIONS = [
  {
    from: 'cmd-code',
    to: 'agent-code',
    label: 'invokes',
  },
  {
    from: 'cmd-setup',
    to: 'agent-setup',
    label: 'invokes',
  },
  {
    from: 'cmd-test',
    to: 'agent-test',
    label: 'invokes',
  },
  {
    from: 'cmd-research',
    to: 'agent-research',
    label: 'invokes',
  },
  {
    from: 'agent-code',
    to: 'skill-detect',
    label: 'reads',
  },
  {
    from: 'agent-setup',
    to: 'skill-tomcat-linux',
    label: 'uses',
  },
  {
    from: 'agent-setup',
    to: 'skill-springboot',
    label: 'uses',
  },
  {
    from: 'agent-research',
    to: 'skill-detect',
    label: 'creates',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const layerVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

export default function ArchitectureLayerViewer({ animationActive }) {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <div className="space-y-12">
      {/* Overview */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="bg-gradient-to-r from-slate-800 to-slate-700 rounded-xl p-6 border border-slate-600"
      >
        <motion.h2 variants={layerVariants} className="text-2xl font-bold mb-2">
          3-Layer Architecture Model
        </motion.h2>
        <motion.p variants={layerVariants} className="text-slate-300 max-w-3xl">
          Separation of concerns: Commands are thin wrappers, Agents contain execution logic,
          Skills encode reusable knowledge that can be shared across projects.
        </motion.p>
      </motion.div>

      {/* 3-Layer Diagram */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {ARCHITECTURE_DATA.map((layer, idx) => (
            <motion.div
              key={layer.id}
              variants={layerVariants}
              className="space-y-4"
            >
              {/* Layer Header */}
              <div className={`rounded-lg p-4 bg-gradient-to-r ${layer.color} bg-opacity-10 border border-current border-opacity-30`}>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">{layer.emoji}</span>
                  <h3 className="text-lg font-bold">{layer.name}</h3>
                </div>
                <p className="text-sm text-slate-400">{layer.description}</p>
              </div>

              {/* Items */}
              <div className="space-y-3">
                {layer.items.map((item) => (
                  <LayerCard
                    key={item.id}
                    item={item}
                    layerColor={layer.color}
                    isSelected={selectedItem?.id === item.id}
                    onSelect={() => setSelectedItem(selectedItem?.id === item.id ? null : item)}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Connections SVG */}
        <svg
          className="w-full h-96 pointer-events-none mt-8"
          style={{ minHeight: '300px' }}
          preserveAspectRatio="none"
        >
          <defs>
            <marker
              id="arrowhead-connection"
              markerWidth="10"
              markerHeight="10"
              refX="9"
              refY="3"
              orient="auto"
            >
              <polygon points="0 0, 10 3, 0 6" fill="#a78bfa" />
            </marker>
          </defs>

          {/* Simplified connection visualization */}
          <text x="50%" y="20" textAnchor="middle" fill="#9ca3af" fontSize="14">
            Commands invoke Agents • Agents use Skills • Skills drive phases
          </text>
        </svg>
      </motion.div>

      {/* Detailed View */}
      {selectedItem && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-slate-800 rounded-xl p-8 border border-slate-600"
        >
          <div className="flex items-start gap-4">
            <div className="text-4xl">{selectedItem.icon}</div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-2">{selectedItem.name}</h3>
              <p className="text-slate-300 mb-4">{selectedItem.description}</p>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <div className="text-slate-400 text-sm font-semibold mb-2">Purpose</div>
                  <p className="text-slate-300 text-sm">
                    {selectedItem.description}
                  </p>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <div className="text-slate-400 text-sm font-semibold mb-2">Related To</div>
                  <p className="text-slate-300 text-sm">
                    Part of the modular architecture supporting all 4 phases
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Data Flow Explanation */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="bg-slate-800 rounded-xl p-8 border border-slate-600 space-y-6"
      >
        <h3 className="text-xl font-bold">Data Flow Example: /start-code java</h3>

        <div className="space-y-4">
          {[
            {
              step: 1,
              layer: 'Commands',
              action: 'User types /start-code java',
              detail: 'Command validates "java" is a real language',
            },
            {
              step: 2,
              layer: 'Agents',
              action: 'add-detect-language-code agent spawns',
              detail: 'Reads SKILL.md, language.go, identifies gaps',
            },
            {
              step: 3,
              layer: 'Skills',
              action: 'Consults detect-language/SKILL.md',
              detail: 'Extracts Java signals from Signal Catalogue',
            },
            {
              step: 4,
              layer: 'Agents',
              action: 'Agent adds missing signals to code',
              detail: 'Writes tests, runs gofmt, go test, go build',
            },
            {
              step: 5,
              layer: 'Output',
              action: 'Updated binary + registry',
              detail: 'bin/motadata-host-agent ready for Phase 4',
            },
          ].map((item) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: item.step * 0.1 }}
              className="flex gap-4"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center font-bold">
                {item.step}
              </div>
              <div className="flex-1">
                <div className="font-semibold text-slate-200">{item.action}</div>
                <div className="text-sm text-slate-400 mt-1">{item.detail}</div>
              </div>
              <div className="text-xs font-mono text-slate-500 self-center">
                {item.layer}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
