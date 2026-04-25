"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useCart } from "@/lib/cart-store";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { X, Plus, Minus, ShoppingBag } from "lucide-react";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, total } = useCart();

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent
        side="right"
        className="flex flex-col w-full sm:max-w-md p-0"
        style={{ backgroundColor: "#0F1420", border: "none", borderLeft: "1px solid rgba(255,255,255,0.06)" }}
      >
        <SheetHeader className="px-6 py-5" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <SheetTitle className="font-display font-bold text-white text-lg flex items-center gap-2">
            <ShoppingBag size={20} style={{ color: "#1E5FFF" }} />
            Carrito ({items.length})
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 p-6">
            <ShoppingBag size={48} style={{ color: "#1F2937" }} />
            <p style={{ color: "#9CA3AF" }}>Tu carrito está vacío</p>
            <Link
              href="/tienda"
              onClick={onClose}
              className="px-6 py-3 rounded-full text-sm font-semibold text-white"
              style={{ backgroundColor: "#1E5FFF" }}
            >
              Ver tienda
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-4 rounded-xl"
                  style={{ backgroundColor: "#161C2E", border: "1px solid rgba(255,255,255,0.04)" }}
                >
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{item.name}</p>
                    <p className="font-mono-price text-sm font-bold mt-1" style={{ color: "#1E5FFF" }}>
                      {formatPrice(item.price * item.quantity, item.currency)}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 rounded flex items-center justify-center transition-colors hover:bg-white/10"
                        style={{ border: "1px solid rgba(255,255,255,0.1)" }}
                      >
                        <Minus size={12} color="#9CA3AF" />
                      </button>
                      <span className="font-mono-price text-sm text-white w-5 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 rounded flex items-center justify-center transition-colors hover:bg-white/10"
                        style={{ border: "1px solid rgba(255,255,255,0.1)" }}
                      >
                        <Plus size={12} color="#9CA3AF" />
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="shrink-0 p-1 rounded transition-colors hover:bg-white/5"
                    aria-label="Eliminar"
                  >
                    <X size={16} color="#6B7280" />
                  </button>
                </div>
              ))}
            </div>

            <div className="p-6" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="flex items-center justify-between mb-4">
                <span style={{ color: "#9CA3AF" }}>Total</span>
                <span className="font-mono-price font-bold text-xl text-white">
                  {formatPrice(total())}
                </span>
              </div>
              <Link
                href="/carrito"
                onClick={onClose}
                className="block w-full text-center py-4 rounded-full font-semibold text-white text-sm transition-all duration-300 mb-3"
                style={{ backgroundColor: "#1E5FFF" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "#4A8FFF")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "#1E5FFF")}
              >
                Ver carrito completo
              </Link>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
