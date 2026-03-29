# plus-web-design

## 프로젝트 개요
이 저장소는 PI(자산공식) 콘셉트의 랜딩 경험을 실험하는 정적 Vite 웹 프로젝트다. 현재 확인된 범위는 세 개의 독립적인 스크롤 애니메이션 엔트리 페이지와 이를 구동하는 클라이언트 사이드 JavaScript, CSS, 정적 에셋, GitHub Pages 배포 설정까지다. 서버, 데이터베이스, ORM, 내부 API는 현재 코드베이스에서 확인되지 않았다.

## 현재 작업 컨텍스트
- 초기 운영 세팅 완료, 후속 비UI 작업 시작 단계
- Jira 대표/하위 태스크 구조 생성 완료
- 첫 비UI 태스크 `SCRUM-29` 문서화 및 코드베이스 분석 완료
- UI 관련 작업은 개발자 승인 전까지 보류

## 핵심 디렉토리 구조
- `/Users/hanwha/Documents/GitHub/plus-web-design/index.html`
  - 메인 랜딩 실험 엔트리
- `/Users/hanwha/Documents/GitHub/plus-web-design/test2.html`
  - iPhone 스크롤 시뮬레이션 실험 엔트리
- `/Users/hanwha/Documents/GitHub/plus-web-design/test3.html`
  - 카드 리빌 실험 엔트리
- `/Users/hanwha/Documents/GitHub/plus-web-design/main.js`
  - 메인 엔트리 애니메이션 로직
- `/Users/hanwha/Documents/GitHub/plus-web-design/test2.js`
  - 테스트 2 애니메이션 로직
- `/Users/hanwha/Documents/GitHub/plus-web-design/test3.js`
  - 테스트 3 애니메이션 로직
- `/Users/hanwha/Documents/GitHub/plus-web-design/style.css`
  - 공통 스타일과 메인 엔트리 스타일
- `/Users/hanwha/Documents/GitHub/plus-web-design/test2.css`
  - 테스트 2 전용 스타일
- `/Users/hanwha/Documents/GitHub/plus-web-design/test3.css`
  - 테스트 3 전용 스타일
- `/Users/hanwha/Documents/GitHub/plus-web-design/src/components/Header.js`
  - 메인 엔트리에서 삽입하는 공통 헤더 조각
- `/Users/hanwha/Documents/GitHub/plus-web-design/public/`
  - 이미지, 비디오, 아이콘 등 정적 에셋
- `/Users/hanwha/Documents/GitHub/plus-web-design/font/`
  - 로컬 폰트 파일
- `/Users/hanwha/Documents/GitHub/plus-web-design/.github/workflows/deploy-pages.yml`
  - GitHub Pages 배포 워크플로

## 기술 스택 요약
- Node.js + npm
- Vite 8
- Vanilla JavaScript (ES modules)
- GSAP 3.14
- Plain CSS
- GitHub Pages 배포

## 에이전트 역할 분담
- Agent-1
  - `SCRUM-26` 대표 태스크 총괄
  - `SCRUM-29` 문서화 및 저장소 운영 기준 수립
  - 후속 비UI 태스크 우선 처리

## 작업 진행 상태
- 진행 중 대표 태스크
  - `SCRUM-26` plus-web-design repository governance and delivery foundation
- 완료된 하위 태스크
  - `SCRUM-29` `[INFRA] Audit build outputs and establish agent documentation baseline`
- 대기 중 다음 비UI 태스크
  - `SCRUM-30` `[INFRA] Add repeatable repository verification workflow`
  - `SCRUM-32` `[FE] Consolidate GSAP loading strategy across test entries`
  - `SCRUM-33` `[FE] Add non-visual runtime guards for DOM-dependent animations`
  - `SCRUM-35` `[INFRA] Validate GitHub Pages deployment path and operational flow`
  - `SCRUM-36` `[INFRA] Audit heavy font and media assets for delivery risk`

## UI 승인 대기 목록
- `SCRUM-31` `[UI] Review and approve landing page visual change scope`
- `SCRUM-34` `[UI] Refine landing page content, layout, and style consistency`
- `SCRUM-37` `[UI] Approve visual tradeoffs for font and media optimization`

## 참고 파일
- `/Users/hanwha/Documents/GitHub/plus-web-design/AGENTS.md`
  - 프로젝트 컨벤션 및 팀 규칙
- `/Users/hanwha/Documents/GitHub/plus-web-design/research.md`
  - 시스템 구조와 코드베이스 분석
- `/Users/hanwha/Documents/GitHub/plus-web-design/plan.md`
  - Jira 구조, 구현 계획, 반복 로그
