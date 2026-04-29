# 인수인계 자료 / Handoff Documentation

**프로젝트 / Project**: Gift of Life Korea — 한수로타리 위성클럽 웹사이트
**작성일 / Date**: 2026-04-29
**최종 도메인 / Production**: <https://www.golikorearotary.or.kr>
**저장소 / Repo**: <https://github.com/kimhyunjin0730-sys/giftoflife_testpage2>

---

> 한국어가 먼저, 영어가 그 아래입니다.
> Korean first, English below for each section.

---

## 1. 시스템 구조 / System Architecture

### 한국어
- **호스팅**: Vercel (giftoflife-testpage2 프로젝트)
- **DNS / 도메인 등록**: 가비아 (`golikorearotary.or.kr`)
- **데이터베이스 + 인증**: Supabase (프로젝트 ID: `wpeaskqbozozzcqytoyd`)
- **메일 발송**: Resend (`noreply@golikorearotary.or.kr`)
- **저장소**: GitHub (자동 배포 — `main` 브랜치 push 시 Vercel이 자동 빌드)
- **프레임워크**:
  - 메인 사이트: 단일 정적 `index.html` (~11,700줄 SPA)
  - 일부 라우트: Next.js 15 App Router (`web/` 디렉토리)
  - `/` 는 정적 `index.html` 그대로 서빙 (Vercel rewrite)
  - `/v2`, `/admin`, `/api/contact` 등 일부는 Next.js
- **백엔드 함수**: Supabase Edge Functions (Deno) — 메일 발송 등

### English
- **Hosting**: Vercel (project: giftoflife-testpage2)
- **Domain registrar**: Gabia (`golikorearotary.or.kr`)
- **Database + Auth**: Supabase (project ID: `wpeaskqbozozzcqytoyd`)
- **Transactional email**: Resend (sender: `noreply@golikorearotary.or.kr`)
- **Source repo**: GitHub (push to `main` triggers automatic Vercel deploy)
- **Stack**:
  - Main site: single-file static `index.html` (~11,700 lines, SPA pattern)
  - Some routes: Next.js 15 App Router (`web/` directory)
  - `/` is served as the static `index.html` via Vercel rewrite
  - `/v2`, `/admin`, `/api/contact` and a few others run on Next.js
- **Backend functions**: Supabase Edge Functions (Deno) — used for email relay

---

## 2. 관리자 계정 / Admin Accounts

### 한국어
| Email | Password | 용도 |
|---|---|---|
| `admin.goli@golikorearotary.or.kr` | `goli1234!` | 통합 관리자 (공유용) |
| `kim.hyunjin@jinnhyun.com` | (개인 비밀번호) | 본인 개인 (백업) |

> 두 계정 모두 `profiles.role = admin` 으로 등록됨.
> 비밀번호 변경은 사이트 → 로그인 → "비밀번호 찾기" 또는 Supabase Dashboard → Authentication → Users.

### English
| Email | Password | Purpose |
|---|---|---|
| `admin.goli@golikorearotary.or.kr` | `goli1234!` | Shared admin (use this for daily ops) |
| `kim.hyunjin@jinnhyun.com` | (personal) | Personal backup admin |

> Both have `profiles.role = admin`.
> To change the password, use the site's "Forgot password" flow or
> the Supabase Dashboard → Authentication → Users.

---

## 3. 외부 서비스 자격증명 / External Service Credentials

### 한국어
| 서비스 | 계정 / 키 위치 |
|---|---|
| **Vercel** | GitHub 로그인 → 팀: `kimhyunjin0730-sys's projects` |
| **Supabase** | 가입 이메일 → 프로젝트: `wpeaskqbozozzcqytoyd` |
| **Resend** | 가입 이메일: `kim.hyunjin@jinnhyun.com` (계정명: `jinnhyun`) → API 키는 Supabase Edge Function의 `RESEND_API_KEY` 시크릿에 저장됨 |
| **Gabia** | My가비아 로그인 — 계정 보유자가 관리 |
| **GitHub** | `kimhyunjin0730-sys` 계정 |

> ⚠️ API 키와 패스워드는 코드/저장소에 절대 커밋하지 말 것.
> Supabase Edge Function 시크릿은 `supabase secrets list --linked` 로 확인.

### English
| Service | Account / where the key lives |
|---|---|
| **Vercel** | Sign in with GitHub. Team: `kimhyunjin0730-sys's projects` |
| **Supabase** | Account email → project: `wpeaskqbozozzcqytoyd` |
| **Resend** | Account email: `kim.hyunjin@jinnhyun.com` (org slug: `jinnhyun`). API key is stored as Supabase Edge Function secret `RESEND_API_KEY` |
| **Gabia** | Korean domain registrar — managed by the account owner |
| **GitHub** | `kimhyunjin0730-sys` |

