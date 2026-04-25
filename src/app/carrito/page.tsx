"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { useCart } from "@/lib/cart-store";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X, ShoppingBag, ExternalLink } from "lucide-react";
import { useState } from "react";

export default function CarritoPage() {
  const { items, removeItem, updateQuantity, total } = useCart();
  const [showMultipleWarning, setShowMultipleWarning] = useState(false);

  const handleCheckout = () => {
    if (items.length > 1) {
      setShowMultipleWarning(true);
      return;
    }
    if (items[0]) {
      window.open(items[0].stripeLink, "_blank");
    }
  };

  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: "#0A0E1A", minHeight: "100vh" }}>
        <div className="max-w-5xl mx-auto px-6 py-16">
          <h1 className="font-display font-bold text-white text-3xl mb-10">Tu carrito</h1>

          {items.length === 0 ? (
            <div className="text-center py-24">
              <ShoppingBag size={64} className="mx-auto mb-4" style={{ color: "#1F2937" }} />
              <p className="text-xl font-semibold text-white mb-2">Tu carrito está vacío</p>
              <p className="mb-8" style={{ color: "#9CA3AF" }}>Descubre nuestros productos de alta gama.</p>
              <Link href="/tienda" className="px-8 py-3 rounded-full font-semibold text-white" style={{ backgroundColor: "#1E5FFF" }}>
                Ir a la tienda
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Items */}
              <div className="lg:col-span-2 space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-5 rounded-2xl"
                    style={{ backgroundColor: "#0F1420", border: "1px solid rgba(255,255,255,0.06)" }}
                  >
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-white mb-1 truncate">{item.name}</p>
                      <p className="font-mono-price text-sm font-bold mb-3" style={{ color: "#1E5FFF" }}>
                        {formatPrice(item.price, item.currency)}
                      </p>
                      <div className="flex items-center gap-3">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-7 h-7 rounded flex items-center justify-center transition-colors" style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
                          <Minus size={12} color="#9CA3AF" />
                        </button>
                        <span className="font-mono-price text-white w-6 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-7 h-7 rounded flex items-center justify-center transition-colors" style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
                          <Plus size={12} color="#9CA3AF" />
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col items-end justify-between">
                      <button onClick={() => removeItem(item.id)} className="p-1 rounded hover:bg-white/5">
                        <X size={16} color="#6B7280" />
                      </button>
                      <p className="font-mono-price font-bold text-white">
                        {formatPrice(item.price * item.quantity, item.currency)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div>
                <div className="p-6 rounded-2xl sticky top-36" style={{ backgroundColor: "#0F1420", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <h2 className="font-display font-bold text-white text-lg mb-6">Resumen</h2>
                  <div className="space-y-3 mb-6 pb-6" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                    {items.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span style={{ color: "#9CA3AF" }}>{item.name} ×{item.quantity}</span>
                        <span className="font-mono-price text-white">{formatPrice(item.price * item.quantity)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between items-center mb-6">
                    <span className="font-semibold text-white">Total</span>
                    <span className="font-mono-price font-bold text-2xl text-white">{formatPrice(total())}</span>
                  </div>
                  <button
                    onClick={handleCheckout}
                    className="w-full py-4 rounded-full font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2"
                    style={{ backgroundColor: "#1E5FFF" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "#4A8FFF")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "#1E5FFF")}
                  >
                    <ExternalLink size={16} />
                    Finalizar compra
                  </button>

                  {showMultipleWarning && (
                    <div className="mt-4 p-4 rounded-xl" style={{ backgroundColor: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.3)" }}>
                      <p className="text-xs mb-3" style={{ color: "#F59E0B" }}>
                        Tienes varios productos en el carrito. Debes comprarlos por separado. Haz clic en el producto que deseas comprar:
                      </p>
                      <div className="space-y-2">
                        {items.map((item) => (
                          <a
                            key={item.id}
                            href={item.stripeLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between text-xs p-2 rounded-lg transition-colors hover:bg-white/5"
                            style={{ color: "#4A8FFF" }}
                          >
                            {item.name}
                            <ExternalLink size={10} />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
