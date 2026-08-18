"use client";

import React from "react";
import { useBuilderStore } from "@/stores/use-builder-store";
import { BlockList } from "@/components/builder/block-list";
import { ThemeCustomizer } from "@/components/builder/theme-customizer";
import { ProfileEditor } from "@/components/builder/profile-editor";
import { MobilePreview } from "@/components/builder/mobile-preview";
import { Layers, Palette, User, Sparkles, ExternalLink, RotateCcw } from "lucide-react";

export default function BuilderPage() {
  const { activeTab, setActiveTab, profile, blocks, resetToDefault } =
    useBuilderStore();

  const activeCount = blocks.filter((b) => b.active).length;

  return (
    <div className="space-y-6 pb-12">
      {/* Sub-header & Tab Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-base sm:text-lg font-black text-white">
              My Lynk (Builder Workspace)
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
              Drag & Drop
            </span>
          </div>
          <p className="text-xs text-zinc-400 mt-0.5">
            Susun portofolio video, showreel, dan aset digital gratis secara visual
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-zinc-950 border border-zinc-800 self-start sm:self-auto">
          <button
            onClick={() => setActiveTab("blocks")}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              activeTab === "blocks"
                ? "bg-emerald-500 text-zinc-950 shadow-sm"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Blok ({activeCount})</span>
          </button>
          <button
            onClick={() => setActiveTab("theme")}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              activeTab === "theme"
                ? "bg-emerald-500 text-zinc-950 shadow-sm"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>Tema</span>
          </button>
          <button
            onClick={() => setActiveTab("profile")}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              activeTab === "profile"
                ? "bg-emerald-500 text-zinc-950 shadow-sm"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Profil Bio</span>
          </button>
        </div>
      </div>

      {/* Main Split-Pane Workspace (2 Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* SISI KIRI (Builder Controls - 7 Cols on desktop) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="min-h-[500px]">
            {activeTab === "blocks" && <BlockList />}
            {activeTab === "theme" && <ThemeCustomizer />}
            {activeTab === "profile" && <ProfileEditor />}
          </div>
        </div>

        {/* SISI KANAN (Real-Time Mobile Mockup Preview - 5 Cols on desktop, Sticky) */}
        <div className="lg:col-span-5 lg:sticky lg:top-20 z-10 flex justify-center">
          <MobilePreview />
        </div>
      </div>
    </div>
  );
}
