# research.md

## System Overview
- Repository: `/Users/chulwan/Documents/GitHub/plus-web-design`
- Verified runtime shape: static Vite multi-entry landing site
- Verified primary page: `/` from [index.html](/Users/chulwan/Documents/GitHub/plus-web-design/index.html)
- Verified alternate pages:
  - `/test2.html`
  - `/test3.html`
- Verified build command: `npm run build`
- Verified verification command: `npm run verify`

현재 저장소는 PI(자산공식) 콘셉트의 애니메이션 중심 정적 랜딩 프로토타입이다. 코드베이스의 실질적인 핵심은 루트 엔트리 파일과 정적 자산이며, 런타임은 브라우저 내 GSAP 타임라인, DOM 측정, 텍스트/숫자 애니메이션, 비디오/이미지 레이어 조합으로 구성된다. 서버 렌더링, 백엔드, ORM, 데이터 저장소는 현재 코드에서 검증되지 않았다. 최근 구조상 가장 중요한 사실은 `test1`, `test2`, `test3`가 이제 JS 초기화 기준으로 분리되어 있으며, 같은 섹션 이름을 공유해도 각 엔트리의 히어로/인터랙션은 서로 다른 코드 경로로 실행된다는 점이다. 모바일에서는 데스크톱 헤더의 `테스트1/테스트2/테스트3` 네비게이션과 섹션 스크롤 애니메이션을 숨기고, 모바일 전용 헤더와 단일 히어로만 보여준다. 모바일 히어로는 20px 패딩 기준의 단일 메인 비디오로 축약되며, 헤더 아래 첫 화면에서 꽉 차게 보이도록 설정된다. 모바일에서는 섹션 타이틀과 서브타이틀의 크기를 각각 28px / 18px으로 통일하고, 타이틀-서브타이틀 간격은 16px로 맞춘다. 모바일 `Section 01` 말풍선은 예외로 15px을 사용한다. 모바일 주요 섹션 타이틀은 전용 줄바꿈을 사용한다. 모바일 `Section 03` 카드의 `첫번째~네번째 공식` chip은 카드 우측 정렬 대신 타이틀 위 8px 간격의 세로 스택으로 바뀌고, 카드 내부 그래픽은 65% 스케일로 축소되며, 카드 내부 패딩은 상하좌우 20px으로 줄어든다. 모바일 `Section 03` 카드 높이는 500px로 맞추고, 카드 내부 텍스트는 원래 크기를 유지한 채 텍스트 블록 폭만 카드 안으로 제한한다. 모바일 `Section 04`의 `증여 계획부터 시작해요`, `증여금을 투자로 연결해요`, `증여세 신고까지 끝내요`, `쉬운 자녀관리` 카드 내부 그래픽/컴포넌트는 70% 스케일로 축소되고, 카드 높이도 500px로 통일된다. 이 카드들의 모바일 텍스트도 원래 크기를 유지한 채 카드 안으로 제한한다. 이 중 `증여세 신고까지 끝내요`와 `쉬운 자녀관리`는 모바일에서만 카피 블록을 상단 정렬로 올려 다른 카드와 같은 리듬을 맞춘다. 모바일 `Section 05 intro`의 두 정보 카드는 1열 스택으로 바뀐다. 모바일 `Section 05` 다운로드 CTA는 스토어 2버튼 대신 `plus-web-marketing`의 `파이 시작하기` 단일 `앱 다운로드` 버튼 스타일을 사용한다. 히어로 카피 `앞서가는 부모들의 자산 공식`은 데스크톱/모바일 모두 메인 히어로 이미지 정중앙에 흰색 오버레이로 배치된다. 히어로 메인 비디오는 `source` 태그와 poster/fallback 이미지 구조를 사용하며, 실제 재생 가능 시점(`canplay/playing`)까지 fallback을 유지한다.

