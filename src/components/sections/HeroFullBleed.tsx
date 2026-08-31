"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { siteContent } from "@/config/siteContent";
import { ViewerCounter } from "@/components/ui/ViewerCounter";
import { DateRangeSearch } from "@/components/ui/DateRangeSearch";

/**
 * フルブリードのヒーロー (mysa 宿詳細ページ同型)。
 * 左下にエリア表記 + キャッチコピー + 日付検索バー、下中央にスクロール誘導。
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
        <section className="relative w-full h-[96svh] min-h-[560px] overflow-hidden">
            {images.map((src, i) => (
                <div
                    key={src}
                    className="absolute inset-0 transition-opacity duration-[1500ms]"
                    style={{ opacity: i === idx ? 1 : 0 }}
                >
                    <Image src={src} alt="" fill priority={i === 0} sizes="100vw" className="object-cover" />
                </div>
            ))}

            {/* 下部を読ませるためのグラデーション */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/25" />

            {/* SEO用の不可視見出し */}
            <h1 className="sr-only">{siteContent.site.name}</h1>

            {/* 中央: キャッチ + 日付検索 + 閲覧者数 */}
            <div className="relative z-10 h-full flex items-center justify-center">
                <div className="w-full px-6 max-w-[520px] flex flex-col items-center text-center">
                    <p className="text-white text-[18px] md:text-[22px] leading-[1.9] font-medium">
                        {siteContent.hero.wordmarkJp}。
                    </p>
                    <div className="mt-7 w-full flex justify-center">
                        <DateRangeSearch ctaId="hero" />
                    </div>
                    <div className="mt-4">
                        <ViewerCounter />
                    </div>
                </div>
            </div>

            {/* スクロール誘導 (mysa scrollcue 同型) */}
            <div
                className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 text-center text-white/70 text-[10px] tracking-[0.28em]"
                style={{ fontFamily: "var(--font-inter)" }}
            >
                <div>SCROLL</div>
                <div className="scroll-cue-line w-px h-[30px] bg-white/50 mx-auto mt-2" />
            </div>
        </section>
    );
}
