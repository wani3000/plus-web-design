# plus-web-design

## 프로젝트 개요
이 저장소는 PI(자산공식) 콘셉트의 정적 랜딩 프로토타입이다. 현재 검증된 현실은 Vite 기반 멀티 엔트리 사이트이며, 세 개의 엔트리 페이지가 각각 독립된 실험/시안 역할을 한다. 서버, 데이터베이스, ORM, 내부 API는 현재 코드베이스에서 확인되지 않았고, 동작의 중심은 GSAP 기반 스크롤/등장 애니메이션과 정적 이미지·비디오 자산이다.

## 현재 작업 컨텍스트
- 문서 초기 세팅 단계는 끝났고, 실제 랜딩 UI/모션 구현이 상당 부분 반영된 상태다.
- 현재 소스 오브 트루스는 루트 엔트리 파일과 정적 자산이다.
- 최근 작업은 `test1(index.html)` 기준 히어로 one-shot 전환, Section 01B 카드 레일 시작 타이밍 조정, Section 03 카드 카피/컴포넌트 재배치, Section 04 카드 단순화, 테스트1 전용 푸터 교체에 집중되어 있다.
- 최근 공통 작업으로 모바일 전용 헤더, 모바일 히어로 축약, `plus-typography.css` 기반 타이포 토큰, 모바일 카드 레이아웃 정비가 추가됐다.
- 테스트1 `Section 04`의 다자녀 자산관리 카드는 카드 내부에서만 보이도록 clipping 처리되어 있고, 현재 배지 3개는 카드 본체보다 더 아래로 미세조정된 상태다.
- 테스트1 `Section 04`의 다자녀 자산관리 카드는 섹션 진입 시 회색 카드 하단 안쪽에서 위로 올라오고, 최종적으로 카드 상단 `45px` 아래, 기존 중심축보다 오른쪽 `110px` 이동한 위치에 정착한다. 배지 3개는 숨겨진 상태에서 `20px` 아래에서 현재 위치로 올라온다.
- 테스트1 `Section 04`의 배지 3개는 하단 카피 gradient보다 높은 레이어에 두어, gradient에 덮이지 않게 유지한다.
- 테스트1 `Section 04`의 배지 3개는 카드 진입 후 약 `0.65초` 뒤, 가장 왼쪽 배지를 고정한 채 초록/파랑 배지가 오른쪽으로 펼쳐져 최종 `10px` 간격 상태가 된다.
- 테스트1 `Section 04`의 하늘색 `김첫째` 배지는 Pencil `oFssN` 기준으로 orange gradient outer stroke, inner white stroke, orange shadow를 CSS로 직접 재현한다.
- 테스트1 `Section 04`의 하늘색 `김첫째` 배지는 gradient stroke를 mask 기반 ring으로 그려, gradient 안쪽의 회색 얇은 라인이 보이지 않도록 정리했다.
- 테스트1 `Section 04`의 배지 3개 레이어 순서는 회색 배지 하단, 초록 배지 중간, 하늘색 selected 배지 최상단이다.
- 테스트1 `Section 04`의 배지 상태는 spread 후 `0.45초` 뒤 하늘색 `김첫째`와 초록 `김둘째` 사이를 번갈아 이동한다.
- 테스트1 `Section 04`의 `증여금을 투자로 연결해요` 카드에는 테스트2 `Section 02`의 흰/초록/빨강 박스 낙하 컴포넌트와 동일한 물리 애니메이션이 이식되어 있으며, 테스트2 자산(`ic_box_red.png`, `ic_box_green.png`, `ic_box_white.png`)을 그대로 사용한다. 이식본은 test1에서 1회만 재생되고, 착지 후 그대로 유지되며 사라지지 않는다.
- 테스트1 `Section 04`의 낙하 박스 3개는 현재 `120x120`, 내부 아이콘은 비례 축소된 `69x69` 규격이다.
- 테스트1 `Section 04`의 `증여금을 투자로 연결해요` 카드는 현재 3박스 구성만 유지하며, 전면 정적 박스는 제거된 상태다.
- 테스트1 `Section 04`의 뒤 레이어 박스 위치는 현재 비대칭이다. 빨강 박스는 기존 기준보다 `40px` 위, 초록 박스는 기존 기준보다 `120px` 위로 올린 상태다.
- 테스트1 `Section 04`의 초록 박스는 현재 위치에서 추가로 `5px` 오른쪽으로 이동한 상태다.
- 테스트1 `Section 04` 이식본의 낙하 순서는 현재 `흰 박스 → 빨강 박스 → 초록 박스`다. 테스트2 원본 순서와는 분리되어 있다.
- 테스트1 `Section 04`의 3박스 스택은 카드 시각 중심에 맞도록 전체적으로 왼쪽으로 이동해 재중앙 정렬됐다.
- 테스트1 `Section 04`의 `증여 계획부터 시작해요` 카드 plan widget은 초기 `증여세 신고 금액 / 5,000,000원`, `신고해야 할 금액 / 5,000,000원` 상태를 먼저 노출한 뒤, 약 `2초` 후 시작되는 `2.5초` 동안 상단 금액만 `20,000,000원`으로 확장되고 진한 주황 progress fill이 끝까지 차오른다. 그 상태로 `5초` 유지된 뒤 위젯이 사라지고, 아래에서 0 상태 위젯이 다시 올라오며 동일 시퀀스를 반복한다.
- 테스트1 `Section 03`의 `장기 투자에 적합한 선택, 미국 ETF` 카드는 `VOO / QQQM / XLK` 3개 종목 카드로 구성되며, 각 카드에는 원화 평가금액과 빨간색 수익 문구가 표시된다. ETF 로고는 현재 `public/ic_logo_etf.png`를 사용한다. 이 카드 3장은 위에서 한 번 떨어져 착지한 뒤 그대로 유지되며, 이후 우측 총액/수익/수익률은 `5.00%`에서 시작해 `5초`마다 `+1.5%`씩 올라 `12.00%`에서 멈춘다.
- 모든 `Google Play` / `App Store` 버튼은 클릭 시 dimmed 처리된 공통 팝업을 열고, 앱 이름 `파이`와 QR 코드, 스토어명, 닫기 버튼을 보여준다. QR은 각 스토어 링크를 기준으로 생성한다. 팝업은 닫힐 때 패널 transform을 쓰지 않고 opacity만 바꿔서 흔들림을 줄인다.
- 팝업은 `src/initStoreDownloadModal.js`에서 전역으로 바인딩되며, test1/test2/test3의 모든 `.store-button`에 동일하게 적용된다.
- 팝업을 닫을 때는 트리거 버튼으로 포커스를 돌리되 `preventScroll`을 사용해 화면 흔들림을 막는다.
- 테스트1의 애니메이션이 있는 회색 카드 8개는 현재 모두 `제목/chip -> 설명문 -> 내부 모션` 순서로 시작한다. 카드 내부 애니메이션이 반복되는 경우에도 제목과 설명문은 섹션 진입 시 1회만 먼저 등장한다.
- 테스트1의 회색 카드 8개 트리거는 현재 공통으로 더 늦춘 `top 68%` 기준을 사용해, 카드가 실제로 더 내려온 뒤에 텍스트/애니메이션이 시작되도록 조정된 상태다.
- 같은 시점에 다자녀 카드 상단 사람 이미지는 선택 자녀에 맞춰 `bg_image_02`와 `bg_image_01` 사이를 전환한다.
- 배지들은 현재 `김첫째(7,500,000원)` folded 상태를 `4초` 유지한 뒤 펼쳐지고, `김둘째(5,000,000원)`로 전환된 뒤 다시 접혀 `4초` 유지한다. 이후 다시 펼쳐 `김첫째`로 전환되고 같은 루프를 반복한다.
- 모바일에서는 데스크톱 헤더의 `테스트1/테스트2/테스트3` 네비게이션과 섹션 스크롤 애니메이션을 숨기고, 모바일 전용 헤더와 단일 히어로만 보여준다.
- 모바일 히어로는 20px 패딩 기준의 단일 메인 비디오로 축약되며, 헤더 아래 첫 화면에서 꽉 차게 보이도록 설정된다.
- 모바일에서는 섹션 타이틀과 서브타이틀의 크기를 각각 28px / 18px으로 통일하고, 타이틀-서브타이틀 간격은 16px로 맞춘다.
- 모바일 `Section 01` 말풍선 텍스트는 예외로 15px을 사용한다.
- 모바일 `Section 03`의 `첫번째~네번째 공식` chip은 카드 우측이 아니라 타이틀 위 8px 간격으로 배치된다.
- 모바일 `Section 03`의 각 카드 내부 그래픽은 현재 데스크톱 대비 65% 크기로 축소된다.
- 모바일 `Section 03` 카드 내부 패딩은 상하좌우 모두 20px이다.
- 모바일 `Section 03`과 `Section 04` 카드 높이는 모두 500px로 맞춘다.
- 모바일 `Section 03`과 `Section 04` 카드 내부 텍스트는 원래 크기를 유지하되, 텍스트 블록 폭을 카드 안으로 제한해 overflow를 막는다.
- 모바일 `Section 04`의 `증여 계획부터 시작해요`, `증여금을 투자로 연결해요`, `증여세 신고까지 끝내요`, `쉬운 자녀관리` 카드 내부 그래픽/컴포넌트는 현재 데스크톱 대비 70% 크기로 축소된다.
- 모바일 `증여세 신고까지 끝내요`와 `쉬운 자녀관리` 카드는 카피 블록을 하단 고정하지 않고, 다른 카드처럼 상단 정렬로 배치한다.
- 모바일 `Section 05 intro`의 두 정보 카드는 2열이 아니라 1열 상하 스택으로 배치된다.
- 모바일 `우리 아이 첫 번째 자산, 함께 만들어가요` CTA는 스토어 2버튼 대신 `plus-web-marketing`의 `파이 시작하기` 단일 `앱 다운로드` 버튼 스타일을 사용한다.
- 모바일 주요 섹션 타이틀은 전용 줄바꿈을 사용한다. 현재 `아이 자산...`, `파이가 자산관리의 시작을...`, `일찍부터 증여해서...`, `증여부터 투자...`가 적용 상태다.
- 히어로 카피 `앞서가는 부모들의 자산 공식`은 현재 데스크톱/모바일 모두 메인 히어로 이미지 정중앙에 흰색 오버레이로 배치된다.
- 히어로 메인 비디오는 `source` 태그 + poster/fallback 이미지 구조를 사용하며, 실제 재생 가능 시점(`canplay/playing`)까지 fallback 이미지를 유지해 모바일에서 파일명 placeholder나 검은 플래시가 드러나는 시간을 줄인다.
- 배포는 GitHub Pages와 Vercel 둘 다 사용 중이며, 로컬 검증 기본 루프는 `npm run verify`다.

