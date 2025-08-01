document.addEventListener('DOMContentLoaded', () => {
  const langToggle = document.getElementById('lang-toggle');

  if (langToggle && typeof switchLanguage === 'function') {
    langToggle.addEventListener('click', () => {
      switchLanguage(lang === 'en' ? 'es' : 'en');
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
