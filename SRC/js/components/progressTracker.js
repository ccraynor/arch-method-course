/* =============================================================================
   progressTracker.js
   Component Contract — Progress Tracker
   Implements Section 9 of the Master Accessibility, Usability, and Inclusive
   Design Specification (Version 5.0).

   SPEC REFERENCE
   Section 9  — Component Contract: Progress Tracker
   Section 5  — Progress Visibility and State Announcements
   Section 3  — Required ARIA: aria-current='step' on current step only
   Section 7  — Focus order: progress tracker is position 3 (after skip links, h1)
   Section 8  — Announcements must fire within 500ms of state change
   Section 16 — Instant state change — no animation

   INPUTS
   • currentModule    (number  1–4)
   • currentLesson    (string  e.g. '1.1', '2.3')
   • currentPhase     (number  ARCH Phase)
   • currentStep      (number  ARCH Step)
   • currentScreen    (number  screen position within lesson)
   • totalScreens     (number  total screens in lesson)
   • completedScreens (number[] screens completed in this lesson, e.g. [1,2,3])

   OUTPUTS
   • Location display  — "Module X of 4 | Lesson X | Phase X | Step X | Screen X of Y"
   • Step indicator    — per-screen markers with current / completed / upcoming state
   • Screen reader announcements — per state change, within 500ms

   STATES (per step indicator marker)
   • current   — highlighted, aria-current="step", announces "Current step."
   • completed — check icon, distinct color class, announces "Completed."
   • upcoming  — subdued, announces "Not yet completed."

   ARIA REQUIREMENTS
   • aria-current="step" on the current step marker ONLY
   • No color-only state communication (state also in aria-label)
   • Keyboard accessible (container has tabindex="-1" for skip-link target)
   • role="navigation" on step indicator with aria-label="Screen progress"

   PERFORMANCE
   • update() must complete DOM writes within 250ms of call
   • Announcements fire via requestAnimationFrame (~16ms, well within 500ms)

   DOM CONTRACT
   The following elements must exist before init() is called.
   These IDs are set in base.html and all screen templates — do not rename them.

   Required elements:
     #progress-tracker      <div role="group" aria-label="Course progress" tabindex="-1">
     #pt-module             <span> — receives module number text
     #pt-lesson             <span> — receives lesson identifier text
     #pt-phase              <span> — receives phase number text
     #pt-step               <span> — receives step number text
     #pt-screen             <span> — receives current screen number text
     #pt-screen-total       <span> — receives total screens text
     #sr-announcer          <div role="status" aria-live="polite" aria-atomic="true">

   This component appends #pt-steps-nav (a <nav> element) to #progress-tracker
   on init(). If #pt-steps-nav already exists, it is reused. It is safe to call
   init() multiple times; only the first call performs the append.

   USAGE
   ─────────────────────────────────────────────────────────────────────────────
   import { init, update, getState } from './components/progressTracker.js';

   // 1. Call init() once per page, after DOM is ready.
   init();

   // 2. Call update() with the current screen data.
   //    completedScreens is an array of screen numbers the learner has visited.
   update({
     module:           2,
     lesson:           '2.3',
     phase:            4,
     step:             11,
     screen:           4,
     total:            6,
     completedScreens: [1, 2, 3]
   });
   ─────────────────────────────────────────────────────────────────────────────
   ============================================================================= */

const REQUIRED_IDS = [
  'progress-tracker',
  'pt-module',
  'pt-lesson',
  'pt-phase',
  'pt-step',
  'pt-screen',
  'pt-screen-total',
  'sr-announcer',
];

/* Internal state */
let _ready = false;
let _state = {
  module:           null,
  lesson:           null,
  phase:            null,
  step:             null,
  screen:           null,
  total:            null,
  completedScreens: [],
};

/* ---- DOM helpers ---- */
function _el(id) {
  return document.getElementById(id);
}

function _require(id) {
  const el = _el(id);
  if (!el) throw new Error('progressTracker: required element #' + id + ' not found in DOM.');
  return el;
}

