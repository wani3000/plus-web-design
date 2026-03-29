# plan.md

## Planning Basis
- This plan is derived from verified repository state, not assumed architecture.
- Current repository scope is static web only.
- UI work is locked pending explicit developer approval.

## Representative Task: `SCRUM-26` plus-web-design repository governance and delivery foundation

### Subtasks
- `SCRUM-29` `[INFRA] Audit build outputs and establish agent documentation baseline` | executable now
- `SCRUM-30` `[INFRA] Add repeatable repository verification workflow` | executable now
- `SCRUM-31` `[UI] Review and approve landing page visual change scope` | `🔒 승인 대기`

### Strategy
- Establish a stable working contract before any code refactor.
- Use verified build and preview output as the baseline.
- Keep UI untouched.
- Create documentation first so later agents inherit the right boundaries and task map.

### Subtask Plans

#### `SCRUM-29` `[INFRA] Audit build outputs and establish agent documentation baseline`
- Goal:
  - document the actual system, Jira structure, rules, and current risks
- Files:
  - `/Users/hanwha/Documents/GitHub/plus-web-design/AGENTS.md`
  - `/Users/hanwha/Documents/GitHub/plus-web-design/research.md`
  - `/Users/hanwha/Documents/GitHub/plus-web-design/plan.md`
  - `/Users/hanwha/Documents/GitHub/plus-web-design/README.md`
- Pseudocode:
```text
scan repository
verify build output
verify preview responses
verify dependencies and deploy workflow
create Jira task tree
write operating rules and architecture docs from evidence
```
- Considerations:
  - repository contains misleading starter remnants in `src/`
  - documentation must explicitly state that DB/API/ORM are absent
  - README must avoid implying a backend exists
- Technical constraints:
  - no UI modifications allowed
  - no unsupported architectural claims
- Quality bar:
  - functional correctness: docs match verified codebase and Jira
  - code quality: follows `AGENTS.md` rules
  - edge cases: clearly states when layers do not exist rather than inventing them
- Stopping rule:
  - complete only after docs, Jira structure, and verification evidence are aligned

#### `SCRUM-30` `[INFRA] Add repeatable repository verification workflow`
- Goal:
  - encode the minimum artifact-first validation loop into repo scripts or docs
- Candidate files:
  - `/Users/hanwha/Documents/GitHub/plus-web-design/package.json`
  - `/Users/hanwha/Documents/GitHub/plus-web-design/README.md`
  - optional helper script under `/Users/hanwha/Documents/GitHub/plus-web-design/scripts/`
- Pseudocode:
```text
identify current manual verification steps
decide whether npm script or shell helper is least invasive
implement build + preview + smoke-check flow
document command usage
rerun verification through the new workflow
```
- Tradeoffs:
  - script should remain simple because project is static
  - avoid introducing tooling that exceeds project size
- Technical constraints:
  - no visual changes
  - must work with multi-entry Vite output
- Quality bar:
  - command is repeatable
  - validates actual artifacts
  - documents failure points clearly

#### `SCRUM-31` `[UI] Review and approve landing page visual change scope`
- Goal:
  - collect UI work but do not implement without approval
- Expected files if later approved:
  - root HTML/CSS/JS entry files
  - `public/` assets
- Status:
  - `🔒 승인 대기`

### Iteration Log
- Iteration 1
  - verified repository layout, dependencies, build output, preview responses, and deploy workflow
  - created Jira representative tasks and subtasks for this repository
  - completed baseline docs from evidence
  - Quality status:
    - functional correctness: satisfied for current documented findings
    - code quality: satisfied
    - edge cases: satisfied by explicitly documenting absent layers

### Todo List
- `[x]` `SCRUM-29` Agent-1
- `[ ]` `SCRUM-30` Agent-1
- `[ ]` `SCRUM-31` Agent-1 `🔒 승인 대기`

## Representative Task: `SCRUM-27` plus-web-design animation runtime hardening

### Subtasks
- `SCRUM-32` `[FE] Consolidate GSAP loading strategy across test entries` | executable after current foundation work
- `SCRUM-33` `[FE] Add non-visual runtime guards for DOM-dependent animations` | executable after current foundation work
- `SCRUM-34` `[UI] Refine landing page content, layout, and style consistency` | `🔒 승인 대기`

