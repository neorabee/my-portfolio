"use client";

import { ReactLenis } from "@studio-freight/react-lenis";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.15, duration: 0.8, smoothWheel: true, wheelMultiplier: 1.2 }}>
      {children as any}
    </ReactLenis>
  );
}
