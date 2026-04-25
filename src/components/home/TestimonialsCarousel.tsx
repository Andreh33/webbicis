"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

const TESTIMONIALS = [
  {
    name: "Marc Puig",
    date: "Marzo 2026",
    rating: 5,
    text: "Llevé mi Santa Cruz Nomad para puesta a punto de la suspensión y quedé impresionado. Alfredo conoce cada detalle de la Öhlins TTX22M. La diferencia en pista es brutal.",
  },
  {
    name: "Clara Rovira",
    date: "Febrero 2026",
    rating: 5,
    text: "Instalación de componentes Shimano XTR en mi Cannondale. Trabajo impecable, precio justo y terminaron antes de lo previsto. Repetiré sin duda.",
  },
  {
    name: "Pau Ferrer",
    date: "Enero 2026",
    rating: 5,
    text: "El servicio de limpieza con ultrasonido es una pasada. Mi bici parecía nueva. Además me explicaron todo el proceso y me dieron consejos de mantenimiento.",
  },
  {
    name: "Ana García",
    date: "Diciembre 2025",
    rating: 5,
    text: "Construyeron mis ruedas a la carta con DT Swiss. El resultado es perfecto: ligeras, centradas y con una tensión de radios impecable. Muy recomendable.",
  },
  {
    name: "Jordi Mas",
    date: "Noviembre 2025",
    rating: 5,
    text: "Llevé la Fox 36 para revisión completa y la dejaron como nueva. El rodaje de pastillas con la máquina de Bedding fue la guinda. Frenada brutalmente progresiva.",
  },
  {
    name: "Marta Vidal",
    date: "Octubre 2025",
    rating: 5,
    text: "Taller de referencia en Barcelona para bicicletas de alta gama. Profesionales que aman lo que hacen. Mi bici en manos expertas.",
  },
];

export function TestimonialsCarousel() {
  const [page, setPage] = useState(0);
  const perPage = 3;
  const pages = Math.ceil(TESTIMONIALS.length / perPage);
  const visible = TESTIMONIALS.slice(page * perPage, page * perPage + perPage);

  return (
    <section className="section-padding" style={{ backgroundColor: "#0A0E1A" }}>
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <div className="text-center mb-14">
            <p className="text-xs tracking-[0.35em] uppercase mb-3" style={{ color: "#1E5FFF" }}>
              Lo que dicen nuestros clientes
            </p>
            <h2 className="font-display font-bold text-white" style={{ fontSize: "clamp(1.8rem,4vw,3rem)" }}>
              ★★★★★ · 5.0 en Google
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {visible.map((t, i) => (
            <ScrollReveal key={t.name} delay={i * 0.1}>
              <div
                className="p-6 rounded-2xl h-full flex flex-col gap-4"
                style={{
                  backgroundColor: "#0F1420",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div className="flex gap-1">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={14} fill="#F59E0B" color="#F59E0B" />
                  ))}
                </div>
                <p className="text-sm leading-relaxed flex-1" style={{ color: "#9CA3AF" }}>
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center justify-between pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                  <span className="font-semibold text-sm text-white">{t.name}</span>
                  <span className="text-xs" style={{ color: "#6B7280" }}>{t.date}</span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className="p-2 rounded-full transition-all"
            style={{
              backgroundColor: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              opacity: page === 0 ? 0.3 : 1,
            }}
          >
            <ChevronLeft size={18} color="#F5F7FA" />
          </button>
          <span className="text-sm" style={{ color: "#6B7280" }}>
            {page + 1} / {pages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(pages - 1, p + 1))}
            disabled={page === pages - 1}
            className="p-2 rounded-full transition-all"
            style={{
              backgroundColor: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              opacity: page === pages - 1 ? 0.3 : 1,
            }}
          >
            <ChevronRight size={18} color="#F5F7FA" />
          </button>
        </div>

        <div className="text-center mt-8">
          <a
            href="https://g.page/r/oncycles"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm link-underline transition-colors"
            style={{ color: "#6B7280" }}
          >
            Ver todas las reseñas en Google →
          </a>
        </div>
      </div>
    </section>
  );
}
