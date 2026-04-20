# 챗봇 → FAQ 네비게이터 구현 플랜

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 자유 입력 + Anthropic API 챗봇을 6개 카테고리 × 2단계 FAQ 네비게이터로 교체. AI 인상 제거, 프론트엔드 API 키 노출 제거, 후원 유도 CTA 추가.

**Architecture:** `index.html` 단일 파일 SPA 안에서 `FAQ_DATA` 상수 + `renderFaq()` 상태 렌더러를 추가해 기존 채팅 UI를 대체. 기존 `localReply` 답변은 formal 톤으로 재작성해 `FAQ_DATA`에 이식. 기존 `goPage()`/`openLogin()` 라우터는 그대로 재사용.

**Tech Stack:** 순수 HTML/CSS/바닐라 JS (빌드 툴/테스트 프레임워크 없음). i18n은 기존 `T[lang]` 사전 패턴 유지. 검증은 Chrome DevTools 수동 QA.

**Spec:** [docs/superpowers/specs/2026-04-20-chatbot-to-faq-design.md](../specs/2026-04-20-chatbot-to-faq-design.md)

**수정 대상 파일:** `index.html` (단 하나). 다른 파일은 건드리지 않음.

---

## Task 1: FAQ_DATA 상수 추가 (데이터만, 기능에 영향 없음)

**Files:**
- Modify: `index.html` — `localReply` 함수 직전(10282번째 줄 근처) 바로 위에 `FAQ_DATA` 상수 선언 삽입

- [ ] **Step 1: 현재 localReply 위치 확인**

Run: `grep -n "function localReply" index.html`
Expected: `10282:    function localReply(text) {`

(줄 번호는 편집에 따라 바뀔 수 있으므로 이후 편집 시 `function localReply` 문자열 앵커를 기준으로 Edit 도구를 사용.)

- [ ] **Step 2: FAQ_DATA 블록을 localReply 함수 바로 위에 삽입**

`function localReply(text) {` 바로 위 빈 줄에 다음 블록 삽입. 주석 구분자(`/* ── FAQ DATA ── */`)로 경계를 명확히.

