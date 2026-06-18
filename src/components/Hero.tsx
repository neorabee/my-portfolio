"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { GithubIcon, LinkedinIcon, MediumIcon, InstagramIcon } from "./icons";

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-[100vh] flex items-center justify-center overflow-hidden pt-32 pb-20"
    >
      <div
        className="relative z-20 text-center max-w-4xl mx-auto px-6 flex flex-col items-center"
      >
        {/* Education Badges */}
        <div className="flex gap-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/5 bg-white/[0.02] backdrop-blur-md text-xs font-medium text-muted-light">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            Open to opportunities and ideas
          </div>
        </div>

<h1
  id="name-text"
  className="text-7xl sm:text-8xl md:text-[8.5rem] font-[family-name:var(--font-cormorant)] font-medium leading-[1.1] mb-8 text-cyan-400 drop-shadow-[0_0_20px_rgba(34,211,238,0.35)]"
>
  Rabee Aman
</h1>

        {/* Tagline */}
        <div className="max-w-2xl mx-auto mb-12">
          <p className="text-xl md:text-2xl text-muted-light leading-relaxed font-light tracking-tight">
            I'm a B.Tech CSE second year who builds <span className="text-foreground font-normal">backend systems and tools</span> that turn into
            <span className="text-foreground font-normal"> useful products</span>.
          </p>
        </div>

        {/* External Links Row */}
        <div
          id="hero-links"
          className="flex flex-wrap items-center justify-center gap-4 mb-16"
        >
          {[
            { icon: GithubIcon, href: "https://github.com/neorabee", label: "GitHub" },
            { icon: LinkedinIcon, href: "https://www.linkedin.com/in/rabee-aman-achoth-609606376/", label: "LinkedIn" },
            { icon: MediumIcon, href: "https://medium.com/@rabeeaman07", label: "Medium" },
            { icon: InstagramIcon, href: "https://instagram.com/rabeelim", label: "Instagram" },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-12 h-12 rounded-full border border-white/5 bg-white/[0.02] text-muted hover:text-foreground hover:bg-white/[0.06] hover:scale-105 hover:-translate-y-0.5 transition-all duration-300"
              aria-label={item.label}
            >
              <item.icon className="w-5 h-5" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hero;
