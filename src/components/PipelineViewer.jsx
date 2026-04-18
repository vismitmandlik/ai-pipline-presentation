import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PhaseCard from './PhaseCard';

const PHASES = [
  {
    id: 'phase1',
    order: 1,
    name: 'Research',
    title: 'Deployment Pattern Researcher',
    status: 'Active',
    oneLiner: "Choose deployment variants → Edit manifest → Reply 'go' → Get SKILL.md files for each variant.",
    command: '/start-research <lang>',
    emoji: '🔬',
    gradient: 'from-blue-500 via-cyan-500 to-teal-500',
    glowColor: 'rgba(59, 130, 246, 0.5)',
    accentColor: '#3b82f6',
    description: 'Auto-enumerates every deployment variant for a language, lets the user pick which to research, then spawns parallel agents to produce a dedicated SKILL.md per variant.',
    keyActivities: [
      'Auto-generate manifest YAML per language',
      'User selects variants via include: true/false',
      'Spawn parallel research agents on "go"',
      'Write one SKILL.md per enabled variant',
    ],
    howItWorks: [
      {
        title: 'User Invokes Command',
        detail: 'User runs /start-research <lang> (e.g., /start-research java) to kick off research for a specific language.',
        bullets: [],
      },
      {
        title: 'Auto-Generated Manifest',
        detail: 'System scans known deployment patterns and writes research_agent/manifests/<lang>.yaml — one entry per variant:',
        bullets: [
          'tomcat-linux-systemd · Apache Tomcat · linux · systemd',
          'tomcat-windows-service · Apache Tomcat · windows · Windows Service',
          'springboot-jar-linux-systemd · Spring Boot JAR · linux · systemd',
          'standalone-jar-linux-systemd · Standalone JAR · linux · systemd',
          'wildfly-jboss-linux-systemd · JBoss WildFly · linux · systemd',
          'java-windows-service · Java Service · windows · NSSM wrapper',
        ],
      },
      {
        title: 'User Edits Manifest',
        detail: 'User opens the YAML and sets include: false on variants they want to skip. Only variants with include: true are researched — full control, no wasted research.',
        bullets: [],
      },
      {
        title: 'User Replies "go"',
        detail: 'Gate 1: nothing happens until the user explicitly confirms. Prevents accidental research runs and saves tokens on unwanted variants.',
        bullets: [],
      },
      {
        title: 'Parallel Agent Spawning',
        detail: 'System spawns one research agent per enabled variant, running in parallel:',
        bullets: [
          'Each agent independently researches its deployment variant',
          'Agents share no state — clean isolation prevents cross-contamination',
          'Execution scales linearly with variant count',
        ],
      },
      {
        title: 'SKILL.md Generation',
        detail: 'Each agent writes a complete SKILL.md with 5-stage detection signals, provisioning steps, and verification checklist — ready for Phase 2 and Phase 3 consumption.',
        bullets: [
          'Stage 1: Environment variables (highest confidence)',
          'Stage 2: Command-line arguments',
          'Stage 3: File markers in working directory',
          'Stage 4: Shared libraries loaded',
          'Stage 5: Executable path patterns',
        ],
      },
    ],
    filesTouched: [
      { path: 'research_agent/manifests/<lang>.yaml', note: 'generated manifest (user-editable)' },
      { path: '.claude/skills/<variant>/SKILL.md', note: 'one file per enabled variant' },
      { path: 'CLAUDE.md', note: 'change log updated with research summary' },
    ],
    examples: [
      { cmd: '/start-research java', result: 'generates java.yaml with 6 variants', success: true },
      { cmd: 'edit yaml + go', result: '2 SKILL.md files created (tomcat + springboot)', success: true },
      { cmd: '/start-research go', result: 'generates go.yaml with systemd/windows variants', success: true },
      { cmd: '/start-research fakelang', result: 'rejected (no deployment patterns found)', success: false },
    ],
    output: 'SKILL.md files per variant',
    outputIcon: '📄',
    agents: ['deployment-researcher'],
    duration: 'Minutes (parallel)',
    risk: 'Medium',
    investment: 'High',
    stats: { reusability: 95, speed: 70, complexity: 60 },
    model: {
      name: 'Claude Haiku 4.5',
      tier: 'haiku',
      reason: 'Research tasks are well-structured: enumerate deployment variants, extract signals, and document findings into SKILL.md. Haiku delivers fast, cost-efficient research with strong instruction-following — ideal for parallel sub-agent research across many variants.',
      capabilities: ['Fast Research', 'Structured Output', 'Low Cost'],
    },
  },
  {
    id: 'phase2',
    order: 2,
    name: 'Environment Setup',
    title: 'Environment Setup Orchestrator',
    status: 'Active',
    oneLiner: '3-stage AI orchestration: Analysis → Sequential Infra + Parallel App Deploy → Start All Apps. Fully autonomous with troubleshooter escalation on failure.',
    command: '/start-environment-setup',
    emoji: '⚙️',
    gradient: 'from-purple-500 via-fuchsia-500 to-pink-500',
    glowColor: 'rgba(168, 85, 247, 0.5)',
    accentColor: '#a855f7',
    description: 'A Claude Code slash command that runs a 3-stage orchestration loop — detects OS, provisions infra sequentially, deploys apps in parallel, and self-heals via troubleshooter sub-agent.',
    keyActivities: [
      'Stage 1 — AI-driven environment analysis',
      'Stage 2 — Sequential infra + parallel app deploy',
      'Stage 3 — Start all apps & verify /health',
      'Auto-escalates to troubleshooter on failure',
    ],
    howItWorks: [
      {
        title: 'Stage 1 — Analysis (AI does this itself)',
        detail: 'AI inspects the host and classifies every SKILL.md it finds:',
        bullets: [
          'Shell probes: OS, distro, arch, hostname',
          'Scans .claude/skills/ for all SKILL.md files',
          'Classifies each: Compatible / Incompatible / Already Deployed',
          'Checks each compatible app: port up? /health 200? systemd active?',
          'Prints analysis table, asks user: "go / skip / cancel" (Gate 1)',
        ],
      },
      {
        title: 'Stage 2 — Wave 1: Sequential Infra Setup',
        detail: 'For each skill, spawns environment-infra-setup. Sequential to avoid package-manager conflicts:',
        bullets: [
          'Detect package manager (apt / yum / dnf / brew)',
          'Port-conflict check before any mutation',
          'Install system packages (idempotent — only if version mismatch)',
          'Install runtime (dotnet, node, java, etc.)',
          'Configure reverse proxy if needed (nginx / apache)',
          'Run verification commands',
          '2 consecutive failures → escalate to troubleshooter',
        ],
      },
      {
        title: 'Stage 2 — Wave 2: Parallel App Deploy',
        detail: 'Once infra is ready, spawns environment-app-setup for every skill in parallel:',
        bullets: [
          'Resolve output path: apps/{language}/{deployment_type}/',
          'Configure runtime env vars (no DB — HTTP-only apps)',
          'Scaffold minimal single-file HTTP server',
          'Run build commands',
          'Register with systemd (systemctl --user) or pm2',
          'Wait startup_wait_seconds → curl /health → confirm response',
          'Health fail → escalate to troubleshooter',
        ],
      },
      {
        title: 'Troubleshooter Sub-Agent (called on failure)',
        detail: 'Automatic diagnosis + safe auto-fix pipeline. Never makes unsafe changes without asking:',
        bullets: [
          'Collects: disk, memory, port conflicts, journal logs, pkg locks',
          'Diagnoses by category: pkg install / runtime / port / proxy / app',
          'Auto-fixes safe issues (config syntax, stale locks, missing PATH)',
          'Escalates to user for unsafe actions (kill processes, firewall, port changes)',
          'Returns OUTCOME: RESOLVED | STILL_FAILING to caller',
        ],
      },
      {
        title: 'Stage 3 — Start All Apps',
        detail: 'Final verification pass — ensures everything is running and healthy:',
        bullets: [
          'Read docs/environment/current-environment.md',
          'Check systemctl --user is-active for every deployed unit',
          'HTTP apps: curl /health, show response inline',
          'If any stopped → ask "start?" (Gate 2) → start them → confirm',
        ],
      },
      {
        title: 'Ground Truth Generated',
        detail: 'Writes docs/environment/current-environment.md — the single source of truth consumed by Phase 3 (Code) and Phase 4 (Test). Every deployed app tagged with expected_language, pid, cmdline, supervisor.',
        bullets: [],
      },
    ],
    filesTouched: [
      { path: 'docs/environment/current-environment.md', note: 'ground truth manifest for Phase 3/4' },
      { path: 'apps/{language}/{deployment_type}/', note: 'scaffolded HTTP apps per skill' },
      { path: '~/.config/systemd/user/*.service', note: 'user-level systemd units' },
      { path: '~/.local/bin/*', note: 'wrapper scripts for space-free paths' },
      { path: '.claude/logs/environment-setup-*.md', note: 'execution log' },
    ],
    examples: [
      { cmd: 'aspnetcore-linux-systemd', result: 'SUCCESS · port 5000 · /health OK', success: true },
      { cmd: 'dotnet-selfcontained-linux-systemd', result: 'SUCCESS · port 5003 · self-contained', success: true },
      { cmd: 'dotnet-worker-linux-systemd', result: 'SUCCESS · background worker active', success: true },
      { cmd: 'aspnetcore-linux-nginx-systemd', result: 'PARTIAL · Kestrel 5001 up, nginx needs sudo', success: false },
      { cmd: 'aspnetcore-linux-apache-systemd', result: 'PARTIAL · Kestrel 5002 up, apache needs sudo', success: false },
    ],
    subAgents: [
      { name: 'environment-infra-setup', role: 'Installs runtime + packages per skill (sequential)', icon: '🔧' },
      { name: 'environment-app-setup', role: 'Scaffolds + deploys app per skill (parallel)', icon: '🚀' },
      { name: 'environment-setup-troubleshooter', role: 'Diagnoses + auto-fixes on failure (escalates if unsafe)', icon: '🩺' },
    ],
    skillsGrid: [
      { name: 'aspnetcore-linux-systemd', deploys: 'ASP.NET Core + Kestrel, direct (no proxy)', port: '5000', status: 'SUCCESS' },
      { name: 'aspnetcore-linux-nginx-systemd', deploys: 'ASP.NET Core + nginx reverse proxy', port: '5001 / 8080', status: 'PARTIAL', note: 'proxy layer needs sudo' },
      { name: 'aspnetcore-linux-apache-systemd', deploys: 'ASP.NET Core + Apache mod_proxy', port: '5002 / 8081', status: 'PARTIAL', note: 'proxy layer needs sudo' },
      { name: 'dotnet-selfcontained-linux-systemd', deploys: '.NET single-file self-contained binary', port: '5003', status: 'SUCCESS' },
      { name: 'dotnet-worker-linux-systemd', deploys: '.NET BackgroundService Worker (no HTTP)', port: 'none', status: 'SUCCESS' },
    ],
    constraints: [
      {
        problem: 'sudo not available non-interactively',
        solution: 'AI switched to user-level systemd (systemctl --user) instead of system services — no root needed.',
        icon: '🔐',
      },
      {
        problem: 'Project path contains spaces ("AI Hackthon")',
        solution: 'AI wrote wrapper shell scripts in ~/.local/bin/ (space-free) that symlink back to start.sh.',
        icon: '📁',
      },
      {
        problem: 'Reverse proxies (nginx/apache) need sudo to bind',
        solution: 'AI ran Kestrel directly on high ports + scaffolded proxy configs for later — marked PARTIAL transparently.',
        icon: '🔀',
      },
    ],
    runStats: {
      host: 'Ubuntu 24.04.4 LTS · x86_64 · .NET SDK 8.0.420',
      total: 5,
      success: 3,
      partial: 2,
      failed: 0,
      humanInterventions: 0,
    },
    terminalOutput: `# docs/environment/current-environment.md
host:    Ubuntu 24.04.4 LTS · x86_64
runtime: .NET SDK 8.0.420

deployments:
  - skill: aspnetcore-linux-systemd
    port: 5000
    status: SUCCESS
    unit: asp-direct.service (user)
    health: /health → 200 OK

  - skill: aspnetcore-linux-nginx-systemd
    port: 5001 (kestrel)
    status: PARTIAL
    unit: asp-nginx-kestrel.service (user)
    note: nginx reverse proxy not active (needs sudo)

  - skill: aspnetcore-linux-apache-systemd
    port: 5002 (kestrel)
    status: PARTIAL
    unit: asp-apache-kestrel.service (user)
    note: apache mod_proxy not active (needs sudo)

  - skill: dotnet-selfcontained-linux-systemd
    port: 5003
    status: SUCCESS
    unit: dotnet-sc.service (user)
    health: /health → 200 OK

  - skill: dotnet-worker-linux-systemd
    port: none (background)
    status: SUCCESS
    unit: dotnet-worker.service (user)

summary: 5 deployed · 3 SUCCESS · 2 PARTIAL · 0 FAILED · 0 human interventions`,
    output: 'current-environment.md',
    outputIcon: '🏗️',
    agents: ['environment-setup', 'infra-setup', 'app-setup', 'troubleshooter'],
    duration: '5-20 min',
    risk: 'High',
    investment: 'High',
    stats: { reusability: 50, speed: 40, complexity: 90 },
    model: {
      name: 'Claude Sonnet 4.6',
      tier: 'sonnet',
      reason: 'Balanced capability for multi-step orchestration: OS detection, package installation, service deployment, health verification, and autonomous recovery. Sonnet handles tool use reliably without Opus cost overhead.',
      capabilities: ['Tool Use', 'Orchestration', 'Error Recovery'],
    },
  },
  {
    id: 'phase3',
    order: 3,
    name: 'Code',
    title: 'Language Detection Engine',
    status: 'Active',
    oneLiner: 'Dynamically identifies the programming language of every running service — with zero hardcoded assumptions.',
    command: '/start-code <lang>',
    emoji: '💻',
    gradient: 'from-emerald-500 via-green-500 to-lime-500',
    glowColor: 'rgba(16, 185, 129, 0.5)',
    accentColor: '#10b981',
    description: 'Adds or improves detection for one programming language at a time. Each language lives in its own module — no monolithic files, no hardcoded lists.',
    keyActivities: [
      'Runtime validation (probes before touching files)',
      'Modular lang_<name>.go per language',
      'Auto-registration via init()',
      'Build verification (gofmt → test → build)',
    ],
    howItWorks: [
      {
        title: 'Runtime Validation',
        detail: 'Probes the system before touching any file:',
        bullets: [
          'Checks LANGUAGE_DETECTION_REGISTRY.md (already registered = valid)',
          'Runs `which <binary>` to confirm runtime is installed',
          'Queries OS package manager (apt / brew / winget) as fallback',
          'If all probes fail → rejected immediately, zero file I/O',
        ],
      },
      {
        title: 'Modular Implementation',
        detail: 'Creates internal/system/lang_<name>.go implementing 5 detection stages:',
        bullets: [
          'Environ  — runtime env vars  (e.g. PYTHONPATH, NODE_ENV)',
          'CmdLine  — interpreter names (e.g. python3, node, java)',
          'Files    — project markers   (e.g. requirements.txt, go.mod)',
          'Maps     — shared libraries  (e.g. libpython, libjvm.so)',
          'ExePath  — install paths     (e.g. /.pyenv/, /go/bin/)',
        ],
      },
      {
        title: 'Auto-Registration',
        detail: 'Each lang_<name>.go calls Register() in its init() — the binary discovers all languages automatically at startup. No central list to maintain.',
        bullets: [],
      },
      {
        title: 'Idempotency',
        detail: 'Before writing, checks if lang_<name>.go already exists. Duplicate implementations are never created.',
        bullets: [],
      },
      {
        title: 'Build Verification',
        detail: 'Runs gofmt → go test → go build before declaring success. Does not exit until all three pass.',
        bullets: [],
      },
      {
        title: 'Registry Sync',
        detail: 'Updates LANGUAGE_DETECTION_REGISTRY.md with coverage per stage (✅ / ✗) and OS compatibility notes. This is the single source of truth for /list-languages.',
        bullets: [],
      },
    ],
    filesTouched: [
      { path: 'internal/system/lang_<name>.go', note: 'new detector module' },
      { path: 'internal/system/language_test.go', note: 'new test cases' },
      { path: 'LANGUAGE_DETECTION_REGISTRY.md', note: 'coverage table updated' },
      { path: 'CLAUDE.md', note: 'change log updated' },
    ],
    examples: [
      { cmd: '/start-code kotlin', result: 'adds Kotlin detection', success: true },
      { cmd: '/start-code swift', result: 'adds Swift detection', success: true },
      { cmd: '/start-code assembly', result: 'adds Assembly/NASM detection', success: true },
      { cmd: '/start-code bhailang', result: 'rejected (not a real language)', success: false },
    ],
    output: 'motadata-host-agent',
    outputIcon: '📦',
    agents: ['add-detect-language-code'],
    duration: 'Seconds',
    risk: 'Low',
    investment: 'Medium',
    stats: { reusability: 85, speed: 95, complexity: 50 },
    model: {
      name: 'Claude Sonnet 4.6',
      tier: 'sonnet',
      reason: 'Strong coding performance with fast iteration. Understands Go semantics, writes idiomatic tests, and handles the gofmt → test → build pipeline reliably without over-engineering.',
      capabilities: ['Code Generation', 'Test Writing', 'Refactoring'],
    },
  },
  {
    id: 'phase4',
    order: 4,
    name: 'Test',
    title: 'Detection Validator',
    status: 'Active',
    oneLiner: 'Runs the compiled binary against every deployed app and validates that each language is detected correctly — pinpointing exactly which stage failed.',
    command: '/start-test',
    emoji: '✅',
    gradient: 'from-amber-500 via-orange-500 to-red-500',
    glowColor: 'rgba(245, 158, 11, 0.5)',
    accentColor: '#f59e0b',
    description: 'Validates the language detection binary against real deployed applications. On failure, reports the exact detection stage that missed — guiding the next iteration.',
    keyActivities: [
      'Load ground truth from Phase 2',
      'Execute binary on live system',
      'Compare detected vs expected',
      'Diagnose failed stage',
    ],
    howItWorks: [
      {
        title: 'Ground Truth Loading',
        detail: 'Reads docs/environment/current-environment.md produced by Phase 2:',
        bullets: [
          'Extracts deployed apps with expected_language',
          'Captures PID, cmdline, supervisor per app',
          'Source of truth — no guessing, no mocks',
        ],
      },
      {
        title: 'Binary Execution',
        detail: 'Runs bin/motadata-host-agent against the live system:',
        bullets: [
          'Agent scans all running processes',
          'Emits JSON with detected language per process',
          'Tests against real deployed state, not simulations',
        ],
      },
      {
        title: 'Match & Compare',
        detail: 'For each deployed app from Phase 2:',
        bullets: [
          'Locates the process in agent output by PID / cmdline',
          'Compares detected_language vs expected_language',
          'Marks PASS on match, FAIL on mismatch',
        ],
      },
      {
        title: 'Stage-Level Diagnosis',
        detail: 'On FAIL, identifies which of the 5 detection stages missed:',
        bullets: [
          'Environ  — expected env var not present',
          'CmdLine  — binary name / args didn\'t match',
          'Files    — working dir missing project markers',
          'Maps     — expected shared lib not loaded',
          'ExePath  — install path didn\'t match pattern',
        ],
      },
      {
        title: 'Feedback Report',
        detail: 'Prints a structured per-app result with actionable next steps:',
        bullets: [
          'PASS — language detected correctly',
          'FAIL — missing stage + suggested fix',
          'Points user back to /start-code or /start-research',
        ],
      },
      {
        title: 'Zero Mutations',
        detail: 'Read-only operation. Does not modify any files, processes, or the binary. Pure validation — safe to run repeatedly.',
        bullets: [],
      },
    ],
    filesTouched: [
      { path: 'docs/environment/current-environment.md', note: 'read for expected state' },
      { path: 'bin/motadata-host-agent', note: 'executed, JSON output parsed' },
      { path: '(no files written)', note: 'pure read / report operation' },
    ],
    examples: [
      { cmd: '/start-test', result: 'tomcat detected as java', success: true },
      { cmd: '/start-test', result: 'aspnetcore detected as csharp', success: true },
      { cmd: '/start-test', result: 'springboot missed Environ stage', success: false },
      { cmd: '/start-test', result: 'python app missed CmdLine stage', success: false },
    ],
    output: 'PASS/FAIL report',
    outputIcon: '📊',
    agents: ['test-language-detection'],
    duration: 'Seconds',
    risk: 'Low',
    investment: 'Low',
    stats: { reusability: 30, speed: 98, complexity: 20 },
    model: {
      name: 'Claude Haiku 4.5',
      tier: 'haiku',
      reason: 'Simple structured task: run binary, parse JSON output, compare against ground truth, emit PASS/FAIL. Haiku delivers sub-second responses at a fraction of the cost — ideal for rapid validation loops.',
      capabilities: ['Fast Response', 'JSON Parsing', 'Low Cost'],
    },
  },
];

