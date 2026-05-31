"use client";

import Image from "next/image";
import { useRef, useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface CarouselItem {
    src: string;
    titleEn?: string;
    titleJp?: string;
    note?: string;
    desc?: string;
    /** 価格などの右上タグ */
    badge?: string;
}

interface Props {
    items: CarouselItem[];
    /** カードのアスペクト (デフォルト 4/5) */
    aspect?: string;
    /** カードの幅 (デフォルト 320px) */
    cardWidth?: string;
}

/**
 * scroll-snap-x ベースの横スクロールカルーセル。
 * 矢印ボタン2つ。ドット無し。
 */
export function FeatureCarousel({
    items,
    aspect = "aspect-[4/5]",
    cardWidth = "w-[78vw] sm:w-[360px] md:w-[400px]",
}: Props) {
    const scrollerRef = useRef<HTMLDivElement>(null);
    const [canPrev, setCanPrev] = useState(false);
    const [canNext, setCanNext] = useState(true);

    const updateCanScroll = useCallback(() => {
        const el = scrollerRef.current;
        if (!el) return;
        setCanPrev(el.scrollLeft > 4);
        setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
    }, []);

    useEffect(() => {
        updateCanScroll();
        const el = scrollerRef.current;
        if (!el) return;
        el.addEventListener("scroll", updateCanScroll, { passive: true });
        window.addEventListener("resize", updateCanScroll);
        return () => {
            el.removeEventListener("scroll", updateCanScroll);
            window.removeEventListener("resize", updateCanScroll);
        };
    }, [updateCanScroll]);

    const scrollBy = (dir: 1 | -1) => {
        const el = scrollerRef.current;
        if (!el) return;
        const amount = el.clientWidth * 0.85 * dir;
        el.scrollBy({ left: amount, behavior: "smooth" });
    };

    return (
        <div className="relative">
            <div
                ref={scrollerRef}
                className="no-scrollbar flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory pb-2"
            >
                {items.map((item, i) => (
                    <article
                        key={`${item.titleEn ?? "item"}-${i}`}
                        className={`shrink-0 snap-start ${cardWidth}`}
                    >
                        <div className={`relative ${aspect} overflow-hidden bg-[#2a1f1a]`}>
                            <Image
                                src={item.src}
                                alt={item.titleJp ?? item.titleEn ?? ""}
                                fill
                                sizes="(max-width: 768px) 80vw, 400px"
                                className="object-cover"
                            />
                        </div>
                        <div className="mt-4">
                            <div className="flex items-baseline justify-between gap-3">
                                {item.titleJp && (
                                    <h3
                                        className="text-[15px] md:text-[16px] tracking-[0.05em] text-[#f5efe6]"
                                        style={{ fontFamily: "var(--font-noto-serif-jp)" }}
                                    >
                                        {item.titleJp}
                                    </h3>
                                )}
                                {item.note && (
                                    <span className="text-[11px] tracking-[0.15em] text-[#9c9085]">{item.note}</span>
                                )}
                            </div>
                            {item.titleEn && (
                                <p
                                    className="text-[10px] tracking-[0.3em] text-[#9c9085] mt-1"
                                    style={{ fontFamily: "var(--font-inter)" }}
                                >
                                    {item.titleEn.toUpperCase()}
                                </p>
                            )}
                            {item.badge && (
                                <p
                                    className="mt-2 text-[13px] tracking-[0.05em] text-[#f5efe6] font-medium"
                                    style={{ fontFamily: "var(--font-inter)", fontVariantNumeric: "tabular-nums" }}
                                >
                                    {item.badge}
                                </p>
                            )}
                            {item.desc && (
                                <p className="mt-2 text-[12px] leading-[1.8] text-[#d8cfc1]">{item.desc}</p>
                            )}
                        </div>
                    </article>
                ))}
            </div>

            {/* Arrows */}
            <div className="hidden md:flex absolute -top-16 right-0 gap-2">
                <button
                    type="button"
                    aria-label="前へ"
                    onClick={() => scrollBy(-1)}
                    disabled={!canPrev}
                    className="w-11 h-11 border border-[#4a3a2f] flex items-center justify-center text-[#f5efe6] disabled:opacity-30 hover:bg-[#f5efe6] hover:text-[#1a1310] transition"
                >
                    <ChevronLeft size={18} strokeWidth={1.5} />
                </button>
                <button
                    type="button"
                    aria-label="次へ"
                    onClick={() => scrollBy(1)}
                    disabled={!canNext}
                    className="w-11 h-11 border border-[#4a3a2f] flex items-center justify-center text-[#f5efe6] disabled:opacity-30 hover:bg-[#f5efe6] hover:text-[#1a1310] transition"
                >
                    <ChevronRight size={18} strokeWidth={1.5} />
                </button>
            </div>
        </div>
    );
}