## Verified Technical Stack
- Runtime: Node.js
- Package manager: npm
- Build tool: Vite `^8.0.1`
- Core animation: GSAP `^3.14.2`
- Additional animation/runtime dependency: `lottie-web ^5.13.0`
- Verification dependency: `playwright ^1.59.0`
- Language: Vanilla JavaScript with ES modules
- Styling: plain CSS with local font-face declarations
- Deployment:
  - GitHub Pages
  - Vercel

## Verified Build and Artifact Findings

### Source build configuration
- [package.json](/Users/chulwan/Documents/GitHub/plus-web-design/package.json)
  - `dev`: `vite`
  - `build`: `vite build`
  - `preview`: `vite preview`
  - `verify:preview`: `node scripts/verify-preview.mjs`
  - `verify`: `npm run build && npm run verify:preview`
- [vite.config.js](/Users/chulwan/Documents/GitHub/plus-web-design/vite.config.js)
  - `base` is driven by `process.env.BASE_PATH || '/'`
  - multi-entry inputs:
    - `index.html`
    - `test2.html`
    - `test3.html`

### Verified build result
- `npm run build` succeeds
- Generated HTML:
  - `dist/index.html`
  - `dist/test2.html`
  - `dist/test3.html`
- Static assets under `public/` are copied to `dist/`
- Known warning:
  - `lottie-web` emits a build warning related to `eval`
  - this is currently a warning, not a build failure

### Preview verification
- `npm run verify` succeeds
- Preview route checks pass:
  - `/` -> `200`
  - `/test2.html` -> `200`
  - `/test3.html` -> `200`

## Directory and Module Analysis

### Active root entry files
- [index.html](/Users/chulwan/Documents/GitHub/plus-web-design/index.html)
  - primary landing page and main production-facing prototype
- [main.js](/Users/chulwan/Documents/GitHub/plus-web-design/main.js)
  - header mount and hero-only scroll timeline for the main page
- header PI logo reloads the landing top on root pages
- [src/initSectionsTest1.js](/Users/chulwan/Documents/GitHub/plus-web-design/src/initSectionsTest1.js)
  - `index.html` 전용 section 01~05 initializer
- [src/initSectionsTest2.js](/Users/chulwan/Documents/GitHub/plus-web-design/src/initSectionsTest2.js)
  - `test2.html` 전용 section 01~05 initializer
- [src/initSectionsTest3.js](/Users/chulwan/Documents/GitHub/plus-web-design/src/initSectionsTest3.js)
  - `test3.html` 전용 section 01~05 initializer
- [style.css](/Users/chulwan/Documents/GitHub/plus-web-design/style.css)
  - main landing styles and all section layouts
- [plus-typography.css](/Users/chulwan/Documents/GitHub/plus-web-design/plus-typography.css)
  - shared typography tokens used by mobile and desktop layouts
- [test2.html](/Users/chulwan/Documents/GitHub/plus-web-design/test2.html), [test2.js](/Users/chulwan/Documents/GitHub/plus-web-design/test2.js), [test2.css](/Users/chulwan/Documents/GitHub/plus-web-design/test2.css)
  - iPhone-scroll experiment
- [test3.html](/Users/chulwan/Documents/GitHub/plus-web-design/test3.html), [test3.js](/Users/chulwan/Documents/GitHub/plus-web-design/test3.js), [test3.css](/Users/chulwan/Documents/GitHub/plus-web-design/test3.css)
  - phone-to-card reveal experiment plus pasted main sections

### Shared component and remnants
- [src/components/Header.js](/Users/chulwan/Documents/GitHub/plus-web-design/src/components/Header.js)
  - actively used by `main.js`, `test2.js`, and `test3.js`
- `src/main.js`, `src/style.css`, `src/counter.js`, `src/assets/*`
  - Vite starter remnants or non-active leftovers
  - not part of the active root-level runtime except for `src/components/Header.js`

### Static assets
- [/Users/chulwan/Documents/GitHub/plus-web-design/public](/Users/chulwan/Documents/GitHub/plus-web-design/public)
  - shipped images, videos, icons, svg assets
