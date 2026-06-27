/* DEFERRED 2026-06-27: Decision History control removed from the build
   (premature empty shell). This implementation is dormant and NOT wired into
   any screen. Re-introduce by re-wiring in the module that commits to Decision
   History. See v5.2 spec deferral note. */

/* =============================================================================
   runningDecisionHistory.js
   Scaffold Component 8 of 10 -- Running Decision History Panel
   Section 18 -- Working Memory Supports

   SPEC REFERENCE
   Section 18 -- Persistent sidebar summary view of all decisions recorded
   to date. Collapsible. Distinct from the #decisionHistory overlay panel
   (which is a full searchable dialog managed by panelManager.js).

   RELATIONSHIP TO decisionHistory.js
   ─────────────────────────────────────────────────────────────────────────────
   This scaffold is a wrapper that mounts into #decision-history (sidebar
   <section> in base.html) and delegates all data work to decisionHistory.js:

     decisionHistory.init()       -- initializes the overlay panel so it is
                                     ready when "View full history" is clicked
     decisionHistory.load()       -- reads localStorage, populates _records,
                                     renders the overlay panel (hidden: no flash)
     decisionHistory.getRecords() -- returns the loaded records for sidebar rendering

   This scaffold does NOT reimplement:
     - localStorage reading (delegated to decisionHistory.load())
     - Search or filter (overlay panel only -- delegated to decisionHistory.js)
     - Decision list rendering for the overlay (delegated to decisionHistory.js)

   This scaffold owns:
     - Collapsible sidebar container (toggle, aria-expanded, [hidden] on body)
     - Compact summary rendering (decision label + module badge per record)
     - Collapse state persistence (localStorage via storage.js)
     - "View full history" button that opens the overlay via panelManager.openPanel()

   DOM TARGETS
   ─────────────────────────────────────────────────────────────────────────────
   Sidebar (this scaffold):   #decision-history  (<section> in base.html aside)
   Overlay (decisionHistory): #decisionHistory   (<aside> managed by panelManager)

   USAGE
   ─────────────────────────────────────────────────────────────────────────────
   HTML: no additional markup needed -- base.html already contains:
     <section id="decision-history" tabindex="-1" aria-label="Decision history">
       <h2 class="aside-heading">Decision History</h2>
     </section>

   JavaScript (in each screen's module script, after DOM ready):

     import { init } from './js/scaffolds/runningDecisionHistory.js';
     init();   // auto-finds #decision-history; call once per page load

   CSS (link in <head> of every screen that shows the sidebar, after tokens.css):

     <link rel="stylesheet" href="css/scaffolds/runningDecisionHistory.css">
   ─────────────────────────────────────────────────────────────────────────────

   COMPACT SUMMARY VIEW
   Each decision record is rendered as one list item showing:
     - Module badge (M1, M2, M3, M4) -- visual only, aria-hidden
     - Screen reader equivalent ("Module 1.") -- .sr-only span
     - Decision label (decisionLabel field, or decision field as fallback)
     - "Revised" badge if record.revised is true
   No expand/collapse per item, no search, no full rationale. That is the
   overlay panel's job.

   COLLAPSE STATE
   Toggle button: aria-expanded controls the body div via aria-controls.
   Sidebar starts expanded by default. Collapse state persists via storage.js
   under key 'rdh_collapsed'. Respects cross-session preference.
   Announcement on toggle: "Decision history collapsed." / "Decision history expanded."

   VIEW FULL HISTORY
   A button at the bottom of the sidebar calls panelManager.openPanel()
   to open the full #decisionHistory overlay panel. The overlay has search,
   filter, and per-decision expand with full rationale.
   Focus returns to the "View full history" button when the overlay closes
   (panelManager.closeAll() restores focus to _lastTrigger).

   REFRESH BEHAVIOR
   The sidebar reads records once per page load (on init()). Decisions are
   submitted on decision-point screens, which navigate to the next screen
   (a new HTML file) after submission. The fresh page load triggers a new
   init(), which calls load() to pick up the newly recorded decision.
   No in-session refresh mechanism is needed for the current course architecture.

   DOM CONTRACT
   The following elements must exist before init() is called:
     #decision-history    <section> in base.html -- scaffold's mount point
     #decisionHistory     <aside>   in base.html -- overlay panel for decisionHistory.js
     #sr-announcer        <div>     in base.html -- live region for announcements
   ============================================================================= */

