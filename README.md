# 아빠 환갑기념 다낭 가족여행 🌊

**배포 URL**: https://family-trip-2026-0911.web.app

---

## 프로젝트 개요

2026년 9월 11일~15일 다낭 가족여행을 위한 단일 HTML 웹앱.
Firebase Firestore 실시간 동기화 기반, 별도 빌드 없이 `index.html` 하나로 구성.

---

## 주요 기능

### 탭 구성
| 탭 | 내용 |
|----|------|
| 일정 | 다낭 3박 4일 여행 일정 (현재 SCHEDULE_LOCKED=true, 회색 오버레이) |
| 항공 | 인천↔다낭 항공 정보 |
| 숙소 | 호텔 정보 |
| 교통 | 버스/이동 정보 |
| 여행정보 | 환율 계산기(KRW↔VND), 음식가이드, 교통수단, 쇼핑팁 |
| 준비물 | 체크리스트 (Firestore 실시간 동기화) |
| 편지 📮 | 가족 타임캡슐 — 귀국 후 오픈 |

### 편지(타임캡슐) 시스템
- **개념**: 가족 4명이 서로에게 편지를 쓰는 롤링페이퍼 타임캡슐
- **비밀번호**: 각자에게 개별 전달 (아래 상수 참고)
- **오픈 시점**: 귀국 후 `LETTER_OPEN_DATE` (ICN 도착 07:05 + 1시간)
- **쓰기**: 본인 비밀번호 인증 → 받는 사람 선택 → 편지 작성/수정/삭제
- **읽기**: 오픈 날짜 이후 본인 비밀번호로 받은 편지함 확인

### 기타 기능
- **입장 페이지(Splash)**: 링크 첫 접속 시만 표시, 새로고침 시 스킵
- **D-Day 카운트다운**: 시/분/초 실시간 업데이트
- **댓글**: 각 일정 카드에 가족 댓글 (Firestore 실시간)
- **환율 계산기**: KRW → VND 자동 변환 (기준율 CC_RATE = 17)
- **카카오톡 배너**: 안드로이드 카카오 브라우저에서만 "외부브라우저로 열기" 안내
- **라이트모드**: 네이비 계열 (#1e3a6e, #3561a8)

---

## 주요 상수

```js
const TRIP_ID = 'danang-2026-0911';
const SCHEDULE_LOCKED = true;          // 일정 잠금 오버레이
const CC_RATE = 17;                    // KRW→VND 기준환율

const LETTER_OPEN_DATE = new Date('2026-09-15T09:25:00+09:00');

const LETTER_PASSWORDS = {
  '👩🏻 엄마': '0505',
  '👧🏻 서현': '9610',
  '👦🏻 영빈': '0303',
  '👨🏻 아빠': '6608'
};

const LETTER_PARTICIPANTS = ['👩🏻 엄마', '👨🏻 아빠', '👧🏻 서현', '👦🏻 영빈'];
```

---

## Firebase 구성

- **프로젝트**: `family-trip-2026-0911`
- **Hosting URL**: https://family-trip-2026-0911.web.app
- **Firestore 경로**:
  - 댓글: `trips/danang-2026-0911/activities/{id}/comments`
  - 체크리스트: `trips/danang-2026-0911/checklist`
  - 편지: `trips/danang-2026-0911/letters/{docId}` (from, to, title, content, createdAt, updatedAt)

---

## 개발/배포

```bash
# Firebase Hosting 배포
firebase deploy --only hosting

# 편지 전체 삭제 (테스트 후 정리)
# URL에 ?clearLetters=1 접속

# 편지탭 미리보기 (오픈 날짜 전 확인용)
# URL에 ?preview=open 접속
```

---

## TODO (다음 작업)

- [ ] 디자인: 휴양지/리조트 느낌 추가 (색감 or 패턴 방향 미정)
- [ ] 일정 잠금 해제 (`SCHEDULE_LOCKED = false`) — 일정 확정 후
