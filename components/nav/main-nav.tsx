"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { mainMenu } from "@/menu.config";
import { siteConfig } from "@/site.config";
import { MobileNav } from "./mobile-nav";
import { cn } from "@/lib/utils";
import Logo from "@/public/logo.svg";

export function MainNav() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      setIsScrolled(scrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed w-full top-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-surface/80 backdrop-blur-sm shadow-lg py-4"
          : "bg-transparent py-6"
      )}
    >
      <div className="container flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <Image
            src={Logo}
            alt={siteConfig.site_name}
            width={42}
            height={26.44}
            className="dark:invert"
          />
          <span className="font-bold text-lg">{siteConfig.site_name}</span>
        </Link>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-1">
            {Object.entries(mainMenu).map(([key, href]) => (
              <Button key={href} variant="ghost" size="sm" asChild>
                <Link href={href}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </Link>
              </Button>
            ))}
          </div>
          
          <Button asChild className="hidden sm:flex">
            <Link href="https://github.com/9d8dev/next-wp">Get Started</Link>
          </Button>
          
          <MobileNav />
        </div>
      </div>
    </nav>
  );
}