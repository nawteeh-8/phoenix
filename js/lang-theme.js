(function(){
  const btnLang = document.getElementById('btn-lang');
  const btnTheme = document.getElementById('btn-theme');
  const html = document.documentElement;
  const body = document.body;
  let currentLang = 'en';
  let isDark = (localStorage.getItem('theme') || 'light') === 'dark';

  function setLanguage(lang) {
    currentLang = lang;
    html.lang = lang;
    const titleTag = document.querySelector('title');
    document.title = titleTag.getAttribute('data-' + lang);
    document.querySelectorAll('[data-en]').forEach(el => {
      const text = el.getAttribute('data-' + lang);
      if (!text) return;
      if (el.tagName.toLowerCase() === 'input') {
        el.placeholder = text;
      } else if (el.tagName.toLowerCase() === 'img') {
        el.alt = text;
      } else {
        el.textContent = text;
      }
    });
    document.querySelectorAll('nav a').forEach(a => {
      const text = a.getAttribute('data-' + lang);
      if (text) a.textContent = text;
    });
    btnLang.textContent = lang.toUpperCase();
    btnLang.setAttribute('aria-pressed', lang === 'es');
  }

  function toggleLanguage() {
    setLanguage(currentLang === 'en' ? 'es' : 'en');
  }

  function setTheme(darkMode) {
    isDark = darkMode;
    body.classList.toggle('dark', darkMode);
    btnTheme.textContent = darkMode ? 'Light' : 'Dark';
    btnTheme.setAttribute('aria-pressed', darkMode);
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }

  function toggleTheme() {
    setTheme(!isDark);
  }

  btnLang.addEventListener('click', toggleLanguage);
  btnTheme.addEventListener('click', toggleTheme);
  setLanguage(currentLang);
  setTheme(isDark);
})();
