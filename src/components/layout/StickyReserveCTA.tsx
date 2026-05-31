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
                    className="flex w-full items-center justify-between gap-3 py-4 px-5 bg-[#f5efe6] text-[#1a1310] font-bold"
                    style={{ fontFamily: "var(--font-inter)" }}
                >
                    <span
                        className="text-base tracking-[0.04em]"
                        style={{ fontVariantNumeric: "tabular-nums" }}
                    >
                        ¥9,800<span className="text-[11px] ml-0.5">〜/人</span>
                    </span>
                    <span className="text-sm tracking-[0.25em]">
                        空室確認
                    </span>
                </BookingLink>
            </div>
        </div>
    );
}
