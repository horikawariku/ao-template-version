import type { Metadata } from "next";
import Image from "next/image";
import { siteContent } from "@/config/siteContent";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = { title: "周辺施設" };

export default function LeisurePage() {
    const { nearby } = siteContent;

    return (
        <main>
            <PageHero en="LEISURE" jp="周辺施設" image={nearby.items[0]?.src} />

            <section className="bg-[#1a1310] py-16 md:py-24">
                <div className="px-5 md:px-10 max-w-6xl mx-auto">
                    <p
                        className="text-center text-[14px] md:text-[15px] leading-[2] text-[#d8cfc1] mb-14"
                        style={{ fontFamily: "var(--font-noto-serif-jp)" }}
                    >
                        {nearby.leadCopy}
                    </p>

                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                        {nearby.items.map((item) => (
                            <li key={item.en} className="group">
                                <div className="relative aspect-[4/3] overflow-hidden">
                                    <Image
                                        src={item.src}
                                        alt={item.jp}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        className="object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                                    />
                                    <span className="absolute top-3 left-3 text-[10px] tracking-[0.2em] bg-white/90 text-[#f5efe6] px-3 py-1.5">
                                        {item.time}
                                    </span>
                                </div>
                                <div className="mt-4">
                                    <span
                                        className="text-[10px] tracking-[0.3em] text-[#9c9085]"
                                        style={{ fontFamily: "var(--font-inter)" }}
                                    >
                                        {item.en.toUpperCase()}
                                    </span>
                                    <h3
                                        className="mt-1 text-[18px] md:text-[20px] text-[#f5efe6] tracking-[0.05em]"
                                        style={{ fontFamily: "var(--font-noto-serif-jp)" }}
                                    >
                                        {item.jp}
                                    </h3>
                                    <p className="mt-2 text-[13px] leading-[1.9] text-[#d8cfc1]">{item.desc}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </main>
    );
}
