"use client";

import Image from "next/image";
import { siteContent } from "@/config/siteContent";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useFadeIn } from "@/lib/useFadeIn";

/**
 * 設備セクション (mysa の Facilities .exp 同型)。
 * 写真カード (3:2) + 連番 + 見出し + 説明文の2カラムグリッド。
 */
export function Facilities() {
    const { facilities } = siteContent;
    const refList = useFadeIn<HTMLDivElement>();

    return (
        <section className="bg-[#221915] py-20 md:py-28">
            <div className="px-6 md:px-10 max-w-7xl mx-auto">
                <SectionHeader
                    en="Facilities"
                    jp="設備・空間 ─ 古民家200㎡・最大10名で貸切。"
                />

                <div ref={refList} className="fade-in grid grid-cols-1 md:grid-cols-2 gap-9 md:gap-x-9 md:gap-y-11">
                    {facilities.items.map((item, i) => (
                        <div key={item.en}>
                            <div className="rounded-[16px] overflow-hidden aspect-[3/2] md:aspect-[4/3] relative shadow-[0_18px_40px_-30px_rgba(0,0,0,0.6)]">
                                <Image
                                    src={item.image}
                                    alt={item.jp}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    className="object-cover"
                                />
                            </div>
                            <p
                                className="mt-4 mb-1.5 text-[12px] font-bold tracking-[0.12em] text-[#b7ab9d]"
                                style={{ fontFamily: "var(--font-inter)" }}
                            >
                                {String(i + 1).padStart(2, "0")}
                            </p>
                            <h3 className="text-[18px] md:text-[19px] font-medium text-[#f5efe6] mb-2">
                                {item.jp}
                                {"stat" in item && (item as { stat?: string }).stat && (
                                    <span
                                        className="ml-2 text-[14px] font-bold text-[#d8cfc1]"
                                        style={{ fontFamily: "var(--font-inter)", fontVariantNumeric: "tabular-nums" }}
                                    >
                                        {(item as { stat?: string }).stat}
                                    </span>
                                )}
                            </h3>
                            <p className="text-[13.5px] leading-[2] text-[#b7ab9d]">{item.detail}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
