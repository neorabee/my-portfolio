"use client";

import { motion } from "framer-motion";

export interface ConceptWord {
  text: string;
  size: string;        // e.g. "18vw"
  yOffset: string;     // CSS top positioning
  direction: "left" | "right";
  duration: number;    // Animation duration in seconds (e.g., 100)
}

export default function SectionConcept({ concept }: { concept: ConceptWord }) {
  const isLeft = concept.direction === "left";

  const textStyle = {
    fontSize: concept.size,
    opacity: 0.03,
    filter: "blur(8px)",
    color: "white",
  };

  return (
    <div
      className="hidden lg:block absolute inset-0 overflow-hidden pointer-events-none z-0"
    >
      <motion.div
        className="pointer-events-none select-none flex absolute"
        style={{ top: concept.yOffset, left: 0 }}
        animate={{ x: isLeft ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: concept.duration,
        }}
      >
        {/* We render 4 copies of the word. Translating by 50% will shift exactly 2 copies over, creating a perfect seamless loop. */}
        <span className="font-bold tracking-tighter leading-none whitespace-nowrap pr-32" style={textStyle}>
          {concept.text}
        </span>
        <span className="font-bold tracking-tighter leading-none whitespace-nowrap pr-32" style={textStyle}>
          {concept.text}
        </span>
        <span className="font-bold tracking-tighter leading-none whitespace-nowrap pr-32" style={textStyle}>
          {concept.text}
        </span>
        <span className="font-bold tracking-tighter leading-none whitespace-nowrap pr-32" style={textStyle}>
          {concept.text}
        </span>
      </motion.div>
    </div>
  );
}
