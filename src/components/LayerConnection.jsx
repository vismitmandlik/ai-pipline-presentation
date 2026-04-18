import React from 'react';

export default function LayerConnection({ from, to, label }) {
  return (
    <g>
      <line
        x1={from.x}
        y1={from.y}
        x2={to.x}
        y2={to.y}
        stroke="#a78bfa"
        strokeWidth="2"
        markerEnd="url(#arrowhead-connection)"
      />
      <text
        x={(from.x + to.x) / 2}
        y={(from.y + to.y) / 2 - 5}
        textAnchor="middle"
        fill="#a78bfa"
        fontSize="12"
      >
        {label}
      </text>
    </g>
  );
}
