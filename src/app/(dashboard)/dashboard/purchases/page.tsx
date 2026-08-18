"use client";

import React from "react";
import { CreditCard, Download, FileArchive, CheckCircle2, Sparkles, PackageOpen } from "lucide-react";
import Link from "next/link";

export default function PurchasesPage() {
  const purchases: any[] = [];

  return (
    <div className="space-y-6 pb-12">
      <div className="flex items-center gap-2.5">
        <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-500/30 text-emerald-600 dark:text-emerald-400">
          <CreditCard className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-xl font-black text-slate-900 dark:text-white">Pembelian Saya (My Purchase)</h1>
          <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
            Daftar aset video editing, lisensi produk, dan berkas yang telah Anda klaim
          </p>
        </div>
      </div>

      {purchases.length === 0 ? (
        <div className="text-center py-16 px-6 rounded-3xl bg-white dark:bg-zinc-900/50 border border-dashed border-slate-200 dark:border-zinc-800 space-y-3 shadow-sm">
          <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 flex items-center justify-center mx-auto text-slate-400 dark:text-zinc-500">
            <PackageOpen className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Belum Ada Aset yang Diklaim</h4>
            <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1 max-w-sm mx-auto">
              Seluruh lisensi aset digital dan produk video yang Anda unduh atau beli dari kreator akan tersimpan di halaman ini.
            </p>
          </div>
          <Link
            href="/sinergivisual"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-xs font-bold transition"
          >
            <span>Jelajahi Aset Kreator</span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {purchases.map((p) => (
            <div
              key={p.id}
              className="p-5 rounded-3xl bg-white dark:bg-zinc-900/90 border border-slate-200 dark:border-zinc-800 flex flex-col justify-between space-y-4 hover:border-slate-300 dark:hover:border-zinc-700 shadow-sm transition"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-slate-400 dark:text-zinc-500">{p.id}</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold border border-emerald-300 dark:border-emerald-500/30">
                    {p.license}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">{p.title}</h3>
                <p className="text-xs text-slate-500 dark:text-zinc-400">Kreator: {p.creator} • Diklaim: {p.date}</p>
                <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-slate-50 dark:bg-zinc-950 text-[11px] font-mono text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-zinc-800">
                  <FileArchive className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
                  <span>{p.type}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-zinc-800 flex items-center justify-between">
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Lisensi Aktif</span>
                </span>
                <a
                  href={p.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Unduh File</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
