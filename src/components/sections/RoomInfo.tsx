"use client";

import { SectionHeader } from "@/components/ui/SectionHeader";
import { useFadeIn } from "@/lib/useFadeIn";

/**
 * 客室・設備情報 (mysa の Room Information 同型)。
 * specgrid カード + アメニティリスト。
 */

const SPECS: Array<{ label: string; value: string }> = [
    { label: "定員", value: "最大10名" },
    { label: "広さ", value: "床面積 約200㎡" },
    { label: "寝室", value: "洋室 (セミダブル×7) + 和室 (布団×3)" },
    { label: "チェックイン", value: "15:00〜20:00 (セルフ)" },
    { label: "チェックアウト", value: "〜10:00" },
    { label: "駐車場", value: "敷地内無料・複数台可" },
];

const AMENITIES: string[] = [
    "貸切サウナ (最高100℃・TV付き)",
    "水風呂 (最低14℃)",
    "インフィニティチェア × 5",
    "75型TV / HDMI (Netflix・YouTube)",
    "フルキッチン / 冷蔵庫 / 電子レンジ",
    "卓上IH × 2 / 調理道具・カトラリー一式",
    "バスタオル / フェイスタオル / 歯ブラシ",
    "ドライヤー / シャンプー / ボディソープ",
    "Wi-Fi完備",
    "BBQコンロ (オプション ¥2,200)",
];

export function RoomInfo() {
    const refGrid = useFadeIn<HTMLDivElement>();
    const refAmen = useFadeIn<HTMLUListElement>();

    return (
        <section className="bg-[#1a1310] py-20 md:py-28">
            <div className="px-6 md:px-10 max-w-7xl mx-auto">
                <SectionHeader en="Room Information" jp="客室・設備情報。" />

                <div ref={refGrid} className="fade-in grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-3.5 mb-9">
                    {SPECS.map((s) => (
                        <div key={s.label} className="rounded-[12px] border border-[#4a3a2f] bg-white/[0.045] px-4 py-3.5">
                            <span
                                className="block text-[10px] tracking-[0.12em] uppercase text-[#9c9085] font-semibold"
                                style={{ fontFamily: "var(--font-inter)" }}
                            >
                                {s.label}
                            </span>
                            <b className="block mt-1 text-[14px] md:text-[15px] font-medium text-[#f5efe6] leading-[1.5]">
                                {s.value}
                            </b>
                        </div>
                    ))}
                </div>

                <p className="text-[13px] font-bold text-[#d8cfc1] mb-3">提供されるアメニティ・設備</p>
                <ul ref={refAmen} className="fade-in grid grid-cols-1 md:grid-cols-2 md:gap-x-8">
                    {AMENITIES.map((a) => (
                        <li
                            key={a}
                            className="flex items-center gap-3 py-2.5 border-b border-[#3a2e26] text-[13.5px] text-[#d8cfc1]"
                        >
                            <span className="w-1 h-1 rounded-full bg-[#9c9085] flex-none" />
                            {a}
                        </li>
                    ))}
                </ul>
                <p className="mt-4 text-[11px] text-[#9c9085]">
                    ※ 塩・胡椒・油などの消耗品はご持参ください。
                </p>
            </div>
        </section>
    );
}
