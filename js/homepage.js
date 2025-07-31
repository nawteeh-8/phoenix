let svc = {};
function renderCards() {
  ['ops','cc','it','pro'].forEach(key => {
    const c = svc[key];
    const el = document.getElementById('card-'+key);
    if (el && c) {
      el.innerHTML = `
        <div class="title">${c.title}</div>
        <div class="icon">${c.icon}</div>
        <div class="content"><p>${c.desc}</p></div>
      `;
    }
  });
}
['ops','cc','it','pro'].forEach(key => {
  const card = document.getElementById('card-'+key);
  if (card) {
    card.onclick = () => openModal(key);
    card.onkeydown = e => { if (e.key === 'Enter' || e.key === ' ') openModal(key); };
  }
});
function openModal(key) {
  const data = svc[key].modal;
  const labels = translations[lang].labels;
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
          ${data.features.map(i => `<li>${i}</li>`).join('')}
        </ul>
      </div>
      <div class="modal-footer-bar">
        <a class="footer-btn" href="${data.learn}" target="_blank" rel="noopener">${labels.learnMore}</a>
        <button class="footer-btn" id="ask-chattia">${labels.ask}</button>
        <button class="footer-btn" id="join-us">${labels.join}</button>
        <button class="footer-btn cta" id="modal-contact-btn">${labels.contact}</button>
        <button class="footer-btn cancel" id="cancel-btn">${labels.cancel}</button>
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
  modal.querySelector('#modal-contact-btn').onclick = ()=>{ openContactModal(); close(); };
  modal.querySelector('#ask-chattia').onclick = ()=>{ openChatbotModal(); close(); };
  modal.querySelector('#join-us').onclick = ()=>{ openJoinModal(); close(); };
}
function makeDraggable(elem, dragHandle) {
  let isDown = false, startX = 0, startY = 0;
  let header = dragHandle || elem;
  header.style.cursor = 'move';
  header.onmousedown = function(e) {
    isDown = true;
    elem.classList.add('dragging');
    function toPixels(val, total, def) {
      if (!val) return def;
      if (String(val).includes('%')) return total * parseFloat(val) / 100;
      const num = parseFloat(val);
      return isNaN(num) ? def : num;
    }
    const leftPx = toPixels(elem.style.left, window.innerWidth, window.innerWidth/2);
    const topPx = toPixels(elem.style.top, window.innerHeight, window.innerHeight/4);
    startX = e.clientX - leftPx;
    startY = e.clientY - topPx;
    document.onmousemove = function(e) {
      if (!isDown) return;
      elem.style.left = `${e.clientX - startX}px`;
      elem.style.top = `${e.clientY - startY}px`;
      elem.style.transform = 'translate(0, 0)';
    };
    document.onmouseup = function() {
      isDown = false;
      elem.classList.remove('dragging');
      document.onmousemove = null;
      document.onmouseup = null;
    };
    return false;
  };
}
