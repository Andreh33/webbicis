"use client";

import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";

function InstagramIcon({ size = 14, style }: { size?: number; style?: React.CSSProperties }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#0F1420",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}
          <div>
            <div className="font-display font-bold text-xl tracking-[0.08em] uppercase mb-4">
              <span className="text-white">ON</span>
              <span style={{ color: "#1E5FFF" }}>·</span>
              <span className="text-white">CYCLES</span>
            </div>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#6B7280" }}>
              Laboratorio de mantenimiento premium de bicicletas de alta gama. Servicio técnico oficial Öhlins.
            </p>
            <div className="space-y-2 text-sm" style={{ color: "#6B7280" }}>
              <p className="flex items-start gap-2">
                <MapPin size={14} className="mt-0.5 shrink-0" style={{ color: "#1E5FFF" }} />
                Calle París 44, 08029 Barcelona
              </p>
              <p className="flex items-center gap-2">
                <Phone size={14} style={{ color: "#1E5FFF" }} />
                <a href="tel:+34678297995" className="hover:text-white transition-colors">+34 678 297 995</a>
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest mb-5" style={{ color: "#9CA3AF" }}>
              Navegación
            </h3>
            <ul className="space-y-3">
              {[
                { href: "/tienda", label: "Tienda" },
                { href: "/marcas", label: "Marcas" },
                { href: "/instalaciones", label: "Instalaciones" },
                { href: "/contacto", label: "Contacto" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm link-underline transition-colors" style={{ color: "#6B7280" }}
                    onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#F5F7FA")}
                    onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#6B7280")}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest mb-5" style={{ color: "#9CA3AF" }}>
              Mi cuenta
            </h3>
            <ul className="space-y-3">
              {[
                { href: "/login", label: "Iniciar sesión" },
                { href: "/registro", label: "Crear cuenta" },
                { href: "/cuenta", label: "Mi cuenta" },
                { href: "/cuenta/pedidos", label: "Mis pedidos" },
                { href: "/carrito", label: "Carrito" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm link-underline transition-colors" style={{ color: "#6B7280" }}
                    onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#F5F7FA")}
                    onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#6B7280")}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest mb-5" style={{ color: "#9CA3AF" }}>
              Contacto
            </h3>
            <ul className="space-y-3 text-sm" style={{ color: "#6B7280" }}>
              <li className="flex items-center gap-2">
                <Mail size={14} style={{ color: "#1E5FFF" }} />
                <a href="mailto:info@oncycles.es" className="hover:text-white transition-colors">
                  info@oncycles.es
                </a>
              </li>
              <li className="flex items-center gap-2">
                <InstagramIcon size={14} style={{ color: "#1E5FFF" }} />
                <a
                  href="https://instagram.com/oncycles"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  @oncycles
                </a>
              </li>
              <li className="mt-4 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <p className="font-medium mb-1" style={{ color: "#9CA3AF" }}>Horario</p>
                <p>Lun–Vie: 9:30–14:00 / 16:00–19:30</p>
                <p>Sábado: 10:00–14:00</p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="border-t"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs" style={{ color: "#6B7280" }}>
            © 2026 On Cycles · Todos los derechos reservados
          </p>
          <p className="text-xs" style={{ color: "#6B7280" }}>
            Creado con precisión en Barcelona
          </p>
        </div>
      </div>
    </footer>
  );
}
