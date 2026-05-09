import { NextRequest, NextResponse } from "next/server";

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;
const COOKIE_NAME = "ao_utm";
const TTL_SECONDS = 30 * 24 * 60 * 60;

/**
 * UTM を Cookie に保管し、URLバーに常時 echo back するミドルウェア。
 *
 * 動作:
 *  1. URLに utm_* がある場合: Cookie 更新して通す
 *  2. URLに utm_* が無く Cookie に utm_* がある場合: URLに付与してリダイレクト (302)
 *  3. どちらにも無い場合: そのまま通す
 *
 * client-side navigation (Next.js Link) は middleware を経由しないので、
 * useUtmInUrl 側でも URLバー同期する。
 */
export function middleware(req: NextRequest) {
    const { searchParams } = req.nextUrl;

    // 1. URL から utm_* を抽出
    const queryUtm: Record<string, string> = {};
    UTM_KEYS.forEach((k) => {
        const v = searchParams.get(k);
        if (v) queryUtm[k] = v;
    });
    const hasQueryUtm = Object.keys(queryUtm).length > 0;

    // 2. Cookie から utm_* を抽出
    const cookieRaw = req.cookies.get(COOKIE_NAME)?.value;
    let cookieUtm: Record<string, string> = {};
    if (cookieRaw) {
        try {
            cookieUtm = JSON.parse(cookieRaw);
        } catch {
            /* malformed cookie, ignore */
        }
    }
    const hasCookieUtm = Object.keys(cookieUtm).length > 0;

    // Case 1: query に UTM あり → Cookie 更新して通す
    if (hasQueryUtm) {
        const merged = { ...cookieUtm, ...queryUtm };
        const res = NextResponse.next();
        res.cookies.set(COOKIE_NAME, JSON.stringify(merged), {
            maxAge: TTL_SECONDS,
            path: "/",
            sameSite: "lax",
        });
        return res;
    }

    // Case 2: query に UTM なし、Cookie にあり → URLに付与してリダイレクト
    if (hasCookieUtm) {
        const url = req.nextUrl.clone();
        Object.entries(cookieUtm).forEach(([k, v]) => {
            url.searchParams.set(k, v);
        });
        return NextResponse.redirect(url, 302);
    }

    // Case 3: どちらも無い → 通す
    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * 以下を除外:
         * - /api/* (API ルート)
         * - /_next/static/* (静的ファイル)
         * - /_next/image (画像最適化)
         * - /favicon.ico, /robots.txt, /sitemap.xml
         * - 拡張子付きファイル (.png .jpg .css .js etc)
         */
        "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)",
    ],
};
