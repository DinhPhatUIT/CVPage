
document.addEventListener('DOMContentLoaded', () => {
  // NAV highlight
  const file = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  document.querySelectorAll('.nav a').forEach(a => {
    const href = a.getAttribute('href');
    if ((file === '' && href.endsWith('index.html')) || href.toLowerCase().endsWith(file)) {
      a.classList.add('current');
      a.setAttribute('aria-current', 'page');
    }
  });

  // Lightbox logic (only on gallery page)
  const lb = document.getElementById('lightbox');
  if (lb) {
    let index = 0;
    const items = Array.from(document.querySelectorAll('[data-gallery-item]'));
    const img = document.getElementById('lb-img');
    const caption = document.getElementById('lb-caption');
    const credits = JSON.parse(document.getElementById('lb-credits').textContent);

    function openAt(i){
      index = (i + items.length) % items.length;
      const el = items[index];
      img.src = el.dataset.src;
      img.alt = el.dataset.alt;
      caption.innerHTML = `<strong>${el.dataset.alt}</strong> — ${credits[index] || ''}`;
      lb.setAttribute('aria-hidden','false');
    }
    function close(){
      lb.setAttribute('aria-hidden','true');
    }
    function prev(){ openAt(index - 1); }
    function next(){ openAt(index + 1); }

    items.forEach((el, i) => {
      el.addEventListener('click', (e) => { e.preventDefault(); openAt(i); });
    });
    document.getElementById('lb-close')?.addEventListener('click', close);
    document.getElementById('lb-prev')?.addEventListener('click', (e)=>{e.stopPropagation(); prev();});
    document.getElementById('lb-next')?.addEventListener('click', (e)=>{e.stopPropagation(); next();});
    lb.addEventListener('click', (e)=>{ if(e.target === lb) close(); });

    window.addEventListener('keydown', (e) => {
      if (lb.getAttribute('aria-hidden') === 'true') return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    });
  }
});
