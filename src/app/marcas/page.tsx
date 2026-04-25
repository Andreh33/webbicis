"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

const BRANDS = [
  {
    name: "ÖHLINS",
    badge: "SERVICIO TÉCNICO OFICIAL",
    badgeColor: "#1E5FFF",
    highlight: true,
    description: "Líder mundial en tecnología de suspensiones de alta gama. Fundada en 1976 en Suecia, Öhlins es sinónimo de precisión y rendimiento en competición y uso premium.",
    extended: "Somos Servicio Técnico Oficial Öhlins a través de Andreni MHS, lo que nos da acceso a herramientas exclusivas de calibración, recambios originales y formación directa del fabricante. Trabajamos con toda la gama de horquillas y amortiguadores Öhlins para MTB y carretera.",
    products: ["RXF36 Air", "RXF38 Air", "TTX22M", "TTX Air", "TTX22", "TX Coil"],
  },
  {
    name: "FOX",
    description: "Referencia mundial en suspensiones para mountain bike. Sus horquillas y amortiguadores equipan las bicicletas de los mejores equipos de enduro y XC del mundo.",
    extended: "Mantenemos y revisamos toda la gama Fox: Factory, Performance Elite y Performance. Realizamos cambios de aceite, rebuilds completos y ajustes de resorte según el peso y estilo de conducción del piloto.",
    products: ["Fox 34", "Fox 36", "Fox 38", "Fox 40", "DPS", "DHX2", "Float X"],
  },
  {
    name: "ROCK SHOX",
    description: "Pioneros en el desarrollo de suspensiones para MTB. Sus horquillas Lyrik, Pike y SID son referencia en sus respectivos segmentos.",
    extended: "Somos expertos en el mantenimiento de toda la gama Rock Shox. Realizamos lowers service, full service, cambio de muelles y configuración de rebound y compresión.",
    products: ["Pike", "Lyrik", "Zeb", "SID", "Super Deluxe", "Vivid"],
  },
  {
    name: "CANE CREEK",
    description: "Especialistas en horquillas de acero y amortiguadores de doble cámara. Su tecnología ACS3 es la preferida por los pilotos más exigentes del enduro.",
    extended: "Cane Creek es conocida por sus amortiguadores con cámara de nitrógeno independiente. Realizamos mantenimientos completos, incluyendo el recargado de cámara de nitrógeno.",
    products: ["Helm MKII", "40 Series", "DBcoil IL", "VALT"],
  },
  {
    name: "DT SWISS",
    description: "Fabricante suizo de ruedas, llantas y bujes de referencia mundial. Cada producto es fruto de décadas de ingeniería en precisión.",
    extended: "Construimos ruedas DT Swiss a la carta, eligiendo la combinación perfecta de llanta, buje y radios según el uso y el peso del piloto. Actualizamos y mantenemos todos los bujes de la gama.",
    products: ["EX 1700", "EX 1501", "G 1800", "XM 1700", "M 1900"],
  },
  {
    name: "CANNONDALE",
    description: "Fabricante americano de bicicletas de aluminio y carbono de alta gama. Conocidos por su tecnología Lefty y sus modelos Scalpel, Habit y Trail.",
    extended: "Realizamos revisiones completas y mantenimiento preventivo de bicicletas Cannondale de todas las gamas. Ponemos especial atención en el sistema de dirección Lefty.",
    products: ["Scalpel", "Habit", "Trail", "SuperSix EVO"],
  },
  {
    name: "SRAM",
    description: "Grupo americano con marcas como SRAM, RockShox, Zipp y Quarq. Sus grupos Eagle son el estándar en transmisiones de 12 velocidades.",
    extended: "Montamos y mantenemos todos los grupos SRAM: XX1, X01, GX y NX Eagle. También trabajamos con sus frenos Guide, Code y Level.",
    products: ["XX SL Eagle", "XX Eagle", "X01 Eagle", "Code RSC"],
  },
  {
    name: "SHIMANO",
    description: "El mayor fabricante de componentes de ciclismo del mundo. Sus grupos Deore, XT, XTR y Dura-Ace son referencia en fiabilidad y precio/rendimiento.",
    extended: "Expertos en la puesta a punto de grupos Shimano. Purga de frenos hidráulicos, ajuste de cambios mecánicos y electrónicos Di2, cambio de cables y fundas.",
    products: ["XTR M9100", "XT M8100", "Deore M6100", "Saint", "Zee"],
  },
  {
    name: "MAGURA",
    description: "Marca alemana especializada en frenos hidráulicos para MTB. Sus frenos MT Trail y MT7 son los favoritos del enduro europeo.",
    extended: "Purgamos y mantenemos todos los frenos Magura. Realizamos cambio de pastillas con rodaje por bedding, ajuste de mordazas y cambio de mangueras.",
    products: ["MT7 Pro", "MT5e", "MT Trail Carbon", "MT Sport"],
  },
  {
    name: "BOSCH",
    description: "Líder en sistemas de propulsión eléctrica para bicicletas. Sus motores Performance CX equipan las mejores e-MTB del mercado.",
    extended: "Realizamos diagnóstico, actualización de firmware y mantenimiento de sistemas Bosch: motores, baterías y pantallas. Colaboramos con los principales fabricantes de e-bikes.",
    products: ["Performance CX", "Active Line Plus", "PowerTube 750", "Kiox 300"],
  },
  {
    name: "BROSE",
    description: "Motor alemán de mid-drive conocido por su silencio y potencia. Utilizado por marcas como Specialized, Moustache y Haibike.",
    extended: "Diagnóstico y mantenimiento de sistemas Brose. Actualizaciones de firmware y revisión completa del sistema de tracción eléctrica.",
    products: ["Drive S Mag", "Drive T", "Drive S"],
  },
  {
    name: "DJI AVINOX",
    badge: "PRÓXIMAMENTE",
    badgeColor: "#F59E0B",
    description: "El sistema de propulsión eléctrica de DJI para MTB. El Avinox M1 promete revolucionar el mercado de las e-MTB con su tecnología aeroespacial.",
    extended: "Estamos en proceso de certificación para servicio técnico oficial DJI Avinox. Próximamente podremos ofrecer diagnóstico y mantenimiento completo de este innovador sistema.",
    products: ["Avinox M1", "Avinox App"],
  },
];

