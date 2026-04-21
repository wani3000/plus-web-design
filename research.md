# research.md

## System Overview
- Repository: `/Users/chulwan/Documents/GitHub/plus-web-design`
- Verified runtime shape: Vite static landing site
- Verified active page: `/` from [index.html](/Users/chulwan/Documents/GitHub/plus-web-design/index.html)
- No verified backend, database, ORM, or repository-owned API runtime

## Verified Active Runtime
- [index.html](/Users/chulwan/Documents/GitHub/plus-web-design/index.html)
- [main.js](/Users/chulwan/Documents/GitHub/plus-web-design/main.js)
- [style.css](/Users/chulwan/Documents/GitHub/plus-web-design/style.css)
- [src/components/Header.js](/Users/chulwan/Documents/GitHub/plus-web-design/src/components/Header.js)
- [src/initSectionsTest1.js](/Users/chulwan/Documents/GitHub/plus-web-design/src/initSectionsTest1.js)
- [src/initStoreDownloadModal.js](/Users/chulwan/Documents/GitHub/plus-web-design/src/initStoreDownloadModal.js)

## Verified Runtime Assets
- Runtime assets are served from [public](/Users/chulwan/Documents/GitHub/plus-web-design/public)
- Fonts are loaded from [font](/Users/chulwan/Documents/GitHub/plus-web-design/font)
- User-provided store icons currently in use:
  - `public/ic_store_google.png`
  - `public/ic_store_apple.png`
- Legacy store SVGs are no longer part of the active runtime path
- Legacy home-tab UI has been removed from the header component
- Unused public assets previously tied to removed `test2` / `test3` runtime paths have been deleted after home-only reference verification
- Desktop and tablet now share the same `40px` total horizontal header gutter via `.header__inner`
- Mobile hero video now mounts hidden before source hydration and reveal, reducing the chance of a native file-name placeholder flash during first paint

## Verified Section Findings
### Section 01
- mobile bubble layout is controlled in [src/initSectionsTest1.js](/Users/chulwan/Documents/GitHub/plus-web-design/src/initSectionsTest1.js) via `mobileBubbleSlots`
- mobile currently hides bubbles `2`, `4`, `9`
- latest 390px-wide viewport verification showed no overlap among visible rendered bubbles

### Section 01b
- desktop rail logic lives in [src/initSectionsTest1.js](/Users/chulwan/Documents/GitHub/plus-web-design/src/initSectionsTest1.js)
- mobile rail boot logic lives in [main.js](/Users/chulwan/Documents/GitHub/plus-web-design/main.js)
- current mobile order:
  - `12 -> 01 -> 02 -> 03 -> 10 -> 07 -> 08 -> 09`
- current mobile active index: `1`
- current mobile timing:
  - `ScrollTrigger start: top 85%`
  - about `1s` delayed start
  - continuous cycle after start

## Verified Build Status
- `npm run build` succeeds
- `npm run verify` succeeds
- active verification route: `/`
- Vercel project `plus-web-design` now explicitly stores:
  - `buildCommand: npm run build`
  - `outputDirectory: dist`
- Root [vercel.json](/Users/chulwan/Documents/GitHub/plus-web-design/vercel.json) also defines `ignoreCommand` to cancel `gh-pages` preview deployments before Vercel attempts a Vite build

## Known Warning Decision
- `lottie-web` emits a direct `eval` build warning
- the home-only build now also emits a chunk-size warning because the runtime is bundled into a single main entry chunk above `500 kB`
- this is currently a third-party warning, not a failing repository runtime issue
- current recommendation: keep both warnings documented and defer structural optimization unless deployment or runtime performance becomes blocked
