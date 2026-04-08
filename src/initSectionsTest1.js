import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import lottie from 'lottie-web';

gsap.registerPlugin(ScrollTrigger);

export function initSharedSections() {
  const animatedCardStart = 'top 68%';

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
          start: 'top bottom',
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

  const initDroppingLogoStack = (block, selectors = {}, options = {}) => {
    if (!block) return;
    const repeat = options.repeat ?? true;
    const paused = options.paused ?? false;

    const redCard = block.querySelector(selectors.red ?? '.section-02__logo-card--red');
    const greenCard = block.querySelector(selectors.green ?? '.section-02__logo-card--green');
    const whiteCard = block.querySelector(selectors.white ?? '.section-02__logo-card--white');
    const dropOrder = (options.order ?? [whiteCard, greenCard, redCard]).filter(Boolean);

    if (dropOrder.length === 0) return;

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
      repeat: repeat ? -1 : 0,
      repeatDelay: 0,
      onRepeat: repeat ? resetLogoCards : undefined
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

    if (repeat) {
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
    }

    if (!paused) {
      ScrollTrigger.create({
        trigger: block,
        start: options.start ?? 'top 78%',
        once: true,
        onEnter: () => {
          if (options.introDelay) {
            gsap.delayedCall(options.introDelay, () => logoTl.play(0));
            return;
          }
          logoTl.play(0);
        }
      });
    }

    return logoTl;
  };

  const collectTargets = (...targets) => targets.flat().filter(Boolean);

  const createCardTextIntro = (card, selectors = {}) => {
    if (!card) return null;
    const headingTargets = collectTargets(
      selectors.title ? card.querySelector(selectors.title) : null,
      selectors.chip ? card.querySelector(selectors.chip) : null
    );
    const descriptionTarget = selectors.description ? card.querySelector(selectors.description) : null;

    if (headingTargets.length === 0 && !descriptionTarget) return null;

    gsap.set(headingTargets, { y: 20, autoAlpha: 0 });
    if (descriptionTarget) {
      gsap.set(descriptionTarget, { y: 16, autoAlpha: 0 });
    }

    return { headingTargets, descriptionTarget };
  };

  const addCardTextIntroToTimeline = (tl, intro, position = 0) => {
    if (!tl || !intro) return tl;

    if (intro.headingTargets.length > 0) {
      tl.to(intro.headingTargets, {
        y: 0,
        autoAlpha: 1,
        duration: 0.42,
        ease: 'power2.out',
        stagger: 0.05
      }, position);
    }

    if (intro.descriptionTarget) {
      tl.to(intro.descriptionTarget, {
        y: 0,
        autoAlpha: 1,
        duration: 0.38,
        ease: 'power2.out'
      }, intro.headingTargets.length > 0 ? '+=0.08' : position);
    }

    return tl;
  };

  // Section 02 sub-logo cards animation
  initDroppingLogoStack(document.querySelector('.section-02__block--sub'));
  const giftLinkTl = initDroppingLogoStack(document.querySelector('.section-04__gift-link-visual'), {
    red: '.section-04__gift-link-card--red',
    green: '.section-04__gift-link-card--green',
    white: '.section-04__gift-link-card--white'
  }, {
    repeat: false,
    paused: true,
    order: [
      document.querySelector('.section-04__gift-link-visual .section-04__gift-link-card--white'),
      document.querySelector('.section-04__gift-link-visual .section-04__gift-link-card--red'),
      document.querySelector('.section-04__gift-link-visual .section-04__gift-link-card--green')
    ]
  });

  // Section 03 comparison chart animation
  const compareChart = document.querySelector('.section-03__chart-block');
  if (compareChart) {
    const leftTopCard = document.querySelector('.section-03__card--left-top');
    const leftTopIntro = createCardTextIntro(leftTopCard, {
      title: '.section-03__card-head h3',
      chip: '.section-03__card-head .section-03__chip',
      description: ':scope > p'
    });
    const bars = ['.section-03__chart-bar--small', '.section-03__chart-bar--large'];
    const smallLine = '.section-03__chart-line--small';
    const largeLine = '.section-03__chart-line--large';
    const smallLabel = '.section-03__chart-label-group--small';
    const largeLabel = '.section-03__chart-label-group--large';

    gsap.set(bars, { transformOrigin: 'center bottom', scaleY: 0, y: 20, opacity: 1 });
    gsap.set([smallLine, largeLine], { scaleX: 0, opacity: 1 });
    gsap.set([smallLabel, largeLabel], { opacity: 0, y: 10 });

    const chartTl = gsap.timeline({
      scrollTrigger: {
        trigger: leftTopCard || compareChart,
        start: animatedCardStart,
        toggleActions: 'play none none none',
        once: true
      }
    });

    addCardTextIntroToTimeline(chartTl, leftTopIntro, 0);

    chartTl
      .to(bars, {
        scaleY: 1,
        y: 0,
        duration: 1.15,
        ease: 'power3.out',
        stagger: 0.18
      }, '+=0.08')
      .to(smallLine, { scaleX: 1, duration: 0.45, ease: 'power2.out' }, '-=0.5')
      .to(smallLabel, { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' }, '<+0.04')
      .to(largeLine, { scaleX: 1, duration: 0.45, ease: 'power2.out' }, '+=0.1')
      .to(largeLabel, { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' }, '<+0.04');
  }

  // Section 03 right-top card animation
  const monthlyCard = document.querySelector('.section-03__card--right-top');
  if (monthlyCard) {
    const monthlyIntro = createCardTextIntro(monthlyCard, {
      title: '.section-03__card-head h3',
      chip: '.section-03__card-head .section-03__chip',
      description: ':scope > p'
    });
    const amountEl = monthlyCard.querySelector('.section-03__monthly-amount');
    const notes = Array.from(monthlyCard.querySelectorAll('.section-03__monthly-note'));
    const targetAmount = Number(amountEl?.dataset.target ?? 194000);

    if (amountEl && notes.length > 0) {
      const counter = { value: 0 };
      amountEl.textContent = '0';
      gsap.set(amountEl, { y: 44, autoAlpha: 0 });
      gsap.set(notes, { y: 160, opacity: 0 });

      const monthlyTl = gsap.timeline({
        scrollTrigger: {
          trigger: monthlyCard,
          start: animatedCardStart,
          toggleActions: 'play none none none',
          once: true
        }
      });

      addCardTextIntroToTimeline(monthlyTl, monthlyIntro, 0);
      const monthlyContentStart = monthlyTl.duration() + 0.08;

      monthlyTl
        .to(amountEl, {
          y: 0,
          autoAlpha: 1,
          duration: 0.7,
          ease: 'power3.out'
        }, monthlyContentStart)
        .to(notes, {
          y: 0,
          opacity: 1,
          duration: 1.1,
          ease: 'power3.out',
          stagger: 0.12
        }, monthlyContentStart + 0.08)
        .to(counter, {
          value: targetAmount,
          duration: 1.35,
          ease: 'power2.out',
          onUpdate: () => {
            amountEl.textContent = Math.round(counter.value).toLocaleString('ko-KR');
          }
        }, monthlyContentStart + 0.22);
    }
  }

  // Section 03 left-bottom invest card sequence
  const investCard = document.querySelector('.section-03__invest-visual')?.closest('.section-03__card');
  if (investCard) {
    const investIntro = createCardTextIntro(investCard, {
      title: '.section-03__card-head h3',
      chip: '.section-03__card-head .section-03__chip',
      description: ':scope > p'
    });
    const investUi = investCard.querySelector('.section-03__invest-ui');
    const docChecklist = investCard.querySelector('.section-03__doc-card-screen--checklist');
    const docComplete = investCard.querySelector('.section-03__doc-card-screen--complete');
    const docCompleteIcon = investCard.querySelector('.section-03__doc-complete-icon');
    const docCompleteTitle = investCard.querySelector('.section-03__doc-complete-title');
    const docCompleteBody = investCard.querySelector('.section-03__doc-complete-body');
    const docCardHead = investCard.querySelector('.section-03__doc-card-head');
    const docItems = investCard.querySelectorAll('.section-03__doc-item');
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
    } else if (investUi && docCardHead && docItems.length > 0) {
      const resetDocCardState = (planeY = 28) => {
        gsap.set(investUi, { y: planeY, autoAlpha: 0 });
        if (docChecklist) {
          gsap.set(docChecklist, { y: 0, autoAlpha: 1 });
        }
        if (docComplete) {
          gsap.set(docComplete, { y: 0, autoAlpha: 1 });
        }
        if (docCompleteIcon) {
          gsap.set(docCompleteIcon, { y: 18, autoAlpha: 0 });
        }
        if (docCompleteTitle) {
          gsap.set(docCompleteTitle, { y: 18, autoAlpha: 0 });
        }
        if (docCompleteBody) {
          gsap.set(docCompleteBody, { y: 18, autoAlpha: 0 });
        }
        gsap.set(docCardHead, { y: 18, autoAlpha: 0 });
        gsap.set(docItems, { y: 18, autoAlpha: 0 });
      };

      resetDocCardState();

      const docTl = gsap.timeline({
        paused: true,
        repeat: -1
      })
        .to(investUi, {
          y: 0,
          autoAlpha: 1,
          duration: 0.5,
          ease: 'power3.out'
        })
        .to(docCardHead, {
          y: 0,
          autoAlpha: 1,
          duration: 0.4,
          ease: 'power2.out'
        }, '<+=0.08')
        .to(docItems, {
          y: 0,
          autoAlpha: 1,
          duration: 0.38,
          ease: 'power2.out',
          stagger: 0.16
        }, '+=0.08')
        .to({}, { duration: 2 })
        .to(docChecklist || investUi, {
          y: -24,
          autoAlpha: 0,
          duration: 0.34,
          ease: 'power2.inOut'
        })
        .to(docCompleteIcon, {
          y: 0,
          autoAlpha: 1,
          duration: 0.34,
          ease: 'power3.out'
        }, '<+0.06');

      docTl
        .to(docCompleteTitle, {
          y: 0,
          autoAlpha: 1,
          duration: 0.32,
          ease: 'power2.out'
        }, '+=0.06')
        .to(docCompleteBody, {
          y: 0,
          autoAlpha: 1,
          duration: 0.34,
          ease: 'power2.out'
        }, '+=0.05')
        .to({}, { duration: 5 })
        .to(investUi, {
          y: 28,
          autoAlpha: 0,
          duration: 0.42,
          ease: 'power3.in'
        })
        .call(() => {
          resetDocCardState(28);
        });

      const investIntroTl = gsap.timeline({
        scrollTrigger: {
          trigger: investCard,
          start: animatedCardStart,
          toggleActions: 'play none none none',
          once: true
        },
        onComplete: () => docTl.play(0)
      });

      addCardTextIntroToTimeline(investIntroTl, investIntro, 0);
    }
  }

  // Section 03 right-bottom card animation
  const etfCard = document.querySelector('.section-03__etf-visual')?.closest('.section-03__card');
  if (etfCard) {
    const etfIntro = createCardTextIntro(etfCard, {
      title: '.section-03__card-head h3',
      chip: '.section-03__card-head .section-03__chip',
      description: ':scope > p'
    });
    const etfItems = etfCard.querySelectorAll('.section-03__etf-item');
    if (etfItems.length > 0) {
      const dropOrder = Array.from(etfItems).reverse();
      const etfPercentSteps = [5, 6.5, 8, 9.5, 11, 12];
      const parseCurrency = (value) => Number(value.replace(/[^\d]/g, ''));
      const formatCurrency = (value) => `${Math.round(value).toLocaleString('ko-KR')}원`;
      const formatGain = (gain, percent) => `+${Math.round(gain).toLocaleString('ko-KR')} (${percent.toFixed(2)}%)`;
      const etfValueRows = Array.from(etfItems).map((item) => {
        const priceEl = item.querySelector('.section-03__etf-price');
        const changeEl = item.querySelector('.section-03__etf-change');
        const initialTotal = parseCurrency(priceEl.textContent);
        const principal = initialTotal / 1.05;

        return {
          priceEl,
          changeEl,
          valueState: { total: initialTotal, gain: initialTotal - principal, percent: 5 },
          principal
        };
      });

      const updateEtfValueRow = (row) => {
        row.priceEl.textContent = formatCurrency(row.valueState.total);
        row.changeEl.textContent = formatGain(row.valueState.gain, row.valueState.percent);
      };

      const animateEtfStep = (timeline, percent, position) => {
        etfValueRows.forEach((row, rowIndex) => {
          const targetTotal = row.principal * (1 + percent / 100);
          const targetGain = targetTotal - row.principal;

          timeline.to(row.valueState, {
            total: targetTotal,
            gain: targetGain,
            percent,
            duration: 0.9,
            ease: 'power2.out',
            onUpdate: () => updateEtfValueRow(row),
            onComplete: () => updateEtfValueRow(row)
          }, position + rowIndex * 0.02);
        });
      };

      gsap.set(dropOrder, { y: -80, opacity: 0 });

      const etfTl = gsap.timeline({
        scrollTrigger: {
          trigger: etfCard,
          start: animatedCardStart,
          toggleActions: 'play none none none',
          once: true
        }
      });

      addCardTextIntroToTimeline(etfTl, etfIntro, 0);
      const etfContentStart = etfTl.duration() + 0.08;

      dropOrder.forEach((item, index) => {
        const startAt = etfContentStart + index * 0.24;

        etfTl
          .to(item, { opacity: 1, duration: 0.02 }, startAt)
          .to(item, { y: 0, duration: 0.36, ease: 'power2.in' }, startAt)
          .to(item, { y: 16, duration: 0.07, ease: 'power1.out' }, startAt + 0.36)
          .to(item, { y: 0, duration: 0.12, ease: 'power2.out' }, startAt + 0.43)
          .to(item, { y: 6, duration: 0.06, ease: 'power1.out' }, startAt + 0.55)
          .to(item, { y: 0, duration: 0.09, ease: 'power1.out' }, startAt + 0.61);
      });

      etfValueRows.forEach((row) => updateEtfValueRow(row));

      let valueStepStart = etfContentStart + (dropOrder.length - 1) * 0.24 + 0.7 + 5;
      etfPercentSteps.slice(1).forEach((percent) => {
        animateEtfStep(etfTl, percent, valueStepStart);
        valueStepStart += 5;
      });
    }
  }

  // Section 04 tax amount counter animation
  const taxCard = document.querySelector('.section-04__tax-card')?.closest('.section-04__card');
  if (taxCard) {
    const taxIntro = createCardTextIntro(taxCard, {
      title: '.section-04__card-copy-bottom h3',
      description: '.section-04__card-copy-bottom p'
    });
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
          start: animatedCardStart,
          toggleActions: 'play none none none',
          once: true
        }
      });

      addCardTextIntroToTimeline(taxTl, taxIntro, 0);
      const taxContentStart = taxTl.duration() + 0.08;

      if (taxBodyCard) {
        taxTl.to(taxBodyCard, {
          y: 0,
          autoAlpha: 1,
          duration: 0.45,
          ease: 'power3.out'
        }, taxContentStart);
      }

      taxTl
        .to(counter, {
          value: targetAmount * 0.88,
          duration: 0.15,
          ease: 'power1.out',
          onUpdate: () => {
            taxAmountEl.textContent = formatAmount(counter.value);
          }
        }, taxContentStart + 0.02)
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
        }, taxContentStart + 0.45);
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
    const planIntro = createCardTextIntro(planCard, {
      title: ':scope > h3',
      description: ':scope > p'
    });
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
      const primaryExpandedTarget = 20000000;
      const secondaryTarget = parseTarget(secondaryAmountEl);
      const primaryCounter = { value: 0 };
      const secondaryCounter = { value: 0 };
      const resetPlanState = () => {
        primaryCounter.value = 0;
        secondaryCounter.value = 0;
        gsap.set(lightBar, { scaleX: 0 });
        gsap.set(darkBar, { scaleX: 0, width: '25%' });
        if (planWidget) {
          gsap.set(planWidget, { y: 20, autoAlpha: 0 });
        }
        if (primaryAmountEl) {
          primaryAmountEl.textContent = formatWonCounter(0);
        }
        if (secondaryAmountEl) {
          secondaryAmountEl.textContent = formatWonCounter(0);
        }
      };

      gsap.set([lightBar, darkBar], { scaleX: 0, transformOrigin: 'left center' });
      resetPlanState();

      const planTl = gsap.timeline({
        paused: true,
        repeat: -1
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

      if (primaryAmountEl) {
        planTl
          .to({}, { duration: 2 })
          .to(primaryCounter, {
            value: primaryExpandedTarget,
            duration: 2.5,
            ease: 'power2.out',
            onUpdate: () => {
              primaryAmountEl.textContent = formatWonCounter(primaryCounter.value);
            },
            onComplete: () => {
              primaryAmountEl.textContent = formatWonCounter(primaryExpandedTarget);
            }
          })
          .to(darkBar, {
            width: '100%',
            duration: 2.5,
            ease: 'power2.out'
          }, '<')
          .to({}, { duration: 5 })
          .to(planWidget, {
            y: -16,
            autoAlpha: 0,
            duration: 0.3,
            ease: 'power2.in'
          })
          .call(resetPlanState)
          .to(planWidget, {
            y: 0,
            autoAlpha: 1,
            duration: 0.45,
            ease: 'power3.out'
          });

        planTl
          .to(lightBar, {
            scaleX: 1,
            duration: 0.75,
            ease: 'power2.out'
          }, '+=0.04')
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
          }, '+=0.08')
          .to(primaryCounter, {
            value: primaryTarget,
            duration: 0.55,
            ease: 'power2.out',
            onUpdate: () => {
              primaryAmountEl.textContent = formatWonCounter(primaryCounter.value);
            }
          }, '<')
          .to({}, { duration: 2 })
          .to(primaryCounter, {
            value: primaryExpandedTarget,
            duration: 2.5,
            ease: 'power2.out',
            onUpdate: () => {
              primaryAmountEl.textContent = formatWonCounter(primaryCounter.value);
            },
            onComplete: () => {
              primaryAmountEl.textContent = formatWonCounter(primaryExpandedTarget);
            }
          })
          .to(darkBar, {
            width: '100%',
            duration: 2.5,
            ease: 'power2.out'
          }, '<')
          .to({}, { duration: 5 })
          .to(planWidget, {
            y: -16,
            autoAlpha: 0,
            duration: 0.3,
            ease: 'power2.in'
          })
          .call(resetPlanState);
      }

      const planIntroTl = gsap.timeline({
        scrollTrigger: {
          trigger: planCard,
          start: animatedCardStart,
          toggleActions: 'play none none none',
          once: true
        },
        onComplete: () => planTl.play(0)
      });

      addCardTextIntroToTimeline(planIntroTl, planIntro, 0);
    }
  }

  // Section 04 family app card animation
  const familyAppCard = document.querySelector('.section-04__card--wide-bottom-test1');
  if (familyAppCard) {
    const familyIntro = createCardTextIntro(familyAppCard, {
      title: '.section-04__card-copy-bottom h3',
      description: '.section-04__card-copy-bottom p'
    });
    const familyApp = familyAppCard.querySelector('.section-04__family-app');
    const familyTopImageBase = familyAppCard.querySelector('.section-04__family-app-top-image--base');
    const familyTopImageNext = familyAppCard.querySelector('.section-04__family-app-top-image--next');
    const familyBadges = familyAppCard.querySelector('.section-04__family-app-badges');
    const familyBadgeItems = familyBadges ? Array.from(familyBadges.querySelectorAll('.section-04__family-app-badge')) : [];
    const familyOliveBadge = familyAppCard.querySelector('.section-04__family-app-badge--olive');
    const familyBlueBadge = familyAppCard.querySelector('.section-04__family-app-badge--blue');
    const familySheetTitle = familyAppCard.querySelector('.section-04__family-app-sheet h4');
    const familySummaryCard = familyAppCard.querySelector('.section-04__family-app-summary');
    const familyPrimaryAmount = familyAppCard.querySelector('.section-04__family-app-summary-primary-amount');
    const familySecondaryAmount = familyAppCard.querySelector('.section-04__family-app-summary-sub-value');
    const familySelectedClass = 'section-04__family-app-badge--selected';
    const familyStateValues = {
      blue: '7,500,000원',
      olive: '5,000,000원'
    };

    const syncFamilyAmounts = (value) => {
      if (familyPrimaryAmount) familyPrimaryAmount.textContent = value;
      if (familySecondaryAmount) familySecondaryAmount.textContent = value;
    };

    const animateFamilySheetContent = () => {
      const targets = [familySheetTitle, familySummaryCard].filter(Boolean);
      if (targets.length === 0) return;
      gsap.fromTo(targets, {
        y: 16,
        autoAlpha: 0
      }, {
        y: 0,
        autoAlpha: 1,
        duration: 0.36,
        ease: 'power2.out',
        stagger: 0.06,
        overwrite: true
      });
    };

    const setFamilyImageState = (selected, animated = false) => {
      if (!familyTopImageBase || !familyTopImageNext) return;
      const showNext = selected === 'olive';
      if (!animated) {
        gsap.set(familyTopImageBase, { autoAlpha: showNext ? 0 : 1 });
        gsap.set(familyTopImageNext, { autoAlpha: showNext ? 1 : 0 });
        return;
      }

      gsap.to(familyTopImageNext, {
        autoAlpha: showNext ? 1 : 0,
        duration: 0.28,
        ease: 'power2.out',
        overwrite: true
      });
      gsap.to(familyTopImageBase, {
        autoAlpha: showNext ? 0 : 1,
        duration: 0.28,
        ease: 'power2.out',
        overwrite: true
      });
    };

    const applyFamilySelectedState = (selected, options = {}) => {
      const { animateContent = true, animateImage = true } = options;
      if (!familyOliveBadge || !familyBlueBadge) return;

      if (selected === 'olive') {
        familyBlueBadge.classList.remove(familySelectedClass);
        familyOliveBadge.classList.add(familySelectedClass);
        syncFamilyAmounts(familyStateValues.olive);
      } else {
        familyOliveBadge.classList.remove(familySelectedClass);
        familyBlueBadge.classList.add(familySelectedClass);
        syncFamilyAmounts(familyStateValues.blue);
      }

      setFamilyImageState(selected, animateImage);

      if (animateContent) {
        animateFamilySheetContent();
      }
    };

    applyFamilySelectedState('blue', {
      animateContent: false,
      animateImage: false
    });

    if (familyApp) {
      gsap.set(familyApp, { y: 56, autoAlpha: 0 });
    }

    if (familyBadges) {
      gsap.set(familyBadges, { y: 20, autoAlpha: 0 });
    }

    if (familyBadgeItems.length >= 3) {
      gsap.set(familyBadgeItems[1], { x: 0 });
      gsap.set(familyBadgeItems[2], { x: 0 });
    }

    if (familyApp || familyBadges) {
      const familyTl = gsap.timeline({
        scrollTrigger: {
          trigger: familyAppCard,
          start: animatedCardStart,
          toggleActions: 'play none none none',
          once: true
        }
      });

      addCardTextIntroToTimeline(familyTl, familyIntro, 0);
      const familyContentStart = familyTl.duration() + 0.08;

      if (familyApp) {
        familyTl.to(familyApp, {
          y: 0,
          autoAlpha: 1,
          duration: 0.58,
          ease: 'power3.out'
        }, familyContentStart);
      }

      if (familyBadges) {
        familyTl.to(familyBadges, {
          y: 0,
          autoAlpha: 1,
          duration: 0.42,
          ease: 'power2.out'
        }, familyContentStart + 0.18);
      }

      familyTl.call(() => {
        if (familyBadgeItems.length < 3 || !familyOliveBadge || !familyBlueBadge) return;

        const badgeLoop = gsap.timeline()
          .to({}, { duration: 4 })
          // first spread
          .to(familyBadgeItems[1], {
            x: 54,
            duration: 0.42,
            ease: 'power2.out'
          }, '+=0.65')
          .to(familyBadgeItems[2], {
            x: 108,
            duration: 0.42,
            ease: 'power2.out'
          }, '<')
          // select olive
          .call(() => {
            applyFamilySelectedState('olive', {
              animateContent: true,
              animateImage: true
            });
          }, [], '+=0.45')
          // fold with olive on top
          .to(familyBadgeItems[1], {
            x: 36,
            duration: 0.36,
            ease: 'power2.inOut'
          }, '+=0.45')
          .to(familyBadgeItems[2], {
            x: -36,
            duration: 0.36,
            ease: 'power2.inOut'
          }, '<')
          // hold on olive folded state
          .to({}, { duration: 4 })
          // spread again, then switch back to blue
          .to(familyBadgeItems[1], {
            x: 54,
            duration: 0.42,
            ease: 'power2.out'
          })
          .to(familyBadgeItems[2], {
            x: 108,
            duration: 0.42,
            ease: 'power2.out'
          }, '<')
          .call(() => {
            applyFamilySelectedState('blue', {
              animateContent: true,
              animateImage: true
            });
          }, [], '+=0.45')
          .to(familyBadgeItems[1], {
            x: 0,
            duration: 0.36,
            ease: 'power2.inOut'
          }, '+=0.45')
          .to(familyBadgeItems[2], {
            x: 0,
            duration: 0.36,
            ease: 'power2.inOut'
          }, '<');

        badgeLoop.repeat(-1);
      });
    }
  }

  const giftLinkCard = document.querySelector('.section-04__gift-link-visual')?.closest('.section-04__card');
  if (giftLinkCard && giftLinkTl) {
    const giftLinkIntro = createCardTextIntro(giftLinkCard, {
      title: ':scope > h3',
      description: ':scope > p'
    });

    const giftLinkIntroTl = gsap.timeline({
      scrollTrigger: {
        trigger: giftLinkCard,
        start: animatedCardStart,
        toggleActions: 'play none none none',
        once: true
      },
      onComplete: () => giftLinkTl.play(0)
    });

    addCardTextIntroToTimeline(giftLinkIntroTl, giftLinkIntro, 0);
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
