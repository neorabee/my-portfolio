"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface FocusRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export default function FocusReveal({
  children,
  className = "",
  delay = 0,
}: FocusRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0.4, scale: 0.98, filter: "blur(4px)" }}
      animate={isInView ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
