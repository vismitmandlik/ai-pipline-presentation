import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PHASES = [
  {
    id: 1,
    name: 'Research',
    emoji: '🔬',
    goal: 'Research deployment patterns and generate SKILL.md files',
    gradient: 'from-blue-500 via-cyan-500 to-teal-500',
    glow: 'rgba(59, 130, 246, 0.4)',
    status: 'active',
    improvements: {
      quality: [
        'Validate signal coverage across all 5 stages (environ, cmdline, files, maps, exepath) before writing SKILL.md',
        'Add cross-SKILL conflict detection — flag overlapping detection signals that confuse Phase 3',
        'Implement source authority scoring — rank sources as official/community/indirect',
        'Add manifest pre-validation — ensure enumerated patterns are production-common (not legacy)',
        'Require minimum of 2 authoritative sources per SKILL.md heuristic',
      ],
      security: [
        'Restrict WebFetch to approved domains only (official vendor docs, distro packages, standards bodies)',
        'Sanitize and validate all fetched content before embedding in SKILL.md',
        'Prevent exposure of sensitive paths in detection heuristics (database creds, private keys)',
        'Add permission checks — ensure sub-agents only Write to .claude/skills/ directory',
        'Log all research sources and confidence levels for audit trail',
      ],
      token: [
        'Implement template caching — reference SKILL.md structure once instead of repeating to each sub-agent (~5,400 tokens saved per language)',
        'Consolidate WebSearch queries — orchestrator does 1 multi-pattern search, sub-agents reuse results (600-900 tokens saved)',
        'Cache research results for common patterns (systemd, Docker, init.d across languages) — reuse 80% of content',
        'Structure output as YAML (detection signals, paths, env vars) instead of prose — 30% more compact',
        'Batch similar sub-agents (e.g., all "systemd" variants) to share research context',
      ],
    },
  },
  {
    id: 2,
    name: 'Provision',
    emoji: '⚙️',
    goal: 'Build real deployment environment and document ground truth',
    gradient: 'from-purple-500 via-fuchsia-500 to-pink-500',
    glow: 'rgba(168, 85, 247, 0.4)',
    status: 'active',
    improvements: {
      quality: [
        'Add pre-flight checks — verify OS capabilities before attempting provisioning (kernel version, available runtimes)',
        "Implement atomic provisioning — rollback on failure, don't leave half-built environments",
        'Add environment fingerprinting — generate deterministic hash of deployed state for reproducibility',
        'Validate deployed service matches SKILL.md expectations (process name, env vars, paths)',
        'Document exact versions of runtime, framework, supervisor (not just "Java", but "openjdk-11.0.15")',
      ],
      security: [
        'Run provisioning in isolated container/VM, not on host system',
        'Implement zero-trust for downloaded artifacts — verify signatures of all binaries (JARs, packages, scripts)',
        'Add network isolation — only allow outbound to package repos, block everything else during provisioning',
        'Sanitize all user-provided inputs before shell execution (prevent injection in app names, paths, ports)',
        'Add secrets management — never log credentials, API keys, certificates; rotate test secrets after each run',
        'Implement least-privilege permissions — provisioned services run as dedicated users, not root',
      ],
      token: [
        'Cache provisioning scripts — reuse install steps across similar technologies (Java runtimes across variants)',
        'Parallelize independent setup steps (runtime install, supervisor config, app deployment)',
        'Stream verbose logs to file, feed only errors/summaries to LLM context (~40% token reduction)',
        'Use lightweight base images/VMs instead of full OS to reduce provisioning time and context',
        'Skip unnecessary post-provisioning validation if pre-flight checks pass',
      ],
    },
  },
  {
    id: 3,
    name: 'Detect',
    emoji: '💻',
    goal: 'Generate detection code from research findings and compile binary',
    gradient: 'from-emerald-500 via-green-500 to-lime-500',
    glow: 'rgba(16, 185, 129, 0.4)',
    status: 'active',
    improvements: {
      quality: [
        'Add type safety checks — validate signal types (environ must be string, exepath must be path, etc.)',
        'Implement signal priority ordering — ensure stages are evaluated in correct descending-confidence order',
        'Add dead-code detection — flag signals that never trigger in Phase 4 tests (unused detection code)',
        "Validate regex patterns in cmdline/files signals — ensure they compile and don't false-positive",
        'Cross-validate with SKILL.md — ensure generated code matches documented heuristics exactly',
      ],
      security: [
        'Sandbox code generation — generated code cannot call external APIs, network, or system commands',
        'Restrict imports — generated detection code only imports stdlib, no third-party dependencies',
        'Add bounds checking — protect against regex ReDoS, out-of-bounds array access, etc.',
        'Validate all file paths are safe (not /etc/shadow, /root/.ssh, etc.)',
        'Add secret scanning — flag if environment var detection leaks credentials (MYSQL_PASSWORD, API_KEY, etc.)',
      ],
      token: [
        'Use structured SKILL.md output from Phase 1 — direct YAML→code generation (80% less interpretation needed)',
        'Implement code generation templates — fill blanks instead of regenerating from scratch (60% token reduction)',
        'Cache common detection patterns (systemd parent process check, env var presence, file existence)',
        'Skip full code rewrite if only one signal changed — surgical updates instead of full regeneration',
        'Stream generated code incrementally to user instead of building full context',
      ],
    },
  },
  {
    id: 4,
    name: 'Test',
    emoji: '✅',
    goal: 'Verify agent detects deployed services correctly',
    gradient: 'from-amber-500 via-orange-500 to-red-500',
    glow: 'rgba(245, 158, 11, 0.4)',
    status: 'active',
    improvements: {
      quality: [
        'Add signal-by-signal testing — report which stage (environ/cmdline/files/maps/exepath) passed/failed',
        'Implement false-positive testing — run against other languages to ensure no cross-contamination',
        'Add coverage metrics — report % of signals actually triggered vs total available',
        'Test edge cases — missing env vars, modified paths, non-standard usernames',
        'Validate JSON output structure matches schema (not just language detection)',
      ],
      security: [
        "Isolate test execution — don't run on production systems, use clean environment only",
        'Add sandboxing — test processes cannot access host filesystem, network, or other services',
        'Implement read-only testing — verify agent detects without modifying environment',
        'Log all detections with timestamps for audit — prove agent ran and what it found',
        "Add integrity checks — verify binary hasn't been tampered with before execution",
      ],
      token: [
        'Cache test environment state between runs — skip re-provisioning if environment unchanged',
        'Implement incremental testing — only test newly added/modified detection signals',
        'Stream test results as they arrive instead of accumulating full report in context',
        'Use binary search for debugging failed tests — narrow down which signal failed (exponential speedup)',
        'Batch similar test cases — test all "environ vars" together with shared context',
      ],
    },
  },
  {
    id: 5,
    name: 'Auto-Instrumentation',
    emoji: '🚀',
    goal: 'Automatically deploy monitoring, tracing, and observability agents to detected services',
    gradient: 'from-violet-500 via-indigo-500 to-blue-500',
    glow: 'rgba(139, 92, 246, 0.4)',
    status: 'future',
    statusNote: 'Planned for future implementation. Not currently active in the pipeline.',
    improvements: {
      quality: [
        'Validate instrumentation compatibility — ensure agent versions match detected language/runtime versions',
        'Implement deployment dry-run — simulate instrumentation before applying to production',
        'Add health checks — verify instrumentation is reporting metrics/traces after deployment',
        'Cross-validate metrics output — ensure instrumentation produces expected signal structure',
        'Implement rollback capability — remove instrumentation if it causes service degradation',
        'Test instrumentation overhead — measure CPU/memory impact before and after deployment',
        'Validate data collection — verify logs, traces, metrics reach centralized observability platform',
      ],
      security: [
        'Sandbox instrumentation code — agents cannot access unrelated service data or credentials',
        'Implement strict agent allowlist — only deploy signed, verified instrumentation agents',
        'Add network segmentation — instrument agents only communicate to approved observability backend',
        'Sanitize all collected data — remove secrets, credentials, PII from logs/traces/metrics before transmission',
        'Implement per-service isolation — instrumentation on one service cannot affect others',
        'Add rate limiting — prevent instrumentation from flooding observability platform',
        'Implement encrypted communication — all telemetry transmitted over TLS with certificate pinning',
        'Add authentication tokens — instrumentation agents authenticate to observability backend',
      ],
      token: [
        'Cache instrumentation strategies per language — reuse deployment patterns across services',
        'Batch instrumentation deployments — apply to multiple services in parallel with shared context',
        'Use lightweight agent distributions — deploy minimal instrumentation based on detected signals only',
        'Implement incremental instrumentation — add only necessary collectors (logs, traces, metrics)',
        'Stream instrumentation status updates to file, keep only summary in LLM context (~50% token reduction)',
        'Pre-generate instrumentation configs from Phase 1 SKILL.md — avoid runtime generation',
        'Implement zero-recalculation — cache instrumentation decisions for identical language/OS/variant combinations',
      ],
    },
  },
];

