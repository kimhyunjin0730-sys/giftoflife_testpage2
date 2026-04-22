import type { Metadata } from 'next';
import { GreetingSection } from '@/components/about/GreetingSection';

export const metadata: Metadata = { title: '인사말' };

export default function AboutGreetingPage() {
  return <GreetingSection />;
}