export default function MarcasPage() {
  const [selected, setSelected] = useState<typeof BRANDS[0] | null>(null);
  const highlighted = BRANDS.filter((b) => b.highlight);
  const rest = BRANDS.filter((b) => !b.highlight);

  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: "#0A0E1A", minHeight: "100vh" }}>
        {/* Hero */}
        <div
          className="py-24 text-center relative"
          style={{ background: "linear-gradient(to bottom, #0F1420, #0A0E1A)" }}
        >
          <ScrollReveal>
            <p className="text-xs tracking-[0.35em] uppercase mb-4" style={{ color: "#1E5FFF" }}>
              Partners oficiales
            </p>
            <h1 className="font-display font-bold text-white mb-4" style={{ fontSize: "clamp(2rem,5vw,4rem)" }}>
              Trabajamos con las<br />mejores marcas del sector
            </h1>
            <p className="max-w-xl mx-auto" style={{ color: "#9CA3AF" }}>
              20 años de relación con los principales fabricantes nos permite ofrecer el mejor servicio técnico y las mejores condiciones.
            </p>
          </ScrollReveal>
        </div>

        <div className="max-w-7xl mx-auto px-6 pb-24">
          {/* Öhlins featured */}
          {highlighted.map((brand) => (
            <ScrollReveal key={brand.name}>
              <div
                className="mb-12 p-8 rounded-2xl cursor-pointer transition-all duration-300 relative overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, rgba(30,95,255,0.15) 0%, rgba(10,14,26,0) 60%)",
                  border: "1px solid rgba(30,95,255,0.3)",
                  backgroundColor: "#0F1420",
                }}
                onClick={() => setSelected(brand)}
              >
                <div className="flex items-start justify-between flex-wrap gap-6">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <h2 className="font-display font-bold text-white" style={{ fontSize: "2.5rem" }}>
                        {brand.name}
                      </h2>
                      {brand.badge && (
                        <Badge className="text-xs font-bold tracking-wider" style={{ backgroundColor: brand.badgeColor, color: "white", border: "none" }}>
                          {brand.badge}
                        </Badge>
                      )}
                    </div>
                    <p className="max-w-2xl text-base leading-relaxed" style={{ color: "#9CA3AF" }}>
                      {brand.description}
                    </p>
                  </div>
                  <div
                    className="px-6 py-3 rounded-full text-sm font-medium transition-all"
                    style={{ backgroundColor: "rgba(30,95,255,0.15)", border: "1px solid rgba(30,95,255,0.3)", color: "#4A8FFF" }}
                  >
                    Ver más →
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}

          {/* All brands grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {rest.map((brand, i) => (
              <ScrollReveal key={brand.name} delay={i * 0.05}>
                <div
                  className="card-hover p-6 rounded-2xl cursor-pointer"
                  style={{
                    backgroundColor: "#0F1420",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                  onClick={() => setSelected(brand)}
                >
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <h3 className="font-display font-bold text-white text-xl">{brand.name}</h3>
                    {brand.badge && (
                      <Badge className="text-[10px] font-bold shrink-0" style={{ backgroundColor: brand.badgeColor, color: "white", border: "none" }}>
                        {brand.badge}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "#9CA3AF" }}>
                    {brand.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />

      {/* Modal */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent
          className="max-w-lg"
          style={{
            backgroundColor: "#0F1420",
            border: "1px solid rgba(255,255,255,0.08)",
            color: "#F5F7FA",
          }}
        >
          <DialogHeader>
            <DialogTitle className="font-display font-bold text-white text-2xl flex items-center gap-3">
              {selected?.name}
              {selected?.badge && (
                <Badge style={{ backgroundColor: selected.badgeColor, color: "white", border: "none" }}>
                  {selected.badge}
                </Badge>
              )}
            </DialogTitle>
          </DialogHeader>
          <p className="text-sm leading-relaxed mb-4" style={{ color: "#9CA3AF" }}>{selected?.extended}</p>
          {selected?.products && selected.products.length > 0 && (
            <div>
              <p className="text-xs uppercase tracking-wider mb-2" style={{ color: "#6B7280" }}>Productos que manejamos</p>
              <div className="flex flex-wrap gap-2">
                {selected.products.map((p) => (
                  <span key={p} className="px-3 py-1 rounded-full text-xs" style={{ backgroundColor: "rgba(30,95,255,0.1)", border: "1px solid rgba(30,95,255,0.2)", color: "#4A8FFF" }}>
                    {p}
                  </span>
                ))}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
