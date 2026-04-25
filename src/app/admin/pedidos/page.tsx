import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function AdminPedidosPage() {
  const session = await getServerSession(authOptions);
  if ((session?.user as { role?: string })?.role !== "ADMIN") redirect("/admin/login");

  const orders = await prisma.order.findMany({
    include: { user: { select: { name: true, email: true } } },
    orderBy: { createdAt: "desc" },
  });

  const STATUS_COLORS: Record<string, string> = {
    PENDING: "#F59E0B", PAID: "#10B981", FULFILLED: "#3B82F6", CANCELLED: "#EF4444",
  };

  const STATUS_LABELS: Record<string, string> = {
    PENDING: "Pendiente", PAID: "Pagado", FULFILLED: "Enviado", CANCELLED: "Cancelado",
  };

  return (
    <div className="p-8">
      <h1 className="font-display font-bold text-white text-2xl mb-8">Pedidos</h1>
      <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
        <table className="w-full">
          <thead>
            <tr style={{ backgroundColor: "#0F1420" }}>
              {["ID", "Cliente", "Email", "Total", "Estado", "Fecha"].map((h) => (
                <th key={h} className="text-left px-4 py-4 text-xs font-semibold uppercase tracking-wider" style={{ color: "#6B7280", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.map((order, i) => {
              const color = STATUS_COLORS[order.status] ?? "#9CA3AF";
              return (
                <tr key={order.id} style={{ backgroundColor: i % 2 === 0 ? "#0A0E1A" : "rgba(15,20,32,0.5)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <td className="px-4 py-4 font-mono-price text-xs" style={{ color: "#9CA3AF" }}>{order.id.slice(0, 8).toUpperCase()}</td>
                  <td className="px-4 py-4 text-sm text-white">{order.user?.name ?? "—"}</td>
                  <td className="px-4 py-4 text-sm" style={{ color: "#9CA3AF" }}>{order.email}</td>
                  <td className="px-4 py-4 font-mono-price font-bold text-white">{order.total.toFixed(2)} €</td>
                  <td className="px-4 py-4">
                    <span className="px-2 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: `${color}20`, color }}>
                      {STATUS_LABELS[order.status] ?? order.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm" style={{ color: "#9CA3AF" }}>{new Date(order.createdAt).toLocaleDateString("es-ES")}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
