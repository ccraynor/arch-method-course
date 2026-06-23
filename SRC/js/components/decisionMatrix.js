/* =============================================================================
   decisionMatrix.js
   Component Contract — Decision Matrix
   Implements Section 14 of the Master Accessibility, Usability, and Inclusive
   Design Specification (Version 5.0).

   SPEC REFERENCE
   Section 14 — Component Contract: Decision Matrix
   Section 16 — Decision Branching:
                   Keyboard: Arrow Keys, Tab, Enter to select and submit
                   SR:       "Option selected. / Decision recorded. /
                              Feedback available."
                   Motion:   Instant feedback display — no slide or fade

   INPUTS
   • Criteria   — ordered list of evaluation dimensions
   • Options    — choices to evaluate; each carries per-criterion ratings
   • Feedback   — per-option heading, explanation, and consequence paragraph

   OUTPUTS
   • Selected Option    — highlighted column (desktop) or checked item (mobile)
   • Feedback Display   — shown below matrix after submission
   • Decision Status    — current state string returned by getState()

   STATES
   • unselected — no option chosen; submit blocked
   • selected   — option chosen; ready to submit
   • submitted  — feedback visible for chosen option
   • revised    — learner clicked Revise; re-selection in progress

   ARIA REQUIREMENTS
   • Desktop (≥ 768px): <table> with radio inputs in column headers
       — role="table", caption, th[scope="col"], th[scope="row"], headers attr
       — Radio inputs: name="[prefix]-table-opt"; Arrow Keys navigate natively
       — Selected column gets aria-selected="true" on its <th>
       — No color-only indicators: tier communicated by icon + text + class
   • Mobile (< 768px): accordion with role="radiogroup"
       — Each item: radio input + expand/collapse <button aria-expanded>
       — Accordion panel contains criteria ratings as <dl>
       — Active view has aria-hidden="false"; inactive has aria-hidden="true"
   • Feedback region (#[prefix]-feedback):
       — Initially hidden; revealed on submit
       — Heading tabindex="-1"; receives focus on reveal
   • Error element (#[prefix]-error):
       — Shown when submit is attempted with no option selected
       — aria-live="polite" on container ensures it is announced
   • Announcements via #sr-announcer (global):
       — "Option selected."      on radio change
       — "Feedback available."   on successful submit
       — "Decision revised."     on Revise click

   PERFORMANCE
   • init() builds all DOM synchronously; two rAF calls max (announce + focus)
   • Viewport switch (matchMedia) updates aria-hidden only — no DOM rebuild

   DOM CONTRACT
   The host element must exist before init() is called:
     #[config.containerId]  — any block element; component clears and fills it

   The following global element must also exist:
     #sr-announcer          — <div role="status" aria-live="polite" aria-atomic="true">

   The component generates all internal IDs, namespaced by config.containerId,
   so multiple independent matrices can coexist on one page.

   RATING TIERS
   • strong   — checkmark icon + "Strong"   — CSS class dm-cell--strong
   • adequate — dash icon    + "Adequate"   — CSS class dm-cell--adequate
   • limited  — cross icon   + "Limited"    — CSS class dm-cell--limited

   USAGE
   ─────────────────────────────────────────────────────────────────────────────
   import { init, getState } from './components/decisionMatrix.js';

   init({
     containerId: 'dm-container',      // id of host element
     storageKey:  'matrix_m1_l2',      // optional; omit to skip persistence
     criteria: [
       { id: 'c1', label: 'Stakeholder Fit',
         description: 'How well does this option address stakeholder priorities?' },
       { id: 'c2', label: 'Budget Alignment',
         description: 'Is this achievable within the stated budget?' },
     ],
     options: [
       {
         id:    'opt-a',
         value: 'a',
         label: 'Option A: Narrow Focus',
         ratings: [
           { criterionId: 'c1', tier: 'strong',   rationale: 'Addresses core stakeholders directly.' },
           { criterionId: 'c2', tier: 'adequate',  rationale: 'Fits budget with minor adjustments.' },
         ],
         feedback: {
           heading:     'Option A: Narrow Focus',
           explanation: 'This option concentrates resources on the highest-priority stakeholders...',
           consequence: 'The tradeoff is reduced reach for peripheral learner groups.',
         },
       },
       {
         id:    'opt-b',
         value: 'b',
         label: 'Option B: Broad Coverage',
         ratings: [
           { criterionId: 'c1', tier: 'adequate', rationale: 'Covers all stakeholders but shallowly.' },
           { criterionId: 'c2', tier: 'limited',  rationale: 'Likely to exceed budget without cuts.' },
         ],
         feedback: {
           heading:     'Option B: Broad Coverage',
           explanation: 'This option maximises reach but dilutes depth...',
           consequence: 'Risk: budget overrun and shallow learning outcomes.',
         },
       },
     ],
   });
   ─────────────────────────────────────────────────────────────────────────────
   ============================================================================= */

