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
  - [src/initSharedSections.js](/Users/hanwha/Documents/GitHub/plus-web-design/src/initSharedSections.js)
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
- Preserve the currently implemented landing behavior while reducing drift and runtime fragility.

#### Active scope
- Hero gallery sequencing
- Section 01 floating bubble field
- Section 01b centered phone/card strip
- Section 02 chart/video/stacked-card interactions
- Section 03 chart, counter, and invest-modal flows
- Section 04 functional card animations

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
- Main hero-specific motion remains in [main.js](/Users/hanwha/Documents/GitHub/plus-web-design/main.js)
- Section 01~05 interactions are centralized in [src/initSharedSections.js](/Users/hanwha/Documents/GitHub/plus-web-design/src/initSharedSections.js)
- `test3.js` should reuse the same initializer when it embeds the main sections

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
- Reuse shared section animation initialization instead of duplicating section logic between entries
- Re-verify after any shared CSS or asset change
- Current note:
  - `test2.html` is now a full landing-page variant with Section 02 restored
  - legacy `test2.js` and `test2.css` are currently inactive remnants

## Current Verified Implementations

### Section 01b phone/card strip
- Gray full-height section
- Center-fixed white stroke frame
- Multi-card lateral loop with active center emphasis
- Side cards clipped by section bounds

### Section 02 chart block
- Orange comparison graph animation
- Dashed guide line to `수익 α`
- `2천만 원 / 미성년`, `5천만 원 / 성년` grouped labels
- Left and right video blocks populated

### Section 03 invest modal flow
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

## Todo List
- `[x]` Refresh core operating docs to reflect current code reality
- `[x]` Keep build/verify commands documented and working
- `[ ]` Continue section-level runtime maintenance with artifact-first verification
- `[ ]` Reduce source-of-truth ambiguity between root entry files and `src/` remnants when safe
