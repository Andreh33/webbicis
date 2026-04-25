"use client";

interface MarqueeProps {
  children: React.ReactNode;
  speed?: number;
  direction?: "left" | "right";
  className?: string;
  pauseOnHover?: boolean;
}

export function Marquee({
  children,
  speed = 40,
  direction = "left",
  className = "",
  pauseOnHover = true,
}: MarqueeProps) {
  const animStyle = {
    "--marquee-speed": `${speed}s`,
    animationDirection: direction === "right" ? "reverse" : "normal",
  } as React.CSSProperties;

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <div
        className={`inline-flex marquee-track ${pauseOnHover ? "hover:[animation-play-state:paused]" : ""}`}
        style={animStyle}
      >
        <span className="inline-flex items-center">{children}</span>
        <span className="inline-flex items-center" aria-hidden>{children}</span>
      </div>
    </div>
  );
}
