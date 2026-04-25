import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function AdminUsuariosPage() {
  const session = await getServerSession(authOptions);
  if ((session?.user as { role?: string })?.role !== "ADMIN") redirect("/admin/login");

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: { id: true, name: true, email: true, role: true, createdAt: true, phone: true },
  });

  return (
    <div className="p-8">
      <h1 className="font-display font-bold text-white text-2xl mb-8">Usuarios ({users.length})</h1>
      <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
        <table className="w-full">
          <thead>
            <tr style={{ backgroundColor: "#0F1420" }}>
              {["Nombre", "Email", "Teléfono", "Rol", "Registro"].map((h) => (
                <th key={h} className="text-left px-4 py-4 text-xs font-semibold uppercase tracking-wider" style={{ color: "#6B7280", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <tr key={user.id} style={{ backgroundColor: i % 2 === 0 ? "#0A0E1A" : "rgba(15,20,32,0.5)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                <td className="px-4 py-4 text-sm text-white font-medium">{user.name ?? "—"}</td>
                <td className="px-4 py-4 text-sm" style={{ color: "#9CA3AF" }}>{user.email}</td>
                <td className="px-4 py-4 text-sm" style={{ color: "#9CA3AF" }}>{user.phone ?? "—"}</td>
                <td className="px-4 py-4">
                  <span className="px-2 py-1 rounded-full text-xs font-semibold"
                    style={{
                      backgroundColor: user.role === "ADMIN" ? "rgba(30,95,255,0.15)" : "rgba(255,255,255,0.05)",
                      color: user.role === "ADMIN" ? "#4A8FFF" : "#9CA3AF",
                    }}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="px-4 py-4 text-sm" style={{ color: "#6B7280" }}>{new Date(user.createdAt).toLocaleDateString("es-ES")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
