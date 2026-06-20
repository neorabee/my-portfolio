"use client";

import { useEffect, useState, useRef } from "react";
import { useRoadmap } from "./RoadmapContext";
import InfrastructureDock from "./InfrastructureDock";

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

type ObjectType = "star" | "binary-star" | "pulsar" | "ringed-planet" | "moon" | "nebula" | "beacon" | "unknown-signal" | "black-hole";

const SECTIONS = [
  { id: "hero",         type: "star"           as const, label: "ORIGIN",       sub: "Starting Point",    xPct: 0.50, yPct: -1, regionLabel: "" },
  { id: "projects",     type: "binary-star"    as const, label: "PROJECTS",     sub: "Selected Works",    xPct: 0.08, yPct: 0.46, regionLabel: "" },
  { id: "pengu",        type: "pulsar"         as const, label: "AUTONOMY",     sub: "Pengu OS",          xPct: 0.92, yPct: 0.36, regionLabel: "" },
  { id: "profile",      type: "moon"           as const, label: "PROFILE",      sub: "Systems & Stack",   xPct: 0.08, yPct: 0.60, regionLabel: "" },
  { id: "contact",      type: "beacon"         as const, label: "CONTACT",      sub: "Secure Channel",    xPct: 0.90, yPct: 0.35, regionLabel: "" },
  { id: "explorations", type: "nebula"         as const, label: "EXPLORATIONS", sub: "Side Quests",       xPct: 0.82, yPct: 0.45, regionLabel: "" },
];

interface NodeData {
  id: string;
  type: ObjectType;
  label: string;
  sub: string;
  x: number;
  y: number;
  xPct: number;
  isMobile?: boolean;
  regionLabel?: string;
}

