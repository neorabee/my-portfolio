"use client";

import { useEffect, useState } from "react";

interface InfrastructureDockProps {
  nodeX: number;
  nodeY: number;
  triggered: boolean;
}

export default function InfrastructureDock({ nodeX, nodeY, triggered }: InfrastructureDockProps) {
  const [phase, setPhase] = useState<"idle" | "energize" | "deploy" | "lock" | "pulse" | "powered">("idle");

  useEffect(() => {
    if (triggered && phase === "idle") {
      setPhase("energize");

      setTimeout(() => {
        setPhase("deploy");

        setTimeout(() => {
          setPhase("lock");

          setTimeout(() => {
            setPhase("pulse");

            setTimeout(() => {
              setPhase("powered");

              window.dispatchEvent(new Event("dock-power-on"));
            }, 100);
          }, 100);
        }, 200);
      }, 100);
    }
  }, [triggered, phase]);

  if (nodeX === 0 && nodeY === 0) return null;

  const springDeploy = "cubic-bezier(0.34, 1.56, 0.64, 1)";
  const heavySettle = "cubic-bezier(0.2, 0, 0, 1)";

  return (
    <div className="absolute top-0 left-0 w-[100vw] h-[100vh] pointer-events-none z-10">
      <div 
        className="absolute top-0 left-0 w-full h-full"
      >
        
        <div 
          className="absolute w-[80px] h-[80px] flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
          style={{ left: nodeX, top: nodeY }}
        >
          
          <div className="absolute inset-[15px] rounded-full border border-[#1a1a1a] shadow-[inset_0_0_10px_rgba(0,0,0,0.8)]" />

          <div 
            className="absolute inset-[8px] rounded-full border-[3px] border-transparent border-t-[#222] border-b-[#222] transition-transform duration-[1000ms] ease-out"
            style={{ transform: phase !== "idle" ? "rotate(90deg) scale(1)" : "rotate(-45deg) scale(0.9)" }}
          />
          <div 
            className="absolute inset-[8px] rounded-full border-[3px] border-transparent border-l-[#151515] border-r-[#151515] transition-transform duration-[1000ms] ease-out"
            style={{ transform: phase !== "idle" ? "rotate(90deg) scale(1)" : "rotate(45deg) scale(0.9)" }}
          />

          <div className={`absolute top-0 w-4 h-2 bg-[#111] border border-cyan-900/30 rounded-sm transition-transform duration-[400ms] ${phase !== "idle" ? 'translate-y-3' : 'translate-y-0'}`} />
          <div className={`absolute bottom-0 w-4 h-2 bg-[#111] border border-cyan-900/30 rounded-sm transition-transform duration-[400ms] ${phase !== "idle" ? '-translate-y-3' : 'translate-y-0'}`} />

          <div className={`absolute inset-[18px] rounded-full transition-all duration-[400ms] ${phase !== "idle" ? 'bg-cyan-500/10 shadow-[0_0_15px_rgba(6,182,212,0.3)]' : 'bg-transparent'}`} />
        </div>

        <div 
          className="absolute h-5 -translate-y-1/2 z-0 flex items-center"
          style={{ 
            top: nodeY,
            left: `calc(${nodeX}px + 24px)`,
            width: "140px"
          }}
        >
          
          <div 
            className="relative h-full bg-gradient-to-b from-[#1c1c1c] via-[#0a0a0a] to-[#1c1c1c] border-y border-white/5 shadow-[0_5px_15px_rgba(0,0,0,0.8)] origin-left flex-shrink-0"
            style={{
              width: "60%",
              transform: (phase === "idle" || phase === "energize") ? "scaleX(0)" : "scaleX(1)",
              transition: `transform 800ms ${springDeploy}`
            }}
          >
            
            <div className="absolute top-[1px] bottom-[1px] left-6 w-1 bg-[#222]" />
            <div className="absolute top-[1px] bottom-[1px] left-12 w-1 bg-[#222]" />
          </div>

          <div 
            className="relative h-2 bg-gradient-to-b from-[#2a2a2a] to-[#111] border-y border-cyan-900/20 shadow-[inset_0_1px_3px_rgba(0,0,0,0.8)] origin-left flex-grow"
            style={{
              transform: (phase === "idle" || phase === "energize") ? "scaleX(0)" : "scaleX(1)",
              transition: `transform 800ms ${springDeploy} 150ms`
            }}
          >
            
            <div className="absolute inset-y-[1px] inset-x-0 overflow-hidden bg-black/50">
              <div 
                className="h-full w-16 bg-cyan-400 shadow-[0_0_8px_#22d3ee,0_0_16px_#22d3ee] rounded-full"
                style={{
                  transform: phase === "pulse" || phase === "powered" ? "translateX(200px)" : "translateX(-50px)",
                  opacity: phase === "pulse" ? 1 : 0,
                  transition: `transform 400ms ${heavySettle}`
                }}
              />
            </div>

            <div 
              className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-4 h-8 bg-[#151515] border border-cyan-500/30 rounded-r-sm shadow-[3px_0_10px_rgba(0,0,0,1)]"
              style={{
                opacity: (phase === "lock" || phase === "pulse" || phase === "powered") ? 1 : 0,
                transform: phase === "lock" ? "translateX(2px)" : "translateX(0px)",
                transition: `opacity 200ms ease-out, transform 300ms ${heavySettle}`
              }}
            >
              
              <div className={`absolute left-0 -top-1 w-2 h-1.5 bg-[#2a2a2a] border border-white/20 transition-transform duration-[300ms] ${phase === "pulse" || phase === "powered" ? 'translate-y-1' : 'translate-y-0'}`} />
              <div className={`absolute left-0 -bottom-1 w-2 h-1.5 bg-[#2a2a2a] border border-white/20 transition-transform duration-[300ms] ${phase === "pulse" || phase === "powered" ? '-translate-y-1' : 'translate-y-0'}`} />

              <div className="absolute right-1 top-1/2 -translate-y-1/2 flex flex-col gap-0.5">
                <div className={`w-0.5 h-1 rounded-full transition-colors duration-[200ms] ${(phase === "pulse" || phase === "powered") ? 'bg-cyan-400 shadow-[0_0_4px_#22d3ee]' : 'bg-[#333]'}`} />
                <div className={`w-0.5 h-1 rounded-full transition-colors duration-[200ms] delay-150 ${(phase === "pulse" || phase === "powered") ? 'bg-cyan-400 shadow-[0_0_4px_#22d3ee]' : 'bg-[#333]'}`} />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
