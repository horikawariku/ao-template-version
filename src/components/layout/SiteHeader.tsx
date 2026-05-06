"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { siteContent } from "@/config/siteContent";
import { MobileDrawer } from "./MobileDrawer";

/**
 * 透過 → スクロールで背景フェード。
 * gozahills 風のミニマル: 中央 wordmark + 右上ハンバーガーのみ。
 */
export function SiteHeader() {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <>
            <header
                className={[
                    "fixed top-0 left-0 right-0 z-40 transition-colors duration-500",
                    scrolled ? "bg-[#1a1310]/90 backdrop-blur-md" : "bg-transparent",
                ].join(" ")}
            >
                <div className="flex items-center justify-between px-5 md:px-10 h-14 md:h-16">
                    <Link
                        href="/"
                        className={[
                            "tracking-[0.15em] text-[12px] md:text-[13px] font-light transition-colors",
                            scrolled ? "text-[#f5efe6]" : "text-white drop-shadow-sm",
                        ].join(" ")}
                        style={{ fontFamily: "var(--font-noto-serif-jp)" }}
                    >
                        {siteContent.site.name}
                    </Link>

                    <button
                        type="button"
                        aria-label="メニューを開く"
                        onClick={() => setOpen(true)}
                        className={[
                            "p-2 -mr-2 transition-colors",
                            scrolled ? "text-[#f5efe6]" : "text-white",
                        ].join(" ")}
                    >
                        <Menu size={22} strokeWidth={1.5} />
                    </button>
                </div>
            </header>

            <MobileDrawer open={open} onClose={() => setOpen(false)} />
        </>
    );
}
