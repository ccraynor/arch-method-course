/* =============================================================================
   compareExpertPanel.js
   Component Contract — Compare-to-Expert Panel
   Implements Section 12 of the Master Accessibility, Usability, and Inclusive
   Design Specification (Version 5.0).

   SPEC REFERENCE
   Section 12 — Component Contract: Compare-to-Expert Panel
   Section 16 — Compare to Expert keyboard/SR/motion row:
                   Keyboard: Tab between panels, all content keyboard accessible
                   SR:       "Expert comparison available.
                              Linear reading mode always available."
                   Motion:   Instant layout change — no transition animation

   INPUTS
   • Learner Response   — plain text pulled from localStorage via config.source
   • Comparison Criteria — authored in the screen HTML; not managed by this component
   • Expert Response    — authored in #expert-content; gated until revealed

   OUTPUTS
   • Comparison View    — four panels in required reading order:
                          Learner Response, Comparison Criteria,
                          Expert Response, Reflection
   • Reflection Prompt  — calibration notes textarea with blur/manual save

   STATES  (layout states, returned by getState())
   • desktop-side-by-side — CSS grid, 2-column layout; linear mode off
   • mobile-stacked       — single column at narrow viewport (CSS-driven)
   • linear-accessible    — .calibration-layout--linear class active;
                            all panels full-width in DOM order

   ARIA REQUIREMENTS
   • DOM order is always: Learner → Criteria → Expert → Reflection
     CSS grid reorders visually on desktop without changing DOM
   • Linear mode available at every breakpoint via #btn-linear-mode
     (aria-pressed reflects current mode; label text updates on toggle)
   • Reveal button: aria-controls="expert-content", aria-expanded
   • Expert heading (#expert-heading): tabindex="-1"; receives focus on reveal
   • Two-signal reveal sequence: #sr-announcer fires first via rAF,
     then #expert-heading receives focus after 100ms (spec Section 12)
   • Announcement text: "Expert comparison available."
   • Notes save status: aria-live="off" for blur/auto-saves,
     aria-live="polite" for manual saves (avoids interrupting reading)

   PERFORMANCE
   • init() completes all DOM reads/writes synchronously
   • Learner response populated before first paint (called from module script)
   • Expert reveal: hidden removed in <1ms; announcement fires in ~16ms (rAF)

   DOM CONTRACT
   The following elements must exist before init() is called.
   These IDs and classes are set in calibration-template.html — do not rename.

   Required elements:
     #calibration-layout      <div>     — receives/loses .calibration-layout--linear
     #btn-linear-mode         <button>  — aria-pressed, has .toggle-label child span
     #btn-reveal-expert       <button>  — aria-controls="expert-content", aria-expanded
     #expert-gate             <div>     — visible until reveal
     #expert-content          <div hidden> — shown on reveal
     #expert-heading          <h2 tabindex="-1"> — receives focus on reveal
     #learner-response-body   <div>     — populated with learner response by init()
     #calibration-notes       <textarea> — calibration notes input
     #btn-save-notes          <button>  — manual save trigger
     #notes-save-status       <p aria-live="polite"> — save state display
     #sr-announcer            <div role="status" aria-live="polite" aria-atomic="true">

   USAGE
   ─────────────────────────────────────────────────────────────────────────────
   import { init, reveal, setLinearMode, getState }
     from './components/compareExpertPanel.js';

   // Call init() once per page from the screen-specific module script.
   init({
     screenId: 'module1_lesson1_cal1',
     source: {
       key:           'reflection_module1_lesson1',
       parse:         stored => JSON.parse(stored)['reflection-field-1'] || '',
       label:         'Lesson 1.1 Reflection',
       fallbackHref:  'module1-lesson1-reflection.html',
       fallbackLabel: 'Lesson 1.1',
     },
   });
   ─────────────────────────────────────────────────────────────────────────────
   ============================================================================= */

import { getItem, setItem } from '../storage.js';

const STATE = Object.freeze({
  SIDE_BY_SIDE: 'desktop-side-by-side',
  MOBILE:       'mobile-stacked',
  LINEAR:       'linear-accessible',
});

/* Internal state */
let _ready        = false;
let _screenId     = null;
let _linearMode   = false;
let _expertShown  = false;

/* Cached element references — set by init() */
let _layoutEl         = null;
let _btnLinearEl      = null;
let _linearLabelEl    = null;
let _btnRevealEl      = null;
let _expertGateEl     = null;
let _expertContentEl  = null;
let _expertHeadingEl  = null;
let _learnerBodyEl    = null;
let _notesAreaEl      = null;
let _btnSaveNotesEl   = null;
let _notesSaveStatusEl = null;

/* matchMedia for mobile detection — set once, reused in getState() */
const _mobileMQ = typeof window !== 'undefined' && window.matchMedia
  ? window.matchMedia('(max-width: 599px)')
  : null;

/* ---- DOM helper ---- */
function _el(id) {
  return document.getElementById(id);
}

