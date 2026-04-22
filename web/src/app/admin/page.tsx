import type { Metadata } from 'next';
import { AdminPanel } from '@/components/admin/AdminPanel';

export const metadata: Metadata = { title: '관리자 패널' };

export default function AdminRoute() {
  return <AdminPanel />;
}
