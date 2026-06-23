/* =============================================================================
   constraintEvaluationMatrix.js
   Scaffold Component 2 of 10 -- Constraint Evaluation Matrix
   Section 18 -- Working Memory Supports

   SPEC REFERENCE
   Section 18 -- Screen 1.1b.4 only.
   Four-column matrix: Constraint | Required? | Consequence if Ignored |
   Affected Artifacts.

   RESPONSIVE LAYOUT (JS-driven via matchMedia)
   >= 640px  Desktop / Tablet -- <table> inside a horizontally scrollable
             wrapper. Wrapper is keyboard-focusable so users can scroll
             with arrow keys when columns overflow.
    < 640px  Mobile -- accordion layout. One .cem__item per row; trigger
             label is the Constraint name. Body expands to show the other
             three fields as a definition list.
   Both layouts are built on init(). JS toggles the [hidden] attribute to
   switch between them. Only one layout is ever visible or in the AT tree.

   USAGE
   ─────────────────────────────────────────────────────────────────────────────
   HTML (one element on Screen 1.1b.4):

     <div class="cem" id="constraint-matrix"></div>

   JavaScript (in lesson 1.1b.4's screen script):

     import { init } from './js/scaffolds/constraintEvaluationMatrix.js';

     init(document.getElementById('constraint-matrix'), [
       {
         constraint:  'Regulatory compliance (HIPAA)',
         required:    'Yes',
         consequence: 'Legal exposure and failed audit',
         artifacts:   'MRHN_ScopeStatement_v1, MRHN_GovernanceLog_v1'
       },
       {
         constraint:  'IT security certification prerequisite',
         required:    'Yes',
         consequence: 'Learner ineligibility for the credential pathway',
         artifacts:   'MRHN_AudienceProfile_v1'
       },
     ]);

   CSS (link in <head> of Screen 1.1b.4, after tokens.css):

     <link rel="stylesheet" href="css/scaffolds/constraintEvaluationMatrix.css">
   ─────────────────────────────────────────────────────────────────────────────

   INPUTS
   • containerEl       (HTMLElement) -- .cem wrapper
   • rows              (Array)       -- array of row objects (see above)
       row.constraint   string -- constraint name or description
       row.required     string -- 'Yes' or 'No' (case-insensitive)
       row.consequence  string -- consequence if constraint is ignored
       row.artifacts    string -- affected artifact file names
   • options.caption   (string)      -- <caption> text and scroll-region label
                                        (default: 'Constraint Evaluation Matrix')

   OUTPUTS
   • Table layout    -- <table> with <thead> and <tbody>; wrapped for h-scroll
   • Accordion layout -- .cem__accordion with one .cem__item per row

   STATES (accordion items)
   • collapsed -- body [hidden]; trigger aria-expanded="false"
   • expanded  -- body visible; trigger aria-expanded="true"

   KEYBOARD
   • Table:     Tab to focus scroll wrapper; arrow keys scroll table horizontally
   • Accordion: Enter / Space toggle item (native <button> behavior)
                Escape collapses and returns focus to trigger;
                e.stopPropagation() prevents panelManager from also firing

   ARIA
   • Table caption: <caption class="sr-only"> -- consumed by AT only
   • Scroll wrapper: role="region" aria-label="[caption]" tabindex="0"
   • Accordion trigger: aria-expanded, aria-controls wired to body id
   • Announcement on accordion toggle:
       "[Constraint] details expanded." / "[Constraint] details collapsed."
   • Required? column: text value "Yes"/"No" is the AT signal;
     CSS class adds supplemental color (not the sole channel)

   TOUCH TARGETS
   • Accordion triggers: min-height 44px (enforced in CSS)

   DOM CONTRACT
   • #sr-announcer must exist before init() is called
   • containerEl must exist and must be empty on first call
   • Safe reinit: data-cem-ready="true" guards against double-init
   ============================================================================= */

const ANNOUNCER_ID = 'sr-announcer';
const MOBILE_MQ    = '(max-width: 639px)';

const COLUMNS = [
  { key: 'constraint',  label: 'Constraint' },
  { key: 'required',    label: 'Required?' },
  { key: 'consequence', label: 'Consequence if Ignored' },
  { key: 'artifacts',   label: 'Affected Artifacts' },
];

let _uidCounter = 0;

/* ---- Live region ---- */
function _announce(message) {
  const region = document.getElementById(ANNOUNCER_ID);
  if (!region || !message) return;
  region.textContent = '';
  requestAnimationFrame(() => { region.textContent = message; });
}

/* ---- Shared chevron SVG ---- */
function _chevronSVG() {
  return '<svg class="cem__chevron" width="16" height="16" viewBox="0 0 16 16" ' +
    'fill="none" focusable="false" aria-hidden="true">' +
    '<path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" ' +
    'stroke-linecap="round" stroke-linejoin="round"/></svg>';
}

