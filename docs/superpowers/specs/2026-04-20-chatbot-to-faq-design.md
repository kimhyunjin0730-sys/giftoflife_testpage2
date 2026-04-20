# 챗봇 → FAQ 네비게이터 리디자인

작성일: 2026-04-20
작성자: kim.hyunjin@jinnhyun.com (+ Claude)
대상: index.html 우하단 챗봇 위젯

## 배경

현재 위젯은 자유 입력 + Anthropic API 직접 호출로 AI 챗봇 인상이 강합니다. 후원 단체 사이트에 어울리지 않고, 브라우저에서 API 키가 노출되는 보안 문제도 같이 안고 있습니다 (index.html:10416).

대부분의 답변 컨텐츠는 이미 `localReply` 함수 안에 한/중/영으로 정제돼 있으므로, 자유 입력 + AI 경로를 제거하고 **카테고리 → 질문 → 답변** 의 정적 FAQ 네비게이터로 전환합니다.

## 목표

- AI 챗봇 인상 제거 (formal 톤, FAQ 체계)
- Anthropic API 프론트엔드 호출 제거 (키 노출 차단)
- 사용자가 3번 이내 클릭으로 원하는 정보에 도달
- 정보 습득 후 후원/문의 행동으로 이어지는 CTA 제공
- i18n 유지 (ko / zh / en)

## 비목표

- 자유 입력 챗 유지 (완전 제거)
- 서버 기반 백엔드 챗 시스템 구축 (FAQ 네비게이션이면 충분)
- 답변 내용 전면 재작성 (기존 로컬 답변 재활용, 톤만 formal로 손질)
- "기타 문의" 경로 구현 (필요해지면 기존 문의 폼으로 유도)

## 구조

### 네비게이션 트리 (2단계)

```
[진입] 환영 메시지 + 카테고리 5개
    │
    ├─ 💛 후원하기         → [질문 3개] → 답변 + CTA
    │    ├─ 후원 방법               → "후원하기 페이지로 이동"
    │    ├─ 수술 비용               → "후원하기 페이지로 이동"
    │    └─ 납부 계좌               → "후원 신청서 제출하기"
    │
    ├─ 👶 아이들 이야기    → [질문 3개] → 답변 + CTA
    │    ├─ Amara (말라위, 대기)     → "후원하기 페이지로 이동"
    │    ├─ Krist (코소보, 완료)     → "다른 아이들 보기" (아이들 페이지)
    │    └─ Diego (볼리비아, 대기)   → "후원하기 페이지로 이동"
    │
    ├─ 🏛 단체 소개        → [질문 2개] → 답변 + CTA
    │    ├─ 우리 단체 소개           → "단체 소개 페이지로 이동"
    │    └─ 선천성 심장병 현황       → "후원하기 페이지로 이동"
    │
    ├─ 🎫 회원 가입        → (질문 1개, 중간 단계 생략) → 답변 + CTA
    │                               → "회원가입 페이지로 이동"
    │
    ├─ 📅 참여하기         → (질문 1개, 중간 단계 생략) → 답변 + CTA
    │                               → "행사 페이지로 이동"
    │
    └─ 📬 연락처           → (질문 1개, 중간 단계 생략) → 답변 + CTA
                                    → "문의 폼 열기" (폼 섹션으로 스크롤)
```

### 상태 머신

`step`: `'categories' | 'questions' | 'answer'`
`currentCategory`: 선택된 카테고리 ID (questions/answer 단계에서만)
`currentQuestion`: 선택된 질문 ID (answer 단계에서만)

전환:
- categories → questions: 카테고리 클릭 (질문 1개짜리는 answer로 직행)
- questions → answer: 질문 클릭
- answer → questions: "← 이전으로" 클릭 (중간 단계 생략된 카테고리는 categories로 복귀)
- questions → categories: "← 이전으로" 클릭
- 임의 단계 → 닫기: X 버튼

언어 변경 시 현재 단계 유지, 텍스트만 갱신.

## 데이터 구조

단일 상수 `FAQ_DATA`로 모든 컨텐츠 통합. 기존 `localReply` 대체.

