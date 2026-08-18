"use client";

import React, { useState } from "react";
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
} from "lucide-react";

export function ProfileEditor() {
  const {
    profile,
    updateProfile,
    updateSocialLink,
    addSocialLink,
    removeSocialLink,
  } = useBuilderStore();

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

  return (
    <div className="space-y-8 pb-8">
      {/* 1. AVATAR & BASIC DETAILS */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-emerald-400" />
          <h3 className="text-sm font-bold text-white">Identitas & Foto Profil</h3>
        </div>

        {/* Avatar Display and Presets */}
        <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-emerald-500/50 bg-zinc-950 shrink-0 shadow-lg">
              <img
                src={profile.avatarUrl || avatarPresets[0].url}
                alt={profile.displayName}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 space-y-1.5">
              <label className="block text-xs font-semibold text-zinc-300">
                URL Foto Profil / Avatar:
              </label>
              <input
                type="text"
                value={profile.avatarUrl}
                onChange={(e) => updateProfile({ avatarUrl: e.target.value })}
                placeholder="https://..."
                className="w-full bg-zinc-950 border border-zinc-700/80 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 font-mono"
              />
            </div>
          </div>

          {/* Quick preset selector */}
          <div>
            <span className="block text-[11px] text-zinc-400 mb-2">
              Pilih Avatar Preset Cepat:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {avatarPresets.map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => updateProfile({ avatarUrl: preset.url })}
                  className="p-2 rounded-xl bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-[11px] text-zinc-300 flex items-center gap-2 transition"
                >
                  <img
                    src={preset.url}
                    alt=""
                    className="w-5 h-5 rounded-full object-cover"
                  />
                  <span className="truncate">{preset.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Display Name & Username */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
              Nama Tampilan (Display Name):
            </label>
            <input
              type="text"
              value={profile.displayName}
              onChange={(e) => updateProfile({ displayName: e.target.value })}
              placeholder="Sinergi Visual"
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
              Username URL Bio (/[username]):
            </label>
            <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2.5 focus-within:border-emerald-500">
              <span className="text-zinc-500 text-xs mr-1 font-mono">/</span>
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
                className="w-full bg-transparent text-xs text-emerald-400 placeholder-zinc-500 focus:outline-none font-mono font-bold"
              />
            </div>
          </div>
        </div>

        {/* Bio Textarea */}
        <div>
          <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
            Bio / Deskripsi Tim:
          </label>
          <textarea
            rows={3}
            value={profile.bio}
            onChange={(e) => updateProfile({ bio: e.target.value })}
            placeholder="Tuliskan bio singkat profil tim atau studio Anda..."
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 leading-relaxed"
          />
        </div>

        {/* Location & Verified Badge */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
              Lokasi Studio:
            </label>
            <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2">
              <MapPin className="w-3.5 h-3.5 text-zinc-500 mr-2" />
              <input
                type="text"
                value={profile.location || ""}
                onChange={(e) => updateProfile({ location: e.target.value })}
                placeholder="Jakarta, Indonesia"
                className="w-full bg-transparent text-xs text-white focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
              Verified Badge Tim:
            </label>
            <button
              type="button"
              onClick={() => updateProfile({ verified: !profile.verified })}
              className={`w-full py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-between transition ${
                profile.verified
                  ? "bg-emerald-950/60 border-emerald-500/40 text-emerald-400"
                  : "bg-zinc-900 border-zinc-800 text-zinc-400"
              }`}
            >
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>{profile.verified ? "Lencana Terverifikasi Aktif" : "Nonaktif"}</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-950">
                {profile.verified ? "ON" : "OFF"}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. SOCIAL MEDIA LINKS */}
      <div className="space-y-4 pt-2 border-t border-zinc-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Share2 className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-bold text-white">Social Media Links</h3>
          </div>
          <span className="text-xs text-zinc-500">Ikon Sosial Header</span>
        </div>

        {/* Existing Social Links */}
        <div className="space-y-2.5">
          {profile.socialLinks.map((link) => (
            <div
              key={link.id}
              className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center gap-3"
            >
              <span className="px-2.5 py-1 rounded-md bg-zinc-950 text-xs font-bold capitalize text-zinc-300 min-w-[85px] text-center border border-zinc-800">
                {link.platform}
              </span>

              <input
                type="text"
                value={link.url}
                onChange={(e) =>
                  updateSocialLink(link.id, { url: e.target.value })
                }
                placeholder={`https://${link.platform}.com/...`}
                className="flex-1 bg-transparent text-xs text-zinc-300 font-mono focus:outline-none"
              />

              <button
                type="button"
                onClick={() =>
                  updateSocialLink(link.id, { active: !link.active })
                }
                className={`p-1.5 rounded-lg transition ${
                  link.active
                    ? "text-emerald-400 hover:bg-emerald-950"
                    : "text-zinc-600 hover:bg-zinc-800"
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
                className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-950/50 transition"
                title="Hapus"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Add Social Link Bar */}
        <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800/80 flex items-center gap-2">
          <select
            value={newPlatform}
            onChange={(e) => setNewPlatform(e.target.value as SocialPlatform)}
            className="bg-zinc-900 border border-zinc-700 text-xs text-white rounded-lg px-2.5 py-2 focus:outline-none"
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
            className="flex-1 py-2 px-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-xs font-bold flex items-center justify-center gap-1.5 transition"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Tambah Platform Ini</span>
          </button>
        </div>
      </div>

      {/* 3. WATERMARK FOOTER SETTING */}
      <div className="pt-2 border-t border-zinc-800">
        <div className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-900 border border-zinc-800">
          <div>
            <h4 className="text-xs font-bold text-white">Watermark Footer</h4>
            <p className="text-[11px] text-zinc-400 mt-0.5">
              Tampilkan branding &quot;Sinergi Visual Lynk&quot; di bagian bawah bio
            </p>
          </div>
          <button
            type="button"
            onClick={() =>
              updateProfile({ showWatermark: !profile.showWatermark })
            }
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              profile.showWatermark
                ? "bg-emerald-500 text-zinc-950"
                : "bg-zinc-800 text-zinc-400"
            }`}
          >
            {profile.showWatermark ? "Aktif" : "Nonaktif"}
          </button>
        </div>
      </div>
    </div>
  );
}
