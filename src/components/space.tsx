"use client";

import { useEffect, useRef } from "react";

/**
 * Pure CSS/SVG planetary visual. No images, no canvas, no WebGL.
 * A dark sphere lit from one edge (a terminator line, like real
 * planetary photography), set against a near-black field with a
 * static, sparse starfield that drifts almost imperceptibly on scroll.
 *
 * Performance: everything below is composited via transform/opacity
 * only. The starfield is two fixed SVG layers (no per-star DOM nodes),
 * and the only "animation" is a 90s+ linear rotation on the planet's
 * radial-gradient position — slow enough to register as stillness
 * that happens to be alive, never as motion you'd point to.
 */

function useScrollParallax(strength = 1) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight || 1;
        const centered = (rect.top + rect.height / 2 - vh / 2) / vh;
        el.style.setProperty("--parallax", (centered * strength).toFixed(3));
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [strength]);

  return ref;
}

function Starfield() {
  // Deterministic pseudo-random scatter so SSR/CSR markup matches.
  const seedStars = (count: number, seed: number) => {
    const stars: { x: number; y: number; r: number; o: number }[] = [];
    let s = seed;
    const rand = () => {
      s = (s * 9301 + 49297) % 233280;
      return s / 233280;
    };
    for (let i = 0; i < count; i++) {
      stars.push({
        x: rand() * 100,
        y: rand() * 100,
        r: rand() * 0.6 + 0.3,
        o: rand() * 0.5 + 0.15,
      });
    }
    return stars;
  };

  const far = seedStars(70, 7);
  const near = seedStars(28, 19);

  return (
    <>
      <svg
        className="absolute inset-0 h-full w-full [animation:starDriftFar_120s_linear_infinite]"
        style={{ willChange: "transform" }}
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        {far.map((star, i) => (
          <circle
            key={`f-${i}`}
            cx={star.x}
            cy={star.y}
            r={star.r}
            fill="#cdd3e0"
            opacity={star.o}
          />
        ))}
      </svg>
      <svg
        className="absolute inset-0 h-full w-full [animation:starDriftNear_80s_linear_infinite]"
        style={{ willChange: "transform" }}
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        {near.map((star, i) => (
          <circle
            key={`n-${i}`}
            cx={star.x}
            cy={star.y}
            r={star.r + 0.2}
            fill="#e8e2d3"
            opacity={star.o * 0.8}
          />
        ))}
      </svg>
    </>
  );
}

export default function SpaceVisual() {
  const parallaxRef = useScrollParallax(10);

  return (
    <div
      ref={parallaxRef}
      className="relative h-full w-full overflow-hidden"
      style={{
        transform: "translateY(calc(var(--parallax, 0) * 1px))",
      }}
      aria-hidden="true"
    >
      <Starfield />

      {/* Planet — sphere shading is fixed (the "camera" doesn't move);
          the surface texture rotates very slowly beneath it, like real
          planetary rotation against a fixed light source. */}
      <div className="absolute left-1/2 top-1/2 aspect-square w-[120%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full sm:w-[85%]">
        {/* Sphere shading — fixed, gives the 3D form. This is the base layer. */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `
              radial-gradient(circle at 32% 30%,
                #4a4540 0%,
                #2f2c29 14%,
                #1c1a18 32%,
                #0e0d0c 52%,
                #050505 72%
              )
            `,
          }}
        />
        {/* Rotating surface texture, layered subtly on top of the shading */}
        <div
          className="absolute -inset-[15%] opacity-70 [animation:planetRotate_160s_linear_infinite]"
          style={{
            background: `
              repeating-linear-gradient(
                95deg,
                rgba(0,0,0,0) 0px,
                rgba(0,0,0,0.22) 18px,
                rgba(0,0,0,0) 40px,
                rgba(232,226,211,0.035) 58px,
                rgba(0,0,0,0) 80px
              )
            `,
          }}
        />
        <div
          className="absolute inset-0 rounded-full"
          style={{
            boxShadow:
              "inset -40px -30px 90px rgba(0,0,0,0.75), inset 20px 10px 60px rgba(232,226,211,0.04)",
          }}
        />
        {/* Terminator limb light — the single warm accent in the whole section */}
        <div
          className="absolute inset-0 rounded-full mix-blend-screen opacity-[0.55]"
          style={{
            background:
              "radial-gradient(circle at 14% 22%, rgba(232,219,181,0.55) 0%, rgba(180,150,100,0.18) 9%, rgba(120,95,70,0.06) 16%, transparent 30%)",
          }}
        />
      </div>
      {/* Faint atmospheric edge, outside the clipped sphere so it isn't cut off */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 sm:w-[85%]"
        style={{
          boxShadow: "0 0 60px 1px rgba(140,112,72,0.08)",
        }}
      />

      {/* Vignette so the planet recedes into the section's black rather than sitting on top of it */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 70% 50%, transparent 30%, #05060a 92%)",
        }}
      />
    </div>
  );
}