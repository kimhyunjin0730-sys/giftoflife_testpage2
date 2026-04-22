# 인수인계 문서 — golikorea.or.kr 웹 구조

> 마지막 업데이트: 2026-04-22
> 작성자: 김현진 (외주)

## 1. 전체 구조

```
📦 repo 루트
├── index.html                     ← 현재 운영 중 (vanilla JS 11,700줄, 레거시)
├── images/                        ← 공용 이미지 (about/, kids/, partners/)
├── web/                           ← 🆕 Next.js 15 App Router (마이그레이션 대상)
│   ├── package.json
│   ├── next.config.ts
│   ├── tsconfig.json
│   ├── .env.example
│   └── src/
│       ├── app/
│       │   ├── layout.tsx         ← 루트 레이아웃 + LangProvider
│       │   ├── page.tsx           ← Home
│       │   ├── globals.css        ← 디자인 토큰 + 브랜드 폰트
│       │   ├── api/
│       │   │   └── contact/route.ts   ← 문의 메일 발송 (nodemailer + 가비아)
│       │   ├── about/page.tsx     (stub)
│       │   ├── partners/page.tsx  (stub)
│       │   ├── rotary/page.tsx    (stub)
│       │   ├── children/page.tsx  (Kids 리스트, 실사용)
│       │   ├── news/page.tsx      (stub)
│       │   ├── activities/page.tsx (stub)
│       │   ├── donate/page.tsx    (stub)
│       │   └── contact/page.tsx   ← 실제 문의폼 (React)
│       ├── components/
│       │   ├── Header.tsx
│       │   ├── Footer.tsx
│       │   ├── LangSwitcher.tsx
│       │   ├── HeroSlider.tsx     ← Kids 데이터 기반 자동 순환
│       │   ├── HomeStats.tsx
│       │   ├── KidsPreview.tsx
│       │   ├── ContactForm.tsx
│       │   └── PageStub.tsx       ← 이관 전 플레이스홀더
│       ├── i18n/
│       │   ├── types.ts
│       │   ├── dictionaries.ts    ← T.ko/T.en/T.zh 이관본 (핵심 키만)
│       │   └── LangProvider.tsx
│       ├── data/
│       │   └── kids.ts            ← KIDS 배열 (Paisleigh·Maria·Danna·Rahim)
│       └── lib/
│           ├── supabase.ts        ← Supabase 클라이언트 (싱글톤)
│           └── useSession.ts      ← auth 훅
├── supabase/                      ← 기존 migrations / edge functions
├── vercel.json                    ← 레거시 빌드 설정 (Next.js 컷오버 시 교체 필요)
└── HANDOFF.md                     ← 이 문서
```

## 2. 마이그레이션 상태 (2026-04-22 확장본)

