import './style.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Header } from './src/components/Header.js'
import { initSharedSections } from './src/initSharedSections.js'

gsap.registerPlugin(ScrollTrigger);

// Clean up standard Vite text
document.querySelector('#app')?.remove();

// Mount header at the very top of the page
document.body.insertBefore(Header(), document.body.firstChild);

// Keep hero pinning below the fixed header
const headerHeight = document.querySelector('.header')?.getBoundingClientRect().height ?? 72;
const topUiOffset = Math.round(headerHeight);

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
    scrub: 0.55,
    pin: true,
    anticipatePin: 1,
    invalidateOnRefresh: true
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
  width: "50vh",
  height: "66.6667vh",
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
tl.to(".img-01 .img-overlay", {
  opacity: 1,
  duration: 0.45,
  ease: "power2.inOut"
}, 9.5);
tl.to(".img-01 .img-card-text", {
  opacity: 1,
  y: 0,
  duration: 0.4,
  ease: "power3.out"
}, 9.78);

tl.to(".img-03 .img-overlay", {
  opacity: 1,
  duration: 0.42,
  ease: "power2.inOut"
}, 10.12);
tl.to(".img-03 .img-card-text", {
  opacity: 1,
  y: 0,
  duration: 0.36,
  ease: "power3.out"
}, 10.42);

tl.to(".img-02 .img-overlay", {
  opacity: 1,
  duration: 0.42,
  ease: "power2.inOut"
}, 10.72);
tl.to(".img-02 .img-card-text", {
  opacity: 1,
  y: 0,
  duration: 0.36,
  ease: "power3.out"
}, 11.02);

tl.to(".img-05 .img-overlay", {
  opacity: 1,
  duration: 0.42,
  ease: "power2.inOut"
}, 11.32);
tl.to(".img-05 .img-card-text", {
  opacity: 1,
  y: 0,
  duration: 0.36,
  ease: "power3.out"
}, 11.62);

tl.to(".img-04 .img-overlay", {
  opacity: 1,
  duration: 0.42,
  ease: "power2.inOut"
}, 11.92);
tl.to(".img-04 .img-card-text", {
  opacity: 1,
  y: 0,
  duration: 0.36,
  ease: "power3.out"
}, 12.22);
initSharedSections();
requestAnimationFrame(() => ScrollTrigger.refresh());
