"use client";

import { useState } from "react";
import Image from "next/image";
import type { ProductImage } from "@/types";

interface ProductGalleryProps {
  images: ProductImage[];
  productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selected, setSelected] = useState(0);
  const sorted = [...images].sort((a, b) => a.order - b.order);

  if (sorted.length === 0) {
    return (
      <div
        className="relative rounded-2xl overflow-hidden"
        style={{ aspectRatio: "1/1", backgroundColor: "#0F1420", border: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="absolute inset-0 flex items-center justify-center" style={{ color: "#6B7280" }}>
          Sin imagen
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-4">
      {/* Thumbnails */}
      {sorted.length > 1 && (
        <div className="flex flex-col gap-2 w-20 shrink-0">
          {sorted.map((img, i) => (
            <button
              key={img.id}
              onClick={() => setSelected(i)}
              className="relative w-20 h-20 rounded-lg overflow-hidden transition-all duration-200"
              style={{
                border: i === selected ? "2px solid #1E5FFF" : "2px solid rgba(255,255,255,0.06)",
              }}
            >
              <Image src={img.url} alt={img.alt ?? productName} fill className="object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Main image */}
      <div
        className="relative flex-1 rounded-2xl overflow-hidden"
        style={{ aspectRatio: "1/1", backgroundColor: "#0F1420", border: "1px solid rgba(255,255,255,0.06)" }}
      >
        <Image
          src={sorted[selected]?.url ?? ""}
          alt={sorted[selected]?.alt ?? productName}
          fill
          className="object-cover transition-opacity duration-300"
          priority
        />
      </div>
    </div>
  );
}
