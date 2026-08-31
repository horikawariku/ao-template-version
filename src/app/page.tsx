import { HeroFullBleed } from "@/components/sections/HeroFullBleed";
import { ConceptIntro } from "@/components/sections/ConceptIntro";
import { ConceptSenses } from "@/components/sections/ConceptSenses";
import { Facilities } from "@/components/sections/Facilities";
import { RoomInfo } from "@/components/sections/RoomInfo";
import { Gallery } from "@/components/sections/Gallery";
import { AccessMap } from "@/components/sections/AccessMap";
import { Nearby } from "@/components/sections/Nearby";
import { ReservationBanner } from "@/components/sections/ReservationBanner";
import { FaqSection } from "@/components/sections/FaqSection";
import { WelcomePopup } from "@/components/ui/WelcomePopup";

export default function Home() {
    return (
        <main>
            <WelcomePopup />
            <HeroFullBleed />
            <ConceptIntro />
            <Gallery />
            <Facilities />
            <ConceptSenses />
            <RoomInfo />
            <Nearby />
            <FaqSection />
            <AccessMap />
            <ReservationBanner />
        </main>
    );
}
