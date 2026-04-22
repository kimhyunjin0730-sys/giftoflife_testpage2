import type { Metadata } from 'next';
import { ActivitiesPage } from '@/components/activities/ActivitiesPage';

export const metadata: Metadata = { title: '우리의 활동' };

export default function ActivitiesRoute() {
  return <ActivitiesPage />;
}
