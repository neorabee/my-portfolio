"use client";

import { motion } from "framer-motion";

export default function Footer() {
  const navLinks = [
    { label: "Status", href: "#hero" },
    { label: "Operator", href: "#profile" },
    { label: "Systems", href: "#projects" },
    { label: "Logs", href: "#explorations" },
    { label: "Comms", href: "#contact" },
  ];

  return (
    <footer className="relative border-t border-white/5 bg-background">
      <div className="mx-auto max-w-7xl px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left: Branding & Copy */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-accent/50" />
            <span className="text-sm font-medium tracking-tight text-white"><span className="text-accent">R</span>abee</span>
          </div>
          <span className="text-muted-light/20 hidden md:block">|</span>
          <p className="text-xs text-muted font-mono">
            © {new Date().getFullYear()}
          </p>
        </div>

        {/* Center: Navigation */}
        <div className="flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs text-muted hover:text-foreground transition-colors font-mono uppercase tracking-widest"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right: Built with */}
        <div className="text-xs text-muted font-mono">
          Built with Next.js & Framer
        </div>

      </div>
    </footer>
  );
}
