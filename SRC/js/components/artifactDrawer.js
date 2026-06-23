/* =============================================================================
   artifactDrawer.js
   Component Contract — Artifact Reference Drawer
   Implements Section 10 of the Master Accessibility, Usability, and Inclusive
   Design Specification (Version 5.0).

   SPEC REFERENCE
   Section 10 — Component Contract: Artifact Reference Drawer
   Section 16 — Instant drawer open — no slide animation; AT: "Drawer opened.
                 Artifact status announced. Focus managed."
   Section 17 — Cognitive accessibility: display artifact name, status, last
                 updated, module position
   Section 18 — Working Memory Supports: artifact drawer accessible on every
                 lesson screen

   INPUTS
   • name        (string)  — artifact file name
                             (e.g. 'MRHN_ScopeStatement_v1_2024-09-15')
   • status      (string)  — learner-facing status label
                             (e.g. 'Not Started', 'In Progress', 'Complete')
   • lastUpdated (string)  — display date or ISO date string for the <time> element
   • module      (number)  — current module number (1–4)

   OUTPUTS
   • Artifact View         — structured display: name, status, last updated, module
   • Artifact Status Display — status with icon + text (no color-only communication)

   STATES
   • closed   — drawer element is hidden; no content changes
   • open     — drawer is visible with artifact content rendered
   • loading  — drawer is visible; loading indicator shown; content hidden
   • empty    — drawer is visible; no artifact data; empty state message shown

   ARIA REQUIREMENTS
   • role="dialog" aria-modal="true" set on #artifactDrawer by init()
   • aria-labelledby wired to #artifactDrawer h2.panel-title
   • Escape closes drawer — managed by panelManager.js global keydown listener
   • Focus returns to trigger button on close — managed by panelManager.js
   • Focus trapped within drawer while open (Tab / Shift+Tab cycle)
   • Announcement fires within 500ms of drawer opening (one rAF tick ~16ms):
       "Artifact drawer opened. [Name]. Status: [status]."   — when content shown
       "Artifact drawer opened. No artifact available."       — when empty
       "Artifact drawer opened. Loading artifact data."       — when loading

   PERFORMANCE
   • panelManager.js removes hidden synchronously — drawer is visible in <1ms
   • 300ms open budget (spec Section 10) is therefore always met
   • Announcement fires via requestAnimationFrame (~16ms after drawer opens)

   DOM CONTRACT
   The following elements must exist before init() is called.
   These IDs and classes are set in base.html — do not rename them.

   Required elements:
     #artifactDrawer            <aside> — receives role, aria-modal, aria-labelledby
     #artifactDrawer h2         <h2 class="panel-title"> — receives id for labelledby
     #artifactDrawer .panel-body <div> — populated with content by init()
     #sr-announcer              <div role="status" aria-live="polite" aria-atomic="true">

   This component clears and rebuilds .panel-body content on every init() call.
   The panel header (h2 + close button) is untouched.

   USAGE
   ─────────────────────────────────────────────────────────────────────────────
   import { init, update, setLoading, getState }
     from './components/artifactDrawer.js';

   // 1. Call init() once per page, after DOM is ready.
   init();

   // 2. Call update() with artifact data for the current screen.
   update({
     name:        'MRHN_ScopeStatement_v1_2024-09-15',
     status:      'In Progress',
     lastUpdated: '2024-09-15',
     module:      1,
   });

   // 3. Optionally show a loading state before data is available.
   setLoading(true);
   // ... retrieve data from storage ...
   setLoading(false);
   ─────────────────────────────────────────────────────────────────────────────
   ============================================================================= */

const PANEL_ID    = 'artifactDrawer';
const TITLE_ID    = 'ad-panel-title';   /* assigned to h2 if it lacks an id */
const ANNOUNCER_ID = 'sr-announcer';

const STATE = Object.freeze({
  CLOSED:  'closed',
  OPEN:    'open',
  LOADING: 'loading',
  EMPTY:   'empty',
});

/* Internal state */
let _ready     = false;
let _state     = STATE.CLOSED;
let _isLoading = false;
let _data      = { name: null, status: null, lastUpdated: null, module: null };

