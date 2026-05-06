"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface Props {
    href: string;
    /** 英字ラベル (デフォルト VIEW MORE) */
    label?: string;
    /** 中央揃えにするか */
    align?: "left" | "center" | "right";
}

/**
 * セクション末尾に置く「もっと見る」リンク。
 * 罫線付き + アイコン付きで控えめに目立つ。
 */
export function ViewMoreLink({ href, label = "VIEW MORE", align = "right" }: Props) {
    const wrapperAlign =
        align === "center" ? "justify-center" : align === "left" ? "justify-start" : "justify-end";

    return (
        <div className={`mt-10 md:mt-14 flex ${wrapperAlign}`}>
            <Link
                href={href}
                className="group inline-flex items-center gap-3 text-[11px] md:text-xs tracking-[0.3em] text-[#f5efe6] border-b border-[#f5efe6] pb-2 hover:text-[#9c9085] hover:border-[#9c9085] transition-colors"
                style={{ fontFamily: "var(--font-inter)" }}
            >
                {label}
                <ArrowRight
                    size={14}
                    strokeWidth={1.5}
                    className="transition-transform group-hover:translate-x-1"
                />
            </Link>
        </div>
    );
}
