"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { Map } from "@/components/shared/Map";
import { Marquee } from "@/components/layout/Marquee";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";

function InstagramIcon({ size = 18, style }: { size?: number; style?: React.CSSProperties }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

const schema = z.object({
  name: z.string().min(2, "Nombre requerido"),
  email: z.string().email("Email inválido"),
  phone: z.string().optional(),
  message: z.string().min(10, "Mensaje demasiado corto"),
});

type FormData = z.infer<typeof schema>;

export default function ContactoPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    const res = await fetch("/api/contacto", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      toast.success("Mensaje enviado. Te contactaremos pronto.");
      reset();
    } else {
      toast.error("Error al enviar el mensaje. Inténtalo de nuevo.");
    }
  };

  const inputClass = "w-full px-4 py-3 rounded-xl text-sm transition-colors focus:outline-none focus:ring-2";
  const inputStyle = {
    backgroundColor: "#161C2E",
    border: "1px solid rgba(255,255,255,0.08)",
    color: "#F5F7FA",
    "--tw-ring-color": "#1E5FFF",
  } as React.CSSProperties;

  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: "#0A0E1A", minHeight: "100vh" }}>
        {/* Hero */}
        <div className="py-24 text-center" style={{ background: "linear-gradient(to bottom, #0F1420, #0A0E1A)" }}>
          <ScrollReveal>
            <p className="text-xs tracking-[0.35em] uppercase mb-4" style={{ color: "#1E5FFF" }}>
              Estamos aquí para ayudarte
            </p>
            <h1 className="font-display font-bold text-white" style={{ fontSize: "clamp(2rem,5vw,4rem)" }}>
              Contacto
            </h1>
          </ScrollReveal>
        </div>

        <div className="max-w-7xl mx-auto px-6 pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Form */}
            <ScrollReveal>
              <div
                className="p-8 rounded-2xl"
                style={{ backgroundColor: "#0F1420", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <h2 className="font-display font-bold text-white text-2xl mb-6">Envíanos un mensaje</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: "#9CA3AF" }}>Nombre *</label>
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
                    <label className="block text-sm font-medium mb-2" style={{ color: "#9CA3AF" }}>Mensaje *</label>
                    <textarea
                      {...register("message")}
                      rows={5}
                      className={inputClass}
                      style={{ ...inputStyle, resize: "vertical" }}
                      placeholder="Cuéntanos qué necesita tu bicicleta..."
                    />
                    {errors.message && <p className="text-xs mt-1" style={{ color: "#EF4444" }}>{errors.message.message}</p>}
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-full font-semibold text-white transition-all duration-300"
                    style={{ backgroundColor: isSubmitting ? "#1a3a8a" : "#1E5FFF" }}
                    onMouseEnter={(e) => !isSubmitting && ((e.currentTarget as HTMLElement).style.backgroundColor = "#4A8FFF")}
                    onMouseLeave={(e) => !isSubmitting && ((e.currentTarget as HTMLElement).style.backgroundColor = "#1E5FFF")}
                  >
                    {isSubmitting ? "Enviando..." : "Enviar mensaje"}
                  </button>
                </form>
              </div>
            </ScrollReveal>

            {/* Info */}
            <ScrollReveal delay={0.2}>
              <div className="space-y-8">
                <div>
                  <h2 className="font-display font-bold text-white text-2xl mb-6">Dónde encontrarnos</h2>
                  <div className="space-y-4">
                    {[
                      { icon: <MapPin size={18} style={{ color: "#1E5FFF" }} />, label: "Dirección", value: "Calle París 44, 08029 Barcelona", href: undefined },
                      { icon: <Phone size={18} style={{ color: "#1E5FFF" }} />, label: "Teléfono", value: "+34 678 297 995", href: "tel:+34678297995" },
                      { icon: <Mail size={18} style={{ color: "#1E5FFF" }} />, label: "Email", value: "info@oncycles.es", href: "mailto:info@oncycles.es" },
                      { icon: <InstagramIcon size={18} style={{ color: "#1E5FFF" }} />, label: "Instagram", value: "@oncycles", href: "https://instagram.com/oncycles" },
                    ].map(({ icon, label, value, href }) => (
                      <div key={label} className="flex items-start gap-4">
                        <div className="mt-0.5 shrink-0">{icon}</div>
                        <div>
                          <p className="text-xs uppercase tracking-wider mb-0.5" style={{ color: "#6B7280" }}>{label}</p>
                          {href ? (
                            <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="text-white hover:text-blue-400 transition-colors">
                              {value}
                            </a>
                          ) : (
                            <p className="text-white">{value}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Schedule */}
                <div className="p-6 rounded-2xl" style={{ backgroundColor: "#0F1420", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <div className="flex items-center gap-2 mb-4">
                    <Clock size={16} style={{ color: "#1E5FFF" }} />
                    <h3 className="font-semibold text-white">Horario</h3>
                  </div>
                  <div className="space-y-2 text-sm" style={{ color: "#9CA3AF" }}>
                    <div className="flex justify-between">
                      <span>Lunes – Viernes</span>
                      <span className="font-mono-price text-white">9:30–14:00 / 16:00–19:30</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sábado</span>
                      <span className="font-mono-price text-white">10:00–14:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Domingo</span>
                      <span style={{ color: "#6B7280" }}>Cerrado</span>
                    </div>
                  </div>
                </div>

                {/* WhatsApp CTA */}
                <a
                  href="https://wa.me/34678297995?text=Hola%2C%20me%20gustar%C3%ADa%20consultar%20sobre%20el%20servicio%20de%20mantenimiento"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 w-full py-4 rounded-full font-semibold text-white transition-all duration-300"
                  style={{ backgroundColor: "#25D366", boxShadow: "0 0 24px rgba(37,211,102,0.3)" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.boxShadow = "0 0 40px rgba(37,211,102,0.5)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.boxShadow = "0 0 24px rgba(37,211,102,0.3)")}
                >
                  <MessageCircle size={18} />
                  Escribir por WhatsApp
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Map */}
        <div className="w-full">
          <Map />
        </div>

        {/* Bottom marquee */}
        <div style={{ backgroundColor: "#0F1420", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="py-5">
            <Marquee speed={30}>
              {["¿NOS VISITAS?", "CALLE PARÍS 44", "EIXAMPLE", "BARCELONA", "✦"].map((t) => (
                <span key={t} className="font-display font-bold text-xl tracking-[0.25em] uppercase px-12" style={{ color: "rgba(255,255,255,0.12)" }}>
                  {t}
                </span>
              ))}
            </Marquee>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
