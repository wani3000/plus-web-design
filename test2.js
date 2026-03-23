// Register core GSAP ScrollTrigger plugin exclusively
gsap.registerPlugin(ScrollTrigger);

// -----------------------------------------------------------------------------
// MAIN TIMELINE
// We pin the .pin-container for a long total scroll distance constraint (~3500px).
// -----------------------------------------------------------------------------
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".pin-container",
    start: "top top", // Trigger when pin-container touches top of viewport
    end: "+=3500",    // Total scroll distance during pinning (px)
    pin: true,        // Pin the container physically on the screen
    scrub: 1,         // Bind smooth interpolation to scroll (1sec catchup easing)
  }
});

// Note: Within the timeline, time is abstract and mapped dynamically to the ScrollTrigger distance.
// Assume timeline duration of "100" to represent strict percentage mappings.

// -----------------------------------------------------------------------------
// PHASE 1: Entrance Mapping (0% - 15% of scroll)
// - The iPhone slides vertically up from offscreen (150vh -> 0)
// - Video behind progressive acquires an 8px blur mask.
// -----------------------------------------------------------------------------
tl.to(".iphone-frame", {
  y: 0,
  duration: 15, // Takes up exactly 15% length
  ease: "power3.out" // Elastic easing gives it a soft fluid lift
}, 0);

tl.to(".bg-video", {
  filter: "blur(8px)",
  duration: 15,
  ease: "none"
}, 0);

// -----------------------------------------------------------------------------
// PHASE 2: In-App Scroll Mechanism (15% - 85% of scroll)
// - `.app-content` transforms negatively simulating finger scroll behavior
// - Embedded `.app-screen` blocks fade and float in chronologically.
// -----------------------------------------------------------------------------
// Calculation: The inner app content is 350% total height. The phone view matches 100% height.
// To reach the exact bottom boundary, we need to scroll by roughly -71.4% (or ~ -250% relative).
// The easiest metric is moving the translation absolute percentage matching its own relative boundary.
tl.to(".app-content", {
  yPercent: -71.4, // -71.4% of 350% is reaching precisely the lower edge overflow offset.
  ease: "none",
  duration: 70 // Takes up the broad 70% inner band representing pure app exploration.
}, 15);

// Inner Screen Fade-Ins (staggered mapping into viewport timing)
tl.to(".type-home", { 
  opacity: 1, 
  y: 0, 
  duration: 10, 
  ease: "power2.out" 
}, 15);

tl.to(".type-feature", { 
  opacity: 1, 
  y: 0, 
  duration: 10, 
  ease: "power2.out" 
}, 30);

tl.to(".type-detail", { 
  opacity: 1, 
  y: 0, 
  duration: 10, 
  ease: "power2.out" 
}, 58);


// -----------------------------------------------------------------------------
// PHASE 3: Exit & Handoff (85% - 100% of scroll)
// - Shrink and dissolve iPhone into background
// - De-blur video and dissolve
// - Introduce the `.next-section` CTA
// -----------------------------------------------------------------------------
tl.to(".iphone-frame", {
  scale: 0.85,
  opacity: 0,
  duration: 15,
  ease: "power2.inOut"
}, 85);

tl.to(".bg-video", {
  filter: "blur(0px)",
  opacity: 0,
  duration: 15,
  ease: "power2.inOut"
}, 85);

tl.to(".next-section", {
  opacity: 1,
  duration: 10,
  ease: "none"
}, 90);


// -----------------------------------------------------------------------------
// INTERACTIVE: 3D Mouse Tilt Responsiveness
// Uses generic GSAP quickTo binding coordinates fluidly without scrolling lock
// -----------------------------------------------------------------------------
const xTo = gsap.quickTo(".iphone-3d-wrapper", "rotateY", { duration: 0.5, ease: "power3.out" });
const yTo = gsap.quickTo(".iphone-3d-wrapper", "rotateX", { duration: 0.5, ease: "power3.out" });

window.addEventListener("mousemove", (e) => {
  // Normalize screen x/y constraints mapped to standard generic floats (-1 to +1)
  const xNorm = (e.clientX / window.innerWidth - 0.5) * 2;
  const yNorm = (e.clientY / window.innerHeight - 0.5) * 2;

  // Max visual rotation restriction: 
  // +/- 12deg on Y axis (left/right tilt)
  // +/- 8deg on X axis (up/down tilt)
  xTo(xNorm * 12);  
  yTo(-yNorm * 8); // yNorm must invert corresponding mapping for correct CSS 3D physics axis
});
