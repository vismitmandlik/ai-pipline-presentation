# Quick Start Guide

## Installation (2 minutes)

```bash
cd /home/ashish/claude-architecture-viz
npm install
npm run dev
```

Site opens at: **http://localhost:5173**

---

## Features at a Glance

### 🎯 Pipeline Flow View
- Shows 4-phase sequential workflow
- Click any phase to expand details
- See feedback loops showing iteration paths
- Animated dots flowing through connections

### 🏗️ 3-Layer Architecture View
- Commands (top) → Agents (middle) → Skills (bottom)
- Click any item to see full details
- Understand how `/start-code java` flows through system
- See which agents use which skills

### ⚙️ Controls
- **Pipeline Flow / 3-Layer Model** - Toggle between views
- **✓ Animate / Paused** - Control animation playback

---

## What Each Phase Does

| Phase | Command | What | Output |
|-------|---------|------|--------|
| **1: Research** | `/start-research` | Research deployment patterns | SKILL.md files |
| **2: Provision** | `/start-environment-setup` | Set up test environment | current-environment.md |
| **3: Code** | `/start-code <lang>` | Add detection signals | motadata-host-agent binary |
| **4: Test** | `/start-test` | Validate detection | Test report (PASS/FAIL) |

---

## How Feedback Loops Work

```
Phase 4 Test FAILS
    ↓
"Signal missed" loop
    ↓ Return to Phase 1: Research what signal was missing
    ↓ Then Phase 3: Add signal to code
    ↓ Then Phase 4: Retest
    
    OR
    
"Wrong signal" loop
    ↓ Return to Phase 3: Fix signal logic
    ↓ Rebuild binary
    ↓ Return to Phase 4: Retest
```

---

## Understanding the 3 Layers

### Layer 1: Commands
- User-facing slash commands
- Thin wrappers that validate input
- Examples: `/start-code`, `/start-environment-setup`

### Layer 2: Agents
- Procedural execution logic
- Read from Phase 1 skills
- Do the actual work
- Examples: `add-detect-language-code`, `environment-setup`

### Layer 3: Skills
- Reusable pattern libraries
- Detection signal catalogue
- Deployment instructions
- Examples: `detect-language/SKILL.md`, `tomcat-linux-systemd`

---

## Example Workflow: Adding Java Support

```
User Types: /start-code java
    ↓
Command validates "java" is a known language
    ↓
Agent "add-detect-language-code" spawns
    ├─ Reads SKILL.md for Java signals
    ├─ Reads language.go for current coverage
    ├─ Identifies missing signals
    ├─ Adds new signals to code
    ├─ Writes test cases
    ├─ Runs: gofmt → test → build
    └─ Updates LANGUAGE_DETECTION_REGISTRY.md
    ↓
Output: Updated binary + test results
    ↓
Next: Run /start-test to validate
```

---

## Interactive Tips

### Expand a Phase
1. Click any of the 4 colored phase cards
2. Details panel appears below showing:
   - Full description
   - Key activities
   - Associated agents
   - Input/output artifacts
   - Duration/risk/investment metrics

### Explore Architecture
1. Switch to "3-Layer Model" view
2. Click any item in Commands/Agents/Skills
3. See details about what it does
4. Scroll down to see data flow example

### Control Animations
- Click "✓ Animate" to pause/resume
- Useful for taking screenshots or reading slowly
- Dots stop flowing through arrows

### Responsive Design
- Works on phone, tablet, desktop
- Phases stack on mobile
- Adjust to 2-3 column layout on tablet
- Full 4-column view on desktop

---

## File Structure

```
src/
├── App.jsx                  # Main app, controls view mode
├── components/
│   ├── PipelineViewer.jsx   # 4-phase pipeline visualization
│   ├── PhaseCard.jsx        # Individual phase card
│   ├── FlowArrow.jsx        # Animated arrows between phases
│   ├── FeedbackLoop.jsx     # Feedback loop arrows
│   ├── ArchitectureLayerViewer.jsx  # 3-layer view
│   ├── LayerCard.jsx        # Layer component card
│   └── Legend.jsx           # Footer legend
├── data/
│   └── architecture.js      # Data definitions
├── main.jsx                 # Vite entry
└── index.css                # Tailwind + custom
```

---

## Keyboard Shortcuts

| Action | Method |
|--------|--------|
| Toggle View | Click header button |
| Expand Phase | Click phase card |
| Pause Animation | Click "Paused" button |
| Scroll Smoothly | Native browser behavior |

---

## Troubleshooting

**Q: Arrows not showing?**
A: Refresh page or click a phase to trigger coordinate recalculation

**Q: Animations stuttering?**
A: Click "Paused" button or check browser performance tab

**Q: Layout broken on mobile?**
A: Zoom out or rotate device to landscape

**Q: Port 5173 already in use?**
A: Run `npm run dev -- --port 3000` to use different port

---

## Development

### Edit Component
```javascript
// src/components/MyComponent.jsx
import React from 'react';
import { motion } from 'framer-motion';

export default function MyComponent() {
  return <motion.div>Hello</motion.div>;
}
```

### Add Animation
```javascript
<motion.button
  whileHover={{ scale: 1.05 }}
  animate={{ rotate: [0, 360] }}
  transition={{ duration: 2 }}
>
  Click me
</motion.button>
```

### Use Tailwind
```jsx
<div className="bg-slate-800 p-6 rounded-lg border border-slate-600">
  Content
</div>
```

---

## Building for Production

```bash
# Create optimized build
npm run build

# Test production build locally
npm run preview

# Deploy to hosting
# Build creates dist/ folder → upload to Netlify/Vercel/GitHub Pages
```

---

## Data Sources

All data extracted from `archi.md`:
- **Phases**: Complete 4-phase workflow
- **Agents**: All agent names and responsibilities
- **Skills**: Detection signals and deployment patterns
- **Feedback Loops**: Iteration cycles shown visually

---

## Next Steps

1. ✅ **View the site**: `npm run dev`
2. 📖 **Explore both views**: Pipeline and Architecture
3. 🎯 **Click on components**: See detailed information
4. 🔄 **Understand feedback loops**: How iteration works
5. 📚 **Read README.md**: More detailed documentation
6. 🛠️ **Check STRUCTURE.md**: Technical implementation details

---

## Learning the Architecture

The visualization maps to the document structure:

```
archi.md
├── 4 Phases → PipelineViewer shows each phase
├── 3 Layers → ArchitectureLayerViewer shows Commands/Agents/Skills
├── Feedback Loops → FeedbackLoop components show iteration
└── Dependencies → Explained in detail panels and step-by-step flows
```

Each phase has:
- **Phase 1 (Research)**: Input → Skills, Output → SKILL.md
- **Phase 2 (Provision)**: Input → Skills, Output → environment.md
- **Phase 3 (Code)**: Input → Skills, Output → Binary
- **Phase 4 (Test)**: Input → Binary, Output → Pass/Fail Report

---

**Questions?** Check README.md for detailed guide
**Want to modify?** Check STRUCTURE.md for code organization
**Ready to deploy?** Follow "Building for Production" section above
