"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={`w-9 h-9 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/60 ${className}`}
      />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`p-2 rounded-xl transition-all duration-200 flex items-center justify-center cursor-pointer ${
        isDark
          ? "bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-amber-400 hover:text-amber-300 hover:border-amber-400/40 shadow-sm"
          : "bg-white hover:bg-zinc-100 border border-zinc-200 text-zinc-700 hover:text-zinc-950 shadow-sm"
      } ${className}`}
      title={
        isDark
          ? "Ganti ke Mode Terang (Light Mode)"
          : "Ganti ke Mode Gelap (Dark Mode)"
      }
      aria-label="Toggle Theme"
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-amber-400 animate-in spin-in-180 duration-200" />
      ) : (
        <Moon className="w-4 h-4 text-zinc-700 animate-in spin-in-180 duration-200" />
      )}
    </button>
  );
}
