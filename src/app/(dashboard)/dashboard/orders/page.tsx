"use client";

import React, { useState } from "react";
import {
  ShoppingBag,
  Search,
  Download,
  Filter,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  Receipt,
  FileSpreadsheet,
  PackageOpen,
} from "lucide-react";
import Link from "next/link";

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "success" | "pending">("all");

  const ordersData: any[] = [];

  const filteredOrders = ordersData.filter((ord) => {
    const matchesSearch =
      ord.buyer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ord.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ord.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ord.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      filterStatus === "all" ||
      ord.status.toLowerCase() === filterStatus.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-500/30 text-emerald-600 dark:text-emerald-400">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
              Manajemen Pesanan & Transaksi
            </h1>
          </div>
          <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">
            Pantau dan kelola seluruh riwayat klaim aset digital gratis maupun berbayar.
          </p>
        </div>

        <button
          onClick={() => alert("Mengekspor data pesanan ke file .CSV...")}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-slate-100 dark:bg-zinc-900 dark:hover:bg-zinc-800 border border-slate-200 dark:border-zinc-800 text-slate-700 hover:text-slate-900 dark:text-zinc-300 dark:hover:text-white text-xs font-bold transition self-start sm:self-auto cursor-pointer shadow-sm"
        >
          <FileSpreadsheet className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>Export ke CSV</span>
        </button>
      </div>

      {/* 3 Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-3xl bg-white dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-800 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 dark:text-zinc-400">Total Transaksi</span>
          <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">Rp 0</p>
          <span className="text-[11px] text-slate-400 dark:text-zinc-500 mt-0.5 block">0 Order selesai</span>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-800 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 dark:text-zinc-400">Klaim Berhasil</span>
          <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">0</p>
          <span className="text-[11px] text-slate-400 dark:text-zinc-500 mt-0.5 block">100% Rasio sukses</span>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-800 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 dark:text-zinc-400">Menunggu Pembayaran</span>
          <p className="text-2xl font-black text-amber-600 dark:text-amber-400 mt-1">0</p>
          <span className="text-[11px] text-slate-400 dark:text-zinc-500 mt-0.5 block">0 Pending</span>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 rounded-3xl bg-white dark:bg-zinc-900/90 border border-slate-200 dark:border-zinc-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 dark:text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama, email, ID pesanan..."
            className="w-full bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto">
          {[
            { id: "all", label: "Semua Status" },
            { id: "success", label: "Berhasil (Success)" },
            { id: "pending", label: "Menunggu (Pending)" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterStatus(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                filterStatus === tab.id
                  ? "bg-emerald-500 text-zinc-950 font-bold shadow-sm"
                  : "bg-slate-50 dark:bg-zinc-950 text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-zinc-800"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="rounded-3xl bg-white dark:bg-zinc-900/90 border border-slate-200 dark:border-zinc-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 dark:bg-zinc-950 border-b border-slate-200 dark:border-zinc-800 text-slate-500 dark:text-zinc-400 font-semibold">
                <th className="p-4">ID Pesanan</th>
                <th className="p-4">Pembeli / Klien</th>
                <th className="p-4">Aset / Produk</th>
                <th className="p-4">Metode Bayar</th>
                <th className="p-4">Tanggal</th>
                <th className="p-4">Total</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-zinc-800/60">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-12 text-center text-slate-400 dark:text-zinc-500">
                    <div className="max-w-xs mx-auto space-y-2">
                      <PackageOpen className="w-8 h-8 text-slate-400 dark:text-zinc-600 mx-auto" />
                      <p className="text-sm font-bold text-slate-900 dark:text-white">Belum Ada Pesanan</p>
                      <p className="text-xs text-slate-500 dark:text-zinc-500">
                        Ketika pembeli mengunduh atau membeli produk dari halaman bio Anda, rinciannya akan muncul di sini.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
