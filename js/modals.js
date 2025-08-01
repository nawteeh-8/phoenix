const mobileNav = document.getElementById('mobileNav');
const toggleNav = document.getElementById('toggleNav');
const langBtn = document.getElementById('langBtn');
const themeBtn = document.getElementById('themeBtn');
const svcBtn = document.getElementById('svcBtn');
const svcMenu = document.getElementById('svcMenu');

let dark=false;

function getBasePath() {
  const url = new URL('.', document.baseURI || window.location.href);
  return url.pathname.replace(/\/$/, '');
}

function attachModalClose(modal, close) {
  function handleClick(e) {
    if (!modal.contains(e.target)) {
      close();
    }
  }
  function handleKey(e) {
    if (e.key === 'Escape') {
      close();
    }
  }
  const btn = modal.querySelector('.modal-x, #chatbot-x, .modal-close');
  if (btn) btn.addEventListener('click', close);
  document.addEventListener('click', handleClick);
  document.addEventListener('keydown', handleKey);
  return () => {
    document.removeEventListener('click', handleClick);
    document.removeEventListener('keydown', handleKey);
    if (btn) btn.removeEventListener('click', close);
  };
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
      const scriptNodes = [...doc.querySelectorAll('script')];
      scriptNodes.forEach(s => s.remove());
      const body = doc.body.innerHTML;
      const modal = document.createElement('div');
      modal.className = 'ops-modal';
      modal.setAttribute('tabindex', '-1');
      modal.setAttribute('role', 'dialog');
      modal.setAttribute('aria-modal', 'true');
      modal.setAttribute('aria-labelledby', 'contact-title');
      modal.id = 'contact-modal';
      modal.innerHTML = `<button class="modal-x" aria-label="CERRAR">X</button>${body}`;
      const root = document.getElementById('modal-root') || document.body;
      root.innerHTML = '';
      root.appendChild(modal);
      modal.focus();

      const addedLinks = [];
      ['style.css', 'contactus.css'].forEach(file => {
        if (!document.querySelector(`link[href$="${file}"]`)) {
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = `${base}/css/${file}`;
          document.head.appendChild(link);
          addedLinks.push(link);
        }
      });

      let detach;
      function close() {
        root.innerHTML = '';
        addedLinks.forEach(l => l.remove());
        if (detach) detach();
      }
      window.addEventListener('modal-close', close, { once: true });
      detach = attachModalClose(modal, close);

      // append and execute scripts from fetched HTML
      scriptNodes.forEach(s => {
        const src = s.getAttribute('src');
        const newScript = document.createElement('script');
        if (src) {
          newScript.src = src;
        } else {
          newScript.textContent = s.textContent;
        }
        modal.appendChild(newScript);
      });

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
          window.dispatchEvent(new Event('modal-close'));
        });
      }
      if (typeof makeDraggable === 'function') makeDraggable(modal);
    })
    .catch(err => {
      console.error('Contact modal load error', err);
      const root = document.getElementById('modal-root');
      const message = 'Unable to load contact form. Please try again or email us at support@example.com.';
      if (root) {
        root.innerHTML = '';
        const msg = document.createElement('div');
        msg.setAttribute('role', 'alert');
        msg.className = 'modal-error';
        msg.textContent = message;
        root.appendChild(msg);
      } else {
        alert(message);
      }
    });
}

// --- CHATBOT MODAL ---
function openChatbotModal() {
  const base = getBasePath();
  fetch(`${base}/fabs/chatbot.html`)
    .then(r => r.text())
    .then(html => {
      const doc = new DOMParser().parseFromString(html, 'text/html');
      const body = doc.body.innerHTML;
      const scriptNodes = [...doc.querySelectorAll('script')];

      const modal = document.createElement('div');
      modal.id = 'chatbot-container';
      modal.className = 'ops-modal';
      modal.setAttribute('tabindex', '-1');
      modal.setAttribute('role', 'dialog');
      modal.setAttribute('aria-modal', 'true');
      modal.setAttribute('aria-labelledby', 'title');
      modal.innerHTML = body;
      document.body.appendChild(modal);
      modal.focus();

      // track scripts added so we can remove them on close
      const addedScripts = [];
      scriptNodes.forEach(s => {
        const src = s.getAttribute('src');
        if (src && !document.querySelector(`script[src="${src}"]`)) {
          const newScript = document.createElement('script');
          newScript.src = src;
          modal.appendChild(newScript);
          addedScripts.push(newScript);
        } else if (!src) {
          const newScript = document.createElement('script');
          newScript.textContent = s.textContent;
          modal.appendChild(newScript);
          addedScripts.push(newScript);
        }
      });

      let detach;
      function close() {
        addedScripts.forEach(el => el.remove());
        document.body.removeChild(modal);
        if (detach) detach();
      }
      detach = attachModalClose(modal, close);
      if (typeof makeDraggable === 'function') makeDraggable(modal, modal.querySelector('#chatbot-header'));

      // scripts from chatbot.html are appended above and execute automatically
    })
    .catch(err => console.error('Chatbot modal load error', err));
}

// --- JOIN US MODAL ---
function openJoinModal() {
  const base = getBasePath();

  const root = document.getElementById('modal-root');
  if (!root) {
    console.error('Join modal root element (#modal-root) not found');
    alert('Unable to open Join modal.');
    return;
  }

  // Ensure Join Us styles are loaded once
  if (!document.querySelector('link[href$="joinus.css"]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `${base}/css/joinus.css`;
    document.head.appendChild(link);
  }

  fetch(`${base}/fabs/joinus.html`)
    .then(r => {
      if (!r.ok) {
        throw new Error(`Failed to load Join Us modal: ${r.status} ${r.statusText}`);
      }
      return r.text();
    })
    .then(html => {
      const doc = new DOMParser().parseFromString(html, 'text/html');
      const body = doc.body.innerHTML;
      const modal = document.createElement('div');
      modal.className = 'ops-modal';
      modal.setAttribute('tabindex', '-1');
      modal.setAttribute('role', 'dialog');
      modal.setAttribute('aria-modal', 'true');
      modal.setAttribute('aria-labelledby', 'joinus-title');
      modal.id = 'join-modal';
      modal.innerHTML = `<button class="modal-x" aria-label="CERRAR">X</button>${body}`;
      root.innerHTML = '';
      root.appendChild(modal);
      modal.focus();
      let detach;
      function close() {
        root.innerHTML = '';
        if (detach) detach();
      }
      window.addEventListener('modal-close', close, { once: true });
      detach = attachModalClose(modal, close);

      function init() {
        if (typeof initJoinForm === 'function') initJoinForm(modal);
      }

      if (typeof initJoinForm === 'function') {
        init();
      } else {
        const script = document.createElement('script');
        script.src = `${base}/js/joinus.js`;
        script.onload = init;
        document.head.appendChild(script);
      }

      if (typeof makeDraggable === 'function') makeDraggable(modal);
    })
    .catch(err => {
      console.error('Join modal load error', err);
      alert('Unable to load Join Us modal.');
    });
}
