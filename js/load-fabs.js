(function() {
  // --- LOAD FABs ---
  const base = window.location.pathname.includes('/mainnav/') ? '..' : '.';
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
      } else {
        console.warn('FABs HTML content is empty.');
      }
    })
    .catch(err => console.error('FABs load error:', err));

  // --- BIG SCREEN FABs ---
  function initBigScreenFabs() {
    const fabContainer = document.querySelector('.fab-container');
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