import { getItem, setItem } from '../storage.js';

const STATE = Object.freeze({
  UNSELECTED: 'unselected',
  SELECTED:   'selected',
  SUBMITTED:  'submitted',
  REVISED:    'revised',
});

/* Mobile breakpoint — matches the point at which accordion replaces table */
const MOBILE_MQ_STRING = '(max-width: 767px)';

/* Internal state — one set per init() call (single matrix per page assumed) */
let _ready          = false;
let _prefix         = '';
let _config         = null;
let _state          = STATE.UNSELECTED;
let _selectedValue  = null;
let _mobileMQ       = null;

/* Cached element references */
let _containerEl    = null;
let _desktopEl      = null;
let _mobileEl       = null;
let _errorEl        = null;
let _submitBtn      = null;
let _feedbackEl     = null;
let _feedbackHdgEl  = null;
let _feedbackBodyEl = null;
let _feedbackConEl  = null;
let _reviseBtn      = null;

/* ---- Announcement helper ---- */
function _announce(message) {
  const region = document.getElementById('sr-announcer');
  if (!region || !message) return;
  region.textContent = '';
  requestAnimationFrame(() => { region.textContent = message; });
}

/* ---- Rating tier icons (aria-hidden; tier also in text) ---- */
function _tierIcon(tier) {
  if (tier === 'strong') {
    return '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" ' +
      'aria-hidden="true" focusable="false">' +
      '<path d="M2 7l3.5 3.5L12 4" stroke="currentColor" stroke-width="2" ' +
      'stroke-linecap="round" stroke-linejoin="round"/></svg>';
  }
  if (tier === 'adequate') {
    return '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" ' +
      'aria-hidden="true" focusable="false">' +
      '<path d="M3 7h8" stroke="currentColor" stroke-width="2" ' +
      'stroke-linecap="round"/></svg>';
  }
  /* limited */
  return '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" ' +
    'aria-hidden="true" focusable="false">' +
    '<path d="M3 3l8 8M11 3L3 11" stroke="currentColor" stroke-width="2" ' +
    'stroke-linecap="round"/></svg>';
}

/* ---- Build a rating cell's inner content ---- */
function _ratingContent(rating) {
  const tier  = rating.tier || 'limited';
  const label = tier.charAt(0).toUpperCase() + tier.slice(1);
  return '<span class="dm-rating dm-rating--' + tier + '">' +
    '<span class="dm-rating__icon" aria-hidden="true">' + _tierIcon(tier) + '</span>' +
    '<span class="dm-rating__tier">' + label + '</span>' +
    '<span class="dm-rating__rationale">' + _esc(rating.rationale || '') + '</span>' +
    '</span>';
}

