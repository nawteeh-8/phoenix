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
function getTranslation(data, keyPath) {
  if (!data || !keyPath) return null;
  const keys = keyPath.split('.');
  let text = data;
  for (const k of keys) {
    if (text && Object.prototype.hasOwnProperty.call(text, k)) {
      text = text[k];
    } else {
      console.warn('Missing i18n key:', keyPath);
      return null;
    }
  }
  if (text === undefined) {
    console.warn('Missing i18n key:', keyPath);
    return null;
  }
  return text;
}
function applyTranslations() {
  const data = translations[lang];
  if (!data) return;
  svc = data.svc || {};
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const text = getTranslation(data, el.getAttribute('data-i18n'));
    if (typeof text === 'string') {
      if (/<[a-z][\s\S]*>/i.test(text)) {
        el.innerHTML = sanitizeHTML(text);
      } else {
        el.textContent = text;
      }
    } else if (text !== null) {
      el.textContent = text;
    }
  });
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    const text = getTranslation(data, el.getAttribute('data-i18n-ph'));
    if (text !== null) el.setAttribute('placeholder', text);
  });
  document.querySelectorAll('[data-i18n-alt]').forEach(el => {
    const text = getTranslation(data, el.getAttribute('data-i18n-alt'));
    if (text !== null) el.setAttribute('alt', text);
  });
  document.querySelectorAll('[data-en][data-es]').forEach(el => {
    const text = lang === 'es' ? el.getAttribute('data-es') : el.getAttribute('data-en');
    if (el.hasAttribute('placeholder')) {
      el.setAttribute('placeholder', text);
    } else {
      el.textContent = text;
    }
  });
  document.querySelectorAll('[data-en][data-es]').forEach(el => {
    const text = lang === 'es' ? el.getAttribute('data-es') : el.getAttribute('data-en');
    if (el.hasAttribute('placeholder')) {
      el.setAttribute('placeholder', text);
    } else {
      el.textContent = text;
    }
  });
  if (typeof renderCards === 'function') renderCards();
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
