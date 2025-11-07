import Link from "next/link";
import Image from "next/image";
import { Section } from "@/components/craft";
import { siteConfig } from "@/site.config";
import { mainMenu, contentMenu } from "@/menu.config";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Separator } from "@/components/ui/separator";
import Logo from "../../public/images/cannafeatured-logo-small.svg";

export function Footer() {
  return (
    <footer className="bg-surface mt-24 py-16">
      <div className="container">
        <div className="grid gap-12 md:grid-cols-[2fr_1fr_1fr]">
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <Image
                src={Logo}
                alt={siteConfig.site_name}
                width={42}
                height={26.44}
                className="dark:invert"
              />
            </Link>
            <p className="text-muted-foreground max-w-xs">
              {siteConfig.site_description}
            </p>
          </div>
          
          <div className="space-y-4">
            <h5 className="font-medium">Website</h5>
            <div className="flex flex-col gap-2">
              {Object.entries(mainMenu).map(([key, href]) => (
                <Link
                  key={href}
                  href={href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h5 className="font-medium">Content</h5>
            <div className="flex flex-col gap-2">
              {Object.entries(contentMenu).map(([key, href]) => (
                <Link
                  key={href}
                  href={href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </Link>
              ))}
            </div>
          </div>
        </div>
        
        <Separator className="my-8 bg-border/10" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <ThemeToggle />
          </div>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()}{" "}
            <a
              href="https://9d8.dev"
              target="_blank"
              rel="noopener"
              className="hover:text-foreground transition-colors"
            >
              9d8
            </a>
            . All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}