## 핵심 디렉토리 구조
- [index.html](/Users/chulwan/Documents/GitHub/plus-web-design/index.html)
  - 메인 PI 랜딩 엔트리
- [main.js](/Users/chulwan/Documents/GitHub/plus-web-design/main.js)
  - `index.html` 전용 헤더/히어로/자동스크롤 로직
- [src/initSectionsTest1.js](/Users/chulwan/Documents/GitHub/plus-web-design/src/initSectionsTest1.js)
  - `index.html` 전용 섹션 인터랙션 초기화 모듈
- [src/initSectionsTest2.js](/Users/chulwan/Documents/GitHub/plus-web-design/src/initSectionsTest2.js)
  - `test2.html` 전용 섹션 인터랙션 초기화 모듈
- [src/initSectionsTest3.js](/Users/chulwan/Documents/GitHub/plus-web-design/src/initSectionsTest3.js)
  - `test3.html` 전용 섹션 인터랙션 초기화 모듈
- [section-02-backup.html](/Users/chulwan/Documents/GitHub/plus-web-design/section-02-backup.html)
  - 제거한 Section 02 마크업 백업
- [style.css](/Users/chulwan/Documents/GitHub/plus-web-design/style.css)
  - 메인 엔트리 전역/섹션 스타일
- [plus-typography.css](/Users/chulwan/Documents/GitHub/plus-web-design/plus-typography.css)
  - 공통 타이포 토큰과 텍스트 클래스
