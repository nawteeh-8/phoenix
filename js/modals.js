import chatbot from './chatbot.js';

function openModalFromTemplate(templateId) {
  const template = document.getElementById(templateId);
  if (!template) {
    console.error(`Modal template with ID ${templateId} not found.`);
    return;
  }

  const modalContent = template.content.cloneNode(true);
  const modalRoot = document.getElementById('modal-root');
  modalRoot.innerHTML = '';
  modalRoot.appendChild(modalContent);

  const backdrop = modalRoot.querySelector('.modal-backdrop');
  const closeButton = modalRoot.querySelector('.modal-x');

  function close() {
    modalRoot.innerHTML = '';
  }

  if (backdrop) {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        close();
      }
    });
  }

  if (closeButton) {
    closeButton.addEventListener('click', close);
  }

  document.addEventListener('keydown', function esc(e) {
    if (e.key === 'Escape') {
      close();
      document.removeEventListener('keydown', esc);
    }
  }, { once: true });
}

window.openContactModal = function() {
  openModalFromTemplate('contact-modal-template');
};

window.openJoinModal = function() {
  openModalFromTemplate('join-modal-template');
};

window.openChatbotModal = function() {
  if (document.getElementById('chatbot-container')) {
    return; // Already open
  }
  const template = document.getElementById('chatbot-template');
  if (!template) {
    console.error('Chatbot template not found.');
    return;
  }
  const chatbotNode = template.content.cloneNode(true);
  document.body.appendChild(chatbotNode);

  const chatbotContainer = document.getElementById('chatbot-container');
  chatbot.init(chatbotContainer);
};
