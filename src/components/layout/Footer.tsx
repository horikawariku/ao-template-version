import Link from "next/link";
import { Instagram, MessageCircle, Mail } from "lucide-react";
import { siteContent } from "@/config/siteContent";

export function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="bg-[#1a1310] border-t border-[#3a2e26] mt-20 pb-24 md:pb-12">
            <div className="px-5 md:px-10 pt-16 pb-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6">
                    {/* Brand block */}
                    <div className="md:col-span-1">
                        <h2
                            className="tracking-[0.12em] text-[20px] text-[#f5efe6] mb-2"
                            style={{ fontFamily: "var(--font-noto-serif-jp)" }}
                        >
                            {siteContent.site.name}
                        </h2>
                        <p
                            className="text-[11px] tracking-[0.25em] text-[#d8cfc1] mb-4"
                            style={{ fontFamily: "var(--font-inter)" }}
                        >
                            {siteContent.site.nameEn}
                        </p>
                        <p className="text-xs leading-relaxed text-[#9c9085] max-w-xs">
                            {siteContent.site.description}
                        </p>
                    </div>

                    {/* Navigation */}
                    <div className="md:col-span-1">
                        <p
                            className="text-[10px] tracking-[0.3em] text-[#9c9085] mb-4"
                            style={{ fontFamily: "var(--font-inter)" }}
                        >
                            NAVIGATION
                        </p>
                        <ul className="grid grid-cols-2 gap-y-2 gap-x-4">
                            {siteContent.navigation.map((item) => (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className="text-xs text-[#d8cfc1] hover:text-[#f5efe6] transition flex items-baseline gap-2"
                                    >
                                        <span
                                            className="tracking-[0.15em]"
                                            style={{ fontFamily: "var(--font-inter)" }}
                                        >
                                            {item.en}
                                        </span>
                                        <span className="text-[10px] text-[#9c9085]">{item.jp}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact / Social */}
                    <div className="md:col-span-1">
                        <p
                            className="text-[10px] tracking-[0.3em] text-[#9c9085] mb-4"
                            style={{ fontFamily: "var(--font-inter)" }}
                        >
                            CONTACT
                        </p>
                        <ul className="space-y-3 text-xs text-[#d8cfc1]">
                            <li>{siteContent.access.address}</li>
                            <li className="flex items-center gap-2">
                                <Mail size={14} strokeWidth={1.5} />
                                <a href={`mailto:${siteContent.site.email}`} className="hover:text-[#f5efe6]">
                                    {siteContent.site.email}
                                </a>
                            </li>
                        </ul>

                        <div className="flex items-center gap-4 mt-5">
                            {siteContent.site.instagram && (
                                <a
                                    href={siteContent.site.instagram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Instagram"
                                    className="text-[#d8cfc1] hover:text-[#f5efe6] transition"
                                >
                                    <Instagram size={18} strokeWidth={1.5} />
                                </a>
                            )}
                            {siteContent.site.line && (
                                <a
                                    href={siteContent.site.line}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="LINE"
                                    className="text-[#d8cfc1] hover:text-[#f5efe6] transition"
                                >
                                    <MessageCircle size={18} strokeWidth={1.5} />
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                <div className="mt-14 pt-6 border-t border-[#3a2e26] flex flex-col md:flex-row justify-between items-start md:items-center gap-3 text-[10px] tracking-[0.15em] text-[#9c9085]">
                    <span>© {year} {siteContent.site.name}. All rights reserved.</span>
                    <span style={{ fontFamily: "var(--font-inter)" }}>
                        {siteContent.site.location.toUpperCase()}
                    </span>
                </div>
            </div>
        </footer>
    );
}