/* Cached element references — set by init() */
let _drawerEl     = null;
let _loadingEl    = null;
let _emptyEl      = null;
let _contentEl    = null;
let _nameEl       = null;
let _statusIconEl = null;
let _statusTextEl = null;
let _updatedEl    = null;
let _moduleEl     = null;
let _observer     = null;

/* ---- DOM helper ---- */
function _el(id) {
  return document.getElementById(id);
}

/* ---- Announcement helper ---- */
function _announce(message) {
  const region = _el(ANNOUNCER_ID);
  if (!region || !message) return;
  region.textContent = '';
  requestAnimationFrame(() => { region.textContent = message; });
}

/* ---- Status icon SVGs (aria-hidden — state also communicated in text) ---- */
function _iconCheck() {
  return '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" ' +
    'focusable="false" aria-hidden="true">' +
    '<path d="M2 7l4 4 6-6" stroke="currentColor" stroke-width="2" ' +
    'stroke-linecap="round" stroke-linejoin="round"/></svg>';
}

function _iconDot() {
  return '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" ' +
    'focusable="false" aria-hidden="true">' +
    '<circle cx="6" cy="6" r="4" fill="currentColor"/></svg>';
}

function _iconRing() {
  return '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" ' +
    'focusable="false" aria-hidden="true">' +
    '<circle cx="6" cy="6" r="4" stroke="currentColor" stroke-width="1.5"/></svg>';
}

/* Map a status string to { icon: string, cssModifier: string } */
function _resolveStatus(status) {
  if (!status) return { icon: _iconRing(), mod: 'not-started' };
  const s = status.toLowerCase();
  if (s.includes('complete')) return { icon: _iconCheck(), mod: 'complete' };
  if (s.includes('progress')) return { icon: _iconDot(),  mod: 'in-progress' };
  return { icon: _iconRing(), mod: 'not-started' };
}

/* ---- Build content structure inside .panel-body ---- */
function _buildContent() {
  const body = _drawerEl.querySelector('.panel-body');
  if (!body) throw new Error('artifactDrawer: .panel-body not found inside #' + PANEL_ID + '.');
  body.textContent = '';   /* clear placeholder comment */

  /* Loading state */
  _loadingEl = document.createElement('div');
  _loadingEl.className = 'ad-loading';
  _loadingEl.setAttribute('aria-live', 'polite');
  _loadingEl.hidden = true;
  const loadingText = document.createElement('p');
  loadingText.className = 'ad-loading__text';
  loadingText.textContent = 'Loading artifact…';
  _loadingEl.appendChild(loadingText);

  /* Empty state */
  _emptyEl = document.createElement('div');
  _emptyEl.className = 'ad-empty';
  _emptyEl.hidden = true;
  const emptyText = document.createElement('p');
  emptyText.className = 'ad-empty__text';
  emptyText.textContent = 'No artifact available for this screen.';
  _emptyEl.appendChild(emptyText);

  /* Content state */
  _contentEl = document.createElement('div');
  _contentEl.className = 'ad-content';
  _contentEl.hidden = true;

  /* ── Artifact name ── */
  const nameSection = _makeSection('ad-name-label', 'Current Artifact');
  _nameEl = document.createElement('p');
  _nameEl.className = 'ad-value ad-value--name';
  _nameEl.id = 'ad-name';
  nameSection.appendChild(_nameEl);

  /* ── Artifact status ── */
  const statusSection = _makeSection('ad-status-label', 'Status');
  const statusRow = document.createElement('p');
  statusRow.className = 'ad-value ad-value--status';
  statusRow.id = 'ad-status';
  _statusIconEl = document.createElement('span');
  _statusIconEl.className = 'ad-status__icon';
  _statusIconEl.setAttribute('aria-hidden', 'true');
  _statusTextEl = document.createElement('span');
  _statusTextEl.className = 'ad-status__text';
  statusRow.appendChild(_statusIconEl);
  statusRow.appendChild(_statusTextEl);
  statusSection.appendChild(statusRow);

  /* ── Last updated ── */
  const updatedSection = _makeSection('ad-updated-label', 'Last Updated');
  _updatedEl = document.createElement('time');
  _updatedEl.className = 'ad-value ad-value--updated';
  _updatedEl.id = 'ad-updated';
  updatedSection.appendChild(_updatedEl);

  /* ── Module ── */
  const moduleSection = _makeSection('ad-module-label', 'Module');
  _moduleEl = document.createElement('p');
  _moduleEl.className = 'ad-value ad-value--module';
  _moduleEl.id = 'ad-module';
  moduleSection.appendChild(_moduleEl);

  _contentEl.appendChild(nameSection);
  _contentEl.appendChild(statusSection);
  _contentEl.appendChild(updatedSection);
  _contentEl.appendChild(moduleSection);

  body.appendChild(_loadingEl);
  body.appendChild(_emptyEl);
  body.appendChild(_contentEl);
}

