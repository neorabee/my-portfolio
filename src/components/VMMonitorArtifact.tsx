"use client";

import { useEffect, useState } from "react";
import { Terminal, Cpu, HardDrive, Activity, Network } from "lucide-react";

const LOG_LINES = [
  "[sys] parsing /proc/stat... OK",
  "[sys] meminfo buffers read: 4096 bytes",
  "[net] eth0 rx_bytes: 1048576 tx_bytes: 2048",
  "[sys] cpu0: usage spike detected",
  "[stream] WebSocket frame sent (144 bytes)",
  "[sys] parsing /proc/diskstats... OK",
  "[agent] pinging master node...",
  "[stream] heartbeat ACK received",
  "[net] eth0 interface MTU: 1500",
  "[sys] parsing /proc/meminfo... OK",
];

export default function VMMonitorArtifact({ powerOn = true }: { powerOn?: boolean }) {
  const [cpu, setCpu] = useState(22.5);
  const [mem, setMem] = useState(1.24);
  const [net, setNet] = useState(4.2);
  const [logs, setLogs] = useState<string[]>([]);
  const [graphBars, setGraphBars] = useState<number[]>(Array.from({ length: 24 }, () => Math.random() * 40 + 10));

  // Simulation loops
  useEffect(() => {
    if (!powerOn) return;
    let mounted = true;
    
    const updateMetrics = () => {
      if (!mounted) return;
      setCpu(prev => Math.max(2, Math.min(98, prev + (Math.random() - 0.5) * 4)));
      setMem(prev => Math.max(0.5, Math.min(16, prev + (Math.random() - 0.5) * 0.05)));
      setNet(prev => Math.max(0, Math.min(100, prev + (Math.random() - 0.5) * 2)));
      
      setGraphBars(prev => {
        const next = [...prev.slice(1), Math.random() * 40 + 10];
        return next;
      });
    };

    const updateLogs = () => {
      if (!mounted) return;
      const newLine = LOG_LINES[Math.floor(Math.random() * LOG_LINES.length)];
      setLogs(prev => {
        const next = [...prev, newLine];
        if (next.length > 5) return next.slice(1);
        return next;
      });
    };

    // Low-frequency jitter for subtle movement
    const metricsInterval = setInterval(updateMetrics, 800);
    // Random log interval
    const logInterval = setInterval(updateLogs, 2500);

    // Initial logs
    setLogs([
      "[init] Node telemetry agent v0.1.4 started",
      "[init] Connecting to wss://telemetry.internal:8080...",
      "[init] WebSocket connected."
    ]);

    return () => {
      mounted = false;
      clearInterval(metricsInterval);
      clearInterval(logInterval);
    };
  }, [powerOn]);

  return (
    <div className={`w-full bg-[#050505] border border-white/10 rounded-xl overflow-hidden font-mono flex flex-col relative group transition-all duration-1000 ${powerOn ? 'opacity-100' : 'opacity-30 grayscale saturate-0'}`}>
      
      {/* Header Bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-white/[0.02]">
        <div className="flex items-center gap-3">
          <Terminal size={14} className="text-muted" />
          <span className="text-[10px] uppercase tracking-widest text-muted-light">Node: prod-app-01</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500/80 animate-pulse" />
          <span className="text-[9px] uppercase tracking-widest text-emerald-500/80">Streaming</span>
        </div>
      </div>

      {/* Main Panel */}
      <div className="p-5 md:p-6 flex flex-col gap-6">
        
        {/* Metrics Grid */}
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-muted">
              <Cpu size={12} />
              <span className="text-[9px] uppercase tracking-widest">CPU</span>
            </div>
            <span className="text-lg md:text-xl text-white tracking-tight">{cpu.toFixed(1)}<span className="text-muted text-xs ml-0.5">%</span></span>
          </div>
          
          <div className="flex flex-col gap-1 border-l border-white/5 pl-4">
            <div className="flex items-center gap-2 text-muted">
              <HardDrive size={12} />
              <span className="text-[9px] uppercase tracking-widest">MEM</span>
            </div>
            <span className="text-lg md:text-xl text-white tracking-tight">{mem.toFixed(2)}<span className="text-muted text-xs ml-0.5">GB</span></span>
          </div>

          <div className="flex flex-col gap-1 border-l border-white/5 pl-4">
            <div className="flex items-center gap-2 text-muted">
              <Network size={12} />
              <span className="text-[9px] uppercase tracking-widest">NET</span>
            </div>
            <span className="text-lg md:text-xl text-white tracking-tight">{net.toFixed(1)}<span className="text-muted text-xs ml-0.5">Mb/s</span></span>
          </div>
        </div>

        {/* Real-time Activity Graph (Subtle CSS pseudo-graph) */}
        <div className="h-16 border-t border-b border-white/5 flex items-end justify-between pt-4 pb-2 px-1 relative">
          <div className="absolute top-2 left-2 flex items-center gap-2 opacity-40">
            <Activity size={10} className="text-accent" />
            <span className="text-[8px] uppercase tracking-widest text-accent">I/O Wait</span>
          </div>
          {graphBars.map((val, i) => (
            <div 
              key={i} 
              className="w-full mx-[1px] bg-accent/20 rounded-t-sm transition-all duration-700 ease-in-out" 
              style={{ height: `${val}%` }}
            />
          ))}
        </div>

        {/* Terminal Window */}
        <div className="bg-black/50 rounded-lg p-3 min-h-[90px] border border-white/5 font-mono text-[9px] sm:text-[10px] flex flex-col justify-end overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-[#050505] to-transparent pointer-events-none z-10" />
          <div className="space-y-1.5 opacity-80 z-0">
            {logs.map((log, i) => (
              <div key={i} className="flex gap-2">
                <span className="text-muted/50 shrink-0">{(new Date()).toISOString().split('T')[1].slice(0,8)}</span>
                <span className={log.includes("[sys]") ? "text-cyan-400/80" : log.includes("[net]") ? "text-emerald-400/80" : "text-muted-light"}>
                  {log}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
