"use client";

import { useEffect, useState, useRef } from "react";

/* ────────────────────────────────────────────
   PALETTE — subtle cyan-blue with violet hints
   ──────────────────────────────────────────── */
const C = {
  path:       "rgba(120, 180, 220, 0.25)",
  pathGlow:   "rgba(120, 180, 220, 0.12)",
  major:      "rgba(140, 200, 240, 0.9)",
  majorGlow:  "rgba(140, 200, 240, 0.5)",
  minor:      "rgba(140, 180, 220, 0.6)",
  minorGlow:  "rgba(140, 180, 220, 0.25)",
  violet:     "rgba(160, 120, 220, 0.05)",
  violetDeep: "rgba(120, 80, 200, 0.03)",
  label:      "rgba(160, 200, 230, 0.7)",
  subLabel:   "rgba(160, 200, 230, 0.35)",
  track:      "rgba(255, 255, 255, 0.03)",
  contour:    "rgba(130, 180, 220, 0.015)",
  coord:      "rgba(130, 180, 220, 0.05)",
};

/* ────────────────────────────────────────────
   SECTION CONFIG
   ──────────────────────────────────────────── */
const SECTIONS = [
  { id: "hero",         type: "origin"      as const, label: "ORIGIN",      sub: "Starting Point",     xPct: 0.50, yPct: -1    },
  { id: "projects",     type: "major"       as const, label: "MISSION #2922",     sub: "Major Destination",  xPct: 0.08, yPct: 0.46  },
  { id: "pengu",        type: "major"       as const, label: "MISSION #0412",       sub: "Major Destination",  xPct: 0.92, yPct: 0.36  },
  { id: "profile",      type: "checkpoint"  as const, label: "ANALYSIS",    sub: "Checkpoint",         xPct: 0.08, yPct: 0.60  },
  { id: "explorations", type: "branch"      as const, label: "EXPLORATON",     sub: "Side Branch",        xPct: 0.92, yPct: 0.45  },
  { id: "contact",      type: "destination" as const, label: "DESTINATION", sub: "End of Route",       xPct: 0.50, yPct: 0.15  },
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
   (Static, no animation)
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
   NODE RENDERERS — celestial bodies
   ★ origin     → Bright Star (rotating rays)
   ♄ major      → Saturn (rotating ring system)
   ✦ checkpoint → Small Star (rotating cross)
   ◉ branch     → Black Hole (spinning accretion disk)
   ❋ destination→ Beacon Star (rotating halo)
   All rotations are pure CSS for GPU compositing.
   ──────────────────────────────────────────── */

/* ═══ ORIGIN — Bright Star ═══ */
function renderOriginNode(node: NodeData) {
  const x = node.x, y = node.y;
  return (
    <>
      {/* Outer glow halo */}
      <circle cx={x} cy={y} r="22" fill="url(#star-glow)" />

      {/* Rotating 8-pointed rays */}
      <g className="rm-rotate-star" style={{ transformOrigin: `${x}px ${y}px` }}>
        <line x1={x} y1={y - 20} x2={x} y2={y + 20} stroke="rgba(200,230,255,0.5)" strokeWidth="0.8" />
        <line x1={x - 20} y1={y} x2={x + 20} y2={y} stroke="rgba(200,230,255,0.5)" strokeWidth="0.8" />
        <line x1={x - 14} y1={y - 14} x2={x + 14} y2={y + 14} stroke="rgba(200,230,255,0.3)" strokeWidth="0.5" />
        <line x1={x + 14} y1={y - 14} x2={x - 14} y2={y + 14} stroke="rgba(200,230,255,0.3)" strokeWidth="0.5" />
      </g>

      {/* Inner glow */}
      <circle cx={x} cy={y} r="9" fill="rgba(200,230,255,0.12)" />
      {/* Bright core */}
      <circle cx={x} cy={y} r="5" fill="#fff" />
      <circle cx={x} cy={y} r="3" fill="rgba(220,240,255,1)" />

      {/* Labels */}
      {!node.isMobile && (
        <>
          <text x={x + 30} y={y - 8} fill={C.label} fontSize="14" fontFamily="var(--font-mono)" fontWeight="600" letterSpacing="0.2em">{node.label}</text>
          <text x={x + 30} y={y + 10} fill={C.subLabel} fontSize="10" fontFamily="var(--font-mono)" letterSpacing="0.1em">{node.sub}</text>
        </>
      )}
    </>
  );
}

/* ═══ MAJOR — Ringed Planet (Saturn) ═══ */
function renderMajorNode(node: NodeData) {
  const x = node.x, y = node.y;
  const connLen = 40;
  const dir = node.xPct < 0.5 ? 1 : node.xPct > 0.5 ? -1 : 0;
  const labelX = dir !== 0 ? x + dir * (connLen + 16) : x + 28;
  const labelAnchor = dir === -1 ? "end" : "start";

  return (
    <>
      {/* Atmospheric glow */}
      <circle cx={x} cy={y} r="28" fill="rgba(100,180,220,0.03)" />

      {/* Rotating ring system — behind planet (lower half) */}
      <g className="rm-rotate-ring" style={{ transformOrigin: `${x}px ${y}px` }}>
        {/* Outer ring */}
        <ellipse cx={x} cy={y} rx="28" ry="7" fill="none" stroke="rgba(140,200,240,0.18)" strokeWidth="0.8" />
        {/* Main ring */}
        <ellipse cx={x} cy={y} rx="24" ry="6" fill="none" stroke="rgba(140,200,240,0.45)" strokeWidth="2" />
        {/* Inner ring (Cassini division gap) */}
        <ellipse cx={x} cy={y} rx="19" ry="5" fill="none" stroke="rgba(140,200,240,0.12)" strokeWidth="0.6" />
      </g>

      {/* Planet body — sphere shading */}
      <circle cx={x} cy={y} r="10" fill="url(#planet-body)" />
      {/* Specular highlight */}
      <circle cx={x - 3} cy={y - 3} r="4" fill="rgba(200,230,255,0.1)" />

      {/* Connector & Labels */}
      {dir !== 0 && !node.isMobile && (
        <line x1={x + dir * 20} y1={y} x2={x + dir * connLen} y2={y} stroke={C.major} strokeWidth="0.8" strokeDasharray="4 4" />
      )}
      {!node.isMobile && (
        <>
          <text x={labelX} y={y - 8} fill={C.label} fontSize="14" fontFamily="var(--font-mono)" fontWeight="600" letterSpacing="0.15em" textAnchor={labelAnchor}>{node.label}</text>
          <text x={labelX} y={y + 10} fill={C.subLabel} fontSize="10" fontFamily="var(--font-mono)" letterSpacing="0.08em" textAnchor={labelAnchor}>{node.sub}</text>
        </>
      )}
    </>
  );
}

/* ═══ CHECKPOINT — Small Star ═══ */
function renderCheckpointNode(node: NodeData) {
  const x = node.x, y = node.y;
  const connLen = 40;
  const dir = node.xPct < 0.5 ? 1 : node.xPct > 0.5 ? -1 : 0;
  const labelX = dir !== 0 ? x + dir * (connLen + 16) : x + 28;
  const labelAnchor = dir === -1 ? "end" : "start";

  return (
    <>
      {/* Glow */}
      <circle cx={x} cy={y} r="14" fill="url(#star-glow-sm)" />

      {/* Rotating 4-pointed cross */}
      <g className="rm-rotate-star-sm" style={{ transformOrigin: `${x}px ${y}px` }}>
        <line x1={x} y1={y - 12} x2={x} y2={y + 12} stroke="rgba(180,210,240,0.4)" strokeWidth="0.6" />
        <line x1={x - 12} y1={y} x2={x + 12} y2={y} stroke="rgba(180,210,240,0.4)" strokeWidth="0.6" />
        <line x1={x - 7} y1={y - 7} x2={x + 7} y2={y + 7} stroke="rgba(180,210,240,0.2)" strokeWidth="0.4" />
        <line x1={x + 7} y1={y - 7} x2={x - 7} y2={y + 7} stroke="rgba(180,210,240,0.2)" strokeWidth="0.4" />
      </g>

      {/* Core */}
      <circle cx={x} cy={y} r="3.5" fill="#fff" />
      <circle cx={x} cy={y} r="2" fill="rgba(200,230,255,1)" />

      {/* Connector & Labels */}
      {dir !== 0 && !node.isMobile && (
        <line x1={x + dir * 10} y1={y} x2={x + dir * connLen} y2={y} stroke={C.minor} strokeWidth="0.6" strokeDasharray="3 5" />
      )}
      {!node.isMobile && (
        <>
          <text x={labelX} y={y - 8} fill={C.label} fontSize="12" fontFamily="var(--font-mono)" fontWeight="500" letterSpacing="0.12em" textAnchor={labelAnchor}>{node.label}</text>
          <text x={labelX} y={y + 10} fill={C.subLabel} fontSize="9" fontFamily="var(--font-mono)" letterSpacing="0.08em" textAnchor={labelAnchor}>{node.sub}</text>
        </>
      )}
    </>
  );
}

/* ═══ BRANCH — Black Hole ═══ */
function renderBranchNode(node: NodeData) {
  const x = node.x, y = node.y;
  const connLen = 40;
  const dir = node.xPct < 0.5 ? 1 : node.xPct > 0.5 ? -1 : 0;
  const labelX = dir !== 0 ? x + dir * (connLen + 16) : x + 28;
  const labelAnchor = dir === -1 ? "end" : "start";

  return (
    <>
      {/* Gravitational lensing halos */}
      <circle cx={x} cy={y} r="20" fill="url(#hole-glow)" />
      <circle cx={x} cy={y} r="16" fill="none" stroke="rgba(180,140,240,0.06)" strokeWidth="0.5" />
      <circle cx={x} cy={y} r="12" fill="none" stroke="rgba(180,140,240,0.1)" strokeWidth="0.4" />

      {/* Fast-spinning accretion disk */}
      <g className="rm-rotate-hole" style={{ transformOrigin: `${x}px ${y}px` }}>
        {/* Outer disk */}
        <ellipse cx={x} cy={y} rx="18" ry="5" fill="none" stroke="rgba(200,150,255,0.2)" strokeWidth="0.6" />
        {/* Main bright disk */}
        <ellipse cx={x} cy={y} rx="14" ry="4" fill="none" stroke="rgba(200,160,255,0.5)" strokeWidth="1.5" />
        {/* Inner hot ring */}
        <ellipse cx={x} cy={y} rx="9" ry="2.5" fill="none" stroke="rgba(220,180,255,0.3)" strokeWidth="0.8" />
      </g>

      {/* Event horizon — the void */}
      <circle cx={x} cy={y} r="5" fill="#000" stroke="rgba(160,120,220,0.35)" strokeWidth="0.8" />
      {/* Singularity glow */}
      <circle cx={x} cy={y} r="1.5" fill="rgba(200,160,255,0.7)" />

      {/* Connector & Labels */}
      {dir !== 0 && !node.isMobile && (
        <line x1={x + dir * 10} y1={y} x2={x + dir * connLen} y2={y} stroke="rgba(180,140,240,0.4)" strokeWidth="0.6" strokeDasharray="2 6" />
      )}
      {!node.isMobile && (
        <>
          <text x={labelX} y={y - 8} fill={C.label} fontSize="12" fontFamily="var(--font-mono)" fontWeight="500" letterSpacing="0.12em" textAnchor={labelAnchor}>{node.label}</text>
          <text x={labelX} y={y + 10} fill={C.subLabel} fontSize="9" fontFamily="var(--font-mono)" letterSpacing="0.08em" textAnchor={labelAnchor}>{node.sub}</text>
        </>
      )}
    </>
  );
}

/* ═══ DESTINATION — Beacon Star ═══ */
function renderDestinationNode(node: NodeData) {
  const x = node.x, y = node.y;
  return (
    <>
      {/* Beacon glow */}
      <circle cx={x} cy={y} r="20" fill="url(#star-glow)" />

      {/* Rotating concentric halo */}
      <g className="rm-rotate-beacon" style={{ transformOrigin: `${x}px ${y}px` }}>
        <circle cx={x} cy={y} r="16" fill="none" stroke="rgba(140,200,240,0.12)" strokeWidth="0.6" strokeDasharray="4 4" />
        <circle cx={x} cy={y} r="12" fill="none" stroke="rgba(140,200,240,0.2)" strokeWidth="0.5" strokeDasharray="2 6" />
      </g>

      {/* Counter-rotating rays */}
      <g className="rm-rotate-star" style={{ transformOrigin: `${x}px ${y}px` }}>
        <line x1={x} y1={y - 14} x2={x} y2={y + 14} stroke="rgba(200,230,255,0.35)" strokeWidth="0.6" />
        <line x1={x - 14} y1={y} x2={x + 14} y2={y} stroke="rgba(200,230,255,0.35)" strokeWidth="0.6" />
        <line x1={x - 10} y1={y - 10} x2={x + 10} y2={y + 10} stroke="rgba(200,230,255,0.2)" strokeWidth="0.4" />
        <line x1={x + 10} y1={y - 10} x2={x - 10} y2={y + 10} stroke="rgba(200,230,255,0.2)" strokeWidth="0.4" />
      </g>

      {/* Core */}
      <circle cx={x} cy={y} r="4" fill="#fff" />
      <circle cx={x} cy={y} r="2.5" fill="rgba(200,230,255,1)" />

      {/* Labels (below) */}
      {!node.isMobile && (
        <>
          <text x={x} y={y + 30} fill={C.label} fontSize="13" fontFamily="var(--font-mono)" fontWeight="600" letterSpacing="0.2em" textAnchor="middle">{node.label}</text>
          <text x={x} y={y + 46} fill={C.subLabel} fontSize="9" fontFamily="var(--font-mono)" letterSpacing="0.1em" textAnchor="middle">{node.sub}</text>
        </>
      )}
    </>
  );
}

function renderNode(node: NodeData) {
  switch (node.type) {
    case "origin": return renderOriginNode(node);
    case "major": return renderMajorNode(node);
    case "checkpoint": return renderCheckpointNode(node);
    case "branch": return renderBranchNode(node);
    case "destination": return renderDestinationNode(node);
  }
}

/* ────────────────────────────────────────────
   MAIN COMPONENT
   
   Performance architecture:
   - ONE passive scroll listener (not ~40 useTransform hooks)
   - Only triggers React re-render when a node NEWLY enters viewport (~6 times total)
   - Once all revealed, scroll handler is a no-op
   - CSS transitions handle all visual animation (GPU-composited)
   - Zero framer-motion overhead
   ──────────────────────────────────────────── */
export default function GlobalRoadmap() {
  const [nodes, setNodes] = useState<NodeData[]>([]);
  const [segments, setSegments] = useState<{d: string, startY: number, endY: number}[]>([]);
  const [svgHeight, setSvgHeight] = useState(0);
  const [svgWidth, setSvgWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track which nodes/segments have been revealed
  const [revealed, setRevealed] = useState<Set<string>>(new Set());
  const [revealedSegs, setRevealedSegs] = useState<Set<number>>(new Set());
  const allRevealedRef = useRef(false);
  // Active node tracking — uses DOM manipulation, not React state, for zero re-render cost
  const activeNodeRef = useRef<string | null>(null);
  const activeSegRef = useRef<number | null>(null);

  // ── Layout measurement (unchanged logic) ──
  useEffect(() => {
    const update = () => {
      if (!containerRef.current) return;

      const cRect = containerRef.current.getBoundingClientRect();
      const cTop = window.scrollY + cRect.top;
      const w = cRect.width;
      const built: NodeData[] = [];
      const isMobile = w < 1024;

      SECTIONS.forEach((sec) => {
        if (sec.id === "hero") {
          const linksEl = document.getElementById("hero-links");
          if (!linksEl) return;
          const rLinks = linksEl.getBoundingClientRect();
          const x = rLinks.left - cRect.left + (rLinks.width / 2);
          const y = window.scrollY + rLinks.bottom + 60 - cTop;
          built.push({ ...sec, x, y, isMobile });
          return;
        }

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

  // ── Single scroll listener for reveal + active tracking ──
  // Reveals fire React re-renders (~6 times total)
  // Active tracking uses direct DOM (zero re-renders)
  useEffect(() => {
    if (nodes.length === 0) return;
    const triggerOffset = window.innerHeight * 0.6;
    let ticking = false;

    const check = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const sy = window.scrollY;
        const viewCenter = sy + window.innerHeight * 0.45;

        // ── Reveal tracking (fires until all revealed) ──
        if (!allRevealedRef.current) {
          setRevealed(prev => {
            let changed = false;
            const next = new Set(prev);
            for (const node of nodes) {
              if (!next.has(node.id) && sy >= node.y - triggerOffset) {
                next.add(node.id);
                changed = true;
              }
            }
            if (!changed) return prev;
            if (next.size === nodes.length) allRevealedRef.current = true;
            return next;
          });

          setRevealedSegs(prev => {
            let changed = false;
            const next = new Set(prev);
            for (let i = 0; i < segments.length; i++) {
              if (!next.has(i) && sy >= Math.max(0, segments[i].startY - triggerOffset)) {
                next.add(i);
                changed = true;
              }
            }
            if (!changed) return prev;
            return next;
          });
        }

        // ── Active node tracking (direct DOM, no React re-render) ──
        // Find the node closest to the viewport center
        let closestId: string | null = null;
        let closestDist = Infinity;
        for (const node of nodes) {
          const dist = Math.abs(node.y - viewCenter);
          if (dist < closestDist) {
            closestDist = dist;
            closestId = node.id;
          }
        }

        // Only update DOM if active node changed
        if (closestId !== activeNodeRef.current) {
          // Remove old active
          if (activeNodeRef.current) {
            const oldEl = containerRef.current?.querySelector(`[data-node="${activeNodeRef.current}"]`);
            oldEl?.classList.remove("rm-active");
          }
          // Apply new active
          if (closestId) {
            const newEl = containerRef.current?.querySelector(`[data-node="${closestId}"]`);
            newEl?.classList.add("rm-active");
          }
          activeNodeRef.current = closestId;
        }

        // Active path segment — the one whose range contains viewCenter
        let activeSeg: number | null = null;
        for (let i = 0; i < segments.length; i++) {
          if (viewCenter >= segments[i].startY && viewCenter <= segments[i].endY) {
            activeSeg = i;
            break;
          }
        }
        if (activeSeg !== activeSegRef.current) {
          if (activeSegRef.current !== null) {
            const oldPath = containerRef.current?.querySelector(`[data-seg="${activeSegRef.current}"]`);
            oldPath?.classList.remove("rm-path-active");
          }
          if (activeSeg !== null) {
            const newPath = containerRef.current?.querySelector(`[data-seg="${activeSeg}"]`);
            newPath?.classList.add("rm-path-active");
          }
          activeSegRef.current = activeSeg;
        }

        ticking = false;
      });
    };

    window.addEventListener("scroll", check, { passive: true });
    check(); // Initial check
    return () => window.removeEventListener("scroll", check);
  }, [nodes, segments]);

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
            {/* Path gradient */}
            <linearGradient id="journey-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="rgba(140,200,240,0.8)" />
              <stop offset="50%"  stopColor="rgba(130,180,220,0.5)" />
              <stop offset="100%" stopColor="rgba(140,200,240,0.3)" />
            </linearGradient>

            {/* ── Celestial body gradients ── */}
            {/* Star glow — large */}
            <radialGradient id="star-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(200,230,255,0.25)" />
              <stop offset="40%" stopColor="rgba(140,200,240,0.08)" />
              <stop offset="100%" stopColor="rgba(140,200,240,0)" />
            </radialGradient>
            {/* Star glow — small */}
            <radialGradient id="star-glow-sm" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(180,210,240,0.2)" />
              <stop offset="50%" stopColor="rgba(140,180,220,0.06)" />
              <stop offset="100%" stopColor="rgba(140,180,220,0)" />
            </radialGradient>
            {/* Saturn planet body — sphere shading */}
            <linearGradient id="planet-body" x1="25%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(160,210,240,0.85)" />
              <stop offset="40%" stopColor="rgba(80,140,190,0.9)" />
              <stop offset="100%" stopColor="rgba(25,55,85,0.95)" />
            </linearGradient>
            {/* Black hole glow */}
            <radialGradient id="hole-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(180,140,240,0.12)" />
              <stop offset="50%" stopColor="rgba(160,120,220,0.04)" />
              <stop offset="100%" stopColor="rgba(160,120,220,0)" />
            </radialGradient>

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

          {/* ── Layer 0: Topographic contour rings (static) ── */}
          {nodes.map((n) => (
            <ContourRings key={`c-${n.id}`} node={n} />
          ))}

          {/* ── Layer 1: Coordinate markers (static) ── */}
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

          {/* ── Layer 3: Nebula blooms (CSS-transitioned) ── */}
          {nodes.map((n) => {
            const isVisible = revealed.has(n.id);
            const isMajor = n.type === "major" || n.type === "origin";
            const size = isMajor ? 200 : 120;
            return (
              <g key={`neb-${n.id}`} className={`rm-nebula ${isVisible ? "rm-visible" : ""}`}>
                <circle cx={n.x} cy={n.y} r={size} fill={`url(#nebula-${n.id})`} />
                {isMajor && (
                  <circle cx={n.x + 40} cy={n.y - 30} r={size * 0.6} fill={`url(#nebula-violet-${n.id})`} />
                )}
              </g>
            );
          })}

          {/* ── Layer 4: Illuminated path segments (CSS-drawn) ── */}
          {segments.map((s, i) => (
            <path
              key={`seg-${i}`}
              data-seg={i}
              d={s.d}
              fill="none"
              stroke="url(#journey-grad)"
              strokeWidth="1.5"
              pathLength={1}
              className={`rm-path ${revealedSegs.has(i) ? "rm-visible" : ""}`}
            />
          ))}

          {/* ── Layer 5: Orbital arcs (CSS-transitioned) ── */}
          {nodes.filter(n => n.type === "major").map((n) => (
            <g key={`orb-${n.id}`} className={`rm-orbital ${revealed.has(n.id) ? "rm-visible" : ""}`}>
              <ellipse cx={n.x} cy={n.y} rx="55" ry="28" fill="none" stroke={C.major} strokeWidth="0.6" strokeDasharray="3 8" transform={`rotate(-15 ${n.x} ${n.y})`} />
              <ellipse cx={n.x} cy={n.y} rx="75" ry="38" fill="none" stroke={C.violet} strokeWidth="0.5" strokeDasharray="2 12" transform={`rotate(10 ${n.x} ${n.y})`} />
            </g>
          ))}

          {/* ── Layer 6: Nodes (CSS-transitioned) ── */}
          {nodes.map((n) => (
            <g
              key={n.id}
              data-node={n.id}
              className={`rm-node ${revealed.has(n.id) ? "rm-visible" : ""}`}
              style={{ transformOrigin: `${n.x}px ${n.y}px` }}
            >
              {renderNode(n)}
            </g>
          ))}
        </svg>
      )}
    </div>
  );
}