- [/Users/chulwan/Documents/GitHub/plus-web-design/font](/Users/chulwan/Documents/GitHub/plus-web-design/font)
  - local font sources

### Deployment config
- [/Users/chulwan/Documents/GitHub/plus-web-design/.github/workflows/deploy-pages.yml](/Users/chulwan/Documents/GitHub/plus-web-design/.github/workflows/deploy-pages.yml)
  - GitHub Pages deployment path

## Main Landing Structure Analysis

### Hero
- fixed header injected through [src/components/Header.js](/Users/chulwan/Documents/GitHub/plus-web-design/src/components/Header.js)
- 5-image gallery assembled and animated in [main.js](/Users/chulwan/Documents/GitHub/plus-web-design/main.js)
- late-stage overlay text and dimmed sequencing occur per image card

### Section 01
- title: `아이 자산 어떻게 관리하고 계신가요?`
- floating speech-bubble field
- hover interactions, highlight treatment, and slow drift motion
- currently standard scroll section, not separate presentation panel

### Section 01b
- gray background section immediately after section 01
- title currently: `파이가 자산관리의 시작을 도와드릴게요`
- central white stroke frame with multiple numbered phone-ratio cards
- active center card remains emphasized while side cards stay dimmed
- cards shift laterally in a timed loop
- current entry trigger for the card rail is `start: 'top bottom'` in the per-entry initializers

### Section 02
- title/copy around early start and compounding
- chart card with:
  - animated orange comparison graph
  - `수익 α` label and dashed guide line
  - small/large bar labels:
    - `2천만 원 / 미성년`
    - `5천만 원 / 성년`
- left media block contains a vertically fit video
- right media block contains a centered hero video
- lower stacked-color block contains white/green/red card-drop animation loop

### Section 03
- four “formula” cards
- latest test1 copy currently reads:
  - `증여재산공제에 맞춰 10년 주기로 계획`
  - `유기정기금 증여하고 장기 투자`
  - `장기 투자에 적합한 선택, 미국 ETF`
  - `증여세 신고는 필수!`
- key implemented interactions:
  - chart/limit comparison card
  - monthly giving card with animated count
  - invest-modal card with:
    - oversized clipped card body
    - dimmed overlay
    - slide-up modal
    - prompt cursor state
    - typed amount sequence `1 -> 19 -> 194 -> 1,940 -> 19,400 -> 194,000`
    - reflected value update on underlying card
  - ETF card cluster and related stacked UI
- test1 currently swaps the ETF cluster and invest-modal component positions:
  - `장기 투자에 적합한 선택, 미국 ETF` card contains the ETF cluster
  - `증여세 신고는 필수!` card keeps the title/chip/description and fills the inner white plane with a document checklist UI based on Pencil node `1uy7r`
  - this document checklist card animates in test1 with the white plane and internal title rising first, followed by the two checklist items in sequence
  - after the checklist is fully shown and held for `2초`, the checklist screen exits and a completion state based on Pencil node `mEPLU` rises in with `신고 접수 완료` copy
  - in the completion state, the check icon rises first, followed by the title and then the body copy; the body copy color is `#555558`
  - after the completion state is shown for `5초`, the white plane itself exits downward, resets, and rises back in from below to replay the checklist-to-complete sequence in a loop
  - the ETF cluster in test1 is currently one-shot again: `VOO`, `QQQM`, `XLK` three cards drop in once and then remain settled
  - current displayed seed values are:
    - `VOO / 1.839450주 / 1,753,480원 / +83,097 (5.00%)`
    - `QQQM / 4.537390주 / 1,748,571원 / +83,097 (5.00%)`
    - `XLK / 4.043310주 / 1,752,448원 / +83,097 (5.00%)`
  - once the ETF stack has settled, the right-side totals in test1 now continue updating every `5초` from `5.00%` upward in `1.5%` increments until `12.00%`
  - calculation is based on each card's current displayed total treated as the `5.00%` state, with principal back-calculated and each later total/gain recomputed from that principal
  - ETF change text color is currently `#ff3b30`
  - ETF logo asset is currently `/public/ic_logo_etf.png`
  - ETF stack wrapper is currently positioned at `bottom: -6px`, which is `10px` higher than the previous `-16px`
  - top `VOO` card is currently offset `5px` lower than before via `.section-03__etf-item--first`
  - all Google Play / App Store buttons now open a shared QR popup with dimmed background; the popup shows app name `파이`, the store label, a generated QR code, and a close button using `public/ic_close_24.png`
  - the shared popup is attached globally in `src/initStoreDownloadModal.js`, so the same behavior should exist on test1/test2/test3 without page-specific wiring
  - closing the popup restores focus to the original trigger with `preventScroll: true` and the panel no longer animates translate/scale on close, which removes the visible shake/jump
