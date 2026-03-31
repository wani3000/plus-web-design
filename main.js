import './style.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Header } from './src/components/Header.js'

gsap.registerPlugin(ScrollTrigger);

// Clean up standard Vite text
document.querySelector('#app')?.remove();

// Mount header at the very top of the page
document.body.insertBefore(Header(), document.body.firstChild);

// Keep hero pinning below fixed header + tabs + 20px gap
const headerHeight = document.querySelector('.header')?.getBoundingClientRect().height ?? 72;
const tabHeight = document.querySelector('.top-nav')?.getBoundingClientRect().height ?? 46;
const heroGapFromTabs = 20;
const topUiOffset = Math.round(headerHeight + tabHeight + heroGapFromTabs);

// Set initial states for fly-in images
gsap.set(".img-02, .img-03", { x: "-50vw" });
gsap.set(".img-04, .img-05", { x: "50vw" });

// Create master timeline pinned to scroll
// Timeline: 13 units total
//   0  -> 9.5  : image convergence phases
//   9.5-> 13   : dimmed overlay + text reveal
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".hero-pinned",
    start: `top top+=${topUiOffset}`,
    end: "+=4000", // Extended for overlay phase
    scrub: 1.2,
    pin: true,
    anticipatePin: 1
  }
});

// ----------------------------------------------------------------------
// Phase 2: Scroll Begins (0% -> ~38%) -> Duration: 5
// `image 01` scales down and centers itself
// ----------------------------------------------------------------------

// Fade out and float up the title text immediately upon scrolling
tl.to(".hero-title", {
  opacity: 0,
  y: -50,
  duration: 1.5,
  ease: "power2.out"
}, 0);

tl.to(".img-01", {
  width: "36%",
  height: "70%",
  borderRadius: "8px",
  ease: "power2.inOut",
  duration: 5
}, 0);

// ----------------------------------------------------------------------
// Phase 3: Left Images Fly In -> Time: 3 -> 7
// ----------------------------------------------------------------------
tl.to(".img-02", {
  x: 0,
  opacity: 1,
  duration: 4,
  ease: "expo.out"
}, 3);

tl.to(".img-03", {
  x: 0,
  opacity: 1,
  duration: 4,
  ease: "expo.out"
}, 3.5);

// ----------------------------------------------------------------------
// Phase 4: Right Images Fly In -> Time: 5 -> 9
// ----------------------------------------------------------------------
tl.to(".img-04", {
  x: 0,
  opacity: 1,
  duration: 4,
  ease: "expo.out"
}, 5);

tl.to(".img-05", {
  x: 0,
  opacity: 1,
  duration: 4,
  ease: "expo.out"
}, 5.5);

// ----------------------------------------------------------------------
// Phase 5: Per-image Dim Overlay -> Time: 9.5 -> 11
// Each of the 5 image-wrappers gets its own dark overlay
// ----------------------------------------------------------------------
tl.to(".img-overlay", {
  backgroundColor: "rgba(var(--color-gray-90-rgb), 0.55)",
  duration: 1.5,
  ease: "power2.inOut"
}, 9.5);

// Also fade in the text container (transparency switch)
tl.to(".gallery-overlay", {
  opacity: 1,
  duration: 1.5,
  ease: "power2.inOut"
}, 9.5);

// ----------------------------------------------------------------------
// Phase 6: Text Slides Up -> Time: 10.5 -> 13
// Text rises from below into the center of the dimmed overlay
// ----------------------------------------------------------------------
tl.to(".overlay-text", {
  opacity: 1,
  y: 0,
  duration: 2,
  ease: "power3.out"
}, 10.5);

// Clean end boundary
tl.to({}, { duration: 0.5 }, 13);

// Chart line animation (orange gradient line)
const accentLine = document.querySelector('.chart-line--accent');
if (accentLine) {
  ScrollTrigger.create({
    trigger: accentLine,
    start: 'center center',
    once: true,
    onEnter: () => {
      accentLine.classList.add('animate');
    }
  });
}