/* ---- Resolve "required" text to canonical Yes/No ---- */
function _required(raw) {
  return (raw || '').toLowerCase().trim() === 'yes' ? 'Yes' : 'No';
}

/* ================================================================
   TABLE LAYOUT
   ================================================================ */

function _buildTable(rows, caption) {
  /* Scrollable wrapper -- keyboard-focusable for tablet arrow-key scroll */
  const wrapper = document.createElement('div');
  wrapper.className = 'cem__table-wrapper';
  wrapper.setAttribute('role', 'region');
  wrapper.setAttribute('aria-label', caption);
  wrapper.setAttribute('tabindex', '0');

  const table = document.createElement('table');
  table.className = 'cem__table';

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
    th.className = 'cem__th cem__th--' + col.key;
    th.textContent = col.label;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  /* tbody */
  const tbody = document.createElement('tbody');
  rows.forEach((row, i) => {
    const tr = document.createElement('tr');
    tr.className = 'cem__tr' + (i % 2 === 1 ? ' cem__tr--alt' : '');

    COLUMNS.forEach(col => {
      const td = document.createElement('td');
      td.className = 'cem__td cem__td--' + col.key;

      if (col.key === 'required') {
        const val = _required(row.required);
        td.textContent = val;
        td.classList.add('cem__required--' + val.toLowerCase());
      } else {
        td.textContent = row[col.key] || '';
      }

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

function _expandItem(trigger, body, constraintText) {
  trigger.setAttribute('aria-expanded', 'true');
  trigger.classList.add('cem__item-trigger--expanded');
  body.removeAttribute('hidden');
  _announce((constraintText || 'Constraint') + ' details expanded.');
}

function _collapseItem(trigger, body, constraintText) {
  trigger.setAttribute('aria-expanded', 'false');
  trigger.classList.remove('cem__item-trigger--expanded');
  body.setAttribute('hidden', '');
  _announce((constraintText || 'Constraint') + ' details collapsed.');
}

function _buildAccordion(rows) {
  _uidCounter += 1;
  const baseUid = 'cem-' + _uidCounter;

  const accordion = document.createElement('div');
  accordion.className = 'cem__accordion';

  rows.forEach((row, i) => {
    const bodyId        = baseUid + '-body-' + i;
    const constraintText = row.constraint || '(Constraint)';

    const item = document.createElement('div');
    item.className = 'cem__item';

    /* Trigger */
    const trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.className = 'cem__item-trigger';
    trigger.setAttribute('aria-expanded', 'false');
    trigger.setAttribute('aria-controls', bodyId);

    const labelSpan = document.createElement('span');
    labelSpan.className = 'cem__item-label';
    labelSpan.textContent = constraintText;

    const chevronSpan = document.createElement('span');
    chevronSpan.className = 'cem__item-chevron';
    chevronSpan.innerHTML = _chevronSVG();

    trigger.appendChild(labelSpan);
    trigger.appendChild(chevronSpan);

    /* Body -- collapsed by default */
    const body = document.createElement('div');
    body.className = 'cem__item-body';
    body.id = bodyId;
    body.setAttribute('hidden', '');

    /* Definition list: Required?, Consequence if Ignored, Affected Artifacts */
    const dl = document.createElement('dl');
    dl.className = 'cem__item-dl';

    const detailCols = COLUMNS.filter(c => c.key !== 'constraint');
    detailCols.forEach(col => {
      const dt = document.createElement('dt');
      dt.className = 'cem__item-dt';
      dt.textContent = col.label;

      const dd = document.createElement('dd');
      dd.className = 'cem__item-dd cem__item-dd--' + col.key;

      if (col.key === 'required') {
        const val = _required(row.required);
        dd.textContent = val;
        dd.classList.add('cem__required--' + val.toLowerCase());
      } else {
        dd.textContent = row[col.key] || '';
      }

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
        _collapseItem(trigger, body, constraintText);
      } else {
        _expandItem(trigger, body, constraintText);
      }
    });

    /* Escape collapses -- stopPropagation prevents panelManager from firing */
    item.addEventListener('keydown', e => {
      if (e.key !== 'Escape') return;
      if (trigger.getAttribute('aria-expanded') !== 'true') return;
      e.stopPropagation();
      _collapseItem(trigger, body, constraintText);
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
 * Builds both layouts, applies the initial breakpoint, and wires
 * a matchMedia listener to switch between them on viewport change.
 *
 * @param {HTMLElement} containerEl
 * @param {Array}       rows
 * @param {Object}      [options]
 * @param {string}      [options.caption='Constraint Evaluation Matrix']
 */
function init(containerEl, rows = [], options = {}) {
  if (!containerEl || containerEl.dataset.cemReady === 'true') return;

  const caption      = options.caption || 'Constraint Evaluation Matrix';
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

  containerEl.dataset.cemReady = 'true';
}

export { init };
