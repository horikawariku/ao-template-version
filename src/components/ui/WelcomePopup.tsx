"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { siteContent } from "@/config/siteContent";
import { BookingLink } from "./BookingLink";

const STORAGE_KEY = "ao_popup_dismissed";

/**
 * 初回訪問時に表示する 10% OFF ポップアップ。
 * - localStorage で 1度閉じたら以降表示しない
 * - 公式サイト経由の予約が最安値であることを訴求
 */
export function WelcomePopup() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        try {
            const dismissed = localStorage.getItem(STORAGE_KEY);
            if (!dismissed) {
                const t = setTimeout(() => setVisible(true), 1200);
                return () => clearTimeout(t);
            }
        } catch {
            /* noop */
        }
    }, []);

    const close = () => {
        setVisible(false);
        try {
            localStorage.setItem(STORAGE_KEY, "1");
        } catch {
            /* noop */
        }
    };

    if (!visible) return null;

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-sm transition-opacity"
            style={{ background: "rgba(10,7,5,0.72)" }}
            onClick={close}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-md overflow-hidden bg-[#1a1310] text-[#f5efe6]"
                style={{ boxShadow: "0 24px 80px -12px rgba(0,0,0,0.75), 0 8px 24px -4px rgba(0,0,0,0.4)" }}
            >
                {/* 上部アクセント帯 (焼杉グラデーション) */}
                <div className="h-[2px] bg-gradient-to-r from-transparent via-[#f5efe6]/60 to-transparent" />

                {/* 閉じる */}
                <button
                    type="button"
                    aria-label="閉じる"
                    onClick={close}
                    className="absolute top-3 right-3 p-1.5 hover:bg-[#f5efe6]/10 transition-colors"
                >
                    <X size={18} strokeWidth={1.5} />
                </button>

                <div className="px-7 pt-10 pb-8 text-center">
                    <p
                        className="text-[11px] tracking-[0.32em] uppercase text-[#f5efe6]/65 mb-4 italic"
                        style={{ fontFamily: "var(--font-inter)" }}
                    >
                        — best price guarantee
                    </p>
                    <h2
                        className="text-2xl md:text-3xl font-medium leading-[1.35] mb-4"
                        style={{ fontFamily: "var(--font-noto-serif-jp)", letterSpacing: "-0.005em" }}
                    >
                        公式サイト経由が
                        <br />
                        <span className="text-[#f5efe6]">最安値 10% OFF</span>
                    </h2>
                    <p
                        className="text-[13px] leading-[1.85] text-[#d8cfc1] mb-8"
                        style={{ textWrap: "pretty" }}
                    >
                        他の予約サイトより 10% お得にご予約いただけます。
                        <br className="hidden md:block" />
                        空室確認はこちらから。
                    </p>

                    <BookingLink
                        baseUrl={siteContent.booking.url}
                        onClick={close}
                        className="group inline-flex items-center gap-3 px-10 py-4 bg-[#f5efe6] text-[#1a1310] text-[12px] tracking-[0.28em] font-bold transition-all duration-500 ease-out hover:-translate-y-0.5"
                        style={{
                            fontFamily: "var(--font-inter)",
                            boxShadow: "0 10px 28px -8px rgba(245,239,230,0.35)",
                        }}
                    >
                        <span>空室を確認する</span>
                        <span aria-hidden className="inline-block transition-transform duration-500 ease-out group-hover:translate-x-1">→</span>
                    </BookingLink>

                    <button
                        type="button"
                        onClick={close}
                        className="block mx-auto mt-5 text-[11px] tracking-[0.14em] text-[#f5efe6]/45 hover:text-[#f5efe6]/75 transition-colors"
                    >
                        後で見る
                    </button>
                </div>
            </div>
        </div>
    );
}