/* Create a labeled <section> with an <h3> heading, return the section */
function _makeSection(headingId, headingText) {
  const section = document.createElement('section');
  section.className = 'ad-section';
  const h3 = document.createElement('h3');
  h3.id = headingId;
  h3.className = 'ad-section__heading';
  h3.textContent = headingText;
  section.setAttribute('aria-labelledby', headingId);
  section.appendChild(h3);
  return section;
}

/* ---- Write artifact data into the content elements ---- */
function _populateFields() {
  /* Name */
  _nameEl.textContent = _data.name ?? '';

  /* Status — icon + text, CSS class on the <p> for supplemental color */
  const { icon, mod } = _resolveStatus(_data.status);
  _statusIconEl.innerHTML = icon;
  _statusTextEl.textContent = _data.status ?? 'Unknown';
  const statusRow = _statusIconEl.closest('.ad-value--status');
  statusRow.className = 'ad-value ad-value--status ad-status--' + mod;

  /* Last updated */
  if (_data.lastUpdated) {
    _updatedEl.textContent = _data.lastUpdated;
    _updatedEl.setAttribute('datetime', _data.lastUpdated);
  } else {
    _updatedEl.textContent = 'Not yet saved';
    _updatedEl.removeAttribute('datetime');
  }

  /* Module */
  _moduleEl.textContent = _data.module != null
    ? 'Module ' + _data.module + ' of 4'
    : '';
}

/* ---- Apply the correct content panel and update _state ---- */
function _applyContentState() {
  const drawerOpen = _drawerEl && !_drawerEl.hidden;

  if (_isLoading) {
    _loadingEl.hidden = false;
    _emptyEl.hidden   = true;
    _contentEl.hidden = true;
    if (drawerOpen) _state = STATE.LOADING;
    return;
  }

  if (_data.name == null) {
    _loadingEl.hidden = true;
    _emptyEl.hidden   = false;
    _contentEl.hidden = true;
    if (drawerOpen) _state = STATE.EMPTY;
    return;
  }

  _loadingEl.hidden = true;
  _emptyEl.hidden   = true;
  _contentEl.hidden = false;
  if (drawerOpen) _state = STATE.OPEN;
  _populateFields();
}

/* ---- MutationObserver callback — detects panelManager open/close ---- */
function _onAttributeChange(mutations) {
  for (const m of mutations) {
    if (m.attributeName !== 'hidden') continue;
    if (!_drawerEl.hidden) {
      /* Drawer just became visible */
      _applyContentState();   /* sets _state */

      /* Announcement */
      let msg;
      if (_state === STATE.LOADING) {
        msg = 'Artifact drawer opened. Loading artifact data.';
      } else if (_state === STATE.EMPTY) {
        msg = 'Artifact drawer opened. No artifact available.';
      } else {
        msg = 'Artifact drawer opened.'
          + (_data.name   ? ' ' + _data.name + '.'    : '')
          + (_data.status ? ' Status: ' + _data.status + '.' : '');
      }
      _announce(msg);
    } else {
      /* Drawer was hidden */
      _state = STATE.CLOSED;
    }
  }
}

