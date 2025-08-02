let lang = 'en';
const translations = {};
const fallbackLang = { svc: {} };
export let svc = {};

function sanitizeHTML(html) {
  const template = document.createElement('template');
  template.innerHTML = html;
  const allowedTags = ['i', 'b', 'em', 'strong', 'br', 'a', 'span'];
  const allowedAttributes = {
    'i': ['class'],
    'span': ['class'],
    'a': ['href', 'title', 'target', 'rel']
  };
  const nodes = template.content.querySelectorAll('*');
  nodes.forEach(node => {
    const tag = node.nodeName.toLowerCase();
    if (!allowedTags.includes(tag)) {
      node.replaceWith(...node.childNodes);
    } else {
      [...node.attributes].forEach(attr => {
        const allowed = allowedAttributes[tag] || [];
        if (!allowed.includes(attr.name.toLowerCase())) {
          node.removeAttribute(attr.name);
        }
      });
    }
  });
  return template.innerHTML;
}
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
    if (typeof text === 'string') {
      if (/<[a-z][\s\S]*>/i.test(text)) {
        el.innerHTML = sanitizeHTML(text);
      } else {
        el.textContent = text;
      }
    } else if (text) {
      el.textContent = text;
    }
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
  document.dispatchEvent(new Event('translations-applied'));
}
export function switchLanguage(l) {
  lang = l;
  localStorage.setItem('lang', l);
  const toggle = document.getElementById('lang-toggle');
  if (toggle) {
    toggle.textContent = l === 'en' ? 'ES' : 'EN';
    toggle.setAttribute('aria-pressed', l === 'es');
    toggle.setAttribute('aria-label', l === 'en' ? 'Switch to Spanish' : 'Switch to English');
  }
  const status = document.getElementById('lang-status');
  if (status) status.textContent = l === 'en' ? 'English selected' : 'Spanish selected';
  (translations[l] ? Promise.resolve() : loadTranslations(l))
    .then(applyTranslations)
    .catch(err => {
      console.error('Error switching language to', l, err);
      translations[l] = fallbackLang;
      applyTranslations();
    });
}

export function getCurrentLang() {
  return lang;
}

document.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('lang') || lang;
  switchLanguage(saved);
});
