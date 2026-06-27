/* DEFERRED 2026-06-27: Decision History control removed from the build
   (premature empty shell). This implementation is dormant and NOT wired into
   any screen. Re-introduce by re-wiring in the module that commits to Decision
   History. See v5.2 spec deferral note. */

/* =============================================================================
   decisionHistory.js
   Component Contract — Decision History Panel
   Implements Section 11 of the Master Accessibility, Usability, and Inclusive
   Design Specification (Version 5.0).

   SPEC REFERENCE
   Section 11 — Component Contract: Decision History Panel
   Section 16 — Decision History keyboard/SR/motion row:
                   Keyboard: Tab to search, Arrow to navigate items, Enter to open
                   SR:       "History opened. Item count announced. Filter state announced."
                   Motion:   Instant panel open — no slide animation

   INPUTS
   • Decision Record  — stored per-screen in localStorage
                        { screenId, decision, decisionLabel, rationale,
                          revised, timestamp, module? }
                        Key pattern: archMethod_decision_[screenId]
   • Timestamp        — ISO date string set by decision-point screens at submit time
   • Module           — optional number (1–4); present when lesson scripts include it

   OUTPUTS
   • History View     — filterable list of all recorded decisions, each expandable
                        to show full rationale and metadata

   STATES
   • closed    — panel element is hidden; data not loaded
   • open      — panel visible, one or more decisions displayed
   • filtered  — panel visible, active search query, subset of decisions shown
   • empty     — panel visible, no decisions recorded yet

   ARIA REQUIREMENTS
   • role="dialog" aria-modal="true" set on #decisionHistory by init()
   • aria-labelledby wired to #decisionHistory h2.panel-title
   • Escape closes panel — managed by panelManager.js global keydown listener
   • Focus returns to trigger button on close — managed by panelManager.js
   • Tab cycles between close button and search input only
   • Arrow keys navigate list items (roving focus — items are tabindex="-1")
   • Down Arrow from search input moves to first visible list item
   • Up Arrow from first list item returns focus to search input
   • Enter on a focused list item expands/collapses its detail section
   • Filter search input: aria-controls="dh-list", aria-label="Filter decisions"
   • Each list item: aria-expanded on summary button, aria-controls → detail panel
   • Local aria-live="polite" region announces filter results within panel
   • Global #sr-announcer announces panel open with item count

   PERFORMANCE
   • panelManager.js removes hidden synchronously — panel is visible in <1ms
   • Decision records loaded from localStorage synchronously on open
   • All DOM writes complete before requestAnimationFrame announcement fires

   DOM CONTRACT
   The following elements must exist before init() is called.
   These IDs and classes are set in base.html — do not rename them.

   Required elements:
     #decisionHistory            <aside> — receives role, aria-modal, aria-labelledby
     #decisionHistory h2         <h2 class="panel-title"> — receives id for labelledby
     #decisionHistory .panel-body <div> — populated with content by init()
     #sr-announcer               <div role="status" aria-live="polite" aria-atomic="true">

   localStorage key convention (written by decision-point-template.html):
     archMethod_decision_[screenId]  →  JSON string

   USAGE
   ─────────────────────────────────────────────────────────────────────────────
   import { init, load, getState } from './components/decisionHistory.js';

   // 1. Call init() once per page, after DOM is ready.
   init();

   // 2. The panel self-loads from localStorage each time it is opened.
   //    Call load() explicitly to force a refresh while the panel is open.
   load();
   ─────────────────────────────────────────────────────────────────────────────
   ============================================================================= */

const PANEL_ID     = 'decisionHistory';
const TITLE_ID     = 'dh-panel-title';
const ANNOUNCER_ID = 'sr-announcer';
const STORAGE_PREFIX = 'archMethod_decision_';

const STATE = Object.freeze({
  CLOSED:   'closed',
  OPEN:     'open',
  FILTERED: 'filtered',
  EMPTY:    'empty',
});

/* Internal state */
let _ready    = false;
let _state    = STATE.CLOSED;
let _records  = [];     /* all loaded decision records, sorted newest-first */
let _query    = '';     /* current filter query */

