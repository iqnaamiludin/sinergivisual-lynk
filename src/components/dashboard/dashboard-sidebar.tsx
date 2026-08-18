"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";
import { usePathname } from "next/navigation";
import { useBuilderStore } from "@/stores/use-builder-store";
import {
  Home,
  Link2,
  Palette,
  BarChart3,
  ShoppingBag,
  CreditCard,
  BookOpen,
  Settings,
  Users,
  Mail,
  MessageSquare,
  Video,
  Workflow,
  Ticket,
  LogOut,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  ChevronRight,
  Menu,
  X,
  HelpCircle,
  TrendingUp,
} from "lucide-react";

export function DashboardSidebar() {
  const pathname = usePathname();
  const { profile } = useBuilderStore();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const mainNavItems = [
    { label: "Home", href: "/dashboard", icon: Home },
    { label: "My Lynk (Builder)", href: "/dashboard/builder", icon: Link2, badge: "Live" },
    { label: "Appearance", href: "/dashboard/appearance", icon: Palette },
    { label: "Statistik & Wawasan", href: "/dashboard/statistics", icon: BarChart3 },
    { label: "Pesanan & Transaksi", href: "/dashboard/orders", icon: ShoppingBag },
    { label: "Pembelian Saya", href: "/dashboard/purchases", icon: CreditCard },
  ];

  const creatorTools = [
    { label: "Program Afiliasi", href: "/dashboard/affiliates", icon: Users },
    { label: "Vouchers & Diskon", href: "/dashboard/vouchers", icon: Ticket },
    { label: "WhatsApp Broadcast", href: "/dashboard/whatsapp-blast", icon: MessageSquare },
    { label: "Email Marketing", href: "/dashboard/email-marketing", icon: Mail },
    { label: "Clip Campaign (TikTok)", href: "/dashboard/clip-campaign", icon: Video },
    { label: "Automasi Zapier/Webhook", href: "/dashboard/automations", icon: Workflow },
  ];

  const systemNav = [
    { label: "Pengaturan & Akun", href: "/dashboard/settings", icon: Settings },
    { label: "Pusat Bantuan & Tutorial", href: "/dashboard/tutorials", icon: HelpCircle },
  ];

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname.startsWith(href);
  };

  const SidebarContent = () => (
    <div className="flex flex-col justify-between h-full bg-white dark:bg-zinc-950 text-slate-700 dark:text-zinc-300 border-r border-slate-200 dark:border-zinc-900 select-none transition-colors duration-200">
      {/* Top Brand & Bio Link Shortcut */}
      <div>
        {/* Brand Logo */}
        <div className="p-5 border-b border-slate-100 dark:border-zinc-900 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-3 group">
            <BrandLogo
              className="h-8 w-auto object-contain group-hover:scale-105 transition duration-200"
              priority
            />
          </Link>
          {isMobileOpen && (
            <button
              onClick={() => setIsMobileOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* User Bio Link Card */}
        <div className="p-3 mx-3 my-3 rounded-2xl bg-slate-100 dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-emerald-500/40 bg-slate-200 dark:bg-zinc-950 shrink-0">
              <img
                src={profile.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100"}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1">
                <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                  {profile.displayName}
                </span>
                <ShieldCheck className="w-3 h-3 text-emerald-500 dark:text-emerald-400 shrink-0" />
              </div>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono truncate block">
                lynk.id/{profile.username}
              </span>
            </div>
          </div>

          <a
            href={`/${profile.username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-lg bg-white dark:bg-zinc-800 hover:bg-emerald-500 hover:text-zinc-950 text-slate-600 dark:text-zinc-400 border border-slate-200 dark:border-transparent transition shrink-0"
            title="Buka Halaman Bio"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Navigation Menus */}
        <div className="px-3 space-y-6 overflow-y-auto max-h-[calc(100vh-270px)] scrollbar-none custom-scrollbar pb-6">
          {/* Menu Utama */}
          <div className="space-y-1">
            <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500 mb-2">
              Menu Utama
            </p>
            {mainNavItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition ${
                    active
                      ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 font-bold border border-emerald-500/20 shadow-sm"
                      : "text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-900/60"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-4 h-4 ${
                        active ? "text-emerald-600 dark:text-emerald-400" : "text-slate-400 dark:text-zinc-500"
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 font-bold border border-emerald-500/30">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Monetisasi & Growth */}
          <div className="space-y-1">
            <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500 mb-2">
              Monetisasi & Creator Tools
            </p>
            {creatorTools.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition ${
                    active
                      ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 font-bold border border-emerald-500/20 shadow-sm"
                      : "text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-900/60"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-4 h-4 ${
                        active ? "text-emerald-600 dark:text-emerald-400" : "text-slate-400 dark:text-zinc-500"
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Sistem & Pengaturan */}
          <div className="space-y-1">
            <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500 mb-2">
              Akun & Bantuan
            </p>
            {systemNav.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition ${
                    active
                      ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 font-bold border border-emerald-500/20 shadow-sm"
                      : "text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-900/60"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-4 h-4 ${
                        active ? "text-emerald-600 dark:text-emerald-400" : "text-slate-400 dark:text-zinc-500"
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Profile / Plan info */}
      <div className="p-3 border-t border-slate-100 dark:border-zinc-900 bg-white dark:bg-zinc-950">
        <div className="p-3 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-zinc-900 border border-emerald-500/30">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-black uppercase text-emerald-700 dark:text-emerald-400 tracking-wider">
              Paket PRO Studio
            </span>
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <p className="text-[11px] font-bold text-slate-800 dark:text-white">Akses Aset Tak Terbatas</p>
          <p className="text-[10px] text-slate-500 dark:text-zinc-400 mt-0.5">Semua fitur monetisasi aktif</p>
        </div>

        {/* Functional Logout Button */}
        <button
          onClick={() => {
            if (confirm("Keluar dari dashboard Sinergi Visual Lynk?")) {
              document.cookie = "sv_auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;";
              window.location.href = "/login";
            }
          }}
          className="w-full mt-2 py-2 px-3 rounded-xl bg-slate-100 hover:bg-rose-50 dark:bg-zinc-900 dark:hover:bg-rose-950/40 border border-slate-200 hover:border-rose-300 dark:border-zinc-800 dark:hover:border-rose-500/30 text-slate-600 hover:text-rose-600 dark:text-zinc-400 dark:hover:text-rose-400 text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Keluar Akun (Logout)</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar (Fixed width 260px) */}
      <aside className="hidden lg:block w-64 shrink-0 h-screen sticky top-0 z-30">
        <SidebarContent />
      </aside>

      {/* Mobile Header Bar & Drawer Toggle */}
      <div className="lg:hidden sticky top-0 z-40 bg-white dark:bg-zinc-950 border-b border-slate-200 dark:border-zinc-900 px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => setIsMobileOpen(true)}
          className="p-2 rounded-xl bg-slate-100 dark:bg-zinc-900 text-slate-700 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-zinc-800"
        >
          <Menu className="w-5 h-5" />
        </button>

        <BrandLogo
          className="h-7 w-auto object-contain"
          priority
        />

        <a
          href={`/${profile.username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-xl bg-emerald-500 text-zinc-950 text-xs font-bold"
        >
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {/* Mobile Drawer Overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setIsMobileOpen(false)}
        >
          <div
            className="w-72 h-full bg-white dark:bg-zinc-950 shadow-2xl animate-in slide-in-from-left duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <SidebarContent />
          </div>
        </div>
      )}
    </>
  );
}
