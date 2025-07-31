document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#form form');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    if (typeof sanitizeForm === 'function' && !sanitizeForm(form)) {
      alert('Suspicious content detected. Submission rejected.');
      return;
    }
    alert('Contact form submitted!');
    form.reset();
  });
});
