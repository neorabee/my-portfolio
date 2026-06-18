"use client";

import { ArrowRight, Terminal, Activity, GitCommit, Eye, Map, Zap, Radio, ArrowUpRight } from "lucide-react";
import MobileSectionHeader from "./MobileSectionHeader";
import SectionMarker from "./SectionMarker";

/* ────────────────────────────────────────────
   Module Card — architecture subsystem box
   ──────────────────────────────────────────── */
function ModuleCard({
  icon, label, items, primary,
}: {
  icon: React.ReactNode;
  label: string;
  items: string[];
  primary?: boolean;
}) {
  return (
    <div className="flex-1 min-w-0 relative py-2">

      <div className="flex items-center gap-2 mb-2.5">
        <div className={primary ? "text-accent" : "text-muted-light"}>{icon}</div>
        <span className={`text-[10px] font-mono uppercase tracking-widest ${primary ? "text-accent/80" : "text-muted"}`}>
          {label}
        </span>
      </div>
      <div className="space-y-1">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <div className={`w-1 h-1 rounded-full ${primary ? "bg-accent/40" : "bg-white/20"}`} />
            <p className="text-[11px] text-muted font-mono">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────
   Vertical data-flow connector
   ──────────────────────────────────────────── */
function VerticalConnector() {
  return (
    <div className="flex justify-center py-0.5">
      <svg className="w-4 h-6" viewBox="0 0 16 24" fill="none">
        <line x1="8" y1="0" x2="8" y2="16" stroke="rgba(14,165,233,0.3)" strokeWidth="1.5" strokeDasharray="3 3" />
        <polygon points="5,16 8,22 11,16" fill="rgba(14,165,233,0.35)" />
      </svg>
    </div>
  );
}

/* ════════════════════════════════════════════
   PENGU — Product Launch Showcase
   The most impressive section on the site.
   ════════════════════════════════════════════ */
export default function ProjectsGrid() {
  return (
    <section id="pengu" className="py-32 md:py-44 relative group">
      <div className="mx-auto max-w-7xl px-6 relative z-10 lg:pr-[22%]">

        <SectionMarker label="SECTOR: AUTONOMY" />
        <MobileSectionHeader title="AUTONOMY" subtitle="PENGU OS" icon="star" />

        {/* ── Main grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">

          {/* ── Narrative ── */}
          <div className="lg:col-span-5 space-y-8">

              {/* Title — largest heading on the site */}
<h2
  id="anchor-pengu"
  className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter leading-[0.9] mb-3"
>
  Project: Minecraft <span className="text-cyan-400">AI</span> Bot
</h2>

              {/* Tagline */}
              <p className="text-lg md:text-xl text-muted-light font-light tracking-wide mb-8">
                Autonomous Environment Navigation Agent
              </p>

              {/* Tech capsules */}
              <div className="flex flex-wrap gap-2 mb-10">
                {["Mineflayer", "A* Pathfinding", "WebSockets", "Next.js"].map((t) => (
                  <span key={t} className="px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-xs font-mono text-muted-light">
                    {t}
                  </span>
                ))}
              </div>

              {/* Story */}
              <div className="space-y-6 text-base text-muted-light leading-relaxed">
                <div>
                  <h4 className="text-foreground font-semibold mb-2">The Problem</h4>
                  <p>
                    Navigating complex voxel environments programmatically requires constant spatial awareness and pathfinding recalculations. Standard bots are entirely reactive, lacking the architecture to process environmental data streams concurrently.
                  </p>
                </div>
                <div>
                  <h4 className="text-foreground font-semibold mb-2">The Solution</h4>
                  <p>
                    Pengu acts as a distributed system. The <span className="text-foreground font-medium">Mineflayer</span> instance handles pure environmental interactions, while a <span className="text-foreground font-medium">Next.js / WebSockets</span> dashboard acts as the command center, streaming live state telemetry and enabling real-time overriding and path injections.
                  </p>
                </div>
              </div>

              {/* CTA */}
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
                  <ArrowRight size={14} className="text-muted-light group-hover:text-accent group-hover:translate-x-1 transition-all duration-300" />
                </a>
              </div>
          </div>

          {/* ── Visualization ── */}
          <div className="lg:col-span-7 relative w-full flex flex-col pt-8 lg:pt-0">

            <div className="relative z-10 flex flex-col gap-4">

              {/* Panel header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Activity size={14} className="text-accent" />
                  <span className="text-[11px] sm:text-xs font-mono text-muted uppercase tracking-widest">System Blueprint</span>
                </div>
              </div>

              {/* ── Architecture Blueprint ── */}

              {/* Command Center — full width */}
              <div className="py-3 border-l border-white/10 pl-4 relative">
                <div className="flex items-center gap-2 mb-1.5">
                  <Radio size={14} className="text-accent" />
                  <span className="text-[10px] font-mono text-accent/80 uppercase tracking-widest">Command Center</span>
                </div>
                <h4 className="text-sm font-semibold text-foreground">Next.js Dashboard</h4>
                <p className="text-[11px] text-muted font-mono mt-1">Real-time control interface · WebSocket stream</p>
              </div>

              <VerticalConnector />

              {/* Subsystem modules — 3 cols on sm+, stack on mobile */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
                <ModuleCard icon={<Eye size={14} />} label="Perception" items={["Chunk scanning", "Entity detection", "Block analysis"]} />
                <ModuleCard icon={<Map size={14} />} label="Navigation" items={["A* pathfinding", "World graph build", "Obstacle avoidance"]} primary />
                <ModuleCard icon={<Zap size={14} />} label="Execution" items={["Movement vectors", "Block interaction", "Inventory mgmt"]} />
              </div>

              <VerticalConnector />

              {/* Engine layer — full width */}
              <div className="py-3 border-l border-white/10 pl-4 relative">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[10px] font-mono text-muted uppercase tracking-widest">Game Engine</span>
                </div>
                <h4 className="text-sm font-semibold text-foreground">Mineflayer Runtime</h4>
              </div>

              {/* ── Metrics ── */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {[
                  { value: "< 50ms", label: "Pathfinding" },
                  { value: "Real-time", label: "Telemetry" },
                  { value: "Concurrent", label: "Task Exec" },
                ].map((m) => (
                  <div key={m.label} className="text-left py-2 border-l border-white/10 pl-4">
                    <div className="text-sm sm:text-base md:text-lg font-bold text-accent font-mono leading-tight">{m.value}</div>
                    <div className="text-[9px] sm:text-[10px] text-muted font-mono uppercase tracking-wider mt-1">{m.label}</div>
                  </div>
                ))}
              </div>

              {/* ── Terminal output ── */}
              <div className="border-l border-white/10 pl-4 py-2 font-mono text-[10px] sm:text-xs relative opacity-70">
                <div className="flex justify-between items-center mb-3 pb-2">
                  <div className="flex gap-2 items-center text-muted">
                    <Terminal size={12} />
                    <span>pengu-core.log</span>
                  </div>
                  <span className="text-[10px] text-accent/70">WSS://CONNECTED</span>
                </div>
                <div className="space-y-1.5">
                  <p className="text-muted"><span className="text-blue-400">[init]</span> Loading world graph...</p>
                  <p className="text-muted"><span className="text-emerald-400">[nav]</span> Path calculated: 47 nodes → [124, 64, -89]</p>
                  <p className="text-muted"><span className="text-yellow-400">[perc]</span> Chunk scan complete: 12 entities detected</p>
                  <p className="text-muted">
                    <span className="text-accent">[stream]</span> Broadcasting telemetry (1.2 MB/s)
                  </p>
                  <p className="text-muted">
                    <span className="text-emerald-400">[exec]</span> Executing movement vector...
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* ── CURRENTLY BUILDING ── */}
        <div className="mt-32 sm:mt-40 border-t border-white/5 pt-6">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <GitCommit size={16} className="text-muted" />
              <h3 className="text-sm font-mono text-muted uppercase tracking-widest">Currently Building</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[
                { name: "CTF Tracker Extension", desc: "Browser assistance for cybersecurity club - nitc" },
                { name: "AI CTF Automator", desc: "AI agent that solves CTFs" },
              ].map((item, i) => (
                <div key={i} className="group border-l-2 border-white/5 pl-4 hover:border-accent/30 transition-colors duration-300">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent/20 group-hover:bg-accent group-hover:animate-pulse transition-colors" />
                    <h4 className="text-sm font-medium text-muted-light group-hover:text-foreground transition-colors">{item.name}</h4>
                  </div>
                  <p className="text-xs text-muted font-mono">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
