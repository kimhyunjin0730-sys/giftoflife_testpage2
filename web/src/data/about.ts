import type { Lang } from '@/i18n/types';

/**
 * About 4개 탭 콘텐츠 데이터.
 * 기존 index.html 의 한국어 원문 + T.en/T.zh 번역을 이관.
 */

export const ABOUT_TABS = [
  { id: 'intro', label: { ko: '단체소개', en: 'About Us', zh: '关于我们' } },
  { id: 'greeting', label: { ko: '인사말', en: 'Message from President', zh: '欢迎辞' } },
  { id: 'growth', label: { ko: '단체발전', en: 'Our Growth', zh: '发展历程' } },
  { id: 'mission', label: { ko: '방문교육과 임무', en: 'Missions & Education', zh: '服务使命' } },
] as const;

export type AboutTab = (typeof ABOUT_TABS)[number]['id'];

export const INTRO = {
  heading: {
    ko: '심장 질환을 앓고 있는 아이들에게\n희망을 심어줍니다',
    en: 'Planting Hope for Children with Heart Disease',
    zh: '为患心脏病的孩子们播种希望',
  } as Record<Lang, string>,
  sub: {
    ko: '질환을 앓고 있는 아이들과 가족들에게 희망을 주고 스스로 아이들을 치료할 수 있는 능력을 의사와 간호사에게 제공하며, 뜻을 같이 하는 단체와 협업하여 지속적으로 개발도상국에 소아 심장 치료 프로그램을 제공하고 있습니다.',
    en: 'We bring hope to children and families affected by heart disease, empower doctors and nurses with the skills to treat children, and collaborate with like-minded organizations to provide sustainable pediatric cardiac care programs in developing countries.',
    zh: '我们为患病的孩子和家庭带来希望，为医生和护士提供治疗能力，与志同道合的组织合作，持续为发展中国家提供小儿心脏治疗项目。',
  } as Record<Lang, string>,
  networkBadge: {
    ko: '5개 대륙 · 81개 국가 · 84개 자율 프로그램',
    en: '5 Continents · 81 Countries · 84 Autonomous Programs',
    zh: '5大洲 · 81个国家 · 84个自主项目',
  } as Record<Lang, string>,
  networkH: {
    ko: '전 세계 네트워크로\n소아 심장 치료를 돕습니다',
    en: 'A Global Network\nSupporting Pediatric Cardiac Care',
    zh: '以全球网络\n支持儿童心脏治疗',
  } as Record<Lang, string>,
  networkP1: {
    ko: 'Gift of Life는 5개 대륙 81개 국가들에 포함되어 있는 84개 자율적 Gift of Life 프로그램들, 로타리 클럽과 비슷한 성향을 가진 단체들의 후원으로 지속적인 소아 심장 치료를 돕고 있습니다.',
    en: 'Gift of Life supports ongoing pediatric cardiac care through 84 autonomous Gift of Life programs across 81 countries on 5 continents, backed by Rotary clubs and like-minded organizations.',
    zh: '生命礼物通过遍布5大洲81个国家的84个自主生命礼物项目，以及扶轮社和志同道合组织的支持，持续为儿童提供心脏治疗援助。',
  } as Record<Lang, string>,
  networkP2: {
    ko: '수술 전 진단 및 수술 후 관리 프로그램들로 아이들과 가족들의 삶을 전환하고 있습니다.',
    en: 'Through pre-surgical screening and post-operative care programs, we transform the lives of children and their families.',
    zh: '我们通过术前筛查与术后管理项目，改变孩子和家庭的人生。',
  } as Record<Lang, string>,
  stats: [
    { v: '33,000+', l: { ko: '치료받은 아이들', en: 'Children Treated', zh: '已治疗儿童' } as Record<Lang, string> },
    { v: '81', l: { ko: '5개 대륙 / 81개국', en: '5 Continents / 81 Countries', zh: '5大洲 / 81个国家' } as Record<Lang, string> },
    { v: '50+', l: { ko: '설립 주년 (2025)', en: 'Years (Founded)', zh: '成立年数 (2025)' } as Record<Lang, string> },
  ],
  programs: [
    {
      img: '/images/about/pediatric-center-ribbon.jpg',
      sub: 'Sustainable Pediatric',
      h: { ko: '지속 가능한 소아 심장 센터', en: 'Sustainable Pediatric Cardiac Centers', zh: '可持续的小儿心脏中心' } as Record<Lang, string>,
      p: {
        ko: '우리는 현지의 지속 가능한 우수한 소아 심장 센터의 개발과 의사와 간호사가 그들의 나라나 출생 지역의 아이들을 치료할 수 있는 능력을 함양하는 것에 초점을 맞추고 있습니다. 우리는 같은 생각을 가진 파트너들과 함께 우간다와 엘살바도르에 그러한 센터를 설립하고, 개발 도상국에서 계속 일하면서 동아프리카, 중앙아메리카, 카리브해, 동유럽와 아시아의 어린이들에게 안정적인 보살핌이 제공될 수 있도록 도와주고 있습니다.',
        en: 'We focus on developing excellent, locally sustainable pediatric cardiac centers and empowering doctors and nurses to care for children in their own countries and regions. With like-minded partners we have established such centers in Uganda and El Salvador, and continue to work across developing nations so that stable care is available to children in East Africa, Central America, the Caribbean, Eastern Europe, and Asia.',
        zh: '我们致力于培育本地可持续的优秀小儿心脏中心，并提升医生和护士照护本国和出生地儿童的能力。我们与志同道合的伙伴在乌干达和萨尔瓦多建立了这样的中心，并持续在发展中国家开展工作。',
      } as Record<Lang, string>,
      accent: 'var(--blue)',
    },
    {
      img: '/network-550x400.jpeg',
      sub: 'Network',
      h: { ko: '글로벌 네트워크', en: 'Global Network', zh: '全球网络' } as Record<Lang, string>,
      p: {
        ko: '우리는 지난 40년 동안 5개 대륙에 걸쳐 81개국에서 온 33,000명 이상의 어린이들이 심장병으로 치료를 받도록 도운 로타리 재단에 기반을 둔 조직입니다. 우리의 글로벌 보살핌 네트워크는 전 세계 84개의 생명 제휴 프로그램들로 구성되어 있습니다.',
        en: 'We are a Rotary Foundation–based organization that, over the past 40 years, has helped more than 33,000 children from 81 countries across 5 continents receive cardiac care. Our global network comprises 84 Gift of Life programs worldwide.',
        zh: '我们是一家基于扶轮基金会的组织，过去40年间帮助来自5大洲81个国家的33,000多名儿童获得心脏治疗。我们的全球关怀网络由全球84个生命礼物合作项目组成。',
      } as Record<Lang, string>,
      accent: 'var(--gold)',
    },
    {
      img: '/images/about/nutritional-assistance.jpg',
      sub: 'Nutritional Assistance',
      h: { ko: '영양 지원', en: 'Nutritional Assistance', zh: '营养支持' } as Record<Lang, string>,
      p: {
        ko: '아이들이 건강한 미래가 보장되도록 노력하고 있습니다. 심장병에 걸린 아이들은 수술뿐만 아니라 아이들의 건강한 미래를 보장하도록 도와야 합니다. 우리의 영양 지원 프로그램을 통해 치료받는 아이들의 회복과 건강한 성장을 지원합니다.',
        en: "We work to ensure children have a healthy future. Children with heart disease need more than surgery — they need support for a healthy future. Our nutritional assistance program supports the recovery and healthy growth of the children we treat.",
        zh: '我们致力于保障孩子们拥有健康的未来。患有心脏病的孩子不仅需要手术，更需要为其健康未来提供支持。',
      } as Record<Lang, string>,
      accent: 'var(--green)',
    },
  ],
} as const;