- [test2.html](/Users/chulwan/Documents/GitHub/plus-web-design/test2.html)
  - 메인 랜딩 변형 엔트리
  - `Section 02`가 포함된 전체 페이지
- [test2.js](/Users/chulwan/Documents/GitHub/plus-web-design/test2.js)
  - `test2.html` 전용 히어로/섹션 엔트리 스크립트
- [test2.css](/Users/chulwan/Documents/GitHub/plus-web-design/test2.css)
  - 과거 실험 페이지용 스타일 잔재
- [test3.html](/Users/chulwan/Documents/GitHub/plus-web-design/test3.html)
  - 카드 리빌 실험 엔트리
- [test3.js](/Users/chulwan/Documents/GitHub/plus-web-design/test3.js)
  - test3 인터랙션 로직
- [test3.css](/Users/chulwan/Documents/GitHub/plus-web-design/test3.css)
  - test3 전용 스타일
- [src/components/Header.js](/Users/chulwan/Documents/GitHub/plus-web-design/src/components/Header.js)
  - 메인 엔트리에서 삽입하는 공통 헤더 조각
- [/Users/chulwan/Documents/GitHub/plus-web-design/public](/Users/chulwan/Documents/GitHub/plus-web-design/public)
  - 배포 대상 이미지, 비디오, 아이콘 등 정적 자산
