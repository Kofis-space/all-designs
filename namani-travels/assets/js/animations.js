// ============================================================
// Namani Travels — passport intro overlay + inline passport reveal.
// ============================================================

function initPassportIntro() {
  const scene = document.getElementById('passport-intro');
  if (!scene) { if (typeof initPersonaGate === 'function') initPersonaGate(); return; }

  const seen = sessionStorage.getItem('namani-passport-seen');
  if (seen) {
    scene.remove();
    if (typeof initPersonaGate === 'function') initPersonaGate();
    return;
  }

  document.body.style.overflow = 'hidden';

  function dismiss() {
    scene.classList.add('is-hidden');
    document.body.style.overflow = '';
    sessionStorage.setItem('namani-passport-seen', '1');
    setTimeout(() => {
      scene.remove();
      if (typeof initPersonaGate === 'function') initPersonaGate();
    }, 700);
  }

  requestAnimationFrame(() => {
    setTimeout(() => scene.classList.add('is-open'), 400);
  });

  scene.querySelector('#passport-skip')?.addEventListener('click', dismiss);
  setTimeout(dismiss, 3400);
}

function checkRetakeQuizHash() {
  if (location.hash === '#retake-quiz' && typeof reopenPersonaGate === 'function') {
    reopenPersonaGate();
  }
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
  checkRetakeQuizHash();
  if (typeof applyPersonaPersonalization === 'function') applyPersonaPersonalization();
});

// A same-page click on the footer's "Retake Traveler Quiz" link (already on
// Home) only changes the hash — it doesn't reload the document, so
// DOMContentLoaded never fires again. Listen for the hash change directly too.
window.addEventListener('hashchange', checkRetakeQuizHash);
