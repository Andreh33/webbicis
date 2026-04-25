import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ProductForm } from "@/components/admin/ProductForm";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default async function NuevoProductoPage() {
  const session = await getServerSession(authOptions);
  if ((session?.user as { role?: string })?.role !== "ADMIN") redirect("/admin/login");

  return (
    <div className="p-8 max-w-4xl">
      <Link href="/admin/productos" className="flex items-center gap-2 text-sm mb-8" style={{ color: "#6B7280" }}>
        <ChevronLeft size={16} /> Volver a productos
      </Link>
      <h1 className="font-display font-bold text-white text-2xl mb-8">Nuevo producto</h1>
      <ProductForm />
    </div>
  );
}
