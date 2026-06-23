/* =============================================================================
   diagnosticLensOrganizer.js
   Scaffold Component 3 of 10 -- Diagnostic Lens Organizer
   Section 18 -- Working Memory Supports

   SPEC REFERENCE
   Section 18 -- Screen 3.1.2 only.
   Five-category diagnostic review panel with synthesis prompt.
   Categories: Missing Elements | Misalignments | Dependency Issues |
               Governance Conflicts | Traceability Gaps
   Prompt: "What pattern appears first?"

   USAGE
   ─────────────────────────────────────────────────────────────────────────────
   HTML (one element on Screen 3.1.2):

     <div class="dlo" id="diagnostic-lens-organizer"></div>

   JavaScript (in lesson 3.1.2's screen script):

     import { init } from './js/scaffolds/diagnosticLensOrganizer.js';

     init(document.getElementById('diagnostic-lens-organizer'), {
       screenId: 'screen_3_1_2',
       heading:  'Diagnostic Review',
       lenses: [
         {
           key:         'missing',
           label:       'Missing Elements',
           description: 'What elements required by the course specification are absent?'
         },
         {
           key:         'misalign',
           label:       'Misalignments',
           description: 'Where do objectives, assessments, or strategies conflict?'
         },
         {
           key:         'dependency',
           label:       'Dependency Issues',
           description: 'What depends on an unresolved element or external decision?'
         },
         {
           key:         'governance',
           label:       'Governance Conflicts',
           description: 'Where does the architecture violate a documented constraint?'
         },
         {
           key:         'traceability',
           label:       'Traceability Gaps',
           description: 'Where can you not trace from outcome to evidence to assessment?'
         },
       ],
       prompt: 'What pattern appears first?',
     });

   CSS (link in <head> of Screen 3.1.2, after tokens.css):

     <link rel="stylesheet" href="css/scaffolds/diagnosticLensOrganizer.css">
   ─────────────────────────────────────────────────────────────────────────────

   INPUTS
   config.screenId     (string)  -- localStorage namespace; required
   config.heading      (string)  -- optional <h2> panel heading
   config.lenses       (Array)   -- array of lens objects; defaults to five
                                    standard lenses if omitted
   config.prompt       (string)  -- synthesis question text
                                    (default: 'What pattern appears first?')

   LENS OBJECT
   { key, label, description }
   key          (string) -- unique identifier; used in localStorage key
   label        (string) -- trigger button label and textarea label prefix
   description  (string) -- optional guiding question shown inside lens body

   STATES (per lens)
   collapsed -- body [hidden]; trigger aria-expanded="false"
   expanded  -- body visible;  trigger aria-expanded="true"
   All lenses default to collapsed.

   PERSISTENCE
   Each lens textarea and the synthesis textarea auto-save to localStorage.
   Silent debounced save fires 1000ms after last keystroke.
   Immediate save + announcement fires on textarea blur.
   Storage key format:  dlo_[screenId]_[lensKey]
   Synthesis key:       dlo_[screenId]_pattern
   Saved values are restored on init() -- progress is preserved across sessions.

   KEYBOARD
   Lens trigger:  Enter / Space to toggle (native <button> behavior)
   Escape:        collapse lens, return focus to trigger;
                  e.stopPropagation() prevents panelManager from also firing
   Tab / Shift+Tab: natural flow through trigger, description, textarea

   ARIA
   Lens triggers:   aria-expanded, aria-controls wired to body id
   Textarea labels: explicit <label> with for/id pairing
   aria-describedby on textarea when description paragraph is present
   Announcements (into #sr-announcer):
     "[Lens label] lens expanded."
     "[Lens label] lens collapsed."
     "Observations saved."  (on blur)
     "Response saved."      (on synthesis blur)

   HEADING HIERARCHY
   config.heading renders as <h2> -- appropriate when screen <h1> is present.
   Synthesis prompt renders as <h3> inside a <section> with aria-labelledby.
   Screen author must ensure the surrounding heading context is correct.

   DOM CONTRACT
   #sr-announcer must exist before init() is called.
   Safe reinit: data-dlo-ready="true" guards against double-init.
   ============================================================================= */

import { getItem, setItem } from '../storage.js';

const ANNOUNCER_ID = 'sr-announcer';