| 영역 | 상태 | 비고 |
|---|---|---|
| Home | ✅ 실사용 가능 | 히어로 슬라이더 (KIDS 자동 순환), 통계 4카드, Kids 프리뷰 |
| Contact | ✅ 실사용 가능 | /api/contact (가비아 SMTP 준비 완료, env 등록만 하면 동작) |
| About / (단체소개) | ✅ 실사용 가능 | 타이틀·네트워크·통계·프로그램 3카드 전부 이관 |
| About /greeting (인사말) | ✅ 실사용 가능 | 인용구·의장 인사·YouTube·사진 캡션·장문 본문·CTA 전부 이관 |
| About /growth (단체발전) | ✅ 실사용 가능 | 영상 2단·3단락 본문·통계 10개·CTA 전부 이관 |
| About /mission (방문교육과 임무) | ✅ 실사용 가능 | Screening/Surgical/Training 3카드·활동 영상 3개·CTA 이관 |
| Partners | ✅ 실사용 가능 | 기업 3개 · 병원 3개 · 함께하는 파트너 12개 |
| Rotary | ✅ 실사용 가능 | 로타리 소개 + 감사 섹션 + 한수클럽 소개 + CTA |
| Children | ✅ 실사용 가능 | 6명 풀 리스트, YouTube embed, 병원 표시, 회복/진행 상태 분기 |
| Login / Signup | ✅ 실사용 가능 | Supabase Auth password 로그인/가입 (3언어) |
| MyPage | ✅ 실사용 가능 | 로그인 필수, 후원 내역 조회 (Supabase donations 테이블) |
| News | ✅ 실사용 가능 | Supabase `news_posts` Server Component + ISR 60s, `/news/[id]` 상세 |
| Notices | ✅ 실사용 가능 | `/notices` 목록 (테이블) + `/notices/[id]` 상세, 공지 필터 |
| Activities | ✅ 실사용 가능 | 심장병 구호 + 지구 살리기(스텁) + 수술 성공 사례 3섹션 |
| Donate | ✅ 실사용 가능 | 2채널 (일반 MRM 링크 + 로타리 회원 후원 로그인 유도) |
| Forgot Password | ✅ 실사용 가능 | Supabase auth.resetPasswordForEmail |
| Children 상세 | ✅ 실사용 가능 | `/children/[id]` SSG (generateStaticParams) + OG metadata |
| Admin 패널 | ✅ 기본 구현 | 5탭: 회원관리·로타리인증·뉴스·공지·후원 관리 (인증 게이트 · role 체크) |
| sitemap.xml · robots.txt · OG 이미지 | ✅ 자동 생성 | Next.js Metadata Files API |
| Contact API (메일) | ✅ Resend 기반 | RESEND_API_KEY + verified domain 필요 |
| 결제 Edge Function | 🟢 레거시 유지 | donation-kr-checkout / donation-us-checkout |

**현재 빌드 검증 완료:** `web/` 에서 `npm run build` → **27 라우트 정상 생성**.

```
Route (app)                Size    First Load JS  Render
├ ○ /                      7.27 kB  113 kB        static
├ ○ /about                 1.59 kB  115 kB        static
├ ○ /about/greeting        1.51 kB  118 kB        static
├ ○ /about/growth          1.32 kB  118 kB        static
├ ○ /about/mission         1.45 kB  118 kB        static
├ ○ /partners              5.08 kB  107 kB        static
├ ○ /rotary                6.26 kB  112 kB        static
├ ○ /children              6.61 kB  112 kB        static
├ ● /children/[id]         4.22 kB  110 kB        SSG ⇒ paisleigh/maria/danna/rahim
├ ○ /news                  3.61 kB  109 kB        ISR 60s
├ ƒ /news/[id]             164 B    106 kB        dynamic
├ ○ /notices               3.60 kB  109 kB        ISR 60s
├ ƒ /notices/[id]          164 B    106 kB        dynamic
├ ○ /activities            6.87 kB  112 kB        static
├ ○ /donate                5.30 kB  107 kB        static
├ ○ /contact               4.13 kB  106 kB        static
├ ○ /login                 131 B    168 kB        static
├ ○ /signup                131 B    168 kB        static
├ ○ /forgot                4.52 kB  168 kB        static
├ ○ /mypage                4.69 kB  168 kB        static
├ ○ /admin                 4.03 kB  164 kB        static (client auth guard)
├ ƒ /api/contact           133 B    102 kB        dynamic (Resend)
├ ○ /sitemap.xml           133 B    102 kB        metadata route
├ ○ /robots.txt            133 B    102 kB        metadata route
└ ○ /opengraph-image       133 B    102 kB        metadata route
```

**현재 Production:** 아직 레거시 index.html (vercel.json 이 기존 설정). Next.js 는 로컬에만 존재, 미배포.

## 3. 로컬 개발

```bash
cd web
cp .env.example .env.local        # SMTP · Supabase 값 입력
npm install
npm run dev                        # http://localhost:3000
```

API 테스트:
```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"테스트","email":"x@x.com","message":"hi","consent":true}'
```

## 4. 환경변수 (Vercel 대시보드에 등록)

