import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import lottie from 'lottie-web';

gsap.registerPlugin(ScrollTrigger);

export function initSharedSections() {
  // Section 02 chart (SVG + GSAP path draw)
  const section02Chart = document.querySelector('.section-02__chart');
  if (section02Chart) {
    const accentPath = section02Chart.querySelector('.chart-line--accent');
    const basePath = section02Chart.querySelector('.chart-line--base');
    const chartCard = section02Chart.closest('.section-02__card--chart');
    const chartAlpha = chartCard?.querySelector('h3');
    const guideLine = chartCard?.querySelector('.section-02__guide-line');

    const primePathForDraw = (path) => {
      if (!path) return;
      const length = path.getTotalLength();
      path.style.strokeDasharray = String(length);
      path.style.strokeDashoffset = String(length);
      path.style.opacity = '1';
    };

    const primeGuideLineForDraw = (line) => {
      if (!line) return;
      line.style.transform = 'scaleX(0)';
      line.style.opacity = '1';
    };

    const syncSection02GuideLine = () => {
      if (!chartCard || !chartAlpha || !guideLine) return;
      const cardRect = chartCard.getBoundingClientRect();
      const titleRect = chartAlpha.getBoundingClientRect();
      const svgRect = section02Chart.getBoundingClientRect();
      const lineLeft = Math.round(titleRect.right - cardRect.left + 8);
      const accentEndX = (svgRect.left - cardRect.left) + (svgRect.width * (600 / 620));
      const lineRight = Math.round(accentEndX - 40);
      const lineWidth = Math.max(0, Math.round(lineRight - lineLeft));
      guideLine.style.left = `${lineLeft}px`;
      guideLine.style.top = `${Math.round(((titleRect.top + titleRect.bottom) / 2) - cardRect.top)}px`;
      guideLine.style.width = `${lineWidth}px`;
    };

    primePathForDraw(accentPath);
    primePathForDraw(basePath);
    syncSection02GuideLine();
    primeGuideLineForDraw(guideLine);

    if (chartAlpha) {
      gsap.set(chartAlpha, { opacity: 0, y: 8 });
    }

    window.addEventListener('resize', () => {
      syncSection02GuideLine();
      primeGuideLineForDraw(guideLine);
    });

    ScrollTrigger.create({
      trigger: '.section-02__card--chart',
      start: 'top 75%',
      once: true,
      onEnter: () => {
        if (!accentPath || !basePath) return;
        gsap.timeline()
          .to(basePath, {
            strokeDashoffset: 0,
            duration: 1.45,
            ease: 'power2.out'
          })
          .to(accentPath, {
            strokeDashoffset: 0,
            duration: 1.6,
            ease: 'power2.out'
          }, '+=0.08')
          .to(guideLine, {
            scaleX: 1,
            duration: 0.24,
            ease: 'power1.out'
          }, '>')
          .to(chartAlpha, {
            opacity: 1,
            y: 0,
            duration: 0.28,
            ease: 'power2.out'
          }, '<+=0.04');
      }
    });
  }

  // Section 02 right-bottom card hourglass lottie
  const hourglassLottieEl = document.querySelector('.section-02__hourglass-lottie');
  if (hourglassLottieEl) {
    const orange60 = [243 / 255, 117 / 255, 33 / 255, 1];
    const sourcePrimary = [0, 150 / 255, 64 / 255];
    const sourceSecondary = [230 / 255, 246 / 255, 234 / 255];
    const pickTargetColor = (arr) => {
      if (!Array.isArray(arr) || arr.length < 3) return false;
      if (!arr.slice(0, 3).every((value) => typeof value === 'number')) return false;
      const primaryDiff =
        Math.abs(arr[0] - sourcePrimary[0]) +
        Math.abs(arr[1] - sourcePrimary[1]) +
        Math.abs(arr[2] - sourcePrimary[2]);
      if (primaryDiff < 0.02) return orange60;

      const secondaryDiff =
        Math.abs(arr[0] - sourceSecondary[0]) +
        Math.abs(arr[1] - sourceSecondary[1]) +
        Math.abs(arr[2] - sourceSecondary[2]);
      if (secondaryDiff < 0.02) return [1, 1, 1, 1];

      return null;
    };
    const applyColor = (arr) => {
      const targetColor = pickTargetColor(arr);
      if (!targetColor) return;
      arr[0] = targetColor[0];
      arr[1] = targetColor[1];
      arr[2] = targetColor[2];
    };

    const recolorLottie = (node) => {
      if (!node) return;
      if (Array.isArray(node)) {
        node.forEach(recolorLottie);
        return;
      }
      if (typeof node !== 'object') return;

      if (node.c && typeof node.c === 'object' && 'k' in node.c) {
        const { k } = node.c;
        if (Array.isArray(k)) {
          if (typeof k[0] === 'number') {
            applyColor(k);
          } else {
            k.forEach((frame) => {
              if (frame && typeof frame === 'object') {
                if (Array.isArray(frame.s)) applyColor(frame.s);
                if (Array.isArray(frame.e)) applyColor(frame.e);
              }
            });
          }
        }
      }

      Object.values(node).forEach(recolorLottie);
    };

    fetch('/hourglass-loading.json')
      .then((res) => res.json())
      .then((rawData) => {
        const animationData = JSON.parse(JSON.stringify(rawData));
        recolorLottie(animationData);
        lottie.loadAnimation({
          container: hourglassLottieEl,
          renderer: 'svg',
          loop: true,
          autoplay: true,
          animationData
        });
      })
      .catch(() => {
        lottie.loadAnimation({
          container: hourglassLottieEl,
          renderer: 'svg',
          loop: true,
          autoplay: true,
          path: '/hourglass-loading.json'
        });
      });
  }

  // Section 01 bubble animation (scattered cloud reveal + ongoing drift)
  const section01Bubbles = document.querySelector('.section-01__bubbles');
  if (section01Bubbles) {
    const bubbles = Array.from(section01Bubbles.querySelectorAll('.section-01__bubble'));
    if (bubbles.length > 0) {
      bubbles.forEach((bubble) => {
        bubble.addEventListener('mouseenter', () => {
          bubble._cloudDriftTween?.pause();
        });

        bubble.addEventListener('mouseleave', () => {
          bubble._cloudDriftTween?.resume();
        });
      });

      gsap.set(bubbles, {
        autoAlpha: 0,
        x: 0,
        y: (index) => 10 + (index % 4) * 8
      });

      gsap.timeline({
        scrollTrigger: {
          trigger: section01Bubbles,
          start: 'center center',
          toggleActions: 'play none none none',
          once: true
        },
        onComplete: () => {
          bubbles.forEach((bubble, index) => {
            const driftX = 24 + (index % 4) * 10;
            const driftY = index % 2 === 0 ? -6 : 6;
            const duration = 6.5 + index * 0.35;

            bubble._cloudDriftTween = gsap.to(bubble, {
              x: `+=${driftX}`,
              y: `+=${driftY}`,
              duration,
              ease: 'sine.inOut',
              repeat: -1,
              yoyo: true
            });
          });
        }
      })
        .to(bubbles, {
          autoAlpha: 1,
          x: 0,
          y: 0,
          duration: 0.85,
          ease: 'power3.out',
          stagger: {
            each: 0.08,
            from: 'random'
          }
        });
    }
  }

  // Section 02 sub-logo cards animation
  const section02SubBlock = document.querySelector('.section-02__block--sub');
  if (section02SubBlock) {
    const redCard = section02SubBlock.querySelector('.section-02__logo-card--red');
    const greenCard = section02SubBlock.querySelector('.section-02__logo-card--green');
    const whiteCard = section02SubBlock.querySelector('.section-02__logo-card--white');
    const dropOrder = [whiteCard, greenCard, redCard].filter(Boolean);

    if (dropOrder.length > 0) {
      const physics = [
        { startY: -520, fall: 1.0, bounce: 8, impact: 3, driftX: 0 },
        { startY: -470, fall: 0.88, bounce: 7, impact: 4, driftX: -8 },
        { startY: -420, fall: 0.78, bounce: 6, impact: 5, driftX: 7 }
      ];
      const defaultPhysics = { startY: -260, fall: 0.9, bounce: 6, impact: 3, driftX: 0 };
      const exitPhysics = [
        { fallOut: 0.92, endY: 560, impact: 4 },
        { fallOut: 0.82, endY: 540, impact: 4 },
        { fallOut: 0.74, endY: 520, impact: 5 }
      ];

      const resetLogoCards = () => {
        gsap.set(dropOrder, {
          y: (index) => physics[index]?.startY ?? defaultPhysics.startY,
          x: (index) => physics[index]?.driftX ?? defaultPhysics.driftX,
          autoAlpha: 1,
          scaleX: 1,
          scaleY: 1,
          zIndex: 1,
          transformOrigin: '50% 100%'
        });
      };

      resetLogoCards();

      const logoTl = gsap.timeline({
        paused: true,
        repeat: -1,
        repeatDelay: 0,
        onRepeat: resetLogoCards
      });

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
          .to(card, { zIndex: 50 + index, duration: 0.02 }, cursor)
          .to(card, { y: 0, x: 0, duration: p.fall, ease: 'power4.in' }, cursor)
          .to(card, { scaleX: 1.05, scaleY: 0.92, duration: 0.07, ease: 'power1.out' }, impactAt)
          .to(card, { y: -p.bounce, scaleX: 0.99, scaleY: 1.02, duration: 0.16, ease: 'power2.out' }, impactAt + 0.05)
          .to(card, { y: 0, scaleX: 1, scaleY: 1, duration: 0.2, ease: 'power2.in' }, impactAt + 0.21)
          .to(card, { y: -Math.max(2, Math.round(p.bounce * 0.34)), duration: 0.08, ease: 'power1.out' }, impactAt + 0.41)
          .to(card, { y: 0, duration: 0.11, ease: 'power1.in' }, impactAt + 0.49)
          .to(card, { zIndex: index + 1, duration: 0.01 }, impactAt + 0.61);

        if (landedCards.length > 0) {
          logoTl
            .to(landedCards, { y: `+=${p.impact}`, duration: 0.07, ease: 'power1.out', stagger: 0.015 }, impactAt + 0.02)
            .to(landedCards, { y: `-=${p.impact}`, duration: 0.14, ease: 'power2.out', stagger: 0.015 }, impactAt + 0.09);
        }

        cursor += p.fall * overlapStartRatio;
      });

      const settledAt = Math.max(
        ...dropOrder.map((_, index) => {
          const p = physics[index] ?? defaultPhysics;
          const startAt = startTimes[index] ?? 0;
          return startAt + p.fall + 0.6;
        })
      );

      const exitStart = settledAt + 2;
      dropOrder.forEach((card, index) => {
        const exit = exitPhysics[index] ?? exitPhysics[exitPhysics.length - 1];
        const outAt = exitStart + index * 0.2;

        logoTl.to(card, {
          y: exit.endY,
          duration: exit.fallOut,
          ease: 'power4.in'
        }, outAt);

        const remainingCards = dropOrder.slice(index + 1);
        if (remainingCards.length > 0) {
          logoTl
            .to(remainingCards, { y: `+=${exit.impact}`, duration: 0.07, ease: 'power1.out', stagger: 0.015 }, outAt + 0.05)
            .to(remainingCards, { y: `-=${exit.impact}`, duration: 0.14, ease: 'power2.out', stagger: 0.015 }, outAt + 0.12);
        }
      });

      ScrollTrigger.create({
        trigger: section02SubBlock,
        start: 'top 78%',
        once: true,
        onEnter: () => logoTl.play(0)
      });
    }
  }

  // Section 03 comparison chart animation
  const compareChart = document.querySelector('.section-03__chart-block');
  if (compareChart) {
    const leftTopCard = document.querySelector('.section-03__card--left-top');
    const bars = ['.section-03__chart-bar--small', '.section-03__chart-bar--large'];
    const smallLine = '.section-03__chart-line--small';
    const largeLine = '.section-03__chart-line--large';
    const smallLabel = '.section-03__chart-label-group--small';
    const largeLabel = '.section-03__chart-label-group--large';

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
      .to(smallLine, { scaleX: 1, duration: 0.45, ease: 'power2.out' }, '-=0.5')
      .to(smallLabel, { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' }, '<+0.04')
      .to(largeLine, { scaleX: 1, duration: 0.45, ease: 'power2.out' }, '+=0.1')
      .to(largeLabel, { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' }, '<+0.04');
  }

  // Section 03 right-top card animation
  const monthlyCard = document.querySelector('.section-03__card--right-top');
  if (monthlyCard) {
    const amountEl = monthlyCard.querySelector('.section-03__monthly-amount');
    const notes = Array.from(monthlyCard.querySelectorAll('.section-03__monthly-note'));
    const targetAmount = Number(amountEl?.dataset.target ?? 194000);

    if (amountEl && notes.length > 0) {
      const counter = { value: 0 };
      amountEl.textContent = '0';
      gsap.set(amountEl, { y: 44, autoAlpha: 0 });
      gsap.set(notes, { y: 160, opacity: 0 });

      gsap.timeline({
        scrollTrigger: {
          trigger: monthlyCard,
          start: 'center center',
          toggleActions: 'play none none none',
          once: true
        }
      })
        .to(amountEl, {
          y: 0,
          autoAlpha: 1,
          duration: 0.7,
          ease: 'power3.out'
        }, 0)
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

  // Section 03 left-bottom invest card sequence
  const investCard = document.querySelector('.section-03__card--left-bottom');
  if (investCard) {
    const investUi = investCard.querySelector('.section-03__invest-ui');
    const investOverlay = investCard.querySelector('.section-03__invest-overlay');
    const investSheet = investCard.querySelector('.section-03__invest-sheet');
    const investPromptTitle = investCard.querySelector('.section-03__invest-sheet-title--prompt');
    const investTypedTitle = investCard.querySelector('.section-03__invest-sheet-title--typed');
    const investTypedValue = investCard.querySelector('.section-03__invest-sheet-typed');
    const investAmountValue = investCard.querySelector('.section-03__invest-field--amount .section-03__invest-value');
    const investTotalValue = investCard.querySelector('.section-03__invest-accent');
    if (investOverlay) {
      if (investUi) {
        gsap.set(investUi, { autoAlpha: 0, y: 48 });
      }
      gsap.set(investOverlay, { autoAlpha: 0 });
      if (investSheet) {
        gsap.set(investSheet, { yPercent: 100, autoAlpha: 1 });
      }
      if (investPromptTitle) {
        gsap.set(investPromptTitle, { autoAlpha: 1 });
      }
      if (investTypedTitle) {
        gsap.set(investTypedTitle, { autoAlpha: 0 });
      }
      if (investTypedValue) {
        investTypedValue.textContent = '1';
      }

      const investTl = gsap.timeline({
        scrollTrigger: {
          trigger: investCard,
          start: 'center center',
          toggleActions: 'play none none none',
          once: true
        }
      });

      if (investUi) {
        investTl.to(investUi, {
          autoAlpha: 1,
          y: 0,
          duration: 0.48,
          ease: 'power3.out'
        });
      }

      investTl.to(investOverlay, {
        autoAlpha: 1,
        duration: 0.28,
        ease: 'power2.out',
        delay: 1
      });

      if (investSheet) {
        investTl.to(investSheet, {
          yPercent: 0,
          duration: 0.48,
          ease: 'power3.out'
        }, '<');
      }

      if (investPromptTitle && investTypedTitle) {
        investTl
          .to({}, { duration: 1 })
          .to(investPromptTitle, { autoAlpha: 0, duration: 0.16, ease: 'power2.out' })
          .to(investTypedTitle, { autoAlpha: 1, duration: 0.16, ease: 'power2.out' }, '<');

        if (investTypedValue) {
          const typedSequence = ['1', '19', '194', '1,940', '19,400', '194,000'];
          typedSequence.forEach((value, index) => {
            investTl.call(() => {
              investTypedValue.textContent = value;
            }, [], `>+${index === 0 ? 0 : 0.16}`);
          });

          investTl.call(() => {
            const finalAmount = 194000;
            const totalMonths = 120;
            if (investAmountValue) {
              investAmountValue.textContent = `월 ${finalAmount.toLocaleString('ko-KR')}원`;
            }
            if (investTotalValue) {
              investTotalValue.textContent = `예상 총 증여 금액 ${(finalAmount * totalMonths).toLocaleString('ko-KR')}원`;
            }
          });
        }

        investTl
          .to({}, { duration: 2.5 })
          .to(investSheet, { yPercent: 100, duration: 0.42, ease: 'power3.in' })
          .to(investOverlay, { autoAlpha: 0, duration: 0.24, ease: 'power2.out' }, '<');
      }
    }
  }

  // Section 03 right-bottom card animation
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
          .to(item, { y: 0, duration: 0.36, ease: 'power2.in' }, startAt)
          .to(item, { y: 16, duration: 0.07, ease: 'power1.out' }, startAt + 0.36)
          .to(item, { y: 0, duration: 0.12, ease: 'power2.out' }, startAt + 0.43)
          .to(item, { y: 6, duration: 0.06, ease: 'power1.out' }, startAt + 0.55)
          .to(item, { y: 0, duration: 0.09, ease: 'power1.out' }, startAt + 0.61);
      });
    }
  }

  // Section 04 tax amount counter animation
  const taxCard = document.querySelector('.section-04__tax-card')?.closest('.section-04__card');
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
          start: 'top 80%',
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

  // Section 04 insight cards animation
  const insightCard = document.querySelector('.section-04__insight-list')?.closest('.section-04__card');
  if (insightCard) {
    const insightItems = insightCard.querySelectorAll('.section-04__insight-item');
    if (insightItems.length > 0) {
      const riseOrder = Array.from(insightItems).reverse();
      gsap.set(riseOrder, { y: 48, autoAlpha: 0 });

      gsap.timeline({
        scrollTrigger: {
          trigger: insightCard,
          start: 'top 80%',
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

  // Section 04 plan progress animation
  const planCard = document.querySelector('.section-04__plan-widget')?.closest('.section-04__card');
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
          start: 'top 80%',
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

  // Section 01b phone rail animation
  const section01b = document.querySelector('.section-01b');
  if (section01b) {
    const phoneWrap = section01b.querySelector('.section-01b__phone-wrap');
    if (phoneWrap) {
      const centerIndex = 4;
      let phoneCycleStarted = false;
      const initialPhoneOrder = [
        'img_mockup_07.png',
        'img_mockup_08.png',
        'img_mockup_09.png',
        'img_mockup_12.png',
        'img_mockup_01.png',
        'img_mockup_02.png',
        'img_mockup_03.png',
        'img_mockup_10.png'
      ];

      const getPhoneCards = () => Array.from(phoneWrap.querySelectorAll('.section-01b__phone-outline'));
      const resetPhoneCardsToInitialOrder = () => {
        const cards = getPhoneCards();
        const bySrc = new Map(
          cards.map((card) => {
            const image = card.querySelector('.section-01b__phone-image');
            const src = image?.getAttribute('src')?.split('/').pop() ?? '';
            return [src, card];
          })
        );

        initialPhoneOrder.forEach((src) => {
          const card = bySrc.get(src);
          if (card) {
            phoneWrap.appendChild(card);
          }
        });
      };
      const updatePhoneActiveState = () => {
        getPhoneCards().forEach((card, index) => {
          card.classList.toggle('is-active', index === centerIndex);
        });
      };

      const runPhoneCycle = () => {
        const cards = getPhoneCards();
        if (cards.length <= centerIndex + 1) return;

        const step = cards[0].getBoundingClientRect().width + parseFloat(getComputedStyle(phoneWrap).columnGap || getComputedStyle(phoneWrap).gap || '0');
        const currentCenterCard = cards[centerIndex];
        const nextCenterCard = cards[centerIndex + 1];
        const currentScreen = currentCenterCard?.querySelector('.section-01b__phone-screen');
        const nextScreen = nextCenterCard?.querySelector('.section-01b__phone-screen');

        if (currentScreen) {
          gsap.to(currentScreen, { opacity: 0.45, duration: 0.72, ease: 'power2.inOut' });
        }

        if (nextScreen) {
          gsap.to(nextScreen, { opacity: 1, duration: 0.72, ease: 'power2.inOut' });
        }

        gsap.to(phoneWrap, {
          x: -step,
          duration: 0.72,
          ease: 'power2.inOut',
          onComplete: () => {
            phoneWrap.appendChild(cards[0]);
            gsap.set(phoneWrap, { x: 0 });
            updatePhoneActiveState();
            gsap.delayedCall(2, runPhoneCycle);
          }
        });
      };

      resetPhoneCardsToInitialOrder();
      gsap.set(phoneWrap, { x: 0 });
      updatePhoneActiveState();

      ScrollTrigger.create({
        trigger: section01b,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          if (phoneCycleStarted) return;
          phoneCycleStarted = true;
          gsap.delayedCall(2, runPhoneCycle);
        }
      });
    }
  }
}
