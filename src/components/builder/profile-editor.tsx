"use client";

import React, { useState, useRef } from "react";
import { useBuilderStore } from "@/stores/use-builder-store";
import { SocialPlatform } from "@/types/builder";
import {
  User,
  ShieldCheck,
  Share2,
  Plus,
  Trash2,
  Eye,
  EyeOff,
  Sparkles,
  MapPin,
  Image as ImageIcon,
  Upload,
  Camera,
  RefreshCw,
} from "lucide-react";

export function ProfileEditor() {
  const {
    profile,
    updateProfile,
    updateSocialLink,
    addSocialLink,
    removeSocialLink,
  } = useBuilderStore();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [newPlatform, setNewPlatform] = useState<SocialPlatform>("instagram");

  const avatarPresets = [
    {
      label: "Studio Dark",
      url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    },
    {
      label: "Camera / Gear",
      url: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&auto=format&fit=crop&q=80",
    },
    {
      label: "Neon Aesthetic",
      url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    },
    {
      label: "3D Visual Studio",
      url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&auto=format&fit=crop&q=80",
    },
  ];

  const availablePlatforms: { id: SocialPlatform; label: string }[] = [
    { id: "instagram", label: "Instagram" },
    { id: "youtube", label: "YouTube" },
    { id: "behance", label: "Behance" },
    { id: "whatsapp", label: "WhatsApp" },
    { id: "tiktok", label: "TikTok" },
    { id: "github", label: "GitHub" },
    { id: "linkedin", label: "LinkedIn" },
    { id: "twitter", label: "Twitter / X" },
    { id: "email", label: "Email Contact" },
    { id: "website", label: "Custom Website" },
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("Ukuran gambar maksimal 5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (typeof event.target?.result === "string") {
        updateProfile({ avatarUrl: event.target.result });
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-8 pb-8">
      {/* 1. AVATAR & BASIC DETAILS */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Identitas & Foto Profil</h3>
        </div>

        {/* Avatar Display and Upload Box */}
        <div className="p-5 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-sm space-y-4 transition-colors duration-200">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
            {/* Clickable Avatar Photo */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="relative group cursor-pointer"
              title="Klik untuk memilih foto dari HP / Komputer"
            >
              <div className="w-24 h-24 rounded-3xl overflow-hidden border-2 border-emerald-500/50 bg-slate-100 dark:bg-zinc-950 shrink-0 shadow-lg group-hover:opacity-90 transition">
                <img
                  src={profile.avatarUrl || avatarPresets[0].url}
                  alt={profile.displayName}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="absolute inset-0 bg-black/40 rounded-3xl opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white transition duration-200">
                <Camera className="w-6 h-6" />
                <span className="text-[9px] font-bold mt-1">Ubah Foto</span>
              </div>
            </div>

            {/* Hidden Native File Input */}
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />

            {/* Upload Buttons & URL Input */}
            <div className="flex-1 space-y-2 text-center sm:text-left w-full">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs flex items-center gap-1.5 transition shadow-sm cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Pilih Dari Galeri / PC</span>
                </button>

                {profile.avatarUrl && (
                  <button
                    type="button"
                    onClick={() => updateProfile({ avatarUrl: "" })}
                    className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-rose-50 dark:bg-zinc-800 dark:hover:bg-rose-950/40 text-slate-600 hover:text-rose-600 dark:text-zinc-400 dark:hover:text-rose-400 border border-slate-200 dark:border-transparent text-xs font-semibold transition cursor-pointer"
                  >
                    Hapus
                  </button>
                )}
              </div>

              <div className="pt-1">
                <label className="block text-[11px] font-semibold text-slate-500 dark:text-zinc-400 mb-1">
                  Atau masukkan URL Foto:
                </label>
                <input
                  type="text"
                  value={profile.avatarUrl.startsWith("data:") ? "(Foto Terunggah dari Perangkat)" : profile.avatarUrl}
                  onChange={(e) => updateProfile({ avatarUrl: e.target.value })}
                  placeholder="https://..."
                  disabled={profile.avatarUrl.startsWith("data:")}
                  className="w-full bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-600 focus:outline-none focus:border-emerald-500 font-mono disabled:opacity-60"
                />
              </div>
            </div>
          </div>

          {/* Quick preset selector */}
          <div className="pt-2 border-t border-slate-100 dark:border-zinc-800">
            <span className="block text-[11px] text-slate-500 dark:text-zinc-400 mb-2">
              Atau Pilih Preset Avatar Studio Cepat:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {avatarPresets.map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => updateProfile({ avatarUrl: preset.url })}
                  className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-zinc-950 dark:hover:bg-zinc-800 border border-slate-200 dark:border-zinc-800 text-[11px] text-slate-700 dark:text-zinc-300 flex items-center gap-2 transition cursor-pointer"
                >
                  <img
                    src={preset.url}
                    alt=""
                    className="w-5 h-5 rounded-full object-cover"
                  />
                  <span className="truncate font-medium">{preset.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Display Name & Username */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1.5">
              Nama Tampilan (Display Name):
            </label>
            <input
              type="text"
              value={profile.displayName}
              onChange={(e) => updateProfile({ displayName: e.target.value })}
              placeholder="Sinergi Visual"
              className="w-full bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:border-emerald-500 font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1.5">
              Username URL Bio (/[username]):
            </label>
            <div className="flex items-center bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl px-3 py-2.5 focus-within:border-emerald-500">
              <span className="text-slate-400 dark:text-zinc-500 text-xs mr-1 font-mono">/</span>
              <input
                type="text"
                value={profile.username}
                onChange={(e) =>
                  updateProfile({
                    username: e.target.value
                      .toLowerCase()
                      .replace(/[^a-z0-9_-]/g, ""),
                  })
                }
                placeholder="sinergivisual"
                className="w-full bg-transparent text-xs text-emerald-600 dark:text-emerald-400 placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none font-mono font-bold"
              />
            </div>
          </div>
        </div>

        {/* Bio Textarea */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1.5">
            Bio / Deskripsi Tim:
          </label>
          <textarea
            rows={3}
            value={profile.bio}
            onChange={(e) => updateProfile({ bio: e.target.value })}
            placeholder="Tuliskan bio singkat profil tim atau studio Anda..."
            className="w-full bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:border-emerald-500 leading-relaxed"
          />
        </div>

        {/* Location & Verified Badge */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1.5">
              Lokasi Studio:
            </label>
            <div className="flex items-center bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl px-3 py-2">
              <MapPin className="w-3.5 h-3.5 text-slate-400 dark:text-zinc-500 mr-2" />
              <input
                type="text"
                value={profile.location || ""}
                onChange={(e) => updateProfile({ location: e.target.value })}
                placeholder="Jakarta, Indonesia"
                className="w-full bg-transparent text-xs text-slate-900 dark:text-white focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1.5">
              Verified Badge Tim:
            </label>
            <button
              type="button"
              onClick={() => updateProfile({ verified: !profile.verified })}
              className={`w-full py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-between transition cursor-pointer ${
                profile.verified
                  ? "bg-emerald-50 text-emerald-700 border-emerald-300 dark:bg-emerald-950/60 dark:border-emerald-500/40 dark:text-emerald-400"
                  : "bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 text-slate-500 dark:text-zinc-400"
              }`}
            >
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>{profile.verified ? "Lencana Terverifikasi Aktif" : "Nonaktif"}</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-slate-200 dark:bg-zinc-950 font-bold">
                {profile.verified ? "ON" : "OFF"}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. SOCIAL MEDIA LINKS */}
      <div className="space-y-4 pt-2 border-t border-slate-200 dark:border-zinc-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Share2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Social Media Links</h3>
          </div>
          <span className="text-xs text-slate-400 dark:text-zinc-500">Ikon Sosial Header</span>
        </div>

        {/* Existing Social Links */}
        <div className="space-y-2.5">
          {profile.socialLinks.map((link) => (
            <div
              key={link.id}
              className="p-3 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-sm flex items-center gap-3"
            >
              <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-zinc-950 text-xs font-bold capitalize text-slate-800 dark:text-zinc-300 min-w-[85px] text-center border border-slate-200 dark:border-zinc-800">
                {link.platform}
              </span>

              <input
                type="text"
                value={link.url}
                onChange={(e) =>
                  updateSocialLink(link.id, { url: e.target.value })
                }
                placeholder={`https://${link.platform}.com/...`}
                className="flex-1 bg-transparent text-xs text-slate-800 dark:text-zinc-300 font-mono focus:outline-none"
              />

              <button
                type="button"
                onClick={() =>
                  updateSocialLink(link.id, { active: !link.active })
                }
                className={`p-1.5 rounded-lg transition cursor-pointer ${
                  link.active
                    ? "text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950"
                    : "text-slate-400 dark:text-zinc-600 hover:bg-slate-100 dark:hover:bg-zinc-800"
                }`}
                title={link.active ? "Aktif" : "Nonaktif"}
              >
                {link.active ? (
                  <Eye className="w-4 h-4" />
                ) : (
                  <EyeOff className="w-4 h-4" />
                )}
              </button>

              <button
                type="button"
                onClick={() => removeSocialLink(link.id)}
                className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition cursor-pointer"
                title="Hapus"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Add Social Link Bar */}
        <div className="p-3 rounded-2xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800/80 flex items-center gap-2">
          <select
            value={newPlatform}
            onChange={(e) => setNewPlatform(e.target.value as SocialPlatform)}
            className="bg-white dark:bg-zinc-900 border border-slate-300 dark:border-zinc-700 text-xs text-slate-900 dark:text-white rounded-xl px-2.5 py-2 focus:outline-none"
          >
            {availablePlatforms.map((p) => (
              <option key={p.id} value={p.id}>
                {p.label}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={() => addSocialLink(newPlatform)}
            className="flex-1 py-2 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Tambah Platform Ini</span>
          </button>
        </div>
      </div>

      {/* 3. WATERMARK FOOTER SETTING */}
      <div className="pt-2 border-t border-slate-200 dark:border-zinc-800">
        <div className="flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-sm">
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white">Watermark Footer</h4>
            <p className="text-[11px] text-slate-500 dark:text-zinc-400 mt-0.5">
              Tampilkan branding &quot;Sinergi Visual Lynk&quot; di bagian bawah bio
            </p>
          </div>
          <button
            type="button"
            onClick={() =>
              updateProfile({ showWatermark: !profile.showWatermark })
            }
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              profile.showWatermark
                ? "bg-emerald-500 text-zinc-950"
                : "bg-slate-200 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400"
            }`}
          >
            {profile.showWatermark ? "Aktif" : "Nonaktif"}
          </button>
        </div>
      </div>
    </div>
  );
}
