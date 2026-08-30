"use client";

import { useEffect, useMemo, useState } from "react";
import { siteContent } from "@/config/siteContent";
import { ViewerCounter } from "@/components/ui/ViewerCounter";
import { BookingLink } from "@/components/ui/BookingLink";

/**
 * モバイル下部に常駐する予約CTA (mysa-site bookbar 同型)。
 * バーをタップすると日付・人数パネルが開き、選んだ日程は Airhost 予約ページに
 * 選択済みの状態で引き継がれる (redirect-tracker が start_date/end_date/guests をパススルー)。
 */
export function StickyReserveCTA() {
    const [visible, setVisible] = useState(false);
    const [open, setOpen] = useState(false);

    const today = useMemo(() => new Date().toISOString().slice(0, 10), []);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [guests, setGuests] = useState(4);

    const minEnd = useMemo(() => {
        if (!startDate) return today;
        const d = new Date(startDate);
        d.setDate(d.getDate() + 1);
        return d.toISOString().slice(0, 10);
    }, [startDate, today]);

    const ready = !!startDate && !!endDate && endDate > startDate;

    const datedBaseUrl = useMemo(() => {
        if (!ready) return siteContent.booking.url + "&cta=sticky";
        const p = new URLSearchParams({ cta: "sticky_date", start_date: startDate, end_date: endDate, guests: String(guests) });
        return siteContent.booking.url + "&" + p.toString();
    }, [ready, startDate, endDate, guests]);

    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > 600);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

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

                {/* 日付・人数パネル (バータップで開閉 / mysa クリーム調) */}
                {open && (
                    <div
                        className="mb-2.5 rounded-[20px] bg-[#f3ece1] text-[#212227] p-4"
                        style={{ boxShadow: "0 12px 34px rgba(20,16,12,0.22)" }}
                    >
                        <div className="grid grid-cols-2 gap-2.5">
                            <label className="block">
                                <span className="block text-[10px] tracking-[0.12em] text-[#5b5c50] mb-1 font-bold">チェックイン</span>
                                <input
                                    type="date" value={startDate} min={today}
                                    onChange={(e) => {
                                        setStartDate(e.target.value);
                                        if (endDate && e.target.value && endDate <= e.target.value) setEndDate("");
                                    }}
                                    className="w-full rounded-xl border border-[#212227]/15 bg-white px-3 py-2.5 text-sm"
                                />
                            </label>
                            <label className="block">
                                <span className="block text-[10px] tracking-[0.12em] text-[#5b5c50] mb-1 font-bold">チェックアウト</span>
                                <input
                                    type="date" value={endDate} min={minEnd}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    className="w-full rounded-xl border border-[#212227]/15 bg-white px-3 py-2.5 text-sm"
                                />
                            </label>
                            <label className="block">
                                <span className="block text-[10px] tracking-[0.12em] text-[#5b5c50] mb-1 font-bold">人数</span>
                                <select
                                    value={guests} onChange={(e) => setGuests(Number(e.target.value))}
                                    className="w-full rounded-xl border border-[#212227]/15 bg-white px-3 py-2.5 text-sm"
                                >
                                    {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                                        <option key={n} value={n}>{n}名</option>
                                    ))}
                                </select>
                            </label>
                            <div className="flex items-end">
                                <BookingLink
                                    baseUrl={datedBaseUrl}
                                    className={[
                                        "w-full text-center rounded-[15px] px-4 py-3 text-sm font-bold transition-colors",
                                        ready ? "bg-[#1a1310] text-white" : "bg-[#1a1310]/35 text-white",
                                    ].join(" ")}
                                >
                                    {ready ? "この日程で予約" : "日付を選択"}
                                </BookingLink>
                            </div>
                        </div>
                        <div className="mt-2.5 flex items-center justify-between">
                            <BookingLink
                                baseUrl={siteContent.booking.url + "&cta=sticky"}
                                className="text-[11px] text-[#5b5c50] underline underline-offset-2"
                            >
                                日付を決めずに空室を見る
                            </BookingLink>
                            <button onClick={() => setOpen(false)} className="text-[11px] text-[#5b5c50] px-2 py-1">
                                閉じる
                            </button>
                        </div>
                    </div>
                )}

                {/* bookbar 本体: タップでパネル開閉 */}
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
                        {open ? "閉じる" : "日付を選んで予約"}
                        <span aria-hidden className={"inline-block transition-transform duration-300 " + (open ? "rotate-90" : "group-hover:translate-x-1")}>→</span>
                    </span>
                </button>
            </div>
        </div>
    );
}
