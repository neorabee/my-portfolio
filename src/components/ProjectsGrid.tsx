"use client";

import { motion } from "framer-motion";
import { ArrowRight, Terminal, Activity, GitCommit, Database, Zap } from "lucide-react";
import FocusReveal from "./FocusReveal";

export default function ProjectsGrid() {
  return (
    <section id="projects" className="py-32 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 relative z-10">
        
        {/* PENGU CINEMATIC SHOWCASE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* Left Column: Narrative */}
          <div className="lg:col-span-5 space-y-10">
            <FocusReveal>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-8 bg-accent/50" />
                <span className="text-xs font-mono text-accent-light uppercase tracking-widest flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  Live System
                </span>
              </div>
              
              <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-4">PENGU.</h2>
              <p className="text-xl text-muted-light font-light tracking-wide mb-12">
                Autonomous Environment Navigation Agent
              </p>

              <div className="space-y-8 text-base text-muted-light leading-relaxed">
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

              <div className="pt-8">
                <a 
                  href="https://github.com/neorabee/minecraft_ai_bot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-foreground text-background font-semibold rounded-full hover:scale-105 transition-transform duration-300 group"
                >
                  View Source Code
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </FocusReveal>
          </div>

          {/* Right Column: Visualization */}
          <div className="lg:col-span-7 relative h-[600px] w-full rounded-2xl bg-surface/30 border border-white/5 overflow-hidden flex flex-col p-6 lg:p-10 shadow-[inset_0_0_80px_rgba(0,0,0,0.5)] group">
            {/* Background grid inside visualization */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.1]" />
            <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-accent/5 blur-[120px]" />

            <FocusReveal className="relative z-10 h-full flex flex-col gap-6">
              
              {/* TOP: Topology Graph */}
              <div className="flex-1 bg-black/40 border border-white/10 rounded-xl p-6 relative overflow-hidden">
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <Activity size={14} className="text-accent" />
                  <span className="text-xs font-mono text-muted uppercase tracking-widest">Network Topology</span>
                </div>

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-full max-w-sm h-32 flex items-center justify-between">
                    {/* Node 1 */}
                    <div className="relative z-10 w-12 h-12 rounded-lg bg-surface border border-white/20 flex items-center justify-center shadow-lg">
                      <Database size={20} className="text-muted-light" />
                    </div>
                    
                    {/* Connection Line */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                      <line x1="15%" y1="50%" x2="45%" y2="50%" stroke="#333" strokeWidth="2" strokeDasharray="4 4" />
                      <line x1="55%" y1="50%" x2="85%" y2="50%" stroke="#333" strokeWidth="2" strokeDasharray="4 4" />
                      
                      <motion.line
                        x1="15%" y1="50%" x2="45%" y2="50%"
                        stroke="#0ea5e9" strokeWidth="2"
                        initial={{ strokeDasharray: "0 100" }}
                        animate={{ strokeDasharray: "100 0" }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                      />
                      <motion.line
                        x1="55%" y1="50%" x2="85%" y2="50%"
                        stroke="#0ea5e9" strokeWidth="2"
                        initial={{ strokeDasharray: "0 100" }}
                        animate={{ strokeDasharray: "100 0" }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.75 }}
                      />
                    </svg>

                    {/* Node 2 (Center) */}
                    <div className="relative z-10 w-16 h-16 rounded-xl bg-black border-2 border-accent shadow-[0_0_20px_rgba(14,165,233,0.3)] flex items-center justify-center">
                      <Zap size={24} className="text-accent" />
                    </div>

                    {/* Node 3 */}
                    <div className="relative z-10 w-12 h-12 rounded-lg bg-surface border border-white/20 flex items-center justify-center shadow-lg">
                      <Terminal size={20} className="text-muted-light" />
                    </div>
                  </div>
                </div>
              </div>

              {/* BOTTOM: Terminal Output */}
              <div className="h-48 bg-black/60 border border-white/10 rounded-xl p-4 font-mono text-[11px] sm:text-xs overflow-hidden relative shadow-inner">
                <div className="flex justify-between items-center mb-3 border-b border-white/10 pb-2">
                  <div className="flex gap-2 items-center text-muted">
                    <Terminal size={12} />
                    <span>pengu-core.log</span>
                  </div>
                  <span className="text-[10px] text-accent/70">WSS://CONNECTED</span>
                </div>
                <div className="space-y-1.5 flex flex-col justify-end h-[calc(100%-2rem)]">
                  <p className="text-muted"><span className="text-blue-400">[info]</span> Initializing spatial mapping...</p>
                  <p className="text-muted"><span className="text-emerald-400">[nav]</span> Calculated optimal path: [124, 64, -89]</p>
                  <motion.p 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, repeat: Infinity, repeatDelay: 3 }}
                    className="text-muted"
                  >
                    <span className="text-accent">[stream]</span> Broadcasting chunk telemetry (1.2mb/s)
                  </motion.p>
                  <motion.p 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, repeat: Infinity, repeatDelay: 3 }}
                    className="text-muted"
                  >
                    <span className="text-emerald-400">[nav]</span> Executing movement vector...
                  </motion.p>
                  <p className="text-accent/50 animate-pulse mt-1">_</p>
                </div>
              </div>

            </FocusReveal>
          </div>

        </div>

        {/* CURRENTLY BUILDING SECTION */}
        <div className="mt-40 border-t border-white/5 pt-6">
          <FocusReveal>
            <div className="flex items-center gap-3 mb-8">
              <GitCommit size={16} className="text-muted" />
              <h3 className="text-sm font-mono text-muted uppercase tracking-widest">Currently Building</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
          </FocusReveal>
        </div>

      </div>
    </section>
  );
}
