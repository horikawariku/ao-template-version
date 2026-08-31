"use client";

import Image from "next/image";
import { Tv, Volume2, Thermometer, Droplets } from "lucide-react";
import { siteContent } from "@/config/siteContent";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { BRAND_LOGOS, type BrandKey } from "@/components/ui/BrandLogos";
import { useFadeIn } from "@/lib/useFadeIn";

const ICONS = {
    streaming: Tv,
    volume: Volume2,
    temp: Thermometer,
    loyly: Droplets,
} as const;

/**
 * SAUNAセクション。
 * 左に写真、右に4つの特徴をカードグリッドで表示。
 */
export function ConceptSenses() {
    const { concept } = siteContent;
    const refGrid = useFadeIn<HTMLDivElement>();

    return (
        <section className="relative py-24 md:py-36 overflow-hidden">
            {/* 背景: サウナ写真 + 暗幕 */}
            <div className="absolute inset-0">
                <Image src={concept.photo} alt="" fill sizes="100vw" className="object-cover" />
                <div className="absolute inset-0 bg-[#1a1310]/82" />
            </div>
            <div className="relative px-5 md:px-10 max-w-7xl mx-auto">
                <SectionHeader
                    index="03"
                    en={concept.en}
                    jp={concept.jp}
                    lead={concept.leadCopy}
                />

                <div className="grid grid-cols-1">
                    <div ref={refGrid} className="fade-in grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
                        {concept.features.map((f) => {
                            const Icon = ICONS[f.icon];
                            return (
                                <article
                                    key={f.title}
                                    className="bg-[#221915]/85 backdrop-blur-[2px] border border-[#3a2e26] p-6 md:p-7 flex flex-col"
                                >
                                    <div className="flex items-center gap-3 mb-5">
                                        <span className="w-10 h-10 rounded-full border border-[#4a3a2f] flex items-center justify-center text-[#f5efe6] shrink-0">
                                            <Icon size={18} strokeWidth={1.4} />
                                        </span>
                                        <span
                                            className="text-[10px] tracking-[0.25em] text-[#9c9085]"
                                            style={{ fontFamily: "var(--font-inter)" }}
                                        >
                                            {f.sub.toUpperCase()}
                                        </span>
                                    </div>
                                    <h3
                                        className="text-[18px] md:text-[20px] tracking-[0.05em] text-[#f5efe6]"
                                        style={{ fontFamily: "var(--font-noto-serif-jp)" }}
                                    >
                                        {f.title}
                                    </h3>
                                    <p className="mt-3 text-[12px] md:text-[13px] leading-[1.85] text-[#d8cfc1] flex-1">
                                        {f.body}
                                    </p>
                                    {f.badges.length > 0 && (
                                        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3">
                                            {f.badges.map((b) => {
                                                const Logo = BRAND_LOGOS[b as BrandKey];
                                                return Logo ? <Logo key={b} size={20} /> : null;
                                            })}
                                        </div>
                                    )}
                                </article>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
