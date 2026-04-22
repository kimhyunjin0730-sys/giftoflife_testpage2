import type { Metadata } from 'next';
import { IntroSection } from '@/components/about/IntroSection';

export const metadata: Metadata = {
  title: '소개',
  description: '선천성 심장병을 가진 세계 어린이들에게 수술과 지원을 제공하는 Gift of Life International Korea 의 소개입니다.',
};

export default function AboutIntroPage() {
  return <IntroSection />;
}
