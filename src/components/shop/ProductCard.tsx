"use client";

import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const firstImage = product.images?.[0]?.url ?? "/fotos/oncycles-09.jpg";
  const secondImage = product.images?.[1]?.url ?? firstImage;

  return (
    <Link href={`/tienda/${product.slug}`} className="block group">
      <div
        className="card-hover rounded-2xl overflow-hidden"
        style={{
          backgroundColor: "#0F1420",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {/* Image container - 4:5 ratio */}
        <div className="relative overflow-hidden" style={{ aspectRatio: "4/5" }}>
          <Image
            src={firstImage}
            alt={product.name}
            fill
            className="object-cover transition-opacity duration-500 group-hover:opacity-0"
          />
          <Image
            src={secondImage}
            alt={product.name}
            fill
            className="object-cover transition-opacity duration-500 opacity-0 group-hover:opacity-100"
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to top, rgba(10,14,26,0.8) 0%, transparent 60%)" }}
          />
          {product.featured && (
            <div className="absolute top-3 left-3">
              <Badge
                className="text-xs font-semibold tracking-wider uppercase"
                style={{ backgroundColor: "#1E5FFF", color: "white", border: "none" }}
              >
                Destacado
              </Badge>
            </div>
          )}
          {product.compareAt && product.compareAt > product.price && (
            <div className="absolute top-3 right-3">
              <Badge
                className="text-xs font-semibold"
                style={{ backgroundColor: "#EF4444", color: "white", border: "none" }}
              >
                Oferta
              </Badge>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-4">
          {product.brand && (
            <p className="text-xs tracking-wider uppercase mb-1" style={{ color: "#6B7280" }}>
              {product.brand}
            </p>
          )}
          <h3 className="font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors leading-snug">
            {product.name}
          </h3>
          <div className="flex items-center gap-2">
            <span className="font-mono-price font-bold text-lg text-white">
              {formatPrice(product.price, product.currency)}
            </span>
            {product.compareAt && product.compareAt > product.price && (
              <span className="font-mono-price text-sm line-through" style={{ color: "#6B7280" }}>
                {formatPrice(product.compareAt, product.currency)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
