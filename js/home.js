import state from './state.js';

let siteData = null;

async function loadData() {
  if (siteData) return siteData;
  try {
    const response = await fetch('data.json');
    siteData = await response.json();
    return siteData;
  } catch (error) {
    console.error('Failed to load site data:', error);
    return null;
  }
}

function renderCards() {
  if (!siteData) return;
  const services = siteData.services;
  Object.keys(services).forEach(key => {
    const cardId = `card-${key}`;
    const cardElement = document.getElementById(cardId);
    if (cardElement) {
      const service = services[key][state.lang];
      cardElement.innerHTML = `
        <div class="title">${service.title}</div>
        <div class="icon">${service.icon}</div>
        <div class="content"><p>${service.desc}</p></div>
      `;
    }
  });
}
window.renderCards = renderCards; // Make it globally accessible for now

function openModal(key) {
  if (!siteData) return;
  const services = siteData.services;
  const data = services[key][state.lang].modal;
  const m = document.createElement('div');
  m.className = 'modal-backdrop';
  m.innerHTML = `
    <div class="modal" tabindex="-1" role="dialog" aria-modal="true" aria-labelledby="modal-title-${key}">
      <button class="modal-close" aria-label="Close modal">&times;</button>
      <div class="modal-header">
        <img src="${data.img}" alt="${data.imgAlt}" />
        <div class="modal-title" id="modal-title-${key}">${data.title}</div>
      </div>
      <div class="modal-body">
        <p>${data.content}</p>
        <div class="modal-video">${data.video}</div>
        <ul>
          ${data.features.map(i => `<li>${i}</li>`).join("")}
        </ul>
      </div>
      <div class="modal-footer-bar">
        <a class="footer-btn" href="${data.learn}" target="_blank" rel="noopener">${state.lang ==='en'?'Learn More':'Más Información'}</a>
        <button class="footer-btn" id="ask-chattia">${state.lang ==='en'?'Ask Chattia':'Preguntar Chattia'}</button>
        <button class="footer-btn" id="join-us">${state.lang ==='en'?'Join Us':'Únete'}</button>
        <button class="footer-btn cta" id="modal-contact-btn">${state.lang ==='en'?'Contact Us':'Contáctanos'}</button>
        <button class="footer-btn cancel" id="cancel-btn">${state.lang ==='en'?'Cancel':'Cancelar'}</button>
      </div>
    </div>`;
  const root = document.getElementById('modal-root');
  root.innerHTML = '';
  root.appendChild(m);
  const modal = m.querySelector('.modal');
  modal.focus();

  function close() { root.innerHTML = ''; }
  m.onclick = e => { if (e.target === m) close(); };
  modal.querySelector('.modal-close').onclick = close;
  modal.querySelector('#cancel-btn').onclick = close;
  document.addEventListener('keydown', function esc(e){ if(e.key==='Escape'){ close(); document.removeEventListener('keydown', esc); } }, { once:true });

  modal.querySelector('#modal-contact-btn').onclick = () => { window.openContactModal(); close(); };
  modal.querySelector('#ask-chattia').onclick = () => { window.openChatbotModal(); close(); };
  modal.querySelector('#join-us').onclick = () => { window.openJoinModal(); close(); };
}

async function initHome() {
  await loadData();
  renderCards();

  if (!siteData) return;
  const services = siteData.services;
  Object.keys(services).forEach(key => {
    const cardId = `card-${key}`;
    const cardElement = document.getElementById(cardId);
    if (cardElement) {
      cardElement.onclick = () => openModal(key);
      cardElement.onkeydown = e => { if (e.key === "Enter" || e.key === " ") openModal(key); };
    }
  });
}

initHome();
