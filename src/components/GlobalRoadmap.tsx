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
   ──────────────────────────────────────────── */
const SECTIONS = [
  { id: "hero",         type: "origin"      as const, label: "ORIGIN",      sub: "Starting Point",     xPct: 0.50 },
  { id: "projects",     type: "major"       as const, label: "SYSTEMS",     sub: "Major Destination",  xPct: 0.15 },
  { id: "pengu",        type: "major"       as const, label: "PENGU",       sub: "Major Destination",  xPct: 0.85 },
  { id: "profile",      type: "checkpoint"  as const, label: "OPERATOR",    sub: "Checkpoint",         xPct: 0.15 },
  { id: "explorations", type: "branch"      as const, label: "SIGNALS",     sub: "Side Branch",        xPct: 0.85 },
  { id: "contact",      type: "destination" as const, label: "DESTINATION", sub: "End of Route",       xPct: 0.50 },
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
}

/* ────────────────────────────────────────────
   NEBULA — soft radial glow around nodes
   ──────────────────────────────────────────── */
function Nebula({ node, progress, adjusted }: { node: NodeData; progress: MotionValue<number>; adjusted: number }) {
  const opacity = useTransform(progress, [Math.max(0, adjusted - 0.06), adjusted], [0, 1]);
  const isMajor = node.type === "major" || node.type === "origin";
  const size = isMajor ? 200 : 120;

  return (
    <g>
      {/* Primary nebula bloom */}
      <motion.circle
        cx={node.x}
        cy={node.y}
        r={size}
        fill={`url(#nebula-${node.id})`}
        style={{ opacity }}
      />
      {/* Violet accent bloom — offset for depth */}
      {isMajor && (
        <motion.circle
          cx={node.x + 40}
          cy={node.y - 30}
          r={size * 0.6}
          fill={`url(#nebula-violet-${node.id})`}
          style={{ opacity }}
        />
      )}
    </g>
  );
}

/* ────────────────────────────────────────────
   ORBITAL ARC — faint trajectory around major nodes
   ──────────────────────────────────────────── */
function OrbitalArc({ node, progress, adjusted }: { node: NodeData; progress: MotionValue<number>; adjusted: number }) {
  const opacity = useTransform(progress, [Math.max(0, adjusted - 0.04), adjusted], [0, 0.12]);
  if (node.type !== "major") return null;

  return (
    <g>
      <motion.ellipse
        cx={node.x}
        cy={node.y}
        rx="55"
        ry="28"
        fill="none"
        stroke={C.major}
        strokeWidth="0.6"
        strokeDasharray="3 8"
        style={{ opacity }}
        transform={`rotate(-15 ${node.x} ${node.y})`}
      />
      <motion.ellipse
        cx={node.x}
        cy={node.y}
        rx="75"
        ry="38"
        fill="none"
        stroke={C.violet}
        strokeWidth="0.5"
        strokeDasharray="2 12"
        style={{ opacity }}
        transform={`rotate(10 ${node.x} ${node.y})`}
      />
    </g>
  );
}

/* ────────────────────────────────────────────
   CONTOUR RINGS — topographic elevation feel
   ──────────────────────────────────────────── */
