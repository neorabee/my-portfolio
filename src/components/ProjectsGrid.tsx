"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { ArrowRight, GitCommit, ChevronLeft, ChevronRight } from "lucide-react";
import MobileSectionHeader from "./MobileSectionHeader";
import SectionMarker from "./SectionMarker";

/* =============================================================================
   PENGU OS — image slideshow sourced from /public/projects/pengu/.
   Drop numbered screenshots (01.png, 02.png, ...) in that folder, or edit
   the SLIDES array below to point at whatever filenames/captions you have.
   Auto-plays on a loop, pauses on hover, and stays paused after the visitor
   manually navigates so it doesn't fight their input.
============================================================================= */

interface Slide {
  src: string;
  alt: string;
  caption: string;
}

const SLIDES: Slide[] = [
  {
    src: "/mcbot/04.png",
    alt: "Pengu dashboard, live telemetry stream",
    caption: "Command center — live HP, inventory, and position over WebSockets",
  },
  {
    src: "/mcbot/01.png",
    alt: "Pengu bot pathfinding through terrain",
    caption: "A* pathfinding resolving a route through uneven terrain",
  },
  {
    src: "/mcbot/03.png",
    alt: "Pengu bot mining a resource vein",
    caption: "Autonomous mining — block targeting and inventory tracking",
  },
  {
    src: "/mcbot/02.png",
    alt: "Pengu bot first-person POV viewer",
    caption: "POV viewer — first-person feed piped to the dashboard",
  },
];

const AUTOPLAY_MS = 4500;

