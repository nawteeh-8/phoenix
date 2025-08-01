var lang = 'en';
var translations = {};
const fallbackLang = { svc: {} };
function loadTranslations(l) {
  let base = window.location.pathname.includes('/mainnav/') ? '..' : '.';
  return fetch(base + '/lang/' + l + '.json')
    .then(r => r.json())
    .then(data => { translations[l] = data; return data; })
    .catch(err => {
      console.error('Error loading translations for', l, err);
      translations[l] = fallbackLang;
      return translations[l];
    });
}
function applyTranslations() {
  const data = translations[lang];
  if (!data) return;
  svc = data.svc || {};
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n').split('.');
    let text = data;
    key.forEach(k => { if (text) text = text[k]; });
    if (text) el.innerHTML = text;
  });
  if (typeof renderCards === 'function') renderCards();
}
function switchLanguage(l) {
  lang = l;
  localStorage.setItem('lang', l);
  const toggle = document.getElementById('lang-toggle');
  if (toggle) {
    toggle.textContent = l === 'en' ? 'ES' : 'EN';
    toggle.setAttribute('aria-pressed', l === 'es');
  }
  (translations[l] ? Promise.resolve() : loadTranslations(l))
    .then(applyTranslations)
    .catch(err => {
      console.error('Error switching language to', l, err);
      translations[l] = fallbackLang;
      applyTranslations();
    });
}

document.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('lang') || lang;
  switchLanguage(saved);
});