- test1의 Section 03 네 장은 현재 모두 카드 텍스트가 먼저 등장한 뒤 내부 애니메이션이 이어지는 순서다. 제목/chip이 먼저, 설명문이 그 다음이며, 이후 차트/수치/ETF/문서 카드 모션이 시작된다.
- test1의 애니메이션 카드 트리거는 현재 공통 `top 68%` 기준으로 늦춰져 있다. 이전 `top 80%`보다 카드가 더 내려온 시점에 트리거가 발생한다.

### Section 04
- 테스트1의 `다자녀 자산관리 카드`는 현재 카드 컨테이너 `overflow: hidden` 기준으로 상단이 잘리며, 배지 3개도 같은 카드 경계 안에서 clip된다.
- 현재 위치값은 카드 본체 `top: 45px`, `translateX(calc(-50% + 110px))`, 배지 묶음 `top: 249px`, `translateX(calc(-50% + 250px))`이다.
- 진입 애니메이션은 카드 본체 `y: 56 -> 0`, 배지 묶음 `y: 20 -> 0`으로 분리되어 있다.
- 배지 묶음은 현재 `z-index: 6`으로, 하단 카피와 gradient보다 위 레이어에 있다.
- 배지 3개는 현재 겹친 상태로 등장한 뒤, 카드 진입 완료 후 약 `0.65초` 뒤 초록/파랑 배지만 오른쪽으로 이동해 최종 `10px` 간격을 만든다.
- Pencil `oFssN` 값 기준 하늘색 배지는 배경 `#7d8d9d`, outer gradient stroke, inner white stroke, outer orange shadow를 가진 selected 상태이며, 현재 웹에서는 80px 크기에 맞춰 비례 재현한다.
- selected 배지의 gradient stroke는 현재 mask-composite 기반 ring으로 구현해, stroke 안쪽에 남던 회색 얇은 라인을 제거했다.
- 겹침 상태의 배지 레이어는 `edit(gray)=1`, `olive=2`, `blue selected=3`으로 고정한다.
- 현재 텍스트는 `gray / 김둘째 / 김첫째` 순서이며, selected 스타일은 초기 blue(`김첫째`)에 있다.
- 초기 folded 상태는 `김첫째(7,500,000원)`이며, 이 상태를 `4초` 유지한 뒤 배지가 spread 된다.
- spread 후 `0.45초` 뒤 olive(`김둘째`)가 selected 되고, 금액은 `5,000,000원`으로 바뀌며 상단 이미지 레이어도 선택 자녀에 맞춰 전환된다.
- 그 다음 단계에서 배지들은 다시 접히며, olive는 `x: 36`, blue는 `x: -36`으로 이동해 folded 상태에서도 olive가 selected 위치를 차지한다.
- folded `김둘째` 상태도 `4초` 유지한 뒤 다시 spread 되고, `0.45초` 뒤 blue(`김첫째`)가 selected 되며 금액은 `7,500,000원`으로 돌아간다. 이후 folded blue 상태로 돌아와 같은 루프를 반복한다.
- multiple gray cards for planning, tax, insight, and looping strips
- includes:
  - stacked card animations
  - tax amount counter
