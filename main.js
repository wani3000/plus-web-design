import './style.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Header } from './src/components/Header.js'
import { initStoreDownloadModal } from './src/initStoreDownloadModal.js'
import { initSharedSections } from './src/initSectionsTest1.js'

gsap.registerPlugin(ScrollTrigger);

// Clean up standard Vite text
document.querySelector('#app')?.remove();

if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

// Mount header at the very top of the page
document.body.insertBefore(Header(), document.body.firstChild);

document.addEventListener('click', (event) => {
  const logoLink = event.target.closest?.('[data-home-link]');
  if (!logoLink) return;

  const isRootPath = window.location.pathname === '/' || window.location.pathname.endsWith('/index.html');
  event.preventDefault();
  if (isRootPath) {
    window.scrollTo(0, 0);
    window.location.reload();
    return;
  }

  window.location.href = './';
});

initStoreDownloadModal();

const isMobile = window.matchMedia('(max-width: 767px)').matches;

const initMobileSection01B = () => {
  if (!isMobile) return;

  const section01b = document.querySelector('.section-01b');
  const phoneWrap = section01b?.querySelector('.section-01b__phone-wrap');
  if (!section01b || !phoneWrap) return;

  const activeIndex = 1;
  let cycleStarted = false;
  const mobilePhoneOrder = [
    'img_mockup_12.png',
    'img_mockup_01.png',
    'img_mockup_02.png',
    'img_mockup_03.png',
    'img_mockup_10.png',
    'img_mockup_07.png',
    'img_mockup_08.png',
    'img_mockup_09.png'
  ];

  const getPhoneCards = () => Array.from(phoneWrap.querySelectorAll('.section-01b__phone-outline'));
  const getPhoneGap = () => parseFloat(getComputedStyle(phoneWrap).gap || '0');

  const resetPhoneCardsToMobileOrder = () => {
    const cards = getPhoneCards();
    const bySrc = new Map(
      cards.map((card) => {
        const image = card.querySelector('.section-01b__phone-image');
        const src = image?.getAttribute('src')?.split('/').pop() ?? '';
        return [src, card];
      })
    );

    mobilePhoneOrder.forEach((src) => {
      const card = bySrc.get(src);
      if (card) {
        phoneWrap.appendChild(card);
      }
    });
  };

  const syncPhoneRail = ({ immediate = false } = {}) => {
    const cards = getPhoneCards();
    if (cards.length <= activeIndex) return;

    const activeCard = cards[activeIndex];
    const cardWidth = activeCard.getBoundingClientRect().width;
    const step = cardWidth + getPhoneGap();
    const viewportWidth = section01b.getBoundingClientRect().width;
    const innerPaddingLeft = parseFloat(getComputedStyle(phoneWrap.parentElement).paddingLeft || '0');
    const targetX = ((viewportWidth - cardWidth) / 2) - innerPaddingLeft - (activeIndex * step);

    if (immediate) {
      gsap.set(phoneWrap, { x: targetX });
    } else {
      gsap.to(phoneWrap, {
        x: targetX,
        duration: 0.72,
        ease: 'power2.inOut',
        overwrite: true
      });
    }

    cards.forEach((card, index) => {
      const isActiveCard = index === activeIndex;
      const screen = card.querySelector('.section-01b__phone-screen');
      const cardState = {
        scale: isActiveCard ? 1 : 0.86,
        opacity: isActiveCard ? 1 : 0.62,
        y: isActiveCard ? 0 : 10
      };
      const screenState = {
        opacity: isActiveCard ? 1 : 0.42
      };

      if (immediate) {
        gsap.set(card, cardState);
        if (screen) gsap.set(screen, screenState);
      } else {
        gsap.to(card, {
          ...cardState,
          duration: 0.72,
          ease: 'power2.inOut',
          overwrite: true
        });
        if (screen) {
          gsap.to(screen, {
            ...screenState,
            duration: 0.72,
            ease: 'power2.inOut',
            overwrite: true
          });
        }
      }

      card.classList.toggle('is-active', isActiveCard);
    });
  };

  const queueNextCycle = () => {
    gsap.delayedCall(2.2, () => {
      const cards = getPhoneCards();
      if (cards.length <= activeIndex + 1) return;

      const step = cards[0].getBoundingClientRect().width + getPhoneGap();
      const currentActiveCard = cards[activeIndex];
      const nextActiveCard = cards[activeIndex + 1];
      const currentScreen = currentActiveCard.querySelector('.section-01b__phone-screen');
      const nextScreen = nextActiveCard.querySelector('.section-01b__phone-screen');

      gsap.to(currentActiveCard, {
        scale: 0.86,
        opacity: 0.62,
        y: 10,
        duration: 0.72,
        ease: 'power2.inOut',
        overwrite: true
      });
      gsap.to(nextActiveCard, {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 0.72,
        ease: 'power2.inOut',
        overwrite: true
      });

      if (currentScreen) {
        gsap.to(currentScreen, {
          opacity: 0.42,
          duration: 0.72,
          ease: 'power2.inOut',
          overwrite: true
        });
      }

      if (nextScreen) {
        gsap.to(nextScreen, {
          opacity: 1,
          duration: 0.72,
          ease: 'power2.inOut',
          overwrite: true
        });
      }

      gsap.to(phoneWrap, {
        x: `-=${step}`,
        duration: 0.72,
        ease: 'power2.inOut',
        overwrite: true,
        onComplete: () => {
          phoneWrap.appendChild(cards[0]);
          syncPhoneRail({ immediate: true });
          queueNextCycle();
        }
      });
    });
  };

  resetPhoneCardsToMobileOrder();
  syncPhoneRail({ immediate: true });

  ScrollTrigger.create({
    trigger: section01b,
    start: 'top 85%',
    once: true,
    onEnter: () => {
      if (cycleStarted) return;
      cycleStarted = true;
      queueNextCycle();
    }
  });

  window.addEventListener('resize', () => {
    syncPhoneRail({ immediate: true });
  });
};

