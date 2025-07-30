document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle') || document.getElementById('btn-theme');
  const langToggle = document.getElementById('lang-toggle') || document.getElementById('btn-lang');

  const savedTheme = localStorage.getItem('theme') || 'light';
  document.body.classList.toggle('dark', savedTheme === 'dark');
  if (themeToggle) themeToggle.textContent = savedTheme === 'dark' ? 'Light' : 'Dark';

  themeToggle && themeToggle.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    themeToggle.textContent = isDark ? 'Light' : 'Dark';
  });

  langToggle && langToggle.addEventListener('click', () => {
    switchLanguage(lang === 'en' ? 'es' : 'en');
  });

  window.sanitizeForm = function(form) {
    const fields = form.querySelectorAll('input, textarea');
    for (const field of fields) {
      const val = field.value.trim();
      if (/[<>]/.test(val) || /script/i.test(val)) {
        return false;
      }
      field.value = val;
    }
    return true;
  };
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
        <div class="ops-modal" tabindex="-1" role="dialog" aria-modal="true" aria-labelledby="contactus-title" id="contact-modal">
          <button class="modal-x" aria-label="CERRAR">X</button>
          ${body}
        </div>`;
      const root = document.getElementById('modal-root');
      root.innerHTML = '';
      root.appendChild(m);
      const modal = m.querySelector('.ops-modal');
      modal.focus();
      function close() { root.innerHTML = ''; }
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