function ContourRings({ node }: { node: NodeData }) {
  const isMajor = node.type === "major" || node.type === "origin";
  const rings = isMajor
    ? [
        { rx: 120, ry: 90,  op: 0.02 },
        { rx: 220, ry: 170, op: 0.014 },
        { rx: 340, ry: 260, op: 0.008 },
        { rx: 480, ry: 360, op: 0.005 },
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
function RoadmapNode({
  node,
  adjusted,
  progress,
}: {
  node: NodeData;
  adjusted: number;
  progress: MotionValue<number>;
}) {
  const opacity = useTransform(progress, [Math.max(0, adjusted - 0.04), adjusted], [0.08, 1]);
  const scale  = useTransform(progress, [Math.max(0, adjusted - 0.02), adjusted, Math.min(1, adjusted + 0.04)], [0.6, 1.3, 1]);

  const connLen = 60;
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
        <motion.text x={node.x + 28} y={labelY} fill={C.label} fontSize="14" fontFamily="var(--font-mono)" fontWeight="600" letterSpacing="0.2em" style={{ opacity }}>{node.label}</motion.text>
        <motion.text x={node.x + 28} y={subLabelY} fill={C.subLabel} fontSize="10" fontFamily="var(--font-mono)" letterSpacing="0.1em" style={{ opacity }}>{node.sub}</motion.text>
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
        {dir !== 0 && (
          <motion.line x1={node.x + dir * 20} y1={node.y} x2={node.x + dir * connLen} y2={node.y} stroke={C.major} strokeWidth="0.8" strokeDasharray="4 4" style={{ opacity }} />
        )}
        <motion.text x={labelX} y={labelY} fill={C.label} fontSize="14" fontFamily="var(--font-mono)" fontWeight="600" letterSpacing="0.15em" textAnchor={labelAnchor} style={{ opacity }}>{node.label}</motion.text>
        <motion.text x={labelX} y={subLabelY} fill={C.subLabel} fontSize="10" fontFamily="var(--font-mono)" letterSpacing="0.08em" textAnchor={labelAnchor} style={{ opacity }}>{node.sub}</motion.text>
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
        {dir !== 0 && (
          <motion.line x1={node.x + dir * 10} y1={node.y} x2={node.x + dir * connLen} y2={node.y} stroke={C.minor} strokeWidth="0.6" strokeDasharray="3 5" style={{ opacity }} />
        )}
        <motion.text x={labelX} y={labelY} fill={C.label} fontSize="12" fontFamily="var(--font-mono)" fontWeight="500" letterSpacing="0.12em" textAnchor={labelAnchor} style={{ opacity }}>{node.label}</motion.text>
        <motion.text x={labelX} y={subLabelY} fill={C.subLabel} fontSize="9" fontFamily="var(--font-mono)" letterSpacing="0.08em" textAnchor={labelAnchor} style={{ opacity }}>{node.sub}</motion.text>
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
        {dir !== 0 && (
          <motion.line x1={node.x + dir * 10} y1={node.y} x2={node.x + dir * connLen} y2={node.y} stroke={C.minor} strokeWidth="0.6" strokeDasharray="2 6" style={{ opacity }} />
        )}
        <motion.text x={labelX} y={labelY} fill={C.label} fontSize="12" fontFamily="var(--font-mono)" fontWeight="500" letterSpacing="0.12em" textAnchor={labelAnchor} style={{ opacity }}>{node.label}</motion.text>
        <motion.text x={labelX} y={subLabelY} fill={C.subLabel} fontSize="9" fontFamily="var(--font-mono)" letterSpacing="0.08em" textAnchor={labelAnchor} style={{ opacity }}>{node.sub}</motion.text>
      </g>
    );
  }

  /* ── DESTINATION (Contact) — secondary ── */
  return (
    <g>
      <motion.circle cx={node.x} cy={node.y} r="14" fill="none" stroke="rgba(130,180,220,0.08)" strokeWidth="0.8" style={{ opacity }} />
      <motion.circle cx={node.x} cy={node.y} r="9" fill="none" stroke={C.minor} strokeWidth="1" style={{ opacity, scale }} />
      <motion.circle cx={node.x} cy={node.y} r="3" fill={C.minor} style={{ opacity }} />
      <motion.text x={node.x} y={node.y + 28} fill={C.label} fontSize="13" fontFamily="var(--font-mono)" fontWeight="600" letterSpacing="0.2em" textAnchor="middle" style={{ opacity }}>{node.label}</motion.text>
      <motion.text x={node.x} y={node.y + 44} fill={C.subLabel} fontSize="9" fontFamily="var(--font-mono)" letterSpacing="0.1em" textAnchor="middle" style={{ opacity }}>{node.sub}</motion.text>
    </g>
  );
}

/* ────────────────────────────────────────────
   MAIN COMPONENT
   ──────────────────────────────────────────── */