/* ---- Announcement helper ---- */
function _announce(message) {
  const region = _el('sr-announcer');
  if (!region || !message) return;
  /* Clear first so identical consecutive messages still fire */
  region.textContent = '';
  requestAnimationFrame(() => { region.textContent = message; });
}

/* ---- Determine step state ---- */
function _stepState(screenNum, currentScreen, completedScreens) {
  if (screenNum === currentScreen) return 'current';
  if (completedScreens.includes(screenNum)) return 'completed';
  return 'upcoming';
}

/* ---- Build accessible label for a step marker ---- */
function _stepLabel(screenNum, state) {
  const base = 'Screen ' + screenNum;
  if (state === 'current')   return base + ': Current step.';
  if (state === 'completed') return base + ': Completed.';
  return base + ': Not yet completed.';
}

/* ---- Render or update the step indicator nav ---- */
function _renderSteps(screen, total, completedScreens) {
  const container = _el('progress-tracker');
  if (!container) return;

  /* Create or reuse #pt-steps-nav */
  let nav = _el('pt-steps-nav');
  if (!nav) {
    nav = document.createElement('nav');
    nav.id          = 'pt-steps-nav';
    nav.className   = 'pt-steps-nav';
    nav.setAttribute('aria-label', 'Screen progress');
    container.appendChild(nav);
  }

  if (!total || total < 1) {
    nav.hidden = true;
    return;
  }

  nav.hidden = false;

  /* Build step list */
  const ol = document.createElement('ol');
  ol.className = 'pt-step-list';
  ol.setAttribute('aria-label', 'Screens in this lesson');

  for (let i = 1; i <= total; i++) {
    const state = _stepState(i, screen, completedScreens);
    const li    = document.createElement('li');
    li.className = 'pt-step pt-step--' + state;

    /* aria-current="step" on current only — spec Section 3 */
    if (state === 'current') {
      li.setAttribute('aria-current', 'step');
    }
    li.setAttribute('aria-label', _stepLabel(i, state));

    /* Icon — aria-hidden because state is in aria-label, not color alone */
    const icon = document.createElement('span');
    icon.className       = 'pt-step__icon';
    icon.setAttribute('aria-hidden', 'true');
    if (state === 'completed') {
      /* Inline SVG checkmark — no external dependency */
      icon.innerHTML = '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" ' +
        'focusable="false" aria-hidden="true">' +
        '<path d="M2 6l3 3 5-5" stroke="currentColor" stroke-width="1.75" ' +
        'stroke-linecap="round" stroke-linejoin="round"/></svg>';
    } else if (state === 'current') {
      icon.innerHTML = '<svg width="8" height="8" viewBox="0 0 8 8" fill="none" ' +
        'focusable="false" aria-hidden="true">' +
        '<circle cx="4" cy="4" r="3" fill="currentColor"/></svg>';
    } else {
      icon.innerHTML = '<svg width="8" height="8" viewBox="0 0 8 8" fill="none" ' +
        'focusable="false" aria-hidden="true">' +
        '<circle cx="4" cy="4" r="3" stroke="currentColor" stroke-width="1.25"/></svg>';
    }

    /* Visible screen number — aria-hidden because full label is on the <li> */
    const label = document.createElement('span');
    label.className = 'pt-step__label';
    label.setAttribute('aria-hidden', 'true');
    label.textContent = String(i);

    li.appendChild(icon);
    li.appendChild(label);
    ol.appendChild(li);
  }

  /* Replace previous list to avoid incremental DOM diffing complexity */
  nav.replaceChildren(ol);
}

/* ---- Build navigation announcement string ---- */
function _buildAnnouncement(data) {
  const parts = [];
  if (data.module != null) parts.push('Module ' + data.module + ' of 4');
  if (data.lesson != null) parts.push('Lesson ' + data.lesson);
  if (data.phase  != null) parts.push('Phase '  + data.phase);
  if (data.step   != null) parts.push('Step '   + data.step);
  if (data.screen != null && data.total != null) {
    parts.push('Screen ' + data.screen + ' of ' + data.total);
  }
  return parts.join('. ') + '.';
}

