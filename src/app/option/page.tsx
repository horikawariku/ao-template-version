import type { Metadata } from "next";
import Image from "next/image";
import { siteContent } from "@/config/siteContent";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = { title: "追加プラン" };

export default function OptionPage() {
    const { options } = siteContent;

    return (
        <main>
            <PageHero en="OPTION" jp="追加プラン" image={options.items[0]?.src} />

            <section className="bg-[#1a1310] py-16 md:py-24">
                <div className="px-5 md:px-10 max-w-5xl mx-auto">
                    <p
                        className="text-center text-[14px] md:text-[15px] leading-[2] text-[#d8cfc1] mb-14"
                        style={{ fontFamily: "var(--font-noto-serif-jp)" }}
                    >
                        {options.leadCopy}
                    </p>

                    <ul className="space-y-12 md:space-y-20">
                        {options.items.map((item, i) => (
                            <li
                                key={item.en}
                                className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center"
                            >
                                <div className={`relative aspect-[4/3] ${i % 2 === 1 ? "md:order-2" : ""}`}>
                                    <Image
                                        src={item.src}
                                        alt={item.jp}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        className="object-cover"
                                    />
                                </div>
                                <div className={i % 2 === 1 ? "md:order-1" : ""}>
                                    <span
                                        className="text-[10px] tracking-[0.3em] text-[#9c9085]"
                                        style={{ fontFamily: "var(--font-inter)" }}
                                    >
                                        {item.en.toUpperCase()}
                                    </span>
                                    <h2
                                        className="mt-2 text-[24px] md:text-[32px] tracking-[0.05em] text-[#f5efe6]"
                                        style={{ fontFamily: "var(--font-noto-serif-jp)" }}
                                    >
                                        {item.jp}
                                    </h2>
                                    <p className="mt-1 text-[15px] text-[#f5efe6]">{item.price}</p>
                                    <p className="mt-4 text-[13px] md:text-[14px] leading-[1.95] text-[#d8cfc1]">
                                        {item.desc}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </main>
    );
}