```javascript
    /* ══════════════════════════════════════
       FAQ DATA (카테고리 → 질문 → 답변 + CTA)
       모든 텍스트는 존댓말 formal 톤, 3개 언어
    ══════════════════════════════════════ */
    const FAQ_DATA = {
      ui: {
        welcome: {
          ko: '안녕하세요. 생명의선물 코리아 자주 묻는 질문 안내입니다. 궁금하신 주제를 선택해 주세요.',
          en: 'Welcome to Gift of Life Korea FAQ. Please select a topic you would like to learn more about.',
          zh: '您好，这里是生命礼物韩国常见问题指南。请选择您想了解的主题。'
        },
        back: { ko: '← 이전으로', en: '← Back', zh: '← 返回' },
        answerHint: {
          ko: '다른 궁금하신 점이 있으시면 이전 단계로 돌아가 확인해 주시기 바랍니다.',
          en: 'For other questions, please return to the previous step.',
          zh: '如需了解其他问题，请返回上一步查看。'
        },
        title: { ko: '자주 묻는 질문', en: 'FAQ', zh: '常见问题' },
        fabTitle: { ko: '자주 묻는 질문', en: 'Frequently Asked Questions', zh: '常见问题' }
      },
      categories: [
        { id: 'donate',     icon: '💛', label: { ko: '후원하기',       en: 'Donate',         zh: '捐款' },     questions: ['how-donate','surgery-cost','bank-account'] },
        { id: 'kids',       icon: '👶', label: { ko: '아이들 이야기', en: "Children's Stories", zh: '孩子的故事' }, questions: ['amara','krist','diego'] },
        { id: 'about',      icon: '🏛', label: { ko: '단체 소개',     en: 'About Us',       zh: '机构介绍' }, questions: ['org-intro','chd-stats'] },
        { id: 'membership', icon: '🎫', label: { ko: '회원 가입',     en: 'Membership',     zh: '会员加入' }, questions: ['tiers'] },
        { id: 'events',     icon: '📅', label: { ko: '참여하기',       en: 'Get Involved',   zh: '参与活动' }, questions: ['schedule'] },
        { id: 'contact',    icon: '📬', label: { ko: '연락처',         en: 'Contact',        zh: '联系方式' }, questions: ['contact-info'] }
      ],
      questions: {
        'how-donate': {
          label: { ko: '후원 방법을 알려주세요', en: 'How can I make a donation?', zh: '如何进行捐款？' },
          answer: {
            ko: '<b>후원 절차</b><br><br>1. 후원하기 페이지에서 후원 금액을 선택하실 수 있습니다.<br>2. 국민은행 123-456-7890 (예금주: 생명의선물코리아)으로 입금해 주시기 바랍니다.<br>3. 후원 신청서를 작성해 제출해 주시면 사무국에서 확인 후 연락드립니다.<br><br>월 ₩30,000 챔피언 멤버십에 가입하시면 한 명의 아동과 1:1로 매칭되어 지원에 동참하실 수 있습니다.',
            en: '<b>Donation Process</b><br><br>1. Please select a donation amount on the Donate page.<br>2. Transfer to Kookmin Bank 123-456-7890 (Account: Gift of Life Korea).<br>3. Submit the donation form and our office will contact you after confirmation.<br><br>By joining the Champion membership at ₩30,000 per month, you can be matched 1:1 with a child in need of support.',
            zh: '<b>捐款流程</b><br><br>1. 请在捐款页面选择您希望的捐款金额。<br>2. 请转账至国民银行 123-456-7890（账户名：生命礼物韩国）。<br>3. 请填写并提交捐款申请表，办公室确认后将与您联系。<br><br>加入每月 ₩30,000 的冠军会员，即可与一名儿童建立 1:1 结对支持。'
          },
          cta: { action: 'page', target: 'donate', label: { ko: '후원하기 페이지로 이동', en: 'Go to Donate page', zh: '前往捐款页面' } }
        },
        'surgery-cost': {
          label: { ko: '수술 비용은 어떻게 구성되나요?', en: 'How is the surgery cost structured?', zh: '手术费用如何构成？' },
          answer: {
            ko: '<b>한 아동 수술 비용 구성</b><br><br>• 수술비: $3,500 ~ $8,000<br>• 항공편 및 체류비: $3,000<br>• 행정비용: $500<br>• <b>총합: 약 $12,000 (약 ₩14,400,000)</b><br><br>12,000명이 $1씩 모아주신다면 한 아동의 심장이 다시 뛸 수 있습니다.',
            en: '<b>Surgery Cost Breakdown (per child)</b><br><br>• Surgery: $3,500 – $8,000<br>• Airfare and stay: $3,000<br>• Administration: $500<br>• <b>Total: approx. $12,000</b><br><br>If 12,000 people contribute $1 each, one child&rsquo;s heart can beat again.',
            zh: '<b>一名儿童手术费用明细</b><br><br>• 手术费：$3,500 ~ $8,000<br>• 机票及住宿：$3,000<br>• 行政费用：$500<br>• <b>合计：约 $12,000（约 ₩14,400,000）</b><br><br>只要 12,000 位朋友各捐赠 $1，一个孩子的心脏就能重新跳动。'
          },
          cta: { action: 'page', target: 'donate', label: { ko: '후원하기 페이지로 이동', en: 'Go to Donate page', zh: '前往捐款页面' } }
        },
        'bank-account': {
          label: { ko: '납부 계좌를 알려주세요', en: 'What is the bank account for donations?', zh: '请告知捐款账户。' },
          answer: {
            ko: '<b>납부 계좌</b><br><br>국민은행 123-456-7890<br>예금주: 생명의선물코리아<br><br>입금 후 후원 신청서를 제출해 주시기 바랍니다. 확인 후 사무국에서 연락드립니다.',
            en: '<b>Bank Account</b><br><br>Kookmin Bank 123-456-7890<br>Account holder: Gift of Life Korea<br><br>After transferring, please submit the donation form. Our office will contact you after confirmation.',
            zh: '<b>银行账户</b><br><br>国民银行 123-456-7890<br>账户名：生命礼物韩国<br><br>转账后请提交捐款申请表，办公室确认后将与您联系。'
          },
          cta: { action: 'page', target: 'donate', label: { ko: '후원 신청서 작성하기', en: 'Fill out the donation form', zh: '填写捐款申请表' } }
        },
        'amara': {
          label: { ko: 'Amara 이야기', en: "Amara's Story", zh: 'Amara 的故事' },
          answer: {
            ko: '<b>Amara (말라위, 4세)</b><br><br>말라위에는 심장 수술이 가능한 의료 역량이 마련되어 있지 않습니다. 선천성 심장 기형을 가진 Amara는 6세 이전에 수술을 받아야 합니다.<br><br>현재 모금 현황: $8,400 / $12,000 (70%)<br><br>후원하기 페이지에서 Amara의 수술을 지원해 주실 수 있습니다.',
            en: '<b>Amara (Malawi, age 4)</b><br><br>Malawi does not have the medical capacity for cardiac surgery. Amara, born with a congenital heart defect, requires surgery before her 6th birthday.<br><br>Funds raised: $8,400 / $12,000 (70%)<br><br>You can support Amara&rsquo;s surgery through the Donate page.',
            zh: '<b>Amara（马拉维，4 岁）</b><br><br>马拉维不具备进行心脏手术的医疗能力。患有先天性心脏缺陷的 Amara 需要在 6 岁前接受手术。<br><br>目前筹款：$8,400 / $12,000 (70%)<br><br>您可通过捐款页面支持 Amara 的手术。'
          },
          cta: { action: 'page', target: 'donate', label: { ko: 'Amara 후원하기', en: 'Support Amara', zh: '支持 Amara' } }
        },
        'krist': {
          label: { ko: 'Krist 이야기', en: "Krist's Story", zh: 'Krist 的故事' },
          answer: {
            ko: '<b>Krist (코소보, 5세)</b><br><br>Krist는 2022년 한국에서 심장 수술을 성공적으로 받았습니다. 현재는 축구와 수영을 즐기며 건강하게 성장하고 있습니다.',
            en: '<b>Krist (Kosovo, age 5)</b><br><br>Krist received successful heart surgery in Korea in 2022. He is now growing up healthy and enjoys football and swimming.',
            zh: '<b>Krist（科索沃，5 岁）</b><br><br>Krist 于 2022 年在韩国成功接受了心脏手术。他现在健康成长，喜欢踢足球和游泳。'
          },
          cta: { action: 'page', target: 'children', label: { ko: '다른 아이들 이야기 보기', en: 'See other children', zh: '查看其他孩子' } }
        },
        'diego': {
          label: { ko: 'Diego 이야기', en: "Diego's Story", zh: 'Diego 的故事' },
          answer: {
            ko: '<b>Diego (볼리비아, 5세)</b><br><br>볼리비아의 작은 마을 출신인 Diego는 현재 수술을 기다리고 있습니다.<br><br>현재 모금 현황: $5,200 / $12,000 (43%)<br><br>Diego의 수술을 지원해 주실 수 있습니다.',
            en: '<b>Diego (Bolivia, age 5)</b><br><br>Diego, from a small village in Bolivia, is currently awaiting surgery.<br><br>Funds raised: $5,200 / $12,000 (43%)<br><br>You can support Diego&rsquo;s surgery through the Donate page.',
            zh: '<b>Diego（玻利维亚，5 岁）</b><br><br>来自玻利维亚小村庄的 Diego 目前正在等待手术。<br><br>目前筹款：$5,200 / $12,000 (43%)<br><br>您可通过捐款页面支持 Diego 的手术。'
          },
          cta: { action: 'page', target: 'donate', label: { ko: 'Diego 후원하기', en: 'Support Diego', zh: '支持 Diego' } }
        },
        'org-intro': {
          label: { ko: '단체를 소개해 주세요', en: 'Tell me about your organization', zh: '请介绍一下机构' },
          answer: {
            ko: '<b>생명의선물 코리아</b><br><br>1975년 미국 뉴욕에서 설립된 Gift of Life International의 한국 위성클럽입니다.<br><br>설립자 이길우(Brett Halvorson) 이사장은 1983년 레이건 대통령의 지원으로 에어포스원을 이용해 미국에서 심장 수술을 받은 생존자입니다.<br><br>실적: 47,599명의 아동 지원 / ₩18.6억 모금 / 30여 개국 협력',
            en: '<b>Gift of Life International Korea</b><br><br>We are the Korean satellite club of Gift of Life International, founded in 1975 in New York.<br><br>Our founder, Brett Halvorson, is a survivor who received heart surgery in the United States in 1983 aboard Air Force One with the support of President Reagan.<br><br>Impact: 47,599 children supported / ₩1.86 billion raised / Partnerships across 30+ countries.',
            zh: '<b>生命礼物韩国</b><br><br>本机构为 1975 年在美国纽约成立的 Gift of Life International 的韩国卫星社。<br><br>创始人 Brett Halvorson 理事长是 1983 年在里根总统的支持下搭乘空军一号赴美接受心脏手术的幸存者。<br><br>成果：支持 47,599 名儿童 / 筹款 ₩18.6 亿 / 合作国家逾 30 个。'
          },
          cta: { action: 'page', target: 'about', label: { ko: '단체 소개 페이지로 이동', en: 'Go to About Us page', zh: '前往机构介绍页面' } }
        },
        'chd-stats': {
          label: { ko: '선천성 심장병 현황이 궁금합니다', en: 'What are the CHD statistics?', zh: '先天性心脏病现状是怎样的？' },
          answer: {
            ko: '<b>선천성 심장병(CHD) 현황</b><br><br>• 매년 전 세계에서 약 135만 명의 아동이 CHD를 가지고 태어납니다.<br>• 이 중 93%는 수술을 받지 못하며, 약 100만 명이 사망합니다.<br>• 현재 수술 치료를 받는 아동은 약 10%에 불과합니다.<br>• 한 아동의 수술 비용은 약 $12,000 입니다.<br><br>여러분의 참여로 이 통계를 바꿀 수 있습니다.',
            en: '<b>Congenital Heart Disease (CHD) Statistics</b><br><br>• Approximately 1.35 million children are born with CHD each year worldwide.<br>• 93% do not receive surgery, resulting in roughly 1 million deaths annually.<br>• Only about 10% currently receive treatment.<br>• Surgery cost per child: approximately $12,000.<br><br>Your participation can change these statistics.',
            zh: '<b>先天性心脏病（CHD）现状</b><br><br>• 全球每年约有 135 万名儿童出生时患有先天性心脏病。<br>• 其中 93% 无法接受手术，每年约 100 万人因此离世。<br>• 目前仅约 10% 能获得治疗。<br>• 每名儿童的手术费用约为 $12,000。<br><br>您的参与可以改变这一现状。'
          },
          cta: { action: 'page', target: 'donate', label: { ko: '후원으로 동참하기', en: 'Join by donating', zh: '通过捐款参与' } }
        },
        'tiers': {
          label: { ko: '회원 가입 안내', en: 'Membership information', zh: '会员加入指南' },
          answer: {
            ko: '<b>회원 등급 안내</b><br><br>• <b>서포터</b> — 월 ₩20,000<br>월 1회 Zoom 미팅, 뉴스레터, 디지털 회원증 제공<br><br>• <b>챔피언</b> — 월 ₩30,000 (권장)<br>전체 Zoom 미팅 참여, 1:1 아동 매칭, 공식 회원증 제공<br><br>• <b>파트너</b> — 기업 및 단체 대상, 별도 협의<br><br>상단 로그인 버튼에서 회원가입을 진행하실 수 있습니다.',
            en: '<b>Membership Tiers</b><br><br>• <b>Supporter</b> — ₩20,000 per month<br>Monthly Zoom meeting, newsletter, digital membership card<br><br>• <b>Champion</b> — ₩30,000 per month (recommended)<br>All Zoom meetings, 1:1 child matching, official membership card<br><br>• <b>Partner</b> — For corporations and organizations, terms by agreement<br><br>You can sign up from the Login button at the top of the page.',
            zh: '<b>会员等级说明</b><br><br>• <b>支持者</b> — 每月 ₩20,000<br>每月一次 Zoom 会议、通讯、数字会员证<br><br>• <b>冠军</b> — 每月 ₩30,000（推荐）<br>全部 Zoom 会议、1:1 儿童结对、正式会员证<br><br>• <b>合作伙伴</b> — 面向企业与机构，条款另行协商<br><br>可通过页面顶部的登录按钮完成会员注册。'
          },
          cta: { action: 'login', target: null, label: { ko: '로그인/회원가입 열기', en: 'Open Login / Sign up', zh: '打开登录/注册' } }
        },
        'schedule': {
          label: { ko: '행사 및 일정이 궁금합니다', en: 'What are the upcoming events?', zh: '近期有什么活动？' },
          answer: {
            ko: '<b>주요 일정</b><br><br>• 5월 2일 오후 5시 — 자선 음악회 (국립극장)<br>• 2026년 6월 — 위성클럽 공식 발족 (Zoom)<br>• 매월 마지막 금요일 — 글로벌 Zoom 정기미팅<br><br>자세한 내용은 활동 페이지에서 확인하실 수 있습니다.',
            en: '<b>Upcoming Events</b><br><br>• May 2, 5 PM — Charity Concert (National Theater)<br>• June 2026 — Satellite Club Official Launch (Zoom)<br>• Last Friday of every month — Global Zoom Regular Meeting<br><br>Please see the Activities page for details.',
            zh: '<b>主要日程</b><br><br>• 5 月 2 日下午 5 时 — 慈善音乐会（国立剧场）<br>• 2026 年 6 月 — 卫星社正式成立（Zoom）<br>• 每月最后一个周五 — 全球 Zoom 例会<br><br>详细内容请查看活动页面。'
          },
          cta: { action: 'page', target: 'activities', label: { ko: '활동 페이지로 이동', en: 'Go to Activities page', zh: '前往活动页面' } }
        },
        'contact-info': {
          label: { ko: '연락처 안내', en: 'Contact information', zh: '联系方式' },
          answer: {
            ko: '<b>연락처</b><br><br>이메일: golikorea@naver.com<br>전화: 010-9985-5328<br>Instagram: @golikorea<br>주소: 서울 영등포구 선유로3길 10, 2층<br>웹사이트: www.golikorea.or.kr',
            en: '<b>Contact</b><br><br>Email: golikorea@naver.com<br>Phone: 010-9985-5328<br>Instagram: @golikorea<br>Address: 2F, 10 Seonyu-ro 3-gil, Yeongdeungpo-gu, Seoul<br>Website: www.golikorea.or.kr',
            zh: '<b>联系方式</b><br><br>邮箱: golikorea@naver.com<br>电话: 010-9985-5328<br>Instagram: @golikorea<br>地址: 首尔市永登浦区仙游路 3 街 10 号 2 楼<br>网站: www.golikorea.or.kr'
          },
          cta: { action: 'page', target: 'contact', label: { ko: '문의 폼 열기', en: 'Open inquiry form', zh: '打开咨询表单' } }
        }
      }
    };

```