export default function ProjectsGrid() {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const slideCount = SLIDES.length;

  const goTo = useCallback(
    (next: number) => {
      setIndex(((next % slideCount) + slideCount) % slideCount);
    },
    [slideCount]
  );

  const handleManualNav = useCallback(
    (next: number) => {
      setUserInteracted(true);
      goTo(next);
    },
    [goTo]
  );

  // Autoplay loop — stops entirely once the visitor takes manual control,
  // and pauses (without resetting) while the panel is hovered.
  useEffect(() => {
    if (userInteracted || isPaused) return;
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % slideCount);
    }, AUTOPLAY_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [userInteracted, isPaused, slideCount]);

  return (
    <section id="pengu" className="py-32 md:py-44 relative group">
      <div className="mx-auto max-w-7xl px-6 relative z-10 lg:pr-[22%]">
        <SectionMarker label="SECTOR: AUTONOMY" />
        <MobileSectionHeader title="AUTONOMY" subtitle="PENGU OS" icon="star" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* ---------------- LEFT: narrative ---------------- */}
          <div className="lg:col-span-5 space-y-8">
            <h2
              id="anchor-pengu"
              className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter leading-[0.9] mb-3"
            >
              Project: Minecraft <span className="text-cyan-400">AI</span> Bot
            </h2>

            <p className="text-lg md:text-xl text-muted-light font-light tracking-wide mb-8">
              Autonomous Environment Navigation Agent
            </p>

            <div className="flex flex-wrap gap-2 mb-10">
              {["Mineflayer", "A* Pathfinding", "WebSockets", "Next.js"].map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-xs font-mono text-muted-light"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="space-y-6 text-base text-muted-light leading-relaxed">
              <div>
                <h4 className="text-foreground font-semibold mb-2">The Problem</h4>
                <p>
                  Navigating complex voxel environments programmatically requires
                  constant spatial awareness and pathfinding recalculations.
                  Standard bots are entirely reactive, lacking the architecture to
                  process environmental data streams concurrently.
                </p>
              </div>
              <div>
                <h4 className="text-foreground font-semibold mb-2">The Solution</h4>
                <p>
                  Pengu acts as a distributed system. The{" "}
                  <span className="text-foreground font-medium">Mineflayer</span>{" "}
                  instance handles pure environmental interactions, while a{" "}
                  <span className="text-foreground font-medium">
                    Next.js / WebSockets
                  </span>{" "}
                  dashboard streams live state telemetry and enables real-time
                  overrides and path injections.
                </p>
              </div>
            </div>

            <div className="pt-8">
              <a
                href="https://github.com/neorabee/minecraft_ai_bot"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-muted hover:text-foreground transition-colors duration-300"
              >
                <span className="relative pb-1">
                  VIEW SOURCE CODE
                  <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-accent group-hover:w-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                </span>
                <ArrowRight
                  size={14}
                  className="text-muted-light group-hover:text-accent group-hover:translate-x-1 transition-all duration-300"
                />
              </a>
            </div>
          </div>

          {/* ---------------- RIGHT: image slideshow ---------------- */}
          <div className="lg:col-span-7 w-full">
            <div
              className="rounded-xl border border-white/[0.08] bg-[#0a0c0f] overflow-hidden"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {/* status bar */}
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.06] bg-white/[0.015]">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 animate-ping" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-muted">
                    pengu-core.log
                  </span>
                </div>
                <span className="text-[10px] font-mono text-muted-light">
                  {String(index + 1).padStart(2, "0")} / {String(slideCount).padStart(2, "0")}
                </span>
              </div>

              {/* slide viewport */}
              <div className="relative aspect-[16/10] bg-[#0d1014] overflow-hidden">
                {SLIDES.map((slide, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={slide.src}
                    src={slide.src}
                    alt={slide.alt}
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
                    style={{ opacity: i === index ? 1 : 0 }}
                    draggable={false}
                  />
                ))}

                {/* prev / next controls */}
                <button
                  type="button"
                  aria-label="Previous screenshot"
                  onClick={() => handleManualNav(index - 1)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-black/60 transition-colors"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  type="button"
                  aria-label="Next screenshot"
                  onClick={() => handleManualNav(index + 1)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-black/60 transition-colors"
                >
                  <ChevronRight size={16} />
                </button>
              </div>

              {/* dots */}
              <div className="flex items-center justify-center gap-2 py-3 border-t border-white/[0.06]">
                {SLIDES.map((slide, i) => (
                  <button
                    key={slide.src}
                    type="button"
                    aria-label={`Go to screenshot ${i + 1}`}
                    onClick={() => handleManualNav(i)}
                    className="p-1.5"
                  >
                    <span
                      className={`block rounded-full transition-all ${
                        i === index
                          ? "w-4 h-1.5 bg-cyan-400"
                          : "w-1.5 h-1.5 bg-white/20 hover:bg-white/40"
                      }`}
                    />
                  </button>
                ))}
              </div>

              {/* caption */}
              <div className="border-t border-white/[0.06] bg-black/20 px-4 py-3">
                <p className="font-mono text-[11px] text-muted-light truncate">
                  <span className="text-cyan-300">[exec]</span> {SLIDES[index].caption}
                </p>
              </div>
            </div>

            <p className="text-[11px] font-mono text-muted mt-3 text-center">
              Screenshots from a live Mineflayer session — dashboard, pathfinding, mining, and POV feed.
            </p>
          </div>
        </div>

        {/* ---------------- currently building ---------------- */}
        <div className="mt-32 sm:mt-40 border-t border-white/5 pt-6">
          <div className="flex items-center gap-3 mb-8">
            <GitCommit size={16} className="text-muted" />
            <h3 className="text-sm font-mono text-muted uppercase tracking-widest">
              Currently Building
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              {
                name: "CTF Tracker Extension",
                desc: "Browser assistance for cybersecurity club - nitc",
              },
              { name: "AI CTF Automator", desc: "AI agent that solves CTFs" },
            ].map((item, i) => (
              <div
                key={i}
                className="group border-l-2 border-white/5 pl-4 hover:border-accent/30 transition-colors duration-300"
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent/20 group-hover:bg-accent group-hover:animate-pulse transition-colors" />
                  <h4 className="text-sm font-medium text-muted-light group-hover:text-foreground transition-colors">
                    {item.name}
                  </h4>
                </div>
                <p className="text-xs text-muted font-mono">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}