export const GREETING = {
  quote1: {
    ko: '"저는 세상의 모든 아이들이 건강하게 살 기회가 있어야 한다고 믿습니다."',
    en: '"I believe that every child, no matter where they are born, deserves a chance to live."',
    zh: '"我相信，世界上每一个孩子，无论在哪里出生，都应该有活下去的机会。"',
  } as Record<Lang, string>,
  quote2: {
    ko: '"I believe that every child, no matter where they are born, deserves a chance to live."',
    en: '"A chance of life for every child in the world."',
    zh: '"I believe that every child deserves a chance to live."',
  } as Record<Lang, string>,
  hello: {
    ko: '반갑습니다.\n기프트 오브 라이프 의장 이상길 입니다.',
    en: 'Hello.\nI am Sangkil Lee, President of Gift of Life.',
    zh: '您好。\n我是生命礼物主席李相吉。',
  } as Record<Lang, string>,
  shortP1: {
    ko: "기프트 오브 라이프는 '선천성 심장병'을 앓는 아이들이 건강한 삶을 되찾을 수 있도록 수술을 비롯한 각종 지원을 받을 수 있도록 돕고자 하는 비영리 단체입니다. 저희가 지원하는 각국 많은 아이들이 지금도 여러분의 후원을 기다리고 있습니다. 지원을 하시고자 하는 분들과 지금껏 저희와 함께 많은 아이들에게 도움을 주신 후원자분께 진심으로 감사드립니다.",
    en: "Gift of Life is a non-profit organization dedicated to helping children with congenital heart disease regain a healthy life through surgery and other forms of support. Many children we serve around the world are still waiting for your support. We sincerely thank everyone who wishes to help and every donor who has stood with us.",
    zh: '生命礼物是一家非营利组织，致力于帮助患有「先天性心脏病」的孩子通过手术及各种援助恢复健康生活。我们支持的各国许多孩子此刻仍在等待您的捐助。',
  } as Record<Lang, string>,
  shortP2: {
    ko: '앞으로도 기프트 오브 라이프의 비전과 행동에 많은 관심 부탁드립니다.',
    en: 'We kindly ask for your continued attention to the vision and work of Gift of Life.',
    zh: '请继续关注生命礼物的愿景与行动。',
  } as Record<Lang, string>,
  sign: {
    ko: '의장 이상길',
    en: 'President Sangkil Lee',
    zh: '主席 李相吉',
  } as Record<Lang, string>,
  videoCap: {
    ko: '이길우 다큐멘터리',
    en: 'Lee Gil-woo Documentary',
    zh: '李吉宇 KBS纪录片',
  } as Record<Lang, string>,
  photoCap: {
    ko: '이길우, 알리(GOL 아이), 로비 도노(창립자)',
    en: 'Lee Gil-woo, Ali (GOL child), and Robbie Donno (Founder)',
    zh: '李吉宇、Ali（GOL 受助儿童）、Robbie Donno（创始人）',
  } as Record<Lang, string>,
  longParas: [
    {
      ko: 'Gift of Life 한국 웹사이트를 방문해 주셔서 감사합니다.',
      en: 'Thank you for visiting the Gift of Life Korea website.',
      zh: '感谢您访问生命礼物韩国网站。',
    },
    {
      ko: "'선천성 심장병'은 태아들에게 가장 흔하게 발견되는 선천성 결함으로, 사망률이 가장 높습니다.",
      en: 'Congenital heart disease is the most common congenital defect in newborns and has the highest mortality rate.',
      zh: '「先天性心脏病」是新生儿最常见的先天缺陷，死亡率也最高。',
    },
    {
      ko: '40년이 넘는 시간 동안 Gift of Life는 전 세계 약 33,000명 이상의 어린이와 가족들에게 도움의 손길을 주었습니다. 이 활동은 1975년 우간다 출신의 Grace Agwaru라는 소녀와 함께 시작되었습니다. 1983년에 저도 Gift of Life를 통해 심장 수술을 받아 새로운 삶을 얻었습니다.',
      en: 'For more than 40 years, Gift of Life has extended its hand to more than 33,000 children and families around the world. This mission began in 1975 with a young girl from Uganda named Grace Agwaru. In 1983, I too received heart surgery through Gift of Life and was given a new life.',
      zh: '40多年来，生命礼物向全球3.3万余名儿童及其家庭伸出了援手。这一活动始于1975年一位名叫Grace Agwaru的乌干达女孩。1983年，我也通过生命礼物接受了心脏手术，获得了新生。',
    },
    {
      ko: '저는 아무런 연고도 없는 분들의 순수한 선행과 사랑 덕분에 지금처럼 건강한 삶을 살 수 있다는 것에 매우 감사하고 있습니다. 그렇기에, 제가 받은 축복을 보답하기 위한 방법은 제 어린시절과 같은 상황에 놓인 아이들을 돕는 것이라고 생각합니다.',
      en: 'I am deeply grateful that I can live a healthy life today thanks to the pure goodness and love of strangers. I believe the way to give back the blessing I received is to help children in the same situation I was in.',
      zh: '我非常感激陌生人纯粹的善行与爱心让我能像今天一样健康地生活。因此，我认为回报这份恩惠的方式，就是去帮助与我童年时处境相同的孩子们。',
    },
    {
      ko: '저는 심장 결함을 가진 아이들이 수술을 비롯한 지원을 받을 수 있도록 국내 Gift of Life 활동을 시작하게 되었습니다. 매년 약 3,000명 이상의 아이들을 대상으로 활동하고 있지만, 여전히 이 세상에는 심장 수술이 필요한 또 다른 130만 명의 아이들이 있습니다.',
      en: 'I started Gift of Life activities in Korea so that children with heart defects could receive surgery and support. Every year we help more than 3,000 children, yet there are still 1.3 million children worldwide who need heart surgery.',
      zh: '为了让患有心脏缺陷的孩子们获得手术等援助，我在韩国启动了生命礼物活动。虽然我们每年帮助3,000多名儿童，但世界上仍有130万名孩子需要心脏手术。',
    },
  ] as Record<Lang, string>[],
  ctaH: {
    ko: '함께 아이들에게 희망을 선물하세요',
    en: 'Give children hope, together',
    zh: '一同把希望送给孩子们',
  } as Record<Lang, string>,
  ctaP: {
    ko: '여러분의 작은 후원이 심장 질환을 앓고 있는 아이들의 삶을 바꿉니다.',
    en: 'Your small donation changes the lives of children living with heart disease.',
    zh: '您的一份小小捐助，正在改变心脏病孩子的人生。',
  } as Record<Lang, string>,
} as const;

