// ============================================================
// Namani Travels — passport intro overlay + inline passport reveal.
// ============================================================

function initPassportIntro() {
  const scene = document.getElementById('passport-intro');
  if (!scene) return;

  const seen = sessionStorage.getItem('namani-passport-seen');
  if (seen) { scene.remove(); return; }

  document.body.style.overflow = 'hidden';

  function dismiss() {
    scene.classList.add('is-hidden');
    document.body.style.overflow = '';
    sessionStorage.setItem('namani-passport-seen', '1');
    setTimeout(() => scene.remove(), 700);
  }

  requestAnimationFrame(() => {
    setTimeout(() => scene.classList.add('is-open'), 400);
  });

  scene.querySelector('#passport-skip')?.addEventListener('click', dismiss);
  setTimeout(dismiss, 3400);
}

function initInlinePassport() {
  const els = document.querySelectorAll('.passport-inline');
  if (!els.length) return;
  if (!('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('is-open'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-open');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );
  els.forEach((el) => io.observe(el));
}

document.addEventListener('DOMContentLoaded', () => {
  initPassportIntro();
  initInlinePassport();
});
