# research.md

## System Overview
- Repository: `/Users/hanwha/Documents/GitHub/plus-web-design`
- Git remote: `https://github.com/wani3000/plus-web-design.git`
- Verified runtime: static Vite web project
- Verified build command: `npm run build`
- Verified preview command: `npm run preview -- --host 127.0.0.1`
- Verified preview responses:
  - `/` -> `200 OK`
  - `/test2.html` -> `200 OK`
  - `/test3.html` -> `200 OK`

This codebase is a static landing-page prototype for the Korean fintech concept "PI (자산공식)". It implements three separate scroll-animation experiments rather than one integrated application. The project currently behaves as a multi-entry static site, built with Vite and deployed to GitHub Pages. The dominant system behavior is client-side animation orchestration through GSAP and DOM manipulation. There is no verified backend, persistence layer, or internal API contract in this repository.

## Verified Technical Stack
- Runtime: Node.js `v22.15.0`
- Package manager: npm `10.9.2`
- Build tool: Vite `^8.0.1`
- Dependency: GSAP `^3.14.2`
- Language: Vanilla JavaScript, ES modules
- Styling: plain CSS with local font-face declarations
- Deployment: GitHub Pages via `.github/workflows/deploy-pages.yml`

## Build and Artifact Findings

### Source build configuration
- `package.json`
  - `dev`: `vite`
  - `build`: `vite build`
  - `preview`: `vite preview`
- `vite.config.js`
  - `base` is driven by `process.env.BASE_PATH || '/'`
  - multi-entry build inputs:
    - `index.html`
    - `test2.html`
    - `test3.html`

### Verified build result
- `npm run build` completed successfully.
- Generated HTML:
  - `dist/index.html`
  - `dist/test2.html`
  - `dist/test3.html`
- Generated bundled assets include:
  - `dist/assets/main-*.js`
  - `dist/assets/test2-*.js`
  - `dist/assets/test3-*.js`
  - `dist/assets/style-*.css`
  - local fonts copied into `dist/assets/`
- Static assets from `public/` are copied to `dist/` root.

### Preview verification
- `npm run preview -- --host 127.0.0.1` served the built output successfully.
- `curl -I` confirmed that the three entry pages respond with HTTP 200.

## Directory and Module Analysis

### Root-level active app files
- `index.html`
  - Primary landing experiment.
  - Contains the hero/gallery markup and two lower sections with investment/gifting themed content.
- `main.js`
  - Active script for `index.html`.
  - Imports `./style.css`, GSAP, `ScrollTrigger`, and `Header()` from `src/components/Header.js`.
  - Removes any `#app` node if present.
  - Injects a fixed header and tab nav into `document.body`.
  - Builds scroll-linked timelines and intersection-based animations.
- `style.css`
  - Shared base stylesheet plus `index.html` styling.
  - Defines local font-face entries for Pretendard and LIFEPLUS.
  - Styles the fixed header, nav tabs, hero section, and later content blocks.
- `test2.html`
  - Alternate landing experiment built around a simulated iPhone frame over video.
  - Includes shared `style.css` plus `test2.css`.
  - Now relies on Vite-managed module loading for GSAP.
- `test2.js`
  - Drives scroll pinning, in-phone content movement, fade-ins, and 3D tilt.
  - Imports `gsap` and `ScrollTrigger` directly.
- `test2.css`
  - Test 2-specific visual styling, including phone mockup, video backdrop, and next section.
- `test3.html`
  - Alternate landing experiment based on phone-to-card reveal.
  - Includes shared `style.css` plus `test3.css`.
  - Now relies on Vite-managed module loading for GSAP.
- `test3.js`
  - Drives dynamic phone dimensions, pinning, reveal timing, overlay darkening, and text entry.
  - Imports `gsap` and `ScrollTrigger` directly.
- `test3.css`
  - Test 3-specific styles for the hero, reveal layers, cards, and follow-up section.
- `color-tokens.css`
  - Shared color token definitions referenced by multiple stylesheets.
- `font/`
  - Local font source directory. Fonts are copied into `dist/assets/` during build.
- `public/`
  - Static images, video, favicon, and icon sheet.

### `src/` analysis
- `src/components/Header.js`
  - The only verified actively used file inside `src/`.
  - Returns a `DocumentFragment` containing the fixed header and tab navigation.
  - `main.js` inserts this fragment before all body content.
- `src/main.js`, `src/style.css`, `src/counter.js`, `src/assets/*`
  - These are Vite starter or partial experiment remnants.
  - They are not part of the active root-level multi-entry flow, except for `src/components/Header.js`.
  - They still matter as maintenance debt because they can mislead future agents.

### Other repository files
- `.github/workflows/deploy-pages.yml`
  - Runs on push to `main`.
  - Uses Node 20, `npm ci`, `npm run build`, and `peaceiris/actions-gh-pages`.
  - Sets `BASE_PATH=/plus-web-design/` during build.
