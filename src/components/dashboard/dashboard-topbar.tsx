"use client";

import React, { useState } from "react";
import { useBuilderStore } from "@/stores/use-builder-store";
import { ShareModal } from "@/components/public/share-modal";
import {
  ExternalLink,
  Share2,
  Bell,
  Sparkles,
  Copy,
  Check,
  Zap,
  Plus,
} from "lucide-react";
import Link from "next/link";

export function DashboardTopbar() {
  const { profile } = useBuilderStore();
  const [copied, setCopied] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const bioUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/${profile.username}`
      : `https://lynk.sinergivisual.com/${profile.username}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(bioUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const notifications = [
    {
      id: 1,
      title: "Download Aset Baru",
      desc: "5 User baru mengunduh Cinematic Film LUTs Pack (Vol. 1)",
      time: "10 menit lalu",
    },
    {
      id: 2,
      title: "Trafik Meningkat",
      desc: "Trafik bio page Anda naik 34% dari sumber Instagram",
      time: "1 jam lalu",
    },
    {
      id: 3,
      title: "Pesanan Sukses",
      desc: "Transaksi Rp 249.000 untuk Essential Video SFX berhasil",
      time: "3 jam lalu",
    },
  ];

  return (
    <>
      <header className="sticky top-0 z-20 w-full bg-zinc-950/80 backdrop-blur-md border-b border-zinc-900 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Left: Bio Link bar with 1-click copy */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-900/90 border border-zinc-800 text-xs">
            <span className="text-zinc-500 font-mono">Bio Link:</span>
            <span className="font-mono font-bold text-emerald-400 truncate max-w-[200px]">
              /{profile.username}
            </span>
            <button
              onClick={handleCopy}
              className="p-1 hover:text-white text-zinc-400 transition"
              title="Salin URL"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          </div>

          <a
            href={`/${profile.username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-semibold text-zinc-300 hover:text-white transition"
          >
            <span>Buka Bio</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Right Actions: Create button, Share, Notification, Pro Status */}
        <div className="flex items-center gap-2.5">
          {/* Quick Create Link to Builder */}
          <Link
            href="/dashboard/builder"
            className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs shadow-md shadow-emerald-500/20 transition cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Tambah Konten</span>
          </Link>

          {/* Share Modal Trigger */}
          <button
            onClick={() => setIsShareOpen(true)}
            className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white transition"
            title="Bagikan Profil & QR Code"
          >
            <Share2 className="w-4 h-4" />
          </button>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              className="relative p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white transition"
              title="Notifikasi"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-zinc-950" />
            </button>

            {isNotificationOpen && (
              <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-2xl p-3 z-50 text-xs animate-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-zinc-800">
                  <span className="font-bold text-white">Notifikasi Aktivitas</span>
                  <span className="text-[10px] text-emerald-400 font-semibold cursor-pointer">
                    Tandai dibaca
                  </span>
                </div>
                <div className="space-y-2">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className="p-2.5 rounded-xl bg-zinc-950/80 hover:bg-zinc-800 border border-zinc-800/60 transition"
                    >
                      <p className="font-bold text-white">{n.title}</p>
                      <p className="text-[11px] text-zinc-400 mt-0.5">{n.desc}</p>
                      <span className="text-[10px] text-zinc-500 mt-1 block">
                        {n.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* PRO Badge */}
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 text-xs font-bold text-emerald-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>PRO Studio</span>
          </div>
        </div>
      </header>

      {/* Share Modal */}
      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        username={profile.username}
        displayName={profile.displayName}
      />
    </>
  );
}