- [/Users/chulwan/Documents/GitHub/plus-web-design/font](/Users/chulwan/Documents/GitHub/plus-web-design/font)
  - 로컬 폰트 파일
- [/Users/chulwan/Documents/GitHub/plus-web-design/.github/workflows/deploy-pages.yml](/Users/chulwan/Documents/GitHub/plus-web-design/.github/workflows/deploy-pages.yml)
  - GitHub Pages 배포 워크플로

## 엔트리 분기 구조
- 테스트1: [index.html](/Users/chulwan/Documents/GitHub/plus-web-design/index.html)
  - 현재 주 작업 대상
  - [main.js](/Users/chulwan/Documents/GitHub/plus-web-design/main.js) + [src/initSectionsTest1.js](/Users/chulwan/Documents/GitHub/plus-web-design/src/initSectionsTest1.js) 조합
  - 히어로는 one-shot 전환
  - 갤러리 전환 후 `Section 01`로 자동 스크롤
  - 히어로 우측 하단 카드가 `section-02-left-video.mp4` 비디오로 표시됨
  - `Section 02`는 제거된 상태
  - 테스트1 전용 푸터 사용, desktop/mobile 모두 로컬 `io_pi.png` 로고 사용
  - 모바일에서는 desktop hero timeline을 끄고, `mobile-header`와 단일 hero video만 사용
- 테스트2: [test2.html](/Users/chulwan/Documents/GitHub/plus-web-design/test2.html)
  - `Section 02`가 포함된 전체 페이지 변형
  - [test2.js](/Users/chulwan/Documents/GitHub/plus-web-design/test2.js) + [src/initSectionsTest2.js](/Users/chulwan/Documents/GitHub/plus-web-design/src/initSectionsTest2.js) 조합
  - 히어로는 dim/text가 있는 scrub 버전
  - 기존 공용 푸터 유지
  - 모바일에서는 scrub hero와 section motion을 끄고, `mobile-header`만 사용
- 테스트3: [test3.html](/Users/chulwan/Documents/GitHub/plus-web-design/test3.html)
  - phone-to-card reveal 실험 페이지
  - [test3.js](/Users/chulwan/Documents/GitHub/plus-web-design/test3.js) + [src/initSectionsTest3.js](/Users/chulwan/Documents/GitHub/plus-web-design/src/initSectionsTest3.js) 조합
  - 하단에 메인 섹션 구조가 붙어 있음
  - 기존 공용 푸터 유지
  - 모바일에서는 reveal motion을 끄고, `mobile-header`만 사용

## 테스트1 구조
- Hero
  - 고정 헤더 아래 첫 화면 히어로
  - 좌측 PI 로고 클릭 시 랜딩 최상단 새로고침
  - 스크롤 1회 입력으로 1.3초 동안 갤러리 상태로 전환
  - 전환 후 `Section 01` 위치로 1.3초 동안 자동 스크롤
- Section 01
  - `아이 자산 어떻게 관리하고 계신가요?`
  - 랜덤 배치 말풍선과 hover 인터랙션
- Section 01b
  - 회색 배경 후속 섹션
  - `파이가 자산관리의 시작을 도와드릴게요`
  - 중앙 고정 white stroke 프레임과 다수 카드 슬라이드 애니메이션
  - 현재 카드 레일 등장 트리거는 `top bottom` 기준으로 시작
