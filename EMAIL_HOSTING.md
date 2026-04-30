# 운영 이메일 호스팅 비교

**대상**: `contact@golikorearotary.or.kr` 같은 자체 도메인 운영 메일
**목적**: 안정적이고 professional 한 수신·발신 환경
**작성일**: 2026-04-29

---

## 0. 구분 — 두 가지 이메일은 별개

| | 무엇 | 현재 상태 |
|---|---|---|
| **시스템 발송 메일** (자동) | 사이트 → 사용자 알림 (회원가입, 문의 접수 확인 등) | Resend (`noreply@golikorearotary.or.kr` 발신) ✅ 작동 |
| **운영 메일** (사람이 받고 답장) | 의뢰인 / 운영팀이 사용하는 비즈니스 메일 (`contact@golikorearotary.or.kr` 같이) | **미설정** — 현재 `golikorea@naver.com` 으로 우회 |

이 문서는 **운영 메일** (두 번째) 호스팅을 다룹니다.

---

## 1. 비교 후보 (5개)

### 🥇 Google Workspace — **추천 1순위**
- **회사**: Google
- **무료 옵션**: **Google for Nonprofits — 사단법인 등록 시 완전 무료** (Business Standard 등급)
- **유료**:
  - Business Starter: $7.20/월 / 사용자
  - Business Standard: $14.40/월 / 사용자 (드라이브 2TB)
- **기능**:
  - Gmail (자체 도메인)
  - Google 캘린더 / 드라이브 / Meet / Docs
  - 스팸 필터 업계 최고
  - 모바일 앱 + 웹 통합
- **장점**:
  - 비영리 무료 → **₩0/월 가능**
  - 도착률·스팸 차단 업계 최고
  - 사용자 인터페이스 친숙
  - 외국 후원자/파트너와 소통 시 편함 (Gmail 호환)
- **단점**: 비영리 인증 신청 (1~2주 심사) 필요
- **비영리 신청**: <https://www.google.com/nonprofits>

### 🥈 Microsoft 365 Business Basic
- **무료 옵션**: 비영리 NGO 무료 (Microsoft Philanthropies)
- **유료**: $6/월 / 사용자
- **기능**: Outlook / Teams / Word / Excel 웹 / 1TB OneDrive
- **장점**: 사무업무 통합, Teams 회의, Word/Excel 익숙
- **단점**: Outlook 인터페이스가 한국에서 덜 친숙
- **비영리 신청**: <https://www.microsoft.com/ko-kr/nonprofits>

### 🥉 가비아 메일호스팅 — **국내 토종**
- **유료**: 약 ₩5,000/월 / 1계정 (1GB)
  - 추가 계정 ₩2,000/월
- **장점**:
  - 도메인이 가비아면 추가 설정 거의 불필요
  - 한국어 고객지원
  - 결제·세금계산서 한국식
- **단점**:
  - 메일 UI 가 단순 (모바일 앱 없음 / 웹메일만)
  - 스팸 필터 Google 대비 약함
  - 외국 후원자에게 메일 보낼 때 한국 IP 평판 이슈 가끔 있음
- **신청**: <https://www.gabia.com/service/mail/intro>

### Naver Worksmile (네이버웍스)
- **무료 옵션**: Free 플랜 — 사용자 30명 / 5GB / 광고 표시
- **유료**: ₩6,500/월 / 사용자 (Lite)
- **장점**: 한국식 UI, 카카오톡 같은 채팅, 일정 관리
- **단점**: 자체 도메인 메일은 Free 플랜에서 제약
- **신청**: <https://worksmobile.com>

### 다음 스마트워크 (카카오워크 + 다음메일)
- 비즈니스 메일 보다는 협업툴 위주
- 자선 단체엔 비추천

---

## 2. 한 눈에 비교

| 서비스 | 비영리 무료 | 유료 시작 | 한국 UX | 글로벌 호환 | 도착률 | 추천도 |
|---|---|---|---|---|---|---|
| **Google Workspace** | ✅ **무료** (사단법인) | $7.20 | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | 🥇 |
| **Microsoft 365** | ✅ 무료 (NGO) | $6 | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | 🥈 |
| **가비아 메일호스팅** | 없음 | ₩5,000 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ | 🥉 |
| Naver Worksmile | 일부 무료 | ₩6,500 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ | △ |
| (다음/카카오) | 부분 | - | ⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐ | 🚫 |

---

## 3. 추천 — Google Workspace for Nonprofits

