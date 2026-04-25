"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDown, MessageCircle, ArrowRight } from "lucide-react";

export function Hero() {
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame: number;
    let pos = 0;
    const animate = () => {
      pos = (pos + 0.5) % 100;
      if (lineRef.current) {
        lineRef.current.style.transform = `translateY(${pos}%)`;
      }
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ minHeight: "100vh" }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/fotos/oncycles-01.jpg')" }}
      />
      {/* Overlays */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(10,14,26,0.92) 0%, rgba(10,14,26,0.7) 50%, rgba(10,14,26,0.85) 100%)" }} />
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 70% 50%, rgba(30,95,255,0.08) 0%, transparent 60%)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full py-32">
        <div className="max-w-3xl">

          {/* Eyebrow */}
          <motion.p
            className="text-sm font-medium tracking-[0.3em] uppercase mb-6"
            style={{ color: "#1E5FFF" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Barcelona · Desde 2006
          </motion.p>

          {/* Headline */}
          <motion.h1
            className="font-display font-bold leading-[0.95] tracking-[-0.02em] text-white mb-6"
            style={{ fontSize: "clamp(3rem, 8vw, 6rem)" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            El laboratorio<br />
            <span style={{ color: "#F5F7FA" }}>de bicicletas</span><br />
            <span style={{ WebkitTextStroke: "1px rgba(255,255,255,0.3)", color: "transparent" }}>de alta precisión.</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            className="text-lg mb-10 max-w-xl leading-relaxed"
            style={{ color: "#9CA3AF" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            Mantenimiento, reparación y configuración de suspensiones.<br />
            Servicio técnico oficial Öhlins.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <a
              href="https://wa.me/34678297995?text=Hola%2C%20quiero%20reservar%20una%20cita"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-7 py-4 rounded-full text-sm font-semibold text-white transition-all duration-300"
              style={{
                backgroundColor: "#1E5FFF",
                boxShadow: "0 0 30px rgba(30,95,255,0.4)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "#4A8FFF";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 50px rgba(30,95,255,0.6)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "#1E5FFF";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 30px rgba(30,95,255,0.4)";
              }}
            >
              <MessageCircle size={16} />
              Reservar cita
            </a>
            <Link
              href="/tienda"
              className="flex items-center gap-2 px-7 py-4 rounded-full text-sm font-semibold transition-all duration-300"
              style={{
                border: "1px solid rgba(255,255,255,0.2)",
                color: "#F5F7FA",
                backgroundColor: "transparent",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "#1E5FFF";
                (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(30,95,255,0.1)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.2)";
                (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
              }}
            >
              Ver tienda
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>

        {/* Stats row */}
        <motion.div
          className="mt-20 flex flex-wrap gap-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          {[
            { number: "20+", label: "Años de experiencia" },
            { number: "5K+", label: "Bicicletas revisadas" },
            { number: "∞", label: "Pasión por el detalle" },
          ].map(({ number, label }) => (
            <div key={label}>
              <p className="font-mono-price font-bold text-3xl text-white mb-1">{number}</p>
              <p className="text-sm" style={{ color: "#6B7280" }}>{label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <p className="text-xs tracking-[0.3em] uppercase" style={{ color: "#6B7280" }}>Scroll</p>
        <div className="relative w-px h-12 overflow-hidden" style={{ backgroundColor: "rgba(255,255,255,0.1)" }}>
          <div ref={lineRef} className="absolute top-0 left-0 w-full h-1/2" style={{ backgroundColor: "#1E5FFF" }} />
        </div>
        <ArrowDown size={14} style={{ color: "#6B7280" }} />
      </div>
    </section>
  );
}
