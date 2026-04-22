# plan.md

## Planning Basis
- The repository now maintains a single active home entry.
- Scope to keep current and verified:
  - [index.html](/Users/chulwan/Documents/GitHub/plus-web-design/index.html)
  - [main.js](/Users/chulwan/Documents/GitHub/plus-web-design/main.js)
  - [style.css](/Users/chulwan/Documents/GitHub/plus-web-design/style.css)
  - [src/components/Header.js](/Users/chulwan/Documents/GitHub/plus-web-design/src/components/Header.js)
  - [src/initSectionsTest1.js](/Users/chulwan/Documents/GitHub/plus-web-design/src/initSectionsTest1.js)
  - [src/initStoreDownloadModal.js](/Users/chulwan/Documents/GitHub/plus-web-design/src/initStoreDownloadModal.js)

## Current Completed Cleanup
- reduced the repository from multi-entry to home-only structure
- removed `test2` / `test3` runtime tracks from the active product surface
- simplified Vite build input to the home page only
- simplified preview verification to `/` only
- kept mobile/tablet/desktop behavior inside the single home entry
- moved runtime assets to `public/` as the active asset boundary
- switched store icons to user-provided PNG assets
- removed the now-redundant home/test tab UI from the shared header
- deleted leftover public assets that were no longer referenced after removing `test2` / `test3`
- aligned the desktop header container with the same horizontal gutter used by tablet and section containers
- hardened the mobile hero video attach/reveal order to reduce brief native file-name placeholder flashes
- replaced `public/section-02-hero-video-poster.png` with a clean frame extracted from `section-02-hero-video.mp4` after confirming the old poster asset itself contained the stray `section-02-hero-video.mp4` text
- added Vercel project configuration in-repo and copied it into `dist/` so `gh-pages` preview builds can be ignored instead of failing on missing Vite tooling
- finalized mobile `Section 01` bubble baseline with no visible overlap at 390px width
- documented current mobile `Section 01b` rail behavior

## Current Verified Behavior Notes
- mobile `Section 01` uses fixed bubble slots and hidden bubble subset (`2`, `4`, `9`)
- mobile `Section 01b` starts around `1s` after `top 85%` trigger and then keeps cycling
- `lottie-web` warning remains documented and intentionally deferred
- hero poster filename flash root cause is now resolved at the asset level, not through additional runtime logic
- home-only build currently also emits a chunk-size warning because the runtime is now bundled into one main entry

## Remaining Focus
- keep the home page visually stable across desktop/tablet/mobile
- continue asset-path consistency cleanup (`/public`-style runtime references)
- remove any remaining stale docs or references that imply multi-entry operation

## Todo List
- `[x]` Reduce repo to home-only active runtime
- `[x]` Keep docs aligned with home-only structure
- `[x]` Verify mobile Section 01 bubble baseline
- `[x]` Verify mobile Section 01b runtime behavior
- `[x]` Remove obsolete header tab UI and home-unused public assets
- `[ ]` Final visual QA before release commit/push
- `[ ]` Push and verify deploy after final QA
- Added a `header__download` button to `src/components/Header.js` and, under `@media (max-width: 1100px)`, switched the header from store-button pair to the single `앱 다운로드` button so tablet matches the CTA behavior.
- Fixed copy spacing around `mobile-only-break` in CTA/help cards so desktop/tablet text no longer concatenates when the line break is hidden.
- Switched tablet (`768px ~ 1100px`) CTA to the single `앱 다운로드` button and swapped the footer to the mobile footer layout while keeping desktop footer untouched above 1100px.
- Standardized tablet horizontal gutters to `20px` across sections by moving tablet layout to section-level side padding and `width: 100%` inner containers.
- Fixed the tablet header gutter specifically by adding `padding: 0 20px` back to `.header__inner`, so the nav matches the section gutters at `768px ~ 1100px`.
- Fixed the `유기정기금 증여하고 장기 투자` title spacing by adding a literal space before the conditional mobile line break.
- Changed the `생애 필수 증여+투자 패키지 이용방법` card title to use a mobile-only line break so desktop renders it on one line.
- Fixed the `증여재산공제에 맞춰 10년 주기로 계획` title spacing by adding a literal space before the conditional mobile line break.
- Fixed the `장기 투자에 적합한 선택, 미국 ETF` title spacing by adding a literal space before the conditional mobile line break.
