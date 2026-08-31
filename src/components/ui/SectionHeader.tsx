"use client";

import { useFadeIn } from "@/lib/useFadeIn";

interface Props {
    /** 連番 (旧API互換・未使用) */
    index?: string;
    /** 英字タイトル (mysa shead .en 同型) */
    en: string;
    /** 和文の説明文 (mysa shead .jp 同型) */
    jp: string;
    /** リード文 (任意) */
    lead?: string;
    align?: "left" | "center";
}

/**
 * セクション見出し (mysa の .shead と同型)。
 * 英字は小さめ太字、説明は日本語の一文で内容が即わかる構成。
 */
export function SectionHeader({ en, jp, lead, align = "left" }: Props) {
    const ref = useFadeIn<HTMLDivElement>();
    const alignClass = align === "center" ? "items-center text-center" : "items-start";

    return (
        <div ref={ref} className={`fade-in flex flex-col ${alignClass} mb-6 md:mb-8`}>
            <h2
                className="text-[24px] md:text-[28px] font-bold tracking-[-0.01em] text-[#f5efe6]"
                style={{ fontFamily: "var(--font-inter)" }}
            >
                {en}
            </h2>
            <p className="mt-1.5 text-[13px] md:text-[14px] text-[#b7ab9d]">
                {jp}
            </p>
            {lead && (
                <p
                    className={[
                        "mt-4 max-w-2xl text-[13px] md:text-[14px] leading-[2] text-[#d8cfc1]",
                        align === "center" ? "mx-auto" : "",
                    ].join(" ")}
                >
                    {lead}
                </p>
            )}
        </div>
    );
}