- `untitled.pen`
  - Design artifact containing copy and layout data for the product concept.
  - Not part of the verified web runtime.
- `.agents/rules/claude.md`
  - Present but effectively empty.

## Existing Layer Structure

### UI layer
- Root HTML templates
- CSS files
- Static media under `public/`
- Shared header component

### Business logic layer
- Minimal client-side orchestration only:
  - scroll timelines
  - DOM querying
  - runtime measurement
  - number counting
  - animation state management

### Data layer
- None verified

### Server layer
- None verified

### API layer
- None verified

### ORM management
- None verified
- No `prisma`, `drizzle`, migration directory, or database configuration found.

## ORM and Database Analysis
- Candidate cause 1: ORM exists in a standard directory but was overlooked.
  - Falsification: searched for `prisma/*`, `drizzle/*`, and typical app/server paths; none exist.
- Candidate cause 2: ORM is declared as a dependency but not configured yet.
  - Falsification: `package.json` contains only `vite` and `gsap`.
- Candidate cause 3: database is managed externally and referenced through env or config files.
  - Falsification: no verified server/runtime config, env contract, or API files were found in repository.
- Conclusion:
  - This repository currently has no verified ORM or database layer.

## API Endpoint Analysis
- Candidate cause 1: API routes exist under common frontend framework conventions.
  - Falsification: no `app/api`, `pages/api`, `server`, or backend route directories were found.
- Candidate cause 2: API calls are made to external services from frontend code.
  - Falsification: current active JS files do not perform `fetch`, `axios`, or network request logic.
- Candidate cause 3: HTML forms post to backend endpoints directly.
  - Falsification: the three entry pages contain no forms or action URLs for backend processing.
- Conclusion:
  - No internal or external API endpoint contract is currently implemented in the active codebase.

## UI and Server Boundary
- Verified boundary:
  - Everything in runtime is client-side and static.
  - The browser loads HTML, CSS, local assets, and JS bundles or CDN GSAP scripts.
  - There is no server-rendered page composition and no repository-local request handling.

## Runtime Behavior by Entry

### Entry 1: `index.html` + `main.js`
- Uses imported GSAP modules.
- Injects a header component at runtime.
- Pins the hero section beneath a fixed header and tab bar.
- Animates five image wrappers into a composite gallery.
- Reveals overlay text after dimming individual image overlays.
- Triggers later chart and counter animations based on scroll position and intersection.

### Entry 2: `test2.html` + `test2.js`
- Uses module-imported GSAP and ScrollTrigger.
- Pins an iPhone mockup over a looping background video.
- Scrolls an oversized app-content panel within the mock phone.
- Uses mouse movement to add 3D tilt.
- Ends by fading in a follow-up CTA section.

### Entry 3: `test3.html` + `test3.js`
- Uses module-imported GSAP and ScrollTrigger.
- Pins a hero section with a centered phone frame.
- Shrinks the phone and matching white-fill mask.
- Reveals left and right cards.
- Dims the left card and fades in testimony text.

## Dependency and Loading Analysis

### Installed dependency verification
- `package.json` verifies only one runtime dependency: `gsap`.
- `node_modules/gsap` exists implicitly because the build passed and the dependency is present in lockfile.

### Mixed loading pattern risk
- Historical issue:
  - `test2` and `test3` previously mixed CDN global GSAP with Vite-bundled module entries.
- Current state:
  - this was removed in `SCRUM-32`; both entries now use direct module imports and built HTML no longer includes CDN GSAP tags.

## Current Problems and Improvement Areas

### Confirmed maintainability risks
- Root-level active app code and `src/` starter remnants coexist, which obscures source-of-truth boundaries.
- Shared navigation is duplicated:
  - injected via `Header()` for `index`
  - hardcoded directly in `test2.html` and `test3.html`
- There is no automated verification workflow beyond manual build and preview commands.
- Fonts are heavy and fully self-hosted, which increases payload size.
- `dist/.DS_Store` appeared in generated artifacts, indicating local macOS filesystem noise can leak into output.

### Root cause analysis for runtime loading fragility
- Candidate cause 1:
  - the issue is only duplicated script tags in built HTML, but source is otherwise consistent
  - Falsification:
    - `test2.js` and `test3.js` reference global `gsap` and `ScrollTrigger`
    - source HTML also explicitly loads CDN GSAP and ScrollTrigger
    - therefore the inconsistency exists in source, not only in build output
- Candidate cause 2:
  - the issue is only that `index.html` differs from the other entries, but `test2` and `test3` are internally safe
  - Falsification:
    - Vite injects bundled module entry scripts for `test2` and `test3`
    - those entries still depend on globals instead of imports
    - therefore each of those pages has a mixed dependency model on its own
