# plan.md

## Planning Basis
- This plan reflects the current verified repository reality, not the original setup-only phase.
- The project is a static Vite landing prototype with active UI/animation implementation already in progress.
- There is still no verified backend, API, DB, or ORM layer.
- Current planning focus is documentation alignment, runtime verification, and controlled maintenance of the implemented landing interactions.

## Current Reality Snapshot
- Active source of truth:
  - [index.html](/Users/hanwha/Documents/GitHub/plus-web-design/index.html)
  - [main.js](/Users/hanwha/Documents/GitHub/plus-web-design/main.js)
  - [src/initSectionsTest1.js](/Users/hanwha/Documents/GitHub/plus-web-design/src/initSectionsTest1.js)
  - [src/initSectionsTest2.js](/Users/hanwha/Documents/GitHub/plus-web-design/src/initSectionsTest2.js)
  - [src/initSectionsTest3.js](/Users/hanwha/Documents/GitHub/plus-web-design/src/initSectionsTest3.js)
  - [style.css](/Users/hanwha/Documents/GitHub/plus-web-design/style.css)
  - [test2.html](/Users/hanwha/Documents/GitHub/plus-web-design/test2.html)
  - [test2.js](/Users/hanwha/Documents/GitHub/plus-web-design/test2.js)
  - [test2.css](/Users/hanwha/Documents/GitHub/plus-web-design/test2.css)
  - [test3.html](/Users/hanwha/Documents/GitHub/plus-web-design/test3.html)
  - [test3.js](/Users/hanwha/Documents/GitHub/plus-web-design/test3.js)
  - [test3.css](/Users/hanwha/Documents/GitHub/plus-web-design/test3.css)
- Verified checks:
  - `npm run build`
  - `npm run verify`
- Active deployment targets:
  - GitHub Pages
  - Vercel

## Current Branching Rule
- `test1`, `test2`, `test3` are now treated as separate entry tracks.
- Future changes must explicitly state whether they target:
  - test1 only
  - test2 only
  - test3 only
  - or shared CSS/asset layers
- Current user direction is to default to **test1-only** changes unless explicitly told otherwise.

## Current Workstreams

### Workstream A: Documentation Alignment

#### Goal
- Keep repository docs aligned with current code reality.

#### Files
- [README.md](/Users/hanwha/Documents/GitHub/plus-web-design/README.md)
- [research.md](/Users/hanwha/Documents/GitHub/plus-web-design/research.md)
- [plan.md](/Users/hanwha/Documents/GitHub/plus-web-design/plan.md)

#### Strategy
- Remove stale claims from the initial setup phase.
- Document the current UI-heavy implementation honestly.
- Avoid inventing Jira or approval states that are no longer reflected in the code.

#### Quality Bar
- Functional correctness:
  - docs match current file structure, build commands, and runtime shape
- Code quality:
  - clear boundaries between verified facts and absent layers
- Edge cases:
  - explicitly call out what does not exist instead of implying future architecture

### Workstream B: Main Landing Runtime Maintenance

#### Goal
- Preserve the currently implemented test1 landing behavior while reducing drift and runtime fragility.

#### Active scope
- Hero one-shot gallery sequencing
- Section 01 floating bubble field
- Section 01b centered phone/card strip
- Section 03 chart, counter, and invest-modal flows
- Section 04 functional card animations
- test1-only footer

#### Verified constraints
- UI is already heavily implemented; future changes require careful visual verification
- Main runtime is concentrated in [main.js](/Users/hanwha/Documents/GitHub/plus-web-design/main.js) and [style.css](/Users/hanwha/Documents/GitHub/plus-web-design/style.css)
- Regressions are more likely from timing and layout coordination than from business logic

#### Preferred workflow
```text
identify target section
inspect current DOM/CSS/runtime values
change one animation or layout cluster at a time
run npm run build
verify rendered behavior in preview/browser
log the result
```

#### Current implementation note
- Main hero-specific motion for test1 remains in [main.js](/Users/hanwha/Documents/GitHub/plus-web-design/main.js)
- test1 hero is now one-shot, not scrub
- after gallery transition, test1 auto-scrolls to Section 01
- Section 01~05 interactions are now separated per entry in [src/initSectionsTest1.js](/Users/hanwha/Documents/GitHub/plus-web-design/src/initSectionsTest1.js), [src/initSectionsTest2.js](/Users/hanwha/Documents/GitHub/plus-web-design/src/initSectionsTest2.js), and [src/initSectionsTest3.js](/Users/hanwha/Documents/GitHub/plus-web-design/src/initSectionsTest3.js)
- test1/test2/test3 should not share a single section initializer

### Workstream C: Secondary Entry Stability

#### Goal
- Keep `test2` and `test3` buildable and visually intact while the main landing evolves.

#### Files
- [test2.html](/Users/hanwha/Documents/GitHub/plus-web-design/test2.html)
- [test2.js](/Users/hanwha/Documents/GitHub/plus-web-design/test2.js)
- [test2.css](/Users/hanwha/Documents/GitHub/plus-web-design/test2.css)
- [test3.html](/Users/hanwha/Documents/GitHub/plus-web-design/test3.html)
- [test3.js](/Users/hanwha/Documents/GitHub/plus-web-design/test3.js)
- [test3.css](/Users/hanwha/Documents/GitHub/plus-web-design/test3.css)

