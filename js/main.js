import state from './state.js';

document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  const langToggle = document.getElementById('lang-toggle');
  const hamburger = document.getElementById('hamburger-menu');
  const navLinks = document.querySelector('.nav-links');

  // --- STATE-DRIVEN UI UPDATES ---
  function updateUI() {
    // Theme
    document.body.classList.toggle('dark', state.theme === 'dark');
    if (themeToggle) {
      themeToggle.textContent = state.theme === 'dark' ? 'Light' : 'Dark';
    }

    // Language
    if (langToggle) {
      langToggle.textContent = state.lang === 'en' ? 'ES' : 'EN';
    }
    document.querySelectorAll('[data-en]').forEach(el => {
      el.textContent = el.dataset[state.lang];
    });

    // This part will be expanded significantly in Step 3 when data is centralized
    if (typeof window.renderCards === 'function') {
      window.renderCards();
    }
  }

  // --- EVENT LISTENERS ---
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const newTheme = state.theme === 'light' ? 'dark' : 'light';
      state.setTheme(newTheme);
      localStorage.setItem('theme', newTheme);
    });
  }

  if (langToggle) {
    langToggle.addEventListener('click', () => {
      const newLang = state.lang === 'en' ? 'es' : 'en';
      state.setLang(newLang);
    });
  }

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // --- INITIALIZATION ---
  state.subscribe(updateUI);
  state.init(); // Initializes theme from localStorage

  // --- MODAL AND OTHER GLOBAL FUNCTIONS (to be refactored) ---
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

});
