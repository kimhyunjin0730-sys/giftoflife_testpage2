import type { Metadata } from 'next';
import { MissionSection } from '@/components/about/MissionSection';

export const metadata: Metadata = { title: '방문교육과 임무' };

export default function AboutMissionPage() {
  return <MissionSection />;
}
