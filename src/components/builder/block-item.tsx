"use client";

import React, { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { BlockItem, BlockType } from "@/types/builder";
import {
  GripVertical,
  Link2,
  Sparkles,
  PlayCircle,
  Heading,
  Trash2,
  Copy,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Eye,
  EyeOff,
  Image as ImageIcon,
  Tag,
  FileArchive,
  BarChart2,
} from "lucide-react";

interface BlockItemComponentProps {
  block: BlockItem;
  onUpdate: (id: string, data: Partial<BlockItem>) => void;
  onRemove: (id: string) => void;
  onToggleActive: (id: string) => void;
  onDuplicate: (id: string) => void;
}

export function BlockItemComponent({
  block,
  onUpdate,
  onRemove,
  onToggleActive,
  onDuplicate,
}: BlockItemComponentProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: block.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : block.active ? 1 : 0.6,
  };

  const getBlockMeta = (type: BlockType) => {
    switch (type) {
      case "product":
        return {
          icon: <Sparkles className="w-4 h-4 text-indigo-400" />,
          label: "Produk Digital",
          color: "bg-indigo-950/60 border-indigo-500/30 text-indigo-400",
        };
      case "video":
        return {
          icon: <PlayCircle className="w-4 h-4 text-rose-400" />,
          label: "Embed Video",
          color: "bg-rose-950/60 border-rose-500/30 text-rose-400",
        };
      case "header":
        return {
          icon: <Heading className="w-4 h-4 text-amber-400" />,
          label: "Section Header",
          color: "bg-amber-950/60 border-amber-500/30 text-amber-400",
        };
      case "link":
      default:
        return {
          icon: <Link2 className="w-4 h-4 text-emerald-400" />,
          label: "Link Kustom",
          color: "bg-emerald-950/60 border-emerald-500/30 text-emerald-400",
        };
    }
  };

  const meta = getBlockMeta(block.type);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`rounded-2xl bg-zinc-900 border ${
        block.active ? "border-zinc-800" : "border-zinc-800/40"
      } shadow-md transition-all duration-200 overflow-hidden hover:border-zinc-700`}
    >
      {/* Top Main Row */}
      <div className="p-4 flex items-center gap-3">
        {/* Drag Handle */}
        <button
          {...attributes}
          {...listeners}
          className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 cursor-grab active:cursor-grabbing transition"
          title="Geser untuk urutkan"
        >
          <GripVertical className="w-4 h-4" />
        </button>

        {/* Block Thumbnail or Icon */}
        <div className="shrink-0">
          {block.thumbnail ? (
            <div className="w-10 h-10 rounded-lg overflow-hidden border border-zinc-700 bg-zinc-950">
              <img
                src={block.thumbnail}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center border ${meta.color}`}
            >
              {meta.icon}
            </div>
          )}
        </div>

        {/* Title & URL Inputs (Inline Editing) */}
        <div className="flex-1 min-w-0 space-y-1">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={block.title}
              onChange={(e) => onUpdate(block.id, { title: e.target.value })}
              placeholder={block.type === "header" ? "Judul Kategori..." : "Judul Blok..."}
              className="w-full bg-transparent text-sm font-semibold text-white focus:outline-none focus:bg-zinc-800/50 px-2 py-0.5 rounded transition"
            />
            <span
              className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border shrink-0 ${meta.color}`}
            >
              {meta.label}
            </span>
          </div>

          {block.type !== "header" && (
            <div className="flex items-center gap-1.5 px-2">
              <span className="text-zinc-500 text-xs">🔗</span>
              <input
                type="text"
                value={block.type === "video" ? block.videoUrl || block.url : block.url}
                onChange={(e) =>
                  onUpdate(block.id, {
                    url: e.target.value,
                    videoUrl: block.type === "video" ? e.target.value : undefined,
                  })
                }
                placeholder={
                  block.type === "video"
                    ? "https://youtube.com/watch?v=..."
                    : "https://..."
                }
                className="w-full bg-transparent text-xs text-zinc-400 font-mono focus:outline-none focus:text-zinc-200 transition"
              />
            </div>
          )}
        </div>

        {/* Right Actions: Analytics, Toggle Active, Expand, Duplicate, Delete */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Clicks analytics */}
          {block.type !== "header" && (
            <div
              className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-lg bg-zinc-950 text-[11px] text-zinc-400 border border-zinc-800"
              title="Total Klik"
            >
              <BarChart2 className="w-3 h-3 text-emerald-400" />
              <span>{block.clicks || 0}</span>
            </div>
          )}

          {/* Toggle Active Button */}
          <button
            onClick={() => onToggleActive(block.id)}
            className={`p-2 rounded-lg transition ${
              block.active
                ? "bg-emerald-950/60 text-emerald-400 hover:bg-emerald-900/60 border border-emerald-500/30"
                : "bg-zinc-800 text-zinc-500 hover:text-zinc-300"
            }`}
            title={block.active ? "Aktif (Tampil di Bio)" : "Nonaktif (Tersembunyi)"}
          >
            {block.active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
          </button>

          {/* Expand Details Button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`p-2 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white transition ${
              isExpanded ? "bg-zinc-800 text-white" : ""
            }`}
            title="Pengaturan Detail"
          >
            {isExpanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Expanded Settings Panel */}
      {isExpanded && (
        <div className="p-4 border-t border-zinc-800/80 bg-zinc-950/50 space-y-4 animate-in slide-in-from-top-2 duration-150">
          {/* Subtitle input for all except header */}
          {block.type !== "header" && (
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1">
                Sub-judul / Deskripsi Singkat:
              </label>
              <input
                type="text"
                value={block.subtitle || ""}
                onChange={(e) => onUpdate(block.id, { subtitle: e.target.value })}
                placeholder="Contoh: Gratis untuk DaVinci & Premiere Pro"
                className="w-full bg-zinc-900 border border-zinc-700/80 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 transition"
              />
            </div>
          )}

          {/* Type-Specific Settings */}

          {/* 1. PRODUCT SPECIFIC */}
          {block.type === "product" && (
            <div className="space-y-3 pt-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">
                    Label Harga:
                  </label>
                  <input
                    type="text"
                    value={block.price || "FREE"}
                    onChange={(e) => onUpdate(block.id, { price: e.target.value })}
                    placeholder="FREE atau Rp 0"
                    className="w-full bg-zinc-900 border border-zinc-700/80 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">
                    Harga Coret (Original):
                  </label>
                  <input
                    type="text"
                    value={block.originalPrice || ""}
                    onChange={(e) =>
                      onUpdate(block.id, { originalPrice: e.target.value })
                    }
                    placeholder="Contoh: Rp 199.000"
                    className="w-full bg-zinc-900 border border-zinc-700/80 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">
                    Format & Ukuran Berkas:
                  </label>
                  <input
                    type="text"
                    value={block.fileType || ""}
                    onChange={(e) => onUpdate(block.id, { fileType: e.target.value })}
                    placeholder="Contoh: ZIP • 45 MB / .CUBE / MOGRT"
                    className="w-full bg-zinc-900 border border-zinc-700/80 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">
                    Direct Download URL (Link Drive/Storage):
                  </label>
                  <input
                    type="text"
                    value={block.downloadUrl || ""}
                    onChange={(e) =>
                      onUpdate(block.id, { downloadUrl: e.target.value })
                    }
                    placeholder="https://drive.google.com/..."
                    className="w-full bg-zinc-900 border border-zinc-700/80 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">
                  Tags Kompatibilitas (pisahkan dengan koma):
                </label>
                <input
                  type="text"
                  value={block.tags ? block.tags.join(", ") : ""}
                  onChange={(e) =>
                    onUpdate(block.id, {
                      tags: e.target.value
                        .split(",")
                        .map((t) => t.trim())
                        .filter(Boolean),
                    })
                  }
                  placeholder="Premiere Pro, DaVinci Resolve, 4K, SFX"
                  className="w-full bg-zinc-900 border border-zinc-700/80 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">
                  Deskripsi Lengkap Aset:
                </label>
                <textarea
                  rows={2}
                  value={block.description || ""}
                  onChange={(e) =>
                    onUpdate(block.id, { description: e.target.value })
                  }
                  placeholder="Jelaskan spesifikasi aset, cara penggunaan, dan kompatibilitas software..."
                  className="w-full bg-zinc-900 border border-zinc-700/80 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          )}

          {/* 2. VIDEO SPECIFIC */}
          {block.type === "video" && (
            <div className="space-y-3 pt-1">
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">
                  Aspek Rasio Tampilan Video:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "16:9", label: "16:9 (Landscape YouTube)" },
                    { id: "9:16", label: "9:16 (Vertical Reels/TikTok)" },
                    { id: "1:1", label: "1:1 (Square Feed)" },
                  ].map((ratio) => (
                    <button
                      key={ratio.id}
                      type="button"
                      onClick={() =>
                        onUpdate(block.id, {
                          videoAspectRatio: ratio.id as "16:9" | "9:16" | "1:1",
                        })
                      }
                      className={`py-2 px-2 text-xs font-semibold rounded-xl border transition ${
                        (block.videoAspectRatio || "16:9") === ratio.id
                          ? "bg-rose-950/60 border-rose-500/50 text-rose-400"
                          : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200"
                      }`}
                    >
                      {ratio.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 3. HEADER SPECIFIC */}
          {block.type === "header" && (
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1">
                Gaya Header:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "accent", label: "Pill Accent" },
                  { id: "divider", label: "Garis Divider" },
                  { id: "simple", label: "Teks Simpel" },
                ].map((style) => (
                  <button
                    key={style.id}
                    type="button"
                    onClick={() =>
                      onUpdate(block.id, {
                        headerStyle: style.id as "accent" | "divider" | "simple",
                      })
                    }
                    className={`py-2 px-2 text-xs font-semibold rounded-xl border transition ${
                      (block.headerStyle || "accent") === style.id
                        ? "bg-amber-950/60 border-amber-500/50 text-amber-400"
                        : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    {style.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Thumbnail Image URL for Link and Product */}
          {block.type !== "header" && (
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1">
                Thumbnail Image URL:
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={block.thumbnail || ""}
                  onChange={(e) => onUpdate(block.id, { thumbnail: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="flex-1 bg-zinc-900 border border-zinc-700/80 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 font-mono"
                />
                {block.thumbnail && (
                  <button
                    type="button"
                    onClick={() => onUpdate(block.id, { thumbnail: "" })}
                    className="px-2.5 py-2 text-xs text-rose-400 hover:bg-rose-950/50 rounded-lg border border-rose-500/20"
                  >
                    Hapus Foto
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Bottom Actions: Duplicate & Delete */}
          <div className="flex items-center justify-between pt-3 border-t border-zinc-800">
            <button
              type="button"
              onClick={() => onDuplicate(block.id)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-zinc-300 transition"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Duplikat Blok</span>
            </button>

            <button
              type="button"
              onClick={() => onRemove(block.id)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 border border-rose-500/30 text-xs font-semibold text-rose-400 transition"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Hapus Blok</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
