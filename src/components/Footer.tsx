"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon, MediumIcon } from "./icons";

const GithubSocial = ({ size = 16 }: { size?: number }) => <GithubIcon width={size} height={size} />;
const MediumSocial = ({ size = 16 }: { size?: number }) => <MediumIcon width={size} height={size} />;
const LinkedinSocial = ({ size = 16 }: { size?: number }) => <LinkedinIcon width={size} height={size} />;

const socialLinks = [
  { icon: GithubSocial, href: "https://github.com/neorabee", label: "GitHub" },
  { icon: LinkedinSocial, href: "https://www.linkedin.com/in/rabee-aman-achoth-609606376/", label: "LinkedIn" },
  { icon: MediumSocial, href: "https://medium.com/@rabeeaman07", label: "Medium" },
  { icon: Mail, href: "mailto:rabeeamanachoth@gmail.com", label: "Email" },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-border">
      <div className="absolute inset-0 bg-gradient-to-t from-accent/5 to-transparent pointer-events-none" />
      <div className="mx-auto max-w-6xl px-6 py-16 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">
              <span className="text-accent">R</span>abee
            </h3>
            <p className="text-sm text-muted leading-relaxed max-w-xs">
              Software Engineering Student focused on backend systems and
              developer tools.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-muted-light uppercase tracking-wider">Navigation</h4>
            <div className="flex flex-col gap-2">
              {["Projects", "Skills", "Writing", "About", "Contact"].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="text-sm text-muted hover:text-white transition-colors w-fit group flex items-center gap-1"
                >
                  {link}
                  <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-muted-light uppercase tracking-wider">Connect</h4>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-lg bg-surface-light border border-border flex items-center justify-center text-muted hover:text-accent-light hover:border-accent/30 transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon size={16} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} Rabee Aman Achoth. Crafted with precision.
          </p>
          <p className="text-xs text-muted">
            Built with Next.js, Tailwind CSS & Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}
