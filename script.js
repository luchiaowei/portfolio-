// ...existing code...

// 平滑錨點（若尚未）
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{ e.preventDefault(); const t=document.querySelector(a.getAttribute('href')); if(t) t.scrollIntoView({behavior:'smooth'}); });
});

// Project modal
// modal logic: 放在 script.js（確保此檔在 index.html 底部被引入）
const modal = document.getElementById('projectModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalRole = document.getElementById('modalRole');
const modalDesc = document.getElementById('modalDesc');
const modalLink = document.getElementById('modalLink');
const modalClose = document.querySelector('.modal-close');

function openModal(card){
  modalImage.src = card.querySelector('.project-thumb').src;
  modalTitle.textContent = card.dataset.title || '';
  modalRole.textContent = card.dataset.role || '';
  modalDesc.textContent = card.dataset.desc || '';
  modalLink.href = card.dataset.link || '#';
  modal.setAttribute('aria-hidden','false');
  document.body.style.overflow = 'hidden';
}
function closeModal(){
  modal.setAttribute('aria-hidden','true');
  document.body.style.overflow = '';
}

// card click: 若點到 <a> 則放行（開新分頁），否則開 modal
document.querySelectorAll('.project-card').forEach(card=>{
  card.addEventListener('click', e=>{
    if (e.target.closest('a')) return; // 讓連結正常開啟
    openModal(card);
  });
});

// 確保連結點擊前關閉 modal（回來後不會鎖定捲動）
document.querySelectorAll('.project-thumb-link').forEach(a=>{
  a.addEventListener('click', ()=> closeModal());
});
modalClose.addEventListener('click', closeModal);
modal.querySelector('.modal-overlay').addEventListener('click', closeModal);
document.addEventListener('keydown', e=>{ if(e.key==='Escape') closeModal(); });
document.addEventListener('visibilitychange', ()=>{ if(document.visibilityState==='visible' && modal.getAttribute('aria-hidden')==='false') closeModal(); });