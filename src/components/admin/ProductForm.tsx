"use client";

import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ImageUploader } from "./ImageUploader";
import { slugify } from "@/lib/utils";
import { Save, Globe, X as XIcon, Link as LinkIcon } from "lucide-react";
import type { Product } from "@/types";

const CATEGORIES = ["Suspensiones", "Frenos", "Ruedas", "Transmisión", "Accesorios", "Electrónica", "Ropa", "Nutrición"];
const BRANDS = ["Öhlins", "Fox", "Rock Shox", "Cane Creek", "DT Swiss", "Cannondale", "SRAM", "Shimano", "Magura", "Bosch", "Brose"];

const schema = z.object({
  name: z.string().min(3, "Nombre requerido"),
  slug: z.string().min(2),
  shortDesc: z.string().min(10, "Descripción corta requerida"),
  description: z.string().min(20, "Descripción detallada requerida"),
  price: z.coerce.number().min(0.01, "Precio requerido"),
  compareAt: z.coerce.number().optional(),
  sku: z.string().optional(),
  stock: z.coerce.number().min(0),
  category: z.string().min(1, "Categoría requerida"),
  brand: z.string().optional(),
  stripeLink: z.string().url("Debe ser una URL válida").min(1, "Link de Stripe requerido"),
  featured: z.boolean(),
  active: z.boolean(),
});

type FormData = z.infer<typeof schema>;

interface ProductFormProps {
  product?: Product;
}

interface UploadedImage {
  id: string;
  url: string;
  alt: string;
  order: number;
}

