import { HeroSlider } from '@/components/HeroSlider';
import { DonationCTA } from '@/components/home/DonationCTA';
import { HomeStats } from '@/components/HomeStats';
import { ChildrenGrid } from '@/components/home/ChildrenGrid';
import { NewsSection } from '@/components/home/NewsSection';
import { HomeCTABanner } from '@/components/home/HomeCTABanner';
import { HowItWorks } from '@/components/home/HowItWorks';
import { ImpactStats } from '@/components/home/ImpactStats';
import { Testimonials } from '@/components/home/Testimonials';
import { HomeFAQ } from '@/components/home/HomeFAQ';

export default function HomePage() {
  return (
    <div className="page active" id="page-home">
      <HeroSlider />
      <DonationCTA />
      <HomeStats />
      <ChildrenGrid />
      <NewsSection />
      <HomeCTABanner />
      <HowItWorks />
      <ImpactStats />
      <Testimonials />
      <HomeFAQ />
    </div>
  );
}