// Section 02 sub-logo cards animation (domino-like gravity stacking, no overlap)
const section02SubBlock = document.querySelector('.section-02__block--sub');
if (section02SubBlock) {
  const redCard = section02SubBlock.querySelector('.section-02__logo-card--red');
  const greenCard = section02SubBlock.querySelector('.section-02__logo-card--green');
  const whiteCard = section02SubBlock.querySelector('.section-02__logo-card--white');
  const dropOrder = [whiteCard, greenCard, redCard].filter(Boolean);

  if (dropOrder.length > 0) {
    const physics = [
      { startY: -360, fall: 1.0, bounce: 8, impact: 3, driftX: 0 },
      { startY: -300, fall: 0.88, bounce: 7, impact: 4, driftX: -8 },
      { startY: -240, fall: 0.78, bounce: 6, impact: 5, driftX: 7 }
    ];

    gsap.set(dropOrder, {
      y: (index) => physics[index]?.startY ?? -260,
      x: (index) => physics[index]?.driftX ?? 0,
      autoAlpha: 0,
      scaleX: 1,
      scaleY: 1,
      transformOrigin: '50% 100%'
    });

    const logoTl = gsap.timeline({
      scrollTrigger: {
        trigger: section02SubBlock,
        start: 'top 78%',
        toggleActions: 'play none none none',
        once: true
      }
    });

    const defaultPhysics = { startY: -260, fall: 0.9, bounce: 6, impact: 3, driftX: 0 };
    const startTimes = [];
    const overlapStartRatio = 0.58;
    let cursor = 0;
    dropOrder.forEach((card, index) => {
      const p = physics[index] ?? defaultPhysics;
      startTimes[index] = cursor;
      const impactAt = cursor + p.fall;
      const landedCards = dropOrder.slice(0, index).filter((_, prevIndex) => {
        const prevStart = startTimes[prevIndex] ?? 0;
        const prevFall = (physics[prevIndex] ?? defaultPhysics).fall;
        return impactAt >= prevStart + prevFall;
      });

      logoTl
        .to(card, { autoAlpha: 1, zIndex: 50 + index, duration: 0.02 }, cursor)
        .to(card, {
          y: 0,
          x: 0,
          duration: p.fall,
          ease: 'power4.in'
        }, cursor)
        .to(card, {
          scaleX: 1.05,
          scaleY: 0.92,
          duration: 0.07,
          ease: 'power1.out'
        }, impactAt)
        .to(card, {
          y: -p.bounce,
          scaleX: 0.99,
          scaleY: 1.02,
          duration: 0.16,
          ease: 'power2.out'
        }, impactAt + 0.05)
        .to(card, {
          y: 0,
          scaleX: 1,
          scaleY: 1,
          duration: 0.2,
          ease: 'power2.in'
        }, impactAt + 0.21)
        .to(card, {
          y: -Math.max(2, Math.round(p.bounce * 0.34)),
          duration: 0.08,
          ease: 'power1.out'
        }, impactAt + 0.41)
        .to(card, {
          y: 0,
          duration: 0.11,
          ease: 'power1.in'
        }, impactAt + 0.49)
        .to(card, { zIndex: index + 1, duration: 0.01 }, impactAt + 0.61);

      if (landedCards.length > 0) {
        logoTl
          .to(landedCards, {
            y: `+=${p.impact}`,
            duration: 0.07,
            ease: 'power1.out',
            stagger: 0.015
          }, impactAt + 0.02)
          .to(landedCards, {
            y: `-=${p.impact}`,
            duration: 0.14,
            ease: 'power2.out',
            stagger: 0.015
          }, impactAt + 0.09);
      }

      // Cascading drop: next card starts while current card is still falling.
      cursor += p.fall * overlapStartRatio;
    });
  }
}

// Section 03 comparison chart animation (2천만 원 vs 5천만 원)
const compareChart = document.querySelector('.section-03__chart-block');
if (compareChart) {
  const leftTopCard = document.querySelector('.section-03__card--left-top');
  const bars = ['.section-03__chart-bar--small', '.section-03__chart-bar--large'];
  const smallLine = '.section-03__chart-line--small';
  const largeLine = '.section-03__chart-line--large';
  const smallLabel = '.section-03__chart-label--small';
  const largeLabel = '.section-03__chart-label--large';

  gsap.set(bars, { transformOrigin: 'center bottom', scaleY: 0, y: 20, opacity: 1 });
  gsap.set([smallLine, largeLine], { scaleX: 0, opacity: 1 });
  gsap.set([smallLabel, largeLabel], { opacity: 0, y: 10 });

  gsap.timeline({
    scrollTrigger: {
      trigger: leftTopCard || compareChart,
      start: 'center center',
      toggleActions: 'play none none none',
      once: true
    }
  })
    .to(bars, {
      scaleY: 1,
      y: 0,
      duration: 1.15,
      ease: 'power3.out',
      stagger: 0.18
    })
    .to(smallLine, {
      scaleX: 1,
      duration: 0.45,
      ease: 'power2.out'
    }, '-=0.5')
    .to(smallLabel, {
      opacity: 1,
      y: 0,
      duration: 0.25,
      ease: 'power2.out'
    }, '<+0.04')
    .to(largeLine, {
      scaleX: 1,
      duration: 0.45,
      ease: 'power2.out'
    }, '+=0.1')
    .to(largeLabel, {
      opacity: 1,
      y: 0,
      duration: 0.25,
      ease: 'power2.out'
    }, '<+0.04');
}

