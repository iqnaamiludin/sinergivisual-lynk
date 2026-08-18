"use client";

import React, { useState } from "react";
import { BlockItem } from "@/types/builder";
import { X, Download, Sparkles, CheckCircle2, FileArchive, Layers, ExternalLink } from "lucide-react";
import confetti from "canvas-confetti";

interface DigitalProductModalProps {
  product: BlockItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export function DigitalProductModal({
  product,
  isOpen,
  onClose,
}: DigitalProductModalProps) {
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  if (!isOpen || !product) return null;

  const triggerDownload = () => {
    setDownloading(true);

    // Trigger confetti animation
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#10b981", "#6366f1", "#f59e0b", "#ec4899", "#3b82f6"],
    });

    setTimeout(() => {
      setDownloading(false);
      setDownloaded(true);

      // Trigger download if url exists
      if (product.downloadUrl && product.downloadUrl.startsWith("http")) {
        const link = document.createElement("a");
        link.href = product.downloadUrl;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.click();
      }
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-700 shadow-2xl text-white animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Image / Thumbnail Banner */}
        {product.thumbnail ? (
          <div className="relative h-44 w-full overflow-hidden bg-zinc-950">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent" />
            <button
              onClick={onClose}
              className="absolute top-3 right-3 p-2 rounded-full bg-black/60 text-white/80 hover:text-white hover:bg-black/90 transition backdrop-blur-md"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="absolute bottom-3 left-4 flex items-center gap-2">
              <span className="px-2.5 py-1 text-xs font-bold uppercase tracking-wider rounded-md bg-emerald-500 text-zinc-950 shadow-md">
                {product.price || "FREE"}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-zinc-400 line-through">
                  {product.originalPrice}
                </span>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between p-4 border-b border-zinc-800 bg-zinc-950/60">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 text-xs font-bold uppercase tracking-wider rounded-md bg-emerald-500 text-zinc-950 shadow-md">
                {product.price || "FREE"}
              </span>
              <span className="text-xs text-emerald-400 flex items-center gap-1 font-medium">
                <Sparkles className="w-3.5 h-3.5" /> Digital Asset Vault
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Modal Content */}
        <div className="p-5 space-y-4">
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight">
              {product.title}
            </h3>
            {product.subtitle && (
              <p className="text-sm text-zinc-400 mt-1">{product.subtitle}</p>
            )}
          </div>

          {/* Asset Meta Badges */}
          <div className="flex flex-wrap gap-2 pt-1">
            {product.fileType && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-zinc-800/90 border border-zinc-700/60 text-xs text-zinc-300 font-medium">
                <FileArchive className="w-3.5 h-3.5 text-indigo-400" />
                <span>{product.fileType}</span>
              </div>
            )}
            {product.tags &&
              product.tags.map((tag, idx) => (
                <div
                  key={idx}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-950/40 border border-emerald-500/20 text-xs text-emerald-400 font-medium"
                >
                  <Layers className="w-3 h-3" />
                  <span>{tag}</span>
                </div>
              ))}
          </div>

          {/* Description */}
          {product.description && (
            <div className="p-3.5 rounded-xl bg-zinc-950/60 border border-zinc-800/80 text-xs text-zinc-300 leading-relaxed">
              <p className="font-semibold text-zinc-200 mb-1">Tentang Aset Ini:</p>
              <p>{product.description}</p>
            </div>
          )}

          {/* Instant Download Action */}
          <div className="pt-2">
            {!downloaded ? (
              <button
                onClick={triggerDownload}
                disabled={downloading}
                className="w-full py-3.5 px-5 rounded-xl font-bold text-sm bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-zinc-950 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-[0.98] transition cursor-pointer disabled:opacity-75"
              >
                {downloading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin" />
                    <span>Menyiapkan Berkas Aset...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>Unduh Aset Sekarang (100% Gratis)</span>
                  </>
                )}
              </button>
            ) : (
              <div className="space-y-2">
                <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 flex items-center gap-3 text-emerald-300 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <p className="font-semibold text-white">Unduhan Berhasil Dimulai!</p>
                    <p className="text-xs text-emerald-300/80">File sedang didownload ke perangkat Anda.</p>
                  </div>
                </div>
                {product.downloadUrl && (
                  <a
                    href={product.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 px-4 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-zinc-300 flex items-center justify-center gap-1.5 transition"
                  >
                    <span>Klik jika unduhan tidak otomatis dimulai</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            )}
          </div>

          <p className="text-[11px] text-center text-zinc-500">
            Aset didistribusikan secara resmi & bebas royalti oleh tim Sinergi Visual.
          </p>
        </div>
      </div>
    </div>
  );
}
