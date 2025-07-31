function makeDraggable(elem, dragHandle) {
  let isDown = false, startX = 0, startY = 0;
  let header = dragHandle || elem;
  header.style.cursor = 'move';
  header.onmousedown = function(e) {
    isDown = true;
    elem.classList.add('dragging');
    function toPixels(val, total, def) {
      if (!val) return def;
      if (String(val).includes('%')) return total * parseFloat(val) / 100;
      const num = parseFloat(val);
      return isNaN(num) ? def : num;
    }
    const leftPx = toPixels(elem.style.left, window.innerWidth, window.innerWidth / 2);
    const topPx = toPixels(elem.style.top, window.innerHeight, window.innerHeight / 4);
    startX = e.clientX - leftPx;
    startY = e.clientY - topPx;
    document.onmousemove = function(e) {
      if (!isDown) return;
      elem.style.left = `${e.clientX - startX}px`;
      elem.style.top = `${e.clientY - startY}px`;
      elem.style.transform = 'translate(0, 0)';
    };
    document.onmouseup = function() {
      isDown = false;
      elem.classList.remove('dragging');
      document.onmousemove = null;
      document.onmouseup = null;
    };
    return false;
  };
}