- [ ] **Step 3: 브라우저 콘솔에서 데이터 로드 확인**

Run: 로컬에서 `index.html` 열기 (예: `start index.html`). Chrome DevTools Console에서:

```javascript
FAQ_DATA.categories.length
// Expected: 6
FAQ_DATA.categories.map(c => c.id)
// Expected: ['donate','kids','about','membership','events','contact']
Object.keys(FAQ_DATA.questions).length
// Expected: 11
FAQ_DATA.ui.welcome.ko
// Expected: '안녕하세요. 생명의선물 코리아 자주 묻는 질문...'
```

이 단계에서 기존 챗봇은 그대로 동작해야 함(데이터만 추가, 사용 안 함).

- [ ] **Step 4: 커밋**

```bash
git add index.html
git commit -m "feat(faq): add FAQ_DATA constant with 6 categories, 11 questions (ko/zh/en, formal tone)"
```

---

## Task 2: 새 FAQ UI CSS 추가 (기존 CSS 옆에 병존, 사용 안 함)

**Files:**
- Modify: `index.html` — 기존 `.chat-send:disabled { ... }` 블록(4069번째 줄 근처) 직후에 새 CSS 블록 삽입

- [ ] **Step 1: 현재 CSS 끝 위치 확인**

Run: `grep -n "chat-send:disabled" index.html`
Expected: `4069:    .chat-send:disabled {` 근처