> ⚠️ Never commit API keys or passwords. Use `supabase secrets list --linked`
> to inspect Edge Function secrets.

---

## 4. 데이터베이스 스키마 / Database Schema

### 한국어 — 핵심 테이블 (Supabase `public` 스키마)

| 테이블 | 용도 | 주요 컬럼 |
|---|---|---|
| `profiles` | 회원 인증 + 역할 | `id` (auth.users 1:1), `email`, `role` (`public`/`rotary`/`admin`), `verified_at` |
| `members` | 회원가입 정보 (Auth 외 fallback) | `name`, `email`, `phone`, `grade`, `lang` |
| `donations` | 후원 내역 (수동 입금 기록) | `donor_name`, `donor_email`, `amount`, `channel` (`mrm`/`rotary_transfer`/`wire`/`manual`), `status` (`recorded`/`confirmed`/`refunded`/`void`) |
| `notices` | 공지사항 | `title_ko/en/zh`, `content_ko/en/zh`, `is_notice`, `image_url`, `published` |
| `news_posts` | 뉴스 게시물 | `cat_ko/en/zh`, `title_ko/en/zh`, `desc_ko/en/zh`, `img`, `url`, `date` |
| `contact_messages` | 문의 양식 | `name`, `email`, `subject`, `message`, `lang`, `status` |

**Storage 버킷**:
- `news-images` — 공개 읽기, 10MB 한도, jpeg/png/webp/gif 허용

**RLS (Row Level Security) 정책**:
- 대부분의 테이블은 anon에게 모든 권한 허용 (정적 사이트 + 클라이언트 측 admin 체크)
- `profiles`: 본인 행만 select / update, admin은 전체

### English — Core tables (Supabase `public` schema)

| Table | Purpose | Key columns |
|---|---|---|
| `profiles` | Auth + role | `id` (1:1 with auth.users), `email`, `role` (`public`/`rotary`/`admin`), `verified_at` |
| `members` | Sign-up info (fallback when Auth is unavailable) | `name`, `email`, `phone`, `grade`, `lang` |
| `donations` | Donation records (manual transfer tracking) | `donor_name`, `donor_email`, `amount`, `channel` (`mrm`/`rotary_transfer`/`wire`/`manual`), `status` (`recorded`/`confirmed`/`refunded`/`void`) |
| `notices` | Site notices | `title_ko/en/zh`, `content_ko/en/zh`, `is_notice`, `image_url`, `published` |
| `news_posts` | News posts | `cat_ko/en/zh`, `title_ko/en/zh`, `desc_ko/en/zh`, `img`, `url`, `date` |
| `contact_messages` | Inquiry form submissions | `name`, `email`, `subject`, `message`, `lang`, `status` |

**Storage buckets**:
- `news-images` — public read, 10MB limit, jpeg/png/webp/gif

**RLS policies**:
- Most tables grant all permissions to `anon` (static site + client-side admin check pattern).
- `profiles`: users can select/update their own row; admins can read all.

---

## 5. 후원 흐름 / Donation Flow

### 한국어
- **Channel A — 일반 후원**: 외부 링크 (`https://online.mrm.or.kr/oytvcb5`) 로 redirect — 사이트는 결제 처리 안함, 통계만 외부에서.
- **Channel B — 로타리 회원 전용**: 한수로타리 위성클럽 전용 계좌 (사이트 내 표시) 로 직접 입금 → 사용자가 "내 정보" 페이지에서 입금 정보(이름·금액) 등록 → 관리자가 매칭/확인.
- **Channel C — 해외 송금**: wire transfer 정보를 별도 안내 페이지에 표시. 처리 흐름은 이메일.
- **PG (카카오페이/카드 등) 결제 시스템 없음** — 이전 구현 후 사용자 결정으로 제거됨.

### English
- **Channel A — General donations**: Redirected to an external link (`https://online.mrm.or.kr/oytvcb5`). The site itself does not process payments.
- **Channel B — Rotary member-only**: A dedicated bank account is shown on-site. Donor wires money manually, then enters their name and amount on the "My Page" form. An admin matches the deposit and confirms.
- **Channel C — International wire transfer**: Wire transfer info is shown on a dedicated page; correspondence happens by email.
- **No PG/credit-card flow** — KakaoPay etc. were removed by the project owner's decision.

---

## 6. 운영 가이드 / Operations Guide

### 6.1 콘텐츠 관리 / Content Management