import { init as dhInit, load as dhLoad, getRecords } from '../components/decisionHistory.js';
import { openPanel } from '../panelManager.js';
import { getItem, setItem } from '../storage.js';

const SECTION_ID   = 'decision-history';
const ANNOUNCER_ID = 'sr-announcer';
const STORAGE_KEY  = 'rdh_collapsed';

let _uidCounter = 0;

/* ---- Live region ---- */
function _announce(message) {
  const region = document.getElementById(ANNOUNCER_ID);
  if (!region || !message) return;
  region.textContent = '';
  requestAnimationFrame(() => { region.textContent = message; });
}

/* ================================================================
   ITEM BUILDER
   One <li> per decision record -- compact summary only.
   ================================================================ */

function _buildItemEl(record) {
  const li = document.createElement('li');
  li.className = 'rdh__item';

  /* Visual module badge (M1, M2, etc.) -- sighted users */
  if (record.module != null) {
    const badge = document.createElement('span');
    badge.className = 'rdh__item-module';
    badge.setAttribute('aria-hidden', 'true');
    badge.textContent = 'M' + record.module;
    li.appendChild(badge);

    /* Screen reader equivalent -- full text, visually hidden */
    const srMod = document.createElement('span');
    srMod.className = 'sr-only';
    srMod.textContent = 'Module ' + record.module + '.';
    li.appendChild(srMod);
  }

  /* Decision label -- primary visible text */
  const labelEl = document.createElement('span');
  labelEl.className = 'rdh__item-label';
  labelEl.textContent = record.decisionLabel || record.decision || 'Decision recorded';
  li.appendChild(labelEl);

  /* Revised badge -- only shown when the decision was revised */
  if (record.revised) {
    const revisedEl = document.createElement('span');
    revisedEl.className = 'rdh__item-revised';
    revisedEl.textContent = 'Revised';
    li.appendChild(revisedEl);
  }

  return li;
}

/* ================================================================
   CONTENT RENDERER
   Toggles between list and empty state based on record count.
   ================================================================ */

function _renderContent(listEl, emptyEl, records) {
  listEl.textContent = '';

  if (records.length === 0) {
    emptyEl.removeAttribute('hidden');
    listEl.setAttribute('hidden', '');
    return;
  }

  emptyEl.setAttribute('hidden', '');
  listEl.removeAttribute('hidden');

  records.forEach(record => {
    listEl.appendChild(_buildItemEl(record));
  });
}

/* ============================================================
   PUBLIC API
   ============================================================ */

/**
 * init(sectionEl)
 * Initializes the Running Decision History sidebar in the given section element.
 * Calls decisionHistory.init() and load() to ensure the overlay panel is ready
 * and records are fresh, then renders a compact summary into the sidebar.
 * Wires the collapse toggle and the "View full history" button.
 * Idempotent -- safe to call multiple times; already-initialized sections are skipped.
 *
 * @param {HTMLElement} [sectionEl=document.getElementById('decision-history')]
 */