- test1의 `증여 계획부터 시작해요` 카드 plan widget은 초기 `5,000,000원 / 5,000,000원` 카운트와 progress 등장 후 약 `2초` 뒤 시작되는 `2.5초` 동안 primary 금액만 `20,000,000원`으로 확장되고, 진한 주황 progress fill도 동시에 `100%`까지 차오른다. 이후 `5초` 정지 후 현재 위젯은 사라지고, 아래에서 0 상태 위젯이 다시 올라오며 같은 시퀀스를 반복한다.
- test1 currently simplifies this section:
  - test1의 Section 04 네 장도 현재 모두 카드 텍스트가 먼저 등장한 뒤 내부 애니메이션이 이어지는 순서다. 제목이 먼저, 설명문이 그 다음이며, 이후 plan widget / 낙하 박스 / tax card / family app 모션이 시작된다.
  - insight list component removed from `증여금을 투자로 연결해요`
  - `증여금을 투자로 연결해요` 카드에는 test2 `Section 02`의 낙하 박스 컴포넌트(흰/초록/빨강)와 같은 물리 애니메이션을 test1 전용 wrapper로 이식했으며, 루트 자산 `ic_box_red.png`, `ic_box_green.png`, `ic_box_white.png`를 그대로 사용함. test1 이식본은 1회만 떨어진 뒤 착지 상태로 유지되고, test2 원본만 반복/이탈 단계를 가진다. 현재 박스는 `120x120`, 내부 아이콘은 비례 축소된 `69x69`이다.
  - 같은 카드는 현재 3박스만 유지하며, 이전에 추가했던 전면 정적 박스는 제거됐다.
  - 현재 Pencil 배치 보정상 뒤쪽 빨강/초록 박스는 비대칭이다. 빨강 박스는 기존 기준보다 `40px` 위, 초록 박스는 기존 기준보다 `120px` 위에 놓여 있다.
  - 초록 박스는 위 이동 보정과 별도로 현재 위치에서 `5px` 더 오른쪽으로 이동해 있다.
  - test1 이식본의 낙하 순서는 `white -> red -> green`이며, test2 원본 `white -> green -> red`와 다르게 분기된다.
  - 3박스 스택 전체는 현재 카드 시각 중심에 맞게 왼쪽으로 재배치되어 있다.
  - bottom marquee/invest strip removed from `쉬운 자녀관리`
  - `쉬운 자녀관리` 카드에는 Figma `222:695` 기반의 모바일 관리 요약 UI가 카드 내부 컴포넌트로 구현되어 있음
  - 같은 카드의 하단 카피 뒤 gradient overlay는 현재 제거된 상태다
  - 같은 카드의 상단 `375x324` 빈 영역은 `/public/bg_image_02.png`로 시작하고, 전환 시 `/public/bg_image_01.png`로 바뀌며, 본문 흰 시트/타이틀은 `300px`부터 시작하는 HTML/CSS 구조로 카드 안에서 겹쳐 올라오게 배치됨
  - 같은 카드의 시트 내부에는 제목 아래 `24px` 간격으로 Pencil `Rz6CN` 기반 신고 금액 요약 컴포넌트를 HTML/CSS로 직접 구현했다
  - 이 신고 금액 요약은 현재 선택 배지와 연동되며, 초기 blue(`김첫째`) 상태에서는 `5,000,000원`, olive(`김둘째`) 선택 전환 후에는 `7,400,000원`으로 primary/sub 값이 함께 바뀐다
  - `김둘째` 선택 전환과 같은 시점에 카드 시트 제목과 신고 금액 요약 컴포넌트는 `y: 16 -> 0`, `autoAlpha: 0 -> 1`의 슬라이드업으로 다시 노출된다
  - 같은 카드 상단에는 Pencil 노드 `KfAFw`, `YXDXl`, `BGdYD`를 80x80 배지로 재현해 카드 컴포넌트 위 레이어에 오버레이 배치하며, `KfAFw` 내부 연필 아이콘은 `/public/ic24_pencil2.png`를 사용함. 현재 카드와 배지 모두 약 10% 위로 이동된 상태에서 배지는 강하게 포개지도록 배치됨

