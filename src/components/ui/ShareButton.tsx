"use client";

import { useEffect, useState } from "react";
import { Share2, Check } from "lucide-react";

/**
 * 左下フローティングの共有ボタン (アイコンのみ・小)。
 * クリック時に現在のURLをクリップボードへコピー。
 * UTMはURLバーに保持されてるのでコピーURLにもそのまま引き継がれる。
 *
 * モバイル: stickyCTAの上 (bottom-[88px] left-4)
 * デスクトップ: 左下角 (bottom-6 left-6)
 * 表示条件: スクロール400px以上
 */
export function ShareButton() {
    const [visible, setVisible] = useState(false);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > 400);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const handleCopy = async () => {
        if (typeof window === "undefined") return;
        try {
            await navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            /* clipboard API unavailable (insecure context等) — silent fail */
        }
    };

    return (
        <button
            type="button"
            onClick={handleCopy}
            aria-label={copied ? "コピーしました" : "リンクをコピー"}
            className={[
                "fixed left-4 md:left-6 bottom-[88px] md:bottom-6 z-30",
                "w-11 h-11 rounded-full flex items-center justify-center",
                "bg-[#1f1610] text-[#f5efe6] border border-[#4a3a2f] shadow-lg",
                "transition-all duration-500 hover:bg-[#3E2820] hover:scale-110",
                visible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4 pointer-events-none",
            ].join(" ")}
        >
            {copied ? <Check size={18} strokeWidth={2} /> : <Share2 size={18} strokeWidth={1.5} />}
            {copied && (
                <span
                    className="absolute left-full ml-3 whitespace-nowrap text-[10px] tracking-[0.2em] text-[#f5efe6] bg-[#1f1610] border border-[#4a3a2f] px-2 py-1 rounded"
                    style={{ fontFamily: "var(--font-inter)" }}
                >
                    COPIED
                </span>
            )}
        </button>
    );
}
