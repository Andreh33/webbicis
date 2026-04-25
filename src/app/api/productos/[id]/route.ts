import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(3).optional(),
  slug: z.string().optional(),
  shortDesc: z.string().optional(),
  description: z.string().optional(),
  price: z.number().optional(),
  compareAt: z.number().nullable().optional(),
  sku: z.string().nullable().optional(),
  stock: z.number().optional(),
  category: z.string().optional(),
  brand: z.string().nullable().optional(),
  stripeLink: z.string().url().optional(),
  featured: z.boolean().optional(),
  active: z.boolean().optional(),
  images: z.array(z.object({
    id: z.string().optional(),
    url: z.string(),
    alt: z.string().optional(),
    order: z.number(),
  })).optional(),
});

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function PUT(req: NextRequest, { params }: RouteContext) {
  const session = await getServerSession(authOptions);
  if ((session?.user as { role?: string })?.role !== "ADMIN") {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 });
  }

  try {
    const { id } = await params;
    const body = await req.json();
    const data = schema.parse(body);

    await prisma.productImage.deleteMany({ where: { productId: id } });

    const product = await prisma.product.update({
      where: { id },
      data: {
        ...data,
        images: data.images ? {
          create: data.images.map((img, idx) => ({
            url: img.url,
            alt: img.alt,
            order: img.order ?? idx,
          })),
        } : undefined,
      },
      include: { images: true },
    });

    return NextResponse.json(product);
  } catch (err) {
    if (err instanceof z.ZodError) return NextResponse.json({ error: err.issues }, { status: 400 });
    return NextResponse.json({ error: "Error al actualizar" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: RouteContext) {
  const session = await getServerSession(authOptions);
  if ((session?.user as { role?: string })?.role !== "ADMIN") {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 });
  }

  try {
    const { id } = await params;
    await prisma.product.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Error al eliminar" }, { status: 500 });
  }
}
