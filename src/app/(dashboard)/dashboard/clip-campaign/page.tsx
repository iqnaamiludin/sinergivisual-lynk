"use client";

import React from "react";
import { Video, Plus, Sparkles, TrendingUp, Eye, Award, ExternalLink } from "lucide-react";

export default function ClipCampaignPage() {
  const campaigns = [
    {
      id: "camp-1",
      title: "TikTok & Reels Editing Contest (LUTs Pack Vol. 1)",
      rewardPool: "Rp 5.000.000",
      submissions: 48,
      totalViews: "480.000",
      status: "Active",
      endDate: "30 Ags 2026",
    },
    {
      id: "camp-2",
      title: "YouTube Shorts Sound Design Challenge",
      rewardPool: "Rp 3.500.000",
      submissions: 32,
      totalViews: "290.000",
      status: "Active",
      endDate: "15 Sep 2026",
    },
  ];

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-rose-950/80 border border-rose-500/30 text-rose-400">
            <Video className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-black text-white">Clip Campaign (Creator Rewards)</h1>
            <p className="text-xs text-zinc-400 mt-0.5">
              Program tantangan klip video pendek TikTok & Reels untuk mempromosikan aset dan portofolio
            </p>
          </div>
        </div>

        <button
          onClick={() => alert("Membuka form pembuatan Clip Campaign baru...")}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-xs font-bold transition shadow-lg shadow-emerald-500/20 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Buat Campaign Baru</span>
        </button>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800">
          <span className="text-xs text-zinc-400 font-semibold">Total Views Klip Terkumpul</span>
          <p className="text-2xl font-black text-rose-400 mt-1">770.000 Views</p>
          <span className="text-[11px] text-zinc-500 font-semibold">Dari TikTok & IG Reels</span>
        </div>
        <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800">
          <span className="text-xs text-zinc-400 font-semibold">Total Partisipan Editor</span>
          <p className="text-2xl font-black text-white mt-1">80 Editor Video</p>
          <span className="text-[11px] text-emerald-400 font-semibold">Komunitas aktif</span>
        </div>
        <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800">
          <span className="text-xs text-zinc-400 font-semibold">Reward Pool Aktif</span>
          <p className="text-2xl font-black text-amber-400 mt-1">Rp 8.500.000</p>
          <span className="text-[11px] text-zinc-500 font-semibold">2 Program Berjalan</span>
        </div>
      </div>

      {/* Campaigns List */}
      <div className="space-y-4">
        {campaigns.map((c) => (
          <div
            key={c.id}
            className="p-6 rounded-2xl bg-zinc-900/90 border border-zinc-800 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-zinc-700 transition"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-rose-950/80 border border-rose-500/30 text-[10px] font-black uppercase text-rose-400">
                  {c.status}
                </span>
                <span className="text-xs text-zinc-500">Berakhir pada {c.endDate}</span>
              </div>
              <h3 className="text-base font-bold text-white">{c.title}</h3>
              <div className="flex items-center gap-4 text-xs text-zinc-400 pt-1">
                <span>Hadiah: <strong className="text-amber-400">{c.rewardPool}</strong></span>
                <span>Submissions: <strong className="text-white">{c.submissions} Klip</strong></span>
                <span>Views: <strong className="text-emerald-400">{c.totalViews}</strong></span>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => alert(`Melihat ${c.submissions} klip video dari kampanye ini`)}
                className="px-4 py-2 rounded-xl bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-xs font-bold text-white transition"
              >
                Lihat Submission Klip
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
