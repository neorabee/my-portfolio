"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/* ────────────────────────────────────────────
   Each section maps to giant drifting concepts
   that the roadmap weaves through.
   ──────────────────────────────────────────── */
interface ConceptWord {
  text: string;
  sectionId: string;
  size: string;        // e.g. "18vw"
  opacity: number;     // 0.02–0.04
  xOffset: string;     // CSS left/right positioning
  yOffset: number;     // offset from section center in px
  drift: number;       // parallax intensity (px moved per full scroll)
  side: "left" | "right";
}

const CONCEPTS: ConceptWord[] = [
  // ── Projects (id="projects") ──
  { text: "ARCHITECTURE", sectionId: "projects",     size: "16vw", opacity: 0.08,  xOffset: "-8%",  yOffset: -120, drift: -180, side: "left"  },
  { text: "INFRA",        sectionId: "projects",     size: "22vw", opacity: 0.06,  xOffset: "15%",  yOffset: 140,  drift: 120,  side: "right" },

  // ── Pengu (id="pengu") ──
  { text: "AUTONOMY",     sectionId: "pengu",        size: "14vw", opacity: 0.07,  xOffset: "5%",   yOffset: -80,  drift: -140, side: "right" },
  { text: "NAVIGATION",   sectionId: "pengu",        size: "18vw", opacity: 0.06,  xOffset: "-12%", yOffset: 160,  drift: 200,  side: "left"  },

  // ── Profile (id="profile") ──
  { text: "SYSTEMS",      sectionId: "profile",      size: "20vw", opacity: 0.08,  xOffset: "-5%",  yOffset: -100, drift: -160, side: "left"  },
  { text: "OPERATOR",     sectionId: "profile",      size: "14vw", opacity: 0.06,  xOffset: "20%",  yOffset: 120,  drift: 100,  side: "right" },

  // ── Explorations (id="explorations") ──
  { text: "EXPLORATION",  sectionId: "explorations",  size: "15vw", opacity: 0.08,  xOffset: "8%",   yOffset: -140, drift: -200, side: "right" },
  { text: "OBSERVATION",  sectionId: "explorations",  size: "18vw", opacity: 0.06,  xOffset: "-10%", yOffset: 200,  drift: 150,  side: "left"  },

  // ── Contact (id="contact") ──
  { text: "DESTINATION",  sectionId: "contact",       size: "16vw", opacity: 0.08,  xOffset: "0%",   yOffset: -60,  drift: -120, side: "left"  },
  { text: "SIGNAL",       sectionId: "contact",       size: "22vw", opacity: 0.05,  xOffset: "10%",  yOffset: 100,  drift: 180,  side: "right" },
];

/* ────────────────────────────────────────────
   Individual floating word with parallax
   ──────────────────────────────────────────── */
function FloatingConcept({
  concept,
  absoluteY,
  containerHeight,
}: {
  concept: ConceptWord;
  absoluteY: number;
  containerHeight: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll();

  // Parallax: drift intensity scales with scroll
  const y = useTransform(scrollYProgress, [0, 1], [0, concept.drift]);

  const posStyle: React.CSSProperties = {
    position: "absolute",
    top: absoluteY + concept.yOffset,
    ...(concept.side === "left"
      ? { left: concept.xOffset }
      : { right: concept.xOffset }),
  };

  return (
    <motion.div
      ref={ref}
      style={{ ...posStyle, y }}
      className="pointer-events-none select-none"
    >
      <span
        className="font-bold tracking-tighter leading-none whitespace-nowrap block"
        style={{
          fontSize: concept.size,
          opacity: concept.opacity,
          color: "white",
        }}
      >
        {concept.text}
      </span>
    </motion.div>
  );
}

/* ────────────────────────────────────────────
   MAIN: spans the full page behind content
   ──────────────────────────────────────────── */
export default function AmbientConcepts() {
  const [positions, setPositions] = useState<Map<string, number>>(new Map());
  const [containerHeight, setContainerHeight] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const measure = () => {
      if (!containerRef.current) return;
      const cRect = containerRef.current.getBoundingClientRect();
      const cTop = window.scrollY + cRect.top;
      const map = new Map<string, number>();

      // Unique section IDs from concepts
      const sectionIds = [...new Set(CONCEPTS.map((c) => c.sectionId))];
      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) {
          const r = el.getBoundingClientRect();
          map.set(id, window.scrollY + r.top + r.height / 2 - cTop);
        }
      });

      setPositions(map);
      setContainerHeight(
        document.querySelector("main")?.scrollHeight || 0
      );
    };

    measure();
    window.addEventListener("resize", measure);
    const t = [200, 800, 1500].map((ms) => setTimeout(measure, ms));
    return () => {
      window.removeEventListener("resize", measure);
      t.forEach(clearTimeout);
    };
  }, []);

  if (positions.size === 0) return null;

  return (
    <div
      ref={containerRef}
      className="absolute top-0 left-0 w-full overflow-hidden pointer-events-none z-0"
      style={{ height: containerHeight > 0 ? containerHeight : "100%" }}
    >
      {CONCEPTS.map((concept, i) => {
        const sectionY = positions.get(concept.sectionId);
        if (sectionY === undefined) return null;
        return (
          <FloatingConcept
            key={`${concept.text}-${i}`}
            concept={concept}
            absoluteY={sectionY}
            containerHeight={containerHeight}
          />
        );
      })}
    </div>
  );
}
