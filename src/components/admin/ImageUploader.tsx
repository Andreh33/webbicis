"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { Upload, X, GripVertical } from "lucide-react";
import { toast } from "sonner";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  horizontalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface UploadedImage {
  id: string;
  url: string;
  alt: string;
  order: number;
}

interface ImageUploaderProps {
  value: UploadedImage[];
  onChange: (images: UploadedImage[]) => void;
}

function SortableImage({
  image,
  onRemove,
  onAltChange,
}: {
  image: UploadedImage;
  onRemove: (id: string) => void;
  onAltChange: (id: string, alt: string) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: image.id });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        width: "120px",
      }}
      className="relative group shrink-0"
    >
      <div
        className="rounded-xl overflow-hidden"
        style={{
          border: "1px solid rgba(255,255,255,0.1)",
          backgroundColor: "#161C2E",
          width: "120px",
          height: "120px",
          position: "relative",
        }}
      >
        <Image src={image.url} alt={image.alt} fill className="object-cover" />
        <div
          {...attributes}
          {...listeners}
          className="absolute top-1 left-1 p-1 rounded cursor-grab opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <GripVertical size={12} color="white" />
        </div>
        <button
          type="button"
          onClick={() => onRemove(image.id)}
          className="absolute top-1 right-1 p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ backgroundColor: "rgba(239,68,68,0.9)" }}
        >
          <X size={12} color="white" />
        </button>
      </div>
      <input
        type="text"
        placeholder="Alt text"
        value={image.alt}
        onChange={(e) => onAltChange(image.id, e.target.value)}
        className="w-full mt-1 px-2 py-1 text-xs rounded"
        style={{
          backgroundColor: "#161C2E",
          border: "1px solid rgba(255,255,255,0.06)",
          color: "#9CA3AF",
        }}
      />
    </div>
  );
}

export function ImageUploader({ value, onChange }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDrop = useCallback(
    async (e: React.DragEvent) => {
      e.preventDefault();
      const files = Array.from(e.dataTransfer.files).filter((f) =>
        f.type.startsWith("image/")
      );
      await uploadFiles(files);
    },
    [value, onChange]
  );

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    await uploadFiles(files);
    e.target.value = "";
  };

  const uploadFiles = async (files: File[]) => {
    if (!files.length) return;
    setUploading(true);
    try {
      const uploaded: UploadedImage[] = [];
      for (const file of files) {
        const fd = new FormData();
        fd.append("file", file);
        const res = await fetch("/api/upload", { method: "POST", body: fd });
        if (!res.ok) throw new Error("Error al subir imagen");
        const { url } = await res.json();
        uploaded.push({
          id: `${Date.now()}-${Math.random()}`,
          url,
          alt: file.name.replace(/\.[^.]+$/, ""),
          order: value.length + uploaded.length,
        });
      }
      onChange([...value, ...uploaded]);
    } catch {
      toast.error("Error al subir imágenes");
    } finally {
      setUploading(false);
    }
  };

  const handleDragEnd = (event: { active: { id: string | number }; over: { id: string | number } | null }) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = value.findIndex((i) => i.id === active.id);
      const newIndex = value.findIndex((i) => i.id === over.id);
      const reordered = arrayMove(value, oldIndex, newIndex).map((img, idx) => ({
        ...img,
        order: idx,
      }));
      onChange(reordered);
    }
  };

  const removeImage = (id: string) => {
    onChange(value.filter((i) => i.id !== id).map((img, idx) => ({ ...img, order: idx })));
  };

  const updateAlt = (id: string, alt: string) => {
    onChange(value.map((i) => (i.id === id ? { ...i, alt } : i)));
  };

  return (
    <div>
      {/* Drop zone */}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="relative rounded-xl p-8 text-center cursor-pointer transition-all duration-200"
        style={{
          border: "2px dashed rgba(30,95,255,0.3)",
          backgroundColor: "rgba(30,95,255,0.03)",
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "rgba(30,95,255,0.6)")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "rgba(30,95,255,0.3)")}
        onClick={() => document.getElementById("img-input")?.click()}
      >
        <input
          id="img-input"
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleFileInput}
        />
        <Upload size={32} className="mx-auto mb-3" style={{ color: "#1E5FFF" }} />
        <p className="text-sm font-medium text-white mb-1">
          {uploading ? "Subiendo..." : "Arrastra imágenes aquí o haz clic"}
        </p>
        <p className="text-xs" style={{ color: "#6B7280" }}>
          PNG, JPG, WEBP · Max 10MB por imagen
        </p>
      </div>

      {/* Preview with drag & drop */}
      {value.length > 0 && (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd as Parameters<typeof DndContext>[0]["onDragEnd"]}
        >
          <SortableContext items={value.map((i) => i.id)} strategy={horizontalListSortingStrategy}>
            <div className="flex gap-3 mt-4 flex-wrap">
              {value.map((img, i) => (
                <div key={img.id} className="relative">
                  {i === 0 && (
                    <span
                      className="absolute -top-2 -left-2 z-10 text-[10px] font-bold px-1.5 py-0.5 rounded"
                      style={{ backgroundColor: "#1E5FFF", color: "white" }}
                    >
                      PORTADA
                    </span>
                  )}
                  <SortableImage
                    image={img}
                    onRemove={removeImage}
                    onAltChange={updateAlt}
                  />
                </div>
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
}
