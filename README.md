# plus-web-design

## 프로젝트 개요
이 저장소는 PI(자산공식) 콘셉트의 정적 랜딩 프로토타입이다. 현재 검증된 현실은 Vite 기반 멀티 엔트리 사이트이며, 핵심 화면은 루트의 [index.html](/Users/hanwha/Documents/GitHub/plus-web-design/index.html) 한 장에 집중되어 있다. 서버, 데이터베이스, ORM, 내부 API는 현재 코드베이스에서 확인되지 않았고, 동작의 중심은 GSAP 기반 스크롤/등장 애니메이션과 정적 이미지·비디오 자산이다.

## 현재 작업 컨텍스트
- 문서 초기 세팅 단계는 끝났고, 실제 랜딩 UI/모션 구현이 상당 부분 반영된 상태다.
- 현재 소스 오브 트루스는 루트 엔트리 파일과 정적 자산이다.
- 최근 작업은 `index.html` 메인 랜딩의 섹션 01b, 03, 04 인터랙션과 콘텐츠 카드 구현에 집중되어 있다.
- 배포는 GitHub Pages와 Vercel 둘 다 사용 중이며, 로컬 검증 기본 루프는 `npm run verify`다.

## 핵심 디렉토리 구조
- [index.html](/Users/hanwha/Documents/GitHub/plus-web-design/index.html)
  - 메인 PI 랜딩 엔트리
- [main.js](/Users/hanwha/Documents/GitHub/plus-web-design/main.js)
  - 메인 엔트리의 헤더/히어로 전용 애니메이션 및 인터랙션 로직
- [src/initSharedSections.js](/Users/hanwha/Documents/GitHub/plus-web-design/src/initSharedSections.js)
  - 메인과 `test3`가 공유하는 섹션 인터랙션 초기화 모듈
- [section-02-backup.html](/Users/hanwha/Documents/GitHub/plus-web-design/section-02-backup.html)
  - 제거한 Section 02 마크업 백업
- [style.css](/Users/hanwha/Documents/GitHub/plus-web-design/style.css)
  - 메인 엔트리 전역/섹션 스타일
- [test2.html](/Users/hanwha/Documents/GitHub/plus-web-design/test2.html)
  - 메인 랜딩 변형 엔트리
  - `Section 02`가 포함된 전체 페이지
- [test2.js](/Users/hanwha/Documents/GitHub/plus-web-design/test2.js)
  - 과거 실험 페이지용 스크립트 잔재
- [test2.css](/Users/hanwha/Documents/GitHub/plus-web-design/test2.css)
  - 과거 실험 페이지용 스타일 잔재
- [test3.html](/Users/hanwha/Documents/GitHub/plus-web-design/test3.html)
  - 카드 리빌 실험 엔트리
- [test3.js](/Users/hanwha/Documents/GitHub/plus-web-design/test3.js)
  - test3 인터랙션 로직
- [test3.css](/Users/hanwha/Documents/GitHub/plus-web-design/test3.css)
  - test3 전용 스타일
- [src/components/Header.js](/Users/hanwha/Documents/GitHub/plus-web-design/src/components/Header.js)
  - 메인 엔트리에서 삽입하는 공통 헤더 조각
- [/Users/hanwha/Documents/GitHub/plus-web-design/public](/Users/hanwha/Documents/GitHub/plus-web-design/public)
  - 배포 대상 이미지, 비디오, 아이콘 등 정적 자산
- [/Users/hanwha/Documents/GitHub/plus-web-design/font](/Users/hanwha/Documents/GitHub/plus-web-design/font)
  - 로컬 폰트 파일
- [/Users/hanwha/Documents/GitHub/plus-web-design/.github/workflows/deploy-pages.yml](/Users/hanwha/Documents/GitHub/plus-web-design/.github/workflows/deploy-pages.yml)
  - GitHub Pages 배포 워크플로

## 메인 랜딩 구조
- Hero
  - 고정 헤더/탭 아래 5장 갤러리와 텍스트 오버레이, dimmed 순차 연출
- Section 01
  - `아이 자산 어떻게 관리하고 계신가요?`
  - 랜덤 배치 말풍선과 hover 인터랙션
- Section 01b
  - 회색 배경 후속 섹션
  - `파이가 자산관리의 시작을 도와드릴게요`
  - 중앙 고정 white stroke 프레임과 다수 카드 슬라이드 애니메이션
- Section 02
  - `왜 사전증여를 해야 하나요?`
  - 현재 메인 `index.html`에서는 제거되었고 `test2.html`에서만 전체 페이지 흐름에 포함
- Section 03
  - 4가지 공식 카드
  - 공제 한도 차트, 유기정기금 수치 애니메이션, 투자 입력 모달 카드, ETF 카드
- Section 04
  - 기능 소개 카드 묶음
  - 신고 금액 카운트, 인사이트 카드, 마키형 카드 스트립
- Section 05
  - 다운로드 CTA

## 기술 스택 요약
- Node.js + npm
- Vite 8
- Vanilla JavaScript (ES modules)
- GSAP 3.14
- lottie-web 5.x
- Playwright
- Plain CSS

## 기본 실행 및 검증 명령
- 개발 서버
  - `npm run dev`
- 프로덕션 빌드
  - `npm run build`
- 빌드 결과 미리보기
  - `npm run preview -- --host 127.0.0.1`
- 권장 검증 루프
  - `npm run verify`
  - 동작: build -> preview 기동 -> `/`, `/test2.html`, `/test3.html` 응답 확인 -> preview 종료

## 현재 확인된 배포 경로
- GitHub Pages
  - [https://wani3000.github.io/plus-web-design/](https://wani3000.github.io/plus-web-design/)
- Vercel
  - [https://plus-web-design.vercel.app/](https://plus-web-design.vercel.app/)

## 현재 작업 진행 상태
- 메인 랜딩의 다수 UI/모션 구현이 이미 반영되어 있음
- 최근 집중 작업 영역:
  - Section 01b 카드 프레임/슬라이드 인터랙션
  - Section 03 투자 입력 모달, dim, 숫자 입력 시퀀스, 카드 값 반영
  - 메인 섹션 인터랙션을 `test3`에서도 동일하게 재생하기 위한 공유 초기화 구조 정리
  - 기존 Section 02 제거 및 백업 파일 분리
- 비시각 문서 현실화 작업:
  - 현재 README/research/plan을 실제 코드 상태에 맞게 갱신

## 참고 파일
- [AGENTS.md](/Users/hanwha/Documents/GitHub/plus-web-design/AGENTS.md)
  - 프로젝트 작업 규칙
- [research.md](/Users/hanwha/Documents/GitHub/plus-web-design/research.md)
  - 현재 코드베이스 구조 및 검증 결과
- [plan.md](/Users/hanwha/Documents/GitHub/plus-web-design/plan.md)
  - 현재 상태 기준 계획/정리 문서
