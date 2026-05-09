"use client";

import Link from "next/link";
import { useEffect, useState, type ComponentProps, type ReactNode } from "react";
import { buildBookingUrl } from "@/lib/useUtmPersist";

type LinkRest = Omit<ComponentProps<typeof Link>, "href" | "children">;

interface Props extends LinkRest {
    /** redirect-tracker の base URL (例: ".../api/redirect?p=ao&s=direct") */
    baseUrl: string;
    children: ReactNode;
}

/**
 * 予約CTA用リンク。
 * 着地時に保管されたUTMが localStorage にあれば、`s=` を動的に上書きする。
 * SSR時は base そのまま、マウント後にUTMで再書込 (hydration安全)。
 */
export function BookingLink({ baseUrl, children, ...rest }: Props) {
    const [href, setHref] = useState<string>(baseUrl);

    useEffect(() => {
        setHref(buildBookingUrl(baseUrl));
    }, [baseUrl]);

    return (
        <Link href={href} {...rest}>
            {children}
        </Link>
    );
}
