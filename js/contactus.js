  function sanitizeForm(form) {
    const fields = form.querySelectorAll('input, textarea');
    for (const field of fields) {
      const val = field.value.trim();
      if (/[<>]/.test(val) || /script/i.test(val)) {
        return false;
      }
      field.value = val;
    }
    return true;
  }

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
