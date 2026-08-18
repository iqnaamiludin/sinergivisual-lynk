"use client";

import React, { useState } from "react";
import { X, Copy, Check, Share2, MessageCircle, QrCode } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  username: string;
  displayName: string;
}

export function ShareModal({
  isOpen,
  onClose,
  username,
  displayName,
}: ShareModalProps) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"link" | "qrcode">("link");

  if (!isOpen) return null;

  const currentUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/${username}`
      : `https://lynk.sinergivisual.com/${username}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${displayName} - Sinergi Visual Lynk`,
          text: `Kunjungi profil link dan aset digital gratis dari ${displayName}:`,
          url: currentUrl,
        });
      } catch (err) {
        console.error("Share failed", err);
      }
    } else {
      handleCopy();
    }
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(
      `Halo! Cek link profil dan unduh aset video editing gratis dari ${displayName}:\n${currentUrl}`
    );
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-md overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-700 p-6 shadow-2xl text-white animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-emerald-400" />
            <h3 className="text-lg font-bold text-white">Bagikan Profil</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex rounded-xl bg-zinc-950 p-1 mt-4 border border-zinc-800">
          <button
            onClick={() => setActiveTab("link")}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition ${
              activeTab === "link"
                ? "bg-zinc-800 text-white shadow-sm"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            Salin Link & Share
          </button>
          <button
            onClick={() => setActiveTab("qrcode")}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition ${
              activeTab === "qrcode"
                ? "bg-zinc-800 text-white shadow-sm"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>QR Code</span>
          </button>
        </div>

        {activeTab === "link" ? (
          <div className="mt-5 space-y-4">
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1.5">
                URL Bio Link Anda:
              </label>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-zinc-950 border border-zinc-800">
                <input
                  type="text"
                  readOnly
                  value={currentUrl}
                  className="flex-1 bg-transparent text-xs text-zinc-200 font-mono focus:outline-none px-2 select-all"
                />
                <button
                  onClick={handleCopy}
                  className="px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-xs font-bold flex items-center gap-1.5 transition shrink-0"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Salin</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={handleWhatsAppShare}
                className="py-2.5 px-3 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-900/60 text-xs font-semibold flex items-center justify-center gap-2 transition"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Share WhatsApp</span>
              </button>
              <button
                onClick={handleNativeShare}
                className="py-2.5 px-3 rounded-xl bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 hover:bg-indigo-900/60 text-xs font-semibold flex items-center justify-center gap-2 transition"
              >
                <Share2 className="w-4 h-4 text-indigo-400" />
                <span>Menu Share</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-5 flex flex-col items-center space-y-4">
            <div className="p-4 rounded-2xl bg-white shadow-xl">
              <QRCodeSVG
                value={currentUrl}
                size={180}
                bgColor="#ffffff"
                fgColor="#090d0b"
                level="Q"
                includeMargin={false}
              />
            </div>
            <p className="text-xs text-center text-zinc-400 max-w-xs">
              Scan barcode ini dengan kamera ponsel untuk langsung membuka profil{" "}
              <span className="text-emerald-400 font-semibold">@{username}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
