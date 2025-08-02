import { initMobileNav } from './mobile-nav.js';

const base = window.location.pathname.includes('/mainnav/') ? '..' : '.';

function appendToBody(html) {
  if (html && html.trim()) {
    document.body.insertAdjacentHTML('beforeend', html);
  }
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
        initMobileNav();
      }
    })
    .catch((err) => console.error('mobile-nav fetch error:', err));
}

if (window.location.protocol === 'file:') {
  const mobileNavHTML = `<div id="mobileNav" class="mobile-nav" aria-label="Mobile navigation">
  <div class="nav-items">
    <a href="${base}/contact.html?ref=mobile" class="nav-btn" title="Contact Us" aria-label="Contact Us"><i class="fa-solid fa-envelope"></i></a>
    <a href="${base}/join.html?ref=mobile" class="nav-btn" title="Join Us" aria-label="Join Us"><i class="fa-solid fa-user-plus"></i></a>
    <a href="${base}/chatbot.html?ref=mobile" class="nav-btn" title="Chatbot" aria-label="Chatbot"><i class="fa-solid fa-comment"></i></a>
    <button id="lang-toggle" class="nav-btn" aria-label="Toggle language">ES</button>
    <button id="theme-toggle" class="nav-btn" aria-label="Toggle theme">Dark</button>
    <div class="dropdown">
      <button id="svcBtn" class="nav-btn" aria-expanded="false" aria-haspopup="true" aria-controls="svcMenu" aria-label="Toggle services menu"><i class="fa-solid fa-bars"></i></button>
      <div class="dropdown-menu" id="svcMenu" role="menu" aria-label="Services menu">
        <a href="${base}/mainnav/opera.html" role="menuitem">Ops</a>
        <a href="${base}/mainnav/center.html" role="menuitem">Center</a>
        <a href="${base}/mainnav/it.html" role="menuitem">IT</a>
        <a href="${base}/mainnav/pros.html" role="menuitem">Pros</a>
      </div>
    </div>
    <a href="${base}/index.html" class="nav-btn" title="Home" aria-label="Home"><i class="fa-solid fa-home"></i></a>
  </div>
  <button id="toggleNav" class="nav-btn main sketch-button" aria-label="Toggle menu" aria-expanded="false" aria-controls="mobileNav">
    <i class="fa-solid fa-bars" aria-hidden="true"></i>
  </button>
</div>`;
  appendToBody(mobileNavHTML);
  initMobileNav();
} else {
  loadMobileNav();
}

