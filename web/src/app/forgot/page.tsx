import type { Metadata } from 'next';
import { ForgotPassword } from '@/components/auth/ForgotPassword';

export const metadata: Metadata = { title: '비밀번호 찾기' };

export default function ForgotRoute() {
  return <ForgotPassword />;
}
