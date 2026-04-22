import type { Lang } from '@/i18n/types';

export type NoticeRow = {
  id: string | number;
  no: string;
  title: Record<Lang, string>;
  content: Record<Lang, string>;
  author: Record<Lang, string>;
  date: string;
  views: number;
  isNew: boolean;
  isNotice: boolean;
  category: string;
};

export const DEFAULT_NOTICES: NoticeRow[] = [
  {
    id: 1,
    no: '공지',
    title: {
      ko: '2024년 연간 기부금 모금액 및 활용실적 명세서 공개',
      en: '2024 Annual Donation Report Published',
      zh: '2024年度捐款报告公开',
    },
    content: {
      ko: '법인세법 시행령에 따라 연간 기부금 모금액 및 활용실적을 공개합니다.\n\n■ 법인명: 사단법인 기프트오브라이프 인터내셔널코리아\n■ 사업연도: 2024-12\n■ 공익법인 지정일: 2024-01-01\n■ 소재지: 서울특별시 영등포구 선유로3길 10, 2층',
      en: 'Annual donation collection and usage report disclosed in accordance with the Corporate Tax Act.',
      zh: '根据法人税法施行令相关条款，特此公开年度捐款筹集及使用实绩明细书。',
    },
    author: { ko: '운영사무국', en: 'Admin', zh: '运营办公室' },
    date: '2025-04-30',
    views: 312,
    isNew: true,
    isNotice: true,
    category: 'notice',
  },
  {
    id: 2,
    no: '공지',
    title: {
      ko: '2026년 연회비 납부 안내',
      en: '2026 Membership Fee Notice',
      zh: '2026年会费通知',
    },
    content: {
      ko: '2026년도 연회비 납부 기간 및 방법을 안내드립니다.\n\n■ 납부 기간: 2026년 1월 1일 ~ 3월 31일\n■ 납부 금액: 서포터 월 20,000원 / 챔피언 월 30,000원',
      en: '2026 membership fee payment period: Jan 1 – Mar 31. Supporter ₩20,000/month | Champion ₩30,000/month',
      zh: '2026年度会费缴纳期间：2026年1月1日至3月31日。',
    },
    author: { ko: '운영사무국', en: 'Admin', zh: '运营办公室' },
    date: '2026-03-15',
    views: 218,
    isNew: true,
    isNotice: true,
    category: 'notice',
  },
  {
    id: 3,
    no: '공지',
    title: {
      ko: '5월 2일 자선 음악회 안내 (국립극장 오후 5시)',
      en: 'Charity Concert – May 2 (5 PM, National Theater)',
      zh: '5月2日慈善音乐会（国立剧场 下午5时）',
    },
    content: {
      ko: '심장병 어린이 수술비 마련을 위한 자선 음악회가 개최됩니다.\n\n■ 일시: 2026년 5월 2일 (토) 오후 5시\n■ 장소: 국립극장 대극장\n■ 입장: 무료 (후원금 환영)',
      en: 'Charity concert for children\'s heart surgery funding. May 2, 2026 (Sat) 5 PM, National Theater. Free admission.',
      zh: '为心脏病儿童手术筹款的慈善音乐会。2026年5月2日（周六）下午5时，国立剧场，免费入场。',
    },
    author: { ko: '운영사무국', en: 'Admin', zh: '运营办公室' },
    date: '2026-03-10',
    views: 185,
    isNew: true,
    isNotice: true,
    category: 'notice',
  },
  {
    id: 4,
    no: '1',
    title: {
      ko: '생명의 선물 코리아 위성클럽 공식 설립',
      en: 'Gift of Life Korea Satellite Club Officially Founded',
      zh: '生命礼物韩国卫星社正式成立',
    },
    content: {
      ko: '로타리 125년 역사상 최초의 국경 없는 글로벌 온라인 위성클럽이 공식 설립되었습니다.',
      en: "The first borderless global online satellite club in Rotary's 125-year history has been officially founded.",
      zh: '扶轮社125年历史上首个无国界全球在线卫星社正式成立。',
    },
    author: { ko: '운영사무국', en: 'Admin', zh: '运营办公室' },
    date: '2026-02-01',
    views: 63,
    isNew: false,
    isNotice: false,
    category: 'general',
  },
];

export function rowToNotice(r: Record<string, unknown>): NoticeRow {
  const get = (k: string): string => (typeof r[k] === 'string' ? (r[k] as string) : '');
  return {
    id: (r.id as number | string) ?? '',
    no: r.is_notice ? '공지' : String(r.id ?? ''),
    title: {
      ko: get('title_ko') || get('title_en') || '',
      en: get('title_en') || get('title_ko') || '',
      zh: get('title_zh') || get('title_ko') || '',
    },
    content: {
      ko: get('content_ko') || '',
      en: get('content_en') || get('content_ko') || '',
      zh: get('content_zh') || get('content_ko') || '',
    },
    author: {
      ko: get('author_ko') || '운영사무국',
      en: get('author_en') || 'Admin',
      zh: get('author_zh') || '运营办公室',
    },
    date: get('date') || ((typeof r.created_at === 'string' && r.created_at.slice(0, 10)) || ''),
    views: (r.views as number) || 0,
    isNew: Boolean(r.is_new),
    isNotice: Boolean(r.is_notice),
    category: get('category') || 'general',
  };
}
