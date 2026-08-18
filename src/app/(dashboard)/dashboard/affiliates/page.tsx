"use client";

import React, { useState } from "react";
import { Users, Copy, Check, DollarSign, TrendingUp, Sparkles, ExternalLink } from "lucide-react";
import { useBuilderStore } from "@/stores/use-builder-store";

export default function AffiliatesPage() {
  const { profile } = useBuilderStore();
  const [copied, setCopied] = useState(false);

  const affiliateLink = `https://lynk.id/register?ref=${profile.username}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(affiliateLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const affiliateProducts = [
    {
      id: "aff-1",
      name: "Cinematic Film LUTs Pack (Vol. 1)",
      creator: "Sinergi Visual",
      commission: "30%",
      price: "Rp 249.000",
      earned: "Rp 1.494.000",
      sales: 20,
    },
    {
      id: "aff-2",
      name: "Essential Video SFX Master Pack",
      creator: "Sinergi Visual",
      commission: "25%",
      price: "Rp 189.000",
      earned: "Rp 708.750",
      sales: 15,
    },
    {
      id: "aff-3",
      name: "DaVinci Colorist Masterclass",
      creator: "Color Grade Studio",
      commission: "20%",
      price: "Rp 499.000",
      earned: "Rp 998.000",
      sales: 10,
    },
  ];

  return (
    <div className="space-y-6 pb-12">
      <div className="flex items-center gap-2.5">
        <div className="p-2 rounded-xl bg-emerald-950/80 border border-emerald-500/30 text-emerald-400">
          <Users className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-xl font-black text-white">Program Afiliasi (Affiliates)</h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            Dapatkan komisi hingga 30% dari membagikan aset dan produk digital mitra kreatif
          </p>
        </div>
      </div>

      {/* Referral Link Bar */}
      <div className="p-5 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-3">
        <span className="text-xs font-bold text-white">Tautan Referral Afiliasi Anda:</span>
        <div className="flex items-center gap-2 p-2 rounded-xl bg-zinc-950 border border-zinc-800">
          <input
            type="text"
            readOnly
            value={affiliateLink}
            className="flex-1 bg-transparent text-xs text-emerald-400 font-mono focus:outline-none px-2 select-all"
          />
          <button
            onClick={handleCopy}
            className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs flex items-center gap-1.5 transition cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Tersalin</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Salin Link</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800">
          <span className="text-xs text-zinc-400 font-semibold">Total Komisi Afiliasi</span>
          <p className="text-2xl font-black text-emerald-400 mt-1">Rp 3.200.750</p>
          <span className="text-[11px] text-zinc-500">Saldo siap ditarik (Payout)</span>
        </div>
        <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800">
          <span className="text-xs text-zinc-400 font-semibold">Total Penjualan Afiliasi</span>
          <p className="text-2xl font-black text-white mt-1">45 Produk</p>
          <span className="text-[11px] text-emerald-400 font-semibold">+12 pesanan minggu ini</span>
        </div>
        <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800">
          <span className="text-xs text-zinc-400 font-semibold">Mitra Kreatif Aktif</span>
          <p className="text-2xl font-black text-indigo-400 mt-1">8 Creator</p>
          <span className="text-[11px] text-indigo-300">Kolaborasi studio</span>
        </div>
      </div>

      {/* Affiliate Products Table */}
      <div className="p-6 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-4">
        <h3 className="text-base font-bold text-white">Katalog Produk Afiliasi</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-zinc-800 text-zinc-500">
                <th className="pb-3 font-semibold">Nama Produk</th>
                <th className="pb-3 font-semibold">Kreator</th>
                <th className="pb-3 font-semibold">Harga</th>
                <th className="pb-3 font-semibold">Komisi (%)</th>
                <th className="pb-3 font-semibold">Total Didapat</th>
                <th className="pb-3 font-semibold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {affiliateProducts.map((p) => (
                <tr key={p.id} className="hover:bg-zinc-800/30">
                  <td className="py-3.5 font-bold text-white">{p.name}</td>
                  <td className="py-3.5 text-zinc-400">{p.creator}</td>
                  <td className="py-3.5 text-zinc-300 font-semibold">{p.price}</td>
                  <td className="py-3.5 font-bold text-emerald-400">{p.commission}</td>
                  <td className="py-3.5 font-mono font-bold text-white">{p.earned}</td>
                  <td className="py-3.5 text-right">
                    <button
                      onClick={() => alert(`Link affiliasi untuk ${p.name} disalin!`)}
                      className="px-3 py-1 rounded-lg bg-zinc-800 hover:bg-emerald-500 hover:text-zinc-950 text-zinc-300 text-xs font-semibold transition"
                    >
                      Dapatkan Link
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
