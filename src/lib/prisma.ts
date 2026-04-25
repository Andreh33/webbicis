import path from "path";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import { PrismaClient } from "@/generated/prisma";

function resolveDbUrl(raw: string | undefined): string {
  const url = raw ?? "file:./dev.db";
  if (url.startsWith("file:") && !url.startsWith("file:///") && !url.startsWith("file://")) {
    const rel = url.slice(5);
    return "file:" + path.resolve(process.cwd(), rel).split("\\").join("/");
  }
  return url;
}

function createPrismaClient() {
  const adapter = new PrismaLibSql({ url: resolveDbUrl(process.env.DATABASE_URL) });
  return new PrismaClient({ adapter });
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
