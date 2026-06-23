"use client";

import { useEffect, useRef, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$*?!+";

export default function SectionMarker({ label }: { label: string }) {
  const cleanLabel = label.replace(/[\[\]]/g, "").trim().toUpperCase();
  const ref = useRef<HTMLDivElement>(null);

  const [hasAnimated, setHasAnimated] = useState(false);
  const [displayText, setDisplayText] = useState(cleanLabel);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;

    let frame = 0;
    const totalFrames = 20; // 800ms total
    const interval = setInterval(() => {
      frame++;

      if (frame >= totalFrames) {
        clearInterval(interval);
        setDisplayText(cleanLabel);
        return;
      }

      const progress = frame / totalFrames;
      const resolvedCount = Math.floor(progress * cleanLabel.length);

      let scrambled = "";
      for (let i = 0; i < cleanLabel.length; i++) {
        if (i < resolvedCount || cleanLabel[i] === " ") {
          scrambled += cleanLabel[i];
        } else {
          scrambled += CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      }
      setDisplayText(scrambled);
    }, 40);

    return () => clearInterval(interval);
  }, [hasAnimated, cleanLabel]);

  return (
    <div ref={ref} className="mb-4 md:mb-6 flex">
      <span className="font-mono text-sm tracking-[0.25em] text-white font-bold flex items-center relative w-max py-1">
        
        {/* Left Bracket */}
        <span
          className={`text-accent absolute top-0 bottom-0 flex items-center transition-all duration-[800ms] ease-[cubic-bezier(0.2,1,0.2,1)] ${
            hasAnimated ? "left-0" : "left-1/2 -translate-x-[8px]"
          }`}
        >
          [
        </span>

        {/* Decipher Text with Clip Path reveal */}
        <span
          className="px-3.5 transition-all duration-[800ms] ease-[cubic-bezier(0.2,1,0.2,1)]"
          style={{
            clipPath: hasAnimated ? "inset(0 0 0 0)" : "inset(0 50% 0 50%)",
          }}
        >
          {displayText}
        </span>

        {/* Right Bracket */}
        <span
          className={`text-accent absolute top-0 bottom-0 flex items-center justify-end transition-all duration-[800ms] ease-[cubic-bezier(0.2,1,0.2,1)] ${
            hasAnimated ? "right-0" : "right-1/2 translate-x-[8px]"
          }`}
        >
          ]
        </span>
      </span>
    </div>
  );
}
