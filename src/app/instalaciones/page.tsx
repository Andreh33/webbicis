import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { Marquee } from "@/components/layout/Marquee";
import Image from "next/image";
import { Check, Award, Zap } from "lucide-react";

const INSTALLATIONS = [
  {
    id: "lavado",
    title: "Centro de lavado integral",
    subtitle: "Limpieza profunda de chasis y componentes",
    description: "Nuestro centro de lavado profesional utiliza equipos de alta presión y productos específicos para cada material. Limpiamos cada rincón del cuadro, los componentes y la transmisión, preservando los acabados y los sellos de las suspensiones.",
    features: ["Lavado con agua caliente a presión controlada", "Productos biodegradables y respetuosos con los sellos", "Desengrasante para cadena, piñones y platos", "Secado con aire a presión y revisión de puntos críticos"],
    image: "/fotos/oncycles-09.jpg",
    badge: "EQUIPAMIENTO PROFESIONAL",
  },
  {
    id: "ultrasonido",
    title: "Limpieza por ultrasonido",
    subtitle: "Nivel microscópico",
    description: "Nuestro baño de ultrasonidos limpia los componentes a nivel molecular, eliminando la suciedad incrustada en zonas inaccesibles para los métodos convencionales. Especialmente indicado para bujes, rodamientos, frenos, cadenas y piezas de precisión.",
    features: ["Frecuencia de 40kHz para limpieza sin daños", "Temperatura controlada para cada tipo de componente", "Elimina oxidaciones y residuos de lubricantes degradados", "Certificado para rodamientos Öhlins, Fox y RockShox"],
    image: "/fotos/oncycles-10.jpg",
    badge: "TECNOLOGÍA AVANZADA",
  },
  {
    id: "bedding",
    title: "Máquina de Bedding",
    subtitle: "La revolución en rodaje de frenos",
    description: "El Bedding es el proceso de rodaje controlado de pastillas de freno nuevas. Nuestra máquina especializada reproduce ciclos de frenada precisos que transfieren uniformemente el material de la pastilla al disco, garantizando máxima potencia y modulación desde el primer uso.",
    features: ["Ciclos de temperatura y presión programados", "Compatibilidad con Shimano, SRAM, Magura y TRP", "Reduce el período de adaptación de semanas a minutos", "Certificación de resultado post-proceso"],
    image: "/fotos/oncycles-11.jpg",
    badge: "EXCLUSIVO EN BARCELONA",
  },
  {
    id: "suspensiones",
    title: "Banco de suspensiones",
    subtitle: "Herramientas especializadas",
    description: "Nuestro banco de suspensiones cuenta con el utillaje oficial de Öhlins, Fox, RockShox y Cane Creek. Realizamos mantenimientos preventivos, rebuilds completos y configuraciones personalizadas para cada piloto y estilo de conducción.",
    features: ["Manómetros calibrados para nitrógeno y aire", "Aceites oficiales de cada fabricante", "Utillaje específico para cada modelo de horquilla y amortiguador", "Registro histórico de configuraciones por cliente"],
    image: "/fotos/oncycles-12.jpg",
    badge: "SERVICIO TÉCNICO ÖHLINS",
  },
  {
    id: "ruedas",
    title: "Montaje de ruedas a la carta",
    subtitle: "Artesanía y precisión",
    description: "Construimos ruedas personalizadas seleccionando la combinación óptima de llanta, buje y radios según el peso del piloto, el tipo de terreno y el nivel de exigencia. Cada rueda sale centrada y con tensión de radios homogénea.",
    features: ["Combinaciones de DT Swiss, Sapim, Industry Nine y más", "Centrado con tensiómetro digital", "Tensión homogénea +/- 5%", "Garantía de centrado de por vida"],
    image: "/fotos/oncycles-13.jpg",
    badge: "ARTESANAL",
  },
  {
    id: "nitrogeno",
    title: "Inflado con nitrógeno",
    subtitle: "Estabilidad y longevidad",
    description: "El nitrógeno puro presenta una expansión térmica mínima frente al aire comprimido convencional, lo que garantiza una presión de neumático más estable a lo largo de toda la salida. Especialmente recomendado para enduro y DH.",
    features: ["Nitrógeno al 99,9% de pureza", "Variación de presión inferior al 1% entre 0°C y 40°C", "Protege la cámara o el sellante frente a la oxidación", "Ideal para competición y ruedas UST/Tubeless"],
    image: "/fotos/oncycles-14.jpg",
    badge: "COMPETICIÓN",
  },
  {
    id: "calidad",
    title: "Procedimientos de control de calidad",
    subtitle: "Cada trabajo revisado paso a paso",
    description: "Antes de entregar cada bicicleta aplicamos un protocolo de 25 puntos de control: aprietes por par, ajuste de cambios, purga de frenos, presiones, funcionamiento de todos los sistemas electrónicos y prueba dinámica en el banco.",
    features: ["Checklist de 25 puntos de control", "Verificación de pares de apriete con torquímetro calibrado", "Prueba de rodaje en banco antes de la entrega", "Informe digital del trabajo realizado para el cliente"],
    image: "/fotos/oncycles-15.jpg",
    badge: "ISO CERTIFICADO",
  },
];

