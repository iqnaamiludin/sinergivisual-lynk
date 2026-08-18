"use client";

import React, { useState } from "react";
import {
  Ticket,
  Plus,
  Copy,
  Check,
  Percent,
  DollarSign,
  Calendar,
  Users,
  Trash2,
  X,
  Sparkles,
} from "lucide-react";

interface Voucher {
  id: string;
  code: string;
  type: "percentage" | "fixed";
  amount: number;
  quota: number;
  used: number;
  validUntil: string;
  active: boolean;
}

export function VouchersPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const [vouchers, setVouchers] = useState<Voucher[]>([
    {
      id: "v-1",
      code: "SINERGI50",
      type: "percentage",
      amount: 50,
      quota: 100,
      used: 64,
      validUntil: "31 Des 2026",
      active: true,
    },
    {
      id: "v-2",
      code: "CREATIVE100",
      type: "fixed",
      amount: 100000,
      quota: 50,
      used: 32,
      validUntil: "30 Nov 2026",
      active: true,
    },
    {
      id: "v-3",
      code: "LAUNCHVIP",
      type: "percentage",
      amount: 100,
      quota: 20,
      used: 20,
      validUntil: "31 Ags 2026",
      active: false,
    },
  ]);

  // New voucher form state
  const [newCode, setNewCode] = useState("");
  const [newType, setNewType] = useState<"percentage" | "fixed">("percentage");
  const [newAmount, setNewAmount] = useState(20);
  const [newQuota, setNewQuota] = useState(50);
  const [newExpiry, setNewExpiry] = useState("2026-12-31");

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleCreateVoucher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCode) return;

    const created: Voucher = {
      id: `v-${Date.now()}`,
      code: newCode.toUpperCase().replace(/\s+/g, ""),
      type: newType,
      amount: Number(newAmount),
      quota: Number(newQuota),
      used: 0,
      validUntil: newExpiry,
      active: true,
    };

    setVouchers([created, ...vouchers]);
    setIsCreateModalOpen(false);
    setNewCode("");
  };

  const toggleActive = (id: string) => {
    setVouchers(
      vouchers.map((v) => (v.id === id ? { ...v, active: !v.active } : v))
    );
  };

  const deleteVoucher = (id: string) => {
    if (confirm("Hapus voucher diskon ini?")) {
      setVouchers(vouchers.filter((v) => v.id !== id));
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-emerald-950/80 border border-emerald-500/30 text-emerald-400">
            <Ticket className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-black text-white">Vouchers & Kupon Diskon</h1>
            <p className="text-xs text-zinc-400 mt-0.5">
              Buat kode promo diskon untuk produk video aset dan template berbayar
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-xs font-bold transition shadow-lg shadow-emerald-500/20 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Buat Voucher Baru</span>
        </button>
      </div>

      {/* Voucher Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {vouchers.map((v) => (
          <div
            key={v.id}
            className={`p-5 rounded-2xl bg-zinc-900/90 border transition flex flex-col justify-between space-y-4 ${
              v.active
                ? "border-zinc-800 hover:border-emerald-500/40"
                : "border-zinc-800/40 opacity-60"
            }`}
          >
            <div>
              {/* Header card: Code & status toggle */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-zinc-950 border border-zinc-800 text-emerald-400">
                    <Ticket className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-mono font-black text-base text-white tracking-wider">
                      {v.code}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleCopy(v.code)}
                  className="p-1.5 rounded-lg bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white transition"
                  title="Salin Kode Kupon"
                >
                  {copiedCode === v.code ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              {/* Discount Value */}
              <div className="mt-4 p-3 rounded-xl bg-zinc-950/80 border border-zinc-800/60">
                <span className="text-[10px] text-zinc-500 font-semibold uppercase block">
                  Nilai Diskon:
                </span>
                <span className="text-xl font-black text-emerald-400">
                  {v.type === "percentage"
                    ? `${v.amount}% OFF`
                    : `Potongan Rp ${v.amount.toLocaleString("id-ID")}`}
                </span>
              </div>

              {/* Quota Progress */}
              <div className="mt-4 space-y-1.5 text-xs">
                <div className="flex items-center justify-between text-zinc-400 text-[11px]">
                  <span>Pemakaian Kuota:</span>
                  <span className="font-bold text-white">
                    {v.used} / {v.quota} digunakan
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-zinc-950 overflow-hidden border border-zinc-800">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-300"
                    style={{ width: `${Math.min(100, (v.used / v.quota) * 100)}%` }}
                  />
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between text-[11px] text-zinc-500">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>Berlaku s/d {v.validUntil}</span>
                </span>
              </div>
            </div>

            {/* Card Footer Actions */}
            <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between">
              <button
                onClick={() => toggleActive(v.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                  v.active
                    ? "bg-emerald-950 text-emerald-400 border border-emerald-500/30"
                    : "bg-zinc-800 text-zinc-500"
                }`}
              >
                {v.active ? "Aktif" : "Nonaktif"}
              </button>

              <button
                onClick={() => deleteVoucher(v.id)}
                className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-950/40 transition"
                title="Hapus Voucher"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Voucher Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className="relative w-full max-w-md overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-700 p-6 shadow-2xl text-white animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <Ticket className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-bold text-white">Buat Voucher Baru</h3>
              </div>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="p-1 rounded-lg text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateVoucher} className="mt-4 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-zinc-300 mb-1">
                  Kode Voucher / Kupon:
                </label>
                <input
                  type="text"
                  required
                  value={newCode}
                  onChange={(e) => setNewCode(e.target.value.toUpperCase())}
                  placeholder="Contoh: PROMOSTUDIO50"
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-2 text-white font-mono font-bold uppercase focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-zinc-300 mb-1">
                    Tipe Diskon:
                  </label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as any)}
                    className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none"
                  >
                    <option value="percentage">Persentase (%)</option>
                    <option value="fixed">Nominal Tetap (Rp)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-zinc-300 mb-1">
                    Besar Diskon:
                  </label>
                  <input
                    type="number"
                    required
                    value={newAmount}
                    onChange={(e) => setNewAmount(Number(e.target.value))}
                    className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-zinc-300 mb-1">
                    Kuota Penggunaan:
                  </label>
                  <input
                    type="number"
                    required
                    value={newQuota}
                    onChange={(e) => setNewQuota(Number(e.target.value))}
                    className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none font-bold"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-zinc-300 mb-1">
                    Tanggal Kedaluwarsa:
                  </label>
                  <input
                    type="date"
                    required
                    value={newExpiry}
                    onChange={(e) => setNewExpiry(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition cursor-pointer"
                >
                  Simpan & Terbitkan Voucher
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default VouchersPage;
