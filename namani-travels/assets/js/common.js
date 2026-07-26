// ============================================================
// Namani Travels — shared header/footer, theme, nav, and reveal logic.
// Included on every page via <script src="assets/js/common.js">.
// ============================================================

const NAV_LINKS = [
  { href: 'index.html', label: 'Home', page: 'home' },
  { href: 'services.html', label: 'Services', page: 'services' },
  { href: 'destinations.html', label: 'Explore', page: 'destinations' },
  { href: 'about.html', label: 'About', page: 'about' },
];

function renderHeader() {
  const mount = document.getElementById('site-header');
  if (!mount) return;
  const current = document.body.dataset.page;

  const navItems = NAV_LINKS.map(
    (l) => `<li><a href="${l.href}" class="${l.page === current ? 'is-active' : ''}">${l.label}</a></li>`
  ).join('');

  mount.innerHTML = `
    <header class="nav" id="site-nav">
      <div class="container nav__inner">
        <a href="index.html" class="nav__logo">
          ${iconSpan('namaniMark', 'nav__logo-mark')} Namani
        </a>
        <ul class="nav__links">${navItems}</ul>
        <div class="nav__actions">
          <button class="theme-toggle" id="theme-toggle" aria-label="Toggle dark mode"></button>
          <a href="index.html#plan-trip" class="btn btn-primary btn-sm nav__cta">Plan My Trip</a>
          <button class="nav__burger" id="nav-burger" aria-label="Open menu">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </header>
    <div class="mobile-drawer" id="mobile-drawer">
      <div class="mobile-drawer__top">
        <a href="index.html" class="nav__logo">${iconSpan('namaniMark', 'nav__logo-mark')} Namani</a>
        <button class="mobile-drawer__close" id="drawer-close" aria-label="Close menu">&times;</button>
      </div>
      <nav>${NAV_LINKS.map((l) => `<a href="${l.href}" class="${l.page === current ? 'is-active' : ''}">${l.label}</a>`).join('')}</nav>
      <div class="mobile-drawer__footer">
        <a href="index.html#plan-trip" class="btn btn-primary btn-block">Plan My Trip</a>
        <button class="theme-toggle" id="theme-toggle-mobile" aria-label="Toggle dark mode" style="align-self:center;"></button>
      </div>
    </div>
  `;
}

function renderFooter() {
  const mount = document.getElementById('site-footer');
  if (!mount) return;
  const year = new Date().getFullYear();
  mount.innerHTML = `
    <footer class="footer">
      <div class="container">
        <div class="footer__grid">
          <div>
            <div class="footer__brand">${iconSpan('namaniMark', 'footer__brand-mark')}${SITE_CONFIG.brandName}</div>
            <p style="max-width:280px;">We plan trips that feel like exhaling — unhurried, entirely yours.</p>
            <div class="social-row">
              <a href="${SITE_CONFIG.instagramUrl}" target="_blank" rel="noopener" aria-label="Instagram">${iconSpan('instagram')}</a>
              <a href="${buildWhatsAppLink()}" target="_blank" rel="noopener" aria-label="WhatsApp">${iconSpan('whatsapp')}</a>
              <a href="mailto:${SITE_CONFIG.email}" aria-label="Email">${iconSpan('mail')}</a>
            </div>
          </div>
          <div>
            <h4>Explore</h4>
            <ul>
              <li><a href="index.html#plan-trip">Plan a Trip</a></li>
              <li><a href="services.html">Services</a></li>
              <li><a href="destinations.html">Destinations</a></li>
              <li><a href="destinations.html#stories">Travel Stories</a></li>
              <li><a href="index.html#retake-quiz">Retake Traveler Quiz</a></li>
            </ul>
          </div>
          <div>
            <h4>Company</h4>
            <ul>
              <li><a href="about.html">About Us</a></li>
              <li><a href="about.html#contact">Contact</a></li>
              <li><a href="privacy.html">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <h4>Get in touch</h4>
            <ul>
              <li><a href="${buildWhatsAppLink()}" target="_blank" rel="noopener">WhatsApp Us</a></li>
              <li><a href="${SITE_CONFIG.instagramUrl}" target="_blank" rel="noopener">${SITE_CONFIG.instagramHandle}</a></li>
              <li><a href="mailto:${SITE_CONFIG.email}">${SITE_CONFIG.email}</a></li>
            </ul>
          </div>
        </div>
        <div class="footer__bottom">
          <span>&copy; ${year} ${SITE_CONFIG.brandName}. All rights reserved.</span>
          <span><a href="destinations.html#photo-credits">Photo credits</a> · Made for wanderers who like plans loosely held.</span>
        </div>
      </div>
    </footer>
  `;
}

function initTheme() {
  const saved = localStorage.getItem('namani-theme');
  if (saved) document.documentElement.setAttribute('data-theme', saved);

  const toggle = (btn) => {
    if (!btn) return;
    btn.addEventListener('click', () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark'
        || (!document.documentElement.hasAttribute('data-theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
      const next = isDark ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('namani-theme', next);
    });
  };
  toggle(document.getElementById('theme-toggle'));
  toggle(document.getElementById('theme-toggle-mobile'));
}

function initNavScroll() {
  const nav = document.getElementById('site-nav');
  if (!nav) return;
  const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

function initMobileDrawer() {
  const drawer = document.getElementById('mobile-drawer');
  const burger = document.getElementById('nav-burger');
  const close = document.getElementById('drawer-close');
  if (!drawer || !burger) return;
  const open = () => { drawer.classList.add('is-open'); document.body.style.overflow = 'hidden'; };
  const shut = () => { drawer.classList.remove('is-open'); document.body.style.overflow = ''; };
  burger.addEventListener('click', open);
  close?.addEventListener('click', shut);
  drawer.querySelectorAll('a').forEach((a) => a.addEventListener('click', shut));
}

function initReveal() {
  const targets = document.querySelectorAll('.reveal, .reveal-stagger');
  if (!('IntersectionObserver' in window) || targets.length === 0) {
    targets.forEach((t) => t.classList.add('is-visible'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
  );
  targets.forEach((t) => io.observe(t));
}

function renderWhatsAppFab() {
  const mount = document.getElementById('whatsapp-fab-slot');
  if (!mount) return;
  mount.innerHTML = `<a class="whatsapp-fab" href="${buildWhatsAppLink()}" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">${iconSpan('whatsapp')}</a>`;
}

document.addEventListener('DOMContentLoaded', () => {
  renderHeader();
  renderFooter();
  renderWhatsAppFab();
  initTheme();
  initNavScroll();
  initMobileDrawer();
  initReveal();
});
