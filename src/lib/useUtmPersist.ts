"use client";

import { useEffect } from "react";

const COOKIE_NAME = "ao_utm";
const TTL_DAYS = 30;
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;

export type UtmKey = typeof UTM_KEYS[number];
export type UtmRecord = Partial<Record<UtmKey, string>>;

/* ----- Cookie utilities (client-side) ----- */

function getCookie(name: string): string | null {
    if (typeof document === "undefined") return null;
    const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
    return match ? decodeURIComponent(match[1]) : null;
}

function setCookie(name: string, value: string, days = TTL_DAYS) {
    if (typeof document === "undefined") return;
    const maxAge = days * 24 * 60 * 60;
    document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}; samesite=lax`;
}

export function readUtmCookie(): UtmRecord {
    const raw = getCookie(COOKIE_NAME);
    if (!raw) return {};
    try {
        return JSON.parse(raw) as UtmRecord;
    } catch {
        return {};
    }
}

export function writeUtmCookie(utm: UtmRecord) {
    if (Object.keys(utm).length === 0) return;
    setCookie(COOKIE_NAME, JSON.stringify(utm));
}

export const UTM_KEYS_LIST = UTM_KEYS;

/* ----- Hook ----- */

/**
 * 初回着地時にURLパラメータの UTM を Cookie に保管。
 * Middleware でも同じ Cookie 名を読むため、サーバー/クライアント両対応。
 */
export function useUtmPersist() {
    useEffect(() => {
        if (typeof window === "undefined") return;
        try {
            const url = new URL(window.location.href);
            const urlUtm: Record<string, string> = {};
            UTM_KEYS.forEach((k) => {
                const v = url.searchParams.get(k);
                if (v) urlUtm[k] = v;
            });
            const fbclid = url.searchParams.get("fbclid");
            if (fbclid) urlUtm.fbclid = fbclid; // Meta広告クリックID
            if (Object.keys(urlUtm).length > 0) {
                const existing = readUtmCookie();
                writeUtmCookie({ ...existing, ...urlUtm });
            }
        } catch {
            /* ignore */
        }
    }, []);
}

/** 期限内に保管された utm_source を取得 (なければ null) */
export function getStoredUtmSource(): string | null {
    return readUtmCookie().utm_source ?? null;
}

/** 保管された fbclid (Meta広告クリックID) を取得 (なければ null) */
export function getStoredFbclid(): string | null {
    return (readUtmCookie() as Record<string, string>).fbclid ?? null;
}

/**
 * redirect-tracker の base URL に、保管UTM(source)と fbclid を反映した URL を返す。
 * fbclid を引き継ぐことで、予約確定時に CAPI で Meta に Purchase を紐付けられる。
 */
export function buildBookingUrl(baseUrl: string): string {
    try {
        const url = new URL(baseUrl);
        const stored = getStoredUtmSource();
        if (stored) url.searchParams.set("s", stored);
        const fb = getStoredFbclid();
        if (fb) url.searchParams.set("fbclid", fb);
        return url.toString();
    } catch {
        return baseUrl;
    }
}
