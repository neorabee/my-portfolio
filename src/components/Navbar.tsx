"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons";
import Image from "next/image";

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "Projects", href: "#projects" },
  { label: "WhoAmI", href: "#profile" },
  { label: "Diversified", href: "#explorations" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#hero");

  useEffect(() => {
    let ticking = false;
    let prevScrolled = false;
    let prevSection = "#hero";

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const isScrolled = window.scrollY > 20;
        if (isScrolled !== prevScrolled) {
          prevScrolled = isScrolled;
          setScrolled(isScrolled);
        }
        const sectionsToCheck = [...navLinks.map(link => link.href.substring(1)), "pengu"];
        let current = "#hero";

        for (const section of sectionsToCheck) {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= 200 && rect.bottom >= 200) {
              current = section === "pengu" ? "#projects" : `#${section}`;
              break;
            }
          }
        }
        if (current !== prevSection) {
          prevSection = current;
          setActiveSection(current);
        }

        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
          scrolled
            ? "bg-black/70 backdrop-blur-2xl border-b border-white/5"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">

          <motion.a
            href="#hero"
            className="text-base font-medium tracking-tight text-white flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
          >
            <Image
            src="/logo-r.png"
            alt="Rabee Logo"
            width={60}
            height={60}
            className="inline-block"
/>
          </motion.a>

          <div className="hidden md:flex items-center bg-white/[0.03] border border-white/5 p-1 rounded-full relative">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href;
              
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`relative px-5 py-2 text-sm font-medium transition-colors duration-300 rounded-full z-10 ${
                    isActive ? "text-white bg-white/5" : "text-muted hover:text-white hover:bg-white/10"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <a href="https://github.com/neorabee" target="_blank" rel="noreferrer" className="text-muted hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full">
              <GithubIcon width={18} height={18} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-muted hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full">
              <LinkedinIcon width={18} height={18} />
            </a>
            <a href="https://medium.com/@rabeeaman07" target="_blank" rel="noreferrer" className="text-muted hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 1043.63 592.71" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                <path d="M588.67 296.36c0 163.67-131.78 296.35-294.33 296.35S0 460 0 296.36 131.78 0 294.34 0s294.33 132.69 294.33 296.36M911.56 296.36c0 154.06-65.89 279-147.17 279s-147.17-124.94-147.17-279 65.88-279 147.16-279 147.17 124.9 147.17 279M1043.63 296.36c0 138-23.17 249.94-51.76 249.94s-51.75-111.91-51.75-249.94 23.17-249.94 51.75-249.94 51.76 111.9 51.76 249.94" />
              </svg>
            </a>
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
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl pt-24"
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
                  className="w-full text-center py-4 text-xl text-muted-light hover:text-white transition-colors border-b border-white/5"
                >
                  {link.label}
                </motion.a>
              ))}
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: navLinks.length * 0.1 }}
                className="mt-8 flex gap-6"
              >
                <a href="https://github.com/neorabee" target="_blank" rel="noreferrer" className="text-muted hover:text-white transition-colors p-3 hover:bg-white/5 rounded-full bg-white/5 border border-white/10">
                  <GithubIcon width={24} height={24} />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-muted hover:text-white transition-colors p-3 hover:bg-white/5 rounded-full bg-white/5 border border-white/10">
                  <LinkedinIcon width={24} height={24} />
                </a>
                <a href="https://medium.com/@rabeeaman07" target="_blank" rel="noreferrer" className="text-muted hover:text-white transition-colors p-3 hover:bg-white/5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 1043.63 592.71" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                    <path d="M588.67 296.36c0 163.67-131.78 296.35-294.33 296.35S0 460 0 296.36 131.78 0 294.34 0s294.33 132.69 294.33 296.36M911.56 296.36c0 154.06-65.89 279-147.17 279s-147.17-124.94-147.17-279 65.88-279 147.16-279 147.17 124.9 147.17 279M1043.63 296.36c0 138-23.17 249.94-51.76 249.94s-51.75-111.91-51.75-249.94 23.17-249.94 51.75-249.94 51.76 111.9 51.76 249.94" />
                  </svg>
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
