"use client";

import { useEffect, useState } from "react";
import MobileSectionHeader from "./MobileSectionHeader";
import { useRoadmap } from "./RoadmapContext";
import Experience from "./Experience";
import { ArrowRight } from "lucide-react";
import SectionMarker from "./SectionMarker";

const skillGroups = [
  {
    title: "Backend Engineering",
    skills: ["Go", "REST APIs", "Databases"],
  },
  {
    title: "Systems",
    skills: ["Linux", "Monitoring", "Networking"],
  },
  {
    title: "Development",
    skills: ["Git", "TypeScript", "Next.js"],
  },
  {
    title: "Writing & Communication",
    skills: ["Technical Writing", "Documentation", "Science Communication"],
  },
  {
    title: "Languages",
    skills: ["C", "JavaScript", "HTML", "CSS", "Python"],
  },
];

export default function Profile() {
  const { activeDetour, enterDetour } = useRoadmap();
  const isExperienceActive = activeDetour === "experience";
  const [renderExperience, setRenderExperience] = useState(false);

  useEffect(() => {
    if (isExperienceActive) {
      setRenderExperience(true);
    } else {
      document.documentElement.style.setProperty('--detour-scroll-y', '0px');
      const t = setTimeout(() => setRenderExperience(false), 1000);
      return () => clearTimeout(t);
    }
  }, [isExperienceActive]);

  return (
    <section id="profile" className="py-32 md:py-40 relative group">

      <div className="relative w-full overflow-hidden perspective-[2000px]">

        <div 
          className="w-full transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] origin-center"
          style={{ 
            transform: isExperienceActive ? 'scale(1.2) translateZ(100px)' : 'scale(1) translateZ(0)',
            opacity: isExperienceActive ? 0 : 1,
            pointerEvents: isExperienceActive ? 'none' : 'auto'
          }}
        >
          <div className="mx-auto max-w-7xl px-6 relative z-10 lg:pl-[22%]">
            <SectionMarker label="[ PROFILE ]" />
            <MobileSectionHeader title="PROFILE" subtitle="SYSTEMS & STACK" icon="saturn" />

            <div>
              <div className="mb-20 md:mb-28 max-w-2xl">
                <h2 id="anchor-profile" className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter leading-[0.95] mb-6">
                  I build systems<br />that think clearly.
                </h2>
                <p className="text-lg md:text-xl text-muted-light font-light leading-relaxed max-w-xl">
                  I&apos;m <span className="text-foreground font-medium">Rabee Aman Achoth</span>, a 2nd-year
                  Computer Science and Engineering student at NIT Calicut. I focus on building robust backend systems, exploring Linux infrastructure, and developing internal developer tooling.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">

              <div className="lg:col-span-7 space-y-16">

                <div>
                  <div className="border-l-2 border-accent/30 pl-6 md:pl-8">
                    <p className="text-lg md:text-xl text-muted-light font-light leading-relaxed italic">
                      &ldquo;The best software is built with clarity of thought, a deep understanding of the underlying systems, and an obsessive attention to detail.&rdquo;
                    </p>
                    <p className="text-sm text-muted font-mono mt-4 tracking-wide">
                      — Engineering Philosophy
                    </p>
                  </div>
                </div>

                <div>
                  <div className="space-y-10">
                    <div>
                      <h3 className="text-xs font-mono text-muted uppercase tracking-widest mb-4">Currently Building</h3>
                      <p className="text-base text-muted-light leading-relaxed font-light">
                        A real-time CTF Tracking extension for the cybersecurity club at NITC, and an AI-powered CTF solving bot.
                      </p>
                    </div>

                    <div className="h-px w-16 bg-white/[0.06]" />

                    <div>
                      <h3 className="text-xs font-mono text-muted uppercase tracking-widest mb-4">Currently Exploring</h3>
                      <p className="text-base text-muted-light leading-relaxed font-light">
                        Science communication — writing about ideas that could shape our future, and philosophical abstraction. Beyond code, I play football, run, and read.
                      </p>
                    </div>

                    <div className="pt-4 lg:hidden">
                      <button 
                        onClick={() => enterDetour("experience")}
                        className="group flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                      >
                        <span className="text-sm font-mono tracking-widest uppercase text-white/80 group-hover:text-white transition-colors">View Experience Timeline</span>
                        <ArrowRight className="w-4 h-4 text-accent/70 group-hover:text-accent group-hover:translate-x-1 transition-all" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 lg:-mt-12">
                <div>
                  <h3 className="text-xs font-mono text-muted uppercase tracking-widest mb-8">Technologies</h3>
                </div>

                <div className="space-y-7">
                  {skillGroups.map((group, groupIndex) => (
                    <div key={group.title}>
                      <div>
                        <h4 className="text-sm text-muted-light font-medium tracking-wide mb-3">
                          {group.title}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {group.skills.map((skill) => (
                            <div
                              key={skill}
                              className="px-2 py-1 border-l border-white/10 text-sm font-mono text-muted-light hover:text-foreground hover:border-accent/40 transition-all duration-300 cursor-default"
                            >
                              {skill}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      <div 
        className="fixed inset-0 overflow-y-auto overscroll-y-contain flex items-start transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] origin-center"
        onScroll={(e) => document.documentElement.style.setProperty('--detour-scroll-y', `${e.currentTarget.scrollTop}px`)}
        style={{
          transform: isExperienceActive ? 'scale(1) translateZ(0)' : 'scale(0.8) translateZ(-100px)',
          opacity: isExperienceActive ? 1 : 0,
          pointerEvents: isExperienceActive ? 'auto' : 'none',
          zIndex: isExperienceActive ? 50 : -10
        }}
      >
         {renderExperience && <Experience />}
      </div>
    </section>
  );
}
