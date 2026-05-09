"use client";

import { useUtmPersist } from "@/lib/useUtmPersist";
import { useUtmInUrl } from "@/lib/useUtmInUrl";

/**
 * UTM追跡の起動コンポーネント。
 * - useUtmPersist: 着地時の URL UTM を Cookie に保管
 * - useUtmInUrl: 各navigation後にCookie のUTMをURLバーに echo
 *
 * RootLayoutから1回だけマウントすればOK。
 */
export function UtmCapture() {
    useUtmPersist();
    useUtmInUrl();
    return null;
}
