"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import Link from "next/link";
import Image from "next/image";
import { signIn } from "next-auth/react";

const schema = z.object({
  name: z.string().min(2, "Nombre requerido"),
  email: z.string().email("Email inválido"),
  phone: z.string().optional(),
  password: z.string().min(8, "Mínimo 8 caracteres"),
  confirm: z.string(),
}).refine((d) => d.password === d.confirm, {
  message: "Las contraseñas no coinciden",
  path: ["confirm"],
});

type FormData = z.infer<typeof schema>;

export default function RegistroPage() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    const res = await fetch("/api/usuario", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: data.name, email: data.email, phone: data.phone, password: data.password }),
    });
    if (!res.ok) {
      const err = await res.json();
      toast.error(err.error || "Error al crear la cuenta");
      return;
    }
    toast.success("Cuenta creada correctamente");
    await signIn("credentials", { email: data.email, password: data.password, redirect: false });
    router.push("/cuenta");
    router.refresh();
  };

  const inputClass = "w-full px-4 py-3 rounded-xl text-sm transition-colors focus:outline-none";
  const inputStyle = { backgroundColor: "#161C2E", border: "1px solid rgba(255,255,255,0.08)", color: "#F5F7FA" };

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: "#0A0E1A" }}>
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-sm">
          <Link href="/" className="font-display font-bold text-2xl tracking-[0.08em] uppercase block mb-10">
            <span className="text-white">ON</span><span style={{ color: "#1E5FFF" }}>·</span><span className="text-white">CYCLES</span>
          </Link>

          <h1 className="font-display font-bold text-white text-3xl mb-2">Crear cuenta</h1>
          <p className="text-sm mb-8" style={{ color: "#9CA3AF" }}>Únete al laboratorio y gestiona tus pedidos y servicios.</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "#9CA3AF" }}>Nombre completo *</label>
              <input {...register("name")} className={inputClass} style={inputStyle} placeholder="Tu nombre" />
              {errors.name && <p className="text-xs mt-1" style={{ color: "#EF4444" }}>{errors.name.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "#9CA3AF" }}>Email *</label>
              <input type="email" {...register("email")} className={inputClass} style={inputStyle} placeholder="tu@email.com" />
              {errors.email && <p className="text-xs mt-1" style={{ color: "#EF4444" }}>{errors.email.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "#9CA3AF" }}>Teléfono</label>
              <input type="tel" {...register("phone")} className={inputClass} style={inputStyle} placeholder="+34 600 000 000" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "#9CA3AF" }}>Contraseña *</label>
              <input type="password" {...register("password")} className={inputClass} style={inputStyle} placeholder="Mínimo 8 caracteres" />
              {errors.password && <p className="text-xs mt-1" style={{ color: "#EF4444" }}>{errors.password.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "#9CA3AF" }}>Confirmar contraseña *</label>
              <input type="password" {...register("confirm")} className={inputClass} style={inputStyle} placeholder="Repite la contraseña" />
              {errors.confirm && <p className="text-xs mt-1" style={{ color: "#EF4444" }}>{errors.confirm.message}</p>}
            </div>
            <button type="submit" disabled={isSubmitting} className="w-full py-4 rounded-full font-semibold text-white transition-all mt-2" style={{ backgroundColor: "#1E5FFF" }}>
              {isSubmitting ? "Creando cuenta..." : "Crear cuenta"}
            </button>
          </form>

          <p className="text-sm text-center mt-6" style={{ color: "#6B7280" }}>
            ¿Ya tienes cuenta?{" "}
            <Link href="/login" style={{ color: "#4A8FFF" }}>Iniciar sesión</Link>
          </p>
        </div>
      </div>

      <div className="hidden lg:block relative w-1/2">
        <Image src="/fotos/oncycles-04.jpg" alt="On Cycles" fill className="object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, #0A0E1A 0%, rgba(10,14,26,0.3) 100%)" }} />
      </div>
    </div>
  );
}