### Section 05
- CTA/download section

## Existing Layer Structure

### UI layer
- Root HTML templates
- Root CSS files
- Static assets in `public/`
- Shared header component

### Business logic layer
- Client-side animation orchestration only
- DOM querying, measurement, sequencing, and state switches

### Data layer
- None verified

### Server layer
- None verified

### API layer
- None verified

### ORM layer
- None verified

## ORM and Database Analysis
- Candidate cause 1: ORM exists in a standard directory and was missed
  - Falsification: no `prisma`, `drizzle`, migration, or database config directories verified
- Candidate cause 2: ORM is declared but not wired
  - Falsification: `package.json` contains no ORM dependency
- Candidate cause 3: DB contract exists through API files or env configs
  - Falsification: no repository-local backend or API runtime was verified
- Conclusion:
  - There is no verified ORM or database layer in this repository

## API Endpoint Analysis
- Candidate cause 1: internal API routes exist under common framework conventions
  - Falsification: no `app/api`, `pages/api`, `server`, `api`, or backend route layer verified
- Candidate cause 2: frontend code actively calls external APIs
  - Falsification: current active landing logic is animation-driven; no meaningful fetch/API contract is implemented in the main runtime
- Candidate cause 3: HTML forms post to backend endpoints
  - Falsification: active pages do not implement form submission to a verified backend
- Conclusion:
  - No internal or external API contract is currently implemented as a repository-owned runtime feature

## UI and Server Boundary
- Verified boundary:
  - browser-only runtime
  - HTML + CSS + JS + static media
  - no server-side rendering in repository
  - no repository-local request handling

## Runtime Behavior by Entry

### Entry 1: `index.html` + `main.js`
- imports GSAP, ScrollTrigger, and `lottie-web`
- injects header/navigation
- coordinates **test1-only** hero one-shot transition
- hero behavior:
  - first downward scroll input triggers a 1.3s one-shot gallery transition
  - after gallery completion, the page auto-scrolls to `Section 01` over 1.3s
  - upward scroll near `Section 01` top can return to hero first state
- hero right-bottom card now uses `section-02-left-video.mp4`
- delegates section 01~05 interactions to [src/initSectionsTest1.js](/Users/chulwan/Documents/GitHub/plus-web-design/src/initSectionsTest1.js)
- active visible section order currently skips former Section 02; removed markup is preserved in [section-02-backup.html](/Users/chulwan/Documents/GitHub/plus-web-design/section-02-backup.html)
- footer is test1-only custom/footer variant, not shared with test2/test3
- test1 desktop/mobile footer brand logo both use local `./io_pi.png`

### Entry 2: `test2.html` + `test2.js`
- `index.html` 기반 전체 랜딩 변형
- former Section 02가 복구된 버전
- mounts the shared header
- owns its own hero scroll-scrub flow with dim/text overlays and gallery text
- uses [src/initSectionsTest2.js](/Users/chulwan/Documents/GitHub/plus-web-design/src/initSectionsTest2.js) for its own lower-section interactions
- keeps the older shared/common footer

### Entry 3: `test3.html` + `test3.js`
- phone-to-card reveal experiment
- dim, text, and reveal transitions
- mounts the shared header
- uses [src/initSectionsTest3.js](/Users/chulwan/Documents/GitHub/plus-web-design/src/initSectionsTest3.js) for the pasted main sections below the hero
- active visible section order also skips former Section 02; removed markup is preserved in [section-02-backup.html](/Users/chulwan/Documents/GitHub/plus-web-design/section-02-backup.html)
- keeps the older shared/common footer

