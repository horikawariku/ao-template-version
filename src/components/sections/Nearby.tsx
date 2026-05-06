"use client";

import { siteContent } from "@/config/siteContent";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FeatureCarousel } from "@/components/ui/FeatureCarousel";
import { ViewMoreLink } from "@/components/ui/ViewMoreLink";

export function Nearby() {
    const { nearby } = siteContent;
    const items = nearby.items.map((item) => ({
        src: item.src,
        titleEn: item.en,
        titleJp: item.jp,
        note: item.time,
        desc: item.desc,
    }));

    return (
        <section className="bg-[#1a1310] py-24 md:py-36">
            <div className="px-5 md:px-10 max-w-7xl mx-auto">
                <SectionHeader index="06" en={nearby.en} jp={nearby.jp} lead={nearby.leadCopy} />
                <FeatureCarousel items={items} />
                <ViewMoreLink href="/leisure" label="VIEW NEARBY SPOTS" />
            </div>
        </section>
    );
}
