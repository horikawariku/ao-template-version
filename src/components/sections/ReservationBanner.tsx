"use client";

import Image from "next/image";
import { siteContent } from "@/config/siteContent";
import { useFadeIn } from "@/lib/useFadeIn";
import { DateRangeSearch } from "@/components/ui/DateRangeSearch";

/**
 * 中央配置の予約バナー。
 * 背景写真 + 暗オーバーレイ + 日付検索バー (中段の予約導線)。
 */
export function ReservationBanner() {
    const { reservationBanner } = siteContent;
    const ref = useFadeIn<HTMLDivElement>();

    return (
        <section className="relative">
            <div ref={ref} className="fade-in relative block w-full h-[60vh] min-h-[460px] overflow-hidden">
                <Image
                    src={reservationBanner.backgroundImage}
                    alt={reservationBanner.jp}
                    fill
                    sizes="100vw"
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-[var(--color-night)]/55" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-5">
                    <span
                        className="text-[11px] md:text-xs tracking-[0.4em] text-white/75 mb-4"
                        style={{ fontFamily: "var(--font-inter)" }}
                    >
                        — RESERVATION
                    </span>
                    <h2
                        className="text-white text-[36px] md:text-[64px] leading-[1.1] tracking-[0.06em] font-light"
                        style={{ fontFamily: "var(--font-inter)" }}
                    >
                        {reservationBanner.en}
                    </h2>
                    <p className="mt-4 text-white/85 text-[13px] md:text-[15px] tracking-[0.2em] font-medium">
                        {reservationBanner.jp}
                    </p>
                    <p
                        className="mt-3 text-white/90 text-[13px] md:text-[14px] tracking-[0.08em] font-semibold"
                        style={{ fontFamily: "var(--font-inter)" }}
                    >
                        1日1組 ・ 最大10名 ・ ¥9,800〜/人
                    </p>

                    <div className="mt-10 w-full flex justify-center">
                        <DateRangeSearch ctaId="banner" />
                    </div>
                </div>
            </div>
        </section>
    );
}
