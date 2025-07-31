  document.addEventListener('DOMContentLoaded', () => {
    // Helper: Toggle accept/edit states on dynamic sections
    function toggleSectionState(section, accepted) {
      const inputs = section.querySelectorAll('input[type=text]');
      const acceptBtn = section.querySelector('.accept-btn');
      const editBtn = section.querySelector('.edit-btn');
      const addBtn = section.querySelector('.circle-btn.add');
      const removeBtn = section.querySelector('.circle-btn.remove');

      if (accepted) {
        // Lock inputs
        inputs.forEach(input => input.disabled = true);
        // Show edit, hide accept
        if (acceptBtn) acceptBtn.style.display = 'none';
        if (editBtn) editBtn.style.display = 'inline-block';
        // Disable add/remove while accepted
        if (addBtn) addBtn.disabled = true;
        if (removeBtn) removeBtn.disabled = true;
        section.classList.add('completed');
      } else {
        // Unlock inputs
        inputs.forEach(input => input.disabled = false);
        // Show accept, hide edit
        if (acceptBtn) acceptBtn.style.display = 'inline-block';
        if (editBtn) editBtn.style.display = 'none';
        // Enable add/remove
        if (addBtn) addBtn.disabled = false;
        if (removeBtn) removeBtn.disabled = false;
        section.classList.remove('completed');
      }
    }

    const formSections = document.querySelectorAll('.form-section');

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
          // Only remove if not accepted (inputs enabled)
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
          // Validate no empty inputs
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

    // Submit handler (demo)
    const joinForm = document.getElementById('joinForm');
    joinForm.addEventListener('submit', e => {
      e.preventDefault();

      if (!sanitizeForm(joinForm)) {
        alert('Suspicious content detected. Submission rejected.');
        return;
      }

      // Optional: validate dynamic sections are accepted or empty
      for (const section of formSections) {
        const inputs = section.querySelectorAll('input[type=text]');
        if (inputs.length > 0 && !section.classList.contains('completed')) {
          alert(`Please accept your entries in "${section.querySelector('h2').textContent}" or remove them.`);
          return;
        }
      }

      alert('Join form submitted successfully!');
      joinForm.reset();

      // Reset all sections to initial state
      formSections.forEach(section => {
        toggleSectionState(section, false);
        const inputsContainer = section.querySelector('.inputs');
        inputsContainer.innerHTML = '';
      });
    });
  });
