"use client";

import Image from "next/image";
import { siteContent } from "@/config/siteContent";
import { useFadeIn } from "@/lib/useFadeIn";

/**
 * コンセプト導入 (mysa の Concept セクション同型)。
 * eyebrow + 大見出し + リード文 + 写真1枚。
 */
export function ConceptIntro() {
    const ref = useFadeIn<HTMLDivElement>();

    return (
        <section className="bg-[#1a1310] pt-20 pb-14 md:pt-28 md:pb-20">
            <div ref={ref} className="fade-in px-6 md:px-10 max-w-3xl mx-auto md:mx-0 md:pl-12">
                <p
                    className="text-[11px] tracking-[0.26em] uppercase font-semibold text-[#b7ab9d]"
                    style={{ fontFamily: "var(--font-inter)" }}
                >
                    Concept
                </p>
                <h2
                    className="mt-3 text-[24px] md:text-[30px] leading-[1.6] font-medium text-[#f5efe6]"
                    style={{ fontFamily: "var(--font-noto-serif-jp)" }}
                >
                    田園風景にひらく、
                    <br />
                    200㎡の貸切古民家。
                </h2>
                <p className="mt-5 text-[14px] leading-[2.1] text-[#d8cfc1]">
                    古民家を大リフォームした、サウナ付きの一棟貸しヴィラ。目の前には田園風景が広がり、春は芽生え、夏は新緑、秋は稲穂、冬は雪景色と、四季ごとに表情を変えます。最高100℃のサウナ、14℃の水風呂、焚き火、BBQ、75型シアター。豊かな時間を過ごすために必要なものを、すべて揃えました。
                </p>
                <div className="mt-8 rounded-[16px] overflow-hidden aspect-[4/3]">
                    <Image
                        src={siteContent.facilities.photo}
                        alt="AO のリビング"
                        width={1200}
                        height={900}
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
        </section>
    );
}
