"use client";

import React, { useState } from "react";
import { Users, Copy, Check, DollarSign, TrendingUp, Sparkles, ExternalLink, PackageOpen } from "lucide-react";
import { useBuilderStore } from "@/stores/use-builder-store";
import Link from "next/link";

export default function AffiliatesPage() {
  const { profile } = useBuilderStore();
  const [copied, setCopied] = useState(false);

  const affiliateLink = `https://lynk.id/register?ref=${profile.username}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(affiliateLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const affiliateProducts: any[] = [];

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

      {/* Referral Link Box */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-zinc-900 to-zinc-950 border border-zinc-800 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-white">Tautan Referral Afiliasi Anda:</span>
          <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
            Komisi Aktif
          </span>
        </div>

        <div className="p-3 bg-zinc-950 rounded-2xl border border-zinc-800 flex items-center justify-between gap-3">
          <span className="font-mono text-xs text-zinc-300 truncate">{affiliateLink}</span>
          <button
            onClick={handleCopy}
            className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs flex items-center gap-1.5 transition shrink-0 cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? "Tersalin" : "Salin Link"}</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800">
          <span className="text-xs font-semibold text-zinc-400">Total Komisi Didapat</span>
          <p className="text-2xl font-black text-white mt-1">Rp 0</p>
          <span className="text-[11px] text-zinc-500 mt-0.5 block">0 Referral aktif</span>
        </div>

        <div className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800">
          <span className="text-xs font-semibold text-zinc-400">Produk Dipromosikan</span>
          <p className="text-2xl font-black text-emerald-400 mt-1">0</p>
          <span className="text-[11px] text-zinc-500 mt-0.5 block">Aset kemitraan</span>
        </div>

        <div className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800">
          <span className="text-xs font-semibold text-zinc-400">Total Klik Link</span>
          <p className="text-2xl font-black text-indigo-400 mt-1">0</p>
          <span className="text-[11px] text-zinc-500 mt-0.5 block">Kunjungan referral</span>
        </div>
      </div>

      {/* Affiliate Products Table */}
      <div className="rounded-2xl bg-zinc-900/90 border border-zinc-800 overflow-hidden">
        <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
          <h3 className="text-sm font-bold text-white">Produk Afiliasi Aktif</h3>
        </div>

        {affiliateProducts.length === 0 ? (
          <div className="p-12 text-center text-zinc-500 space-y-2">
            <PackageOpen className="w-8 h-8 text-zinc-600 mx-auto" />
            <p className="text-sm font-bold text-white">Belum Ada Produk Afiliasi</p>
            <p className="text-xs text-zinc-400 max-w-sm mx-auto">
              Bagikan tautan referral Anda kepada sesama kreator untuk mulai mendapatkan komisi passive income.
            </p>
          </div>
        ) : (
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-zinc-950 border-b border-zinc-800 text-zinc-400">
                <th className="p-4">Nama Produk</th>
                <th className="p-4">Komisi</th>
                <th className="p-4">Harga Jual</th>
                <th className="p-4">Terjual</th>
                <th className="p-4 text-right">Pendapatan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {affiliateProducts.map((p) => (
                <tr key={p.id} className="hover:bg-zinc-800/40 transition">
                  <td className="p-4 font-bold text-white">{p.name}</td>
                  <td className="p-4 text-emerald-400 font-bold">{p.commission}</td>
                  <td className="p-4">{p.price}</td>
                  <td className="p-4">{p.sales} unit</td>
                  <td className="p-4 text-right font-black text-white">{p.earned}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
