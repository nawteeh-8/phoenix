const mobileNav = document.getElementById('mobileNav');
const toggleNav = document.getElementById('toggleNav');
const langBtn = document.getElementById('langBtn');
const themeBtn = document.getElementById('themeBtn');
const svcBtn = document.getElementById('svcBtn');
const svcMenu = document.getElementById('svcMenu');

let dark=false;

function getBasePath() {
  const depth = window.location.pathname.split('/').length - 2;
  return depth > 0 ? '../'.repeat(depth) : '.';
}

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

// --- CONTACT US MODAL ---
function openContactModal() {
  const base = getBasePath();
  fetch(`${base}/fabs/contactus.html`)
    .then(r => r.text())
    .then(html => {
      const doc = new DOMParser().parseFromString(html, 'text/html');
      const body = doc.body.innerHTML;
      const m = document.createElement('div');
      m.className = 'modal-backdrop';
      m.innerHTML = `
        <div class="ops-modal" tabindex="-1" role="dialog" aria-modal="true" aria-labelledby="contact-title" id="contact-modal">
          <button class="modal-x" aria-label="CERRAR">X</button>
          ${body}
        </div>`;
      const root = document.getElementById('modal-root');
      root.innerHTML = '';
      root.appendChild(m);
      const modal = m.querySelector('.ops-modal');
      modal.focus();
      function close() { root.innerHTML = ''; }
      const handleClose = () => { close(); };
      window.addEventListener('modal-close', handleClose, { once: true });
      m.onclick = e => (e.target === m ? close() : 0);
      modal.querySelector('.modal-x').onclick = close;
      document.addEventListener('keydown', function esc(e) { if (e.key === 'Escape') { close(); document.removeEventListener('keydown', esc); } }, { once: true });
      const form = modal.querySelector('#contactForm');
      if (form) {
        form.addEventListener('submit', e => {
          e.preventDefault();
          if (!sanitizeForm(form)) {
            alert('Suspicious content detected. Submission rejected.');
            return;
          }
          alert('Contact form submitted!');
          form.reset();
        });
      }
      if (typeof makeDraggable === 'function') makeDraggable(modal);
    })
    .catch(err => console.error('Contact modal load error', err));
}

// --- CHATBOT MODAL ---
function openChatbotModal() {
  const base = getBasePath();
  fetch(`${base}/fabs/chatbot.html`)
    .then(r => r.text())
    .then(html => {
      const doc = new DOMParser().parseFromString(html, 'text/html');
      const body = doc.body.innerHTML;
      const m = document.createElement('div');
      m.id = 'chatbot-modal-backdrop';
      m.innerHTML = `<div id="chatbot-container" class="ops-modal" tabindex="-1" role="dialog" aria-modal="true" aria-labelledby="title">${body}</div>`;
      document.body.appendChild(m);
      const modal = m.querySelector('.ops-modal');
      modal.focus();
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
  const base = getBasePath();
  fetch(`${base}/fabs/joinus.html`)
    .then(r => r.text())
    .then(html => {
      const doc = new DOMParser().parseFromString(html, 'text/html');
      const body = doc.body.innerHTML;
      const m = document.createElement('div');
      m.className = 'modal-backdrop';
      m.innerHTML = `
        <div class="ops-modal" tabindex="-1" role="dialog" aria-modal="true" aria-labelledby="joinus-title" id="join-modal">
          <button class="modal-x" aria-label="CERRAR">X</button>
          ${body}
        </div>`;
      const root = document.getElementById('modal-root');
      root.innerHTML = '';
      root.appendChild(m);
      const modal = m.querySelector('.ops-modal');
      modal.focus();
      function close() { root.innerHTML = ''; }
      const handleClose = () => { close(); };
      window.addEventListener('modal-close', handleClose, { once: true });
      m.onclick = e => (e.target === m ? close() : 0);
      modal.querySelector('.modal-x').onclick = close;
      document.addEventListener('keydown', function esc(e) { if (e.key === 'Escape') { close(); document.removeEventListener('keydown', esc); } }, { once: true });
      const form = modal.querySelector('#joinForm');
      if (form) {
        form.addEventListener('submit', e => {
          e.preventDefault();
          if (!sanitizeForm(form)) {
            alert('Suspicious content detected. Submission rejected.');
            return;
          }
          alert('Join form submitted!');
          form.reset();
          close();
        });
      }
      if (typeof makeDraggable === 'function') makeDraggable(modal);
    })
    .catch(err => console.error('Join modal load error', err));
}
