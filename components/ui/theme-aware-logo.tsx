"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface ThemeAwareLogoProps {
  size?: "small" | "medium";
  className?: string;
}

export function ThemeAwareLogo({ size = "medium", className = "" }: ThemeAwareLogoProps) {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const currentTheme = resolvedTheme || theme || "dark";
  const isDark = currentTheme === "dark";
  
  // Use the same logo for now since the darkmode files have white text on white background
  // TODO: Replace with proper transparent/dark background logos for dark mode
  const logoSrc = `/images/cannafeatured-logo-${size}.svg`;
  
  // For dark mode, we'll need to use a logo with transparent background
  // Currently using the regular logo which may not be optimal for dark themes

  const width = size === "small" ? 100 : 140;
  const height = size === "small" ? 62.8 : 88;

  return (
    <Image
      alt="CannaFeatured"
      loading="lazy"
      width={width}
      height={height}
      decoding="async"
      src={logoSrc}
      className={`object-contain ${className}`}
    />
  );
}
