"use client";

import { useEffect } from "react";
import { MapPin } from "lucide-react";

export function Map() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Dynamically import Leaflet only on client
    import("leaflet").then((L) => {
      // Remove default marker icon issue
      // @ts-expect-error – Leaflet internal
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      const container = document.getElementById("oncycles-map");
      if (!container) return;

      // Prevent double-init
      if ((container as HTMLElement & { _leaflet_id?: number })._leaflet_id) return;

      const map = L.map("oncycles-map", {
        center: [41.3899, 2.1515],
        zoom: 16,
        zoomControl: false,
        scrollWheelZoom: false,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(map);

      L.control.zoom({ position: "bottomright" }).addTo(map);

      L.marker([41.3899, 2.1515])
        .addTo(map)
        .bindPopup(
          `<div style="font-family:sans-serif;text-align:center;padding:4px">
            <strong>On Cycles</strong><br/>
            Laboratorio de bicicletas<br/>
            <small>Calle París 44, Barcelona</small>
          </div>`
        )
        .openPopup();
    });

    import("leaflet/dist/leaflet.css");
  }, []);

  return (
    <div className="relative w-full" style={{ height: "400px" }}>
      <div id="oncycles-map" style={{ width: "100%", height: "100%" }} />
      <div
        className="absolute bottom-4 left-4 z-[1000] flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium"
        style={{ backgroundColor: "#0F1420", border: "1px solid rgba(255,255,255,0.1)", color: "#F5F7FA" }}
      >
        <MapPin size={14} style={{ color: "#1E5FFF" }} />
        Calle París 44, 08029 Barcelona
      </div>
    </div>
  );
}
