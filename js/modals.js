const mobileNav = document.getElementById('mobileNav');
const toggleNav = document.getElementById('toggleNav');
const langBtn = document.getElementById('langBtn');
const themeBtn = document.getElementById('themeBtn');
const svcBtn = document.getElementById('svcBtn');
const svcMenu = document.getElementById('svcMenu');

let lang='en';
let dark=false;

if (toggleNav) {
  toggleNav.onclick = ()=>{
    mobileNav.classList.toggle('open');
    toggleNav.classList.toggle('open');
  };
}

if (svcBtn) {
  svcBtn.onclick = () => {
    svcBtn.parentElement.classList.toggle('open');
    const expanded = svcBtn.getAttribute('aria-expanded') === 'true';
    svcBtn.setAttribute('aria-expanded', !expanded);
  };
}

if (langBtn) {
  langBtn.onclick = () => {
    lang = lang==='en'?'es':'en';
    langBtn.textContent = lang==='en'?'ES':'EN';
    document.documentElement.lang = lang;
  };
}

if (themeBtn) {
  themeBtn.onclick = () => {
    dark = !dark;
    document.body.classList.toggle('dark', dark);
    themeBtn.textContent = dark?'Light':'Dark';
  };
}

// --- CHATBOT MODAL ---
function openChatbotModal() {
  fetch('fabs/chatbot.html')
    .then(r => r.text())
    .then(html => {
      const doc = new DOMParser().parseFromString(html, 'text/html');
      const body = doc.body.innerHTML;
      const m = document.createElement('div');
      m.id = 'chatbot-modal-backdrop';
      m.innerHTML = `<div id="chatbot-container" class="ops-modal">${body}</div>`;
      document.body.appendChild(m);
      const modal = m.querySelector('.ops-modal');
      function close() { document.body.removeChild(m); }
      m.onclick = e => (e.target === m ? close() : 0);
      modal.querySelector('#chatbot-x').onclick = close;
      document.addEventListener('keydown', function esc(e) { if (e.key === 'Escape') { close(); document.removeEventListener('keydown', esc); } }, { once: true });
      if (typeof makeDraggable === 'function') makeDraggable(modal, modal.querySelector('#chatbot-header'));
    })
    .catch(err => console.error('Chatbot modal load error', err));
}

// --- JOIN US MODAL ---
function openJoinModal() {
  fetch('fabs/joinus.html')
    .then(r => r.text())
    .then(html => {
      const doc = new DOMParser().parseFromString(html, 'text/html');
      const body = doc.body.innerHTML;
      const m = document.createElement('div');
      m.className = 'modal-backdrop';
      m.innerHTML = `
        <div class="ops-modal" tabindex="-1" role="dialog" aria-modal="true" id="join-modal">
          <button class="modal-x" aria-label="CERRAR">X</button>
          ${body}
        </div>`;
      const root = document.getElementById('modal-root');
      root.innerHTML = '';
      root.appendChild(m);
      const modal = m.querySelector('.ops-modal');
      centerModal(modal);
      function close() { root.innerHTML = ''; }
      m.onclick = e => (e.target === m ? close() : 0);
      modal.querySelector('.modal-x').onclick = close;
      document.addEventListener('keydown', function esc(e) { if (e.key === 'Escape') { close(); document.removeEventListener('keydown', esc); } }, { once: true });
      const form = modal.querySelector('#joinForm');
      if (form) {
        form.addEventListener('submit', e => { e.preventDefault(); alert('Join form submitted!'); form.reset(); });
      }
      if (typeof makeDraggable === 'function') makeDraggable(modal);
    })
    .catch(err => console.error('Join modal load error', err));
}
