import { NextResponse } from "next/server";

// El carrito se gestiona en el cliente con Zustand + localStorage.
// Este endpoint existe como placeholder para integraciones futuras.
export async function GET() {
  return NextResponse.json({ message: "El carrito se gestiona en el cliente" });
}
