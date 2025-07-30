(function() {
  // --- LOAD FABs ---
  fetch(window.location.pathname.includes('/mainnav/') ? '../fabs/fabs.html' : '/fabs/fabs.html')
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

  // --- HAMBURGER ---
  function initHamburger() {
    const hamburger = document.getElementById('hamburger-menu');
    const navLinks = document.querySelector('.nav-links');
    if (hamburger && navLinks) {
      hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
      });
    } else {
      console.warn('Hamburger menu or nav links not found.');
    }
  }

  // --- BIG SCREEN FABs ---
  function initBigScreenFabs() {
    const fabContainer = document.querySelector('.fab-container');
    if (fabContainer) {
      // Assuming you have specific classes or IDs for the three FABs
      // For example: .fab-contact, .fab-join, .fab-chatbot
      // You can add logic here to show/hide them based on screen size
      // or other conditions if needed.
      // For now, they will be visible by default as per the CSS.
    }
  }

  // --- ADAPTIVE SCREEN (HAMBURGER) ---
  function initAdaptiveScreen() {
    // Logic for adaptive screen is primarily handled by CSS media queries.
    // The hamburger menu's visibility is controlled by CSS.
    // The JS part is to ensure the click event is attached.
    initHamburger();
  }

  // --- INITIALIZE ---
  // Wait for the DOM to be fully loaded before running the scripts
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initBigScreenFabs();
      initAdaptiveScreen();
    });
  } else {
    // DOM is already loaded
    initBigScreenFabs();
    initAdaptiveScreen();
  }
})();
