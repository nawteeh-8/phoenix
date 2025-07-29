document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  const langToggle = document.getElementById('lang-toggle');

  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    theme = document.body.classList.contains('dark') ? 'dark' : 'light';
    themeToggle.textContent = theme === 'dark' ? 'Light' : 'Dark';
  });

  langToggle.addEventListener('click', () => {
    lang = lang === 'en' ? 'es' : 'en';
    langToggle.textContent = lang === 'en' ? 'ES' : 'EN';
    renderCards();
    updateNav();
  });

  function updateNav() {
    document.querySelectorAll('.nav-links a').forEach(a => {
      a.textContent = a.dataset[lang];
    });
  }
});

// --- CONTACT MODAL ---
function openContactModal() {
  fetch('/fabs/contactus.html')
    .then(r => r.text())
    .then(html => {
      const doc = new DOMParser().parseFromString(html, 'text/html');
      const body = doc.body.innerHTML;
      const m = document.createElement('div');
      m.className = 'modal-backdrop';
      m.innerHTML = `
        <div class="ops-modal" tabindex="-1" role="dialog" aria-modal="true" id="contact-modal">
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
      const form = modal.querySelector('#contactForm');
      if (form) {
        form.addEventListener('submit', e => { e.preventDefault(); alert('Contact form submitted!'); form.reset(); });
      }
      if (typeof makeDraggable === 'function') makeDraggable(modal);
    })
    .catch(err => console.error('Contact modal load error', err));
}

function centerModal(modal) {
  const left = (window.innerWidth - modal.offsetWidth) / 2;
  const top = Math.max((window.innerHeight - modal.offsetHeight) / 2, 20);
  modal.style.left = `${left}px`;
  modal.style.top = `${top}px`;
  modal.style.transform = 'none';
}

