import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ProductForm } from "@/components/admin/ProductForm";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import type { Product } from "@/types";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditarProductoPage({ params }: Props) {
  const session = await getServerSession(authOptions);
  if ((session?.user as { role?: string })?.role !== "ADMIN") redirect("/admin/login");

  const { id } = await params;
  const raw = await prisma.product.findUnique({
    where: { id },
    include: { images: { orderBy: { order: "asc" } } },
  });

  if (!raw) redirect("/admin/productos");

  const product: Product = {
    ...raw,
    compareAt: raw.compareAt ?? null,
    sku: raw.sku ?? null,
    brand: raw.brand ?? null,
    createdAt: raw.createdAt.toISOString(),
    updatedAt: raw.updatedAt.toISOString(),
    images: raw.images.map((img) => ({
      ...img,
      alt: img.alt ?? null,
    })),
  };

  return (
    <div className="p-8 max-w-4xl">
      <Link href="/admin/productos" className="flex items-center gap-2 text-sm mb-8" style={{ color: "#6B7280" }}>
        <ChevronLeft size={16} /> Volver a productos
      </Link>
      <h1 className="font-display font-bold text-white text-2xl mb-8">Editar producto</h1>
      <ProductForm product={product} />
    </div>
  );
}
