"use client";


import FocusReveal from "./FocusReveal";
import SectionConcept from "./SectionConcept";
import MobileSectionHeader from "./MobileSectionHeader";
import AmbientBackground from "./hero/AmbientBackground";

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
  return (
    <section id="profile" className="py-32 md:py-40 relative overflow-hidden">
      <AmbientBackground />
      <SectionConcept concept={{ text: "SYSTEMS", size: "20vw", yOffset: "15%", direction: "left", duration: 150 }} />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] pointer-events-none" />

      <div className="mx-auto max-w-6xl px-6 relative z-10 lg:pl-[22%]">

        <MobileSectionHeader title="PROFILE" subtitle="THE OPERATOR" icon="star-sm" />

        {/* ── Opening statement — the hook ── */}
        <FocusReveal>
          <div className="mb-20 md:mb-28 max-w-2xl">


            <h2 id="anchor-profile" className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter leading-[0.95] mb-6">
              I build systems<br />that think clearly.
            </h2>

            <p className="text-lg md:text-xl text-muted-light font-light leading-relaxed max-w-xl">
              I&apos;m <span className="text-foreground font-medium">Rabee Aman Achoth</span>, a 2nd-year
              Computer Science and Engineering student at NIT Calicut. I focus on building robust backend systems, exploring Linux infrastructure, and developing internal developer tooling.
            </p>
          </div>
        </FocusReveal>

        {/* ── Two-column body ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">

          {/* ── Left: Philosophy + Current ── */}
          <div className="lg:col-span-7 space-y-16">

            {/* Engineering philosophy — quote-style callout */}
            <FocusReveal>
              <div className="border-l-2 border-accent/30 pl-6 md:pl-8">
                <p className="text-lg md:text-xl text-muted-light font-light leading-relaxed italic">
                  &ldquo;The best software is built with clarity of thought, a deep understanding of the underlying systems, and an obsessive attention to detail.&rdquo;
                </p>
                <p className="text-sm text-muted font-mono mt-4 tracking-wide">
                  — Engineering Philosophy
                </p>
              </div>
            </FocusReveal>

            {/* Currently */}
            <FocusReveal>
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
              </div>
            </FocusReveal>
          </div>

          {/* ── Right: Technologies ── */}
          <div className="lg:col-span-5 lg:-mt-12">
            <FocusReveal>
              <h3 className="text-xs font-mono text-muted uppercase tracking-widest mb-8">Technologies</h3>
            </FocusReveal>

            <div className="space-y-7">
              {skillGroups.map((group, groupIndex) => (
                <FocusReveal key={group.title} delay={0.1 * groupIndex}>
                  <div>
                    <h4 className="text-sm text-muted-light font-medium tracking-wide mb-3">
                      {group.title}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {group.skills.map((skill, skillIndex) => (
                        <div
                          key={skill}
                          className="px-3 py-1.5 rounded-md bg-surface border border-white/5 text-sm text-muted-light hover:text-foreground hover:bg-white/5 hover:border-white/20 hover:-translate-y-0.5 transition-all duration-300 cursor-default"
                        >
                          {skill}
                        </div>
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
