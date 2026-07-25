// ============================================================
// Namani Travels — skippable "what kind of traveler are you" gate.
// Shown once per session on the Home page (after the passport intro).
// Business trips skip straight to a corporate result; personal trips
// get 4 quick questions that sort into a traveler type + a matched
// destination. Either path can be skipped entirely.
// ============================================================

const PERSONA_QUESTIONS = [
  {
    q: "Pick your ideal morning.",
    options: [
      { label: 'Sunrise dip before anyone else is awake', persona: 'beach', destId: 'bali' },
      { label: 'Espresso, then a skyline walk', persona: 'city', destId: 'singapore' },
      { label: 'A game drive at first light', persona: 'adventurer', destId: 'kenya' },
      { label: 'Wandering an old town before the crowds', persona: 'culture', destId: 'santorini' },
    ],
  },
  {
    q: "Your dream soundtrack right now?",
    options: [
      { label: 'Waves. Just waves.', persona: 'beach', destId: 'seychelles' },
      { label: 'Rooftop beats till 2am', persona: 'city', destId: 'dubai' },
      { label: 'Wind, and nothing else', persona: 'adventurer', destId: 'tanzania' },
      { label: 'Live music spilling out of a café', persona: 'culture', destId: 'doha' },
    ],
  },
  {
    q: "What's in your suitcase?",
    options: [
      { label: 'One swimsuit, five paperbacks', persona: 'beach', destId: 'bali' },
      { label: 'Your sharpest outfit', persona: 'city', destId: 'tokyo' },
      { label: 'Boots that have seen things', persona: 'adventurer', destId: 'cape-town' },
      { label: 'A journal and a good camera', persona: 'culture', destId: 'santorini' },
    ],
  },
  {
    q: "Pick a feeling to chase.",
    options: [
      { label: 'Stillness', persona: 'beach', destId: 'seychelles' },
      { label: 'Electricity', persona: 'city', destId: 'dubai' },
      { label: 'Awe', persona: 'adventurer', destId: 'cape-town' },
      { label: 'Wonder', persona: 'culture', destId: 'doha' },
    ],
  },
];

function tallyLeisurePersona(answers) {
  const score = { beach: 0, city: 0, adventurer: 0, culture: 0 };
  const destScore = {};
  answers.forEach((a) => {
    if (!a) return;
    score[a.persona] += 1;
    destScore[a.destId] = (destScore[a.destId] || 0) + 1;
  });
  const winner = Object.entries(score).sort((a, b) => b[1] - a[1])[0][0];
  const winnerVibe = PERSONAS[winner].vibe;
  const candidates = Object.entries(destScore)
    .filter(([id]) => getDestination(id)?.vibe === winnerVibe)
    .sort((a, b) => b[1] - a[1]);
  const destinationId = candidates.length ? candidates[0][0] : DESTINATIONS.find((d) => d.vibe === winnerVibe).id;
  return { persona: winner, destinationId };
}

function dismissPersonaGate() {
  const gate = document.getElementById('persona-gate');
  if (!gate) return;
  gate.classList.add('is-hidden');
  document.body.style.overflow = '';
}

