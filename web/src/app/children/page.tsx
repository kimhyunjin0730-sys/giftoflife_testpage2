import type { Metadata } from 'next';
import { ChildrenFull } from '@/components/ChildrenFull';

export const metadata: Metadata = {
  title: '우리 아이들',
  description: '전 세계에서 수술과 지원을 받은 아이들의 이야기. 작은 심장들이 다시 뛰는 순간.',
};

export default function ChildrenPage() {
  return <ChildrenFull />;
}