### Strategy
- Fix runtime fragility before any visual polish.
- Preserve visible behavior unless approval explicitly expands scope.
- Standardize entry loading so the build output does not depend on mixed global and module conventions.

### Subtask Plans

#### `SCRUM-32` `[FE] Consolidate GSAP loading strategy across test entries`
- Files likely affected:
  - `/Users/hanwha/Documents/GitHub/plus-web-design/test2.html`
  - `/Users/hanwha/Documents/GitHub/plus-web-design/test2.js`
  - `/Users/hanwha/Documents/GitHub/plus-web-design/test3.html`
  - `/Users/hanwha/Documents/GitHub/plus-web-design/test3.js`
- Pseudocode:
```text
for each test entry:
  inspect current script ordering
  convert to one consistent loading model
  rebuild
  inspect dist html for duplicate or conflicting script strategy
  preview and smoke-check
```
- Tradeoffs:
  - importing GSAP via modules improves determinism
  - removing CDN usage reduces external dependency but changes boot assumptions
- Technical constraints:
  - no visual retuning
  - preserve scroll behavior timing as much as possible
- Stopping rule:
  - source and built HTML reflect one loading strategy only

#### `SCRUM-33` `[FE] Add non-visual runtime guards for DOM-dependent animations`
- Files likely affected:
  - `/Users/hanwha/Documents/GitHub/plus-web-design/main.js`
  - `/Users/hanwha/Documents/GitHub/plus-web-design/test2.js`
  - `/Users/hanwha/Documents/GitHub/plus-web-design/test3.js`
- Pseudocode:
```text
collect all DOM queries and browser API assumptions
guard optional nodes
fail soft when section markup is absent
verify build and runtime preview still pass
```
- Considerations:
  - use guards only where structure can truly be optional
  - do not silently mask real programming errors without documenting them

#### `SCRUM-34` `[UI] Refine landing page content, layout, and style consistency`
- Status:
  - `🔒 승인 대기`

### Iteration Log
- Iteration 0
  - problem identified from evidence: `test2` and `test3` mix CDN global GSAP with Vite module entry output
  - execution not started yet

### Todo List
- `[ ]` `SCRUM-32` Agent-1
- `[ ]` `SCRUM-33` Agent-1
- `[ ]` `SCRUM-34` Agent-1 `🔒 승인 대기`

## Representative Task: `SCRUM-28` plus-web-design deployment and asset operations

### Subtasks
- `SCRUM-35` `[INFRA] Validate GitHub Pages deployment path and operational flow` | executable after current foundation work
- `SCRUM-36` `[INFRA] Audit heavy font and media assets for delivery risk` | executable after current foundation work
- `SCRUM-37` `[UI] Approve visual tradeoffs for font and media optimization` | `🔒 승인 대기`

### Strategy
- Confirm deployment assumptions before changing runtime code.
- Separate non-visual findings from any approval-gated visual tradeoffs.

### Subtask Plans

#### `SCRUM-35` `[INFRA] Validate GitHub Pages deployment path and operational flow`
- Files:
  - `/Users/hanwha/Documents/GitHub/plus-web-design/.github/workflows/deploy-pages.yml`
  - `/Users/hanwha/Documents/GitHub/plus-web-design/vite.config.js`
  - `/Users/hanwha/Documents/GitHub/plus-web-design/README.md`
- Pseudocode:
```text
verify BASE_PATH usage
verify generated asset URLs under non-root base
verify workflow matches current build contract
document any mismatch and fix non-visual issues
```

#### `SCRUM-36` `[INFRA] Audit heavy font and media assets for delivery risk`
- Files:
  - `/Users/hanwha/Documents/GitHub/plus-web-design/font/`
  - `/Users/hanwha/Documents/GitHub/plus-web-design/public/`
  - `/Users/hanwha/Documents/GitHub/plus-web-design/research.md`
- Pseudocode:
```text
list asset sizes
identify top payload contributors
separate pure delivery improvements from visual tradeoffs
document optimization paths
```

#### `SCRUM-37` `[UI] Approve visual tradeoffs for font and media optimization`
- Status:
  - `🔒 승인 대기`

### Iteration Log
- Iteration 0
  - build artifacts already show large self-hosted fonts in `dist/assets`
  - execution not started yet

### Todo List
- `[ ]` `SCRUM-35` Agent-1
- `[ ]` `SCRUM-36` Agent-1
- `[ ]` `SCRUM-37` Agent-1 `🔒 승인 대기`
