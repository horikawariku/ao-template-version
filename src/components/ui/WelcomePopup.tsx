"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { siteContent } from "@/config/siteContent";
import { BookingLink } from "./BookingLink";

const STORAGE_KEY = "ao_popup_dismissed";

/**
 * 10% OFF ポップアップ (離脱意図トリガー版)。
 *
 * 旧: ロード1.2秒後に表示 → ファーストビュー到達前に全画面を遮り、
 *     初見ユーザーに「怪しい」印象を与えていた (CRO監査の最重要指摘)。
 * 新: 離脱の兆候を検知した時だけ表示する。
 *   - PC: カーソルがビューポート上端から外へ出た時 (タブを閉じる/戻る動作)
 *   - モバイル: 一度スクロールした後、上方向へ素早く戻った時 (離脱前の挙動)
 * - 表示は1ユーザー1回 (localStorage)
 * - デザインは mysa のウェルカムポップアップを踏襲 (クリーム地カード・角丸・
 *   大きな10% OFF・黒塗りCTA・「あとで見る」)
 */
export function WelcomePopup() {
    const [visible, setVisible] = useState(false);
    const shownRef = useRef(false);

    useEffect(() => {
        try {
            if (localStorage.getItem(STORAGE_KEY)) return;
        } catch {
            /* noop */
        }

        let armed = false;
        let maxScrollY = 0;
        let upAccum = 0;
        let lastY = window.scrollY;

        // ロード直後の誤発火を防ぐため 3 秒後に武装
        const armTimer = setTimeout(() => {
            armed = true;
        }, 3000);

        const trigger = () => {
            if (shownRef.current || !armed) return;
            shownRef.current = true;
            setVisible(true);
        };

        // PC: ビューポート上端からのマウス離脱
        const onMouseOut = (e: MouseEvent) => {
            if (e.relatedTarget === null && e.clientY <= 0) trigger();
        };

        // モバイル: 下に600px以上見た後、上方向へ累計400px以上の素早い戻り
        const onScroll = () => {
            const y = window.scrollY;
            maxScrollY = Math.max(maxScrollY, y);
            const delta = lastY - y; // 正 = 上方向
            if (delta > 0) {
                upAccum += delta;
            } else {
                upAccum = 0;
            }
            lastY = y;
            if (maxScrollY > 600 && upAccum > 400) trigger();
        };

        document.addEventListener("mouseout", onMouseOut);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => {
            clearTimeout(armTimer);
            document.removeEventListener("mouseout", onMouseOut);
            window.removeEventListener("scroll", onScroll);
        };
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
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-[3px] transition-opacity"
            style={{ background: "rgba(15,11,8,0.55)" }}
            onClick={close}
            role="dialog"
            aria-label="10%OFFのご案内"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-[380px] rounded-[22px] bg-[#f5efe6] text-[#1a1310] px-7 pt-10 pb-6 text-center"
                style={{ boxShadow: "0 30px 70px rgba(0,0,0,0.42)" }}
            >
                {/* 閉じる */}
                <button
                    type="button"
                    aria-label="閉じる"
                    onClick={close}
                    className="absolute top-2.5 right-3 p-2 text-[#5b5c50] hover:text-[#1a1310] transition-colors"
                >
                    <X size={20} strokeWidth={1.6} />
                </button>

                <p
                    className="text-[11px] tracking-[0.22em] uppercase font-bold text-[#2f3d31]"
                    style={{ fontFamily: "var(--font-inter)" }}
                >
                    Welcome ・ 公式サイト限定
                </p>

                <div className="flex items-baseline justify-center gap-2 mt-4 mb-1.5">
                    <span className="text-[54px] leading-none font-bold tracking-[0.01em]">10%</span>
                    <span className="text-[26px] leading-none font-bold tracking-[0.12em]">OFF</span>
                </div>

                <p className="text-[13.5px] leading-[1.85] text-[#5b5c50] mt-1.5 mb-5">
                    このサイト経由のご予約が、一番お得。
                    <br />
                    他の予約サイトより 10% OFF でご案内します。
                </p>

                <BookingLink
                    baseUrl={siteContent.booking.url}
                    onClick={close}
                    className="block w-full rounded-[13px] bg-[#14100c] text-[#f5efe6] text-[15px] font-bold py-4 transition-transform duration-300 hover:-translate-y-0.5"
                >
                    空室を確認する
                </BookingLink>

                <button
                    type="button"
                    onClick={close}
                    className="block mx-auto mt-3.5 text-[12.5px] text-[#5b5c50] underline underline-offset-[3px] hover:text-[#1a1310] transition-colors"
                >
                    あとで見る
                </button>
            </div>
        </div>
    );
}
