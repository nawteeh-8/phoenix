import { svc } from './i18n.js';

function renderCards() {
  ['ops','cc','it','pro'].forEach(key => {
    const c = svc[key];
    const el = document.getElementById('card-'+key);
    if (el && c) {
      el.innerHTML = `
        <span>
            <div class="title">${c.title}</div>
            <div class="icon">${c.icon}</div>
            <div class="content"><p>${c.desc}</p></div>
        </span>
      `;
    }
  });
}
['ops','cc','it','pro'].forEach(key => {
  const card = document.getElementById('card-'+key);
  if (card) {
    const go = () => { window.location.href = `service.html?svc=${key}`; };
    card.onclick = go;
    card.onkeydown = e => { if (e.key === 'Enter' || e.key === ' ') go(); };
  }
});

document.addEventListener('translations-applied', renderCards);
