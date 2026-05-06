"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";
import { siteContent } from "@/config/siteContent";

interface Props {
    /** 文言テンプレート ({n} が数値で置換される) */
    template?: string;
    /** 文字色 (CSS color) */
    className?: string;
    /** 数値を表示前に最低何カウントから出すか (0 だと常に出す) */
    minCount?: number;
}

/**
 * 本日の閲覧数カウンタ。
 * redirect-tracker の /api/viewer-count?p={propertyId} を叩いて表示。
 */
export function ViewerCounter({
    template = "本日 {n} 人が予約を検討しています",
    className = "text-white/85",
    minCount = 1,
}: Props) {
    const [count, setCount] = useState<number | null>(null);

    useEffect(() => {
        let cancelled = false;
        const url = `${siteContent.tracker.origin}/api/viewer-count?p=${siteContent.tracker.propertyId}`;
        fetch(url)
            .then((r) => r.json())
            .then((d: { count?: number }) => {
                if (cancelled) return;
                if (typeof d.count === "number" && d.count >= minCount) {
                    setCount(d.count);
                }
            })
            .catch(() => {
                /* silent */
            });
        return () => {
            cancelled = true;
        };
    }, [minCount]);

    if (count === null) return null;

    return (
        <div className={`inline-flex items-center gap-2 text-[11px] md:text-xs tracking-[0.15em] ${className}`}>
            <Eye size={13} strokeWidth={1.5} />
            <span>{template.replace("{n}", String(count))}</span>
        </div>
    );
}
