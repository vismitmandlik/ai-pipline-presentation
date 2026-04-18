import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function FlowArrow({ from, to, animated }) {
  const [x1, setX1] = useState(0);
  const [y1, setY1] = useState(0);
  const [x2, setX2] = useState(0);
  const [y2, setY2] = useState(0);

  useEffect(() => {
    const updateCoordinates = () => {
      const fromEl = document.getElementById(from);
      const toEl = document.getElementById(to);

      if (fromEl && toEl) {
        const fromRect = fromEl.getBoundingClientRect();
        const toRect = toEl.getBoundingClientRect();

        // Calculate positions relative to SVG container
        const svgRect = fromEl.parentElement.getBoundingClientRect();

        setX1(fromRect.right - svgRect.left);
        setY1(fromRect.top - svgRect.top + fromRect.height / 2);
        setX2(toRect.left - svgRect.left);
        setY2(toRect.top - svgRect.top + toRect.height / 2);
      }
    };

    updateCoordinates();
    window.addEventListener('resize', updateCoordinates);
    const timer = setTimeout(updateCoordinates, 100);

    return () => {
      window.removeEventListener('resize', updateCoordinates);
      clearTimeout(timer);
    };
  }, [from, to]);

  if (x1 === 0 || x2 === 0) return null;

  const arrowSize = 20;
  const midX = (x1 + x2) / 2;

  return (
    <g>
      {/* Main line */}
      <defs>
        <marker
          id={`arrowhead-${from}-${to}`}
          markerWidth="10"
          markerHeight="10"
          refX="9"
          refY="3"
          orient="auto"
        >
          <polygon points="0 0, 10 3, 0 6" fill="#60a5fa" />
        </marker>
      </defs>

      {/* Curved path */}
      <path
        d={`M ${x1} ${y1} Q ${midX} ${y1 + 20} ${x2} ${y2}`}
        fill="none"
        stroke="#3b82f6"
        strokeWidth="2"
        markerEnd={`url(#arrowhead-${from}-${to})`}
        opacity="0.6"
      />

      {/* Animated flow dots */}
      {animated && (
        <>
          {[0, 0.33, 0.66].map((offset) => (
            <motion.circle
              key={`dot-${offset}`}
              cx={x1}
              cy={y1}
              r="3"
              fill="#93c5fd"
              initial={{ cx: x1, cy: y1 }}
              animate={{
                cx: [x1, midX, x2],
                cy: [y1, y1 + 20, y2],
              }}
              transition={{
                duration: 2,
                delay: offset * 2,
                repeat: Infinity,
                ease: 'linear',
              }}
              opacity="0.8"
            />
          ))}
        </>
      )}
    </g>
  );
}
