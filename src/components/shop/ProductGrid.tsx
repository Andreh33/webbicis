import { ProductCard } from "./ProductCard";
import type { Product } from "@/types";

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="col-span-full text-center py-24">
        <p className="text-lg mb-2" style={{ color: "#9CA3AF" }}>
          No hay productos disponibles
        </p>
        <p className="text-sm" style={{ color: "#6B7280" }}>
          Vuelve pronto para ver las novedades.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