- Section 03
  - 4가지 공식 카드
  - 최신 테스트1 카드 타이틀:
    - `증여재산공제에 맞춰 10년 주기로 계획`
    - `유기정기금 증여하고 장기 투자`
    - `장기 투자에 적합한 선택, 미국 ETF`
    - `증여세 신고는 필수!`
  - 공제 한도 차트, 유기정기금 수치 애니메이션, ETF 카드, 신고 서류 안내 문서 카드
- 테스트1의 `증여세 신고는 필수!` 카드에서는 흰색 면과 내부 제목이 먼저 함께 슬라이드업하고, 이어서 `통장 거래내역서`, `증여금 평가 명세서` 항목이 순차적으로 올라온다. 체크리스트가 다 올라온 뒤 `2초` 후에는 해당 화면이 사라지고, Pencil `mEPLU` 기준의 `신고 접수 완료` 완료 카드가 아래에서 다시 올라온다. 완료 카드 안에서는 체크 아이콘이 먼저 올라오고, 이어서 타이틀과 본문이 순차적으로 올라온다. 완료 상태는 `5초` 유지된 뒤 흰색 면 전체가 아래로 사라지고, 다시 아래에서 올라오며 같은 시퀀스를 무한 반복한다.
  - 테스트1에서는 ETF 카드와 투자 입력 카드의 위치/애니메이션 바인딩이 서로 교체된 상태다
- Section 04
  - 기능 소개 카드 묶음
  - 신고 금액 카운트와 핵심 기능 카드 중심 구성
  - 테스트1에서는 인사이트 리스트와 하단 투자 마키 컴포넌트를 제거한 상태다
  - 테스트1에서는 회색 카드 4장 모두 제목/설명문이 먼저 나타난 뒤 내부 애니메이션이 시작된다
  - `쉬운 자녀관리` 카드에는 Figma `222:695`를 바탕으로 한 가족/증여 관리 모바일 요약 컴포넌트가 들어간 상태다
  - 같은 카드 하단 텍스트 영역의 gradient overlay는 현재 제거된 상태다
  - 같은 카드의 상단 `375x324` 영역은 별도 이미지(`bg_image_02.png`)로 시작하고, 전환 시 `bg_image_01.png`로 바뀌며, 그 아래 흰 시트/타이틀은 HTML/CSS로 직접 구현되어 `300px`부터 겹쳐 올라오게 배치한다
  - 같은 카드의 시트 내부에는 제목 아래 `24px` 간격으로 Pencil `Rz6CN` 기반 신고 금액 요약 컴포넌트가 직접 구현되어 있다
  - 이 요약 컴포넌트의 금액은 현재 선택 배지와 연동되어, 초기 `김첫째` 상태에서 `5,000,000원`, `김둘째` 선택 전환 후 `7,400,000원`으로 두 줄 모두 함께 바뀐다
  - `김둘째`로 전환될 때는 제목과 신고 금액 요약 컴포넌트가 아래에서 위로 다시 한 번 슬라이드업한다
  - 같은 카드 상단의 `KfAFw`, `YXDXl`, `BGdYD` 배지는 80x80 원형 배지로 재현했고, `KfAFw` 내부 연필 아이콘은 `public/ic24_pencil2.png`를 사용한다. 이 배지 3개는 카드 컴포넌트 위 레이어에서 서로 크게 포개지도록 겹쳐 배치되며, 현재 카드와 함께 위로 10% 올려진 상태다
- Section 05
  - 다운로드 CTA
- Footer
  - 테스트1은 Figma 기반 브랜드형 푸터
  - `Pi` + 카피, `PLUS/한화생명` 로고, 스토어 버튼, 소셜 아이콘 구성

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
- 세 엔트리는 런타임 초기화 기준으로 분리되어 있음
- 최근 집중 작업 영역:
  - 테스트1 히어로 one-shot 전환 및 자동 스크롤 속도 조정
  - 테스트1 `Section 01B` 카드 레일 초기 순서 고정
  - 테스트1 `Section 04` 카드 위치 교환 및 애니메이션 타겟 분리
  - 테스트1 `Section 04` 카드 설명 문구 종결형(마침표) 반영: `증여 계획부터 시작해요`, `증여금을 투자로 연결해요`
  - 모바일 전용 헤더/히어로/카드 레이아웃 규칙 정비
  - 테스트1 전용 푸터 교체 및 로컬 로고/스토어/소셜 컴포넌트 정리
