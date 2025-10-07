document.getElementById('year').textContent = new Date().getFullYear();

async function notifyServer(payload){
  try{
    const res = await fetch('/api/notify', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(payload)
    });
    return res.json();
  }catch(e){
    return { ok:false, error: e.message };
  }
}

window.addEventListener('load', ()=>{
  notifyServer({type: 'page_open', path: location.pathname, ua: navigator.userAgent});
});

const form = document.getElementById('contactForm');
const statusP = document.getElementById('status');
form.addEventListener('submit', async (e)=>{
  e.preventDefault();
  const fd = new FormData(form);
  if(fd.get('hp_field')){
    statusP.textContent = 'Deteksi bot. Dibatalkan.';
    return;
  }
  const payload = { type:'contact', name: fd.get('name'), message: fd.get('message') };
  statusP.textContent = 'Mengirim...';
  const r = await notifyServer(payload);
  if(r && r.ok){
    statusP.textContent = 'Pesan terkirim — terima kasih!';
    form.reset();
  }else{
    statusP.textContent = 'Gagal mengirim: ' + (r && r.error ? r.error : 'server error');
  }
});

document.getElementById('sendTest').addEventListener('click', async ()=>{
  const r = await notifyServer({type:'test', note:'manual test from page'});
  alert(r && r.ok ? 'Notifikasi terkirim' : 'Gagal: '+(r && r.error));
});