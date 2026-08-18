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

  const [vouchers, setVouchers] = useState<Voucher[]>([]);

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
          <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-500/30 text-emerald-600 dark:text-emerald-400">
            <Ticket className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-900 dark:text-white">Vouchers & Kupon Diskon</h1>
            <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
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
      {vouchers.length === 0 ? (
        <div className="text-center py-14 px-6 rounded-3xl bg-white dark:bg-zinc-900/50 border border-dashed border-slate-200 dark:border-zinc-800 space-y-3 shadow-sm">
          <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-600 dark:text-emerald-400">
            <Ticket className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Belum Ada Voucher Diskon</h4>
            <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1 max-w-sm mx-auto">
              Buat kode kupon diskon (potongan persentase atau nominal rupiah) untuk meningkatkan konversi penjualan produk digital Anda.
            </p>
          </div>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-xs font-bold transition cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Buat Voucher Pertama</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {vouchers.map((v) => (
            <div
              key={v.id}
              className={`p-5 rounded-3xl bg-white dark:bg-zinc-900/90 border transition flex flex-col justify-between space-y-4 ${
                v.active
                  ? "border-slate-200 dark:border-zinc-800 hover:border-emerald-500/40 shadow-sm"
                  : "border-slate-200/50 dark:border-zinc-800/40 opacity-60"
              }`}
            >
              <div>
                {/* Header card: Code & status toggle */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-xl bg-slate-100 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 text-emerald-600 dark:text-emerald-400">
                      <Ticket className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-mono font-black text-base text-slate-900 dark:text-white tracking-wider">
                        {v.code}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleCopy(v.code)}
                    className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-zinc-950 dark:hover:bg-zinc-800 border border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white transition cursor-pointer"
                    title="Salin Kode Kupon"
                  >
                    {copiedCode === v.code ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                {/* Amount / Discount info */}
                <div className="mt-4 p-3 rounded-2xl bg-slate-50 dark:bg-zinc-950 border border-slate-100 dark:border-zinc-800/80 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 dark:text-zinc-500 block uppercase font-bold">
                      Potongan Diskon
                    </span>
                    <span className="text-lg font-black text-emerald-600 dark:text-emerald-400">
                      {v.type === "percentage"
                        ? `${v.amount}% OFF`
                        : `Rp ${v.amount.toLocaleString("id-ID")}`}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 dark:text-zinc-500 block uppercase font-bold">
                      Kuota Terpakai
                    </span>
                    <span className="text-xs font-bold text-slate-800 dark:text-zinc-200">
                      {v.used} / {v.quota} klaim
                    </span>
                  </div>
                </div>

                {/* Validity */}
                <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 dark:text-zinc-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400 dark:text-zinc-500" />
                    <span>Berlaku s/d {v.validUntil}</span>
                  </span>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="pt-3 border-t border-slate-100 dark:border-zinc-800/80 flex items-center justify-between">
                <button
                  onClick={() => toggleActive(v.id)}
                  className={`px-2.5 py-1 rounded-xl text-xs font-bold transition cursor-pointer ${
                    v.active
                      ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-500/30"
                      : "bg-slate-200 dark:bg-zinc-800 text-slate-600 dark:text-zinc-500"
                  }`}
                >
                  {v.active ? "Aktif" : "Nonaktif"}
                </button>

                <button
                  onClick={() => deleteVoucher(v.id)}
                  className="p-1.5 rounded-xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition cursor-pointer"
                  title="Hapus Voucher"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Voucher Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 p-6 shadow-2xl text-slate-900 dark:text-white animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <Ticket className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Buat Voucher Baru</h3>
              </div>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:text-zinc-400 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateVoucher} className="mt-4 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-zinc-300 mb-1">
                  Kode Kupon Voucher:
                </label>
                <input
                  type="text"
                  required
                  value={newCode}
                  onChange={(e) => setNewCode(e.target.value.toUpperCase())}
                  placeholder="Contoh: MERDEKA50 / CREATIVE100"
                  className="w-full bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white font-mono font-bold uppercase focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-zinc-300 mb-1">
                    Tipe Potongan:
                  </label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as any)}
                    className="w-full bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none"
                  >
                    <option value="percentage">Persentase (%)</option>
                    <option value="fixed">Nominal Rupiah (Rp)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-zinc-300 mb-1">
                    Jumlah Potongan:
                  </label>
                  <input
                    type="number"
                    required
                    value={newAmount}
                    onChange={(e) => setNewAmount(Number(e.target.value))}
                    placeholder="20 atau 50000"
                    className="w-full bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white font-bold focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-zinc-300 mb-1">
                    Batas Kuota Klaim:
                  </label>
                  <input
                    type="number"
                    value={newQuota}
                    onChange={(e) => setNewQuota(Number(e.target.value))}
                    placeholder="50"
                    className="w-full bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-zinc-300 mb-1">
                    Tanggal Kedaluwarsa:
                  </label>
                  <input
                    type="date"
                    value={newExpiry}
                    onChange={(e) => setNewExpiry(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none"
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
