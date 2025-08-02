import { sanitizeForm } from './form-utils.js';

document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contactForm');
  const sanitize = window.sanitizeForm;
  const validate = window.validateFields;
  const rules = {
    name: { maxLength: 50, pattern: /^[a-zA-Z\s'-]+$/ },
    email: { maxLength: 100, pattern: /^[^@\s]+@[^@\s]+\.[^@\s]+$/ },
    contactNumber: { maxLength: 20, pattern: /^[0-9+\-\s()]+$/ },
    preferredDate: { required: true },
    preferredTime: { required: true },
    interest: { required: true },
    comments: { maxLength: 500 }
  };
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    if (!sanitizeForm(contactForm)) {
      alert('Suspicious content detected. Submission rejected.');
      return;
    }
    if (typeof validate === 'function' && !validate(contactForm, rules)) {
      alert('Please correct the highlighted fields.');
      return;
    }
    alert('Contact form submitted!');
    contactForm.reset();
  });
});
