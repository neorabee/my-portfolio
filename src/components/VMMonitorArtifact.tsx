"use client";

import { useEffect, useState } from "react";
import { Cpu, ArrowUpDown, Grid3x3, CircleDot } from "lucide-react";

type StatKey = "cpu" | "mem" | "disk" | "net";

const STAT_META: Record<
  StatKey,
  { label: string; icon: typeof Cpu; accent: string; glow: string; border: string }
> = {
  cpu: {
    label: "CPU usage",
    icon: Cpu,
    accent: "text-cyan-400",
    glow: "shadow-[0_0_18px_-4px_rgba(34,211,238,0.5)]",
    border: "from-cyan-400 via-cyan-400/60 to-transparent",
  },
  mem: {
    label: "Memory usage",
    icon: Grid3x3,
    accent: "text-violet-400",
    glow: "shadow-[0_0_18px_-4px_rgba(167,139,250,0.5)]",
    border: "from-violet-500 via-violet-500/60 to-transparent",
  },
  disk: {
    label: "Disk usage",
    icon: CircleDot,
    accent: "text-amber-400",
    glow: "shadow-[0_0_18px_-4px_rgba(251,191,36,0.5)]",
    border: "from-amber-400 via-amber-400/60 to-transparent",
  },
  net: {
    label: "Network",
    icon: ArrowUpDown,
    accent: "text-emerald-400",
    glow: "shadow-[0_0_18px_-4px_rgba(52,211,153,0.5)]",
    border: "from-emerald-400 via-emerald-400/60 to-transparent",
  },
};

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

function useClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

function Gauge({
  value,
  size = 168,
  stroke = 10,
  colorClass,
  glowHex,
}: {
  value: number;
  size?: number;
  stroke?: number;
  colorClass: string;
  glowHex: string;
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const clamped = Math.max(0, Math.min(100, value));
  const offset = c - (clamped / 100) * c;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="currentColor"
        strokeWidth={stroke}
        className="text-white/[0.06]"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={glowHex}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={offset}
        className={`${colorClass} transition-[stroke-dashoffset] duration-700 ease-out`}
        style={{ filter: `drop-shadow(0 0 6px ${glowHex}aa)` }}
      />
    </svg>
  );
}

function AreaSpark({ data, max = 100, colorHex }: { data: number[]; max?: number; colorHex: string }) {
  const w = 100;
  const h = 100;
  const step = w / (data.length - 1);
  const points = data.map((v, i) => {
    const x = i * step;
    const y = h - (Math.max(0, Math.min(max, v)) / max) * h;
    return [x, y];
  });
  const line = points.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`).join(" ");
  const area = `${line} L${w},${h} L0,${h} Z`;
  const gradId = `grad-${colorHex.replace("#", "")}`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="w-full h-full overflow-visible">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={colorHex} stopOpacity="0.35" />
          <stop offset="100%" stopColor={colorHex} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${gradId})`} />
      <path
        d={line}
        fill="none"
        stroke={colorHex}
        strokeWidth="1.6"
        vectorEffect="non-scaling-stroke"
        style={{ filter: `drop-shadow(0 0 3px ${colorHex}99)` }}
      />
    </svg>
  );
}

function MiniBars({ data, max = 100, colorHex }: { data: number[]; max?: number; colorHex: string }) {
  return (
    <div className="w-full h-full flex items-end gap-[2px]">
      {data.map((v, i) => (
        <div
          key={i}
          className="flex-1 rounded-t-[1px] transition-all duration-500 ease-out"
          style={{
            height: `${Math.max(2, Math.min(100, (v / max) * 100))}%`,
            background: colorHex,
            opacity: 0.55,
            boxShadow: `0 0 6px -1px ${colorHex}88`,
          }}
        />
      ))}
    </div>
  );
}

