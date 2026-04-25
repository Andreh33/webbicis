"use client";

import Image from "next/image";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

const SERVICES = [
  {
    number: "01",
    title: "Suspensiones",
    description: "Calibración, mantenimiento y reparación de horquillas y amortiguadores Öhlins, Fox, RockShox y Cane Creek. Tu bike, perfectamente equilibrada.",
    image: "/fotos/oncycles-05.jpg",
  },
  {
    number: "02",
    title: "Frenos hidráulicos",
    description: "Purga, ajuste y rodaje de pastillas con nuestra máquina de Bedding. Frenos de potencia máxima desde el primer uso.",
    image: "/fotos/oncycles-06.jpg",
  },
  {
    number: "03",
    title: "Montaje a la carta",
    description: "Construcción de ruedas artesanal, instalación de componentes de alta gama y configuración completa de tu bicicleta.",
    image: "/fotos/oncycles-07.jpg",
  },
  {
    number: "04",
    title: "Centro de lavado",
    description: "Limpieza profunda con ultrasonido y equipo especializado. Tu bicicleta como recién salida de fábrica.",
    image: "/fotos/oncycles-08.jpg",
  },
];

export function FeaturedServices() {
  return (
    <section className="section-padding" style={{ backgroundColor: "#0A0E1A" }}>
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <div className="flex items-center justify-between mb-16">
            <div>
              <p className="text-xs tracking-[0.35em] uppercase mb-3" style={{ color: "#1E5FFF" }}>
                Nuestros servicios
              </p>
              <h2 className="font-display font-bold text-white" style={{ fontSize: "clamp(1.8rem,4vw,3rem)" }}>
                Lo que hacemos,<br />lo hacemos bien.
              </h2>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SERVICES.map((service, i) => (
            <ScrollReveal key={service.number} delay={i * 0.1}>
              <div
                className="card-hover relative overflow-hidden rounded-2xl group cursor-pointer"
                style={{
                  backgroundColor: "#0F1420",
                  border: "1px solid rgba(255,255,255,0.06)",
                  aspectRatio: "4/3",
                }}
              >
                {/* Background image */}
                <div className="absolute inset-0">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to top, rgba(10,14,26,0.92) 40%, rgba(10,14,26,0.3) 100%)" }}
                  />
                </div>

                {/* Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <span
                    className="font-mono-price text-5xl font-bold mb-4 block"
                    style={{ color: "rgba(30,95,255,0.35)" }}
                  >
                    {service.number}
                  </span>
                  <h3 className="font-display font-bold text-2xl text-white mb-3 group-hover:text-blue-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#9CA3AF" }}>
                    {service.description}
                  </p>
                </div>

                {/* Hover border glow */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ border: "1px solid rgba(30,95,255,0.4)" }}
                />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