이 블록의 닫는 중괄호 `}` 직후에 새 CSS 삽입 (기존 채팅 CSS 아무것도 변경하지 않음).

- [ ] **Step 2: 새 FAQ CSS 블록 삽입**

```css
    /* ── FAQ UI (챗봇 교체용) ── */
    .faq-body {
      flex: 1;
      overflow-y: auto;
      padding: 16px 18px 18px;
      background: #f7f9fc;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .faq-welcome {
      font-size: 14px;
      color: #334155;
      line-height: 1.6;
      margin: 4px 2px 12px;
    }
    .faq-category-label {
      font-size: 12px;
      color: #64748b;
      font-weight: 600;
      margin: 4px 2px 6px;
      text-transform: none;
    }
    .faq-item {
      display: flex;
      align-items: center;
      gap: 10px;
      width: 100%;
      padding: 13px 14px;
      border: 1px solid #e2e8f2;
      background: #fff;
      border-radius: 10px;
      cursor: pointer;
      font-size: 14px;
      color: #0f172a;
      text-align: left;
      min-height: 48px;
      transition: background .15s, border-color .15s;
    }
    .faq-item:hover {
      background: #f1f5f9;
      border-color: #c8d3e6;
    }
    .faq-item .faq-icon {
      font-size: 16px;
      line-height: 1;
    }
    .faq-item .faq-item-label {
      flex: 1;
    }
    .faq-item .faq-item-arrow {
      color: #94a3b8;
      font-size: 16px;
    }
    .faq-answer {
      background: #fff;
      border: 1px solid #e2e8f2;
      border-radius: 10px;
      padding: 14px 16px;
      font-size: 14px;
      line-height: 1.7;
      color: #0f172a;
    }
    .faq-answer b {
      color: #0f172a;
    }
    .faq-cta {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      padding: 11px 16px;
      margin-top: 10px;
      border: 0;
      border-radius: 10px;
      background: #E11D48;
      color: #fff;
      font-weight: 600;
      font-size: 14px;
      cursor: pointer;
      min-height: 44px;
      width: 100%;
      transition: background .15s;
    }
    .faq-cta:hover {
      background: #be123c;
    }
    .faq-answer-hint {
      font-size: 12px;
      color: #64748b;
      margin-top: 10px;
      line-height: 1.5;
    }
    .faq-back {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      background: transparent;
      border: 0;
      color: #fff;
      font-size: 13px;
      cursor: pointer;
      padding: 4px 8px;
      border-radius: 6px;
    }
    .faq-back:hover {
      background: rgba(255,255,255,.12);
    }
    .faq-title {
      flex: 1;
      color: #fff;
      font-size: 15px;
      font-weight: 700;
    }
```