| 이름 | 용도 | 공개? |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase 프로젝트 URL | Public |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key | Public |
| `NEXT_PUBLIC_SITE_URL` | sitemap/robots/OG 에 사용될 사이트 URL | Public |
| `RESEND_API_KEY` | Resend API 키 (`re_...`) | Server only |
| `RESEND_FROM` | 발신 이름/주소 (`"Gift of Life <noreply@도메인>"` · verified 도메인 필수) | Server only |
| `CONTACT_TO` | 문의 수신 관리자 이메일 (ex `golikorea@naver.com`) | Server only |

### Resend 셋업 체크리스트 (도메인 구입 후)
1. https://resend.com/signup 가입 → API Key 발급
2. Domains → 본인 도메인 등록 → DNS TXT(SPF/DKIM) 3개를 **가비아 DNS 관리** 페이지에 추가
3. Resend 대시보드에서 "Verified" 상태 확인
4. Vercel 환경변수 등록 (Production + Preview) → 재배포 → 문의폼 테스트
5. (도메인 verify 전 임시) `RESEND_FROM=onboarding@resend.dev` → 본인 가입 이메일로만 테스트 수신 가능

## 5. 배포 (컷오버 시점)

현재는 루트 index.html 이 Production. Next.js 컷오버하려면:

**Step 1.** `web/` 를 Vercel 에서 별도 프로젝트로 연결 (선)
→ Import Git Repository → Root Directory 를 `web` 으로 지정
→ Framework Preset: Next.js (자동 감지)
→ 환경변수 등록
→ Preview URL 로 QA

**Step 2.** 레거시 종료
→ 도메인을 Next.js 배포로 전환
→ `index.html`, `supabase/functions/resend-email` 제거 권장
→ `index.html` 7755행의 `RESEND_API_KEY` 하드코딩 반드시 제거

**Step 3.** vercel.json 정리
→ 루트 vercel.json 의 rewrites 제거 (Next.js 파일 기반 라우팅이 대체)

## 6. 이관 남은 작업 (우선순위 순)

### ✅ 이관 완료 (2026-04-22, 5 Phase 모두 완료)
- **Phase 1**: 스캐폴드 · 디자인 토큰 · i18n · Layout · 이미지 · Supabase 클라이언트
- **Phase 2**: Home · About 4탭 · Partners · Rotary · Children · Login · Signup · MyPage
- **Phase 3**: Contact API (Resend) · News · Activities · Donate · Forgot Password
- **Phase 4**: Notices · Notice 상세 · Children 상세 (SSG) · Admin 패널 5탭
- **Phase 5**: sitemap.xml · robots.txt · OG 이미지 자동 생성

### ⬜ 남은 작업 (컷오버 이후 또는 선택 사항)
1. **Admin CRUD 확장** — 현재 회원/로타리 인증/후원 토글만 구현. 뉴스·공지 **작성 폼** 은 미구현 (읽기 + 발행 토글만)
2. **로타리 후원 실제 CMS 폼** — 계좌정보·회원 후원 플로우 (Brett 계좌 정보 받은 후)
3. **i18n 사전 확장** — 아직 핵심 키만. Activities·Donate·MyPage·Admin 등의 본문 번역 키 추가 필요 (현재 각 컴포넌트가 자체 번역 객체 사용 중)
4. **DONATION_API_ENDPOINTS** — Supabase Edge Function 유지하거나 Next.js API Route 로 이관
5. **Resend 도메인 verify** — 도메인 구입 후 Resend 에 등록 + DNS 레코드 설정 필요

## 7. 기술 부채

- `index.html:7755` 에 하드코딩된 `RESEND_API_KEY` — 컷오버 전에 **반드시** 제거
- 루트 `node_modules/` 가 git 에 트래킹됨 → `git rm --cached -r node_modules` 후 재커밋 필요
- i18n 사전은 현재 핵심 키만 이관. 페이지 이관 시 기존 T.ko/en/zh 에서 필요 키 복사해 확장

## 8. 연락

김현진 · kim.hyunjin@jinnhyun.com
