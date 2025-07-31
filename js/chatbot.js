import state from './state.js';

let chatbotElement = null;
let isDragging = false;
let offsetX, offsetY;

function render() {
  if (!chatbotElement) return;
  // This function can be used to update the chatbot's UI based on state
  // For now, it does nothing, but it's here for future use.
}

function closeChatbot() {
  if (chatbotElement) {
    chatbotElement.remove();
    chatbotElement = null;
  }
}

function handleDrag(e) {
  if (!isDragging) return;
  e.preventDefault();
  const x = e.clientX || e.touches[0].clientX;
  const y = e.clientY || e.touches[0].clientY;
  chatbotElement.style.left = `${x - offsetX}px`;
  chatbotElement.style.top = `${y - offsetY}px`;
}

function stopDrag() {
  isDragging = false;
  document.removeEventListener('mousemove', handleDrag);
  document.removeEventListener('mouseup', stopDrag);
  document.removeEventListener('touchmove', handleDrag);
  document.removeEventListener('touchend', stopDrag);
}

function startDrag(e) {
  isDragging = true;
  const x = e.clientX || e.touches[0].clientX;
  const y = e.clientY || e.touches[0].clientY;
  offsetX = x - chatbotElement.offsetLeft;
  offsetY = y - chatbotElement.offsetTop;

  document.addEventListener('mousemove', handleDrag);
  document.addEventListener('mouseup', stopDrag);
  document.addEventListener('touchmove', handleDrag);
  document.addEventListener('touchend', stopDrag);
}


function init(element) {
  chatbotElement = element;
  const closeButton = chatbotElement.querySelector('#chatbot-x');
  const header = chatbotElement.querySelector('#chatbot-header');

  if (closeButton) {
    closeButton.addEventListener('click', closeChatbot);
  }

  if (header) {
    header.addEventListener('mousedown', startDrag);
    header.addEventListener('touchstart', startDrag);
  }

  // Add form submission logic, etc. here
  const form = chatbotElement.querySelector('#chatbot-input-row');
  form.onsubmit = (e) => {
    e.preventDefault();
    alert('Chatbot form submitted! (This is a placeholder)');
  };


  state.subscribe(render);
  render();
}

export default { init };
