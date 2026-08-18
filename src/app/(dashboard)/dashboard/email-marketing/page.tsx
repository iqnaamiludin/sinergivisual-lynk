"use client";

import React, { useState } from "react";
import { Mail, Send, Users, Sparkles, CheckCircle2, FileSpreadsheet, Plus } from "lucide-react";

export default function EmailMarketingPage() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sentSuccess, setSentSuccess] = useState(false);

  const leads = [
    { email: "rian.visual@gmail.com", name: "Rian Pratama", source: "Cinematic LUTs Pack", date: "18 Ags 2026" },
    { email: "production@karyavisual.id", name: "Studio Karya Visual", source: "Essential SFX Pack", date: "18 Ags 2026" },
    { email: "dimas.motion@yahoo.com", name: "Dimas Anggara", source: "Lower Thirds MOGRT", date: "18 Ags 2026" },
    { email: "nadia@agency.com", name: "Nadia Creative", source: "Color Grading Mastery", date: "17 Ags 2026" },
    { email: "alif.editor@gmail.com", name: "Alif Hidayat", source: "Cinematic LUTs Pack", date: "17 Ags 2026" },
  ];

  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !message) return;

    setSentSuccess(true);
    setTimeout(() => {
      setSentSuccess(false);
      setSubject("");
      setMessage("");
    }, 3000);
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex items-center gap-2.5">
        <div className="p-2 rounded-xl bg-emerald-950/80 border border-emerald-500/30 text-emerald-400">
          <Mail className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-xl font-black text-white">E-Mail Marketing & Leads Vault</h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            Kirim broadcast newsletter ke pembeli dan audiens yang mengunduh aset gratis Anda
          </p>
        </div>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800">
          <span className="text-xs text-zinc-400 font-semibold">Total Email Leads</span>
          <p className="text-2xl font-black text-white mt-1">1.420 Kontak</p>
          <span className="text-[11px] text-emerald-400 font-semibold">+38 kontak baru minggu ini</span>
        </div>
        <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800">
          <span className="text-xs text-zinc-400 font-semibold">Rata-rata Open Rate</span>
          <p className="text-2xl font-black text-emerald-400 mt-1">42.8%</p>
          <span className="text-[11px] text-zinc-500">Standar industri 21%</span>
        </div>
        <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800">
          <span className="text-xs text-zinc-400 font-semibold">Click-Through Rate (CTR)</span>
          <p className="text-2xl font-black text-indigo-400 mt-1">16.4%</p>
          <span className="text-[11px] text-indigo-300">Tinggi untuk audiens video</span>
        </div>
      </div>

      {/* Grid: Left Broadcast Composer, Right Subscriber List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Composer (7 Cols) */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-zinc-800">
            <Send className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-bold text-white">Kirim Broadcast Email Baru</h3>
          </div>

          {sentSuccess ? (
            <div className="p-6 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-center space-y-2 animate-in zoom-in-95 duration-200">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
              <h4 className="text-sm font-bold text-white">Broadcast Berhasil Dikirim!</h4>
              <p className="text-xs text-emerald-300">
                Pesan telah dikirimkan ke 1.420 alamat email subscribers aktif.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSendBroadcast} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-zinc-300 mb-1">
                  Target Penerima:
                </label>
                <select className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none">
                  <option value="all">Semua Leads (1.420 Kontak)</option>
                  <option value="luts">Pengunduh Cinematic LUTs (640 Kontak)</option>
                  <option value="sfx">Pengunduh Sound FX Pack (480 Kontak)</option>
                  <option value="paid">Pembeli Produk Berbayar (142 Kontak)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-zinc-300 mb-1">
                  Subjek Email (Subject Line):
                </label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Contoh: 🔥 Aset Baru: 10 Cinematic LUTs Hollywood Gratis!"
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-zinc-300 mb-1">
                  Isi Pesan Email:
                </label>
                <textarea
                  rows={6}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Halo teman-teman creator! Kami baru saja merilis kumpulan template dan preset warna terbaru..."
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500 leading-relaxed"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Kirim Broadcast Sekarang</span>
              </button>
            </form>
          )}
        </div>

        {/* Right: Subscribers List (5 Cols) */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-indigo-400" />
              <span>Daftar Leads Terbaru</span>
            </h3>
            <button
              onClick={() => alert("Mengunduh daftar leads email ke format CSV...")}
              className="p-1 text-zinc-400 hover:text-white"
              title="Export CSV"
            >
              <FileSpreadsheet className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2.5">
            {leads.map((l, i) => (
              <div
                key={i}
                className="p-3 rounded-xl bg-zinc-950/80 border border-zinc-800/60 text-xs flex flex-col justify-between space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white truncate">{l.name}</span>
                  <span className="text-[10px] text-zinc-500">{l.date}</span>
                </div>
                <p className="text-[11px] text-emerald-400 font-mono truncate">
                  {l.email}
                </p>
                <span className="text-[10px] text-zinc-500">Dari: {l.source}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
