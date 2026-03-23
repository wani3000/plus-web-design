# PI Landing — 스크롤 애니메이션 랜딩 페이지 프로토타입

GSAP ScrollTrigger를 활용한 고품질 스크롤 애니메이션 랜딩 페이지 프로토타입입니다.
한국 핀테크 플랫폼 **PI (자산공식)** 를 위한 세 가지 인터랙션 방식을 실험적으로 구현했습니다.

---

## 데모 구성

### Test 1 — 갤러리 플로팅 애니메이션 (`index.html`)
- 중앙 메인 이미지가 스크롤에 따라 축소되며 갤러리로 전환
- 좌우 이미지들이 화면 밖에서 날아와 배치
- 히어로 타이틀 페이드아웃과 연동

### Test 2 — iPhone 앱 스크롤 시뮬레이션 (`test2.html`)
- 실제 iPhone 프레임이 스크롤 시 화면 아래에서 등장
- 앱 내부 화면이 자연스럽게 스크롤되며 3개의 목업 화면 전환
- 마우스 위치에 따른 3D 틸트 효과 (GSAP quickTo)
- 배경 영상 블러 연동

### Test 3 — 카드 리빌 (Revolut 스타일) (`test3.html`)
- 화이트 필 오버레이가 clip-path 애니메이션으로 확장
- 핀 고정 섹션에서 좌·중·우 카드가 순차적으로 등장
- Revolut 스타일의 멀티 카드 UI 인터랙션

---

## 기술 스택

| 분류 | 기술 |
|------|------|
| 빌드 도구 | Vite 8 |
| 애니메이션 | GSAP 3.14 + ScrollTrigger |
| 언어 | Vanilla JavaScript (ES Module) |
| 스타일 | CSS3 (clip-path, 3D transform, will-change) |
| 폰트 | Pretendard Variable (Korean), Outfit (Google Fonts) |

---

## 시작하기

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview
```

개발 서버 실행 후 브라우저에서 `http://localhost:5173` 접속

---

## 파일 구조

```
pi-landing/
├── index.html        # Test 1 — 갤러리 플로팅
├── test2.html        # Test 2 — iPhone 앱 시뮬레이션
├── test3.html        # Test 3 — 카드 리빌
├── main.js           # Test 1 애니메이션 스크립트
├── test2.js          # Test 2 애니메이션 스크립트
├── test3.js          # Test 3 애니메이션 스크립트
├── style.css         # 공통 + Test 1 스타일
├── test2.css         # Test 2 전용 스타일
├── test3.css         # Test 3 전용 스타일
└── public/           # 정적 이미지·영상 에셋
```

---

## 주요 구현 포인트

- **핀 스크롤**: `ScrollTrigger.pin`으로 섹션을 고정한 뒤 스크롤 진행도(0~1)로 타임라인 제어
- **3D 틸트**: `gsap.quickTo()`로 마우스 이동에 부드럽게 반응하는 rotateX/Y 효과
- **clip-path 애니메이션**: CSS clip-path를 GSAP으로 보간하여 화이트 필 트랜지션 구현
- **성능 최적화**: `will-change: transform` 적용, GPU 가속 속성만 사용