function ContourRings({ node }: { node: NodeData }) {
  const isMajor = ["star", "binary-star", "pulsar", "black-hole"].includes(node.type);
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

function renderStarNode(node: NodeData) {
  const x = node.x, y = node.y;
  return (
    <>
      
      <circle cx={x} cy={y} r="35" fill="url(#star-glow)" />

      <g className="rm-rotate-star" style={{ transformOrigin: `${x}px ${y}px` }}>
        <line x1={x} y1={y - 25} x2={x} y2={y + 25} stroke="rgba(200,230,255,0.8)" strokeWidth="1.5" />
        <line x1={x - 25} y1={y} x2={x + 25} y2={y} stroke="rgba(200,230,255,0.8)" strokeWidth="1.5" />
        <line x1={x - 18} y1={y - 18} x2={x + 18} y2={y + 18} stroke="rgba(200,230,255,0.5)" strokeWidth="1" />
        <line x1={x + 18} y1={y - 18} x2={x - 18} y2={y + 18} stroke="rgba(200,230,255,0.5)" strokeWidth="1" />
      </g>

      <circle cx={x} cy={y} r="12" fill="rgba(200,230,255,0.25)" />
      
      <circle cx={x} cy={y} r="6" fill="#fff" filter="drop-shadow(0 0 5px #fff)" />
      <circle cx={x} cy={y} r="3" fill="rgba(220,240,255,1)" />

      {!node.isMobile && (
        <>
          <text x={x + 30} y={y - 8} fill={C.label} fontSize="14" fontFamily="var(--font-mono)" fontWeight="600" letterSpacing="0.2em">{node.label}</text>
          <text x={x + 30} y={y + 10} fill={C.subLabel} fontSize="10" fontFamily="var(--font-mono)" letterSpacing="0.1em">{node.sub}</text>
        </>
      )}
    </>
  );
}

function renderRingedPlanetNode(node: NodeData) {
  const x = node.x, y = node.y;
  const connLen = 40;
  const dir = node.xPct < 0.5 ? 1 : node.xPct > 0.5 ? -1 : 0;
  const labelX = dir !== 0 ? x + dir * (connLen + 16) : x + 28;
  const labelAnchor = dir === -1 ? "end" : "start";

  return (
    <>
      
      <circle cx={x} cy={y} r="50" fill="rgba(100,180,220,0.15)" />

      <g className="rm-rotate-ring" style={{ transformOrigin: `${x}px ${y}px` }}>
        
        <ellipse cx={x} cy={y} rx="45" ry="12" fill="none" stroke="rgba(140,200,240,0.4)" strokeWidth="1.5" />
        
        <ellipse cx={x} cy={y} rx="38" ry="10" fill="none" stroke="rgba(140,200,240,0.8)" strokeWidth="4" />
        
        <ellipse cx={x} cy={y} rx="32" ry="8" fill="none" stroke="rgba(140,200,240,0.25)" strokeWidth="1" />
      </g>

      <circle cx={x} cy={y} r="18" fill="url(#planet-body)" filter="drop-shadow(0 0 10px rgba(100,180,220,0.4))" />
      
      <circle cx={x - 5} cy={y - 5} r="6" fill="rgba(200,230,255,0.2)" />

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

function renderMoonNode(node: NodeData) {
  const x = node.x, y = node.y;
  const connLen = 40;
  const dir = node.xPct < 0.5 ? 1 : node.xPct > 0.5 ? -1 : 0;
  const labelX = dir !== 0 ? x + dir * (connLen + 16) : x + 28;
  const labelAnchor = dir === -1 ? "end" : "start";

  return (
    <>
      <circle cx={x} cy={y} r="18" fill="rgba(140,200,240,0.05)" />
      
      <circle cx={x} cy={y} r="8" fill="rgba(140,180,220,0.8)" />
      
      <circle cx={x - 2} cy={y - 2} r="8" fill="rgba(10,15,30,0.6)" />

      {dir !== 0 && !node.isMobile && (
        <line x1={x + dir * 12} y1={y} x2={x + dir * connLen} y2={y} stroke={C.minor} strokeWidth="0.6" strokeDasharray="3 5" />
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

function renderBinaryStarNode(node: NodeData) {
  const x = node.x, y = node.y;
  const connLen = 40;
  const dir = node.xPct < 0.5 ? 1 : node.xPct > 0.5 ? -1 : 0;
  const labelX = dir !== 0 ? x + dir * (connLen + 16) : x + 28;
  const labelAnchor = dir === -1 ? "end" : "start";

  return (
    <>
      <circle cx={x} cy={y} r="45" fill="url(#star-glow)" />
      
      <circle cx={x} cy={y} r="16" fill="none" stroke="rgba(140,200,240,0.2)" strokeWidth="0.5" strokeDasharray="2 4" />

      <g className="rm-rotate-slow" style={{ transformOrigin: `${x}px ${y}px` }}>
        <circle cx={x - 16} cy={y} r="6" fill="#fff" filter="drop-shadow(0 0 6px rgba(200,230,255,0.8))" />
        <circle cx={x + 16} cy={y} r="4" fill="rgba(180,220,255,1)" filter="drop-shadow(0 0 4px rgba(140,200,240,0.8))" />
      </g>

      {!node.isMobile && (
        <>
          <text x={x} y={y - 65} fill={C.label} fontSize="14" fontFamily="var(--font-mono)" fontWeight="600" letterSpacing="0.15em" textAnchor="middle">{node.label}</text>
          <text x={x} y={y - 48} fill={C.subLabel} fontSize="10" fontFamily="var(--font-mono)" letterSpacing="0.08em" textAnchor="middle">{node.sub}</text>
        </>
      )}
    </>
  );
}

function renderPulsarNode(node: NodeData) {
  const x = node.x, y = node.y;
  const connLen = 40;
  const dir = node.xPct < 0.5 ? 1 : node.xPct > 0.5 ? -1 : 0;
  const labelX = dir !== 0 ? x + dir * (connLen + 16) : x + 28;
  const labelAnchor = dir === -1 ? "end" : "start";

  return (
    <>
      <circle cx={x} cy={y} r="35" fill="url(#star-glow-sm)" />

      <g className="rm-rotate-fast" style={{ transformOrigin: `${x}px ${y}px` }}>
        
        <ellipse cx={x} cy={y} rx="3" ry="40" fill="url(#pulsar-jet)" />
      </g>

      <circle cx={x} cy={y} r="3" fill="#fff" filter="drop-shadow(0 0 8px rgba(255,255,255,1))" />
      <circle cx={x} cy={y} r="8" fill="none" stroke="rgba(200,230,255,0.6)" strokeWidth="0.5" />

      {dir !== 0 && !node.isMobile && (
        <line x1={x + dir * 15} y1={y} x2={x + dir * connLen} y2={y} stroke={C.major} strokeWidth="0.8" strokeDasharray="4 4" />
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

function renderNebulaNode(node: NodeData) {
  const x = node.x, y = node.y;
  const connLen = 40;
  const dir = node.xPct < 0.5 ? 1 : node.xPct > 0.5 ? -1 : 0;
  const labelX = dir !== 0 ? x + dir * (connLen + 16) : x + 28;
  const labelAnchor = dir === -1 ? "end" : "start";

  return (
    <>
      <g className="rm-pulse-slow" style={{ transformOrigin: `${x}px ${y}px` }}>
        <circle cx={x - 8} cy={y - 6} r="25" fill="url(#star-glow)" opacity="0.6" />
        <circle cx={x + 10} cy={y + 5} r="20" fill="url(#star-glow-sm)" opacity="0.8" />
        <circle cx={x - 2} cy={y + 12} r="18" fill="url(#hole-glow)" opacity="0.5" />
      </g>

      <circle cx={x - 5} cy={y} r="1.5" fill="#fff" />
      <circle cx={x + 6} cy={y + 4} r="1" fill="#fff" opacity="0.6" />
      <circle cx={x - 2} cy={y - 10} r="1" fill="#fff" opacity="0.8" />

      {dir !== 0 && !node.isMobile && (
        <line x1={x + dir * 20} y1={y} x2={x + dir * connLen} y2={y} stroke="rgba(180,140,240,0.4)" strokeWidth="0.6" strokeDasharray="2 6" />
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

function renderUnknownSignalNode(node: NodeData) {
  const x = node.x, y = node.y;
  const connLen = 40;
  const dir = node.xPct < 0.5 ? 1 : node.xPct > 0.5 ? -1 : 0;
  const labelX = dir !== 0 ? x + dir * (connLen + 16) : x + 28;
  const labelAnchor = dir === -1 ? "end" : "start";

  return (
    <>
      
      <g className="rm-pulse-radar" style={{ transformOrigin: `${x}px ${y}px` }}>
        <circle cx={x} cy={y} r="30" fill="none" stroke="rgba(140,200,240,0.5)" strokeWidth="0.5" />
      </g>
      <circle cx={x} cy={y} r="20" fill="none" stroke="rgba(140,200,240,0.2)" strokeWidth="0.5" strokeDasharray="1 4" />

      <rect x={x - 3} y={y - 3} width="6" height="6" fill="none" stroke="#fff" strokeWidth="1" className="rm-glitch" />

      {dir !== 0 && !node.isMobile && (
        <line x1={x + dir * 15} y1={y} x2={x + dir * connLen} y2={y} stroke="rgba(140,200,240,0.3)" strokeWidth="0.6" strokeDasharray="1 3" />
      )}
      {!node.isMobile && (
        <>
          <text x={labelX} y={y - 8} fill={C.label} fontSize="12" fontFamily="var(--font-mono)" fontWeight="500" letterSpacing="0.12em" textAnchor={labelAnchor} opacity="0.6">{node.label}</text>
          <text x={labelX} y={y + 10} fill={C.subLabel} fontSize="9" fontFamily="var(--font-mono)" letterSpacing="0.08em" textAnchor={labelAnchor} opacity="0.6">{node.sub}</text>
        </>
      )}
    </>
  );
}

function renderBlackHoleNode(node: NodeData) {
  const x = node.x, y = node.y;
  const connLen = 40;
  const dir = node.xPct < 0.5 ? 1 : node.xPct > 0.5 ? -1 : 0;
  const labelX = dir !== 0 ? x + dir * (connLen + 16) : x + 28;
  const labelAnchor = dir === -1 ? "end" : "start";

  return (
    <>
      
      <circle cx={x} cy={y} r="45" fill="url(#hole-glow)" />
      <circle cx={x} cy={y} r="30" fill="none" stroke="rgba(180,140,240,0.4)" strokeWidth="1.2" />
      <circle cx={x} cy={y} r="20" fill="none" stroke="rgba(180,140,240,0.3)" strokeWidth="0.8" />

      <g className="rm-rotate-hole" style={{ transformOrigin: `${x}px ${y}px` }}>
        
        <ellipse cx={x} cy={y} rx="22" ry="6" fill="none" stroke="rgba(200,150,255,0.4)" strokeWidth="1.2" />
        
        <ellipse cx={x} cy={y} rx="16" ry="4.5" fill="none" stroke="rgba(200,160,255,0.8)" strokeWidth="2.5" />
        
        <ellipse cx={x} cy={y} rx="11" ry="3" fill="none" stroke="rgba(220,180,255,0.6)" strokeWidth="1.5" />
      </g>

      <circle cx={x} cy={y} r="7" fill="#000" stroke="rgba(160,120,220,0.6)" strokeWidth="1.2" />
      
      <circle cx={x} cy={y} r="2.5" fill="rgba(200,160,255,1)" filter="drop-shadow(0 0 4px #fff)" />

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

function renderBeaconNode(node: NodeData) {
  const x = node.x, y = node.y;
  return (
    <>
      
      <circle cx={x} cy={y} r="20" fill="url(#star-glow)" />

      <g className="rm-rotate-beacon" style={{ transformOrigin: `${x}px ${y}px` }}>
        <circle cx={x} cy={y} r="16" fill="none" stroke="rgba(140,200,240,0.12)" strokeWidth="0.6" strokeDasharray="4 4" />
        <circle cx={x} cy={y} r="12" fill="none" stroke="rgba(140,200,240,0.2)" strokeWidth="0.5" strokeDasharray="2 6" />
      </g>

      <g className="rm-rotate-star" style={{ transformOrigin: `${x}px ${y}px` }}>
        <line x1={x} y1={y - 14} x2={x} y2={y + 14} stroke="rgba(200,230,255,0.35)" strokeWidth="0.6" />
        <line x1={x - 14} y1={y} x2={x + 14} y2={y} stroke="rgba(200,230,255,0.35)" strokeWidth="0.6" />
        <line x1={x - 10} y1={y - 10} x2={x + 10} y2={y + 10} stroke="rgba(200,230,255,0.2)" strokeWidth="0.4" />
        <line x1={x + 10} y1={y - 10} x2={x - 10} y2={y + 10} stroke="rgba(200,230,255,0.2)" strokeWidth="0.4" />
      </g>

      <circle cx={x} cy={y} r="4" fill="#fff" />
      <circle cx={x} cy={y} r="2.5" fill="rgba(200,230,255,1)" />

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
    case "star": return renderStarNode(node);
    case "binary-star": return renderBinaryStarNode(node);
    case "pulsar": return renderPulsarNode(node);
    case "ringed-planet": return renderRingedPlanetNode(node);
    case "moon": return renderMoonNode(node);
    case "nebula": return renderNebulaNode(node);
    case "beacon": return renderBeaconNode(node);
    case "unknown-signal": return renderUnknownSignalNode(node);
    case "black-hole": return renderBlackHoleNode(node);
  }
}

export default function GlobalRoadmap() {
const { activeDetour, enterDetour, exitDetour, detourOriginY } = useRoadmap();
  const [nodes, setNodes] = useState<NodeData[]>([]);
  const [segments, setSegments] = useState<{d: string, startY: number, endY: number, isBranch?: boolean, parentId?: string, targetId: string}[]>([]);
  const [svgHeight, setSvgHeight] = useState(0);
  const [svgWidth, setSvgWidth] = useState(0);

  const [dockTriggered, setDockTriggered] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const handleNavigate = (id: string) => {
    if (id === "experience" || id === "upcoming") {
      const parentId = segments.find(s => s.targetId === id)?.parentId;
      enterDetour(id, parentId);
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({
        behavior: "auto",
        block: "start",
});
      }
    }
  };

  const [revealed, setRevealed] = useState<Set<string>>(new Set());
  const [revealedSegs, setRevealedSegs] = useState<Set<number>>(new Set());
  const allRevealedRef = useRef(false);

  const activeNodeRef = useRef<string | null>(null);
  const activeSegRef = useRef<number | null>(null);
  const spacecraftTargetRef = useRef<string | null>(null);
  const animationRef = useRef<number>(0);

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
            endY: c.y,
            targetId: c.id,
            parentId: p.id
          });
        }
        
        const last = built[built.length - 1];
        segs.push({
          d: `M ${last.x},${last.y} L ${last.x},${last.y + 800}`,
          startY: last.y,
          endY: last.y + 800,
          targetId: "end",
          parentId: last.id
        });

        const penguIndex = built.findIndex(n => n.id === "pengu");
        if (penguIndex !== -1) {
          const pengu = built[penguIndex];
          const branchX = isMobile ? w * 0.8 : w * 0.85;
          const branchY = pengu.y + 120;
          
          const upcoming: NodeData = {
            id: "upcoming",
            type: "unknown-signal",
            label: "UPCOMING",
            sub: "Future Objective",
            x: branchX,
            y: branchY,
            xPct: 0,
            isMobile
          };
          
          built.push(upcoming);
          
          segs.push({
            d: `M ${pengu.x},${pengu.y} C ${pengu.x},${pengu.y + 60} ${branchX},${branchY - 60} ${branchX},${branchY}`,
            startY: pengu.y,
            endY: branchY,
            isBranch: true,
            parentId: "pengu",
            targetId: "upcoming"
          });
        }

        const profileIndex = built.findIndex(n => n.id === "profile");
        if (profileIndex !== -1) {
          const profile = built[profileIndex];
          const expX = isMobile ? w * 0.85 : w * 0.25;
          const expY = profile.y + 100;
          
          const experience: NodeData = {
            id: "experience",
            type: "black-hole",
            label: "EXPERIENCE",
            sub: "Trajectory",
            x: expX,
            y: expY,
            xPct: 0,
            isMobile
          };
          
          built.push(experience);
          
          segs.push({
            d: `M ${profile.x},${profile.y} C ${profile.x},${profile.y + 50} ${expX},${expY - 50} ${expX},${expY}`,
            startY: profile.y,
            endY: expY,
            isBranch: true,
            parentId: "profile",
            targetId: "experience"
          });
        }

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
  }, [activeDetour]);

  useEffect(() => {
    if (nodes.length === 0) return;
    const targetId = activeDetour || activeNodeRef.current;
    if (targetId && targetId !== spacecraftTargetRef.current) {
      const scEl = containerRef.current?.querySelector("#rm-spacecraft") as SVGGElement | null;
      if (scEl) {
        const targetNode = nodes.find(n => n.id === targetId);
        if (targetNode) {
          scEl.style.transform = `translate(${targetNode.x}px, ${targetNode.y}px)`;
          scEl.style.opacity = "1";
        }
      }
      spacecraftTargetRef.current = targetId;
    }
  }, [activeDetour, nodes]);

  useEffect(() => {
    if (nodes.length === 0) return;
    const triggerOffset = window.innerHeight * 0.75;
    let ticking = false;

    const check = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const sy = window.scrollY;
        const viewCenter = sy + window.innerHeight * 0.45;

        if (!allRevealedRef.current) {
          setRevealed(prev => {
            let changed = false;
            let next: Set<string> | null = null;
            for (const node of nodes) {
              if (!prev.has(node.id) && sy >= node.y - triggerOffset) {
                if (!next) next = new Set(prev);
                next.add(node.id);
                changed = true;
              }
            }
            if (!changed) return prev;
            if (next!.size === nodes.length) allRevealedRef.current = true;
            return next!;
          });

          setRevealedSegs(prev => {
            let changed = false;
            let next: Set<number> | null = null;
            for (let i = 0; i < segments.length; i++) {
              if (!prev.has(i) && sy >= Math.max(0, segments[i].startY - triggerOffset)) {
                if (!next) next = new Set(prev);
                next.add(i);
                changed = true;
              }
            }
            if (!changed) return prev;
            return next!;
          });
        }

        let closestId: string | null = null;
        let closestDist = Infinity;
        for (const node of nodes) {
          const dist = Math.abs(node.y - viewCenter);
          if (dist < closestDist) {
            closestDist = dist;
            closestId = node.id;
          }
        }

        if (closestId !== activeNodeRef.current) {

          if (activeNodeRef.current) {
            const oldEl = containerRef.current?.querySelector(`[data-node="${activeNodeRef.current}"]`);
            oldEl?.classList.remove("rm-active");
          }

          if (closestId) {
            const newEl = containerRef.current?.querySelector(`[data-node="${closestId}"]`);
            newEl?.classList.add("rm-active");
            if (closestId === "projects") {
              setDockTriggered(true);
            }
          }
          activeNodeRef.current = closestId;
        }

        let activeSeg: number | null = null;
        for (let i = 0; i < segments.length; i++) {
          if (!segments[i].isBranch && viewCenter >= segments[i].startY && viewCenter <= segments[i].endY) {
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

        segments.forEach((seg, i) => {
          if (seg.isBranch && seg.parentId) {
            const branchEl = containerRef.current?.querySelector(`[data-seg="${i}"]`);
            if (activeNodeRef.current === seg.parentId) {
              branchEl?.classList.add("rm-branch-illuminated");
            } else {
              branchEl?.classList.remove("rm-branch-illuminated");
            }
          }
        });

        const currentTargetId = activeDetour || closestId;
        if (currentTargetId && currentTargetId !== spacecraftTargetRef.current) {
          const currentId = spacecraftTargetRef.current || nodes[0]?.id;
          spacecraftTargetRef.current = currentTargetId;
          
          const scEl = containerRef.current?.querySelector('#rm-spacecraft') as SVGGElement | null;
          if (scEl) {
            const startNode = nodes.find(n => n.id === currentId);
            const endNode = nodes.find(n => n.id === currentTargetId);
            
            if (startNode && endNode) {
              const seg = segments.find(s => 
                (s.parentId === startNode.id && s.targetId === endNode.id) || 
                (s.parentId === endNode.id && s.targetId === startNode.id)
              );
              
              const sx = startNode.x;
              const sy = startNode.y;
              const ex = endNode.x;
              const ey = endNode.y;
              
              if (animationRef.current) cancelAnimationFrame(animationRef.current);
              scEl.style.opacity = "1";
              
              const duration = 800;
              const startTime = performance.now();
              
              if (!seg) {

                const tick = (now: number) => {
                  let p = (now - startTime) / duration;
                  if (p > 1) p = 1;
                  const ease = 1 - Math.pow(1 - p, 3);
                  const cx = sx + (ex - sx) * ease;
                  const cy = sy + (ey - sy) * ease;
                  
                  const dx = ex - sx;
                  const dy = ey - sy;
                  let angle = Math.atan2(dy, dx) * (180 / Math.PI);
                  scEl.style.transform = `translate(${cx}px, ${cy - 28}px) rotate(${angle + 45}deg)`;
                  
                  if (p < 1) animationRef.current = requestAnimationFrame(tick);
                };
                animationRef.current = requestAnimationFrame(tick);
              } else {

                const pathEl = document.createElementNS("http://www.w3.org/2000/svg", "path");
                pathEl.setAttribute("d", seg.d);
                const totalLen = pathEl.getTotalLength();
                const isForward = (seg.parentId === startNode.id);
                
                const tick = (now: number) => {
                  let p = (now - startTime) / duration;
                  if (p > 1) p = 1;
                  const ease = 1 - Math.pow(1 - p, 3);
                  const dist = isForward ? totalLen * ease : totalLen * (1 - ease);
                  
                  const pt = pathEl.getPointAtLength(dist);

                  const pt2 = pathEl.getPointAtLength(Math.min(totalLen, dist + 1));
                  const dx = pt2.x - pt.x;
                  const dy = pt2.y - pt.y;
                  let angle = Math.atan2(dy, dx) * (180 / Math.PI);
                  if (!isForward) angle += 180;
                  
                  scEl.style.transform = `translate(${pt.x}px, ${pt.y - 28}px) rotate(${angle + 45}deg)`;
                  
                  if (p < 1) animationRef.current = requestAnimationFrame(tick);
                };
                animationRef.current = requestAnimationFrame(tick);
              }
            }
          }
        }

        ticking = false;
      });
    };

    window.addEventListener("scroll", check, { passive: true });
    check();
    return () => window.removeEventListener("scroll", check);
  }, [nodes, segments]);

  useEffect(() => {
    if (!activeDetour) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        exitDetour();

      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeDetour, exitDetour]);

  let detourDx = 0;
  let detourDy = 0;
  if (activeDetour === "experience" && nodes.length > 0) {
    const expNode = nodes.find(n => n.id === "experience");
    if (expNode) {
      const targetX = svgWidth >= 1024 ? svgWidth * 0.75 : svgWidth * 0.15;
      detourDx = targetX - expNode.x;
      const targetY = detourOriginY + 150;
      detourDy = targetY - expNode.y;
    }
  }

  return (
    <>
      <div
        ref={containerRef}
        className="hidden lg:block absolute top-0 left-0 w-full pointer-events-none z-[5]"
        style={{ height: svgHeight > 0 ? svgHeight : "100%" }}
      >
      {nodes.length > 1 && segments.length > 0 && svgWidth > 0 && (
        <svg
          className="w-full text-white overflow-visible transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] origin-center"
          width={svgWidth}
          height={svgHeight}
          style={{ 
            transform: activeDetour === "experience" ? `translate(${detourDx}px, ${detourDy}px)` : 'translate(0px, 0px)',
            opacity: 1,
            willChange: "transform, opacity"
          }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            
            <linearGradient id="journey-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="rgba(140,200,240,0.8)" />
              <stop offset="50%"  stopColor="rgba(130,180,220,0.5)" />
              <stop offset="100%" stopColor="rgba(140,200,240,0.3)" />
            </linearGradient>

            <radialGradient id="star-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(200,230,255,0.7)" />
              <stop offset="30%" stopColor="rgba(140,200,240,0.3)" />
              <stop offset="100%" stopColor="rgba(140,200,240,0)" />
            </radialGradient>
            
            <radialGradient id="star-glow-sm" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(180,210,240,0.6)" />
              <stop offset="40%" stopColor="rgba(140,180,220,0.2)" />
              <stop offset="100%" stopColor="rgba(140,180,220,0)" />
            </radialGradient>
            
            <linearGradient id="planet-body" x1="25%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(160,210,240,0.85)" />
              <stop offset="40%" stopColor="rgba(80,140,190,0.9)" />
              <stop offset="100%" stopColor="rgba(25,55,85,0.95)" />
            </linearGradient>
            
            <radialGradient id="hole-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(180,140,240,0.6)" />
              <stop offset="40%" stopColor="rgba(160,120,220,0.2)" />
              <stop offset="100%" stopColor="rgba(160,120,220,0)" />
            </radialGradient>
            
            <radialGradient id="pulsar-jet" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
              <stop offset="20%" stopColor="rgba(140,200,240,0.6)" />
              <stop offset="100%" stopColor="rgba(140,200,240,0)" />
            </radialGradient>

            {nodes.map((n) => (
              <radialGradient key={`ng-${n.id}`} id={`nebula-${n.id}`} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(140,200,240,0.12)" />
                <stop offset="50%" stopColor="rgba(130,180,220,0.05)" />
                <stop offset="100%" stopColor="rgba(130,180,220,0)" />
              </radialGradient>
            ))}
            {nodes.filter(n => ["star", "binary-star", "pulsar", "black-hole"].includes(n.type)).map((n) => (
              <radialGradient key={`vg-${n.id}`} id={`nebula-violet-${n.id}`} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={C.violet} />
                <stop offset="100%" stopColor="rgba(160,120,220,0)" />
              </radialGradient>
            ))}
          </defs>

          {nodes.map((n) => (
            <ContourRings key={`c-${n.id}`} node={n} />
          ))}

          {nodes.map(n => {
            if (!n.regionLabel) return null;
            const dir = n.xPct > 0.5 ? 1 : -1;
            const xOffset = dir === 1 ? -60 : 60;
            return (
              <text 
                key={`reg-${n.id}`} 
                x={n.x + xOffset} 
                y={n.y + 40} 
                fill="rgba(255,255,255,0.02)" 
                fontSize="clamp(60px, 12vw, 180px)" 
                fontFamily="var(--font-sans)" 
                fontWeight="900" 
                letterSpacing="-0.02em" 
                textAnchor={dir === 1 ? "end" : "start"}
                style={{ textShadow: "0 0 30px rgba(255,255,255,0.4)" }}
                className={`rm-node ${revealed.has(n.id) ? "rm-visible" : ""}`}
              >
                {n.regionLabel}
              </text>
            )
          })}

          {svgWidth > 0 && (
            <g>
              <text x="16" y="28" fill={C.coord} fontSize="8" fontFamily="var(--font-mono)">47.3812°N</text>
              <text x={svgWidth - 16} y="28" fill={C.coord} fontSize="8" fontFamily="var(--font-mono)" textAnchor="end">8.5417°E</text>
              <text x="16" y={svgHeight - 16} fill={C.coord} fontSize="8" fontFamily="var(--font-mono)">EL. 0m</text>
              <text x={svgWidth - 16} y={svgHeight - 16} fill={C.coord} fontSize="8" fontFamily="var(--font-mono)" textAnchor="end">SURVEY REF: RA-2025</text>
            </g>
          )}

          {segments.map((s, i) => (
            <path
              key={`track-${i}`}
              d={s.d}
              fill="none"
              stroke={C.track}
              strokeWidth={s.isBranch ? "0.6" : "1"}
              strokeDasharray="6 8"
            />
          ))}

          {nodes.map((n) => {
            const isVisible = revealed.has(n.id);
            const isMajor = ["star", "binary-star", "pulsar", "black-hole"].includes(n.type);
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

          {segments.map((s, i) => {
            return (
              <g key={`seg-group-${i}`} className="rm-path-group">
                <path
                  data-seg={i}
                  d={s.d}
                  fill="none"
                  stroke="url(#journey-grad)"
                  strokeWidth={s.isBranch ? "0.8" : "1.5"}
                  pathLength={1}
                  className={`rm-path ${revealedSegs.has(i) ? "rm-visible" : ""} ${s.isBranch ? "rm-branch" : ""}`}
                />
                
                <path
                  d={s.d}
                  fill="none"
                  stroke="transparent"
                  strokeWidth="24"
                  className="rm-path-interactive"
                  onClick={() => { 
                    if (activeDetour) exitDetour();
                    handleNavigate(s.targetId); 
                  }}
                />
              </g>
            );
          })}

          {nodes.map(n => {
            if (["star", "beacon", "unknown-signal"].includes(n.type)) return null;
            const isLeft = n.xPct < 0.5;
            const targetX = isLeft ? svgWidth * 0.22 : svgWidth * 0.78;
            
            return (
              <g key={`dock-${n.id}`} className={`rm-path ${revealed.has(n.id) ? "rm-visible" : ""}`}>
                <line 
                  x1={n.x + (isLeft ? 40 : -40)}
                  y1={n.y}
                  x2={targetX}
                  y2={n.y}
                  stroke="rgba(140,200,240,0.15)"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
                <circle cx={targetX} cy={n.y} r="3" fill="rgba(140,200,240,0.3)" />
              </g>
            )
          })}

          {nodes.filter(n => ["binary-star", "pulsar", "ringed-planet", "black-hole"].includes(n.type)).map((n) => (
            <g key={`orb-${n.id}`} className={`rm-orbital ${revealed.has(n.id) ? "rm-visible" : ""}`}>
              <ellipse cx={n.x} cy={n.y} rx="55" ry="28" fill="none" stroke={C.major} strokeWidth="0.6" strokeDasharray="3 8" transform={`rotate(-15 ${n.x} ${n.y})`} />
              <ellipse cx={n.x} cy={n.y} rx="75" ry="38" fill="none" stroke={C.violet} strokeWidth="0.5" strokeDasharray="2 12" transform={`rotate(10 ${n.x} ${n.y})`} />
            </g>
          ))}

          {nodes.map((n) => {
            const isSubdued = n.id === "upcoming";
            const isActiveDetourNode = activeDetour === n.id;
            
            return (
              <g
                key={n.id}
                data-node={n.id}
                className={`rm-node ${revealed.has(n.id) ? "rm-visible" : ""} ${isSubdued ? "rm-subdued" : ""} ${isActiveDetourNode ? "rm-active" : ""} rm-node-interactive`}
                style={{ transformOrigin: `${n.x}px ${n.y}px` }}
                onClick={() => { 
                  if (activeDetour) exitDetour();
                  handleNavigate(n.id); 
                }}
              >
                {renderNode(n)}
              </g>
            );
          })}
        </svg>
      )}

      {nodes.find(n => n.id === "projects") && (
        <InfrastructureDock 
          nodeX={nodes.find(n => n.id === "projects")!.x} 
          nodeY={nodes.find(n => n.id === "projects")!.y} 
          triggered={dockTriggered} 
        />
      )}
    </div>

    <div 
      className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] transition-all duration-700 ease-out flex items-center gap-2 ${activeDetour ? "opacity-40 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
    >
      <span className="font-mono text-xs tracking-widest text-white/50 uppercase">Press</span>
      <kbd className="px-2 py-1 bg-white/5 border border-white/10 rounded font-mono text-[10px] text-white/70">ESC</kbd>
      <span className="font-mono text-xs tracking-widest text-white/50 uppercase">to return</span>
    </div>
  </>
  );
}
