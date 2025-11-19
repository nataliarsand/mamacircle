document.addEventListener('DOMContentLoaded', async () => {
  const params = new URLSearchParams(window.location.search);
  const theme = params.get('theme');
  const lang = params.get('lang') || 'en';

  if (theme) {
    document.documentElement.setAttribute('data-theme', theme);
  }
  document.documentElement.setAttribute('lang', lang);

  let translations = {};
  try {
    const res = await fetch(`/lang/${lang}.json`);
    if (res.ok) {
      translations = await res.json();
    }
  } catch (e) {
    console.error('Error loading translations', e);
  }

  const t = (key) => translations[key] || '';

  // Safely set translated content with HTML support
  // Uses DOMParser to prevent XSS while allowing safe HTML tags
  function setTranslatedContent(element, htmlString) {
    // Parse the HTML string safely
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');

    // Clear existing content
    element.textContent = '';

    // Append parsed nodes to the element
    while (doc.body.firstChild) {
      element.appendChild(doc.body.firstChild);
    }
  }

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    const value = t(key);
    if (value) {
      setTranslatedContent(el, value);
    }
  });

  const tabs = document.querySelectorAll('.tab');
  const contents = document.querySelectorAll('.tab-content');

  tabs.forEach((tab) => {
    tab.addEventListener('click', function () {
      const target = this.getAttribute('data-tab');

      tabs.forEach((t) => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
        t.setAttribute('tabindex', '-1');
      });

      contents.forEach((c) => {
        c.classList.remove('active');
        c.setAttribute('hidden', 'true');
      });

      this.classList.add('active');
      this.setAttribute('aria-selected', 'true');
      this.setAttribute('tabindex', '0');
      const content = document.getElementById(target);
      content.classList.add('active');
      content.removeAttribute('hidden');
    });

    tab.addEventListener('keydown', function (e) {
      const index = Array.from(tabs).indexOf(document.activeElement);
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        const next = tabs[(index + 1) % tabs.length];
        next.focus();
        next.click();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        const prev = tabs[(index - 1 + tabs.length) % tabs.length];
        prev.focus();
        prev.click();
      }
    });
  });

  contents.forEach((c) => {
    c.setAttribute('role', 'tabpanel');
    if (!c.classList.contains('active')) {
      c.setAttribute('hidden', 'true');
    } else {
      c.removeAttribute('hidden');
    }
  });

  tabs.forEach((tab) => {
    const isActive = tab.classList.contains('active');
    tab.setAttribute('tabindex', isActive ? '0' : '-1');
    tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
  });

  const toggleButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');

  if (toggleButton && nav) {
    toggleButton.addEventListener('click', () => {
      const expanded = toggleButton.getAttribute('aria-expanded') === 'true' || false;
      toggleButton.setAttribute('aria-expanded', !expanded);
      nav.classList.toggle('open');
    });
  }

  const navLinks = document.querySelectorAll('.site-nav a[href^="#"]');
  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const target = document.getElementById(targetId);
      if (target) {
        const tabButton = document.querySelector(`.tab[data-tab="${targetId}"]`);
        if (tabButton) {
          tabButton.click();
        }
        target.scrollIntoView({ behavior: 'smooth' });
      }
      if (nav && nav.classList.contains('open')) {
        nav.classList.remove('open');
        if (toggleButton) {
          toggleButton.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });

  const langLinks = document.querySelectorAll('.lang-link');
  const currentLang = lang;
  const showMoreText = {
    more: t('show_more') || 'Show more',
    less: t('show_less') || 'Show less',
  };

  // Update language switcher links to preserve current page and theme
  langLinks.forEach((link) => {
    const linkLang = link.getAttribute('lang');
    const url = new URL(link.href, window.location.origin);

    // Set the language parameter
    url.searchParams.set('lang', linkLang);

    // Preserve theme if present
    if (theme) {
      url.searchParams.set('theme', theme);
    }

    // Update the href
    link.href = url.toString();

    // Mark current language
    if (linkLang === currentLang) {
      link.classList.add('current');
      link.setAttribute('aria-current', 'page');
    } else {
      link.classList.remove('current');
      link.removeAttribute('aria-current');
    }
  });

  document.querySelectorAll('a[href*=".html"]:not(.lang-link)').forEach((link) => {
    const url = new URL(link.href, window.location.origin);
    if (theme) {
      url.searchParams.set('theme', theme);
    }
    url.searchParams.set('lang', lang);
    link.href = url.toString();
  });

  const showMoreButtons = document.querySelectorAll('.show-more');
  showMoreButtons.forEach((button) => {
    const wrapper = document.getElementById(button.getAttribute('aria-controls'));
    const quote = wrapper ? wrapper.querySelector('.quote') : null;

    if (quote && quote.offsetHeight < 165) {
      button.style.display = 'none';
    } else {
      button.textContent = showMoreText.more;
    }

    button.addEventListener('click', () => {
      const expanded = button.getAttribute('aria-expanded') === 'true';
      const card = button.closest('.mama-card');
      card.classList.toggle('expanded', !expanded);
      button.setAttribute('aria-expanded', String(!expanded));
      button.textContent = expanded ? showMoreText.more : showMoreText.less;
    });
  });

  // Carousel functionality
  const carousel = document.querySelector('.circle-carousel');
  if (carousel) {
    const track = carousel.querySelector('.carousel-track');
    const cards = Array.from(track.querySelectorAll('.mama-card'));
    const prevBtn = carousel.querySelector('.carousel-control.prev');
    const nextBtn = carousel.querySelector('.carousel-control.next');
    const indicators = Array.from(carousel.querySelectorAll('.indicator'));

    let currentIndex = 0;
    const intervalTime = 7000; // 7 seconds for better UX
    let autoPlayInterval = null;

    // Initialize
    function init() {
      updateCarousel();
      startAutoPlay();
    }

    // Update carousel position and active states
    function updateCarousel() {
      // Update card active states
      cards.forEach((card, index) => {
        const isActive = index === currentIndex;
        card.classList.toggle('active', isActive);
        card.setAttribute('aria-hidden', !isActive);
      });

      // Update indicators
      indicators.forEach((indicator, index) => {
        const isActive = index === currentIndex;
        indicator.classList.toggle('active', isActive);
        indicator.setAttribute('aria-current', isActive);
      });

      // Update button states
      updateButtonStates();
    }

    // Update button aria labels
    function updateButtonStates() {
      const currentSlide = currentIndex + 1;
      const totalSlides = cards.length;
      prevBtn.setAttribute('aria-label', `Previous testimonial (${currentSlide} of ${totalSlides})`);
      nextBtn.setAttribute('aria-label', `Next testimonial (${currentSlide} of ${totalSlides})`);
    }

    // Navigate to specific slide
    function goToSlide(index) {
      currentIndex = (index + cards.length) % cards.length;
      updateCarousel();
      resetAutoPlay();
    }

    // Next slide
    function nextSlide() {
      goToSlide(currentIndex + 1);
    }

    // Previous slide
    function prevSlide() {
      goToSlide(currentIndex - 1);
    }

    // Auto-play functions
    function startAutoPlay() {
      stopAutoPlay();
      autoPlayInterval = setInterval(nextSlide, intervalTime);
    }

    function stopAutoPlay() {
      if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
        autoPlayInterval = null;
      }
    }

    function resetAutoPlay() {
      stopAutoPlay();
      startAutoPlay();
    }

    // Event listeners for controls
    nextBtn.addEventListener('click', () => {
      nextSlide();
    });

    prevBtn.addEventListener('click', () => {
      prevSlide();
    });

    // Event listeners for indicators
    indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => {
        goToSlide(index);
      });
    });

    // Pause on hover/focus (accessibility best practice)
    carousel.addEventListener('mouseenter', stopAutoPlay);
    carousel.addEventListener('mouseleave', startAutoPlay);
    carousel.addEventListener('focusin', stopAutoPlay);
    carousel.addEventListener('focusout', startAutoPlay);

    // Keyboard navigation
    carousel.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextSlide();
      }
    });

    // Touch support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      stopAutoPlay();
    });

    carousel.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
      startAutoPlay();
    });

    function handleSwipe() {
      const swipeThreshold = 50;
      const diff = touchStartX - touchEndX;

      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
    }

    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        updateCarousel();
      }, 150);
    });

    // Initialize carousel
    init();
  }

  const translationTags = document.querySelectorAll('.translation-tag');
  if (translationTags.length) {
    const translationPrefix = t('translation_from') || (currentLang === 'pt' ? 'traduzido do' : 'translated from');
    translationTags.forEach((tag) => {
      const source = (tag.dataset.sourceLang || 'EN').toUpperCase();
      tag.textContent = `(${translationPrefix} ${source})`;
    });
  }

  const fadeEls = document.querySelectorAll('.section-box, .mama-card');
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReduced) {
    fadeEls.forEach((el) => el.classList.add('fade-in'));
  } else {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
          obs.unobserve(entry.target);
        }
      });
    });

    fadeEls.forEach((el) => observer.observe(el));
  }

  // Scroll spy for navigation
  const scrollSpyLinks = document.querySelectorAll('.site-nav a[href^="#"], .site-nav a[href^="index.html#"]');
  const scrollSpySections = [];

  // Build sections array from nav links
  scrollSpyLinks.forEach(link => {
    const href = link.getAttribute('href');
    const hash = href.includes('#') ? href.split('#')[1] : null;
    if (hash) {
      const section = document.getElementById(hash);
      if (section) {
        scrollSpySections.push({ link, section, id: hash });
      }
    }
  });

  if (scrollSpySections.length > 0) {
    function updateActiveNav() {
      const scrollPos = window.scrollY + 100; // Offset for header

      let currentSection = null;

      // Find which section is currently in view
      scrollSpySections.forEach(({ section, id }) => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
          currentSection = id;
        }
      });

      // Update active states
      scrollSpySections.forEach(({ link, id }) => {
        if (id === currentSection) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }

    // Throttle scroll events for performance
    let scrollTimeout;
    window.addEventListener('scroll', () => {
      if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
      }
      scrollTimeout = window.requestAnimationFrame(() => {
        updateActiveNav();
      });
    });

    // Initial check
    updateActiveNav();
  }
});

