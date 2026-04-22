# Handoff

작성일: 2026-04-22
프로젝트 경로: `/Users/hanwha/Documents/GitHub/plus-web-design`

## 현재 상태
- 이 저장소는 홈 단일 엔트리 구조입니다.
- 활성 페이지는 `index.html` 하나입니다.
- 데스크톱/태블릿/모바일은 모두 같은 엔트리 안에서 breakpoint로 분기합니다.
- 현재 UI는 확정 상태로 간주하며, 정리 작업은 시각 결과를 바꾸지 않는 범위로 제한합니다.

## 현재 중요 파일
- `/Users/hanwha/Documents/GitHub/plus-web-design/index.html`
- `/Users/hanwha/Documents/GitHub/plus-web-design/main.js`
- `/Users/hanwha/Documents/GitHub/plus-web-design/style.css`
- `/Users/hanwha/Documents/GitHub/plus-web-design/src/components/Header.js`
- `/Users/hanwha/Documents/GitHub/plus-web-design/src/initSectionsTest1.js`
- `/Users/hanwha/Documents/GitHub/plus-web-design/src/initStoreDownloadModal.js`

## 정리 결과 요약
- 문서의 오래된 사용자 경로(`/Users/chulwan/...`)를 현재 저장소 경로 기준으로 교체했습니다.
- append-only 로그 형태 문서를 현재 구조 기준 요약 문서로 정리했습니다.
- `public/` 참조를 다시 점검했고, 미사용 파일은 `.DS_Store` 하나만 확인됐습니다.
- 태블릿 `Section 01` 말풍선은 현재 `16px` 텍스트 기준이며, 긴 문장 bubble(`section-01__bubble--5`)은 별도 폭 상한으로 overflow를 방지합니다.

## Known Warning
- `lottie-web` direct `eval` 경고
- bundle chunk size 경고

둘 다 현재는 빌드를 막지 않는 상태입니다.
