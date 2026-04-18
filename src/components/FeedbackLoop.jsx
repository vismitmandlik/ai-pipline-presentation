import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function FeedbackLoop({ from, to, label, color, y, animated }) {
  const [x1, setX1] = useState(0);
  const [x2, setX2] = useState(0);
  const [baseY, setBaseY] = useState(0);

  useEffect(() => {
    const updateCoordinates = () => {
      const fromEl = document.getElementById(from);
      const toEl = document.getElementById(to);

      if (fromEl && toEl) {
        const fromRect = fromEl.getBoundingClientRect();
        const toRect = toEl.getBoundingClientRect();
        const svgRect = fromEl.parentElement.getBoundingClientRect();

        setX1(fromRect.left - svgRect.left + fromRect.width / 2);
        setX2(toRect.left - svgRect.left + toRect.width / 2);
        setBaseY(fromRect.top - svgRect.top + fromRect.height / 2);
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

  const controlPointY = baseY + y;
  const labelX = (x1 + x2) / 2;
  const labelY = controlPointY - 10;

  return (
    <g>
      <defs>
        <marker
          id={`arrowhead-feedback-${from}-${to}`}
          markerWidth="10"
          markerHeight="10"
          refX="9"
          refY="3"
          orient="auto"
        >
          <polygon points="0 0, 10 3, 0 6" fill="#ef4444" />
        </marker>
      </defs>

      {/* Curved feedback path */}
      <path
        d={`M ${x1} ${baseY} Q ${(x1 + x2) / 2} ${controlPointY} ${x2} ${baseY}`}
        fill="none"
        stroke="#ef4444"
        strokeWidth="2"
        strokeDasharray="5,5"
        markerEnd={`url(#arrowhead-feedback-${from}-${to})`}
        opacity="0.5"
      />

      {/* Label background */}
      <rect
        x={labelX - 35}
        y={labelY - 12}
        width="70"
        height="24"
        rx="12"
        fill="#1e293b"
        stroke="#ef4444"
        strokeWidth="1"
        opacity="0.8"
      />

      {/* Label text */}
      <text
        x={labelX}
        y={labelY + 3}
        textAnchor="middle"
        fontSize="11"
        fontWeight="600"
        fill="#fca5a5"
      >
        {label}
      </text>

      {/* Animated pulse */}
      {animated && (
        <>
          {[0, 0.5].map((offset) => (
            <motion.circle
              key={`feedback-dot-${offset}`}
              cx={x1}
              cy={baseY}
              r="2.5"
              fill="#fca5a5"
              initial={{ cx: x1, cy: baseY }}
              animate={{
                cx: [x1, (x1 + x2) / 2, x2],
                cy: [baseY, controlPointY, baseY],
              }}
              transition={{
                duration: 2,
                delay: offset * 2,
                repeat: Infinity,
                ease: 'linear',
              }}
              opacity="0.6"
            />
          ))}
        </>
      )}
    </g>
  );
}
