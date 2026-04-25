"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { Filters } from "@/components/shop/Filters";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import type { Product } from "@/types";

export default function TiendaPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/productos")
      .then((r) => r.json())
      .then((data: Product[]) => {
        setProducts(data);
        setFiltered(data);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleFilter = (category: string, sort: string) => {
    let result = [...products];
    if (category !== "Todos") {
      result = result.filter((p) => p.category === category);
    }
    switch (sort) {
      case "price_asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "featured":
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
      default:
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
    setFiltered(result);
  };

  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh" }}>
        {/* Header */}
        <div
          className="py-20 text-center"
          style={{
            background: "linear-gradient(to bottom, #0F1420, #0A0E1A)",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <p className="text-xs tracking-[0.35em] uppercase mb-4" style={{ color: "#1E5FFF" }}>
            Componentes de alta gama
          </p>
          <h1 className="font-display font-bold text-white" style={{ fontSize: "clamp(2rem,5vw,4rem)" }}>
            Tienda
          </h1>
        </div>

        <Filters onFilter={handleFilter} total={filtered.length} />

        <div className="max-w-7xl mx-auto px-6 py-12">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-2xl animate-pulse" style={{ backgroundColor: "#0F1420", aspectRatio: "4/5" }} />
              ))}
            </div>
          ) : (
            <ProductGrid products={filtered} />
          )}
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
