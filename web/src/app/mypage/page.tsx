import type { Metadata } from 'next';
import { MyPage } from '@/components/MyPage';

export const metadata: Metadata = { title: '나의 후원' };

export default function MyRoute() {
  return <MyPage />;
}
