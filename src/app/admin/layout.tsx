"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, ShoppingCart, Users, ArrowLeft } from "lucide-react";

const NAV = [
  { href: "/admin", icon: <LayoutDashboard size={18} />, label: "Dashboard" },
  { href: "/admin/productos", icon: <Package size={18} />, label: "Productos" },
  { href: "/admin/pedidos", icon: <ShoppingCart size={18} />, label: "Pedidos" },
  { href: "/admin/usuarios", icon: <Users size={18} />, label: "Usuarios" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname === "/admin/login") return <>{children}</>;

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: "#0A0E1A" }}>
      {/* Sidebar */}
      <aside
        className="w-60 shrink-0 flex flex-col"
        style={{ backgroundColor: "#0F1420", borderRight: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="px-6 py-6">
          <div className="font-display font-bold text-lg tracking-[0.08em] uppercase">
            <span className="text-white">ON</span>
            <span style={{ color: "#1E5FFF" }}>·</span>
            <span className="text-white">CYCLES</span>
          </div>
          <p className="text-xs mt-0.5" style={{ color: "#6B7280" }}>Panel de administración</p>
        </div>

        <nav className="flex-1 px-3 pb-6 space-y-1">
          {NAV.map(({ href, icon, label }) => {
            const active = pathname === href || (href !== "/admin" && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200"
                style={{
                  backgroundColor: active ? "rgba(30,95,255,0.15)" : "transparent",
                  color: active ? "#4A8FFF" : "#6B7280",
                  border: active ? "1px solid rgba(30,95,255,0.2)" : "1px solid transparent",
                }}
              >
                {icon}
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="px-3 pb-6">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200"
            style={{ color: "#6B7280" }}
          >
            <ArrowLeft size={18} />
            Volver a la web
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
