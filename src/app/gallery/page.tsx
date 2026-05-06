import type { Metadata } from "next";
import Image from "next/image";
import { siteContent } from "@/config/siteContent";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = { title: "ギャラリー" };

export default function GalleryPage() {
    const { gallery } = siteContent;

    return (
        <main>
            <PageHero en="GALLERY" jp="ギャラリー" image={gallery.images[0].src} />

            <section className="bg-[#1a1310] py-16 md:py-24">
                <div className="px-5 md:px-10 max-w-7xl mx-auto">
                    <p
                        className="text-center text-[14px] md:text-[15px] leading-[2] text-[#d8cfc1] mb-12 md:mb-16"
                        style={{ fontFamily: "var(--font-noto-serif-jp)" }}
                    >
                        {gallery.leadCopy}
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
                        {gallery.images.map((img, i) => (
                            <figure
                                key={i}
                                className={[
                                    "relative overflow-hidden bg-[#2a1f1a] group",
                                    i % 5 === 0 ? "col-span-2 aspect-[3/2]" : "aspect-[4/5]",
                                ].join(" ")}
                            >
                                <Image
                                    src={img.src}
                                    alt={img.caption}
                                    fill
                                    sizes="(max-width: 768px) 50vw, 33vw"
                                    className="object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                                />
                                <figcaption className="absolute bottom-3 left-3 text-[11px] md:text-[12px] tracking-[0.15em] text-white px-2 py-1 bg-black/35">
                                    {img.caption}
                                </figcaption>
                            </figure>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
