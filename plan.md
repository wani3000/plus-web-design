# plan.md

## Current Objective
- 데스크톱/태블릿/모바일 UI를 변경하지 않고 코드베이스를 정리합니다.
- 목표:
  - 사용 중인 파일/자산만 남기기
  - 문서를 현재 구조 기준으로 재작성하기
  - 빌드 검증까지 완료하기

## Constraints
- UI 변경 금지
- 애니메이션/레이아웃/카피 배치 변경 금지
- `dist/` 직접 수정 금지

## Execution Plan
1. 활성 런타임과 자산 참조를 다시 점검한다.
2. 미사용 자산을 삭제한다.
3. `README.md`, `research.md`, `plan.md`, `handoff.md` 를 현재 구조 기준으로 재작성한다.
4. `npm run build` 로 정리 결과를 검증한다.
5. GitHub Actions deprecated action runtime 경고를 줄이기 위해 업그레이드 가능한 액션부터 최신으로 올린다.

## Progress
- [x] 활성 런타임 파일 재점검
- [x] `public/` 자산 참조 재점검
- [x] 미사용 자산 식별 (`public/.DS_Store`)
- [x] 문서 재작성
- [x] 미사용 자산 삭제
- [x] 최종 빌드 검증
- [x] 브라우저 탭 title을 `앞서가는 부모들의 자산공식, 파이`로 정리
- [x] `actions/checkout` / `actions/setup-node` 를 최신 major로 업그레이드
- [x] 공식 Pages 액션 체인 전환 시도 및 권한 한계 문서화

## Expected End State
- 홈 단일 엔트리 구조가 문서와 일치
- 미사용 `public` 파일 제거 완료
- 현재 알려진 경고만 유지
