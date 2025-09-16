// ===== Lightbox + Zoom for Shop & Products =====
(() => {
  const lightbox = document.createElement('div');
  lightbox.id = 'custom-lightbox';
  lightbox.style.cssText = `
    display:none; position:fixed; inset:0; background:rgba(0,0,0,0.9); 
    justify-content:center; align-items:center; z-index:9999; overflow:auto;
  `;
  lightbox.innerHTML = `
    <img id="lb-img" style="max-width:90%; max-height:90%; cursor:zoom-in; border-radius:8px; transition:transform 0.3s;">
    <button id="lb-close" style="position:fixed;top:20px;right:20px;font-size:24px;color:#fff;background:transparent;border:none;cursor:pointer;">✕</button>
    <button id="lb-prev" style="position:fixed;left:20px;top:50%;transform:translateY(-50%);font-size:32px;color:#fff;background:transparent;border:none;cursor:pointer;">◀</button>
    <button id="lb-next" style="position:fixed;right:20px;top:50%;transform:translateY(-50%);font-size:32px;color:#fff;background:transparent;border:none;cursor:pointer;">▶</button>
  `;
  document.body.appendChild(lightbox);

  let images = [];
  let currentIndex = 0;
  let zoomed = false;

  const lbImg = document.getElementById('lb-img');
  const lbClose = document.getElementById('lb-close');
  const lbPrev = document.getElementById('lb-prev');
  const lbNext = document.getElementById('lb-next');

  const openLightbox = (index) => {
    images = Array.from(document.querySelectorAll('.gallery-item, .thumb'));
    currentIndex = index;
    lbImg.src = images[currentIndex].src;
    lbImg.style.transform = 'scale(1)';
    zoomed = false;
    lightbox.style.display = 'flex';
  };

  const closeLightbox = () => { lightbox.style.display = 'none'; zoomed=false; lbImg.style.transform='scale(1)'; };

  const showPrev = () => { currentIndex = (currentIndex-1+images.length)%images.length; lbImg.src = images[currentIndex].src; lbImg.style.transform='scale(1)'; zoomed=false; };
  const showNext = () => { currentIndex = (currentIndex+1)%images.length; lbImg.src = images[currentIndex].src; lbImg.style.transform='scale(1)'; zoomed=false; };

  lbClose.addEventListener('click', closeLightbox);
  lbPrev.addEventListener('click', showPrev);
  lbNext.addEventListener('click', showNext);

  lbImg.addEventListener('click', () => {
    zoomed = !zoomed;
    lbImg.style.transform = zoomed ? 'scale(2)' : 'scale(1)';
    lbImg.style.cursor = zoomed ? 'zoom-out' : 'zoom-in';
  });

  document.addEventListener('keydown', (e) => {
    if(lightbox.style.display==='flex'){
      if(e.key==='ArrowLeft') showPrev();
      if(e.key==='ArrowRight') showNext();
      if(e.key==='Escape') closeLightbox();
    }
  });

  lightbox.addEventListener('click', (e) => { if(e.target===lightbox) closeLightbox(); });

  // Attach click event to all gallery items
  const attachGallery = () => {
    const allImages = document.querySelectorAll('.gallery-item, .thumb');
    allImages.forEach((img, i) => {
      if(!img.dataset.lb){ // attach only once
        img.dataset.lb = 'true';
        img.addEventListener('click', () => openLightbox(i));
      }
    });
  };

  attachGallery();
  // Observe DOM changes (optional)
  new MutationObserver(attachGallery).observe(document.body, {childList:true, subtree:true});
})();