import type { Metadata } from "next";
import { Inter, Noto_Serif_JP, Noto_Sans_JP } from "next/font/google";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Footer } from "@/components/layout/Footer";
import { StickyReserveCTA } from "@/components/layout/StickyReserveCTA";
import { siteContent } from "@/config/siteContent";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const notoSerifJp = Noto_Serif_JP({ weight: ["400", "500", "700"], subsets: ["latin"], variable: "--font-noto-serif-jp" });
const notoSansJp = Noto_Sans_JP({ weight: ["300", "400", "500", "700"], subsets: ["latin"], variable: "--font-noto-sans-jp" });

export const metadata: Metadata = {
    title: { default: siteContent.site.name, template: `%s | ${siteContent.site.name}` },
    description: siteContent.site.description,
    metadataBase: new URL(siteContent.site.url),
    openGraph: {
        title: siteContent.site.name,
        description: siteContent.site.description,
        url: siteContent.site.url,
        siteName: siteContent.site.name,
        type: "website",
        locale: "ja_JP",
        images: [{ url: siteContent.hero.images[0], width: 1200, height: 630, alt: siteContent.site.name }],
    },
    twitter: {
        card: "summary_large_image",
        title: siteContent.site.name,
        description: siteContent.site.description,
        images: [siteContent.hero.images[0]],
    },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="ja">
            <body
                className={`${inter.variable} ${notoSerifJp.variable} ${notoSansJp.variable} antialiased bg-bg text-ink-soft`}
                style={{ fontFamily: "var(--font-noto-sans-jp), sans-serif" }}
            >
                <SiteHeader />
                {children}
                <Footer />
                <StickyReserveCTA />
            </body>
        </html>
    );
}
