import './style.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Header } from './src/components/Header.js'
import { initStoreDownloadModal } from './src/initStoreDownloadModal.js'
import { initSharedSections } from './src/initSectionsTest1.js'

gsap.registerPlugin(ScrollTrigger);

// Clean up standard Vite text
document.querySelector('#app')?.remove();

// Mount header at the very top of the page
document.body.insertBefore(Header(), document.body.firstChild);

// Keep hero pinning below the fixed header
const headerHeight = document.querySelector('.header')?.getBoundingClientRect().height ?? 72;
const topUiOffset = Math.round(headerHeight);
const heroPinned = document.querySelector('.hero-pinned');
const section01 = document.querySelector('.section-01');

// Set initial states for fly-in images
gsap.set(".img-02, .img-03", { x: "-50vw" });
gsap.set(".img-04, .img-05", { x: "50vw" });
let heroTransitioning = false;
let heroTransitioned = false;
let heroAutoScrolling = false;
let heroAutoScrollTween = null;

const stopHeroAutoScroll = () => {
  if (heroAutoScrollTween) {
    heroAutoScrollTween.kill();
    heroAutoScrollTween = null;
  }
  heroAutoScrolling = false;
};

const runHeroAutoScroll = (targetTop) => {
  stopHeroAutoScroll();
  heroAutoScrolling = true;

  const scrollState = { y: window.scrollY };
  heroAutoScrollTween = gsap.to(scrollState, {
    y: targetTop,
    duration: 0.8,
    ease: 'power3.out',
    onUpdate: () => {
      window.scrollTo(0, Math.round(scrollState.y));
    },
    onComplete: () => {
      heroAutoScrolling = false;
      heroAutoScrollTween = null;
    },
    onInterrupt: () => {
      heroAutoScrolling = false;
      heroAutoScrollTween = null;
    }
  });
};

const getSection01Top = () => {
  if (!section01) return 0;
  return Math.max(0, Math.round(section01.offsetTop - topUiOffset));
};

const isNearSection01Top = () => {
  if (!section01 || !heroTransitioned) return false;
  const targetTop = getSection01Top();
  return window.scrollY >= targetTop - 12 && window.scrollY <= targetTop + 80;
};

const tl = gsap.timeline({
  paused: true,
  defaults: {
    ease: 'power2.out'
  },
  onStart: () => {
    heroTransitioning = true;
  },
  onComplete: () => {
    heroTransitioning = false;
    heroTransitioned = true;
    if (section01) {
      runHeroAutoScroll(getSection01Top());
    }
  },
  onReverseComplete: () => {
    heroTransitioning = false;
    heroTransitioned = false;
    stopHeroAutoScroll();
    window.scrollTo(0, 0);
  }
});

tl.to(".hero-title", {
  opacity: 0,
  y: -50,
  duration: 0.17,
  ease: "power2.out"
}, 0);

tl.to(".img-01", {
  width: "50vh",
  height: "66.6667vh",
  borderRadius: "8px",
  ease: "power2.inOut",
  duration: 0.45
}, 0);

tl.to(".img-02", {
  x: 0,
  opacity: 1,
  duration: 0.43,
  ease: "expo.out"
}, 0.11);

tl.to(".img-03", {
  x: 0,
  opacity: 1,
  duration: 0.43,
  ease: "expo.out"
}, 0.15);

tl.to(".img-04", {
  x: 0,
  opacity: 1,
  duration: 0.43,
  ease: "expo.out"
}, 0.22);

tl.to(".img-05", {
  x: 0,
  opacity: 1,
  duration: 0.43,
  ease: "expo.out"
}, 0.27);

const canTriggerHeroGallery = () => {
  if (!heroPinned || heroTransitioning || heroTransitioned) return false;
  const heroRect = heroPinned.getBoundingClientRect();
  return heroRect.top <= topUiOffset + 4 && heroRect.bottom > window.innerHeight * 0.5;
};

const canResetHeroGallery = () => {
  if (!heroPinned || heroTransitioning || !heroTransitioned) return false;
  if (window.scrollY > 2) return false;
  const heroRect = heroPinned.getBoundingClientRect();
  return Math.abs(heroRect.top - topUiOffset) <= 8 && heroRect.bottom > window.innerHeight * 0.5;
};

const canReturnToHeroFromSection01 = () => {
  if (!heroPinned || heroTransitioning || !heroTransitioned) return false;
  return isNearSection01Top();
};

const triggerHeroGallery = () => {
  if (!canTriggerHeroGallery()) return;
  tl.play(0);
};

const resetHeroGallery = () => {
  if (!canResetHeroGallery()) return;
  heroTransitioning = true;
  tl.reverse();
};

const returnToHeroFromSection01 = () => {
  if (!canReturnToHeroFromSection01()) return;
  stopHeroAutoScroll();
  heroTransitioning = true;
  heroAutoScrolling = true;
  tl.timeScale(1.25).reverse();

  const scrollState = { y: window.scrollY };
  heroAutoScrollTween = gsap.to(scrollState, {
    y: 0,
    duration: 0.56,
    ease: 'power3.out',
    onUpdate: () => {
      window.scrollTo(0, Math.round(scrollState.y));
    },
    onComplete: () => {
      heroAutoScrolling = false;
      heroAutoScrollTween = null;
    },
    onInterrupt: () => {
      heroAutoScrolling = false;
      heroAutoScrollTween = null;
    }
  });
};

const handleHeroWheel = (event) => {
  if (heroTransitioning || heroAutoScrolling) {
    event.preventDefault();
    return true;
  }

  if (event.deltaY > 0 && canTriggerHeroGallery()) {
    event.preventDefault();
    triggerHeroGallery();
    return true;
  }

  if (event.deltaY < 0 && canResetHeroGallery()) {
    event.preventDefault();
    resetHeroGallery();
    return true;
  }

  if (event.deltaY < 0 && canReturnToHeroFromSection01()) {
    event.preventDefault();
    returnToHeroFromSection01();
    return true;
  }

  return false;
};

window.addEventListener('wheel', handleHeroWheel, { passive: false });

window.addEventListener('keydown', (event) => {
  const forwardKeys = ['ArrowDown', 'PageDown', ' '];
  const backwardKeys = ['ArrowUp', 'PageUp'];

  if (forwardKeys.includes(event.key) && canTriggerHeroGallery()) {
    event.preventDefault();
    triggerHeroGallery();
    return;
  }

  if (backwardKeys.includes(event.key) && canResetHeroGallery()) {
    event.preventDefault();
    resetHeroGallery();
    return;
  }

  if (backwardKeys.includes(event.key) && canReturnToHeroFromSection01()) {
    event.preventDefault();
    returnToHeroFromSection01();
  }
});

let touchStartY = 0;
window.addEventListener('touchstart', (event) => {
  touchStartY = event.touches[0]?.clientY ?? 0;
}, { passive: true });

window.addEventListener('touchend', (event) => {
  const touchEndY = event.changedTouches[0]?.clientY ?? touchStartY;
  if (touchStartY - touchEndY > 24 && canTriggerHeroGallery()) {
    triggerHeroGallery();
    return;
  }

  if (touchEndY - touchStartY > 24 && canResetHeroGallery()) {
    resetHeroGallery();
    return;
  }

  if (touchEndY - touchStartY > 24 && canReturnToHeroFromSection01()) {
    returnToHeroFromSection01();
  }
}, { passive: true });

initSharedSections();
initStoreDownloadModal();
requestAnimationFrame(() => ScrollTrigger.refresh());
