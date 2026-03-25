import './style.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger);

// Clean up standard Vite text
document.querySelector('#app')?.remove();

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
    start: "top top",
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
  width: "36vw",
  height: "70vh",
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
  backgroundColor: "rgba(0, 0, 0, 0.55)",
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
