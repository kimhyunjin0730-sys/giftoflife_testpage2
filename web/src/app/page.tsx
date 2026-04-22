import { HeroEditorial } from '@/components/home/HeroEditorial';
import { StatsRow } from '@/components/home/StatsRow';
import { ChildrenEditorial } from '@/components/home/ChildrenEditorial';
import { NewsEditorial } from '@/components/home/NewsEditorial';
import { ManifestoCTA } from '@/components/home/ManifestoCTA';
import { HowItWorksRefined } from '@/components/home/HowItWorksRefined';
import { ImpactStatsRefined } from '@/components/home/ImpactStatsRefined';
import { TestimonialsEditorial } from '@/components/home/TestimonialsEditorial';
import { FAQEditorial } from '@/components/home/FAQEditorial';

export default function HomePage() {
  return (
    <div className="editorial-page" id="page-home">
      <HeroEditorial />
      <StatsRow />
      <ChildrenEditorial />
      <NewsEditorial />
      <ManifestoCTA />
      <HowItWorksRefined />
      <ImpactStatsRefined />
      <TestimonialsEditorial />
      <FAQEditorial />
    </div>
  );
}
