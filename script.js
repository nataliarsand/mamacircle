document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const theme = params.get('theme');
  if (theme) {
    document.documentElement.setAttribute('data-theme', theme);
  }

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

    // Keyboard accessibility
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

  // Initial ARIA setup
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

  // Navigation toggle
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

  // Language highlighting
  const langLinks = document.querySelectorAll('.lang-link');
  const currentLang = document.documentElement.lang;

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

  const showMoreButtons = document.querySelectorAll('.show-more');
  showMoreButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const expanded = button.getAttribute('aria-expanded') === 'true';
      const card = button.closest('.mama-card');
      card.classList.toggle('expanded', !expanded);
      button.setAttribute('aria-expanded', String(!expanded));
    });
  });
});