/* ---- HTML escape ---- */
function _esc(str) {
  return String(str)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/* ---- Build the desktop <table> structure ---- */
function _buildDesktopTable(options, criteria) {
  const wrap = document.createElement('div');
  wrap.className = 'dm-desktop';
  wrap.setAttribute('aria-hidden', 'false');

  const table = document.createElement('table');
  table.className = 'dm-table';
  table.setAttribute('role', 'table');

  /* Caption — sr-only; instructs AT users on how to interact */
  const cap = document.createElement('caption');
  cap.className = 'sr-only';
  cap.textContent =
    'Decision matrix. Use Arrow Keys to select an option, then press the submit button.';
  table.appendChild(cap);

  /* thead — one column per option, plus a row-header column */
  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');

  /* Empty corner cell */
  const cornerTh = document.createElement('th');
  cornerTh.scope = 'col';
  cornerTh.className = 'dm-th dm-th--corner';
  cornerTh.setAttribute('aria-label', 'Criteria');
  headerRow.appendChild(cornerTh);

  options.forEach((opt, i) => {
    const colId  = _prefix + '-col-' + i;
    const radioId = _prefix + '-table-radio-' + i;

    const th = document.createElement('th');
    th.scope    = 'col';
    th.id       = colId;
    th.className = 'dm-th dm-th--option';
    th.setAttribute('aria-selected', 'false');

    const lbl = document.createElement('label');
    lbl.htmlFor   = radioId;
    lbl.className = 'dm-col-label';

    const radio = document.createElement('input');
    radio.type      = 'radio';
    radio.id        = radioId;
    radio.name      = _prefix + '-table-opt';
    radio.value     = opt.value;
    radio.className = 'dm-table-radio';
    radio.setAttribute('aria-label', opt.label);
    radio.addEventListener('change', _onTableRadioChange);

    const labelText = document.createElement('span');
    labelText.className  = 'dm-col-label__text';
    labelText.textContent = opt.label;

    lbl.appendChild(radio);
    lbl.appendChild(labelText);
    th.appendChild(lbl);
    headerRow.appendChild(th);
  });

  thead.appendChild(headerRow);
  table.appendChild(thead);

  /* tbody — one row per criterion */
  const tbody = document.createElement('tbody');

  criteria.forEach(criterion => {
    const tr = document.createElement('tr');
    tr.className = 'dm-row';

    /* Row header */
    const rowTh = document.createElement('th');
    rowTh.scope     = 'row';
    rowTh.className = 'dm-th dm-th--criterion';
    rowTh.id        = _prefix + '-row-' + criterion.id;

    const rowLabel = document.createElement('span');
    rowLabel.className   = 'dm-criterion__label';
    rowLabel.textContent = criterion.label;
    rowTh.appendChild(rowLabel);

    if (criterion.description) {
      const desc = document.createElement('span');
      desc.className   = 'dm-criterion__desc';
      desc.textContent = criterion.description;
      rowTh.appendChild(desc);
    }
    tr.appendChild(rowTh);

    /* Data cells — one per option */
    options.forEach((opt, i) => {
      const colId  = _prefix + '-col-' + i;
      const rating = (opt.ratings || []).find(r => r.criterionId === criterion.id) ||
                     { tier: 'limited', rationale: '' };
      const td = document.createElement('td');
      td.className = 'dm-cell dm-cell--' + (rating.tier || 'limited');
      td.setAttribute('headers', colId + ' ' + _prefix + '-row-' + criterion.id);
      td.innerHTML = _ratingContent(rating);
      tr.appendChild(td);
    });

    tbody.appendChild(tr);
  });

  table.appendChild(tbody);
  wrap.appendChild(table);
  return wrap;
}

/* ---- Build the mobile accordion structure ---- */
function _buildMobileAccordion(options, criteria) {
  const wrap = document.createElement('div');
  wrap.className = 'dm-mobile';
  wrap.setAttribute('aria-hidden', 'true');  /* hidden until mobile MQ matches */
  wrap.setAttribute('role', 'radiogroup');
  wrap.setAttribute('aria-label', 'Select a design option');

  options.forEach((opt, i) => {
    const panelId  = _prefix + '-acc-panel-' + i;
    const radioId  = _prefix + '-acc-radio-' + i;
    const toggleId = _prefix + '-acc-toggle-' + i;

    const item = document.createElement('div');
    item.className  = 'dm-acc-item';
    item.dataset.value = opt.value;

    /* Item header: radio label + expand toggle */
    const header = document.createElement('div');
    header.className = 'dm-acc-item__header';

    /* Radio input for selection */
    const radio = document.createElement('input');
    radio.type      = 'radio';
    radio.id        = radioId;
    radio.name      = _prefix + '-acc-opt';
    radio.value     = opt.value;
    radio.className = 'dm-acc-radio';
    radio.addEventListener('change', _onAccRadioChange);

    const radioLabel = document.createElement('label');
    radioLabel.htmlFor   = radioId;
    radioLabel.className = 'dm-acc-item__label';
    radioLabel.textContent = opt.label;

    /* Expand/collapse toggle */
    const toggle = document.createElement('button');
    toggle.type        = 'button';
    toggle.id          = toggleId;
    toggle.className   = 'dm-acc-toggle';
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-controls', panelId);
    toggle.setAttribute('aria-label', 'Show criteria for ' + opt.label);
    toggle.innerHTML =
      '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" ' +
      'aria-hidden="true" focusable="false">' +
      '<path d="M3 4.5l3 3 3-3" stroke="currentColor" stroke-width="1.5" ' +
      'stroke-linecap="round" stroke-linejoin="round"/></svg>';
    toggle.addEventListener('click', () => _onAccToggle(panelId, toggle));

    header.appendChild(radio);
    header.appendChild(radioLabel);
    header.appendChild(toggle);

    /* Criteria panel — hidden until toggled */
    const panel = document.createElement('div');
    panel.id        = panelId;
    panel.className = 'dm-acc-panel';
    panel.hidden    = true;

    const dl = document.createElement('dl');
    dl.className = 'dm-acc-criteria';

    criteria.forEach(criterion => {
      const rating = (opt.ratings || []).find(r => r.criterionId === criterion.id) ||
                     { tier: 'limited', rationale: '' };

      const dt = document.createElement('dt');
      dt.className   = 'dm-acc-criterion__label';
      dt.textContent = criterion.label;

      const dd = document.createElement('dd');
      dd.className = 'dm-acc-criterion__rating dm-cell--' + (rating.tier || 'limited');
      dd.innerHTML  = _ratingContent(rating);

      dl.appendChild(dt);
      dl.appendChild(dd);
    });

    panel.appendChild(dl);
    item.appendChild(header);
    item.appendChild(panel);
    wrap.appendChild(item);
  });

  return wrap;
}

/* ---- Build the submit controls ---- */
function _buildControls() {
  const wrap = document.createElement('div');
  wrap.className = 'dm-controls';

  _errorEl = document.createElement('p');
  _errorEl.id        = _prefix + '-error';
  _errorEl.className = 'dm-error field-error';
  _errorEl.setAttribute('aria-live', 'polite');
  _errorEl.hidden    = true;
  _errorEl.textContent = 'Please select an option before submitting.';

  _submitBtn = document.createElement('button');
  _submitBtn.type      = 'button';
  _submitBtn.id        = _prefix + '-submit';
  _submitBtn.className = 'btn btn--primary dm-submit';
  _submitBtn.textContent = 'Evaluate My Choice';
  _submitBtn.addEventListener('click', _onSubmit);

  wrap.appendChild(_errorEl);
  wrap.appendChild(_submitBtn);
  return wrap;
}

/* ---- Build the feedback region ---- */
function _buildFeedback() {
  _feedbackEl = document.createElement('div');
  _feedbackEl.id        = _prefix + '-feedback';
  _feedbackEl.className = 'dm-feedback';
  _feedbackEl.hidden    = true;

  _feedbackHdgEl = document.createElement('h3');
  _feedbackHdgEl.id        = _prefix + '-feedback-hdg';
  _feedbackHdgEl.className = 'dm-feedback__heading';
  _feedbackHdgEl.setAttribute('tabindex', '-1');

  _feedbackBodyEl = document.createElement('p');
  _feedbackBodyEl.className = 'dm-feedback__explanation';

  _feedbackConEl = document.createElement('p');
  _feedbackConEl.className = 'dm-feedback__consequence';

  _reviseBtn = document.createElement('button');
  _reviseBtn.type      = 'button';
  _reviseBtn.id        = _prefix + '-revise';
  _reviseBtn.className = 'btn btn--secondary dm-revise';
  _reviseBtn.textContent = 'Revise My Choice';
  _reviseBtn.addEventListener('click', _onRevise);

  _feedbackEl.appendChild(_feedbackHdgEl);
  _feedbackEl.appendChild(_feedbackBodyEl);
  _feedbackEl.appendChild(_feedbackConEl);
  _feedbackEl.appendChild(_reviseBtn);
  return _feedbackEl;
}

/* ---- Sync desktop column header visual state to current selection ---- */
function _syncDesktopVisuals() {
  if (!_desktopEl) return;
  _desktopEl.querySelectorAll('.dm-th--option').forEach(th => {
    const radio = th.querySelector('.dm-table-radio');
    const isSelected = radio && radio.value === _selectedValue;
    th.setAttribute('aria-selected', isSelected ? 'true' : 'false');
    th.classList.toggle('dm-th--selected', !!isSelected);
  });
}

/* ---- Sync mobile accordion item visual state ---- */
function _syncMobileVisuals() {
  if (!_mobileEl) return;
  _mobileEl.querySelectorAll('.dm-acc-item').forEach(item => {
    const isSelected = item.dataset.value === _selectedValue;
    item.classList.toggle('dm-acc-item--selected', isSelected);
    const accRadio = item.querySelector('.dm-acc-radio');
    if (accRadio) accRadio.checked = isSelected;
  });
}

/* ---- Update enable/disable state of submit button ---- */
function _syncSubmitState() {
  if (!_submitBtn) return;
  const canSubmit = _selectedValue !== null &&
                    (_state === STATE.SELECTED || _state === STATE.REVISED);
  _submitBtn.disabled = !canSubmit;
}

/* ---- Handle option selection (from either view) ---- */
function _selectOption(value) {
  _selectedValue = value;
  _state = (_state === STATE.SUBMITTED) ? STATE.REVISED : STATE.SELECTED;

  /* Keep the desktop table radio in sync with any accordion selection */
  if (_desktopEl) {
    const tableRadio = _desktopEl.querySelector(
      '.dm-table-radio[value="' + value + '"]'
    );
    if (tableRadio) tableRadio.checked = true;
  }

  _syncDesktopVisuals();
  _syncMobileVisuals();
  _syncSubmitState();

  /* Hide stale error */
  if (_errorEl) _errorEl.hidden = true;

  /* Announce — spec: "Option selected." */
  const opt = (_config.options || []).find(o => o.value === value);
  const label = opt ? opt.label : 'Option';
  _announce(label + ' selected.');
}

/* ---- Table radio change ---- */
function _onTableRadioChange(e) {
  _selectOption(e.target.value);
}

/* ---- Accordion radio change ---- */
function _onAccRadioChange(e) {
  /* Sync the corresponding table radio */
  if (_desktopEl) {
    const tableRadio = _desktopEl.querySelector(
      '.dm-table-radio[value="' + e.target.value + '"]'
    );
    if (tableRadio) tableRadio.checked = true;
  }
  _selectOption(e.target.value);
}

/* ---- Accordion expand/collapse toggle ---- */
function _onAccToggle(panelId, toggleBtn) {
  const panel = document.getElementById(panelId);
  if (!panel) return;
  const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
  toggleBtn.setAttribute('aria-expanded', isExpanded ? 'false' : 'true');
  panel.hidden = isExpanded;
}

/* ---- Submit handler ---- */
function _onSubmit() {
  if (!_selectedValue) {
    if (_errorEl) {
      _errorEl.hidden = false;
      /* rAF to ensure aria-live fires even if element was already visible */
      _errorEl.textContent = '';
      requestAnimationFrame(() => {
        _errorEl.textContent = 'Please select an option before submitting.';
      });
    }
    return;
  }

  const opt = (_config.options || []).find(o => o.value === _selectedValue);
  if (!opt || !opt.feedback) return;

  _state = STATE.SUBMITTED;

  /* Disable radios to lock the selection */
  if (_desktopEl) {
    _desktopEl.querySelectorAll('.dm-table-radio').forEach(r => { r.disabled = true; });
  }
  if (_mobileEl) {
    _mobileEl.querySelectorAll('.dm-acc-radio').forEach(r => { r.disabled = true; });
    _mobileEl.querySelectorAll('.dm-acc-toggle').forEach(b => { b.disabled = true; });
  }

  _submitBtn.disabled  = true;
  _submitBtn.textContent = 'Submitted';

  /* Populate and reveal feedback */
  _feedbackHdgEl.textContent  = opt.feedback.heading     || '';
  _feedbackBodyEl.textContent = opt.feedback.explanation || '';
  _feedbackConEl.textContent  = opt.feedback.consequence || '';
  _feedbackEl.hidden = false;

  /* Persist */
  _saveState();

  /* Announce then focus (two-signal) — spec: "Feedback available." */
  _announce('Feedback available.');
  requestAnimationFrame(() => {
    setTimeout(() => { _feedbackHdgEl.focus(); }, 100);
  });
}

/* ---- Revise handler ---- */
function _onRevise() {
  _state = STATE.REVISED;

  /* Re-enable radios */
  if (_desktopEl) {
    _desktopEl.querySelectorAll('.dm-table-radio').forEach(r => { r.disabled = false; });
  }
  if (_mobileEl) {
    _mobileEl.querySelectorAll('.dm-acc-radio').forEach(r => { r.disabled = false; });
    _mobileEl.querySelectorAll('.dm-acc-toggle').forEach(b => { b.disabled = false; });
  }

  _submitBtn.disabled    = false;
  _submitBtn.textContent = 'Evaluate My Choice';
  _feedbackEl.hidden     = true;

  /* Announce — spec: "Decision revised." */
  _announce('Decision revised. Select a new option and submit again.');
}

/* ---- matchMedia change — swap aria-hidden between views ---- */
function _onMediaChange(mq) {
  const isMobile = mq.matches;
  if (_desktopEl) _desktopEl.setAttribute('aria-hidden', isMobile  ? 'true' : 'false');
  if (_mobileEl)  _mobileEl.setAttribute('aria-hidden',  !isMobile ? 'true' : 'false');
}

/* ---- Optional localStorage persistence ---- */
function _saveState() {
  if (!_config.storageKey) return;
  try {
    setItem(_config.storageKey, JSON.stringify({
      selectedValue: _selectedValue,
      state:         _state,
    }));
  } catch (_) { /* storage unavailable — silent */ }
}

function _restoreState() {
  if (!_config.storageKey) return;
  const stored = getItem(_config.storageKey);
  if (!stored) return;
  try {
    const { selectedValue, state } = JSON.parse(stored);
    if (selectedValue) {
      _selectedValue = selectedValue;
      _syncDesktopVisuals();
      _syncMobileVisuals();
    }
    if (state === STATE.SUBMITTED && selectedValue) {
      /* Re-run submit logic silently to restore feedback display */
      const opt = (_config.options || []).find(o => o.value === selectedValue);
      if (opt && opt.feedback) {
        _state = STATE.SUBMITTED;
        if (_desktopEl) _desktopEl.querySelectorAll('.dm-table-radio').forEach(r => { r.disabled = true; });
        if (_mobileEl)  _mobileEl.querySelectorAll('.dm-acc-radio, .dm-acc-toggle').forEach(r => { r.disabled = true; });
        _submitBtn.disabled    = true;
        _submitBtn.textContent = 'Submitted';
        _feedbackHdgEl.textContent  = opt.feedback.heading     || '';
        _feedbackBodyEl.textContent = opt.feedback.explanation || '';
        _feedbackConEl.textContent  = opt.feedback.consequence || '';
        _feedbackEl.hidden = false;
      }
    } else if (selectedValue) {
      _state = STATE.SELECTED;
      _syncSubmitState();
    }
  } catch (_) { /* corrupted storage — start fresh */ }
}

/* ============================================================
   PUBLIC API
   ============================================================ */

/**
 * init(config)
 * Builds the full decision matrix DOM inside config.containerId,
 * wires all event handlers, and starts the matchMedia viewport listener.
 * Safe to call multiple times; only the first call performs setup.
 *
 * @param {Object}   config
 * @param {string}   config.containerId  — id of the host element
 * @param {Array}    config.criteria     — ordered criterion objects:
 *                                         { id, label, description? }
 * @param {Array}    config.options      — option objects:
 *                                         { id, value, label, ratings[], feedback{} }
 *                   ratings[]:           { criterionId, tier, rationale }
 *                   tier:                'strong' | 'adequate' | 'limited'
 *                   feedback:            { heading, explanation, consequence }
 * @param {string}   [config.storageKey] — localStorage key; omit to skip persistence
 *
 * @throws {Error}   If config.containerId is not found in the DOM.
 */
function init(config) {
  if (_ready) return;

  _containerEl = document.getElementById(config.containerId);
  if (!_containerEl) {
    throw new Error('decisionMatrix: #' + config.containerId + ' not found in DOM.');
  }

  _config = config;
  _prefix = config.containerId;

  const options  = config.options  || [];
  const criteria = config.criteria || [];

  /* Build and append all structures */
  _containerEl.textContent = '';   /* clear placeholder */

  _desktopEl = _buildDesktopTable(options, criteria);
  _mobileEl  = _buildMobileAccordion(options, criteria);

  _containerEl.appendChild(_desktopEl);
  _containerEl.appendChild(_mobileEl);
  _containerEl.appendChild(_buildControls());
  _containerEl.appendChild(_buildFeedback());

  /* Disable submit until selection is made */
  _syncSubmitState();
  if (_submitBtn) _submitBtn.disabled = true;

  /* matchMedia — set initial aria-hidden and listen for changes */
  if (typeof window !== 'undefined' && window.matchMedia) {
    _mobileMQ = window.matchMedia(MOBILE_MQ_STRING);
    _onMediaChange(_mobileMQ);
    _mobileMQ.addEventListener('change', _onMediaChange);
  }

  /* Restore any previously saved state */
  _restoreState();

  _ready = true;
}

/**
 * getState()
 * Returns the current decision matrix state.
 * Safe to call before init() — returns 'unselected'.
 *
 * @returns {'unselected'|'selected'|'submitted'|'revised'}
 */
function getState() {
  return _state;
}

export { init, getState };
