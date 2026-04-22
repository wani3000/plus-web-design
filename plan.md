# plan.md

## Current Objective
- `Section 05 intro` 카드의 `자세히 보기`에서 연결되는 상세 페이지 2개를 추가합니다.
- 목표:
  - `guide.html`, `gift-qa.html` 엔트리 추가
  - 모바일/태블릿/데스크톱 조건에 맞는 헤더/푸터 적용
  - 멀티 엔트리 빌드 반영
  - 상세 페이지 초기 아이콘 FOUC 제거
  - 문서 최신화 및 검증 완료

## Constraints
- 새 상세 페이지 외 기존 홈 UI는 유지
- `dist/` 직접 수정 금지

## Execution Plan
1. 현재 헤더/푸터/CTA 링크 구조를 확인한다.
2. 상세 페이지 2개와 공통 `detail.js` 를 추가한다.
3. `style.css` 에 상세 페이지 전용 클래스만 추가한다.
4. `vite.config.js` 에 멀티 엔트리를 반영한다.
5. 문서를 현재 구조에 맞게 갱신한다.
6. `npm run build` 와 preview 응답으로 검증한다.
7. 상세 페이지 초기 스타일 로드 방식을 점검해 FOUC를 제거한다.

## Progress
- [x] 헤더/푸터/CTA 링크 구조 확인
- [x] `guide.html`, `gift-qa.html`, `detail.js` 추가
- [x] `index.html` CTA 링크 연결
- [x] 상세 페이지 전용 CSS 추가
- [x] `vite.config.js` 멀티 엔트리 반영
- [x] build / preview 검증
- [x] 상세 페이지 CSS 선로딩으로 초기 FOUC 제거
- [x] 문서 최신화

## Expected End State
- 홈 + 상세 2개 페이지의 3개 엔트리 구조가 문서와 일치
- 상세 페이지에서 헤더/푸터/타이틀 동작이 viewport별 요구사항과 일치
- 현재 알려진 경고만 유지
