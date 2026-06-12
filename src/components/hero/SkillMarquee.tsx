"use client";

const skillsRow1 = [
  "GO", "LINUX", "BACKEND", "SYSTEMS", "NEXT.JS", "REACT", "AI", "WRITING", "DEVTOOLS", "C", "APIs", "NETWORKING", "DATABASES", "OPEN SOURCE"
];

const skillsRow2 = [
  "POSTGRESQL", "DOCKER", "KUBERNETES", "RUST", "TYPESCRIPT", "DISTRIBUTED SYSTEMS", "ARCHITECTURE", "CI/CD", "AWS", "BASH", "SYSTEM DESIGN", "PERFORMANCE"
];

export default function SkillMarquee() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-[0.03] blur-[2px] flex flex-col justify-center items-center gap-12 sm:gap-24">
      {/* Row 1 - scrolling left — CSS animation */}
      <div className="flex whitespace-nowrap overflow-hidden -rotate-2">
        <div
          className="flex gap-8 px-4 animate-marquee-left"
        >
          {/* Only 2 copies needed for seamless CSS loop */}
          {[...skillsRow1, ...skillsRow1].map((skill, i) => (
            <span key={i} className="text-6xl md:text-8xl font-bold font-mono tracking-tighter text-foreground whitespace-nowrap">
              {skill} •
            </span>
          ))}
        </div>
      </div>

      {/* Row 2 - scrolling right — CSS animation */}
      <div className="flex whitespace-nowrap overflow-hidden rotate-2">
        <div
          className="flex gap-8 px-4 animate-marquee-right"
        >
          {/* Only 2 copies needed for seamless CSS loop */}
          {[...skillsRow2, ...skillsRow2].map((skill, i) => (
            <span key={i} className="text-6xl md:text-8xl font-bold font-mono tracking-tighter text-foreground whitespace-nowrap">
              {skill} •
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
