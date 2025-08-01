document.addEventListener('DOMContentLoaded', () => {
  const langToggle = document.getElementById('lang-toggle');
  const themeToggle = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.body.classList.toggle('dark', savedTheme === 'dark');
  if (themeToggle) themeToggle.textContent = savedTheme === 'dark' ? 'Light' : 'Dark';
  themeToggle && themeToggle.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    themeToggle.textContent = isDark ? 'Light' : 'Dark';
  });

  if (langToggle) {
    let currentLang = typeof lang !== 'undefined' ? lang : 'en';
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
      if (typeof switchLanguage === 'function') {
        switchLanguage(targetLang);
      }
      currentLang = targetLang;
      updateToggle(currentLang);
    });
  }

  // --- MOBILE NAV ---
  const svcBtn = document.getElementById('svcBtn');
  const mobileContactBtn = document.getElementById('mobile-contact-btn');

  if (svcBtn) {
    svcBtn.addEventListener('click', (e) => {
      const dropdown = svcBtn.parentElement;
      const isExpanded = svcBtn.getAttribute('aria-expanded') === 'true';
      svcBtn.setAttribute('aria-expanded', !isExpanded);
      dropdown.classList.toggle('open');
      e.stopPropagation();
    });
  }

  if (mobileContactBtn) {
    mobileContactBtn.addEventListener('click', openContactModal);
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
