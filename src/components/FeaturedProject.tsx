"use client";

import { motion } from "framer-motion";
import { ArrowRight, Activity } from "lucide-react";
import FocusReveal from "./FocusReveal";

export default function FeaturedProject() {
  return (
    <section id="featured" className="py-32 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 relative z-10">
        
        {/* LINUX DASHBOARD CINEMATIC SHOWCASE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* Left Column: Narrative */}
          <div className="lg:col-span-5 space-y-10 lg:order-2">
            <FocusReveal>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-8 bg-accent/50" />
                <span className="text-xs font-mono text-accent-light uppercase tracking-widest flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  Production System
                </span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">Linux<br/>Telemetry.</h2>
              <p className="text-xl text-muted-light font-light tracking-wide mb-12">
                Real-Time Node Monitoring
              </p>

              <div className="space-y-8 text-base text-muted-light leading-relaxed">
                <div>
                  <h4 className="text-foreground font-semibold mb-2">The Problem</h4>
                  <p>
                    Standard monitoring tools often rely on heavy polling intervals, providing delayed snapshots rather than true real-time visibility into the Linux kernel's metric streams.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-foreground font-semibold mb-2">The Architecture</h4>
                  <p>
                    A high-performance <span className="text-foreground font-medium">Go backend</span> bypasses heavy APIs to directly parse <span className="text-foreground font-medium">/proc</span> files. It streams memory, CPU, and network telemetry via <span className="text-foreground font-medium">WebSockets</span> to a Next.js frontend, rendering high-frequency data without thread blocking.
                  </p>
                </div>
              </div>

              <div className="pt-8">
                <a 
                  href="https://github.com/neorabee/vm_monitoring_agent"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-white/[0.05] border border-white/10 text-foreground font-semibold rounded-full hover:bg-white/10 transition-colors duration-300 group"
                >
                  View Source Code
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </FocusReveal>
          </div>

          {/* Right Column: Visualization */}
          <div className="lg:col-span-7 lg:order-1 relative h-[600px] w-full rounded-2xl bg-surface/30 border border-white/5 overflow-hidden flex flex-col p-6 lg:p-10 shadow-[inset_0_0_80px_rgba(0,0,0,0.5)] group">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.1]" />
            <div className="absolute top-0 left-0 w-[60%] h-[60%] bg-accent/5 blur-[120px]" />

            <FocusReveal className="relative z-10 h-full flex flex-col justify-between">
              
              <div className="flex items-center justify-between mb-8">
                 <div className="flex items-center gap-2">
                  <Activity size={16} className="text-accent" />
                  <span className="text-sm font-mono text-muted uppercase tracking-widest">Active Stream: node-01</span>
                </div>
                <div className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono border border-emerald-500/20">
                  144 Hz
                </div>
              </div>

              {/* Simulated Chart Area */}
              <div className="flex-1 relative border-b border-l border-white/10 pb-4 pl-4 mb-8">
                {/* Y Axis labels */}
                <div className="absolute -left-6 top-0 bottom-4 flex flex-col justify-between text-[10px] text-muted-light/30 font-mono">
                  <span>100</span>
                  <span>75</span>
                  <span>50</span>
                  <span>25</span>
                  <span>0</span>
                </div>

                {/* Animated Bars (simulating CPU/Mem usage) */}
                <div className="absolute inset-0 left-4 bottom-4 flex items-end gap-2 sm:gap-4 overflow-hidden">
                  {[...Array(16)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="flex-1 bg-accent/20 rounded-t-sm relative group/bar"
                      initial={{ height: "10%" }}
                      animate={{ 
                        height: [`${10 + Math.random() * 30}%`, `${40 + Math.random() * 50}%`, `${20 + Math.random() * 60}%`] 
                      }}
                      transition={{ 
                        duration: 2 + Math.random() * 2, 
                        repeat: Infinity, 
                        repeatType: "reverse",
                        ease: "easeInOut"
                      }}
                    >
                      {/* Glow cap */}
                      <div className="absolute top-0 left-0 right-0 h-1 bg-accent shadow-[0_0_10px_rgba(14,165,233,0.8)]" />
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Data stream ticker */}
              <div className="h-16 bg-black/40 border border-white/10 rounded-lg p-3 flex items-center overflow-hidden relative">
                <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-black/80 to-transparent z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-black/80 to-transparent z-10" />
                
                <motion.div 
                  className="flex gap-8 whitespace-nowrap font-mono text-xs text-muted"
                  animate={{ x: ["0%", "-50%"] }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                >
                  {[...Array(10)].map((_, i) => (
                    <span key={i} className="flex items-center gap-2">
                      <span className="text-blue-400">MEM:</span> {(12 + Math.random() * 2).toFixed(1)}GB
                      <span className="text-emerald-400 ml-4">CPU:</span> {(20 + Math.random() * 40).toFixed(1)}%
                      <span className="text-purple-400 ml-4">NET:</span> {(Math.random() * 50).toFixed(1)}Mb/s
                    </span>
                  ))}
                </motion.div>
              </div>

            </FocusReveal>
          </div>

        </div>
      </div>
    </section>
  );
}