/* ---- Global announcement helper (two-signal pattern) ---- */
function _announce(message) {
  const region = _el('sr-announcer');
  if (!region || !message) return;
  region.textContent = '';
  requestAnimationFrame(() => { region.textContent = message; });
}

/* ---- HTML escape for learner-supplied text inserted via innerHTML ---- */
function _escapeHtml(str) {
  return str
    .replace(/&/g,  '&amp;')
    .replace(/</g,  '&lt;')
    .replace(/>/g,  '&gt;')
    .replace(/"/g,  '&quot;');
}

/* ---- Populate #learner-response-body from localStorage ---- */
function _loadLearnerResponse(source) {
  if (!_learnerBodyEl || !source) return;
  _learnerBodyEl.textContent = '';   /* clear any placeholder */

  const stored = getItem(source.key);

  /* Empty state — no stored value */
  if (!stored) {
    const empty = document.createElement('p');
    empty.className = 'learner-response__empty';
    const link = document.createElement('a');
    link.href        = source.fallbackHref  || '#';
    link.textContent = 'Return to ' + (source.fallbackLabel || 'the previous activity');
    empty.appendChild(document.createTextNode('No saved response found for this activity. '));
    empty.appendChild(link);
    empty.appendChild(document.createTextNode(
      ' to complete it, or continue to view the expert response.'
    ));
    _learnerBodyEl.appendChild(empty);
    return;
  }

  /* Parse the stored value into displayable text */
  let text = '';
  try {
    text = source.parse(stored);
  } catch (_) {
    text = stored;
  }

  /* Empty state — parse returned blank */
  if (!text || !text.trim()) {
    const empty = document.createElement('p');
    empty.className = 'learner-response__empty';
    empty.textContent =
      'Your saved response appears to be empty. You may have left that field blank.';
    _learnerBodyEl.appendChild(empty);
    return;
  }

  /* Quote block — preserve paragraph breaks from textarea line breaks */
  const quote = document.createElement('blockquote');
  quote.className = 'learner-response__quote';
  quote.innerHTML = text.split('\n')
    .filter(line => line.trim())
    .map(line => '<p>' + _escapeHtml(line) + '</p>')
    .join('');

  const citation = document.createElement('p');
  citation.className = 'learner-response__source';
  citation.textContent = 'Saved from ' + (source.label || 'a previous activity');

  _learnerBodyEl.appendChild(quote);
  _learnerBodyEl.appendChild(citation);
}

/* ---- Restore saved calibration notes from localStorage ---- */
function _restoreNotes() {
  if (!_screenId || !_notesAreaEl) return;
  const stored  = getItem('calibration_' + _screenId + '_notes');
  const savedAt = getItem('calibration_' + _screenId + '_savedAt');
  if (stored !== null) {
    _notesAreaEl.value = stored;
    if (_notesSaveStatusEl) {
      _notesSaveStatusEl.textContent = savedAt
        ? 'Last saved at ' + savedAt
        : 'Draft restored';
    }
  }
}

/* ---- Save calibration notes to localStorage ----
   source: 'blur' | 'manual' | 'exit'
   Only manual saves announce to the global sr-announcer.
   Blur/exit saves update the status element silently. */
function _saveNotes(source) {
  if (!_screenId || !_notesAreaEl) return;
  try {
    const value     = _notesAreaEl.value;
    const timestamp = new Date().toLocaleTimeString([], {
      hour: '2-digit', minute: '2-digit',
    });
    setItem('calibration_' + _screenId + '_notes',   value);
    setItem('calibration_' + _screenId + '_savedAt', timestamp);

    const message  = 'Saved at ' + timestamp;
    const announce = source === 'manual';

    if (_notesSaveStatusEl) {
      /* Silent for blur/exit; vocal for manual (aria-live swap pattern) */
      _notesSaveStatusEl.setAttribute('aria-live', announce ? 'polite' : 'off');
      _notesSaveStatusEl.textContent = '';
      requestAnimationFrame(() => { _notesSaveStatusEl.textContent = message; });
    }

    if (announce) _announce(message);
  } catch (_) {
    if (_notesSaveStatusEl) {
      _notesSaveStatusEl.setAttribute('aria-live', 'polite');
      _notesSaveStatusEl.textContent = 'Save failed. Storage may be unavailable.';
    }
  }
}

/* ---- Linear mode toggle handler ---- */
function _onLinearToggle() {
  _linearMode = !_linearMode;
  _btnLinearEl.setAttribute('aria-pressed', String(_linearMode));
  _layoutEl.classList.toggle('calibration-layout--linear', _linearMode);
  if (_linearLabelEl) {
    _linearLabelEl.textContent = _linearMode
      ? 'Switch to Side-by-Side View'
      : 'Switch to Linear View';
  }
}

/* ---- Expert reveal handler ----
   Two-signal approach: live region fires first (rAF ~16ms),
   then heading focus fires after 100ms so neither signal is swallowed. */
function _onReveal() {
  if (_expertShown) return;
  _expertShown = true;

  /* Swap gate → content */
  _expertGateEl.setAttribute('hidden', '');
  _expertContentEl.removeAttribute('hidden');

  /* Update button to reflect revealed state */
  _btnRevealEl.setAttribute('aria-expanded', 'true');
  _btnRevealEl.setAttribute('disabled', '');
  _btnRevealEl.textContent = 'Expert Response Shown';

  /* Announcement then focus (spec Section 12, Section 16) */
  const region = _el('sr-announcer');
  if (region) {
    region.textContent = '';
    requestAnimationFrame(() => {
      region.textContent = 'Expert comparison available.';
      setTimeout(() => { _expertHeadingEl.focus(); }, 100);
    });
  } else {
    _expertHeadingEl.focus();
  }
}

/* ============================================================
   PUBLIC API
   ============================================================ */

/**
 * init(config)
 * Wires all event handlers, loads the learner response from localStorage,
 * and restores any saved calibration notes.
 * Must be called once per page from the screen-specific module script,
 * after DOM is ready.
 * Safe to call multiple times; only the first call performs setup.
 *
 * @param {Object}   config
 * @param {string}   config.screenId          — unique screen identifier
 *                                              (used as localStorage key prefix)
 * @param {Object}   config.source            — learner response source descriptor
 * @param {string}   config.source.key        — localStorage key for stored response
 * @param {Function} config.source.parse      — (stored: string) => string
 *                                              Extracts displayable text from stored value.
 *                                              Return empty string for empty-state display.
 * @param {string}   config.source.label      — human-readable source screen name
 *                                              (displayed in citation beneath quote)
 * @param {string}   [config.source.fallbackHref]  — href for empty-state return link
 * @param {string}   [config.source.fallbackLabel] — link text for empty-state message
 *
 * @throws {Error} If any required DOM element is missing.
 */
function init(config) {
  if (_ready) return;

  /* Validate and cache required elements */
  const required = [
    'calibration-layout', 'btn-linear-mode', 'btn-reveal-expert',
    'expert-gate', 'expert-content', 'expert-heading',
    'learner-response-body', 'calibration-notes',
    'btn-save-notes', 'notes-save-status',
  ];
  required.forEach(id => {
    if (!_el(id)) throw new Error('compareExpertPanel: #' + id + ' not found in DOM.');
  });

  _screenId          = config.screenId   || null;
  _layoutEl          = _el('calibration-layout');
  _btnLinearEl       = _el('btn-linear-mode');
  _linearLabelEl     = _btnLinearEl.querySelector('.toggle-label');
  _btnRevealEl       = _el('btn-reveal-expert');
  _expertGateEl      = _el('expert-gate');
  _expertContentEl   = _el('expert-content');
  _expertHeadingEl   = _el('expert-heading');
  _learnerBodyEl     = _el('learner-response-body');
  _notesAreaEl       = _el('calibration-notes');
  _btnSaveNotesEl    = _el('btn-save-notes');
  _notesSaveStatusEl = _el('notes-save-status');

  /* ---- Wire linear mode toggle ---- */
  _btnLinearEl.addEventListener('click', _onLinearToggle);

  /* ---- Wire expert reveal ---- */
  _btnRevealEl.addEventListener('click', _onReveal);

  /* ---- Wire notes save triggers ---- */
  _notesAreaEl.addEventListener('blur',  () => _saveNotes('blur'));
  _btnSaveNotesEl.addEventListener('click', () => _saveNotes('manual'));
  document.querySelectorAll('.btn--nav').forEach(link => {
    link.addEventListener('click', () => _saveNotes('exit'));
  });

  /* ---- Populate learner response and restore notes ---- */
  if (config.source) _loadLearnerResponse(config.source);
  _restoreNotes();

  _ready = true;
}

/**
 * reveal()
 * Programmatically triggers the expert reveal sequence.
 * Equivalent to the learner clicking #btn-reveal-expert.
 * No-op if expert is already shown.
 */
function reveal() {
  if (!_ready) {
    console.warn('compareExpertPanel.reveal() called before init().');
    return;
  }
  _onReveal();
}

/**
 * setLinearMode(active)
 * Programmatically enables or disables linear layout mode.
 * No-op if the requested state already matches the current state.
 *
 * @param {boolean} active — true = linear mode on, false = side-by-side
 */
function setLinearMode(active) {
  if (!_ready) {
    console.warn('compareExpertPanel.setLinearMode() called before init().');
    return;
  }
  if (Boolean(active) === _linearMode) return;
  _onLinearToggle();
}

/**
 * getState()
 * Returns the current layout state.
 * Checks matchMedia for mobile breakpoint; otherwise reflects linear mode toggle.
 * Safe to call before init() — returns 'desktop-side-by-side'.
 *
 * @returns {'desktop-side-by-side'|'mobile-stacked'|'linear-accessible'}
 */
function getState() {
  if (_linearMode) return STATE.LINEAR;
  if (_mobileMQ && _mobileMQ.matches) return STATE.MOBILE;
  return STATE.SIDE_BY_SIDE;
}

export { init, reveal, setLinearMode, getState };
