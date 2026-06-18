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

  return (
    <div ref={ref} className={`flex items-center gap-4 mb-8 md:mb-12 transition-all duration-1000 ${isActive ? "opacity-100" : "opacity-40"}`}>
      <div className={`h-px transition-colors duration-1000 w-8 ${isActive ? "bg-accent/40" : "bg-accent/10"}`} />
      <span className={`font-mono text-[10px] sm:text-[11px] tracking-[0.2em] uppercase transition-colors duration-1000 ${isActive ? "text-accent" : "text-muted-light/50"}`}>
        {label}
      </span>
      <div className={`h-px transition-colors duration-1000 flex-grow max-w-[120px] sm:max-w-[200px] ${isActive ? "bg-accent/40" : "bg-accent/10"}`} />
    </div>
  );
}