// Section 03 right-top card animation (monthly split gift)
const monthlyCard = document.querySelector('.section-03__card--right-top');
if (monthlyCard) {
  const amountEl = monthlyCard.querySelector('.section-03__monthly-amount');
  const notes = Array.from(monthlyCard.querySelectorAll('.section-03__monthly-note'));
  const targetAmount = Number(amountEl?.dataset.target ?? 194000);

  if (amountEl && notes.length > 0) {
    const counter = { value: 0 };
    amountEl.textContent = '0';
    gsap.set(notes, { y: 160, opacity: 0 });

    gsap.timeline({
      scrollTrigger: {
        trigger: monthlyCard,
        start: 'center center',
        toggleActions: 'play none none none',
        once: true
      }
    })
      .to(notes, {
        y: 0,
        opacity: 1,
        duration: 1.1,
        ease: 'power3.out',
        stagger: 0.12
      })
      .to(counter, {
        value: targetAmount,
        duration: 1.35,
        ease: 'power2.out',
        onUpdate: () => {
          amountEl.textContent = Math.round(counter.value).toLocaleString('ko-KR');
        }
      }, 0.22);
  }
}

// Section 03 right-bottom card animation (ETF cards drop + zigzag stack)
const etfCard = document.querySelector('.section-03__card--right-bottom');
if (etfCard) {
  const etfItems = etfCard.querySelectorAll('.section-03__etf-item');
  if (etfItems.length > 0) {
    const dropOrder = Array.from(etfItems).reverse();
    gsap.set(dropOrder, { y: -80, opacity: 0 });

    const etfTl = gsap.timeline({
      scrollTrigger: {
        trigger: etfCard,
        start: 'center center',
        toggleActions: 'play none none none',
        once: true
      }
    });

    dropOrder.forEach((item, index) => {
      const startAt = index * 0.24;

      etfTl
        .to(item, { opacity: 1, duration: 0.02 }, startAt)
        // free fall (gravity)
        .to(item, {
          y: 0,
          duration: 0.36,
          ease: 'power2.in'
        }, startAt)
        // first impact
        .to(item, {
          y: 16,
          duration: 0.07,
          ease: 'power1.out'
        }, startAt + 0.36)
        .to(item, {
          y: 0,
          duration: 0.12,
          ease: 'power2.out'
        }, startAt + 0.43)
        // second small impact
        .to(item, {
          y: 6,
          duration: 0.06,
          ease: 'power1.out'
        }, startAt + 0.55)
        .to(item, {
          y: 0,
          duration: 0.09,
          ease: 'power1.out'
        }, startAt + 0.61);
    });
  }
}

// Section 04 tax amount counter animation (00,000,000원 -> 19,647,038원)
const taxCard = document.querySelector('.section-04__card--narrow-top');
if (taxCard) {
  const taxAmountEl = taxCard.querySelector('.section-04__tax-amount');
  const taxBodyCard = taxCard.querySelector('.section-04__tax-card');
  const taxLogoWrap = taxCard.querySelector('.section-04__tax-logo-wrap');
  if (taxAmountEl) {
    const targetAmount = 19647038;
    const counter = { value: 0 };
    const formatAmount = (value) => `${Math.round(value).toString().padStart(8, '0').replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원`;

    taxAmountEl.textContent = '00,000,000원';
    if (taxBodyCard) {
      gsap.set(taxBodyCard, { y: 18, autoAlpha: 0 });
    }
    if (taxLogoWrap) {
      gsap.set(taxLogoWrap, { y: 56, autoAlpha: 0 });
    }

    const taxTl = gsap.timeline({
      scrollTrigger: {
        trigger: taxCard,
        start: 'center center',
        toggleActions: 'play none none none',
        once: true
      }
    });

    if (taxBodyCard) {
      taxTl.to(taxBodyCard, {
        y: 0,
        autoAlpha: 1,
        duration: 0.45,
        ease: 'power3.out'
      }, 0);
    }

    taxTl
      .to(counter, {
        value: targetAmount * 0.88,
        duration: 0.15,
        ease: 'power1.out',
        onUpdate: () => {
          taxAmountEl.textContent = formatAmount(counter.value);
        }
      })
      .to(counter, {
        value: targetAmount,
        duration: 0.85,
        ease: 'power2.out',
        onUpdate: () => {
          taxAmountEl.textContent = formatAmount(counter.value);
        },
        onComplete: () => {
          taxAmountEl.textContent = formatAmount(targetAmount);
        }
      });

    if (taxLogoWrap) {
      taxTl.to(taxLogoWrap, {
        y: 0,
        autoAlpha: 1,
        duration: 0.7,
        ease: 'power3.out'
      }, 0.45);
    }
  }
}

