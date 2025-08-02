/* global DOMPurify */
(function(global){
  function sanitizeForm(form) {
    const fields = form.querySelectorAll('input, textarea');
    for (const field of fields) {
      const original = field.value;
      const clean = DOMPurify.sanitize(original, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] }).trim();
      if (clean !== original.trim()) {
        return false;
      }
      field.value = clean;
    }
    return true;
  }

  function validateFields(form, rules) {
    for (const [id, rule] of Object.entries(rules)) {
      const field = form.querySelector(`#${id}`);
      if (!field) continue;
      const val = field.value.trim();
      if (rule.required && !val) return false;
      if (rule.maxLength && val.length > rule.maxLength) return false;
      if (rule.pattern && !rule.pattern.test(val)) return false;
    }
    field.value = val;
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { sanitizeForm, validateFields };
  } else {
    global.sanitizeForm = sanitizeForm;
    global.validateFields = validateFields;
  }
})(typeof window !== 'undefined' ? window : this);