const DEFAULT_LENSES = [
  { key: 'missing',      label: 'Missing Elements',     description: '' },
  { key: 'misalign',     label: 'Misalignments',        description: '' },
  { key: 'dependency',   label: 'Dependency Issues',    description: '' },
  { key: 'governance',   label: 'Governance Conflicts', description: '' },
  { key: 'traceability', label: 'Traceability Gaps',    description: '' },
];

const DEFAULT_PROMPT = 'What pattern appears first?';

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
  return '<svg class="dlo__chevron" width="16" height="16" viewBox="0 0 16 16" ' +
    'fill="none" focusable="false" aria-hidden="true">' +
    '<path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" ' +
    'stroke-linecap="round" stroke-linejoin="round"/></svg>';
}

/* ---- Storage key helper ---- */
function _storageKey(screenId, suffix) {
  return 'dlo_' + screenId + '_' + suffix;
}

/* ---- Expand a lens ---- */
function _expandLens(trigger, body, label) {
  trigger.setAttribute('aria-expanded', 'true');
  trigger.classList.add('dlo__lens-trigger--expanded');
  body.removeAttribute('hidden');
  _announce(label + ' lens expanded.');
}

/* ---- Collapse a lens ---- */
function _collapseLens(trigger, body, label) {
  trigger.setAttribute('aria-expanded', 'false');
  trigger.classList.remove('dlo__lens-trigger--expanded');
  body.setAttribute('hidden', '');
  _announce(label + ' lens collapsed.');
}

/* ---- Wire persistence to a textarea ---- */
function _wireSave(textarea, storageKey, announcement) {
  let saveTimer = null;

  /* Debounced silent save -- protects against rapid keystrokes */
  textarea.addEventListener('input', () => {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
      setItem(storageKey, textarea.value);
    }, 1000);
  });

  /* Immediate save + announcement on blur */
  textarea.addEventListener('blur', () => {
    clearTimeout(saveTimer);
    setItem(storageKey, textarea.value);
    _announce(announcement);
  });
}

/* ================================================================
   BUILD FUNCTIONS
   ================================================================ */

/* ---- Build a single lens accordion item ---- */
function _buildLens(lens, screenId, bodyId, index) {
  const item = document.createElement('div');
  item.className = 'dlo__lens';
  item.setAttribute('role', 'listitem');

  /* ---- Trigger ---- */
  const trigger = document.createElement('button');
  trigger.type = 'button';
  trigger.className = 'dlo__lens-trigger';
  trigger.setAttribute('aria-expanded', 'false');
  trigger.setAttribute('aria-controls', bodyId);

  /* Index badge -- decorative count indicator, aria-hidden */
  const badge = document.createElement('span');
  badge.className = 'dlo__lens-badge';
  badge.setAttribute('aria-hidden', 'true');
  badge.textContent = String(index + 1);

  const labelSpan = document.createElement('span');
  labelSpan.className = 'dlo__lens-label';
  labelSpan.textContent = lens.label;

  const chevronSpan = document.createElement('span');
  chevronSpan.className = 'dlo__lens-chevron';
  chevronSpan.innerHTML = _chevronSVG();

  trigger.appendChild(badge);
  trigger.appendChild(labelSpan);
  trigger.appendChild(chevronSpan);

  /* ---- Body (collapsed by default) ---- */
  const body = document.createElement('div');
  body.className = 'dlo__lens-body';
  body.id = bodyId;
  body.setAttribute('hidden', '');

  /* Optional description paragraph */
  let descId = null;
  if (lens.description) {
    descId = bodyId + '-desc';
    const desc = document.createElement('p');
    desc.className = 'dlo__lens-description';
    desc.id = descId;
    desc.textContent = lens.description;
    body.appendChild(desc);
  }

  /* Observation textarea */
  const fieldDiv = document.createElement('div');
  fieldDiv.className = 'dlo__lens-field';

  const textareaId = bodyId + '-input';

  const fieldLabel = document.createElement('label');
  fieldLabel.className = 'dlo__lens-field-label';
  fieldLabel.htmlFor = textareaId;
  fieldLabel.textContent = 'Your observations for ' + lens.label;

  const textarea = document.createElement('textarea');
  textarea.className = 'dlo__lens-textarea';
  textarea.id = textareaId;
  textarea.rows = 4;
  textarea.placeholder = 'Note what you observe under this lens...';
  if (descId) {
    textarea.setAttribute('aria-describedby', descId);
  }

  /* Restore saved observations */
  const saved = getItem(_storageKey(screenId, lens.key));
  if (saved) textarea.value = saved;

  _wireSave(textarea, _storageKey(screenId, lens.key), 'Observations saved.');

  fieldDiv.appendChild(fieldLabel);
  fieldDiv.appendChild(textarea);
  body.appendChild(fieldDiv);

  item.appendChild(trigger);
  item.appendChild(body);

  /* ---- Toggle on click ---- */
  trigger.addEventListener('click', () => {
    const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
    if (isExpanded) {
      _collapseLens(trigger, body, lens.label);
    } else {
      _expandLens(trigger, body, lens.label);
    }
  });

  /* ---- Escape collapses -- stopPropagation prevents panelManager from firing ---- */
  item.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    if (trigger.getAttribute('aria-expanded') !== 'true') return;
    e.stopPropagation();
    _collapseLens(trigger, body, lens.label);
    trigger.focus();
  });

  return item;
}

