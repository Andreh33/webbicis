"use client";

import dynamic from "next/dynamic";

const WheelScene3D = dynamic(
  () => import("./WheelScene3D").then((m) => m.WheelScene3D),
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          height: "100vh",
          backgroundColor: "#0A0E1A",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ color: "rgba(255,255,255,0.2)", fontSize: "12px", letterSpacing: "0.3em" }}>
          CARGANDO
        </div>
      </div>
    ),
  }
);

export function WheelScene3DWrapper() {
  return <WheelScene3D />;
}
