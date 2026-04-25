"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const schema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Contraseña requerida"),
});

type FormData = z.infer<typeof schema>;

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (result?.error) {
      toast.error("Email o contraseña incorrectos");
    } else {
      toast.success("Sesión iniciada");
      router.push("/cuenta");
      router.refresh();
    }
  };

  const inputClass = "w-full px-4 py-3 rounded-xl text-sm transition-colors focus:outline-none";
  const inputStyle = { backgroundColor: "#161C2E", border: "1px solid rgba(255,255,255,0.08)", color: "#F5F7FA" };

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: "#0A0E1A" }}>
      {/* Left: Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-sm">
          <Link href="/" className="font-display font-bold text-2xl tracking-[0.08em] uppercase block mb-12">
            <span className="text-white">ON</span>
            <span style={{ color: "#1E5FFF" }}>·</span>
            <span className="text-white">CYCLES</span>
          </Link>

          <h1 className="font-display font-bold text-white text-3xl mb-2">Bienvenido</h1>
          <p className="text-sm mb-8" style={{ color: "#9CA3AF" }}>
            Accede a tu cuenta para gestionar tus pedidos y datos.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "#9CA3AF" }}>Email</label>
              <input type="email" {...register("email")} className={inputClass} style={inputStyle} placeholder="tu@email.com" />
              {errors.email && <p className="text-xs mt-1" style={{ color: "#EF4444" }}>{errors.email.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "#9CA3AF" }}>Contraseña</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  className={`${inputClass} pr-10`}
                  style={inputStyle}
                  placeholder="••••••••"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2">
                  {showPassword ? <EyeOff size={16} color="#6B7280" /> : <Eye size={16} color="#6B7280" />}
                </button>
              </div>
              {errors.password && <p className="text-xs mt-1" style={{ color: "#EF4444" }}>{errors.password.message}</p>}
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-full font-semibold text-white transition-all duration-300 mt-2"
              style={{ backgroundColor: "#1E5FFF" }}
            >
              {isSubmitting ? "Entrando..." : "Iniciar sesión"}
            </button>
          </form>

          <p className="text-sm text-center mt-6" style={{ color: "#6B7280" }}>
            ¿No tienes cuenta?{" "}
            <Link href="/registro" className="transition-colors" style={{ color: "#4A8FFF" }}>
              Crear cuenta
            </Link>
          </p>
        </div>
      </div>

      {/* Right: Image */}
      <div className="hidden lg:block relative w-1/2">
        <Image src="/fotos/oncycles-02.jpg" alt="On Cycles" fill className="object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, #0A0E1A 0%, rgba(10,14,26,0.3) 100%)" }} />
        <div className="absolute inset-0 flex items-center justify-center p-16">
          <div>
            <p className="text-xs tracking-[0.35em] uppercase mb-4" style={{ color: "#1E5FFF" }}>Bienvenido de nuevo</p>
            <p className="font-display font-bold text-white text-4xl leading-tight">al laboratorio.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
