  document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      if (!window.sanitizeForm(contactForm)) {
        alert('Suspicious content detected. Submission rejected.');
        return;
      }
      alert('Contact form submitted!');
      contactForm.reset();
    });
  });
