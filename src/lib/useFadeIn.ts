"use client";

import { useEffect, useRef } from "react";

/**
 * IntersectionObserver駆動のfade-in。
 * 任意の要素にrefを付け、ビューポートに入ったら .visible クラスを付与する。
 */
export function useFadeIn<T extends HTMLElement = HTMLElement>(options?: IntersectionObserverInit) {
    const ref = useRef<T | null>(null);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;

        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        io.unobserve(entry.target);
                    }
                });
            },
            // 発火を早める: 画面下端に触れた瞬間に開始 (旧: -10%マージン+10%表示で
            // 高速スクロール時に未発火のセクションが暗いまま残る問題があった)
            { rootMargin: "0px 0px 0px 0px", threshold: 0.01, ...options },
        );

        io.observe(node);
        return () => io.disconnect();
    }, [options]);

    return ref;
}
