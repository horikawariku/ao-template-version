import { HeroFullBleed } from "@/components/sections/HeroFullBleed";
import { ConceptSenses } from "@/components/sections/ConceptSenses";
import { Facilities } from "@/components/sections/Facilities";
import { Gallery } from "@/components/sections/Gallery";
import { AccessMap } from "@/components/sections/AccessMap";
import { Options } from "@/components/sections/Options";
import { Nearby } from "@/components/sections/Nearby";
import { ReservationBanner } from "@/components/sections/ReservationBanner";
import { TrioTiles } from "@/components/sections/TrioTiles";
import { FaqSection } from "@/components/sections/FaqSection";
import { WelcomePopup } from "@/components/ui/WelcomePopup";

export default function Home() {
    return (
        <main>
            <WelcomePopup />
            <HeroFullBleed />
            <Gallery />
            <Facilities />
            <ConceptSenses />
            <AccessMap />
            <Options />
            <Nearby />
            <ReservationBanner />
            <FaqSection />
            <TrioTiles />
        </main>
    );
}