- [ ] **Step 3: 구문 오류가 없는지 브라우저에서 확인**

`index.html`을 열고 Chrome DevTools → Console 탭을 열어 CSS 관련 오류가 없는지 확인. 페이지가 이전과 동일하게 렌더되어야 함.

- [ ] **Step 4: 커밋**

```bash
git add index.html
git commit -m "feat(faq): add CSS styles for new FAQ navigator UI"
```

---

## Task 3: 새 FAQ JS 로직 추가 (dormant — 아직 호출되지 않음)

**Files:**
- Modify: `index.html` — `function toggleChat()` 정의(10267번째 줄 근처) 직전에 새 함수 블록 삽입

- [ ] **Step 1: 삽입 위치 확인**

Run: `grep -n "function toggleChat" index.html`
Expected: `10267:    function toggleChat() {`

이 함수의 바로 위 빈 줄에 새 블록 추가.

- [ ] **Step 2: FAQ 렌더러 + 핸들러 삽입**

```javascript
    /* ══════════════════════════════════════
       FAQ 네비게이터 (챗봇 교체)
    ══════════════════════════════════════ */
    let faqStep = 'categories';      // 'categories' | 'questions' | 'answer'
    let faqCurrentCategory = null;   // category id
    let faqCurrentQuestion = null;   // question id

    function renderFaq() {
      const body = document.getElementById('faqBody');
      if (!body) return;
      const L = curLang || 'ko';

      // 헤더 타이틀 + 뒤로가기 버튼 상태
      const titleEl = document.getElementById('faqTitle');
      if (titleEl) titleEl.textContent = FAQ_DATA.ui.title[L] || FAQ_DATA.ui.title.ko;
      const backBtn = document.getElementById('faqBack');
      if (backBtn) backBtn.style.display = (faqStep === 'categories') ? 'none' : 'inline-flex';
      if (backBtn) backBtn.textContent = FAQ_DATA.ui.back[L] || FAQ_DATA.ui.back.ko;

      if (faqStep === 'categories') {
        const welcome = FAQ_DATA.ui.welcome[L] || FAQ_DATA.ui.welcome.ko;
        const btns = FAQ_DATA.categories.map(c => {
          const label = c.label[L] || c.label.ko;
          return `<button class="faq-item" onclick="faqOpenCategory('${c.id}')"><span class="faq-icon">${c.icon}</span><span class="faq-item-label">${label}</span><span class="faq-item-arrow">›</span></button>`;
        }).join('');
        body.innerHTML = `<div class="faq-welcome">${welcome}</div>${btns}`;
        body.scrollTop = 0;
        return;
      }

      if (faqStep === 'questions') {
        const cat = FAQ_DATA.categories.find(c => c.id === faqCurrentCategory);
        if (!cat) { faqStep = 'categories'; renderFaq(); return; }
        const catLabel = cat.label[L] || cat.label.ko;
        const btns = cat.questions.map(qid => {
          const q = FAQ_DATA.questions[qid];
          if (!q) return '';
          const label = q.label[L] || q.label.ko;
          return `<button class="faq-item" onclick="faqOpenQuestion('${qid}')"><span class="faq-item-label">${label}</span><span class="faq-item-arrow">›</span></button>`;
        }).join('');
        body.innerHTML = `<div class="faq-category-label">${cat.icon} ${catLabel}</div>${btns}`;
        body.scrollTop = 0;
        return;
      }

      if (faqStep === 'answer') {
        const q = FAQ_DATA.questions[faqCurrentQuestion];
        if (!q) { faqStep = 'categories'; renderFaq(); return; }
        const answer = q.answer[L] || q.answer.ko;
        const ctaLabel = q.cta.label[L] || q.cta.label.ko;
        const hint = FAQ_DATA.ui.answerHint[L] || FAQ_DATA.ui.answerHint.ko;
        body.innerHTML = `<div class="faq-answer">${answer}</div><button class="faq-cta" onclick="faqDoCta('${faqCurrentQuestion}')">${ctaLabel}</button><div class="faq-answer-hint">${hint}</div>`;
        body.scrollTop = 0;
        return;
      }
    }

    function faqOpenCategory(id) {
      const cat = FAQ_DATA.categories.find(c => c.id === id);
      if (!cat) return;
      faqCurrentCategory = id;
      // 질문이 1개뿐이면 answer 단계로 바로 이동
      if (cat.questions.length === 1) {
        faqCurrentQuestion = cat.questions[0];
        faqStep = 'answer';
      } else {
        faqStep = 'questions';
      }
      renderFaq();
    }

    function faqOpenQuestion(qid) {
      if (!FAQ_DATA.questions[qid]) return;
      faqCurrentQuestion = qid;
      faqStep = 'answer';
      renderFaq();
    }

    function faqGoBack() {
      if (faqStep === 'answer') {
        const cat = FAQ_DATA.categories.find(c => c.id === faqCurrentCategory);
        // 질문 1개짜리 카테고리였으면 카테고리 목록으로, 아니면 질문 목록으로
        if (cat && cat.questions.length === 1) {
          faqStep = 'categories';
          faqCurrentCategory = null;
          faqCurrentQuestion = null;
        } else {
          faqStep = 'questions';
          faqCurrentQuestion = null;
        }
      } else if (faqStep === 'questions') {
        faqStep = 'categories';
        faqCurrentCategory = null;
      }
      renderFaq();
    }

    function faqDoCta(qid) {
      const q = FAQ_DATA.questions[qid];
      if (!q || !q.cta) return;
      const action = q.cta.action;
      const target = q.cta.target;
      // 위젯 닫기
      try { if (typeof toggleChat === 'function') { if (chatOpen) toggleChat(); } } catch(e){}
      // 액션 실행
      if (action === 'page' && target && typeof goPage === 'function') {
        goPage(target);
      } else if (action === 'login' && typeof openLogin === 'function') {
        openLogin();
      }
    }

    function faqReset() {
      faqStep = 'categories';
      faqCurrentCategory = null;
      faqCurrentQuestion = null;
    }

```

