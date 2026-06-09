"use client";

import { motion } from "framer-motion";

const cards = [
  { label: "Go Routine", x: "15%", y: "20%", delay: 0 },
  { label: "Linux", x: "75%", y: "15%", delay: 1 },
  { label: "/proc/meminfo", x: "85%", y: "60%", delay: 2 },
  { label: "Distributed Nodes", x: "10%", y: "70%", delay: 1.5 },
  { label: "Next.js", x: "25%", y: "45%", delay: 0.5 },
  { label: "AI & ML", x: "70%", y: "80%", delay: 2.5 },
];

export default function FloatingCards() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10 hidden md:block">
      {cards.map((card, i) => (
        <motion.div
          key={i}
          className="absolute inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/5 bg-white/[0.01] backdrop-blur-[2px] text-xs font-mono text-muted-light/50 shadow-2xl"
          style={{ left: card.x, top: card.y }}
          animate={{
            y: [0, -15, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 6 + (i % 3),
            repeat: Infinity,
            ease: "easeInOut",
            delay: card.delay,
          }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
          {card.label}
        </motion.div>
      ))}
    </div>
  );
}