if (isMobile) {
  // 모바일: 히어로 비디오 자동재생 보장
  const mobileHeroVideo = document.querySelector('video.hero-loop-video__layer--primary');
  const mobileHeroLoop = document.querySelector('.hero-loop-video');
  const mobileHeroFallback = mobileHeroLoop?.querySelector('.hero-loop-video__fallback');
  let mobileHeroFallbackHidden = false;

  const hideMobileHeroFallback = () => {
    if (!mobileHeroFallback || mobileHeroFallbackHidden) return;
    mobileHeroFallbackHidden = true;
    gsap.to(mobileHeroFallback, {
      opacity: 0,
      duration: 0.28,
      ease: 'power2.out',
      onComplete: () => {
        mobileHeroFallback.remove();
      }
    });
  };

  if (mobileHeroVideo) {
    // secondary 비디오는 모바일에서 불필요 — 리소스 절약
    const secondaryVideo = document.querySelector('video.hero-loop-video__layer--secondary');
    if (secondaryVideo) {
      secondaryVideo.pause();
      secondaryVideo.removeAttribute('src');
      secondaryVideo.load();
    }

    const tryPlay = () => {
      if (!mobileHeroVideo.paused) return;
      mobileHeroVideo.muted = true;
      mobileHeroVideo.play().catch(() => {});
    };

    const handlePlayable = () => {
      hideMobileHeroFallback();
    };

    if (mobileHeroVideo.readyState >= 2) {
      tryPlay();
      hideMobileHeroFallback();
    } else {
      mobileHeroVideo.addEventListener('loadeddata', tryPlay, { once: true });
    }
    mobileHeroVideo.addEventListener('loadeddata', handlePlayable, { once: true });
    mobileHeroVideo.addEventListener('canplay', handlePlayable, { once: true });
    mobileHeroVideo.addEventListener('playing', handlePlayable, { once: true });
    // 유저 인터랙션 후 재시도 (자동재생 정책 우회)
    document.addEventListener('touchstart', tryPlay, { once: true, passive: true });
    document.addEventListener('click', tryPlay, { once: true, passive: true });
  }
  initMobileSection01B();
  requestAnimationFrame(() => ScrollTrigger.refresh());
}

