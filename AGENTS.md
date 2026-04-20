# AGENTS.md

## Purpose
- This file is the operating constitution for agents working in `/Users/chulwan/Documents/GitHub/plus-web-design`.
- Agents must read this file before changing code, docs, or Jira.

## Project Reality
- This repository is currently a Vite-based static landing prototype with three HTML entry pages.
- It is not a full-stack application at this time.
- There is no verified server runtime, database, ORM, or internal API layer in the current codebase.
- All conclusions must be based on verified files, build artifacts, preview output, and installed dependencies.

## Analysis Rule
- Do not guess. Verify artifacts first.
- Before naming a cause, inspect the actual build output, runtime behavior, and installed package state.
- For unclear bugs, list at least three plausible causes, attempt to falsify each with code or artifact evidence, then conclude.
- Keep environment analysis separated. Do not mix web, mobile web, or native assumptions unless separate code paths exist.

## Team Environment
- Node.js is the active runtime. Verified local tool versions during setup: Node `v22.17.0`, npm `11.8.0`.
- Package manager: npm. Use `npm install`, `npm run build`, and `npm run preview`.
- Build tool: Vite.
- Primary language: Vanilla JavaScript with ES modules.
- Animation library: GSAP.
- Deployment target: GitHub Pages via `.github/workflows/deploy-pages.yml`.

## Source of Truth
- Active production-facing entry files currently live at repository root:
  - `index.html`
  - `test2.html`
  - `test3.html`
  - `main.js`
  - `test2.js`
  - `test3.js`
  - `style.css`
  - `test2.css`
  - `test3.css`
- `src/` contains partial Vite starter remnants plus shared component code. Treat it carefully and verify whether a file is active before editing it.
- `public/` contains shipped static assets.
- `dist/` is a generated artifact and must not be edited by hand.

## Build and Verification Rules
- Always validate with actual outputs before concluding a change works.
- Minimum verification for non-trivial work:
  - `npm run verify`
  - fallback: `npm run build` and `npm run preview -- --host 127.0.0.1`
  - Confirm the relevant page responds from preview or inspect generated `dist/` files.
- For dependency or plugin issues:
  - Check `package.json`
  - Check lockfile
  - Check actual import usage
  - Check generated artifact behavior
- For runtime issues:
  - Compare source entry file, bundled output, and preview response before concluding.

## Data and File Handling
- Never overwrite raw assets without confirming they are replaceable.
- Do not edit files under `dist/`; regenerate them through the build.
- Preserve original media in `public/` unless the task explicitly requires replacement.
- Treat `.pen` design files as source artifacts. Do not mutate them unless the task explicitly targets design source.

## UI Change Permission Rule
- UI components, layout, style, copy placement, animation composition, and visual assets must not be modified without explicit developer approval.
- Allowed without approval:
  - Documentation
  - Jira maintenance
  - Build and deployment verification
  - Non-visual refactors
  - Runtime hardening that does not intentionally change the approved visual result
- If a task could affect appearance, stop and request approval first.

## Layer Boundaries
- UI layer: root HTML/CSS/JS entry files, shared header component, static assets.
- Business logic layer: limited client-side animation orchestration only.
- Data layer: none verified in repository.
- Server layer: none verified in repository.
- ORM layer: none verified in repository.

## Jira Tag Rules
- `[BE]` backend, server, logic
- `[FE]` frontend logic without direct visual scope
- `[UI]` screen, layout, style, visual composition, motion tuning; approval required
- `[DB]` database, schema, migration
- `[INFRA]` deployment, tooling, environment, CI/CD, verification workflow

## Issue Ownership and Collaboration
- Do not touch issues that another agent has already marked `In Progress`.
- Before work:
  - Move the Jira subtask to `In Progress`
  - Update `research.md`
  - Update `plan.md`
- After work:
  - Re-run verification
  - Update `plan.md`
  - Update `README.md`
  - Move the Jira subtask to `Done`
- Parent tasks are closed only after every child subtask is done.

## Quality Bar and Stopping Rule
- Complex logic is not complete until all three are satisfied:
  - Functional correctness
  - Code quality against this file
  - Edge-case handling
- Use an eval-driven loop:
  - change
  - verify
  - inspect output
  - log result in `plan.md`
  - repeat until all criteria are satisfied
- Never mark a task complete based on intuition alone.

## Review Severity
- `P0`: security issue, destructive data loss, broken production deployment, legal/compliance risk
- `P1`: broken core user flow, missing critical documentation for agents, severe runtime failure
- `P2`: important maintainability or correctness risk with workaround
- `P3`: minor cleanup, clarity, or non-blocking optimization

## Commit Convention
- Format: `[대표이슈-번호/하위이슈-번호] 타입: 작업 내용 요약`
- Example: `[SCRUM-26/SCRUM-29] docs: 프로젝트 운영 문서 초기 세팅`
- Suggested types:
  - `feat`
  - `fix`
  - `docs`
  - `refactor`
  - `chore`
  - `test`
  - `build`

## Documentation Rule
- The following four files must remain current:
  - `AGENTS.md`
  - `research.md`
  - `plan.md`
  - `README.md`
- If reality changes, update these files in the same work cycle.
