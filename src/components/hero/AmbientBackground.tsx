"use client";

import { motion } from "framer-motion";

export default function AmbientBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Deep base grid */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]" />

      {/* Aurora Blob 1 - Deep Blue */}
      <motion.div
        animate={{
          x: [0, 100, 0, -100, 0],
          y: [0, 50, 100, 50, 0],
          scale: [1, 1.2, 1, 0.8, 1],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-cyan-900/10 blur-[120px] mix-blend-screen"
      />

      {/* Aurora Blob 2 - Subdued Cyan */}
      <motion.div
        animate={{
          x: [0, -100, 0, 100, 0],
          y: [0, 100, 50, -50, 0],
          scale: [1, 0.8, 1.2, 1, 1],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-[20%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-blue-900/10 blur-[120px] mix-blend-screen"
      />

      {/* Aurora Blob 3 - Cyan center glow */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[40%] left-[30%] w-[30vw] h-[30vw] rounded-full bg-cyan-500/5 blur-[100px] mix-blend-screen"
      />

      {/* Depth Fog at bottom */}
      <div className="absolute bottom-0 left-0 w-full h-[30vh] bg-gradient-to-t from-background to-transparent" />
    </div>
  );
}
