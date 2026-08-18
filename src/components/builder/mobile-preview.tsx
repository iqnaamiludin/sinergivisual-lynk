"use client";

import React, { useState, useEffect } from "react";
import { useBuilderStore } from "@/stores/use-builder-store";
import { PublicBioView } from "@/components/public/public-bio-view";
import {
  Smartphone,
  Maximize2,
  ExternalLink,
  Wifi,
  Battery,
  Signal,
  RotateCcw,
  Sparkles,
} from "lucide-react";

export function MobilePreview() {
  const { profile, theme, blocks, previewDevice, setPreviewDevice, incrementBlockClick } =
    useBuilderStore();

  const [currentTime, setCurrentTime] = useState("09:41");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      setCurrentTime(`${hours}:${minutes}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-start h-full py-4 space-y-4">
      {/* Top Preview Controls Bar */}
      <div className="w-full max-w-sm flex items-center justify-between px-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-bold text-zinc-300">Live Preview</span>
        </div>

        {/* View mode toggle */}
        <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 p-1 rounded-xl">
          <button
            onClick={() => setPreviewDevice("mobile")}
            className={`px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1 transition ${
              previewDevice === "mobile"
                ? "bg-zinc-800 text-emerald-400 shadow-sm"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
            title="Tampilan Smartphone"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Mobile</span>
          </button>
          <button
            onClick={() => setPreviewDevice("desktop")}
            className={`px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1 transition ${
              previewDevice === "desktop"
                ? "bg-zinc-800 text-emerald-400 shadow-sm"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
            title="Tampilan Kartu Desktop"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>Desktop</span>
          </button>
        </div>

        {/* External Link button */}
        <a
          href={`/${profile.username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white transition"
          title="Buka di Tab Baru"
        >
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Frame Container */}
      {previewDevice === "mobile" ? (
        /* Realistic iPhone Frame */
        <div className="relative w-[340px] h-[680px] bg-black rounded-[48px] p-3 ring-1 ring-white/10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_40px_rgba(16,185,129,0.1)] border-[4px] border-zinc-800 flex flex-col justify-between select-none">
          {/* Outer Volume Buttons & Power Button Accents */}
          <div className="absolute -left-[7px] top-28 w-[3px] h-9 bg-zinc-700 rounded-l-md" />
          <div className="absolute -left-[7px] top-40 w-[3px] h-12 bg-zinc-700 rounded-l-md" />
          <div className="absolute -left-[7px] top-56 w-[3px] h-12 bg-zinc-700 rounded-l-md" />
          <div className="absolute -right-[7px] top-36 w-[3px] h-16 bg-zinc-700 rounded-r-md" />

          {/* Screen Container */}
          <div className="relative w-full h-full bg-zinc-950 rounded-[38px] overflow-hidden flex flex-col justify-between border border-zinc-800/80">
            {/* Top iOS Status Bar & Dynamic Island */}
            <div className="sticky top-0 z-30 w-full pt-3 px-6 pb-2 flex items-center justify-between text-white text-[11px] font-semibold tracking-tight bg-gradient-to-b from-black/70 to-transparent backdrop-blur-[2px]">
              <span className="font-mono text-xs">{currentTime}</span>

              {/* Dynamic Island */}
              <div className="w-24 h-5 bg-black rounded-full border border-white/10 flex items-center justify-center gap-2 px-2 shadow-inner">
                <span className="w-2 h-2 rounded-full bg-emerald-500/80" />
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500/80" />
              </div>

              <div className="flex items-center gap-1.5 text-zinc-300">
                <Signal className="w-3 h-3" />
                <Wifi className="w-3 h-3" />
                <Battery className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Scrollable Bio Screen Area */}
            <div className="flex-1 overflow-y-auto scrollbar-none custom-scrollbar">
              <PublicBioView
                profile={profile}
                theme={theme}
                blocks={blocks}
                isPreview={true}
                onBlockClick={(id) => incrementBlockClick(id)}
              />
            </div>

            {/* Bottom iOS Home Indicator Bar */}
            <div className="w-full pb-2 pt-1 flex justify-center bg-transparent pointer-events-none">
              <div className="w-32 h-1 bg-white/40 rounded-full" />
            </div>
          </div>
        </div>
      ) : (
        /* Desktop / Card View Mode */
        <div className="w-full max-w-md h-[680px] rounded-2xl bg-zinc-950 border border-zinc-800 shadow-2xl overflow-hidden flex flex-col">
          <div className="p-3 border-b border-zinc-800 bg-zinc-900/80 flex items-center justify-between text-xs text-zinc-400">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              </div>
              <span className="font-mono text-[11px] text-zinc-300">
                sinergivisual.lynk/{profile.username}
              </span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            <PublicBioView
              profile={profile}
              theme={theme}
              blocks={blocks}
              isPreview={true}
              onBlockClick={(id) => incrementBlockClick(id)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
