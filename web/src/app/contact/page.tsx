import type { Metadata } from 'next';
import { ContactForm } from '@/components/ContactForm';

export const metadata: Metadata = { title: '문의하기' };

export default function ContactPage() {
  return <ContactForm />;
}
