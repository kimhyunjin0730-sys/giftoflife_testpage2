import type { Metadata } from 'next';
import { PartnersPage } from '@/components/partners/PartnersPage';

export const metadata: Metadata = { title: '파트너스' };

export default function PartnersRoute() {
  return <PartnersPage />;
}