/* ============================================================
   PUBLIC API
   ============================================================ */

/**
 * init()
 * Validates DOM contract and appends the step indicator nav to #progress-tracker.
 * Must be called once per page before update().
 * Safe to call multiple times; only the first call performs setup.
 *
 * @throws {Error} If any required DOM element is missing.
 */
function init() {
  if (_ready) return;

  /* Validate all required elements — throws on first missing ID */
  REQUIRED_IDS.forEach(_require);

  /* Ensure the step nav container exists (appended to #progress-tracker) */
  if (!_el('pt-steps-nav')) {
    const nav = document.createElement('nav');
    nav.id        = 'pt-steps-nav';
    nav.className = 'pt-steps-nav';
    nav.setAttribute('aria-label', 'Screen progress');
    nav.hidden    = true;             /* hidden until update() provides total */
    _require('progress-tracker').appendChild(nav);
  }

  _ready = true;
}

/**
 * update(data)
 * Updates all progress tracker fields and re-renders the step indicator.
 * Announces the current location to screen readers within 500ms.
 *
 * @param {Object}   data
 * @param {number}   data.module            - Current module (1–4)
 * @param {string}   data.lesson            - Lesson identifier (e.g. '1.1', '2.3')
 * @param {number}   data.phase             - Current ARCH Phase number
 * @param {number}   data.step              - Current ARCH Step number
 * @param {number}   data.screen            - Current screen number within lesson
 * @param {number}   data.total             - Total screens in current lesson
 * @param {number[]} [data.completedScreens] - Screen numbers completed in this lesson
 * @param {boolean}  [data.announce]        - Announce to AT (default: true)
 */
function update(data) {
  if (!_ready) {
    console.warn('progressTracker.update() called before init(). Call init() first.');
    return;
  }

  const {
    module,
    lesson,
    phase,
    step,
    screen,
    total,
    completedScreens = [],
    announce         = true,
  } = data;

  /* --- Update location bar text --- */
  const startTime = performance.now();

  if (module != null) _el('pt-module').textContent       = module;
  if (lesson != null) _el('pt-lesson').textContent       = lesson;
  if (phase  != null) _el('pt-phase').textContent        = phase;
  if (step   != null) _el('pt-step').textContent         = step;
  if (screen != null) _el('pt-screen').textContent       = screen;
  if (total  != null) _el('pt-screen-total').textContent = total;

  /* --- Render step indicator --- */
  _renderSteps(screen, total, completedScreens);

  /* --- Warn if 250ms budget exceeded (spec Section 9) --- */
  const elapsed = performance.now() - startTime;
  if (elapsed > 250) {
    console.warn('progressTracker.update() exceeded 250ms budget (' + elapsed.toFixed(1) + 'ms).');
  }

  /* --- Persist state --- */
  _state = { module, lesson, phase, step, screen, total, completedScreens };

  /* --- Announce to AT within 500ms (spec Section 8) --- */
  if (announce) {
    _announce(_buildAnnouncement(data));
  }
}

/**
 * announceStepState(screenNum)
 * Manually announce the state of a specific step.
 * Useful when the step indicator is scrolled into view by the learner
 * and they need AT confirmation of which step is current/completed/upcoming.
 *
 * @param {number} screenNum - The screen number to announce (1-based)
 */
function announceStepState(screenNum) {
  const state = _stepState(screenNum, _state.screen, _state.completedScreens);
  _announce(_stepLabel(screenNum, state));
}

/**
 * getState()
 * Returns a shallow copy of the current tracker state.
 * Safe to call before init() — returns the default empty state.
 *
 * @returns {{ module, lesson, phase, step, screen, total, completedScreens }}
 */
function getState() {
  return { ..._state, completedScreens: [...(_state.completedScreens || [])] };
}

export { init, update, announceStepState, getState };
