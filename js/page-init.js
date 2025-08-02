document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#form form');
  if (!form) return;
  const rules = {
    name: { maxLength: 50, pattern: /^[a-zA-Z\s'-]+$/ },
    email: { maxLength: 100, pattern: /^[^@\s]+@[^@\s]+\.[^@\s]+$/ },
    contactNumber: { maxLength: 20, pattern: /^[0-9+\-\s()]+$/ }
  };
  form.addEventListener('submit', e => {
    e.preventDefault();
    if (typeof sanitizeForm === 'function' && !sanitizeForm(form)) {
      alert('Suspicious content detected. Submission rejected.');
      return;
    }
    if (typeof validateFields === 'function' && !validateFields(form, rules)) {
      alert('Please correct the highlighted fields.');
      return;
    }
    alert('Contact form submitted!');
    form.reset();
  });
});

