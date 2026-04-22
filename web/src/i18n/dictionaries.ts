/**
 * 번역 사전 — 기존 index.html 의 T.ko/T.en/T.zh 중 핵심 키만 이관 (초기 뼈대용).
 * 필요 시 페이지 마이그레이션과 함께 확장합니다.
 */
import type { Dict, Lang } from './types';

export const dictionaries: Record<Lang, Dict> = {
  ko: {
    // 네비게이션
    nav_home: '홈',
    nav_about: '소개',
    nav_partners: '파트너스',
    nav_children: '우리 아이들',
    nav_news: '뉴스 & 소식',
    nav_activities: '우리의 활동',
    nav_donate: '후원하기',
    nav_contact: '문의하기',
    nav_rotary: '로타리',

    // 공통
    donate_btn: '후원하기',
    my_donation: '나의 후원',
    login: '로그인',
    more: '더보기',

    // Home
    hero_h: '모든 아이는 <span class="accent">심장을 고칠 권리</span>가 있습니다',
    hero_p: '매년 135만 명의 아이들이 선천성 심장병을 안고 태어납니다. 93%는 수술을 받지 못합니다. 당신의 후원이 그 숫자를 바꿉니다.',
    hero_more: '어린이 이야기',

    // Contact
    contact_h: '문의하기',
    contact_sub: '궁금하신 점이나 후원·파트너십 문의를 남겨 주세요. 빠른 시일 내 답변 드립니다.',
    contact_name: '성명',
    contact_email: '이메일',
    contact_phone: '연락처',
    contact_subject: '문의 제목',
    contact_message: '문의 내용',
    contact_consent: '개인정보 수집 및 이용에 동의합니다.',
    contact_submit: '문의 보내기',
    contact_success: '문의가 성공적으로 접수되었습니다! 곧 답변 드리겠습니다.',

    // Footer
    footer_tagline: '"우리는 아이의 심장을 고치기 위해 필요한 모든 것을 수행합니다."',
    footer_contact_address: '서울 영등포구 선유로3길 10, 2층',
    ft_links: '바로가기',
    ft_related: '관련 기관',
    ft_cp: '© 2026 Gift of Life International Korea. All rights reserved. | Rotary District 3640',
  },
  en: {
    nav_home: 'Home',
    nav_about: 'About',
    nav_partners: 'Partners',
    nav_children: 'Our Children',
    nav_news: 'News & Stories',
    nav_activities: 'Our Work',
    nav_donate: 'Donate',
    nav_contact: 'Contact',
    nav_rotary: 'Rotary',

    donate_btn: 'Donate',
    my_donation: 'My Donation',
    login: 'Login',
    more: 'More',

    hero_h: 'Every child deserves the right to <span class="accent">a healthy heart</span>',
    hero_p: '1.35 million children are born with congenital heart disease every year. 93% never receive surgery. Your $1 changes that number.',
    hero_more: "Children's Stories",

    contact_h: 'Contact Us',
    contact_sub: 'Leave us a message about donations, partnerships, or any question. We will reply promptly.',
    contact_name: 'Name',
    contact_email: 'Email',
    contact_phone: 'Phone',
    contact_subject: 'Subject',
    contact_message: 'Message',
    contact_consent: 'I agree to the collection and use of my personal information.',
    contact_submit: 'Send',
    contact_success: 'Your inquiry has been received. We will respond shortly.',

    footer_tagline: '"We do everything necessary to fix a child\'s heart."',
    footer_contact_address: '2F, 10 Seonyu-ro 3-gil, Yeongdeungpo-gu, Seoul, Korea',
    ft_links: 'Quick Links',
    ft_related: 'Related',
    ft_cp: '© 2026 Gift of Life International Korea. All rights reserved. | Rotary District 3640',
  },
  zh: {
    nav_home: '首页',
    nav_about: '关于我们',
    nav_partners: '合作伙伴',
    nav_children: '我们的孩子们',
    nav_news: '新闻与故事',
    nav_activities: '我们的活动',
    nav_donate: '捐款',
    nav_contact: '联系我们',
    nav_rotary: '扶轮社',

    donate_btn: '捐款',
    my_donation: '我的捐款',
    login: '登录',
    more: '查看更多',

    hero_h: '每个孩子都拥有 <span class="accent">治愈心脏</span> 的权利',
    hero_p: '每年有135万名儿童患有先天性心脏病。93%未能获得手术。您的$1能改变这一切。',
    hero_more: '儿童故事',

    contact_h: '联系我们',
    contact_sub: '如有捐助、合作或任何问题，请留言给我们，我们会尽快回复。',
    contact_name: '姓名',
    contact_email: '邮箱',
    contact_phone: '联系电话',
    contact_subject: '主题',
    contact_message: '咨询内容',
    contact_consent: '我同意收集和使用个人信息。',
    contact_submit: '发送咨询',
    contact_success: '您的咨询已成功提交，我们会尽快回复。',

    footer_tagline: '"我们竭尽全力，为修复孩子的心脏。"',
    footer_contact_address: '首尔市永登浦区仙游路3街 10号 2层',
    ft_links: '快速链接',
    ft_related: '相关机构',
    ft_cp: '© 2026 Gift of Life International Korea. All rights reserved. | Rotary District 3640',
  },
};

export function t(lang: Lang, key: string): string {
  const v = dictionaries[lang]?.[key] ?? dictionaries.ko[key] ?? key;
  return Array.isArray(v) ? v.join('') : v;
}
