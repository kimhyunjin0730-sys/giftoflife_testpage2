import type { Lang } from '@/i18n/types';

export type KidStatus = 'recovered' | 'waiting';

export type Kid = {
  id: string;
  name: string | Record<Lang, string>;
  flag: string;
  country: Record<Lang, string>;
  age: Record<Lang, string>;
  status: KidStatus;
  goal: number;
  raised: number;
  img: string;
  heroImg?: string;
  hospital?: Record<Lang, string>;
  video?: string;
  story: Record<Lang, string>;
};

export const KIDS: Kid[] = [
  {
    id: 'paisleigh',
    name: 'Paisleigh Maliro',
    flag: '🇲🇼',
    country: { ko: '말라위', en: 'Malawi', zh: '马拉维' },
    age: { ko: '4세', en: 'Age 4', zh: '4岁' },
    status: 'recovered',
    goal: 12000,
    raised: 12000,
    img: '/images/kids/paisleigh-malawi.jpg',
    hospital: { ko: '한국 — 파트너 병원', en: 'Korea — Partner Hospital', zh: '韩国 — 合作医院' },
    video: 'https://www.youtube.com/embed/UsutqN82VBg',
    story: {
      ko: '말라위는 어린이 심장 수술을 할 수 없는 많은 나라 중 하나이자 세계에서 가장 가난한 나라 중 한 곳입니다. 네 살의 페이즐리는 한국에서 수술을 받기 위해 11,000km 이상을 날아왔고, 수술은 성공적으로 끝나 제2의 인생을 얻었습니다.',
      en: 'Malawi is one of the many countries that cannot perform pediatric heart surgery, and one of the poorest in the world. Four-year-old Paisleigh flew more than 11,000 km to Korea for her life-saving surgery. It was successful — and she now has a second chance at life.',
      zh: '马拉维是众多无法开展儿童心脏手术的国家之一，也是世界上最贫困的国家之一。四岁的 Paisleigh 飞越了11,000公里到韩国接受手术，手术圆满成功，她迎来了新的人生。',
    },
  },
  {
    id: 'maria',
    name: { ko: '마리아 (Maria)', en: 'Maria', zh: 'Maria' },
    flag: '🇺🇬',
    country: { ko: '우간다', en: 'Uganda', zh: '乌干达' },
    age: { ko: '—', en: '—', zh: '—' },
    status: 'recovered',
    goal: 12000,
    raised: 12000,
    img: '/images/kids/maria-uganda.jpg',
    hospital: { ko: '울프센 메디컬 센터 (이스라엘)', en: 'Wolfson Medical Center (Israel)', zh: 'Wolfson 医疗中心（以色列）' },
    story: {
      ko: '"별이 하늘에 있는 것처럼, 우리 세상의 어린이들도 마찬가지입니다. 그들은 살아서 빛날 자격이 있습니다." 우간다의 마리아는 우리 파트너 병원인 이스라엘 울프센 메디컬 센터에서 심장 수술을 받았습니다.',
      en: '"As stars belong in the sky, so do the children of our world — they deserve to live and shine." Maria from Uganda received her heart surgery at our partner hospital, Wolfson Medical Center in Israel.',
      zh: '"就像星星属于夜空，世界上的孩子也一样——他们值得活下去，值得闪耀。" 乌干达的 Maria 在我们的合作医院——以色列 Wolfson 医疗中心——接受了心脏手术。',
    },
  },
  {
    id: 'danna',
    name: 'Danna',
    flag: '🇧🇴',
    country: { ko: '볼리비아 · Cochabamba', en: 'Bolivia · Cochabamba', zh: '玻利维亚 · 科恰班巴' },
    age: { ko: '—', en: '—', zh: '—' },
    status: 'recovered',
    goal: 12000,
    raised: 12000,
    img: '/images/kids/danna-bolivia.jpg',
    hospital: { ko: 'Cochabamba 현지 파트너 병원', en: 'Cochabamba Partner Hospital', zh: '科恰班巴合作医院' },
    story: {
      ko: '저희는 이번 주 볼리비아 Cochabamba에서 아이들의 심장을 치료했습니다. 그 중 한 명인 소중한 단나는 이제 건강한 심장을 가지고 있으며, 우리 팀에 대한 감사의 표시로 수술실에서의 자신의 모습을 담은 그림을 직접 그려 건네주었습니다.',
      en: "This week we treated children's hearts in Cochabamba, Bolivia. One of them — our precious Danna — now has a healthy heart, and as a thank-you she drew a picture of herself in the operating room for our team.",
      zh: '本周我们在玻利维亚 Cochabamba 为孩子们治疗心脏。其中一位——我们珍贵的 Danna——如今已拥有健康的心脏，她还亲手画了一幅自己在手术室中的画，作为对我们团队的感谢。',
    },
  },
  {
    id: 'rahim',
    name: { ko: '라힘 (Rahim)', en: 'Rahim', zh: 'Rahim' },
    flag: '🇲🇼',
    country: { ko: '말라위', en: 'Malawi', zh: '马拉维' },
    age: { ko: '3세', en: 'Age 3', zh: '3岁' },
    status: 'waiting',
    goal: 12000,
    raised: 7200,
    img: '/images/kids/rahim-malawi.jpg',
    hospital: { ko: '인도 · 파트너 병원', en: 'India · Partner Hospital', zh: '印度 · 合作医院' },
    story: {
      ko: '말라위에서 온 세 살배기 라힘이 인도에 도착했습니다. 저희 파트너 병원에서 심장 수술을 받을 예정입니다. 기부자님들의 도움 덕분에 라힘은 다시 한 번 삶을 살아갈 새로운 기회를 얻게 됩니다.',
      en: 'Three-year-old Rahim from Malawi arrived in India and will undergo heart surgery at our partner hospital. Thanks to our donors, Rahim is being given another chance at life.',
      zh: '来自马拉维的三岁小 Rahim 抵达印度，将在我们的合作医院接受心脏手术。感谢捐助者们的支持，Rahim 正在获得重新活一次的机会。',
    },
  },
];