export const GROWTH = {
  subtitle: {
    ko: '더 많은 아이들을 돕고자 하는 노력',
    en: 'Our effort to help more children',
    zh: '为帮助更多儿童所做的努力',
  } as Record<Lang, string>,
  paras: [
    {
      ko: 'Gift of Life는 지난 40년 동안 전 세계적인 보살핌 네트워크로 발전한 로타리클럽 기반의 조직입니다. 우리는 개발도상국에서 온 심장병을 앓고 있는 어린이들을 미국으로 데려와 수술적 치료를 해주는 것으로 시작을 했습니다.',
      en: 'Gift of Life is a Rotary-based organization that has grown into a global network of care over the past 40 years. We began by bringing children with heart disease from developing countries to the United States for surgical treatment.',
      zh: '生命礼物是一家基于扶轮社的组织，过去40年间发展为全球性的关怀网络。我们最初是把来自发展中国家、患有心脏病的孩子带到美国进行手术治疗。',
    },
    {
      ko: '지난 30년 동안은 이런 방법이 출생지에서 치료를 받을 수 없는 아이들에게 희망을 주는 우리의 주된 수단이었습니다.',
      en: 'For the last 30 years this was our primary way of giving hope to children who could not receive treatment in their home countries.',
      zh: '在过去30年间，这种方式一直是我们为无法在本国获得治疗的孩子带去希望的主要途径。',
    },
    {
      ko: '이제는 치료의 접근성이 부족한 전 세계 심장병을 앓고 있는 어린이들의 위기를 해결할 도움을 줄 수 있게 되었습니다. 매년 3,000명 이상의 어린이들 중 99% 이상이 출생국에서 치료를 받습니다.',
      en: 'Now we are able to help address the worldwide crisis of children with heart disease who lack access to care. More than 99% of the 3,000+ children treated each year receive care in their home countries.',
      zh: '现在我们能够帮助解决全球缺乏治疗机会的心脏病儿童危机。每年3,000多名受治疗儿童中99%以上都是在其出生国接受治疗。',
    },
  ] as Record<Lang, string>[],
  statsH: {
    ko: '우리의 발전',
    en: 'Our Impact',
    zh: '我们的影响力',
  } as Record<Lang, string>,
  statsSub: {
    ko: '44년 동안 심장 질환을 앓고 있는 아이들에게 희망과 전 세계 아이들 심장을 치유하고 있습니다.',
    en: 'For 44 years, giving hope to children with heart disease and healing hearts worldwide.',
    zh: '44年来，为患有心脏病的儿童带来希望，治愈全球儿童的心脏。',
  } as Record<Lang, string>,
  stats: [
    { v: '1,310,000', l: { ko: '매년 선천적으로 심장병을 가지고 태어나는 어린이 수', en: 'Children born with congenital heart disease each year', zh: '每年先天性心脏病患儿人数' } as Record<Lang, string> },
    { v: '2009', l: { ko: 'Gift of Life International이 개발도상국 소아 심장 프로그램을 시작한 해', en: 'Year Gift of Life International launched its pediatric cardiac program', zh: '生命礼物国际启动发展中国家小儿心脏项目的年份' } as Record<Lang, string> },
    { v: '3,000+', l: { ko: '매년 Gift of Life를 통해 세계적으로 치료받는 아이들 수', en: 'Children treated worldwide through Gift of Life each year', zh: '每年通过生命礼物治疗的儿童' } as Record<Lang, string> },
    { v: '1975', l: { ko: '첫 번째 아이가 치료를 받은 해', en: 'Year the first child received treatment', zh: '首位孩子接受治疗的年份' } as Record<Lang, string> },
    { v: '33,000+', l: { ko: '5대륙 81개국에서 치료받은 아이들', en: 'Children treated across 81 countries on 5 continents', zh: '在5大洲81个国家接受治疗的孩子' } as Record<Lang, string> },
    { v: '10,000', l: { ko: '2008년에 치료받은 10,000번째 아이', en: '10,000th child treated (2008)', zh: '第10,000位接受治疗的孩子（2008）' } as Record<Lang, string> },
    { v: '93%', l: { ko: '제대로 된 치료가 불가능한 국가에서 태어나는 소아 심장질환 아이들 비율', en: 'Share of CHD children born in countries without proper treatment access', zh: '出生在难以获得正规治疗国家的心脏病患儿比例' } as Record<Lang, string> },
    { v: '274', l: { ko: '로타리 클럽', en: 'Rotary Clubs', zh: '扶轮社' } as Record<Lang, string> },
    { v: '61', l: { ko: '로타리 지구', en: 'Rotary Districts', zh: '扶轮地区' } as Record<Lang, string> },
    { v: '84', l: { ko: '자주적인 Gift of Life 프로그램', en: 'Autonomous Gift of Life Programs', zh: '自主生命礼物项目' } as Record<Lang, string> },
  ],
  ctaH: {
    ko: '우리의 성장에 동참하세요',
    en: 'Join our growth',
    zh: '加入我们的成长',
  } as Record<Lang, string>,
  ctaP: {
    ko: '여러분의 후원이 더 많은 아이들에게 새 삶을 선물합니다.',
    en: 'Your support gives more children a new life.',
    zh: '您的支持将为更多孩子带来新生。',
  } as Record<Lang, string>,
} as const;

