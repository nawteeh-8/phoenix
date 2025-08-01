var lang = 'en';
var translations = {};
const fallbackLang = { svc: {} };
function loadTranslations(l) {
  const path = window.location.pathname;
  let base = (path.includes('/mainnav/') || path.includes('/fabs/')) ? '..' : '.';
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
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    const key = el.getAttribute('data-i18n-ph').split('.');
    let text = data;
    key.forEach(k => { if (text) text = text[k]; });
    if (text) el.setAttribute('placeholder', text);
  });
  document.querySelectorAll('[data-i18n-alt]').forEach(el => {
    const key = el.getAttribute('data-i18n-alt').split('.');
    let text = data;
    key.forEach(k => { if (text) text = text[k]; });
    if (text) el.setAttribute('alt', text);
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