- [ ] **Step 3: 콘솔에서 함수 로드 확인**

Browser DevTools Console에서:

```javascript
typeof renderFaq
// Expected: 'function'
typeof faqOpenCategory
// Expected: 'function'
```

챗봇은 여전히 기존대로 동작 (새 함수는 아직 호출 안 됨).

- [ ] **Step 4: 커밋**

```bash
git add index.html
git commit -m "feat(faq): add renderFaq state machine and event handlers"
```

---

## Task 4: HTML 마크업 교체 + FAB 버튼 업데이트 + toggleChat 교체 + 언어 변경 훅 + i18n 키 업데이트

이 Task가 실질적인 교체 지점. 커밋 후 사이트는 새 FAQ UI를 사용.

**Files:**
- Modify: `index.html`
  - FAB 버튼 & 위젯 셸(7603-7622번째 줄 근처)
  - `toggleChat()` 함수 본문(10267번째 줄 근처)
  - `renderChatChips()` 함수(10816번째 줄 근처) — renderFaq 호출로 교체
  - 언어 변경 훅(8667-8672번째 줄 `// Chatbot chips` 섹션)
  - KO/EN/ZH i18n 사전(7743, 7906, 8065 근처) — 새 키 추가

- [ ] **Step 1: FAB + 위젯 HTML 교체**

기존 블록 찾기:
```html
  <button class="chat-fab" onclick="toggleChat()" style="font-size:18px">Q<span class="chat-badge" id="chatBadge">1</span></button>
  <div class="chat-win" id="chatWin">
    <div class="chat-hdr">
      <div class="ch-ava" style="font-size:14px;font-weight:700">G</div>
      <div style="flex:1">
        <div class="ch-nm" data-i="bot_name">Gift of Life</div>
        <div class="ch-st" data-i="bot_status">상담 가능</div>
      </div>
      <button class="chat-x" onclick="toggleChat()">✕</button>
    </div>
    <div class="chat-chips" id="chatChips"></div>
    <div class="chat-msgs" id="chatMsgs"></div>
    <div class="chat-inp-row">
      <textarea class="chat-inp" id="chatInp" data-i-ph="chat_placeholder" placeholder="질문을 입력하세요..." rows="1"
        onkeydown="chatKey(event)"></textarea>
      <button class="chat-send" id="chatSendBtn" onclick="sendChat()">➤</button>
    </div>
  </div>
```

다음으로 치환:
```html
  <button class="chat-fab" id="faqFab" onclick="toggleChat()" title="자주 묻는 질문" style="font-size:14px;font-weight:700;letter-spacing:.5px">FAQ</button>
  <div class="chat-win" id="chatWin">
    <div class="chat-hdr">
      <button class="faq-back" id="faqBack" onclick="faqGoBack()" style="display:none">← 이전으로</button>
      <div class="faq-title" id="faqTitle">자주 묻는 질문</div>
      <button class="chat-x" onclick="toggleChat()">✕</button>
    </div>
    <div class="faq-body" id="faqBody"></div>
  </div>
```

- [ ] **Step 2: `toggleChat()` 함수 본문 교체**

기존(10267-10272 근처):
```javascript
    function toggleChat() {
      chatOpen = !chatOpen;
      document.getElementById('chatWin').classList.toggle('open', chatOpen);
      document.getElementById('chatBadge').style.display = chatOpen ? 'none' : 'flex';
      if (chatOpen && chatHist.length === 0) addBotMsg(T[curLang].bot_welcome);
    }
```

다음으로 치환:
```javascript
    function toggleChat() {
      chatOpen = !chatOpen;
      document.getElementById('chatWin').classList.toggle('open', chatOpen);
      if (chatOpen) {
        faqReset();
        renderFaq();
      }
    }
```

- [ ] **Step 3: `renderChatChips()` 호출부 변경 또는 제거**

[index.html:10816] 근처 `function renderChatChips()` 함수는 남겨두되 본문을 새 FAQ 렌더로 바꿈. 기존:

```javascript
    function renderChatChips() {
      const el = document.getElementById('chatChips');
      if (!el) return;
      const t = T[curLang] || T.ko;
      el.innerHTML = [t.chip_amara, t.chip_how, t.chip_join, t.chip_cost].map(c => `<button class="chat-chip" onclick="quickAsk('${c}')">${c}</button>`).join('');
    }
```

다음으로 치환 (`renderAll()`에서 호출되므로 함수 시그니처 유지):

```javascript
    function renderChatChips() {
      // 레거시 이름 유지, 내부는 새 FAQ 렌더러 호출
      try { renderFaq(); } catch(e) {}
    }
```

- [ ] **Step 4: 언어 변경 훅 업데이트**

기존([index.html:8667-8676] 근처):
```javascript
      // ── Chatbot chips ──
      const chips = document.getElementById('chatChips');
      if (chips && t.chip_amara) {
        chips.innerHTML = [t.chip_amara, t.chip_how, t.chip_join, t.chip_cost]
          .map(c => `<button class="chat-chip" onclick="quickAsk('${c}')">${c}</button>`).join('');
      }

      // ── Chatbot name/status ──
      const chnm = document.querySelector('.ch-nm'); if (chnm && t.bot_name) chnm.textContent = t.bot_name;
      const chst = document.querySelector('.ch-st'); if (chst && t.bot_status) chst.textContent = t.bot_status;
```

