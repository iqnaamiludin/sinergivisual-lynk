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
} from "lucide-react";

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "success" | "pending">("all");

  const ordersData = [
    {
      id: "ORD-8942",
      buyer: "Rian Pratama",
      email: "rian.visual@gmail.com",
      phone: "+62 812-9876-5432",
      product: "Cinematic Film LUTs Pack (Vol. 1)",
      price: "FREE",
      paymentMethod: "Direct Claim (Rp 0)",
      date: "18 Ags 2026, 13:20",
      status: "Success",
    },
    {
      id: "ORD-8941",
      buyer: "Studio Karya Visual",
      email: "production@karyavisual.id",
      phone: "+62 813-1122-3344",
      product: "Essential Video Sound FX Master Pack",
      price: "FREE",
      paymentMethod: "Direct Claim (Rp 0)",
      date: "18 Ags 2026, 12:45",
      status: "Success",
    },
    {
      id: "ORD-8940",
      buyer: "Dimas Anggara",
      email: "dimas.motion@yahoo.com",
      phone: "+62 856-7890-1234",
      product: "Premiere Pro Minimal Lower Thirds",
      price: "FREE",
      paymentMethod: "Direct Claim (Rp 0)",
      date: "18 Ags 2026, 11:15",
      status: "Success",
    },
    {
      id: "ORD-8939",
      buyer: "Nadia Creative Studio",
      email: "nadia@agency.com",
      phone: "+62 819-5566-7788",
      product: "Commercial Video 4K Transitions Pack",
      price: "Rp 149.000",
      paymentMethod: "QRIS / GoPay",
      date: "18 Ags 2026, 09:30",
      status: "Success",
    },
    {
      id: "ORD-8938",
      buyer: "Budi Santoso",
      email: "budi.editor@gmail.com",
      phone: "+62 877-3344-5566",
      product: "DaVinci Resolve Color Grading Mastery",
      price: "Rp 249.000",
      paymentMethod: "BCA Virtual Account",
      date: "17 Ags 2026, 21:05",
      status: "Success",
    },
    {
      id: "ORD-8937",
      buyer: "Fajar Nugraha",
      email: "fajar@visualart.co",
      phone: "+62 811-2233-4455",
      product: "3D Motion Graphic After Effects Pack",
      price: "Rp 189.000",
      paymentMethod: "Mandiri VA",
      date: "17 Ags 2026, 16:40",
      status: "Pending",
    },
  ];

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
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-950/80 border border-emerald-500/30 text-emerald-400">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-black text-white">Riwayat Pesanan (Orders)</h1>
              <p className="text-xs text-zinc-400 mt-0.5">
                Kelola transaksi pembeli, klaim aset gratis, dan data pemesanan klien
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => alert("Mengekspor data riwayat transaksi ke format CSV...")}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-200 hover:text-white text-xs font-bold transition self-start sm:self-auto cursor-pointer"
        >
          <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
          <span>Export CSV</span>
        </button>
      </div>

      {/* 3 Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800">
          <span className="text-xs text-zinc-400 font-semibold">Total Transaksi</span>
          <p className="text-2xl font-black text-white mt-1">142 Pesanan</p>
          <span className="text-[11px] text-emerald-400 font-semibold">98.5% Sukses</span>
        </div>
        <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800">
          <span className="text-xs text-zinc-400 font-semibold">Total Omset Penjualan</span>
          <p className="text-2xl font-black text-emerald-400 mt-1">Rp 28.450.000</p>
          <span className="text-[11px] text-zinc-500 font-semibold">Termasuk produk berbayar</span>
        </div>
        <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800">
          <span className="text-xs text-zinc-400 font-semibold">Klaim Aset Gratis (Leads)</span>
          <p className="text-2xl font-black text-indigo-400 mt-1">118 Unduhan</p>
          <span className="text-[11px] text-indigo-300 font-semibold">Calon klien potensial</span>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama, email, ID pesanan..."
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
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
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                filterStatus === tab.id
                  ? "bg-emerald-500 text-zinc-950 font-bold shadow-sm"
                  : "bg-zinc-950 text-zinc-400 hover:text-white border border-zinc-800"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="rounded-2xl bg-zinc-900/90 border border-zinc-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-zinc-950 border-b border-zinc-800 text-zinc-400 font-semibold">
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
            <tbody className="divide-y divide-zinc-800/60">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-zinc-500">
                    Tidak ditemukan data pesanan yang sesuai dengan filter.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-zinc-800/40 transition">
                    <td className="p-4 font-mono font-bold text-zinc-300">
                      {ord.id}
                    </td>
                    <td className="p-4">
                      <p className="font-bold text-white">{ord.buyer}</p>
                      <p className="text-[11px] text-zinc-400">{ord.email}</p>
                      <p className="text-[10px] text-zinc-500">{ord.phone}</p>
                    </td>
                    <td className="p-4 font-semibold text-zinc-200">
                      {ord.product}
                    </td>
                    <td className="p-4 text-zinc-400 text-[11px]">
                      {ord.paymentMethod}
                    </td>
                    <td className="p-4 text-zinc-400">{ord.date}</td>
                    <td className="p-4 font-black text-white">{ord.price}</td>
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                          ord.status === "Success"
                            ? "bg-emerald-950/80 border border-emerald-500/30 text-emerald-400"
                            : "bg-amber-950/80 border border-amber-500/30 text-amber-400"
                        }`}
                      >
                        {ord.status === "Success" ? (
                          <CheckCircle2 className="w-3 h-3" />
                        ) : (
                          <Clock className="w-3 h-3" />
                        )}
                        <span>{ord.status}</span>
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() =>
                          alert(`Detail Invoice ${ord.id} untuk ${ord.buyer}`)
                        }
                        className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition"
                        title="Lihat Invoice"
                      >
                        <Receipt className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
