(function() {
  // --- ENSURE FONTAWESOME STYLESHEET ---
  const faHref = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css';
  const faIntegrity = 'sha512-bNDdB2S/bRMyCV2wAPOQgpdnH3UX0DpD+s/COM24kTx5cDIeEJD7BqXc9EjoP6KDAdAm8YGtS+wGGyRyvCb4TQ==';
  const faSelector = 'link[href*="cdnjs.cloudflare.com/ajax/libs/font-awesome"]';
  if (!document.querySelector(faSelector)) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = faHref;
    link.integrity = faIntegrity;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  }

  // --- LOAD FABs ---
  const base = window.location.pathname.includes('/mainnav/') ? '..' : '.';

  // Load mobile and desktop FABs sequentially
  fetch(`${base}/fabs/mobile-nav.html`)
    .then(r => {
      if (!r.ok) {
        throw new Error(`Failed to fetch FABs: ${r.status}`);
      }
      return r.text();
    })
    .then(h => {
      if (h.trim()) {
        document.body.insertAdjacentHTML('beforeend', h);
        if (typeof window.initMobileNav === 'function') {
          window.initMobileNav();
        }
      } else {
        console.warn('FABs HTML content is empty.');
      }
      return fetch(`${base}/fabs/fabs-new.html`);
    })
    .then(r => {
      if (!r.ok) {
        throw new Error(`Failed to fetch desktop FABs: ${r.status}`);
      }
      return r.text();
    })
    .then(h => {
      if (h.trim()) {
        document.body.insertAdjacentHTML('beforeend', h);
        initBigScreenFabs();
      } else {
        console.warn('Desktop FABs HTML content is empty.');
      }
    })
    .catch(err => console.error('FABs load error:', err));

  // --- BIG SCREEN FABs ---
  function initBigScreenFabs() {
    const fabContainer = document.querySelector('#fab-container');
    if (fabContainer) {
      // FABs are displayed or hidden via CSS based on screen size.
      // No special JS logic needed for initialization at this moment.
    }
  }

  // --- INITIALIZE ---
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBigScreenFabs);
  } else {
    initBigScreenFabs();
  }
})();
