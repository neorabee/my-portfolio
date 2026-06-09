"use client";

import { motion } from "framer-motion";
import { Mail, ArrowUpRight, MessageCircle } from "lucide-react";
import FocusReveal from "./FocusReveal";
import { GithubIcon, LinkedinIcon, MediumIcon, InstagramIcon } from "./icons";

const SocialGithub = ({ size = 16, className = "" }: { size?: number; className?: string }) => (
  <GithubIcon width={size} height={size} className={className} />
);
const SocialLinkedin = ({ size = 16, className = "" }: { size?: number; className?: string }) => (
  <LinkedinIcon width={size} height={size} className={className} />
);
const SocialMedium = ({ size = 16, className = "" }: { size?: number; className?: string }) => (
  <MediumIcon width={size} height={size} className={className} />
);
const SocialInstagram = ({ size = 16, className = "" }: { size?: number; className?: string }) => (
  <InstagramIcon width={size} height={size} className={className} />
);

const socials = [
  { icon: SocialGithub, label: "GitHub", href: "https://github.com/neorabee", username: "neorabee" },
  { icon: SocialLinkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/rabee-aman-achoth-609606376/", username: "Rabee Aman Achoth" },
  { icon: SocialMedium, label: "Medium", href: "https://medium.com/@rabeeaman07", username: "@rabeeaman07" },
  { icon: SocialInstagram, label: "Instagram", href: "https://instagram.com/neorabee", username: "@neorabee" },
];

export default function Contact() {

  return (
    <section id="contact" className="py-32 relative overflow-hidden">
      {/* Scanning laser background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ y: ["-100%", "200%"] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="w-full h-1 bg-cyan-500/20 blur-sm shadow-[0_0_30px_rgba(6,182,212,0.5)]"
        />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.05]" />
      </div>

      <div className="mx-auto max-w-6xl px-6 relative z-10">
        <FocusReveal className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-accent/50" />
            <span className="text-xs font-mono text-accent-light uppercase tracking-widest">
              Contact
            </span>
            <div className="h-px w-8 bg-accent/50" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
            Initiate Connection Protocol
          </h2>
          <p className="text-muted-light max-w-lg mx-auto">
            I&apos;m always open to discussing new projects, opportunities, or just
            connecting over shared interests in technology and engineering.
          </p>
        </FocusReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Email card */}
          <FocusReveal delay={0.2}>
            <motion.a
              href="mailto:rabeeamanachoth@gmail.com"
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.02, y: -4 }}
              className="group relative rounded-xl bg-surface/50 border border-border p-8 overflow-hidden block shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              <div className="relative">
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 rounded-xl bg-accent/10 text-accent-light">
                    <Mail size={24} />
                  </div>
                  <ArrowUpRight
                    size={20}
                    className="text-muted group-hover:text-accent-light group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-accent-light transition-colors">
                  Send an email
                </h3>
                <p className="text-sm text-muted">rabeeamanachoth@gmail.com</p>
              </div>
            </motion.a>
          </FocusReveal>

          {/* WhatsApp card */}
          <FocusReveal delay={0.3}>
            <motion.a
              href="https://wa.me/919746512922"
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.02, y: -4 }}
              className="group relative rounded-xl bg-surface/50 border border-border p-8 overflow-hidden block shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#25D366]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-gradient-to-br from-[#25D366]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              <div className="relative">
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 rounded-xl bg-[#25D366]/10 text-[#25D366]">
                    <MessageCircle size={24} />
                  </div>
                  <ArrowUpRight
                    size={20}
                    className="text-muted group-hover:text-[#25D366] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-[#25D366] transition-colors">
                  Chat on WhatsApp
                </h3>
                <p className="text-sm text-muted">+91 97465 12922</p>
              </div>
            </motion.a>
          </FocusReveal>
        </div>

        {/* Social links */}
        <FocusReveal delay={0.5} className="mt-12 flex flex-wrap justify-center gap-4">
          {socials.map((social) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 px-5 py-3 rounded-xl bg-surface/50 border border-border hover:border-accent/30 transition-all duration-300 group shadow-[inset_0_0_15px_rgba(0,0,0,0.3)]"
            >
              <social.icon size={16} className="text-muted group-hover:text-accent-light transition-colors" />
              <div className="text-left">
                <p className="text-sm font-medium group-hover:text-white transition-colors">{social.label}</p>
                <p className="text-xs text-muted">{social.username}</p>
              </div>
            </motion.a>
          ))}
        </FocusReveal>
      </div>
    </section>
  );
}
