# Architecture Visualization - Code Structure Guide

## Overview

This document explains the complete structure of the Claude Code Architecture Visualization website.

## Directory Tree

```
claude-architecture-viz/
├── src/
│   ├── components/
│   │   ├── App.jsx                      # Root app component
│   │   ├── PipelineViewer.jsx           # Phase 1-4 pipeline view
│   │   ├── PhaseCard.jsx                # Individual phase node
│   │   ├── FlowArrow.jsx                # Forward flow arrows with dots
│   │   ├── FeedbackLoop.jsx             # Feedback loop visualization
│   │   ├── ArchitectureLayerViewer.jsx  # 3-layer architecture view
│   │   ├── LayerCard.jsx                # Layer item card
│   │   ├── LayerConnection.jsx          # Layer connections
│   │   └── Legend.jsx                   # Footer legend
│   ├── data/
│   │   └── architecture.js              # Data structure definitions
│   ├── main.jsx                         # Vite entry point
│   ├── App.jsx                          # Root component
│   └── index.css                        # Tailwind + custom styles
├── index.html                           # HTML template
├── package.json                         # Dependencies
├── vite.config.js                       # Vite config
├── tailwind.config.js                   # Tailwind config
├── postcss.config.js                    # PostCSS config
├── .gitignore                           # Git ignore
├── README.md                            # Quick start & overview
└── STRUCTURE.md                         # This file
```

## Component Architecture

### 1. App.jsx (Root)
**Responsibilities:**
- Global state management (viewMode, selectedPhase, animationActive)
- Header with controls and view toggle
- Conditional rendering of PipelineViewer or ArchitectureLayerViewer
- Footer with Legend

**Key State:**
- `viewMode`: 'pipeline' or 'architecture'
- `selectedPhase`: Currently selected phase for expansion
- `animationActive`: Toggle for animations

**Props Passed Down:**
- `selectedPhase`, `onSelectPhase`, `animationActive`

---

### 2. PipelineViewer.jsx
**Responsibilities:**
- Main 4-phase pipeline visualization
- SVG canvas for arrows and feedback loops
- Phase card grid layout
- Expanded detail panel

**Data:**
- `PHASES` - Array of 4 phase definitions
- `FEEDBACK_LOOPS` - 2 feedback loop configurations

**Child Components:**
- `PhaseCard` (×4)
- `FlowArrow` (×3)
- `FeedbackLoop` (×2)

**Key Features:**
- Responsive grid (1 col mobile, 2 col tablet, 4 col desktop)
- SVG overlay for arrows
- Detail panel with fade-in animation
- Cost-benefit metrics display

---

### 3. PhaseCard.jsx
**Responsibilities:**
- Display individual phase information
- Handle click interactions
- Animate on hover and expand
- Show phase-specific badges and stats

**Props:**
- `phase`: Phase object
- `index`: For stagger animation
- `isSelected`: Current selection state
- `onSelect`: Callback for selection
- `animationActive`: Control pulsing animation

**Features:**
- Pulsing background glow when animated
- Color gradient per phase
- Phase number badge
- Quick stats (agent count, command)
- Expandable indicator

---

### 4. FlowArrow.jsx
**Responsibilities:**
- Render SVG arrows between phases
- Animate flowing dots along arrows
- Calculate dynamic coordinates

**Logic:**
- Uses `getBoundingClientRect()` to get element positions
- Converts to SVG coordinate space
- Creates quadratic curves for smooth bends
- Animates 3 dots with staggered delays

**Features:**
- Responsive positioning (recalculates on resize)
- Animated dots with opacity trails
- Arrow marker styling
- Dashed or solid lines

---

### 5. FeedbackLoop.jsx
**Responsibilities:**
- Render curved feedback arrows
- Show loop labels
- Animate feedback pulses

**Logic:**
- Similar coordinate calculation to FlowArrow
- Creates larger arc for visual distinction
- Positions label at curve midpoint
- Different color (red for feedback)

**Features:**
- Dashed line styling
- Pulsing red dots
- Rectangular label background
- Semi-transparent design

---

