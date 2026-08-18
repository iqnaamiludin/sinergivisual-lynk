"use client";

import React, { useState } from "react";
import { BlockItem, ProfileData, ThemeConfig } from "@/types/builder";
import {
  CheckCircle2,
  Share2,
  ExternalLink,
  Download,
  Sparkles,
  Play,
  Globe,
  Mail,
  MessageCircle,
  FileArchive,
  Layers,
} from "lucide-react";
import { VideoPlayerEmbed } from "./video-player-embed";
import { DigitalProductModal } from "./digital-product-modal";
import { ShareModal } from "./share-modal";

interface PublicBioViewProps {
  profile: ProfileData;
  theme: ThemeConfig;
  blocks: BlockItem[];
  isPreview?: boolean;
  onBlockClick?: (blockId: string) => void;
}

export function PublicBioView({
  profile,
  theme,
  blocks,
  isPreview = false,
  onBlockClick,
}: PublicBioViewProps) {
  const [selectedProduct, setSelectedProduct] = useState<BlockItem | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const activeBlocks = blocks.filter((b) => b.active);

  // High quality SVG Brand icons
  const renderSocialIcon = (platform: string) => {
    switch (platform) {
      case "instagram":
        return (
          <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
          </svg>
        );
      case "youtube":
        return (
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
        );
      case "tiktok":
        return (
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 2.89 3.5 2.76 1.42-.03 2.67-.97 3.09-2.32.14-.44.2-.9.2-1.36.03-4.48.01-8.96.01-13.44z" />
          </svg>
        );
      case "behance":
        return (
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-4.062 0-5.625-3.078-5.625-6s1.633-6 5.625-6c4.086 0 5.375 3.078 5.375 6 0 .422-.031.781-.078 1.156h-8.891c.078 1.625 1.094 3.094 3.594 3.094 1.609 0 2.703-.781 3.109-1.25zm-2.156-4.5c-.094-1.438-1.047-2.75-3.047-2.75s-2.875 1.266-3.047 2.75h6.094zm-14.57-7.5h-7v14h7.031c2.812 0 4.969-1.578 4.969-4.219 0-1.719-1.047-3.078-2.625-3.594 1.234-.516 2.094-1.688 2.094-3.219 0-2.281-1.734-2.968-4.469-2.968zm-4.75 2.25h4.156c1.172 0 2.344.406 2.344 1.813 0 1.344-1.078 1.938-2.344 1.938h-4.156v-3.751zm0 5.75h4.438c1.375 0 2.562.594 2.562 2.094 0 1.547-1.188 2.156-2.562 2.156h-4.438v-4.25z" />
          </svg>
        );
      case "github":
        return (
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
          </svg>
        );
      case "linkedin":
        return (
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
          </svg>
        );
      case "twitter":
        return (
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        );
      case "whatsapp":
        return <MessageCircle className="w-4 h-4" />;
      case "email":
        return <Mail className="w-4 h-4" />;
      default:
        return <Globe className="w-4 h-4" />;
    }
  };

  // Dynamic Button Shape & Hover Effects
  const getButtonClass = () => {
    let shape = "rounded-xl";
    switch (theme.buttonStyle) {
      case "rounded-full":
        shape = "rounded-full";
        break;
      case "rounded-2xl":
        shape = "rounded-2xl";
        break;
      case "hard-shadow":
        shape = "rounded-xl border-2 border-emerald-400 shadow-[4px_4px_0px_0px_rgba(16,185,129,1)]";
        break;
      case "glass":
        shape = "rounded-2xl backdrop-blur-md border border-white/20 shadow-lg";
        break;
      case "outline":
        shape = "rounded-xl border-2 bg-transparent shadow-sm";
        break;
      case "minimal":
        shape = "rounded-xl border border-white/10 shadow-none";
        break;
      case "rounded-xl":
      default:
        shape = "rounded-xl shadow-md";
        break;
    }

    let hover = "transition-all duration-200";
    switch (theme.buttonHoverEffect) {
      case "glow":
        hover += " hover:shadow-[0_0_25px_rgba(16,185,129,0.35)] hover:border-emerald-400/80";
        break;
      case "lift":
        hover += " hover:-translate-y-1 hover:shadow-2xl active:translate-y-0";
        break;
      case "scale":
        hover += " hover:scale-[1.02] active:scale-[0.98]";
        break;
      case "subtle":
      default:
        hover += " hover:opacity-90 active:scale-[0.99]";
        break;
    }

    return `${shape} ${hover}`;
  };

  // Dynamic Avatar Styling
  const getAvatarWrapperClass = () => {
    switch (theme.avatarStyle) {
      case "glow-badge":
        return "rounded-full border-2 border-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.4)]";
      case "square-curved":
        return "rounded-3xl border-2 border-white/30 shadow-2xl";
      case "minimal":
        return "rounded-full border border-white/20 shadow-sm";
      case "gradient-ring":
      default:
        return "rounded-full border-2 border-white/30 shadow-2xl ring-4 ring-emerald-500/20";
    }
  };

  // Font family selector
  const getFontFamilyClass = () => {
    switch (theme.fontFamily) {
      case "jakarta":
        return "font-[family-name:var(--font-jakarta)]";
      case "space":
        return "font-[family-name:var(--font-space)] font-mono";
      case "outfit":
        return "font-sans tracking-wide font-medium";
      case "inter":
      default:
        return "font-sans";
    }
  };

  const handleLinkClick = (block: BlockItem, e: React.MouseEvent) => {
    if (onBlockClick) {
      onBlockClick(block.id);
    }

    if (block.type === "product") {
      e.preventDefault();
      setSelectedProduct(block);
    }
  };

  return (
    <div
      className={`min-h-full w-full flex flex-col justify-between transition-colors duration-300 relative ${getFontFamilyClass()}`}
      style={{
        color: theme.textColor,
      }}
    >
      {/* Pattern Texture Overlay */}
      {theme.bgPattern === "grid" && (
        <div
          className="absolute inset-0 pointer-events-none opacity-15"
          style={{
            backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px)`,
            backgroundSize: "20px 20px",
          }}
        />
      )}
      {theme.bgPattern === "dots" && (
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: `radial-gradient(rgba(16, 185, 129, 0.3) 1.5px, transparent 1.5px)`,
            backgroundSize: "16px 16px",
          }}
        />
      )}

      {/* Main Profile Container */}
      <div className="relative z-10 w-full max-w-md mx-auto px-4 py-8 sm:py-10 flex-1 flex flex-col">
        {/* Top Header Floating Share Bar */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setIsShareModalOpen(true)}
            className="p-2.5 rounded-full bg-black/40 hover:bg-black/70 border border-white/15 text-white/80 hover:text-white transition backdrop-blur-md shadow-md cursor-pointer hover:scale-105 active:scale-95"
            title="Bagikan Profil"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>

        {/* Profile Header */}
        <div className="flex flex-col items-center text-center mb-7">
          {/* Avatar with dynamic ring */}
          <div className="relative group mb-3.5">
            {theme.avatarStyle === "gradient-ring" && (
              <div
                className="absolute -inset-1.5 rounded-full blur-md opacity-70 group-hover:opacity-100 transition duration-300 animate-pulse"
                style={{ backgroundColor: theme.accentColor }}
              />
            )}
            <div
              className={`relative w-24 h-24 overflow-hidden bg-zinc-950 ${getAvatarWrapperClass()}`}
            >
              <img
                src={profile.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80"}
                alt={profile.displayName}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Display Name & Verified Badge */}
          <div className="flex items-center justify-center gap-1.5 flex-wrap">
            <h1 className="text-xl sm:text-2xl font-black tracking-tight" style={{ color: theme.textColor }}>
              {profile.displayName}
            </h1>
            {profile.verified && (
              <span title={profile.badgeText || "Verified Studio"}>
                <CheckCircle2
                  className="w-4 h-4 fill-emerald-500 text-zinc-950 inline-block shrink-0 shadow-sm"
                />
              </span>
            )}
          </div>

          {/* Username */}
          <p
            className="text-xs font-semibold mt-0.5 tracking-wider opacity-85"
            style={{ color: theme.subtextColor }}
          >
            @{profile.username}
          </p>

          {/* Bio Description */}
          {profile.bio && (
            <p
              className="text-xs sm:text-sm mt-3 max-w-sm leading-relaxed opacity-90 px-2"
              style={{ color: theme.textColor }}
            >
              {profile.bio}
            </p>
          )}

          {/* Social Links Row */}
          {profile.socialLinks && profile.socialLinks.some((l) => l.active) && (
            <div className="mt-5 flex justify-center w-full">
              {theme.socialStyle === "pill-bar" ? (
                /* Floating Translucent Pill Bar */
                <div className="inline-flex items-center gap-1.5 p-1.5 rounded-full bg-black/40 border border-white/15 backdrop-blur-xl shadow-lg">
                  {profile.socialLinks
                    .filter((link) => link.active)
                    .map((link) => (
                      <a
                        key={link.id}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full hover:bg-white/20 text-white/90 hover:text-white hover:scale-110 active:scale-95 transition"
                        title={link.platform}
                      >
                        {renderSocialIcon(link.platform)}
                      </a>
                    ))}
                </div>
              ) : theme.socialStyle === "minimal-clean" ? (
                /* Minimal Icon Row */
                <div className="flex items-center gap-4 flex-wrap">
                  {profile.socialLinks
                    .filter((link) => link.active)
                    .map((link) => (
                      <a
                        key={link.id}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/80 hover:text-emerald-400 hover:scale-110 active:scale-95 transition"
                        title={link.platform}
                      >
                        {renderSocialIcon(link.platform)}
                      </a>
                    ))}
                </div>
              ) : (
                /* Circle Buttons (Default) */
                <div className="flex items-center justify-center gap-2.5 flex-wrap">
                  {profile.socialLinks
                    .filter((link) => link.active)
                    .map((link) => (
                      <a
                        key={link.id}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-full bg-white/10 hover:bg-white/25 border border-white/15 text-white/90 hover:text-white hover:scale-110 active:scale-95 transition backdrop-blur-md shadow-md"
                        title={link.platform}
                      >
                        {renderSocialIcon(link.platform)}
                      </a>
                    ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Blocks Container */}
        <div className="space-y-3.5 flex-1">
          {activeBlocks.length === 0 ? (
            <div className="text-center py-10 px-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-white/60">
              Belum ada blok aktif yang ditampilkan.
            </div>
          ) : (
            activeBlocks.map((block) => {
              // 1. SECTION HEADER
              if (block.type === "header") {
                return (
                  <div key={block.id} className="pt-4 pb-1 text-center">
                    {block.headerStyle === "divider" ? (
                      <div className="flex items-center gap-3">
                        <div className="h-px flex-1 bg-white/20" />
                        <span
                          className="text-xs font-bold uppercase tracking-wider px-2"
                          style={{ color: theme.subtextColor }}
                        >
                          {block.title}
                        </span>
                        <div className="h-px flex-1 bg-white/20" />
                      </div>
                    ) : block.headerStyle === "accent" ? (
                      <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-black tracking-wider uppercase backdrop-blur-sm">
                        <span style={{ color: theme.accentColor }}>{block.title}</span>
                      </div>
                    ) : (
                      <h3
                        className="text-xs font-extrabold uppercase tracking-widest"
                        style={{ color: theme.subtextColor }}
                      >
                        {block.title}
                      </h3>
                    )}
                  </div>
                );
              }

              // 2. VIDEO EMBED
              if (block.type === "video") {
                return (
                  <div
                    key={block.id}
                    className="rounded-2xl overflow-hidden bg-black/50 border border-white/15 p-3 shadow-xl backdrop-blur-md space-y-2.5"
                  >
                    <VideoPlayerEmbed
                      url={block.videoUrl || block.url}
                      title={block.title}
                      aspectRatio={block.videoAspectRatio || "16:9"}
                    />
                    <div className="px-1.5 py-1">
                      <h4
                        className="text-xs sm:text-sm font-bold leading-tight"
                        style={{ color: theme.textColor }}
                      >
                        {block.title}
                      </h4>
                      {block.subtitle && (
                        <p
                          className="text-[11px] mt-0.5 opacity-80"
                          style={{ color: theme.subtextColor }}
                        >
                          {block.subtitle}
                        </p>
                      )}
                    </div>
                  </div>
                );
              }

              // 3. DIGITAL PRODUCT BLOCK
              if (block.type === "product") {
                return (
                  <div
                    key={block.id}
                    onClick={(e) => handleLinkClick(block, e)}
                    className={`group relative overflow-hidden p-3.5 sm:p-4 cursor-pointer ${getButtonClass()}`}
                    style={{
                      backgroundColor:
                        theme.buttonStyle === "glass"
                          ? "rgba(255,255,255,0.08)"
                          : theme.buttonBg,
                      color: theme.buttonTextColor,
                      borderColor: theme.buttonBorderColor,
                    }}
                  >
                    <div className="flex items-center gap-3.5">
                      {/* Product Thumbnail */}
                      {block.thumbnail ? (
                        <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-black/20 bg-black/30 relative">
                          <img
                            src={block.thumbnail}
                            alt={block.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                          />
                          <div className="absolute top-0.5 right-0.5 p-1 rounded-md bg-black/60 backdrop-blur-sm text-emerald-400">
                            <Sparkles className="w-2.5 h-2.5" />
                          </div>
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-black/20 shrink-0">
                          <Sparkles className="w-5 h-5" />
                        </div>
                      )}

                      {/* Info & Price */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="px-1.5 py-0.5 text-[10px] font-black uppercase rounded bg-black/80 text-emerald-400 border border-emerald-500/30">
                            {block.price || "FREE"}
                          </span>
                          {block.fileType && (
                            <span className="text-[10px] opacity-75 font-mono truncate">
                              {block.fileType}
                            </span>
                          )}
                        </div>
                        <h4 className="text-xs sm:text-sm font-bold mt-1 truncate leading-snug">
                          {block.title}
                        </h4>
                        {block.subtitle && (
                          <p className="text-[11px] opacity-80 truncate mt-0.5">
                            {block.subtitle}
                          </p>
                        )}
                      </div>

                      {/* Download CTA Button */}
                      <div className="shrink-0 pl-1">
                        <div className="p-2.5 rounded-xl bg-black/20 group-hover:bg-black/40 group-hover:scale-110 active:scale-95 transition">
                          <Download className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              // 4. CUSTOM LINK BLOCK
              return (
                <a
                  key={block.id}
                  href={block.url || "#"}
                  target={isPreview ? "_self" : "_blank"}
                  rel="noopener noreferrer"
                  onClick={(e) => handleLinkClick(block, e)}
                  className={`group block p-3.5 sm:p-4 cursor-pointer ${getButtonClass()}`}
                  style={{
                    backgroundColor:
                      theme.buttonStyle === "glass"
                        ? "rgba(255,255,255,0.08)"
                        : theme.buttonBg,
                    color: theme.buttonTextColor,
                    borderColor: theme.buttonBorderColor,
                  }}
                >
                  <div className="flex items-center gap-3">
                    {block.thumbnail ? (
                      <div className="w-11 h-11 rounded-xl overflow-hidden shrink-0 border border-black/10 bg-black/20">
                        <img
                          src={block.thumbnail}
                          alt={block.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition"
                        />
                      </div>
                    ) : null}

                    <div className="flex-1 min-w-0 text-left">
                      <h4 className="text-xs sm:text-sm font-bold leading-tight truncate">
                        {block.title}
                      </h4>
                      {block.subtitle && (
                        <p className="text-[11px] opacity-80 truncate mt-0.5">
                          {block.subtitle}
                        </p>
                      )}
                    </div>

                    <div className="shrink-0 p-1.5 rounded-lg opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition">
                      <ExternalLink className="w-4 h-4" />
                    </div>
                  </div>
                </a>
              );
            })
          )}
        </div>

        {/* Footer Branding / Watermark */}
        {profile.showWatermark && (
          <div className="mt-10 pb-4 text-center">
            <a
              href="/"
              target={isPreview ? "_self" : "_blank"}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-black/50 hover:bg-black/80 border border-white/10 text-[11px] font-bold text-white/75 hover:text-white transition backdrop-blur-md shadow-md"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Sinergi Visual Lynk</span>
            </a>
          </div>
        )}
      </div>

      {/* Digital Product Modal */}
      <DigitalProductModal
        product={selectedProduct}
        isOpen={Boolean(selectedProduct)}
        onClose={() => setSelectedProduct(null)}
      />

      {/* Share Profile Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        username={profile.username}
        displayName={profile.displayName}
      />
    </div>
  );
}
