"use client";

import { Package, ShoppingCart, Users, TrendingUp } from "lucide-react";

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: string;
}

function DashboardCard({ title, value, icon, change }: DashboardCardProps) {
  return (
    <div
      className="p-6 rounded-2xl"
      style={{
        backgroundColor: "#0F1420",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className="p-3 rounded-xl"
          style={{ backgroundColor: "rgba(30,95,255,0.1)" }}
        >
          {icon}
        </div>
        {change && (
          <span className="text-xs font-medium px-2 py-1 rounded-full"
            style={{ backgroundColor: "rgba(16,185,129,0.1)", color: "#10B981" }}>
            {change}
          </span>
        )}
      </div>
      <p className="text-3xl font-mono-price font-bold text-white mb-1">{value}</p>
      <p className="text-sm" style={{ color: "#6B7280" }}>{title}</p>
    </div>
  );
}

interface DashboardCardsProps {
  products: number;
  orders: number;
  users: number;
  revenue: number;
}

export function DashboardCards({ products, orders, users, revenue }: DashboardCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      <DashboardCard
        title="Productos activos"
        value={products}
        icon={<Package size={20} style={{ color: "#1E5FFF" }} />}
      />
      <DashboardCard
        title="Pedidos totales"
        value={orders}
        icon={<ShoppingCart size={20} style={{ color: "#1E5FFF" }} />}
      />
      <DashboardCard
        title="Usuarios registrados"
        value={users}
        icon={<Users size={20} style={{ color: "#1E5FFF" }} />}
      />
      <DashboardCard
        title="Ingresos totales"
        value={`${revenue.toFixed(2)} €`}
        icon={<TrendingUp size={20} style={{ color: "#1E5FFF" }} />}
      />
    </div>
  );
}
