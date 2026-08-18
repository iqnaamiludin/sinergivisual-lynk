"use client";

import React, { useState, useRef } from "react";
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
  Upload,
  Camera,
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
  const fileInputRef = useRef<HTMLInputElement>(null);

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
          icon: <Sparkles className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />,
          label: "Produk Digital",
          color: "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/60 dark:border-indigo-500/30 dark:text-indigo-400",
        };
      case "video":
        return {
          icon: <PlayCircle className="w-4 h-4 text-rose-500 dark:text-rose-400" />,
          label: "Embed Video",
          color: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/60 dark:border-rose-500/30 dark:text-rose-400",
        };
      case "header":
        return {
          icon: <Heading className="w-4 h-4 text-amber-500 dark:text-amber-400" />,
          label: "Section Header",
          color: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/60 dark:border-amber-500/30 dark:text-amber-400",
        };
      case "link":
      default:
        return {
          icon: <Link2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />,
          label: "Link Kustom",
          color: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:border-emerald-500/30 dark:text-emerald-400",
        };
    }
  };

  const meta = getBlockMeta(block.type);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("Ukuran gambar maksimal 5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (typeof event.target?.result === "string") {
        onUpdate(block.id, { thumbnail: event.target.result });
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`rounded-3xl bg-white dark:bg-zinc-900 border ${
        block.active ? "border-slate-200 dark:border-zinc-800 shadow-sm" : "border-slate-200/50 dark:border-zinc-800/40"
      } transition-all duration-200 overflow-hidden hover:border-slate-300 dark:hover:border-zinc-700`}
    >
      {/* Top Main Row */}
      <div className="p-4 flex items-center gap-3">
        {/* Drag Handle */}
        <button
          {...attributes}
          {...listeners}
          className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:text-zinc-500 dark:hover:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800 cursor-grab active:cursor-grabbing transition"
          title="Geser untuk urutkan"
        >
          <GripVertical className="w-4 h-4" />
        </button>

        {/* Block Thumbnail or Icon */}
        <div className="shrink-0">
          {block.thumbnail ? (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="w-10 h-10 rounded-xl overflow-hidden border border-slate-200 dark:border-zinc-700 bg-slate-100 dark:bg-zinc-950 cursor-pointer relative group shadow-sm"
              title="Klik untuk ganti gambar"
            >
              <img
                src={block.thumbnail}
                alt=""
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition">
                <Camera className="w-4 h-4" />
              </div>
            </div>
          ) : (
            <div
              onClick={() => fileInputRef.current?.click()}
              className={`w-10 h-10 rounded-xl border flex items-center justify-center ${meta.color} cursor-pointer shadow-sm`}
              title="Klik untuk upload gambar"
            >
              {meta.icon}
            </div>
          )}
        </div>

        {/* Hidden File Input */}
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
        />

        {/* Center Inputs (Title & URL) */}
        <div className="flex-1 min-w-0 space-y-1">
          <input
            type="text"
            value={block.title}
            onChange={(e) => onUpdate(block.id, { title: e.target.value })}
            placeholder={
              block.type === "header"
                ? "Teks Judul Section..."
                : "Nama Link atau Judul Aset..."
            }
            className="w-full bg-transparent text-xs font-bold text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:bg-slate-50 dark:focus:bg-zinc-950/60 rounded px-1.5 py-0.5"
          />

          {block.type !== "header" && (
            <div className="flex items-center gap-1.5 px-1.5">
              <span className="text-[10px] text-slate-400 dark:text-zinc-500 font-mono">URL:</span>
              <input
                type="text"
                value={block.url || ""}
                onChange={(e) => onUpdate(block.id, { url: e.target.value })}
                placeholder={
                  block.type === "video"
                    ? "https://youtube.com/watch?v=..."
                    : "https://..."
                }
                className="w-full bg-transparent text-[11px] text-slate-600 dark:text-zinc-400 placeholder-slate-400 dark:placeholder-zinc-600 font-mono focus:outline-none focus:text-emerald-600 dark:focus:text-emerald-400"
              />
            </div>
          )}
        </div>

        {/* Right Action Icons */}
        <div className="flex items-center gap-1 shrink-0">
          {/* Clicks Metric Badge (Only for link & product) */}
          {block.type !== "header" && (
            <div
              className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-xl bg-slate-100 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 text-[10px] text-slate-500 dark:text-zinc-400 font-mono"
              title="Total interaksi klik"
            >
              <BarChart2 className="w-3 h-3 text-emerald-500 dark:text-emerald-400" />
              <span>{block.clicks || 0}</span>
            </div>
          )}

          {/* Duplicate Button */}
          <button
            onClick={() => onDuplicate(block.id)}
            className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-400 hover:text-slate-700 dark:text-zinc-500 dark:hover:text-zinc-300 transition cursor-pointer"
            title="Duplikat Blok"
          >
            <Copy className="w-4 h-4" />
          </button>

          {/* Delete Button */}
          <button
            onClick={() => onRemove(block.id)}
            className="p-2 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/40 text-slate-400 hover:text-rose-600 dark:text-zinc-500 dark:hover:text-rose-400 transition cursor-pointer"
            title="Hapus Blok"
          >
            <Trash2 className="w-4 h-4" />
          </button>

          {/* Direct Open Link (External preview) */}
          {block.url && (
            <a
              href={block.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-400 hover:text-slate-700 dark:text-zinc-500 dark:hover:text-zinc-300 transition hidden sm:block"
              title="Buka Link di Tab Baru"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}

          {/* Toggle Active Button */}
          <button
            onClick={() => onToggleActive(block.id)}
            className={`p-2 rounded-xl transition cursor-pointer ${
              block.active
                ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 border border-emerald-300 dark:border-emerald-500/30"
                : "bg-slate-100 dark:bg-zinc-800 text-slate-400 dark:text-zinc-500 hover:text-slate-700 dark:hover:text-zinc-300"
            }`}
            title={block.active ? "Aktif (Tampil di Bio)" : "Nonaktif (Tersembunyi)"}
          >
            {block.active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
          </button>

          {/* Expand Details Button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-400 hover:text-slate-700 dark:text-zinc-400 dark:hover:text-white transition cursor-pointer ${
              isExpanded ? "bg-slate-100 dark:bg-zinc-800 text-slate-900 dark:text-white" : ""
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
        <div className="p-5 border-t border-slate-100 dark:border-zinc-800/80 bg-slate-50 dark:bg-zinc-950/50 space-y-4 animate-in slide-in-from-top-2 duration-150">
          {/* Subtitle input for all except header */}
          {block.type !== "header" && (
            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-zinc-400 mb-1">
                Sub-judul / Deskripsi Singkat:
              </label>
              <input
                type="text"
                value={block.subtitle || ""}
                onChange={(e) => onUpdate(block.id, { subtitle: e.target.value })}
                placeholder="Contoh: Gratis untuk DaVinci & Premiere Pro"
                className="w-full bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700/80 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:border-emerald-500 transition"
              />
            </div>
          )}

          {/* Type-Specific Settings */}

          {/* 1. PRODUCT SPECIFIC */}
          {block.type === "product" && (
            <div className="space-y-3 pt-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-zinc-400 mb-1">
                    Label Harga:
                  </label>
                  <input
                    type="text"
                    value={block.price || "FREE"}
                    onChange={(e) => onUpdate(block.id, { price: e.target.value })}
                    placeholder="FREE atau Rp 0"
                    className="w-full bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700/80 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-zinc-400 mb-1">
                    Harga Coret (Original):
                  </label>
                  <input
                    type="text"
                    value={block.originalPrice || ""}
                    onChange={(e) =>
                      onUpdate(block.id, { originalPrice: e.target.value })
                    }
                    placeholder="Contoh: Rp 199.000"
                    className="w-full bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700/80 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-zinc-400 mb-1">
                    Format & Ukuran Berkas:
                  </label>
                  <input
                    type="text"
                    value={block.fileType || ""}
                    onChange={(e) => onUpdate(block.id, { fileType: e.target.value })}
                    placeholder="Contoh: ZIP • 45 MB / .CUBE / MOGRT"
                    className="w-full bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700/80 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-zinc-400 mb-1">
                    Direct Download URL (Link Drive/Storage):
                  </label>
                  <input
                    type="text"
                    value={block.downloadUrl || ""}
                    onChange={(e) =>
                      onUpdate(block.id, { downloadUrl: e.target.value })
                    }
                    placeholder="https://drive.google.com/..."
                    className="w-full bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700/80 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:border-indigo-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-zinc-400 mb-1">
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
                  className="w-full bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700/80 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-zinc-400 mb-1">
                  Deskripsi Lengkap Aset:
                </label>
                <textarea
                  rows={2}
                  value={block.description || ""}
                  onChange={(e) =>
                    onUpdate(block.id, { description: e.target.value })
                  }
                  placeholder="Jelaskan spesifikasi aset, cara penggunaan, dan kompatibilitas software..."
                  className="w-full bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700/80 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          )}

          {/* 2. VIDEO SPECIFIC */}
          {block.type === "video" && (
            <div className="space-y-3 pt-1">
              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-zinc-400 mb-1">
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
                      className={`py-2 px-2 text-xs font-semibold rounded-xl border transition cursor-pointer ${
                        (block.videoAspectRatio || "16:9") === ratio.id
                          ? "bg-rose-50 text-rose-700 border-rose-300 dark:bg-rose-950/60 dark:border-rose-500/50 dark:text-rose-400 font-bold"
                          : "bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200"
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
              <label className="block text-xs font-medium text-slate-600 dark:text-zinc-400 mb-1">
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
                    className={`py-2 px-2 text-xs font-semibold rounded-xl border transition cursor-pointer ${
                      (block.headerStyle || "accent") === style.id
                        ? "bg-amber-50 text-amber-700 border-amber-300 dark:bg-amber-950/60 dark:border-amber-500/50 dark:text-amber-400 font-bold"
                        : "bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200"
                    }`}
                  >
                    {style.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Thumbnail Image Picker & URL for Link and Product */}
          {block.type !== "header" && (
            <div className="space-y-2 pt-1 border-t border-slate-200 dark:border-zinc-800">
              <label className="block text-xs font-medium text-slate-600 dark:text-zinc-400">
                Thumbnail Gambar / Cover:
              </label>
              
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3.5 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-slate-800 dark:text-zinc-200 font-bold text-xs flex items-center gap-1.5 transition cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>{block.thumbnail ? "Ganti Gambar dari HP / PC" : "Pilih Gambar (Galeri / PC)"}</span>
                </button>

                {block.thumbnail && (
                  <button
                    type="button"
                    onClick={() => onUpdate(block.id, { thumbnail: "" })}
                    className="px-3 py-2 text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 rounded-xl border border-rose-200 dark:border-rose-500/20 font-semibold cursor-pointer"
                  >
                    Hapus Gambar
                  </button>
                )}
              </div>

              <div className="pt-1">
                <input
                  type="text"
                  value={block.thumbnail?.startsWith("data:") ? "(Gambar Terunggah dari Perangkat)" : (block.thumbnail || "")}
                  onChange={(e) => onUpdate(block.id, { thumbnail: e.target.value })}
                  placeholder="Atau tempel link URL: https://images.unsplash.com/..."
                  disabled={block.thumbnail?.startsWith("data:")}
                  className="w-full bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700/80 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:border-emerald-500 font-mono disabled:opacity-60"
                />
              </div>
            </div>
          )}

          {/* Quick Preset Badges */}
          {block.type !== "header" && (
            <div className="pt-2 border-t border-slate-200 dark:border-zinc-800">
              <span className="block text-[11px] text-slate-400 dark:text-zinc-500 mb-2">
                Badge Penanda Cepat:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  "FREE DOWNLOAD",
                  "BEST SELLER",
                  "PROMO 50%",
                  "NEW 2026",
                  "PORTFOLIO",
                  "LIMITED",
                ].map((badge) => (
                  <button
                    key={badge}
                    type="button"
                    onClick={() =>
                      onUpdate(block.id, {
                        badgeText: block.badgeText === badge ? "" : badge,
                      })
                    }
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase transition cursor-pointer ${
                      block.badgeText === badge
                        ? "bg-emerald-500 text-zinc-950 shadow-sm"
                        : "bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-zinc-400 hover:border-slate-300 dark:hover:border-zinc-700"
                    }`}
                  >
                    {badge}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
