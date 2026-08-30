"use client";

import { useEffect, useState } from "react";
import { ViewerCounter } from "@/components/ui/ViewerCounter";
import { DateRangeSearch } from "@/components/ui/DateRangeSearch";

/**
 * モバイル下部に常駐する日付検索バー (mysa bookbar 同型・金額表示なし)。
 * バーをタップするとカレンダーが上に開き、日付を直接タップして期間選択→予約遷移。
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
                <div className="flex justify-center">
                    <DateRangeSearch ctaId="sticky" dropUp />
                </div>
            </div>
        </div>
    );
}