export default function InstalacionesPage() {
  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: "#0A0E1A", minHeight: "100vh" }}>
        {/* Hero */}
        <div className="relative py-32 overflow-hidden" style={{ background: "linear-gradient(to bottom, #0F1420, #0A0E1A)" }}>
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, rgba(30,95,255,0.06) 0%, transparent 70%)" }} />
          <div className="relative max-w-7xl mx-auto px-6 text-center">
            <ScrollReveal>
              <p className="text-xs tracking-[0.35em] uppercase mb-4" style={{ color: "#1E5FFF" }}>
                Tecnología de última generación
              </p>
              <h1 className="font-display font-bold text-white mb-6" style={{ fontSize: "clamp(2rem,5vw,4rem)" }}>
                Un laboratorio equipado<br />con lo último en tecnología
              </h1>
              <p className="max-w-xl mx-auto text-lg" style={{ color: "#9CA3AF" }}>
                7 áreas especializadas para dar a tu bicicleta el tratamiento que merece.
              </p>
            </ScrollReveal>
          </div>
        </div>

        {/* Sections */}
        <div className="max-w-7xl mx-auto px-6 pb-24 space-y-24">
          {INSTALLATIONS.map((section, i) => (
            <ScrollReveal key={section.id} delay={0.1}>
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
                {/* Image */}
                <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="relative rounded-2xl overflow-hidden" style={{ aspectRatio: "4/3", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <Image src={section.image} alt={section.title} fill className="object-cover" />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,14,26,0.5) 0%, transparent 60%)" }} />
                    <div className="absolute bottom-4 left-4">
                      <span
                        className="text-xs font-bold tracking-wider uppercase px-3 py-1.5 rounded-full"
                        style={{ backgroundColor: "rgba(30,95,255,0.9)", color: "white" }}
                      >
                        {section.badge}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-mono-price text-3xl font-bold" style={{ color: "rgba(30,95,255,0.3)" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h2 className="font-display font-bold text-white mb-2" style={{ fontSize: "clamp(1.5rem,3vw,2rem)" }}>
                    {section.title}
                  </h2>
                  <p className="text-sm uppercase tracking-wider mb-4" style={{ color: "#1E5FFF" }}>
                    {section.subtitle}
                  </p>
                  <p className="text-base leading-relaxed mb-6" style={{ color: "#9CA3AF" }}>
                    {section.description}
                  </p>
                  <ul className="space-y-2">
                    {section.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm" style={{ color: "#9CA3AF" }}>
                        <Check size={14} className="mt-0.5 shrink-0" style={{ color: "#10B981" }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom marquee */}
        <div style={{ backgroundColor: "#0F1420", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="py-5">
            <Marquee speed={35}>
              {["CERTIFICADO", "OFICIAL ÖHLINS", "ULTRASONIDO", "BEDDING", "NITRÓGENO", "ARTESANAL", "CONTROL DE CALIDAD"].map((t) => (
                <span key={t} className="font-display font-bold text-lg tracking-[0.2em] uppercase px-10" style={{ color: "rgba(255,255,255,0.15)" }}>
                  ✦ {t}
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
