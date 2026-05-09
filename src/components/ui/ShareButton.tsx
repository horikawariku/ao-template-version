"use client";

import { useEffect, useState } from "react";
import { Share2 } from "lucide-react";
import { siteContent } from "@/config/siteContent";
import { readUtmCookie, UTM_KEYS_LIST } from "@/lib/useUtmPersist";

/**
 * 左下フローティングの LINE共有ボタン (アイコンのみ・小)。
 * スクロール400px以上で表示。共有URLには現在のUTMを継承し `via=line_share` を付与。
 *
 * モバイル: stickyCTAの上に配置 (bottom-[88px])
 * デスクトップ: 左下角 (bottom-6 left-6)
 */
export function ShareButton() {
    const [shareUrl, setShareUrl] = useState<string>(siteContent.site.url);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (typeof window === "undefined") return;
        const url = new URL(siteContent.site.url);
        const utm = readUtmCookie();
        UTM_KEYS_LIST.forEach((k) => {
            const v = utm[k];
            if (v) url.searchParams.set(k, v);
        });
        url.searchParams.set("via", "line_share");
        setShareUrl(url.toString());
    }, []);

    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > 400);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const text = `${siteContent.site.name}\n${siteContent.hero.wordmarkJp}`;
    const lineHref = `https://line.me/R/msg/text/?${encodeURIComponent(`${text}\n${shareUrl}`)}`;

    return (
        <a
            href={lineHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LINEで送る"
            className={[
                "fixed left-4 md:left-6 bottom-[88px] md:bottom-6 z-30",
                "w-11 h-11 rounded-full flex items-center justify-center",
                "bg-[#1f1610] text-[#f5efe6] border border-[#4a3a2f] shadow-lg",
                "transition-all duration-500 hover:bg-[#3E2820] hover:scale-110",
                visible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4 pointer-events-none",
            ].join(" ")}
        >
            <Share2 size={18} strokeWidth={1.5} />
        </a>
    );
}
