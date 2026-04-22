import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { KIDS } from '@/data/kids';
import { KidDetail } from '@/components/children/KidDetail';

type Params = { id: string };

export function generateStaticParams() {
  return KIDS.map((k) => ({ id: k.id }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { id } = await params;
  const kid = KIDS.find((k) => k.id === id);
  if (!kid) return { title: '아이 이야기' };
  const name = typeof kid.name === 'string' ? kid.name : kid.name.ko;
  return {
    title: name,
    description: kid.story.ko.slice(0, 120),
    openGraph: {
      title: `${kid.flag} ${name} · 생명의 선물 코리아`,
      description: kid.story.ko.slice(0, 180),
      images: [{ url: kid.img }],
    },
  };
}

export default async function KidDetailPage({ params }: { params: Promise<Params> }) {
  const { id } = await params;
  const kid = KIDS.find((k) => k.id === id);
  if (!kid) notFound();
  return <KidDetail kid={kid} />;
}
