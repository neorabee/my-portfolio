"use client";

export interface ConceptWord {
  text: string;
  size: string;        // e.g. "18vw"
  yOffset: string;     // CSS top positioning
  direction: "left" | "right";
  duration: number;    // Animation duration in seconds (e.g., 100)
}

export default function SectionConcept({ concept }: { concept: ConceptWord }) {
  const isLeft = concept.direction === "left";

  const textStyle: React.CSSProperties = {
    fontSize: concept.size,
    opacity: 0.03,
    color: "white",
    // Removed blur(8px) — it was an extremely expensive GPU operation on giant text
    // Using a very subtle text-shadow instead for a similar soft look
    textShadow: "0 0 20px rgba(255,255,255,0.3)",
  };

  return (
    <div
      className="hidden lg:block absolute inset-0 overflow-hidden pointer-events-none z-0"
    >
      <div
        className="pointer-events-none select-none flex absolute"
        style={{
          top: concept.yOffset,
          left: 0,
          animation: `concept-scroll-${isLeft ? "left" : "right"} ${concept.duration}s linear infinite`,
          willChange: "transform",
        }}
      >
        {/* We render 4 copies of the word. Translating by 50% will shift exactly 2 copies over, creating a perfect seamless loop. */}
        <span className="font-bold tracking-tighter leading-none whitespace-nowrap pr-32" style={textStyle}>
          {concept.text}
        </span>
        <span className="font-bold tracking-tighter leading-none whitespace-nowrap pr-32" style={textStyle}>
          {concept.text}
        </span>
        <span className="font-bold tracking-tighter leading-none whitespace-nowrap pr-32" style={textStyle}>
          {concept.text}
        </span>
        <span className="font-bold tracking-tighter leading-none whitespace-nowrap pr-32" style={textStyle}>
          {concept.text}
        </span>
      </div>
    </div>
  );
}
