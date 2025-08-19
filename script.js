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
    const res = await fetch(`lang/${lang}.json`);
    if (res.ok) {
      translations = await res.json();
    }
  } catch (e) {
    console.error('Error loading translations', e);
  }

  const t = (key) => translations[key] || '';

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    const value = t(key);
    if (value) {
      el.innerHTML = value;
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

  langLinks.forEach((link) => {
    const linkLang = link.getAttribute('lang');
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
});

