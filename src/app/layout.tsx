import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Noto_Serif_JP, Noto_Sans_JP } from "next/font/google";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Footer } from "@/components/layout/Footer";
import { StickyReserveCTA } from "@/components/layout/StickyReserveCTA";
import { ShareButton } from "@/components/ui/ShareButton";
import { UtmCapture } from "@/components/UtmCapture";
import { siteContent } from "@/config/siteContent";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const notoSerifJp = Noto_Serif_JP({ weight: ["400", "500", "700"], subsets: ["latin"], variable: "--font-noto-serif-jp" });
const notoSansJp = Noto_Sans_JP({ weight: ["300", "400", "500", "700"], subsets: ["latin"], variable: "--font-noto-sans-jp" });

export const metadata: Metadata = {
    title: { default: siteContent.site.name, template: `%s | ${siteContent.site.name}` },
    description: siteContent.site.description,
    metadataBase: new URL(siteContent.site.url),
    other: {
        "rt-property": siteContent.tracker.propertyId,
    },
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
    const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
    return (
        <html lang="ja">
            <body
                className={`${inter.variable} ${notoSerifJp.variable} ${notoSansJp.variable} antialiased bg-bg text-ink-soft`}
                style={{ fontFamily: "var(--font-noto-sans-jp), sans-serif" }}
            >
                <UtmCapture />
                {metaPixelId && (
                    <Script id="meta-pixel" strategy="afterInteractive">
                        {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${metaPixelId}');fbq('track','PageView');`}
                    </Script>
                )}
                <SiteHeader />
                {children}
                <Footer />
                <StickyReserveCTA />
                <ShareButton />
                <Script
                    src={`${siteContent.tracker.origin}/api/site-tracker-js`}
                    strategy="afterInteractive"
                />
            </body>
        </html>
    );
}
