"use client";

import React from "react";
import { DashboardChart } from "@/components/dashboard/dashboard-chart";
import { useBuilderStore } from "@/stores/use-builder-store";
import {
  BarChart3,
  Smartphone,
  Globe,
  Share2,
  TrendingUp,
  MapPin,
  Sparkles,
} from "lucide-react";

export default function StatisticsPage() {
  const { blocks } = useBuilderStore();

  const referrers = [
    { name: "Instagram (Bio / Story)", percentage: 48, visitors: 14200, color: "bg-pink-500" },
    { name: "TikTok (@sinergivisual)", percentage: 26, visitors: 7800, color: "bg-emerald-500" },
    { name: "Direct URL / WhatsApp", percentage: 14, visitors: 4200, color: "bg-teal-500" },
    { name: "YouTube Showreel Description", percentage: 12, visitors: 3600, color: "bg-rose-500" },
  ];

  const devices = [
    { name: "Mobile Smartphone", percentage: 78, count: "23.400 views", icon: Smartphone },
    { name: "Desktop / Laptop", percentage: 20, count: "6.000 views", icon: Globe },
    { name: "Tablet & Others", percentage: 2, count: "600 views", icon: Sparkles },
  ];

  const cities = [
    { city: "Jakarta", percentage: "38%", rank: 1 },
    { city: "Surabaya", percentage: "19%", rank: 2 },
    { city: "Bandung", percentage: "15%", rank: 3 },
    { city: "Denpasar (Bali)", percentage: "12%", rank: 4 },
    { city: "Medan & Lainnya", percentage: "16%", rank: 5 },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex items-center gap-2.5">
        <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-500/30 text-emerald-600 dark:text-emerald-400">
          <BarChart3 className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-xl font-black text-slate-900 dark:text-white">Statistik & Analisis Trafik</h1>
          <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
            Pantau metrik pengunjung, konversi klik aset, dan sumber asal lalu lintas
          </p>
        </div>
      </div>

      {/* Main Views & Clicks Area Chart */}
      <DashboardChart />

      {/* 3 Analytics Cards: Referrers, Devices, Geography */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* 1. Traffic Sources */}
        <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900/90 border border-slate-200 dark:border-zinc-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Share2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
              <span>Sumber Trafik (Referrer)</span>
            </h3>
            <span className="text-[10px] text-slate-400 dark:text-zinc-500 font-semibold">30 Hari</span>
          </div>

          <div className="space-y-3.5">
            {referrers.map((ref) => (
              <div key={ref.name} className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between text-slate-700 dark:text-zinc-300">
                  <span className="font-semibold">{ref.name}</span>
                  <span className="font-bold text-slate-900 dark:text-white">{ref.percentage}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-zinc-950 overflow-hidden border border-slate-200 dark:border-zinc-800">
                  <div
                    className={`h-full ${ref.color} rounded-full transition-all`}
                    style={{ width: `${ref.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Device Breakdown */}
        <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900/90 border border-slate-200 dark:border-zinc-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
              <span>Perangkat (Device)</span>
            </h3>
            <span className="text-[10px] text-slate-400 dark:text-zinc-500 font-semibold">Real-time</span>
          </div>

          <div className="space-y-3">
            {devices.map((d) => {
              const Icon = d.icon;
              return (
                <div
                  key={d.name}
                  className="p-3 rounded-2xl bg-slate-50 dark:bg-zinc-950/80 border border-slate-200 dark:border-zinc-800/60 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-white dark:bg-zinc-900 text-slate-600 dark:text-zinc-400 border border-slate-200 dark:border-zinc-800 shadow-sm">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white">{d.name}</p>
                      <p className="text-[10px] text-slate-400 dark:text-zinc-500">{d.count}</p>
                    </div>
                  </div>
                  <span className="text-sm font-black text-emerald-600 dark:text-emerald-400">
                    {d.percentage}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. Geographic Locations */}
        <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900/90 border border-slate-200 dark:border-zinc-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <MapPin className="w-4 h-4 text-rose-500 dark:text-rose-400" />
              <span>Lokasi Pengunjung Kota</span>
            </h3>
            <span className="text-[10px] text-slate-400 dark:text-zinc-500 font-semibold">Indonesia</span>
          </div>

          <div className="space-y-2">
            {cities.map((c) => (
              <div
                key={c.city}
                className="p-2.5 rounded-2xl bg-slate-50 dark:bg-zinc-950/80 border border-slate-200 dark:border-zinc-800/60 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-white dark:bg-zinc-900 text-slate-600 dark:text-zinc-400 text-[10px] font-bold flex items-center justify-center border border-slate-200 dark:border-zinc-800 shadow-sm">
                    {c.rank}
                  </span>
                  <span className="font-semibold text-slate-800 dark:text-zinc-200">{c.city}</span>
                </div>
                <span className="font-mono font-bold text-slate-900 dark:text-white">{c.percentage}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Performing Blocks Table */}
      <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900/90 border border-slate-200 dark:border-zinc-800 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">
          Performa Tiap Blok & Aset Video
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-zinc-800 text-slate-400 dark:text-zinc-500">
                <th className="pb-3 font-semibold">Judul Blok</th>
                <th className="pb-3 font-semibold">Tipe Konten</th>
                <th className="pb-3 font-semibold">Total Klik</th>
                <th className="pb-3 font-semibold text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-zinc-800/60">
              {blocks.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-6 text-center text-slate-400 dark:text-zinc-500">
                    Belum ada data klik blok yang tercatat.
                  </td>
                </tr>
              ) : (
                blocks.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50 dark:hover:bg-zinc-800/30">
                    <td className="py-3 font-bold text-slate-900 dark:text-white">{b.title}</td>
                    <td className="py-3 text-slate-500 dark:text-zinc-400 uppercase font-semibold text-[10px]">
                      {b.type}
                    </td>
                    <td className="py-3 font-mono font-bold text-emerald-600 dark:text-emerald-400">
                      {b.clicks || 0} Klik
                    </td>
                    <td className="py-3 text-right">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          b.active
                            ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400"
                            : "bg-slate-200 dark:bg-zinc-800 text-slate-600 dark:text-zinc-500"
                        }`}
                      >
                        {b.active ? "Aktif" : "Nonaktif"}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
