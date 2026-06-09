"use client";

import { useEffect, useRef } from "react";

class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;

  constructor(width: number, height: number) {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.vx = (Math.random() - 0.5) * 0.3; // Very slow
    this.vy = (Math.random() - 0.5) * 0.3;
    this.size = Math.random() * 2 + 0.5;
    this.alpha = Math.random() * 0.5 + 0.1;
  }

  update(width: number, height: number) {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0) this.x = width;
    if (this.x > width) this.x = 0;
    if (this.y < 0) this.y = height;
    if (this.y > height) this.y = 0;
  }

  draw(ctx: CanvasRenderingContext2D, hue: number) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(${Math.floor(hue)}, 100%, 48%, ${this.alpha})`;
    ctx.fill();
    
    // Add subtle glow
    ctx.shadowBlur = 10;
    ctx.shadowColor = `hsla(${Math.floor(hue)}, 100%, 48%, 0.4)`;
  }
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;
    
    let currentHue = 195; // Start with cyan
    let targetHue = 195;
    let lastColorChange = Date.now();

    const init = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      
      const particleCount = Math.floor((width * height) / 9000); // Responsive count
      particles = Array.from({ length: particleCount }, () => new Particle(width, height));
    };

    const animate = () => {
      ctx.fillStyle = "#000000"; // Pure black trailing
      ctx.fillRect(0, 0, width, height);

      const now = Date.now();
      if (now - lastColorChange > 5000) {
        lastColorChange = now;
        // Pick a new random hue
        targetHue = Math.random() * 360;
      }
      
      // Smoothly interpolate hue
      currentHue += Math.random()*(targetHue - currentHue) * 0.02;

      particles.forEach((particle) => {
        particle.update(width, height);
        particle.draw(ctx, currentHue);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    window.addEventListener("resize", init);

    return () => {
      window.removeEventListener("resize", init);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ background: "#000000" }}
    />
  );
}
