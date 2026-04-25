import "dotenv/config";
import path from "path";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import { PrismaClient } from "../src/generated/prisma/client.ts";
import bcrypt from "bcryptjs";

function resolveDbUrl(raw: string | undefined): string {
  const url = raw ?? "file:./dev.db";
  if (url.startsWith("file:") && !url.startsWith("file:///") && !url.startsWith("file://")) {
    const rel = url.slice(5);
    return "file:" + path.resolve(process.cwd(), rel).split("\\").join("/");
  }
  return url;
}

const adapter = new PrismaLibSql({ url: resolveDbUrl(process.env.DATABASE_URL) });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Iniciando seed...");

  const adminPassword = await bcrypt.hash("OnCycles2026!", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@oncycles.es" },
    update: {},
    create: {
      email: "admin@oncycles.es",
      password: adminPassword,
      name: "Alfredo Prendes",
      role: "ADMIN",
    },
  });
  console.log(`✅ Admin: ${admin.email}`);

  const clientPassword = await bcrypt.hash("Demo1234!", 12);
  const client = await prisma.user.upsert({
    where: { email: "cliente@demo.es" },
    update: {},
    create: {
      email: "cliente@demo.es",
      password: clientPassword,
      name: "Cliente Demo",
      role: "CLIENT",
    },
  });
  console.log(`✅ Cliente demo: ${client.email}`);

  const products = [
    {
      slug: "horquilla-ohlins-rxf38-m2",
      name: "Horquilla Öhlins RXF38 M2",
      shortDesc: "La horquilla de referencia para enduro. Sistema RXF con cámara de aire FLM.",
      description: "La Öhlins RXF38 M2 es la horquilla de referencia para el enduro y MTB de alta gama. El sistema de cámara de aire FLM (Floating Linear Mechanism) ofrece una sensación de amortiguación sin igual, con una regulación extremadamente fina de la compresión en las dos vías y el rebote. Fabricada en Suecia con los más altos estándares de precisión.\n\nEl tubo interior de 38mm proporciona la rigidez necesaria para las condiciones más exigentes, mientras que el sellado premium garantiza un funcionamiento perfecto durante miles de kilómetros.",
      price: 1299.0,
      compareAt: 1450.0,
      stock: 3,
      category: "Suspensiones",
      brand: "Öhlins",
      stripeLink: "https://buy.stripe.com/test_example_horquilla_ohlins",
      featured: true,
      active: true,
    },
    {
      slug: "amortiguador-fox-float-x2",
      name: "Amortiguador Fox Float X2",
      shortDesc: "Amortiguador de doble cámara para descenso y enduro extremo.",
      description: "El Fox Float X2 Factory es el amortiguador de aire más avanzado de Fox. Con regulación de compresión en alta y baja velocidad independiente, rebote de alta velocidad y la tecnología Dual Air para ajustar de forma independiente el positivo y negativo de la cámara.\n\nCompatible con la mayoría de cuadros de doble suspensión del mercado. Incluido en formato naked para adaptarse a diferentes configuraciones de montaje.",
      price: 549.0,
      stock: 5,
      category: "Suspensiones",
      brand: "Fox",
      stripeLink: "https://buy.stripe.com/test_example_fox_float_x2",
      featured: true,
      active: true,
    },
    {
      slug: "grupo-sram-xx-sl-eagle-axs",
      name: "Grupo SRAM XX SL Eagle AXS",
      shortDesc: "El grupo de transmisión más ligero y tecnológico de SRAM. 12 velocidades wireless.",
      description: "SRAM XX SL Eagle AXS es la cima de la tecnología de transmisión para MTB. El sistema inalámbrico AXS permite cambios perfectos con un simple clic, sin cables que mantener ni rotas.\n\nEl desviador trasero con tecnología Orbit F elimina las colisiones con el barro. El cassette XG-1299 de 10-52 dientes en titanio y carbono ofrece la relación de transmisión perfecta para cualquier terreno.",
      price: 1899.0,
      stock: 2,
      category: "Transmisión",
      brand: "SRAM",
      stripeLink: "https://buy.stripe.com/test_example_sram_xx",
      featured: true,
      active: true,
    },
    {
      slug: "rueda-dt-swiss-ex-1700",
      name: 'Rueda DT Swiss EX 1700 29"',
      shortDesc: "Rueda de carbono construida a mano con llanta DT Swiss y bujes 350.",
      description: "Rueda completa construida artesanalmente en nuestro taller con llanta DT Swiss EX 1700, radios DT Swiss Aerolite y bujes DT Swiss 350. Centrado perfecto y tensión de radios homogénea verificada con tensiómetro digital.\n\nCompatibilidad: Boost 148, cassette Shimano/SRAM 12v, tubeless ready. Peso aproximado: 890g.",
      price: 449.0,
      stock: 4,
      category: "Ruedas",
      brand: "DT Swiss",
      stripeLink: "https://buy.stripe.com/test_example_dt_swiss",
      featured: false,
      active: true,
    },
    {
      slug: "frenos-magura-mt7-pro",
      name: "Frenos Magura MT7 Pro (par)",
      shortDesc: "Los frenos de referencia para enduro y trail. Mordaza de 4 pistones, potencia brutal.",
      description: "Los Magura MT7 Pro son los frenos hidráulicos más avanzados de Magura. La mordaza HC (High Carbide) de 4 pistones con pastillas de freno de carburo proporciona una potencia de frenada excepcional y una modulación perfecta incluso en condiciones extremas.\n\nManguera MDI2 antimicrobiana de serie. Compatible con discos de 160, 180 y 203mm. Se suministran listos para montar con latiguillos cortados a medida.",
      price: 329.0,
      compareAt: 379.0,
      stock: 6,
      category: "Frenos",
      brand: "Magura",
      stripeLink: "https://buy.stripe.com/test_example_magura_mt7",
      featured: false,
      active: true,
    },
    {
      slug: "kit-mantenimiento-suspension-fox",
      name: "Kit de mantenimiento suspensión Fox",
      shortDesc: "Kit completo para el servicio de horquillas Fox 34, 36 y 38. Incluye aceites y sellos.",
      description: "Kit oficial Fox Racing Shox para el mantenimiento de horquillas Fox 34, 36 y 38. Incluye todos los sellos y retenes necesarios, aceite para tubo interior (10wt), aceite para baño inferior (5wt), grasa Slick Honey y herramienta de extracción.\n\nPerfecto para realizar el Lowers Service en casa o para profesionales que quieran tener los recambios a mano.",
      price: 89.0,
      stock: 12,
      category: "Accesorios",
      brand: "Fox",
      stripeLink: "https://buy.stripe.com/test_example_kit_fox",
      featured: false,
      active: true,
    },
  ];

  for (const p of products) {
    const existing = await prisma.product.findUnique({ where: { slug: p.slug } });
    if (!existing) {
      await prisma.product.create({ data: p });
      console.log(`✅ Producto: ${p.name}`);
    }
  }

  console.log("✅ Seed completado");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