/* Cached element references */
let _panelEl        = null;
let _searchInputEl  = null;
let _filterStatusEl = null;
let _emptyEl        = null;
let _listEl         = null;
let _observer       = null;

/* ---- Announcement helpers ---- */
function _announceGlobal(message) {
  const region = document.getElementById(ANNOUNCER_ID);
  if (!region || !message) return;
  region.textContent = '';
  requestAnimationFrame(() => { region.textContent = message; });
}

function _announceFilter(message) {
  if (!_filterStatusEl || !message) return;
  _filterStatusEl.textContent = '';
  requestAnimationFrame(() => { _filterStatusEl.textContent = message; });
}

/* ---- Date formatting ---- */
function _formatDate(iso) {
  if (!iso) return '';
  try {
    const d = new Date(iso);
    if (isNaN(d.getTime())) return iso;
    return d.toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric',
    }) + ' at ' + d.toLocaleTimeString('en-US', {
      hour: 'numeric', minute: '2-digit',
    });
  } catch (_) {
    return iso;
  }
}

/* ---- localStorage scan ---- */
function _loadFromStorage() {
  const records = [];
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key || !key.startsWith(STORAGE_PREFIX)) continue;
      try {
        const raw = localStorage.getItem(key);
        if (raw) records.push(JSON.parse(raw));
      } catch (_) { /* skip malformed records */ }
    }
  } catch (_) { /* localStorage unavailable */ }

  /* Newest first */
  records.sort((a, b) => {
    const ta = a.timestamp ? new Date(a.timestamp).getTime() : 0;
    const tb = b.timestamp ? new Date(b.timestamp).getTime() : 0;
    return tb - ta;
  });
  return records;
}

/* ---- Filter predicate ---- */
function _matches(record, query) {
  if (!query) return true;
  const q = query.toLowerCase();
  return (
    (record.decisionLabel || '').toLowerCase().includes(q) ||
    (record.rationale     || '').toLowerCase().includes(q) ||
    (record.screenId      || '').toLowerCase().includes(q) ||
    (record.module != null && ('module ' + record.module).includes(q))
  );
}

