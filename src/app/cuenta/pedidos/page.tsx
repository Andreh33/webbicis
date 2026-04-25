import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  PENDING: { label: "Pendiente", color: "#F59E0B" },
  PAID: { label: "Pagado", color: "#10B981" },
  FULFILLED: { label: "Enviado", color: "#3B82F6" },
  CANCELLED: { label: "Cancelado", color: "#EF4444" },
};

export default async function PedidosPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const userId = (session.user as { id?: string }).id;
  const orders = userId ? await prisma.order.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  }) : [];

  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: "#0A0E1A", minHeight: "100vh" }}>
        <div className="max-w-4xl mx-auto px-6 py-16">
          <Link href="/cuenta" className="flex items-center gap-2 text-sm mb-8" style={{ color: "#6B7280" }}>
            <ChevronLeft size={16} /> Volver
          </Link>
          <h1 className="font-display font-bold text-white text-2xl mb-8">Mis pedidos</h1>

          {orders.length === 0 ? (
            <p style={{ color: "#9CA3AF" }}>No tienes pedidos todavía.</p>
          ) : (
            <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
              <table className="w-full">
                <thead>
                  <tr style={{ backgroundColor: "#0F1420", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                    {["Pedido", "Fecha", "Total", "Estado"].map((h) => (
                      <th key={h} className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider" style={{ color: "#6B7280" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, i) => {
                    const status = STATUS_LABELS[order.status] ?? { label: order.status, color: "#9CA3AF" };
                    return (
                      <tr key={order.id} style={{ backgroundColor: i % 2 === 0 ? "#0A0E1A" : "rgba(15,20,32,0.5)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                        <td className="px-6 py-4 font-mono-price text-xs" style={{ color: "#9CA3AF" }}>{order.id.slice(0, 8).toUpperCase()}</td>
                        <td className="px-6 py-4 text-sm" style={{ color: "#9CA3AF" }}>{new Date(order.createdAt).toLocaleDateString("es-ES")}</td>
                        <td className="px-6 py-4 font-mono-price font-bold text-white">{order.total.toFixed(2)} €</td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: `${status.color}20`, color: status.color }}>
                            {status.label}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
