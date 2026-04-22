# plus-web-design

## 개요
- 저장소 경로: `/Users/hanwha/Documents/GitHub/plus-web-design`
- Vite 기반 정적 랜딩 프로젝트입니다.
- 현재 활성 엔트리는 3개입니다.
  - `/Users/hanwha/Documents/GitHub/plus-web-design/index.html`
  - `/Users/hanwha/Documents/GitHub/plus-web-design/guide.html`
  - `/Users/hanwha/Documents/GitHub/plus-web-design/gift-qa.html`
- 데스크톱, 태블릿, 모바일은 모두 동일한 홈 엔트리 안에서 breakpoint로 분기합니다.
- 브라우저 탭 타이틀은 `앞서가는 부모들의 자산공식, 파이` 입니다.
- 현재 UI는 승인 완료 상태로 간주하며, 추가 정리 작업은 시각 결과를 바꾸지 않는 범위에서만 진행합니다.

## 활성 런타임 파일
- `/Users/hanwha/Documents/GitHub/plus-web-design/index.html`
- `/Users/hanwha/Documents/GitHub/plus-web-design/guide.html`
- `/Users/hanwha/Documents/GitHub/plus-web-design/gift-qa.html`
- `/Users/hanwha/Documents/GitHub/plus-web-design/main.js`
- `/Users/hanwha/Documents/GitHub/plus-web-design/detail.js`
- `/Users/hanwha/Documents/GitHub/plus-web-design/style.css`
- `/Users/hanwha/Documents/GitHub/plus-web-design/src/components/Header.js`
- `/Users/hanwha/Documents/GitHub/plus-web-design/src/initSectionsTest1.js`
- `/Users/hanwha/Documents/GitHub/plus-web-design/src/initStoreDownloadModal.js`
- `/Users/hanwha/Documents/GitHub/plus-web-design/color-tokens.css`
- `/Users/hanwha/Documents/GitHub/plus-web-design/plus-typography.css`

## 현재 구조
### Hero
- 고정 헤더 아래 pinned hero를 사용합니다.
- 메인 비디오는 `/Users/hanwha/Documents/GitHub/plus-web-design/public/section-02-hero-video.mp4` 입니다.
- poster/fallback 이미지는 `/Users/hanwha/Documents/GitHub/plus-web-design/public/section-02-hero-video-poster.png` 입니다.

### Section 01
- 제목: `아이 자산 어떻게 관리하고 계신가요?`
- 말풍선 레이아웃과 등장 애니메이션은 `/Users/hanwha/Documents/GitHub/plus-web-design/src/initSectionsTest1.js` 에서 제어합니다.
- 태블릿/모바일은 compact bubble layout을 사용합니다.
- 태블릿에서는 말풍선 텍스트를 `16px`로 사용합니다.
- 태블릿에서는 가장 긴 말풍선(`section-01__bubble--5`)에 별도 폭 상한을 적용해 텍스트 overflow를 막습니다.

### Section 01b
- 제목: `파이가 자산관리의 시작을 도와드릴게요`
- 휴대폰 레일과 모바일 순환 로직은 `main.js` 와 `src/initSectionsTest1.js` 에 분산되어 있습니다.
- 모바일 `Section 01B` 레일은 width-change 기반 재계산만 수행하며, height-only resize에서는 즉시 재배치하지 않습니다.
- 모바일 `Section 01B` 내부 이미지/스크린 코너 반경은 `19px` 입니다.

### Section 03 / Section 04
- 회색 카드 기반 핵심 설명/그래픽 섹션입니다.
- 현재 데스크톱/태블릿/모바일 디자인은 모두 확정 상태입니다.
- 향후 작업은 시각 결과를 바꾸지 않는 정리만 허용합니다.
- 현재 카드 소제목 본문 크기:
  - 데스크톱: `18px`
  - 태블릿: `16px`
  - 모바일: `16px`
- 같은 데스크톱 `18px` 규칙은 `Section 05 intro` 카드 설명문에도 적용됩니다.
- 데스크톱 `Section 05 intro` 의 `자세히 보기` 버튼 높이는 헤더 스토어 버튼과 같은 `44px` 입니다.
- 데스크톱 섹션 서브타이틀(`Section 01B`, `Section 03`, `Section 04`, `Section 05`)은 현재 `22px`로 통일되어 있습니다.

### Section 05 / Footer
- CTA와 footer는 현재 홈 단일 엔트리 안에서 viewport별 분기를 가집니다.
- 스토어 다운로드 모달은 `/Users/hanwha/Documents/GitHub/plus-web-design/src/initStoreDownloadModal.js` 가 담당합니다.

### Detail Pages
- `/Users/hanwha/Documents/GitHub/plus-web-design/guide.html`
  - 제목: `생애 필수 증여+투자 패키지 이용방법`
- `/Users/hanwha/Documents/GitHub/plus-web-design/gift-qa.html`
  - 제목: `증여 Q&A`
- 공통 런타임: `/Users/hanwha/Documents/GitHub/plus-web-design/detail.js`
- 모바일은 back header, 태블릿/데스크톱은 홈과 동일한 상단 네비게이션을 사용합니다.
- 두 상세 페이지 모두 하단에 footer를 노출합니다.
- 상세 페이지의 `style.css` 는 HTML `<link>` 로 선로딩합니다. 초기 JS import 로드 방식에서 발생하던 아이콘/푸터 FOUC를 방지하기 위한 구조입니다.
- preview 응답 확인:
  - `/` -> `200`
  - `/guide.html` -> `200`
  - `/gift-qa.html` -> `200`

## 자산 정책
- 런타임 자산은 `/Users/hanwha/Documents/GitHub/plus-web-design/public`
- 폰트 자산은 `/Users/hanwha/Documents/GitHub/plus-web-design/font`
- 디자인 원본은 `/Users/hanwha/Documents/GitHub/plus-web-design/design`
- `dist/` 는 생성 산출물이며 직접 수정하지 않습니다.

## 자산 정리 상태
- 현재 런타임 참조를 다시 점검한 결과, `public/` 내 미사용 파일은 `.DS_Store` 하나뿐이었고 정리 대상입니다.
- 그 외 `public/` 파일은 현재 홈 엔트리에서 직접 참조되거나 런타임 코드에서 로드됩니다.

## 명령어
- 개발 서버: `npm run dev`
- 빌드: `npm run build`
- 프리뷰: `npm run preview -- --host 127.0.0.1`
- 검증: `npm run verify`

## 배포
- GitHub Pages: `.github/workflows/deploy-pages.yml`
- Vercel 설정: `/Users/hanwha/Documents/GitHub/plus-web-design/vercel.json`
- 빌드 산출물은 `dist/` 입니다.
- GitHub Pages 배포는 현재 `gh-pages` 브랜치 푸시 방식으로 유지합니다.
  - `actions/checkout@v6`
  - `actions/setup-node@v6`
  - `peaceiris/actions-gh-pages@v4`
- 공식 Pages 액션 체인(`configure-pages` / `upload-pages-artifact` / `deploy-pages`) 전환은 시도했지만, 현재 저장소에서는 Pages site 생성 권한이 없어 적용하지 못했습니다.

## 알려진 빌드 경고
- `lottie-web` 의 direct `eval` 경고
- 메인 번들 chunk size 경고

두 경고 모두 현재는 빌드를 막지 않는 알려진 상태입니다.