/* ---- Build a single list item element ---- */
function _buildItem(record, index) {
  const detailId = 'dh-detail-' + index;

  const li = document.createElement('li');
  li.className = 'dh-item';
  li.dataset.index = String(index);

  /* Summary button — tabindex="-1" so only Arrow keys reach it */
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'dh-item__summary';
  btn.setAttribute('tabindex', '-1');
  btn.setAttribute('aria-expanded', 'false');
  btn.setAttribute('aria-controls', detailId);

  /* Meta row: module + timestamp */
  const meta = document.createElement('span');
  meta.className = 'dh-item__meta';
  meta.setAttribute('aria-hidden', 'true');   /* full info in aria-label below */

  if (record.module != null) {
    const modSpan = document.createElement('span');
    modSpan.className = 'dh-item__module';
    modSpan.textContent = 'Module ' + record.module;
    meta.appendChild(modSpan);
  }

  if (record.timestamp) {
    const tsSpan = document.createElement('span');
    tsSpan.className = 'dh-item__timestamp';
    tsSpan.textContent = _formatDate(record.timestamp);
    meta.appendChild(tsSpan);
  }

  /* Decision label */
  const labelSpan = document.createElement('span');
  labelSpan.className = 'dh-item__label';
  labelSpan.textContent = record.decisionLabel || record.decision || 'Decision recorded';

  /* Revised badge */
  const badge = document.createElement('span');
  badge.className = 'dh-item__revised-badge';
  badge.textContent = 'Revised';
  if (!record.revised) badge.hidden = true;

  /* Accessible label for the button (visible text + screen-reader-only context) */
  const modLabel = record.module != null ? 'Module ' + record.module + '. ' : '';
  const tsLabel  = record.timestamp ? _formatDate(record.timestamp) + '. ' : '';
  const revLabel = record.revised ? ' Revised.' : '';
  btn.setAttribute('aria-label',
    (record.decisionLabel || 'Decision') + '. ' + modLabel + tsLabel + revLabel +
    ' Press Enter to expand.'
  );

  /* Expand indicator icon (aria-hidden) */
  const chevron = document.createElement('span');
  chevron.className = 'dh-item__chevron';
  chevron.setAttribute('aria-hidden', 'true');
  chevron.innerHTML =
    '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" ' +
    'focusable="false" aria-hidden="true">' +
    '<path d="M3 4.5l3 3 3-3" stroke="currentColor" stroke-width="1.5" ' +
    'stroke-linecap="round" stroke-linejoin="round"/></svg>';

  btn.appendChild(meta);
  btn.appendChild(labelSpan);
  btn.appendChild(badge);
  btn.appendChild(chevron);

  /* Detail panel */
  const detail = document.createElement('div');
  detail.id = detailId;
  detail.className = 'dh-item__detail';
  detail.hidden = true;

  const dl = document.createElement('dl');
  dl.className = 'dh-detail__list';

  const fields = [
    { term: 'Decision',  value: record.decisionLabel || record.decision || '' },
    { term: 'Rationale', value: record.rationale || '' },
    { term: 'Revised',   value: record.revised ? 'Yes' : 'No' },
    { term: 'Recorded',  value: _formatDate(record.timestamp) },
  ];
  if (record.module != null) {
    fields.unshift({ term: 'Module', value: 'Module ' + record.module + ' of 4' });
  }

  fields.forEach(({ term, value }) => {
    const dt = document.createElement('dt');
    dt.className = 'dh-detail__term';
    dt.textContent = term;
    const dd = document.createElement('dd');
    dd.className = 'dh-detail__definition';
    dd.textContent = value;
    dl.appendChild(dt);
    dl.appendChild(dd);
  });

  detail.appendChild(dl);

  /* Toggle expand on click */
  btn.addEventListener('click', () => _toggleItem(btn, detail));

  li.appendChild(btn);
  li.appendChild(detail);
  return li;
}

/* ---- Toggle a list item open/closed ---- */
function _toggleItem(btn, detail) {
  const isExpanded = btn.getAttribute('aria-expanded') === 'true';
  btn.setAttribute('aria-expanded', isExpanded ? 'false' : 'true');
  detail.hidden = isExpanded;

  /* Update chevron direction via CSS class */
  const li = btn.closest('.dh-item');
  if (li) li.classList.toggle('dh-item--expanded', !isExpanded);
}

/* ---- Render records into the list ---- */
function _renderList(records, query) {
  _listEl.textContent = '';   /* clear previous items */

  const visible = records.filter(r => _matches(r, query));

  visible.forEach((record, i) => {
    _listEl.appendChild(_buildItem(record, i));
  });

  return visible.length;
}

/* ---- Apply the correct content state and update _state ---- */
function _applyState(visibleCount, query) {
  const panelOpen = _panelEl && !_panelEl.hidden;

  if (visibleCount === 0 && !query && _records.length === 0) {
    _emptyEl.hidden  = false;
    _listEl.hidden   = true;
    if (panelOpen) _state = STATE.EMPTY;
    return;
  }

  _emptyEl.hidden = true;
  _listEl.hidden  = false;

  if (!panelOpen) return;
  _state = query ? STATE.FILTERED : STATE.OPEN;
}

/* ---- Load records from localStorage and re-render ---- */
function _loadAndRender(announce) {
  _records = _loadFromStorage();
  _query   = _searchInputEl ? _searchInputEl.value.trim() : '';

  const count = _renderList(_records, _query);
  _applyState(count, _query);

  if (announce) {
    const itemWord = _records.length === 1 ? 'decision' : 'decisions';
    let msg = 'Decision history opened. ' + _records.length + ' ' + itemWord + ' recorded.';
    if (_query) msg += ' Filter active: ' + _query + '.';
    _announceGlobal(msg);
  }
}