### 6. ArchitectureLayerViewer.jsx
**Responsibilities:**
- Display 3-layer architecture (Commands/Agents/Skills)
- Show component relationships
- Explain data flow with step-by-step example

**Data:**
- `ARCHITECTURE_DATA` - 3 layers with items
- `CONNECTIONS` - Example connections

**Child Components:**
- `LayerCard` (×18)
- Step-by-step flow explanation

**Features:**
- 3-column grid layout (responsive)
- Expandable detail panel per item
- Data flow visualization (static text-based)
- Example workflow (/start-code java)

---

### 7. LayerCard.jsx
**Responsibilities:**
- Display individual architecture component
- Interactive selection
- Hover effects

**Props:**
- `item`: Component object
- `layerColor`: Gradient color
- `isSelected`: Selection state
- `onSelect`: Callback

**Features:**
- Icon + name + description
- Color-coded background
- Animated glow on selection
- Responsive text sizing

---

### 8. Legend.jsx
**Responsibilities:**
- Display visualization legend in footer
- Explain symbols and interactions

**Data:**
- 4 legend items explaining:
  - Phase flow arrows
  - Feedback loops
  - Animated dots
  - Interactive nodes

**Features:**
- Icon + label + description
- Staggered animation
- 4-column responsive grid

---

## Data Structures

### Phase Object
```javascript
{
  id: string,              // 'phase1'-'phase4'
  order: number,           // 1-4
  name: string,            // 'Research', 'Provision', etc.
  command: string,         // '/start-research', '/start-code <lang>', etc.
  emoji: string,           // Visual icon
  color: string,           // Tailwind gradient 'from-X to-Y'
  description: string,     // Full description
  keyActivities: array,    // List of 3-5 activities
  output: string,          // Output artifacts
  agents: array,           // Agent IDs
  duration: string,        // Time estimate
  risk: string,            // Risk level
  investment: string,      // Investment level
}
```

### Architecture Layer Object
```javascript
{
  id: string,              // 'layer-commands', 'layer-agents', 'layer-skills'
  name: string,            // Layer name
  description: string,     // Layer description
  emoji: string,           // Visual icon
  color: string,           // Tailwind gradient
  items: array,            // Layer items
}
```

### Layer Item Object
```javascript
{
  id: string,              // Unique ID
  name: string,            // Display name
  description: string,     // Description
  icon: string,            // Emoji icon
  file?: string,           // Optional file path
}
```

### Feedback Loop Object
```javascript
{
  from: string,            // Source phase ID
  to: string,              // Target phase ID
  label: string,           // Loop label
  y: number,               // Vertical offset for arc
  color: string,           // Gradient color
  description: string,     // Explanation
}
```

---

## Animation Patterns

### Stagger Animation
```javascript
variants={{
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,  // 100ms delay between children
      delayChildren: 0.2,    // 200ms before first child
    },
  },
}}
```

### Flow Dot Animation
```javascript
animate={{
  cx: [x1, midX, x2],
  cy: [y1, controlPointY, y2],
}}
transition={{
  duration: 2,              // 2 seconds per animation
  delay: offset * 2,        // Stagger starts
  repeat: Infinity,         // Loop forever
  ease: 'linear',           // Constant speed
}}
```

### Hover Scale
```javascript
whileHover={{ scale: 1.02, y: -4 }}
whileTap={{ scale: 0.98 }}
```

### Box Shadow Glow
```javascript
animate={{
  boxShadow: [
    '0 0 0 0 rgba(59, 130, 246, 0)',
    '0 0 0 10px rgba(59, 130, 246, 0.1)',
    '0 0 0 0 rgba(59, 130, 246, 0)',
  ],
}}
transition={{
  duration: 2,
  repeat: Infinity,
}}
```

---

## Styling Approach

### Tailwind CSS
- Utility-first for rapid styling
- Dark theme base (slate-900 background)
- Gradient backgrounds per phase
- Responsive breakpoints: md (768px), lg (1024px)

### Custom CSS (index.css)
- Tailwind directives (@tailwind base/components/utilities)
- Custom animations (@keyframes glow)
- Scrollbar styling
- Selection highlighting

