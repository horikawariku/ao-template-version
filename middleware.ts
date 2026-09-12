import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * 新デザイン(public/newsite/ の静的サイト)への切り替えスイッチ。
 *
 * ロールバック手順 (2通り):
 *  1. Vercel ダッシュボード → Deployments → 切替前のデプロイ → Instant Rollback (数秒・再ビルド不要)
 *  2. 下の NEW_DESIGN_ENABLED を false にして push (約2分)
 *
 * 旧デザイン(Next.js App Router のページ群)はコードごと残っており、
 * このスイッチを切ればそのまま復活する。新サイトに無いパス(/faq 等)は
 * 引き続き旧ページが表示される (リンク切れを起こさないため)。
 */
const NEW_DESIGN_ENABLED = true;

// 新サイトが持つルート (ディレクトリは index.html に解決)
const PAGES = new Set(["/", "/gallery", "/gallery/", "/nearby", "/nearby/"]);
// 新サイトのルート直下ファイル
const ROOT_FILES = new Set(["/styles.css", "/booking.css", "/app.js", "/booking-core.mjs"]);
// 新サイトのサブディレクトリ (css・画像等)
const PREFIXES = ["/assets/", "/gallery/", "/nearby/"];

export function middleware(req: NextRequest) {
    if (!NEW_DESIGN_ENABLED) return NextResponse.next();

    const { pathname } = req.nextUrl;
    let target: string | null = null;

    if (PAGES.has(pathname)) {
        const base = pathname.replace(/\/+$/, "");
        target = `/newsite${base}/index.html`;
    } else if (ROOT_FILES.has(pathname) || PREFIXES.some((p) => pathname.startsWith(p))) {
        target = `/newsite${pathname}`;
    }

    if (target) {
        const url = req.nextUrl.clone();
        url.pathname = target;
        return NextResponse.rewrite(url);
    }
    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!_next|newsite|favicon.ico).*)"],
};
