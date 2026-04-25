import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { User, Package, MapPin, Shield, ChevronRight } from "lucide-react";

export default async function CuentaPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const cards = [
    { href: "/cuenta/pedidos", icon: <Package size={22} style={{ color: "#1E5FFF" }} />, title: "Mis pedidos", desc: "Consulta el estado de tus compras" },
    { href: "/cuenta/direcciones", icon: <MapPin size={22} style={{ color: "#1E5FFF" }} />, title: "Mis direcciones", desc: "Gestiona tus direcciones de envío" },
    { href: "/cuenta/perfil", icon: <User size={22} style={{ color: "#1E5FFF" }} />, title: "Mi perfil", desc: "Actualiza tus datos personales" },
    { href: "/cuenta/seguridad", icon: <Shield size={22} style={{ color: "#1E5FFF" }} />, title: "Seguridad", desc: "Contraseña y configuración de cuenta" },
  ];

  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: "#0A0E1A", minHeight: "100vh" }}>
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="mb-12">
            <p className="text-sm mb-1" style={{ color: "#6B7280" }}>Panel de cliente</p>
            <h1 className="font-display font-bold text-white text-3xl">
              Hola, {session.user?.name ?? session.user?.email?.split("@")[0]}
            </h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {cards.map(({ href, icon, title, desc }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-4 p-6 rounded-2xl transition-all duration-300 group"
                style={{ backgroundColor: "#0F1420", border: "1px solid rgba(255,255,255,0.06)" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "rgba(30,95,255,0.3)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)")}
              >
                <div className="p-3 rounded-xl shrink-0" style={{ backgroundColor: "rgba(30,95,255,0.1)" }}>
                  {icon}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-white">{title}</p>
                  <p className="text-sm" style={{ color: "#6B7280" }}>{desc}</p>
                </div>
                <ChevronRight size={16} style={{ color: "#6B7280" }} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
