
document.addEventListener("DOMContentLoaded", function () {
  const tabs = document.querySelectorAll(".tab");
  const contents = document.querySelectorAll(".tab-content");

  tabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      const target = this.getAttribute("data-tab");

      tabs.forEach((t) => {
        t.classList.remove("active");
        t.setAttribute("aria-selected", "false");
      });

      contents.forEach((c) => {
        c.classList.remove("active");
        c.setAttribute("hidden", "true");
      });

      this.classList.add("active");
      this.setAttribute("aria-selected", "true");
      const content = document.getElementById(target);
      content.classList.add("active");
      content.removeAttribute("hidden");
    });

    // Keyboard accessibility
    tab.addEventListener("keydown", function (e) {
      const index = Array.from(tabs).indexOf(document.activeElement);
      if (e.key === "ArrowRight") {
        e.preventDefault();
        const next = tabs[(index + 1) % tabs.length];
        next.focus();
        next.click();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        const prev = tabs[(index - 1 + tabs.length) % tabs.length];
        prev.focus();
        prev.click();
      }
    });
  });

  // Initial ARIA setup
  contents.forEach((c, i) => {
    c.setAttribute("role", "tabpanel");
    if (!c.classList.contains("active")) c.setAttribute("hidden", "true");
  });

  tabs.forEach((tab, i) => {
    tab.setAttribute("tabindex", "0");
  });
});


const toggleButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');

toggleButton.addEventListener('click', () => {
  const expanded = toggleButton.getAttribute('aria-expanded') === 'true' || false;
  toggleButton.setAttribute('aria-expanded', !expanded);
  nav.classList.toggle('open');
});


document.addEventListener('DOMContentLoaded', () => {
  const langLinks = document.querySelectorAll('.lang-link');
  const currentPage = window.location.pathname.replace(/\/$/, '/index.html');

  langLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (currentPage.endsWith(href)) {
      link.classList.add('current');
    }
  });
});
