"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, useScroll, useSpring, useTransform, MotionValue } from "framer-motion";

/* ────────────────────────────────────────────
   PALETTE — subtle cyan-blue with violet hints
   ──────────────────────────────────────────── */
const C = {
  path:       "rgba(120, 180, 220, 0.25)",   // very subtle blue
  pathGlow:   "rgba(120, 180, 220, 0.12)",   // soft glow
  major:      "rgba(140, 200, 240, 0.9)",    // brighter cyan-blue for destinations
  majorGlow:  "rgba(140, 200, 240, 0.5)",
  minor:      "rgba(140, 180, 220, 0.6)",    // dimmer for secondary nodes
  minorGlow:  "rgba(140, 180, 220, 0.25)",
  violet:     "rgba(160, 120, 220, 0.05)",   // reduced violet nebula tint
  violetDeep: "rgba(120, 80, 200, 0.03)",
  label:      "rgba(160, 200, 230, 0.7)",    // label text
  subLabel:   "rgba(160, 200, 230, 0.35)",   // secondary label
  track:      "rgba(255, 255, 255, 0.03)",   // faint base track
  contour:    "rgba(130, 180, 220, 0.015)",  // topographic rings
  coord:      "rgba(130, 180, 220, 0.05)",   // coordinate markers
};

/* ────────────────────────────────────────────
   SECTION CONFIG
   Nodes are independent compositional landmarks.
   xPct places them in the page's negative space.
   yPct offsets them within the section's height
   to sit in padding/whitespace areas.
   ──────────────────────────────────────────── */
const SECTIONS = [
  { id: "hero",         type: "origin"      as const, label: "ORIGIN",      sub: "Starting Point",     xPct: 0.50, yPct: -1    },  // special: hero-links anchor
  { id: "projects",     type: "major"       as const, label: "PROJECTS",     sub: "Major Destination",  xPct: 0.08, yPct: 0.46  },  // left margin, top whitespace
  { id: "pengu",        type: "major"       as const, label: "PENGU",       sub: "Major Destination",  xPct: 0.92, yPct: 0.36  },  // right margin, top whitespace
  { id: "profile",      type: "checkpoint"  as const, label: "PROFILE",    sub: "Checkpoint",         xPct: 0.08, yPct: 0.25  },  // left margin, slight offset
  { id: "explorations", type: "branch"      as const, label: "SIDEQUESTS",     sub: "Side Branch",        xPct: 0.92, yPct: 0.36  },  // right margin, top whitespace
  { id: "contact",      type: "destination" as const, label: "DESTINATION", sub: "End of Route",       xPct: 0.50, yPct: 0.12  },  // centered
];

type NodeType = "origin" | "major" | "checkpoint" | "branch" | "destination";

interface NodeData {
  id: string;
  type: NodeType;
  label: string;
  sub: string;
  x: number;
  y: number;
  xPct: number;
  isMobile?: boolean;
}



/* ────────────────────────────────────────────
   CONTOUR RINGS — topographic elevation feel
   ──────────────────────────────────────────── */
function ContourRings({ node }: { node: NodeData }) {
  const isMajor = node.type === "major" || node.type === "origin";
  const rings = isMajor
    ? [
        { rx: 12, ry: 0,  op: 0.02 },
        { rx: 0, ry: 0, op: 0.014 },
        { rx: 0, ry: 0, op: 0.008 },
        { rx: 0, ry: 0, op: 0.005 },
      ]
    : [
        { rx: 80,  ry: 60,  op: 0.015 },
        { rx: 150, ry: 110, op: 0.01 },
        { rx: 240, ry: 180, op: 0.006 },
      ];

  return (
    <g>
      {rings.map((r, i) => (
        <ellipse
          key={i}
          cx={node.x}
          cy={node.y}
          rx={r.rx}
          ry={r.ry}
          fill="none"
          stroke="rgba(130,180,220,1)"
          strokeWidth="0.4"
          opacity={r.op}
        />
      ))}
    </g>
  );
}

/* ────────────────────────────────────────────
   NODE RENDERER
   ──────────────────────────────────────────── */
