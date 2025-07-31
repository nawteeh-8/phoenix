document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle') || document.getElementById('btn-theme');
  const langToggle = document.getElementById('lang-toggle') || document.getElementById('btn-lang');

  const savedTheme = localStorage.getItem('theme') || 'light';
  document.body.classList.toggle('dark', savedTheme === 'dark');
  if (themeToggle) themeToggle.textContent = savedTheme === 'dark' ? 'Light' : 'Dark';

  themeToggle && themeToggle.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    themeToggle.textContent = isDark ? 'Light' : 'Dark';
  });

  langToggle && langToggle.addEventListener('click', () => {
    switchLanguage(lang === 'en' ? 'es' : 'en');
  });

  window.sanitizeForm = function(form) {
    const fields = form.querySelectorAll('input, textarea');
    for (const field of fields) {
      const val = field.value.trim();
      if (/[<>]/.test(val) || /script/i.test(val)) {
        return false;
      }
      field.value = val;
    }
    return true;
  };
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