다음으로 치환:
```javascript
      // ── FAQ 위젯 (챗봇 교체) ──
      try { renderFaq(); } catch(e) {}
      const fabEl = document.getElementById('faqFab');
      if (fabEl && FAQ_DATA?.ui?.fabTitle) {
        fabEl.setAttribute('title', FAQ_DATA.ui.fabTitle[lang] || FAQ_DATA.ui.fabTitle.ko);
      }
```

- [ ] **Step 5: 브라우저에서 실제 동작 확인**

`index.html` 새로고침 후 Chrome DevTools에서:

1. 우하단 FAB 버튼에 `FAQ` 표시, 뱃지 없음, 호버 시 `자주 묻는 질문` 툴팁
2. 클릭 → 위젯 열림, 헤더에 `자주 묻는 질문` 타이틀, 뒤로가기 버튼 없음, X만
3. 본문에 환영 문구 + 카테고리 6개 버튼 표시 (💛 후원하기, 👶 아이들 이야기, 🏛 단체 소개, 🎫 회원 가입, 📅 참여하기, 📬 연락처)
4. "후원하기" 클릭 → 헤더에 `← 이전으로` 표시, 본문에 "💛 후원하기" 라벨 + 질문 3개 버튼
5. "후원 방법을 알려주세요" 클릭 → 답변 + 빨간 `후원하기 페이지로 이동` CTA + 회색 안내 문구
6. CTA 클릭 → 위젯 닫히고 `page-donate` 활성화 + 상단 스크롤
7. 위젯 다시 열면 카테고리 화면으로 초기화 (step: 'categories')
8. "회원 가입" (질문 1개) 클릭 → 질문 단계 건너뛰고 바로 답변 표시
9. 답변 화면에서 `← 이전으로` → 질문 1개짜리 카테고리는 카테고리 목록으로, 아니면 질문 목록으로
10. 우측 언어 FAB에서 EN → 카테고리/질문/답변/버튼/환영문구 전부 영어로
11. ZH로 변경 → 전부 중국어로
12. 여러 카테고리/질문 오가며 Tab 포커스 이동 정상, ESC로는 닫히지 않음(스펙 범위 외)

- [ ] **Step 6: 커밋**

```bash
git add index.html
git commit -m "feat(faq): replace chatbot UI with FAQ navigator, wire to language hook"
```

이 커밋 시점부터 기존 챗봇은 더 이상 사용자에게 보이지 않지만, 오래된 JS/CSS는 여전히 파일에 남아 있음 (Task 5에서 제거).

---

## Task 5: 오래된 코드 제거 (chatbot 잔재 정리 + Anthropic API 제거)

이 Task는 순수 정리 작업. 이 전에 사이트는 이미 잘 동작함. 제거 후에도 동일하게 동작해야 함.

**Files:**
- Modify: `index.html`
  - JS 함수 제거: `sendChat`, `quickAsk`, `chatKey`, `addUserMsg`, `addBotMsg`, `showTyping`, `hideTyping`, `localReply`, `has`, `getSiteCtx`
  - 전역 변수 정리: `chatHist`, `isSending` 삭제
  - CSS 클래스 제거: `.chat-chips`, `.chat-chip`, `.chat-msgs`, `.msg-bbl`, `.msg.bot .msg-bbl`, `.msg.user .msg-bbl`, `.msg-time`, `.msg.bot .msg-time`, `.chat-inp-row`, `.chat-inp`, `.chat-inp:focus`, `.chat-send`, `.chat-send:hover`, `.chat-send:disabled`, `.chat-badge`, `.ch-ava`, `.ch-nm`, `.ch-st`, `.ch-st::before`, `.chat-typing` (있을 경우)
  - i18n 키 제거: 각 언어 사전에서 `bot_name`, `bot_status`, `bot_welcome`, `chip_amara`, `chip_how`, `chip_join`, `chip_cost`, `chat_placeholder`

- [ ] **Step 1: `sendChat()` 함수 전체 제거**

`grep -n "async function sendChat" index.html`로 위치 확인 (대략 10397 근처). 함수 전체 블록 삭제:

```javascript
    async function sendChat() {
      // ... (Anthropic fetch 포함 전체 본문)
    }
```

이 함수 안의 `fetch('https://api.anthropic.com/...)` 호출도 같이 사라지면서 프론트엔드 API 키 노출 제거 목적 달성.

- [ ] **Step 2: 관련 헬퍼 JS 함수들 제거**

다음 함수들을 전부 삭제 (10273-10281 근처 한 줄짜리 함수들 + 10282부터 시작하는 localReply):

```javascript
    function addBotMsg(text) { ... }
    function addUserMsg(text) { ... }
    function showTyping() { ... }
    function hideTyping() { ... }
    function quickAsk(text) { ... }
    function chatKey(e) { ... }
    function has(t, words) { ... }
    function localReply(text) { ... }
    function getSiteCtx() { ... }
```

`getSiteCtx`는 10179번째 줄에 별도로 있을 수 있으니 grep으로 위치 확인 후 별도 삭제.

Run: `grep -n "function addBotMsg\|function addUserMsg\|function showTyping\|function hideTyping\|function quickAsk\|function chatKey\|function has\|function localReply\|function getSiteCtx" index.html`

- [ ] **Step 3: 전역 변수에서 `chatHist`, `isSending` 제거**

[index.html:8397] 근처:

기존:
```javascript
    let chatOpen = false, chatHist = [], isSending = false;
```

치환:
```javascript
    let chatOpen = false;
```

- [ ] **Step 4: 오래된 CSS 블록 제거**

다음 CSS 셀렉터 블록 전부 삭제 (3825-4072 대역의 해당 블록들):