/* ---- Focus trap — keeps Tab / Shift+Tab within the drawer ---- */
function _onKeyDown(e) {
  if (e.key !== 'Tab') return;

  const focusable = Array.from(
    _drawerEl.querySelectorAll(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"]), ' +
      'input:not([disabled]), select:not([disabled]), textarea:not([disabled])'
    )
  ).filter(el => !el.closest('[hidden]'));

  if (focusable.length === 0) return;
  const first = focusable[0];
  const last  = focusable[focusable.length - 1];

  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  }
}

/* ============================================================
   PUBLIC API
   ============================================================ */

/**
 * init()
 * Sets ARIA dialog attributes, builds content structure, and starts the
 * MutationObserver that detects open/close events from panelManager.js.
 * Safe to call multiple times; only the first call performs setup.
 *
 * @throws {Error} If #artifactDrawer or #sr-announcer is missing from the DOM.
 */
function init() {
  if (_ready) return;

  _drawerEl = _el(PANEL_ID);
  if (!_drawerEl) throw new Error('artifactDrawer: #' + PANEL_ID + ' not found in DOM.');
  if (!_el(ANNOUNCER_ID)) throw new Error('artifactDrawer: #' + ANNOUNCER_ID + ' not found in DOM.');

  /* Apply dialog ARIA — spec Section 10 */
  _drawerEl.setAttribute('role', 'dialog');
  _drawerEl.setAttribute('aria-modal', 'true');

  /* Wire aria-labelledby to the existing h2.panel-title */
  const h2 = _drawerEl.querySelector('h2.panel-title');
  if (h2) {
    if (!h2.id) h2.id = TITLE_ID;
    _drawerEl.setAttribute('aria-labelledby', h2.id);
  }

  /* Build content structure */
  _buildContent();

  /* Watch for panelManager toggling the hidden attribute */
  _observer = new MutationObserver(_onAttributeChange);
  _observer.observe(_drawerEl, { attributes: true, attributeFilter: ['hidden'] });

  /* Focus trap for Tab navigation */
  _drawerEl.addEventListener('keydown', _onKeyDown);

  _ready = true;
}

/**
 * update(data)
 * Sets artifact data and re-renders the drawer content.
 * Safe to call while the drawer is closed — content is staged for next open.
 *
 * @param {Object}  data
 * @param {string}  data.name        — Artifact file name
 * @param {string}  data.status      — Learner-facing status (e.g. 'In Progress')
 * @param {string}  [data.lastUpdated] — Display date or ISO date string
 * @param {number}  [data.module]    — Current module number (1–4)
 */
function update(data) {
  if (!_ready) {
    console.warn('artifactDrawer.update() called before init(). Call init() first.');
    return;
  }

  _data = {
    name:        data.name        ?? null,
    status:      data.status      ?? null,
    lastUpdated: data.lastUpdated ?? null,
    module:      data.module      ?? null,
  };

  _isLoading = false;
  _applyContentState();
}

/**
 * setLoading(isLoading)
 * Shows or hides the loading indicator.
 * Hides artifact content while data is being retrieved from storage.
 * Calling setLoading(false) re-evaluates content state from the last update().
 *
 * @param {boolean} isLoading
 */
function setLoading(isLoading) {
  if (!_ready) {
    console.warn('artifactDrawer.setLoading() called before init().');
    return;
  }
  _isLoading = Boolean(isLoading);
  _applyContentState();
}

/**
 * getState()
 * Returns the current drawer state string.
 * Safe to call before init() — returns 'closed'.
 *
 * @returns {'closed'|'open'|'loading'|'empty'}
 */
function getState() {
  return _state;
}

/**
 * getData()
 * Returns a defensive copy of the currently staged artifact data.
 * Fields are null until update() has been called.
 * Always call update() before getData() to ensure data reflects the
 * current screen's artifact.
 *
 * Added to support the Artifact Reference Drawer sidebar scaffold (Scaffold 10),
 * which renders its own compact summary view and needs read access to the staged
 * data without duplicating state or coupling to internal overlay DOM elements.
 *
 * @returns {{ name: string|null, status: string|null, lastUpdated: string|null, module: number|null }}
 */
function getData() {
  return { ..._data };
}

export { init, update, setLoading, getState, getData };
