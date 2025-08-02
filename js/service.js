import { svc } from './i18n.js';

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const key = params.get('svc');
  if (!key || !svc[key]) return;
  const data = svc[key].modal;
  document.getElementById('service-title').textContent = data.title;
  const img = document.getElementById('service-img');
  img.src = data.img;
  img.alt = data.imgAlt;
  document.getElementById('service-content').textContent = data.content;
  document.getElementById('service-video').textContent = data.video;
  const list = document.getElementById('service-features');
  list.innerHTML = data.features.map(f => `<li>${f}</li>`).join('');
  document.getElementById('learn-more').href = data.learn;
  document.getElementById('chatbot-btn').href = `chatbot.html?svc=${key}`;
  document.getElementById('join-btn').href = `join.html?svc=${key}`;
  document.getElementById('contact-btn').href = `contact.html?svc=${key}`;
});
