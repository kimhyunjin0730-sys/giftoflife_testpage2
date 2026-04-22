import type { Lang } from '@/i18n/types';

/**
 * Supabase news_posts 가 비어있을 때 사용할 기본 뉴스 세트.
 * 기존 index.html 의 DEFAULT_NEWS 에서 이관.
 */
export type NewsItem = {
  id: string | number;
  cat: Record<Lang, string>;
  date: string;
  title: Record<Lang, string>;
  desc: Record<Lang, string>;
  img: string;
  url?: string;
};

export const DEFAULT_NEWS: NewsItem[] = [
  {
    id: 'local-1',
    cat: { ko: '글로벌', en: 'Global', zh: '全球' },
    date: '2026.03.12',
    title: {
      ko: '이집트 심장 수술 팀 파견 완료',
      en: 'Heart Surgery Team Deployed to Egypt',
      zh: '心脏手术团队成功前往埃及',
    },
    desc: {
      ko: 'La Jolla Sunrise Rotary Club의 지원으로 이집트 심장 수술 팀 파견이 성공적으로 완료되었습니다.',
      en: 'With support from La Jolla Sunrise Rotary Club, our surgical team was successfully deployed to Egypt.',
      zh: '在La Jolla Sunrise扶轮社支持下，我们的手术团队成功前往埃及。',
    },
    img: '/images/kids/paisleigh-malawi.jpg',
    url: 'https://giftoflifeinternational.org',
  },
  {
    id: 'local-2',
    cat: { ko: '수술 사례', en: 'Success Story', zh: '成功案例' },
    date: '2026.02.28',
    title: {
      ko: '우간다의 Maria — Wolfson 메디컬 센터에서 수술 성공',
      en: 'Maria from Uganda — Surgery Success at Wolfson Medical Center',
      zh: '乌干达的 Maria——在 Wolfson 医疗中心手术成功',
    },
    desc: {
      ko: '이스라엘 Wolfson 메디컬 센터에서 심장 수술을 받은 우간다의 마리아가 새로운 삶을 얻었습니다.',
      en: 'Maria from Uganda received her heart surgery at Wolfson Medical Center in Israel and has been given a new life.',
      zh: '乌干达的 Maria 在以色列 Wolfson 医疗中心接受心脏手术，迎来了新的人生。',
    },
    img: '/images/kids/maria-uganda.jpg',
  },
  {
    id: 'local-3',
    cat: { ko: '클럽 소식', en: 'Club News', zh: '俱乐部动态' },
    date: '2026.02.15',
    title: {
      ko: '글로벌 온라인 위성클럽 — 6월 공식 발족',
      en: 'Global Online Satellite Club — Official Launch in June',
      zh: '全球在线卫星社——6月正式成立',
    },
    desc: {
      ko: '로타리 125년 역사상 최초로 국경 없는 글로벌 온라인 위성클럽을 설립합니다.',
      en: "The world's first borderless global online Rotary satellite club launches in June.",
      zh: '扶轮社125年历史上首个无国界全球在线卫星社将于6月成立。',
    },
    img: '/images/partners/rotary-logo.png',
  },
  {
    id: 'local-4',
    cat: { ko: '50주년', en: 'Anniversary', zh: '50周年' },
    date: '2025.05',
    title: {
      ko: 'Gift of Life International 50주년',
      en: 'Gift of Life International — 50th Golden Jubilee',
      zh: '生命礼物国际50周年',
    },
    desc: {
      ko: '1975년 뉴욕에서 시작된 Gift of Life International의 50주년을 축하합니다.',
      en: 'Celebrating 50 years of Gift of Life International, founded in New York in 1975.',
      zh: '庆祝1975年在纽约创立的生命礼物国际50周年。',
    },
    img: '/gift_of_life_logo.png',
  },
  {
    id: 'local-5',
    cat: { ko: '후원 캠페인', en: 'Campaign', zh: '募捐活动' },
    date: '2026.04.22',
    title: {
      ko: '라힘을 도와주세요 — 말라위에서 인도로',
      en: "Help Rahim — From Malawi to India",
      zh: '帮助 Rahim——从马拉维到印度',
    },
    desc: {
      ko: '말라위에서 온 세 살배기 라힘이 인도 파트너 병원에서 심장 수술을 받습니다.',
      en: "Three-year-old Rahim from Malawi is receiving heart surgery at our partner hospital in India.",
      zh: '来自马拉维的三岁 Rahim 在我们印度的合作医院接受心脏手术。',
    },
    img: '/images/kids/rahim-malawi.jpg',
  },
  {
    id: 'local-6',
    cat: { ko: '5월 음악회', en: 'Concert', zh: '音乐会' },
    date: '2026.03.05',
    title: {
      ko: '자선 음악회 안내 — 5월 2일 국립극장',
      en: 'Charity Concert — May 2, National Theater',
      zh: '慈善音乐会——5月2日国立剧场',
    },
    desc: {
      ko: '심장병 어린이 수술을 위한 자선 음악회가 5월 2일 오후 5시 국립극장에서 개최됩니다.',
      en: 'A charity concert to fund heart surgery will be held at the National Theater on May 2nd at 5 PM.',
      zh: '为心脏病儿童手术筹款的慈善音乐会将于5月2日下午5时在国立剧场举行。',
    },
    img: '/images/kids/danna-bolivia.jpg',
  },
];

/** DB 행을 NewsItem 으로 변환 (news_posts 스키마 기준) */
export function rowToNewsItem(r: Record<string, unknown>): NewsItem {
  const get = (k: string): string => (typeof r[k] === 'string' ? (r[k] as string) : '');
  return {
    id: (r.id as number | string) ?? '',
    cat: {
      ko: get('cat_ko') || '공지',
      en: get('cat_en') || get('cat_ko') || 'News',
      zh: get('cat_zh') || get('cat_ko') || '公告',
    },
    date: get('date') || ((typeof r.created_at === 'string' && r.created_at.slice(0, 10)) || ''),
    title: {
      ko: get('title_ko') || get('title_en') || '',
      en: get('title_en') || get('title_ko') || '',
      zh: get('title_zh') || get('title_ko') || '',
    },
    desc: {
      ko: get('desc_ko') || '',
      en: get('desc_en') || get('desc_ko') || '',
      zh: get('desc_zh') || get('desc_ko') || '',
    },
    img: get('img') || '/images/kids/paisleigh-malawi.jpg',
    url: get('url') || undefined,
  };
}
