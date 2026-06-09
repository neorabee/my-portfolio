"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Server, Terminal, Activity, Network, HardDrive, Cpu,
  Database, Code2, Layers, Zap, Gauge,
  PenLine, Wrench, Lightbulb, Brain
} from "lucide-react";
import FocusReveal from "./FocusReveal";

const clusters = [
  {
    id: "systems",
    title: "Systems",
    icon: Server,
    theme: {
      line: "#0ea5e9", // sky-500
      glow: "shadow-[0_0_30px_rgba(14,165,233,0.3)]",
      border: "border-sky-500/50",
      text: "text-sky-400",
    },
    satellites: [
      { label: "Linux", icon: Terminal },
      { label: "Monitoring", icon: Activity },
      { label: "Networking", icon: Network },
      { label: "OS Internals", icon: HardDrive },
      { label: "Processes", icon: Cpu }
    ]
  },
  {
    id: "backend",
    title: "Backend",
    icon: Code2,
    theme: {
      line: "#06b6d4", // cyan-500
      glow: "shadow-[0_0_30px_rgba(6,182,212,0.3)]",
      border: "border-cyan-500/50",
      text: "text-cyan-400",
    },
    satellites: [
      { label: "Go", icon: Zap },
      { label: "REST APIs", icon: Layers },
      { label: "Databases", icon: Database },
      { label: "Architecture", icon: Server },
      { label: "Performance", icon: Gauge }
    ]
  },
  {
    id: "building",
    title: "Building",
    icon: Wrench,
    theme: {
      line: "#3b82f6", // blue-500
      glow: "shadow-[0_0_30px_rgba(59,130,246,0.3)]",
      border: "border-blue-500/50",
      text: "text-blue-400",
    },
    satellites: [
      { label: "Tech Writing", icon: PenLine },
      { label: "Dev Tooling", icon: Wrench },
      { label: "Problem Solving", icon: Lightbulb },
      { label: "AI Models", icon: Brain }
    ]
  }
];

function CapabilityCluster({ cluster }: { cluster: typeof clusters[0] }) {
  const [hoveredNode, setHoveredNode] = useState<number | 'center' | null>(null);

  // Radius for satellites (percentage of container)
  const radius = 38;

  return (
    <div className="relative w-full aspect-square max-w-[340px] mx-auto border border-white/5 bg-surface/30 rounded-2xl overflow-visible md:overflow-hidden group/container shadow-[inset_0_0_40px_rgba(0,0,0,0.5)]">
       {/* Background Grid */}
       <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.05]" />

       {/* SVG Connection Lines */}
       <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
         {cluster.satellites.map((sat, i) => {
           const angle = (i / cluster.satellites.length) * Math.PI * 2 - Math.PI / 2;
           const x = 50 + radius * Math.cos(angle);
           const y = 50 + radius * Math.sin(angle);
           
           const isHovered = hoveredNode === i || hoveredNode === 'center';
           const isMuted = hoveredNode !== null && !isHovered;

           return (
             <g key={sat.label}>
               {/* Base static line */}
               <line 
                 x1="50%" y1="50%" 
                 x2={`${x}%`} y2={`${y}%`} 
                 stroke={isHovered ? cluster.theme.line : "#333"} 
                 strokeWidth={isHovered ? 2 : 1}
                 className={`transition-all duration-300 ${isMuted ? 'opacity-10' : 'opacity-40'}`}
               />
               
               {/* Animated data flow line */}
               {isHovered && (
                 <motion.line
                   x1="50%" y1="50%" 
                   x2={`${x}%`} y2={`${y}%`} 
                   stroke={cluster.theme.line}
                   strokeWidth={2}
                   strokeDasharray="4 8"
                   animate={{ strokeDashoffset: [24, 0] }}
                   transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                   className="opacity-80"
                 />
               )}
             </g>
           );
         })}
       </svg>

       {/* Satellite Nodes */}
       {cluster.satellites.map((sat, i) => {
           const angle = (i / cluster.satellites.length) * Math.PI * 2 - Math.PI / 2;
           const x = 50 + radius * Math.cos(angle);
           const y = 50 + radius * Math.sin(angle);
           
           const isHovered = hoveredNode === i;
           const isMuted = hoveredNode !== null && !isHovered && hoveredNode !== 'center';

           return (
             <div 
               key={sat.label}
               onMouseEnter={() => setHoveredNode(i)}
               onMouseLeave={() => setHoveredNode(null)}
               className={`absolute w-max -translate-x-1/2 -translate-y-1/2 transition-all duration-300 z-10 ${
                 isMuted ? 'opacity-30 blur-[1px] scale-95' : 'opacity-100 scale-100'
               }`}
               style={{ left: `${x}%`, top: `${y}%` }}
             >
                <div 
                  className={`px-3 py-1.5 rounded-lg bg-black border ${
                    isHovered ? `${cluster.theme.border} ${cluster.theme.glow}` : 'border-white/10'
                  } text-[11px] font-mono flex items-center gap-2 cursor-default transition-all duration-300 shadow-xl backdrop-blur-sm`}
                >
                   <sat.icon size={12} className={isHovered ? cluster.theme.text : 'text-muted'} />
                   <span className={isHovered ? 'text-white' : 'text-muted-light'}>{sat.label}</span>
                </div>
             </div>
           );
       })}

       {/* Center Domain Node */}
       <div 
         className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
         onMouseEnter={() => setHoveredNode('center')}
         onMouseLeave={() => setHoveredNode(null)}
       >
         <div 
           className={`p-4 rounded-xl bg-black border ${
             hoveredNode === 'center' || hoveredNode !== null 
               ? `${cluster.theme.border} ${cluster.theme.glow}` 
               : 'border-white/20'
           } flex flex-col items-center justify-center gap-2 min-w-[100px] transition-all duration-500 shadow-2xl backdrop-blur-md cursor-default`}
         >
           <cluster.icon size={24} className={hoveredNode !== null ? cluster.theme.text : 'text-muted-light'} />
           <span className="text-sm font-bold text-white tracking-tight">{cluster.title}</span>
         </div>
       </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.02] to-transparent pointer-events-none" />

      {/* Floating blurred gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] left-[10%] w-[30%] h-[40%] rounded-full bg-cyan-500/5 blur-[120px]"
        />
        <motion.div
          animate={{ x: [0, -40, 0], y: [0, 40, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[10%] right-[10%] w-[30%] h-[40%] rounded-full bg-blue-500/5 blur-[120px]"
        />
      </div>

      <div className="mx-auto max-w-6xl px-6 relative z-10">
        {/* Section header */}
        <FocusReveal className="mb-24 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-accent/50" />
            <span className="text-xs font-mono text-accent-light uppercase tracking-widest">
              Capability Map
            </span>
            <div className="h-px w-8 bg-accent/50" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">Engineering Domains</h2>
        </FocusReveal>

        {/* Capability Clusters */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-8">
          {clusters.map((cluster, i) => (
            <FocusReveal key={cluster.id} delay={0.2 + i * 0.1}>
              <CapabilityCluster cluster={cluster} />
            </FocusReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