### Responsive Design
```
Mobile: 1 column
Tablet (md): 2 columns
Desktop (lg): 3-4 columns
```

---

## State Management

### Global State (App.jsx)
```javascript
const [viewMode, setViewMode] = useState('pipeline');
const [selectedPhase, setSelectedPhase] = useState(null);
const [animationActive, setAnimationActive] = useState(true);
```

### Local State (Component Level)
- PhaseCard: None (props-driven)
- PipelineViewer: Animation state managed by Framer Motion
- FlowArrow: Coordinate state for dynamic positioning

---

## Key Interactions

### 1. View Toggle
```
User clicks "Pipeline Flow" or "3-Layer Model"
→ setViewMode() → App re-renders with AnimatePresence
→ Fade out current view, fade in new view
```

### 2. Phase Selection
```
User clicks PhaseCard
→ onSelectPhase(phase) → App state updates
→ PipelineViewer expands detail panel
→ Detail panel fades in with motion
```

### 3. Animation Toggle
```
User clicks "✓ Animate" button
→ setAnimationActive(!animationActive)
→ Passes to FlowArrow and FeedbackLoop
→ Dots start/stop moving
```

### 4. Dynamic Positioning
```
Component mounts/resizes
→ FlowArrow.useEffect() calculates coordinates
→ Updates SVG path d attribute
→ Arrows reposition responsively
```

---

## Performance Optimizations

1. **SVG Coordinate Calculation**
   - Only on mount and resize events
   - Debounced with setTimeout
   - Avoids recalc on every render

2. **Staggered Animations**
   - Delays prevent layout thrashing
   - Sequential transitions reduce reflows

3. **Conditional Rendering**
   - AnimatePresence ensures unmount animations
   - selectedPhase === null removes detail panel

4. **Memoization Opportunity**
   - PhaseCard could use React.memo for stability
   - PHASES and FEEDBACK_LOOPS are static

---

## Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Requires ES6+ support (arrow functions, destructuring)
- SVG support for diagram rendering
- Framer Motion: Motion library requires React 16.8+

---

## Extending the Visualization

### Adding a 5th Phase
1. Add phase object to `PHASES` array in PipelineViewer.jsx
2. Create new FlowArrow connection in SVG
3. Update FEEDBACK_LOOPS if needed
4. Add color definition in phase object

### Adding Interactivity
1. Add state to App.jsx or component
2. Create event handler
3. Update component props
4. Animate with Framer Motion

### Customizing Colors
1. Edit `color` property in phase objects
2. Use Tailwind gradient format: 'from-COLOR to-COLOR'
3. Update legend if adding new colors

### Adding Tooltips
1. Use HTML title attribute (native)
2. Or create custom Tooltip component with Framer Motion
3. Trigger on hover with whileHover

---

## Debugging Tips

### SVG Arrows Not Showing
1. Check console for JavaScript errors
2. Verify elements have IDs matching FlowArrow props
3. Test with: `document.getElementById('phase-0')`

### Animations Stuttering
1. Check browser performance (F12 Performance tab)
2. Reduce animation duration
3. Disable other animations to isolate issue

### Layout Issues
1. Test in different browsers
2. Check Tailwind config for breakpoint settings
3. Verify no CSS conflicts in index.css

### Coordinate Calculation Failing
1. Ensure elements are in viewport when measured
2. Check SVG parent element position
3. Add console.log in useEffect to debug values

---

## Future Enhancement Ideas

1. **Zoom & Pan** - Canvas-like interaction for exploration
2. **Timeline Scrubber** - Step through pipeline execution
3. **Code Snippets** - Show actual code for each phase
4. **Search** - Find components by name
5. **Export** - Download diagram as SVG/PNG
6. **Theming** - Dark/light mode toggle
7. **Step-by-Step Mode** - Animated walkthrough
8. **Real-time Updates** - WebSocket integration for live data
9. **Mobile Gestures** - Swipe to switch views
10. **Accessibility** - ARIA labels, keyboard navigation

---

**Last Updated:** 2024
**Framework:** React 18 + Framer Motion + Tailwind CSS
**Build Tool:** Vite
