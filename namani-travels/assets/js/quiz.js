// ============================================================
// Namani Travels — "Find Your Travel Vibe" quiz.
// Scores answers into a vibe (beach/city/adventure/culture) and a
// specific matched destination, then hands both to quote.html.
// ============================================================

const QUIZ_QUESTIONS = [
  {
    q: "Pick your ideal morning.",
    options: [
      { label: 'Sunrise dip before anyone else is awake', vibe: 'beach', destId: 'bali' },
      { label: 'Espresso, then a skyline walk', vibe: 'city', destId: 'singapore' },
      { label: 'A game drive at first light', vibe: 'adventure', destId: 'kenya' },
      { label: 'Wandering an old town before the crowds', vibe: 'culture', destId: 'santorini' },
    ],
  },
  {
    q: "Your dream soundtrack right now?",
    options: [
      { label: 'Waves. Just waves.', vibe: 'beach', destId: 'seychelles' },
      { label: 'Rooftop beats till 2am', vibe: 'city', destId: 'dubai' },
      { label: 'Wind, and nothing else', vibe: 'adventure', destId: 'tanzania' },
      { label: 'Live music spilling out of a café', vibe: 'culture', destId: 'doha' },
    ],
  },
  {
    q: "What's in your suitcase?",
    options: [
      { label: 'One swimsuit, five paperbacks', vibe: 'beach', destId: 'bali' },
      { label: 'Your sharpest outfit', vibe: 'city', destId: 'tokyo' },
      { label: 'Boots that have seen things', vibe: 'adventure', destId: 'cape-town' },
      { label: 'A journal and a good camera', vibe: 'culture', destId: 'santorini' },
    ],
  },
  {
    q: "Pick a souvenir to bring home.",
    options: [
      { label: 'A shell you\'ll forget the story of', vibe: 'beach', destId: 'seychelles' },
      { label: 'Something from a midnight market', vibe: 'city', destId: 'seoul' },
      { label: 'A photo you\'ll never stop showing people', vibe: 'adventure', destId: 'kenya' },
      { label: 'A handwoven something with a story', vibe: 'culture', destId: 'doha' },
    ],
  },
  {
    q: "Your ideal pace, honestly?",
    options: [
      { label: 'Horizontal, mostly', vibe: 'beach', destId: 'bali' },
      { label: 'Fast — then dinner at 11pm', vibe: 'city', destId: 'singapore' },
      { label: 'Up before the sun, out till it sets', vibe: 'adventure', destId: 'tanzania' },
      { label: 'Slow mornings, long lunches', vibe: 'culture', destId: 'santorini' },
    ],
  },
  {
    q: "Pick a feeling to chase.",
    options: [
      { label: 'Stillness', vibe: 'beach', destId: 'seychelles' },
      { label: 'Electricity', vibe: 'city', destId: 'dubai' },
      { label: 'Awe', vibe: 'adventure', destId: 'cape-town' },
      { label: 'Wonder', vibe: 'culture', destId: 'doha' },
    ],
  },
];

