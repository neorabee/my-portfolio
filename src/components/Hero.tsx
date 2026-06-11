"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon, MediumIcon, InstagramIcon } from "./icons";
import AmbientBackground from "./hero/AmbientBackground";
import CentralVisual from "./hero/CentralVisual";
import SkillMarquee from "./hero/SkillMarquee";
import SectionConcept from "./SectionConcept";
import TechnicalGrid from "./hero/TechnicalGrid";
import FloatingCards from "./hero/FloatingCards";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: any = {
  hidden: { opacity: 0, x: -10, filter: "blur(4px)" },
  visible: {
    opacity: [0, 1, 0.5, 1],
    x: [-10, 5, -2, 0],
    skewX: [10, -5, 2, 0],
    filter: ["blur(4px)", "blur(0px)", "blur(2px)", "blur(0px)"],
    transition: {
      duration: 0.4,
      times: [0, 0.4, 0.6, 1],
      ease: "easeOut",
    },
  },
};

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Cinematic scroll fading
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-[100vh] flex items-center justify-center overflow-hidden pt-32 pb-20 bg-background"
    >
      {/* Background Architecture */}
      <AmbientBackground />
      <SectionConcept concept={{
        text: "ENGINEERING",
        size: "18vw",
        xOffset: "-5%",
        yOffset: "20%",
        drift: -150,
        side: "left"
      }} />
      <CentralVisual />
      <SkillMarquee />
      <TechnicalGrid />
      <FloatingCards />

      <motion.div
        style={{ opacity, scale, y }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-20 text-center max-w-4xl mx-auto px-6 flex flex-col items-center"
      >
        {/* Education Badges */}
        <motion.div variants={itemVariants} className="flex gap-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/5 bg-white/[0.02] backdrop-blur-md text-xs font-medium text-muted-light">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            Open to opportunities and ideas
          </div>
        </motion.div>

        {/* Title / Name */}
<motion.h1
  variants={itemVariants}
  className="text-6xl sm:text-7xl md:text-[6rem] font-bold tracking-tighter leading-[1.1] mb-8 text-cyan-400 drop-shadow-[0_0_20px_rgba(34,211,238,0.35)]"
>
  Rabee Aman
</motion.h1>

        {/* Tagline */}
        <motion.div variants={itemVariants} className="max-w-2xl mx-auto mb-12">
          <p className="text-xl md:text-2xl text-muted-light leading-relaxed font-light tracking-tight">
            I'm a B.Tech CSE second year who builds <span className="text-foreground font-normal">backend systems and tools</span> that turn into
            <span className="text-foreground font-normal"> useful products</span>.
          </p>
        </motion.div>

        {/* External Links Row */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-4 mb-16"
        >
          {[
            { icon: GithubIcon, href: "https://github.com/neorabee", label: "GitHub" },
            { icon: LinkedinIcon, href: "https://www.linkedin.com/in/rabee-aman-achoth-609606376/", label: "LinkedIn" },
            { icon: MediumIcon, href: "https://medium.com/@rabeeaman07", label: "Medium" },
            { icon: InstagramIcon, href: "https://instagram.com/rabeelim", label: "Instagram" },
          ].map((item) => (
            <motion.a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center w-12 h-12 rounded-full border border-white/5 bg-white/[0.02] text-muted hover:text-foreground hover:bg-white/[0.06] transition-all duration-300"
              aria-label={item.label}
            >
              <item.icon className="w-5 h-5" />
            </motion.a>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
        >
          <motion.a
            href="#featured"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-foreground text-background font-medium text-sm transition-colors hover:bg-white/90 flex items-center justify-center gap-2 glow"
          >
            Explore Work
          </motion.a>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.05)" }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl border border-white/10 bg-surface-light/30 backdrop-blur-md text-foreground font-medium text-sm transition-colors flex items-center justify-center gap-2"
          >
            <Mail size={16} className="text-muted" />
            Get in touch
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}
