import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { z } from "zod";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, password } = body;

    if (!email || !password) return NextResponse.json({ error: "Datos requeridos" }, { status: 400 });

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return NextResponse.json({ error: "El email ya está registrado" }, { status: 409 });

    const hashed = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: { name, email, phone, password: hashed },
      select: { id: true, email: true, name: true, role: true },
    });

    return NextResponse.json(user, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Error al crear usuario" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  try {
    const { name, phone } = await req.json();
    const userId = (session.user as { id?: string }).id;
    if (!userId) return NextResponse.json({ error: "Sesión inválida" }, { status: 401 });

    const user = await prisma.user.update({
      where: { id: userId },
      data: { name, phone },
      select: { id: true, email: true, name: true, phone: true },
    });

    return NextResponse.json(user);
  } catch {
    return NextResponse.json({ error: "Error al actualizar" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const userId = (session.user as { id?: string }).id;
  if (!userId) return NextResponse.json({ error: "Sesión inválida" }, { status: 401 });

  try {
    const body = await req.json();
    const { action } = body;

    if (action === "changePassword") {
      const { currentPassword, newPassword } = body;
      const user = await prisma.user.findUnique({ where: { id: userId } });
      if (!user) return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });

      const valid = await bcrypt.compare(currentPassword, user.password);
      if (!valid) return NextResponse.json({ error: "Contraseña actual incorrecta" }, { status: 400 });

      const hashed = await bcrypt.hash(newPassword, 12);
      await prisma.user.update({ where: { id: userId }, data: { password: hashed } });
      return NextResponse.json({ success: true });
    }

    if (action === "addAddress") {
      const schema = z.object({
        label: z.string(), fullName: z.string(), street: z.string(),
        city: z.string(), postalCode: z.string(), country: z.string(),
        phone: z.string().optional(),
      });
      const data = schema.parse(body);
      const address = await prisma.address.create({ data: { ...data, userId } });
      return NextResponse.json(address);
    }

    if (action === "deleteAddress") {
      await prisma.address.deleteMany({ where: { id: body.id, userId } });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Acción no válida" }, { status: 400 });
  } catch {
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const userId = (session.user as { id?: string }).id;
  if (!userId) return NextResponse.json({ error: "Sesión inválida" }, { status: 401 });

  const { searchParams } = new URL(req.url);

  if (searchParams.get("addresses")) {
    const addresses = await prisma.address.findMany({ where: { userId } });
    return NextResponse.json(addresses);
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, email: true, name: true, phone: true, role: true },
  });
  return NextResponse.json(user);
}

export async function DELETE() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const userId = (session.user as { id?: string }).id;
  if (!userId) return NextResponse.json({ error: "Sesión inválida" }, { status: 401 });

  await prisma.user.delete({ where: { id: userId } });
  return NextResponse.json({ success: true });
}
