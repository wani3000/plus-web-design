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
- test1 회색 카드 8장의 `텍스트 선행 -> 내부 애니메이션 후행` staging 유지
- test1 회색 카드 8장의 더 늦은 공통 트리거(`top 68%`) 유지

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
- Header PI logo now reloads the landing top on root pages
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
- 테스트1의 Section 03 네 카드는 모두 제목/chip이 먼저, 설명문이 그 다음 등장하고 나서 내부 애니메이션이 시작되도록 정리된 상태다
- 테스트1의 `증여세 신고는 필수!` 카드는 제목/chip/설명문은 유지하고, 내부 흰색 면에는 Pencil `1uy7r` 기반 신고 서류 안내 카드가 직접 구현되어 있다
- 같은 카드의 애니메이션은 현재 흰색 면과 내부 제목이 먼저 함께 올라오고, 이어서 `통장 거래내역서`, `증여금 평가 명세서` 항목이 순차적으로 슬라이드업하는 방식이다

### Section 04 plan widget
- 테스트1의 `증여 계획부터 시작해요` 카드 plan widget은 현재 초기 `증여세 신고 금액 / 5,000,000원`, `신고해야 할 금액 / 5,000,000원` 카운트 애니메이션 후 약 `2초` 뒤 시작되는 `2.5초` 동안 primary 금액만 `20,000,000원`으로 확장되고, 진한 주황 progress fill이 동시에 끝까지 차오른다. 이후 `5초`간 정지하고 위젯이 사라진 뒤, 0 상태 위젯이 아래에서 다시 올라오며 같은 시퀀스를 반복한다.
- 테스트1의 `증여세 신고는 필수!` 카드 내부 흰색 면은 현재 체크리스트 상태와 완료 상태 두 화면으로 나뉜다. 체크리스트는 흰색 면과 제목이 먼저 올라오고, 문서 항목 두 개가 순차적으로 올라온 뒤 `2초` 유지된다. 그 후 체크리스트는 사라지고 Pencil `mEPLU` 기반 `신고 접수 완료` 완료 카드가 아래에서 다시 올라온다. 완료 카드에서는 체크 아이콘이 먼저, 그 다음 타이틀, 마지막으로 본문이 순차적으로 올라오며 본문 색은 `#555558`이다. 완료 상태는 `5초` 유지된 뒤 흰색 면 전체가 아래로 사라지고, 초기 상태로 리셋된 흰색 면이 다시 아래에서 올라오며 같은 시퀀스를 반복한다.
- 테스트1의 `장기 투자에 적합한 선택, 미국 ETF` 카드 3장은 현재 다시 one-shot 상태로 돌아가, 위에서 한 번 떨어져 착지한 뒤 그대로 유지된다. 카드 표시는 현재 `VOO / QQQM / XLK` 순서이며, ETF 로고는 `public/ic_logo_etf.png`를 사용한다. 우측 총액/수익/수익률은 현재 표시된 `5.00%` 상태를 기준점으로 삼아 `5초`마다 `+1.5%`씩 올라가며, 최대 `12.00%`까지만 진행한다.
- 모든 Google Play / App Store 버튼은 현재 공통 QR 팝업을 연다. 팝업은 dimmed 배경, 앱 이름 `파이`, 스토어별 QR 코드, 그리고 `public/ic_close_24.png` 닫기 아이콘을 사용한다. 닫을 때는 패널 transform을 제거해서 흔들림을 없앴다.
- 팝업 동작은 `src/initStoreDownloadModal.js`에서 전역으로 바인딩되어 있어 test1/test2/test3의 모든 스토어 버튼에 동일하게 적용된다.
- 팝업 닫힘 시 원래 트리거로 포커스를 돌리되 `preventScroll: true`를 사용해 스크롤 흔들림을 막는다.

