import type { Metadata } from "next";
import { Mail, Instagram, MessageCircle } from "lucide-react";
import { siteContent } from "@/config/siteContent";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = { title: "お問い合わせ" };

const ICON_MAP: Record<string, React.ReactNode> = {
    Email: <Mail size={20} strokeWidth={1.5} />,
    "Instagram DM": <Instagram size={20} strokeWidth={1.5} />,
    LINE: <MessageCircle size={20} strokeWidth={1.5} />,
};

export default function ContactPage() {
    const { contact } = siteContent;

    return (
        <main>
            <PageHero en="CONTACT" jp="お問い合わせ" />

            <section className="bg-[#1a1310] py-20 md:py-28">
                <div className="px-5 md:px-10 max-w-3xl mx-auto">
                    <p
                        className="text-center text-[14px] md:text-[15px] leading-[2] text-[#d8cfc1]"
                        style={{ fontFamily: "var(--font-noto-serif-jp)" }}
                    >
                        {contact.intro}
                    </p>

                    <ul className="mt-12 border-t border-[#4a3a2f]">
                        {contact.channels.map((ch) => (
                            <li key={ch.label} className="border-b border-[#4a3a2f]">
                                <a
                                    href={ch.href}
                                    target={ch.href.startsWith("http") ? "_blank" : undefined}
                                    rel={ch.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                    className="flex items-center justify-between py-5 md:py-6 group"
                                >
                                    <div className="flex items-center gap-4">
                                        <span className="text-[#f5efe6]">{ICON_MAP[ch.label] ?? null}</span>
                                        <div>
                                            <p
                                                className="text-[10px] tracking-[0.3em] text-[#9c9085]"
                                                style={{ fontFamily: "var(--font-inter)" }}
                                            >
                                                {ch.label.toUpperCase()}
                                            </p>
                                            <p
                                                className="mt-1 text-[15px] md:text-[16px] text-[#f5efe6]"
                                                style={{ fontFamily: "var(--font-noto-serif-jp)" }}
                                            >
                                                {ch.value}
                                            </p>
                                        </div>
                                    </div>
                                    <span
                                        className="text-[11px] tracking-[0.25em] text-[#9c9085] group-hover:text-[#f5efe6] transition"
                                        style={{ fontFamily: "var(--font-inter)" }}
                                    >
                                        OPEN →
                                    </span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </main>
    );
}
