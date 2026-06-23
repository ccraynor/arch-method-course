/* =============================================================================
   argumentEvaluationMatrix.js
   Scaffold Component 5 of 10 -- Argument Evaluation Matrix
   Section 18 -- Working Memory Supports

   SPEC REFERENCE
   Section 18 -- Screen 4.5.4 only.
   Five-column matrix: Option | Evidence | Constraints | Traceability |
   Risk Coverage.

   ARCHITECTURE NOTE
   This component shares the same responsive pattern as Scaffold 2
   (constraintEvaluationMatrix.js). Key differences:
   -- Five columns instead of four
   -- All column values are plain text; no normalization helpers required
   -- Accordion trigger label comes from the Option column (not Constraint)
   -- CSS class prefix is aem__ throughout

   RESPONSIVE LAYOUT (JS-driven via matchMedia)
   >= 640px  Desktop / Tablet -- <table> in a horizontally scrollable wrapper.
              Wrapper is keyboard-focusable for tablet arrow-key scroll.
    < 640px  Mobile          -- accordion layout. One .aem__item per row.
              Trigger label = Option text. Body = dl with four detail columns.
   Both layouts are built on init(). JS toggles [hidden] to switch between them.
   Only one layout is ever visible or in the AT tree at a time.

   USAGE
   ─────────────────────────────────────────────────────────────────────────────
   HTML (one element on Screen 4.5.4):

     <div class="aem" id="argument-matrix"></div>

   JavaScript (in lesson 4.5.4's screen script):

     import { init } from './js/scaffolds/argumentEvaluationMatrix.js';

     init(document.getElementById('argument-matrix'), [
       {
         option:       'Modular redesign with phased rollout',
         evidence:     'Supports the three-tier competency model (SI-04)',
         constraints:  'Requires governance approval for phased delivery',
         traceability: 'Traces to DC-12 through DC-15',
         riskCoverage: 'Addresses regulatory and sequencing risks'
       },
       {
         option:       'Single-cohort intensive format',
         evidence:     'Matches available delivery window in Q3',
         constraints:  'Conflicts with audience availability constraint (SI-07)',
         traceability: 'Partial trace to DC-08; DC-11 unresolved',
         riskCoverage: 'Leaves scheduling risk unaddressed'
       },
     ]);

   CSS (link in <head> of Screen 4.5.4, after tokens.css):

     <link rel="stylesheet" href="css/scaffolds/argumentEvaluationMatrix.css">
   ─────────────────────────────────────────────────────────────────────────────

   INPUTS
   • containerEl          (HTMLElement) -- .aem wrapper
   • rows                 (Array)       -- array of row objects (see above)
       row.option          string -- option name or short identifier
       row.evidence        string -- supporting evidence for this option
       row.constraints     string -- constraints this option engages
       row.traceability    string -- traceability connections
       row.riskCoverage    string -- risks this option covers or leaves open
   • options.caption      (string)      -- <caption> text and scroll-region label
                                           (default: 'Argument Evaluation Matrix')

   OUTPUTS
   • Table layout    -- <table> with <thead>/<tbody>, wrapped for h-scroll
   • Accordion layout -- .aem__accordion with one .aem__item per row

   STATES (accordion items)
   • collapsed -- body [hidden]; trigger aria-expanded="false"
   • expanded  -- body visible;  trigger aria-expanded="true"

   KEYBOARD
   • Table:     Tab to scroll wrapper; arrow keys scroll horizontally
   • Accordion: Enter / Space toggle (native <button> behavior)
                Escape collapses, returns focus to trigger;
                e.stopPropagation() prevents panelManager from also firing

   ARIA
   • Table caption: <caption class="sr-only"> -- consumed by AT only
   • Scroll wrapper: role="region" aria-label="[caption]" tabindex="0"
   • Accordion trigger: aria-expanded, aria-controls wired to body id
   • Announcement on accordion toggle:
       "[Option text] details expanded."
       "[Option text] details collapsed."

   TOUCH TARGETS
   • Accordion triggers: min-height 44px (enforced in CSS)

   DOM CONTRACT
   • #sr-announcer must exist before init() is called
   • Safe reinit: data-aem-ready="true" guards against double-init
   ============================================================================= */

const ANNOUNCER_ID = 'sr-announcer';
const MOBILE_MQ    = '(max-width: 639px)';

const COLUMNS = [
  { key: 'option',       label: 'Option' },
  { key: 'evidence',     label: 'Evidence' },
  { key: 'constraints',  label: 'Constraints' },
  { key: 'traceability', label: 'Traceability' },
  { key: 'riskCoverage', label: 'Risk Coverage' },
];

let _uidCounter = 0;

/* ---- Live region ---- */
function _announce(message) {
  const region = document.getElementById(ANNOUNCER_ID);
  if (!region || !message) return;
  region.textContent = '';
  requestAnimationFrame(() => { region.textContent = message; });
}

/* ---- Chevron SVG (decorative) ---- */
function _chevronSVG() {
  return '<svg class="aem__chevron" width="16" height="16" viewBox="0 0 16 16" ' +
    'fill="none" focusable="false" aria-hidden="true">' +
    '<path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" ' +
    'stroke-linecap="round" stroke-linejoin="round"/></svg>';
}

/* ================================================================
   TABLE LAYOUT
   ================================================================ */

