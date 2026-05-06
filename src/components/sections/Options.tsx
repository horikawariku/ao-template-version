"use client";

import Image from "next/image";
import { siteContent } from "@/config/siteContent";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FeatureCarousel } from "@/components/ui/FeatureCarousel";
import { ViewMoreLink } from "@/components/ui/ViewMoreLink";
import { useFadeIn } from "@/lib/useFadeIn";

export function Options() {
    const { options } = siteContent;
    const refMedia = useFadeIn<HTMLDivElement>();
    const refBody = useFadeIn<HTMLDivElement>();

    // 単一プランは特集レイアウト、複数はカルーセル
    const single = options.items.length === 1 ? options.items[0] : null;

    return (
        <section className="bg-[#221915] py-24 md:py-36">
            <div className="px-5 md:px-10 max-w-7xl mx-auto">
                <SectionHeader index="05" en={options.en} jp={options.jp} lead={options.leadCopy} />

                {single ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-center">
                        <div ref={refMedia} className="fade-in relative aspect-[4/3] overflow-hidden">
                            <Image
                                src={single.src}
                                alt={single.jp}
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-cover"
                            />
                            <span
                                className="absolute top-4 left-4 text-[10px] tracking-[0.25em] bg-[#f5efe6] text-[#1a1310] px-3 py-1.5"
                                style={{ fontFamily: "var(--font-inter)" }}
                            >
                                {single.price}
                            </span>
                        </div>

                        <div ref={refBody} className="fade-in">
                            <span
                                className="text-[10px] tracking-[0.3em] text-[#9c9085]"
                                style={{ fontFamily: "var(--font-inter)" }}
                            >
                                {single.en.toUpperCase()}
                            </span>
                            <h3
                                className="mt-2 text-[28px] md:text-[36px] tracking-[0.05em] text-[#f5efe6]"
                                style={{ fontFamily: "var(--font-noto-serif-jp)" }}
                            >
                                {single.jp}
                            </h3>
                            <p className="mt-1 text-[16px] md:text-[18px] text-[#f5efe6]">
                                {single.price}
                            </p>
                            <p className="mt-5 text-[13px] md:text-[14px] leading-[1.95] text-[#d8cfc1]">
                                {single.desc}
                            </p>
                        </div>
                    </div>
                ) : (
                    <FeatureCarousel
                        items={options.items.map((item) => ({
                            src: item.src,
                            titleEn: item.en,
                            titleJp: item.jp,
                            desc: item.desc,
                            badge: item.price,
                        }))}
                    />
                )}

                <ViewMoreLink href="/option" label="VIEW MORE OPTIONS" />
            </div>
        </section>
    );
}
