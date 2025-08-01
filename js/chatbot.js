const qs=s=>document.querySelector(s);

/* === Language toggle === */
const langCtrl = qs('#langCtrl');
langCtrl.onclick = () => {
  const newLang = document.documentElement.lang === 'en' ? 'es' : 'en';
  switchLanguage(newLang);
  langCtrl.textContent = newLang === 'en' ? 'ES' : 'EN';
};

/* === Theme toggle === */
const themeCtrl = qs('#themeCtrl');
themeCtrl.onclick = () => {
  const dark = themeCtrl.textContent === 'Dark';
  document.body.classList.toggle('dark', dark);
  themeCtrl.textContent = dark ? 'Light' : 'Dark';
};

/* === Chatbot core === */
const log   = qs('#chat-log'),
      form  = qs('#chatbot-input-row'),
      input = qs('#chatbot-input'),
      send  = qs('#chatbot-send'),
      guard = qs('#human-check');

guard.onchange = () => send.disabled = !guard.checked;

function addMsg(txt,cls){
  const div = document.createElement('div');
  div.className = 'chat-msg '+cls;
  div.textContent = txt;
  log.appendChild(div);
  log.scrollTop = log.scrollHeight;
}

form.onsubmit = async e=>{
  e.preventDefault();
  if(!guard.checked) return;

  const msg = input.value.trim();
  if(!msg) return;
  addMsg(msg,'user');
  input.value=''; send.disabled=true;
  addMsg('…','bot');

  try{
    const r = await fetch('https://your-cloudflare-worker.example.com/chat',{
      method:'POST',headers:{'Content-Type':'application/json'},
      body:JSON.stringify({message:msg})
    });
    const d = await r.json();
    log.lastChild.textContent = d.reply || 'No reply.';
  }catch{
    log.lastChild.textContent = 'Error: Can’t reach AI.';
  }
  send.disabled=false;
};
