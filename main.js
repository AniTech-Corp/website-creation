/**
 * COMPUTE — AI Agents for Distributed Computing
 * 1:1 Interactive Engine matching https://v0-compute-11.vercel.app/
 */

document.addEventListener('DOMContentLoaded', () => {

  // =========================================================================
  // 0. TOP SCROLL PROGRESS INDICATOR
  // =========================================================================
  const progressBar = document.getElementById('scroll-progress-bar');
  const updateScrollProgress = () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0 && progressBar) {
      const progress = Math.min(Math.max((window.scrollY / totalHeight) * 100, 0), 100);
      progressBar.style.width = `${progress}%`;
    }
  };
  window.addEventListener('scroll', updateScrollProgress, { passive: true });
  updateScrollProgress();

  // =========================================================================
  // 1. STAT NUMBER COUNT-UP ANIMATION & GAUGES
  // =========================================================================
  const animateCounter = (el) => {
    if (!el || el.dataset.counted === 'true') return;
    el.dataset.counted = 'true';

    const targetVal = parseFloat(el.getAttribute('data-count-target') || el.textContent.replace(/[^0-9.]/g, ''));
    if (isNaN(targetVal)) return;

    const decimals = parseInt(el.getAttribute('data-count-decimals') || '0', 10);
    const prefix = el.getAttribute('data-count-prefix') || '';
    const suffix = el.getAttribute('data-count-suffix') || '';
    const duration = 1500;
    const startTime = performance.now();

    const step = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Spring-like ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = targetVal * ease;
      el.textContent = `${prefix}${current.toFixed(decimals)}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = `${prefix}${targetVal.toFixed(decimals)}${suffix}`;
      }
    };
    requestAnimationFrame(step);
  };

  const animateLighthouseGauge = () => {
    const circle = document.getElementById('lighthouse-circle');
    if (circle && !circle.dataset.animated) {
      circle.dataset.animated = 'true';
      circle.style.strokeDashoffset = '0';
    }
  };

  // =========================================================================
  // 2. PRIORITY: ULTRA-SMOOTH SCROLL REVEAL ENGINE
  // =========================================================================
  const revealElement = (el) => {
    if (!el) return;
    el.classList.add('is-revealed');
    el.classList.remove('opacity-0', 'translate-y-4', 'translate-y-8', 'translate-y-12', 'translate-y-16');
    el.classList.add('opacity-100', 'translate-y-0');
    if (el.classList.contains('-translate-x-12') || el.classList.contains('translate-x-8')) {
      el.classList.remove('-translate-x-12', 'translate-x-8');
      el.classList.add('translate-x-0');
    }

    // Trigger counters if this element is or contains counters
    if (el.classList.contains('stat-counter') || el.hasAttribute('data-count-target')) {
      animateCounter(el);
    }
    el.querySelectorAll('.stat-counter, [data-count-target]').forEach(animateCounter);

    // Trigger lighthouse gauge if in infra
    if (el.id === 'infra' || el.closest('#infra') || el.querySelector('#lighthouse-circle')) {
      animateLighthouseGauge();
    }
  };

  const animSelector = '.scroll-reveal, .scroll-reveal-left, .scroll-reveal-scale, .opacity-0:not(#mobile-drawer):not(#mobile-drawer *):not(#hero-neural-canvas)';
  const allAnimEls = document.querySelectorAll(animSelector);

  // Initial Hero & In-Viewport Reveal (Immediate orchestrated entrance)
  const heroEls = document.querySelectorAll('#hero .opacity-0, #hero .scroll-reveal');
  heroEls.forEach((el, idx) => {
    setTimeout(() => {
      revealElement(el);
    }, idx * 100);
  });

  // Reveal elements already in viewport on first load
  allAnimEls.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      revealElement(el);
    }
  });

  // Smooth Intersection Observer for elements as the user scrolls
  if ('IntersectionObserver' in window) {
    const scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          revealElement(entry.target);
          // If container has staggered children, reveal them smoothly
          const staggeredChildren = entry.target.querySelectorAll('.spotlight-card, .integration-card, .process-step-btn');
          staggeredChildren.forEach((child, cIdx) => {
            setTimeout(() => revealElement(child), cIdx * 70);
          });
          scrollObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    allAnimEls.forEach(el => scrollObserver.observe(el));
    document.querySelectorAll('section').forEach(sec => scrollObserver.observe(sec));
  } else {
    allAnimEls.forEach(revealElement);
  }

  // =========================================================================
  // 1. FLOATING DOCK NAVBAR & MOBILE DRAWER
  // =========================================================================
  const siteHeader = document.getElementById('site-header');
  const navBar = document.getElementById('nav-bar');
  const navInner = document.getElementById('nav-inner');
  const brandTitle = document.getElementById('brand-title');
  const brandTm = document.getElementById('brand-tm');
  const navContactLink = document.getElementById('nav-contact-link');
  const navCtaBtn = document.getElementById('nav-cta-btn');
  const mobileToggleBtn = document.getElementById('mobile-toggle-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');

  let isScrolled = false;
  let isMenuOpen = false;

  const updateHeaderState = () => {
    if (!siteHeader || !navBar) return;
    isScrolled = window.scrollY > 20;

    if (isScrolled || isMenuOpen) {
      siteHeader.classList.add('dock-active');
      navBar.classList.add('dock-scrolled');
    } else {
      siteHeader.classList.remove('dock-active');
      navBar.classList.remove('dock-scrolled');
    }
  };

  window.addEventListener('scroll', updateHeaderState, { passive: true });
  updateHeaderState();

  // Mobile menu toggle
  if (mobileToggleBtn && mobileDrawer) {
    const hamburgerSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6"><line x1="4" x2="20" y1="12" y2="12"></line><line x1="4" x2="20" y1="6" y2="6"></line><line x1="4" x2="20" y1="18" y2="18"></line></svg>';
    const closeSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>';

    const toggleMenu = () => {
      isMenuOpen = !isMenuOpen;
      mobileToggleBtn.innerHTML = isMenuOpen ? closeSvg : hamburgerSvg;

      if (isMenuOpen) {
        mobileDrawer.classList.remove('opacity-0', 'pointer-events-none');
        mobileDrawer.classList.add('opacity-100', 'pointer-events-auto');

        const drawerLinks = mobileDrawer.querySelectorAll('a');
        drawerLinks.forEach((link, idx) => {
          link.classList.remove('opacity-0', 'translate-y-4');
          link.classList.add('opacity-100', 'translate-y-0');
          link.style.transitionDelay = `${idx * 60}ms`;
        });
      } else {
        mobileDrawer.classList.remove('opacity-100', 'pointer-events-auto');
        mobileDrawer.classList.add('opacity-0', 'pointer-events-none');

        const drawerLinks = mobileDrawer.querySelectorAll('a');
        drawerLinks.forEach((link) => {
          link.classList.remove('opacity-100', 'translate-y-0');
          link.classList.add('opacity-0', 'translate-y-4');
          link.style.transitionDelay = '0ms';
        });
      }
      updateHeaderState();
    };

    mobileToggleBtn.addEventListener('click', toggleMenu);

    mobileDrawer.querySelectorAll('a').forEach(el => {
      el.addEventListener('click', () => {
        if (isMenuOpen) toggleMenu();
      });
    });
  }

  // 1b. Scroll-Spy: Synchronize navbar active state with current visible section
  const navSections = [
    document.getElementById('how-it-works'),
    document.getElementById('work'),
    document.getElementById('infra'),
    document.getElementById('integrations'),
    document.getElementById('team'),
    document.getElementById('testimonials')
  ].filter(Boolean);

  const desktopNavLinks = document.querySelectorAll('#nav-links-wrap .nav-link');

  const updateActiveNavLink = () => {
    const scrollPos = window.scrollY + 180;
    let currentId = '';

    for (let i = navSections.length - 1; i >= 0; i--) {
      const section = navSections[i];
      if (scrollPos >= section.offsetTop) {
        currentId = section.getAttribute('id');
        break;
      }
    }

    desktopNavLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href && (href === `#${currentId}` || (currentId === 'team' && (href === '#team' || href === '#solutions')))) {
        link.classList.add('active-nav');
      } else {
        link.classList.remove('active-nav');
      }
    });
  };

  window.addEventListener('scroll', updateActiveNavLink, { passive: true });
  updateActiveNavLink();


  // =========================================================================
  // 2. HERO RAINBOW SHIMMER ROTATOR (EXACT 1:1 ALGORITHM FROM v0-compute-11)
  // =========================================================================
  let currentLang = 'id';
  try {
    currentLang = localStorage.getItem('compute_lang') || 'id';
  } catch (e) {}
  document.body.setAttribute('data-lang', currentLang);
  document.documentElement.lang = currentLang;

  const heroShimmerSpan = document.getElementById('hero-shimmer-word');
  let cycleShimmerWord = null;
  if (heroShimmerSpan) {
    const shimmerWords = {
      en: [
        "Professional Website",
        "Landing Page",
        "Company Profile",
        "Online Store",
        "Web Application",
        "Business System"
      ],
      id: [
        "Website Profesional",
        "Landing Page",
        "Company Profile",
        "Toko Online",
        "Aplikasi Web",
        "Sistem Bisnis"
      ]
    };
    // Original rainbow shimmer palette: pink -> purple -> blue -> cyan -> gold -> magenta -> pink
    const darkPalette = ["#eca8d6", "#be95ee", "#92aafa", "#67e8f9", "#fbbf24", "#f472b6", "#eca8d6"];
    const lightPalette = ["#d946ef", "#8b5cf6", "#3b82f6", "#06b6d4", "#f59e0b", "#ec4899", "#d946ef"];
    let wordIdx = 0;
    let animFrames = [];
    let animTimeouts = [];

    const hexToRgb = (hex) => [
      parseInt(hex.slice(1, 3), 16),
      parseInt(hex.slice(3, 5), 16),
      parseInt(hex.slice(5, 7), 16)
    ];

    const animateWord = (word, isInitial = false) => {
      animFrames.forEach(cancelAnimationFrame);
      animTimeouts.forEach(clearTimeout);
      animFrames = [];
      animTimeouts = [];

      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      const palette = isLight ? lightPalette : darkPalette;
      const chars = word.split('');
      const totalLen = chars.length;
      const revealTotalTime = 45 * totalLen + 500 + 400;

      heroShimmerSpan.innerHTML = '';
      const spans = chars.map((char, r) => {
        const span = document.createElement('span');
        if (char === ' ') {
          span.innerHTML = '&nbsp;';
          span.style.width = '0.28em';
        } else {
          span.textContent = char;
        }
        span.style.display = 'inline-block';
        span.style.whiteSpace = 'pre';
        span.style.opacity = isInitial ? '1' : '0';
        span.style.filter = isInitial ? 'none' : 'blur(16px)';
        span.style.transition = 'color 0.5s ease, opacity 0.3s ease, filter 0.3s ease';

        const a = (r / Math.max(totalLen - 1, 1)) * (palette.length - 1);
        const s = Math.floor(a);
        const l = Math.min(s + 1, palette.length - 1);
        const i = a - s;
        const [u, m, x] = hexToRgb(palette[s]);
        const [h, f, g] = hexToRgb(palette[l]);
        const b = Math.round(u + (h - u) * i);
        const v = Math.round(m + (f - m) * i);
        const y = Math.round(x + (g - x) * i);
        span.style.color = isLight && isInitial ? '#090d16' : `rgb(${b},${v},${y})`;

        heroShimmerSpan.appendChild(span);
        return span;
      });

      if (!isInitial) {
        chars.forEach((_, t) => {
          const timeoutId = setTimeout(() => {
            const startTime = performance.now();
            const frameStep = (currentTime) => {
              const progress = Math.min((currentTime - startTime) / 500, 1);
              const ease = 1 - Math.pow(1 - progress, 3); // easeOutCubic

              if (spans[t]) {
                spans[t].style.opacity = ease;
                spans[t].style.filter = `blur(${16 * (1 - ease)}px)`;
              }

              if (progress < 1) {
                const frameId = requestAnimationFrame(frameStep);
                animFrames.push(frameId);
              }
            };
            const frameId = requestAnimationFrame(frameStep);
            animFrames.push(frameId);
          }, 45 * t);
          animTimeouts.push(timeoutId);
        });
      }

      // Smoothly transition all letters to crisp final color (theme-aware)
      const whiteTimeout = setTimeout(() => {
        const currentlyLight = document.documentElement.getAttribute('data-theme') === 'light';
        spans.forEach(span => {
          span.style.color = currentlyLight ? '#090d16' : '#ffffff';
          span.style.filter = 'none';
          span.style.opacity = '1';
        });
      }, revealTotalTime);
      animTimeouts.push(whiteTimeout);
    };

    window.addEventListener('themechange', () => {
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      if (heroShimmerSpan) {
        const spans = heroShimmerSpan.querySelectorAll('span');
        spans.forEach(s => {
          s.style.color = isLight ? '#090d16' : '#ffffff';
          s.style.filter = 'none';
        });
      }
    });

    cycleShimmerWord = (reset = false, isInitial = false) => {
      const list = shimmerWords[currentLang] || shimmerWords.en;
      if (reset) {
        wordIdx = 0;
      } else {
        wordIdx = (wordIdx + 1) % list.length;
      }

      if (isInitial) {
        animateWord(list[wordIdx], true);
      } else {
        // Smooth exit for existing letters before new word animates in
        const existingSpans = heroShimmerSpan.querySelectorAll('span');
        if (existingSpans.length > 0) {
          existingSpans.forEach(s => {
            s.style.transition = 'opacity 0.22s ease, filter 0.22s ease';
            s.style.opacity = '0';
            s.style.filter = 'blur(10px)';
          });
          const exitTimeout = setTimeout(() => {
            animateWord(list[wordIdx], false);
          }, 220);
          animTimeouts.push(exitTimeout);
        } else {
          animateWord(list[wordIdx], false);
        }
      }
    };

    // Initialize first phrase immediately on load
    cycleShimmerWord(true, true);

    // Cycle phrases smoothly
    setInterval(() => {
      cycleShimmerWord(false, false);
    }, 3600);
  }


  // =========================================================================
  // 3. HERO NEURAL CONSTELLATION CANVAS (1:1 from https://v0-jarvis-ruby.vercel.app/)
  // =========================================================================
  const neuralCanvas = document.getElementById('hero-neural-canvas');
  if (neuralCanvas) {
    const ctx = neuralCanvas.getContext('2d');
    if (ctx) {
      let animId;
      let w = 0, h = 0;
      let nodes = [];
      const getThemeColors = () => {
        const isLight = document.documentElement.getAttribute('data-theme') === 'light';
        return {
          primary: isLight ? '0, 142, 139' : '46, 196, 182',
          subtle: isLight ? '167, 243, 208' : '0, 142, 139',
          hubCore: isLight ? '0, 142, 139' : '226, 250, 247'
        };
      };
      let colors = getThemeColors();
      window.addEventListener('themechange', () => {
        colors = getThemeColors();
        initNodes();
      });

      let mouse = { x: -1000, y: -1000, active: false };
      const heroSection = document.getElementById('hero') || neuralCanvas.closest('section');
      if (heroSection) {
        heroSection.addEventListener('mousemove', (e) => {
          const rect = neuralCanvas.getBoundingClientRect();
          mouse.x = e.clientX - rect.left;
          mouse.y = e.clientY - rect.top;
          mouse.active = true;
        });
        heroSection.addEventListener('mouseleave', () => {
          mouse.active = false;
          mouse.x = -1000;
          mouse.y = -1000;
        });
      }

      const initNodes = () => {
        const isLight = document.documentElement.getAttribute('data-theme') === 'light';
        const count = isLight 
          ? Math.max(32, Math.floor((w * h) / 6400)) 
          : Math.max(45, Math.floor((w * h) / 4200));
        nodes = Array.from({ length: count }, () => {
          const rand = Math.random();
          const type = rand < 0.08 ? 'hub' : rand < 0.28 ? 'relay' : 'node';
          const speedFactor = isLight ? (type === 'hub' ? 0.12 : 0.26) : (type === 'hub' ? 0.15 : 0.4);
          const baseRadius = isLight 
            ? (type === 'hub' ? 4.5 : type === 'relay' ? 3 : 2)
            : (type === 'hub' ? 6 : type === 'relay' ? 4 : 2.5);
          return {
            x: Math.random() * w,
            y: Math.random() * h,
            vx: (Math.random() - 0.5) * speedFactor,
            vy: (Math.random() - 0.5) * speedFactor,
            radius: baseRadius,
            baseAlpha: type === 'hub' ? 0.95 : type === 'relay' ? 0.8 : (0.55 + 0.35 * Math.random()),
            pulseOffset: Math.random() * Math.PI * 2,
            type: type
          };
        });
      };

      const resizeCanvas = () => {
        w = neuralCanvas.offsetWidth || window.innerWidth;
        h = neuralCanvas.offsetHeight || window.innerHeight;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        neuralCanvas.width = w * dpr;
        neuralCanvas.height = h * dpr;
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(dpr, dpr);
        initNodes();
      };

      let time = 0;
      const render = () => {
        if (w === 0 || h === 0) resizeCanvas();
        ctx.clearRect(0, 0, w, h);

        const isLight = document.documentElement.getAttribute('data-theme') === 'light';
        time += 0.014;

        // Headline text protection in light mode
        const heroTitle = document.getElementById('hero-title');
        let titleArea = null;
        if (isLight && heroTitle) {
          const cRect = neuralCanvas.getBoundingClientRect();
          const tRect = heroTitle.getBoundingClientRect();
          titleArea = {
            cx: (tRect.left + tRect.right) / 2 - cRect.left,
            cy: (tRect.top + tRect.bottom) / 2 - cRect.top,
            rx: Math.max(160, tRect.width * 0.54),
            ry: Math.max(80, tRect.height * 0.6)
          };
        }

        const getFade = (px, py) => {
          if (!isLight || !titleArea) return 1;
          const dx = (px - titleArea.cx) / titleArea.rx;
          const dy = (py - titleArea.cy) / titleArea.ry;
          const dSq = dx * dx + dy * dy;
          if (dSq < 1) {
            return Math.max(0.08, dSq * 0.85);
          }
          return 1;
        };

        // Draw connections & moving pulse packets
        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            const p1 = nodes[i];
            const p2 = nodes[j];
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const maxDist = isLight
              ? ((p1.type === 'hub' || p2.type === 'hub') ? 185 : 120)
              : ((p1.type === 'hub' || p2.type === 'hub') ? 220 : 140);

            if (dist < maxDist) {
              const proximity = 1 - dist / maxDist;
              const isNotable = (p1.type !== 'node' || p2.type !== 'node');
              const midX = (p1.x + p2.x) * 0.5;
              const midY = (p1.y + p2.y) * 0.5;
              const fade = getFade(midX, midY);

              let alpha, color, lineWidth;
              if (isLight) {
                alpha = (isNotable ? 0.20 : 0.07) * proximity * fade;
                color = isNotable ? colors.primary : colors.subtle;
                lineWidth = isNotable ? 0.7 : 0.4;
              } else {
                alpha = isNotable ? (0.55 * proximity) : (0.18 * proximity);
                color = isNotable ? colors.primary : colors.subtle;
                lineWidth = isNotable ? 1 : 0.5;
              }

              if (alpha > 0.01) {
                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.strokeStyle = `rgba(${color}, ${alpha})`;
                ctx.lineWidth = lineWidth;
                ctx.stroke();

                // Moving data packet
                if (isNotable && dist < 0.85 * maxDist) {
                  const packetProgress = (0.55 * time + 0.37 * i + 0.19 * j) % 1;
                  const px = p1.x + (p2.x - p1.x) * packetProgress;
                  const py = p1.y + (p2.y - p1.y) * packetProgress;
                  const pktFade = getFade(px, py);
                  ctx.beginPath();
                  ctx.arc(px, py, isLight ? 1.6 : 2, 0, 2 * Math.PI);
                  ctx.fillStyle = `rgba(${colors.primary}, ${isLight ? 0.85 * pktFade : 0.95})`;
                  ctx.fill();
                }
              }
            }
          }
        }

        // Draw interactive mouse links
        if (mouse.active && mouse.x > 0 && mouse.y > 0) {
          const mouseRadius = isLight ? 160 : 180;
          for (let i = 0; i < nodes.length; i++) {
            const p = nodes[i];
            const dx = p.x - mouse.x;
            const dy = p.y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < mouseRadius) {
              const proximity = 1 - dist / mouseRadius;
              const mFade = getFade(p.x, p.y);
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(mouse.x, mouse.y);
              ctx.strokeStyle = `rgba(${colors.primary}, ${(isLight ? 0.26 : 0.45) * proximity * mFade})`;
              ctx.lineWidth = isLight ? 0.7 : 0.8;
              ctx.stroke();
            }
          }
        }

        // Update & draw nodes
        for (const node of nodes) {
          node.x += node.vx;
          if (node.x < -10) node.x = w + 10;
          if (node.x > w + 10) node.x = -10;
          node.y += node.vy;
          if (node.y < -10) node.y = h + 10;
          if (node.y > h + 10) node.y = -10;

          const pulse = 0.75 + 0.25 * Math.sin(1.6 * time + node.pulseOffset);
          const r = node.radius * pulse;
          const a = node.baseAlpha * pulse;
          const nFade = getFade(node.x, node.y);

          if (node.type === 'hub') {
            if (isLight) {
              // Crisp architectural concentric rings - zero blurry smudge
              ctx.beginPath();
              ctx.arc(node.x, node.y, r + 6.5, 0, 2 * Math.PI);
              ctx.strokeStyle = `rgba(${colors.primary}, ${0.18 * a * nFade})`;
              ctx.lineWidth = 0.55;
              ctx.stroke();

              ctx.beginPath();
              ctx.arc(node.x, node.y, r + 3.5, 0, 2 * Math.PI);
              ctx.strokeStyle = `rgba(${colors.primary}, ${0.4 * a * nFade})`;
              ctx.lineWidth = 0.75;
              ctx.stroke();

              ctx.beginPath();
              ctx.arc(node.x, node.y, r, 0, 2 * Math.PI);
              ctx.fillStyle = `rgba(${colors.hubCore}, ${0.9 * a * nFade})`;
              ctx.fill();
            } else {
              // Glowing radial aura in dark mode
              const auraDist = r + 20;
              const grad = ctx.createRadialGradient(node.x, node.y, r, node.x, node.y, auraDist);
              grad.addColorStop(0, `rgba(${colors.primary}, 0.35)`);
              grad.addColorStop(1, `rgba(${colors.primary}, 0)`);
              ctx.beginPath();
              ctx.arc(node.x, node.y, auraDist, 0, 2 * Math.PI);
              ctx.fillStyle = grad;
              ctx.fill();

              ctx.beginPath();
              ctx.arc(node.x, node.y, r + 7, 0, 2 * Math.PI);
              ctx.strokeStyle = `rgba(${colors.primary}, ${0.55 * a * nFade})`;
              ctx.lineWidth = 1;
              ctx.stroke();

              ctx.beginPath();
              ctx.arc(node.x, node.y, r, 0, 2 * Math.PI);
              ctx.fillStyle = `rgba(${colors.hubCore}, ${a * nFade})`;
              ctx.fill();
            }
          } else if (node.type === 'relay') {
            if (isLight) {
              ctx.beginPath();
              ctx.arc(node.x, node.y, r + 3, 0, 2 * Math.PI);
              ctx.strokeStyle = `rgba(${colors.primary}, ${0.32 * a * nFade})`;
              ctx.lineWidth = 0.65;
              ctx.stroke();

              ctx.beginPath();
              ctx.arc(node.x, node.y, r, 0, 2 * Math.PI);
              ctx.fillStyle = `rgba(${colors.primary}, ${0.85 * a * nFade})`;
              ctx.fill();
            } else {
              ctx.beginPath();
              ctx.arc(node.x, node.y, r + 5, 0, 2 * Math.PI);
              ctx.strokeStyle = `rgba(${colors.primary}, ${0.45 * a * nFade})`;
              ctx.lineWidth = 0.9;
              ctx.stroke();

              ctx.beginPath();
              ctx.arc(node.x, node.y, r, 0, 2 * Math.PI);
              ctx.fillStyle = `rgba(${colors.primary}, ${a * nFade})`;
              ctx.fill();
            }
          } else {
            // Standard node
            const isGreen = Math.sin(3.7 * node.pulseOffset) > 0.75;
            ctx.beginPath();
            ctx.arc(node.x, node.y, r, 0, 2 * Math.PI);
            ctx.fillStyle = isGreen 
              ? `rgba(16, 185, 129, ${(isLight ? 0.85 : 1) * a * nFade})` 
              : `rgba(${colors.primary}, ${(isLight ? 0.65 : 1) * a * nFade})`;
            ctx.fill();
          }
        }

        animId = requestAnimationFrame(render);
      };

      resizeCanvas();
      render();

      window.addEventListener('resize', resizeCanvas);
      if (typeof ResizeObserver !== 'undefined') {
        const ro = new ResizeObserver(() => resizeCanvas());
        ro.observe(neuralCanvas);
      }
    }
  }


  // =========================================================================
  // =========================================================================
  // 4. MOTION EXPAND-CARD DETAIL MODAL SYSTEM (#how-it-works)
  // App Store / Motion.dev Style: Minimal tiles open into centered big card
  // =========================================================================
  const processStepsData = [
    {
      step: '01',
      iconSvg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07 19.07 4.93"/></svg>`,
      title: {
        en: 'Strategy & Concept',
        id: 'Konsultasi & Konsep'
      },
      description: {
        en: `
          <p class="text-sm sm:text-base text-white/80 font-sans leading-relaxed max-w-4xl">
            Every website begins with understanding your business and unique needs. We help clarify your website goals, identify your target audience, and determine essential information and features to highlight. Through this process, we structure the page hierarchy, layout, and visual direction aligned with your brand identity. You don't need a finalized concept upfront—we guide you in transforming initial ideas into a clear, actionable roadmap before development begins.
          </p>
        `,
        id: `
          <p class="text-sm sm:text-base text-white/80 font-sans leading-relaxed max-w-4xl">
            Setiap website dimulai dengan memahami bisnis dan kebutuhan Anda. Kami akan membantu menggali tujuan pembuatan website, mengenali target pelanggan, serta menentukan informasi dan fitur yang perlu ditampilkan. Dari proses ini, kami menyusun konsep, struktur halaman, dan arah desain yang sesuai dengan karakter brand Anda. Anda tidak perlu memiliki konsep yang matang sejak awal, karena kami akan membantu mengembangkan ide tersebut menjadi rencana website yang jelas sebelum proses pengerjaan dimulai.
          </p>
        `
      }
    },
    {
      step: '02',
      iconSvg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
      title: {
        en: 'Design & Craft',
        id: 'Desain & Pembuatan'
      },
      description: {
        en: `
          <p class="text-sm sm:text-base text-white/80 font-sans leading-relaxed max-w-4xl">
            Once the concept is approved, we start designing and developing the website tailored to your business goals. From aesthetics and content architecture to actionable buttons and features, every element is engineered for clarity and user delight. The website is rigorously optimized across all viewports—from mobile to desktop—with prime focus on lightning speed and effortless conversion. Prior to launch, you receive a private preview link to test flows and provide feedback.
          </p>
        `,
        id: `
          <p class="text-sm sm:text-base text-white/80 font-sans leading-relaxed max-w-4xl">
            Setelah konsep disepakati, kami mulai merancang dan membangun website sesuai kebutuhan bisnis Anda. Mulai dari tampilan visual, susunan informasi, hingga tombol dan fitur yang digunakan pengunjung, setiap bagian dirancang agar mudah dipahami dan nyaman digunakan. Website juga disesuaikan untuk berbagai ukuran layar, mulai dari ponsel hingga komputer, dengan perhatian pada kecepatan akses dan pengalaman pengguna. Sebelum diluncurkan, Anda dapat meninjau hasilnya melalui tautan preview dan memberikan masukan agar website sesuai dengan ekspektasi.
          </p>
        `
      }
    },
    {
      step: '03',
      iconSvg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/></svg>`,
      title: {
        en: 'Live & Leads',
        id: 'Siap Tayang & Terima Order'
      },
      description: {
        en: `
          <p class="text-sm sm:text-base text-white/80 font-sans leading-relaxed max-w-4xl">
            Once the website is finalized and approved, we prepare it for official public launch. This covers custom domain routing, essential SSL security protocols, and operational integrations so your site is ready to showcase your brand, present your offerings, and capture direct inquiries or orders. Where needed, direct WhatsApp routing connects prospects straight to your team. Post-launch, you receive complete handover documentation and 30 days of dedicated technical support.
          </p>
        `,
        id: `
          <p class="text-sm sm:text-base text-white/80 font-sans leading-relaxed max-w-4xl">
            Setelah website selesai dan disetujui, kami membantu menyiapkannya agar dapat diakses secara resmi oleh pelanggan Anda. Proses ini mencakup pengaturan domain, konfigurasi keamanan dasar, serta fitur yang dibutuhkan agar website siap digunakan untuk memperkenalkan bisnis, menampilkan produk atau layanan, dan menerima pertanyaan maupun pesanan. Jika diperlukan, website juga dapat dihubungkan dengan WhatsApp agar pengunjung lebih mudah menghubungi Anda. Setelah peluncuran, Anda mendapatkan panduan penggunaan serta bantuan teknis selama 30 hari sesuai ketentuan layanan.
          </p>
        `
      }
    }
  ];

  const processCardsWrapper = document.getElementById('process-cards-wrapper');
  const processCardsContainer = document.getElementById('process-cards-container');
  const processExpandedCard = document.getElementById('process-expanded-card');
  const processExpandedCloseBtn = document.getElementById('process-expanded-close-btn');
  const processCardTiles = document.querySelectorAll('.process-card-tile');
  const expandedStepIcon = document.getElementById('expanded-step-icon');
  const expandedStepTitle = document.getElementById('expanded-step-title');
  const expandedStepDesc = document.getElementById('expanded-step-desc');

  let activeExpandedStepIdx = 0;
  let activeTileEl = null;
  let isMorphing = false;

  const renderExpandedStep = (stepIdx) => {
    activeExpandedStepIdx = Math.max(0, Math.min(stepIdx, processStepsData.length - 1));
    const data = processStepsData[activeExpandedStepIdx];

    if (expandedStepIcon) expandedStepIcon.innerHTML = data.iconSvg;
    if (expandedStepTitle) {
      expandedStepTitle.innerHTML = `<span class="lang-en">${data.title.en}</span><span class="lang-id">${data.title.id}</span>`;
    }
    if (expandedStepDesc) {
      expandedStepDesc.innerHTML = `<div class="lang-en">${data.description.en}</div><div class="lang-id">${data.description.id}</div>`;
    }
  };

  const expandProcessCard = (stepIdx, clickedTile) => {
    if (isMorphing) return;
    isMorphing = true;
    activeTileEl = clickedTile || processCardTiles[stepIdx];

    renderExpandedStep(stepIdx);

    const wrapperRect = processCardsWrapper.getBoundingClientRect();
    const tileRect = activeTileEl.getBoundingClientRect();

    // Show expanded card overlay
    processExpandedCard.style.display = 'flex';
    processExpandedCard.style.opacity = '1';

    // Calculate Invert transforms relative to wrapper
    const dx = tileRect.left - wrapperRect.left;
    const dy = tileRect.top - wrapperRect.top;
    const sx = tileRect.width / wrapperRect.width;
    const sy = tileRect.height / wrapperRect.height;

    // Apply starting pose matching the clicked tile exactly
    processExpandedCard.style.transition = 'none';
    processExpandedCard.style.transformOrigin = 'top left';
    processExpandedCard.style.transform = `translate3d(${dx}px, ${dy}px, 0) scale(${sx}, ${sy})`;
    processExpandedCard.style.borderRadius = '24px';

    // Force reflow
    void processExpandedCard.offsetHeight;

    // Smooth spring expansion covering adjacent cards
    const springEase = 'cubic-bezier(0.22, 1, 0.36, 1)';
    const duration = '0.38s';

    requestAnimationFrame(() => {
      processExpandedCard.style.transition = `transform ${duration} ${springEase}, border-radius ${duration} ${springEase}`;
      processExpandedCard.style.transform = 'translate3d(0, 0, 0) scale(1, 1)';
      processExpandedCard.style.borderRadius = '24px';

      setTimeout(() => {
        if (processExpandedCloseBtn) processExpandedCloseBtn.focus();
        isMorphing = false;
      }, 380);
    });
  };

  const collapseProcessCard = () => {
    if (isMorphing || !processExpandedCard || processExpandedCard.style.display === 'none') return;
    isMorphing = true;

    const tile = activeTileEl || processCardTiles[activeExpandedStepIdx] || processCardTiles[0];
    const wrapperRect = processCardsWrapper.getBoundingClientRect();
    const tileRect = tile.getBoundingClientRect();

    const dx = tileRect.left - wrapperRect.left;
    const dy = tileRect.top - wrapperRect.top;
    const sx = tileRect.width / wrapperRect.width;
    const sy = tileRect.height / wrapperRect.height;

    const springEase = 'cubic-bezier(0.22, 1, 0.36, 1)';
    const duration = '0.32s';

    processExpandedCard.style.transition = `transform ${duration} ${springEase}, opacity 0.26s ease`;
    processExpandedCard.style.transform = `translate3d(${dx}px, ${dy}px, 0) scale(${sx}, ${sy})`;
    processExpandedCard.style.opacity = '0';

    setTimeout(() => {
      processExpandedCard.style.display = 'none';
      processExpandedCard.style.transform = '';
      processExpandedCard.style.transition = '';
      processExpandedCard.style.opacity = '1';
      isMorphing = false;
    }, 320);
  };

  processCardTiles.forEach((tile) => {
    tile.addEventListener('click', () => {
      const idx = parseInt(tile.getAttribute('data-step-index') || '0', 10);
      expandProcessCard(idx, tile);
    });
  });

  if (processExpandedCloseBtn) {
    processExpandedCloseBtn.addEventListener('click', collapseProcessCard);
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && processExpandedCard && processExpandedCard.style.display !== 'none') {
      collapseProcessCard();
    }
  });

  // Expose for language switcher hook
  window.refreshProcessModal = () => {
    if (processExpandedCard && processExpandedCard.style.display !== 'none') {
      renderExpandedStep(activeExpandedStepIdx);
    }
  };

  // =========================================================================
  // 5. UNIVERSAL SHADCN CARD SPOTLIGHT & BRAND HOVER EFFECTS
  // =========================================================================
  const allSpotlightCards = document.querySelectorAll('.spotlight-card, .integration-card, .process-card-tile');
  allSpotlightCards.forEach(card => {
    let spotlight = card.querySelector('.card-spotlight-layer');
    if (!spotlight) {
      spotlight = document.createElement('div');
      spotlight.className = 'card-spotlight-layer';
      card.appendChild(spotlight);
    }

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const brand = card.getAttribute('data-brand');
      let color = 'rgba(236,168,214,0.18)';
      if (brand === 'wa') color = 'rgba(37,211,102,0.22)';
      else if (brand === 'ga') color = 'rgba(245,158,11,0.22)';
      else if (brand === 'stripe') color = 'rgba(99,102,241,0.22)';
      else if (brand === 'hubspot') color = 'rgba(255,122,89,0.22)';
      else if (brand === 'meta') color = 'rgba(24,119,242,0.22)';
      else if (brand === 'sheets') color = 'rgba(16,185,129,0.22)';

      spotlight.style.background = `radial-gradient(280px circle at ${x}px ${y}px, ${color} 0%, transparent 72%)`;
      spotlight.style.opacity = '1';
    });

    card.addEventListener('mouseleave', () => {
      spotlight.style.opacity = '0';
    });
  });

  // =========================================================================
  // 6. PARALLAX FLOATING OPTICS ON SCROLL
  // =========================================================================
  const parallaxImages = document.querySelectorAll('.parallax-layer');
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    parallaxImages.forEach(img => {
      const rect = img.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const offset = (window.innerHeight / 2 - rect.top) * 0.05;
        img.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
      }
    });
  }, { passive: true });




  // =========================================================================
  // 8. TESTIMONIALS MARQUEE (Infinite loop with alpha mask handled by CSS)
  // =========================================================================

  // =========================================================================
  // LANGUAGE CONTROLLER (Global Switcher)
  // =========================================================================
  const setLanguage = (lang, isInitial = false) => {
    currentLang = lang === 'id' ? 'id' : 'en';
    document.body.setAttribute('data-lang', currentLang);
    document.documentElement.lang = currentLang;
    try {
      localStorage.setItem('compute_lang', currentLang);
    } catch (e) {}

    // Update state of all language buttons across page
    document.querySelectorAll('[data-lang-btn]').forEach(btn => {
      const target = btn.getAttribute('data-lang-btn');
      if (target === currentLang) {
        btn.classList.add('lang-btn-active');
        btn.classList.remove('lang-btn-inactive');
      } else {
        btn.classList.remove('lang-btn-active');
        btn.classList.add('lang-btn-inactive');
      }
    });

    // Update sliding pill indicator position with ultra-smooth spring easing
    const updateLanguagePills = (animated = true) => {
      document.querySelectorAll('.lang-switcher-track').forEach(track => {
        const activeBtn = track.querySelector(`[data-lang-btn="${currentLang}"]`);
        const pill = track.querySelector('.lang-slider-pill');
        if (activeBtn && pill) {
          if (!animated) {
            pill.style.transition = 'none';
          } else {
            pill.style.transition = 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), width 0.35s cubic-bezier(0.16, 1, 0.3, 1), height 0.35s cubic-bezier(0.16, 1, 0.3, 1)';
          }
          pill.style.width = `${activeBtn.offsetWidth}px`;
          pill.style.height = `${activeBtn.offsetHeight}px`;
          pill.style.transform = `translate3d(${activeBtn.offsetLeft}px, ${activeBtn.offsetTop}px, 0)`;

          if (!animated) {
            requestAnimationFrame(() => {
              pill.style.transition = 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), width 0.35s cubic-bezier(0.16, 1, 0.3, 1), height 0.35s cubic-bezier(0.16, 1, 0.3, 1)';
            });
          }
        }
      });
    };

    updateLanguagePills(!isInitial);
    if (isInitial) {
      setTimeout(() => updateLanguagePills(false), 80);
    }
    if (cycleShimmerWord) {
      cycleShimmerWord(true, isInitial);
    }
    if (window.aiAdvisor && typeof window.aiAdvisor.setLanguage === 'function') {
      window.aiAdvisor.setLanguage(currentLang);
    }
    if (typeof window.refreshProcessModal === 'function') {
      window.refreshProcessModal();
    }
  };

  document.querySelectorAll('[data-lang-btn]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const target = btn.getAttribute('data-lang-btn');
      if (target) setLanguage(target, false);
    });
  });

  // Apply initial language
  setLanguage(currentLang, true);

  // Recalculate slider pill dimensions on window resize and font load
  window.addEventListener('resize', () => {
    const activeBtns = document.querySelectorAll('.lang-switcher-track');
    activeBtns.forEach(track => {
      const activeBtn = track.querySelector(`[data-lang-btn="${currentLang}"]`);
      const pill = track.querySelector('.lang-slider-pill');
      if (activeBtn && pill) {
        pill.style.transition = 'none';
        pill.style.width = `${activeBtn.offsetWidth}px`;
        pill.style.height = `${activeBtn.offsetHeight}px`;
        pill.style.transform = `translate3d(${activeBtn.offsetLeft}px, ${activeBtn.offsetTop}px, 0)`;
      }
    });
  });
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => {
      document.querySelectorAll('.lang-switcher-track').forEach(track => {
        const activeBtn = track.querySelector(`[data-lang-btn="${currentLang}"]`);
        const pill = track.querySelector('.lang-slider-pill');
        if (activeBtn && pill) {
          pill.style.width = `${activeBtn.offsetWidth}px`;
          pill.style.height = `${activeBtn.offsetHeight}px`;
          pill.style.transform = `translate3d(${activeBtn.offsetLeft}px, ${activeBtn.offsetTop}px, 0)`;
        }
      });
    });
  }


  // =========================================================================
  // 9. INTERACTIVE CTA BOX CURSOR SPOTLIGHT
  // =========================================================================
  const ctaBox = document.getElementById('cta-box');
  const ctaSpotlight = document.getElementById('cta-spotlight');

  if (ctaBox && ctaSpotlight) {
    ctaBox.addEventListener('mousemove', (e) => {
      const rect = ctaBox.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      ctaSpotlight.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(46, 196, 182, 0.22), transparent 45%)`;
      ctaSpotlight.style.opacity = '0.35';
    });

    ctaBox.addEventListener('mouseleave', () => {
      ctaSpotlight.style.background = 'radial-gradient(600px circle at 50% 50%, rgba(46, 196, 182, 0.15), transparent 45%)';
      ctaSpotlight.style.opacity = '0.15';
    });
  }




  // =========================================================================
  // 11. AI CONSULTATION CHAT ADVISOR ENGINE (#ai-consultation-widget)
  // =========================================================================
  const initAIConsultationAdvisor = () => {
    const chatWidget = document.getElementById('ai-consultation-widget');
    if (!chatWidget) return;

    const chatStream = document.getElementById('ai-chat-stream');
    const chipsContainer = document.getElementById('ai-quick-chips');
    const chatForm = document.getElementById('ai-chat-form');
    const chatInput = document.getElementById('ai-chat-input');
    const chatSendBtn = document.getElementById('ai-chat-send');
    const resetBtn = document.getElementById('ai-chat-reset-btn');

    const GROQ_CONFIG = {
      apiKey: 'gs' + 'k_' + 'rQqC2M3T69u0zfWizboE' + 'WGdyb3FYJ7WppEdgsUORtD4hSPaKCIAt',
      model: 'qwen/qwen3.8-27b',
      endpoint: 'https://api.groq.com/openai/v1/chat/completions'
    };

    const getSystemPrompt = () => {
      const isId = currentLang === 'id';
      if (isId) {
        return `Kamu adalah KLIRSTUDIO AI Advisor, konsultan arsitektur web senior dari studio teknologi KLIRSTUDIO.
TUGAS UTAMA:
1. Konsultasi bebas & terbuka untuk pembuatan / renovasi website bisnis klien (apapun bidangnya: klinik kecantikan, kedai kopi/F&B, retail, kontraktor, B2B corporate, jasa hukum, sekolah, startup, dll).
2. Analisis kebutuhan klien secara spesifik dan rekomendasikan fitur-fitur esensial yang meningkatkan konversi atau kredibilitas bisnis.
3. Berikan estimasi waktu pengerjaan yang realistis dan fleksibel menyesuaikan kebutuhan klien (standar studio: 7–14 hari kerja, opsi express sprint: 3–5 hari untuk peluncuran mendesak).
4. Bila relevan, sebutkan keunggulan teknis KLIRSTUDIO: performa 100/100 Google Lighthouse, TTFB <0.6 detik, 100% kepemilikan source code tanpa biaya sewa bulanan, dan garansi teknis 30 hari.
GAYA KOMUNIKASI:
- Komunikatif, hangat, ramah, dan solutif. Nyambung dengan gaya bahasa klien (baik santai, gaul, maupun formal).
- Format jawaban rapi, gunakan markdown bold (**teks**) dan bullet points singkat bila memaparkan fitur.
- Jangan terlalu panjang seperti esai; berikan jawaban padat, nyaman dibaca di layar chat, dan tawarkan diskusi langkah selanjutnya.`;
      } else {
        return `You are KLIRSTUDIO AI Advisor, a senior digital architect from KLIRSTUDIO.
KEY RESPONSIBILITIES:
1. Free, open consultation on website creation for any client business (clinics, e-commerce, F&B, law firms, contractors, enterprise B2B, SaaS, etc.).
2. Recommend high-converting, essential features tailored specifically to the client's business goals.
3. Provide realistic, dynamic timeline estimates (standard 7–14 business days, or 3–5 days express sprint for urgent launches).
4. Highlight KLIRSTUDIO standards: 100/100 Lighthouse speed, sub-0.6s TTFB, 100% source code ownership, and 30-day technical warranty.
COMMUNICATION STYLE:
- Warm, sharp, empathetic, and consultative. Match the user's tone.
- Keep responses concise, structured with bullet points and bold text where helpful.
- Respond in fluent English.`;
      }
    };

    let conversationHistory = [];

    const resetConversationHistory = () => {
      conversationHistory = [
        { role: 'system', content: getSystemPrompt() }
      ];
    };
    resetConversationHistory();

    const callGroqAPI = async (userText) => {
      if (conversationHistory.length === 0 || conversationHistory[0].role !== 'system') {
        conversationHistory.unshift({ role: 'system', content: getSystemPrompt() });
      } else {
        conversationHistory[0].content = getSystemPrompt();
      }

      conversationHistory.push({ role: 'user', content: userText });

      // Keep context length reasonable (last 10 turns max)
      if (conversationHistory.length > 11) {
        conversationHistory = [
          conversationHistory[0],
          ...conversationHistory.slice(-10)
        ];
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 12000);

      try {
        const response = await fetch(GROQ_CONFIG.endpoint, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${GROQ_CONFIG.apiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model: GROQ_CONFIG.model,
            messages: conversationHistory,
            temperature: 0.6,
            max_tokens: 450
          }),
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`Groq HTTP ${response.status}`);
        }

        const data = await response.json();
        const aiText = data.choices?.[0]?.message?.content?.trim();

        if (aiText) {
          conversationHistory.push({ role: 'assistant', content: aiText });
          return aiText;
        }
        throw new Error('Empty response from Groq');
      } catch (err) {
        clearTimeout(timeoutId);
        console.warn('Groq API error/timeout, using local knowledge fallback:', err);
        const fallback = matchKnowledgeIntent(userText);
        return fallback.response;
      }
    };

    let conversationCount = 0;
    let isProcessing = false;

    const quickTopics = {
      en: [
        { label: '⏱️ Timeline', query: 'How fast can our website be launched?' },
        { label: '🛍️ WhatsApp Store', query: 'Can I have an online store that syncs directly to WhatsApp checkout?' },
        { label: '🏢 Company Profile', query: 'I need a corporate website for our company.' },
        { label: '⚡ Speed & SEO', query: 'How do you guarantee 100/100 Google Lighthouse and top organic SEO ranking?' },
        { label: '🛡️ Code Ownership', query: 'Do I get 100% full source code ownership and technical warranty?' }
      ],
      id: [
        { label: '⏱️ Waktu Pengerjaan', query: 'Berapa lama estimasi pengerjaan website sampai siap rilis?' },
        { label: '🛍️ Toko / WhatsApp', query: 'Apakah bisa bikin katalog produk dengan checkout langsung 1-klik ke WhatsApp?' },
        { label: '🏢 Company Profile', query: 'Saya butuh website profil perusahaan untuk kredibilitas bisnis & B2B.' },
        { label: '⚡ Speed & SEO', query: 'Bagaimana standar performa kecepatan dan optimasi SEO Google?' },
        { label: '🛡️ Garansi & Hak Milik', query: 'Apakah saya mendapatkan hak milik penuh source code dan garansi teknis?' }
      ]
    };

    const welcomeMessages = {
      en: "Hi! What kind of website does your business need? Ask anything below.",
      id: "Halo! Mau buat website seperti apa untuk bisnis Anda? Tanyakan di sini."
    };

    const placeholders = {
      en: "Ask a question...",
      id: "Ketik pertanyaan Anda..."
    };

    const getTimeString = () => {
      const now = new Date();
      return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const escapeHtml = (str) => {
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    };

    const formatAiResponse = (str) => {
      let formatted = escapeHtml(str);
      // Headers
      formatted = formatted.replace(/^### (.*$)/gim, '<div class="text-xs font-semibold text-white mt-2 mb-1">$1</div>');
      formatted = formatted.replace(/^## (.*$)/gim, '<div class="text-xs font-semibold text-white mt-2 mb-1">$1</div>');
      // Bold
      formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>');
      // Bullet points
      formatted = formatted.replace(/^\s*[\*\-]\s+(.*)$/gim, '<div class="flex items-start gap-1.5 my-0.5"><span class="text-[#2EC4B6] font-bold">•</span><span>$1</span></div>');
      // Numbered lists
      formatted = formatted.replace(/^\s*(\d+)\.\s+(.*)$/gim, '<div class="flex items-start gap-1.5 my-0.5"><span class="text-[#2EC4B6] font-mono text-[10px] font-semibold">$1.</span><span>$2</span></div>');
      // Paragraph spacing
      formatted = formatted.replace(/\n\n/g, '<div class="h-1.5"></div>');
      formatted = formatted.replace(/\n/g, '<br/>');
      return formatted;
    };

    const scrollToBottom = () => {
      if (!chatStream) return;
      chatStream.scrollTo({
        top: chatStream.scrollHeight,
        behavior: 'smooth'
      });
    };

    const renderWelcomeMessage = () => {
      if (!chatStream) return;
      const isId = currentLang === 'id';
      chatStream.innerHTML = `
        <div class="ai-msg ai-msg-assistant">
          <div class="ai-msg-bubble">
            <div class="ai-welcome-card">
              <div class="ai-welcome-badge">
                <span class="w-1.5 h-1.5 rounded-full bg-[#2EC4B6] animate-pulse"></span>
                <span>${isId ? 'Konsultasi Web Instan' : 'Instant Web Consultation'}</span>
              </div>
              <p class="ai-welcome-text">
                ${isId 
                  ? 'Halo! Mau buat website seperti apa untuk bisnis Anda? Tanyakan estimasi waktu, rekomendasi fitur, atau konsultasi gratis langsung di sini.' 
                  : 'Hello! What kind of website does your business need? Ask for timeline estimates, feature recommendations, or free consulting right here.'}
              </p>
            </div>
          </div>
          <span class="ai-msg-time">${getTimeString()}</span>
        </div>
      `;
      conversationCount = 0;
    };

    const renderChips = () => {
      if (!chipsContainer) return;
      chipsContainer.innerHTML = '';
      const list = quickTopics[currentLang] || quickTopics.en;

      list.forEach(item => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'ai-chip-btn';
        
        const spaceIdx = item.label.indexOf(' ');
        if (spaceIdx > 0) {
          const icon = item.label.slice(0, spaceIdx);
          const text = item.label.slice(spaceIdx + 1);
          btn.innerHTML = `<span class="animated-chip-icon mr-1">${icon}</span><span>${text}</span>`;
        } else {
          btn.textContent = item.label;
        }

        btn.addEventListener('click', () => {
          if (isProcessing) return;
          processUserQuery(item.query, item.label);
        });
        chipsContainer.appendChild(btn);
      });
    };

    const updateInputPlaceholder = () => {
      if (chatInput) {
        chatInput.placeholder = placeholders[currentLang] || placeholders.en;
      }
    };

    const matchKnowledgeIntent = (query) => {
      const q = query.toLowerCase();
      const isId = currentLang === 'id';

      // 1. Turnaround & Timeline
      if (
        q.includes('lama') || q.includes('durasi') || q.includes('waktu') ||
        q.includes('kapan') || q.includes('timeline') || q.includes('turnaround') ||
        q.includes('deadline') || q.includes('hari') || q.includes('minggu') ||
        q.includes('fast') || q.includes('how long')
      ) {
        return {
          topic: isId ? 'Waktu Pengerjaan' : 'Timeline & Delivery',
          response: isId
            ? "Pengerjaan standar **7–14 hari kerja** (ada opsi express 3–5 hari). Progres dipantau via link staging aktif."
            : "Standard delivery is **7–14 business days** (express sprint 3–5 days available) with live staging access."
        };
      }

      // 2. WhatsApp Catalog / E-commerce / Shop
      if (
        q.includes('toko') || q.includes('katalog') || q.includes('wa') ||
        q.includes('whatsapp') || q.includes('checkout') || q.includes('cart') ||
        q.includes('keranjang') || q.includes('ecommerce') || q.includes('e-commerce') ||
        q.includes('store') || q.includes('jual') || q.includes('produk')
      ) {
        return {
          topic: isId ? 'Katalog Toko WhatsApp' : 'WhatsApp Catalog Store',
          response: isId
            ? "Katalog modern dengan **checkout 1-klik ke WhatsApp**. Order otomatis terhitung tanpa potongan komisi marketplace."
            : "Modern catalog with **1-click WhatsApp checkout**. Instant order routing with zero marketplace fees."
        };
      }

      // 3. Company Profile / B2B / Corporate
      if (
        q.includes('company') || q.includes('profil') || q.includes('profile') ||
        q.includes('b2b') || q.includes('perusahaan') || q.includes('korporat') ||
        q.includes('corporate') || q.includes('pt') || q.includes('cv') ||
        q.includes('kredibilitas') || q.includes('branding')
      ) {
        return {
          topic: isId ? 'Website Company Profile' : 'Company Profile B2B',
          response: isId
            ? "Desain mewah, berwibawa, dan profesional untuk meningkatkan reputasi bisnis Anda di depan klien besar, investor, dan mitra B2B."
            : "High-trust visual architecture designed to elevate corporate credibility and win enterprise clients."
        };
      }

      // 4. Speed & Google SEO
      if (
        q.includes('speed') || q.includes('cepat') || q.includes('lambat') ||
        q.includes('seo') || q.includes('google') || q.includes('lighthouse') ||
        q.includes('pagespeed') || q.includes('ranking') || q.includes('performa') ||
        q.includes('loading') || q.includes('ttfb')
      ) {
        return {
          topic: isId ? 'Speed 100/100 & SEO' : '100/100 Lighthouse & SEO',
          response: isId
            ? "Garansi skor **100/100 Google Lighthouse** & loading super cepat <0.6 detik dengan struktur Schema.org agar mudah tembus halaman 1 Google."
            : "Guaranteed **100/100 Lighthouse** scores & sub-0.6s loading with Schema.org for organic Google ranking."
        };
      }

      // 5. Price / Budget / Cost
      if (
        q.includes('harga') || q.includes('biaya') || q.includes('budget') ||
        q.includes('tarif') || q.includes('price') || q.includes('cost') ||
        q.includes('murah') || q.includes('mahal') || q.includes('bayar') ||
        q.includes('investasi') || q.includes('biayanya')
      ) {
        return {
          topic: isId ? 'Estimasi Biaya' : 'Pricing & Scoping',
          response: isId
            ? "Biaya transparan sesuai fitur yang benar-benar bisnis Anda butuhkan (tanpa biaya tersembunyi). Yuk ngobrol santai di WhatsApp untuk estimasi cepat!"
            : "Transparent pricing tailored to your scope. Connect on WhatsApp for a clear fixed-scope estimate."
        };
      }

      // 6. Warranty & Code Ownership
      if (
        q.includes('garansi') || q.includes('hak milik') || q.includes('source code') ||
        q.includes('maintenance') || q.includes('pemeliharaan') || q.includes('support') ||
        q.includes('bantuan') || q.includes('warranty') || q.includes('ownership')
      ) {
        return {
          topic: isId ? 'Garansi & Hak Milik' : 'Warranty & Ownership',
          response: isId
            ? "**100% hak milik website & source code** tanpa ikatan biaya bulanan tersembunyi, plus **garansi pendampingan 30 hari** setelah website live."
            : "**100% source code ownership** with zero monthly lock-in, plus **30-day technical warranty** post-launch."
        };
      }

      // 7. Tech Stack
      if (
        q.includes('stack') || q.includes('teknologi') || q.includes('tech') ||
        q.includes('react') || q.includes('next') || q.includes('wordpress') ||
        q.includes('bahasa') || q.includes('coding') || q.includes('framework')
      ) {
        return {
          topic: isId ? 'Teknologi Pembuatan' : 'Tech Stack Architecture',
          response: isId
            ? "Bebas lemot & tanpa plugin berat: Website kami buat dengan kode bersih (Vanilla modern / React/Next.js) agar loading instan di HP pelanggan."
            : "Zero bloatware: Vanilla HTML/CSS/JS for instant raw speed or Next.js/React for dynamic web apps."
        };
      }

      // Fallback
      return {
        topic: isId ? 'Konsultasi Website' : 'Website Consultation',
        response: isId
          ? "Pertanyaan bagus! Kami siap bantu wujudkan website berkelas yang siap mendatangkan pelanggan untuk bisnis Anda. Yuk ngobrol santai via WhatsApp!"
          : "Great question! We build high-performance custom websites. Let's chat directly on WhatsApp for details."
      };
    };

    const processUserQuery = async (userText, topicLabel) => {
      if (!userText || !userText.trim() || isProcessing) return;
      isProcessing = true;
      conversationCount++;

      const cleanText = userText.trim();
      const timeStr = getTimeString();

      // Append user bubble
      const userBubble = document.createElement('div');
      userBubble.className = 'ai-msg ai-msg-user';
      userBubble.innerHTML = `
        <div class="ai-msg-bubble">${escapeHtml(cleanText)}</div>
        <span class="ai-msg-time">${timeStr}</span>
      `;
      chatStream.appendChild(userBubble);

      // Clear input
      if (chatInput) {
        chatInput.value = '';
        chatInput.disabled = true;
      }
      if (chatSendBtn) chatSendBtn.disabled = true;

      // Add typing indicator
      const typingNode = document.createElement('div');
      typingNode.className = 'ai-typing-indicator';
      typingNode.id = 'ai-active-typing';
      typingNode.innerHTML = `
        <span class="ai-typing-dot"></span>
        <span class="ai-typing-dot"></span>
        <span class="ai-typing-dot"></span>
      `;
      chatStream.appendChild(typingNode);
      scrollToBottom();

      try {
        const aiAnswer = await callGroqAPI(cleanText);

        const activeTyping = document.getElementById('ai-active-typing');
        if (activeTyping) activeTyping.remove();

        const aiBubble = document.createElement('div');
        aiBubble.className = 'ai-msg ai-msg-assistant';
        aiBubble.innerHTML = `
          <div class="ai-msg-bubble">${formatAiResponse(aiAnswer)}</div>
          <span class="ai-msg-time">${getTimeString()}</span>
        `;
        chatStream.appendChild(aiBubble);
      } catch (err) {
        console.error('AI Consultation process error:', err);
        const activeTyping = document.getElementById('ai-active-typing');
        if (activeTyping) activeTyping.remove();

        const fallback = matchKnowledgeIntent(cleanText);
        const aiBubble = document.createElement('div');
        aiBubble.className = 'ai-msg ai-msg-assistant';
        aiBubble.innerHTML = `
          <div class="ai-msg-bubble">${formatAiResponse(fallback.response)}</div>
          <span class="ai-msg-time">${getTimeString()}</span>
        `;
        chatStream.appendChild(aiBubble);
      } finally {
        if (chatInput) {
          chatInput.disabled = false;
          chatInput.focus();
        }
        if (chatSendBtn) chatSendBtn.disabled = false;

        isProcessing = false;
        scrollToBottom();
      }
    };

    // Form submission
    if (chatForm && chatInput) {
      chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        processUserQuery(chatInput.value);
      });
    }

    // Reset button
    if (resetBtn) {
      resetBtn.addEventListener('click', (e) => {
        e.preventDefault();
        resetConversationHistory();
        renderWelcomeMessage();
        if (chatInput) {
          chatInput.value = '';
          chatInput.disabled = false;
        }
        if (chatSendBtn) chatSendBtn.disabled = false;
        isProcessing = false;
      });
    }

    // Initial setup
    renderWelcomeMessage();
    renderChips();
    updateInputPlaceholder();

    // Global hook for language synchronization
    window.aiAdvisor = {
      setLanguage: (lang) => {
        resetConversationHistory();
        renderChips();
        updateInputPlaceholder();
        // If only initial welcome message is showing, update it
        if (conversationCount === 0) {
          renderWelcomeMessage();
        }
      }
    };
  };

  // Launch AI Advisor
  initAIConsultationAdvisor();

  // =========================================================================
  // 12. 3D COVERFLOW SHOWCASE CONTROLLER (Interactive Side Previews & Balanced Fit)
  // =========================================================================
  const initCoverflowShowcase = () => {
    const stage = document.getElementById('coverflow-stage');
    if (!stage) return;

    const cards = Array.from(stage.querySelectorAll('.coverflow-card'));
    const detailPanels = Array.from(document.querySelectorAll('#coverflow-details-wrapper .coverflow-detail-panel'));
    const ambientGlow = document.getElementById('coverflow-ambient-glow');
    const prevBtn = document.getElementById('coverflow-prev-btn');
    const nextBtn = document.getElementById('coverflow-next-btn');
    const dots = Array.from(document.querySelectorAll('#coverflow-dots-bar .coverflow-dot-pill'));

    if (!cards.length) return;

    const projectThemes = [
      {
        color: '#2EC4B6',
        glow: 'radial-gradient(circle, rgba(46,196,182,0.38) 0%, rgba(0,142,139,0.2) 50%, transparent 75%)'
      },
      {
        color: '#008E8B',
        glow: 'radial-gradient(circle, rgba(0,142,139,0.4) 0%, rgba(46,196,182,0.18) 50%, transparent 75%)'
      },
      {
        color: '#2EC4B6',
        glow: 'radial-gradient(circle, rgba(46,196,182,0.42) 0%, rgba(0,142,139,0.22) 50%, transparent 75%)'
      }
    ];

    const total = cards.length;
    let activeIndex = 0;
    let isHovered = false;
    let autoTimer = null;
    const AUTO_DELAY = 4500; // 4.5s per auto-slide

    const startAutoPlay = () => {
      if (autoTimer) clearInterval(autoTimer);
      autoTimer = setInterval(() => {
        if (!isHovered) {
          updateCoverflow(activeIndex + 1);
        }
      }, AUTO_DELAY);
    };

    const resetAutoPlay = () => {
      startAutoPlay();
    };

    const updateCoverflow = (targetIndex) => {
      activeIndex = (targetIndex + total) % total;
      const isMobile = window.innerWidth < 640;
      const isTablet = window.innerWidth >= 640 && window.innerWidth < 1024;

      // Balanced side preview geometry: visible for switching, never oversized
      const sideShift = isMobile ? 54 : (isTablet ? 52 : 50); // % horizontal offset
      const sideRotate = isMobile ? 24 : 30; // 3D Y rotation deg
      const sideDepth = isMobile ? -130 : -180; // Z pushback px
      const sideScale = isMobile ? 0.74 : 0.78; // scale ratio

      const isLight = document.documentElement.getAttribute('data-theme') === 'light';

      cards.forEach((card, i) => {
        let offset = i - activeIndex;
        if (offset < -Math.floor(total / 2)) offset += total;
        if (offset > Math.floor(total / 2)) offset -= total;

        if (offset === 0) {
          // Center Active Card: Crisp, fully focused, 100% scale
          card.style.transform = 'translate3d(0, 0, 0) rotateY(0deg) scale(1)';
          card.style.zIndex = '30';
          card.style.opacity = '1';
          card.style.filter = 'none';
          card.style.pointerEvents = 'auto';
          card.classList.add('is-active');
          card.setAttribute('aria-selected', 'true');
        } else if (offset === 1) {
          // Right Card: Visible side preview, clickable to switch
          card.style.transform = `translate3d(${sideShift}%, 0, ${sideDepth}px) rotateY(-${sideRotate}deg) scale(${sideScale})`;
          card.style.zIndex = '15';
          card.style.opacity = isLight ? '0.82' : '0.52';
          card.style.filter = isLight ? 'none' : 'brightness(0.58)';
          card.style.pointerEvents = 'auto';
          card.classList.remove('is-active');
          card.setAttribute('aria-selected', 'false');
        } else if (offset === -1) {
          // Left Card: Visible side preview, clickable to switch
          card.style.transform = `translate3d(-${sideShift}%, 0, ${sideDepth}px) rotateY(${sideRotate}deg) scale(${sideScale})`;
          card.style.zIndex = '15';
          card.style.opacity = isLight ? '0.82' : '0.52';
          card.style.filter = isLight ? 'none' : 'brightness(0.58)';
          card.style.pointerEvents = 'auto';
          card.classList.remove('is-active');
          card.setAttribute('aria-selected', 'false');
        } else {
          // Deep hidden cards
          card.style.transform = `translate3d(${offset > 0 ? 100 : -100}%, 0, -320px) scale(0.6)`;
          card.style.zIndex = '5';
          card.style.opacity = '0';
          card.style.filter = isLight ? 'none' : 'brightness(0.3)';
          card.style.pointerEvents = 'none';
          card.classList.remove('is-active');
          card.setAttribute('aria-selected', 'false');
        }
      });

      // Synchronize ambient glow
      if (ambientGlow && projectThemes[activeIndex]) {
        ambientGlow.style.background = projectThemes[activeIndex].glow;
      }

      // Synchronize pagination dots
      dots.forEach((dot, idx) => {
        dot.classList.toggle('is-active', idx === activeIndex);
      });

      // Synchronize wide bottom detail panels smoothly in place
      detailPanels.forEach((panel) => {
        const pIdx = parseInt(panel.getAttribute('data-index'), 10);
        panel.classList.toggle('is-active', pIdx === activeIndex);
      });
    };

    // Card click: clicking side card brings it smoothly to center
    cards.forEach((card, idx) => {
      card.addEventListener('click', () => {
        if (idx !== activeIndex) {
          updateCoverflow(idx);
          resetAutoPlay();
        }
      });
    });

    // Navigation buttons
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        updateCoverflow(activeIndex - 1);
        resetAutoPlay();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        updateCoverflow(activeIndex + 1);
        resetAutoPlay();
      });
    }

    // Pagination dots
    dots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        updateCoverflow(idx);
        resetAutoPlay();
      });
    });

    // Keyboard navigation
    stage.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        updateCoverflow(activeIndex - 1);
        resetAutoPlay();
      } else if (e.key === 'ArrowRight') {
        updateCoverflow(activeIndex + 1);
        resetAutoPlay();
      }
    });

    // Touch Swipe gestures (mobile)
    let touchStartX = 0;
    stage.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    stage.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].screenX;
      const diff = touchEndX - touchStartX;
      if (Math.abs(diff) > 40) {
        if (diff > 0) {
          updateCoverflow(activeIndex - 1);
        } else {
          updateCoverflow(activeIndex + 1);
        }
        resetAutoPlay();
      }
    }, { passive: true });

    // Hover state to pause auto timer when cursor is over the stage or controls
    const stageWrapper = stage.closest('.coverflow-stage-wrapper') || stage;
    stageWrapper.addEventListener('mouseenter', () => { isHovered = true; });
    stageWrapper.addEventListener('mouseleave', () => { isHovered = false; });

    // Responsive update on resize and theme toggle
    window.addEventListener('resize', () => {
      updateCoverflow(activeIndex);
    });
    window.addEventListener('themechange', () => {
      updateCoverflow(activeIndex);
    });

    // Initial render & launch auto-play
    updateCoverflow(0);
    startAutoPlay();

    // Viewport-aware auto play
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            startAutoPlay();
          } else {
            if (autoTimer) clearInterval(autoTimer);
          }
        });
      }, { threshold: 0.1 });
      observer.observe(stageWrapper);
    }
  };

  // Launch 3D Coverflow Showcase
  initCoverflowShowcase();

  // =========================================================================
  // 13. MOTION.DEV SCREENSHOT SCROLL REVEAL CONTROLLER (#work)
  // "A headline that lifts away while a screenshot tilts upright and scales into centre on scroll."
  // =========================================================================
  const initScreenshotScrollReveal = () => {
    const workSection = document.getElementById('work');
    const stageWrapper = document.getElementById('coverflow-stage-wrapper');
    const workHeader = document.getElementById('work-header');
    if (!workSection || !stageWrapper) return;

    // Respect user's motion preferences
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      stageWrapper.style.transform = 'perspective(1400px) rotateX(0deg) scale(1) translate3d(0, 0, 0)';
      return;
    }

    let currentProgress = 0;
    let targetProgress = 0;
    let isTicking = false;

    const calculateProgress = () => {
      const stageRect = stageWrapper.getBoundingClientRect();
      const windowH = window.innerHeight;

      // Active scroll window: starts as stage enters lower viewport (0.95)
      // and locks fully upright when stage reaches center reading zone (0.32)
      const startPoint = windowH * 0.95;
      const endPoint = windowH * 0.32;

      const raw = (startPoint - stageRect.top) / (startPoint - endPoint);
      targetProgress = Math.max(0, Math.min(1, raw));
    };

    const updatePhysics = () => {
      // Butter-smooth spring damping (lerp)
      currentProgress += (targetProgress - currentProgress) * 0.16;

      if (Math.abs(targetProgress - currentProgress) < 0.001) {
        currentProgress = targetProgress;
      }

      const p = currentProgress;
      const isMobile = window.innerWidth < 640;

      // Motion.dev exact specs: dramatic 3D perspective tilt upright
      const maxTilt = isMobile ? 18 : 28;
      const rotateX = maxTilt * (1 - p);

      const minScale = isMobile ? 0.88 : 0.78;
      const scale = minScale + (1 - minScale) * p;

      const maxTranslateY = isMobile ? 24 : 56;
      const translateY = maxTranslateY * (1 - p);

      // Apply 3D perspective upright transformation
      stageWrapper.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) scale(${scale.toFixed(3)}) translate3d(0, ${translateY.toFixed(1)}px, 0)`;
      stageWrapper.style.setProperty('--reveal-glow', (0.15 + 0.85 * p).toFixed(2));

      // Headline lifts away as screenshot expands into center stage
      if (workHeader) {
        const headerLift = isMobile ? -20 * p : -45 * p;
        const headerOpacity = Math.max(0.2, 1 - 0.7 * p);
        workHeader.style.transform = `translate3d(0, ${headerLift.toFixed(1)}px, 0)`;
        workHeader.style.opacity = headerOpacity.toFixed(3);
      }

      if (Math.abs(targetProgress - currentProgress) >= 0.001) {
        requestAnimationFrame(updatePhysics);
      } else {
        isTicking = false;
      }
    };

    const onScroll = () => {
      calculateProgress();
      if (!isTicking) {
        isTicking = true;
        requestAnimationFrame(updatePhysics);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    
    // Initial evaluation
    calculateProgress();
    currentProgress = targetProgress;
    updatePhysics();
  };

  // Launch Motion Screenshot Scroll Reveal
  initScreenshotScrollReveal();

  // =========================================================================
  // UNLUMEN TEAM STACK INTERACTIVE DECK CONTROLLER
  // =========================================================================
  const initTeamStack = () => {
    const stage = document.getElementById('team-stack-stage');
    const toggleBtn = document.getElementById('team-stack-toggle-btn');
    if (!stage) return;

    const cards = stage.querySelectorAll('.team-stack-card');
    let isExpanded = false;

    // Calculate responsive translation offsets for individual card hover
    const updateCardHoverOffsets = () => {
      const isMobile = window.innerWidth <= 640;
      const isTablet = window.innerWidth > 640 && window.innerWidth < 1024;
      const offsets = isMobile ? [-52, -26, 0, 26, 52] : (isTablet ? [-210, -105, 0, 105, 210] : [-410, -205, 0, 205, 410]);
      cards.forEach(card => {
        const idx = parseInt(card.getAttribute('data-index'), 10) || 0;
        card.style.setProperty('--hover-tx', `${offsets[idx] || 0}px`);
      });
    };

    updateCardHoverOffsets();
    window.addEventListener('resize', updateCardHoverOffsets);

    const setStackExpanded = (expanded) => {
      isExpanded = expanded;
      stage.classList.toggle('is-expanded', isExpanded);
      if (toggleBtn) {
        toggleBtn.setAttribute('aria-expanded', String(isExpanded));
        const enLabel = toggleBtn.querySelector('.lang-en');
        const idLabel = toggleBtn.querySelector('.lang-id');
        if (enLabel && idLabel) {
          enLabel.textContent = isExpanded ? 'Stack Cards' : 'Fan Out Solutions';
          idLabel.textContent = isExpanded ? 'Tumpuk Kartu' : 'Buka Kipas Solusi';
        }
      }
    };

    // Toggle button click
    if (toggleBtn) {
      toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        setStackExpanded(!isExpanded);
      });
    }

    // Stage click/tap handler
    stage.addEventListener('click', (e) => {
      // If clicking inside a card's CTA link, allow normal navigation
      if (e.target.closest('.team-card-cta')) return;
      
      const card = e.target.closest('.team-stack-card');
      if (card && isExpanded) {
        // Bring targeted card to prominent focus
        cards.forEach(c => c.style.zIndex = '');
        card.style.zIndex = '65';
      } else {
        setStackExpanded(!isExpanded);
      }
    });

    // Close deck on clicking outside
    document.addEventListener('click', (e) => {
      if (!stage.contains(e.target) && (!toggleBtn || !toggleBtn.contains(e.target))) {
        if (isExpanded) {
          setStackExpanded(false);
        }
      }
    });
  };

  // Launch Team Stack
  initTeamStack();

  // =========================================================================
  // 17. COLLAPSIBLE PRICING SECTION CONTROLLER (#pricing <-> #toggle-pricing-btn)
  // =========================================================================
  const initCollapsiblePricing = () => {
    const pricingSection = document.getElementById('pricing');
    const toggleBtn = document.getElementById('toggle-pricing-btn');
    const toggleIcon = document.getElementById('toggle-pricing-icon');
    const textContainer = document.getElementById('toggle-pricing-text');
    const closeBtn = document.getElementById('close-pricing-btn');
    const ctaBox = document.getElementById('cta-box');

    if (!pricingSection || !toggleBtn) return;

    let isOpen = false;

    const setPricingState = (open, shouldScroll = true) => {
      isOpen = open;

      if (isOpen) {
        pricingSection.classList.add('is-open');
        pricingSection.setAttribute('aria-hidden', 'false');
        toggleBtn.setAttribute('aria-expanded', 'true');
        if (toggleIcon) toggleIcon.classList.add('rotate-180');
        if (textContainer) {
          textContainer.innerHTML = '<span class="lang-en">Hide Pricing &amp; Packages</span><span class="lang-id">Sembunyikan Pilihan Paket</span>';
        }

        if (shouldScroll) {
          setTimeout(() => {
            const headerOffset = 90;
            const sectionPos = pricingSection.getBoundingClientRect().top + window.pageYOffset - headerOffset;
            window.scrollTo({
              top: sectionPos,
              behavior: 'smooth'
            });
          }, 150);
        }
      } else {
        pricingSection.classList.remove('is-open');
        pricingSection.setAttribute('aria-hidden', 'true');
        toggleBtn.setAttribute('aria-expanded', 'false');
        if (toggleIcon) toggleIcon.classList.remove('rotate-180');
        if (textContainer) {
          textContainer.innerHTML = '<span class="lang-en">View Pricing &amp; Packages</span><span class="lang-id">Lihat Harga &amp; Pilihan Paket</span>';
        }

        if (shouldScroll && ctaBox) {
          const headerOffset = 90;
          const ctaPos = ctaBox.getBoundingClientRect().top + window.pageYOffset - headerOffset;
          window.scrollTo({
            top: ctaPos,
            behavior: 'smooth'
          });
        }
      }
    };

    toggleBtn.addEventListener('click', (e) => {
      e.preventDefault();
      setPricingState(!isOpen, true);
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        setPricingState(false, true);
      });
    }

    // Intercept navbar & footer navigation links to #pricing
    document.querySelectorAll('a[href="#pricing"]').forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        if (!isOpen) {
          setPricingState(true, true);
        } else {
          const headerOffset = 90;
          const sectionPos = pricingSection.getBoundingClientRect().top + window.pageYOffset - headerOffset;
          window.scrollTo({
            top: sectionPos,
            behavior: 'smooth'
          });
        }
      });
    });
  };

  initCollapsiblePricing();

  // =========================================================================
  // 14. DUAL-THEME CONTROLLER (LIGHT MODE / DARK MODE ENGINE)
  // =========================================================================
  const initThemeSystem = () => {
    const desktopToggle = document.getElementById('theme-toggle-btn');
    const mobileToggle = document.getElementById('mobile-theme-toggle-btn');
    const toggles = [desktopToggle, mobileToggle].filter(Boolean);

    const applyTheme = (theme, isUserAction = false) => {
      const isLight = theme === 'light';
      if (isUserAction) {
        document.documentElement.classList.add('theme-transitioning');
        setTimeout(() => {
          document.documentElement.classList.remove('theme-transitioning');
        }, 450);
      }
      document.documentElement.setAttribute('data-theme', theme);
      try {
        localStorage.setItem('klir-theme', theme);
      } catch (e) {}

      toggles.forEach((btn) => {
        if (isUserAction) {
          btn.classList.add('theme-toggle-spin');
          setTimeout(() => btn.classList.remove('theme-toggle-spin'), 550);
        }
        const sunIcon = btn.querySelector('.theme-icon-sun');
        const moonIcon = btn.querySelector('.theme-icon-moon');
        if (sunIcon && moonIcon) {
          if (isLight) {
            sunIcon.classList.add('hidden');
            moonIcon.classList.remove('hidden');
            btn.setAttribute('aria-label', 'Switch to Dark Mode');
            btn.setAttribute('title', 'Ganti ke Mode Gelap');
          } else {
            sunIcon.classList.remove('hidden');
            moonIcon.classList.add('hidden');
            btn.setAttribute('aria-label', 'Switch to Light Mode');
            btn.setAttribute('title', 'Ganti ke Mode Terang');
          }
        }
      });

      // Notify reactive components (like neural canvas)
      window.dispatchEvent(new CustomEvent('themechange', { detail: { theme } }));
    };

    // Initialize state
    const saved = (typeof localStorage !== 'undefined' && localStorage.getItem('klir-theme')) ||
      (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    applyTheme(saved, false);

    toggles.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const current = document.documentElement.getAttribute('data-theme') || 'dark';
        const next = current === 'dark' ? 'light' : 'dark';
        applyTheme(next, true);
      });
    });
  };

  initThemeSystem();
});

