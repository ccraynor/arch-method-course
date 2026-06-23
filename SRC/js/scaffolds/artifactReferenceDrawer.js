/* =============================================================================
   artifactReferenceDrawer.js
   Scaffold Component 10 of 10 -- Artifact Reference Drawer Wrapper
   Section 18 -- Working Memory Supports

   SPEC REFERENCE
   Section 17 -- Cognitive accessibility: display artifact name, status,
                 last updated, module position.
   Section 18 -- Artifact drawer accessible on every lesson screen.

   RELATIONSHIP TO artifactDrawer.js
   ─────────────────────────────────────────────────────────────────────────────
   This scaffold mounts into #artifact-reference (sidebar <section> in base.html)
   and delegates all overlay work to artifactDrawer.js:

     artifactDrawer.init()     -- initializes #artifactDrawer overlay (idempotent)
     artifactDrawer.update()   -- stages { name, status, lastUpdated, module }
                                  into the overlay content (drawer stays hidden)
     artifactDrawer.getData()  -- returns a copy of the staged data for sidebar rendering

   This scaffold does NOT reimplement:
     - The overlay content structure (injected by artifactDrawer._buildContent())
     - Status icon resolution logic for the overlay (handled by artifactDrawer.js)
     - Focus trap within the overlay (handled by artifactDrawer._onKeyDown())
     - Panel open/close (handled by panelManager.js via openPanel())

   This scaffold owns:
     - Collapsible sidebar container (toggle, aria-expanded, [hidden] on body)
     - Compact summary: artifact name, status indicator, last-updated field
     - Status shape icons (ring / dot / check) -- three inline SVG functions
       mirror the overlay's icon set at sidebar scale; not imported because
       _iconCheck / _iconDot / _iconRing are private to artifactDrawer.js
     - Collapse state persistence via storage.js (key: ard_collapsed)
     - "View full artifact details" button → openPanel('artifactDrawer', btn)

   STATUS COMMUNICATION (WCAG non-color rule)
   Status is communicated by BOTH shape and color:
     Not Started  -- open ring SVG  + muted color class
     In Progress  -- filled dot SVG + accent color class
     Complete     -- check SVG      + success color class
   Text label is always present. Color is supplemental only.

   DOM TARGETS
   ─────────────────────────────────────────────────────────────────────────────
   Sidebar (this scaffold):   #artifact-reference   (<section> in base.html aside)
   Overlay (artifactDrawer):  #artifactDrawer        (<aside> managed by panelManager)

   USAGE
   ─────────────────────────────────────────────────────────────────────────────
   HTML: no additional markup needed -- base.html already contains:
     <section id="artifact-reference" tabindex="-1" aria-label="Artifact reference">
       <h2 class="aside-heading">Artifact Reference</h2>
     </section>

   JavaScript (in each screen's module script, after DOM ready):

     import { init } from './js/scaffolds/artifactReferenceDrawer.js';

     // Screen with an artifact:
     init({
       name:        'MRHN_ScopeStatement_v1_2024-09-15',
       status:      'In Progress',
       lastUpdated: '2024-09-15',
       module:      1,
     });

     // Screen with no artifact (sidebar shows empty state):
     init({ name: null });

   CSS (link in <head> of every screen, after tokens.css):

     <link rel="stylesheet" href="css/scaffolds/artifactReferenceDrawer.css">
   ─────────────────────────────────────────────────────────────────────────────

   DOM CONTRACT
   The following elements must exist before init() is called:
     #artifact-reference   <section> in base.html -- scaffold's mount point
     #artifactDrawer       <aside>   in base.html -- overlay for artifactDrawer.js
     #sr-announcer         <div>     in base.html -- live region for announcements
   ============================================================================= */

import { init as adInit, update as adUpdate, getData } from '../components/artifactDrawer.js';
import { openPanel } from '../panelManager.js';
import { getItem, setItem } from '../storage.js';

