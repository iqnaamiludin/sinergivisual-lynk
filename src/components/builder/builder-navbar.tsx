"use client";

import React, { useState } from "react";
import { useBuilderStore } from "@/stores/use-builder-store";
import { ShareModal } from "@/components/public/share-modal";
import { BrandLogo } from "@/components/brand-logo";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Sparkles,
  ExternalLink,
  Share2,
  RotateCcw,
  Layers,
  Palette,
  User,
  CheckCircle2,
} from "lucide-react";

export function BuilderNavbar() {
  const { profile, activeTab, setActiveTab, resetToDefault, blocks } =
    useBuilderStore();
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const totalClicks = blocks.reduce((sum, b) => sum + (b.clicks || 0), 0);
  const activeCount = blocks.filter((b) => b.active).length;

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-zinc-800 bg-zinc-950/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Left Brand & Logo */}
          <div className="flex items-center gap-3">
            <a href="/" className="flex items-center gap-2.5 group">
              <BrandLogo
                className="h-8 w-auto object-contain group-hover:scale-105 transition duration-200"
                priority
              />
            </a>
          </div>

          {/* Center Tabs: Blok, Tema, Profil */}
          <nav className="flex items-center p-1 rounded-xl bg-zinc-900 border border-zinc-800">
            <button
              onClick={() => setActiveTab("blocks")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
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
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
                activeTab === "theme"
                  ? "bg-emerald-500 text-zinc-950 shadow-sm"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              <span>Tema & Gaya</span>
            </button>
            <button
              onClick={() => setActiveTab("profile")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
                activeTab === "profile"
                  ? "bg-emerald-500 text-zinc-950 shadow-sm"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Profil Studio</span>
            </button>
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center gap-2.5">
            {/* Auto-saved badge */}
            <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/20 text-[11px] text-emerald-400 font-medium">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              <span>Auto-saved</span>
            </div>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Reset Defaults button */}
            <button
              onClick={() => {
                if (confirm("Reset seluruh data ke preset bawaan Sinergi Visual?")) {
                  resetToDefault();
                }
              }}
              className="hidden sm:inline-flex p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white transition cursor-pointer"
              title="Reset ke Default"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Share Modal button */}
            <button
              onClick={() => setIsShareModalOpen(true)}
              className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white transition cursor-pointer"
              title="Bagikan Link / QR Code"
            >
              <Share2 className="w-4 h-4" />
            </button>

            {/* Live Bio Link button */}
            <a
              href={`/${profile.username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs shadow-md shadow-emerald-500/20 transition cursor-pointer"
            >
              <span>Lihat Bio Publik</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </header>

      {/* Share Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        username={profile.username}
        displayName={profile.displayName}
      />
    </>
  );
}
