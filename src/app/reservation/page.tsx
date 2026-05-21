import type { Metadata } from "next";
import { siteContent } from "@/config/siteContent";
import { PageHero } from "@/components/ui/PageHero";
import { BookingLink } from "@/components/ui/BookingLink";

export const metadata: Metadata = { title: "ご予約" };

export default function ReservationPage() {
    const { reservation, booking } = siteContent;

    return (
        <main>
            <PageHero en="RESERVATION" jp="ご予約" image={siteContent.hero.images[0]} />

            <section className="bg-[#1a1310] py-20 md:py-28">
                <div className="px-5 md:px-10 max-w-3xl mx-auto">
                    <p
                        className="text-[14px] md:text-[15px] leading-[2] text-[#d8cfc1] text-center"
                        style={{ fontFamily: "var(--font-noto-serif-jp)" }}
                    >
                        {reservation.intro}
                    </p>

                    <div className="mt-12 flex justify-center">
                        <BookingLink
                            baseUrl={reservation.engineUrl ?? booking.url}
                            className="inline-flex items-center gap-3 px-10 py-4 rounded-full bg-[#f5efe6] text-[#1a1310] text-[11px] md:text-xs tracking-[0.3em] font-bold hover:bg-[#3E2820] hover:text-[#f5efe6] transition"
                            style={{ fontFamily: "var(--font-inter)" }}
                        >
                            {reservation.engineLabel.toUpperCase()}
                        </BookingLink>
                    </div>

                    <ul className="mt-16 border-t border-[#4a3a2f]">
                        {reservation.notes.map((note, i) => (
                            <li
                                key={i}
                                className="border-b border-[#4a3a2f] py-4 grid grid-cols-[28px_1fr] gap-4 items-baseline text-[13px] text-[#d8cfc1]"
                            >
                                <span
                                    className="text-[10px] tracking-[0.2em] text-[#9c9085]"
                                    style={{ fontFamily: "var(--font-inter)" }}
                                >
                                    {String(i + 1).padStart(2, "0")}
                                </span>
                                <span>{note}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </main>
    );
}
