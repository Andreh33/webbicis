import type { Metadata } from "next";
import { Inter, Syne, JetBrains_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { Providers } from "./providers";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: "On Cycles — Laboratorio Premium de Bicicletas · Barcelona",
    template: "%s | On Cycles",
  },
  description:
    "Laboratorio de mantenimiento y reparación de bicicletas de alta gama en el Eixample de Barcelona. Servicio técnico oficial Öhlins. 20 años de experiencia.",
  keywords: ["bicicletas", "mantenimiento", "reparación", "Barcelona", "Öhlins", "suspensiones", "alta gama"],
  openGraph: {
    title: "On Cycles — Laboratorio Premium de Bicicletas",
    description: "Mantenimiento, reparación y configuración de suspensiones. Servicio técnico oficial Öhlins. Barcelona Eixample.",
    url: "https://oncycles.es",
    siteName: "On Cycles",
    locale: "es_ES",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${syne.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" style={{ backgroundColor: "#0A0E1A", color: "#F5F7FA" }}>
        <Providers>
          {children}
          <Toaster richColors position="bottom-right" />
        </Providers>
      </body>
    </html>
  );
}
