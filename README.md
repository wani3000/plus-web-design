# plus-web-design

## 개요
이 저장소는 PI를 위한 Vite 기반 정적 랜딩 프로토타입입니다.
현재 실제로 동작하는 화면은 단일 홈 페이지이며, 아래 파일을 중심으로 구성되어 있습니다.
- [index.html](/Users/chulwan/Documents/GitHub/plus-web-design/index.html)
- [main.js](/Users/chulwan/Documents/GitHub/plus-web-design/main.js)
- [style.css](/Users/chulwan/Documents/GitHub/plus-web-design/style.css)

`test2`, `test3`는 더 이상 현재 활성 저장소 구조에 포함되지 않습니다.

## 현재 활성 런타임 파일
- [index.html](/Users/chulwan/Documents/GitHub/plus-web-design/index.html)
- [main.js](/Users/chulwan/Documents/GitHub/plus-web-design/main.js)
- [style.css](/Users/chulwan/Documents/GitHub/plus-web-design/style.css)
- [src/components/Header.js](/Users/chulwan/Documents/GitHub/plus-web-design/src/components/Header.js)
- [src/initSectionsTest1.js](/Users/chulwan/Documents/GitHub/plus-web-design/src/initSectionsTest1.js)
- [src/initStoreDownloadModal.js](/Users/chulwan/Documents/GitHub/plus-web-design/src/initStoreDownloadModal.js)
- [public](/Users/chulwan/Documents/GitHub/plus-web-design/public)
- [font](/Users/chulwan/Documents/GitHub/plus-web-design/font)

## 현재 홈 구조
### 히어로
- 고정 헤더 아래에 단일 홈 히어로가 배치됩니다.
- 히어로 전환은 1회성으로 동작하며, 이후 자동으로 Section 01로 이어집니다.
- 모바일에서는 fallback/poster 처리와 함께 단일 히어로 비디오를 사용합니다.
- `public/section-02-hero-video-poster.png`는 현재 `section-02-hero-video.mp4`에서 추출한 깨끗한 프레임을 사용합니다. 이전 poster 자산에는 `section-02-hero-video.mp4` 문구가 이미지 자체에 포함되어 있었습니다.

### Section 01
- 제목: `아이 자산 어떻게 관리하고 계신가요?`
- 데스크톱/태블릿에서는 hover/drift 동작이 있는 말풍선 레이아웃을 유지합니다.
- 모바일에서는 [src/initSectionsTest1.js](/Users/chulwan/Documents/GitHub/plus-web-design/src/initSectionsTest1.js)의 `mobileBubbleSlots`를 사용합니다.
- 현재 모바일에서는 말풍선 `2`, `4`, `9`를 숨깁니다.
- 최근 `390px` 뷰포트 기준 검증에서, 모바일에 실제로 보이는 말풍선끼리 겹침이 없는 것을 확인했습니다.

### Section 01b
- 제목: `파이가 자산관리의 시작을 도와드릴게요`
- 데스크톱에서는 활성 카드 강조가 들어간 중앙 정렬 폰 레일을 사용합니다.
- 모바일에서는 별도의 레일 순서와 활성 카드 상태를 사용합니다.
- 현재 모바일 레일 순서:
  - `12 -> 01 -> 02 -> 03 -> 10 -> 07 -> 08 -> 09`
- 현재 모바일 활성 인덱스: `1`
- 현재 모바일 시작 타이밍:
  - `ScrollTrigger start: top 85%`
  - 첫 사이클 시작 전 약 `1초` 지연
  - 이후 연속 순환

### Section 03 / Section 04 / Section 05
- 홈 페이지 내에서 주요 제품 설명 카드, 증여 계획/투자/세금 시각 요소, CTA/푸터가 활성 상태로 유지됩니다.
- 모바일과 태블릿 규칙은 별도 페이지 분기 없이 동일한 홈 엔트리 안에서 관리합니다.

## 자산 정책
- 런타임 자산은 [public](/Users/chulwan/Documents/GitHub/plus-web-design/public)에 둡니다.
- 디자인/참고용 아티팩트는 [design](/Users/chulwan/Documents/GitHub/plus-web-design/design)에 둡니다.
- 스토어 아이콘은 현재 사용자 제공 PNG 자산을 사용합니다.
  - `public/ic_store_google.png`
  - `public/ic_store_apple.png`
- 스토어 버튼은 동일한 프레임 크기를 사용하되, 각 PNG의 원래 비율은 유지합니다.
- 헤더에는 더 이상 레거시 테스트 탭이 없으며, 홈만 단일 최상위 경로로 유지됩니다.
- 제거된 `test2` / `test3` 트랙에서만 사용하던 미사용 런타임 자산은 `public/`에서 삭제했습니다.

## 명령어
- dev: `npm run dev`
- build: `npm run build`
- preview: `npm run preview -- --host 127.0.0.1`
- verify: `npm run verify`

## 검증
현재 `npm run verify`는 홈 라우트만 확인합니다.
- `/`

## 배포 메모
- GitHub Pages가 기본 배포 경로이며, `.github/workflows/deploy-pages.yml`을 통해 배포합니다.
- 루트의 [vercel.json](/Users/chulwan/Documents/GitHub/plus-web-design/vercel.json)은 Vercel 빌드를 `npm run build` + `dist`로 고정합니다.
- 같은 `vercel.json`을 빌드 시 `dist/`로 복사해서, `gh-pages` 브랜치 배포가 `vite build`를 다시 실행하지 않고 `ignoreCommand`로 건너뛰도록 맞춰두었습니다.

## 알려진 경고
- `lottie-web`는 현재도 direct `eval` 관련 빌드 경고를 발생시킵니다.
- 저장소를 단일 홈 엔트리로 줄인 뒤, 단일 번들 기준으로 Vite의 `500 kB` chunk-size 경고도 발생합니다.
- 현재 상태는 알려진 서드파티/번들 경고이며, 빌드는 정상적으로 성공합니다.
- 현재 판단은 문서화 상태로 유지하고, 실제 배포 차단 이슈가 생기기 전까지는 교체하지 않는 것입니다.
