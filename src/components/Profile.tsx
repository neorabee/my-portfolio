"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import FocusReveal from "./FocusReveal";
import SectionConcept from "./SectionConcept";

const skillGroups = [
  {
    title: "Backend Engineering",
    skills: ["Go", "REST APIs", "Databases"]
  },
  {
    title: "Systems",
    skills: ["Linux", "Monitoring", "Networking"]
  },
  {
    title: "Development",
    skills: ["Git", "TypeScript", "Next.js"]
  },
  {
    title: "Writing & Communication",
    skills: ["Technical Writing", "Documentation", "Science Communication"]
  }
];

export default function Profile() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section id="profile" className="py-32 relative overflow-hidden">
      <SectionConcept concept={{ text: "SYSTEMS", size: "20vw", xOffset: "-5%", yOffset: "15%", drift: -160, side: "left" }} />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] pointer-events-none" />

      <div className="mx-auto max-w-6xl px-6 relative z-10 lg:pl-[22%]">
        
        {/* Docking Anchor */}
        <div className="hidden lg:block absolute left-[20%] top-1/2 -translate-y-1/2 w-[1px] h-32 bg-gradient-to-b from-transparent via-accent/50 to-transparent" />
        <div className="hidden lg:block absolute left-[20%] top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-accent shadow-[0_0_10px_rgba(14,165,233,0.8)] -translate-x-[0.5px]" />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          {/* LEFT COLUMN: ABOUT */}
          <div className="lg:col-span-7 space-y-12">
            <FocusReveal>
              
              <div className="space-y-6 text-muted-light leading-relaxed text-base md:text-lg font-light">
                <p>
                  I&apos;m <span className="text-foreground font-medium">Rabee Aman Achoth</span>, a 2nd-year
                  Computer Science and Engineering student at NIT Calicut. I focus on building robust backend systems, exploring Linux infrastructure, and developing internal developer tooling.
                </p>
                <p>
                  My engineering philosophy is grounded in first principles. I believe the best software is
                  built with clarity of thought, a deep understanding of the underlying systems, and an obsessive attention to detail.
                </p>
                <p>
                  Currently, I&apos;m building a real-time CTF Tracking extension for the cybersecurity club at NITC, and also helping build an AI-powered CTF solving bot.
                </p>
                <p>
                  Beyond code, I spend my time exploring science communication by write about ideas that could shape our future and philosophical abstraction. I also play football, run and read.
                </p>
              </div>
            </FocusReveal>
          </div>

          {/* RIGHT COLUMN: SKILLS */}
          <div className="lg:col-span-5">
            <FocusReveal>
              <h3 className="text-xl font-semibold tracking-tight mb-8">Technologies</h3>
            </FocusReveal>

            <div className="space-y-8">
              {skillGroups.map((group, groupIndex) => (
                <FocusReveal key={group.title} delay={0.1 * groupIndex}>
                  <div className="group">
                    <h4 className="text-sm font-mono text-muted-light uppercase tracking-wider mb-3">
                      {group.title}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {group.skills.map((skill, skillIndex) => (
                        <motion.div
                          key={skill}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.1 * groupIndex + 0.05 * skillIndex, duration: 0.4 }}
                          whileHover={{ y: -2 }}
                          className="px-3 py-1.5 rounded-md bg-surface border border-white/5 text-sm text-muted-light hover:text-foreground hover:bg-white/5 hover:border-white/20 transition-all duration-300 cursor-default"
                        >
                          {skill}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </FocusReveal>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