function RoadmapPathSegment({ d, startY, endY, scrollY }: { d: string, startY: number, endY: number, scrollY: MotionValue<number> }) {
  const [triggerOffset, setTriggerOffset] = useState(500);
  useEffect(() => { setTriggerOffset(window.innerHeight * 0.6); }, []);
  
  const pathLength = useTransform(
    scrollY, 
    [Math.max(0, startY - triggerOffset), Math.max(1, endY - triggerOffset)], 
    [0, 1]
  );
  
  return (
    <motion.path
      d={d}
      fill="none"
      stroke="url(#journey-grad)"
      strokeWidth="1.5"
      style={{ pathLength }}
    />
  );
}

/* ────────────────────────────────────────────
   NODE RENDERER
   ──────────────────────────────────────────── */
function RoadmapNode({
  node,
  scrollY,
}: {
  node: NodeData;
  scrollY: MotionValue<number>;
}) {
  const [triggerOffset, setTriggerOffset] = useState(500);
  useEffect(() => { setTriggerOffset(window.innerHeight * 0.6); }, []);

  const startAnim = Math.max(0, node.y - triggerOffset - 150);
  const endAnim = Math.max(1, node.y - triggerOffset);

  const opacity = useTransform(scrollY, [startAnim, endAnim], [0.08, 1]);
  const scale  = useTransform(scrollY, [startAnim, endAnim, endAnim + 150], [0.6, 1.3, 1]);

  const connLen = 40;
  const dir = node.xPct < 0.5 ? 1 : node.xPct > 0.5 ? -1 : 0;
  const labelX = dir !== 0 ? node.x + dir * (connLen + 16) : node.x + 28;
  const labelAnchor = dir === -1 ? "end" : "start";
  const labelY = node.y - 8;
  const subLabelY = node.y + 10;

  /* ── ORIGIN ──────────────────────────── */
  if (node.type === "origin") {
    return (
      <g>
        <motion.line x1={node.x - 22} y1={node.y} x2={node.x + 22} y2={node.y} stroke={C.minor} strokeWidth="0.6" style={{ opacity }} />
        <motion.line x1={node.x} y1={node.y - 22} x2={node.x} y2={node.y + 22} stroke={C.minor} strokeWidth="0.6" style={{ opacity }} />
        <motion.circle cx={node.x} cy={node.y} r="8" fill="none" stroke={C.major} strokeWidth="1" style={{ opacity, scale }} />
        <motion.circle cx={node.x} cy={node.y} r="3" fill="#fff" style={{ opacity }} />
        {!node.isMobile && (
          <>
            <motion.text x={node.x + 28} y={labelY} fill={C.label} fontSize="14" fontFamily="var(--font-mono)" fontWeight="600" letterSpacing="0.2em" style={{ opacity }}>{node.label}</motion.text>
            <motion.text x={node.x + 28} y={subLabelY} fill={C.subLabel} fontSize="10" fontFamily="var(--font-mono)" letterSpacing="0.1em" style={{ opacity }}>{node.sub}</motion.text>
          </>
        )}
      </g>
    );
  }

  /* ── MAJOR (Projects) — bright destinations ── */
  if (node.type === "major") {
    return (
      <g>
        <circle cx={node.x} cy={node.y} r="16" fill="rgba(0,0,0,0.6)" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
        <motion.circle cx={node.x} cy={node.y} r="16" fill="none" stroke={C.major} strokeWidth="1.5" style={{ opacity, scale }} />
        <motion.circle cx={node.x} cy={node.y} r="10" fill="none" stroke={C.major} strokeWidth="0.6" style={{ opacity }} />
        <motion.circle cx={node.x} cy={node.y} r="5" fill="#fff" style={{ opacity }} />
        {dir !== 0 && !node.isMobile && (
          <motion.line x1={node.x + dir * 20} y1={node.y} x2={node.x + dir * connLen} y2={node.y} stroke={C.major} strokeWidth="0.8" strokeDasharray="4 4" style={{ opacity }} />
        )}
        {!node.isMobile && (
          <>
            <motion.text x={labelX} y={labelY} fill={C.label} fontSize="14" fontFamily="var(--font-mono)" fontWeight="600" letterSpacing="0.15em" textAnchor={labelAnchor} style={{ opacity }}>{node.label}</motion.text>
            <motion.text x={labelX} y={subLabelY} fill={C.subLabel} fontSize="10" fontFamily="var(--font-mono)" letterSpacing="0.08em" textAnchor={labelAnchor} style={{ opacity }}>{node.sub}</motion.text>
          </>
        )}
      </g>
    );
  }

  /* ── CHECKPOINT (Profile) — small secondary ── */
  if (node.type === "checkpoint") {
    return (
      <g>
        <circle cx={node.x} cy={node.y} r="7" fill="rgba(0,0,0,0.5)" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
        <motion.circle cx={node.x} cy={node.y} r="7" fill="none" stroke={C.minor} strokeWidth="1" style={{ opacity, scale }} />
        <motion.circle cx={node.x} cy={node.y} r="2.5" fill={C.minor} style={{ opacity }} />
        {dir !== 0 && !node.isMobile && (
          <motion.line x1={node.x + dir * 10} y1={node.y} x2={node.x + dir * connLen} y2={node.y} stroke={C.minor} strokeWidth="0.6" strokeDasharray="3 5" style={{ opacity }} />
        )}
        {!node.isMobile && (
          <>
            <motion.text x={labelX} y={labelY} fill={C.label} fontSize="12" fontFamily="var(--font-mono)" fontWeight="500" letterSpacing="0.12em" textAnchor={labelAnchor} style={{ opacity }}>{node.label}</motion.text>
            <motion.text x={labelX} y={subLabelY} fill={C.subLabel} fontSize="9" fontFamily="var(--font-mono)" letterSpacing="0.08em" textAnchor={labelAnchor} style={{ opacity }}>{node.sub}</motion.text>
          </>
        )}
      </g>
    );
  }

  /* ── BRANCH (Explorations) — small secondary ── */
  if (node.type === "branch") {
    return (
      <g>
        <motion.rect x={node.x - 6} y={node.y - 6} width="12" height="12" fill="rgba(0,0,0,0.5)" stroke="rgba(255,255,255,0.04)" strokeWidth="1" style={{ rotate: 45 }} />
        <motion.rect x={node.x - 6} y={node.y - 6} width="12" height="12" fill="none" stroke={C.minor} strokeWidth="1" style={{ opacity, scale, rotate: 45 }} />
        <motion.circle cx={node.x} cy={node.y} r="2" fill={C.minor} style={{ opacity }} />
        {dir !== 0 && !node.isMobile && (
          <motion.line x1={node.x + dir * 10} y1={node.y} x2={node.x + dir * connLen} y2={node.y} stroke={C.minor} strokeWidth="0.6" strokeDasharray="2 6" style={{ opacity }} />
        )}
        {!node.isMobile && (
          <>
            <motion.text x={labelX} y={labelY} fill={C.label} fontSize="12" fontFamily="var(--font-mono)" fontWeight="500" letterSpacing="0.12em" textAnchor={labelAnchor} style={{ opacity }}>{node.label}</motion.text>
            <motion.text x={labelX} y={subLabelY} fill={C.subLabel} fontSize="9" fontFamily="var(--font-mono)" letterSpacing="0.08em" textAnchor={labelAnchor} style={{ opacity }}>{node.sub}</motion.text>
          </>
        )}
      </g>
    );
  }

  /* ── DESTINATION (Contact) — secondary ── */
  return (
    <g>
      <motion.circle cx={node.x} cy={node.y} r="14" fill="none" stroke="rgba(130,180,220,0.08)" strokeWidth="0.8" style={{ opacity }} />
      <motion.circle cx={node.x} cy={node.y} r="9" fill="none" stroke={C.minor} strokeWidth="1" style={{ opacity, scale }} />
      <motion.circle cx={node.x} cy={node.y} r="3" fill={C.minor} style={{ opacity }} />
      {!node.isMobile && (
        <>
          <motion.text x={node.x} y={node.y + 28} fill={C.label} fontSize="13" fontFamily="var(--font-mono)" fontWeight="600" letterSpacing="0.2em" textAnchor="middle" style={{ opacity }}>{node.label}</motion.text>
          <motion.text x={node.x} y={node.y + 44} fill={C.subLabel} fontSize="9" fontFamily="var(--font-mono)" letterSpacing="0.1em" textAnchor="middle" style={{ opacity }}>{node.sub}</motion.text>
        </>
      )}
    </g>
  );
}

