"use client";

import Link from "next/link";
import { useEffect } from "react";
import { X, Instagram, MessageCircle } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { siteContent } from "@/config/siteContent";
import { BookingLink } from "@/components/ui/BookingLink";

interface Props {
    open: boolean;
    onClose: () => void;
}

/**
 * 右からスライドするフルハイトのドロワー。
 * EN/JP ペアでナビ。下部にSNSアイコンと予約CTA。
 */
export function MobileDrawer({ open, onClose }: Props) {
    useEffect(() => {
        if (!open) return;
        const original = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", onKey);
        return () => {
            document.body.style.overflow = original;
            window.removeEventListener("keydown", onKey);
        };
    }, [open, onClose]);

    return (
        <AnimatePresence>
            {open && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        key="backdrop"
                        className="fixed inset-0 z-50 bg-black/40"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={onClose}
                    />

                    {/* Drawer */}
                    <motion.aside
                        key="drawer"
                        className="fixed top-0 right-0 bottom-0 z-50 w-full sm:w-[440px] bg-[#1a1310] flex flex-col"
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "tween", duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div className="flex items-center justify-between px-6 h-14 md:h-16">
                            <span
                                className="tracking-[0.25em] text-[11px] md:text-xs text-[#f5efe6]"
                                style={{ fontFamily: "var(--font-inter)" }}
                            >
                                MENU
                            </span>
                            <button
                                aria-label="メニューを閉じる"
                                onClick={onClose}
                                className="p-2 -mr-2 text-[#f5efe6]"
                            >
                                <X size={22} strokeWidth={1.5} />
                            </button>
                        </div>

                        <nav className="flex-1 flex flex-col justify-center px-10 md:px-14 gap-7">
                            {siteContent.navigation.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={onClose}
                                    className="group flex items-baseline justify-between border-b border-[#4a3a2f] pb-4"
                                >
                                    <span
                                        className="text-[26px] md:text-[32px] tracking-[0.06em] text-[#f5efe6] group-hover:opacity-60 transition"
                                        style={{ fontFamily: "var(--font-inter)" }}
                                    >
                                        {item.en}
                                    </span>
                                    <span
                                        className="text-[11px] tracking-[0.2em] text-[#9c9085]"
                                        style={{ fontFamily: "var(--font-noto-serif-jp)" }}
                                    >
                                        {item.jp}
                                    </span>
                                </Link>
                            ))}
                        </nav>

                        <div className="px-10 md:px-14 pb-10 pt-6 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                {siteContent.site.instagram && (
                                    <a
                                        href={siteContent.site.instagram}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="Instagram"
                                        className="text-[#f5efe6] hover:opacity-60 transition"
                                    >
                                        <Instagram size={20} strokeWidth={1.5} />
                                    </a>
                                )}
                                {siteContent.site.line && (
                                    <a
                                        href={siteContent.site.line}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="LINE"
                                        className="text-[#f5efe6] hover:opacity-60 transition"
                                    >
                                        <MessageCircle size={20} strokeWidth={1.5} />
                                    </a>
                                )}
                            </div>
                            <BookingLink
                                baseUrl={siteContent.booking.url}
                                onClick={onClose}
                                className="text-[11px] tracking-[0.25em] text-[#f5efe6] border border-[#f5efe6] px-5 py-3 hover:bg-[#f5efe6] hover:text-[#1a1310] transition"
                                style={{ fontFamily: "var(--font-inter)" }}
                            >
                                RESERVATION
                            </BookingLink>
                        </div>
                    </motion.aside>
                </>
            )}
        </AnimatePresence>
    );
}
