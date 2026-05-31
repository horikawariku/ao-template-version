"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { siteContent } from "@/config/siteContent";
import { ViewerCounter } from "@/components/ui/ViewerCounter";
import { BookingLink } from "@/components/ui/BookingLink";

/**
 * フルブリードのヒーロー。
 * 大判写真をクロスフェード、中央に巨大wordmark、下にCTAピル。
 */
export function HeroFullBleed() {
    const images = siteContent.hero.images;
    const [idx, setIdx] = useState(0);

    useEffect(() => {
        if (images.length <= 1) return;
        const id = setInterval(() => setIdx((i) => (i + 1) % images.length), 6000);
        return () => clearInterval(id);
    }, [images.length]);

    return (
        <section className="relative w-full h-[100svh] min-h-[600px] overflow-hidden">
            {/* Background images (crossfade) */}
            {images.map((src, i) => (
                <div
                    key={src}
                    className="absolute inset-0 transition-opacity duration-[1500ms]"
                    style={{ opacity: i === idx ? 1 : 0 }}
                >
                    <Image
                        src={src}
                        alt=""
                        fill
                        priority={i === 0}
                        sizes="100vw"
                        className="object-cover"
                    />
                </div>
            ))}

            {/* Subtle dark overlay */}
            <div className="absolute inset-0 bg-[var(--color-night)]/35" />

            {/* Center wordmark */}
            <div className="relative h-full flex flex-col items-center justify-center px-5 text-center">
                <h1
                    className="text-white font-light text-[34px] md:text-[68px] lg:text-[88px] leading-[1.1] tracking-[0.12em]"
                    style={{ fontFamily: "var(--font-noto-serif-jp)" }}
                >
                    {siteContent.site.name}
                </h1>
                <p
                    className="mt-6 text-white/85 text-[11px] md:text-[13px] tracking-[0.3em]"
                    style={{ fontFamily: "var(--font-noto-serif-jp)" }}
                >
                    {siteContent.hero.wordmarkJp}
                </p>

                {/* CTA Pill — premium float style */}
                <BookingLink
                    baseUrl={siteContent.booking.url}
                    className="group mt-12 md:mt-16 inline-flex items-center gap-3 px-10 md:px-14 py-4 md:py-5 rounded-full bg-white text-[#1a1310] text-[12px] md:text-[13px] tracking-[0.28em] font-bold transition-all duration-500 ease-out hover:-translate-y-1"
                    style={{
                        fontFamily: "var(--font-inter)",
                        boxShadow: "0 12px 40px -8px rgba(0,0,0,0.35), 0 4px 12px -2px rgba(0,0,0,0.18)",
                    }}
                >
                    <span>{siteContent.hero.ctaLabel}</span>
                    <span
                        aria-hidden
                        className="inline-block transition-transform duration-500 ease-out group-hover:translate-x-1"
                    >
                        →
                    </span>
                </BookingLink>

                {/* Viewer counter */}
                <div className="mt-5">
                    <ViewerCounter />
                </div>
            </div>

            {/* Image dots */}
            {images.length > 1 && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                    {images.map((_, i) => (
                        <button
                            key={i}
                            type="button"
                            aria-label={`スライド ${i + 1}`}
                            onClick={() => setIdx(i)}
                            className={[
                                "h-[3px] transition-all",
                                i === idx ? "w-8 bg-white" : "w-4 bg-white/40",
                            ].join(" ")}
                        />
                    ))}
                </div>
            )}

            {/* Scroll hint */}
            <div className="absolute bottom-12 right-6 hidden md:flex flex-col items-center gap-2 text-white/70">
                <span
                    className="text-[10px] tracking-[0.3em] [writing-mode:vertical-rl]"
                    style={{ fontFamily: "var(--font-inter)" }}
                >
                    SCROLL
                </span>
                <span className="block w-[1px] h-12 bg-white/50" />
            </div>
        </section>
    );
}
