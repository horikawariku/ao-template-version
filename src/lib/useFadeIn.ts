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
            { rootMargin: "0px 0px -10% 0px", threshold: 0.1, ...options },
        );

        io.observe(node);
        return () => io.disconnect();
    }, [options]);

    return ref;
}
