"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductGallery } from "@/components/shop/ProductGallery";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { useCart } from "@/lib/cart-store";
import { formatPrice, getFirstImage } from "@/lib/utils";
import { toast } from "sonner";
import { Star, ShoppingCart, ExternalLink, Check } from "lucide-react";
import type { Product } from "@/types";

export default function ProductoDetallePage() {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"descripcion" | "specs" | "envio">("descripcion");
  const addItem = useCart((s) => s.addItem);

  useEffect(() => {
    fetch(`/api/productos?slug=${slug}`)
      .then((r) => r.json())
      .then((data: Product[]) => {
        const p = Array.isArray(data) ? data.find((p) => p.slug === slug) : null;
        setProduct(p ?? null);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#0A0E1A" }}>
          <div className="w-10 h-10 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
        </div>
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#0A0E1A" }}>
          <p style={{ color: "#9CA3AF" }}>Producto no encontrado</p>
        </div>
      </>
    );
  }

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      currency: product.currency,
      quantity: 1,
      image: getFirstImage(product.images),
      stripeLink: product.stripeLink,
    });
    toast.success(`${product.name} añadido al carrito`);
  };

  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: "#0A0E1A", minHeight: "100vh" }}>
        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* Breadcrumb */}
          <p className="text-sm mb-8" style={{ color: "#6B7280" }}>
            <a href="/tienda" className="hover:text-white transition-colors">Tienda</a>
            {" / "}
            <span style={{ color: "#9CA3AF" }}>{product.name}</span>
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Gallery */}
            <ProductGallery images={product.images} productName={product.name} />

            {/* Info */}
            <div>
              {product.brand && (
                <p className="text-sm tracking-widest uppercase mb-2" style={{ color: "#6B7280" }}>
                  {product.brand}
                </p>
              )}
              <h1 className="font-display font-bold text-white mb-4 leading-tight" style={{ fontSize: "clamp(1.5rem,3vw,2.5rem)" }}>
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-6">
                {[1,2,3,4,5].map((i) => <Star key={i} size={14} fill="#F59E0B" color="#F59E0B" />)}
                <span className="text-sm" style={{ color: "#6B7280" }}>(4.9)</span>
              </div>

              {/* Price */}
              <div className="flex items-end gap-3 mb-6">
                <span className="font-mono-price font-bold" style={{ fontSize: "2rem", color: "#F5F7FA" }}>
                  {formatPrice(product.price, product.currency)}
                </span>
                {product.compareAt && product.compareAt > product.price && (
                  <span className="font-mono-price text-lg line-through" style={{ color: "#6B7280" }}>
                    {formatPrice(product.compareAt, product.currency)}
                  </span>
                )}
              </div>

              <p className="text-base leading-relaxed mb-8" style={{ color: "#9CA3AF" }}>
                {product.shortDesc}
              </p>

              {/* Stock badge */}
              <div className="flex items-center gap-2 mb-8">
                <Check size={14} style={{ color: "#10B981" }} />
                <span className="text-sm" style={{ color: "#10B981" }}>
                  {product.stock > 0 ? `${product.stock} unidades en stock` : "Consultar disponibilidad"}
                </span>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 mb-10">
                <a
                  href={product.stripeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-6 py-4 rounded-full font-semibold text-white transition-all duration-300 flex-1"
                  style={{ backgroundColor: "#1E5FFF", boxShadow: "0 0 30px rgba(30,95,255,0.3)" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "#4A8FFF")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "#1E5FFF")}
                >
                  <ExternalLink size={16} />
                  Comprar ahora
                </a>
                <button
                  onClick={handleAddToCart}
                  className="flex items-center justify-center gap-2 px-6 py-4 rounded-full font-semibold transition-all duration-300 flex-1"
                  style={{ border: "1px solid rgba(255,255,255,0.15)", color: "#F5F7FA" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "#1E5FFF")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.15)")}
                >
                  <ShoppingCart size={16} />
                  Añadir al carrito
                </button>
              </div>

              {/* Tabs */}
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="flex gap-6 pt-6 pb-4">
                  {(["descripcion", "specs", "envio"] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setTab(t)}
                      className="text-sm font-medium pb-2 transition-colors capitalize border-b-2"
                      style={{
                        borderColor: tab === t ? "#1E5FFF" : "transparent",
                        color: tab === t ? "#F5F7FA" : "#6B7280",
                      }}
                    >
                      {t === "descripcion" ? "Descripción" : t === "specs" ? "Especificaciones" : "Envío"}
                    </button>
                  ))}
                </div>
                <div className="text-sm leading-relaxed" style={{ color: "#9CA3AF" }}>
                  {tab === "descripcion" && <p>{product.description}</p>}
                  {tab === "specs" && (
                    <ul className="space-y-2">
                      {product.brand && <li><span className="text-white">Marca:</span> {product.brand}</li>}
                      {product.sku && <li><span className="text-white">SKU:</span> <span className="font-mono-price">{product.sku}</span></li>}
                      <li><span className="text-white">Categoría:</span> {product.category}</li>
                    </ul>
                  )}
                  {tab === "envio" && (
                    <p>Envío gratuito a partir de 100€. Plazo estimado: 3-5 días laborables en Península. Baleares y Canarias consultar.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
