# Claude Code Architecture Visualization

An interactive, modern 2D animated website that visualizes the complete Claude Code 4-phase pipeline architecture with the 3-layer model (Commands → Agents → Skills).

## 🎯 Features

### Core Visualizations
- **4-Phase Pipeline** - Sequential workflow from Research → Provision → Code → Test
- **Feedback Loops** - Visual representation of iteration cycles back to earlier phases
- **3-Layer Architecture** - Commands, Agents, and Skills in a clean hierarchical model
- **Interactive Components** - Click to expand and explore detailed information

### Animations
- ✨ **Smooth Transitions** - Framer Motion animations between views and states
- 🌊 **Flow Animation** - Animated dots flowing through arrows showing active data flow
- 🎨 **Hover Effects** - Highlight nodes and show relationships on hover
- 🔄 **Feedback Pulses** - Visual indicators of iteration loops
- 📊 **Responsive Design** - Adapts to all screen sizes

### Interactive Features
- **Toggle Views** - Switch between Pipeline Flow and 3-Layer Architecture
- **Animation Control** - Pause/resume animations as needed
- **Detailed Panels** - Expand phases to see:
  - Description and key activities
  - Associated agents and commands
  - Output artifacts
  - Cost-benefit metrics (duration, risk, investment)
- **Color Coding**
  - Blue: Research (Phase 1)
  - Purple: Provision (Phase 2)
  - Green: Code (Phase 3)
  - Orange: Test (Phase 4)
  - Red: Feedback loops

### Navigation
- Sticky header with quick controls
- Responsive grid layouts
- Legend explaining symbols and interactions
- Smooth scrolling between sections

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm/yarn

### Installation

```bash
# Navigate to project directory
cd /home/ashish/claude-architecture-viz

# Install dependencies
npm install

# Start development server
npm run dev
```

The site will automatically open at `http://localhost:5173`

### Build for Production

```bash
npm run build

# Preview the build
npm run preview
```

## 📁 Project Structure

```
claude-architecture-viz/
├── src/
│   ├── main.jsx                      # Vite entry point
│   ├── App.jsx                       # Root component with view switching
│   ├── index.css                     # Global styles + Tailwind
│   └── components/
│       ├── PipelineViewer.jsx        # Phase 1-4 visualization
│       ├── PhaseCard.jsx             # Individual phase node
│       ├── FlowArrow.jsx             # Forward phase arrows with animation
│       ├── FeedbackLoop.jsx          # Feedback loop arrows
│       ├── ArchitectureLayerViewer.jsx  # 3-layer architecture view
│       ├── LayerCard.jsx             # Layer item card
│       ├── LayerConnection.jsx       # Inter-layer connections
│       └── Legend.jsx                # Legend panel
├── index.html                        # HTML template
├── package.json                      # Dependencies + scripts
├── vite.config.js                    # Vite configuration
├── tailwind.config.js                # Tailwind CSS config
├── postcss.config.js                 # PostCSS configuration
└── README.md                         # This file
```

## 🎨 Technology Stack

- **React 18** - UI components and state management
- **Framer Motion** - Smooth animations and transitions
- **Tailwind CSS** - Utility-first styling
- **Vite** - Lightning-fast build tool
- **Lucide React** - Beautiful icons

## 🔍 Architecture Overview

### Data Structure

Each phase contains:
- **id**: Unique identifier
- **order**: Sequence number (1-4)
- **name**: Display name
- **command**: Slash command to invoke
- **emoji**: Visual icon
- **color**: Tailwind gradient class
- **description**: Detailed explanation
- **keyActivities**: List of activities performed
- **output**: Artifacts produced
- **agents**: Associated execution agents
- **metrics**: Duration, risk, investment levels

### Component Hierarchy

```
App
├── Header (controls, view toggle)
├── PipelineViewer (when in "pipeline" mode)
│   ├── PhaseCard (×4)
│   ├── FlowArrow (×3 forward)
│   ├── FeedbackLoop (×2)
│   └── Expanded detail panel
├── ArchitectureLayerViewer (when in "architecture" mode)
│   ├── LayerCard (×18 total)
│   └── Data flow explanation
└── Legend (footer)
```

## 📖 Usage Guide

