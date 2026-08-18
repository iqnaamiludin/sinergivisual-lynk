"use client";

import React from "react";
import { BlockType } from "@/types/builder";
import { BLOCK_TEMPLATES } from "@/lib/constants";
import { X, Link2, Sparkles, PlayCircle, Heading, Plus } from "lucide-react";

interface AddBlockModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectType: (type: BlockType, template?: any) => void;
}

export function AddBlockModal({
  isOpen,
  onClose,
  onSelectType,
}: AddBlockModalProps) {
  if (!isOpen) return null;

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case "Link2":
        return <Link2 className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />;
      case "Sparkles":
        return <Sparkles className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />;
      case "PlayCircle":
        return <PlayCircle className="w-5 h-5 text-rose-500 dark:text-rose-400" />;
      case "Heading":
        return <Heading className="w-5 h-5 text-amber-500 dark:text-amber-400" />;
      default:
        return <Plus className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-xl overflow-hidden rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 shadow-2xl text-slate-900 dark:text-white animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-zinc-800 bg-slate-50/80 dark:bg-zinc-950/60">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Tambah Blok Baru</h3>
            <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
              Pilih jenis konten yang ingin ditambahkan ke halaman bio tim
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:text-zinc-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Block Types Grid */}
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-h-[70vh] overflow-y-auto">
          {BLOCK_TEMPLATES.map((item) => (
            <button
              key={item.type}
              onClick={() => {
                onSelectType(item.type, item.template);
                onClose();
              }}
              className="group text-left p-4 rounded-2xl bg-slate-50 dark:bg-zinc-950/70 hover:bg-slate-100 dark:hover:bg-zinc-800/80 border border-slate-200 dark:border-zinc-800 hover:border-emerald-300 dark:hover:border-zinc-600 transition-all duration-200 flex flex-col justify-between hover:shadow-md active:scale-[0.98] cursor-pointer"
            >
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700/80 group-hover:scale-110 transition shadow-sm">
                  {renderIcon(item.icon)}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition">
                <span>Gunakan Template Ini</span>
                <Plus className="w-4 h-4" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
