import "./globals.css";

import { Section, Container } from "@/components/craft";
import { Poppins } from "next/font/google";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Footer } from "@/components/footer";
import { cn } from "@/lib/utils";
import { MainNav } from "@/components/nav/main-nav";
import { Analytics } from "@vercel/analytics/react";
import { siteConfig } from "@/site.config";

import type { Metadata } from "next";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "WordPress & Next.js Starter by 9d8",
  description:
    "A starter template for Next.js with WordPress as a headless CMS.",
  metadataBase: new URL(siteConfig.site_domain),
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={cn("min-h-screen font-sans antialiased", font.variable)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <MainNav />
          <main className="pt-24">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}


