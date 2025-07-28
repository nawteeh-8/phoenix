document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  const langToggle = document.getElementById('lang-toggle');

  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    theme = document.body.classList.contains('dark') ? 'dark' : 'light';
    themeToggle.textContent = theme === 'dark' ? 'Light' : 'Dark';
  });

  langToggle.addEventListener('click', () => {
    lang = lang === 'en' ? 'es' : 'en';
    langToggle.textContent = lang === 'en' ? 'ES' : 'EN';
    renderCards();
    updateNav();
  });

  function updateNav() {
    document.querySelectorAll('.nav-links a').forEach(a => {
      a.textContent = a.dataset[lang];
    });
  }
});