export default function GlobalRoadmap() {
  const [nodes, setNodes] = useState<NodeData[]>([]);
  const [pathData, setPathData] = useState("");
  const [svgHeight, setSvgHeight] = useState(0);
  const [svgWidth, setSvgWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 50, damping: 22 });

  // Viewport offset: how far ahead the clip runs
  const getOffset = useCallback(() => {
    if (typeof window === "undefined" || svgHeight <= 0) return 0;
    return (window.innerHeight * 0.6) / svgHeight;
  }, [svgHeight]);

  const clipHeight = useTransform(smoothProgress, (v) => {
    return `${Math.min((v + getOffset()) * 100, 100)}%`;
  });

  // Compute adjusted thresholds for each node so node animation
  // matches the clip position exactly (same viewport offset).
  const getAdjusted = useCallback(
    (nodeY: number) => {
      if (svgHeight <= 0) return 0;
      return Math.max(0, nodeY / svgHeight - getOffset());
    },
    [svgHeight, getOffset]
  );

  useEffect(() => {
    const update = () => {
      if (!containerRef.current) return;

      const cRect = containerRef.current.getBoundingClientRect();
      const cTop = window.scrollY + cRect.top;
      const w = cRect.width;
      const built: NodeData[] = [];

      SECTIONS.forEach((sec) => {
        const el = document.getElementById(sec.id);
        if (!el) return;
        const r = el.getBoundingClientRect();
        const y = window.scrollY + r.top + r.height / 2 - cTop;
        built.push({ ...sec, x: w * sec.xPct, y });
      });

      setNodes(built);
      const h = document.querySelector("main")?.scrollHeight || 0;
      setSvgHeight(h);
      setSvgWidth(w);

      if (built.length > 1) {
        let d = `M ${built[0].x},${built[0].y}`;
        for (let i = 1; i < built.length; i++) {
          const p = built[i - 1];
          const c = built[i];
          const cp1x = p.x;
          const cp1y = p.y + (c.y - p.y) * 0.45;
          const cp2x = c.x;
          const cp2y = p.y + (c.y - p.y) * 0.55;
          d += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${c.x},${c.y}`;
        }
        const last = built[built.length - 1];
        d += ` L ${last.x},${last.y + 800}`;
        setPathData(d);
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
      className="absolute top-0 left-0 w-full pointer-events-none z-0"
      style={{ height: svgHeight > 0 ? svgHeight : "100%" }}
    >
      {nodes.length > 1 && pathData && (
        <svg
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          overflow="visible"
        >
          <defs>
            <clipPath id="journey-clip">
              <motion.rect x="0" y="0" width="100%" height={clipHeight} />
            </clipPath>

            {/* Path gradient — brightened */}
            <linearGradient id="journey-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="rgba(140,200,240,0.8)" />
              <stop offset="50%"  stopColor="rgba(130,180,220,0.5)" />
              <stop offset="100%" stopColor="rgba(140,200,240,0.3)" />
            </linearGradient>

            {/* Nebula radial gradients — per node, reduced opacity */}
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

          {/* ── Layer 2: Static track (very faint) ── */}
          <path
            d={pathData}
            fill="none"
            stroke={C.track}
            strokeWidth="1"
            strokeDasharray="6 8"
          />

          {/* ── Layer 3: Nebula blooms (scroll-revealed) ── */}
          <g clipPath="url(#journey-clip)">
            {nodes.map((n) => (
              <Nebula key={`neb-${n.id}`} node={n} progress={smoothProgress} adjusted={getAdjusted(n.y)} />
            ))}
          </g>

          {/* ── Layer 4: Illuminated path (scroll-revealed) ── */}
          <g clipPath="url(#journey-clip)">
            <path
              d={pathData}
              fill="none"
              stroke="url(#journey-grad)"
              strokeWidth="1.5"
            />
          </g>

          {/* ── Layer 5: Orbital arcs (scroll-revealed) ── */}
          {nodes.map((n) => (
            <OrbitalArc key={`orb-${n.id}`} node={n} progress={smoothProgress} adjusted={getAdjusted(n.y)} />
          ))}

          {/* ── Layer 6: Nodes ── */}
          {nodes.map((n) => (
            <RoadmapNode
              key={n.id}
              node={n}
              adjusted={getAdjusted(n.y)}
              progress={smoothProgress}
            />
          ))}
        </svg>
      )}
    </div>
  );
}
