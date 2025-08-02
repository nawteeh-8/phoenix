document.addEventListener('DOMContentLoaded', () => {
  const langToggle = document.getElementById('lang-toggle');
  const themeToggle = document.getElementById('theme-toggle');
  const langStatus = document.getElementById('lang-status');

  if (themeToggle && typeof initTheme === 'function') {
    initTheme({ button: themeToggle });
  }

  if (langToggle && typeof initLanguage === 'function') {
    const currentLang = typeof lang !== 'undefined' ? lang : 'en';
    initLanguage({
      button: langToggle,
      statusEl: langStatus,
      currentLang,
      onSwitch: typeof switchLanguage === 'function' ? switchLanguage : undefined
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
