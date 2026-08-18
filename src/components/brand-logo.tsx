"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";

interface BrandLogoProps {
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  forceTheme?: "dark" | "light";
  alt?: string;
}

export function BrandLogo({
  width = 150,
  height = 40,
  className = "h-8 sm:h-9 w-auto object-contain",
  priority = false,
  forceTheme,
  alt = "Sinergi Visual Lynk",
}: BrandLogoProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Determine active theme
  // Default to dark when rendering on server / before mount to avoid layout shift
  const isDark = forceTheme ? forceTheme === "dark" : mounted ? resolvedTheme === "dark" : true;

  // Dark Mode -> /images/logo.png (White/bright logo)
  // Light Mode -> /images/logo1.png (Dark logo)
  const logoSrc = isDark ? "/images/logo.png" : "/images/logo1.png";

  return (
    <Image
      src={logoSrc}
      alt={alt}
      width={width}
      height={height}
      className={`${className} transition-opacity duration-200`}
      priority={priority}
    />
  );
}
