import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { CuentaCards } from "@/components/cuenta/CuentaCards";

export default async function CuentaPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: "#0A0E1A", minHeight: "100vh" }}>
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="mb-12">
            <p className="text-sm mb-1" style={{ color: "#6B7280" }}>Panel de cliente</p>
            <h1 className="font-display font-bold text-white text-3xl">
              Hola, {session.user?.name ?? session.user?.email?.split("@")[0]}
            </h1>
          </div>
          <CuentaCards />
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
