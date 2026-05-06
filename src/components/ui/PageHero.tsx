"use client";

import Image from "next/image";

interface Props {
    en: string;
    jp: string;
    image?: string;
}

/**
 * サブページ用の小型ヒーロー (ヘッダー直下)。
 */
export function PageHero({ en, jp, image }: Props) {
    return (
        <section className="relative pt-28 md:pt-36 pb-16 md:pb-20 overflow-hidden">
            {image && (
                <>
                    <div className="absolute inset-0">
                        <Image src={image} alt="" fill priority sizes="100vw" className="object-cover" />
                    </div>
                    <div className="absolute inset-0 bg-[var(--color-night)]/55" />
                </>
            )}
            <div
                className={[
                    "relative px-5 md:px-10 max-w-7xl mx-auto",
                    image ? "text-white" : "text-[#f5efe6]",
                ].join(" ")}
            >
                <h1
                    className="text-[40px] md:text-[72px] leading-[1.05] tracking-[0.05em] font-light"
                    style={{ fontFamily: "var(--font-inter)" }}
                >
                    {en}
                </h1>
                <p
                    className={[
                        "mt-3 text-[12px] md:text-[14px] tracking-[0.3em]",
                        image ? "text-white/85" : "text-[#d8cfc1]",
                    ].join(" ")}
                    style={{ fontFamily: "var(--font-noto-serif-jp)" }}
                >
                    {jp}
                </p>
            </div>
        </section>
    );
}