## Outstanding Maintenance Concerns
- test1의 회색 카드 8장은 텍스트 reveal과 내부 모션 trigger가 분리되어 있으므로, 이후 개별 카드 타이밍을 만질 때는 텍스트 인트로와 내부 모션 시작 시점을 함께 점검해야 한다.
- test1의 회색 카드 8장은 현재 조기 시작을 막기 위해 공통 `top 68%` trigger를 쓴다. 이후 타이밍을 당기거나 늦출 때는 카드별 개별 값보다 공통 기준을 먼저 검토해야 한다.
- Animation constants remain highly manual and section-specific
- Root docs and code reality can drift quickly after UI iteration bursts
- `src/` starter remnants still create source-of-truth ambiguity
- Local `.pen` file is modified independently from web runtime and should stay intentionally managed
- test1의 Section 04는 일부 보조 컴포넌트를 제거해 더 단순한 카드 구조가 되었으므로, 향후 동일 섹션 변경 시 test2/test3와 혼동하지 않도록 주의가 필요하다
- test1의 `다자녀 자산관리 카드`는 카드 밖 overflow를 다시 막아, 카드와 배지가 회색 카드 내부에서만 보이도록 유지한다.
- 현재 다자녀 자산관리 카드 본체는 카드 상단 `45px` 아래, 기존 축보다 오른쪽 `110px` 이동한 위치에 정착하고, 배지 3개는 기존 위치를 유지한다.
- 현재는 `Section 04` wide-bottom 카드가 뷰포트에 들어오면, 다자녀 카드 본체와 배지 3개가 각각 아래에서 위로 등장한다.
- 배지 3개는 카드 내 최상위 레이어로 유지한다.
- 배지 3개는 현재 카드 등장 후 후속 애니메이션으로 펼쳐지므로, 배지 간 상대 위치를 추가 조정할 때는 initSectionsTest1.js의 badge spread 값도 같이 수정해야 한다.
- 현재 배지 펼침 시작 지점은 카드 등장 후 `0.65초` 지연이며, 초기 folded `김첫째` 상태는 `4초` 유지된다.
- 하늘색 `김첫째` 배지는 Pencil `oFssN` selected 스타일을 CSS pseudo-element로 재현하므로, 이후 배지 size를 바꾸면 stroke/shadow 비율도 함께 보정해야 한다.
- 하늘색 `김첫째` 배지의 outer stroke는 mask 기반 ring이므로, 이후 브라우저 호환성 이슈가 보이면 gradient border 대체 구현을 다시 검토해야 한다.
- 배지 3개는 겹침 시 z-index로 레이어 순서를 고정하므로, 이후 DOM 순서를 바꾸지 말고 각 배지 modifier의 z-index를 조정해 순서를 바꿔야 한다.
- selected 배지 스타일은 이제 blue에 고정된 CSS가 아니라 `section-04__family-app-badge--selected` 상태 클래스로 관리한다.
- 배지 selected 전환과 상단 이미지 전환은 같은 타임라인 시점에 묶여 있으므로, 둘 중 하나의 타이밍을 바꾸면 함께 조정해야 한다.
- 현재 test1의 배지/이미지 전환은 `김첫째(7,500,000원) folded 4초 정지 → spread → 김둘째(5,000,000원) selected → folded 4초 정지 → spread → 김첫째 selected` 흐름으로 반복된다.
- 현재 다자녀 카드 상단 이미지는 선택 자녀에 맞춰 `bg_image_02`와 `bg_image_01` 사이를 전환한다.
- test1의 `증여금을 투자로 연결해요` 카드는 test2 `Section 02`에서 쓰던 낙하 박스 스택을 그대로 이식했으므로, 이후 이 카드 레이아웃 수정 시 `section-04__gift-link-visual` 높이(326px)와 test1 전용 drop physics helper가 동시에 깨지지 않는지 확인해야 한다. 현재 test1 이식본은 `repeat: false`로 1회만 재생되고, exit phase 없이 착지 상태를 유지한다. 박스 규격은 `120x120`, 내부 아이콘은 `69x69`이다.
- 같은 카드는 현재 3박스 구성만 남아 있고, 전면 정적 박스는 제거된 상태다.
- 현재는 Pencil 배치 미세조정으로 뒤쪽 빨강/초록 박스를 비대칭으로 올린 상태다. 빨강 박스는 기존 기준보다 `40px`, 초록 박스는 `120px` 위에 있다.
- 초록 박스는 추가 미세조정으로 현재 위치에서 `5px` 더 오른쪽으로 이동한 상태다.
- test1 이식본의 낙하 순서는 현재 `흰 -> 빨강 -> 초록`이다. 순서를 다시 바꿀 때는 `initDroppingLogoStack(..., { order })` 분기를 test2 원본과 섞지 않도록 주의해야 한다.
- 현재 3박스 스택은 카드 시각 중심에 맞게 전체적으로 왼쪽으로 재배치되어 있다.
- test1의 `쉬운 자녀관리` 카드에는 Figma `222:695`를 축약한 모바일 관리 UI가 들어가므로, 이후 이 카드 수정 시 텍스트 하단 정렬과 카드 내부 컴포넌트 레이어를 함께 점검해야 한다
- 같은 카드의 하단 카피는 현재 gradient overlay 없이 직접 노출된다.
- 같은 카드의 상단 `375x324` 영역은 별도 배경 이미지로 분리되어 있으므로, 이후 모바일 UI 원본 이미지를 교체할 때 본문 시작점(300px)과 카드 내 겹침 시작점(300px)이 유지되는지 함께 점검해야 한다
- 같은 카드 시트 안에는 Pencil `Rz6CN` 기반 신고 금액 요약 컴포넌트가 제목 아래 `24px` 간격으로 포함되어 있으므로, 이후 카드 높이나 패딩을 바꿀 때 요약 컴포넌트의 폭(335px)과 progress bar 폭(295px)도 함께 점검해야 한다.
- 같은 카드의 신고 금액 요약은 선택 배지 상태와 연동되므로, 이후 배지 선택 시퀀스나 이름/순서를 바꾸면 초기값(`5,000,000원`)과 선택 후 값(`7,400,000원`)도 함께 조정해야 한다.
- `김둘째` 선택 전환 시에는 카드 시트 제목과 요약 카드에 슬라이드업 재노출 애니메이션이 붙어 있으므로, 해당 타이밍을 바꾸면 텍스트/요약 카드 모션도 같이 조정해야 한다.
- 같은 카드 상단에는 80x80 크기의 Pencil `KfAFw`, `YXDXl`, `BGdYD` 기반 배지가 있으며 `KfAFw`는 `public/ic24_pencil2.png` 아이콘을 사용하므로, 상단 이미지 영역 수정 시 아이콘 비율과 배지 위치도 함께 점검해야 한다. 현재 카드와 배지는 함께 약 10% 위로 이동한 상태에서 크게 포개지는 구성이다
- 같은 카드의 상단 topbar는 제거된 상태이므로, 이후 상단 아이콘/브랜딩 복구 요청이 있으면 현재 분리 구조(top image + body image) 기준으로만 다시 얹어야 한다

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
- Converted test1 hero to a 1.3s one-shot gallery transition
- Added 1.3s auto-scroll from test1 hero gallery into Section 01
- Added reverse path from Section 01 top back to hero first state
- Fixed Section 01B initial card ordering so test1 always starts with `img_mockup_01.png` in the center slot
- Replaced test1 footer with dedicated Figma-based variant while keeping test2/test3 footer unchanged
- Replaced the hero right-bottom card with `section-02-left-video.mp4`
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


- Hero center image now uses `img_main_website.png`.


- Hero left-top card now uses `section-02-hero-video.mp4`.


- Hero left-bottom card now uses `bg_02_baby.png`.

- Hero center and left-top media are now swapped so the center card uses `section-02-hero-video.mp4` and the left-top card uses `img_main_website.png`.

- Hero main video uses a two-layer crossfade loop to reduce the visual jump at replay.

- Hero right-top card now uses `baby_03.png`.

- PI logo click now forces the landing back to the hero top before refreshing, with browser scroll restoration disabled for that path.

- Hero left-top card now uses `bg_image_04.png`.

- Hero main video now uses a generated `section-02-hero-video-poster.png` poster to reduce black flash on reload.

- Hero image hover zoom was removed so the gallery no longer scales up on pointer hover.

- The `쉬운 자녀관리` badge selection now holds each selected state for 3 seconds instead of 4.

- The hero main video now preloads `section-02-hero-video-poster.png` and uses it as a background fallback to reduce the black flash on reload.

- The hero main video fallback now uses the provided first-frame screenshot as the visible placeholder until playback is ready.
