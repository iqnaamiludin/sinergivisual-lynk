"use client";

import React from "react";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { DashboardTopbar } from "@/components/dashboard/dashboard-topbar";
import { useStoreHydration } from "@/hooks/use-store-hydration";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const hydrated = useStoreHydration();

  if (!hydrated) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#0B0F17] text-slate-900 dark:text-slate-100 flex flex-col items-center justify-center space-y-4">
        <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-slate-500 dark:text-zinc-400 font-mono">
          Memuat Sinergi Visual Lynk Dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-[#0B0F17] dark:text-slate-100 flex flex-col lg:flex-row selection:bg-emerald-500 selection:text-white transition-colors duration-200">
      {/* Sidebar Navigation (Persistent on Desktop, Drawer on Mobile) */}
      <DashboardSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardTopbar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
