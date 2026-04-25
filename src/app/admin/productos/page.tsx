import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types";

export default async function AdminProductosPage() {
  const session = await getServerSession(authOptions);
  if ((session?.user as { role?: string })?.role !== "ADMIN") redirect("/admin/login");

  const products = await prisma.product.findMany({
    include: { images: { orderBy: { order: "asc" }, take: 1 } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display font-bold text-white text-2xl mb-1">Productos</h1>
          <p className="text-sm" style={{ color: "#6B7280" }}>{products.length} productos en total</p>
        </div>
        <Link
          href="/admin/productos/nuevo"
          className="flex items-center gap-2 px-5 py-3 rounded-full font-semibold text-white"
          style={{ backgroundColor: "#1E5FFF" }}
        >
          <Plus size={16} /> Nuevo producto
        </Link>
      </div>

      <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
        <table className="w-full">
          <thead>
            <tr style={{ backgroundColor: "#0F1420" }}>
              {["Imagen", "Nombre", "Precio", "Stock", "Categoría", "Estado", "Acciones"].map((h) => (
                <th key={h} className="text-left px-4 py-4 text-xs font-semibold uppercase tracking-wider" style={{ color: "#6B7280", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products.map((product, i) => {
              const firstImg = product.images[0]?.url;
              return (
                <tr key={product.id} style={{ backgroundColor: i % 2 === 0 ? "#0A0E1A" : "rgba(15,20,32,0.5)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <td className="px-4 py-4">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden" style={{ backgroundColor: "#161C2E" }}>
                      {firstImg && <Image src={firstImg} alt={product.name} fill className="object-cover" />}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <p className="font-medium text-white text-sm">{product.name}</p>
                    {product.brand && <p className="text-xs" style={{ color: "#6B7280" }}>{product.brand}</p>}
                  </td>
                  <td className="px-4 py-4 font-mono-price text-sm text-white">{formatPrice(product.price)}</td>
                  <td className="px-4 py-4 font-mono-price text-sm" style={{ color: product.stock > 0 ? "#10B981" : "#EF4444" }}>{product.stock}</td>
                  <td className="px-4 py-4 text-sm" style={{ color: "#9CA3AF" }}>{product.category}</td>
                  <td className="px-4 py-4">
                    <span className="flex items-center gap-1 text-xs" style={{ color: product.active ? "#10B981" : "#6B7280" }}>
                      {product.active ? <Eye size={12} /> : <EyeOff size={12} />}
                      {product.active ? "Activo" : "Inactivo"}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <Link href={`/admin/productos/${product.id}`} className="p-2 rounded-lg transition-colors hover:bg-white/5">
                        <Pencil size={14} style={{ color: "#9CA3AF" }} />
                      </Link>
                      <form action={`/api/productos/${product.id}`} method="post">
                        <input type="hidden" name="_method" value="DELETE" />
                        <button type="submit" className="p-2 rounded-lg transition-colors hover:bg-red-500/10">
                          <Trash2 size={14} style={{ color: "#EF4444" }} />
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
