"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useBuilderStore } from "@/stores/use-builder-store";
import { DashboardChart } from "@/components/dashboard/dashboard-chart";
import { ShareModal } from "@/components/public/share-modal";
import {
  Sparkles,
  ExternalLink,
  Share2,
  Copy,
  Check,
  Eye,
  EyeOff,
  CreditCard,
  Plus,
  ArrowUpRight,
  TrendingUp,
  ShoppingBag,
  Layers,
  Users,
  DollarSign,
  Link2,
  FileText,
  PlayCircle,
  Video,
  ShieldCheck,
  Zap,
  PackageOpen,
} from "lucide-react";

export default function DashboardHomePage() {
  const { profile, blocks } = useBuilderStore();
  const [showEarnings, setShowEarnings] = useState(true);
  const [copied, setCopied] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);

  const bioUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/${profile.username}`
      : `https://lynk.sinergivisual.com/${profile.username}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(bioUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const activeBlocksCount = blocks.filter((b) => b.active).length;
  const totalClicks = blocks.reduce((sum, b) => sum + (b.clicks || 0), 0);

  const quickCreateItems = [
    {
      title: "Add Link",
      desc: "Tautkan portfolio eksternal",
      icon: Link2,
      href: "/dashboard/builder",
      color: "bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-950/40 dark:border-emerald-500/30 dark:text-emerald-400",
    },
    {
      title: "Digital Product",
      desc: "Upload LUTs, SFX, MOGRT",
      icon: Sparkles,
      href: "/dashboard/builder",
      color: "bg-indigo-50 text-indigo-600 border-indigo-200 dark:bg-indigo-950/40 dark:border-indigo-500/30 dark:text-indigo-400",
    },
    {
      title: "Course Video",
      desc: "Showreel & Tutorial",
      icon: PlayCircle,
      href: "/dashboard/builder",
      color: "bg-rose-50 text-rose-600 border-rose-200 dark:bg-rose-950/40 dark:border-rose-500/30 dark:text-rose-400",
    },
    {
      title: "Blog Content",
      desc: "Artikel & Studi Kasus",
      icon: FileText,
      href: "/dashboard/builder",
      color: "bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-950/40 dark:border-amber-500/30 dark:text-amber-400",
    },
    {
      title: "Media Kit",
      desc: "Rate Card & Portfolio",
      icon: Video,
      href: "/dashboard/builder",
      color: "bg-cyan-50 text-cyan-600 border-cyan-200 dark:bg-cyan-950/40 dark:border-cyan-500/30 dark:text-cyan-400",
    },
  ];

  // Clean empty state for fresh production install
  const recentOrders: any[] = [];

  return (
    <div className="space-y-8">
      {/* 1. HEADER AKUN & EARNINGS ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left: Profil Card (7 Cols) */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-white dark:bg-zinc-900/90 border border-slate-200 dark:border-zinc-800 flex flex-col justify-between relative overflow-hidden shadow-sm transition-colors duration-200">
          {/* Background Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-3xl rounded-full pointer-events-none" />

          <div>
            <div className="flex items-start justify-between gap-4">
              {/* Profile Avatar & Info */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-emerald-500/40 bg-slate-100 dark:bg-zinc-950 shadow-md">
                    <img
                      src={profile.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200"}
                      alt={profile.displayName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="absolute -bottom-1 -right-1 p-0.5 rounded-full bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800">
                    <ShieldCheck className="w-4 h-4 text-emerald-500 dark:text-emerald-400 fill-emerald-100 dark:fill-emerald-950" />
                  </span>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">
                      {profile.displayName}
                    </h2>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 text-[10px] font-extrabold uppercase border border-emerald-300 dark:border-emerald-500/30">
                      PRO Active
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
                    @{profile.username} • {profile.location || "Jakarta, Indonesia"}
                  </p>
                </div>
              </div>

              {/* Share Button */}
              <button
                onClick={() => setIsShareOpen(true)}
                className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-zinc-950 dark:hover:bg-zinc-800 border border-slate-200 dark:border-zinc-800 text-slate-700 hover:text-slate-900 dark:text-zinc-300 dark:hover:text-white transition shadow-sm cursor-pointer"
                title="Bagikan Halaman Bio"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>

            {/* Bio Link Bar */}
            <div className="mt-5 p-3 rounded-2xl bg-slate-50 dark:bg-zinc-950/80 border border-slate-200 dark:border-zinc-800/80 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-slate-400 dark:text-zinc-500 text-xs font-mono">Link Bio:</span>
                <a
                  href={`/${profile.username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline truncate"
                >
                  {bioUrl}
                </a>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={handleCopy}
                  className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 dark:bg-zinc-900 dark:hover:bg-zinc-800 border border-slate-200 dark:border-transparent text-slate-700 dark:text-zinc-300 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span className="text-emerald-600 dark:text-emerald-400">Tersalin</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Salin</span>
                    </>
                  )}
                </button>

                <a
                  href={`/${profile.username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-xl bg-emerald-500 text-zinc-950 hover:bg-emerald-400 transition"
                  title="Lihat Bio"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100 dark:border-zinc-800/80 flex items-center justify-between text-xs text-slate-500 dark:text-zinc-400">
            <span>Paket: <strong className="text-slate-900 dark:text-white">PRO Creator Studio</strong></span>
            <Link
              href="/dashboard/builder"
              className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 font-bold flex items-center gap-1 transition"
            >
              <span>Buka Builder Workspace</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Right: Earnings Card (5 Cols) */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-white dark:bg-gradient-to-br dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-950 border border-slate-200 dark:border-zinc-800 flex flex-col justify-between relative shadow-sm transition-colors duration-200">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-500/30 text-emerald-600 dark:text-emerald-400">
                  <DollarSign className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-slate-600 dark:text-zinc-400">
                  Total Pendapatan (IDR)
                </span>
              </div>

              {/* Eye toggle sensor */}
              <button
                onClick={() => setShowEarnings(!showEarnings)}
                className="p-1.5 rounded-lg bg-slate-100 dark:bg-zinc-800/80 text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white transition cursor-pointer"
                title={showEarnings ? "Sembunyikan Saldo" : "Tampilkan Saldo"}
              >
                {showEarnings ? (
                  <Eye className="w-4 h-4" />
                ) : (
                  <EyeOff className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Big Balance Amount */}
            <div className="mt-4">
              <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                {showEarnings ? "Rp 0" : "••••••••••••"}
              </span>
              <div className="flex items-center gap-1.5 mt-1 text-xs text-slate-500 dark:text-zinc-500 font-semibold">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
                <span>Siap menerima transaksi penjualan aset</span>
              </div>
            </div>
          </div>

          {/* Bottom Actions: Atur Rekening & PayMe Link */}
          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-zinc-800/80 grid grid-cols-2 gap-3">
            <Link
              href="/dashboard/settings"
              className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-zinc-950 dark:hover:bg-zinc-800 border border-slate-200 dark:border-zinc-800 text-xs font-bold text-slate-700 hover:text-slate-900 dark:text-zinc-300 dark:hover:text-white flex items-center justify-center gap-2 transition"
            >
              <CreditCard className="w-3.5 h-3.5 text-slate-500 dark:text-zinc-400" />
              <span>Atur Payout</span>
            </Link>

            <button
              onClick={() => {
                navigator.clipboard.writeText(`https://pay.lynk.id/${profile.username}`);
                alert(`PayMe link disalin: https://pay.lynk.id/${profile.username}`);
              }}
              className="py-2.5 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>Salin PayMe</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. 4 METRIK RINGKASAN CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="p-5 rounded-3xl bg-white dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-800 hover:border-slate-300 dark:hover:border-zinc-700 shadow-sm transition">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-500 dark:text-zinc-400 font-semibold">Lifetime Sales</span>
            <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <span className="text-xl font-black text-slate-900 dark:text-white">Rp 0</span>
          <p className="text-[11px] text-slate-400 dark:text-zinc-500 mt-1 font-semibold">0 Total transaksi</p>
        </div>

        {/* Metric 2 */}
        <div className="p-5 rounded-3xl bg-white dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-800 hover:border-slate-300 dark:hover:border-zinc-700 shadow-sm transition">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-500 dark:text-zinc-400 font-semibold">My Blocks Aktif</span>
            <div className="p-2 rounded-xl bg-indigo-100 dark:bg-indigo-950/60 border border-indigo-300 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <span className="text-xl font-black text-slate-900 dark:text-white">{activeBlocksCount} Blok</span>
          <p className="text-[11px] text-slate-400 dark:text-zinc-500 mt-1 font-semibold">{blocks.length} Total dibuat</p>
        </div>

        {/* Metric 3 */}
        <div className="p-5 rounded-3xl bg-white dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-800 hover:border-slate-300 dark:hover:border-zinc-700 shadow-sm transition">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-500 dark:text-zinc-400 font-semibold">Total Clicks</span>
            <div className="p-2 rounded-xl bg-purple-100 dark:bg-purple-950/60 border border-purple-300 dark:border-purple-500/20 text-purple-600 dark:text-purple-400">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <span className="text-xl font-black text-slate-900 dark:text-white">{totalClicks}</span>
          <p className="text-[11px] text-purple-600 dark:text-purple-400 mt-1 font-semibold">Klik tautan link</p>
        </div>

        {/* Metric 4 */}
        <div className="p-5 rounded-3xl bg-white dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-800 hover:border-slate-300 dark:hover:border-zinc-700 shadow-sm transition">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-500 dark:text-zinc-400 font-semibold">Lifetime Orders</span>
            <div className="p-2 rounded-xl bg-rose-100 dark:bg-rose-950/60 border border-rose-300 dark:border-rose-500/20 text-rose-600 dark:text-rose-400">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <span className="text-xl font-black text-slate-900 dark:text-white">0 Pesanan</span>
          <p className="text-[11px] text-slate-400 dark:text-zinc-500 mt-1 font-semibold">0 Klaim aset</p>
        </div>
      </div>

      {/* 3. QUICK CREATE BAR */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Quick Create Bar</h3>
          </div>
          <span className="text-xs text-slate-400 dark:text-zinc-500">Pintas Cepat Tambah Konten</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {quickCreateItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.title}
                href={item.href}
                className="p-4 rounded-3xl bg-white dark:bg-zinc-900/80 hover:bg-slate-50 dark:hover:bg-zinc-800/90 border border-slate-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition group flex flex-col justify-between space-y-3"
              >
                <div
                  className={`w-10 h-10 rounded-2xl border flex items-center justify-center ${item.color} group-hover:scale-110 transition`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-zinc-400 mt-0.5 line-clamp-1">
                    {item.desc}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* 4. INTERACTIVE VIEWS & CLICKS CHART */}
      <DashboardChart />

      {/* 5. RECENT ORDERS TABLE (WITH CLEAN EMPTY STATE) */}
      <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900/90 border border-slate-200 dark:border-zinc-800 shadow-sm space-y-4 transition-colors duration-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Aktivitas Pesanan & Download Terbaru
            </h3>
            <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
              Daftar transaksi dan klaim aset video editing dari halaman bio Anda
            </p>
          </div>

          <Link
            href="/dashboard/orders"
            className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 flex items-center gap-1 transition"
          >
            <span>Lihat Semua Pesanan</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Empty State */}
        {recentOrders.length === 0 ? (
          <div className="text-center py-12 px-4 rounded-2xl bg-slate-50 dark:bg-zinc-950/60 border border-dashed border-slate-200 dark:border-zinc-800/80 space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 flex items-center justify-center mx-auto text-slate-400 dark:text-zinc-500">
              <PackageOpen className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Belum Ada Pesanan Masuk</h4>
              <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1 max-w-sm mx-auto">
                Setelah membagikan link bio Anda, setiap transaksi produk digital dan unduhan aset akan tercatat di sini secara otomatis.
              </p>
            </div>
            <Link
              href="/dashboard/builder"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-xs font-bold transition"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Produk ke Bio</span>
            </Link>
          </div>
        ) : null}
      </div>

      {/* Share Modal */}
      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        username={profile.username}
        displayName={profile.displayName}
      />
    </div>
  );
}