const SECTION_ID   = 'artifact-reference';
const ANNOUNCER_ID = 'sr-announcer';
const STORAGE_KEY  = 'ard_collapsed';

let _uidCounter = 0;

/* ---- Live region ---- */
function _announce(message) {
  const region = document.getElementById(ANNOUNCER_ID);
  if (!region || !message) return;
  region.textContent = '';
  requestAnimationFrame(() => { region.textContent = message; });
}

/* ================================================================
   STATUS HELPERS
   Mirror the three-branch logic from artifactDrawer._resolveStatus().
   Used only for the sidebar compact view -- the overlay renders its
   own icons independently via artifactDrawer._populateFields().
   ================================================================ */

function _statusMod(status) {
  if (!status) return 'not-started';
  const s = status.toLowerCase();
  if (s.includes('complete')) return 'complete';
  if (s.includes('progress')) return 'in-progress';
  return 'not-started';
}

/* Inline SVG status icons -- aria-hidden; shape communicates state alongside text */
function _iconCheck() {
  return '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" ' +
    'focusable="false" aria-hidden="true">' +
    '<path d="M2 6l3.5 3.5 5-5.5" stroke="currentColor" stroke-width="1.75" ' +
    'stroke-linecap="round" stroke-linejoin="round"/></svg>';
}

function _iconDot() {
  return '<svg width="10" height="10" viewBox="0 0 10 10" fill="none" ' +
    'focusable="false" aria-hidden="true">' +
    '<circle cx="5" cy="5" r="3.5" fill="currentColor"/></svg>';
}

function _iconRing() {
  return '<svg width="10" height="10" viewBox="0 0 10 10" fill="none" ' +
    'focusable="false" aria-hidden="true">' +
    '<circle cx="5" cy="5" r="3.5" stroke="currentColor" stroke-width="1.5"/></svg>';
}

function _statusIcon(status) {
  const mod = _statusMod(status);
  if (mod === 'complete')    return _iconCheck();
  if (mod === 'in-progress') return _iconDot();
  return _iconRing();
}

/* ================================================================
   CONTENT RENDERER
   Writes artifact data into the sidebar dl fields, or shows
   the empty state when data.name is null.
   ================================================================ */

function _renderContent(nameEl, statusEl, statusIconEl, statusTextEl, updatedEl, emptyEl, viewBtn, data) {
  if (!data.name) {
    nameEl.parentElement.setAttribute('hidden', '');
    statusEl.parentElement.setAttribute('hidden', '');
    updatedEl.parentElement.setAttribute('hidden', '');
    emptyEl.removeAttribute('hidden');
    viewBtn.setAttribute('hidden', '');
    return;
  }

  emptyEl.setAttribute('hidden', '');
  viewBtn.removeAttribute('hidden');
  nameEl.parentElement.removeAttribute('hidden');
  statusEl.parentElement.removeAttribute('hidden');
  updatedEl.parentElement.removeAttribute('hidden');

  /* Artifact name */
  nameEl.textContent = data.name;

  /* Status: icon + text + modifier class */
  const mod = _statusMod(data.status);
  statusIconEl.innerHTML = _statusIcon(data.status);
  statusTextEl.textContent = data.status || 'Unknown';
  statusEl.className = 'ard__dd ard__dd--status ard__status--' + mod;

  /* Last updated */
  if (data.lastUpdated) {
    updatedEl.textContent = data.lastUpdated;
    updatedEl.setAttribute('datetime', data.lastUpdated);
  } else {
    updatedEl.textContent = 'Not yet saved';
    updatedEl.removeAttribute('datetime');
  }
}

/* ============================================================
   PUBLIC API
   ============================================================ */

