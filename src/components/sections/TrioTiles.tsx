"use client";

import Link from "next/link";
import Image from "next/image";
import { siteContent } from "@/config/siteContent";
import { useFadeIn } from "@/lib/useFadeIn";

/**
 * フッター手前の3スクエアタイル。
 * Gallery / Reserve / Instagram など。
 */
export function TrioTiles() {
    const ref = useFadeIn<HTMLDivElement>();

    return (
        <section ref={ref} className="fade-in bg-[#1a1310] py-24 md:py-36">
            <div className="px-5 md:px-10 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                    {siteContent.trio.map((tile) => {
                        const content = (
                            <>
                                <div className="absolute inset-0">
                                    <Image
                                        src={tile.image}
                                        alt={tile.jp}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                        className="object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                                    />
                                </div>
                                <div className="absolute inset-0 bg-[var(--color-night)]/40 group-hover:bg-[var(--color-night)]/50 transition-colors" />
                                <div className="relative h-full flex flex-col items-center justify-center text-center text-white">
                                    <h3
                                        className="text-[28px] md:text-[40px] tracking-[0.06em] font-light"
                                        style={{ fontFamily: "var(--font-inter)" }}
                                    >
                                        {tile.en}
                                    </h3>
                                    <p
                                        className="mt-2 text-[11px] md:text-[12px] tracking-[0.3em] text-white/80"
                                        style={{ fontFamily: "var(--font-noto-serif-jp)" }}
                                    >
                                        {tile.jp}
                                    </p>
                                </div>
                            </>
                        );

                        const className = "group relative aspect-square overflow-hidden block";

                        return tile.external ? (
                            <a
                                key={tile.href}
                                href={tile.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={className}
                            >
                                {content}
                            </a>
                        ) : (
                            <Link key={tile.href} href={tile.href} className={className}>
                                {content}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
