"use client";

import { motion } from "framer-motion";

export default function CentralVisual() {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none z-0 opacity-30 mix-blend-screen">
      {/* Outer rotating dashed ring */}
      <motion.svg
        viewBox="0 0 100 100"
        className="absolute inset-0 w-full h-full text-blue-500/20"
        animate={{ rotate: 360 }}
        transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
      >
        <circle
          cx="50"
          cy="50"
          r="48"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.2"
          strokeDasharray="2 4"
        />
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.1"
          strokeDasharray="1 8"
        />
      </motion.svg>

      {/* Inner counter-rotating ring */}
      <motion.svg
        viewBox="0 0 100 100"
        className="absolute inset-0 w-full h-full text-cyan-400/20"
        animate={{ rotate: -360 }}
        transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
      >
        <circle
          cx="50"
          cy="50"
          r="32"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.15"
          strokeDasharray="4 4"
        />
      </motion.svg>

      {/* Abstract node connections */}
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 w-full h-full text-sky-500/20"
      >
        <g stroke="currentColor" strokeWidth="0.1" fill="none">
          <line x1="20" y1="20" x2="80" y2="80" />
          <line x1="20" y1="80" x2="80" y2="20" />
          <line x1="50" y1="10" x2="50" y2="90" />
          <line x1="10" y1="50" x2="90" y2="50" />
          
          <circle cx="50" cy="50" r="1" fill="currentColor" />
          <circle cx="20" cy="20" r="0.5" fill="currentColor" />
          <circle cx="80" cy="80" r="0.5" fill="currentColor" />
          <circle cx="20" cy="80" r="0.5" fill="currentColor" />
          <circle cx="80" cy="20" r="0.5" fill="currentColor" />
        </g>
      </svg>
    </div>
  );
}
