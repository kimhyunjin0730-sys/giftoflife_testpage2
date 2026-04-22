import { HeroSlider } from '@/components/HeroSlider';
import { HomeStats } from '@/components/HomeStats';
import { KidsPreview } from '@/components/KidsPreview';
import { HowItWorks } from '@/components/home/HowItWorks';
import { NewsPreview } from '@/components/home/NewsPreview';
import { PartnersStrip } from '@/components/home/PartnersStrip';
import { FinalCTA } from '@/components/home/FinalCTA';

export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <HomeStats />
      <KidsPreview />
      <HowItWorks />
      <NewsPreview />
      <PartnersStrip />
      <FinalCTA />
    </>
  );
}
