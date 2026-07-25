// ============================================================
// Namani Travels — Get Your Quote landing page logic.
// Reads search/quiz query params, renders a confirmation summary +
// matched vibe/destination, and dual-submits the lead form.
// ============================================================

function readParams() {
  const p = new URLSearchParams(window.location.search);
  return {
    trip: p.get('trip') || '',
    from: p.get('from') || '',
    to: p.get('to') || '',
    depart: p.get('depart') || '',
    ret: p.get('ret') || '',
    adults: p.get('adults') || '1',
    children: p.get('children') || '0',
    infants: p.get('infants') || '0',
    cabin: p.get('cabin') || 'Economy',
    flexible: p.get('flexible') === '1',
    nearby: p.get('nearby') === '1',
    vibe: p.get('vibe') || '',
    destination: p.get('destination') || '',
    fromQuiz: p.get('fromQuiz') === '1',
  };
}

function formatDate(iso) {
  if (!iso) return '';
  const d = new Date(iso + 'T00:00:00');
  if (isNaN(d)) return iso;
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

const TRIP_LABELS = { roundtrip: 'Round-trip', oneway: 'One-way', multicity: 'Multi-city' };

function travellerSummary(p) {
  const total = Number(p.adults) + Number(p.children) + Number(p.infants);
  const bits = [`${p.adults} Adult${p.adults == 1 ? '' : 's'}`];
  if (Number(p.children) > 0) bits.push(`${p.children} Child${p.children == 1 ? '' : 'ren'}`);
  if (Number(p.infants) > 0) bits.push(`${p.infants} Infant${p.infants == 1 ? '' : 's'}`);
  return `${bits.join(', ')} · ${p.cabin}`;
}

function tripSentence(p) {
  if (!p.from && !p.to) return "Tell us about the trip you're dreaming up.";
  let s = `You're looking to fly ${p.from || 'anywhere'} → ${p.to || 'anywhere'}`;
  if (p.depart) s += `, ${formatDate(p.depart)}`;
  if (p.trip === 'roundtrip' && p.ret) s += ` – ${formatDate(p.ret)}`;
  s += `, ${p.cabin} Class.`;
  return s;
}

function renderVibeCard(mount, p) {
  if (!p.vibe || !p.destination) return;
  const dest = getDestination(p.destination);
  const vibeInfo = VIBES[p.vibe];
  if (!dest || !vibeInfo) return;
  mount.innerHTML = `
    <div class="card reveal is-visible" style="margin-bottom:28px;">
      <div class="two-col" style="grid-template-columns: 140px 1fr; gap:20px; align-items:center; padding:16px;">
        <div class="card__media" style="aspect-ratio:1; border-radius:var(--radius-md);">
          <span class="badge ${vibeInfo.badge} card__badge" style="font-size:0.62rem;padding:4px 8px;">${iconSpan(p.vibe)}</span>
          <img src="${dest.img}" alt="${dest.name}" loading="lazy" />
        </div>
        <div>
          <div class="eyebrow" style="margin-bottom:6px;">Your travel vibe: ${vibeInfo.label}</div>
          <h3 style="margin-bottom:4px;">Matched destination: ${dest.name}</h3>
          <p style="margin:0;font-size:0.9rem;">${dest.blurb}</p>
        </div>
      </div>
    </div>
  `;
}

function renderSummary(mount, p) {
  const rows = [];
  rows.push(['Trip type', TRIP_LABELS[p.trip] || 'Round-trip']);
  rows.push(['From', p.from || '—']);
  rows.push(['To', p.to || '—']);
  if (p.depart) rows.push(['Depart', formatDate(p.depart)]);
  if (p.trip === 'roundtrip' && p.ret) rows.push(['Return', formatDate(p.ret)]);
  rows.push(['Travellers & Class', travellerSummary(p)]);
  if (p.flexible) rows.push(['Flexible dates', 'Yes, ±3 days']);
  if (p.nearby) rows.push(['Nearby airports', 'Included']);

  mount.innerHTML = `
    <div class="summary-card reveal is-visible">
      <div class="eyebrow">Your Request</div>
      <h3 style="margin-bottom:18px;">${tripSentence(p)}</h3>
      ${rows.map(([k, v]) => `<div class="summary-row"><span>${k}</span><span>${v}</span></div>`).join('')}
    </div>
  `;
}

async function submitLead(payload) {
  const notConfigured = (url, marker) => !url || url.includes(marker);
  const tasks = [];

  if (!notConfigured(SITE_CONFIG.formspreeEndpoint, 'YOUR_FORM_ID')) {
    tasks.push(
      fetch(SITE_CONFIG.formspreeEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      })
    );
  }
  if (!notConfigured(SITE_CONFIG.googleSheetsWebAppUrl, 'YOUR_DEPLOYMENT_ID')) {
    tasks.push(
      fetch(SITE_CONFIG.googleSheetsWebAppUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
      })
    );
  }

  if (tasks.length === 0) {
    console.warn(
      'Namani Travels: no lead endpoints configured yet. Set formspreeEndpoint / googleSheetsWebAppUrl in assets/js/config.js — see SETUP.md.'
    );
    return;
  }
  await Promise.allSettled(tasks);
}

function initQuotePage() {
  const p = readParams();
  const summaryMount = document.getElementById('quote-summary');
  const vibeMount = document.getElementById('quote-vibe-card');
  if (summaryMount) renderSummary(summaryMount, p);
  if (vibeMount) renderVibeCard(vibeMount, p);

  const form = document.getElementById('quote-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('qf-email').value.trim();
    const phone = document.getElementById('qf-phone').value.trim();
    const submitBtn = document.getElementById('qf-submit');

    if (!email || !phone) return;

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending your request…';

    const payload = { ...p, email, phone, submittedAt: new Date().toISOString() };

    try {
      await submitLead(payload);
    } catch (err) {
      console.error('Namani Travels: lead submission error', err);
    }

    const tripLine = p.from && p.to ? ` (${p.from} → ${p.to})` : '';
    const waMessage = `Hi Namani Travels! I just requested a quote${tripLine}. My email is ${email}.`;

    document.getElementById('quote-form-panel').innerHTML = `
      <div class="confirm-box">
        <div class="check">${iconSpan('check')}</div>
        <h3>We've got your request!</h3>
        <p>Expect a call or WhatsApp message from our team ${SITE_CONFIG.supportHoursNote}. In the meantime, feel free to say hi:</p>
        <a href="${buildWhatsAppLink(waMessage)}" target="_blank" rel="noopener" class="btn btn-primary btn-block" style="max-width:320px;margin:0 auto;">Message Us on WhatsApp</a>
      </div>
    `;
  });
}

document.addEventListener('DOMContentLoaded', initQuotePage);
