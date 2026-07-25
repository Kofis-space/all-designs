// ============================================================
// Namani Travels — itinerary search widget.
// Renders into any element with [data-search-widget], handles trip
// type tabs, city autocomplete, passenger/class selection, advanced
// options, and routes the submission to quote.html with query params.
// ============================================================

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

      <div class="search-widget__fields">
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
        <div class="search-field" data-field="depart">
          <label>Depart</label>
          <input type="date" id="sw-depart" />
        </div>
        <div class="search-field" data-field="return" id="sw-return-field">
          <label>Return</label>
          <input type="date" id="sw-return" />
        </div>
        <div class="search-field" data-field="pax" id="sw-pax-field">
          <label>Travellers &amp; Class</label>
          <div id="sw-pax-summary" style="font-weight:600;">1 Adult, Economy</div>
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
            <div class="pax-row" style="flex-direction:column;align-items:stretch;gap:8px;">
              <strong>Cabin Class</strong>
              <select class="form-control" id="sw-class">
                <option value="Economy">Economy</option>
                <option value="Premium Economy">Premium Economy</option>
                <option value="Business">Business</option>
                <option value="First">First</option>
              </select>
            </div>
            <button class="btn btn-dark btn-sm btn-block" id="sw-pax-done" type="button" style="margin-top:12px;">Done</button>
          </div>
        </div>
        <div class="search-widget__submit">
          <button class="btn btn-primary" id="sw-submit" type="button">Get Your Quote</button>
        </div>
      </div>

      <div class="advanced-toggle" id="sw-advanced-toggle">
        Advanced search — flexible dates, nearby airports
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m6 9 6 6 6-6"/></svg>
      </div>
      <div class="advanced-panel" id="sw-advanced-panel">
        <div class="advanced-panel__row">
          <label class="check-pill"><input type="checkbox" id="sw-flexible" /> My dates are flexible (±3 days)</label>
          <label class="check-pill"><input type="checkbox" id="sw-nearby" /> Include nearby airports</label>
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

  // --- passenger popover ---
  const paxField = mount.querySelector('#sw-pax-field');
  const paxPopover = mount.querySelector('#sw-pax-popover');
  const paxSummary = mount.querySelector('#sw-pax-summary');

  function updatePaxSummary() {
    const total = state.pax.adults + state.pax.children + state.pax.infants;
    const label = total === 1 ? '1 Traveller' : `${total} Travellers`;
    paxSummary.textContent = `${label}, ${state.cabin}`;
  }

  paxField.addEventListener('click', (e) => {
    if (e.target.closest('.pax-popover') && !e.target.id.includes('done')) return;
    paxPopover.classList.toggle('is-open');
  });
  mount.querySelector('#sw-pax-done').addEventListener('click', (e) => {
    e.stopPropagation();
    paxPopover.classList.remove('is-open');
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
  mount.querySelector('#sw-class').addEventListener('change', (e) => {
    state.cabin = e.target.value;
    updatePaxSummary();
  });

  // --- advanced panel ---
  const advToggle = mount.querySelector('#sw-advanced-toggle');
  const advPanel = mount.querySelector('#sw-advanced-panel');
  advToggle.addEventListener('click', () => {
    advToggle.classList.toggle('is-open');
    advPanel.classList.toggle('is-open');
  });
  if (expanded) { advToggle.classList.add('is-open'); advPanel.classList.add('is-open'); }

  // --- prefill "to" from a destination card link, or from the vibe quiz result ---
  const urlTo = new URLSearchParams(window.location.search).get('to');
  if (urlTo) {
    mount.querySelector('#sw-to').value = urlTo;
    state.to = { city: urlTo, code: '', country: '', airport: '' };
  } else {
    try {
      const vibeResult = JSON.parse(sessionStorage.getItem('namani-vibe-result') || 'null');
      if (vibeResult && vibeResult.destinationId) {
        const dest = getDestination(vibeResult.destinationId);
        if (dest) {
          mount.querySelector('#sw-to').value = dest.name;
          state.to = { city: dest.name, code: '', country: dest.country, airport: '' };
        }
      }
    } catch (e) { /* sessionStorage unavailable — ignore */ }
  }

  // --- submit -> quote.html ---
  mount.querySelector('#sw-submit').addEventListener('click', () => {
    const fromVal = mount.querySelector('#sw-from').value;
    const toVal = mount.querySelector('#sw-to').value;
    if (!fromVal || !toVal) {
      alert('Please tell us where you\'re flying from and to.');
      return;
    }
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
    });
    window.location.href = `quote.html?${params.toString()}`;
  });

  updatePaxSummary();
}
