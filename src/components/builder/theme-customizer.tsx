"use client";

import React from "react";
import { useBuilderStore } from "@/stores/use-builder-store";
import { THEME_PRESETS } from "@/lib/constants";
import {
  ButtonStyleType,
  ButtonHoverEffectType,
  AvatarStyleType,
  SocialStyleType,
  CardFrameStyleType,
  FontFamilyType,
} from "@/types/builder";
import {
  Palette,
  Sparkles,
  Type,
  Sliders,
  Check,
  RotateCcw,
  Zap,
  User,
  Share2,
  Maximize2,
  Grid,
  Layers,
} from "lucide-react";

export function ThemeCustomizer() {
  const { theme, updateTheme, applyPreset } = useBuilderStore();

  const buttonStyleOptions: { id: ButtonStyleType; label: string; preview: string }[] = [
    { id: "rounded-xl", label: "Rounded XL", preview: "rounded-xl bg-emerald-500 text-black" },
    { id: "rounded-full", label: "Pill Full", preview: "rounded-full bg-emerald-500 text-black" },
    { id: "rounded-2xl", label: "Super Curved", preview: "rounded-2xl bg-emerald-500 text-black" },
    { id: "hard-shadow", label: "Neo Brutalism", preview: "rounded-xl bg-emerald-500 text-black border border-emerald-400 shadow-[3px_3px_0px_0px_#10b981]" },
    { id: "glass", label: "Glassmorphism", preview: "rounded-xl bg-white/10 backdrop-blur-md text-white border border-white/20" },
    { id: "outline", label: "Minimal Outline", preview: "rounded-xl bg-transparent border-2 border-emerald-500 text-emerald-400" },
  ];

  const hoverEffectOptions: { id: ButtonHoverEffectType; label: string; desc: string }[] = [
    { id: "glow", label: "Border Glow", desc: "Aura cahaya lembut sesuai warna aksen" },
    { id: "scale", label: "Scale Up", desc: "Membesar halus 102% saat kursor di atas tombol" },
    { id: "lift", label: "Shadow Lift", desc: "Terangkat ke atas dengan bayangan dalam" },
    { id: "subtle", label: "Subtle Clean", desc: "Transisi warna minimalis & transparan" },
  ];

  const avatarStyleOptions: { id: AvatarStyleType; label: string; desc: string }[] = [
    { id: "gradient-ring", label: "Gradient Ring Glow", desc: "Lingkaran bercahaya gradien studio" },
    { id: "glow-badge", label: "Verified Pulse Badge", desc: "Aksen centang biru/hijau menyala" },
    { id: "square-curved", label: "Modern Rounded Square", desc: "Sudut melengkung halus bergaya app icon" },
    { id: "minimal", label: "Minimal Border", desc: "Garis batas tipis dan elegan" },
  ];

  const socialStyleOptions: { id: SocialStyleType; label: string; desc: string }[] = [
    { id: "circle-buttons", label: "Circle Buttons", desc: "Tombol lingkaran translusen dengan hover glow" },
    { id: "pill-bar", label: "Floating Pill Bar", desc: "Bilah kapsul melayang dengan backdrop blur" },
    { id: "minimal-clean", label: "Minimal Icon Row", desc: "Ikon minimalis tanpa background tebal" },
  ];

  const cardFrameOptions: { id: CardFrameStyleType; label: string; desc: string }[] = [
    { id: "glass-card", label: "Glassmorphism Card", desc: "Frame kaca modern dengan border tipis & ambient shadow" },
    { id: "minimal-border", label: "Minimalist Border", desc: "Garis batas tipis clean tanpa efek blur tebal" },
    { id: "flat-borderless", label: "Seamless Borderless", desc: "Menyatu langsung dengan latar belakang penuh" },
  ];

  const fontOptions: { id: FontFamilyType; label: string; desc: string }[] = [
    { id: "jakarta", label: "Plus Jakarta Sans", desc: "Modern, bersih, dan elegan untuk studio" },
    { id: "inter", label: "Inter", desc: "Minimalis & standar tech global" },
    { id: "outfit", label: "Outfit", desc: "Geometris & berkarakter visual kuat" },
    { id: "space", label: "Space Grotesk", desc: "Nuansa tech, video audio & cyber" },
  ];

  return (
    <div className="space-y-8 pb-8 text-xs">
      {/* 1. THEME PRESETS */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Preset Tema Visual</h3>
          </div>
          <span className="text-slate-400 dark:text-zinc-500">Pilih 1-Klik</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {THEME_PRESETS.map((preset) => {
            const isSelected = theme.presetId === preset.presetId;
            return (
              <button
                key={preset.presetId}
                type="button"
                onClick={() => applyPreset(preset.presetId)}
                className={`group relative text-left p-3 rounded-2xl border transition-all duration-200 overflow-hidden cursor-pointer ${
                  isSelected
                    ? "border-emerald-500 ring-2 ring-emerald-500/30 shadow-lg shadow-emerald-500/10 bg-white dark:bg-zinc-900"
                    : "border-slate-200 dark:border-zinc-800 hover:border-slate-300 dark:hover:border-zinc-700 bg-white dark:bg-zinc-900/80"
                }`}
              >
                {/* Visual Swatch Preview Box */}
                <div
                  className="h-16 w-full rounded-xl mb-2.5 p-2 flex flex-col justify-between border border-white/10 relative overflow-hidden"
                  style={{
                    background: preset.bgGradient || preset.bgColor,
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className="w-3 h-3 rounded-full shadow-sm"
                      style={{ backgroundColor: preset.accentColor }}
                    />
                    {isSelected && (
                      <span className="p-0.5 rounded-full bg-emerald-500 text-zinc-950">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </span>
                    )}
                  </div>
                  <div
                    className="h-3.5 w-full rounded text-[9px] font-bold flex items-center justify-center shadow-sm"
                    style={{
                      backgroundColor: preset.buttonBg,
                      color: preset.buttonTextColor,
                    }}
                  >
                    Demo
                  </div>
                </div>

                <p className="text-xs font-bold text-slate-800 dark:text-zinc-200 truncate">
                  {preset.name}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. BACKGROUND STYLING & PATTERN */}
      <div className="space-y-4 pt-2 border-t border-slate-200 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Latar Belakang & Pola (Background)</h3>
        </div>

        {/* BG Type Tabs */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { id: "mesh", label: "Mesh Glow Ambient" },
            { id: "gradient", label: "Linear Gradient" },
            { id: "solid", label: "Solid Dark Color" },
          ].map((bg) => (
            <button
              key={bg.id}
              type="button"
              onClick={() => updateTheme({ bgType: bg.id as any })}
              className={`py-2 px-2.5 rounded-xl font-bold border transition text-center cursor-pointer ${
                theme.bgType === bg.id
                  ? "bg-emerald-50 text-emerald-700 border-emerald-300 dark:bg-emerald-950/80 dark:border-emerald-500 dark:text-emerald-400"
                  : "bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {bg.label}
            </button>
          ))}
        </div>

        {/* Pattern Overlay */}
        <div>
          <label className="block font-semibold text-slate-700 dark:text-zinc-300 mb-1.5">
            Pola Latar (Subtle Texture Pattern):
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: "none", label: "Tanpa Pola (Clean)" },
              { id: "grid", label: "Tech Grid Matrix" },
              { id: "dots", label: "Subtle Dot Matrix" },
            ].map((pat) => (
              <button
                key={pat.id}
                type="button"
                onClick={() => updateTheme({ bgPattern: pat.id as any })}
                className={`py-2 px-2 rounded-xl font-semibold border transition cursor-pointer ${
                  (theme.bgPattern || "none") === pat.id
                    ? "bg-slate-100 dark:bg-zinc-800 border-emerald-500 text-slate-900 dark:text-white font-bold"
                    : "bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 text-slate-500 dark:text-zinc-500 hover:text-slate-800 dark:hover:text-zinc-300"
                }`}
              >
                {pat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3. CARD FRAME CONTAINER STYLE (DESKTOP & MOBILE) */}
      <div className="space-y-4 pt-2 border-t border-slate-200 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <Maximize2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Frame Kontainer Halaman Publik</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {cardFrameOptions.map((cf) => (
            <button
              key={cf.id}
              type="button"
              onClick={() => updateTheme({ cardFrameStyle: cf.id })}
              className={`p-3 rounded-2xl border text-left transition flex flex-col justify-between gap-1.5 cursor-pointer ${
                (theme.cardFrameStyle || "glass-card") === cf.id
                  ? "bg-slate-100 dark:bg-zinc-800 border-emerald-500 text-slate-900 dark:text-white shadow-md shadow-emerald-500/10"
                  : "bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 dark:text-white">{cf.label}</span>
                {(theme.cardFrameStyle || "glass-card") === cf.id && (
                  <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                )}
              </div>
              <p className="text-[11px] text-slate-500 dark:text-zinc-500 leading-snug">{cf.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* 4. BUTTON STYLE & HOVER EFFECTS */}
      <div className="space-y-4 pt-2 border-t border-slate-200 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <Palette className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Bentuk & Animasi Tombol</h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {buttonStyleOptions.map((btn) => (
            <button
              key={btn.id}
              type="button"
              onClick={() => updateTheme({ buttonStyle: btn.id })}
              className={`p-3 rounded-2xl border text-left transition flex flex-col justify-between gap-2.5 cursor-pointer ${
                theme.buttonStyle === btn.id
                  ? "bg-slate-100 dark:bg-zinc-800 border-emerald-500 text-slate-900 dark:text-white"
                  : "bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <div className={`w-full py-1.5 px-2 text-[10px] text-center font-bold ${btn.preview}`}>
                Tombol Link
              </div>
              <span className="text-xs font-semibold">{btn.label}</span>
            </button>
          ))}
        </div>

        {/* Hover Animation Selector */}
        <div className="pt-2">
          <label className="block font-semibold text-slate-700 dark:text-zinc-300 mb-1.5">
            Efek Interaktif Saat Kursor Hover:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {hoverEffectOptions.map((h) => (
              <button
                key={h.id}
                type="button"
                onClick={() => updateTheme({ buttonHoverEffect: h.id })}
                className={`p-2.5 rounded-2xl border text-left transition cursor-pointer ${
                  (theme.buttonHoverEffect || "glow") === h.id
                    ? "bg-emerald-50 text-emerald-700 border-emerald-300 dark:bg-emerald-950/80 dark:border-emerald-500 dark:text-emerald-400"
                    : "bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200"
                }`}
              >
                <p className="font-bold">{h.label}</p>
                <p className="text-[10px] text-slate-400 dark:text-zinc-500 mt-0.5 line-clamp-1">{h.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 5. AVATAR & SOCIAL ICONS STYLING */}
      <div className="space-y-4 pt-2 border-t border-slate-200 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Gaya Avatar & Ikon Sosial</h3>
        </div>

        {/* Avatar Style */}
        <div>
          <label className="block font-semibold text-slate-700 dark:text-zinc-300 mb-1.5">
            Gaya Avatar Profil:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {avatarStyleOptions.map((av) => (
              <button
                key={av.id}
                type="button"
                onClick={() => updateTheme({ avatarStyle: av.id })}
                className={`p-2.5 rounded-2xl border text-left transition cursor-pointer ${
                  (theme.avatarStyle || "gradient-ring") === av.id
                    ? "bg-emerald-50 text-emerald-700 border-emerald-300 dark:bg-emerald-950/80 dark:border-emerald-500 dark:text-emerald-400"
                    : "bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200"
                }`}
              >
                <p className="font-bold">{av.label}</p>
                <p className="text-[10px] text-slate-400 dark:text-zinc-500 mt-0.5 line-clamp-1">{av.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Social Icons Style */}
        <div>
          <label className="block font-semibold text-slate-700 dark:text-zinc-300 mb-1.5">
            Gaya Ikon Media Sosial:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {socialStyleOptions.map((soc) => (
              <button
                key={soc.id}
                type="button"
                onClick={() => updateTheme({ socialStyle: soc.id })}
                className={`p-2.5 rounded-2xl border text-left transition cursor-pointer ${
                  (theme.socialStyle || "circle-buttons") === soc.id
                    ? "bg-emerald-50 text-emerald-700 border-emerald-300 dark:bg-emerald-950/80 dark:border-emerald-500 dark:text-emerald-400"
                    : "bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200"
                }`}
              >
                <p className="font-bold">{soc.label}</p>
                <p className="text-[10px] text-slate-400 dark:text-zinc-500 mt-0.5 line-clamp-1">{soc.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 6. COLOR PICKERS */}
      <div className="space-y-4 pt-2 border-t border-slate-200 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Kustom Warna Detail</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Button Background Color */}
          <div className="p-3.5 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-sm space-y-2">
            <label className="block font-semibold text-slate-700 dark:text-zinc-300">
              Warna Tombol (Button Color):
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={theme.buttonBg.startsWith("#") ? theme.buttonBg : "#10b981"}
                onChange={(e) => updateTheme({ buttonBg: e.target.value })}
                className="w-10 h-10 rounded-xl cursor-pointer bg-transparent border-0"
              />
              <input
                type="text"
                value={theme.buttonBg}
                onChange={(e) => updateTheme({ buttonBg: e.target.value })}
                className="flex-1 bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-700/80 rounded-xl px-3 py-1.5 text-slate-900 dark:text-white font-mono uppercase"
              />
            </div>
          </div>

          {/* Button Text Color */}
          <div className="p-3.5 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-sm space-y-2">
            <label className="block font-semibold text-slate-700 dark:text-zinc-300">
              Warna Teks Tombol:
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={theme.buttonTextColor.startsWith("#") ? theme.buttonTextColor : "#000000"}
                onChange={(e) => updateTheme({ buttonTextColor: e.target.value })}
                className="w-10 h-10 rounded-xl cursor-pointer bg-transparent border-0"
              />
              <input
                type="text"
                value={theme.buttonTextColor}
                onChange={(e) => updateTheme({ buttonTextColor: e.target.value })}
                className="flex-1 bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-700/80 rounded-xl px-3 py-1.5 text-slate-900 dark:text-white font-mono uppercase"
              />
            </div>
          </div>

          {/* Accent Color */}
          <div className="p-3.5 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-sm space-y-2">
            <label className="block font-semibold text-slate-700 dark:text-zinc-300">
              Warna Aksen Glow & Badge:
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={theme.accentColor.startsWith("#") ? theme.accentColor : "#10b981"}
                onChange={(e) => updateTheme({ accentColor: e.target.value })}
                className="w-10 h-10 rounded-xl cursor-pointer bg-transparent border-0"
              />
              <input
                type="text"
                value={theme.accentColor}
                onChange={(e) => updateTheme({ accentColor: e.target.value })}
                className="flex-1 bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-700/80 rounded-xl px-3 py-1.5 text-slate-900 dark:text-white font-mono uppercase"
              />
            </div>
          </div>

          {/* Base Background Color */}
          <div className="p-3.5 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-sm space-y-2">
            <label className="block font-semibold text-slate-700 dark:text-zinc-300">
              Warna Dasar Latar (Background Base):
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={theme.bgColor.startsWith("#") ? theme.bgColor : "#090d0b"}
                onChange={(e) =>
                  updateTheme({
                    bgColor: e.target.value,
                    bgGradient: `radial-gradient(ellipse at top, ${e.target.value} 0%, #050807 70%, #000000 100%)`,
                  })
                }
                className="w-10 h-10 rounded-xl cursor-pointer bg-transparent border-0"
              />
              <input
                type="text"
                value={theme.bgColor}
                onChange={(e) => updateTheme({ bgColor: e.target.value })}
                className="flex-1 bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-700/80 rounded-xl px-3 py-1.5 text-slate-900 dark:text-white font-mono uppercase"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 7. TYPOGRAPHY & FONT */}
      <div className="space-y-4 pt-2 border-t border-slate-200 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <Type className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Font & Tipografi</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {fontOptions.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => updateTheme({ fontFamily: f.id })}
              className={`p-3.5 rounded-2xl border text-left transition cursor-pointer ${
                theme.fontFamily === f.id
                  ? "bg-slate-100 dark:bg-zinc-800 border-emerald-500 text-slate-900 dark:text-white shadow-sm"
                  : "bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-900 dark:text-white">{f.label}</span>
                {theme.fontFamily === f.id && (
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                )}
              </div>
              <p className="text-[11px] text-slate-400 dark:text-zinc-500 mt-1">{f.desc}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
