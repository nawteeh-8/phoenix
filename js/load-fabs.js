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
  // Mobile navigation FAB
  fetch(`${base}/fabs/mobile-nav.html`)
    .then(r => {
      if (!r.ok) {
        throw new Error(`Failed to fetch mobile nav: ${r.status}`);
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
        console.warn('Mobile nav HTML content is empty.');
      }
      return fetch(`${base}/fabs/fabs-new.html`);
    })
    .then(r => {
      if (!r.ok) {
        throw new Error(`Failed to fetch FABs: ${r.status}`);
      }
      return r.text();
    })
    .then(h => {
      if (h.trim()) {
        document.body.insertAdjacentHTML('beforeend', h);
        initBigScreenFabs();
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

  // Contact/Chatbot/Join FAB container
  fetch(`${base}/fabs/fabs-new.html`)
    .then(r => {
      if (!r.ok) {
        throw new Error(`Failed to fetch new FABs: ${r.status}`);
      }
      return r.text();
    })
    .then(h => {
      if (h.trim()) {
        document.body.insertAdjacentHTML('beforeend', h);
        initBigScreenFabs();
      } else {
        console.warn('FAB container HTML is empty.');
      }
    })
    .catch(err => console.error('FAB container load error:', err));

  // --- BIG SCREEN FABs ---
  function initBigScreenFabs() {
    const fabContainer = document.querySelector('#fab-container');
    if (fabContainer) {
      // FABs are displayed or hidden via CSS based on screen size.
      // No special JS logic needed for initialization at this moment.
    }
  }
  function appendToBody(html) {
    if (html && html.trim()) {
      document.body.insertAdjacentHTML('beforeend', html);
    }
  }
  if (window.location.protocol === 'file:') {
    const mobileNavHTML = `<div id="mobileNav" class="mobile-nav" aria-label="Mobile navigation">
  <div class="nav-items">
    <button onclick="openContactModal()" class="nav-btn" title="Contact Us" aria-label="Contact Us"><i class="fa fa-envelope"></i></button>
    <button onclick="openJoinModal()" class="nav-btn" title="Join Us" aria-label="Join Us"><i class="fa fa-user-plus"></i></button>
    <button onclick="openChatbotModal()" class="nav-btn" title="Chatbot" aria-label="Chatbot"><i class="fa fa-comment"></i></button>
    <button id="lang-toggle" class="nav-btn" aria-label="Toggle language">ES</button>
    <button id="theme-toggle" class="nav-btn" aria-label="Toggle theme">Dark</button>
    <div class="dropdown">
      <button id="svcBtn" class="nav-btn" aria-expanded="false" aria-haspopup="true" aria-controls="svcMenu" aria-label="Toggle services menu"><i class="fa fa-bars"></i></button>
      <div class="dropdown-menu" id="svcMenu" role="menu" aria-label="Services menu">
        <a href="../mainnav/opera.html" role="menuitem">Ops</a>
        <a href="../mainnav/center.html" role="menuitem">Center</a>
        <a href="../mainnav/it.html" role="menuitem">IT</a>
        <a href="../mainnav/pros.html" role="menuitem">Pros</a>
      </div>
    </div>
    <a href="../index.html" class="nav-btn" title="Home" aria-label="Home"><i class="fa fa-home"></i></a>
  </div>

  <button id="toggleNav" class="nav-btn main sketch-button" aria-label="Toggle menu" aria-expanded="false" aria-controls="mobileNav">
    <i class="fa fa-bars" aria-hidden="true"></i>
  </button>
</div>`;

    const fabsHTML = `<!-- Floating Action Buttons snippet -->\n<div id="fab-container">\n  <button onclick="openChatbotModal()" title="Chatbot"><i class="fa fa-comment"></i></button>\n  <button onclick="openContactModal()" title="Contact Us"><i class="fa fa-envelope"></i></button>\n  <button onclick="openJoinModal()" title="Join Us"><i class="fa fa-user-plus"></i></button>\n</div>`;

    appendToBody(mobileNavHTML);
    appendToBody(fabsHTML);

    if (typeof window.initMobileNav === 'function') {
      window.initMobileNav();
    }
    initBigScreenFabs();
  } else {
    const base = window.location.pathname.includes('/mainnav/') ? '..' : '.';

    const mobileNavFetch = fetch(`${base}/fabs/mobile-nav.html`)
      .then(r => {
        if (!r.ok) {
          throw new Error(`mobile-nav.html ${r.status} ${r.statusText}`);
        }
        return r.text();
      })
      .catch(err => {
        console.error('mobile-nav fetch error:', err);
        return '';
      });

    const fabsFetch = fetch(`${base}/fabs/fabs-new.html`)
      .then(r => {
        if (!r.ok) {
          throw new Error(`fabs-new.html ${r.status} ${r.statusText}`);
        }
        return r.text();
      })
      .catch(err => {
        console.error('fabs-new fetch error:', err);
        return '';
      });

    Promise.all([mobileNavFetch, fabsFetch]).then(([mobileHTML, fabsHTML]) => {
      appendToBody(mobileHTML);
      appendToBody(fabsHTML);
      if (mobileHTML.trim() && typeof window.initMobileNav === 'function') {
        window.initMobileNav();
      }
      initBigScreenFabs();
    });
  }
})();