```js
const FAQ_DATA = {
  categories: [
    {
      id: 'donate',
      label: { ko: '후원하기', zh: '捐款', en: 'Donate' },
      icon: '💛',
      questions: ['how-donate', 'surgery-cost', 'bank-account']
    },
    { id: 'kids', label: {...}, icon: '👶', questions: ['amara','krist','diego'] },
    { id: 'about', label: {...}, icon: '🏛', questions: ['org-intro','chd-stats'] },
    { id: 'membership', label: {...}, icon: '🎫', questions: ['tiers'] },
    { id: 'events', label: {...}, icon: '📅', questions: ['schedule'] },
    { id: 'contact', label: {...}, icon: '📬', questions: ['contact-info'] },
  ],
  questions: {
    'how-donate': {
      label: { ko: '후원 방법', zh: '如何捐款', en: 'How to donate' },
      answer: { ko: '...', zh: '...', en: '...' },
      cta: { type: 'page', target: 'donate', label: { ko: '후원하기 페이지로 이동', ... } }
    },
    // ...
  }
}
```

`cta.type`: `'page'` (SPA 내부 페이지 이동) | `'scroll'` (앵커로 스크롤) | `'none'`

## 답변 톤 가이드 (formal)

기존 답변을 그대로 옮기지 않고, 다음 규칙으로 손질:

- 명령형/감탄형 제거: "도와주세요!" → "지원에 동참해주실 수 있습니다"
- 과한 강조 제거: "~해주세요! ✨" → "~해주실 수 있습니다"
- 이모지 최소화: 제목부 아이콘 1개만 유지, 본문 내 이모지는 제거 또는 bullet(•)으로 대체
- "우리가 함께하면 바꿀 수 있습니다!" → "생명의선물 코리아와 함께 변화를 만들 수 있습니다"
- 존댓말 일관: "지금" 같은 구어 축약 지양, "현재" 등 문어체 선호

## UI 변경

### FAB 버튼 (우하단 원형)
- 현재: `Q` 텍스트 + 빨간 뱃지 `1`
- 변경: 모든 언어에서 `FAQ` 로고 텍스트 유지 (버튼 크기 제약상 번역 라벨 미적용). 호버 시 `title` 속성으로 i18n 전체 라벨 (`자주 묻는 질문` / `常见问题` / `FAQ`) 노출. 뱃지 제거.
  - 뱃지 "1"은 미읽음 메시지 느낌 → FAQ에는 부적합

### 위젯 헤더
- 현재: `G` 아바타 + `Gift of Life` + `상담 가능` 상태
- 변경: 아바타 제거, `자주 묻는 질문` 타이틀 + `← 이전으로` 버튼 + `X` 닫기 버튼
  - 뒤로가기는 `step !== 'categories'`일 때만 표시
  - `상담 가능` 같은 채팅 상태 라벨은 제거 (채팅 아님)

### 본문 영역
- 현재: `chat-msgs` 메시지 버블 스크롤 + `chat-chips` 상단 고정
- 변경: 단일 영역 `faq-body` 안에서 `step`에 따라 렌더
  - `categories`: 환영 문구 + 카테고리 버튼 6개 (세로 1열 리스트 — 버튼 높이 48px, 탭 타겟 확보)
  - `questions`: 카테고리 제목 + 질문 버튼 N개 (세로 1열)
  - `answer`: 답변 HTML + CTA 버튼 + 안내 문구
- 환영 문구 (i18n):
  - ko: "안녕하세요. 생명의선물 코리아 자주 묻는 질문 안내입니다. 궁금하신 주제를 선택해 주세요."
  - zh: "您好，这里是生命礼物韩国常见问题指南。请选择您想了解的主题。"
  - en: "Welcome to Gift of Life Korea FAQ. Please select a topic you'd like to learn more about."
- 답변 하단 안내 문구 (i18n):
  - ko: "다른 궁금하신 점이 있으시면 이전 단계로 돌아가 확인해 주시기 바랍니다."
  - zh: "如需了解其他问题，请返回上一步查看。"
  - en: "For other questions, please return to the previous step."
- 메시지 버블 UI(말풍선, typing dot) 전부 제거 → 카드/버튼 UI로 교체

