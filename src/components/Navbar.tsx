"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Writing", href: "#writing" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-black/80 backdrop-blur-xl border-b border-border shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <motion.a
            href="#"
            className="text-lg font-semibold tracking-tight text-white flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
            <span><span className="text-accent">R</span>abee</span>
            <span className="text-muted ml-1 text-sm font-normal hidden sm:inline">/sys_admin</span>
          </motion.a>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <motion.a
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-sm text-muted-light hover:text-white transition-colors duration-300 rounded-lg group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">{link.label}</span>
                <motion.span
                  className="absolute inset-0 bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-white/5"
                  layoutId="navbar-hover"
                />
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              className="ml-2 px-5 py-2 text-sm font-mono font-medium rounded-lg bg-accent/10 text-accent-light border border-accent/30 hover:bg-accent/20 hover:border-accent/50 transition-all duration-300 shadow-[0_0_15px_rgba(6,182,212,0.15)]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              [CONNECT]
            </motion.a>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-muted-light hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl pt-20"
          >
            <div className="flex flex-col items-center gap-2 p-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setMobileOpen(false)}
                  className="w-full text-center py-4 text-lg text-muted-light hover:text-white transition-colors border-b border-border/50"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.1 }}
                onClick={() => setMobileOpen(false)}
                className="mt-6 px-8 py-3 text-sm font-mono font-medium rounded-lg bg-accent/10 text-accent-light border border-accent/30 shadow-[0_0_15px_rgba(6,182,212,0.15)]"
              >
                [CONNECT]
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