const MODEL_TIERS = {
  opus: {
    label: 'Opus',
    gradient: 'from-rose-500 via-pink-500 to-purple-500',
    glow: 'rgba(236, 72, 153, 0.5)',
    icon: '🧠',
    tagline: 'Maximum Intelligence',
  },
  sonnet: {
    label: 'Sonnet',
    gradient: 'from-indigo-500 via-blue-500 to-cyan-500',
    glow: 'rgba(99, 102, 241, 0.5)',
    icon: '⚡',
    tagline: 'Balanced Power',
  },
  haiku: {
    label: 'Haiku',
    gradient: 'from-emerald-500 via-green-500 to-teal-500',
    glow: 'rgba(16, 185, 129, 0.5)',
    icon: '🚀',
    tagline: 'Speed & Efficiency',
  },
};

export default function PipelineViewer({ selectedPhase, onSelectPhase, animationActive, activeStep }) {
  return (
    <div className="space-y-12">
      {/* Hero section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4 py-8"
      >
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="inline-block px-4 py-1 rounded-full bg-white/5 border border-white/10 text-xs tracking-widest uppercase text-slate-400 font-semibold"
        >
          Language Detection Pipeline
        </motion.div>
        <h2 className="text-5xl md:text-6xl font-black leading-tight">
          <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            One Seamless Pipeline.
          </span>
          <br />
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Zero Config. Full Visibility
          </span>
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
          Sequential workflow where each phase builds on the previous —
          from research to tested binary.
        </p>
      </motion.div>

      {/* Stats bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {[
          { label: 'Phases', value: '4', icon: '🔄' },
          { label: 'Agents', value: '7+', icon: '🤖' },
          { label: 'Skills', value: '20+', icon: '🎯' },
          { label: 'Detection Stages', value: '5', icon: '🔍' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            whileHover={{ y: -4, scale: 1.02 }}
            className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-6"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-indigo-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10 transition-all duration-500" />
            <div className="relative">
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-black">{stat.value}</div>
              <div className="text-sm text-slate-400 mt-1">{stat.label}</div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Pipeline flow */}
      <div className="relative">
        {/* Connection SVG overlay */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block"
          style={{ zIndex: 1 }}
        >
          <defs>
            <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="33%" stopColor="#a855f7" />
              <stop offset="66%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
        </svg>

        {/* Phase cards */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" style={{ zIndex: 2 }}>
          {PHASES.map((phase, idx) => (
            <React.Fragment key={phase.id}>
              <PhaseCard
                phase={phase}
                index={idx}
                isSelected={selectedPhase?.id === phase.id}
                isActive={activeStep === idx}
                onSelect={() => onSelectPhase(selectedPhase?.id === phase.id ? null : phase)}
                animationActive={animationActive}
              />
              {idx < PHASES.length - 1 && (
                <FlowConnector
                  key={`connector-${idx}`}
                  fromColor={phase.accentColor}
                  toColor={PHASES[idx + 1].accentColor}
                  animationActive={animationActive}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Expanded details */}
      <AnimatePresence>
        {selectedPhase && (
          <motion.div
            key={selectedPhase.id}
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            transition={{ duration: 0.4, type: 'spring' }}
            className="overflow-hidden"
          >
            <PhaseDetails phase={selectedPhase} onClose={() => onSelectPhase(null)} />
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

function FlowConnector({ fromColor, toColor, animationActive }) {
  return (
    <div className="hidden lg:flex absolute items-center justify-center pointer-events-none" style={{ display: 'none' }}>
      {/* Desktop connector line is handled via CSS; kept minimal here */}
    </div>
  );
}

function PhaseDetails({ phase, onClose }) {
  return (
    <motion.div
      className="relative rounded-3xl overflow-hidden mt-8"
    >
      {/* Gradient border effect */}
      <div className={`absolute inset-0 bg-gradient-to-br ${phase.gradient} opacity-20`} />
      <div className="absolute inset-[1px] bg-slate-900/95 rounded-3xl backdrop-blur-xl" />

      <div className="relative p-8 md:p-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-8 flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className={`text-6xl filter drop-shadow-lg`}
              style={{ filter: `drop-shadow(0 0 20px ${phase.glowColor})` }}
            >
              {phase.emoji}
            </motion.div>
            <div>
              <div className="flex items-center gap-3 text-slate-400 text-sm font-semibold tracking-widest uppercase">
                <span>Phase {phase.order}</span>
                {phase.title && (
                  <>
                    <span className="text-slate-600">·</span>
                    <span>Currently: {phase.name}</span>
                  </>
                )}
                {phase.status && (
                  <motion.span
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="inline-flex items-center gap-1.5 text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 normal-case tracking-normal"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    {phase.status}
                  </motion.span>
                )}
              </div>
              <h3 className={`text-4xl font-black bg-gradient-to-r ${phase.gradient} bg-clip-text text-transparent`}>
                {phase.title || phase.name}
              </h3>
              {phase.oneLiner && (
                <p className="text-slate-300 mt-2 max-w-2xl">{phase.oneLiner}</p>
              )}
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all"
          >
            ✕
          </motion.button>
        </div>

        {/* Model selection banner */}
        {phase.model && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative mb-8 overflow-hidden rounded-2xl border border-white/10"
          >
            <div
              className={`absolute inset-0 bg-gradient-to-r ${MODEL_TIERS[phase.model.tier].gradient} opacity-20`}
            />
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
            <div className="relative p-6">
              <div className="flex items-start gap-5 flex-wrap">
                <motion.div
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                  className={`flex-shrink-0 w-20 h-20 rounded-2xl bg-gradient-to-br ${MODEL_TIERS[phase.model.tier].gradient} flex items-center justify-center text-4xl shadow-2xl`}
                  style={{ boxShadow: `0 0 40px ${MODEL_TIERS[phase.model.tier].glow}` }}
                >
                  {MODEL_TIERS[phase.model.tier].icon}
                </motion.div>
                <div className="flex-1 min-w-[250px]">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold tracking-widest uppercase text-slate-400">
                      Model Used
                    </span>
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-md bg-gradient-to-r ${MODEL_TIERS[phase.model.tier].gradient} text-white uppercase tracking-wider`}>
                      {MODEL_TIERS[phase.model.tier].label}
                    </span>
                  </div>
                  <div className={`text-2xl font-black bg-gradient-to-r ${MODEL_TIERS[phase.model.tier].gradient} bg-clip-text text-transparent mb-1`}>
                    {phase.model.name}
                  </div>
                  <div className="text-sm text-slate-300 italic mb-3">
                    "{MODEL_TIERS[phase.model.tier].tagline}"
                  </div>
                  <div className="text-sm text-slate-300 leading-relaxed mb-3">
                    <span className="font-semibold text-white">Why this model? </span>
                    {phase.model.reason}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {phase.model.capabilities.map((cap) => (
                      <span
                        key={cap}
                        className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-white/10 border border-white/20 text-white"
                      >
                        ✓ {cap}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Description & activities */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h4 className="text-xs font-bold tracking-wider uppercase text-slate-500 mb-3">
                Description
              </h4>
              <p className="text-slate-200 text-lg leading-relaxed">{phase.description}</p>
            </div>

            <div>
              <h4 className="text-xs font-bold tracking-wider uppercase text-slate-500 mb-3">
                Key Activities
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {phase.keyActivities.map((activity, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
                  >
                    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${phase.gradient}`} />
                    <span className="text-slate-300 text-sm">{activity}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Stats bars */}
            <div>
              <h4 className="text-xs font-bold tracking-wider uppercase text-slate-500 mb-3">
                Phase Characteristics
              </h4>
              <div className="space-y-3">
                {Object.entries(phase.stats).map(([key, value]) => (
                  <div key={key}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-400 capitalize">{key}</span>
                      <span className="text-white font-bold">{value}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${value}%` }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className={`h-full rounded-full bg-gradient-to-r ${phase.gradient}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Side info */}
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="text-xs font-bold tracking-wider uppercase text-slate-500 mb-2">
                Command
              </div>
              <code className="text-sm text-emerald-400 font-mono break-all">
                {phase.command}
              </code>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="text-xs font-bold tracking-wider uppercase text-slate-500 mb-2">
                Output
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xl">{phase.outputIcon}</span>
                <span className="text-slate-200 text-sm">{phase.output}</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="text-xs font-bold tracking-wider uppercase text-slate-500 mb-2">
                Agents
              </div>
              <div className="flex flex-wrap gap-2">
                {phase.agents.map((agent) => (
                  <span
                    key={agent}
                    className="text-xs px-2 py-1 rounded-md bg-white/10 text-slate-300 font-mono"
                  >
                    {agent}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[
                { label: 'Duration', value: phase.duration },
                { label: 'Risk', value: phase.risk },
                { label: 'Cost', value: phase.investment },
              ].map((meta) => (
                <div key={meta.label} className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                  <div className="text-[10px] font-bold tracking-wider uppercase text-slate-500">
                    {meta.label}
                  </div>
                  <div className="text-sm font-bold text-white mt-1">{meta.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* How It Works */}
        {phase.howItWorks && phase.howItWorks.length > 0 && (
          <div className="mt-10">
            <div className="flex items-center gap-3 mb-6">
              <div className={`h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-white/20`} />
              <h4 className={`text-lg font-black bg-gradient-to-r ${phase.gradient} bg-clip-text text-transparent tracking-wide`}>
                HOW IT WORKS
              </h4>
              <div className={`h-px flex-1 bg-gradient-to-l from-transparent via-white/20 to-white/20`} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {phase.howItWorks.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -2, scale: 1.01 }}
                  className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 p-5 transition-all"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br ${phase.gradient} flex items-center justify-center font-black text-white text-sm shadow-lg`}
                    >
                      {i + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h5 className="font-bold text-white mb-2">{step.title}</h5>
                      <p className="text-sm text-slate-400 leading-relaxed mb-2">
                        {step.detail}
                      </p>
                      {step.bullets && step.bullets.length > 0 && (
                        <ul className="space-y-1.5 mt-2">
                          {step.bullets.map((bullet, bi) => (
                            <li key={bi} className="flex items-start gap-2 text-xs text-slate-300">
                              <span className={`mt-1 w-1 h-1 rounded-full bg-gradient-to-r ${phase.gradient} flex-shrink-0`} />
                              <span className="font-mono leading-relaxed">{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Phase 2-specific: Stats bar */}
        {phase.runStats && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-10 rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-r from-slate-800/60 via-slate-900/60 to-slate-800/60 backdrop-blur-md"
          >
            <div className="px-6 py-3 border-b border-white/10 bg-black/20 flex items-center justify-between flex-wrap gap-2">
              <span className="text-[10px] font-black tracking-widest uppercase text-slate-400">
                Real Run Results
              </span>
              <code className="text-xs font-mono text-slate-500">{phase.runStats.host}</code>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-0 divide-x divide-white/5">
              {[
                { label: 'Total', value: phase.runStats.total, color: 'text-white' },
                { label: 'SUCCESS', value: phase.runStats.success, color: 'text-emerald-400' },
                { label: 'PARTIAL', value: phase.runStats.partial, color: 'text-amber-400' },
                { label: 'FAILED', value: phase.runStats.failed, color: 'text-rose-400' },
                { label: 'Human Interventions', value: phase.runStats.humanInterventions, color: 'text-cyan-400' },
              ].map((s) => (
                <div key={s.label} className="px-4 py-4 text-center">
                  <div className={`text-3xl font-black ${s.color}`}>{s.value}</div>
                  <div className="text-[10px] font-bold tracking-wider uppercase text-slate-500 mt-1">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Phase 2-specific: Sub-agent hierarchy */}
        {phase.subAgents && (
          <div className="mt-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-white/20" />
              <h4 className={`text-lg font-black bg-gradient-to-r ${phase.gradient} bg-clip-text text-transparent tracking-wide`}>
                SUB-AGENT HIERARCHY
              </h4>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent via-white/20 to-white/20" />
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/30 backdrop-blur-md p-6 font-mono text-sm">
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2 mb-4"
              >
                <span className="text-xl">🎯</span>
                <span className="font-bold text-white">/start-environment-setup</span>
              </motion.div>
              {phase.subAgents.map((sub, i) => (
                <motion.div
                  key={sub.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                  whileHover={{ x: 4 }}
                  className="flex items-start gap-3 py-2.5 pl-6 border-l-2 border-white/10 ml-3 relative"
                >
                  <span className="absolute left-[-5px] top-5 w-2 h-2 rounded-full bg-purple-400" />
                  <span className="text-lg flex-shrink-0">{sub.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-purple-300 font-semibold">{sub.name}</div>
                    <div className="text-xs text-slate-400 mt-0.5 font-sans">{sub.role}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Phase 2-specific: Skills grid */}
        {phase.skillsGrid && (
          <div className="mt-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-white/20" />
              <h4 className={`text-lg font-black bg-gradient-to-r ${phase.gradient} bg-clip-text text-transparent tracking-wide`}>
                DEPLOYMENT SKILLS
              </h4>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent via-white/20 to-white/20" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {phase.skillsGrid.map((skill, i) => {
                const isSuccess = skill.status === 'SUCCESS';
                const isPartial = skill.status === 'PARTIAL';
                return (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ y: -3, scale: 1.01 }}
                    title={skill.note || ''}
                    className={`relative overflow-hidden rounded-2xl border p-4 transition-all ${
                      isSuccess
                        ? 'border-emerald-500/30 bg-emerald-500/5 hover:bg-emerald-500/10'
                        : isPartial
                        ? 'border-amber-500/30 bg-amber-500/5 hover:bg-amber-500/10 opacity-80'
                        : 'border-rose-500/30 bg-rose-500/5 hover:bg-rose-500/10'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className={`text-[10px] font-black px-2 py-0.5 rounded-md ${
                          isSuccess
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30'
                            : isPartial
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-400/30'
                            : 'bg-rose-500/20 text-rose-300 border border-rose-400/30'
                        }`}
                      >
                        {isSuccess ? '✓' : isPartial ? '◐' : '✗'} {skill.status}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500">:{skill.port}</span>
                    </div>
                    <div className="font-mono text-xs font-semibold text-white mb-1 truncate">
                      {skill.name}
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                      {skill.deploys}
                    </p>
                    {skill.note && (
                      <div className="mt-2 text-[10px] text-amber-300/80 italic">
                        ⓘ {skill.note}
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* Phase 2-specific: Constraints solved */}
        {phase.constraints && (
          <div className="mt-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-white/20" />
              <h4 className={`text-lg font-black bg-gradient-to-r ${phase.gradient} bg-clip-text text-transparent tracking-wide`}>
                CONSTRAINTS AUTONOMOUSLY SOLVED
              </h4>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent via-white/20 to-white/20" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {phase.constraints.map((c, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5"
                >
                  <div className="text-3xl mb-3">{c.icon}</div>
                  <div className="mb-3">
                    <div className="text-[10px] font-bold tracking-widest uppercase text-rose-400 mb-1">
                      Problem
                    </div>
                    <p className="text-sm text-slate-200 font-medium leading-snug">{c.problem}</p>
                  </div>
                  <div className="pt-3 border-t border-white/10">
                    <div className="text-[10px] font-bold tracking-widest uppercase text-emerald-400 mb-1">
                      AI Solution
                    </div>
                    <p className="text-sm text-slate-300 leading-relaxed">{c.solution}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Phase 2-specific: Terminal output */}
        {phase.terminalOutput && (
          <div className="mt-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-white/20" />
              <h4 className={`text-lg font-black bg-gradient-to-r ${phase.gradient} bg-clip-text text-transparent tracking-wide`}>
                GROUND TRUTH OUTPUT
              </h4>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent via-white/20 to-white/20" />
            </div>
            <div className="rounded-2xl overflow-hidden border border-white/10 bg-black shadow-2xl">
              <div className="flex items-center gap-2 px-4 py-2 border-b border-white/10 bg-slate-900/80">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-500" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500" />
                  <span className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <span className="text-xs font-mono text-slate-400 ml-2">
                  docs/environment/current-environment.md
                </span>
              </div>
              <pre className="p-5 text-xs font-mono text-slate-300 overflow-x-auto leading-relaxed">
                <code>{phase.terminalOutput}</code>
              </pre>
            </div>
          </div>
        )}

        {/* Phase 2-specific: What this enables arrow */}
        {phase.id === 'phase2' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-10 rounded-2xl border border-emerald-500/20 bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-cyan-500/10 p-5 flex items-center gap-4 flex-wrap"
          >
            <div className="text-3xl">→</div>
            <div className="flex-1 min-w-[200px]">
              <div className="text-[10px] font-black tracking-widest uppercase text-emerald-400 mb-1">
                What This Enables
              </div>
              <div className="text-white font-semibold">
                Phase 3 now has real processes to detect
              </div>
              <p className="text-sm text-slate-400 mt-1">
                Every deployed app is tagged with expected_language, pid, and cmdline in current-environment.md —
                giving Phase 3 and Phase 4 the ground truth needed to write and validate detection signals.
              </p>
            </div>
            <div className="text-5xl">💻</div>
          </motion.div>
        )}

        {/* Files Touched + Examples grid */}
        {(phase.filesTouched || phase.examples) && (
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Files Touched */}
            {phase.filesTouched && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-800/40 p-6"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl">📁</span>
                  <h4 className="text-sm font-black tracking-widest uppercase text-slate-300">
                    Files Touched
                  </h4>
                </div>
                <div className="space-y-2">
                  {phase.filesTouched.map((file, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      whileHover={{ x: 4 }}
                      className="flex items-center gap-3 p-2.5 rounded-lg bg-black/30 border border-white/5 hover:border-white/10 transition-all"
                    >
                      <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${phase.gradient}`} />
                      <code className="text-xs font-mono text-emerald-400 flex-shrink-0">
                        {file.path}
                      </code>
                      <span className="text-xs text-slate-500 truncate">— {file.note}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Examples */}
            {phase.examples && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-800/40 p-6"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl">⚡</span>
                  <h4 className="text-sm font-black tracking-widest uppercase text-slate-300">
                    Examples
                  </h4>
                </div>
                <div className="space-y-2">
                  {phase.examples.map((ex, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      whileHover={{ x: -4 }}
                      className={`flex items-center gap-3 p-2.5 rounded-lg border transition-all ${
                        ex.success
                          ? 'bg-emerald-500/5 border-emerald-500/20 hover:bg-emerald-500/10'
                          : 'bg-red-500/5 border-red-500/20 hover:bg-red-500/10'
                      }`}
                    >
                      <code className="text-xs font-mono text-white font-semibold flex-shrink-0">
                        {ex.cmd}
                      </code>
                      <span className="text-xs text-slate-400 flex-shrink-0">→</span>
                      <span className={`text-xs flex items-center gap-1 ${ex.success ? 'text-emerald-300' : 'text-red-300'}`}>
                        <span>{ex.success ? '✓' : '✗'}</span>
                        <span className="truncate">{ex.result}</span>
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
