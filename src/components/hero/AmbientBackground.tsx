"use client";

export default function AmbientBackground() {
  return (
    <div className="hidden lg:block absolute inset-0 overflow-hidden pointer-events-none">
      {/* Deep base grid */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]" />

      {/* Aurora Blob 1 - Deep Blue — CSS animation instead of framer-motion */}
      <div
        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-cyan-900/5 blur-[120px] mix-blend-screen animate-aurora-1"
        style={{ willChange: "transform" }}
      />

      {/* Aurora Blob 2 - Subdued Cyan */}
      <div
        className="absolute top-[20%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-blue-900/5 blur-[120px] mix-blend-screen animate-aurora-2"
        style={{ willChange: "transform" }}
      />

      {/* Aurora Blob 3 - Cyan center glow */}
      <div
        className="absolute top-[40%] left-[30%] w-[30vw] h-[30vw] rounded-full bg-cyan-500/5 blur-[100px] mix-blend-screen animate-aurora-3"
        style={{ willChange: "transform" }}
      />

      {/* Floating Elements / Stars — static with CSS animation instead of per-element framer-motion */}
      <div className="absolute inset-0 z-0">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white animate-twinkle"
            style={{
              width: (i % 3) + 1 + "px",
              height: (i % 3) + 1 + "px",
              top: ((i * 7.3 + 5) % 95) + "%",
              left: ((i * 11.7 + 3) % 95) + "%",
              animationDelay: (i * 0.4) + "s",
              animationDuration: (3 + (i % 3)) + "s",
            }}
          />
        ))}
      </div>
    </div>
  );
}