/* ────────────────────────────────────────────
   MAIN COMPONENT
   ──────────────────────────────────────────── */
export default function GlobalRoadmap() {
  const [nodes, setNodes] = useState<NodeData[]>([]);
  const [segments, setSegments] = useState<{d: string, startY: number, endY: number}[]>([]);
  const [svgHeight, setSvgHeight] = useState(0);
  const [svgWidth, setSvgWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();
  const smoothScrollY = useSpring(scrollY, { stiffness: 60, damping: 25 });

  useEffect(() => {
    const update = () => {
      if (!containerRef.current) return;

      const cRect = containerRef.current.getBoundingClientRect();
      const cTop = window.scrollY + cRect.top;
      const w = cRect.width;
      const built: NodeData[] = [];

      const isMobile = w < 1024;

      SECTIONS.forEach((sec) => {
        // Hero uses a special anchor to the links row
        if (sec.id === "hero") {
          const linksEl = document.getElementById("hero-links");
          if (!linksEl) return;
          const rLinks = linksEl.getBoundingClientRect();
          const x = rLinks.left - cRect.left + (rLinks.width / 2);
          const y = window.scrollY + rLinks.bottom + 60 - cTop;
          built.push({ ...sec, x, y, isMobile });
          return;
        }

        // All other nodes: position as independent landmarks
        // using the section element for vertical reference,
        // offset by yPct into its whitespace areas.
        const el = document.getElementById(sec.id);
        if (!el) return;
        const r = el.getBoundingClientRect();

        const y = window.scrollY + r.top + r.height * sec.yPct - cTop;
        const x = isMobile ? 32 : w * sec.xPct;

        built.push({ ...sec, x, y, isMobile });
      });

      setNodes(built);
      const h = document.querySelector("main")?.scrollHeight || 0;
      setSvgHeight(h);
      setSvgWidth(w);

      if (built.length > 1) {
        const segs = [];
        for (let i = 1; i < built.length; i++) {
          const p = built[i - 1];
          const c = built[i];
          const cp1x = p.x;
          const cp1y = p.y + (c.y - p.y) * 0.45;
          const cp2x = c.x;
          const cp2y = p.y + (c.y - p.y) * 0.55;
          segs.push({
            d: `M ${p.x},${p.y} C ${cp1x},${cp1y} ${cp2x},${cp2y} ${c.x},${c.y}`,
            startY: p.y,
            endY: c.y
          });
        }
        
        // Final infinite line extending downwards
        const last = built[built.length - 1];
        segs.push({
          d: `M ${last.x},${last.y} L ${last.x},${last.y + 800}`,
          startY: last.y,
          endY: last.y + 800
        });

        setSegments(segs);
      }
    };

    update();
    window.addEventListener("resize", update);
    const t = [150, 600, 1200].map((ms) => setTimeout(update, ms));
    return () => {
      window.removeEventListener("resize", update);
      t.forEach(clearTimeout);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="hidden lg:block absolute top-0 left-0 w-full pointer-events-none z-[5]"
      style={{ height: svgHeight > 0 ? svgHeight : "100%" }}
    >
      {nodes.length > 1 && segments.length > 0 && (
        <svg
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          overflow="visible"
        >
          <defs>
            {/* Path gradient — brightened */}
            <linearGradient id="journey-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="rgba(140,200,240,0.8)" />
              <stop offset="50%"  stopColor="rgba(130,180,220,0.5)" />
              <stop offset="100%" stopColor="rgba(140,200,240,0.3)" />
            </linearGradient>

            {/* Nebula radial gradients */}
            {nodes.map((n) => (
              <radialGradient key={`ng-${n.id}`} id={`nebula-${n.id}`} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(140,200,240,0.03)" />
                <stop offset="60%" stopColor="rgba(130,180,220,0.01)" />
                <stop offset="100%" stopColor="rgba(130,180,220,0)" />
              </radialGradient>
            ))}
            {nodes.filter(n => n.type === "major" || n.type === "origin").map((n) => (
              <radialGradient key={`vg-${n.id}`} id={`nebula-violet-${n.id}`} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={C.violet} />
                <stop offset="100%" stopColor="rgba(160,120,220,0)" />
              </radialGradient>
            ))}
          </defs>

          {/* ── Layer 0: Topographic contour rings ── */}
          {nodes.map((n) => (
            <ContourRings key={`c-${n.id}`} node={n} />
          ))}

          {/* ── Layer 1: Coordinate markers ── */}
          {svgWidth > 0 && (
            <g>
              <text x="16" y="28" fill={C.coord} fontSize="8" fontFamily="var(--font-mono)">47.3812°N</text>
              <text x={svgWidth - 16} y="28" fill={C.coord} fontSize="8" fontFamily="var(--font-mono)" textAnchor="end">8.5417°E</text>
              <text x="16" y={svgHeight - 16} fill={C.coord} fontSize="8" fontFamily="var(--font-mono)">EL. 0m</text>
              <text x={svgWidth - 16} y={svgHeight - 16} fill={C.coord} fontSize="8" fontFamily="var(--font-mono)" textAnchor="end">SURVEY REF: RA-2025</text>
            </g>
          )}

          {/* ── Layer 2: Static track (very faint base layer) ── */}
          {segments.map((s, i) => (
            <path
              key={`track-${i}`}
              d={s.d}
              fill="none"
              stroke={C.track}
              strokeWidth="1"
              strokeDasharray="6 8"
            />
          ))}

          {/* ── Layer 3: Nebula blooms (scroll-revealed per node) ── */}
          {nodes.map((n) => (
             <NebulaRenderer key={`neb-${n.id}`} node={n} scrollY={smoothScrollY} />
          ))}

          {/* ── Layer 4: Illuminated path segments (Segmented drawing!) ── */}
          {segments.map((s, i) => (
             <RoadmapPathSegment key={`seg-${i}`} d={s.d} startY={s.startY} endY={s.endY} scrollY={smoothScrollY} />
          ))}

          {/* ── Layer 5: Orbital arcs (scroll-revealed) ── */}
          {nodes.map((n) => (
             <OrbitalArcRenderer key={`orb-${n.id}`} node={n} scrollY={smoothScrollY} />
          ))}

          {/* ── Layer 6: Nodes ── */}
          {nodes.map((n) => (
            <RoadmapNode
              key={n.id}
              node={n}
              scrollY={smoothScrollY}
            />
          ))}
        </svg>
      )}
    </div>
  );
}

// Rewriting Nebula and OrbitalArc to accept scrollY
function NebulaRenderer({ node, scrollY }: { node: NodeData; scrollY: MotionValue<number>; }) {
  const [triggerOffset, setTriggerOffset] = useState(500);
  useEffect(() => { setTriggerOffset(window.innerHeight * 0.6); }, []);
  
  const startAnim = Math.max(0, node.y - triggerOffset - 200);
  const endAnim = Math.max(1, node.y - triggerOffset);
  const opacity = useTransform(scrollY, [startAnim, endAnim], [0, 1]);
  
  const isMajor = node.type === "major" || node.type === "origin";
  const size = isMajor ? 200 : 120;

  return (
    <g>
      <motion.circle cx={node.x} cy={node.y} r={size} fill={`url(#nebula-${node.id})`} style={{ opacity }} />
      {isMajor && (
        <motion.circle cx={node.x + 40} cy={node.y - 30} r={size * 0.6} fill={`url(#nebula-violet-${node.id})`} style={{ opacity }} />
      )}
    </g>
  );
}

function OrbitalArcRenderer({ node, scrollY }: { node: NodeData; scrollY: MotionValue<number>; }) {
  const [triggerOffset, setTriggerOffset] = useState(500);
  useEffect(() => { setTriggerOffset(window.innerHeight * 0.6); }, []);

  const startAnim = Math.max(0, node.y - triggerOffset - 150);
  const endAnim = Math.max(1, node.y - triggerOffset);
  const opacity = useTransform(scrollY, [startAnim, endAnim], [0, 0.12]);

  if (node.type !== "major") return null;

  return (
    <g>
      <motion.ellipse cx={node.x} cy={node.y} rx="55" ry="28" fill="none" stroke={C.major} strokeWidth="0.6" strokeDasharray="3 8" style={{ opacity }} transform={`rotate(-15 ${node.x} ${node.y})`} />
      <motion.ellipse cx={node.x} cy={node.y} rx="75" ry="38" fill="none" stroke={C.violet} strokeWidth="0.5" strokeDasharray="2 12" style={{ opacity }} transform={`rotate(10 ${node.x} ${node.y})`} />
    </g>
  );
}
