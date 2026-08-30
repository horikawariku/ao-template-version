"use client";

import { useEffect, useMemo, useState } from "react";
import { siteContent } from "@/config/siteContent";
import { ViewerCounter } from "@/components/ui/ViewerCounter";
import { BookingLink } from "@/components/ui/BookingLink";

/**
 * モバイル下部に常駐する予約CTA。
 * バーをタップするとカレンダーが開き、日付を直接タップして期間選択
 * (1タップ目=チェックイン、2タップ目=チェックアウト)。
 * 選んだ日程・人数は Airhost 予約ページに選択済みの状態で引き継がれる。
 */

const WDAYS = ["日", "月", "火", "水", "木", "金", "土"];

function ymd(d: Date): string {
    const p = (n: number) => (n < 10 ? "0" : "") + n;
    return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

function fmtShort(s: string): string {
    const d = new Date(s + "T00:00:00");
    return `${d.getMonth() + 1}/${d.getDate()}(${WDAYS[d.getDay()]})`;
}

export function StickyReserveCTA() {
    const [visible, setVisible] = useState(false);
    const [open, setOpen] = useState(false);

    const todayStr = useMemo(() => ymd(new Date()), []);
    const [viewMonth, setViewMonth] = useState(() => {
        const n = new Date();
        return new Date(n.getFullYear(), n.getMonth(), 1);
    });
    const [start, setStart] = useState<string | null>(null);
    const [end, setEnd] = useState<string | null>(null);
    const [guests, setGuests] = useState(4);

    const nights = useMemo(() => {
        if (!start || !end) return 0;
        return Math.round((new Date(end).getTime() - new Date(start).getTime()) / 86400000);
    }, [start, end]);

    const ready = !!start && !!end && nights > 0;

    const datedBaseUrl = useMemo(() => {
        if (!ready || !start || !end) return siteContent.booking.url + "&cta=sticky";
        const p = new URLSearchParams({ cta: "sticky_date", start_date: start, end_date: end, guests: String(guests) });
        return siteContent.booking.url + "&" + p.toString();
    }, [ready, start, end, guests]);

    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > 600);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const selectDay = (ds: string) => {
        if (!start || (start && end)) {
            setStart(ds);
            setEnd(null);
        } else if (ds > start) {
            setEnd(ds);
        } else {
            setStart(ds);
            setEnd(null);
        }
    };

    const canPrev = viewMonth.getTime() > new Date(new Date().getFullYear(), new Date().getMonth(), 1).getTime();
    const moveMonth = (diff: number) => {
        setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() + diff, 1));
    };

    // カレンダーセル生成
    const cells = useMemo(() => {
        const y = viewMonth.getFullYear();
        const m = viewMonth.getMonth();
        const firstDow = new Date(y, m, 1).getDay();
        const daysInMonth = new Date(y, m + 1, 0).getDate();
        const list: Array<{ ds: string; day: number } | null> = [];
        for (let i = 0; i < firstDow; i++) list.push(null);
        for (let d = 1; d <= daysInMonth; d++) list.push({ ds: ymd(new Date(y, m, d)), day: d });
        return list;
    }, [viewMonth]);

    return (
        <div
            className={[
                "fixed bottom-0 left-0 right-0 z-30 md:hidden transition-all duration-500",
                visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0",
            ].join(" ")}
        >
            <div className="px-4 pb-4 pt-3 bg-gradient-to-t from-[#1a1310] via-[#1a1310]/95 to-transparent">
                {!open && (
                    <div className="text-center mb-2">
                        <ViewerCounter className="text-[#d8cfc1]" />
                    </div>
                )}

                {/* カレンダーパネル (mysa調) */}
                {open && (
                    <div
                        className="mb-2.5 rounded-[20px] bg-[#f3ece1] text-[#212227] p-4"
                        style={{ boxShadow: "0 12px 34px rgba(20,16,12,0.22)", fontFamily: "var(--font-inter)" }}
                    >
                        {/* 月ヘッダー */}
                        <div className="flex items-center justify-between mb-2">
                            <button
                                type="button"
                                onClick={() => canPrev && moveMonth(-1)}
                                className={"w-9 h-9 rounded-full text-lg leading-none " + (canPrev ? "text-[#212227]" : "text-[#212227]/20")}
                                aria-label="前の月"
                            >
                                ‹
                            </button>
                            <div className="font-bold text-[14px] tracking-wide">
                                {viewMonth.getFullYear()}年{viewMonth.getMonth() + 1}月
                            </div>
                            <button type="button" onClick={() => moveMonth(1)} className="w-9 h-9 rounded-full text-lg leading-none text-[#212227]" aria-label="次の月">
                                ›
                            </button>
                        </div>

                        {/* 曜日 */}
                        <div className="grid grid-cols-7 gap-[3px] mb-[3px]">
                            {WDAYS.map((w) => (
                                <div key={w} className="text-center text-[10px] text-[#9a9684] py-0.5">{w}</div>
                            ))}
                        </div>

                        {/* 日付グリッド: タップで期間選択 */}
                        <div className="grid grid-cols-7 gap-[3px]">
                            {cells.map((c, i) => {
                                if (!c) return <div key={"e" + i} />;
                                const past = c.ds < todayStr;
                                const isStart = c.ds === start;
                                const isEnd = c.ds === end;
                                const inRange = start && end && c.ds > start && c.ds < end;
                                let cls = "aspect-square flex items-center justify-center rounded-[8px] text-[12px] leading-none select-none ";
                                if (past) cls += "text-[#c7c3b3] opacity-45";
                                else if (isStart || isEnd) cls += "bg-[#1a1310] text-white font-bold";
                                else if (inRange) cls += "bg-[#1a1310]/12 text-[#212227]";
                                else cls += "bg-white/70 text-[#212227] active:bg-[#1a1310]/15";
                                return (
                                    <button key={c.ds} type="button" disabled={past} onClick={() => selectDay(c.ds)} className={cls}>
                                        {c.day}
                                    </button>
                                );
                            })}
                        </div>

                        {/* 選択状態 + 人数 */}
                        <div className="mt-3 flex items-center justify-between gap-2">
                            <div className="text-[12px] font-bold min-h-[18px]">
                                {start && end
                                    ? `${fmtShort(start)} → ${fmtShort(end)}・${nights}泊`
                                    : start
                                    ? `${fmtShort(start)} → チェックアウト日をタップ`
                                    : "チェックイン日をタップ"}
                            </div>
                            <div className="flex items-center gap-1 flex-none">
                                <button type="button" onClick={() => setGuests(Math.max(1, guests - 1))} className="w-8 h-8 rounded-full bg-white/80 text-[#212227] text-base leading-none font-bold">−</button>
                                <span className="text-[12px] font-bold w-9 text-center">{guests}名</span>
                                <button type="button" onClick={() => setGuests(Math.min(10, guests + 1))} className="w-8 h-8 rounded-full bg-white/80 text-[#212227] text-base leading-none font-bold">＋</button>
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="mt-3">
                            <BookingLink
                                baseUrl={datedBaseUrl}
                                className={[
                                    "block w-full text-center rounded-[15px] px-4 py-3.5 text-[14px] font-bold transition-colors",
                                    ready ? "bg-[#1a1310] text-white" : "bg-[#1a1310]/30 text-white pointer-events-none",
                                ].join(" ")}
                            >
                                {ready ? `この日程で予約する (${nights}泊・${guests}名)` : "日付をタップして選択"}
                            </BookingLink>
                            <div className="mt-2 flex items-center justify-between">
                                <BookingLink baseUrl={siteContent.booking.url + "&cta=sticky"} className="text-[11px] text-[#5b5c50] underline underline-offset-2">
                                    日付を決めずに空室を見る
                                </BookingLink>
                                <button type="button" onClick={() => setOpen(false)} className="text-[11px] text-[#5b5c50] px-2 py-1">閉じる</button>
                            </div>
                        </div>
                    </div>
                )}

                {/* bookbar 本体 */}
                <button
                    type="button"
                    onClick={() => setOpen(!open)}
                    className="group flex w-full items-center justify-between gap-3 py-4 px-5 rounded-full bg-white text-[#1a1310] font-bold transition-all duration-300"
                    style={{
                        fontFamily: "var(--font-inter)",
                        boxShadow: "0 8px 28px -4px rgba(0,0,0,0.45), 0 2px 8px -2px rgba(0,0,0,0.25)",
                    }}
                >
                    <span className="flex items-baseline gap-1" style={{ fontVariantNumeric: "tabular-nums" }}>
                        <span className="text-lg tracking-[0.02em]">¥9,800</span>
                        <span className="text-[10px] tracking-[0.04em] text-[#1a1310]/65">〜/人</span>
                    </span>
                    <span className="flex items-center gap-2 text-[12px] tracking-[0.22em]">
                        {open ? "閉じる" : "日程を選ぶ"}
                        <span aria-hidden className={"inline-block transition-transform duration-300 " + (open ? "rotate-90" : "group-hover:translate-x-1")}>→</span>
                    </span>
                </button>
            </div>
        </div>
    );
}
