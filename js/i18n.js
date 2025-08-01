var lang = 'en';
var translations = {};
const fallbackLang = { svc: {} };

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