const CROSS_PHASE = {
  quality: [
    'Add deterministic tracing — every decision logged with reasoning (why this signal, why this confidence level)',
    'Implement closed-loop validation — Phase 4 failures automatically re-trigger Phase 1/3 with refined scope',
    "Add explainability — agent outputs explain why a language was/wasn't detected",
    "Create regression test suite — ensure new signals don't break previously-working detections",
  ],
  security: [
    'Implement role-based access control — researchers can write SKILL.md, only ops can run on production',
    'Add cryptographic verification — sign all SKILL.md files and generated code',
    'Implement audit logging across all phases — who changed what, when, why',
    "Add threat modeling — identify each phase's attack surface (manifest injection, code injection, etc.)",
  ],
  token: [
    'Implement context compression — summarize Phase 1/2 findings into dense structured format for Phase 3',
    'Use few-shot examples — show 1-2 example SKILL.md files instead of full template to every agent',
    'Implement checkpointing — save intermediate results (enumerated manifest, provisioned state, generated code) to resume if interrupted',
    'Add cost estimation before execution — estimate tokens before running each phase',
  ],
};

const PRIORITY_MATRIX = [
  { improvement: 'Structured YAML output', phase: 1, impact: 'High', impactNote: 'enables 2/3/4', effort: 'Medium', quarter: 'Q1' },
  { improvement: 'Template caching', phase: 1, impact: 'High', impactNote: '13% tokens', effort: 'Low', quarter: 'Q1' },
  { improvement: 'Source authority scoring', phase: 1, impact: 'Medium', effort: 'Medium', quarter: 'Q2' },
  { improvement: 'Atomic provisioning', phase: 2, impact: 'High', impactNote: 'reliability', effort: 'High', quarter: 'Q1' },
  { improvement: 'Secrets management', phase: 2, impact: 'High', impactNote: 'security', effort: 'Medium', quarter: 'Q1' },
  { improvement: 'Network isolation', phase: 2, impact: 'High', impactNote: 'security', effort: 'High', quarter: 'Q2' },
  { improvement: 'Code gen templates', phase: 3, impact: 'High', impactNote: '60% tokens', effort: 'Medium', quarter: 'Q1' },
  { improvement: 'Signal priority validation', phase: 3, impact: 'Medium', effort: 'Low', quarter: 'Q1' },
  { improvement: 'Signal-by-signal reporting', phase: 4, impact: 'High', impactNote: 'debuggability', effort: 'Low', quarter: 'Q1' },
  { improvement: 'Test caching', phase: 4, impact: 'Medium', impactNote: '10-20% speedup', effort: 'Medium', quarter: 'Q2' },
  { improvement: 'Instrumentation strategy caching', phase: 5, impact: 'Medium', impactNote: 'token savings', effort: 'Low', quarter: 'Q2' },
  { improvement: 'Agent allowlist verification', phase: 5, impact: 'High', impactNote: 'security', effort: 'Medium', quarter: 'Q1' },
  { improvement: 'Instrumentation health checks', phase: 5, impact: 'High', impactNote: 'reliability', effort: 'Medium', quarter: 'Q1' },
  { improvement: 'Data sanitization pipeline', phase: 5, impact: 'High', impactNote: 'security/compliance', effort: 'High', quarter: 'Q1' },
  { improvement: 'Instrumentation rollback capability', phase: 5, impact: 'High', impactNote: 'safety', effort: 'Medium', quarter: 'Q2' },
  { improvement: 'Batch instrumentation deployment', phase: 5, impact: 'Medium', impactNote: 'speed', effort: 'Medium', quarter: 'Q2' },
];