#### Strategy
- Keep them on the same dependency model as the main build
- Keep section animation initialization entry-specific so test1/test2/test3 do not affect each other at runtime
- Re-verify after any shared CSS or asset change
- Current note:
  - `test2.html` is a full landing-page variant with Section 02 restored and the older scrub hero
  - `test3.html` remains the phone-to-card reveal experiment
  - `test2.css` remains inactive unless explicitly reused

## Current Verified Implementations

### Section 01b phone/card strip
- Gray full-height section
- Center-fixed white stroke frame
- Multi-card lateral loop with active center emphasis
- Side cards clipped by section bounds
- 현재 엔트리별 initializer에서 시작 트리거는 `top bottom`

### Section 02 chart block
- Orange comparison graph animation
- Dashed guide line to `수익 α`
- `2천만 원 / 미성년`, `5천만 원 / 성년` grouped labels
- Left and right video blocks populated

### Section 03 invest modal flow
- 테스트1 최신 카드 카피는 Section 03 네 장 모두 재정리된 상태다:
  - `증여재산공제에 맞춰 10년 주기로 계획`
  - `유기정기금 증여하고 장기 투자`
  - `장기 투자에 적합한 선택, 미국 ETF`
  - `증여세 신고는 필수!`
- 테스트1에서는 ETF 묶음과 투자 입력 모달 컴포넌트의 위치/애니메이션 바인딩도 서로 교체된 상태다
- Underlying tall clipped invest card
- Dim + slide-up sheet
- Prompt cursor state
- Typed amount sequence:
  - `1`
  - `19`
  - `194`
  - `1,940`
  - `19,400`
  - `194,000`
- Underlying values update after typing:
  - `월 194,000원`
  - `예상 총 증여 금액 23,280,000원`

## Outstanding Maintenance Concerns
- Animation constants remain highly manual and section-specific
- Root docs and code reality can drift quickly after UI iteration bursts
- `src/` starter remnants still create source-of-truth ambiguity
- Local `.pen` file is modified independently from web runtime and should stay intentionally managed
- test1의 Section 04는 일부 보조 컴포넌트를 제거해 더 단순한 카드 구조가 되었으므로, 향후 동일 섹션 변경 시 test2/test3와 혼동하지 않도록 주의가 필요하다

## Iteration Log

### Iteration 1
- Established initial governance docs and verification scripts
- Added repeatable `npm run verify` workflow
- Verified static multi-entry runtime shape
- Quality status:
  - functional correctness: satisfied
  - code quality: satisfied
  - edge cases: satisfied

### Iteration 2
- Main landing moved beyond initial setup into active UI/animation implementation
- Section 01b, Section 02, and Section 03 interaction work materially expanded
- Earlier docs became stale against actual repository reality
- Quality status:
  - functional correctness: docs stale
  - code quality: needs refresh
  - edge cases: partial

### Iteration 3
- Refreshed `README.md`, `research.md`, and `plan.md` to match current repository state
- Removed outdated “UI locked/pending only” framing from current-state docs
- Kept conclusions limited to verified code, build output, and deployment reality
- Quality status:
  - functional correctness: satisfied
  - code quality: satisfied
  - edge cases: satisfied

### Iteration 4
- Backed up former Section 02 markup into `section-02-backup.html`
- Removed Section 02 from `index.html` and `test3.html`
- Re-verified build output after visible landing flow reduction
- Quality status:
  - functional correctness: satisfied
  - code quality: satisfied
  - edge cases: satisfied

### Iteration 5
- Split section initializers by entry:
  - `src/initSectionsTest1.js`
  - `src/initSectionsTest2.js`
  - `src/initSectionsTest3.js`
- Removed old shared initializer
- Reconnected `test2` and `test3` to their own runtime paths
- Verified that test1/test2/test3 no longer share one section-initialization JS path
- Quality status:
  - functional correctness: satisfied
  - code quality: improved
  - edge cases: shared CSS still requires care

### Iteration 6
- Converted test1 hero to one-shot gallery transition
- Added auto-scroll from test1 hero gallery into Section 01
- Added reverse path from Section 01 top back to hero first state
- Fixed Section 01B initial card ordering so test1 always starts with `img_mockup_01.png` in the center slot
- Replaced test1 footer with dedicated Figma-based variant while keeping test2/test3 footer unchanged
- Quality status:
  - functional correctness: satisfied by build verification
  - code quality: improved, but shared CSS remains a multi-entry risk
  - edge cases: runtime branch split documented

## Todo List
- `[x]` Refresh core operating docs to reflect current code reality
- `[x]` Keep build/verify commands documented and working
- `[x]` Split test1/test2/test3 section initializers
- `[x]` Document test1/test2/test3 branch ownership
- `[ ]` Continue section-level runtime maintenance with artifact-first verification
- `[ ]` Reduce source-of-truth ambiguity between root entry files and `src/` remnants when safe
