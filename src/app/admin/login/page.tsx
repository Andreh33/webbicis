"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Shield } from "lucide-react";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

type FormData = z.infer<typeof schema>;

export default function AdminLoginPage() {
  const router = useRouter();
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    const result = await signIn("credentials", { email: data.email, password: data.password, redirect: false });
    if (result?.error) toast.error("Acceso denegado");
    else { router.push("/admin"); router.refresh(); }
  };

  const inputStyle = { backgroundColor: "#161C2E", border: "1px solid rgba(255,255,255,0.08)", color: "#F5F7FA" };

  return (
    <div className="min-h-screen flex items-center justify-center p-8" style={{ backgroundColor: "#0A0E1A" }}>
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-3 mb-12">
          <div className="p-3 rounded-xl" style={{ backgroundColor: "rgba(30,95,255,0.1)" }}>
            <Shield size={20} style={{ color: "#1E5FFF" }} />
          </div>
          <div>
            <p className="font-display font-bold text-white text-lg">ON·CYCLES</p>
            <p className="text-xs" style={{ color: "#6B7280" }}>Panel de administración</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: "#9CA3AF" }}>Email</label>
            <input type="email" {...register("email")} className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none" style={inputStyle} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: "#9CA3AF" }}>Contraseña</label>
            <input type="password" {...register("password")} className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none" style={inputStyle} />
          </div>
          <button type="submit" disabled={isSubmitting} className="w-full py-4 rounded-full font-semibold text-white mt-2" style={{ backgroundColor: "#1E5FFF" }}>
            {isSubmitting ? "Entrando..." : "Acceder"}
          </button>
        </form>
      </div>
    </div>
  );
}
