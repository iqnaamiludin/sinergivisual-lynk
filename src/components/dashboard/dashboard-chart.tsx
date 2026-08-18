"use client";

import React, { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Eye, MousePointerClick, Calendar } from "lucide-react";

export function DashboardChart() {
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d" | "1y">("30d");

  const data7d = [
    { date: "Sen, 12", views: 240, clicks: 110 },
    { date: "Sel, 13", views: 320, clicks: 155 },
    { date: "Rab, 14", views: 290, clicks: 140 },
    { date: "Kam, 15", views: 480, clicks: 230 },
    { date: "Jum, 16", views: 610, clicks: 310 },
    { date: "Sab, 17", views: 750, clicks: 420 },
    { date: "Min, 18", views: 890, clicks: 495 },
  ];

  const data30d = [
    { date: "Wk 1", views: 1850, clicks: 920 },
    { date: "Wk 2", views: 2400, clicks: 1250 },
    { date: "Wk 3", views: 3100, clicks: 1680 },
    { date: "Wk 4", views: 4250, clicks: 2340 },
  ];

  const data90d = [
    { date: "Bln 1", views: 8200, clicks: 4100 },
    { date: "Bln 2", views: 11500, clicks: 5800 },
    { date: "Bln 3", views: 15400, clicks: 8200 },
  ];

  const data1y = [
    { date: "Q1", views: 24000, clicks: 12000 },
    { date: "Q2", views: 32000, clicks: 16500 },
    { date: "Q3", views: 41000, clicks: 21800 },
    { date: "Q4", views: 56000, clicks: 29400 },
  ];

  const getData = () => {
    switch (timeRange) {
      case "7d":
        return data7d;
      case "90d":
        return data90d;
      case "1y":
        return data1y;
      case "30d":
      default:
        return data30d;
    }
  };

  const chartData = getData();
  const totalViews = chartData.reduce((sum, item) => sum + item.views, 0);
  const totalClicks = chartData.reduce((sum, item) => sum + item.clicks, 0);
  const avgCtr = ((totalClicks / (totalViews || 1)) * 100).toFixed(1);

  return (
    <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-zinc-900/90 border border-slate-200 dark:border-zinc-800 shadow-sm space-y-6 transition-colors duration-200">
      {/* Chart Header with Metrics & Date Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Total Views & Clicks
            </h3>
            <span className="px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-500/30 text-[10px] font-bold text-emerald-700 dark:text-emerald-400">
              CTR: {avgCtr}%
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
            Statistik kunjungan halaman bio dan total interaksi klik aset video
          </p>
        </div>

        {/* Date Filter Buttons */}
        <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 self-start sm:self-auto">
          {[
            { id: "7d", label: "7 Hari" },
            { id: "30d", label: "30 Hari" },
            { id: "90d", label: "90 Hari" },
            { id: "1y", label: "1 Tahun" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setTimeRange(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                timeRange === tab.id
                  ? "bg-white dark:bg-zinc-800 text-emerald-600 dark:text-emerald-400 font-bold shadow-sm"
                  : "text-slate-500 hover:text-slate-900 dark:text-zinc-500 dark:hover:text-zinc-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Legend & Stats Quick Counters */}
      <div className="grid grid-cols-2 gap-4 max-w-sm">
        <div className="p-3 rounded-2xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800/80 flex items-center gap-3">
          <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-500/30 text-emerald-600 dark:text-emerald-400">
            <Eye className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] text-slate-500 dark:text-zinc-500 font-semibold block">
              Total Views
            </span>
            <span className="text-sm font-extrabold text-slate-900 dark:text-white">
              {totalViews.toLocaleString("id-ID")}
            </span>
          </div>
        </div>

        <div className="p-3 rounded-2xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800/80 flex items-center gap-3">
          <div className="p-2 rounded-xl bg-indigo-100 dark:bg-indigo-950/60 border border-indigo-300 dark:border-indigo-500/30 text-indigo-600 dark:text-indigo-400">
            <MousePointerClick className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] text-slate-500 dark:text-zinc-500 font-semibold block">
              Total Clicks
            </span>
            <span className="text-sm font-extrabold text-slate-900 dark:text-white">
              {totalClicks.toLocaleString("id-ID")}
            </span>
          </div>
        </div>
      </div>

      {/* Area Chart Component */}
      <div className="h-64 sm:h-72 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="viewsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="clicksGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-zinc-800" vertical={false} />
            <XAxis
              dataKey="date"
              stroke="#94a3b8"
              fontSize={11}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#94a3b8"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => (v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v)}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(15, 23, 42, 0.95)",
                borderColor: "#334155",
                borderRadius: "0.75rem",
                color: "#ffffff",
                fontSize: "12px",
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)",
              }}
              itemStyle={{ color: "#ffffff" }}
            />
            <Area
              type="monotone"
              dataKey="views"
              name="Views"
              stroke="#10b981"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#viewsGradient)"
            />
            <Area
              type="monotone"
              dataKey="clicks"
              name="Clicks"
              stroke="#6366f1"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#clicksGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
