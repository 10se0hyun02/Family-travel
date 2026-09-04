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
- 일정: 2026-09-11 ~ 09-15 (4박 5일, 귀국일이 09-14→09-15로 하루 연장됨)
- 가족: 👩🏻 엄마(0505) / 👨🏻 아빠(6608) / 👧🏻 서현(9610) / 👦🏻 영빈(0303)

## 항공편
- 가는편(인천→다낭): 9/11(금) 20:55→23:40 DAD, 에어서울 RS0511, A321, 4시간45분, PNR U47AY5, 웹투어 예약번호 1900175
- 오는편(다낭→인천): 9/15(화) 01:50→08:25 ICN, 에어서울 RS0512, A321, 4시간45분, PNR MP6296, 웹투어 예약번호 1900176
- 예약대행사: 웹투어 (기존 투어비스에서 변경)
- 무료 수하물: 인당 15kg
- **미확정**: 9/13(일) 저녁 공항이동(20:30)·수속(22:00)·9/14(월) 낮 일정 — 귀국일이 하루 밀리면서 재배치 필요하지만 사용자가 "일단 항공편만 반영, 낮 일정은 나중에" 결정. 9/14는 현재 빈 날.

## 주요 상수
```js
const TRIP_ID = 'danang-2026-0911';
const SCHEDULE_LOCKED = false;   // 일정 잠금 해제됨
const CC_RATE = 17;             // KRW→VND 환율
const LETTER_OPEN_DATE = new Date('2026-09-15T09:25:00+09:00');
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
- [x] 휴양지/리조트 느낌 디자인 추가 — Tropical Beach 톤으로 진행 중 (미커밋)
- [x] `SCHEDULE_LOCKED = false` 전환 완료
- [ ] 9/13(일) 저녁~9/14(월) 낮 일정 재배치 (귀국일 연장에 따른 공백 채우기)

**Why:** 아빠 환갑 기념 여행, 서현(딸)이 직접 제작한 것이 컨셉  
**How to apply:** 다음 세션에서 디자인 작업 재개 시 TODO 이어서 진행
