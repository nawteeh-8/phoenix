function loadModal(url) {
  fetch(url)
    .then(r => r.text())
    .then(html => {
      const root = document.getElementById('modal-root') || document.body;
      const backdrop = document.createElement('div');
      backdrop.className = 'modal-backdrop';
      backdrop.style.zIndex = '4000';
      backdrop.innerHTML = html;
      root.innerHTML = '';
      root.appendChild(backdrop);
      function close() { root.innerHTML = ''; }
      backdrop.onclick = e => { if (e.target === backdrop) close(); };
      document.addEventListener('keydown', function esc(ev) {
        if (ev.key === 'Escape') { close(); document.removeEventListener('keydown', esc); }
      }, { once: true });
    })
    .catch(err => console.error('Modal load error', err));
}

function openChatbotModal() { loadModal('fabs/chatbot.html'); }
function openContactModal() { loadModal('fabs/contactus.html'); }
function openJoinModal() { loadModal('fabs/joinus.html'); }
