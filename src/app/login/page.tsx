"use client";

import React, { useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  AlertCircle,
  Eye,
  EyeOff,
} from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/dashboard";

  const [email, setEmail] = useState("admin@sinergivisual.com");
  const [password, setPassword] = useState("sinergi2026");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    // Verification check
    if (!email.trim() || !password.trim()) {
      setErrorMsg("Harap masukkan email dan password/PIN.");
      setIsLoading(false);
      return;
    }

    setTimeout(() => {
      // Set Auth Cookie (Expires in 7 days)
      const expiry = new Date();
      expiry.setDate(expiry.getDate() + 7);
      document.cookie = `sv_auth_token=sinergi_admin_auth_${Date.now()}; path=/; expires=${expiry.toUTCString()}; SameSite=Lax`;

      setIsLoading(false);
      router.push(redirectUrl);
      router.refresh();
    }, 600);
  };

  return (
    <div className="w-full max-w-md p-8 sm:p-10 rounded-[36px] bg-white border border-[#00C170]/30 shadow-2xl shadow-[#00C170]/10 flex flex-col space-y-7 relative z-10">
      {/* Header Logo & Title */}
      <div className="text-center space-y-3">
        <Link href="/" className="inline-block hover:scale-105 transition">
          <Image
            src="/images/logo.png"
            alt="Sinergi Visual Lynk"
            width={160}
            height={44}
            className="h-10 w-auto object-contain mx-auto"
            priority
          />
        </Link>
        <div>
          <h1 className="text-2xl font-black text-zinc-950 tracking-tight">
            Masuk ke Admin Studio
          </h1>
          <p className="text-xs text-zinc-500 mt-1">
            Kelola bio link, transaksi digital, dan statistik tim dalam satu tempat.
          </p>
        </div>
      </div>

      {/* Error Alert */}
      {errorMsg && (
        <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 text-xs font-semibold flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Login Form */}
      <form onSubmit={handleLogin} className="space-y-4">
        {/* Email Input */}
        <div className="space-y-1.5 text-left">
          <label className="text-xs font-bold text-zinc-700">Email Admin</label>
          <div className="relative">
            <Mail className="w-4 h-4 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nama@sinergivisual.com"
              className="w-full pl-11 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-2xl text-xs font-medium text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-[#00C170] focus:bg-white transition"
            />
          </div>
        </div>

        {/* Password / PIN Input */}
        <div className="space-y-1.5 text-left">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-zinc-700">Password / PIN Akses</label>
            <span className="text-[11px] text-[#00C170] font-bold cursor-pointer hover:underline">
              Lupa sandi?
            </span>
          </div>
          <div className="relative">
            <Lock className="w-4 h-4 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full pl-11 pr-11 py-3 bg-zinc-50 border border-zinc-200 rounded-2xl text-xs font-medium text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-[#00C170] focus:bg-white transition"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Quick Demo Info Box */}
        <div className="p-3 rounded-2xl bg-[#EBF7F4]/80 border border-[#00C170]/20 text-[11px] text-zinc-600 flex items-start gap-2">
          <ShieldCheck className="w-4 h-4 text-[#00C170] shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-zinc-900">Akses Tim Internal:</span>
            <span className="block text-zinc-500 mt-0.5">
              Gunakan email & password default studio untuk masuk ke dashboard.
            </span>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3.5 px-6 rounded-2xl bg-[#00C170] hover:bg-[#00a862] text-white font-extrabold text-xs tracking-wider uppercase shadow-xl shadow-[#00C170]/30 hover:scale-[1.02] active:scale-[0.98] transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <span>Masuk Ke Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      {/* Back to Home */}
      <div className="pt-2 text-center border-t border-zinc-100">
        <Link
          href="/"
          className="text-xs font-bold text-zinc-500 hover:text-[#00C170] transition"
        >
          &larr; Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#EBF7F4] via-white to-[#EBF7F4]/50 flex items-center justify-center p-4 sm:p-6 relative overflow-hidden font-sans">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00C170]/15 blur-[150px] rounded-full pointer-events-none" />

      <Suspense fallback={<div className="text-xs text-zinc-500 font-bold">Memuat form login...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
