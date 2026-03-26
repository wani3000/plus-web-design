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
  const observer = new IntersectionObserver(
    ([entry], obs) => {
      if (entry.isIntersecting) {
        accentLine.classList.add('animate');
        obs.disconnect();
      }
    },
    { threshold: 0.35 }
  );
  observer.observe(accentLine);
}

// Section 03 comparison chart animation (2천만 원 vs 5천만 원)
const compareChart = document.querySelector('.section-03__chart-block');
if (compareChart) {
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
      trigger: compareChart,
      start: 'top 78%',
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
        start: 'top 78%',
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