function renderPersonaGate(mountId) {
  const mount = document.getElementById(mountId);
  if (!mount) return;
  const answers = [];

  mount.innerHTML = `
    <div class="quiz-shell">
      <button class="persona-gate__skip" id="persona-skip" type="button">Skip — take me to the site</button>
      <div class="quiz-progress"><div class="quiz-progress__bar" id="persona-progress-bar"></div></div>
      <div id="persona-steps"></div>
    </div>
  `;

  const stepsHost = mount.querySelector('#persona-steps');
  const progressBar = mount.querySelector('#persona-progress-bar');

  mount.querySelector('#persona-skip').addEventListener('click', () => {
    sessionStorage.setItem('namani-persona-gate-seen', '1');
    dismissPersonaGate();
  });

  function renderGateStep() {
    progressBar.style.width = '0%';
    stepsHost.innerHTML = `
      <div class="eyebrow">Two clicks, then we'll get out of your way</div>
      <h3>What's this trip for?</h3>
      <p>Answer a few quick questions and we'll tailor what you see — or skip straight to browsing.</p>
      <div class="persona-gate__type-options">
        <button class="quiz-option" id="persona-leisure" type="button">
          <span class="icon">${iconSpan('backpack')}</span>
          <strong>Personal trip</strong>
          <span>Leisure, adventure, a well-earned break.</span>
        </button>
        <button class="quiz-option" id="persona-corporate" type="button">
          <span class="icon">${iconSpan('suitcase')}</span>
          <strong>Business trip</strong>
          <span>Corporate travel, handled efficiently.</span>
        </button>
      </div>
    `;
    stepsHost.querySelector('#persona-leisure').addEventListener('click', () => renderQuestionStep(0));
    stepsHost.querySelector('#persona-corporate').addEventListener('click', finishCorporate);
  }

  function renderQuestionStep(index) {
    if (index >= PERSONA_QUESTIONS.length) { finishLeisure(); return; }
    progressBar.style.width = `${(index / PERSONA_QUESTIONS.length) * 100}%`;
    const step = PERSONA_QUESTIONS[index];
    stepsHost.innerHTML = `
      <div class="eyebrow">Question ${index + 1} of ${PERSONA_QUESTIONS.length}</div>
      <h3>${step.q}</h3>
      <div class="quiz-options">
        ${step.options.map((opt) => `
          <button class="quiz-option" data-persona="${opt.persona}" data-dest="${opt.destId}" type="button">
            <span class="icon">${iconSpan(PERSONAS[opt.persona].vibe)}</span>
            <strong>${opt.label}</strong>
          </button>
        `).join('')}
      </div>
      <div class="quiz-nav">
        <button class="btn btn-ghost" id="persona-back" type="button" ${index === 0 ? 'style="visibility:hidden"' : ''}>← Back</button>
        <span></span>
      </div>
    `;
    stepsHost.querySelectorAll('.quiz-option').forEach((btn) => {
      btn.addEventListener('click', () => {
        answers[index] = { persona: btn.dataset.persona, destId: btn.dataset.dest };
        setTimeout(() => renderQuestionStep(index + 1), 220);
      });
    });
    stepsHost.querySelector('#persona-back').addEventListener('click', () => {
      if (index === 0) renderGateStep(); else renderQuestionStep(index - 1);
    });
  }

  function finishLeisure() {
    progressBar.style.width = '100%';
    const result = tallyLeisurePersona(answers);
    const dest = getDestination(result.destinationId);
    const info = PERSONAS[result.persona];
    localStorage.setItem('namani-persona', JSON.stringify(result));
    sessionStorage.setItem('namani-quiz-result', JSON.stringify(result));
    sessionStorage.setItem('namani-persona-gate-seen', '1');

    const params = new URLSearchParams({ to: dest.name });
    stepsHost.innerHTML = `
      <div class="text-center">
        <span class="badge ${info.badge}" style="margin-bottom:18px;">${iconSpan(info.vibe)} ${info.label}</span>
        <h2>You're a ${info.label} traveler.</h2>
        <p style="max-width:420px;margin:0 auto 28px;">${info.tagline}</p>
      </div>
      <div class="card" style="max-width:320px;margin:0 auto 28px;">
        <div class="card__media">
          <span class="badge ${info.badge} card__badge">${dest.country}</span>
          <img src="${dest.img}" alt="${dest.name}" loading="lazy" />
        </div>
        <div class="card__body">
          <h3>${dest.name}</h3>
          <p style="margin:0;">${dest.blurb}</p>
        </div>
      </div>
      <div class="stack-lg" style="align-items:center;">
        <a href="search.html?${params.toString()}" class="btn btn-primary btn-block" style="max-width:320px;">Plan This Trip</a>
        <button class="btn btn-ghost" id="persona-continue" type="button">Just show me the homepage</button>
      </div>
    `;
    stepsHost.querySelector('#persona-continue').addEventListener('click', dismissPersonaGate);
  }

  function finishCorporate() {
    progressBar.style.width = '100%';
    const info = PERSONAS.corporate;
    localStorage.setItem('namani-persona', JSON.stringify({ persona: 'corporate' }));
    sessionStorage.setItem('namani-persona-gate-seen', '1');
    stepsHost.innerHTML = `
      <div class="text-center">
        <span class="badge ${info.badge}" style="margin-bottom:18px;">${iconSpan('suitcase')} ${info.label}</span>
        <h2>Corporate travel, sorted.</h2>
        <p style="max-width:420px;margin:0 auto 28px;">${info.tagline} We'll pre-fill Business class and flag your request for priority handling.</p>
      </div>
      <div class="stack-lg" style="align-items:center;">
        <a href="search.html?corporate=1" class="btn btn-primary btn-block" style="max-width:320px;">Start a Corporate Request</a>
        <button class="btn btn-ghost" id="persona-continue" type="button">Just show me the homepage</button>
      </div>
    `;
    stepsHost.querySelector('#persona-continue').addEventListener('click', dismissPersonaGate);
  }

  renderGateStep();
}

function reopenPersonaGate() {
  const gate = document.getElementById('persona-gate');
  if (!gate) return;
  document.body.style.overflow = 'hidden';
  gate.classList.remove('is-hidden');
  renderPersonaGate('persona-gate-mount');
}

function initPersonaGate() {
  const gate = document.getElementById('persona-gate');
  if (!gate) return;
  if (sessionStorage.getItem('namani-persona-gate-seen')) return;
  document.body.style.overflow = 'hidden';
  gate.classList.remove('is-hidden');
  renderPersonaGate('persona-gate-mount');
}

// Personalizes the homepage based on a previously-chosen traveler type
// (localStorage — persists across visits until the quiz is retaken).
function applyPersonaPersonalization() {
  const banner = document.getElementById('persona-banner');
  if (!banner) return;
  let persona;
  try { persona = JSON.parse(localStorage.getItem('namani-persona') || 'null'); } catch (e) { persona = null; }
  if (!persona) return;

  if (persona.persona === 'corporate') {
    const info = PERSONAS.corporate;
    banner.innerHTML = `
      <div>
        <div class="eyebrow" style="margin-bottom:6px;">Welcome back, corporate traveler</div>
        <p style="margin:0;max-width:480px;">${info.tagline}</p>
      </div>
      <a href="search.html?corporate=1" class="btn btn-primary btn-sm">Start a Corporate Request</a>
    `;
  } else {
    const info = PERSONAS[persona.persona];
    if (!info) return;
    banner.innerHTML = `
      <div>
        <div class="eyebrow" style="margin-bottom:6px;">Picked for ${info.label} travelers</div>
        <p style="margin:0;max-width:480px;">${info.tagline}</p>
      </div>
      <a href="index.html#retake-quiz" class="btn btn-outline btn-sm">Retake the quiz</a>
    `;
    const pill = document.querySelector(`#home-filter-row .filter-pill[data-vibe="${info.vibe}"]`);
    if (pill) pill.click();
  }
  banner.hidden = false;
}
