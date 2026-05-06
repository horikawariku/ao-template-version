"use client";

import Image from "next/image";
import { siteContent } from "@/config/siteContent";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ViewMoreLink } from "@/components/ui/ViewMoreLink";
import { useFadeIn } from "@/lib/useFadeIn";

/**
 * 設備セクション。
 * illustration が指定されていればそれを表示、無ければ写真にフォールバック。
 * 右(または下)に主要設備リスト。
 */
export function Facilities() {
    const { facilities } = siteContent;
    const refMedia = useFadeIn<HTMLDivElement>();
    const refList = useFadeIn<HTMLUListElement>();

    const showIllustration = !!facilities.illustration;

    return (
        <section className="bg-[#221915] py-24 md:py-36">
            <div className="px-5 md:px-10 max-w-7xl mx-auto">
                <SectionHeader
                    index="02"
                    en={facilities.en}
                    jp={facilities.jp}
                    lead={facilities.leadCopy}
                />

                <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-10 md:gap-16">
                    <div
                        ref={refMedia}
                        className={[
                            "fade-in relative overflow-hidden",
                            showIllustration
                                ? "aspect-[4/3] bg-white border border-[#3a2e26] flex items-center justify-center p-6"
                                : "aspect-[4/3]",
                        ].join(" ")}
                    >
                        {showIllustration ? (
                            // illustrationが将来的に画像として用意される場合の表示
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                                src={facilities.illustration!}
                                alt="間取りイラスト"
                                className="w-full h-full object-contain"
                            />
                        ) : (
                            <Image
                                src={facilities.photo}
                                alt={facilities.jp}
                                fill
                                sizes="(max-width: 768px) 100vw, 60vw"
                                className="object-cover"
                            />
                        )}
                    </div>

                    <ul ref={refList} className="fade-in flex flex-col">
                        {facilities.items.map((item, i) => (
                            <li
                                key={item.en}
                                className="py-5 md:py-6 border-b border-[#4a3a2f] grid grid-cols-[28px_1fr_auto] md:grid-cols-[40px_1fr_auto] gap-3 md:gap-4 items-baseline"
                            >
                                <span
                                    className="text-[10px] tracking-[0.2em] text-[#9c9085]"
                                    style={{ fontFamily: "var(--font-inter)" }}
                                >
                                    {String(i + 1).padStart(2, "0")}
                                </span>
                                <div>
                                    <p
                                        className="text-[15px] md:text-[16px] tracking-[0.06em] text-[#f5efe6]"
                                        style={{ fontFamily: "var(--font-noto-serif-jp)" }}
                                    >
                                        {item.jp}
                                    </p>
                                    <p
                                        className="text-[10px] tracking-[0.25em] text-[#9c9085] mt-1"
                                        style={{ fontFamily: "var(--font-inter)" }}
                                    >
                                        {item.en.toUpperCase()}
                                    </p>
                                </div>
                                {item.note && (
                                    <span className="text-[11px] md:text-[12px] text-[#d8cfc1] text-right max-w-[160px] md:max-w-[220px] leading-[1.6]">
                                        {item.note}
                                    </span>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>

                <ViewMoreLink href="/facilities" label="VIEW ALL FACILITIES" />
            </div>
        </section>
    );
}
