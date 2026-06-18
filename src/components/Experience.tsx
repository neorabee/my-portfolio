"use client";

import { useEffect, useRef } from "react";
import { useRoadmap } from "./RoadmapContext";
import SectionMarker from "./SectionMarker";
import { X } from "lucide-react";

const timelineEvents = [
  {
    year: "July 2025",
    title: "Joined NIT Calicut",
    description: "Began my Computer Science and Engineering journey at NIT Calicut, focusing on systems thinking, software engineering, and building technical foundations.",
  },
  {
    year: "February 2026",
    title: "Won Best Fresher — Code.init Hackathon",
    description: "Worked as part of Team Penguins and won Best Fresher at a hackathon conducted by the Department of Computer Science and Engineering.\n\nThis milestone marked my first major recognition for building real-world software under time pressure.",
  },
  {
    year: "May 2026",
    title: "Built a Linux Process Monitoring Dashboard",
    description: "Developed a full-stack system monitoring application using Go and Next.js.\n\nThe system reads Linux process and system information directly from the kernel, exposes metrics through an HTTP API, and visualizes them through an interactive dashboard.",
  },
  {
    year: "June 2026",
    title: "Built a Cybersecurity Club Coordination Extension",
    description: "Created an extension designed to help Cybersecurity Club members coordinate during CTF competitions.\n\nThe platform streamlines challenge management, progress tracking, collaboration, and knowledge sharing to improve team performance during events.",
  },
  {
    year: "June 2026",
    title: "Joined Yeloria — Global Education Hub",
    description: "Started an internship focused on IT and programming, contributing to software-related initiatives while gaining experience in professional development environments.",
  },
  {
    year: "2026+",
    title: "Next Destination",
    description: "The journey is still being written.",
    inactive: true,
  }
];

export default function Experience() {
  const { exitDetour, activeDetour } = useRoadmap();
  const bumperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeDetour !== "experience") return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          exitDetour();
        }
      },
      { rootMargin: "0px 0px 0px 0px", threshold: 0 }
    );

    if (bumperRef.current) {
      observer.observe(bumperRef.current);
    }

    return () => observer.disconnect();
  }, [activeDetour, exitDetour]);

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-20 min-h-screen flex flex-col justify-center relative lg:pl-[22%] pointer-events-auto">
      
      {/* Header */}
      <div>
        <SectionMarker label="DESTINATION // EXPERIENCE" />
        <div className="flex items-center justify-between mb-16">
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-bold tracking-tight">TRAJECTORY</h2>
            <div className="h-px w-8 bg-accent/40" />
            <span className="text-xs font-mono text-muted uppercase tracking-widest">MILESTONES</span>
          </div>
          <button 
            onClick={() => exitDetour()}
            className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 text-muted-light hover:text-white hover:bg-white/10 transition-all duration-300 group z-50 pointer-events-auto"
            aria-label="Close timeline"
          >
            <X size={18} className="group-hover:rotate-90 transition-transform duration-300" />
          </button>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative border-l border-white/10 ml-4 md:ml-6 space-y-16">
        {timelineEvents.map((event, i) => (
          <div key={i}>
            <div className={`group relative border-l border-transparent pl-8 pb-4 transition-colors duration-500`}>
              
              {/* Vertical connector hover effect */}
              {!event.inactive && (
                <div className="absolute left-[-1px] top-0 bottom-[-4rem] w-[1px] bg-accent/0 group-hover:bg-accent/40 transition-colors duration-500" />
              )}
              
              {/* Timeline dot */}
              <div className={`absolute left-[-5px] top-1.5 w-[9px] h-[9px] rounded-full bg-background border-2 transition-all duration-500 ${event.inactive ? 'border-white/10' : 'border-white/20 group-hover:border-accent group-hover:bg-accent/20 group-hover:shadow-[0_0_10px_rgba(14,165,233,0.3)]'}`} />
              
              {/* Content Box */}
              <div className={`py-1 relative ${event.inactive ? 'opacity-40' : ''}`}>
                {!event.inactive && <div className="absolute top-0 left-0 w-0 h-px bg-accent/40 group-hover:w-16 transition-all duration-700 ease-out" />}
                
                <span className={`inline-block px-2.5 py-1 rounded-md text-[10px] font-mono tracking-widest mb-4 ${event.inactive ? 'bg-transparent text-white/30 border border-white/10' : 'bg-white/[0.03] border border-white/5 text-muted-light group-hover:border-white/10 transition-colors'}`}>
                  {event.year.toUpperCase()}
                </span>
                
                <h3 className={`text-xl md:text-2xl font-bold tracking-tight mb-4 transition-colors duration-300 ${event.inactive ? 'text-white/30' : 'text-foreground group-hover:text-accent-light'}`}>
                  {event.title}
                </h3>
                
                <div className="text-base text-muted-light leading-relaxed max-w-2xl font-light space-y-4">
                  {event.description.split('\n\n').map((para, idx) => (
                    <p key={idx}>{para}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Breathing Room & Auto-Return Bumper */}
      <div className="h-[50vh]" />
      <div ref={bumperRef} className="h-px w-full" />
    </div>
  );
}
