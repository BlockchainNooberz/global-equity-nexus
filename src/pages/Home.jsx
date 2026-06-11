import AppLayout from "@/components/layout/AppLayout";
import HeroSection from "@/components/home/HeroSection";
import GlobalStatsBar from "@/components/home/GlobalStatsBar";
import ContinentGrid from "@/components/home/ContinentGrid";
import SDGSection from "@/components/home/SDGSection";
import PartnerOrgs from "@/components/home/PartnerOrgs";

export default function Home() {
  return (
    <AppLayout>
      <HeroSection />
      <GlobalStatsBar />
      <ContinentGrid />
      <SDGSection />
      <PartnerOrgs />
    </AppLayout>
  );
}