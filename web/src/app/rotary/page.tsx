import type { Metadata } from 'next';
import { RotaryPage } from '@/components/rotary/RotaryPage';

export const metadata: Metadata = { title: '로타리' };

export default function RotaryRoute() {
  return <RotaryPage />;
}
