"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const CATEGORIES = ["Todos", "Suspensiones", "Frenos", "Ruedas", "Transmisión", "Accesorios", "Electrónica"];
const SORT_OPTIONS = [
  { value: "newest", label: "Más recientes" },
  { value: "price_asc", label: "Precio: menor a mayor" },
  { value: "price_desc", label: "Precio: mayor a menor" },
  { value: "featured", label: "Destacados" },
];

interface FiltersProps {
  onFilter: (category: string, sort: string) => void;
  total: number;
}

export function Filters({ onFilter, total }: FiltersProps) {
  const [category, setCategory] = useState("Todos");
  const [sort, setSort] = useState("newest");

  const handleCategory = (cat: string) => {
    setCategory(cat);
    onFilter(cat, sort);
  };

  const handleSort = (s: string) => {
    setSort(s);
    onFilter(category, s);
  };

  return (
    <div
      className="sticky top-[108px] z-30 py-4"
      style={{
        backgroundColor: "rgba(10,14,26,0.9)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 flex flex-wrap items-center justify-between gap-4">
        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategory(cat)}
              className="px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200"
              style={{
                backgroundColor: category === cat ? "#1E5FFF" : "rgba(255,255,255,0.05)",
                color: category === cat ? "#fff" : "#9CA3AF",
                border: category === cat ? "1px solid #1E5FFF" : "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sort + Count */}
        <div className="flex items-center gap-4">
          <span className="text-sm" style={{ color: "#6B7280" }}>
            {total} productos
          </span>
          <div className="relative">
            <select
              value={sort}
              onChange={(e) => handleSort(e.target.value)}
              className="appearance-none pl-3 pr-8 py-1.5 rounded-lg text-sm cursor-pointer"
              style={{
                backgroundColor: "#161C2E",
                border: "1px solid rgba(255,255,255,0.06)",
                color: "#9CA3AF",
              }}
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" color="#6B7280" />
          </div>
        </div>
      </div>
    </div>
  );
}
