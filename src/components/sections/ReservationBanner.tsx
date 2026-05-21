"use client";

import Image from "next/image";
import { siteContent } from "@/config/siteContent";
import { useFadeIn } from "@/lib/useFadeIn";
import { BookingLink } from "@/components/ui/BookingLink";

/**
 * 中央配置の予約バナー。
 * 背景写真 + 暗オーバーレイ + 中央CTA。
 */
export function ReservationBanner() {
    const { reservationBanner, booking } = siteContent;
    const ref = useFadeIn<HTMLAnchorElement>();

    return (
        <section className="relative">
            <BookingLink
                ref={ref}
                baseUrl={booking.url}
                className="fade-in relative block w-full h-[60vh] min-h-[420px] overflow-hidden group"
            >
                <Image
                    src={reservationBanner.backgroundImage}
                    alt={reservationBanner.jp}
                    fill
                    sizes="100vw"
                    className="object-cover transition-transform duration-[1500ms] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[var(--color-night)]/55 group-hover:bg-[var(--color-night)]/65 transition-colors" />
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
                    <p
                        className="mt-4 text-white/85 text-[13px] md:text-[15px] tracking-[0.3em]"
                        style={{ fontFamily: "var(--font-noto-serif-jp)" }}
                    >
                        {reservationBanner.jp}
                    </p>

                    <span
                        className="mt-10 inline-flex items-center gap-3 px-9 py-4 rounded-full border border-white/70 text-white text-[11px] md:text-xs tracking-[0.3em] font-bold group-hover:bg-white group-hover:text-[#f5efe6] transition"
                        style={{ fontFamily: "var(--font-inter)" }}
                    >
                        {booking.labelLong.toUpperCase()}
                    </span>
                </div>
            </BookingLink>
        </section>
    );
}
