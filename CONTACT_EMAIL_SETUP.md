# `contact@golikorearotary.or.kr` 실제 작동시키기 — 단계별 가이드

**목적**: 도메인 이메일을 진짜로 받고/보낼 수 있게 만들기
**대상**: Gift of Life Korea / 한수로타리 위성클럽
**작성일**: 2026-04-29

---

## 0. 현재 상황 vs 원하는 상태

| | 현재 | 원하는 상태 |
|---|---|---|
| **받기** | `golikorea@naver.com` 으로 받음 | `contact@golikorearotary.or.kr` 로 직접 받기 |
| **보내기 (운영자)** | naver 메일에서 보냄 → 받는 사람 inbox 에 `golikorea@naver.com` 표시 | `contact@golikorearotary.or.kr` 로 보내서 inbox 에 도메인 메일 표시 |
| **느낌** | "개인 메일에서 운영하는 듯" | "전문 단체에서 운영하는 듯" |

---

## 1. 3가지 옵션 — 어떤 길로 갈까?

### 🅰️ 옵션 A. **무료 Forwarding (받기 only)** — 5분
- `contact@...` 로 온 메일을 → 기존 `golikorea@naver.com` 으로 자동 전달
- 답장은 여전히 naver 에서 (받는 사람이 보면 `golikorea@naver.com`)
- **비용**: ₩0 영구
- **professional 정도**: 50% (받기는 도메인 메일, 보내기는 naver)
- **추천 서비스**: ImprovMX

### 🅱️ 옵션 B. **Google Workspace 비영리 무료 (받기 + 보내기 모두)** — 2~3주 ⭐ 추천
- `contact@...` 자체 메일함 + Gmail UI + 무료
- 사단법인 인증 시 영구 무료
- **비용**: ₩0 (단체 자격 유지 시)
- **professional 정도**: 100%
- **단점**: TechSoup + Google 인증에 1~3주

### 🅲 옵션 C. **가비아 메일호스팅 (받기 + 보내기, 즉시)** — 30분
- 도메인 산 가비아에서 메일 호스팅 추가 신청
- 가비아 웹메일에서 사용
- **비용**: 약 ₩5,000/월/계정 (연 6만원)
- **professional 정도**: 80%
- **단점**: 가비아 웹메일 UI 가 단순 / 모바일 앱 없음

---

## 2. 비교 표

| 옵션 | 시간 | 비용 | 받기 | 보내기 | UI | 추천 |
|---|---|---|---|---|---|---|
| A. ImprovMX | 5분 | ₩0 | ✅ | ❌ (기존 naver) | naver UI | △ 임시용 |
| B. Google Workspace | 2~3주 | ₩0 (NGO) | ✅ | ✅ | Gmail (최고) | 🥇 |
| C. 가비아 | 30분 | ₩60k/년 | ✅ | ✅ | 단순 | 🥈 |

---

## 3. **권장 시퀀스** — 무료 + 시간 활용

```
[오늘]      옵션 A (ImprovMX) 5분 설정    → 즉시 contact@... 받기 가능
   ↓
[이번주]    옵션 B (Google Workspace) 신청 시작
   ↓        (TechSoup → Google for Nonprofits 인증)
[2~3주 후]  Google 승인 → 가비아 DNS 에 Google MX 교체
   ↓        ImprovMX 제거 (불필요)
[그 후]     contact@... 로 받기/보내기 모두 Gmail UI 에서 ✅
```

총 비용: **₩0 영구**

---

## 4. 옵션 A — ImprovMX 상세 가이드 (5분, 무료)

### 4-1. ImprovMX 가입
1. <https://improvmx.com> 접속
2. 우상단 **"Sign up"** 클릭
3. 이메일 (예: `kim.hyunjin@jinnhyun.com`) 로 가입
4. 비번 설정

### 4-2. 도메인 추가
1. 대시보드 → **"+ Add domain"** 클릭
2. 입력: `golikorearotary.or.kr` → Add
3. 화면에 "DNS records to add" 라고 2~3개 레코드가 표시됨:
   ```
   타입  호스트  값                     우선순위
   MX    @       mx1.improvmx.com      10
   MX    @       mx2.improvmx.com      20
   TXT   @       v=spf1 include:spf.improvmx.com -all
   ```

### 4-3. 가비아 DNS 에 추가
1. <https://my.gabia.com> 로그인
2. My가비아 → 도메인 통합관리툴 → `golikorearotary.or.kr` → DNS 설정
3. **"+ 레코드 추가"** 3번:

