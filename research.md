# research.md

## Repository Facts
- 저장소 경로: `/Users/hanwha/Documents/GitHub/plus-web-design`
- 프로젝트 형태: Vite 기반 정적 랜딩
- 활성 페이지: `/Users/hanwha/Documents/GitHub/plus-web-design/index.html`
- 검증된 서버/DB/ORM 레이어는 없습니다.

## Active Runtime
- `/Users/hanwha/Documents/GitHub/plus-web-design/index.html`
- `/Users/hanwha/Documents/GitHub/plus-web-design/main.js`
- `/Users/hanwha/Documents/GitHub/plus-web-design/style.css`
- `/Users/hanwha/Documents/GitHub/plus-web-design/src/components/Header.js`
- `/Users/hanwha/Documents/GitHub/plus-web-design/src/initSectionsTest1.js`
- `/Users/hanwha/Documents/GitHub/plus-web-design/src/initStoreDownloadModal.js`

## Asset Audit
- 점검 기준 파일:
  - `index.html`
  - `main.js`
  - `style.css`
  - `src/initSectionsTest1.js`
  - `src/initStoreDownloadModal.js`
  - `src/components/Header.js`
- 위 활성 런타임 파일 기준으로 `public/` 참조를 다시 조사했습니다.
- 확인된 미사용 `public/` 파일:
  - `.DS_Store`
- 그 외 `public/` 파일은 모두 현재 홈 엔트리에서 사용 중입니다.

## Viewport Behavior Snapshot
### Desktop
- `1100px` 초과
- 기본 header / card layout / footer 구조 사용

### Tablet
- `768px ~ 1100px`
- 단일 `앱 다운로드` 헤더/CTA
- tablet-only 줄바꿈과 카드 typography override 일부 존재
- Section 01 말풍선은 mobile-style compact layout을 재사용
- Section 01 말풍선 텍스트 크기는 `16px`
- `section-01__bubble--5` 는 태블릿에서 `520px` 상한과 자연 줄바꿈 규칙을 사용

### Mobile
- `767px` 이하
- 모바일 헤더
- 모바일 hero 비디오/fallback 처리
- 모바일 Section 01/01b 전용 분기 존재

## Codebase Hygiene Findings
- `README.md`, `research.md`, `plan.md`, `handoff.md` 에 이전 사용자 경로(`/Users/chulwan/...`)가 남아 있었습니다.
- 문서가 append-only 로그 형태로 누적되어 현재 구조를 빠르게 파악하기 어려운 상태였습니다.
- 현재 정리 목표는 UI 수정이 아니라:
  - 경로/현실 최신화
  - 미사용 자산 제거
  - 문서 재구성
  입니다.

## Verified Build Status
- `npm run build` 성공
- 현재 알려진 경고:
  - `lottie-web` direct `eval`
  - bundle chunk size warning

이 두 경고는 현재 기능 차단 이슈로 판단하지 않습니다.
