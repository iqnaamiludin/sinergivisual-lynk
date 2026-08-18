"use client";

import React from "react";
import { BookOpen, PlayCircle, Sparkles, ExternalLink, CheckCircle } from "lucide-react";

export default function TutorialsPage() {
  const tutorials = [
    {
      id: "tut-1",
      title: "1. Panduan Menambahkan Aset Video (LUTs, SFX & MOGRT) ke Bio",
      duration: "5 Menit",
      desc: "Pelajari cara menyusun blok produk digital, mengisi direct download link, dan mengatur tags kompatibilitas software.",
      category: "Aset Digital",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      id: "tut-2",
      title: "2. Menampilkan Showreel Video YouTube & Reels Responsif",
      duration: "4 Menit",
      desc: "Trik menyematkan video 16:9 atau 9:16 agar dapat diputar langsung di dalam halaman bio pengunjung tanpa keluar aplikasi.",
      category: "Video Embed",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      id: "tut-3",
      title: "3. Konfigurasi Rekening Bank & Penarikan Saldo (Payout)",
      duration: "3 Menit",
      desc: "Panduan menghubungkan nomor rekening BCA, Mandiri, atau e-Wallet GoPay/OVO untuk pencairan hasil penjualan otomatis.",
      category: "Keuangan",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      id: "tut-4",
      title: "4. Integrasi Meta Pixel & Google Analytics untuk Retargeting",
      duration: "6 Menit",
      desc: "Cara memasang tracking pixel iklan untuk melacak pengunjung yang mengklik link portofolio dan mengunduh template video.",
      category: "Marketing",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
  ];

  return (
    <div className="space-y-6 pb-12">
      <div className="flex items-center gap-2.5">
        <div className="p-2 rounded-xl bg-emerald-950/80 border border-emerald-500/30 text-emerald-400">
          <BookOpen className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-xl font-black text-white">Pusat Tutorial & Panduan</h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            Kumpulan video panduan praktis untuk memaksimalkan fitur Sinergi Visual Lynk
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tutorials.map((t) => (
          <div
            key={t.id}
            className="p-5 rounded-2xl bg-zinc-900/90 border border-zinc-800 flex flex-col justify-between space-y-4 hover:border-zinc-700 transition"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-zinc-950 border border-zinc-800 text-[10px] font-bold text-emerald-400">
                  {t.category}
                </span>
                <span className="text-xs text-zinc-500 font-mono">{t.duration}</span>
              </div>
              <h3 className="text-sm font-bold text-white leading-snug">{t.title}</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">{t.desc}</p>
            </div>

            <div className="pt-3 border-t border-zinc-800">
              <a
                href={t.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 hover:border-emerald-500/40 text-xs font-bold text-white flex items-center justify-center gap-2 transition"
              >
                <PlayCircle className="w-4 h-4 text-emerald-400" />
                <span>Tonton Video Panduan</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
