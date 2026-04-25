"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";
import { ChevronLeft, AlertTriangle } from "lucide-react";
import { useState } from "react";

const schema = z.object({
  currentPassword: z.string().min(1, "Contraseña actual requerida"),
  newPassword: z.string().min(8, "Mínimo 8 caracteres"),
  confirmPassword: z.string(),
}).refine((d) => d.newPassword === d.confirmPassword, { message: "Las contraseñas no coinciden", path: ["confirmPassword"] });

type FormData = z.infer<typeof schema>;

export default function SeguridadPage() {
  const router = useRouter();
  const [showDelete, setShowDelete] = useState(false);
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    const res = await fetch("/api/usuario", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "changePassword", currentPassword: data.currentPassword, newPassword: data.newPassword }),
    });
    if (res.ok) { toast.success("Contraseña actualizada"); reset(); }
    else { const err = await res.json(); toast.error(err.error || "Error al actualizar"); }
  };

  const handleDeleteAccount = async () => {
    await fetch("/api/usuario", { method: "DELETE" });
    await signOut({ redirect: false });
    router.push("/");
    toast.success("Cuenta eliminada");
  };

  const inputStyle = { backgroundColor: "#161C2E", border: "1px solid rgba(255,255,255,0.08)", color: "#F5F7FA" };
  const inputClass = "w-full px-4 py-3 rounded-xl text-sm focus:outline-none";

  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: "#0A0E1A", minHeight: "100vh" }}>
        <div className="max-w-2xl mx-auto px-6 py-16">
          <Link href="/cuenta" className="flex items-center gap-2 text-sm mb-8" style={{ color: "#6B7280" }}>
            <ChevronLeft size={16} /> Volver
          </Link>
          <h1 className="font-display font-bold text-white text-2xl mb-8">Seguridad</h1>

          {/* Change password */}
          <form onSubmit={handleSubmit(onSubmit)} className="p-8 rounded-2xl mb-6 space-y-4" style={{ backgroundColor: "#0F1420", border: "1px solid rgba(255,255,255,0.06)" }}>
            <h2 className="font-semibold text-white mb-4">Cambiar contraseña</h2>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "#9CA3AF" }}>Contraseña actual</label>
              <input type="password" {...register("currentPassword")} className={inputClass} style={inputStyle} />
              {errors.currentPassword && <p className="text-xs mt-1" style={{ color: "#EF4444" }}>{errors.currentPassword.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "#9CA3AF" }}>Nueva contraseña</label>
              <input type="password" {...register("newPassword")} className={inputClass} style={inputStyle} />
              {errors.newPassword && <p className="text-xs mt-1" style={{ color: "#EF4444" }}>{errors.newPassword.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "#9CA3AF" }}>Confirmar contraseña</label>
              <input type="password" {...register("confirmPassword")} className={inputClass} style={inputStyle} />
              {errors.confirmPassword && <p className="text-xs mt-1" style={{ color: "#EF4444" }}>{errors.confirmPassword.message}</p>}
            </div>
            <button type="submit" disabled={isSubmitting} className="px-8 py-3 rounded-full font-semibold text-white" style={{ backgroundColor: "#1E5FFF" }}>
              {isSubmitting ? "Actualizando..." : "Actualizar contraseña"}
            </button>
          </form>

          {/* Sign out all devices */}
          <div className="p-6 rounded-2xl mb-4" style={{ backgroundColor: "#0F1420", border: "1px solid rgba(255,255,255,0.06)" }}>
            <button onClick={() => signOut({ callbackUrl: "/login" })} className="text-sm font-medium transition-colors" style={{ color: "#9CA3AF" }}>
              Cerrar sesión en todos los dispositivos →
            </button>
          </div>

          {/* Delete account */}
          <div className="p-6 rounded-2xl" style={{ backgroundColor: "#0F1420", border: "1px solid rgba(239,68,68,0.2)" }}>
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle size={16} style={{ color: "#EF4444" }} />
              <h3 className="font-semibold" style={{ color: "#EF4444" }}>Zona de peligro</h3>
            </div>
            <p className="text-sm mb-4" style={{ color: "#9CA3AF" }}>Eliminar tu cuenta es una acción irreversible. Perderás todos tus datos.</p>
            {!showDelete ? (
              <button onClick={() => setShowDelete(true)} className="text-sm font-medium" style={{ color: "#EF4444" }}>
                Eliminar cuenta
              </button>
            ) : (
              <div className="flex gap-3">
                <button onClick={handleDeleteAccount} className="px-4 py-2 rounded-full text-sm font-semibold text-white" style={{ backgroundColor: "#EF4444" }}>
                  Confirmar eliminación
                </button>
                <button onClick={() => setShowDelete(false)} className="px-4 py-2 rounded-full text-sm font-semibold" style={{ border: "1px solid rgba(255,255,255,0.1)", color: "#9CA3AF" }}>
                  Cancelar
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
