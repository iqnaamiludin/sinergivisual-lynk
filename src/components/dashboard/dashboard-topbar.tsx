"use client";

import React, { useState } from "react";
import { useBuilderStore } from "@/stores/use-builder-store";
import { ShareModal } from "@/components/public/share-modal";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  ExternalLink,
  Share2,
  Bell,
  Sparkles,
  Copy,
  Check,
  Zap,
  Plus,
  LogOut,
} from "lucide-react";
import Link from "next/link";

export function DashboardTopbar() {
  const { profile } = useBuilderStore();
  const [copied, setCopied] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const fullBioUrl = `https://lynk.id/${profile.username}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullBioUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const notifications = [
    {
      id: 1,
      title: "Sistem Terverifikasi",
      desc: "Akun Sinergi Visual Anda telah aktif dengan akses PRO Studio.",
      time: "Baru saja",
    },
    {
      id: 2,
      title: "Optimasi Bio Link",
      desc: "Tambahkan minimal 3 produk/link untuk konversi maksimal.",
      time: "2 jam lalu",
    },
  ];

  return (
    <>
      <header className="sticky top-0 z-20 w-full bg-white/90 dark:bg-zinc-950/80 backdrop-blur-md border-b border-slate-200 dark:border-zinc-900 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4 transition-colors duration-200">
        {/* Left: Bio Link bar with 1-click copy */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-zinc-900/90 border border-slate-200 dark:border-zinc-800 text-xs">
            <span className="text-slate-500 dark:text-zinc-500 font-mono">Bio Link:</span>
            <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 truncate max-w-[200px]">
              /{profile.username}
            </span>
            <button
              onClick={handleCopy}
              className="p-1 text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white transition cursor-pointer"
              title="Salin URL"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          </div>

          <a
            href={`/${profile.username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 border border-slate-200 dark:border-zinc-800 text-xs font-semibold text-slate-700 hover:text-slate-900 dark:text-zinc-300 dark:hover:text-white transition"
          >
            <span>Buka Bio</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Right Actions: Create button, Share, Notification, Pro Status, ThemeToggle */}
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
            onClick={() => setIsShareModalOpen(true)}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 border border-slate-200 dark:border-zinc-800 text-slate-700 hover:text-slate-900 dark:text-zinc-300 dark:hover:text-white transition cursor-pointer"
            title="Bagikan QR & Link Bio"
          >
            <Share2 className="w-4 h-4" />
          </button>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              className="relative p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 border border-slate-200 dark:border-zinc-800 text-slate-700 hover:text-slate-900 dark:text-zinc-300 dark:hover:text-white transition cursor-pointer"
              title="Notifikasi"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-zinc-950" />
            </button>

            {isNotificationOpen && (
              <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-2xl p-3 z-50 text-xs animate-in zoom-in-95 duration-150 text-slate-900 dark:text-white">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 dark:border-zinc-800">
                  <span className="font-bold">Notifikasi Aktivitas</span>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold cursor-pointer">
                    Tandai dibaca
                  </span>
                </div>
                <div className="space-y-2">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className="p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-950/80 hover:bg-slate-100 dark:hover:bg-zinc-800 border border-slate-200 dark:border-zinc-800/60 transition"
                    >
                      <p className="font-bold text-slate-900 dark:text-white">{n.title}</p>
                      <p className="text-[11px] text-slate-500 dark:text-zinc-400 mt-0.5">{n.desc}</p>
                      <span className="text-[10px] text-slate-400 dark:text-zinc-500 mt-1 block">
                        {n.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* PRO Badge */}
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-gradient-to-r dark:from-emerald-500/10 dark:to-teal-500/10 border border-emerald-300 dark:border-emerald-500/30 text-xs font-bold text-emerald-700 dark:text-emerald-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>PRO Studio</span>
          </div>

          {/* Theme Toggle (Dark/Light Switcher) */}
          <ThemeToggle />

          {/* Logout Button */}
          <button
            onClick={() => {
              if (confirm("Keluar dari dashboard Sinergi Visual Lynk?")) {
                document.cookie = "sv_auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;";
                window.location.href = "/login";
              }
            }}
            className="p-2 rounded-xl bg-slate-100 hover:bg-rose-50 dark:bg-zinc-900 dark:hover:bg-rose-950/40 border border-slate-200 hover:border-rose-300 dark:border-zinc-800 dark:hover:border-rose-500/30 text-slate-600 hover:text-rose-600 dark:text-zinc-400 dark:hover:text-rose-400 transition cursor-pointer"
            title="Keluar Akun (Logout)"
          >
            <LogOut className="w-4 h-4" />
          </button>
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