function init(sectionEl = document.getElementById(SECTION_ID)) {
  if (!sectionEl || sectionEl.dataset.rdhReady === 'true') return;

  /* ------------------------------------------------------------------
     Initialize the overlay panel and load records.
     dhInit() is idempotent -- safe to call even if another script on the
     page has already called it. dhLoad() re-reads localStorage and renders
     the overlay (which is [hidden], so no visual flash occurs).
     getRecords() returns the records populated by dhLoad().
     ------------------------------------------------------------------ */
  dhInit();
  dhLoad();
  const records = getRecords();

  /* Clear the authored placeholder content (existing h2 + comment) */
  sectionEl.textContent = '';

  /* ---- Unique IDs for aria-controls / aria-labelledby ---- */
  _uidCounter += 1;
  const bodyId    = 'rdh-body-'    + _uidCounter;
  const headingId = 'rdh-heading-' + _uidCounter;

  /* ================================================================
     HEADER: h2 + collapse toggle button
     ================================================================ */

  const header = document.createElement('div');
  header.className = 'rdh__header';

  const heading = document.createElement('h2');
  heading.className = 'rdh__heading aside-heading';
  heading.id = headingId;
  heading.textContent = 'Decision History';

  const toggleBtn = document.createElement('button');
  toggleBtn.type = 'button';
  toggleBtn.className = 'rdh__toggle';
  /* Sidebar starts expanded; button label reflects next action */
  toggleBtn.setAttribute('aria-expanded', 'true');
  toggleBtn.setAttribute('aria-controls', bodyId);
  toggleBtn.setAttribute('aria-label', 'Collapse decision history');
  toggleBtn.innerHTML =
    '<span class="rdh__chevron" aria-hidden="true">' +
    '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" ' +
    'focusable="false" aria-hidden="true">' +
    '<path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" ' +
    'stroke-linecap="round" stroke-linejoin="round"/>' +
    '</svg></span>';

  header.appendChild(heading);
  header.appendChild(toggleBtn);

  /* ================================================================
     BODY: decision list + empty state + view-all button
     ================================================================ */

  const body = document.createElement('div');
  body.className = 'rdh__body';
  body.id = bodyId;
  /* role="region" + aria-labelledby creates a named landmark
     AT users can navigate to via the landmark list (e.g., NVDA + R). */
  body.setAttribute('role', 'region');
  body.setAttribute('aria-labelledby', headingId);

  /* Decision list */
  const listEl = document.createElement('ul');
  listEl.className = 'rdh__list';
  listEl.setAttribute('role', 'list');
  listEl.setAttribute('aria-label', 'Recent decisions');

  /* Empty state */
  const emptyEl = document.createElement('p');
  emptyEl.className = 'rdh__empty';
  emptyEl.textContent =
    'No decisions recorded yet. Decisions appear here after you complete a Decision Point screen.';
  emptyEl.setAttribute('hidden', '');

  /* View full history button -- opens the overlay panel */
  const viewAllBtn = document.createElement('button');
  viewAllBtn.type = 'button';
  viewAllBtn.className = 'rdh__view-all';
  viewAllBtn.textContent = 'View full decision history';

  body.appendChild(listEl);
  body.appendChild(emptyEl);
  body.appendChild(viewAllBtn);

  /* Assemble into section */
  sectionEl.appendChild(header);
  sectionEl.appendChild(body);

  /* ---- Render decision content ---- */
  _renderContent(listEl, emptyEl, records);

  /* ================================================================
     COLLAPSE TOGGLE
     aria-expanded on the button and [hidden] on the body are the only
     two moving parts. CSS reads aria-expanded to rotate the chevron.
     ================================================================ */

  let _isCollapsed = false;

  function _setCollapsed(collapsed) {
    _isCollapsed = collapsed;
    if (collapsed) {
      body.setAttribute('hidden', '');
      toggleBtn.setAttribute('aria-expanded', 'false');
      toggleBtn.setAttribute('aria-label', 'Expand decision history');
    } else {
      body.removeAttribute('hidden');
      toggleBtn.setAttribute('aria-expanded', 'true');
      toggleBtn.setAttribute('aria-label', 'Collapse decision history');
    }
  }

  toggleBtn.addEventListener('click', () => {
    const next = !_isCollapsed;
    _setCollapsed(next);
    setItem(STORAGE_KEY, next ? 'true' : 'false');
    _announce(next ? 'Decision history collapsed.' : 'Decision history expanded.');
  });

  /* ================================================================
     VIEW FULL HISTORY BUTTON
     Opens the #decisionHistory overlay panel via panelManager.
     panelManager tracks viewAllBtn as _lastTrigger and returns focus
     to it when the overlay is closed.
     ================================================================ */

  viewAllBtn.addEventListener('click', () => {
    openPanel('decisionHistory', viewAllBtn);
  });

  /* ================================================================
     RESTORE COLLAPSE STATE
     Applied after the full DOM is built so [hidden] is set correctly.
     ================================================================ */

  const saved = getItem(STORAGE_KEY);
  if (saved === 'true') {
    _setCollapsed(true);
  }

  sectionEl.dataset.rdhReady = 'true';
}

export { init };
