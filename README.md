# plus-web-design

## Overview
This repository is a Vite-based static landing prototype for PI.
The current active product surface is a single home page built from:
- [index.html](/Users/chulwan/Documents/GitHub/plus-web-design/index.html)
- [main.js](/Users/chulwan/Documents/GitHub/plus-web-design/main.js)
- [style.css](/Users/chulwan/Documents/GitHub/plus-web-design/style.css)

`test2` and `test3` are no longer part of the active repository structure.

## Active Runtime Files
- [index.html](/Users/chulwan/Documents/GitHub/plus-web-design/index.html)
- [main.js](/Users/chulwan/Documents/GitHub/plus-web-design/main.js)
- [style.css](/Users/chulwan/Documents/GitHub/plus-web-design/style.css)
- [src/components/Header.js](/Users/chulwan/Documents/GitHub/plus-web-design/src/components/Header.js)
- [src/initSectionsTest1.js](/Users/chulwan/Documents/GitHub/plus-web-design/src/initSectionsTest1.js)
- [src/initStoreDownloadModal.js](/Users/chulwan/Documents/GitHub/plus-web-design/src/initStoreDownloadModal.js)
- [public](/Users/chulwan/Documents/GitHub/plus-web-design/public)
- [font](/Users/chulwan/Documents/GitHub/plus-web-design/font)

## Current Home Structure
### Hero
- single active home hero under the fixed header
- one-shot hero transition and automatic move into Section 01
- mobile uses a single hero video with fallback/poster handling
- `public/section-02-hero-video-poster.png` now comes from a clean frame extracted from `section-02-hero-video.mp4`; the previous poster asset itself contained a visible `section-02-hero-video.mp4` label

### Section 01
- title: `아이 자산 어떻게 관리하고 계신가요?`
- desktop/tablet keep floating speech bubbles with hover/drift behavior
- mobile uses `mobileBubbleSlots` in [src/initSectionsTest1.js](/Users/chulwan/Documents/GitHub/plus-web-design/src/initSectionsTest1.js)
- mobile currently hides bubble `2`, `4`, `9`
- latest 390px viewport verification confirmed no overlap among visible mobile bubbles

### Section 01b
- title: `파이가 자산관리의 시작을 도와드릴게요`
- desktop uses a centered phone rail with active-card emphasis
- mobile uses a separate rail order and active-card state
- current mobile rail order:
  - `12 -> 01 -> 02 -> 03 -> 10 -> 07 -> 08 -> 09`
- current mobile active index: `1`
- current mobile start timing:
  - `ScrollTrigger start: top 85%`
  - about `1s` delay before first cycle
  - then continuous cycling

### Section 03 / Section 04 / Section 05
- main product explanation cards, planning/investment/tax visuals, and CTA/footer remain active in the home page
- mobile and tablet rules are maintained inside the same home entry rather than separate page tracks

## Asset Policy
- Runtime assets live in [public](/Users/chulwan/Documents/GitHub/plus-web-design/public)
- Design/reference artifacts live in [design](/Users/chulwan/Documents/GitHub/plus-web-design/design)
- Store icons currently use user-provided PNG assets:
  - `public/ic_store_google.png`
  - `public/ic_store_apple.png`
- Store buttons now use the same frame size while preserving each PNG's original aspect ratio
- The header no longer exposes legacy test tabs; home is the only active top-level route
- Unused runtime assets left over from removed `test2` / `test3` tracks have been deleted from `public/`

## Commands
- dev: `npm run dev`
- build: `npm run build`
- preview: `npm run preview -- --host 127.0.0.1`
- verify: `npm run verify`

## Verification
`npm run verify` currently checks only the home route:
- `/`

## Deployment Notes
- GitHub Pages remains the publish path via `.github/workflows/deploy-pages.yml`
- A root [vercel.json](/Users/chulwan/Documents/GitHub/plus-web-design/vercel.json) now pins Vercel to `npm run build` + `dist`
- The same `vercel.json` is copied into `dist/` during build so `gh-pages` branch deployments can skip via `ignoreCommand` instead of trying to run `vite build`

## Known Warning
- `lottie-web` still emits a build warning related to direct `eval`
- the single home bundle also triggers Vite's `500 kB` chunk-size warning after the repo was reduced to one active entry
- current status: known third-party warning, build still succeeds
- current decision: keep documented, do not replace unless it becomes a deployment blocker
