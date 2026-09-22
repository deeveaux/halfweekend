const header = document.getElementById('site-header');
const gallery = document.getElementById('gallery-grid');
const galleryToggle = document.getElementById('gallery-toggle');
const lightbox = document.getElementById('lightbox');
const lightboxImage = lightbox.querySelector('.lightbox-image');
const lightboxClose = lightbox.querySelector('.lightbox-close');
let lastGalleryTrigger = null;

function syncHeader() {
  header.classList.toggle('scrolled', window.scrollY > 24);
}
syncHeader();
window.addEventListener('scroll', syncHeader, { passive: true });

// Keep the full set reachable even when JavaScript is unavailable.
gallery.classList.add('is-collapsed');
galleryToggle.hidden = false;
galleryToggle.addEventListener('click', () => {
  const expanded = gallery.classList.toggle('is-collapsed') === false;
  galleryToggle.setAttribute('aria-expanded', String(expanded));
  galleryToggle.innerHTML = expanded
    ? 'Show fewer moments <span aria-hidden="true">↑</span>'
    : 'View all moments <span aria-hidden="true">↗</span>';
  if (!expanded) document.getElementById('gallery').scrollIntoView();
});

function openLightbox(trigger) {
  const photo = trigger.querySelector('img');
  lastGalleryTrigger = trigger;
  lightboxImage.src = photo.currentSrc || photo.src;
  lightboxImage.alt = photo.alt;
  lightbox.hidden = false;
  document.body.classList.add('lightbox-open');
  lightboxClose.focus();
}

function closeLightbox() {
  if (lightbox.hidden) return;
  lightbox.hidden = true;
  document.body.classList.remove('lightbox-open');
  lightboxImage.removeAttribute('src');
  if (lastGalleryTrigger) lastGalleryTrigger.focus();
}

gallery.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => openLightbox(item));
});
lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', event => {
  if (event.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', event => {
  if (lightbox.hidden) return;
  if (event.key === 'Escape') closeLightbox();
  if (event.key === 'Tab') {
    event.preventDefault();
    lightboxClose.focus();
  }
});

if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('[data-reveal]').forEach(element => {
    element.classList.add('will-reveal');
    revealObserver.observe(element);
  });
}
