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

  const quickCreateItems = [
    {
      title: "Add Link",
      desc: "Tautkan portfolio eksternal",
      icon: Link2,
      href: "/dashboard/builder",
      color: "from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-400",
    },
    {
      title: "Digital Product",
      desc: "Upload LUTs, SFX, MOGRT",
      icon: Sparkles,
      href: "/dashboard/builder",
      color: "from-indigo-500/20 to-purple-500/10 border-indigo-500/30 text-indigo-400",
    },
    {
      title: "Course Video",
      desc: "Showreel & Tutorial",
      icon: PlayCircle,
      href: "/dashboard/builder",
      color: "from-rose-500/20 to-orange-500/10 border-rose-500/30 text-rose-400",
    },
    {
      title: "Blog Content",
      desc: "Artikel & Studi Kasus",
      icon: FileText,
      href: "/dashboard/builder",
      color: "from-amber-500/20 to-yellow-500/10 border-amber-500/30 text-amber-400",
    },
    {
      title: "Media Kit",
      desc: "Rate Card & Portfolio",
      icon: Video,
      href: "/dashboard/builder",
      color: "from-cyan-500/20 to-blue-500/10 border-cyan-500/30 text-cyan-400",
    },
  ];

  const recentOrders = [
    {
      id: "ORD-8942",
      buyer: "Rian Pratama",
      email: "rian.visual@gmail.com",
      product: "Cinematic Film LUTs Pack (Vol. 1)",
      price: "FREE",
      date: "18 Ags 2026, 13:20",
      status: "Success",
    },
    {
      id: "ORD-8941",
      buyer: "Studio Karya Visual",
      email: "production@karyavisual.id",
      product: "Essential Video Sound FX Master Pack",
      price: "FREE",
      date: "18 Ags 2026, 12:45",
      status: "Success",
    },
    {
      id: "ORD-8940",
      buyer: "Dimas Anggara",
      email: "dimas.motion@yahoo.com",
      product: "Premiere Pro Minimal Lower Thirds",
      price: "FREE",
      date: "18 Ags 2026, 11:15",
      status: "Success",
    },
    {
      id: "ORD-8939",
      buyer: "Nadia Creative",
      email: "nadia@agency.com",
      product: "Commercial Video Preset Pack",
      price: "Rp 149.000",
      date: "18 Ags 2026, 09:30",
      status: "Success",
    },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* 1. HEADER AKUN & EARNINGS ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left: Profil Card (7 Cols) */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-zinc-900/90 border border-zinc-800 flex flex-col justify-between relative overflow-hidden shadow-xl">
          {/* Background Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-3xl rounded-full pointer-events-none" />

          <div>
            <div className="flex items-start justify-between gap-4">
              {/* Profile Avatar & Info */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-emerald-500/40 bg-zinc-950 shadow-md">
                    <img
                      src={profile.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200"}
                      alt={profile.displayName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="absolute -bottom-1 -right-1 p-0.5 rounded-full bg-zinc-950 border border-zinc-800">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 fill-emerald-950" />
                  </span>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-black text-white tracking-tight">
                      {profile.displayName}
                    </h2>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 text-[10px] font-extrabold uppercase border border-emerald-500/30">
                      PRO Active
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    @{profile.username} • {profile.location || "Jakarta, Indonesia"}
                  </p>
                </div>
              </div>

              {/* Share Button */}
              <button
                onClick={() => setIsShareOpen(true)}
                className="p-2.5 rounded-xl bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white transition shadow-sm"
                title="Bagikan Halaman Bio"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>

            {/* Bio Link Bar */}
            <div className="mt-5 p-3 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-zinc-500 text-xs font-mono">Link Bio:</span>
                <a
                  href={`/${profile.username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs font-bold text-emerald-400 hover:underline truncate"
                >
                  {bioUrl}
                </a>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={handleCopy}
                  className="px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-semibold flex items-center gap-1.5 transition"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Tersalin</span>
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

          <div className="mt-5 pt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-400">
            <span>Paket: <strong className="text-white">PRO Creator Unlimited</strong></span>
            <Link
              href="/dashboard/builder"
              className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1 transition"
            >
              <span>Buka Builder Workspace</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Right: Earnings Card (5 Cols) */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-950 border border-zinc-800 flex flex-col justify-between relative shadow-xl">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-emerald-950/80 border border-emerald-500/30 text-emerald-400">
                  <DollarSign className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-zinc-400">
                  Total Pendapatan (IDR)
                </span>
              </div>

              {/* Eye toggle sensor */}
              <button
                onClick={() => setShowEarnings(!showEarnings)}
                className="p-1.5 rounded-lg bg-zinc-800/80 text-zinc-400 hover:text-white transition"
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
              <span className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {showEarnings ? "Rp 14.850.000" : "••••••••••••"}
              </span>
              <div className="flex items-center gap-1.5 mt-1 text-xs text-emerald-400 font-semibold">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+22.5% dari bulan sebelumnya</span>
              </div>
            </div>
          </div>

          {/* Bottom Actions: Atur Rekening & PayMe Link */}
          <div className="mt-6 pt-4 border-t border-zinc-800/80 grid grid-cols-2 gap-3">
            <Link
              href="/dashboard/settings"
              className="py-2.5 px-3 rounded-xl bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-xs font-bold text-zinc-300 hover:text-white flex items-center justify-center gap-2 transition"
            >
              <CreditCard className="w-3.5 h-3.5 text-zinc-400" />
              <span>Atur Payout</span>
            </Link>

            <button
              onClick={() => {
                navigator.clipboard.writeText(`https://pay.lynk.id/${profile.username}`);
                alert(`PayMe link disalin: https://pay.lynk.id/${profile.username}`);
              }}
              className="py-2.5 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-xs font-bold flex items-center justify-center gap-1.5 transition"
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
        <div className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 hover:border-zinc-700 transition">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-zinc-400 font-semibold">Lifetime Sales</span>
            <div className="p-2 rounded-xl bg-emerald-950/60 border border-emerald-500/20 text-emerald-400">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <span className="text-xl font-black text-white">Rp 28.450.000</span>
          <p className="text-[11px] text-emerald-400 mt-1 font-semibold">+18.4% growth</p>
        </div>

        {/* Metric 2 */}
        <div className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 hover:border-zinc-700 transition">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-zinc-400 font-semibold">My Blocks Aktif</span>
            <div className="p-2 rounded-xl bg-indigo-950/60 border border-indigo-500/20 text-indigo-400">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <span className="text-xl font-black text-white">{activeBlocksCount} Blok</span>
          <p className="text-[11px] text-zinc-500 mt-1 font-semibold">{blocks.length} Total dibuat</p>
        </div>

        {/* Metric 3 */}
        <div className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 hover:border-zinc-700 transition">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-zinc-400 font-semibold">Affiliate Products</span>
            <div className="p-2 rounded-xl bg-purple-950/60 border border-purple-500/20 text-purple-400">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <span className="text-xl font-black text-white">5 Produk</span>
          <p className="text-[11px] text-purple-400 mt-1 font-semibold">Komisi 15% - 30%</p>
        </div>

        {/* Metric 4 */}
        <div className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 hover:border-zinc-700 transition">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-zinc-400 font-semibold">Lifetime Orders</span>
            <div className="p-2 rounded-xl bg-rose-950/60 border border-rose-500/20 text-rose-400">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <span className="text-xl font-black text-white">142 Pesanan</span>
          <p className="text-[11px] text-emerald-400 mt-1 font-semibold">98.2% klaim sukses</p>
        </div>
      </div>

      {/* 3. QUICK CREATE BAR */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-bold text-white">Quick Create Bar</h3>
          </div>
          <span className="text-xs text-zinc-500">Pintas Cepat Tambah Konten</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {quickCreateItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.title}
                href={item.href}
                className="p-4 rounded-2xl bg-zinc-900/80 hover:bg-zinc-800/90 border border-zinc-800 hover:border-zinc-700 transition group flex flex-col justify-between space-y-3"
              >
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br border flex items-center justify-center ${item.color} group-hover:scale-110 transition`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white group-hover:text-emerald-400 transition">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-zinc-400 mt-0.5 line-clamp-1">
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

      {/* 5. RECENT ORDERS TABLE */}
      <div className="p-6 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white">
              Aktivitas Pesanan & Download Terbaru
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              Daftar transaksi dan klaim aset video editing dari halaman bio Anda
            </p>
          </div>

          <Link
            href="/dashboard/orders"
            className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition"
          >
            <span>Lihat Semua Pesanan</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Orders Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-zinc-800 text-zinc-500">
                <th className="pb-3 font-semibold">ID Pesanan</th>
                <th className="pb-3 font-semibold">Pembeli</th>
                <th className="pb-3 font-semibold">Aset / Produk</th>
                <th className="pb-3 font-semibold">Waktu</th>
                <th className="pb-3 font-semibold">Total</th>
                <th className="pb-3 font-semibold text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {recentOrders.map((ord) => (
                <tr key={ord.id} className="hover:bg-zinc-800/30 transition">
                  <td className="py-3.5 font-mono text-zinc-400">{ord.id}</td>
                  <td className="py-3.5">
                    <p className="font-bold text-white">{ord.buyer}</p>
                    <p className="text-[11px] text-zinc-500">{ord.email}</p>
                  </td>
                  <td className="py-3.5 text-zinc-300 font-medium">{ord.product}</td>
                  <td className="py-3.5 text-zinc-500">{ord.date}</td>
                  <td className="py-3.5 font-bold text-white">{ord.price}</td>
                  <td className="py-3.5 text-right">
                    <span className="px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-[10px] font-bold text-emerald-400">
                      {ord.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
