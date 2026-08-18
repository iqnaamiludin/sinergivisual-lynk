"use client";

import React from "react";
import { CreditCard, Download, FileArchive, CheckCircle2, Sparkles } from "lucide-react";

export default function PurchasesPage() {
  const purchases = [
    {
      id: "PUR-102",
      title: "Cinematic Hollywood LUTs Vol. 1",
      creator: "Sinergi Visual",
      date: "18 Ags 2026",
      type: "ZIP • 45 MB",
      license: "Commercial License",
      downloadUrl: "https://drive.google.com/uc?export=download&id=cinematic-luts-vol1",
    },
    {
      id: "PUR-101",
      title: "Essential Video SFX Master Pack",
      creator: "Sinergi Visual",
      date: "15 Ags 2026",
      type: "ZIP • 180 MB",
      license: "Commercial License",
      downloadUrl: "https://drive.google.com/uc?export=download&id=sfx-master-pack",
    },
  ];

  return (
    <div className="space-y-6 pb-12">
      <div className="flex items-center gap-2.5">
        <div className="p-2 rounded-xl bg-emerald-950/80 border border-emerald-500/30 text-emerald-400">
          <CreditCard className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-xl font-black text-white">Pembelian Saya (My Purchase)</h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            Daftar aset video editing, lisensi produk, dan berkas yang telah Anda klaim
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {purchases.map((p) => (
          <div
            key={p.id}
            className="p-5 rounded-2xl bg-zinc-900/90 border border-zinc-800 flex flex-col justify-between space-y-4 hover:border-zinc-700 transition"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-zinc-500">{p.id}</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                  {p.license}
                </span>
              </div>
              <h3 className="text-sm font-bold text-white">{p.title}</h3>
              <p className="text-xs text-zinc-400">Kreator: {p.creator} • Diklaim: {p.date}</p>
              <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-950 text-[11px] font-mono text-zinc-300 border border-zinc-800">
                <FileArchive className="w-3.5 h-3.5 text-indigo-400" />
                <span>{p.type}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-zinc-800">
              <a
                href={p.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs flex items-center justify-center gap-2 transition"
              >
                <Download className="w-4 h-4" />
                <span>Unduh Ulang Berkas Aset</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
