import { switchLanguage, getCurrentLang } from './i18n.js';

document.addEventListener('DOMContentLoaded', () => {
  const langToggle = document.getElementById('lang-toggle');
  const themeToggle = document.getElementById('theme-toggle');
  const langStatus = document.getElementById('lang-status');

  if (themeToggle && typeof initTheme === 'function') {
    initTheme({ button: themeToggle });
  }

  if (langToggle) {
    let currentLang = getCurrentLang();
    const updateToggle = (l) => {
      langToggle.textContent = l === 'en' ? 'ES' : 'EN';
      langToggle.setAttribute('aria-pressed', l === 'es');
      langToggle.setAttribute('aria-label', l === 'en' ? 'Switch to Spanish' : 'Switch to English');
      const status = document.getElementById('lang-status');
      if (status) status.textContent = l === 'en' ? 'English selected' : 'Spanish selected';
    };
    updateToggle(currentLang);
    langToggle.addEventListener('click', () => {
      const targetLang = currentLang === 'en' ? 'es' : 'en';
      switchLanguage(targetLang);
      currentLang = targetLang;
      updateToggle(currentLang);
    });
  }

  // --- MOBILE NAV ---
  const svcBtn = document.getElementById('svcBtn');

  if (svcBtn) {
    svcBtn.addEventListener('click', (e) => {
      const dropdown = svcBtn.parentElement;
      const isExpanded = svcBtn.getAttribute('aria-expanded') === 'true';
      svcBtn.setAttribute('aria-expanded', !isExpanded);
      dropdown.classList.toggle('open');
      e.stopPropagation();
    });
  }

  // Close dropdown if clicking outside
  window.addEventListener('click', (e) => {
    const dropdown = document.querySelector('.mobile-nav .dropdown.open');
    if (dropdown && !dropdown.contains(e.target)) {
      dropdown.classList.remove('open');
      dropdown.querySelector('.nav-btn').setAttribute('aria-expanded', 'false');
    }
  });
});