### Pipeline Flow View
1. **Overview** - Scroll to see all 4 phases
2. **Click a Phase** - Expands detailed information panel
3. **Hover Cards** - See glow effect and scale animation
4. **Feedback Loops** - Understand iteration paths

### 3-Layer Architecture View
1. **Three Columns** - Commands (left), Agents (center), Skills (right)
2. **Click an Item** - Expands to show full details
3. **Data Flow** - See how `/start-code java` flows through layers
4. **Relationships** - Understand command-agent-skill connections

### Controls
- **Pipeline Flow / 3-Layer Model** - Toggle between views
- **✓ Animate / Paused** - Control animation playback

## 🎯 Key Design Decisions

1. **Separation of Concerns** - Layered components for clarity
2. **Interactive First** - Click to explore, not passive viewing
3. **Animated Flow** - Pulsing dots show data movement
4. **Color Consistency** - Each phase has distinct color for quick recognition
5. **Dark Theme** - Professional, easy on the eyes
6. **Responsive Grid** - Works on mobile, tablet, desktop

## 🔄 Workflow Examples

### Example 1: Adding Java Detection Signals
```
User: /start-code java
├─ Commands: start-code validates
├─ Agents: add-detect-language-code reads skills
├─ Skills: detect-language/SKILL.md provides signals
└─ Output: Updated binary + tests
```

### Example 2: Phase 4 Test Failure
```
Phase 4 Test FAILS
├─ Identifies: "environ stage missed"
└─ Feedback: Return to Phase 1 or Phase 3
    ├─ Phase 1: Research missed environment variable
    ├─ Phase 3: Add signal to code
    └─ Phase 4: Retest
```

## 🎨 Customization

### Changing Colors
Edit phase colors in `src/components/PipelineViewer.jsx`:
```jsx
color: 'from-blue-500 to-blue-600',  // Change these
```

### Adding New Phases
Add to `PHASES` array in `PipelineViewer.jsx`:
```jsx
{
  id: 'phase5',
  order: 5,
  name: 'Deploy',
  // ... rest of phase definition
}
```

### Adjusting Animation Speed
Modify transition values in Framer Motion components:
```jsx
transition={{ duration: 0.5 }}  // Change to slow down/speed up
```

## 🐛 Troubleshooting

### Animations not showing
- Check "✓ Animate" button in header is enabled
- Verify browser supports ES6 modules
- Check console for errors (F12)

### Layout issues on mobile
- Ensure viewport meta tag is in index.html
- Check Tailwind responsive classes are applied
- Test in mobile browser or responsive mode

### SVG arrows not connecting
- Click a phase to expand, this triggers coordinate recalculation
- Resize browser window to force SVG recalculation
- Check browser console for JavaScript errors

## 📊 Performance Notes

- **Optimized SVG** - Uses reactive positioning for responsive arrows
- **Memoized Components** - Reduces unnecessary re-renders
- **Lazy Animations** - Staggered animations prevent layout thrashing
- **Production Build** - Minified and optimized by Vite

## 📝 File Descriptions

| File | Purpose |
|------|---------|
| `App.jsx` | Root component managing view state and controls |
| `PipelineViewer.jsx` | Main pipeline visualization with 4 phases |
| `PhaseCard.jsx` | Individual phase node with expandable details |
| `FlowArrow.jsx` | Animated arrows between phases |
| `FeedbackLoop.jsx` | Curved feedback loop arrows with labels |
| `ArchitectureLayerViewer.jsx` | 3-layer architecture (Commands/Agents/Skills) |
| `LayerCard.jsx` | Individual architecture component card |
| `Legend.jsx` | Footer legend explaining symbols |

## 🚢 Deployment

### Netlify
```bash
# Build
npm run build

# Deploy dist/ folder
# Connect GitHub repo for auto-deploy on push
```

### Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### GitHub Pages
```bash
# Update vite.config.js
export default {
  base: '/repo-name/',
  // ...
}

npm run build
# Push dist/ to gh-pages branch
```

## 📄 License

MIT - Feel free to use and modify

## 🤝 Contributing

Suggestions for improvements:
- Add more detailed tooltips
- Implement zoom/pan for desktop
- Add step-by-step phase execution animation
- Export diagram as image
- Dark/light theme toggle

---

**Created with ❤️ for Claude Code architecture visualization**
