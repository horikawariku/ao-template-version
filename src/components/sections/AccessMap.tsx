"use client";

import { siteContent } from "@/config/siteContent";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useFadeIn } from "@/lib/useFadeIn";
import { ExternalLink } from "lucide-react";

export function AccessMap() {
    const { access } = siteContent;
    const refMap = useFadeIn<HTMLDivElement>();

    return (
        <section className="bg-[#221915] py-24 md:py-36">
            <div className="px-5 md:px-10 max-w-7xl mx-auto">
                <SectionHeader index="04" en={access.en} jp={access.jp} lead={access.leadCopy} />

                <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-10 md:gap-16 items-start">
                    <div className="space-y-6">
                        <div>
                            <p
                                className="text-[10px] tracking-[0.3em] text-[#9c9085] mb-2"
                                style={{ fontFamily: "var(--font-inter)" }}
                            >
                                ADDRESS
                            </p>
                            <p
                                className="text-[14px] md:text-[15px] leading-[1.9] text-[#f5efe6]"
                                style={{ fontFamily: "var(--font-noto-serif-jp)" }}
                            >
                                {access.address}
                            </p>
                        </div>

                        <div>
                            <p
                                className="text-[10px] tracking-[0.3em] text-[#9c9085] mb-3"
                                style={{ fontFamily: "var(--font-inter)" }}
                            >
                                BY CAR
                            </p>
                            <ul className="space-y-2">
                                {access.car.map((c) => (
                                    <li
                                        key={c.from}
                                        className="flex justify-between text-[13px] text-[#d8cfc1] border-b border-[#4a3a2f] pb-2"
                                    >
                                        <span>{c.from}</span>
                                        <span className="text-[#f5efe6]">{c.time}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <p
                                className="text-[10px] tracking-[0.3em] text-[#9c9085] mb-2"
                                style={{ fontFamily: "var(--font-inter)" }}
                            >
                                BY TRAIN
                            </p>
                            <p className="text-[13px] text-[#d8cfc1]">{access.train}</p>
                        </div>

                        {access.externalMapUrl && (
                            <a
                                href={access.externalMapUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] text-[#f5efe6] border-b border-[#f5efe6] pb-1"
                                style={{ fontFamily: "var(--font-inter)" }}
                            >
                                OPEN IN GOOGLE MAPS
                                <ExternalLink size={12} strokeWidth={1.5} />
                            </a>
                        )}
                    </div>

                    <div ref={refMap} className="fade-in relative aspect-[4/3] md:aspect-[5/4] overflow-hidden bg-[#2a1f1a]">
                        <iframe
                            src={access.mapEmbedUrl}
                            className="absolute inset-0 w-full h-full"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Map"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