## Entry Split Status
- `test1/test2/test3` no longer share a single section initializer
- current initializer ownership:
  - `test1` -> `main.js` + `src/initSectionsTest1.js`
  - `test2` -> `test2.js` + `src/initSectionsTest2.js`
  - `test3` -> `test3.js` + `src/initSectionsTest3.js`
- this split was introduced to prevent test1 hero/section changes from unintentionally changing test2/test3 behavior
- remaining shared layer:
  - `style.css`
  - `src/components/Header.js`
- consequence:
  - JS interaction regressions can now be isolated per entry
  - CSS-level changes can still affect multiple entries if selectors are shared

## Current Problems and Maintenance Risks

### Confirmed maintenance risks
- Documentation drift
  - `README.md`, `research.md`, and `plan.md` previously lagged far behind actual UI state
- Root-level active files vs `src/` remnants
  - source-of-truth can still be confused by inactive starter files
- Large volume of hard-coded animation constants
  - motion tuning is concentrated in [main.js](/Users/chulwan/Documents/GitHub/plus-web-design/main.js) and [style.css](/Users/chulwan/Documents/GitHub/plus-web-design/style.css)
  - future edits carry regression risk without visual verification
- Local `.pen` artifact is separate from runtime
  - design-source edits and web-runtime edits can drift if not tracked deliberately

### Verified non-problems
- Backend/API absence is not a missing integration bug; it is current repository reality
- `lottie-web` import resolution issue was previously solved by installing dependencies and restarting the dev server

## Current Working Conclusion
- This repository is an actively iterated static landing prototype, not a governance-only setup anymore
- The active source of truth is the root-level HTML/CSS/JS entry set
- The major engineering need now is not backend architecture, but disciplined verification of UI-heavy animation code and keeping docs synchronized with actual implementation state
- Latest verified text change on test1 `Section 04`:
  - planning card description now ends with period (`...가능해요.`)
  - investment-link card description now ends with period (`...수 있어요.`)
- Latest repository asset handoff state:
  - `untitled.pen` is present as the design-source artifact
  - `Product List Container.png` is committed in the repository

- Hero image hover zoom was removed so the gallery no longer scales up on pointer hover.

- The `쉬운 자녀관리` badge selection now holds each selected state for 3 seconds instead of 4.

- The hero main video now preloads `section-02-hero-video-poster.png` and uses it as a background fallback to reduce the black flash on reload.

- The hero main video fallback now uses the provided first-frame screenshot as the visible placeholder until the video is ready.

- Mobile `Section 03` title overflow was traced to the card-head/text block sizing rather than the card width itself; the mobile rules now force the heading block to shrink with `min-width: 0` so the long Korean title wraps inside the card.

- A second mobile-only cause remained on iPhone: Safari text autosizing. The page now sets `-webkit-text-size-adjust: 100%` / `text-size-adjust: 100%` on `html` so long Korean `Section 03` copy uses the authored font sizes instead of native enlargement that pushes text outside the card.

- The gray-card body copy shared by `Section 03` and `Section 04` now uses `16px` instead of `18px`, affecting all eight cards consistently without touching the title scale.

- Mobile gray-card padding was not actually unified: `Section 03` used `20px` while `Section 04` still used `48px`. Mobile now overrides both sections to `30px` so all eight cards share the same padding.

- Mobile `Section 03` graphic spacing was also inconsistent because three cards still used absolute top/bottom placement. The mobile override now makes those wrappers flow below the text with a consistent `20px` start gap.

- Mobile `Section 03` chip-to-title spacing was increased from `8px` to `30px` for all four formula cards.

- Several mobile card graphics were still visually left-weighted because the wrappers kept desktop `top left` transform origins. Mobile now centers the chart, ETF stack, plan widget, and gift-link stack within their cards.

- The first `Section 03` chart remained visually off-center even after wrapper centering because the chart source layout itself is asymmetrical. A dedicated mobile offset now nudges that chart block right to visually center the whole graphic bundle.

