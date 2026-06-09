"use client";



export default function TechnicalGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {/* Corner HUD elements */}
      <div className="absolute top-6 left-6 font-mono text-[10px] text-muted-light/30 hidden md:block">
        <p>SYS.STAT [OK]</p>
        <p>MEM: 45% ALLOC</p>
      </div>

      <div className="absolute top-6 right-6 font-mono text-[10px] text-muted-light/30 text-right hidden md:block">
        <p>COORD: 45.2, -12.4</p>
        <p>N. NODE: LINKED</p>
      </div>

      <div className="absolute bottom-6 left-6 font-mono text-[10px] text-muted-light/30 hidden md:block">
        <p>PID: 2941</p>
        <p className="animate-pulse">AWAITING INPUT_</p>
      </div>

      <div className="absolute bottom-6 right-6 flex gap-1 hidden md:flex">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="w-1 h-3 bg-muted-light/20" />
        ))}
        <div className="w-1 h-3 bg-cyan-500/40 animate-pulse" />
      </div>

      {/* Subtle crosshairs / registration marks */}
      <div className="absolute top-1/4 left-[10%] w-4 h-4 border-l border-t border-muted-light/10" />
      <div className="absolute top-1/4 right-[10%] w-4 h-4 border-r border-t border-muted-light/10" />
      <div className="absolute bottom-1/4 left-[10%] w-4 h-4 border-l border-b border-muted-light/10" />
      <div className="absolute bottom-1/4 right-[10%] w-4 h-4 border-r border-b border-muted-light/10" />
    </div>
  );
}