/* ---- Search input handler ---- */
function _onSearch() {
  _query = _searchInputEl.value.trim();
  const count = _renderList(_records, _query);
  _applyState(count, _query);

  if (_query) {
    const resultWord = count === 1 ? 'result' : 'results';
    _announceFilter(count > 0
      ? count + ' ' + resultWord + ' found.'
      : 'No decisions match your filter.');
  } else {
    _announceFilter('');
  }
}

/* ---- MutationObserver callback — detects panelManager open/close ---- */
function _onAttributeChange(mutations) {
  for (const m of mutations) {
    if (m.attributeName !== 'hidden') continue;
    if (!_panelEl.hidden) {
      /* Panel just opened — reload and announce */
      if (_searchInputEl) _searchInputEl.value = '';
      _query = '';
      _loadAndRender(true);
    } else {
      _state = STATE.CLOSED;
    }
  }
}

/* ---- Focus trap: Tab cycles between close button and search input only ---- */
function _onKeyDown(e) {
  if (e.key !== 'Tab') return;

  /* Only two Tab stops: close button and search input */
  const closeBtn = _panelEl.querySelector('.panel-close');
  if (!closeBtn || !_searchInputEl) return;

  if (e.shiftKey && document.activeElement === closeBtn) {
    e.preventDefault();
    _searchInputEl.focus();
  } else if (!e.shiftKey && document.activeElement === _searchInputEl) {
    e.preventDefault();
    closeBtn.focus();
  }
}

/* ---- Arrow key from search input → first list item ---- */
function _onSearchKeyDown(e) {
  if (e.key !== 'ArrowDown') return;
  e.preventDefault();
  const firstBtn = _listEl.querySelector('.dh-item:not([hidden]) .dh-item__summary');
  if (firstBtn) firstBtn.focus();
}

/* ---- Arrow navigation within the list ---- */
function _onListKeyDown(e) {
  const currentLi = e.target.closest('.dh-item');
  if (!currentLi) return;

  const items = Array.from(_listEl.querySelectorAll('.dh-item:not([hidden])'));
  const idx   = items.indexOf(currentLi);

  if (e.key === 'ArrowDown') {
    e.preventDefault();
    const next = items[idx + 1];
    if (next) next.querySelector('.dh-item__summary').focus();
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    if (idx === 0) {
      _searchInputEl.focus();   /* Up from first item returns to search */
    } else {
      items[idx - 1].querySelector('.dh-item__summary').focus();
    }
  } else if (e.key === 'Enter') {
    e.preventDefault();
    const btn = currentLi.querySelector('.dh-item__summary');
    if (btn) btn.click();
  }
}

/* ---- Build all content inside .panel-body ---- */
function _buildContent() {
  const body = _panelEl.querySelector('.panel-body');
  if (!body) throw new Error('decisionHistory: .panel-body not found inside #' + PANEL_ID + '.');
  body.textContent = '';   /* clear placeholder comment */

  /* Search / filter */
  const searchWrap = document.createElement('div');
  searchWrap.className = 'dh-search';

  const label = document.createElement('label');
  label.htmlFor = 'dh-search-input';
  label.className = 'dh-search__label';
  label.textContent = 'Filter decisions';

  _searchInputEl = document.createElement('input');
  _searchInputEl.type = 'search';
  _searchInputEl.id = 'dh-search-input';
  _searchInputEl.className = 'dh-search__input';
  _searchInputEl.placeholder = 'Filter by module, decision, or rationale';
  _searchInputEl.setAttribute('aria-controls', 'dh-list');
  _searchInputEl.setAttribute('autocomplete', 'off');
  _searchInputEl.setAttribute('spellcheck', 'false');

  searchWrap.appendChild(label);
  searchWrap.appendChild(_searchInputEl);

  /* Local live region for filter result counts */
  _filterStatusEl = document.createElement('div');
  _filterStatusEl.id = 'dh-filter-status';
  _filterStatusEl.className = 'dh-filter-status sr-only';
  _filterStatusEl.setAttribute('aria-live', 'polite');
  _filterStatusEl.setAttribute('aria-atomic', 'true');

  /* Empty state */
  _emptyEl = document.createElement('div');
  _emptyEl.className = 'dh-empty';
  _emptyEl.hidden = true;
  const emptyText = document.createElement('p');
  emptyText.className = 'dh-empty__text';
  emptyText.textContent = 'No decisions recorded yet. Decisions appear here after you complete a Decision Point screen.';
  _emptyEl.appendChild(emptyText);

  /* Decision list */
  _listEl = document.createElement('ul');
  _listEl.id = 'dh-list';
  _listEl.className = 'dh-list';
  _listEl.setAttribute('role', 'list');
  _listEl.setAttribute('aria-label', 'Decision records');
  _listEl.hidden = true;

  body.appendChild(searchWrap);
  body.appendChild(_filterStatusEl);
  body.appendChild(_emptyEl);
  body.appendChild(_listEl);
}

