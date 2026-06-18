"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";


import MobileSectionHeader from "./MobileSectionHeader";

type ContentItem = 
  | { type: "article"; title: string; excerpt: string; link: string; date: string; colSpan: string; aspect: string }
  | { type: "photo"; image: string; alt: string; colSpan: string; aspect: string };

const content: ContentItem[] = [
  {
    type: "article",
    title: "If Nuclear Fusion Is So Perfect, Why Isn't It Our Energy Source?",
    excerpt: "Nuclear fusion is often hailed as humanity's 'holy grail' of energy. Yet today, not a usable watt comes from it.",
    link: "https://medium.com/@rabeeaman07/if-nuclear-fusion-is-so-perfect-why-isnt-it-our-energy-source-21b5a08d2796",
    date: "July 2025",
    colSpan: "md:col-span-8",
    aspect: "min-h-[300px]"
  },
  {
    type: "photo",
    image: "/nighttime still/IMG20250830201736.jpg",
    alt: "Nighttime still",
    colSpan: "md:col-span-4",
    aspect: "min-h-[300px]"
  },
  {
    type: "photo",
    image: "/quiet nature/1000008326.jpg",
    alt: "Nature",
    colSpan: "md:col-span-5",
    aspect: "min-h-[350px]"
  },
  {
    type: "article",
    title: "Something about it being turtles all the way down never sits right with me.",
    excerpt: "What governs logic? Questioning what governs logic is futile. The very act of questioning is grounded in logic.",
    link: "https://medium.com/@rabeeaman07/something-about-it-being-turtles-all-the-way-down-never-sits-right-with-me-e68c9ba8ca1c",
    date: "March 2024",
    colSpan: "md:col-span-7",
    aspect: "min-h-[350px]"
  },
  {
    type: "photo",
    image: "/cityscape/1000063409 - Copy.jpg",
    alt: "Cityscape wide",
    colSpan: "md:col-span-12",
    aspect: "h-[400px]"
  },
  {
    type: "photo",
    image: "/cityscape/1000062062.jpg",
    alt: "Cityscape detail",
    colSpan: "md:col-span-4",
    aspect: "aspect-square"
  },
  {
    type: "photo",
    image: "/quiet nature/1000000258.jpg",
    alt: "Organic shapes",
    colSpan: "md:col-span-4",
    aspect: "aspect-square"
  },
  {
    type: "photo",
    image: "/nighttime still/1000013349.jpg",
    alt: "Night street",
    colSpan: "md:col-span-4",
    aspect: "aspect-square"
  }
];

export default function Explorations() {

  return (
    <section id="explorations" className="py-24 relative">
          
      
      <div className="mx-auto max-w-6xl px-6 relative z-10 lg:pr-[22%]">
        
        <MobileSectionHeader title="EXPLORATIONS" subtitle="SIGNALS & OBSERVATIONS" icon="blackhole" />

 

        {/* Compact Bento Grid */}
        <div id="anchor-explorations" className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 mt-8">
          {content.map((item, i) => {
            if (item.type === "article") {
              return (
                <div key={i} className={`${item.colSpan} ${item.aspect} relative group h-full`}>
                  <div>
                    <a 
                      href={item.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block w-full h-full p-8 md:p-10 rounded-2xl border border-white/5 bg-surface hover:bg-surface/80 transition-colors flex flex-col justify-between"
                    >
                      <div>
                        <span className="text-xs font-mono text-muted mb-4 block">{item.date}</span>
                        <h3 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4 text-foreground group-hover:text-accent-light transition-colors line-clamp-3">
                          {item.title}
                        </h3>
                        <p className="text-muted-light text-sm md:text-base line-clamp-3">
                          {item.excerpt}
                        </p>
                      </div>
                      <div className="mt-8 flex items-center text-xs font-mono text-accent gap-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                        READ ARTICLE <ArrowUpRight size={14} />
                      </div>
                    </a>
                  </div>
                </div>
              );
            } else {
              return (
                <div key={i} className={`${item.colSpan} ${item.aspect} relative overflow-hidden rounded-2xl border border-white/5 bg-surface group`}>
                  <div>
                    <a 
                      href="https://www.pexels.com/@rabee-aman-2153964241/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block w-full h-full"
                    >
                      <Image
                        src={item.image}
                        alt={item.alt}
                        fill
                        className="object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-700 ease-out"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-500 flex items-center justify-center">
                        <div className="opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 flex items-center gap-2 text-white font-mono text-sm tracking-widest backdrop-blur-md bg-black/30 px-4 py-2 rounded-full border border-white/10">
                          PEXELS <ArrowUpRight size={16} />
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              );
            }
          })}
        </div>

      </div>
    </section>
  );
}
