import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Header } from './src/components/Header.js'
import { initSharedSections } from './src/initSectionsTest3.js'

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

const heroSection = document.querySelector('#hero-section');
const whiteFill = document.querySelector('.white-fill');
const phoneFrame = document.querySelector('.phone-frame');
const cardsContainer = document.querySelector('.cards-container');
const cardLeft = document.querySelector('.card-left');
const cardCenter = document.querySelector('.card-center');
const cardRight = document.querySelector('.card-right');
const cardCenterFinal = document.querySelector('.card-center .card-bg-final');
const cardLeftOverlay = document.querySelector('.card-left .img-overlay');
const cardOverlayText = document.querySelector('.card-overlay-text');

document.body.insertBefore(Header(), document.body.firstChild);

const headerHeight = document.querySelector('.header')?.getBoundingClientRect().height ?? 72;

if (heroSection) {
  heroSection.style.marginTop = `${headerHeight}px`;
  heroSection.style.height = `calc(100vh - ${headerHeight}px)`;
}

if (heroSection && whiteFill && phoneFrame && cardsContainer) {
  // Set initial white-fill shape to match phone frame
  const dims = getPhoneDimensions();
  gsap.set(whiteFill, {
    width: dims.width,
    height: dims.height,
    borderRadius: dims.borderRadius,
    xPercent: -50,
    yPercent: -50
  });

  if (cardOverlayText) {
    gsap.set(cardOverlayText, { opacity: 0, y: 20 });
  }

  if (cardCenter) {
    gsap.set(cardCenter, { opacity: 0, scale: 0.82 });
  }

  if (cardCenterFinal) {
    gsap.set(cardCenterFinal, { opacity: 0, y: 20 });
  }

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: heroSection,
      start: `top top+=${Math.round(headerHeight)}`,
      end: () => '+=' + (window.innerHeight * 2.5), // 250vh — 딤+텍스트 구간까지 여유 확보
      pin: true,
      scrub: 0.4,
    }
  });

  // Total timeline duration = 100 (percentage-based mapping)

  // ==========================================
  // SCROLL PHASE 1: White fill + phone shrink (0% → 40%)
  // ==========================================

  // Animation A: white-fill의 구멍 크기를 폰 프레임과 똑같이 축소
  tl.to(whiteFill, {
    scale: 0.667,
    ease: 'none',
    duration: 50
  }, 0);

  // Animation A-2: white-fill 그림자(흰 배경) 확산
  tl.fromTo(whiteFill,
    { boxShadow: '0 0 0 0px #ffffff' },
    { boxShadow: '0 0 0 200vmax #ffffff', ease: 'none', duration: 40 },
    0
  );

  // Animation B: phone-frame → 카드 크기(260px)로 점진 축소 (전체 50 duration)
  // 260 / 390 ≈ 0.667 — white-fill 확장이 끝나는 시점에 카드 크기와 일치
  tl.to(phoneFrame, {
    scale: 0.667,
    ease: 'none',
    duration: 50
  }, 0);

  // ==========================================
  // SCROLL PHASE 2: 카드 등장 (40% → 90%)
  // ==========================================

  // Animation E: cards-container를 보이게 해 left/right 카드 등장 준비
  // phone-frame이 곧바로 센터 카드 역할을 하므로 card-center는 숨김 유지
  tl.to(cardsContainer, {
    opacity: 1,
    ease: 'none',
    duration: 10
  }, 40);

  // phone-frame & white-fill border-radius 전환: 폰 모양 → 카드 모양(24px)
  tl.to([phoneFrame, whiteFill], {
    borderRadius: '24px',
    ease: 'none',
    duration: 10
  }, 40);

  // Animation F: 좌측 카드 슬라이드인 (48% → 70%)
  if (cardLeft) {
    tl.fromTo(cardLeft,
      { opacity: 0, scale: 1.3, x: -80 },
      { opacity: 1, scale: 1, x: 0, ease: 'none', duration: 22 },
      48
    );
  }

  // Animation G: 우측 카드 슬라이드인 (55% → 75%)
  if (cardRight) {
    tl.fromTo(cardRight,
      { opacity: 0, scale: 1.3, x: 80 },
      { opacity: 1, scale: 1, x: 0, ease: 'none', duration: 20 },
      55
    );
  }

  // ==========================================
  // SCROLL PHASE 3: card-left 딤 + 텍스트 등장 (65% → 90%)
  // ==========================================

  // card-left 이미지 위 딤 오버레이
  if (cardLeftOverlay) {
    tl.to(cardLeftOverlay, {
      backgroundColor: 'rgba(0, 0, 0, 0.55)',
      ease: 'none',
      duration: 15
    }, 65);
  }

  // 딤 이후 텍스트 슬라이드업
  if (cardOverlayText) {
    tl.to(cardOverlayText, {
      opacity: 1,
      y: 0,
      ease: 'power2.out',
      duration: 15
    }, 72);
  }

  // Hand off from phone frame to the actual center card at the end of the sequence.
  if (cardCenter) {
    tl.to(cardCenter, {
      opacity: 1,
      scale: 1,
      ease: 'none',
      duration: 8
    }, 90);
  }

  tl.to(phoneFrame, {
    opacity: 0,
    ease: 'none',
    duration: 8
  }, 90);

  // Final center image replacement after the card composition is complete.
  if (cardCenterFinal) {
    tl.to(cardCenterFinal, {
      opacity: 1,
      y: 0,
      ease: 'power2.out',
      duration: 15
    }, 90);
  }

  // 90%~100% final state hold — 언핀 전 여유 구간
}

initSharedSections();
requestAnimationFrame(() => ScrollTrigger.refresh());
