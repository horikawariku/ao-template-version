"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { siteContent } from "@/config/siteContent";
import { SectionHeader } from "@/components/ui/SectionHeader";

interface Props {
    /** FAQページなど、ヘッダー無しで使うとき */
    hideHeader?: boolean;
}

export function FaqSection({ hideHeader = false }: Props) {
    const [openIdx, setOpenIdx] = useState<number | null>(0);

    return (
        <section className="bg-[#1a1310] py-24 md:py-36">
            <div className="px-5 md:px-10 max-w-4xl mx-auto">
                {!hideHeader && (
                    <SectionHeader
                        en="FAQ"
                        jp="よくある質問"
                        lead="ご予約前によくいただくご質問をまとめました。"
                    />
                )}

                <ul className="border-t border-[#4a3a2f]">
                    {siteContent.faq.map((item, i) => {
                        const open = openIdx === i;
                        return (
                            <li key={item.q} className="border-b border-[#4a3a2f]">
                                <button
                                    type="button"
                                    onClick={() => setOpenIdx(open ? null : i)}
                                    className="w-full py-5 md:py-6 grid grid-cols-[28px_1fr_24px] gap-4 items-baseline text-left"
                                >
                                    <span
                                        className="text-[10px] tracking-[0.2em] text-[#9c9085]"
                                        style={{ fontFamily: "var(--font-inter)" }}
                                    >
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                    <span
                                        className="text-[14px] md:text-[16px] text-[#f5efe6]"
                                        style={{ fontFamily: "var(--font-noto-serif-jp)" }}
                                    >
                                        {item.q}
                                    </span>
                                    <span className="text-[#f5efe6] flex justify-end">
                                        {open ? (
                                            <Minus size={16} strokeWidth={1.5} />
                                        ) : (
                                            <Plus size={16} strokeWidth={1.5} />
                                        )}
                                    </span>
                                </button>
                                <div
                                    className="grid transition-all duration-500 ease-out"
                                    style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
                                >
                                    <div className="overflow-hidden">
                                        <p className="pb-6 pl-[44px] pr-6 text-[13px] md:text-[14px] leading-[1.95] text-[#d8cfc1]">
                                            {item.a}
                                        </p>
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
}
