// ============================================================
// Namani Travels — itinerary search widget.
// Renders into any element with an id, handles trip type tabs, city
// autocomplete, passenger count, cabin class, special requests, and
// advanced options. On submit, calls options.onSubmit(params) if
// provided (used to reveal the quote panel inline on search.html);
// otherwise navigates to search.html carrying the trip as query params
// (used by the lightweight widget embedded on the Home page).
// ============================================================

const CABIN_CLASSES = ['Economy', 'Premium Economy', 'Business', 'First'];

const SPECIAL_REQUESTS = [
  { key: 'minor', label: 'Unaccompanied minor' },
  { key: 'group', label: 'Group trip' },
  { key: 'accessibility', label: 'Accessibility needs' },
  { key: 'corporate', label: 'Corporate travel' },
];

function renderSearchWidget(mountId, options = {}) {
  const mount = document.getElementById(mountId);
  if (!mount) return;
  const expanded = !!options.expandAdvancedByDefault;

  mount.innerHTML = `
    <div class="search-widget">
      <div class="search-widget__tabs" role="tablist">
        <button class="trip-tab is-active" data-trip="roundtrip">Round-trip</button>
        <button class="trip-tab" data-trip="oneway">One-way</button>
        <button class="trip-tab" data-trip="multicity">Multi-city</button>
      </div>

      <div class="search-widget__row">
        <div class="search-field" data-field="from">
          <label>From</label>
          <input type="text" id="sw-from" placeholder="City or airport" autocomplete="off" />
          <div class="autocomplete-list" id="sw-from-list"></div>
        </div>
        <div class="search-field--swap">
          <button class="field-swap-btn" id="sw-swap" type="button" aria-label="Swap cities">⇄</button>
        </div>
        <div class="search-field" data-field="to">
          <label>To</label>
          <input type="text" id="sw-to" placeholder="City or airport" autocomplete="off" />
          <div class="autocomplete-list" id="sw-to-list"></div>
        </div>
      </div>

      <div class="search-widget__row">
        <div class="search-field" data-field="depart">
          <label>Depart</label>
          <input type="date" id="sw-depart" />
        </div>
        <div class="search-field" data-field="return" id="sw-return-field">
          <label>Return</label>
          <input type="date" id="sw-return" />
        </div>
        <div class="search-field" data-field="pax" id="sw-pax-field">
          <label>Travellers</label>
          <div id="sw-pax-summary" style="font-weight:600;">1 Adult</div>
          <div class="pax-popover" id="sw-pax-popover">
            <div class="pax-row">
              <div><strong>Adults</strong><span>12+ years</span></div>
              <div class="pax-counter">
                <button class="pax-btn" data-pax="adults" data-op="dec" type="button">−</button>
                <span id="pax-adults">1</span>
                <button class="pax-btn" data-pax="adults" data-op="inc" type="button">+</button>
              </div>
            </div>
            <div class="pax-row">
              <div><strong>Children</strong><span>2–11 years</span></div>
              <div class="pax-counter">
                <button class="pax-btn" data-pax="children" data-op="dec" type="button">−</button>
                <span id="pax-children">0</span>
                <button class="pax-btn" data-pax="children" data-op="inc" type="button">+</button>
              </div>
            </div>
            <div class="pax-row">
              <div><strong>Infants</strong><span>Under 2 years</span></div>
              <div class="pax-counter">
                <button class="pax-btn" data-pax="infants" data-op="dec" type="button">−</button>
                <span id="pax-infants">0</span>
                <button class="pax-btn" data-pax="infants" data-op="inc" type="button">+</button>
              </div>
            </div>
            <button class="btn btn-dark btn-sm btn-block" id="sw-pax-done" type="button" style="margin-top:12px;">Done</button>
          </div>
        </div>
      </div>

      <div class="class-picker">
        <label>Cabin Class</label>
        <div class="segmented" id="sw-class-segmented">
          ${CABIN_CLASSES.map((c, i) => `<button type="button" class="segmented__btn${i === 0 ? ' is-active' : ''}" data-class="${c}">${c}</button>`).join('')}
        </div>
      </div>

      <div class="search-widget__submit">
        <button class="btn btn-primary btn-block" id="sw-submit" type="button">Get Your Quote</button>
      </div>

      <div class="advanced-toggle" id="sw-advanced-toggle">
        Advanced search — flexible dates, nearby airports, special requests
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m6 9 6 6 6-6"/></svg>
      </div>
      <div class="advanced-panel" id="sw-advanced-panel">
        <div class="advanced-panel__row">
          <label class="check-pill"><input type="checkbox" id="sw-flexible" /> My dates are flexible (±3 days)</label>
          <label class="check-pill"><input type="checkbox" id="sw-nearby" /> Include nearby airports</label>
        </div>
        <div class="advanced-panel__special">
          <strong>Special requests</strong>
          <div class="advanced-panel__row">
            ${SPECIAL_REQUESTS.map((r) => `<label class="check-pill"><input type="checkbox" id="sw-req-${r.key}" /> ${r.label}</label>`).join('')}
          </div>
          <p class="advanced-panel__hint">Flag any of these and we'll make sure the right person on our team handles your request.</p>
        </div>
      </div>
    </div>
  `;

  const state = {
    tripType: 'roundtrip',
    from: null,
    to: null,
    pax: { adults: 1, children: 0, infants: 0 },
    cabin: 'Economy',
  };

  // --- trip type tabs ---
  mount.querySelectorAll('.trip-tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      mount.querySelectorAll('.trip-tab').forEach((t) => t.classList.remove('is-active'));
      tab.classList.add('is-active');
      state.tripType = tab.dataset.trip;
      const returnField = mount.querySelector('#sw-return-field');
      returnField.style.display = state.tripType === 'oneway' ? 'none' : 'block';
    });
  });

  // --- autocomplete ---
  function setupAutocomplete(inputId, listId, key) {
    const input = mount.querySelector(`#${inputId}`);
    const list = mount.querySelector(`#${listId}`);
    input.addEventListener('input', () => {
      const results = searchAirports(input.value);
      if (!results.length) { list.classList.remove('is-open'); return; }
      list.innerHTML = results.map((a) => `
        <div class="autocomplete-item" data-code="${a.code}" data-city="${a.city}">
          <div><strong>${a.city}</strong><span> — ${a.airport}</span></div>
          <span class="code">${a.code}</span>
        </div>
      `).join('');
      list.classList.add('is-open');
      list.querySelectorAll('.autocomplete-item').forEach((item) => {
        item.addEventListener('click', () => {
          const code = item.dataset.code;
          const airport = findAirportByCode(code);
          state[key] = airport;
          input.value = `${airport.city} (${airport.code})`;
          list.classList.remove('is-open');
        });
      });
    });
    input.addEventListener('focus', () => { if (input.value) input.dispatchEvent(new Event('input')); });
    document.addEventListener('click', (e) => {
      if (!input.contains(e.target) && !list.contains(e.target)) list.classList.remove('is-open');
    });
  }
  setupAutocomplete('sw-from', 'sw-from-list', 'from');
  setupAutocomplete('sw-to', 'sw-to-list', 'to');

  mount.querySelector('#sw-swap').addEventListener('click', () => {
    const fromInput = mount.querySelector('#sw-from');
    const toInput = mount.querySelector('#sw-to');
    [fromInput.value, toInput.value] = [toInput.value, fromInput.value];
    [state.from, state.to] = [state.to, state.from];
  });

  // --- passenger popover (adults/children/infants only — cabin class lives outside it now) ---
  const paxField = mount.querySelector('#sw-pax-field');
  const paxPopover = mount.querySelector('#sw-pax-popover');
  const paxSummary = mount.querySelector('#sw-pax-summary');

  function updatePaxSummary() {
    const total = state.pax.adults + state.pax.children + state.pax.infants;
    paxSummary.textContent = total === 1 ? '1 Traveller' : `${total} Travellers`;
  }

  paxField.addEventListener('click', (e) => {
    if (e.target.closest('.pax-popover') && e.target.id !== 'sw-pax-done') return;
    paxPopover.classList.toggle('is-open');
  });
  document.addEventListener('click', (e) => {
    if (!paxField.contains(e.target)) paxPopover.classList.remove('is-open');
  });

  mount.querySelectorAll('.pax-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const key = btn.dataset.pax;
      const op = btn.dataset.op;
      const min = key === 'adults' ? 1 : 0;
      if (op === 'inc') state.pax[key] = Math.min(9, state.pax[key] + 1);
      else state.pax[key] = Math.max(min, state.pax[key] - 1);
      mount.querySelector(`#pax-${key}`).textContent = state.pax[key];
      updatePaxSummary();
    });
  });

  // --- cabin class segmented control (always visible — no more hidden <select>) ---
  const classButtons = mount.querySelectorAll('.segmented__btn');
  function setCabin(cls) {
    state.cabin = cls;
    classButtons.forEach((b) => b.classList.toggle('is-active', b.dataset.class === cls));
  }
  classButtons.forEach((btn) => btn.addEventListener('click', () => setCabin(btn.dataset.class)));

  // --- advanced panel ---
  const advToggle = mount.querySelector('#sw-advanced-toggle');
  const advPanel = mount.querySelector('#sw-advanced-panel');
  advToggle.addEventListener('click', () => {
    advToggle.classList.toggle('is-open');
    advPanel.classList.toggle('is-open');
  });
  if (expanded) { advToggle.classList.add('is-open'); advPanel.classList.add('is-open'); }

  // --- prefill "to" from a destination card link, the persona quiz, or a corporate handoff ---
  const urlParams = new URLSearchParams(window.location.search);
  const urlTo = urlParams.get('to');
  if (urlTo) {
    mount.querySelector('#sw-to').value = urlTo;
    state.to = { city: urlTo, code: '', country: '', airport: '' };
  } else {
    try {
      const personaResult = JSON.parse(sessionStorage.getItem('namani-quiz-result') || 'null');
      if (personaResult && personaResult.destinationId) {
        const dest = getDestination(personaResult.destinationId);
        if (dest) {
          mount.querySelector('#sw-to').value = dest.name;
          state.to = { city: dest.name, code: '', country: dest.country, airport: '' };
        }
      }
    } catch (e) { /* sessionStorage unavailable — ignore */ }
  }
  if (urlParams.get('corporate') === '1') {
    setCabin('Business');
    advToggle.classList.add('is-open');
    advPanel.classList.add('is-open');
    const corpCheckbox = mount.querySelector('#sw-req-corporate');
    if (corpCheckbox) corpCheckbox.checked = true;
  }

  // --- submit ---
  mount.querySelector('#sw-submit').addEventListener('click', () => {
    const fromVal = mount.querySelector('#sw-from').value;
    const toVal = mount.querySelector('#sw-to').value;
    if (!fromVal || !toVal) {
      alert("Please tell us where you're flying from and to.");
      return;
    }
    const specialRequests = SPECIAL_REQUESTS
      .filter((r) => mount.querySelector(`#sw-req-${r.key}`).checked)
      .map((r) => r.label);

    const params = new URLSearchParams({
      trip: state.tripType,
      from: fromVal,
      to: toVal,
      depart: mount.querySelector('#sw-depart').value || '',
      ret: mount.querySelector('#sw-return').value || '',
      adults: state.pax.adults,
      children: state.pax.children,
      infants: state.pax.infants,
      cabin: state.cabin,
      flexible: mount.querySelector('#sw-flexible').checked ? '1' : '0',
      nearby: mount.querySelector('#sw-nearby').checked ? '1' : '0',
      requests: specialRequests.join('|'),
    });

    if (options.onSubmit) {
      options.onSubmit(params);
    } else {
      window.location.href = `search.html?${params.toString()}&fromWidgetSubmit=1`;
    }
  });

  updatePaxSummary();
}