- Candidate cause 3:
  - the issue is purely cosmetic because CDN globals always load before the module entry
  - Falsification:
    - current behavior depends on external CDN availability and script ordering
    - bundler-level dependency tracking does not know that GSAP is required in those entry scripts
    - this is a runtime contract risk, not just a stylistic concern
- Conclusion:
  - `test2` and `test3` should move to the same module import strategy already used by `main.js`

### Confirmed product constraints
- UI work is approval-gated by project instruction.
- Therefore immediate work should focus on:
  - documentation
  - Jira structure
  - verification workflows
  - non-visual runtime hardening

## Jira Structure Created for This Repository

### Representative tasks
- `SCRUM-26` plus-web-design repository governance and delivery foundation
- `SCRUM-27` plus-web-design animation runtime hardening
- `SCRUM-28` plus-web-design deployment and asset operations

### Subtasks
- `SCRUM-29` `[INFRA] Audit build outputs and establish agent documentation baseline`
- `SCRUM-30` `[INFRA] Add repeatable repository verification workflow`
- `SCRUM-31` `[UI] Review and approve landing page visual change scope`
- `SCRUM-32` `[FE] Consolidate GSAP loading strategy across test entries`
- `SCRUM-33` `[FE] Add non-visual runtime guards for DOM-dependent animations`
- `SCRUM-34` `[UI] Refine landing page content, layout, and style consistency`
- `SCRUM-35` `[INFRA] Validate GitHub Pages deployment path and operational flow`
- `SCRUM-36` `[INFRA] Audit heavy font and media assets for delivery risk`
- `SCRUM-37` `[UI] Approve visual tradeoffs for font and media optimization`

## Task-Specific Analysis Log

### `SCRUM-29` `[INFRA] Audit build outputs and establish agent documentation baseline`
- Objective:
  - create the governance baseline from verified evidence
- Verified evidence used:
  - repository file scan
  - `package.json`
  - `vite.config.js`
  - active root HTML/CSS/JS entry files
  - `src/components/Header.js`
  - build output in `dist/`
  - preview HTTP responses
  - GitHub Pages workflow
- Expected deliverables:
  - `AGENTS.md`
  - `research.md`
  - `plan.md`
  - refreshed `README.md`

### `SCRUM-30` `[INFRA] Add repeatable repository verification workflow`
- Objective:
  - encode artifact-first validation into a repeatable local command
- Verified needs:
  - build currently must be run manually
  - preview currently must be started manually
  - smoke checks were done manually with `curl -I`
- Candidate solutions:
  - npm script only wrapping `vite build`
  - shell script that starts preview and curls pages
  - Node script that starts preview, probes routes, and shuts it down
- Current preferred direction:
  - Node-based verification script, because it is cross-platform enough for this repo and can manage preview lifecycle in one command
- Implemented result:
  - added `scripts/verify-preview.mjs`
  - added `npm run verify:preview`
  - added `npm run verify`
- Verification result:
  - `npm run verify` passed
  - confirmed build success
  - confirmed preview startup on `127.0.0.1:4173`
  - confirmed HTTP 200 for `/`, `/test2.html`, `/test3.html`

### `SCRUM-32` `[FE] Consolidate GSAP loading strategy across test entries`
- Objective:
  - remove the mixed global-CDN-plus-module pattern from `test2` and `test3`
- Expected implementation:
  - import `gsap` and `ScrollTrigger` directly in `test2.js` and `test3.js`
  - remove CDN script tags from `test2.html` and `test3.html`
- Verification target:
  - `npm run verify`
  - inspect built `dist/test2.html` and `dist/test3.html` to ensure a single loading strategy remains
- Implemented result:
  - `test2.js` and `test3.js` now import `gsap` and `ScrollTrigger` directly
  - `test2.html` and `test3.html` no longer include CDN GSAP script tags
- Verification result:
  - `npm run verify` passed after the change
  - built `dist/test2.html` and `dist/test3.html` now load only Vite-managed module assets

### `SCRUM-33` `[FE] Add non-visual runtime guards for DOM-dependent animations`
- Objective:
  - prevent hard runtime failures when an expected DOM node or browser-only assumption is missing
- Candidate failure points identified:
  - timeline initialization on missing root containers
  - `quickTo` bindings on missing interactive wrappers
  - `gsap.set` calls on selectors expected to exist
- Expected implementation:
  - resolve key nodes up front
  - initialize animation timelines only when required nodes exist
  - skip optional behavior gracefully when prerequisites are absent
- Implemented result:
  - `test2.js` now checks required nodes before creating the pinned timeline
  - `test2.js` only binds tilt interaction when the wrapper exists
  - `test3.js` now checks required nodes before setting base states and timelines
  - `test3.js` only runs optional reveal steps when their specific nodes exist
- Verification result:
  - `npm run verify` passed after the guard changes
  - build output remained valid for all three entry pages
