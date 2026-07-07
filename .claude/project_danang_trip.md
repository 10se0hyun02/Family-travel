---
name: project-danang-trip
description: "아빠 환갑기념 다낭 가족여행 웹앱 — 구현 현황, 주요 상수, TODO"
metadata: 
  node_type: memory
  type: project
  originSessionId: b442ba8e-429a-460e-a05c-af407292b181
---

# 다낭 가족여행 웹앱

**파일**: `${GDRIVE_ROOT}\Projects\family-travel\index.html` (단일 HTML, ~3300줄, 경로 변수는 [[user-work-environment]] 참고)  
**배포 URL**: https://family-trip-2026-0911.web.app  
**Firebase 프로젝트**: `family-trip-2026-0911`

## 여행 정보
- 일정: 2026-09-11 ~ 09-14 (3박 4일)
- 가족: 👩🏻 엄마(0505) / 👨🏻 아빠(6608) / 👧🏻 서현(9610) / 👦🏻 영빈(0303)

## 주요 상수
```js
const TRIP_ID = 'danang-2026-0911';
const SCHEDULE_LOCKED = true;   // 일정 확정 후 false로 변경
const CC_RATE = 17;             // KRW→VND 환율
const LETTER_OPEN_DATE = new Date('2026-09-14T08:05:00+09:00');
```

## 탭 구성
일정 / 항공 / 숙소 / 교통 / 여행정보(환율계산기·음식·쇼핑) / 준비물 / 편지📮

## 편지(타임캡슐) 시스템
- 가족 4명이 서로에게 롤링페이퍼 형식으로 편지 작성
- 비밀번호 인증 → 받는 사람 선택 → 작성/수정/삭제
- 귀국 후 오픈 (LETTER_OPEN_DATE 기준)
- Firestore: `trips/danang-2026-0911/letters/{docId}` (from, to, title, content)
- 미리보기: `?preview=open`  /  전체삭제: `?clearLetters=1`

## 디자인
- 테마: 네이비 라이트모드 (`--bg: #e8edf7`, `--primary: #3561a8`, `--header-from: #1e3a6e`)
- 입장 Splash: 링크 접속 시만, 새로고침 시 스킵 (navigation type 감지)
- 카카오톡 배너: 안드로이드만 표시, 네이비 배경

## TODO (미완료)
- [ ] 휴양지/리조트 느낌 디자인 추가 — 방향 미정 (색감 변경 or 패턴 추가)
- [ ] 일정 확정 후 `SCHEDULE_LOCKED = false` + 일정 내용 입력

**Why:** 아빠 환갑 기념 여행, 서현(딸)이 직접 제작한 것이 컨셉  
**How to apply:** 다음 세션에서 디자인 작업 재개 시 TODO 이어서 진행