// Section 04 insight cards animation (bottom -> top sequential rise)
const insightCard = document.querySelector('.section-04__card--narrow-bottom');
if (insightCard) {
  const insightItems = insightCard.querySelectorAll('.section-04__insight-item');
  if (insightItems.length > 0) {
    const riseOrder = Array.from(insightItems).reverse();
    gsap.set(riseOrder, { y: 48, autoAlpha: 0 });

    gsap.timeline({
      scrollTrigger: {
        trigger: insightCard,
        start: 'center center',
        toggleActions: 'play none none none',
        once: true
      }
    }).to(riseOrder, {
      y: 0,
      autoAlpha: 1,
      duration: 0.6,
      ease: 'power3.out',
      stagger: 0.18
    });
  }
}

// Section 04 plan progress animation (light orange first, then dark orange)
const planCard = document.querySelector('.section-04__card--wide-bottom');
if (planCard) {
  const planWidget = planCard.querySelector('.section-04__plan-widget');
  const lightBar = planCard.querySelector('.section-04__plan-progress-fill:not(.section-04__plan-progress-fill--dark)');
  const darkBar = planCard.querySelector('.section-04__plan-progress-fill--dark');
  const primaryAmountEl = planCard.querySelector('.section-04__plan-row--primary .section-04__plan-value');
  const secondaryAmountEl = planCard.querySelector('.section-04__plan-row--secondary .section-04__plan-value');

  if (lightBar && darkBar) {
    const parseTarget = (el) => Number(el?.dataset.target ?? String(el?.textContent ?? '').replace(/[^\d]/g, ''));
    const formatWonCounter = (value) => {
      const digits = Math.max(0, Math.round(value)).toString().padStart(7, '0');
      return `${digits.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원`;
    };

    const primaryTarget = parseTarget(primaryAmountEl);
    const secondaryTarget = parseTarget(secondaryAmountEl);
    const primaryCounter = { value: 0 };
    const secondaryCounter = { value: 0 };

    gsap.set([lightBar, darkBar], { scaleX: 0, transformOrigin: 'left center' });
    if (planWidget) {
      gsap.set(planWidget, { y: 20, autoAlpha: 0 });
    }
    if (primaryAmountEl) {
      primaryAmountEl.textContent = formatWonCounter(0);
    }
    if (secondaryAmountEl) {
      secondaryAmountEl.textContent = formatWonCounter(0);
    }

    const planTl = gsap.timeline({
      scrollTrigger: {
        trigger: planCard,
        start: 'center center',
        toggleActions: 'play none none none',
        once: true
      }
    });

    if (planWidget) {
      planTl.to(planWidget, {
        y: 0,
        autoAlpha: 1,
        duration: 0.55,
        ease: 'power3.out'
      });
    }

    planTl
      .to(lightBar, {
        scaleX: 1,
        duration: 0.75,
        ease: 'power2.out'
      }, planWidget ? '+=0.04' : 0)
      .to(secondaryCounter, {
        value: secondaryTarget,
        duration: 0.75,
        ease: 'power2.out',
        onUpdate: () => {
          if (secondaryAmountEl) {
            secondaryAmountEl.textContent = formatWonCounter(secondaryCounter.value);
          }
        }
      }, '<')
      .to(darkBar, {
        scaleX: 1,
        duration: 0.55,
        ease: 'power2.out'
      }, '+=0.08');

    if (primaryAmountEl) {
      planTl.to(primaryCounter, {
        value: primaryTarget,
        duration: 0.55,
        ease: 'power2.out',
        onUpdate: () => {
          primaryAmountEl.textContent = formatWonCounter(primaryCounter.value);
        }
      }, '<');
    }
  }
}