### 입력 영역
- 현재: `textarea` + `➤` 전송 버튼
- 변경: **완전 제거**

## CTA 구현

`cta.type === 'page'`:
```js
showPage(cta.target);  // 기존 SPA 라우팅 함수 재사용
toggleChat();          // 위젯 닫기
```

`cta.type === 'scroll'` (예: 연락처 → 문의 폼):
```js
document.getElementById('contact-form').scrollIntoView({behavior:'smooth'});
toggleChat();
```

## 제거할 코드

| 항목 | 위치 | 사유 |
|---|---|---|
| `sendChat()` | index.html:10397 | 자유 입력 제거 |
| `chatKey()` | (kbd handler) | textarea 삭제로 불필요 |
| `chatHist` 전역 배열 | | 대화 이력 개념 없음 |
| `localReply()` | index.html:10282 | `FAQ_DATA`로 대체 |
| `addUserMsg`, `addBotMsg`, `showTyping`, `hideTyping` | | 메시지 버블 UI 폐기 |
| Anthropic API fetch | index.html:10416-10434 | 프론트 AI 호출 제거 (보안) |
| `chat_placeholder` i18n 키 | | textarea 제거로 불필요 |
| `.chat-msgs`, `.chat-inp-row`, `.chat-inp`, `.chat-send`, `.typing-*` CSS | | 해당 UI 제거 |

## 유지할 코드

- `toggleChat()` 열기/닫기
- `renderChatChips()` → `renderFaq()`로 이름 변경하며 재작성
- FAB `.chat-fab`, 윈도우 `.chat-win`, 닫기 `.chat-x` 기본 셸은 유지 (라벨만 수정)
- `quickAsk()` → 완전 제거 (카테고리/질문 클릭으로 대체)
- Quick chip CSS `.chat-chip` → `.faq-item` 으로 리네임해 버튼 공통 스타일로 재활용

## i18n

- 모든 카테고리 라벨, 질문 라벨, 답변, CTA 라벨에 `{ko, zh, en}` 3종 제공
- 언어 변경 시 `renderFaq()` 재실행하여 현재 `step` 기준 재렌더
- 기존 `T[lang]` 사전에 뉴 키 추가: `faq_title`, `faq_welcome`, `faq_back`, `faq_related_action`

## 테스트 시나리오

1. KO/EN/ZH 각각 위젯 열기 → 환영 문구 + 카테고리 6개 버튼 표시
2. "후원하기" → 질문 3개 표시 → "후원 방법" → 답변 + CTA 표시
3. CTA "후원하기 페이지로 이동" → 위젯 닫히고 donate 페이지 활성
4. "회원 가입" (질문 1개) → 중간 단계 생략, 바로 답변 표시
5. 답변 화면에서 "← 이전으로" → 질문 목록 (또는 카테고리 목록, 중간 단계 생략 카테고리의 경우)
6. 각 단계에서 언어 토글 → 현재 위치 유지, 텍스트만 전환
7. 모바일 뷰포트 (<768px) → 기존 `.chat-win` 모바일 규칙(하단 시트) 유지, 버튼 탭 타겟 최소 48x48px 확보
8. 키보드 포커스 이동 Tab/Shift+Tab 정상, ESC로 닫기
9. 닫았다 다시 열면 `step: 'categories'`로 초기화

## 마이그레이션 / 배포

- 단일 커밋으로 교체 (기능이 강하게 커플돼있어 부분 배포 불가)
- Anthropic API 호출 제거는 단독으로도 보안 개선이므로 같이 반영
- GitHub Pages라 배포 자동, 푸시 즉시 반영

## 향후 확장 (범위 외)

- 아이들 이야기에 신규 아동 추가 시 `FAQ_DATA.questions`에 엔트리 추가 + 카테고리 `questions` 배열에 ID push (코드 수정 최소)
- 답변 텍스트 Supabase에 저장해 관리자 페이지에서 수정 가능하게 확장 (현재는 하드코딩, 필요성 낮음)
- "찾는 답이 없나요? → 문의 폼" 보조 진입점 추가 (지금은 연락처 카테고리 CTA로 충분)
