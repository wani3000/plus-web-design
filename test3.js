gsap.registerPlugin(ScrollTrigger);

// Main pinned timeline corresponding to the full Test 3 experience
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: "#hero-section",
    start: "top top",
    end: () => "+=" + (window.innerHeight * 4), // 400vh of pinned scroll range
    pin: true,
    scrub: 1, // Smooth scrub behavior explicitly requested
  }
});

// Calculate percentages dynamically in timeline duration.
// Let total duration be 100 to map directly to the percentage requests in the prompt.

// ==========================================
// SCROLL PHASE 1: White fill expands (0% -> 50%)
// ==========================================

// Animation A: white-fill expands
tl.to(".white-fill", {
  clipPath: "inset(0% 0% 0% 0% round 0px)",
  ease: "none",
  duration: 50
}, 0); // start at 0%

// Animation B: phone-frame shrinks to 0.82
tl.to(".phone-frame", {
  scale: 0.82,
  ease: "none",
  duration: 50
}, 0);

// Animation C: hero-photo counter-scales
// 1 / 0.82 ≈ 1.2195, effectively neutralizing the size reduction visually
tl.to(".hero-photo", {
  scale: 1.22, 
  ease: "none",
  duration: 50
}, 0);

// Animation D: background photo fades slightly (20% -> 50%)
tl.to(".bg-photo", {
  opacity: 0,
  ease: "none",
  duration: 30 // 50% - 20% = 30 duration blocks
}, 20); // start at 20%

// ==========================================
// SCROLL PHASE 2: Cards appear (50% -> 100%)
// ==========================================

// Animation E: Phone fades out, center card fades in (50% -> 60%)
tl.to(".phone-frame", {
  opacity: 0,
  ease: "none",
  duration: 10 // 60% - 50%
}, 50); // start at 50%

tl.to(".cards-container", {
  opacity: 1,
  ease: "none",
  duration: 10
}, 50);

tl.to(".card-center", {
  opacity: 1,
  scale: 1,
  ease: "none",
  duration: 10
}, 50);

// Animation F: card-left enters from left (58% -> 80%)
tl.fromTo(".card-left",
  { opacity: 0, scale: 1.3, x: -80 },
  { opacity: 1, scale: 1, x: 0, ease: "none", duration: 22 },
  58 // start at 58%
);

// Animation G: card-right enters from right (65% -> 85%)
tl.fromTo(".card-right",
  { opacity: 0, scale: 1.3, x: 80 },
  { opacity: 1, scale: 1, x: 0, ease: "none", duration: 20 },
  65 // start at 65%
);

// Timeline automatically sits idle from 85 to 100 providing scroll clearance before unpinning.
