document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contactForm');
  const sanitize = window.sanitizeForm;

  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    if (typeof sanitize === 'function' && !sanitize(contactForm)) {
      alert('Suspicious content detected. Submission rejected.');
      return;
    }
    alert('Contact form submitted!');
    contactForm.reset();
  });
});
