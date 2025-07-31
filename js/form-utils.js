(function(global){
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
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { sanitizeForm };
  } else {
    global.sanitizeForm = sanitizeForm;
  }
})(typeof window !== 'undefined' ? window : this);
