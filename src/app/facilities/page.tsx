import type { Metadata } from "next";
import Image from "next/image";
import { siteContent } from "@/config/siteContent";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = { title: "設備" };

export default function FacilitiesPage() {
    const { facilities } = siteContent;

    return (
        <main>
            <PageHero en="FACILITIES" jp="設備" image={facilities.photo} />

            <section className="bg-[#1a1310] py-16 md:py-24">
                <div className="px-5 md:px-10 max-w-5xl mx-auto">
                    <p
                        className="text-center text-[14px] md:text-[15px] leading-[2] text-[#d8cfc1] mb-14"
                        style={{ fontFamily: "var(--font-noto-serif-jp)" }}
                    >
                        {facilities.leadCopy}
                    </p>

                    <ul className="space-y-16 md:space-y-24">
                        {facilities.items.map((item, i) => (
                            <li
                                key={item.en}
                                className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center"
                            >
                                <div className={`relative aspect-[4/3] overflow-hidden ${i % 2 === 1 ? "md:order-2" : ""}`}>
                                    <Image
                                        src={item.image}
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
                                        — {String(i + 1).padStart(2, "0")} / {item.en.toUpperCase()}
                                    </span>
                                    <h2
                                        className="mt-3 text-[26px] md:text-[34px] tracking-[0.05em] text-[#f5efe6]"
                                        style={{ fontFamily: "var(--font-noto-serif-jp)" }}
                                    >
                                        {item.jp}
                                    </h2>
                                    {item.note && (
                                        <p
                                            className="mt-2 text-[13px] tracking-[0.05em] text-[#d8cfc1]"
                                            style={{ fontFamily: "var(--font-noto-serif-jp)" }}
                                        >
                                            {item.note}
                                        </p>
                                    )}
                                    <p className="mt-5 text-[13px] md:text-[14px] leading-[1.95] text-[#d8cfc1]">
                                        {item.detail}
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