export function ProductForm({ product }: ProductFormProps) {
  const router = useRouter();
  const [images, setImages] = useState<UploadedImage[]>(
    product?.images?.map((img) => ({ id: img.id, url: img.url, alt: img.alt ?? "", order: img.order })) ?? []
  );
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema) as Resolver<FormData>,
    defaultValues: {
      name: product?.name ?? "",
      slug: product?.slug ?? "",
      shortDesc: product?.shortDesc ?? "",
      description: product?.description ?? "",
      price: product?.price ?? 0,
      compareAt: product?.compareAt ?? undefined,
      sku: product?.sku ?? "",
      stock: product?.stock ?? 0,
      category: product?.category ?? "",
      brand: product?.brand ?? "",
      stripeLink: product?.stripeLink ?? "",
      featured: product?.featured ?? false,
      active: product?.active ?? true,
    },
  });

  const nameValue = watch("name");
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setValue("name", name);
    if (!product) setValue("slug", slugify(name));
  };

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const body = { ...data, images };
      const url = product ? `/api/productos/${product.id}` : "/api/productos";
      const method = product ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Error al guardar");
      }
      toast.success(product ? "Producto actualizado" : "Producto creado");
      router.push("/admin/productos");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full px-4 py-3 rounded-xl text-sm transition-colors focus:outline-none";
  const inputStyle = {
    backgroundColor: "#161C2E",
    border: "1px solid rgba(255,255,255,0.08)",
    color: "#F5F7FA",
  };
  const labelClass = "block text-sm font-medium mb-2";
  const labelStyle = { color: "#9CA3AF" };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Basic info */}
      <div className="p-6 rounded-2xl space-y-5" style={{ backgroundColor: "#0F1420", border: "1px solid rgba(255,255,255,0.06)" }}>
        <h2 className="font-display font-bold text-white text-lg">Información básica</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className={labelClass} style={labelStyle}>Nombre del producto *</label>
            <input {...register("name", { onChange: handleNameChange })} className={inputClass} style={inputStyle} placeholder="ej: Horquilla Öhlins RXF38 M2" />
            {errors.name && <p className="text-xs mt-1" style={{ color: "#EF4444" }}>{errors.name.message}</p>}
          </div>
          <div>
            <label className={labelClass} style={labelStyle}>Slug (URL) *</label>
            <input {...register("slug")} className={inputClass} style={inputStyle} placeholder="horquilla-ohlins-rxf38-m2" />
            {errors.slug && <p className="text-xs mt-1" style={{ color: "#EF4444" }}>{errors.slug.message}</p>}
          </div>
        </div>

        <div>
          <label className={labelClass} style={labelStyle}>Descripción corta *</label>
          <input {...register("shortDesc")} className={inputClass} style={inputStyle} placeholder="Descripción breve para tarjetas de producto..." />
          {errors.shortDesc && <p className="text-xs mt-1" style={{ color: "#EF4444" }}>{errors.shortDesc.message}</p>}
        </div>

        <div>
          <label className={labelClass} style={labelStyle}>Descripción completa *</label>
          <textarea
            {...register("description")}
            rows={5}
            className={inputClass}
            style={{ ...inputStyle, resize: "vertical" }}
            placeholder="Descripción detallada del producto, especificaciones, etc..."
          />
          {errors.description && <p className="text-xs mt-1" style={{ color: "#EF4444" }}>{errors.description.message}</p>}
        </div>
      </div>

      {/* Pricing */}
      <div className="p-6 rounded-2xl space-y-5" style={{ backgroundColor: "#0F1420", border: "1px solid rgba(255,255,255,0.06)" }}>
        <h2 className="font-display font-bold text-white text-lg">Precio y stock</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          <div>
            <label className={labelClass} style={labelStyle}>Precio (€) *</label>
            <input type="number" step="0.01" {...register("price")} className={inputClass} style={inputStyle} />
            {errors.price && <p className="text-xs mt-1" style={{ color: "#EF4444" }}>{errors.price.message}</p>}
          </div>
          <div>
            <label className={labelClass} style={labelStyle}>Precio tachado (€)</label>
            <input type="number" step="0.01" {...register("compareAt")} className={inputClass} style={inputStyle} />
          </div>
          <div>
            <label className={labelClass} style={labelStyle}>SKU</label>
            <input {...register("sku")} className={inputClass} style={inputStyle} />
          </div>
          <div>
            <label className={labelClass} style={labelStyle}>Stock</label>
            <input type="number" {...register("stock")} className={inputClass} style={inputStyle} />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className={labelClass} style={labelStyle}>Categoría *</label>
            <select {...register("category")} className={inputClass} style={{ ...inputStyle, cursor: "pointer" }}>
              <option value="">Seleccionar categoría</option>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            {errors.category && <p className="text-xs mt-1" style={{ color: "#EF4444" }}>{errors.category.message}</p>}
          </div>
          <div>
            <label className={labelClass} style={labelStyle}>Marca</label>
            <select {...register("brand")} className={inputClass} style={{ ...inputStyle, cursor: "pointer" }}>
              <option value="">Seleccionar marca</option>
              {BRANDS.map((b) => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Stripe link */}
      <div className="p-6 rounded-2xl space-y-4" style={{ backgroundColor: "#0F1420", border: "1px solid rgba(30,95,255,0.2)" }}>
        <div className="flex items-center gap-2">
          <LinkIcon size={18} style={{ color: "#1E5FFF" }} />
          <h2 className="font-display font-bold text-white text-lg">URL de Payment Link de Stripe</h2>
        </div>
        <p className="text-sm" style={{ color: "#6B7280" }}>
          Pega aquí el link de pago generado en Stripe. Los clientes serán redirigidos a este link al comprar.
        </p>
        <input
          {...register("stripeLink")}
          className={inputClass}
          style={{ ...inputStyle, borderColor: "rgba(30,95,255,0.3)" }}
          placeholder="https://buy.stripe.com/..."
        />
        {errors.stripeLink && <p className="text-xs mt-1" style={{ color: "#EF4444" }}>{errors.stripeLink.message}</p>}
      </div>

      {/* Images */}
      <div className="p-6 rounded-2xl space-y-4" style={{ backgroundColor: "#0F1420", border: "1px solid rgba(255,255,255,0.06)" }}>
        <h2 className="font-display font-bold text-white text-lg">Imágenes</h2>
        <ImageUploader value={images} onChange={setImages} />
      </div>

      {/* Visibility */}
      <div className="p-6 rounded-2xl space-y-4" style={{ backgroundColor: "#0F1420", border: "1px solid rgba(255,255,255,0.06)" }}>
        <h2 className="font-display font-bold text-white text-lg">Visibilidad</h2>
        <div className="flex items-center gap-8">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" {...register("featured")} className="w-4 h-4 rounded" />
            <span className="text-sm text-white">Producto destacado</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" {...register("active")} className="w-4 h-4 rounded" />
            <span className="text-sm text-white">Producto activo (visible en tienda)</span>
          </label>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 pb-8">
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 px-8 py-3 rounded-full font-semibold text-white transition-all"
          style={{ backgroundColor: "#1E5FFF", opacity: loading ? 0.7 : 1 }}
        >
          <Save size={16} />
          {loading ? "Guardando..." : product ? "Actualizar producto" : "Publicar producto"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/productos")}
          className="flex items-center gap-2 px-8 py-3 rounded-full font-semibold transition-all"
          style={{ border: "1px solid rgba(255,255,255,0.1)", color: "#9CA3AF" }}
        >
          <XIcon size={16} />
          Cancelar
        </button>
      </div>
    </form>
  );
}