/**
 * init(config, sectionEl)
 * Initializes the Artifact Reference Drawer sidebar.
 *
 * Sequence:
 *   1. adInit()     -- initializes #artifactDrawer overlay (idempotent)
 *   2. adUpdate()   -- stages artifact data into overlay (drawer stays hidden)
 *   3. getData()    -- reads staged data for sidebar rendering
 *   4. Build DOM    -- header, collapse toggle, compact summary dl, view button
 *   5. Wire events  -- collapse toggle, view button, storage restore
 *
 * Idempotent -- already-initialized sections (data-ard-ready="true") are skipped.
 *
 * @param {Object}      config
 * @param {string|null} config.name        -- Artifact filename; null for no artifact
 * @param {string}      [config.status]    -- Status label (e.g., 'In Progress')
 * @param {string}      [config.lastUpdated] -- Display date or ISO date string
 * @param {number}      [config.module]    -- Current module number (1-4)
 * @param {HTMLElement} [sectionEl]        -- Defaults to #artifact-reference
 */
function init(config, sectionEl = document.getElementById(SECTION_ID)) {
  if (!sectionEl || sectionEl.dataset.ardReady === 'true') return;

  /* ------------------------------------------------------------------
     Initialize overlay and stage artifact data.
     adInit() is idempotent. adUpdate() renders the overlay content
     while #artifactDrawer is still [hidden] -- no visual flash.
     getData() returns the data just staged by adUpdate().
     ------------------------------------------------------------------ */
  adInit();
  adUpdate({
    name:        config.name        ?? null,
    status:      config.status      ?? null,
    lastUpdated: config.lastUpdated ?? null,
    module:      config.module      ?? null,
  });
  const data = getData();

  /* Clear the authored placeholder content (existing h2 + comment) */
  sectionEl.textContent = '';

  /* ---- Unique IDs for aria wiring ---- */
  _uidCounter += 1;
  const bodyId    = 'ard-body-'    + _uidCounter;
  const headingId = 'ard-heading-' + _uidCounter;

  /* ================================================================
     HEADER: h2 + collapse toggle button
     ================================================================ */

  const header = document.createElement('div');
  header.className = 'ard__header';

  const heading = document.createElement('h2');
  heading.className = 'ard__heading aside-heading';
  heading.id = headingId;
  heading.textContent = 'Artifact Reference';

  const toggleBtn = document.createElement('button');
  toggleBtn.type = 'button';
  toggleBtn.className = 'ard__toggle';
  toggleBtn.setAttribute('aria-expanded', 'true');
  toggleBtn.setAttribute('aria-controls', bodyId);
  toggleBtn.setAttribute('aria-label', 'Collapse artifact reference');
  toggleBtn.innerHTML =
    '<span class="ard__chevron" aria-hidden="true">' +
    '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" ' +
    'focusable="false" aria-hidden="true">' +
    '<path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" ' +
    'stroke-linecap="round" stroke-linejoin="round"/>' +
    '</svg></span>';

  header.appendChild(heading);
  header.appendChild(toggleBtn);

  /* ================================================================
     BODY: compact summary dl + empty state + view button
     ================================================================ */

  const body = document.createElement('div');
  body.className = 'ard__body';
  body.id = bodyId;
  body.setAttribute('role', 'region');
  body.setAttribute('aria-labelledby', headingId);

  /* ---- Definition list: Artifact, Status, Updated ---- */
  const dl = document.createElement('dl');
  dl.className = 'ard__fields';

  /* Name row */
  const nameDt = document.createElement('dt');
  nameDt.className = 'ard__dt';
  nameDt.textContent = 'Artifact';
  const nameEl = document.createElement('dd');
  nameEl.className = 'ard__dd ard__dd--name';
  const nameGroup = document.createDocumentFragment();
  nameGroup.appendChild(nameDt);
  nameGroup.appendChild(nameEl);

  /* Status row */
  const statusDt = document.createElement('dt');
  statusDt.className = 'ard__dt';
  statusDt.textContent = 'Status';
  const statusEl = document.createElement('dd');
  statusEl.className = 'ard__dd ard__dd--status';
  /* Icon container (aria-hidden SVG injected by _renderContent) */
  const statusIconEl = document.createElement('span');
  statusIconEl.className = 'ard__status-icon';
  /* Visible status text */
  const statusTextEl = document.createElement('span');
  statusTextEl.className = 'ard__status-text';
  statusEl.appendChild(statusIconEl);
  statusEl.appendChild(statusTextEl);
  const statusGroup = document.createDocumentFragment();
  statusGroup.appendChild(statusDt);
  statusGroup.appendChild(statusEl);

  /* Last updated row */
  const updatedDt = document.createElement('dt');
  updatedDt.className = 'ard__dt';
  updatedDt.textContent = 'Updated';
  const updatedEl = document.createElement('time');
  updatedEl.className = 'ard__dd ard__dd--updated';
  const updatedGroup = document.createDocumentFragment();
  updatedGroup.appendChild(updatedDt);
  updatedGroup.appendChild(updatedEl);

  /* Wrap each dt/dd pair in a div for grid alignment across all rows */
  function _makeRow(frag) {
    const row = document.createElement('div');
    row.className = 'ard__row';
    row.appendChild(frag);
    return row;
  }

  dl.appendChild(_makeRow(nameGroup));
  dl.appendChild(_makeRow(statusGroup));
  dl.appendChild(_makeRow(updatedGroup));

  /* ---- Empty state ---- */
  const emptyEl = document.createElement('p');
  emptyEl.className = 'ard__empty';
  emptyEl.textContent = 'No artifact available for this screen.';
  emptyEl.setAttribute('hidden', '');

  /* ---- View full details button ---- */
  const viewBtn = document.createElement('button');
  viewBtn.type = 'button';
  viewBtn.className = 'ard__view';
  viewBtn.textContent = 'View full artifact details';

  body.appendChild(dl);
  body.appendChild(emptyEl);
  body.appendChild(viewBtn);

  /* Assemble into section */
  sectionEl.appendChild(header);
  sectionEl.appendChild(body);

  /* ---- Render artifact content ---- */
  _renderContent(nameEl, statusEl, statusIconEl, statusTextEl, updatedEl, emptyEl, viewBtn, data);

  /* ================================================================
     COLLAPSE TOGGLE
     Same aria-expanded / [hidden] pattern as Scaffold 8.
     ================================================================ */

  let _isCollapsed = false;

  function _setCollapsed(collapsed) {
    _isCollapsed = collapsed;
    if (collapsed) {
      body.setAttribute('hidden', '');
      toggleBtn.setAttribute('aria-expanded', 'false');
      toggleBtn.setAttribute('aria-label', 'Expand artifact reference');
    } else {
      body.removeAttribute('hidden');
      toggleBtn.setAttribute('aria-expanded', 'true');
      toggleBtn.setAttribute('aria-label', 'Collapse artifact reference');
    }
  }

  toggleBtn.addEventListener('click', () => {
    const next = !_isCollapsed;
    _setCollapsed(next);
    setItem(STORAGE_KEY, next ? 'true' : 'false');
    _announce(next ? 'Artifact reference collapsed.' : 'Artifact reference expanded.');
  });

  /* ================================================================
     VIEW FULL DETAILS BUTTON
     Opens the #artifactDrawer overlay via panelManager.
     panelManager tracks viewBtn as _lastTrigger and returns focus to
     it when the overlay is closed via Escape or the close button.
     ================================================================ */

  viewBtn.addEventListener('click', () => {
    openPanel('artifactDrawer', viewBtn);
  });

  /* ================================================================
     RESTORE COLLAPSE STATE
     Applied last so all DOM is in place before [hidden] is toggled.
     ================================================================ */

  const saved = getItem(STORAGE_KEY);
  if (saved === 'true') {
    _setCollapsed(true);
  }

  sectionEl.dataset.ardReady = 'true';
}

export { init };
