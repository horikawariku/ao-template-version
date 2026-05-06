"use client";

import { siteContent } from "@/config/siteContent";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FeatureCarousel } from "@/components/ui/FeatureCarousel";
import { ViewMoreLink } from "@/components/ui/ViewMoreLink";

export function Gallery() {
    const { gallery } = siteContent;
    const items = gallery.images.map((img) => ({
        src: img.src,
        titleJp: img.caption,
    }));

    return (
        <section className="bg-[#1a1310] py-24 md:py-36">
            <div className="px-5 md:px-10 max-w-7xl mx-auto">
                <SectionHeader index="01" en={gallery.en} jp={gallery.jp} lead={gallery.leadCopy} />
                <FeatureCarousel items={items} aspect="aspect-[4/3]" />
                <ViewMoreLink href="/gallery" label="VIEW ALL PHOTOS" />
            </div>
        </section>
    );
}
