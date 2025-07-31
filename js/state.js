const state = {
  lang: 'en',
  theme: 'light',
  subscribers: [],

  setLang(newLang) {
    this.lang = newLang;
    this.notify();
  },

  setTheme(newTheme) {
    this.theme = newTheme;
    this.notify();
  },

  subscribe(callback) {
    this.subscribers.push(callback);
  },

  notify() {
    this.subscribers.forEach(callback => callback());
  },

  init() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    this.setTheme(savedTheme);

    // Add more initialization if needed, e.g., for language
  }
};

export default state;
