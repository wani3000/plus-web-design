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
// We assume timeline duration translates strictly to scroll percentage.
// Mapping standard 10 units = 100% of scroll scrub distance.
// Start to finish: 0 to 10
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".hero-pinned",
    start: "top top",
    end: "+=3000", // Smooth, long scrub distance
    scrub: 1.2, // smoothing factor for scrub
    pin: true,
    anticipatePin: 1
  }
});

// ----------------------------------------------------------------------
// Phase 2: Scroll Begins (0% -> 50%) -> Duration: 5
// `image 01` scales down and centers itself
// ----------------------------------------------------------------------

// Fade out and float up the title text immediately upon scrolling
tl.to(".hero-title", {
  opacity: 0,
  y: -50,
  duration: 1.5,
  ease: "power2.out"
}, 0); // Starts at 0

tl.to(".img-01", {
  width: "36vw",     // Final centered width
  height: "70vh",    // Final centered height
  borderRadius: "8px",
  ease: "power2.inOut",
  duration: 5        // Represents 50%
}, 0);               // Starts at 0

// ----------------------------------------------------------------------
// Phase 3: Left Images Fly In (staggered, ~30% -> 70%) -> Time: 3 -> 7
// ----------------------------------------------------------------------
tl.to(".img-02", {
  x: 0,
  opacity: 1,
  duration: 4,         // 3 to 7
  ease: "expo.out"     // Fast start, slow finish
}, 3);                 // Starts at 3 (30%)

tl.to(".img-03", {
  x: 0,
  opacity: 1,
  duration: 4,
  ease: "expo.out"
}, 3.5);               // Starts slightly delayed at 35%

// ----------------------------------------------------------------------
// Phase 4: Right Images Fly In (staggered, ~50% -> 90%) -> Time: 5 -> 9
// ----------------------------------------------------------------------
tl.to(".img-04", {
  x: 0,
  opacity: 1,
  duration: 4,         // 5 to 9
  ease: "expo.out"
}, 5);                 // Starts at 5 (50%)

tl.to(".img-05", {
  x: 0,
  opacity: 1,
  duration: 4,
  ease: "expo.out"
}, 5.5);               // Starts slightly delayed at 55%

// ----------------------------------------------------------------------
// Final State: pad the end to reach exactly 10 units (100% boundary)
// ----------------------------------------------------------------------
tl.to({}, { duration: 0.5 }, 9.5); // Ensures tl is exactly 10 units long
