"use client";

import { Phone, MessageCircle } from "lucide-react";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import Image from "next/image";

export function AboutSection() {
  return (
    <section className="section-padding" style={{ backgroundColor: "#0F1420" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <ScrollReveal direction="left">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
              <Image
                src="/fotos/oncycles-03.jpg"
                alt="Taller On Cycles"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,14,26,0.4) 0%, transparent 50%)" }} />
            </div>
          </ScrollReveal>

          {/* Text */}
          <ScrollReveal direction="right" delay={0.2}>
            <div>
              <p className="text-xs tracking-[0.35em] uppercase mb-4" style={{ color: "#1E5FFF" }}>
                El laboratorio
              </p>
              <h2 className="font-display font-bold text-white mb-6 leading-tight" style={{ fontSize: "clamp(1.8rem,4vw,3rem)" }}>
                20 años perfeccionando el arte del mantenimiento
              </h2>
              <p className="text-base leading-relaxed mb-4" style={{ color: "#9CA3AF" }}>
                On Cycles nació en 2006 en el corazón del Eixample barcelonés con una misión clara: tratar cada bicicleta como un instrumento de precisión que merece el cuidado más meticuloso.
              </p>
              <p className="text-base leading-relaxed mb-4" style={{ color: "#9CA3AF" }}>
                Somos Servicio Técnico Oficial Öhlins a través de Andreni MHS, lo que nos otorga acceso a herramientas, formación y recambios originales que no encontrarás en ningún otro taller de Barcelona.
              </p>
              <p className="text-base leading-relaxed mb-8" style={{ color: "#9CA3AF" }}>
                Nuestro laboratorio está equipado con tecnología de última generación: ultrasonido para la limpieza de componentes a nivel microscópico, banco de suspensiones calibrado, máquina de Bedding para frenos hidráulicos e inflado con nitrógeno puro.
              </p>

              <div className="pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <p className="text-sm italic" style={{ color: "#6B7280" }}>
                  — Alfredo Prendes Eugui · Responsable de taller
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

export function CallToAction() {
  return (
    <section className="section-padding relative overflow-hidden" style={{ backgroundColor: "#0A0E1A" }}>
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, rgba(30,95,255,0.08) 0%, transparent 70%)" }} />

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <ScrollReveal>
          <p className="text-xs tracking-[0.35em] uppercase mb-4" style={{ color: "#1E5FFF" }}>
            Tu bicicleta merece lo mejor
          </p>
          <h2 className="font-display font-bold text-white mb-6" style={{ fontSize: "clamp(2rem,5vw,4rem)" }}>
            ¿Tu bici merece<br />las mejores manos?
          </h2>
          <p className="text-lg mb-12" style={{ color: "#9CA3AF" }}>
            Contáctanos y cuéntanos qué necesita tu bicicleta.<br />
            Presupuesto sin compromiso.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://wa.me/34678297995?text=Hola%2C%20me%20gustar%C3%ADa%20consultar%20sobre%20el%20mantenimiento%20de%20mi%20bicicleta"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-white transition-all duration-300"
              style={{
                backgroundColor: "#25D366",
                boxShadow: "0 0 30px rgba(37,211,102,0.35)",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.boxShadow = "0 0 50px rgba(37,211,102,0.55)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.boxShadow = "0 0 30px rgba(37,211,102,0.35)")}
            >
              <MessageCircle size={18} />
              Escribir por WhatsApp
            </a>
            <a
              href="tel:+34678297995"
              className="flex items-center gap-3 px-8 py-4 rounded-full font-semibold transition-all duration-300"
              style={{
                border: "1px solid rgba(255,255,255,0.15)",
                color: "#F5F7FA",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "#1E5FFF")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.15)")}
            >
              <Phone size={18} />
              +34 678 297 995
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
