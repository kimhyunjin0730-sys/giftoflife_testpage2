import { HeroSlider } from '@/components/HeroSlider';
import { HomeStats } from '@/components/HomeStats';
import { KidsPreview } from '@/components/KidsPreview';

export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <HomeStats />
      <KidsPreview />
    </>
  );
}
