import './style.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Header } from './src/components/Header.js'
import { initStoreDownloadModal } from './src/initStoreDownloadModal.js'
import { initSharedSections } from './src/initSectionsTest2.js'

gsap.registerPlugin(ScrollTrigger);

document.querySelector('#app')?.remove();
document.body.insertBefore(Header(), document.body.firstChild);

initStoreDownloadModal();

const isMobile = window.matchMedia('(max-width: 767px)').matches;

if (!isMobile) {
const headerHeight = document.querySelector('.header')?.getBoundingClientRect().height ?? 72;
const topUiOffset = Math.round(headerHeight);
const heroPinned = document.querySelector('.hero-pinned');

gsap.set('.img-02, .img-03', { x: '-50vw' });
gsap.set('.img-04, .img-05', { x: '50vw' });

if (heroPinned) {
  const overlayMap = [
    '.img-01 .img-overlay',
    '.img-03 .img-overlay',
    '.img-02 .img-overlay',
    '.img-05 .img-overlay',
    '.img-04 .img-overlay'
  ];
  const textMap = [
    '.img-01 .img-card-text',
    '.img-03 .img-card-text',
    '.img-02 .img-card-text',
    '.img-05 .img-card-text',
    '.img-04 .img-card-text'
  ];

  gsap.set(overlayMap, { opacity: 0 });
  gsap.set(textMap, { opacity: 0, y: 20 });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.hero-pinned',
      start: `top top+=${topUiOffset}`,
      end: '+=4000',
      pin: true,
      scrub: 0.55,
      invalidateOnRefresh: true
    }
  });

  tl.to('.hero-title', {
    opacity: 0,
    y: -50,
    duration: 1.5,
    ease: 'power2.out'
  }, 0);

  tl.to('.img-01', {
    width: '50vh',
    height: '66.6667vh',
    borderRadius: '8px',
    ease: 'power2.inOut',
    duration: 5
  }, 0);

  tl.to('.img-02', {
    x: 0,
    opacity: 1,
    duration: 1.4,
    ease: 'expo.out'
  }, 3);

  tl.to('.img-03', {
    x: 0,
    opacity: 1,
    duration: 1.4,
    ease: 'expo.out'
  }, 3.5);

  tl.to('.img-04', {
    x: 0,
    opacity: 1,
    duration: 1.4,
    ease: 'expo.out'
  }, 5);

  tl.to('.img-05', {
    x: 0,
    opacity: 1,
    duration: 1.4,
    ease: 'expo.out'
  }, 5.5);

  overlayMap.forEach((selector, index) => {
    tl.to(selector, {
      opacity: 1,
      duration: 0.3,
      ease: 'power1.out'
    }, 9.5 + index * 0.72);
  });

  textMap.forEach((selector, index) => {
    tl.to(selector, {
      opacity: 1,
      y: 0,
      duration: 0.35,
      ease: 'power2.out'
    }, 9.62 + index * 0.72);
  });
}

initSharedSections();
requestAnimationFrame(() => ScrollTrigger.refresh());
}
