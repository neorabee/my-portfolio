"use client";

import { motion } from "framer-motion";
import { Activity, Server, Cpu, Database, Network, Clock, Terminal } from "lucide-react";
import FocusReveal from "./FocusReveal";
import { GithubIcon } from "./icons";

const metrics = [
  { icon: Cpu, label: "CPU Load", value: "12.4%", color: "text-emerald-400" },
  { icon: Database, label: "RAM Usage", value: "2.1 / 16 GB", color: "text-blue-400" },
  { icon: Clock, label: "Uptime", value: "14d 6h 22m", color: "text-cyan-400" },
  { icon: Network, label: "Network", value: "rx: 45Mb tx: 12Mb", color: "text-purple-400" },
  { icon: Server, label: "Processes", value: "184 Active", color: "text-amber-400" },
  { icon: Activity, label: "Status", value: "Optimal", color: "text-emerald-400" },
];

export default function FeaturedProject() {

  return (
    <section id="featured" className="py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.02] to-transparent pointer-events-none" />
      
      <div className="mx-auto max-w-6xl px-6">
        <FocusReveal>
          {/* Label */}
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-accent/50" />
            <span className="text-xs font-mono text-accent-light uppercase tracking-widest">Featured System</span>
          </div>

          {/* Project Card */}
          <div className="relative rounded-xl overflow-hidden border border-border group bg-surface/50">
            {/* Edge glow */}
            <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="relative overflow-hidden">
              {/* Dashboard mockup header */}
              <div className="border-b border-border px-6 py-3 bg-surface-light/50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-border" />
                    <div className="w-2.5 h-2.5 rounded-full bg-border" />
                    <div className="w-2.5 h-2.5 rounded-full bg-border" />
                  </div>
                  <span className="text-xs font-mono text-muted ml-2">sys-monitor.exe — root@server</span>
                </div>
                <div className="flex items-center gap-2">
                  <motion.a
                    href="https://github.com/neorabee/vm_monitoring_agent"
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ scale: 1.1 }}
                    className="p-1.5 rounded-md hover:bg-white/5 text-muted hover:text-white transition-colors"
                    aria-label="View on GitHub"
                  >
                    <GithubIcon width={14} height={14} />
                  </motion.a>
                </div>
              </div>

              {/* Dashboard content */}
              <div className="p-6 md:p-8 relative">
                {/* Subtle grid background inside the card */}
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.05] pointer-events-none" />
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
                  {/* Left: Info */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold mb-3 tracking-tight">Linux Monitoring Dashboard</h3>
                      <p className="text-muted-light leading-relaxed">
                        A high-performance, full-stack monitoring application designed to provide real-time visibility into Linux system metrics. 
                        A custom Go backend parses <code className="text-cyan-400 bg-cyan-400/10 px-1 py-0.5 rounded">/proc</code> files and streams data via WebSockets to a Next.js frontend, rendering complex dynamic charts without freezing the UI thread.
                      </p>
                    </div>

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-2">
                      {["Go", "Next.js", "WebSockets", "Linux API", "TypeScript"].map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-xs font-mono rounded bg-accent/5 text-accent-light border border-accent/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right: Metrics grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {metrics.map((metric, i) => (
                      <FocusReveal
                        key={metric.label}
                        delay={0.3 + i * 0.1}
                        className="bg-black/40 border border-border rounded-lg p-4 group/card hover:border-accent/30 transition-all duration-300 flex flex-col justify-between"
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <metric.icon size={14} className={metric.color} />
                          <span className="text-[10px] uppercase tracking-wider font-mono text-muted">{metric.label}</span>
                        </div>
                        <p className="text-lg font-semibold font-mono tracking-tight">{metric.value}</p>
                      </FocusReveal>
                    ))}
                  </div>
                </div>

                {/* Simulated terminal output */}
                <div className="mt-8 rounded-lg bg-black border border-border p-4 font-mono text-[11px] md:text-xs overflow-hidden relative z-10 shadow-inner">
                  <div className="flex items-center justify-between mb-3 border-b border-border/50 pb-2">
                    <div className="flex items-center gap-2 text-muted">
                      <Terminal size={12} className="text-cyan-400" />
                      <span>daemon.log</span>
                    </div>
                    <span className="text-[10px] text-muted-light/30">TAIL -F</span>
                  </div>
                  <div className="space-y-1.5 text-muted/80 flex flex-col">
                    <p><span className="text-cyan-400">[info]</span> Initializing metric collectors: CPU, Memory, Disk, Net</p>
                    <p><span className="text-blue-400">[go-routine]</span> Started WebSocket server on port 6767</p>
                    <p><span className="text-emerald-400">[stream]</span> Client connected. Broadcasting sys_stats at 1Hz...</p>
                    <p><span className="text-amber-400">[parser]</span> Parsed /proc/stat in 0.1ms</p>
                    <p className="text-emerald-400/70 animate-pulse">_</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FocusReveal>
      </div>
    </section>
  );
}
