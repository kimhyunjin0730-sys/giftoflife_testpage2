# Vercel 이관 + Supabase 역할 스키마 적용 가이드

2026-04-21 기준. 소요 시간 약 30~40분.

---

## Part 1 · Vercel 배포

### 1.1 Vercel 계정 연결 (최초 1회)
1. https://vercel.com/signup → **Continue with GitHub** 클릭
2. `kimhyunjin0730-sys` 계정으로 로그인
3. Dashboard에서 **Add New → Project**

### 1.2 프로젝트 가져오기
1. **Import Git Repository** 목록에서 `giftoflife_testpage2` 찾기 → **Import**
2. 설정 화면에서:
   - **Framework Preset**: `Other` (자동 감지됨)
   - **Root Directory**: `./` (기본값)
   - **Build Command**: 비워둠 (정적 사이트이므로)
   - **Output Directory**: 비워둠 (루트에서 서빙)
   - **Install Command**: 비워둠
3. **Deploy** 클릭
4. 1~2분 후 `https://giftoflife-testpage2-<hash>.vercel.app` 형태의 프리뷰 URL 생성됨

> 💡 `vercel.json`을 이미 레포에 커밋해 두었으므로 라우팅/헤더 설정은 자동 적용됩니다.

### 1.3 커스텀 도메인 연결 (`golikorearotary.or.kr`)
1. Vercel 프로젝트 → **Settings → Domains**
2. `golikorearotary.or.kr` 입력 → **Add**
3. Vercel이 알려주는 DNS 레코드 복사 (보통 2가지 중 선택):

   **옵션 A — 네임서버 전환 (가장 간단, Vercel에 관리 위임)**
   - Vercel이 알려주는 네임서버 2개(예: `ns1.vercel-dns.com`, `ns2.vercel-dns.com`)를
   - 도메인 등록업체(가비아 등) 관리 페이지에서 **네임서버 변경** 메뉴로 교체

   **옵션 B — A/CNAME 레코드 수동 설정**
   - `A`    `@`    `76.76.21.21`
   - `CNAME` `www`  `cname.vercel-dns.com`
4. DNS 전파 대기 (보통 10분~수 시간, 최대 48시간)
5. 자동으로 Let's Encrypt HTTPS 발급됨 (Vercel이 자동 처리)
6. `https://golikorearotary.or.kr` 접속 확인

### 1.4 환경변수 설정
1. Vercel 프로젝트 → **Settings → Environment Variables**
2. 추가 필요 (현재 index.html에 하드코딩된 값을 나중에 분리할 때):
   - `SUPABASE_URL` (이미 쓰는 값)
   - `SUPABASE_ANON_KEY` (이미 쓰는 값)
3. Production / Preview / Development 3개 환경에 동일하게 추가

> ⚠️ 지금은 Supabase 키가 index.html에 인라인이라 환경변수로 빼는 작업은 선택. anon key는 클라이언트 노출 전제이므로 당장 급하지 않음.

### 1.5 GitHub Pages 끄기 (충돌 방지)
Vercel 도메인이 안정화되면:
1. GitHub 레포 → **Settings → Pages**
2. Source를 `None`으로 변경

---

## Part 2 · Supabase 역할 스키마 적용

### 2.1 마이그레이션 실행
방법 A — Supabase Dashboard SQL Editor (권장, 1회성):
1. https://supabase.com/dashboard/project/{PROJECT_ID}/sql/new
2. [supabase/migrations/20260421120000_members_auth_roles.sql](supabase/migrations/20260421120000_members_auth_roles.sql) 전체 내용 복사/붙여넣기
3. **Run** 클릭
4. 오류 없이 완료되면 **Table Editor**에서 `profiles` 테이블 생성 확인

방법 B — Supabase CLI (로컬 개발 환경):
```bash
supabase link --project-ref <PROJECT_REF>
supabase db push
```

### 2.2 첫 관리자 지정 (본인 계정)
1. 기존 Gift of Life Korea 사이트에서 본인 이메일(`kim.hyunjin@jinnhyun.com`)로 **일반 가입** (로그인 모달 이용)
2. Supabase SQL Editor에서:
   ```sql
   select public._bootstrap_first_admin('kim.hyunjin@jinnhyun.com');
   ```
3. 확인:
   ```sql
   select id, email, role, verified_at from public.profiles where role = 'admin';
   ```
4. **부트스트랩 함수 제거** (보안):
   ```sql
   drop function public._bootstrap_first_admin(text);
   ```

### 2.3 로타리 회원 인증 (한수로타리클럽이 제공하는 회원 명단 기준)
이후 회원 인증은 admin으로 로그인한 상태에서:
```sql
-- 1) 회원 가입 후 Supabase Auth Users 탭에서 uuid 복사
-- 2) 인증 처리:
select public.admin_verify_rotary(
  '<target-uuid>',      -- auth.users.id
  '한수로타리클럽',       -- club 이름 (nullable)
  'HSR-001'             -- 로타리 회원번호 (nullable)
);
```

또는 향후 admin 페이지에 UI 추가해서 클릭 한 번으로 처리 가능.

### 2.4 프론트엔드 연동 (다음 작업)
`index.html`에 다음 로직 추가 예정:
- 로그인 완료 시 `profiles` 프로필 가져와 `window.currentUserRole` 에 저장
- Channel B (로타리 전용) 렌더링 분기:
  - 비로그인 또는 `public`: "로그인 후 열람 가능" 게이트 카드
  - `rotary` / `admin`: 실제 계좌 정보 + 복사 버튼
- admin 페이지: 회원 목록 + 인증 토글 버튼

---

## Part 3 · 점검 체크리스트

### Vercel 배포 성공 조건
- [ ] Vercel 프리뷰 URL에서 사이트 정상 표시
- [ ] `golikorearotary.or.kr` 접속 시 HTTPS 자물쇠
- [ ] 후원 페이지 / 소개 / 뉴스 등 라우팅 정상
- [ ] 모바일에서도 엔트런스 애니메이션 부드러움
- [ ] Supabase 로그인/채팅/후원 기록 기능 정상
- [ ] Lighthouse 점수 Performance 80+ 유지

### Supabase 스키마 검증
- [ ] `profiles` 테이블 생성됨
- [ ] `auth.users`에 신규 가입 시 `profiles` 자동 생성됨 (트리거 작동)
- [ ] 본인 계정이 admin으로 승격됨
- [ ] `is_rotary_member()` RPC 호출 시 boolean 반환
- [ ] 일반 사용자는 남의 프로필 못 보고, admin은 전체 조회 가능 (RLS)
- [ ] 부트스트랩 함수 `_bootstrap_first_admin` 삭제됨

---

## 롤백 방법

### Vercel에서 GitHub Pages로 되돌리기
1. Vercel 프로젝트 → **Settings → Domains → Remove** (커스텀 도메인)
2. GitHub 레포 → **Settings → Pages → Source: Deploy from a branch (main)**
3. DNS 레코드 원복 (가비아 등에서 `A` 레코드를 GitHub Pages IP로)

### Supabase 스키마 롤백
```sql
drop trigger if exists on_auth_user_created on auth.users;
drop trigger if exists profiles_updated_at on public.profiles;
drop function if exists public.handle_new_user();
drop function if exists public.set_updated_at();
drop function if exists public.is_rotary_member(uuid);
drop function if exists public.admin_verify_rotary(uuid, text, text);
drop function if exists public.admin_revoke_rotary(uuid);
drop function if exists public._bootstrap_first_admin(text);
drop table  if exists public.profiles;
-- donations 테이블은 기존 데이터 때문에 drop 비추천. 필요시 컬럼만 제거.
```
