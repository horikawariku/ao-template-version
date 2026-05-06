/**
 * ブランドロゴ (Netflix / YouTube / Amazon Prime)。
 * SVGパスは simple-icons.org の CC0 ライセンス資産をベースとしている。
 * トレードマーク自体はそれぞれの権利者に帰属。
 */

export function NetflixLogo({ size = 22 }: { size?: number }) {
    return (
        <svg
            viewBox="0 0 24 24"
            width={size}
            height={size}
            fill="#E50914"
            role="img"
            aria-label="Netflix"
        >
            <path d="M5.398 0v.006c3.028 8.556 5.37 15.175 8.348 23.596 2.344.058 4.85.398 4.854.398-2.8-7.924-5.923-16.747-8.487-24zm8.489 0v9.63L18.6 22.951c-.043-7.86-.004-15.913.002-22.95H13.89zm-8.487.002v24c2.55-.43 4.95-.6 7.55-.59l-7.55-23.41z" />
        </svg>
    );
}

export function YouTubeLogo({ size = 24 }: { size?: number }) {
    const w = size * 1.4;
    return (
        <svg
            viewBox="0 0 24 24"
            width={w}
            height={size}
            role="img"
            aria-label="YouTube"
        >
            <path
                fill="#FF0000"
                d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z"
            />
            <path fill="#FFFFFF" d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
    );
}

export function PrimeVideoLogo({ size = 22 }: { size?: number }) {
    // Amazon Prime Video の "prime" ワードマーク (青) + 微笑みカーブ。
    // フォントは sans-serif italic 太字。
    return (
        <span
            role="img"
            aria-label="Amazon Prime Video"
            className="inline-flex flex-col items-center leading-none"
            style={{
                fontFamily: "ui-sans-serif, system-ui, 'Segoe UI', Arial, sans-serif",
            }}
        >
            <span
                className="font-extrabold italic tracking-tight"
                style={{ color: "#00A8E1", fontSize: `${size * 0.7}px` }}
            >
                prime
            </span>
            <svg
                viewBox="0 0 30 6"
                width={size * 1.4}
                height={size * 0.28}
                aria-hidden="true"
                className="mt-[2px]"
            >
                <path
                    d="M2 2 Q15 6 28 2"
                    stroke="#00A8E1"
                    strokeWidth="1.6"
                    fill="none"
                    strokeLinecap="round"
                />
            </svg>
        </span>
    );
}

export const BRAND_LOGOS = {
    NETFLIX: NetflixLogo,
    YOUTUBE: YouTubeLogo,
    PRIME: PrimeVideoLogo,
} as const;

export type BrandKey = keyof typeof BRAND_LOGOS;
