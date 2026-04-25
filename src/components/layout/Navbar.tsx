"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ShoppingCart, User, Menu, X } from "lucide-react";
import { useSession } from "next-auth/react";
import { useCart } from "@/lib/cart-store";
import { CartDrawer } from "@/components/shop/CartDrawer";
import { Marquee } from "./Marquee";

const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/tienda", label: "Tienda" },
  { href: "/marcas", label: "Marcas" },
  { href: "/instalaciones", label: "Instalaciones" },
  { href: "/contacto", label: "Contacto" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { data: session } = useSession();
  const count = useCart((s) => s.count());

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      {/* Top marquee */}
      <div
        className="w-full py-2 text-[11px] font-medium tracking-[0.2em] uppercase text-white"
        style={{ backgroundColor: "#1E5FFF" }}
      >
        <Marquee speed={40}>
          <span className="px-8">✦ SERVICIO TÉCNICO OFICIAL ÖHLINS</span>
          <span className="px-8">✦ 20 AÑOS DE EXPERIENCIA</span>
          <span className="px-8">✦ BARCELONA EIXAMPLE</span>
          <span className="px-8">✦ MANTENIMIENTO PREMIUM</span>
          <span className="px-8">✦ SUSPENSIONES DE ALTA GAMA</span>
        </Marquee>
      </div>

      {/* Main navbar */}
      <header
        className="sticky top-0 z-50 w-full transition-all duration-500"
        style={{
          backgroundColor: scrolled ? "rgba(10,14,26,0.95)" : "rgba(10,14,26,0.6)",
          backdropFilter: "blur(20px)",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
          padding: scrolled ? "0" : "0",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between"
          style={{ height: scrolled ? "60px" : "72px", transition: "height 0.3s cubic-bezier(0.16,1,0.3,1)" }}>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-1 font-display font-bold text-xl tracking-[0.08em] uppercase">
            <span className="text-white">ON</span>
            <span style={{ color: "#1E5FFF" }}>·</span>
            <span className="text-white">CYCLES</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="link-underline text-sm font-medium transition-colors"
                style={{ color: "#9CA3AF" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#F5F7FA")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#9CA3AF")}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2 rounded-full transition-colors hover:bg-white/5"
              aria-label="Carrito"
            >
              <ShoppingCart size={20} color="#F5F7FA" />
              {count > 0 && (
                <span
                  className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center text-white"
                  style={{ backgroundColor: "#1E5FFF" }}
                >
                  {count > 9 ? "9+" : count}
                </span>
              )}
            </button>

            <Link
              href={session ? "/cuenta" : "/login"}
              className="p-2 rounded-full transition-colors hover:bg-white/5"
              aria-label="Mi cuenta"
            >
              <User size={20} color="#F5F7FA" />
            </Link>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menú"
            >
              {mobileOpen ? <X size={22} color="#F5F7FA" /> : <Menu size={22} color="#F5F7FA" />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="md:hidden" style={{ backgroundColor: "#0F1420", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <nav className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-4">
              {NAV_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm font-medium py-2"
                  style={{ color: "#9CA3AF" }}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