| 호스트 | 타입 | 값 | 우선순위 | TTL |
|---|---|---|---|---|
| `@` | MX | `mx1.improvmx.com.` | 10 | 600 |
| `@` | MX | `mx2.improvmx.com.` | 20 | 600 |
| `@` | TXT | `v=spf1 include:spf.improvmx.com include:amazonses.com ~all` | — | 600 |

> ⚠️ **SPF 주의** — 기존 Resend SPF (`send` TXT, `v=spf1 include:amazonses.com ~all`) 와 별개. ImprovMX 는 root `@` 에 SPF 추가. **두 개가 충돌하지 않음** (서브도메인 다름).

> ⚠️ **MX 충돌 주의** — 가비아 DNS 에 root `@` MX 가 이미 있으면 안 됨. 현재는 `send` 만 MX 있으므로 OK.

4. 저장

### 4-4. ImprovMX 에서 alias 설정
1. ImprovMX 대시보드 → 도메인 클릭
2. **Alias 추가**:
   - From: `contact`
   - To: `golikorea@naver.com`
3. 추가 alias (선택):
   - `info` → `golikorea@naver.com`
   - `admin` → `golikorea@naver.com`
4. (선택) **Catch-all**: `*` → `golikorea@naver.com` — 모든 미정의 주소 받기

### 4-5. 검증 — 5~30분 후
- DNS 전파 후 ImprovMX 대시보드에 ✅ "Active" 표시
- 누군가 `contact@golikorearotary.or.kr` 로 메일 보내면 → naver 받은편지함 도착

### 4-6. 답장 시 주의
- naver 에서 답장하면 받는 사람에게 `From: golikorea@naver.com` 표시됨
- 도메인 메일에서 보내고 싶으면 → 옵션 B 또는 C 필요

---

## 5. 옵션 B — Google Workspace for Nonprofits (영구 무료) ⭐

### Phase 1. TechSoup Korea NPO 검증 (1~3일)

1. <https://www.techsoupkorea.or.kr> 가입
2. 본인 인증
3. NPO 등록:
   - 단체명: 사단법인 생명의 선물 코리아
   - 고유번호: `825-82-00555`
   - 사단법인 등록증 PDF 업로드
   - 활동 보고서 (2024년 또는 2025년 사업 보고서)
4. 검증 완료 시 → "TechSoup ID" 발급 (예: `TS-xxxx`)

### Phase 2. Google for Nonprofits 신청 (1~2주)

1. <https://www.google.com/nonprofits> → "Get started"
2. Google 계정으로 로그인 (개인 gmail 또는 임시 계정)
3. 단체 정보 입력:
   - TechSoup ID 입력
   - 단체 웹사이트: `https://www.golikorearotary.or.kr`
   - 사명·활동 영역
4. Google 검토 (보통 1~2주)
5. 승인 → "Google Workspace for Nonprofits" 활성화 가능 표시

### Phase 3. Google Workspace 활성화 + 도메인 연동 (1~2시간)

1. <https://workspace.google.com/lp/business> → 가입
2. 비영리 코드 적용 → **Business Standard 무료**
3. 도메인 연동:
   - "이미 도메인 보유" 선택
   - `golikorearotary.or.kr` 입력
4. **DNS 검증** (소유 확인):
   - Google 이 알려주는 TXT 레코드 → 가비아 DNS 에 추가
   - 예: `google-site-verification=abc123...` (root `@` TXT)
5. **MX 레코드 교체**:
   - 가비아 DNS 에서 ImprovMX 의 MX 2개 → 삭제
   - Google MX 1개 추가:

   | 호스트 | 타입 | 값 | 우선순위 |
   |---|---|---|---|
   | `@` | MX | `smtp.google.com.` | 1 |

6. **Google Workspace SPF 추가** — 기존 SPF 갱신:
   - 이전 (ImprovMX): `v=spf1 include:spf.improvmx.com include:amazonses.com ~all`
   - 신규 (Google + Resend): `v=spf1 include:_spf.google.com include:amazonses.com ~all`
   (root TXT 1개로 통합)

7. **DKIM 키 생성** (Google Admin Console):
   - Apps → Google Workspace → Gmail → Authenticate email
   - DKIM 키 생성 → 가비아 DNS 에 TXT 추가 (Google 안내대로)

### Phase 4. 사용자 계정 생성

1. Google Admin Console → 사용자
2. 생성:
   - `contact@golikorearotary.or.kr` (단체 대표 메일)
   - `info@golikorearotary.or.kr` (안내용, 선택)
   - `admin@golikorearotary.or.kr` (관리자, 선택)
3. 각 계정 비번 설정 → 운영자에게 전달
4. 운영자가 <https://mail.google.com> 접속 → 새 계정으로 로그인 → Gmail UI 사용

