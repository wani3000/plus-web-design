# research.md

## Repository Facts
- 저장소 경로: `/Users/hanwha/Documents/GitHub/plus-web-design`
- 프로젝트 형태: Vite 기반 정적 랜딩
- 활성 페이지:
  - `/Users/hanwha/Documents/GitHub/plus-web-design/index.html`
  - `/Users/hanwha/Documents/GitHub/plus-web-design/guide.html`
  - `/Users/hanwha/Documents/GitHub/plus-web-design/gift-qa.html`
- 검증된 서버/DB/ORM 레이어는 없습니다.

## Active Runtime
- `/Users/hanwha/Documents/GitHub/plus-web-design/index.html`
- `/Users/hanwha/Documents/GitHub/plus-web-design/guide.html`
- `/Users/hanwha/Documents/GitHub/plus-web-design/gift-qa.html`
- `/Users/hanwha/Documents/GitHub/plus-web-design/main.js`
- `/Users/hanwha/Documents/GitHub/plus-web-design/detail.js`
- `/Users/hanwha/Documents/GitHub/plus-web-design/style.css`
- `/Users/hanwha/Documents/GitHub/plus-web-design/src/components/Header.js`
- `/Users/hanwha/Documents/GitHub/plus-web-design/src/initSectionsTest1.js`
- `/Users/hanwha/Documents/GitHub/plus-web-design/src/initStoreDownloadModal.js`
- 현재 문서 title 문자열: `앞서가는 부모들의 자산공식, 파이`

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
- 모바일 `Section 01B` phone rail 은 width-change 기반 재계산만 허용하고, height-only resize에서는 강제 리셋하지 않도록 조정했습니다.
- 모바일 `Section 01B` 의 내부 `phone-screen` / `phone-image` radius 는 `19px` 입니다.

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

## Typography Snapshot
- 카드/인트로 설명 본문(`Section 03`, `Section 04`, `Section 05 intro`)은 현재 viewport별로 다음 값을 사용합니다.
  - Desktop (`min-width: 1101px`): `18px`
  - Tablet (`768px ~ 1100px`): `16px`
  - Mobile (`max-width: 767px`): `16px`
- 데스크톱 섹션 서브타이틀(`Section 01B`, `Section 03`, `Section 04`, `Section 05`)은 `22px`로 맞춥니다.

## Desktop CTA Snapshot
- 데스크톱 `Section 05 intro` 카드의 `자세히 보기` 버튼은 헤더 `App Store` / `Google Play` 버튼과 동일한 `44px` 높이로 맞춥니다.

## Mobile Section 01B Animation
- 모바일 `Section 01B` 레일 끊김의 핵심 원인은 `resize` 이벤트마다 즉시 `syncPhoneRail({ immediate: true })`가 실행되며 레일을 강제로 재배치하던 구조였습니다.
- 특히 iPhone Safari 주소창 변화로 생기는 height-only resize에도 리셋이 발생할 수 있었습니다.
- 보조 악화 요인:
  - 모바일 `.section-01b__phone-wrap` 의 상시 `will-change: transform`
  - 사이클 끝의 `appendChild + immediate sync`
- 현재는:
  - width 변화가 있을 때만 재계산
  - step / targetX 캐싱
  - 사이클 완료 후 전체 sync 대신 레일 위치만 복원
  방식으로 정리했습니다.

## Deployment Workflow
- `/Users/hanwha/Documents/GitHub/plus-web-design/.github/workflows/deploy-pages.yml` 는 현재 `gh-pages` 브랜치 배포 방식을 유지합니다.
- 현재 워크플로:
  - `actions/checkout@v6`
  - `actions/setup-node@v6`
  - `peaceiris/actions-gh-pages@v4`
- 공식 Pages 액션 체인 전환은 시도했지만 실패했습니다.
  - `GET /repos/{owner}/{repo}/pages` -> `404 Not Found`
  - `POST /repos/{owner}/{repo}/pages` -> `403 Resource not accessible by integration`
- 즉 현재 자격으로는 저장소 Pages site를 생성/활성화할 수 없습니다.
- 결론적으로 배포 안정성을 우선해 working path로 되돌리고, 업그레이드 가능한 액션(`checkout`, `setup-node`)만 최신으로 올렸습니다.

이 두 경고는 현재 기능 차단 이슈로 판단하지 않습니다.

## Detail Pages
- `guide.html` 과 `gift-qa.html` 는 root HTML 엔트리로 추가됩니다.
- `vite.config.js` 의 `rollupOptions.input` 에 3개 엔트리(`index`, `guide`, `giftQa`)를 명시해야 빌드 산출물에 포함됩니다.
- 두 페이지는 공통 `detail.js` 를 사용하고, 모바일은 back header / 태블릿·데스크톱은 기존 `Header()` 를 사용합니다.
- 상세 페이지 초기 아이콘 확대 플래시는 CSS를 `detail.js` 에서 import 하던 구조 때문에 발생했습니다. 현재는 두 HTML이 `style.css` 를 직접 `<link>` 로 로드하고, `detail.js` 는 DOM/행동만 담당합니다.
- preview 확인 결과:
  - `/` -> `200`
  - `/guide.html` -> `200`
  - `/gift-qa.html` -> `200`