- `.chat-badge` (3825-)
- `.ch-ava`, `.ch-nm`, `.ch-st`, `.ch-st::before` (3869-3903)
- `.chat-chips`, `.chat-chip`, `.chat-chip:hover` (3919-3943)
- `.chat-msgs` (3944-)
- `.msg-bbl`, `.msg.bot .msg-bbl`, `.msg.user .msg-bbl`, `.msg-time`, `.msg.bot .msg-time` (3967-4000 대역)
- `.chat-inp-row`, `.chat-inp`, `.chat-inp:focus`, `.chat-send`, `.chat-send:hover`, `.chat-send:disabled` (4025-4072)
- `.chat-typing`, `.chat-typing span`, 기타 typing 관련 (있을 경우 grep으로 찾기)

`.chat-fab`, `.chat-fab:hover`, `.chat-win`, `.chat-win.open`, `.chat-hdr`, `.chat-x` 는 **유지** (새 UI가 그대로 사용).

Run: `grep -n "\.chat-typing\|\.typing" index.html` — 매치된 모든 블록 제거.

- [ ] **Step 5: i18n 사전에서 오래된 키 제거**

KO 사전 (7743 근처):
- `bot_name: 'Gift of Life', bot_status: '상담 가능',` 삭제
- `chip_amara: 'Amara 이야기', chip_how: '어떻게 후원하나요?', chip_join: '회원 가입', chip_cost: '수술 비용',` 삭제
- `chat_placeholder: '질문을 입력하세요...',` 삭제
- `bot_welcome: '안녕하세요!...` 삭제

EN 사전 (7906 근처): 동일한 7개 키 삭제
ZH 사전 (8065 근처): 동일한 7개 키 삭제

각 사전에서 다른 키들이 인접해 있으므로 쉼표 처리 주의 (JSON 아닌 객체 리터럴이라 trailing comma 허용되지만, 일관성 유지 위해 남은 키들 사이에 쉼표가 정상인지 확인).

- [ ] **Step 6: 브라우저 리그레션 확인**

새로고침 후:

1. FAQ 위젯 여전히 정상 동작 (카테고리 → 질문 → 답변 → CTA 흐름)
2. 콘솔에 `ReferenceError` 없음 (사라진 함수를 참조하는 곳이 없는지)
3. 다른 페이지(홈/후원/소개/연락 등) 정상 렌더
4. 언어 토글 정상 (FAQ 위젯 포함)

Run: `grep -n "sendChat\|quickAsk\|chatHist\|addBotMsg\|addUserMsg\|showTyping\|hideTyping\|localReply\|getSiteCtx\|chip_amara\|chip_how\|chip_join\|chip_cost\|chat_placeholder\|bot_welcome\|bot_status\|bot_name" index.html`
Expected: 0 matches (전부 제거됐는지 최종 확인)

- [ ] **Step 7: 커밋**

```bash
git add index.html
git commit -m "chore(faq): remove obsolete chatbot code (sendChat, localReply, Anthropic fetch, chat CSS/i18n)"
```

이 커밋에서 프론트엔드 Anthropic API 호출이 완전히 제거됨.

---

## Task 6: 최종 QA 체크리스트 + 푸시

- [ ] **Step 1: 3개 언어 × 6개 카테고리 플로우 QA**

`index.html` 새로고침 후 수동 체크:

**KO:**
- [ ] 위젯 열기 → 환영 문구 + 카테고리 6개
- [ ] 후원하기 → 질문 3개 → 후원 방법 답변 → CTA (donate로 이동)
- [ ] 후원하기 → 수술 비용 → CTA → donate
- [ ] 후원하기 → 납부 계좌 → CTA → donate
- [ ] 아이들 → Amara → CTA → donate
- [ ] 아이들 → Krist → CTA → children
- [ ] 아이들 → Diego → CTA → donate
- [ ] 단체 소개 → 우리 단체 → CTA → about
- [ ] 단체 소개 → CHD 현황 → CTA → donate
- [ ] 회원 가입 → 바로 답변 → CTA → 로그인 모달
- [ ] 참여하기 → 바로 답변 → CTA → activities
- [ ] 연락처 → 바로 답변 → CTA → contact 페이지

**EN/ZH:** 언어 토글 후 동일 순서로 확인.

- [ ] **Step 2: 엣지 케이스 QA**

- [ ] 답변 화면에서 `← 이전으로`: 질문 1개짜리 카테고리(회원가입/참여/연락처)는 카테고리 목록으로, 나머지는 질문 목록으로
- [ ] 질문 목록에서 `← 이전으로` → 카테고리 목록
- [ ] 위젯 X로 닫고 재오픈 → step이 categories로 초기화
- [ ] 답변 중간 상태에서 언어 변경 → 현재 위치 유지하며 텍스트만 갱신
- [ ] 모바일 뷰포트 (Chrome DevTools Device Mode, iPhone 14 Pro) → 하단 시트 레이아웃, 버튼 탭 타겟 48px 이상
- [ ] 콘솔에 에러/경고 없음

- [ ] **Step 3: 푸시**

```bash
git push origin main
```

- [ ] **Step 4: GitHub Pages 배포 확인**

푸시 1~2분 후 `https://kimhyunjin0730-sys.github.io/giftoflife_testpage2/` 에서 동일한 QA 체크리스트 중 대표 플로우 3개(KO 후원 방법, EN Amara, ZH 연락처) 확인.

---

## 완료 기준

- FAQ 위젯이 AI 인상 없이 작동한다 (타이핑 인디케이터, 상담 상태, 자유 입력창 없음).
- 프론트엔드에서 Anthropic API 호출 코드가 완전히 사라졌다.
- 6개 카테고리 × 11개 질문 × 3개 언어 모두 정상 표시, CTA가 올바른 페이지로 이동한다.
- 콘솔 에러 0건, 기존 다른 페이지에 리그레션 0건.
