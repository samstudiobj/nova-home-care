// Lightbox for the gallery grid. Progressive enhancement: without this file,
// gallery items are plain figures with captions — fully readable, just not
// enlargeable. All the real image/caption content lives in the HTML.

(function () {
  const grid = document.querySelector('.gallery-grid');
  const lightbox = document.getElementById('lightbox');
  if (!grid || !lightbox) return;

  const lightboxImage = lightbox.querySelector('.lightbox__image');
  const lightboxCaption = lightbox.querySelector('.lightbox__caption');
  const closeBtn = lightbox.querySelector('.lightbox__close');
  const items = Array.from(grid.querySelectorAll('.gallery-item'));
  let lastFocused = null;
  let currentIndex = 0;

  function openLightbox(index) {
    currentIndex = index;
    lastFocused = document.activeElement;
    const item = items[index];
    const caption = item.querySelector('.gallery-item__caption')?.textContent || '';
    const sourceImg = item.querySelector('.gallery-item__media');
    if (lightboxImage && sourceImg) {
      lightboxImage.src = sourceImg.src;
      lightboxImage.alt = sourceImg.alt;
    }
    if (lightboxCaption) lightboxCaption.textContent = caption;
    lightbox.classList.add('is-open');
    document.body.classList.add('nav-open');
    closeBtn?.focus();
    document.addEventListener('keydown', onKeydown);
  }

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    document.body.classList.remove('nav-open');
    document.removeEventListener('keydown', onKeydown);
    if (lastFocused) lastFocused.focus();
  }

  function onKeydown(e) {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') openLightbox((currentIndex + 1) % items.length);
    if (e.key === 'ArrowLeft') openLightbox((currentIndex - 1 + items.length) % items.length);
  }

  items.forEach((item, index) => {
    item.addEventListener('click', () => openLightbox(index));
  });

  closeBtn?.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
})();