/* ---- Build the synthesis prompt section ---- */
function _buildPrompt(promptText, screenId, uid) {
  const headingId  = uid + '-prompt-heading';
  const textareaId = uid + '-prompt-input';

  const section = document.createElement('section');
  section.className = 'dlo__prompt';
  section.setAttribute('aria-labelledby', headingId);

  const heading = document.createElement('h3');
  heading.className = 'dlo__prompt-heading';
  heading.id = headingId;
  heading.textContent = promptText;

  /* sr-only label -- heading already names the section visually */
  const fieldLabel = document.createElement('label');
  fieldLabel.className = 'sr-only';
  fieldLabel.htmlFor = textareaId;
  fieldLabel.textContent = 'Your response: ' + promptText;

  const textarea = document.createElement('textarea');
  textarea.className = 'dlo__prompt-textarea';
  textarea.id = textareaId;
  textarea.rows = 5;
  textarea.placeholder = 'Describe the pattern you noticed most immediately across these five lenses...';

  /* Restore saved synthesis response */
  const saved = getItem(_storageKey(screenId, 'pattern'));
  if (saved) textarea.value = saved;

  _wireSave(textarea, _storageKey(screenId, 'pattern'), 'Response saved.');

  section.appendChild(heading);
  section.appendChild(fieldLabel);
  section.appendChild(textarea);

  return section;
}

/* ============================================================
   PUBLIC API
   ============================================================ */

/**
 * init(containerEl, config)
 * Builds the Diagnostic Lens Organizer: optional heading, five lens
 * accordions, and a synthesis prompt. Restores saved values from localStorage.
 * Idempotent -- safe to call multiple times on the same element.
 *
 * @param {HTMLElement} containerEl
 * @param {Object}      config
 * @param {string}      config.screenId         -- localStorage namespace (required)
 * @param {string}      [config.heading]        -- <h2> panel heading (optional)
 * @param {Array}       [config.lenses]         -- array of { key, label, description }
 *                                                 defaults to five standard lenses
 * @param {string}      [config.prompt]         -- synthesis question
 *                                                 (default: 'What pattern appears first?')
 */
function init(containerEl, config = {}) {
  if (!containerEl || containerEl.dataset.dloReady === 'true') return;

  const screenId = config.screenId || 'screen_3_1_2';
  const lenses   = (config.lenses && config.lenses.length) ? config.lenses : DEFAULT_LENSES;
  const prompt   = config.prompt  || DEFAULT_PROMPT;

  _uidCounter += 1;
  const uid = 'dlo-' + _uidCounter;

  /* Optional panel heading */
  if (config.heading) {
    const heading = document.createElement('h2');
    heading.className = 'dlo__heading';
    heading.textContent = config.heading;
    containerEl.appendChild(heading);
  }

  /* Lens list */
  const lensesEl = document.createElement('div');
  lensesEl.className = 'dlo__lenses';
  lensesEl.setAttribute('role', 'list');

  lenses.forEach((lens, i) => {
    const bodyId = uid + '-body-' + i;
    lensesEl.appendChild(_buildLens(lens, screenId, bodyId, i));
  });

  containerEl.appendChild(lensesEl);

  /* Synthesis prompt */
  containerEl.appendChild(_buildPrompt(prompt, screenId, uid));

  containerEl.dataset.dloReady = 'true';
}

export { init };
