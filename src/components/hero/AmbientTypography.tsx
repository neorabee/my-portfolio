"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function AmbientTypography() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax transforms for different depths
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, 300]);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <motion.div style={{ y: y1 }} className="absolute top-[10%] left-[-5%] opacity-[0.03]">
        <span className="text-[15vw] font-bold tracking-tighter leading-none whitespace-nowrap">ENGINEER</span>
      </motion.div>
      
      <motion.div style={{ y: y2 }} className="absolute top-[30%] right-[-10%] opacity-[0.02]">
        <span className="text-[20vw] font-bold tracking-tighter leading-none whitespace-nowrap">SYSTEMS</span>
      </motion.div>

      <motion.div style={{ y: y3 }} className="absolute top-[60%] left-[10%] opacity-[0.04]">
        <span className="text-[12vw] font-bold tracking-tighter leading-none whitespace-nowrap">BACKEND</span>
      </motion.div>

      <motion.div style={{ y: y4 }} className="absolute bottom-[-10%] right-[5%] opacity-[0.03]">
        <span className="text-[18vw] font-bold tracking-tighter leading-none whitespace-nowrap">BUILDER</span>
      </motion.div>
    </div>
  );
}
