# AGENTS.md

## Purpose
- This file is the operating constitution for agents working in `/Users/chulwan/Documents/GitHub/plus-web-design`.
- Read this file before changing code, docs, or repository structure.

## Current Project Reality
- This repository is a Vite-based static landing prototype.
- Current active product surface is a single home entry page:
  - `index.html`
  - `main.js`
  - `style.css`
- `test2` and `test3` are no longer active product tracks in this repository.
- There is no verified backend, database, ORM, or internal API runtime.
- Runtime behavior is browser-only: HTML, CSS, GSAP, lottie-web, static media assets.

## Source of Truth
- Active root entry files:
  - `index.html`
  - `main.js`
  - `style.css`
- Active shared/runtime modules:
  - `src/components/Header.js`
  - `src/initSectionsTest1.js`
  - `src/initStoreDownloadModal.js`
- Static runtime assets:
  - `public/`
- Local fonts:
  - `font/`
- Design/reference artifacts:
  - `design/`
- Generated output:
  - `dist/` (never edit by hand)

## Analysis Rule
- Do not guess. Verify artifacts first.
- Before naming a cause, inspect actual source, build output, and runtime behavior.
- For unclear bugs, list at least three plausible causes, attempt to falsify each with code or artifact evidence, then conclude.
- Keep desktop/tablet/mobile behavior analysis separated when code paths differ.

## Team Environment
- Node.js runtime: verified locally on this machine
- Package manager: npm
- Build tool: Vite
- Primary language: Vanilla JavaScript with ES modules
- Animation libraries: GSAP, lottie-web
- Deployment target: GitHub Pages via `.github/workflows/deploy-pages.yml`
- Additional hosting/project setting in use: Vercel project for Git-connected production/preview deployments

## Build and Verification Rules
- Always validate with actual outputs before concluding a change works.
- Minimum verification for non-trivial work:
  - `npm run verify`
- Fallback verification:
  - `npm run build`
  - `npm run preview -- --host 127.0.0.1`
- Confirm the relevant page responds from preview and inspect generated artifacts only as verification output, not as editable source.

## Data and File Handling
- Never edit files in `dist/`.
- Keep runtime assets in `public/`.
- Keep design/reference artifacts in `design/`.
- Do not overwrite raw assets unless replacement is explicitly intended.
- Treat `.pen` files as design-source artifacts, not runtime code.

## UI Change Permission Rule
- UI components, layout, style, copy placement, animation composition, and visual assets must not be modified without explicit developer approval.
- Allowed without approval:
  - Documentation updates
  - Build/deploy verification
  - Non-visual refactors
  - Runtime hardening that does not intentionally change the approved visual result

## Layer Boundaries
- UI layer:
  - `index.html`, `style.css`, runtime assets, shared header component
- Business logic layer:
  - client-side animation orchestration only
- Data layer:
  - none verified
- Server layer:
  - none verified
- ORM layer:
  - none verified

## Quality Bar
- Complex work is not complete until all three are satisfied:
  - functional correctness
  - code quality
  - edge-case handling
- Use an eval-driven loop:
  - change
  - verify
  - inspect output
  - update docs
  - repeat until stable

## Documentation Rule
- Keep these files current in the same work cycle:
  - `AGENTS.md`
  - `README.md`
  - `research.md`
  - `plan.md`
- If repository reality changes, update the docs immediately.
