import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { DashboardCards } from "@/components/admin/DashboardCards";

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);
  const userRole = (session?.user as { role?: string })?.role;
  if (!session || userRole !== "ADMIN") redirect("/admin/login");

  const [productCount, orderCount, userCount, orders] = await Promise.all([
    prisma.product.count({ where: { active: true } }),
    prisma.order.count(),
    prisma.user.count(),
    prisma.order.findMany({ select: { total: true, status: true } }),
  ]);

  const revenue = orders.filter((o) => o.status === "PAID" || o.status === "FULFILLED").reduce((s, o) => s + o.total, 0);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-display font-bold text-white text-2xl mb-1">Dashboard</h1>
        <p className="text-sm" style={{ color: "#6B7280" }}>Resumen de la tienda On Cycles</p>
      </div>

      <DashboardCards products={productCount} orders={orderCount} users={userCount} revenue={revenue} />

      <div className="mt-8 p-6 rounded-2xl" style={{ backgroundColor: "#0F1420", border: "1px solid rgba(255,255,255,0.06)" }}>
        <h2 className="font-semibold text-white mb-4">Accesos rápidos</h2>
        <div className="flex flex-wrap gap-3">
          {[
            { href: "/admin/productos/nuevo", label: "+ Nuevo producto" },
            { href: "/admin/pedidos", label: "Ver pedidos" },
            { href: "/admin/usuarios", label: "Ver usuarios" },
          ].map(({ href, label }) => (
            <a key={href} href={href} className="px-4 py-2 rounded-full text-sm font-medium text-white transition-all" style={{ backgroundColor: "rgba(30,95,255,0.15)", border: "1px solid rgba(30,95,255,0.25)", color: "#4A8FFF" }}>
              {label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
