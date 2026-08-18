"use client";

import React, { useState } from "react";
import { Workflow, Plus, Zap, Mail, MessageSquare, Tag, CheckCircle2, ArrowRight } from "lucide-react";

export default function AutomationsPage() {
  const [workflows, setWorkflows] = useState([
    {
      id: "wf-1",
      name: "Auto-Send Email Aset Digital",
      trigger: "Ketika pembeli mengklaim link aset gratis",
      action: "Kirim email otomatis berisi link direct download Google Drive",
      active: true,
    },
    {
      id: "wf-2",
      name: "Auto WhatsApp Welcome Message",
      trigger: "Ketika nomor WhatsApp baru masuk dari order",
      action: "Kirim pesan pembuka dan katalog portofolio video ke WhatsApp",
      active: true,
    },
    {
      id: "wf-3",
      name: "Tagging Calon Klien di CRM",
      trigger: "Ketika pengunjung mengklik tombol konsultasi WhatsApp",
      action: "Tandai kontak dengan label 'Potential Video Client'",
      active: false,
    },
  ]);

  const toggleWorkflow = (id: string) => {
    setWorkflows(
      workflows.map((w) => (w.id === id ? { ...w, active: !w.active } : w))
    );
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-indigo-950/80 border border-indigo-500/30 text-indigo-400">
            <Workflow className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black text-white">Automate Workflows</h1>
              <span className="px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-400 text-[10px] font-extrabold uppercase border border-indigo-500/30">
                Beta
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-0.5">
              Otomatisasi pengiriman email, follow-up WhatsApp, dan sinkronisasi data prospek
            </p>
          </div>
        </div>

        <button
          onClick={() => alert("Membuka visual canvas editor alur otomatisasi...")}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-xs font-bold transition shadow-lg shadow-emerald-500/20 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Buat Automasi Baru</span>
        </button>
      </div>

      {/* Workflow Cards */}
      <div className="space-y-4">
        {workflows.map((w) => (
          <div
            key={w.id}
            className={`p-6 rounded-2xl bg-zinc-900/90 border transition flex flex-col md:flex-row md:items-center justify-between gap-6 ${
              w.active ? "border-zinc-800 hover:border-indigo-500/30" : "border-zinc-800/40 opacity-60"
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-zinc-950 border border-zinc-800 text-indigo-400">
                  <Zap className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-white">{w.name}</h3>
              </div>

              {/* Trigger -> Action Flow */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-xs">
                <div className="px-3 py-1.5 rounded-xl bg-zinc-950 border border-zinc-800/80 text-zinc-300 font-medium">
                  <span className="text-zinc-500 font-bold mr-1">Trigger:</span>
                  <span>{w.trigger}</span>
                </div>
                <ArrowRight className="w-4 h-4 text-zinc-600 hidden sm:block shrink-0" />
                <div className="px-3 py-1.5 rounded-xl bg-indigo-950/40 border border-indigo-500/20 text-indigo-300 font-medium">
                  <span className="text-indigo-400 font-bold mr-1">Action:</span>
                  <span>{w.action}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => toggleWorkflow(w.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  w.active
                    ? "bg-emerald-500 text-zinc-950 shadow-md shadow-emerald-500/20"
                    : "bg-zinc-800 text-zinc-400"
                }`}
              >
                {w.active ? "Aktif" : "Nonaktif"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
