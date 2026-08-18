"use client";

import React, { use } from "react";
import { useBuilderStore } from "@/stores/use-builder-store";
import { useStoreHydration } from "@/hooks/use-store-hydration";
import { PublicBioView } from "@/components/public/public-bio-view";
import { DEFAULT_BLOCKS, DEFAULT_PROFILE, THEME_PRESETS } from "@/lib/constants";
import { Sparkles, ArrowLeft, Share2, ExternalLink } from "lucide-react";

interface PublicPageProps {
  params: Promise<{
    username: string;
  }>;
}

export default function PublicBioPage({ params }: PublicPageProps) {
  const resolvedParams = use(params);
  const rawUsername = resolvedParams.username;
  const hydrated = useStoreHydration();

  const store = useBuilderStore();

  // If hydrated, use store values, otherwise fallback to defaults
  const profile = hydrated
    ? {
        ...store.profile,
        username: rawUsername || store.profile.username,
      }
    : DEFAULT_PROFILE;

  const theme = hydrated ? store.theme : THEME_PRESETS[0];
  const blocks = hydrated ? store.blocks : DEFAULT_BLOCKS;

  const getContainerFrameClass = () => {
    switch (theme.cardFrameStyle) {
      case "minimal-border":
        return "sm:border sm:border-white/15 sm:rounded-[32px] sm:shadow-2xl sm:bg-black/30";
      case "flat-borderless":
        return "border-0 shadow-none bg-transparent";
      case "glass-card":
      default:
        return "sm:border sm:border-white/10 sm:rounded-[36px] sm:backdrop-blur-2xl sm:shadow-[0_25px_80px_-15px_rgba(0,0,0,0.9),0_0_50px_rgba(16,185,129,0.08)] sm:bg-black/40";
    }
  };

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-start transition-colors duration-500 relative selection:bg-emerald-500 selection:text-zinc-950 overflow-x-hidden"
      style={{
        background: theme.bgGradient || theme.bgColor,
      }}
    >
      {/* Desktop Ambient Glow / Radial Blur Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 hidden sm:block">
        {/* Top-Left Ambient Orb */}
        <div
          className="absolute top-10 left-1/2 -translate-x-[380px] w-[500px] h-[500px] rounded-full blur-[140px] opacity-25 transition-all duration-700"
          style={{ backgroundColor: theme.accentColor }}
        />
        {/* Center-Right Ambient Orb */}
        <div
          className="absolute top-1/3 left-1/2 translate-x-[120px] w-[450px] h-[450px] rounded-full blur-[150px] opacity-20 transition-all duration-700"
          style={{
            backgroundColor:
              theme.buttonBg.startsWith("#") || theme.buttonBg.startsWith("rgb")
                ? theme.buttonBg
                : theme.accentColor,
          }}
        />
        {/* Bottom Ambient Glow */}
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[130px] opacity-15"
          style={{ backgroundColor: theme.accentColor }}
        />
      </div>

      {/* Floating Top Quick Bar (For Navigation & Status) */}
      <header className="relative z-20 w-full max-w-[480px] mx-auto px-4 pt-4 pb-2 flex items-center justify-between">
        <a
          href="/dashboard/builder"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/50 hover:bg-black/80 border border-white/10 text-xs font-bold text-white/80 hover:text-white transition backdrop-blur-md shadow-md hover:scale-105 active:scale-95"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Buka Builder</span>
        </a>

        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 border border-white/10 backdrop-blur-md text-[11px] font-semibold text-white/80">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Sinergi Visual Lynk</span>
        </div>
      </header>

      {/* Main Centered Bio Container (Max 480px width with Glassmorphism Card Frame on Desktop) */}
      <main className="relative z-10 w-full max-w-[480px] mx-auto px-2 sm:px-0 py-3 sm:py-6 flex-1 flex flex-col justify-start">
        <div
          className={`w-full overflow-hidden transition-all duration-300 ${getContainerFrameClass()}`}
        >
          <PublicBioView
            profile={profile}
            theme={theme}
            blocks={blocks}
            isPreview={false}
            onBlockClick={(id) => {
              if (hydrated) {
                store.incrementBlockClick(id);
              }
            }}
          />
        </div>
      </main>
    </div>
  );
}
