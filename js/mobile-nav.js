export function initMobileNav() {
  const mobileNav = document.getElementById('mobileNav');
  const toggleNav = document.getElementById('toggleNav');
  const svcBtn = document.getElementById('svcBtn');

  if (!mobileNav || !toggleNav || !svcBtn) {
    return;
  }

  toggleNav.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    toggleNav.classList.toggle('open');
    toggleNav.setAttribute('aria-expanded', isOpen);
  });

  svcBtn.addEventListener('click', () => {
    const dropdown = svcBtn.parentElement;
    dropdown.classList.toggle('open');
    const expanded = svcBtn.getAttribute('aria-expanded') === 'true';
    svcBtn.setAttribute('aria-expanded', !expanded);
  });

  document.querySelectorAll('.nav-items a, .nav-items button:not(#svcBtn)').forEach(el => {
    el.addEventListener('click', () => {
      if (mobileNav.classList.contains('open')) {
        mobileNav.classList.remove('open');
        toggleNav.classList.remove('open');
        toggleNav.setAttribute('aria-expanded', false);
      }
    });
  });

  function createSVG(width, height, radius) {
    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    const rect = document.createElementNS(svgNS, 'rect');

    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    rect.setAttribute('x', '0');
    rect.setAttribute('y', '0');
    rect.setAttribute('width', '100%');
    rect.setAttribute('height', '100%');
    rect.setAttribute('rx', radius);
    rect.setAttribute('ry', radius);
    rect.setAttribute('pathLength', '10');

    svg.appendChild(rect);
    return svg;
  }

  document.querySelectorAll('.sketch-button').forEach(button => {
    const style = getComputedStyle(button);
    const radius = parseInt(style.borderRadius, 10) || 0;

    const lines = document.createElement('div');
    lines.className = 'lines';

    const groupTop = document.createElement('div');
    const groupBottom = document.createElement('div');

    const svg = createSVG(button.offsetWidth, button.offsetHeight, radius);

    groupTop.appendChild(svg);
    groupTop.appendChild(svg.cloneNode(true));
    groupTop.appendChild(svg.cloneNode(true));
    groupTop.appendChild(svg.cloneNode(true));

    groupBottom.appendChild(svg.cloneNode(true));
    groupBottom.appendChild(svg.cloneNode(true));
    groupBottom.appendChild(svg.cloneNode(true));
    groupBottom.appendChild(svg.cloneNode(true));

    lines.appendChild(groupTop);
    lines.appendChild(groupBottom);

    button.appendChild(lines);

    button.addEventListener('pointerenter', () => button.classList.add('start'));
    svg.addEventListener('animationend', () => button.classList.remove('start'));
  });
}
