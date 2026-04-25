"use client";

import { Marquee } from "@/components/layout/Marquee";

const BRANDS = [
  "ÖHLINS", "FOX", "ROCK SHOX", "CANE CREEK", "DT SWISS",
  "CANNONDALE", "SRAM", "SHIMANO", "MAGURA", "BOSCH", "BROSE", "DJI AVINOX",
];

export function BrandStrip() {
  return (
    <section className="py-16 relative" style={{ backgroundColor: "#0F1420", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="mb-8 text-center">
        <p className="text-xs tracking-[0.35em] uppercase" style={{ color: "#6B7280" }}>
          Marcas con las que trabajamos
        </p>
      </div>
      <Marquee speed={50} pauseOnHover>
        {BRANDS.map((brand) => (
          <span
            key={brand}
            className="font-display font-bold text-2xl uppercase tracking-wider px-12 transition-all duration-300 cursor-default select-none"
            style={{ color: "rgba(255,255,255,0.2)" }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.95)")}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.2)")}
          >
            {brand}
          </span>
        ))}
      </Marquee>
    </section>
  );
}
