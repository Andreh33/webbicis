import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { slugify } from "@/lib/utils";

const schema = z.object({
  name: z.string().min(3),
  slug: z.string().min(2),
  shortDesc: z.string().min(10),
  description: z.string().min(20),
  price: z.number().positive(),
  compareAt: z.number().optional().nullable(),
  sku: z.string().optional().nullable(),
  stock: z.number().min(0),
  category: z.string().min(1),
  brand: z.string().optional().nullable(),
  stripeLink: z.string().url(),
  featured: z.boolean(),
  active: z.boolean(),
  images: z.array(z.object({
    id: z.string().optional(),
    url: z.string(),
    alt: z.string().optional(),
    order: z.number(),
  })).optional(),
});

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  try {
    const where = { active: true, ...(slug ? { slug } : {}) };
    const products = await prisma.product.findMany({
      where,
      include: { images: { orderBy: { order: "asc" } } },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(products);
  } catch {
    return NextResponse.json({ error: "Error al obtener productos" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if ((session?.user as { role?: string })?.role !== "ADMIN") {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 });
  }

  try {
    const body = await req.json();
    const data = schema.parse(body);

    const product = await prisma.product.create({
      data: {
        name: data.name,
        slug: data.slug || slugify(data.name),
        shortDesc: data.shortDesc,
        description: data.description,
        price: data.price,
        compareAt: data.compareAt,
        sku: data.sku || undefined,
        stock: data.stock,
        category: data.category,
        brand: data.brand,
        stripeLink: data.stripeLink,
        featured: data.featured,
        active: data.active,
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

    return NextResponse.json(product, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) return NextResponse.json({ error: err.errors }, { status: 400 });
    return NextResponse.json({ error: "Error al crear producto" }, { status: 500 });
  }
}
