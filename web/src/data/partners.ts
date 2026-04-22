import type { Lang } from '@/i18n/types';

export const CORPORATE = [
  { name: 'egg', logo: '/images/partners/corp-egg.jpg', url: null },
  { name: 'Brights', logo: '/images/partners/corp-brights.jpg', url: null },
  { name: 'withNami', logo: '/images/partners/corp-withnami.jpg', url: null },
];

export const HOSPITALS = [
  { name: '세브란스병원', logo: '/images/partners/hospital-severance.png', url: 'https://www.severance.healthcare/severance/index.do' },
  { name: '서울대학교병원', logo: '/images/partners/hospital-snuh.png', url: 'https://www.snuh.org/main.do' },
  { name: '가천대 길병원', logo: '/가천대길병원logo.svg', url: 'https://www.gilhospital.com/' },
];

export const ORGS = [
  { name: 'Gift of Life International', logo: '/gift_of_life_logo.svg' },
  { name: 'Hearts of Joy International', logo: '/hearts_of_joy_logo.png' },
  { name: 'Herz bewegt', logo: '/herz_bewegt_logo.png' },
  { name: "Samaritan's Purse", logo: '/samaritans_purse_logo.svg' },
  { name: "Save a Child's Heart", logo: '/save_a_childs_heart_logo.svg' },
  { name: 'The Caribbean Children Foundation', logo: '/caribbean_children_foundation_logo.png' },
  { name: "World Children's Initiative", logo: '/images/partners/org-world-children.jpg' },
  { name: 'Caribbean Heart Menders', logo: '/caribbean_heart_menders_logo.png' },
  { name: 'Chadasha Foundation', logo: '/chadasha_foundation_logo.png' },
  { name: 'Chain of Hope', logo: '/chain_of_hope_logo.png' },
  { name: 'Haiti Cardiac Alliance', logo: '/haiti_cardiac_alliance_logo.png' },
  { name: 'HeartGift', logo: '/heartgift_logo.png' },
];

export const PARTNERS_TEXT = {
  title: { ko: '파트너스', en: 'Partners', zh: '合作伙伴' } as Record<Lang, string>,
  sub: {
    ko: '뜻을 같이 하는 국내외 파트너들과 함께 심장병 어린이들에게 희망을 전합니다.',
    en: 'Together with our domestic and international partners, we deliver hope to children with heart disease.',
    zh: '与志同道合的国内外合作伙伴一起，为心脏病儿童传递希望。',
  } as Record<Lang, string>,
  corpH: { ko: '기업 파트너', en: 'Corporate Partners', zh: '企业合作伙伴' } as Record<Lang, string>,
  corpDesc: {
    ko: '국내외 기업과 재단의 후원이 저희 활동의 근간이 됩니다. 심장병 어린이들을 위한 귀중한 후원에 감사드립니다.',
    en: 'Corporations and foundations support our mission. We are grateful for their invaluable contributions to children with heart disease.',
    zh: '企业与基金会的支持是我们活动的基础。感谢他们对心脏病儿童的宝贵援助。',
  } as Record<Lang, string>,
  orgsH: { ko: '함께하는 파트너', en: 'Related Organizations', zh: '合作机构' } as Record<Lang, string>,
  orgsDesc: {
    ko: '강력한 파트너십을 통해 저희는 영향력을 극대화하고 지속 가능한 프로그램을 개발할 수 있습니다.',
    en: 'Through strong partnerships, we maximize our impact and develop sustainable programs.',
    zh: '通过强大的合作伙伴关系，我们能够最大化影响力并开发可持续的项目。',
  } as Record<Lang, string>,
  hospitalsH: { ko: '병원 파트너', en: 'Hospital Partners', zh: '医院合作伙伴' } as Record<Lang, string>,
  hospitalsDesc: {
    ko: '국내 최고 수준의 의료기관과 협력하여 소아 심장 치료를 지원하고 있습니다.',
    en: "Leading medical institutions partner with us to support pediatric cardiac care.",
    zh: '我们与国内顶尖医疗机构合作，共同支持儿科心脏治疗。',
  } as Record<Lang, string>,
} as const;
