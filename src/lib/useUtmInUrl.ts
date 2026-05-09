"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { readUtmCookie, UTM_KEYS_LIST } from "./useUtmPersist";

/**
 * クライアントサイド navigation 後に URLバーへ UTM を echo back する。
 * Cookie に保管された UTM が URL に欠けている場合、history.replaceState で同期。
 *
 * これにより /, /concept, /gallery 間の Next.js Link遷移後も
 * URLバーに UTM が残る → ユーザーがコピーして共有しても UTM が伝播。
 */
export function useUtmInUrl() {
    const pathname = usePathname();

    useEffect(() => {
        if (typeof window === "undefined") return;
        const cookieUtm = readUtmCookie();
        if (Object.keys(cookieUtm).length === 0) return;

        const url = new URL(window.location.href);
        let changed = false;
        UTM_KEYS_LIST.forEach((k) => {
            const v = cookieUtm[k];
            if (v && !url.searchParams.has(k)) {
                url.searchParams.set(k, v);
                changed = true;
            }
        });

        if (changed) {
            window.history.replaceState({}, "", url.toString());
        }
    }, [pathname]);
}
