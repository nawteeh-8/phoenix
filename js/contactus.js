import { sanitizeForm } from './form-utils.js';

document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contactForm');
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    if (!sanitizeForm(contactForm)) {
      alert('Suspicious content detected. Submission rejected.');
      return;
    }
    alert('Contact form submitted!');
    contactForm.reset();
  });
});
