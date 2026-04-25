"use client";

import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

const schema = z.object({
  name: z.string().min(2),
  phone: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function PerfilPage() {
  const { data: session } = useSession();
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { name: session?.user?.name ?? "", phone: "" },
  });

  const onSubmit = async (data: FormData) => {
    const res = await fetch("/api/usuario", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) toast.success("Perfil actualizado");
    else toast.error("Error al actualizar");
  };

  const inputClass = "w-full px-4 py-3 rounded-xl text-sm focus:outline-none";
  const inputStyle = { backgroundColor: "#161C2E", border: "1px solid rgba(255,255,255,0.08)", color: "#F5F7FA" };

  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: "#0A0E1A", minHeight: "100vh" }}>
        <div className="max-w-2xl mx-auto px-6 py-16">
          <Link href="/cuenta" className="flex items-center gap-2 text-sm mb-8 transition-colors" style={{ color: "#6B7280" }}>
            <ChevronLeft size={16} /> Volver
          </Link>
          <h1 className="font-display font-bold text-white text-2xl mb-8">Mi perfil</h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 p-8 rounded-2xl" style={{ backgroundColor: "#0F1420", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "#9CA3AF" }}>Nombre</label>
              <input {...register("name")} className={inputClass} style={inputStyle} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "#9CA3AF" }}>Email (solo lectura)</label>
              <input value={session?.user?.email ?? ""} readOnly className={inputClass} style={{ ...inputStyle, opacity: 0.5, cursor: "not-allowed" }} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "#9CA3AF" }}>Teléfono</label>
              <input type="tel" {...register("phone")} className={inputClass} style={inputStyle} />
            </div>
            <button type="submit" disabled={isSubmitting} className="px-8 py-3 rounded-full font-semibold text-white" style={{ backgroundColor: "#1E5FFF" }}>
              {isSubmitting ? "Guardando..." : "Guardar cambios"}
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
