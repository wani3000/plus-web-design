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
- finalized mobile `Section 01` bubble baseline with no visible overlap at 390px width
- documented current mobile `Section 01b` rail behavior

## Current Verified Behavior Notes
- mobile `Section 01` uses fixed bubble slots and hidden bubble subset (`2`, `4`, `9`)
- mobile `Section 01b` starts around `1s` after `top 85%` trigger and then keeps cycling
- `lottie-web` warning remains documented and intentionally deferred
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
- `[ ]` Final visual QA before release commit/push
- `[ ]` Push and verify deploy after final QA
