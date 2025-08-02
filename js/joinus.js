function initJoinForm(root) {
  root = root || document;
  const joinForm = root.querySelector('#joinForm');
  if (!joinForm) return;

  const rules = {
    name: { maxLength: 50, pattern: /^[a-zA-Z\s'-]+$/ },
    email: { maxLength: 100, pattern: /^[^@\s]+@[^@\s]+\.[^@\s]+$/ },
    phone: { maxLength: 20, pattern: /^[0-9+\-\s()]+$/ },
    about: { maxLength: 500 }
  };

  function toggleSectionState(section, accepted) {
    const inputs = section.querySelectorAll('input[type=text]');
    const acceptBtn = section.querySelector('.accept-btn');
    const editBtn = section.querySelector('.edit-btn');
    const addBtn = section.querySelector('.circle-btn.add');
    const removeBtn = section.querySelector('.circle-btn.remove');

    if (accepted) {
      inputs.forEach(input => input.disabled = true);
      if (acceptBtn) acceptBtn.style.display = 'none';
      if (editBtn) editBtn.style.display = 'inline-block';
      if (addBtn) addBtn.disabled = true;
      if (removeBtn) removeBtn.disabled = true;
      section.classList.add('completed');
    } else {
      inputs.forEach(input => input.disabled = false);
      if (acceptBtn) acceptBtn.style.display = 'inline-block';
      if (editBtn) editBtn.style.display = 'none';
      if (addBtn) addBtn.disabled = false;
      if (removeBtn) removeBtn.disabled = false;
      section.classList.remove('completed');
    }
  }

  const formSections = joinForm.querySelectorAll('.form-section');

  formSections.forEach(section => {
    const addBtn = section.querySelector('.circle-btn.add');
    const removeBtn = section.querySelector('.circle-btn.remove');
    const acceptBtn = section.querySelector('.accept-btn');
    const editBtn = section.querySelector('.edit-btn');
    const inputsContainer = section.querySelector('.inputs');

    if (addBtn) {
      addBtn.addEventListener('click', () => {
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = `Enter ${section.querySelector('h2').textContent}`;
        input.maxLength = 100;
        inputsContainer.appendChild(input);
        input.focus();
      });
    }

    if (removeBtn) {
      removeBtn.addEventListener('click', () => {
        if (!inputsContainer.querySelector('input[disabled]')) {
          if (inputsContainer.lastElementChild) {
            inputsContainer.removeChild(inputsContainer.lastElementChild);
          }
        }
      });
    }

    if (acceptBtn) {
      acceptBtn.addEventListener('click', () => {
        const inputs = inputsContainer.querySelectorAll('input[type=text]');
        if (inputs.length === 0) {
          alert('Add at least one entry.');
          return;
        }
        for (const input of inputs) {
          const val = input.value.trim();
          if (!val) {
            alert('Please fill out all fields before accepting.');
            return;
          }
          if (val.length > 100 || !/^[\w\s.,-]+$/.test(val)) {
            alert('Entries must be under 100 characters and use only letters, numbers, spaces, commas, periods, or hyphens.');
            return;
          }
        }
        toggleSectionState(section, true);
      });
    }

    if (editBtn) {
      editBtn.addEventListener('click', () => {
        toggleSectionState(section, false);
      });
    }
  });

  joinForm.addEventListener('submit', e => {
    e.preventDefault();
    if (typeof window.sanitizeForm === 'function' && !window.sanitizeForm(joinForm)) {
      alert('Suspicious content detected. Submission rejected.');
      return;
    }
    if (typeof window.validateFields === 'function' && !window.validateFields(joinForm, rules)) {
      alert('Please correct the highlighted fields.');
      return;
    }
    for (const input of joinForm.querySelectorAll('.form-section input[type=text]')) {
      const val = input.value.trim();
      if (val && (val.length > 100 || !/^[\w\s.,-]+$/.test(val))) {
        alert('Entries must be under 100 characters and use only letters, numbers, spaces, commas, periods, or hyphens.');
        return;
      }
    }

    for (const section of formSections) {
      const inputs = section.querySelectorAll('input[type=text]');
      if (inputs.length > 0 && !section.classList.contains('completed')) {
        alert(`Please accept your entries in "${section.querySelector('h2').textContent}" or remove them.`);
        return;
      }
    }

    alert('Join form submitted successfully!');
    joinForm.reset();

    formSections.forEach(section => {
      toggleSectionState(section, false);
      const inputsContainer = section.querySelector('.inputs');
      inputsContainer.innerHTML = '';
    });
    window.dispatchEvent(new Event('modal-close'));
  });
}

window.initJoinForm = initJoinForm;