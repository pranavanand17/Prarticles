import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-ui",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-article",
  display: "swap",
});

/** Set in CI for GitHub Pages (`NEXT_PUBLIC_SITE_URL`). Falls back for local dev. */
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl.endsWith("/") ? siteUrl : `${siteUrl}/`),
  title: {
    default: "Prarticles",
    template: "%s · Prarticles",
  },
  description: "I write stuff.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${lora.variable}`}>
      <body className="font-sans">
        <ThemeProvider>
          <SiteHeader />
          <main className="transition-colors duration-200 ease-smooth">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
