# Gift of Life Korea — 위성클럽 웹페이지 TODO

마지막 업데이트: 2026-04-21

프로젝트: `golikorearotary.or.kr` (확정) · GitHub Pages 호스팅
저장소: https://github.com/kimhyunjin0730-sys/giftoflife_testpage2

---

## 🔴 의뢰인(Brett)으로부터 받아야 할 것 — Blocking

| # | 항목 | 용도 | 상태 |
|---|------|------|------|
| 1 | **한수로타리클럽 전용 계좌 정보** (은행명 · 계좌번호 · 예금주) | 후원 페이지 Channel B (로타리 회원 전용) 표시 | 계좌 개설 중 |
| 2 | **도메인 DNS 권한** (가비아 등 등록업체 로그인 혹은 DNS 담당자 정보) | `golikorearotary.or.kr` → GitHub Pages 연결 | 미수령 |
| 3 | **해외 송금용 wire transfer 계좌 정보** | 후원 페이지 하단 "해외 송금 후원" 섹션 안내용 | Brett이 별도 제공 예정 |
| 4 | **오프라인 미팅 일정** | 세부 사항 + 기존 홈페이지(`golikorea.or.kr`) 리뉴얼 협의 | Brett이 별도 연락 예정 |

> 💡 Brett이 3/31, 4/17, 4/21 카톡에서 약속한 항목들. 받는 즉시 아래 "내가 할 것"으로 이동.

---

## 🟡 내가 할 것 — 자료 도착 후 실행

### A. 로타리 전용 계좌 반영 (3줄 작업)
1. [index.html](index.html) 상단에서 `ROTARY_BANK_INFO` 검색
2. 아래 3개 값만 교체:
   ```js
   const ROTARY_BANK_INFO = {
     bank:    '신한은행',              // ← 실제 은행명
     account: '100-123-456789',        // ← 실제 계좌번호
     holder:  '한수 로타리클럽 위성클럽 · Hansoo Rotary Satellite Club',
   };
   ```
3. 커밋/푸시 → GitHub Pages 자동 반영 (약 30초~1분)
4. 반영되면 "계좌 개설 중 · Pending" 뱃지가 "공개중"으로 바뀌고 복사 버튼 활성화됨

### B. 도메인 연결
1. DNS 등록업체 관리자 페이지 접근
2. `golikorearotary.or.kr` A 레코드에 GitHub Pages IP 추가:
   - `185.199.108.153`
   - `185.199.109.153`
   - `185.199.110.153`
   - `185.199.111.153`
3. (선택) `www` CNAME → `kimhyunjin0730-sys.github.io`
4. GitHub 저장소 Settings → Pages → Custom domain에 `golikorearotary.or.kr` 입력
5. "Enforce HTTPS" 체크 (Let's Encrypt 자동 발급 대기 ~24시간)
6. 전파 후 `https://golikorearotary.or.kr` 접속 확인

### C. 해외 송금 문의 응대 플로우
- Brett이 wire transfer 계좌 정보 전달 시, 별도 페이지 만들지 말고 **문의 이메일 응답 템플릿**만 준비
- 현재 UI는 `golikorea@naver.com`으로 메일 유도하도록 구현됨

---

## 🔵 선택/추후 개선 — 여유 생길 때

- [ ] **기존 홈페이지(`golikorea.or.kr`) 리뉴얼** — Brett이 미팅에서 요청 예정 (카톡 3/31)
- [ ] **관리자 페이지(`admin.goli`) 후원 데이터 스키마 재정리** — PG 연동 제거했으므로 수동 입금 기록 용도로 축소
- [ ] **SEO 메타 태그 / Open Graph 이미지** 점검 (`title`, `description`, `og:image`)
- [ ] **접근성 최종 점검** — alt 텍스트, ARIA 라벨, 키보드 네비게이션, 명도 대비
- [ ] **Lighthouse 점수 측정** — Performance / Accessibility / SEO
- [ ] **모바일 실기기 테스트** — iPhone Safari, Android Chrome
- [ ] **다국어(JA/ES) 추가 필요성 검토** — 현재 KO/EN/ZH만 있음
- [ ] **Dead JS 코드 추가 정리** — `setDonateType`, `setDonorType`, `togglePayMethod` 등 폼 관련 no-op 함수들 (현재 안전한 dead code이나 정리 가능)

---

## ✅ 완료 (2026-04-21 기준)

- [x] 결제(PG사) 연동 제거 — PortOne SDK / `IMP.init` / `submitDonate` 정리
- [x] 2채널 후원 UI 재설계
  - Channel A: 일반 후원 → `https://online.mrm.or.kr/oytvcb5` 외부 링크
  - Channel B: 로타리 회원 전용 → 전용 계좌 placeholder (네이비 그라디언트 카드 + Rotary SVG)
- [x] 홈 후원 위젯을 금액 선택에서 2-CTA 버튼으로 단순화
- [x] `ROTARY_BANK_INFO` 객체로 계좌 확정 시 3줄 교체하면 자동 갱신
- [x] 해외 송금 안내 섹션 추가 (Brett의 wire transfer 언급 반영)
- [x] KO/EN/ZH 다국어 키 29개 추가
- [x] HTML 무결성 검증 (div 균형 784/784)
- [x] 커밋 푸시 `136c834`

---

## 📞 커뮤니케이션 기록 (요약)

| 날짜 | 이슈 | 결정 |
|------|------|------|
| 2026-03-27 | 프로젝트 TF 방 개설, 내용 스펙 공유 | 초안 URL 공유 |
| 2026-03-31 | 도메인 연결 문의 | Brett: 새 URL 사용 방향, 결정 후 회신 |
| 2026-04-17 | PG 연동 / 도메인 후속 | Brett: **PG 불필요 · 계좌 정보만 표시** · 도메인 3안 제시 |
| 2026-04-21 | **최종 확정** | 도메인: `www.golikorearotary.or.kr` · 일반: MRM 링크 · 로타리: 계좌 개설 대기 |

---

## 🔗 참고 링크

- 일반 후원 외부 링크: https://online.mrm.or.kr/oytvcb5
- 기존 GOLI 홈페이지: https://www.golikorea.or.kr
- GitHub Pages (현재): https://kimhyunjin0730-sys.github.io/giftoflife_testpage2/
- 최종 도메인(DNS 설정 후): https://golikorearotary.or.kr
