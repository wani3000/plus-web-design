import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger);

// ==========================================
// Dynamic size setup for white-fill hole
// ==========================================

function getPhoneDimensions() {
  const scale = window.innerWidth <= 1400 ? 0.7 : 1;
  return {
    width: 390 * scale,
    height: 844 * scale,
    borderRadius: 52 * scale
  };
}

// Set initial white-fill shape to match phone frame
const dims = getPhoneDimensions();
gsap.set(".white-fill", { 
  width: dims.width, 
  height: dims.height, 
  borderRadius: dims.borderRadius,
  xPercent: -50,
  yPercent: -50
});

const tl = gsap.timeline({
  scrollTrigger: {
    trigger: "#hero-section",
    start: "top top",
    end: () => "+=" + (window.innerHeight * 2.5), // 250vh — 딤+텍스트 구간까지 여유 확보
    pin: true,
    scrub: 0.4,
  }
});

// 카드 오버레이 텍스트 초기 상태 명시
gsap.set(".card-overlay-text", { opacity: 0, y: 20 });

// Total timeline duration = 100 (percentage-based mapping)

// ==========================================
// SCROLL PHASE 1: White fill + phone shrink (0% → 40%)
// ==========================================

// Animation A: white-fill의 구멍 크기를 폰 프레임과 똑같이 축소
tl.to(".white-fill", {
  scale: 0.667,
  ease: "none",
  duration: 50
}, 0);

// Animation A-2: white-fill 그림자(흰 배경) 확산
tl.fromTo(".white-fill",
  { boxShadow: "0 0 0 0px #ffffff" },
  { boxShadow: "0 0 0 200vmax #ffffff", ease: "none", duration: 40 },
  0
);

// Animation B: phone-frame → 카드 크기(260px)로 점진 축소 (전체 50 duration)
// 260 / 390 ≈ 0.667 — white-fill 확장이 끝나는 시점에 카드 크기와 일치
tl.to(".phone-frame", {
  scale: 0.667,
  ease: "none",
  duration: 50
}, 0);

// ==========================================
// SCROLL PHASE 2: 카드 등장 (40% → 90%)
// ==========================================

// Animation E: cards-container를 보이게 해 left/right 카드 등장 준비
// phone-frame이 곧바로 센터 카드 역할을 하므로 card-center는 숨김 유지
tl.to(".cards-container", {
  opacity: 1,
  ease: "none",
  duration: 10
}, 40);

// phone-frame & white-fill border-radius 전환: 폰 모양 → 카드 모양(24px)
tl.to(".phone-frame, .white-fill", {
  borderRadius: "24px",
  ease: "none",
  duration: 10
}, 40);

// Animation F: 좌측 카드 슬라이드인 (48% → 70%)
tl.fromTo(".card-left",
  { opacity: 0, scale: 1.3, x: -80 },
  { opacity: 1, scale: 1, x: 0, ease: "none", duration: 22 },
  48
);

// Animation G: 우측 카드 슬라이드인 (55% → 75%)
tl.fromTo(".card-right",
  { opacity: 0, scale: 1.3, x: 80 },
  { opacity: 1, scale: 1, x: 0, ease: "none", duration: 20 },
  55
);

// ==========================================
// SCROLL PHASE 3: card-left 딤 + 텍스트 등장 (65% → 90%)
// ==========================================

// card-left 이미지 위 딤 오버레이
tl.to(".card-left .img-overlay", {
  backgroundColor: "rgba(0, 0, 0, 0.55)",
  ease: "none",
  duration: 15
}, 65);

// 딤 이후 텍스트 슬라이드업
tl.to(".card-overlay-text", {
  opacity: 1,
  y: 0,
  ease: "power2.out",
  duration: 15
}, 72);

// 90%~100% idle — 언핀 전 여유 구간
