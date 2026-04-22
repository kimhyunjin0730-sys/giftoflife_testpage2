import type { Metadata } from 'next';
import { DonatePage } from '@/components/donate/DonatePage';

export const metadata: Metadata = {
  title: '후원하기',
  description: '선천성 심장병 어린이들에게 새 생명을 선물하세요. 일반 후원 또는 로타리 회원 후원으로 참여하실 수 있습니다.',
};

export default function DonateRoute() {
  return <DonatePage />;
}
