function initJoinForm(root) {
  root = root || document;
  const joinForm = root.querySelector('#joinForm');
  if (!joinForm) return;

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
          if (!input.value.trim()) {
            alert('Please fill out all fields before accepting.');
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

  const sanitize = window.sanitizeForm || function(form) {
    const fields = form.querySelectorAll('input, textarea');
    for (const field of fields) {
      const val = field.value.trim();
      if (/[<>]/.test(val) || /script/i.test(val)) {
        return false;
      }
      field.value = val;
    }
    return true;
  };

  joinForm.addEventListener('submit', e => {
    e.preventDefault();
    if (!sanitize(joinForm)) {
      alert('Suspicious content detected. Submission rejected.');
      return;
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
  });
}

window.initJoinForm = initJoinForm;