- `section-02-backup.html`는 삭제된 테스트1용 Section 02 백업으로 유지

## 참고 파일
- [AGENTS.md](/Users/chulwan/Documents/GitHub/plus-web-design/AGENTS.md)
  - 프로젝트 작업 규칙
- [research.md](/Users/chulwan/Documents/GitHub/plus-web-design/research.md)
  - 현재 코드베이스 구조 및 검증 결과
- [plan.md](/Users/chulwan/Documents/GitHub/plus-web-design/plan.md)
  - 현재 상태 기준 계획/정리 문서

- The first `Section 03` chart card needed an extra mobile-only horizontal correction because the chart artwork itself has more empty space on the right than the left; its chart block is now nudged right so it reads visually centered in the card.

- The mobile ETF stack in `장기 투자에 적합한 선택, 미국 ETF` also needed a card-specific correction because the rotated stack is visually right-heavy; the ETF stage is now nudged slightly left inside the card.

- On mobile, the subtitle-to-graphic gap for `두번째 공식`, `세번째 공식`, and `쉬운 자녀관리` now resolves to `20px` at the actual visible graphic start rather than only at the wrapper level.

- The mobile `쉬운 자녀관리` card copy now stays above the graphic again; the flow-based family app group keeps the copy block first and the badge/app visuals after it.

- On mobile, all `Section 04` gray cards now use a fixed `500px` height instead of a growable minimum height, and the `쉬운 자녀관리` app graphic is clipped by the card bottom so it ends flush with the gray card edge.
- Mobile `쉬운 자녀관리` card uses absolute-positioned badges/app graphic again so the fixed 500px card clips from the bottom instead of flow-layout clipping the visual early.
- Mobile `쉬운 자녀관리` card now preserves the sheet's 24px top padding and instead lifts the whole app visual 20px so the summary sits higher without losing the white top spacing.
- Mobile `쉬운 자녀관리` top photo alone is shifted 20px downward; the white sheet body remains at its original start position so only the image spacing changes.
- The `쉬운 자녀관리` app photo now uses the same 24px top corner radius as the white summary sheet.
- On mobile, the `증여세 신고까지 끝내요` amount card is centered both horizontally and vertically within the gray card and enlarged from 0.7x to 0.84x, with the auxiliary logo card hidden.
- On mobile, the `증여 계획부터 시작해요` widget now restores the desktop card proportions instead of inheriting the 1100px breakpoint variant; it is absolutely centered with desktop font sizes (24/20/20).
- Restored the mobile `증여세 신고까지 끝내요` HomeTax logo sub-card and anchored it to the bottom-right while keeping the amount card centered.
- The mobile `증여 계획부터 시작해요` widget is now scaled to 80% while its wrapper width expands to `calc(100% - 10px)` so the block reads wider without changing its proportions.
- Mobile `증여금을 투자로 연결해요` box stack is enlarged by 15%, changing the visual scale from `0.7` to `0.805`.
- Mobile `네번째 공식` (`증여세 신고는 필수!`) document component is now scaled up by 20% (`0.65 -> 0.78`) without changing the 20px subtitle gap or the fixed gray-card height; the enlarged lower portion is intentionally clipped at the card bottom.
- Mobile `세번째 공식` ETF stack no longer applies the old `-12px` card-specific offset; the VOO/QQQM/XLK stack is now aligned to the exact horizontal center of the gray card.
- Direct code review showed the ETF bundle was still right-heavy because the second/third cards keep positive X offsets and rotation, so the visible bounding box center sat to the right of the stage center. Mobile now nudges the whole ETF stage `5.3px` left to place the rendered VOO/QQQM/XLK stack on the actual gray-card center.
- Mobile `증여 계획부터 시작해요` widget is now reduced by an extra 10% relative to the prior mobile state (`scale(0.8) -> scale(0.72)`) while its wrapper width grows by 80px versus the old mobile width (`calc(100% - 10px) -> calc(100% + 70px)`) so clipped text gets more horizontal room.
- On mobile, all eight gray cards in `Section 03` and `Section 04` now use a fixed `480px` height instead of `500px`; lower graphics are allowed to clip at the card bottom rather than resizing the cards.
