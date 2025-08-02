const { JSDOM } = require('jsdom');
const createDOMPurify = require('dompurify');
const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

function sanitize(value) {
  return DOMPurify.sanitize(value, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] }).trim();
}

function validateFields(data, rules) {
  for (const [key, rule] of Object.entries(rules)) {
    const val = sanitize(data[key] || '');
    if (rule.required && !val) return false;
    if (rule.maxLength && val.length > rule.maxLength) return false;
    if (rule.pattern && !rule.pattern.test(val)) return false;
    data[key] = val;
  }
  return true;
}

const contactRules = {
  name: { maxLength: 50, pattern: /^[a-zA-Z\s'-]+$/ },
  email: { maxLength: 100, pattern: /^[^@\s]+@[^@\s]+\.[^@\s]+$/ },
  contactNumber: { maxLength: 20, pattern: /^[0-9+\-\s()]+$/ },
  preferredDate: { required: true },
  preferredTime: { required: true },
  interest: { required: true },
  comments: { maxLength: 500 }
};

const joinRules = {
  name: { maxLength: 50, pattern: /^[a-zA-Z\s'-]+$/ },
  email: { maxLength: 100, pattern: /^[^@\s]+@[^@\s]+\.[^@\s]+$/ },
  phone: { maxLength: 20, pattern: /^[0-9+\-\s()]+$/ },
  about: { maxLength: 500 }
};

function validateContact(data) {
  return validateFields(data, contactRules);
}

function validateJoin(data) {
  if (!validateFields(data, joinRules)) return false;
  const arrayFields = ['skills', 'education', 'certification', 'hobbies', 'continuedEducation', 'experience'];
  for (const key of arrayFields) {
    if (Array.isArray(data[key])) {
      for (const item of data[key]) {
        const val = sanitize(item);
        if (val.length > 100 || !/^[\w\s.,-]+$/.test(val)) return false;
      }
    }
  }
  return true;
}

module.exports = { validateContact, validateJoin };

