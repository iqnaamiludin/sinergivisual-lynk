"use client";

import React, { useState } from "react";
import { MessageSquare, Send, Smartphone, CheckCircle2, FileText, Zap } from "lucide-react";

export default function WhatsAppBlastPage() {
  const [templateType, setTemplateType] = useState("promo");
  const [phoneList, setPhoneList] = useState("6281234567890\n6281987654321\n6285712345678");
  const [customText, setCustomText] = useState(
    "Halo [Nama]! Tim Sinergi Visual baru saja merilis Cinematic Film LUTs Pack (Vol. 1) gratis untuk Anda. Cek sekarang di: https://lynk.id/sinergivisual"
  );
  const [sentSuccess, setSentSuccess] = useState(false);

  const templates = [
    {
      id: "promo",
      label: "Rilis Aset Gratis Baru",
      text: "Halo [Nama]! Tim Sinergi Visual baru saja merilis Cinematic Film LUTs Pack (Vol. 1) gratis untuk Anda. Cek sekarang di: https://lynk.id/sinergivisual",
    },
    {
      id: "thanks",
      label: "Terima Kasih Download",
      text: "Terima kasih telah mengunduh aset kami di Sinergi Visual Lynk! Jika butuh bantuan editing atau konsultasi proyek video, silakan hubungi tim kami ya.",
    },
    {
      id: "project",
      label: "Peluang Kerjasama Video",
      text: "Halo rekan kreatif! Kami dari Sinergi Visual membuka slot produksi video komersial & music video untuk bulan ini. Info portofolio lengkap: https://lynk.id/sinergivisual",
    },
  ];

  const handleTemplateChange = (id: string) => {
    setTemplateType(id);
    const selected = templates.find((t) => t.id === id);
    if (selected) {
      setCustomText(selected.text);
    }
  };

  const handleSendBlast = (e: React.FormEvent) => {
    e.preventDefault();
    setSentSuccess(true);
    setTimeout(() => setSentSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex items-center gap-2.5">
        <div className="p-2 rounded-xl bg-emerald-950/80 border border-emerald-500/30 text-emerald-400">
          <MessageSquare className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-xl font-black text-white">WhatsApp Broadcast & Blast</h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            Kirim pesan promosi dan notifikasi aset langsung ke kontak WhatsApp klien dan subscribers
          </p>
        </div>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800">
          <span className="text-xs text-zinc-400 font-semibold">Kontak Terdaftar</span>
          <p className="text-2xl font-black text-white mt-1">840 Nomor</p>
          <span className="text-[11px] text-emerald-400 font-semibold">Aktif & terverifikasi WA</span>
        </div>
        <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800">
          <span className="text-xs text-zinc-400 font-semibold">Delivery Rate</span>
          <p className="text-2xl font-black text-emerald-400 mt-1">99.4%</p>
          <span className="text-[11px] text-zinc-500">Terkirim langsung ke chat</span>
        </div>
        <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800">
          <span className="text-xs text-zinc-400 font-semibold">Response Rate</span>
          <p className="text-2xl font-black text-indigo-400 mt-1">28.2%</p>
          <span className="text-[11px] text-indigo-300">Respon chat langsung</span>
        </div>
      </div>

      {/* Main Composer Form */}
      <div className="p-6 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Zap className="w-4 h-4 text-emerald-400" />
            <span>Composer Pesan WhatsApp</span>
          </h3>
          <span className="text-xs text-emerald-400 font-semibold">WhatsApp API Connected</span>
        </div>

        {sentSuccess ? (
          <div className="p-8 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-center space-y-2 animate-in zoom-in-95 duration-200">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
            <h4 className="text-base font-bold text-white">Broadcast WhatsApp Berhasil Terkirim!</h4>
            <p className="text-xs text-emerald-300">
              Pesan telah terkirim secara otomatis ke daftar kontak yang ditentukan.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSendBlast} className="space-y-5 text-xs">
            {/* Template Selector Chips */}
            <div>
              <label className="block font-semibold text-zinc-300 mb-2">
                Pilih Template Pesan:
              </label>
              <div className="flex flex-wrap gap-2">
                {templates.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => handleTemplateChange(t.id)}
                    className={`py-2 px-3 rounded-xl font-semibold transition cursor-pointer ${
                      templateType === t.id
                        ? "bg-emerald-500 text-zinc-950 font-bold"
                        : "bg-zinc-950 text-zinc-400 border border-zinc-800 hover:text-white"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Textarea */}
            <div>
              <label className="block font-semibold text-zinc-300 mb-1.5">
                Isi Pesan WhatsApp (Dukungan Variabel: [Nama], [Produk]):
              </label>
              <textarea
                rows={5}
                required
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-700 rounded-xl p-3 text-white focus:outline-none focus:border-emerald-500 leading-relaxed font-sans"
              />
            </div>

            {/* Phone numbers input */}
            <div>
              <label className="block font-semibold text-zinc-300 mb-1.5">
                Daftar Nomor Telepon Tujuan (1 nomor per baris, format 62...):
              </label>
              <textarea
                rows={4}
                required
                value={phoneList}
                onChange={(e) => setPhoneList(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-700 rounded-xl p-3 text-emerald-400 font-mono focus:outline-none focus:border-emerald-500 leading-relaxed text-xs"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Kirim Broadcast WhatsApp Sekarang</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
