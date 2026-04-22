import type { MetadataRoute } from 'next';
import { KIDS } from '@/data/kids';
import { DEFAULT_NEWS } from '@/data/news-defaults';
import { DEFAULT_NOTICES } from '@/data/notices';

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://giftoflife-testpage2.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    '',
    '/about',
    '/about/greeting',
    '/about/growth',
    '/about/mission',
    '/partners',
    '/rotary',
    '/children',
    '/activities',
    '/news',
    '/notices',
    '/donate',
    '/contact',
    '/login',
    '/signup',
  ].map((path) => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: path === '' ? 1.0 : 0.8,
  }));

  const kidRoutes: MetadataRoute.Sitemap = KIDS.map((k) => ({
    url: `${BASE}/children/${k.id}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  const newsRoutes: MetadataRoute.Sitemap = DEFAULT_NEWS.map((n) => ({
    url: `${BASE}/news/${n.id}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.5,
  }));

  const noticeRoutes: MetadataRoute.Sitemap = DEFAULT_NOTICES.map((n) => ({
    url: `${BASE}/notices/${n.id}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.5,
  }));

  return [...staticRoutes, ...kidRoutes, ...newsRoutes, ...noticeRoutes];
}