export default function SystemDashboard({ powerOn = true }: { powerOn?: boolean }) {
  const [cpu, setCpu] = useState(58);
  const [mem, setMem] = useState(44.4);
  const [disk] = useState(63.6);
  const [net, setNet] = useState(1.4);

  const [cpuHist, setCpuHist] = useState<number[]>(() => Array.from({ length: 28 }, () => 60 + Math.random() * 20));
  const [memHist, setMemHist] = useState<number[]>(() => Array.from({ length: 16 }, () => 40 + Math.random() * 10));

  const [uptime, setUptime] = useState(0);
  const now = useClock();

  const memTotal = 7.76;
  const memUsed = (mem / 100) * memTotal;
  const memFree = memTotal - memUsed;

  const diskTotal = 38.5;
  const diskUsed = (disk / 100) * diskTotal;

  useEffect(() => {
    if (!powerOn) return;
    let mounted = true;

    const tick = setInterval(() => {
      if (!mounted) return;
      setCpu((prev) => Math.max(4, Math.min(99, prev + (Math.random() - 0.5) * 10)));
      setMem((prev) => Math.max(8, Math.min(95, prev + (Math.random() - 0.5) * 1.4)));
      setNet((prev) => Math.max(0.1, Math.min(40, prev + (Math.random() - 0.5) * 0.6)));
      setUptime((p) => p + 1);

      setCpuHist((prev) => [...prev.slice(1), Math.max(4, Math.min(99, prev[prev.length - 1] + (Math.random() - 0.5) * 14))]);
      setMemHist((prev) => [...prev.slice(1), Math.max(8, Math.min(95, prev[prev.length - 1] + (Math.random() - 0.5) * 3))]);
    }, 1000);

    return () => {
      mounted = false;
      clearInterval(tick);
    };
  }, [powerOn]);

  const days = Math.floor(uptime / 86400);
  const hours = Math.floor((uptime % 86400) / 3600);
  const mins = Math.floor((uptime % 3600) / 60);
  const secs = uptime % 60;

  const dateStr = now.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric", year: "numeric" });
  const timeStr = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;

  return (
    <div
      className={`w-full bg-[#050507] rounded-2xl font-mono p-6 md:p-8 transition-all duration-1000 ${
        powerOn ? "opacity-100" : "opacity-10 grayscale saturate-0"
      }`}
    >
      <div className="flex flex-wrap items-start justify-between gap-4 pb-6 mb-6 border-b border-white/[0.06]">
        <div>
          <h1 className="text-2xl md:text-[28px] font-bold text-white tracking-tight">
            System Dashboard
          </h1>
          <div className="mt-2 h-[2px] w-12 bg-cyan-400/70 rounded-full" />
          <p className="mt-2 text-xs md:text-[13px] text-white/40">
            {dateStr} &mdash; Real-time performance telemetry
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.02] px-3 py-2">
            <span className="text-[9px] uppercase tracking-widest text-white/35">Uptime</span>
            <span className="text-[11px] text-white tabular-nums">
              {days}
              <span className="text-white/35">d</span> {pad(hours)}
              <span className="text-white/35">h</span> {pad(mins)}
              <span className="text-white/35">m</span> {pad(secs)}
              <span className="text-white/35">s</span>
            </span>
          </div>

          <div className="flex items-center gap-1.5 rounded-lg border border-emerald-500/20 bg-emerald-500/[0.06] px-3 py-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-semibold">Live</span>
          </div>

          <span className="text-[11px] text-white/30 tabular-nums hidden sm:inline">{timeStr}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard k="cpu" value={`${cpu.toFixed(1)}`} unit="%" sub="Current load" />
        <StatCard k="mem" value={`${mem.toFixed(1)}`} unit="%" sub={`${memUsed.toFixed(1)} GB used`} />
        <StatCard k="disk" value={`${disk.toFixed(1)}`} unit="%" sub={`${diskUsed.toFixed(1)} GB used`} />
        <StatCard k="net" value={`${net.toFixed(1)}`} unit="Mb/s" sub="Download speed" />
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        <Panel k="cpu" title="CPU performance" badge="Real-time">
          <div className="flex flex-col items-center gap-3 shrink-0 w-full sm:w-[150px]">
            <div className="relative flex items-center justify-center">
              <Gauge value={cpu} colorClass="text-cyan-400" glowHex="#22d3ee" />
              <div className="absolute flex flex-col items-center">
                <span className="text-3xl font-bold text-white tabular-nums">
                  {cpu.toFixed(1)}
                  <span className="text-sm text-white/40 ml-0.5">%</span>
                </span>
              </div>
            </div>
            <span className="text-[10px] uppercase tracking-widest text-white/35">Utilization</span>
          </div>

          <div className="flex-1 min-w-0 relative h-44">
            <div className="absolute inset-y-0 left-0 flex flex-col justify-between text-[9px] text-white/25 pr-2">
              <span>100</span>
              <span>50</span>
              <span>0</span>
            </div>
            <div className="absolute inset-0 left-7">
              <AreaSpark data={cpuHist} colorHex="#22d3ee" />
            </div>
          </div>
        </Panel>

        <Panel k="mem" title="Memory" badge={`${memTotal.toFixed(2)} GB`}>
          <div className="flex flex-col items-center gap-3 shrink-0 w-full sm:w-[150px]">
            <div className="relative flex items-center justify-center">
              <Gauge value={mem} colorClass="text-violet-400" glowHex="#a78bfa" />
              <div className="absolute flex flex-col items-center">
                <span className="text-3xl font-bold text-white tabular-nums">
                  {mem.toFixed(1)}
                  <span className="text-sm text-white/40 ml-0.5">%</span>
                </span>
              </div>
            </div>
            <span className="text-[10px] uppercase tracking-widest text-white/35">Used</span>

            <div className="w-full flex flex-col gap-1.5 mt-1">
              <Row label="Used" value={`${memUsed.toFixed(2)} GB`} valueClass="text-white" />
              <Row label="Free" value={`${memFree.toFixed(2)} GB`} valueClass="text-emerald-400" />
              <Row label="Total" value={`${memTotal.toFixed(2)} GB`} valueClass="text-white" />
            </div>
          </div>

          <div className="flex-1 min-w-0 relative h-44">
            <div className="absolute inset-y-0 left-0 flex flex-col justify-between text-[9px] text-white/25 pr-2">
              <span>100</span>
              <span>50</span>
              <span>0</span>
            </div>
            <div className="absolute inset-0 left-7">
              <MiniBars data={memHist} colorHex="#a78bfa" />
            </div>
          </div>
        </Panel>
      </div>
    </div>
  );
}

