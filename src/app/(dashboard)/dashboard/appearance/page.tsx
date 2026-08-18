"use client";

import React from "react";
import { ThemeCustomizer } from "@/components/builder/theme-customizer";
import { MobilePreview } from "@/components/builder/mobile-preview";
import { Palette, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AppearancePage() {
  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-emerald-950/80 border border-emerald-500/30 text-emerald-400">
            <Palette className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-black text-white">Appearance & Kustomisasi Tema</h1>
            <p className="text-xs text-zinc-400 mt-0.5">
              Atur gaya visual profil, tema warna, bentuk tombol, dan tipografi bio Anda
            </p>
          </div>
        </div>

        <Link
          href="/dashboard/builder"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-200 hover:text-white text-xs font-bold transition self-start sm:self-auto"
        >
          <span>Kelola Blok (Builder)</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Split Grid: Left Customizer, Right Sticky Mobile Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 bg-zinc-900/90 border border-zinc-800 p-6 rounded-3xl">
          <ThemeCustomizer />
        </div>

        <div className="lg:col-span-5 lg:sticky lg:top-20 z-10 flex justify-center">
          <MobilePreview />
        </div>
      </div>
    </div>
  );
}
