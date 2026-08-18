"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
  ChevronRight,
  Menu,
  X,
  ShieldCheck,
} from "lucide-react";

export function DashboardSidebar() {
  const pathname = usePathname();
  const { profile } = useBuilderStore();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const mainNav = [
    { name: "Home", href: "/dashboard", icon: Home },
    { name: "My Lynk (Builder)", href: "/dashboard/builder", icon: Link2 },
    { name: "Appearance", href: "/dashboard/appearance", icon: Palette },
    { name: "Statistics", href: "/dashboard/statistics", icon: BarChart3 },
    {
      name: "Orders",
      href: "/dashboard/orders",
      icon: ShoppingBag,
      badge: "12",
    },
    { name: "My Purchase", href: "/dashboard/purchases", icon: CreditCard },
    { name: "Tutorials", href: "/dashboard/tutorials", icon: BookOpen },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  const marketingNav = [
    { name: "Affiliates", href: "/dashboard/affiliates", icon: Users },
    { name: "E-Mail Marketing", href: "/dashboard/email-marketing", icon: Mail },
    {
      name: "WhatsApp Blast",
      href: "/dashboard/whatsapp-blast",
      icon: MessageSquare,
    },
    { name: "Clip Campaign", href: "/dashboard/clip-campaign", icon: Video },
    {
      name: "Automate Workflow",
      href: "/dashboard/automations",
      icon: Workflow,
      badge: "Beta",
      badgeColor: "bg-indigo-500/20 text-indigo-400 border-indigo-500/30",
    },
    { name: "Vouchers", href: "/dashboard/vouchers", icon: Ticket },
  ];

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname.startsWith(href);
  };

  const SidebarContent = () => (
    <div className="flex flex-col justify-between h-full bg-zinc-950 text-zinc-300 select-none">
      {/* Top Brand & Bio Link Shortcut */}
      <div>
        {/* Brand Logo */}
        <div className="p-5 border-b border-zinc-900 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-3 group">
            <Image
              src="/images/logo.png"
              alt="Sinergi Visual Lynk"
              width={140}
              height={36}
              className="h-8 w-auto object-contain group-hover:scale-105 transition duration-200"
              priority
            />
          </Link>
          {isMobileOpen && (
            <button
              onClick={() => setIsMobileOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-zinc-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* User Bio Link Card */}
        <div className="p-3 mx-3 my-3 rounded-2xl bg-zinc-900/80 border border-zinc-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-emerald-500/40 bg-zinc-950 shrink-0">
              <img
                src={profile.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100"}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1">
                <span className="text-xs font-bold text-white truncate">
                  {profile.displayName}
                </span>
                <ShieldCheck className="w-3 h-3 text-emerald-400 shrink-0" />
              </div>
              <span className="text-[10px] text-emerald-400 font-mono truncate block">
                lynk.id/{profile.username}
              </span>
            </div>
          </div>

          <a
            href={`/${profile.username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-lg bg-zinc-800 hover:bg-emerald-500 hover:text-zinc-950 text-zinc-400 transition shrink-0"
            title="Buka Halaman Bio"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Navigation Menus */}
        <div className="px-3 space-y-6 overflow-y-auto max-h-[calc(100vh-270px)] scrollbar-none custom-scrollbar pb-6">
          {/* Menu Utama */}
          <div className="space-y-1">
            <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-2">
              Menu Utama
            </p>
            {mainNav.map((item) => {
              const active = isActive(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition ${
                    active
                      ? "bg-emerald-500 text-zinc-950 font-bold shadow-md shadow-emerald-500/20"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-900"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${active ? "text-zinc-950" : "text-zinc-400"}`} />
                    <span>{item.name}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                        active
                          ? "bg-zinc-950 text-emerald-400"
                          : "bg-emerald-950/60 text-emerald-400 border border-emerald-500/30"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Marketing Tools */}
          <div className="space-y-1 pt-2 border-t border-zinc-900">
            <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-2">
              Marketing Tools
            </p>
            {marketingNav.map((item) => {
              const active = isActive(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition ${
                    active
                      ? "bg-emerald-500 text-zinc-950 font-bold shadow-md shadow-emerald-500/20"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-900"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${active ? "text-zinc-950" : "text-zinc-400"}`} />
                    <span>{item.name}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={`px-1.5 py-0.5 rounded-md text-[9px] font-extrabold uppercase border ${
                        active
                          ? "bg-zinc-950 text-emerald-400 border-zinc-900"
                          : item.badgeColor ||
                            "bg-emerald-950/60 text-emerald-400 border-emerald-500/30"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom User Footer & Logout */}
      <div className="p-3 border-t border-zinc-900 bg-zinc-950 space-y-2">
        <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800/60 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] font-bold text-zinc-300">PRO Plan Active</span>
          </div>
          <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
            PRO
          </span>
        </div>

        <button
          onClick={() => {
            if (confirm("Keluar dari dashboard Sinergi Visual Lynk?")) {
              window.location.href = "/";
            }
          }}
          className="w-full py-2 px-3 rounded-xl hover:bg-rose-950/40 text-zinc-400 hover:text-rose-400 border border-transparent hover:border-rose-500/20 text-xs font-semibold flex items-center justify-center gap-2 transition"
        >
          <LogOut className="w-4 h-4" />
          <span>Keluar Akun</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Hamburger Toggle Bar */}
      <div className="lg:hidden sticky top-0 z-40 bg-zinc-950 border-b border-zinc-900 px-4 h-14 flex items-center justify-between">
        <button
          onClick={() => setIsMobileOpen(true)}
          className="p-2 rounded-xl bg-zinc-900 text-zinc-300 hover:text-white"
        >
          <Menu className="w-5 h-5" />
        </button>

        <Image
          src="/images/logo.png"
          alt="Sinergi Visual Lynk"
          width={120}
          height={30}
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

      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:flex w-64 h-screen sticky top-0 shrink-0 border-r border-zinc-900 z-30">
        <SidebarContent />
      </aside>

      {/* Mobile Drawer Overlay */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setIsMobileOpen(false)}
          />
          <div className="relative w-72 h-full z-10 animate-in slide-in-from-left duration-200 shadow-2xl">
            <SidebarContent />
          </div>
        </div>
      )}
    </>
  );
}