function StatCard({ k, value, unit, sub }: { k: StatKey; value: string; unit: string; sub: string }) {
  const meta = STAT_META[k];
  const Icon = meta.icon;
  return (
    <div className="relative rounded-xl border border-white/[0.06] bg-white/[0.015] overflow-hidden">
      <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${meta.border}`} />
      <div className="p-4 flex flex-col gap-3">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-white/[0.04] ${meta.glow}`}>
          <Icon size={15} className={meta.accent} />
        </div>
        <div>
          <p className="text-[9px] uppercase tracking-widest text-white/35 mb-1.5">{meta.label}</p>
          <p className="text-xl md:text-2xl font-bold text-white tabular-nums leading-none">
            {value}
            <span className="text-xs font-normal text-white/40 ml-0.5">{unit}</span>
          </p>
          <p className="text-[11px] text-white/30 mt-1.5">{sub}</p>
        </div>
      </div>
    </div>
  );
}

function Panel({ k, title, badge, children }: { k: StatKey; title: string; badge: string; children: React.ReactNode }) {
  const meta = STAT_META[k];
  const Icon = meta.icon;
  return (
    <div className="relative rounded-xl border border-white/[0.06] bg-white/[0.015] p-5 md:p-6 overflow-hidden">
      <div
        className="absolute -top-16 -left-16 w-40 h-40 rounded-full opacity-[0.12] blur-3xl pointer-events-none"
        style={{ background: k === "cpu" ? "#22d3ee" : k === "mem" ? "#a78bfa" : k === "disk" ? "#fbbf24" : "#34d399" }}
      />
      <div className="flex items-center justify-between mb-5 relative z-10">
        <div className="flex items-center gap-2.5">
          <div className={`w-7 h-7 rounded-lg flex items-center justify-center bg-white/[0.05] ${meta.glow}`}>
            <Icon size={13} className={meta.accent} />
          </div>
          <span className="text-[11px] uppercase tracking-widest text-white/60 font-semibold">{title}</span>
        </div>
        <span className="text-[10px] text-white/40 rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1 tabular-nums">
          {badge}
        </span>
      </div>

      <div className="flex flex-col sm:flex-row gap-6 relative z-10">{children}</div>
    </div>
  );
}

function Row({ label, value, valueClass }: { label: string; value: string; valueClass: string }) {
  return (
    <div className="flex items-center justify-between rounded-md border border-white/[0.06] bg-white/[0.02] px-2.5 py-1.5">
      <span className="text-[10px] text-white/40">{label}</span>
      <span className={`text-[11px] tabular-nums font-semibold ${valueClass}`}>{value}</span>
    </div>
  );
}