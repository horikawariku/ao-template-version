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

                <div className="grid grid-cols-1 gap-8">
                    <div
                        ref={refMedia}
                        className={[
                            "fade-in relative overflow-hidden rounded-[14px]",
                            showIllustration
                                ? "aspect-[16/9] bg-white border border-[#3a2e26] flex items-center justify-center p-6"
                                : "aspect-[16/9] md:aspect-[21/9]",
                        ].join(" ")}
                    >
                        {showIllustration ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={facilities.illustration!} alt="間取りイラスト" className="w-full h-full object-contain" />
                        ) : (
                            <Image
                                src={facilities.photo}
                                alt={facilities.jp}
                                fill
                                sizes="100vw"
                                className="object-cover"
                            />
                        )}
                    </div>

                    {/* mysa specgrid 同型: 枠線カード / 上=項目名 / 下=太字の値 / 補足 */}
                    <ul ref={refList} className="fade-in grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-3.5">
                        {facilities.items.map((item) => (
                            <li
                                key={item.en}
                                className="rounded-[12px] border border-[#4a3a2f] bg-white/[0.045] px-4 py-3.5"
                            >
                                <span className="block text-[10px] tracking-[0.12em] text-[#9c9085] font-semibold">
                                    {item.jp}
                                </span>
                                <b
                                    className="block mt-1 text-[17px] md:text-[19px] font-bold text-[#f5efe6] leading-tight"
                                    style={{ fontVariantNumeric: "tabular-nums" }}
                                >
                                    {"stat" in item ? (item as { stat?: string }).stat : ""}
                                </b>
                                {item.note && (
                                    <span className="block mt-1 text-[10.5px] leading-[1.6] text-[#b7ab9d]">
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
