// Update these values when the salon changes booking or analytics settings.
// Replace the SVG files in assets/img/ with real salon, service, and team photography.
const BOOKING_URL = 'https://smoaksalon.glossgenius.com/';
const GA4_ID = 'G-XXXXXXXXXX';
const CONSENT_KEY = 'smoakCookieConsent';

const navItems = [
  ['Home', 'index.html'],
  ['About', 'about.html'],
  ['Services', 'services.html'],
  ['The Team', 'team.html'],
  ['Testimonials', 'testimonials.html'],
  ['Careers', 'careers.html'],
  ['Special Offers', 'special-offers.html'],
  ['Policies', 'policies.html'],
  ['FAQ', 'faq.html'],
  ['Employees', 'employees.html']
];

function currentPage() {
  const page = window.location.pathname.split('/').pop();
  return page || 'index.html';
}

function buildHeader() {
  const header = document.querySelector('[data-header]');
  if (!header) return;

  const page = currentPage();
  const links = navItems.map(([label, href]) => {
    const current = page === href || (page === '' && href === 'index.html') ? ' aria-current="page"' : '';
    return `<a href="${href}"${current}>${label}</a>`;
  }).join('');

  header.innerHTML = `
    <nav class="nav" aria-label="Main navigation">
      <a class="brand" href="index.html" aria-label="Smoak Salon home">
        <strong>Smoak Salon</strong>
        <span>Jackson, MS</span>
      </a>
      <button class="nav-toggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="nav-menu">
        <span></span><span></span>
      </button>
      <div class="nav-menu" id="nav-menu">${links}</div>
      <a class="btn btn-primary nav-cta" href="${BOOKING_URL}">Book Now</a>
    </nav>
  `;

  const toggle = header.querySelector('.nav-toggle');
  const menu = header.querySelector('.nav-menu');
  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  });
}

function buildFooter() {
  const footer = document.querySelector('[data-footer]');
  if (!footer) return;

  footer.innerHTML = `
    <div class="footer-inner">
      <div>
        <div class="footer-brand">Smoak Salon</div>
        <p>The experience you deserve without the pretentiousness.</p>
      </div>
      <div class="footer-grid">
        <section>
          <h2>Visit</h2>
          <p>622 Duling Ave<br>Jackson, MS 39216</p>
          <a href="tel:+16019825313">601-982-5313</a>
          <a href="mailto:smoaksalon@gmail.com">smoaksalon@gmail.com</a>
        </section>
        <section>
          <h2>Hours</h2>
          <p>Tuesday-Friday<br>10am-7pm</p>
          <p>Saturday<br>10am-4pm</p>
        </section>
        <section>
          <h2>Quick Links</h2>
          <a href="services.html">Services</a>
          <a href="team.html">The Team</a>
          <a href="testimonials.html">Testimonials</a>
          <a href="${BOOKING_URL}">Book Now</a>
        </section>
        <section>
          <h2>Social</h2>
          <a href="https://www.instagram.com/smoaksalon/">Instagram</a>
          <a href="https://www.facebook.com/SMoakSalon/">Facebook</a>
          <a href="https://www.tiktok.com/@smoaksalon622">TikTok</a>
        </section>
        <section>
          <h2>Legal</h2>
          <a href="privacy.html">Privacy</a>
          <a href="terms.html">Terms</a>
          <button type="button" data-open-cookie-settings>Cookie Settings</button>
        </section>
      </div>
      <div class="footer-bottom">
        <span>Copyright ${new Date().getFullYear()} Smoak Salon.</span>
        <span>Hair salon Jackson MS / Fondren hair salon / Duling Ave salon.</span>
      </div>
    </div>
  `;
}

function loadGA4() {
  if (!GA4_ID || GA4_ID === 'G-XXXXXXXXXX' || window.__smoakGaLoaded) return;
  window.__smoakGaLoaded = true;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag(){ window.dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', GA4_ID, { anonymize_ip: true });
}

function getConsent() {
  try {
    return JSON.parse(localStorage.getItem(CONSENT_KEY));
  } catch {
    return null;
  }
}

function saveConsent(analytics) {
  localStorage.setItem(CONSENT_KEY, JSON.stringify({
    essential: true,
    analytics,
    savedAt: new Date().toISOString()
  }));
  if (analytics) loadGA4();
}

function renderCookieBanner(forceOpen = false) {
  const mount = document.querySelector('[data-cookie-banner]');
  if (!mount) return;
  const consent = getConsent();
  const shouldShow = forceOpen || !consent;

  mount.innerHTML = `
    <section class="cookie-panel" aria-label="Cookie preferences" ${shouldShow ? '' : 'hidden'}>
      <h2>Cookie preferences</h2>
      <p>We use essential storage to remember this choice. Analytics only loads if you accept it.</p>
      <div class="cookie-actions">
        <button class="accept" type="button" data-cookie-accept>Accept</button>
        <button type="button" data-cookie-decline>Decline</button>
        <button type="button" data-cookie-manage>Manage Preferences</button>
      </div>
    </section>
  `;

  const panel = mount.querySelector('.cookie-panel');
  mount.querySelector('[data-cookie-accept]').addEventListener('click', () => {
    saveConsent(true);
    panel.hidden = true;
  });
  mount.querySelector('[data-cookie-decline]').addEventListener('click', () => {
    saveConsent(false);
    panel.hidden = true;
  });
  mount.querySelector('[data-cookie-manage]').addEventListener('click', () => {
    const wantsAnalytics = window.confirm('Allow analytics cookies for Smoak Salon?');
    saveConsent(wantsAnalytics);
    panel.hidden = true;
  });
}

function bindCookieSettings() {
  document.addEventListener('click', (event) => {
    if (event.target.matches('[data-open-cookie-settings]')) {
      renderCookieBanner(true);
    }
  });

  const consent = getConsent();
  if (consent && consent.analytics) loadGA4();
}

function initTestimonialFilters() {
  const grid = document.querySelector('[data-filter-grid]');
  if (!grid) return;
  document.querySelectorAll('[data-filter]').forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      document.querySelectorAll('[data-filter]').forEach((item) => item.classList.remove('active'));
      button.classList.add('active');
      grid.querySelectorAll('article').forEach((card) => {
        const categories = card.dataset.category || '';
        card.hidden = filter !== 'all' && !categories.includes(filter) && !categories.includes('all');
      });
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  buildHeader();
  buildFooter();
  renderCookieBanner();
  bindCookieSettings();
  initTestimonialFilters();
});