/* ============================================================
   PUBLIC API
   ============================================================ */

/**
 * init()
 * Sets ARIA dialog attributes, builds content structure, wires event listeners,
 * and starts the MutationObserver that detects open/close from panelManager.js.
 * Safe to call multiple times; only the first call performs setup.
 *
 * @throws {Error} If #decisionHistory or #sr-announcer is missing from the DOM.
 */
function init() {
  if (_ready) return;

  _panelEl = document.getElementById(PANEL_ID);
  if (!_panelEl) throw new Error('decisionHistory: #' + PANEL_ID + ' not found in DOM.');
  if (!document.getElementById(ANNOUNCER_ID)) {
    throw new Error('decisionHistory: #' + ANNOUNCER_ID + ' not found in DOM.');
  }

  /* Apply dialog ARIA — spec Section 11 */
  _panelEl.setAttribute('role', 'dialog');
  _panelEl.setAttribute('aria-modal', 'true');

  /* Wire aria-labelledby to the existing h2.panel-title */
  const h2 = _panelEl.querySelector('h2.panel-title');
  if (h2) {
    if (!h2.id) h2.id = TITLE_ID;
    _panelEl.setAttribute('aria-labelledby', h2.id);
  }

  /* Build content structure */
  _buildContent();

  /* Search handler */
  _searchInputEl.addEventListener('input', _onSearch);
  _searchInputEl.addEventListener('keydown', _onSearchKeyDown);

  /* List arrow navigation */
  _listEl.addEventListener('keydown', _onListKeyDown);

  /* Focus trap (Tab — only close button and search are Tab stops) */
  _panelEl.addEventListener('keydown', _onKeyDown);

  /* Watch for panelManager toggling the hidden attribute */
  _observer = new MutationObserver(_onAttributeChange);
  _observer.observe(_panelEl, { attributes: true, attributeFilter: ['hidden'] });

  _ready = true;
}

/**
 * load()
 * Forces a re-read of localStorage and re-renders the decision list.
 * Called automatically each time the panel opens. Call explicitly to
 * refresh the panel while it is already visible (e.g., after a decision
 * is submitted on a screen that also shows the history panel).
 */
function load() {
  if (!_ready) {
    console.warn('decisionHistory.load() called before init(). Call init() first.');
    return;
  }
  _loadAndRender(false);
}

/**
 * getState()
 * Returns the current panel state string.
 * Safe to call before init() — returns 'closed'.
 *
 * @returns {'closed'|'open'|'filtered'|'empty'}
 */
function getState() {
  return _state;
}

/**
 * getRecords()
 * Returns a defensive copy of the currently loaded decision records array.
 * Records are sorted newest-first. Array is empty until load() has been called.
 * Always call load() before getRecords() to ensure the data reflects current
 * localStorage state.
 *
 * Added to support the Running Decision History sidebar scaffold (Scaffold 8),
 * which renders its own compact summary view and needs read access to the loaded
 * records without reimplementing the localStorage scan.
 *
 * @returns {Array}
 */
function getRecords() {
  return _records.slice();
}

export { init, load, getState, getRecords };