function renderQuiz(mountId) {
  const mount = document.getElementById(mountId);
  if (!mount) return;

  const total = QUIZ_QUESTIONS.length;
  const answers = [];

  const stepsHtml = QUIZ_QUESTIONS.map((step, i) => `
    <div class="quiz-step ${i === 0 ? 'is-active' : ''}" data-step="${i}">
      <div class="eyebrow">Question ${i + 1} of ${total}</div>
      <h3>${step.q}</h3>
      <div class="quiz-options">
        ${step.options.map((opt, oi) => `
          <button class="quiz-option" data-vibe="${opt.vibe}" data-dest="${opt.destId}" type="button">
            <span class="icon">${iconSpan(opt.vibe)}</span>
            <strong>${opt.label}</strong>
          </button>
        `).join('')}
      </div>
      <div class="quiz-nav">
        <button class="btn btn-ghost" data-back type="button" ${i === 0 ? 'style="visibility:hidden"' : ''}>← Back</button>
        <span></span>
      </div>
    </div>
  `).join('');

  mount.innerHTML = `
    <div class="quiz-progress"><div class="quiz-progress__bar" id="quiz-progress-bar"></div></div>
    <div id="quiz-steps">${stepsHtml}</div>
    <div class="quiz-step" data-step="result" id="quiz-result-step"></div>
  `;

  const progressBar = mount.querySelector('#quiz-progress-bar');
  let current = 0;

  function updateProgress() {
    progressBar.style.width = `${(current / total) * 100}%`;
  }

  function goToStep(i) {
    mount.querySelectorAll('.quiz-step').forEach((s) => s.classList.remove('is-active'));
    if (i >= total) {
      showResult();
      mount.querySelector('#quiz-result-step').classList.add('is-active');
      progressBar.style.width = '100%';
    } else {
      mount.querySelector(`.quiz-step[data-step="${i}"]`).classList.add('is-active');
      updateProgress();
    }
    current = i;
  }

  mount.querySelectorAll('.quiz-option').forEach((btn) => {
    btn.addEventListener('click', () => {
      const stepEl = btn.closest('.quiz-step');
      const stepIndex = Number(stepEl.dataset.step);
      answers[stepIndex] = { vibe: btn.dataset.vibe, destId: btn.dataset.dest };
      stepEl.querySelectorAll('.quiz-option').forEach((o) => o.classList.remove('is-selected'));
      btn.classList.add('is-selected');
      setTimeout(() => goToStep(stepIndex + 1), 260);
    });
  });

  mount.querySelectorAll('[data-back]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const stepEl = btn.closest('.quiz-step');
      const stepIndex = Number(stepEl.dataset.step);
      goToStep(Math.max(0, stepIndex - 1));
    });
  });

  function tally() {
    const vibeScore = { beach: 0, city: 0, adventure: 0, culture: 0 };
    const destScore = {};
    answers.forEach((a) => {
      if (!a) return;
      vibeScore[a.vibe] += 1;
      destScore[a.destId] = (destScore[a.destId] || 0) + 1;
    });
    const winningVibe = Object.entries(vibeScore).sort((a, b) => b[1] - a[1])[0][0];
    const candidateDests = Object.entries(destScore)
      .filter(([id]) => getDestination(id)?.vibe === winningVibe)
      .sort((a, b) => b[1] - a[1]);
    const destinationId = candidateDests.length ? candidateDests[0][0] : DESTINATIONS.find((d) => d.vibe === winningVibe).id;
    return { vibe: winningVibe, destinationId };
  }

  function showResult() {
    const result = tally();
    const dest = getDestination(result.destinationId);
    const vibeInfo = VIBES[result.vibe];
    sessionStorage.setItem('namani-vibe-result', JSON.stringify(result));

    const params = new URLSearchParams({ vibe: result.vibe, destination: dest.id, fromQuiz: '1' });

    mount.querySelector('#quiz-result-step').innerHTML = `
      <div class="text-center">
        <span class="badge ${vibeInfo.badge}" style="margin-bottom:18px;">${iconSpan(result.vibe)} ${vibeInfo.label}</span>
        <h2>Your travel vibe is ${vibeInfo.label}.</h2>
        <p style="max-width:420px;margin:0 auto 28px;">${vibeInfo.desc}</p>
      </div>
      <div class="card" style="max-width:340px;margin:0 auto 28px;">
        <div class="card__media">
          <span class="badge ${vibeInfo.badge} card__badge">${dest.country}</span>
          <img src="${dest.img}" alt="${dest.name}" loading="lazy" />
        </div>
        <div class="card__body">
          <h3>${dest.name}</h3>
          <p style="margin:0;">${dest.blurb}</p>
        </div>
      </div>
      <div class="stack-lg" style="align-items:center;">
        <a href="quote.html?${params.toString()}" class="btn btn-primary btn-block" style="max-width:340px;">Get My Personalized Quote</a>
        <button class="btn btn-ghost" id="quiz-retake" type="button">Retake the quiz</button>
      </div>
    `;
    mount.querySelector('#quiz-retake').addEventListener('click', () => {
      answers.length = 0;
      mount.querySelectorAll('.quiz-option').forEach((o) => o.classList.remove('is-selected'));
      goToStep(0);
    });
  }

  updateProgress();
}
