(function () {
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

  const base = window.location.pathname.includes('/mainnav/') ? '..' : '.';

  function appendToBody(html) {
    if (html && html.trim()) {
      document.body.insertAdjacentHTML('beforeend', html);
    }
  }

  function initBigScreenFabs() {
    const fabContainer = document.querySelector('#fab-container');
    if (fabContainer) {
      // FABs are displayed or hidden via CSS based on screen size.
    }
  }

  function addClick(selector, handler) {
    const el = document.querySelector(selector);
    if (el && typeof handler === 'function') {
      el.addEventListener('click', handler);
    }
  }

  function attachFabListeners() {
    addClick('#fab-chatbot', window.openChatbotModal);
    addClick('#fab-contact', window.openContactModal);
    addClick('#fab-join', window.openJoinModal);
    addClick('#mobile-chatbot', window.openChatbotModal);
    addClick('#mobile-contact', window.openContactModal);
    addClick('#mobile-join', window.openJoinModal);
  }

  let fabsHTMLCache = null;
  function fetchFabsHTML() {
    if (fabsHTMLCache) {
      return Promise.resolve(fabsHTMLCache);
    }
    return fetch(`${base}/fabs/fabs-new.html`)
      .then((r) => {
        if (!r.ok) {
          throw new Error(`fabs-new.html ${r.status} ${r.statusText}`);
        }
        return r.text();
      })
      .then((html) => {
        fabsHTMLCache = html;
        return html;
      });
  }

  function insertFabs() {
    return fetchFabsHTML()
      .then((html) => {
        if (!document.querySelector('#fab-container')) {
          appendToBody(html);
          initBigScreenFabs();
        }
      })
      .catch((err) => console.error('FABs load error:', err));
  }

  function loadMobileNav() {
    return fetch(`${base}/fabs/mobile-nav.html`)
      .then((r) => {
        if (!r.ok) {
          throw new Error(`mobile-nav.html ${r.status} ${r.statusText}`);
        }
        return r.text();
      })
      .then((html) => {
        if (html.trim()) {
          appendToBody(html);
          if (typeof window.initMobileNav === 'function') {
            window.initMobileNav();
          }
        }
      })
      .catch((err) => console.error('mobile-nav fetch error:', err));
  }

  if (window.location.protocol === 'file:') {
    const mobileNavHTML = `<div id="mobileNav" class="mobile-nav" aria-label="Mobile navigation">
  <div class="nav-items">
    <button id="mobile-contact" class="nav-btn" title="Contact Us" aria-label="Contact Us"><i class="fa-solid fa-envelope"></i></button>
    <button id="mobile-join" class="nav-btn" title="Join Us" aria-label="Join Us"><i class="fa-solid fa-user-plus"></i></button>
    <button id="mobile-chatbot" class="nav-btn" title="Chatbot" aria-label="Chatbot"><i class="fa-solid fa-comment"></i></button>
    <button id="lang-toggle" class="nav-btn" aria-label="Toggle language">ES</button>
    <button id="theme-toggle" class="nav-btn" aria-label="Toggle theme">Dark</button>
    <div class="dropdown">
      <button id="svcBtn" class="nav-btn" aria-expanded="false" aria-haspopup="true" aria-controls="svcMenu" aria-label="Toggle services menu"><i class="fa-solid fa-bars"></i></button>
      <div class="dropdown-menu" id="svcMenu" role="menu" aria-label="Services menu">
        <a href="../mainnav/opera.html" role="menuitem">Ops</a>
        <a href="../mainnav/center.html" role="menuitem">Center</a>
        <a href="../mainnav/it.html" role="menuitem">IT</a>
        <a href="../mainnav/pros.html" role="menuitem">Pros</a>
      </div>
    </div>
    <a href="../index.html" class="nav-btn" title="Home" aria-label="Home"><i class="fa-solid fa-home"></i></a>
  </div>
  <button id="toggleNav" class="nav-btn main sketch-button" aria-label="Toggle menu" aria-expanded="false" aria-controls="mobileNav">
    <i class="fa-solid fa-bars" aria-hidden="true"></i>
  </button>
</div>`;
    const fabsHTML = `<!-- Floating Action Buttons snippet -->\n<div id="fab-container">\n  <button id="fab-chatbot" title="Chatbot"><i class="fa-solid fa-comment"></i></button>\n  <button id="fab-contact" title="Contact Us"><i class="fa-solid fa-envelope"></i></button>\n  <button id="fab-join" title="Join Us"><i class="fa-solid fa-user-plus"></i></button>\n</div>`;
    appendToBody(mobileNavHTML);
    appendToBody(fabsHTML);
    if (typeof window.initMobileNav === 'function') {
      window.initMobileNav();
    }
    initBigScreenFabs();
    attachFabListeners();
  } else {
    const fabPromise = insertFabs();
    const navPromise = loadMobileNav();
    Promise.allSettled([fabPromise, navPromise]).then(attachFabListeners);
  }
})();