#### 한국어
**뉴스/공지/문의 관리**: 모두 사이트의 **관리자 페이지**에서 가능.
1. <https://www.golikorearotary.or.kr/> 로그인 (admin 계정)
2. 우상단 "Administrator" 버튼 → 관리자 페이지
3. 좌측 사이드바에서 탭 선택:
   - **공지사항 관리** — 새 공지 작성, 이미지 업로드, 다국어 입력
   - **뉴스 관리** — 새 뉴스 작성, 카테고리 관리, 이미지 업로드
   - **회원 관리** — 가입 회원 목록 + CSV 다운로드
   - **로타리 인증** — 회원의 로타리 자격 인증 처리
   - **문의 관리** — 들어온 문의 목록 + 답장 처리
   - **후원 관리** — 등록된 후원 내역 매칭/확인

이미지 업로드는 작성/수정 모달에서 파일 선택 → 자동으로 Supabase Storage 업로드 → URL 자동 채움.

#### English
**News / Notices / Inquiries** — all manageable via the in-site **Admin Page**.
1. Sign in at <https://www.golikorearotary.or.kr/> with an admin account.
2. Click "Administrator" at the top right → Admin Page.
3. Pick a tab in the left sidebar:
   - **Notices Management** — create new notices with image upload + multi-language fields.
   - **News Management** — create news posts with category, image, multi-language.
   - **Member Management** — list members + CSV export.
   - **Rotary Verification** — approve/revoke Rotary member status.
   - **Contact Management** — read inquiries + mark replied.
   - **Donation Management** — match incoming bank transfers + confirm.

Image upload: pick a file in the modal → uploaded to Supabase Storage automatically → URL is filled in.

### 6.2 도메인 / 메일 / 결제 변경 / Domain · Email · Billing

#### 한국어
- **도메인 갱신**: 가비아 — 매년 갱신 알림. 신용카드 자동결제 권장.
- **Vercel 요금**: 현재 무료 (Hobby) — 트래픽 폭증 시 Pro 전환 검토.
- **Supabase 요금**: 현재 무료 — DB 500MB, Storage 1GB, Auth 50K MAU 한도. 초과 시 Pro 전환.
- **Resend 요금**: 무료 100/일, 3000/월. 초과 시 유료 전환.

#### English
- **Domain renewal**: Gabia — annual reminder. Auto-charge a credit card if possible.
- **Vercel plan**: currently free (Hobby). Upgrade to Pro if traffic grows.
- **Supabase plan**: currently free — 500MB DB / 1GB Storage / 50k MAU. Upgrade to Pro past those.
- **Resend plan**: free up to 100 emails/day, 3000/month. Move to paid past that.

---

## 7. 코드 수정 + 배포 흐름 / Editing & Deploying Code

### 한국어
1. 로컬에서 코드 수정 (주로 `index.html` — 메인 SPA)
2. 빌드/sync 자동: `web/package.json`의 `prebuild` 훅이 `index.html` → `web/public/index.html` 자동 복사
3. `git add` → `git commit` → `git push origin main`
4. Vercel이 자동으로 빌드 + 배포 (1~2분)
5. <https://www.golikorearotary.or.kr/> 새로고침해 확인

**중요**:
- 메인 콘텐츠/디자인 수정은 **루트 `index.html`** 한 곳만 수정 (sync 자동 작동).
- Supabase 스키마 변경은 `supabase/migrations/` 에 SQL 파일 추가 후 `supabase db push --linked`.
- Edge Function 수정은 `supabase/functions/<name>/index.ts` 수정 후 `supabase functions deploy <name>`.

### English
1. Edit code locally (mostly `index.html` — the main SPA).
2. Build/sync is automatic: `web/package.json`'s `prebuild` hook copies `index.html` → `web/public/index.html`.
3. `git add` → `git commit` → `git push origin main`.
4. Vercel auto-builds and deploys (~1–2 minutes).
5. Refresh <https://www.golikorearotary.or.kr/> to verify.

**Important**:
- Edit only **root `index.html`** for design/content. The sync is automatic.
- For Supabase schema changes: add a SQL file under `supabase/migrations/` and run `supabase db push --linked`.
- For Edge Function changes: edit `supabase/functions/<name>/index.ts` and run `supabase functions deploy <name>`.

---

## 8. 흔한 트러블슈팅 / Common Troubleshooting