function _buildTable(rows, caption) {
  /* Scrollable wrapper -- keyboard-focusable for tablet arrow-key scroll */
  const wrapper = document.createElement('div');
  wrapper.className = 'aem__table-wrapper';
  wrapper.setAttribute('role', 'region');
  wrapper.setAttribute('aria-label', caption);
  wrapper.setAttribute('tabindex', '0');

  const table = document.createElement('table');
  table.className = 'aem__table';

  /* Caption -- visually hidden; consumed by AT */
  const cap = document.createElement('caption');
  cap.className = 'sr-only';
  cap.textContent = caption;
  table.appendChild(cap);

  /* thead */
  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');
  COLUMNS.forEach(col => {
    const th = document.createElement('th');
    th.scope = 'col';
    th.className = 'aem__th aem__th--' + col.key;
    th.textContent = col.label;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  /* tbody */
  const tbody = document.createElement('tbody');
  rows.forEach((row, i) => {
    const tr = document.createElement('tr');
    tr.className = 'aem__tr' + (i % 2 === 1 ? ' aem__tr--alt' : '');

    COLUMNS.forEach(col => {
      const td = document.createElement('td');
      td.className = 'aem__td aem__td--' + col.key;
      td.textContent = row[col.key] || '';
      tr.appendChild(td);
    });

    tbody.appendChild(tr);
  });
  table.appendChild(tbody);

  wrapper.appendChild(table);
  return wrapper;
}

/* ================================================================
   ACCORDION LAYOUT
   ================================================================ */

function _expandItem(trigger, body, optionText) {
  trigger.setAttribute('aria-expanded', 'true');
  trigger.classList.add('aem__item-trigger--expanded');
  body.removeAttribute('hidden');
  _announce((optionText || 'Option') + ' details expanded.');
}

function _collapseItem(trigger, body, optionText) {
  trigger.setAttribute('aria-expanded', 'false');
  trigger.classList.remove('aem__item-trigger--expanded');
  body.setAttribute('hidden', '');
  _announce((optionText || 'Option') + ' details collapsed.');
}

function _buildAccordion(rows) {
  _uidCounter += 1;
  const baseUid = 'aem-' + _uidCounter;

  const accordion = document.createElement('div');
  accordion.className = 'aem__accordion';

  rows.forEach((row, i) => {
    const bodyId     = baseUid + '-body-' + i;
    const optionText = row.option || '(Option)';

    const item = document.createElement('div');
    item.className = 'aem__item';

    /* Trigger -- Option text as the label */
    const trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.className = 'aem__item-trigger';
    trigger.setAttribute('aria-expanded', 'false');
    trigger.setAttribute('aria-controls', bodyId);

    const labelSpan = document.createElement('span');
    labelSpan.className = 'aem__item-label';
    labelSpan.textContent = optionText;

    const chevronSpan = document.createElement('span');
    chevronSpan.className = 'aem__item-chevron';
    chevronSpan.innerHTML = _chevronSVG();

    trigger.appendChild(labelSpan);
    trigger.appendChild(chevronSpan);

    /* Body -- collapsed by default */
    const body = document.createElement('div');
    body.className = 'aem__item-body';
    body.id = bodyId;
    body.setAttribute('hidden', '');

    /* Definition list: Evidence, Constraints, Traceability, Risk Coverage */
    const dl = document.createElement('dl');
    dl.className = 'aem__item-dl';

    const detailCols = COLUMNS.filter(c => c.key !== 'option');
    detailCols.forEach(col => {
      const dt = document.createElement('dt');
      dt.className = 'aem__item-dt';
      dt.textContent = col.label;

      const dd = document.createElement('dd');
      dd.className = 'aem__item-dd aem__item-dd--' + col.key;
      dd.textContent = row[col.key] || '';

      dl.appendChild(dt);
      dl.appendChild(dd);
    });

    body.appendChild(dl);
    item.appendChild(trigger);
    item.appendChild(body);
    accordion.appendChild(item);

    /* Toggle on click */
    trigger.addEventListener('click', () => {
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        _collapseItem(trigger, body, optionText);
      } else {
        _expandItem(trigger, body, optionText);
      }
    });

    /* Escape collapses -- stopPropagation prevents panelManager from firing */
    item.addEventListener('keydown', e => {
      if (e.key !== 'Escape') return;
      if (trigger.getAttribute('aria-expanded') !== 'true') return;
      e.stopPropagation();
      _collapseItem(trigger, body, optionText);
      trigger.focus();
    });
  });

  return accordion;
}

/* ================================================================
   BREAKPOINT SWITCH
   ================================================================ */

function _applyBreakpoint(isMobile, tableWrapper, accordion) {
  if (isMobile) {
    tableWrapper.setAttribute('hidden', '');
    accordion.removeAttribute('hidden');
  } else {
    tableWrapper.removeAttribute('hidden');
    accordion.setAttribute('hidden', '');
  }
}

/* ============================================================
   PUBLIC API
   ============================================================ */

/**
 * init(containerEl, rows, options)
 * Builds both table and accordion layouts, applies the initial breakpoint,
 * and wires a matchMedia listener to switch on viewport change.
 * Idempotent -- safe to call multiple times on the same element.
 *
 * @param {HTMLElement} containerEl
 * @param {Array}       rows
 * @param {Object}      [options]
 * @param {string}      [options.caption='Argument Evaluation Matrix']
 */
function init(containerEl, rows = [], options = {}) {
  if (!containerEl || containerEl.dataset.aemReady === 'true') return;

  const caption      = options.caption || 'Argument Evaluation Matrix';
  const tableWrapper = _buildTable(rows, caption);
  const accordion    = _buildAccordion(rows);

  containerEl.appendChild(tableWrapper);
  containerEl.appendChild(accordion);

  /* Apply correct layout before first paint */
  const mq = window.matchMedia(MOBILE_MQ);
  _applyBreakpoint(mq.matches, tableWrapper, accordion);

  /* Switch layout on viewport change */
  mq.addEventListener('change', e => {
    _applyBreakpoint(e.matches, tableWrapper, accordion);
  });

  containerEl.dataset.aemReady = 'true';
}

export { init };
