"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import MobileSectionHeader from "./MobileSectionHeader";
import SectionMarker from "./SectionMarker";

export default function Contact() {
  return (
    <section id="contact" className="py-40 relative group">
      <div className="mx-auto max-w-5xl px-6 relative z-10">
        <SectionMarker label="BEACON // CONTACT" />
        <MobileSectionHeader title="CONTACT" subtitle="SECURE CHANNEL" icon="beacon" />
        <div className="flex flex-col md:flex-row gap-16 md:gap-24 items-start">
          
          {/* Left Side: Massive Typography */}
          <div className="md:w-1/2">
            
            <h2 id="anchor-contact" className="text-5xl md:text-7xl font-bold tracking-tighter leading-none mb-6">
              Open a<br />Channel.
            </h2>
            
            <p className="text-lg text-muted-light font-light max-w-md">
              Feel free to contact me about anything: whether you're looking collaborate on a novel project, or just want to say hello.          </p>
          </div>

          {/* Right Side: Links */}
          <div className="md:w-1/2 flex flex-col gap-8 w-full border-t border-white/5 pt-8 md:border-t-0 md:pt-0">
            
            <a 
              href="mailto:rabeeamanachoth@gmail.com"
              className="group flex flex-col gap-2 pb-8 border-b border-white/5 hover:border-accent/30 transition-colors duration-500"
            >
              <span className="text-sm font-mono text-muted uppercase tracking-widest">Email</span>
              <div className="flex items-center justify-between text-xl md:text-2xl font-medium text-muted-light group-hover:text-foreground transition-colors duration-300">
                rabeeamanachoth@gmail.com
                <ArrowRight size={24} className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </div>
            </a>

            <a 
              href="https://wa.me/919746512922"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-2 pb-8 border-b border-white/5 hover:border-[#25D366]/50 transition-colors duration-500"
            >
              <span className="text-sm font-mono text-muted uppercase tracking-widest">WhatsApp</span>
              <div className="flex items-center justify-between text-xl md:text-2xl font-medium text-muted-light group-hover:text-foreground transition-colors duration-300">
                +91 97465 12922
                <ArrowRight size={24} className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </div>
            </a>
                        <a 
              href="https://www.linkedin.com/in/rabee-aman-achoth-609606376/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-2 pb-8 border-b border-white/5 hover:border-[#25D366]/50 transition-colors duration-500"
            >
              <span className="text-sm font-mono text-muted uppercase tracking-widest">LinkedIn</span>
              <div className="flex items-center justify-between text-xl md:text-2xl font-medium text-muted-light group-hover:text-foreground transition-colors duration-300">
                Rabee Aman Achoth
                <ArrowRight size={24} className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </div>
            </a>

            <div className="pt-4 flex gap-6">
              {[
                { label: "GitHub", href: "https://github.com/neorabee" },
                { label: "LinkedIn", href: "https://www.linkedin.com/in/rabee-aman-achoth-609606376/" },
                { label: "Medium", href: "https://medium.com/@rabeeaman07" },
                { label: "Instagram", href: "https://instagram.com/rabeelim" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted hover:text-foreground transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-px after:bg-foreground hover:after:w-full after:transition-all after:duration-300"
                >
                  {link.label}
                </a>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