### 왜 Google Workspace?
1. **사단법인 → 100% 무료** (Business Standard 급 기능)
2. **도착률·스팸 필터 업계 최고**
3. **외국 후원자/파트너와 호환 최강** (Gmail UI는 글로벌 표준)
4. **모바일·PC·웹 통합** — 어디서나 같은 메일함
5. **Google 캘린더 / 드라이브 / Meet 무료 추가** — 후원자 미팅, 공유 문서 관리 등

### 자선 사이트에 자주 필요한 것들도 다 무료:
- 후원자 명단 Excel/Sheets 관리
- 자원봉사자 일정 캘린더 공유
- Zoom 대신 Google Meet (월 100회 까지 무료)
- 공식 문서 PDF 보관 (드라이브 2TB)

### 비용 비교 (1년)
| 옵션 | 1년 비용 |
|---|---|
| 🥇 Google Workspace 비영리 | **₩0** |
| 🥈 Microsoft 365 NGO | **₩0** |
| 🥉 가비아 메일 1계정 | ₩60,000 |
| Naver Worksmile Lite | ₩78,000 |

---

## 4. Google Workspace for Nonprofits — 신청 절차

### 단계 (총 2~3주 소요)

**Step 1. TechSoup Korea 가입** (1~2일)
- <https://www.techsoupkorea.or.kr>
- 사단법인 등록증 + 고유번호증 (825-82-00555) 업로드
- 비영리 NPO 검증 절차 (1~3일)

**Step 2. Google for Nonprofits 신청** (1~2주)
- <https://www.google.com/nonprofits>
- TechSoup 인증 코드로 신청
- 단체 활동 증빙 (홈페이지, 활동 보고서 등)

**Step 3. Google Workspace 활성화 (승인 후)**
- 도메인 추가: `golikorearotary.or.kr`
- 가비아 DNS 에 MX / SPF / DKIM 레코드 추가 (Google 안내대로)
- `contact@golikorearotary.or.kr`, `info@`, `admin@` 등 자유롭게 생성

**Step 4. 사이트 연동**
- Footer 의 메일 주소 → `contact@golikorearotary.or.kr` (이미 적용됨)
- 문의 폼 수신지 → `contact@golikorearotary.or.kr` 로 변경 가능
- Resend `noreply@` 와 별개로 작동 (충돌 X)

---

## 5. 빠른 임시 대안 — 무료 forwarding (오늘 바로 가능)

Google Workspace 승인 받기 전까지 임시로 쓸 수 있는 옵션:

### **ImprovMX** (무료 무기한)
- `contact@golikorearotary.or.kr` → `golikorea@naver.com` 으로 자동 전달
- DNS 에 MX 2개 + SPF 1개 추가 (5분)
- 발송은 여전히 naver 에서 (`naver` 가 발신자)
- <https://improvmx.com>

### **Cloudflare Email Routing** (무료)
- ImprovMX 와 비슷
- 단 가비아 도메인은 Cloudflare nameserver 로 이전 필요 → 권장 X

**즉시 작동 + 무료**가 필요하면 ImprovMX 가 가장 간단.

---

## 6. 결론 — 추천 시퀀스

| 시점 | 조치 | 비용 |
|---|---|---|
| **즉시** | ImprovMX 로 `contact@...` → `golikorea@naver.com` 임시 전달 (5분 작업) | ₩0 |
| **이번 주** | TechSoup Korea 가입 + Google for Nonprofits 신청 시작 | ₩0 |
| **2~3주 후** | 승인 → Google Workspace 활성화 → MX 교체 (ImprovMX 제거) | ₩0 |
| **그 후** | `contact@golikorearotary.or.kr` 로 운영팀이 직접 수신·발신 | ₩0/월 영구 |

**총 비용**: **₩0** (사단법인 비영리 자격 유지하는 한)

---

## 7. 작업 가이드 — 의뢰인용

승인 받으신 후 알려주시면 다음을 도와드립니다:

1. ImprovMX 가비아 DNS 입력 안내 (즉시)
2. Google Workspace MX 레코드 가비아 등록 안내 (승인 후)
3. 사이트 문의 폼 수신 메일 변경 (`golikorea@naver.com` → `contact@golikorearotary.or.kr`)
4. Resend 발신을 Google Workspace SMTP 로 통합할지 검토 (선택)

---

## 8. 참고 링크

- Google for Nonprofits: <https://www.google.com/nonprofits>
- Microsoft for Nonprofits: <https://www.microsoft.com/ko-kr/nonprofits>
- TechSoup Korea (NPO 인증): <https://www.techsoupkorea.or.kr>
- 가비아 메일호스팅: <https://www.gabia.com/service/mail/intro>
- ImprovMX (무료 forwarding): <https://improvmx.com>

---

*가격은 2026년 4월 기준. 변동 가능하니 신청 직전 공식 페이지 재확인.*
