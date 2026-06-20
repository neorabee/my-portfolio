

type CelestialIcon = "saturn" | "star" | "star-sm" | "blackhole" | "beacon";

function CelestialMini({ type }: { type: CelestialIcon }) {
  const size = 28;
  const cx = size / 2;
  const cy = size / 2;

  switch (type) {
    
    case "saturn":
      return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="inline-block shrink-0">
          <defs>
            <linearGradient id="m-planet" x1="25%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(160,210,240,0.85)" />
              <stop offset="40%" stopColor="rgba(80,140,190,0.9)" />
              <stop offset="100%" stopColor="rgba(25,55,85,0.95)" />
            </linearGradient>
          </defs>
          <g className="rm-rotate-ring" style={{ transformOrigin: `${cx}px ${cy}px` }}>
            <ellipse cx={cx} cy={cy} rx="13" ry="3.5" fill="none" stroke="rgba(140,200,240,0.18)" strokeWidth="0.6" />
            <ellipse cx={cx} cy={cy} rx="11" ry="3" fill="none" stroke="rgba(140,200,240,0.45)" strokeWidth="1.2" />
            <ellipse cx={cx} cy={cy} rx="8.5" ry="2.5" fill="none" stroke="rgba(140,200,240,0.12)" strokeWidth="0.4" />
          </g>
          <circle cx={cx} cy={cy} r="5" fill="url(#m-planet)" />
          <circle cx={cx - 1.5} cy={cy - 1.5} r="2" fill="rgba(200,230,255,0.12)" />
        </svg>
      );

    case "star":
      return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="inline-block shrink-0">
          <circle cx={cx} cy={cy} r="10" fill="rgba(200,230,255,0.08)" />
          <g className="rm-rotate-star" style={{ transformOrigin: `${cx}px ${cy}px` }}>
            <line x1={cx} y1={cy - 10} x2={cx} y2={cy + 10} stroke="rgba(200,230,255,0.5)" strokeWidth="0.7" />
            <line x1={cx - 10} y1={cy} x2={cx + 10} y2={cy} stroke="rgba(200,230,255,0.5)" strokeWidth="0.7" />
            <line x1={cx - 7} y1={cy - 7} x2={cx + 7} y2={cy + 7} stroke="rgba(200,230,255,0.3)" strokeWidth="0.4" />
            <line x1={cx + 7} y1={cy - 7} x2={cx - 7} y2={cy + 7} stroke="rgba(200,230,255,0.3)" strokeWidth="0.4" />
          </g>
          <circle cx={cx} cy={cy} r="3" fill="#fff" />
          <circle cx={cx} cy={cy} r="1.8" fill="rgba(220,240,255,1)" />
        </svg>
      );

    case "star-sm":
      return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="inline-block shrink-0">
          <circle cx={cx} cy={cy} r="8" fill="rgba(180,210,240,0.06)" />
          <g className="rm-rotate-star-sm" style={{ transformOrigin: `${cx}px ${cy}px` }}>
            <line x1={cx} y1={cy - 8} x2={cx} y2={cy + 8} stroke="rgba(180,210,240,0.4)" strokeWidth="0.5" />
            <line x1={cx - 8} y1={cy} x2={cx + 8} y2={cy} stroke="rgba(180,210,240,0.4)" strokeWidth="0.5" />
            <line x1={cx - 5} y1={cy - 5} x2={cx + 5} y2={cy + 5} stroke="rgba(180,210,240,0.2)" strokeWidth="0.3" />
            <line x1={cx + 5} y1={cy - 5} x2={cx - 5} y2={cy + 5} stroke="rgba(180,210,240,0.2)" strokeWidth="0.3" />
          </g>
          <circle cx={cx} cy={cy} r="2.5" fill="#fff" />
          <circle cx={cx} cy={cy} r="1.5" fill="rgba(200,230,255,1)" />
        </svg>
      );

    case "blackhole":
      return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="inline-block shrink-0">
          <circle cx={cx} cy={cy} r="10" fill="rgba(180,140,240,0.06)" />
          <circle cx={cx} cy={cy} r="8" fill="none" stroke="rgba(180,140,240,0.08)" strokeWidth="0.4" />
          <g className="rm-rotate-hole" style={{ transformOrigin: `${cx}px ${cy}px` }}>
            <ellipse cx={cx} cy={cy} rx="10" ry="3" fill="none" stroke="rgba(200,150,255,0.2)" strokeWidth="0.5" />
            <ellipse cx={cx} cy={cy} rx="8" ry="2.5" fill="none" stroke="rgba(200,160,255,0.5)" strokeWidth="1" />
            <ellipse cx={cx} cy={cy} rx="5.5" ry="1.8" fill="none" stroke="rgba(220,180,255,0.25)" strokeWidth="0.5" />
          </g>
          <circle cx={cx} cy={cy} r="3" fill="#000" stroke="rgba(160,120,220,0.35)" strokeWidth="0.6" />
          <circle cx={cx} cy={cy} r="1" fill="rgba(200,160,255,0.7)" />
        </svg>
      );

    case "beacon":
      return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="inline-block shrink-0">
          <circle cx={cx} cy={cy} r="10" fill="rgba(200,230,255,0.06)" />
          <g className="rm-rotate-beacon" style={{ transformOrigin: `${cx}px ${cy}px` }}>
            <circle cx={cx} cy={cy} r="9" fill="none" stroke="rgba(140,200,240,0.12)" strokeWidth="0.5" strokeDasharray="3 3" />
            <circle cx={cx} cy={cy} r="7" fill="none" stroke="rgba(140,200,240,0.2)" strokeWidth="0.4" strokeDasharray="1.5 4" />
          </g>
          <g className="rm-rotate-star" style={{ transformOrigin: `${cx}px ${cy}px` }}>
            <line x1={cx} y1={cy - 8} x2={cx} y2={cy + 8} stroke="rgba(200,230,255,0.35)" strokeWidth="0.5" />
            <line x1={cx - 8} y1={cy} x2={cx + 8} y2={cy} stroke="rgba(200,230,255,0.35)" strokeWidth="0.5" />
            <line x1={cx - 5.5} y1={cy - 5.5} x2={cx + 5.5} y2={cy + 5.5} stroke="rgba(200,230,255,0.2)" strokeWidth="0.3" />
            <line x1={cx + 5.5} y1={cy - 5.5} x2={cx - 5.5} y2={cy + 5.5} stroke="rgba(200,230,255,0.2)" strokeWidth="0.3" />
          </g>
          <circle cx={cx} cy={cy} r="2.5" fill="#fff" />
          <circle cx={cx} cy={cy} r="1.5" fill="rgba(200,230,255,1)" />
        </svg>
      );
  }
}

export default function MobileSectionHeader({ title, subtitle, icon }: { title: string; subtitle: string; icon?: CelestialIcon }) {
  return (
    <div className="block lg:hidden mb-12 border-l-2 border-accent/40 pl-4 py-1">
      <span className="text-xs font-mono text-muted-light tracking-widest uppercase block mb-1">
        {subtitle}
      </span>
      <div className="flex items-center gap-3">
        {icon && <CelestialMini type={icon} />}
        <h2 className="text-3xl font-bold tracking-tight text-white">
          {title}
        </h2>
      </div>
    </div>
  );
}
