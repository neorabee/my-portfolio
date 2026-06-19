"use client";

import { useEffect, useRef, useState } from "react";

export default function SectionMarker({ label }: { label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsActive(entry.isIntersecting);
      },
      { threshold: 0.5, rootMargin: "-100px 0px" }
    );
    
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const cleanLabel = label.replace(/[\[\]]/g, '').trim();

  return (
    <div ref={ref} className={`mb-8 md:mb-12 transition-all duration-1000 ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
      <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-950/40 to-violet-950/40 border border-white/10 shadow-[0_0_20px_rgba(34,211,238,0.1)_inset,0_0_15px_rgba(34,211,238,0.05)] backdrop-blur-md relative group overflow-hidden">
        
        {/* Subtle sweeping highlight effect */}
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:animate-[shimmer_2s_infinite]" />
        
        {/* Glowing Data Dot */}
        <div className="relative flex items-center justify-center w-2 h-2">
          <div className="absolute w-2 h-2 rounded-full bg-cyan-400 animate-ping opacity-60" />
          <div className="relative w-1.5 h-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_#22d3ee]" />
        </div>
        
        <span className="font-sans text-xs sm:text-sm font-semibold tracking-[0.15em] uppercase bg-gradient-to-r from-cyan-50 to-white bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(255,255,255,0.2)]">
          {cleanLabel}
        </span>
      </div>
    </div>
  );
}
