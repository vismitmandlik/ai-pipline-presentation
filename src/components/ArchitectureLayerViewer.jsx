import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LAYERS = [
  {
    id: 'commands',
    name: 'Commands',
    subtitle: 'User-facing slash commands',
    emoji: '⌘',
    gradient: 'from-blue-500 via-cyan-500 to-teal-500',
    glow: 'rgba(59, 130, 246, 0.4)',
    items: [
      { id: 'cmd-code', name: '/start-code', description: 'Add detection signals', icon: '💻', invokes: 'agent-code' },
      { id: 'cmd-setup', name: '/start-environment-setup', description: 'Provision environment', icon: '⚙️', invokes: 'agent-setup' },
      { id: 'cmd-test', name: '/start-test', description: 'Validate detection', icon: '✅', invokes: 'agent-test' },
      { id: 'cmd-research', name: '/start-research <lang>', description: 'Research patterns for a language', icon: '🔬', invokes: 'agent-research' },
      { id: 'cmd-list', name: '/list-languages', description: 'Coverage status', icon: '📋', invokes: 'agent-lister' },
    ],
  },
  {
    id: 'agents',
    name: 'Agents',
    subtitle: 'Execution logic & orchestration',
    emoji: '🤖',
    gradient: 'from-purple-500 via-fuchsia-500 to-pink-500',
    glow: 'rgba(168, 85, 247, 0.4)',
    items: [
      { id: 'agent-code', name: 'add-detect-language-code', description: 'Phase 3: Gap analysis & signal addition', icon: '🧩', invokes: 'skill-detect' },
      { id: 'agent-setup', name: 'environment-setup', description: 'Phase 2: OS detection & provisioning', icon: '🏗️', invokes: 'skill-tomcat' },
      { id: 'agent-test', name: 'test-language-detection', description: 'Phase 4: Binary validation', icon: '🔍', invokes: null },
      { id: 'agent-research', name: 'deployment-researcher', description: 'Phase 1: Pattern research', icon: '📚', invokes: 'skill-detect' },
      { id: 'agent-lister', name: 'language-lister', description: 'Coverage reporting', icon: '📊', invokes: null },
      { id: 'agent-infra', name: 'environment-infra-setup', description: 'Infrastructure provisioning', icon: '🔧', invokes: 'skill-infra' },
      { id: 'agent-app', name: 'environment-app-setup', description: 'Application deployment', icon: '🚀', invokes: 'skill-tomcat' },
    ],
  },
  {
    id: 'skills',
    name: 'Skills',
    subtitle: 'Reusable knowledge patterns',
    emoji: '📖',
    gradient: 'from-emerald-500 via-green-500 to-lime-500',
    glow: 'rgba(16, 185, 129, 0.4)',
    items: [
      { id: 'skill-detect', name: 'detect-language', description: 'Signal catalogue across 5 detection stages', icon: '🎯' },
      { id: 'skill-tomcat', name: 'tomcat-linux-systemd', description: 'Apache Tomcat on Linux', icon: '🐱' },
      { id: 'skill-springboot', name: 'springboot-jar-*', description: 'Spring Boot variants', icon: '🍃' },
      { id: 'skill-aspnet', name: 'aspnetcore-*', description: 'ASP.NET Core variants', icon: '🎨' },
      { id: 'skill-wildfly', name: 'jboss-wildfly-*', description: 'JBoss WildFly deployment', icon: '🐺' },
      { id: 'skill-infra', name: 'environment-setup/*', description: 'Infrastructure helpers', icon: '⚡' },
    ],
  },
];