- The ETF stack card had the same problem for a different reason: the rotated/offset ETF cards make the bundle visually right-heavy. Mobile now applies a small left correction to the ETF stage inside that card.

- The requested `20px` subtitle-to-graphic spacing also needed per-card fixes: the second formula card had an extra internal `top: 20px`, the ETF card now has an explicit card-level `margin-top: 20px`, and the `쉬운 자녀관리` graphic group was converted away from pure absolute top offsets so the `20px` gap exists in actual flow.

- That change exposed a DOM-order issue on the mobile `쉬운 자녀관리` card: the copy block sat after the app visuals in source order, so once the visuals joined normal flow the text dropped below them. The mobile layout now reorders those children so copy stays first.

- The `쉬운 자녀관리` card still looked taller because `Section 04` mobile cards were using `min-height: 500px`, which let this card grow to fit the oversized app graphic. Mobile now uses a fixed `500px` card height and clips the family app at the bottom edge.
- Mobile `쉬운 자녀관리` card now keeps copy at the top and clips the app graphic from the bottom using absolute positioning inside the fixed-height card.
- Mobile `쉬운 자녀관리` now keeps the sheet's top padding intact and moves the whole app visual 20px upward so the summary is higher while the white top spacing remains visible.
- Mobile `쉬운 자녀관리` now shifts only the top photo down by 20px (`top-image: 20px`) while keeping the white sheet body at `top: 300px`; only the image spacing changes.
- Matched the `쉬운 자녀관리` app photo top-left/top-right corner radius to the white sheet (`24px 24px 0 0`).
- Mobile `증여세 신고까지 끝내요` now uses an absolutely centered tax amount block (`translate(-50%, -50%) scale(0.84)`) and hides the separate logo card so the amount card sits at the true center.
- Root cause for the mobile `증여 계획부터 시작해요` distortion was stacked breakpoint overrides: the 1100px rule made the widget static/full-width with larger fonts, then the mobile rule only applied `355px + scale(0.7)`. Mobile now resets it to an absolutely centered desktop-style card with desktop font sizes.
- The missing mobile HomeTax block was caused by an explicit `display: none` override on `.section-04__card--narrow-bottom .section-04__tax-logo-wrap`; it is now restored and positioned bottom-right so the centered amount card remains intact.
- Mobile `증여 계획부터 시작해요` widget was tuned again: the full block now uses `scale(0.8)` and a wider wrapper (`calc(100% - 10px)`) so it looks less vertically stretched and more horizontally open.
- Increased the mobile `증여금을 투자로 연결해요` three-box graphic by 15% relative to the previous mobile scale (`0.7 -> 0.805`).
- The mobile `네번째 공식` document component now scales from `0.65` to `0.78` while keeping its wrapper-level 20px subtitle gap unchanged; because the card height remains fixed and `overflow: hidden`, only the enlarged lower portion is clipped.
- The mobile ETF card had been carrying a `translateX(-12px)` visual-balance correction. That offset is now removed so the VOO/QQQM/XLK component sits on the exact gray-card center line rather than a perceptual left-biased center.
- Re-reviewing the ETF code showed the apparent right bias was structural: the stack's visible bounding box is wider on the right because `section-03__etf-item--second` and `--third` both translate positively before rotating. On mobile, that leaves about a `5.27px` visible right shift after scaling, so the stage itself is now positioned `left: -5.3px` to recenter the rendered bundle.
- The mobile `증여 계획부터 시작해요` widget text was clipping because the block was still too tall relative to its available width. The mobile override now scales the whole widget down from `0.8` to `0.72` and expands its width to `calc(100% + 70px)`, giving it 30px more width than the previous `calc(100% + 40px)` state so labels and values have more horizontal room.
- Mobile gray-card height is now `480px` for both `Section 03` and `Section 04` instead of `500px`. No internal graphic rescaling was added for this change, so the lower portions of the post-copy components clip slightly more against the card bottom.