### Phase 5. 사이트 연동 (선택)

- 사이트 footer 메일: `contact@golikorearotary.or.kr` (이미 적용됨)
- 사이트 문의 폼 수신지: 현재 `golikorea@naver.com` → `contact@golikorearotary.or.kr` 로 변경 가능
  - 변경 위치: `index.html` 의 `const CONTACT_TO = '...'` 한 줄
- ImprovMX 는 제거 (Google MX 가 받기 처리)

---

## 6. 옵션 C — 가비아 메일호스팅 (즉시, 유료)

### 단계
1. 가비아 → 메일 → "메일호스팅" 신청
2. 도메인 선택: `golikorearotary.or.kr` (이미 가비아 보유)
3. 플랜 선택:
   - Lite: ₩4,000/월 (1GB, 1계정)
   - Basic: ₩5,000/월 (3GB, 1계정)
   - Pro: ₩10,000/월 (10GB, 1계정)
4. 추가 계정: ₩2,000/월 / 계정
5. 결제 → 자동으로 가비아 DNS 에 MX/SPF 등록됨
6. 가비아 메일 관리툴에서 `contact@golikorearotary.or.kr` 계정 생성
7. <https://hosting.gabia.com/mail> 또는 IMAP/SMTP 로 사용

### 장단점
- ✅ 즉시 가능 (DNS 자동 설정)
- ✅ 한국어 고객지원
- ✅ 결제·세금계산서 한국식
- ⚠️ 모바일 앱 없음, 웹메일만
- ⚠️ Gmail 대비 도착률 약간 떨어짐
- ⚠️ 외국 후원자에 메일 보낼 때 한국 IP 평판 이슈

---

## 7. **DNS 작업 시 주의사항** (어느 옵션이든 공통)

### ⚠️ 절대 건드리지 말 것
1. **A 레코드 `@` → 76.76.21.21** (Vercel 사이트)
2. **CNAME `www` → cname.vercel-dns.com** (Vercel www)
3. **TXT `resend._domainkey`** (Resend DKIM)
4. **MX `send`** (Resend 발송용 — 운영 메일과 별개)

### 갱신 가능
- root `@` MX (메일 받기) — 옵션마다 다름
- root `@` SPF TXT — Google + Resend 통합 방식으로 갱신
- DMARC TXT (선택)

---

## 8. 단계별 도움 받기

직접 진행하시기 어려우시면 다음 시점에 알려주시면 도와드립니다:

| 단계 | 사용자가 알려줄 것 | 제가 해드릴 것 |
|---|---|---|
| 옵션 A 시작 시 | "ImprovMX 가입함" | 가비아 DNS 입력 가이드 + 검증 |
| 옵션 B Phase 2 | "TechSoup 인증 완료" | Google for Nonprofits 신청 도움 |
| 옵션 B Phase 3 | "Google 승인 받음" | 가비아 DNS Google MX 교체 + 사이트 연동 |
| 사이트 연동 | "Google Workspace 활성화" | 사이트 `CONTACT_TO` 변경 + 푸터 표시 갱신 |

---

## 9. 결론

**오늘 당장 할 일** (5분):
1. <https://improvmx.com> 가입
2. 도메인 추가 → DNS 값 받기
3. 알려주시면 가비아 DNS 입력 도와드림

**이번 주 시작할 일**:
1. <https://www.techsoupkorea.or.kr> NPO 검증 신청
2. <https://www.google.com/nonprofits> Google 신청

**2~3주 후**: Google Workspace 무료 활성화 → 진짜 professional 메일 사용

---

## 부록 — 자주 묻는 질문

**Q. naver 메일은 어떻게 되나?**
A. 그대로 사용 가능. ImprovMX/Google 은 forwarding 만 하므로 naver 받은편지함은 변동 없음.

**Q. Resend 발송은 영향 받나?**
A. ❌ 아무 영향 없음. Resend 는 `send` 서브도메인 사용, 운영 메일은 root `@` 사용 — 완전 분리.

**Q. 가비아 도메인을 다른 등록업체로 옮겨야 하나?**
A. 아니요. 가비아 그대로 사용. DNS 만 갱신하면 됨.

**Q. 비영리 자격 유지가 안 되면?**
A. Google Workspace 자동으로 유료 전환 ($14.40/월). 사전에 Google 이 메일로 통보.

**Q. 외국 후원자 답장은?**
A. Google Workspace 의 Gmail UI 는 영어/한국어 모두 지원. 외국 후원자도 친숙.

---

*문의: `kim.hyunjin@jinnhyun.com` / 010-8623-0843*