if (!isMobile) {
// Keep hero pinning below the fixed header
const headerHeight = document.querySelector('.header')?.getBoundingClientRect().height ?? 72;
const topUiOffset = Math.round(headerHeight);
const heroPinned = document.querySelector('.hero-pinned');
const section01 = document.querySelector('.section-01');
const heroLoopVideo = document.querySelector('.hero-loop-video');
const heroLoopFallback = heroLoopVideo?.querySelector('.hero-loop-video__fallback');
let heroLoopFallbackHidden = false;

// Set initial states for fly-in images
gsap.set(".img-02, .img-03", { x: "-50vw" });
gsap.set(".img-04, .img-05", { x: "50vw" });

const hideHeroLoopFallback = () => {
  if (!heroLoopFallback || heroLoopFallbackHidden) return;
  heroLoopFallbackHidden = true;
  gsap.to(heroLoopFallback, {
    opacity: 0,
    duration: 0.28,
    ease: 'power2.out',
    onComplete: () => {
      heroLoopFallback.remove();
    }
  });
};

const initHeroLoopVideo = () => {
  if (!heroLoopVideo) return;

  const layers = Array.from(heroLoopVideo.querySelectorAll('video'));
  if (layers.length < 2) return;

  const [primary, secondary] = layers;
  const swapLeadTime = 0.38;
  const swapFadeDuration = 0.34;
  let activeVideo = primary;
  let standbyVideo = secondary;
  let isSwapping = false;

  const primeVideo = (video, shouldPlay) => {
    video.loop = false;
    video.muted = true;
    video.playsInline = true;
    video.preload = 'auto';
    if (!shouldPlay) {
      video.pause();
      video.currentTime = 0;
      gsap.set(video, { opacity: 0 });
    }
  };

  primeVideo(primary, true);
  primeVideo(secondary, false);

  const completeSwap = (outgoing, incoming) => {
    outgoing.pause();
    outgoing.currentTime = 0;
    gsap.set(outgoing, { opacity: 0 });
    gsap.set(incoming, { opacity: 1 });
    activeVideo = incoming;
    standbyVideo = outgoing;
    isSwapping = false;
  };

  const beginSwap = () => {
    if (isSwapping) return;
    if (activeVideo.readyState < 2 || !Number.isFinite(activeVideo.duration) || activeVideo.duration <= 0) return;

    const remaining = activeVideo.duration - activeVideo.currentTime;
    if (remaining > swapLeadTime) return;

    isSwapping = true;

    const outgoing = activeVideo;
    const incoming = standbyVideo;

    incoming.currentTime = 0;
    incoming.playbackRate = outgoing.playbackRate;
    gsap.set(incoming, { opacity: 0 });
    incoming.play().catch(() => {});

    gsap.to(incoming, {
      opacity: 1,
      duration: swapFadeDuration,
      ease: 'power2.out'
    });

    gsap.to(outgoing, {
      opacity: 0,
      duration: swapFadeDuration,
      ease: 'power2.out',
      onComplete: () => completeSwap(outgoing, incoming)
    });
  };

  const handleTimeUpdate = () => {
    beginSwap();
  };

  const handlePlayable = () => {
    hideHeroLoopFallback();
  };

  activeVideo.addEventListener('timeupdate', handleTimeUpdate);
  activeVideo.addEventListener('loadeddata', handlePlayable, { once: true });
  activeVideo.addEventListener('canplay', handlePlayable, { once: true });
  activeVideo.addEventListener('playing', handlePlayable, { once: true });
  standbyVideo.addEventListener('timeupdate', handleTimeUpdate);

  const tryPlayActiveVideo = () => {
    activeVideo.play().catch(() => {});
  };

  tryPlayActiveVideo();
  window.addEventListener('touchstart', tryPlayActiveVideo, { passive: true, once: true });
  window.addEventListener('pointerdown', tryPlayActiveVideo, { passive: true, once: true });

  if (activeVideo.readyState >= 2 || standbyVideo.readyState >= 2) {
    requestAnimationFrame(() => requestAnimationFrame(hideHeroLoopFallback));
  }
};

initHeroLoopVideo();
let heroTransitioning = false;
let heroTransitioned = false;
let heroAutoScrolling = false;
let heroAutoScrollTween = null;
const heroGalleryTimeScale = 0.5384615385;

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
    duration: 1.3,
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

tl.timeScale(heroGalleryTimeScale);

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
  tl.timeScale(heroGalleryTimeScale);
  tl.play(0);
};

const resetHeroGallery = () => {
  if (!canResetHeroGallery()) return;
  heroTransitioning = true;
  tl.timeScale(heroGalleryTimeScale);
  tl.reverse();
};

const returnToHeroFromSection01 = () => {
  if (!canReturnToHeroFromSection01()) return;
  stopHeroAutoScroll();
  heroTransitioning = true;
  heroAutoScrolling = true;
  tl.timeScale(heroGalleryTimeScale).reverse();

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
requestAnimationFrame(() => ScrollTrigger.refresh());
}