export const MISSION = {
  heading: {
    ko: '방문 교육과 임무',
    en: 'Missions & Education',
    zh: '服务使命与教育',
  } as Record<Lang, string>,
  intro: {
    ko: 'Gift of Life는 매년 발전하면서 도움을 주는 분야의 개념이 점차 바뀌어 왔습니다. 의료 전문가들이 현장에 가서 치료를 할 수 있는 것이 더 중요하다는 것을 깨달았기 때문입니다. 그리하여 오늘날 Gift of Life는 다음과 같은 3가지 분야로 아이들을 후원하고 있습니다.',
    en: 'Gift of Life has evolved each year, gradually changing our concept of how to deliver help. We realized it is more important to send medical professionals to the field. Today Gift of Life supports children through three areas as follows.',
    zh: '生命礼物每年都在发展，逐渐改变着我们提供帮助的概念。我们意识到，让医疗专业人员前往现场进行治疗更为重要。',
  } as Record<Lang, string>,
  cards: [
    {
      img: '/images/about/mission-screening.jpg',
      icon: '🔍',
      accent: 'var(--blue)',
      hEn: 'Screening Missions',
      hKo: { ko: '진단', en: 'Screening', zh: '筛查' } as Record<Lang, string>,
      p: {
        ko: '이러한 유형의 임무는 심장병 치료가 필요한 특정 국가의 어린이를 찾기 위해 고안되었습니다. 선별 팀은 주당 최대 100명의 어린이를 평가하고 진단합니다. 치료가 필요한 것으로 확인된 아동은 국가 소아 심장 대기자 명단에 올라 최종적으로 우리의 전 세계 네트워크를 통해 우선적으로 치료됩니다.',
        en: 'This type of mission is designed to find children in specific countries who need cardiac care. Screening teams evaluate up to 100 children per week. Children identified as needing treatment are placed on the national pediatric cardiac waiting list and are prioritized for care through our global network.',
        zh: '此类任务旨在寻找特定国家中需要心脏治疗的儿童。筛查团队每周最多评估100名儿童。被确认需要治疗的儿童将被列入国家小儿心脏等待名单。',
      } as Record<Lang, string>,
    },
    {
      img: '/images/about/mission-surgical.jpg',
      icon: '🏥',
      accent: 'var(--gold)',
      hEn: 'Surgical Missions',
      hKo: { ko: '치료', en: 'Surgical', zh: '外科手术' } as Record<Lang, string>,
      p: {
        ko: '외과적 치료의 임무는 Gift of Life가 치료의 기회가 없는 국가의 어린이들을 돌볼 수 있는 필수 방법이 되었습니다. 해당 국가의 대기자 명단에 있는 어린이들은 체계적인 방식으로 치료를 받습니다. 우리의 목표는 이러한 의료 임무를 통해 가능한 한 많은 어린이들을 돌보는 것입니다.',
        en: 'Surgical missions have become an essential way for Gift of Life to care for children in countries without access to treatment. Children on the national waiting list are treated in a systematic manner. Our goal is to care for as many children as possible through these medical missions.',
        zh: '外科手术任务已成为生命礼物照顾那些无法获得治疗机会国家儿童的必要方式。等待名单上的孩子将以系统方式接受治疗。',
      } as Record<Lang, string>,
    },
    {
      img: '/images/about/mission-training.jpg',
      icon: '📚',
      accent: 'var(--green)',
      hEn: 'Training Visits and Missions',
      hKo: { ko: '교육', en: 'Training', zh: '培训' } as Record<Lang, string>,
      p: {
        ko: '방문 교육은 우리의 프로그램 개발에 필수적입니다. 이러한 방문 교육을 통해 개발 도상국 현지 팀에게 전문 기술 이전을 제공합니다. 방문은 지역 팀의 기술을 향상시켜 현지 의사와 간호사가 출생국의 어린이를 돌볼 수 있도록 합니다.',
        en: 'Training visits are essential to our program development. Through these visits we transfer specialized skills to local teams in developing countries, improving the abilities of local doctors and nurses.',
        zh: '培训访问对我们的项目发展至关重要。通过这些访问，我们为发展中国家的本地团队提供专业技术转移。',
      } as Record<Lang, string>,
    },
  ],
  videos: [
    { country: { ko: '🇺🇬 우간다', en: '🇺🇬 Uganda', zh: '🇺🇬 乌干达' } as Record<Lang, string>, embed: 'https://www.youtube.com/embed/_j-XdVUIcx0' },
    { country: { ko: '🇸🇻 엘살바도르', en: '🇸🇻 El Salvador', zh: '🇸🇻 萨尔瓦多' } as Record<Lang, string>, embed: 'https://www.youtube.com/embed/WIEdxQEUqu0' },
    { country: { ko: '🇷🇴 루마니아', en: '🇷🇴 Romania', zh: '🇷🇴 罗马尼亚' } as Record<Lang, string>, embed: 'https://www.youtube.com/embed/VXdlejv5wxs' },
  ],
  ctaH: {
    ko: '후원으로 우리의 임무에 함께하세요',
    en: 'Join our mission through your support',
    zh: '以捐助与我们的使命同行',
  } as Record<Lang, string>,
  ctaP: {
    ko: '여러분의 후원이 전 세계 어린이들에게 닿습니다.',
    en: 'Your support reaches children around the world.',
    zh: '您的支持将抵达全球的孩子们。',
  } as Record<Lang, string>,
} as const;
