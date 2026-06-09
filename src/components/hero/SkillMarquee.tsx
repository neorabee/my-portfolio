"use client";

import { motion } from "framer-motion";

const skillsRow1 = [
  "GO", "LINUX", "BACKEND", "SYSTEMS", "NEXT.JS", "REACT", "AI", "WRITING", "DEVTOOLS", "C", "APIs", "NETWORKING", "DATABASES", "OPEN SOURCE"
];

const skillsRow2 = [
  "POSTGRESQL", "DOCKER", "KUBERNETES", "RUST", "TYPESCRIPT", "DISTRIBUTED SYSTEMS", "ARCHITECTURE", "CI/CD", "AWS", "BASH", "SYSTEM DESIGN", "PERFORMANCE"
];

export default function SkillMarquee() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-[0.03] blur-[2px] flex flex-col justify-center items-center gap-12 sm:gap-24">
      {/* Row 1 - scrolling left */}
      <div className="flex whitespace-nowrap overflow-hidden -rotate-2">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 40,
              ease: "linear",
            },
          }}
          className="flex gap-8 px-4"
        >
          {/* Repeat array twice for seamless loop */}
          {[...skillsRow1, ...skillsRow1, ...skillsRow1].map((skill, i) => (
            <span key={i} className="text-6xl md:text-8xl font-bold font-mono tracking-tighter text-foreground whitespace-nowrap">
              {skill} •
            </span>
          ))}
        </motion.div>
      </div>

      {/* Row 2 - scrolling right */}
      <div className="flex whitespace-nowrap overflow-hidden rotate-2">
        <motion.div
          animate={{ x: [-1000, 0] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 50,
              ease: "linear",
            },
          }}
          className="flex gap-8 px-4"
        >
          {/* Repeat array twice for seamless loop */}
          {[...skillsRow2, ...skillsRow2, ...skillsRow2].map((skill, i) => (
            <span key={i} className="text-6xl md:text-8xl font-bold font-mono tracking-tighter text-foreground whitespace-nowrap">
              {skill} •
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
