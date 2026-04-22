import { HeroSlider } from '@/components/HeroSlider';
import { DonationCTA } from '@/components/home/DonationCTA';
import { HomeStats } from '@/components/HomeStats';
import { ChildrenGrid } from '@/components/home/ChildrenGrid';
import { NewsSection } from '@/components/home/NewsSection';
import { HomeCTABanner } from '@/components/home/HomeCTABanner';

export default function HomePage() {
  return (
    <div className="page active" id="page-home">
      <HeroSlider />
      <DonationCTA />
      <HomeStats />
      <ChildrenGrid />
      <NewsSection />
      <HomeCTABanner />
    </div>
  );
}
