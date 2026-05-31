"use client";

import { useEffect, useState } from "react";
import { siteContent } from "@/config/siteContent";
import { ViewerCounter } from "@/components/ui/ViewerCounter";
import { BookingLink } from "@/components/ui/BookingLink";

/**
 * モバイル下部に常駐する予約CTA。
 * 一定スクロール後に表示。
 */
export function StickyReserveCTA() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > 600);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <div
            className={[
                "fixed bottom-0 left-0 right-0 z-30 md:hidden transition-all duration-500",
                visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0",
            ].join(" ")}
        >
            <div className="px-4 pb-4 pt-3 bg-gradient-to-t from-[#1a1310] via-[#1a1310]/95 to-transparent">
                <div className="text-center mb-2">
                    <ViewerCounter className="text-[#d8cfc1]" />
                </div>
                <BookingLink
                    baseUrl={siteContent.booking.url}
                    className="group flex w-full items-center justify-between gap-3 py-4 px-5 rounded-full bg-white text-[#1a1310] font-bold transition-all duration-300"
                    style={{
                        fontFamily: "var(--font-inter)",
                        boxShadow: "0 8px 28px -4px rgba(0,0,0,0.45), 0 2px 8px -2px rgba(0,0,0,0.25)",
                    }}
                >
                    <span className="flex items-baseline gap-1" style={{ fontVariantNumeric: "tabular-nums" }}>
                        <span className="text-lg tracking-[0.02em]">¥9,800</span>
                        <span className="text-[10px] tracking-[0.04em] text-[#1a1310]/65">〜/人</span>
                    </span>
                    <span className="flex items-center gap-2 text-[12px] tracking-[0.22em]">
                        空室確認
                        <span aria-hidden className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </span>
                </BookingLink>
            </div>
        </div>
    );
}
