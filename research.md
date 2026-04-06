# research.md

## System Overview
- Repository: `/Users/hanwha/Documents/GitHub/plus-web-design`
- Verified runtime shape: static Vite multi-entry landing site
- Verified primary page: `/` from [index.html](/Users/hanwha/Documents/GitHub/plus-web-design/index.html)
- Verified alternate pages:
  - `/test2.html`
  - `/test3.html`
- Verified build command: `npm run build`
- Verified verification command: `npm run verify`

현재 저장소는 PI(자산공식) 콘셉트의 애니메이션 중심 정적 랜딩 프로토타입이다. 코드베이스의 실질적인 핵심은 루트 엔트리 파일과 정적 자산이며, 런타임은 브라우저 내 GSAP 타임라인, DOM 측정, 텍스트/숫자 애니메이션, 비디오/이미지 레이어 조합으로 구성된다. 서버 렌더링, 백엔드, ORM, 데이터 저장소는 현재 코드에서 검증되지 않았다. 최근 구조상 가장 중요한 사실은 `test1`, `test2`, `test3`가 이제 JS 초기화 기준으로 분리되어 있으며, 같은 섹션 이름을 공유해도 각 엔트리의 히어로/인터랙션은 서로 다른 코드 경로로 실행된다는 점이다.

## Verified Technical Stack
- Runtime: Node.js
- Package manager: npm
- Build tool: Vite `^8.0.1`
- Core animation: GSAP `^3.14.2`
- Additional animation/runtime dependency: `lottie-web ^5.13.0`
- Verification dependency: `playwright ^1.55.1`
- Language: Vanilla JavaScript with ES modules
- Styling: plain CSS with local font-face declarations
- Deployment:
  - GitHub Pages
  - Vercel

## Verified Build and Artifact Findings

### Source build configuration
- [package.json](/Users/hanwha/Documents/GitHub/plus-web-design/package.json)
  - `dev`: `vite`
  - `build`: `vite build`
  - `preview`: `vite preview`
  - `verify:preview`: `node scripts/verify-preview.mjs`
  - `verify`: `npm run build && npm run verify:preview`
- [vite.config.js](/Users/hanwha/Documents/GitHub/plus-web-design/vite.config.js)
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
- [index.html](/Users/hanwha/Documents/GitHub/plus-web-design/index.html)
  - primary landing page and main production-facing prototype
- [main.js](/Users/hanwha/Documents/GitHub/plus-web-design/main.js)
  - header mount and hero-only scroll timeline for the main page
- [src/initSectionsTest1.js](/Users/hanwha/Documents/GitHub/plus-web-design/src/initSectionsTest1.js)
  - `index.html` 전용 section 01~05 initializer
- [src/initSectionsTest2.js](/Users/hanwha/Documents/GitHub/plus-web-design/src/initSectionsTest2.js)
  - `test2.html` 전용 section 01~05 initializer
- [src/initSectionsTest3.js](/Users/hanwha/Documents/GitHub/plus-web-design/src/initSectionsTest3.js)
  - `test3.html` 전용 section 01~05 initializer
- [style.css](/Users/hanwha/Documents/GitHub/plus-web-design/style.css)
  - main landing styles and all section layouts
- [test2.html](/Users/hanwha/Documents/GitHub/plus-web-design/test2.html), [test2.js](/Users/hanwha/Documents/GitHub/plus-web-design/test2.js), [test2.css](/Users/hanwha/Documents/GitHub/plus-web-design/test2.css)
  - iPhone-scroll experiment
- [test3.html](/Users/hanwha/Documents/GitHub/plus-web-design/test3.html), [test3.js](/Users/hanwha/Documents/GitHub/plus-web-design/test3.js), [test3.css](/Users/hanwha/Documents/GitHub/plus-web-design/test3.css)
  - phone-to-card reveal experiment plus pasted main sections

### Shared component and remnants
- [src/components/Header.js](/Users/hanwha/Documents/GitHub/plus-web-design/src/components/Header.js)
  - actively used by `main.js`
- `src/main.js`, `src/style.css`, `src/counter.js`, `src/assets/*`
  - Vite starter remnants or non-active leftovers
  - not part of the active root-level runtime except for `src/components/Header.js`

### Static assets
- [/Users/hanwha/Documents/GitHub/plus-web-design/public](/Users/hanwha/Documents/GitHub/plus-web-design/public)
  - shipped images, videos, icons, svg assets
- [/Users/hanwha/Documents/GitHub/plus-web-design/font](/Users/hanwha/Documents/GitHub/plus-web-design/font)
  - local font sources

### Deployment config
- [/Users/hanwha/Documents/GitHub/plus-web-design/.github/workflows/deploy-pages.yml](/Users/hanwha/Documents/GitHub/plus-web-design/.github/workflows/deploy-pages.yml)
  - GitHub Pages deployment path

## Main Landing Structure Analysis

### Hero
- fixed header injected through [src/components/Header.js](/Users/hanwha/Documents/GitHub/plus-web-design/src/components/Header.js)
- 5-image gallery assembled and animated in [main.js](/Users/hanwha/Documents/GitHub/plus-web-design/main.js)
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
- key implemented interactions:
  - chart/limit comparison card
  - monthly giving card with animated count
  - “증여한 돈은 바로 투자로” card with:
    - oversized clipped card body
    - dimmed overlay
    - slide-up modal
    - prompt cursor state
    - typed amount sequence `1 -> 19 -> 194 -> 1,940 -> 19,400 -> 194,000`
    - reflected value update on underlying card
  - ETF card cluster and related stacked UI

### Section 04
- multiple gray cards for planning, tax, insight, and looping strips
- includes:
  - stacked card animations
  - insight cards
  - tax amount counter
  - animated strips and cover/reveal effects

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
  - first downward scroll input triggers one-shot gallery transition
  - after gallery completion, page auto-scrolls to `Section 01`
  - upward scroll near `Section 01` top can return to hero first state
- delegates section 01~05 interactions to [src/initSectionsTest1.js](/Users/hanwha/Documents/GitHub/plus-web-design/src/initSectionsTest1.js)
- active visible section order currently skips former Section 02; removed markup is preserved in [section-02-backup.html](/Users/hanwha/Documents/GitHub/plus-web-design/section-02-backup.html)
- footer is test1-only custom/footer variant, not shared with test2/test3

### Entry 2: `test2.html` + `test2.js`
- `index.html` 기반 전체 랜딩 변형
- former Section 02가 복구된 버전
- mounts the shared header
- owns its own hero scroll-scrub flow with dim/text overlays and gallery text
- uses [src/initSectionsTest2.js](/Users/hanwha/Documents/GitHub/plus-web-design/src/initSectionsTest2.js) for its own lower-section interactions
- keeps the older shared/common footer

### Entry 3: `test3.html` + `test3.js`
- phone-to-card reveal experiment
- dim, text, and reveal transitions
- mounts the shared header
- uses [src/initSectionsTest3.js](/Users/hanwha/Documents/GitHub/plus-web-design/src/initSectionsTest3.js) for the pasted main sections below the hero
- active visible section order also skips former Section 02; removed markup is preserved in [section-02-backup.html](/Users/hanwha/Documents/GitHub/plus-web-design/section-02-backup.html)
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
  - motion tuning is concentrated in [main.js](/Users/hanwha/Documents/GitHub/plus-web-design/main.js) and [style.css](/Users/hanwha/Documents/GitHub/plus-web-design/style.css)
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
