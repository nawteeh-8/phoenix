(function(global){
  function toggleTheme({
    button,
    darkClass = 'dark',
    storageKey = 'theme',
    lightLabel = 'Light',
    darkLabel = 'Dark'
  } = {}) {
    const isDark = document.body.classList.toggle(darkClass);
    try {
      localStorage.setItem(storageKey, isDark ? 'dark' : 'light');
    } catch (e) {}
    if (button) {
      button.textContent = isDark ? lightLabel : darkLabel;
    }
    return isDark ? 'dark' : 'light';
  }

  function initTheme({
    button,
    darkClass = 'dark',
    storageKey = 'theme',
    lightLabel = 'Light',
    darkLabel = 'Dark'
  } = {}) {
    const saved = localStorage.getItem(storageKey) || 'light';
    document.body.classList.toggle(darkClass, saved === 'dark');
    if (button) {
      button.textContent = saved === 'dark' ? lightLabel : darkLabel;
      button.addEventListener('click', () =>
        toggleTheme({ button, darkClass, storageKey, lightLabel, darkLabel })
      );
    }
    return saved;
  }

  function toggleLanguage({
    button,
    statusEl,
    currentLang = 'en',
    onSwitch,
    labels = { en: 'ES', es: 'EN' },
    statusMsg = { en: 'English selected', es: 'Spanish selected' }
  } = {}) {
    const nextLang = currentLang === 'en' ? 'es' : 'en';
    if (typeof onSwitch === 'function') {
      onSwitch(nextLang);
    }
    if (button) {
      button.textContent = labels[nextLang];
      button.setAttribute('aria-pressed', nextLang === 'es');
      button.setAttribute(
        'aria-label',
        nextLang === 'en' ? 'Switch to Spanish' : 'Switch to English'
      );
    }
    if (statusEl) {
      statusEl.textContent = statusMsg[nextLang];
    }
    return nextLang;
  }

  function initLanguage({
    button,
    statusEl,
    currentLang = 'en',
    onSwitch,
    labels,
    statusMsg
  } = {}) {
    if (button) {
      const btnLabels = labels || { en: 'ES', es: 'EN' };
      const messages = statusMsg || {
        en: 'English selected',
        es: 'Spanish selected'
      };
      button.textContent = btnLabels[currentLang];
      button.setAttribute('aria-pressed', currentLang === 'es');
      button.setAttribute(
        'aria-label',
        currentLang === 'en' ? 'Switch to Spanish' : 'Switch to English'
      );
      if (statusEl) {
        statusEl.textContent = messages[currentLang];
      }
      button.addEventListener('click', () => {
        currentLang = toggleLanguage({
          button,
          statusEl,
          currentLang,
          onSwitch,
          labels: btnLabels,
          statusMsg: messages
        });
      });
    }
    return currentLang;
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { toggleTheme, initTheme, toggleLanguage, initLanguage };
  } else {
    global.toggleTheme = toggleTheme;
    global.initTheme = initTheme;
    global.toggleLanguage = toggleLanguage;
    global.initLanguage = initLanguage;
  }
})(typeof window !== 'undefined' ? window : this);
