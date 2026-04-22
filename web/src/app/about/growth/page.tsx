import type { Metadata } from 'next';
import { GrowthSection } from '@/components/about/GrowthSection';

export const metadata: Metadata = { title: '단체발전' };

export default function AboutGrowthPage() {
  return <GrowthSection />;
}
