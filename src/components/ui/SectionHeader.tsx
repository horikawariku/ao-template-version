"use client";

import { useFadeIn } from "@/lib/useFadeIn";

interface Props {
    /** 連番 (例: "01") */
    index?: string;
    /** 大きく表示する英字タイトル */
    en: string;
    /** 小さく表示する和文サブタイトル */
    jp: string;
    /** リード文 (任意) */
    lead?: string;
    align?: "left" | "center";
}

export function SectionHeader({ index, en, jp, lead, align = "left" }: Props) {
    const ref = useFadeIn<HTMLDivElement>();
    const alignClass = align === "center" ? "items-center text-center" : "items-start";

    return (
        <div ref={ref} className={`fade-in flex flex-col ${alignClass} mb-10 md:mb-14`}>
            {index && (
                <span
                    className="text-[10px] tracking-[0.4em] text-[#9c9085] mb-3"
                    style={{ fontFamily: "var(--font-inter)" }}
                >
                    — {index}
                </span>
            )}
            <h2
                className="text-[34px] md:text-[56px] leading-[1.05] tracking-[0.04em] text-[#f5efe6] font-light"
                style={{ fontFamily: "var(--font-inter)" }}
            >
                {en}
            </h2>
            <p
                className="mt-2 text-[12px] md:text-[13px] tracking-[0.3em] text-[#d8cfc1]"
                style={{ fontFamily: "var(--font-noto-serif-jp)" }}
            >
                {jp}
            </p>
            {lead && (
                <p
                    className={[
                        "mt-6 max-w-2xl text-[13px] md:text-[14px] leading-[2] text-[#d8cfc1]",
                        align === "center" ? "mx-auto" : "",
                    ].join(" ")}
                    style={{ fontFamily: "var(--font-noto-serif-jp)" }}
                >
                    {lead}
                </p>
            )}
        </div>
    );
}