const CATEGORIES = [
  { id: 'quality', label: 'Quality', emoji: '✨', color: 'from-blue-500 to-cyan-500', textColor: 'text-blue-400' },
  { id: 'security', label: 'Security', emoji: '🔒', color: 'from-rose-500 to-red-500', textColor: 'text-rose-400' },
  { id: 'token', label: 'Token Usage', emoji: '⚡', color: 'from-amber-500 to-orange-500', textColor: 'text-amber-400' },
];

export default function RoadmapViewer() {
  const [activePhase, setActivePhase] = useState(1);
  const [activeCategory, setActiveCategory] = useState('quality');
  const [filterPhase, setFilterPhase] = useState('all');
  const [filterImpact, setFilterImpact] = useState('all');

  const phase = PHASES.find((p) => p.id === activePhase);
  const category = CATEGORIES.find((c) => c.id === activeCategory);

  const filteredMatrix = PRIORITY_MATRIX.filter((item) => {
    if (filterPhase !== 'all' && item.phase !== parseInt(filterPhase)) return false;
    if (filterImpact !== 'all' && item.impact !== filterImpact) return false;
    return true;
  });

  return (
    <div className="space-y-12">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-8"
      >
        <div className="inline-block px-4 py-1 rounded-full bg-white/5 border border-white/10 text-xs tracking-widest uppercase text-slate-400 font-semibold mb-4">
          Improvement Roadmap
        </div>
        <h2 className="text-5xl md:text-6xl font-black leading-tight mb-4">
          <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            Building
          </span>
          <br />
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            the Next Generation.
          </span>
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
          Quality, Security, and Token Usage improvements planned across all phases — including future Auto-Instrumentation.
        </p>
      </motion.div>

      {/* Phase tabs */}
      <div className="flex flex-wrap justify-center gap-2 md:gap-3">
        {PHASES.map((p) => {
          const isActive = activePhase === p.id;
          const isFuture = p.status === 'future';
          return (
            <motion.button
              key={p.id}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActivePhase(p.id)}
              className={`relative overflow-hidden rounded-2xl border px-4 py-3 transition-all ${
                isActive
                  ? 'border-white/30 bg-white/10'
                  : 'border-white/10 bg-white/5 hover:border-white/20'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activePhaseBg"
                  className={`absolute inset-0 bg-gradient-to-br ${p.gradient} opacity-20`}
                />
              )}
              <div className="relative flex items-center gap-2">
                <span className="text-2xl">{p.emoji}</span>
                <div className="text-left">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold tracking-widest uppercase text-slate-500">
                      Phase {p.id}
                    </span>
                    {isFuture && (
                      <motion.span
                        animate={{ opacity: [0.6, 1, 0.6] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-[9px] font-black px-1.5 py-0.5 rounded bg-violet-500/20 border border-violet-400/40 text-violet-300 uppercase"
                      >
                        Future
                      </motion.span>
                    )}
                  </div>
                  <div className={`text-sm font-black ${isActive ? 'text-white' : 'text-slate-300'}`}>
                    {p.name}
                  </div>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Phase details */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activePhase}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="relative rounded-3xl overflow-hidden border border-white/10"
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${phase.gradient} opacity-10`} />
          <div className="absolute inset-[1px] bg-slate-900/90 rounded-3xl backdrop-blur-xl" />

          <div className="relative p-6 md:p-8">
            {/* Phase header */}
            <div className="flex items-start gap-4 mb-6 flex-wrap">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-5xl"
                style={{ filter: `drop-shadow(0 0 20px ${phase.glow})` }}
              >
                {phase.emoji}
              </motion.div>
              <div className="flex-1 min-w-[250px]">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold tracking-widest uppercase text-slate-500">
                    Phase {phase.id}
                  </span>
                  {phase.status === 'future' && (
                    <span className="text-[10px] font-black px-2 py-0.5 rounded bg-violet-500/20 border border-violet-400/40 text-violet-300 uppercase">
                      Future Scope
                    </span>
                  )}
                </div>
                <h3 className={`text-3xl font-black bg-gradient-to-r ${phase.gradient} bg-clip-text text-transparent mb-1`}>
                  {phase.name}
                </h3>
                <p className="text-slate-300">
                  <span className="text-slate-500 font-semibold">Goal: </span>
                  {phase.goal}
                </p>
                {phase.statusNote && (
                  <div className="mt-3 p-3 rounded-xl bg-violet-500/10 border border-violet-400/20 text-sm text-violet-200">
                    ℹ️ {phase.statusNote}
                  </div>
                )}
              </div>
            </div>

            {/* Category tabs */}
            <div className="flex flex-wrap gap-2 mb-6">
              {CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat.id;
                const count = phase.improvements[cat.id].length;
                return (
                  <motion.button
                    key={cat.id}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`relative overflow-hidden rounded-full border px-5 py-2.5 transition-all ${
                      isActive
                        ? 'border-white/30 text-white'
                        : 'border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeCategoryBg"
                        className={`absolute inset-0 bg-gradient-to-r ${cat.color} opacity-30`}
                      />
                    )}
                    <div className="relative flex items-center gap-2">
                      <span>{cat.emoji}</span>
                      <span className="font-bold text-sm">{cat.label}</span>
                      <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-md ${isActive ? 'bg-white/20' : 'bg-white/5'}`}>
                        {count}
                      </span>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Improvement items */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activePhase}-${activeCategory}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-3"
              >
                {phase.improvements[activeCategory].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ x: 4, scale: 1.01 }}
                    className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 p-4 transition-all"
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`flex-shrink-0 w-7 h-7 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center font-black text-white text-xs shadow-lg`}
                      >
                        {i + 1}
                      </div>
                      <p className="text-sm text-slate-300 leading-relaxed">{item}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Cross-phase improvements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-slate-900/80 via-slate-900/60 to-slate-900/80 backdrop-blur-xl p-8"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />

        <div className="relative">
          <div className="flex items-center gap-3 mb-6">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              className="text-3xl"
            >
              🔗
            </motion.div>
            <div>
              <h3 className="text-2xl font-bold">Cross-Phase Improvements</h3>
              <p className="text-sm text-slate-400">Enhancements that span the entire pipeline</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {CATEGORIES.map((cat) => (
              <motion.div
                key={cat.id}
                whileHover={{ y: -4 }}
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-5`} />
                <div className="relative">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl">{cat.emoji}</span>
                    <h4 className={`font-black ${cat.textColor}`}>{cat.label}</h4>
                  </div>
                  <div className="space-y-2">
                    {CROSS_PHASE[cat.id].map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-start gap-2 p-2.5 rounded-lg bg-white/5 hover:bg-white/10 transition-all"
                      >
                        <span className={`mt-1 w-1 h-1 rounded-full bg-gradient-to-r ${cat.color} flex-shrink-0`} />
                        <p className="text-xs text-slate-300 leading-relaxed">{item}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Priority matrix */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative rounded-3xl overflow-hidden border border-white/10 bg-slate-900/80 backdrop-blur-xl p-6 md:p-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">📊</span>
          <div>
            <h3 className="text-2xl font-bold">Implementation Priority Matrix</h3>
            <p className="text-sm text-slate-400">
              Phases 1-4 are active. Phase 5 improvements are for future scope planning.
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mt-6 mb-4">
          <div>
            <label className="block text-[10px] font-bold tracking-widest uppercase text-slate-500 mb-1">
              Phase
            </label>
            <select
              value={filterPhase}
              onChange={(e) => setFilterPhase(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-white/30 outline-none"
            >
              <option value="all">All Phases</option>
              {PHASES.map((p) => (
                <option key={p.id} value={p.id}>Phase {p.id} · {p.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-[10px] font-bold tracking-widest uppercase text-slate-500 mb-1">
              Impact
            </label>
            <select
              value={filterImpact}
              onChange={(e) => setFilterImpact(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-white/30 outline-none"
            >
              <option value="all">All Impact</option>
              <option value="High">🟢 High</option>
              <option value="Medium">🟡 Medium</option>
            </select>
          </div>
          <div className="flex items-end">
            <div className="text-sm text-slate-400">
              Showing <span className="text-white font-bold">{filteredMatrix.length}</span> of {PRIORITY_MATRIX.length}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-white/5 border-b border-white/10">
                <th className="text-left px-4 py-3 font-bold text-slate-300">Improvement</th>
                <th className="text-center px-4 py-3 font-bold text-slate-300">Phase</th>
                <th className="text-left px-4 py-3 font-bold text-slate-300">Impact</th>
                <th className="text-left px-4 py-3 font-bold text-slate-300">Effort</th>
                <th className="text-center px-4 py-3 font-bold text-slate-300">Quarter</th>
              </tr>
            </thead>
            <tbody>
              {filteredMatrix.map((item, i) => {
                const p = PHASES.find((ph) => ph.id === item.phase);
                return (
                  <motion.tr
                    key={item.improvement}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.03 }}
                    whileHover={{ backgroundColor: 'rgba(255,255,255,0.04)' }}
                    className="border-b border-white/5"
                  >
                    <td className="px-4 py-3 text-slate-200 font-medium">{item.improvement}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-md bg-gradient-to-r ${p.gradient} text-white`}>
                        {p.emoji} {item.phase}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`font-bold ${
                        item.impact === 'High' ? 'text-emerald-400' : 'text-amber-400'
                      }`}>
                        {item.impact === 'High' ? '🟢' : '🟡'} {item.impact}
                      </span>
                      {item.impactNote && (
                        <span className="text-xs text-slate-500 ml-1">({item.impactNote})</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`font-bold ${
                        item.effort === 'Low' ? 'text-emerald-400' :
                        item.effort === 'Medium' ? 'text-amber-400' : 'text-rose-400'
                      }`}>
                        {item.effort === 'Low' ? '🟢' : item.effort === 'Medium' ? '🟡' : '🔴'} {item.effort}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`text-xs font-black px-2 py-1 rounded-md ${
                        item.quarter === 'Q1'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30'
                          : 'bg-blue-500/20 text-blue-300 border border-blue-400/30'
                      }`}>
                        {item.quarter}
                      </span>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Legend */}
        <div className="mt-4 flex flex-wrap gap-4 text-xs text-slate-500">
          <span>🟢 High / Low</span>
          <span>🟡 Medium</span>
          <span>🔴 High effort</span>
          <span className="text-slate-700">•</span>
          <span className="text-emerald-400">Q1</span>
          <span>= Immediate</span>
          <span className="text-blue-400">Q2</span>
          <span>= Next quarter</span>
        </div>
      </motion.div>
    </div>
  );
}
