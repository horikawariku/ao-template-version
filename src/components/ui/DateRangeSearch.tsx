"use client";

import { useMemo, useState } from "react";
import { siteContent } from "@/config/siteContent";
import { BookingLink } from "@/components/ui/BookingLink";

/**
 * 日付検索バー (mysa調)。
 * バーの日付部分をタップするとカレンダーが開き、日付を直接タップして期間選択
 * (1タップ目=チェックイン、2タップ目=チェックアウト)。
 * 選択済みの日程・人数は Airhost 予約ページへ選択済みの状態で引き継がれる。
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

interface Props {
    /** カレンダーをバーの上に開く (固定フッター用) */
    dropUp?: boolean;
    /** CTA計測用の識別子 */
    ctaId: string;
}

export function DateRangeSearch({ dropUp = false, ctaId }: Props) {
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

    const bookUrl = useMemo(() => {
        if (!ready || !start || !end) return siteContent.booking.url + `&cta=${ctaId}`;
        const p = new URLSearchParams({ cta: `${ctaId}_date`, start_date: start, end_date: end, guests: String(guests) });
        return siteContent.booking.url + "&" + p.toString();
    }, [ready, start, end, guests, ctaId]);

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
    const moveMonth = (diff: number) => setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() + diff, 1));

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

    const calendar = (
        <div
            className={"absolute left-0 right-0 z-50 rounded-[20px] bg-[#f3ece1] text-[#212227] p-4 " + (dropUp ? "bottom-full mb-2" : "top-full mt-2")}
            style={{ boxShadow: "0 12px 34px rgba(20,16,12,0.28)", fontFamily: "var(--font-inter)" }}
        >
            <div className="flex items-center justify-between mb-2">
                <button type="button" onClick={() => canPrev && moveMonth(-1)}
                        className={"w-9 h-9 rounded-full text-lg leading-none " + (canPrev ? "text-[#212227]" : "text-[#212227]/20")} aria-label="前の月">‹</button>
                <div className="font-bold text-[14px] tracking-wide">{viewMonth.getFullYear()}年{viewMonth.getMonth() + 1}月</div>
                <button type="button" onClick={() => moveMonth(1)} className="w-9 h-9 rounded-full text-lg leading-none text-[#212227]" aria-label="次の月">›</button>
            </div>
            <div className="grid grid-cols-7 gap-[3px] mb-[3px]">
                {WDAYS.map((w) => (
                    <div key={w} className="text-center text-[10px] text-[#9a9684] py-0.5">{w}</div>
                ))}
            </div>
            <div className="grid grid-cols-7 gap-[3px]">
                {cells.map((c, i) => {
                    if (!c) return <div key={"e" + i} />;
                    const past = c.ds < todayStr;
                    const isEdge = c.ds === start || c.ds === end;
                    const inRange = start && end && c.ds > start && c.ds < end;
                    let cls = "aspect-square flex items-center justify-center rounded-[8px] text-[12px] leading-none select-none ";
                    if (past) cls += "text-[#c7c3b3] opacity-45";
                    else if (isEdge) cls += "bg-[#1a1310] text-white font-bold";
                    else if (inRange) cls += "bg-[#1a1310]/12 text-[#212227]";
                    else cls += "bg-white/70 text-[#212227] active:bg-[#1a1310]/15";
                    return (
                        <button key={c.ds} type="button" disabled={past} onClick={() => selectDay(c.ds)} className={cls}>{c.day}</button>
                    );
                })}
            </div>
            <div className="mt-3 flex items-center justify-between gap-2">
                <div className="text-[12px] font-bold min-h-[18px]">
                    {start && end ? `${fmtShort(start)} → ${fmtShort(end)}・${nights}泊`
                        : start ? `${fmtShort(start)} → チェックアウト日をタップ`
                        : "チェックイン日をタップ"}
                </div>
                <div className="flex items-center gap-1 flex-none">
                    <button type="button" onClick={() => setGuests(Math.max(1, guests - 1))} className="w-8 h-8 rounded-full bg-white/80 text-base leading-none font-bold">−</button>
                    <span className="text-[12px] font-bold w-9 text-center">{guests}名</span>
                    <button type="button" onClick={() => setGuests(Math.min(10, guests + 1))} className="w-8 h-8 rounded-full bg-white/80 text-base leading-none font-bold">＋</button>
                </div>
            </div>
            {ready && (
                <BookingLink baseUrl={bookUrl}
                             className="mt-3 block w-full text-center rounded-[15px] px-4 py-3.5 text-[14px] font-bold bg-[#1a1310] text-white">
                    この日程で予約する ({nights}泊・{guests}名)
                </BookingLink>
            )}
            <div className="mt-2 flex items-center justify-between">
                <BookingLink baseUrl={siteContent.booking.url + `&cta=${ctaId}`} className="text-[11px] text-[#5b5c50] underline underline-offset-2">
                    日付を決めずに空室を見る
                </BookingLink>
                <button type="button" onClick={() => setOpen(false)} className="text-[11px] text-[#5b5c50] px-2 py-1">閉じる</button>
            </div>
        </div>
    );

    return (
        <div className="relative w-full max-w-[440px]" style={{ fontFamily: "var(--font-inter)" }}>
            {open && calendar}
            {/* 検索バー本体 (mysa bookbar 同型・金額なし) */}
            <div
                className="flex items-center gap-2 rounded-full bg-[#f3ece1] text-[#212227] p-2 pl-5"
                style={{ boxShadow: "0 12px 34px rgba(20,16,12,0.22)" }}
            >
                <button type="button" onClick={() => setOpen(!open)} className="flex-1 text-left py-2 min-w-0">
                    <span className={"block text-[13px] font-bold truncate " + (ready ? "" : "text-[#212227]/60")}>
                        {ready && start && end ? `${fmtShort(start)} → ${fmtShort(end)}` : "チェックイン → チェックアウト"}
                    </span>
                    <span className="block text-[10px] text-[#9a9684] tracking-[0.08em] mt-0.5">
                        {ready ? `${nights}泊・${guests}名` : "タップして日付を選択"}
                    </span>
                </button>
                {ready ? (
                    <BookingLink baseUrl={bookUrl}
                                 className="flex-none rounded-full bg-[#1a1310] text-white px-7 py-3.5 text-[13px] font-bold">
                        予約
                    </BookingLink>
                ) : (
                    <button type="button" onClick={() => setOpen(!open)}
                            className="flex-none rounded-full bg-[#1a1310] text-white px-7 py-3.5 text-[13px] font-bold">
                        {open ? "閉じる" : "日付を選ぶ"}
                    </button>
                )}
            </div>
        </div>
    );
}
