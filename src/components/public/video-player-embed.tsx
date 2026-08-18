"use client";

import React from "react";

interface VideoPlayerEmbedProps {
  url: string;
  title?: string;
  aspectRatio?: "16:9" | "9:16" | "1:1";
  className?: string;
}

export function VideoPlayerEmbed({
  url,
  title = "Video Player",
  aspectRatio = "16:9",
  className = "",
}: VideoPlayerEmbedProps) {
  // Extract YouTube ID
  const getYouTubeEmbedUrl = (videoUrl: string) => {
    try {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
      const match = videoUrl.match(regExp);
      if (match && match[2].length === 11) {
        return `https://www.youtube.com/embed/${match[2]}?rel=0&modestbranding=1`;
      }
      // Check for shorts
      const shortsMatch = videoUrl.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/);
      if (shortsMatch && shortsMatch[1]) {
        return `https://www.youtube.com/embed/${shortsMatch[1]}?rel=0&modestbranding=1`;
      }
    } catch {
      return null;
    }
    return null;
  };

  // Extract Vimeo ID
  const getVimeoEmbedUrl = (videoUrl: string) => {
    try {
      const regExp = /(?:vimeo\.com\/|player\.vimeo\.com\/video\/)([0-9]+)/;
      const match = videoUrl.match(regExp);
      if (match && match[1]) {
        return `https://player.vimeo.com/video/${match[1]}`;
      }
    } catch {
      return null;
    }
    return null;
  };

  const ytEmbed = getYouTubeEmbedUrl(url);
  const vimeoEmbed = getVimeoEmbedUrl(url);

  const aspectClass =
    aspectRatio === "9:16"
      ? "aspect-[9/16] max-w-[320px] mx-auto"
      : aspectRatio === "1:1"
      ? "aspect-square"
      : "aspect-video";

  if (ytEmbed) {
    return (
      <div className={`w-full overflow-hidden rounded-xl bg-black/40 border border-white/10 shadow-lg ${aspectClass} ${className}`}>
        <iframe
          src={ytEmbed}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="w-full h-full border-0"
        />
      </div>
    );
  }

  if (vimeoEmbed) {
    return (
      <div className={`w-full overflow-hidden rounded-xl bg-black/40 border border-white/10 shadow-lg ${aspectClass} ${className}`}>
        <iframe
          src={vimeoEmbed}
          title={title}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          className="w-full h-full border-0"
        />
      </div>
    );
  }

  // Fallback direct HTML5 video or link
  return (
    <div className={`w-full overflow-hidden rounded-xl bg-zinc-900 border border-white/10 p-4 text-center ${aspectClass} ${className} flex flex-col items-center justify-center`}>
      <p className="text-sm text-zinc-400 mb-2">{title}</p>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-emerald-500 text-zinc-950 hover:bg-emerald-400 transition"
      >
        Tonton Video Eksternal ↗
      </a>
    </div>
  );
}
