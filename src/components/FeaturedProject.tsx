"use client";

import { useState, useEffect } from "react";

import { ArrowRight, Cpu, Server, Monitor, Activity } from "lucide-react";
import MobileSectionHeader from "./MobileSectionHeader";
import SectionMarker from "./SectionMarker";
import VMMonitorArtifact from "./VMMonitorArtifact";

/* ────────────────────────────────────────────
   Architecture Node — system component box
   ──────────────────────────────────────────── */
function ArchNode({
  icon, label, title, items, primary,
}: {
  icon: React.ReactNode;
  label: string;
  title: string;
  items: string[];
  primary?: boolean;
}) {
  return (
    <div className="flex-1 min-w-0 relative py-2">

      <div className="flex items-center gap-2 mb-3">
        <div className={primary ? "text-accent" : "text-muted-light"}>{icon}</div>
        <span
          className={`text-[10px] font-mono uppercase tracking-widest ${
            primary ? "text-accent/80" : "text-muted"
          }`}
        >
          {label}
        </span>
      </div>
      <h4 className="text-sm font-semibold text-foreground mb-2">{title}</h4>
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
   Data-flow connector — animated dashes
   Horizontal on md+, vertical on mobile
   ──────────────────────────────────────────── */
function ArchConnector() {
  return (
    <>
      {/* Horizontal (desktop) */}
      <div className="hidden md:flex items-center justify-center w-8 lg:w-12 shrink-0">
        <svg className="w-full h-4" viewBox="0 0 48 16" fill="none">
          <line x1="0" y1="8" x2="36" y2="8" stroke="rgba(14,165,233,0.3)" strokeWidth="1.5" strokeDasharray="4 4" />
          <polygon points="36,4 44,8 36,12" fill="rgba(14,165,233,0.35)" />
        </svg>
      </div>
      {/* Vertical (mobile) */}
      <div className="flex md:hidden justify-center py-1">
        <svg className="w-4 h-7" viewBox="0 0 16 28" fill="none">
          <line x1="8" y1="0" x2="8" y2="18" stroke="rgba(14,165,233,0.3)" strokeWidth="1.5" strokeDasharray="3 3" />
          <polygon points="5,18 8,26 11,18" fill="rgba(14,165,233,0.35)" />
        </svg>
      </div>
    </>
  );
}

/* ════════════════════════════════════════════
   FEATURED PROJECT — Linux Telemetry
   Engineering case study layout
   ════════════════════════════════════════════ */
export default function FeaturedProject() {
  const [artifactPowered, setArtifactPowered] = useState(false);

  useEffect(() => {
    const handlePowerOn = () => setArtifactPowered(true);
    window.addEventListener("dock-power-on", handlePowerOn);
    return () => window.removeEventListener("dock-power-on", handlePowerOn);
  }, []);

  return (
    <section id="projects" className="py-32 md:py-40 relative group">
      <div className="mx-auto max-w-7xl px-6 relative z-10 lg:pl-[22%]">

        <SectionMarker label="[ PROJECTS ]" />
        <MobileSectionHeader title="PROJECTS" subtitle="SYSTEMS & ARCHITECTURE" icon="saturn" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">

          {/* ── Narrative Column ── */}
          <div className={`lg:col-span-5 space-y-8 lg:order-1 transition-all duration-1000 ${artifactPowered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>

              {/* Title — cinematic scale */}
<h2
  id="anchor-projects"
  className="text-xl sm:text-xl md:text-4xl font-bold tracking-tight leading-tight mb-3"
>
  Project:<br />
  VM <span className="text-cyan-400">Monitoring</span> Dashboard
</h2>

              {/* Subtitle + version */}
              <div className="flex flex-wrap items-center gap-3 mb-8">
                <p className="text-lg md:text-xl text-muted-light font-light tracking-wide">
                  Real-Time Node Monitoring
                </p>
              </div>

              {/* Tech stack capsules */}
              <div className="flex flex-wrap gap-2 mb-10">
                {["Go", "/proc", "WebSockets", "Next.js"].map((t) => (
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
                    Standard monitoring tools often rely on heavy polling intervals, providing delayed snapshots rather than true real-time visibility into the Linux kernel&apos;s metric streams.
                  </p>
                </div>
                <div>
                  <h4 className="text-foreground font-semibold mb-2">The Architecture</h4>
                  <p>
                    A high-performance <span className="text-foreground font-medium">Go backend</span> bypasses heavy APIs to directly parse <span className="text-foreground font-medium">/proc</span> files. It streams memory, CPU, and network telemetry via <span className="text-foreground font-medium">WebSockets</span> to a Next.js frontend, rendering high-frequency data without thread blocking.
                  </p>
                </div>
              </div>

              {/* CTA */}
              <div className="pt-8">
                <a
                  href="https://github.com/neorabee/vm_monitoring_agent"
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

          {/* ── Visualization Column ── */}
          <div className="lg:col-span-7 lg:order-2 relative w-full flex flex-col pt-8 lg:pt-0">

            <div className="relative z-10 flex flex-col gap-8">
              
              <VMMonitorArtifact powerOn={artifactPowered} />
              
              {/* Panel header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Activity size={14} className="text-accent" />
                  <span className="text-[11px] sm:text-xs font-mono text-muted uppercase tracking-widest">System Architecture</span>
                </div>
              </div>

              {/* ── Architecture Flow ── */}
              <div className="flex flex-col md:flex-row items-stretch gap-0">
                <ArchNode
                  icon={<Cpu size={15} />}
                  label="Kernel"
                  title="/proc Parser"
                  items={["cpu, mem, net metrics", "Direct filesystem reads"]}
                />
                <ArchConnector />
                <ArchNode
                  icon={<Server size={15} />}
                  label="Go Backend"
                  title="Stream Engine"
                  items={["WebSocket server", "144 Hz broadcast"]}
                  primary
                />
                <ArchConnector />
                <ArchNode
                  icon={<Monitor size={15} />}
                  label="Frontend"
                  title="Next.js Dashboard"
                  items={["Real-time rendering", "Zero polling"]}
                />
              </div>

              {/* ── Metrics Row ── */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {[
                  { value: "< 1ms", label: "Latency" },
                  { value: "144 Hz", label: "Refresh Rate" },
                  { value: "0%", label: "Poll Overhead" },
                ].map((m) => (
                  <div key={m.label} className="text-left py-2 border-l border-white/10 pl-4">
                    <div className="text-base sm:text-lg md:text-xl font-bold text-accent font-mono leading-tight">{m.value}</div>
                    <div className="text-[9px] sm:text-[10px] text-muted font-mono uppercase tracking-wider mt-1">{m.label}</div>
                  </div>
                ))}
              </div>

              {/* ── Data ticker ── */}
<div className="h-11 border-b border-white/10 flex items-center relative opacity-60">
  <div className="flex gap-8 whitespace-nowrap font-mono text-[10px] sm:text-xs text-muted">
    <span className="flex items-center gap-2">
      <span className="text-blue-400">MEM:</span> 12.2GB
      <span className="text-emerald-400 ml-3">CPU:</span> 22.5%
      <span className="text-purple-400 ml-3">NET:</span> 5.1Mb/s
    </span>
  </div>
</div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
