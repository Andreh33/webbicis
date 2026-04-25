"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";

const WA_URL =
  "https://wa.me/34678297995?text=Hola%2C%20me%20gustar%C3%ADa%20consultar%20sobre%20el%20servicio%20de%20mantenimiento.";

export function WhatsAppButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <a
      href={WA_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-2xl transition-all duration-500"
      style={{
        backgroundColor: "#25D366",
        opacity: visible ? 1 : 0,
        transform: visible ? "scale(1) translateY(0)" : "scale(0.8) translateY(20px)",
        boxShadow: "0 8px 32px rgba(37,211,102,0.4)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "scale(1.1) translateY(0)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 40px rgba(37,211,102,0.6)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "scale(1) translateY(0)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(37,211,102,0.4)";
      }}
    >
      <MessageCircle size={26} color="white" fill="white" />
    </a>
  );
}
