"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Link from "next/link";
import { ChevronLeft, Plus, Trash2, Star } from "lucide-react";
import type { Address } from "@/types";

const schema = z.object({
  label: z.string().min(1),
  fullName: z.string().min(2),
  street: z.string().min(5),
  city: z.string().min(2),
  postalCode: z.string().min(4),
  country: z.string().min(2),
  phone: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function DireccionesPage() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { country: "España" },
  });

  const fetchAddresses = async () => {
    setLoading(true);
    const res = await fetch("/api/usuario?addresses=1");
    if (res.ok) setAddresses(await res.json());
    setLoading(false);
  };

  useEffect(() => { fetchAddresses(); }, []);

  const onSubmit = async (data: FormData) => {
    const res = await fetch("/api/usuario", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "addAddress", ...data }),
    });
    if (res.ok) { toast.success("Dirección guardada"); setOpen(false); reset(); fetchAddresses(); }
    else toast.error("Error al guardar");
  };

  const deleteAddress = async (id: string) => {
    await fetch("/api/usuario", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "deleteAddress", id }) });
    fetchAddresses();
    toast.success("Dirección eliminada");
  };

  const inputStyle = { backgroundColor: "#161C2E", border: "1px solid rgba(255,255,255,0.08)", color: "#F5F7FA" };

  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: "#0A0E1A", minHeight: "100vh" }}>
        <div className="max-w-3xl mx-auto px-6 py-16">
          <Link href="/cuenta" className="flex items-center gap-2 text-sm mb-8" style={{ color: "#6B7280" }}>
            <ChevronLeft size={16} /> Volver
          </Link>
          <div className="flex items-center justify-between mb-8">
            <h1 className="font-display font-bold text-white text-2xl">Mis direcciones</h1>
            <button onClick={() => setOpen(true)} className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-white" style={{ backgroundColor: "#1E5FFF" }}>
              <Plus size={14} /> Añadir
            </button>
          </div>

          {loading ? (
            <div className="space-y-3">
              {[1,2].map((i) => <div key={i} className="h-24 rounded-2xl animate-pulse" style={{ backgroundColor: "#0F1420" }} />)}
            </div>
          ) : addresses.length === 0 ? (
            <p style={{ color: "#9CA3AF" }}>No tienes direcciones guardadas.</p>
          ) : (
            <div className="space-y-3">
              {addresses.map((addr) => (
                <div key={addr.id} className="p-5 rounded-2xl flex items-start justify-between" style={{ backgroundColor: "#0F1420", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-white">{addr.label}</span>
                      {addr.isDefault && <Star size={12} fill="#F59E0B" color="#F59E0B" />}
                    </div>
                    <p className="text-sm" style={{ color: "#9CA3AF" }}>{addr.fullName} · {addr.street}, {addr.postalCode} {addr.city}, {addr.country}</p>
                    {addr.phone && <p className="text-xs mt-0.5" style={{ color: "#6B7280" }}>{addr.phone}</p>}
                  </div>
                  <button onClick={() => deleteAddress(addr.id)} className="p-2 rounded-lg hover:bg-white/5">
                    <Trash2 size={15} color="#6B7280" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent style={{ backgroundColor: "#0F1420", border: "1px solid rgba(255,255,255,0.08)", color: "#F5F7FA" }}>
          <DialogHeader><DialogTitle className="text-white">Nueva dirección</DialogTitle></DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            {[
              { name: "label" as const, label: "Etiqueta", placeholder: "Casa, Trabajo..." },
              { name: "fullName" as const, label: "Nombre completo", placeholder: "" },
              { name: "street" as const, label: "Calle y número", placeholder: "" },
              { name: "city" as const, label: "Ciudad", placeholder: "" },
              { name: "postalCode" as const, label: "Código postal", placeholder: "" },
              { name: "country" as const, label: "País", placeholder: "" },
              { name: "phone" as const, label: "Teléfono", placeholder: "" },
            ].map(({ name, label, placeholder }) => (
              <div key={name}>
                <label className="block text-xs font-medium mb-1" style={{ color: "#9CA3AF" }}>{label}</label>
                <input {...register(name)} className="w-full px-3 py-2 rounded-xl text-sm focus:outline-none" style={inputStyle} placeholder={placeholder} />
              </div>
            ))}
            <button type="submit" disabled={isSubmitting} className="w-full py-3 rounded-full font-semibold text-white mt-2" style={{ backgroundColor: "#1E5FFF" }}>
              Guardar dirección
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
