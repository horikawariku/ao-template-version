import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { FaqSection } from "@/components/sections/FaqSection";

export const metadata: Metadata = { title: "よくある質問" };

export default function FaqPage() {
    return (
        <main>
            <PageHero en="FAQ" jp="よくある質問" />
            <FaqSection hideHeader />
        </main>
    );
}
