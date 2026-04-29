import type { MetadataRoute } from 'next';

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.golikorearotary.or.kr';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/mypage/', '/login', '/signup', '/forgot'],
      },
    ],
    sitemap: `${BASE}/sitemap.xml`,
  };
}