### 한국어
| 증상 | 원인 / 해결 |
|---|---|
| 사이트가 안 떠요 | Vercel 대시보드 → Deployments 에서 최근 빌드 상태 확인. ERROR 면 Build Logs 확인. |
| 메일 발송 안 됨 | Resend 대시보드 → Logs. `RESEND_API_KEY` Supabase secret 확인. |
| "공지사항 로드 실패" 같은 DB 에러 | Supabase 대시보드 → SQL Editor 에서 `select * from notices limit 1;` 시도. RLS 정책 미적용 의심. |
| 이미지 업로드 실패 | Storage 버킷 `news-images` 가 public 인지 확인. 정책 4개(read/insert/update/delete) 모두 활성. |
| 로그인 안됨 | 이메일 오타 확인. Supabase Dashboard → Authentication → Users 에서 직접 확인. |
| 도메인 만료 | 가비아 결제. DNS 6개 레코드는 자동 보존. |

### English
| Symptom | Cause / Fix |
|---|---|
| Site is down | Vercel Dashboard → Deployments. If ERROR, open Build Logs. |
| Email not sending | Resend Dashboard → Logs. Verify `RESEND_API_KEY` Supabase secret. |
| "Failed to load notices" or similar DB error | Supabase → SQL Editor → `select * from notices limit 1;`. Likely a missing RLS policy. |
| Image upload fails | Confirm `news-images` bucket is public; all four policies (read/insert/update/delete) are active. |
| Cannot sign in | Check the email for typos. Supabase Dashboard → Authentication → Users. |
| Domain expired | Renew at Gabia. The 6 DNS records are preserved. |

---

## 9. 다음 작업 후보 / Future Work

### 한국어
- [ ] 도메인 갱신 자동화 (가비아 자동결제)
- [ ] Vercel Analytics 활성화 (트래픽 모니터링)
- [ ] Supabase 백업 자동화 (주 1회 스냅샷)
- [ ] 이메일 템플릿 디자인 (현재는 plain text)
- [ ] Lighthouse / Core Web Vitals 최적화 (현재 미측정)
- [ ] 다국어 SEO 메타 태그 (현재 한국어만)
- [ ] 모바일 푸시 알림 / Slack 연동 (운영자용)

### English
- [ ] Domain auto-renewal at Gabia
- [ ] Enable Vercel Analytics for traffic monitoring
- [ ] Automated Supabase backups (weekly snapshots)
- [ ] Branded email templates (currently plain text)
- [ ] Lighthouse / Core Web Vitals optimization (not yet measured)
- [ ] Multilingual SEO meta tags (currently Korean only)
- [ ] Operator notifications (mobile push / Slack integration)

---

## 10. 연락처 / Contact

### 한국어
- **개발/이관 담당**: 김현진 — `kim.hyunjin@jinnhyun.com`
- **운영 책임**: 한수로타리 위성클럽 회계담당자 (정해진 후 업데이트)
- **사이트 문의 자동회신**: `noreply@golikorearotary.or.kr` (회신 불가)
- **사이트 공식 응대 메일**: `golikorea@naver.com`

### English
- **Developer / handoff lead**: Kim Hyunjin — `kim.hyunjin@jinnhyun.com`
- **Operations lead**: Hansoo Rotary Satellite Club treasurer (TBD)
- **Site auto-reply (no-reply)**: `noreply@golikorearotary.or.kr`
- **Official inbox**: `golikorea@naver.com`

---

## 11. 변경 이력 (요약) / Changelog Summary

자세한 내역은 git log 참고 / See `git log --oneline -50` for details.

- **2026-04-29** — 도메인 활성화, 메일 백엔드, 관리자 콘텐츠 업로드, 본 인수인계 자료 작성
- **2026-04-22** — Editorial 디자인 v2 추가 (`/v2`), 옵션 A 채택 (`/`는 정적 index.html)
- **2026-04-21** — Vercel 이관, Supabase 회원 역할 스키마, 로타리 위성클럽 게이트
- **2026-04-21** — PG(카카오페이) 제거, 외부 링크 + 계좌이체 흐름 단일화
- **2026-04-17** — 결제 흐름 결정, 도메인 후보 결정 (`golikorearotary.or.kr`)
- **2026-03-26** — 초기 프로토타입 + 데이터베이스 + AI 챗봇 + Resend 이메일

---

## 부록 — Supabase CLI 빠른 참고 / Appendix — Supabase CLI Quick Reference

```bash
# 로컬 → 원격 마이그레이션 적용
supabase db push --linked

# SQL 직접 실행 (파일)
supabase db query --linked --file path/to/file.sql

# Edge Function 배포
supabase functions deploy resend-email

# 시크릿 관리
supabase secrets list --linked
supabase secrets set RESEND_API_KEY=re_xxx --linked

# 마이그레이션 상태 확인
supabase migration list --linked
```

---

*문서 끝 / End of document.*