export default function ArchitectureLayerViewer({ animationActive }) {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const getConnectedIds = (itemId) => {
    const connected = new Set([itemId]);
    LAYERS.forEach((layer) => {
      layer.items.forEach((item) => {
        if (item.id === itemId && item.invokes) connected.add(item.invokes);
        if (item.invokes === itemId) connected.add(item.id);
      });
    });
    return connected;
  };

  const activeItemId = hoveredItem || selectedItem;
  const connectedIds = activeItemId ? getConnectedIds(activeItemId) : null;

  return (
    <div className="space-y-12">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-8"
      >
        <div className="inline-block px-4 py-1 rounded-full bg-white/5 border border-white/10 text-xs tracking-widest uppercase text-slate-400 font-semibold mb-4">
          Architecture Model
        </div>
        <h2 className="text-5xl md:text-6xl font-black leading-tight mb-4">
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
            Three Layers
          </span>
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
          Hover over any component to see connections across layers.
          Commands invoke Agents. Agents use Skills.
        </p>
      </motion.div>

      {/* Layers */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {LAYERS.map((layer, layerIdx) => (
          <motion.div
            key={layer.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: layerIdx * 0.2 }}
            className="relative"
          >
            {/* Layer header */}
            <div className="relative mb-6">
              <div
                className={`absolute -inset-4 bg-gradient-to-br ${layer.gradient} opacity-20 blur-2xl rounded-3xl`}
              />
              <div className="relative rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-white/10 p-5">
                <div className="flex items-center gap-4">
                  <motion.div
                    animate={animationActive ? { rotate: [0, 10, -10, 0] } : {}}
                    transition={{ duration: 4, repeat: Infinity, delay: layerIdx * 0.5 }}
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${layer.gradient} flex items-center justify-center text-3xl shadow-xl`}
                    style={{ boxShadow: `0 10px 40px ${layer.glow}` }}
                  >
                    {layer.emoji}
                  </motion.div>
                  <div>
                    <div className="text-[10px] font-bold tracking-widest uppercase text-slate-500">
                      Layer {layerIdx + 1}
                    </div>
                    <h3 className={`text-2xl font-black bg-gradient-to-r ${layer.gradient} bg-clip-text text-transparent`}>
                      {layer.name}
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">{layer.subtitle}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Items */}
            <div className="space-y-3">
              {layer.items.map((item, i) => {
                const isConnected = connectedIds && connectedIds.has(item.id);
                const isDimmed = connectedIds && !connectedIds.has(item.id);
                const isActive = activeItemId === item.id;

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{
                      opacity: isDimmed ? 0.25 : 1,
                      x: 0,
                      scale: isActive ? 1.02 : 1,
                    }}
                    transition={{ delay: layerIdx * 0.2 + i * 0.05 }}
                    whileHover={{ x: 4, scale: 1.02 }}
                    onHoverStart={() => setHoveredItem(item.id)}
                    onHoverEnd={() => setHoveredItem(null)}
                    onClick={() => setSelectedItem(selectedItem === item.id ? null : item.id)}
                    className="relative cursor-pointer"
                  >
                    {/* Glow */}
                    {isActive && (
                      <motion.div
                        layoutId="itemGlow"
                        className={`absolute -inset-1 bg-gradient-to-br ${layer.gradient} rounded-2xl blur-md opacity-50`}
                      />
                    )}

                    <div
                      className={`relative rounded-xl border backdrop-blur-md p-4 transition-all ${
                        isActive
                          ? 'border-white/30 bg-white/10'
                          : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="text-2xl flex-shrink-0">{item.icon}</div>
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-sm text-white truncate">
                            {item.name}
                          </div>
                          <div className="text-xs text-slate-400 mt-0.5 line-clamp-2">
                            {item.description}
                          </div>
                        </div>
                        {isConnected && activeItemId !== item.id && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0 mt-2"
                            style={{ boxShadow: '0 0 10px rgba(16, 185, 129, 0.8)' }}
                          />
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Flow arrow between layers */}
            {layerIdx < LAYERS.length - 1 && (
              <div className="hidden lg:flex absolute top-1/2 -right-4 -translate-y-1/2 items-center z-10 pointer-events-none">
                <motion.div
                  animate={animationActive ? { x: [0, 8, 0], opacity: [0.3, 1, 0.3] } : {}}
                  transition={{ duration: 2, repeat: Infinity, delay: layerIdx * 0.5 }}
                  className="text-3xl text-white/40"
                >
                  →
                </motion.div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Data flow example */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-slate-900/80 via-slate-900/60 to-slate-900/80 backdrop-blur-xl p-8"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />

        <div className="relative">
          <div className="flex items-center gap-3 mb-8">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-3xl"
            >
              ⚡
            </motion.div>
            <div>
              <h3 className="text-2xl font-bold">Example Flow</h3>
              <p className="text-sm text-slate-400">Following <code className="text-emerald-400">/start-code java</code> through the system</p>
            </div>
          </div>

          <div className="space-y-3">
            {[
              { layer: 'Commands', action: 'User types /start-code java', detail: 'Validates "java" is a known language', color: 'from-blue-500 to-cyan-500', step: 1 },
              { layer: 'Agents', action: 'add-detect-language-code spawns', detail: 'Reads SKILL.md, language.go, identifies gaps', color: 'from-purple-500 to-pink-500', step: 2 },
              { layer: 'Skills', action: 'Consults detect-language/SKILL.md', detail: 'Extracts Java signals from Signal Catalogue', color: 'from-emerald-500 to-green-500', step: 3 },
              { layer: 'Agents', action: 'Agent adds missing signals', detail: 'Writes tests, runs gofmt, go test, go build', color: 'from-purple-500 to-pink-500', step: 4 },
              { layer: 'Output', action: 'Binary + registry updated', detail: 'bin/motadata-host-agent ready for Phase 4', color: 'from-amber-500 to-orange-500', step: 5 },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ x: 8 }}
                className="group flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center font-black text-white shadow-lg`}
                >
                  {item.step}
                </motion.div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-white">{item.action}</div>
                  <div className="text-sm text-slate-400">{item.detail}</div>
                </div>
                <div className={`text-xs font-bold px-3 py-1 rounded-full bg-gradient-to-r ${item.color} text-white opacity-80 group-hover:opacity-100 transition-opacity`}>
                  {item.layer}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
