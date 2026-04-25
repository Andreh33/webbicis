"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const PHOTOS = [
  "/fotos/WhatsApp Image 2026-04-24 at 14.40.38.jpeg",
  "/fotos/WhatsApp Image 2026-04-24 at 14.40.39.jpeg",
  "/fotos/WhatsApp Image 2026-04-24 at 14.40.40.jpeg",
];

const STATS = [
  { num: "20", suffix: "+", label: "Años de experiencia" },
  { num: "5.000", suffix: "+", label: "Bicicletas atendidas" },
  { num: "100", suffix: "%", label: "Servicio Öhlins oficial" },
  { num: "24", suffix: "h", label: "Diagnóstico premium" },
];

export function Manifesto() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yLeft = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const yRight = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const yMid = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-24 md:py-40"
      style={{ backgroundColor: "#0A0E1A" }}
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 20% 30%, rgba(30,95,255,0.10) 0%, transparent 55%), radial-gradient(circle at 80% 70%, rgba(74,143,255,0.08) 0%, transparent 50%)",
        }}
      />

      {/* Grain overlay */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' /%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        {/* Section eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-4 mb-12 md:mb-20"
        >
          <div className="h-px w-12" style={{ backgroundColor: "#1E5FFF" }} />
          <p className="text-xs tracking-[0.45em] uppercase font-medium" style={{ color: "#1E5FFF" }}>
            Manifiesto · 002
          </p>
        </motion.div>

        {/* Main editorial grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-start">
          {/* Left: Headline */}
          <div className="md:col-span-7">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-bold leading-[0.95] tracking-tight"
              style={{
                fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
                color: "#F5F7FA",
              }}
            >
              No reparamos<br />
              bicicletas.<br />
              <span style={{ color: "#4A8FFF" }}>Las afinamos</span><br />
              al milímetro.
            </motion.h2>
          </div>

          {/* Right: Image stack with parallax */}
          <div className="md:col-span-5 relative h-[420px] md:h-[560px]">
            <motion.div
              style={{ y: yRight }}
              className="absolute top-0 right-0 w-[70%] aspect-[3/4] rounded-2xl overflow-hidden"
            >
              <Image
                src={PHOTOS[0]}
                alt="Laboratorio On Cycles"
                fill
                sizes="(max-width: 768px) 70vw, 30vw"
                className="object-cover"
                style={{ filter: "saturate(0.9) contrast(1.05)" }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 60%, rgba(10,14,26,0.45) 100%)",
                }}
              />
            </motion.div>

            <motion.div
              style={{ y: yMid }}
              className="absolute bottom-0 left-0 w-[55%] aspect-[4/5] rounded-2xl overflow-hidden"
            >
              <Image
                src={PHOTOS[1]}
                alt="Detalle componente"
                fill
                sizes="(max-width: 768px) 55vw, 25vw"
                className="object-cover"
                style={{ filter: "saturate(0.85) contrast(1.08)" }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(10,14,26,0.2) 0%, transparent 50%)",
                }}
              />
            </motion.div>
          </div>
        </div>

        {/* Body copy */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 mt-16 md:mt-24"
        >
          <div className="md:col-span-5 md:col-start-2">
            <p
              className="text-base md:text-lg leading-relaxed"
              style={{ color: "rgba(245,247,250,0.72)", fontWeight: 300 }}
            >
              En el corazón del Eixample de Barcelona, nuestro laboratorio combina
              dos décadas de oficio con tecnología de medición de última generación.
              Cada bicicleta que atraviesa nuestra puerta recibe el tratamiento
              que merece un instrumento de precisión.
            </p>
          </div>
          <div className="md:col-span-5">
            <p
              className="text-base md:text-lg leading-relaxed"
              style={{ color: "rgba(245,247,250,0.72)", fontWeight: 300 }}
            >
              Trabajamos con horquillas Öhlins, transmisiones SRAM AXS, frenos
              Magura y los componentes más exigentes del mercado. Diagnóstico
              completo, ajuste fino y entrega impecable. Esa es nuestra única
              forma de trabajar.
            </p>
          </div>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mt-20 md:mt-32 pt-10 md:pt-14 grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-6"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
        >
          {STATS.map(({ num, suffix, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="flex flex-col"
            >
              <p
                className="font-display font-bold leading-none"
                style={{
                  fontSize: "clamp(2.5rem, 5vw, 4rem)",
                  color: "#F5F7FA",
                  letterSpacing: "-0.02em",
                }}
              >
                {num}
                <span style={{ color: "#1E5FFF" }}>{suffix}</span>
              </p>
              <p
                className="mt-3 text-[11px] md:text-xs tracking-[0.25em] uppercase"
                style={{ color: "rgba(245,247,250,0.5)" }}
              >
                {label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Floating decorative photo (parallax) */}
        <motion.div
          style={{ y: yLeft }}
          className="hidden md:block absolute left-0 top-[55%] w-[180px] aspect-[3/4] rounded-xl overflow-hidden opacity-60"
        >
          <Image
            src={PHOTOS[2]}
            alt=""
            fill
            sizes="180px"
            className="object-cover"
            style={{ filter: "saturate(0.7) contrast(1.05)" }}
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(180deg, rgba(10,14,26,0.3), rgba(10,14,26,0.6))" }}
          />
        </motion.div>
      </div>
    </section>
  );
}
