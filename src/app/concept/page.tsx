import type { Metadata } from "next";
import { siteContent } from "@/config/siteContent";
import { PageHero } from "@/components/ui/PageHero";
import { ConceptSenses } from "@/components/sections/ConceptSenses";
import { ReservationBanner } from "@/components/sections/ReservationBanner";

export const metadata: Metadata = { title: "コンセプト" };

export default function ConceptPage() {
    return (
        <main>
            <PageHero en="CONCEPT" jp="コンセプト" image={siteContent.concept.photo} />
            <ConceptSenses />
            <ReservationBanner />
        </main>
    );
}
