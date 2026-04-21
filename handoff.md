# Handoff

작성일: 2026-04-21
프로젝트 경로: `/Users/chulwan/Documents/GitHub/plus-web-design`

## 현재 상태
- 이 저장소는 현재 홈 단일 엔트리 구조다.
- 활성 페이지는 `index.html` 하나만 남는다.
- 데스크톱/태블릿/모바일은 같은 홈 엔트리 안에서 분기된다.
- `test2`, `test3`는 더 이상 활성 트랙이 아니다.

## 현재 중요 파일
- `index.html`
- `main.js`
- `style.css`
- `src/components/Header.js`
- `src/initSectionsTest1.js`
- `src/initStoreDownloadModal.js`
- `public/`

## 최근 핵심 정리
- 홈만 남기기 위해 멀티 엔트리 구조를 정리했다.
- 홈 단일 구조가 확정되면서 헤더의 테스트 탭/홈 탭 UI도 제거했다.
- 스토어 아이콘은 사용자 제공 PNG를 `public`에 넣고 실제 런타임 참조도 그 PNG로 통일했다.
- 홈에서 더 이상 참조하지 않는 `public/` 런타임 에셋은 삭제했다.
- Vercel 프로젝트에는 `buildCommand=npm run build`, `outputDirectory=dist`를 반영했고, 루트 `vercel.json`은 `gh-pages` 프리뷰 배포를 skip하도록 구성했다.
- 모바일 `Section 01` 말풍선은 `mobileBubbleSlots` 기준으로 정리했고, 현재 visible bubble 기준 겹침이 없다.
- 모바일 `Section 01b`는 별도 모바일 레일 순서와 active index를 사용한다.

## 모바일 확인 포인트
### Section 01
- 파일: `src/initSectionsTest1.js`
- 키 포인트: `mobileBubbleSlots`
- 현재 숨김: `2`, `4`, `9`

### Section 01b
- 파일: `main.js`
- 현재 모바일 순서:
  - `12 -> 01 -> 02 -> 03 -> 10 -> 07 -> 08 -> 09`
- 현재 active index: `1`
- 현재 시작 조건:
  - `top 85%`
  - 약 `1초` 후 첫 사이클

## Known Warning
- `lottie-web`의 `eval` 경고는 현재 known third-party warning이다.
- 홈 단일 엔트리로 정리된 뒤에는 main chunk가 `500 kB`를 넘는 경고도 함께 발생한다.
- 빌드는 통과하며, 지금은 구조 최적화보다 기능 안정성을 우선해 그대로 둔다.

## 체크리스트
- `npm run verify`
- 홈 헤더/푸터 스토어 아이콘이 PNG를 직접 참조하는지 확인
- 모바일 `Section 01`, `Section 01b` 재확인
