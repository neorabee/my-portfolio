"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export interface ConceptWord {
  text: string;
  size: string;        // e.g. "18vw"
  xOffset: string;     // CSS left/right positioning
  yOffset: string;     // CSS top positioning
  drift: number;       // parallax intensity
  side: "left" | "right";
}

export default function SectionConcept({ concept }: { concept: ConceptWord }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax drift relative to this section's scroll progress
  const y = useTransform(scrollYProgress, [0, 1], [-concept.drift, concept.drift]);

  const posStyle: React.CSSProperties = {
    position: "absolute",
    top: concept.yOffset,
    ...(concept.side === "left"
      ? { left: concept.xOffset }
      : { right: concept.xOffset }),
  };

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none z-0"
    >
      <motion.div
        style={{ ...posStyle, y }}
        className="pointer-events-none select-none"
      >
        <span
          className="font-bold tracking-tighter leading-none whitespace-nowrap block"
          style={{
            fontSize: concept.size,
            // Hardcode constraints: 3% opacity, strong blur, so it acts as environmental atmosphere
            opacity: 0.03,
            filter: "blur(8px)",
            color: "white",
          }}
        >
          {concept.text}
        </span>
      </motion.div>
    </div>
  );
}
