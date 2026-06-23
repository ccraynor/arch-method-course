/* =============================================================================
   verificationTracker.js
   Scaffold Component 4 of 10 -- Verification Tracker Chain Visual
   Section 18 -- Working Memory Supports

   SPEC REFERENCE
   Section 18 -- Screen 4.3.3 only.
   Linear chain display: Goal > Competency > Assessment > Evidence >
   Governance Record. Learner marks each node as Verified or Gap Identified.
   Synthesis prompt: "Where does the chain break?"

   USAGE
   ─────────────────────────────────────────────────────────────────────────────
   HTML (one element on Screen 4.3.3):

     <div class="vtc" id="verification-tracker"></div>

   JavaScript (in lesson 4.3.3's screen script):

     import { init } from './js/scaffolds/verificationTracker.js';

     init(document.getElementById('verification-tracker'), {
       screenId: 'screen_4_3_3',
       heading:  'Traceability Chain Verification',
       nodes: [
         {
           key:         'goal',
           label:       'Goal',
           description: 'The terminal performance outcome the course addresses.'
         },
         {
           key:         'competency',
           label:       'Competency',
           description: 'The bounded competency statement derived from the goal.'
         },
         {
           key:         'assessment',
           label:       'Assessment',
           description: 'The performance task that tests the competency directly.'
         },
         {
           key:         'evidence',
           label:       'Evidence',
           description: 'The artifact or work product the assessment produces.'
         },
         {
           key:         'governance',
           label:       'Governance Record',
           description: 'The governance log entry that documents the decision chain.'
         },
       ],
       prompt: 'Where does the chain break?',
     });

   CSS (link in <head> of Screen 4.3.3, after tokens.css):

     <link rel="stylesheet" href="css/scaffolds/verificationTracker.css">
   ─────────────────────────────────────────────────────────────────────────────

   INPUTS
   config.screenId     (string)  -- localStorage namespace; required
   config.heading      (string)  -- optional <h2> panel heading
   config.nodes        (Array)   -- array of node objects (see NODE OBJECT)
                                    defaults to five standard chain nodes
   config.prompt       (string)  -- synthesis question
                                    (default: 'Where does the chain break?')

   NODE OBJECT
   { key, label, description }
   key          (string) -- unique identifier; used in localStorage key
   label        (string) -- displayed as node heading and button aria context
   description  (string) -- optional explanatory text for the node's role

   NODE STATES
   unreviewed   -- default; neither button is active
   verified     -- "Mark Verified" is active (aria-pressed="true")
   gap          -- "Identify Gap" is active (aria-pressed="true")

   BUTTON TOGGLE BEHAVIOR
   Clicking an inactive button activates it and deactivates the other.
   Clicking the already-active button clears back to "unreviewed".
   This allows learners to revise their assessment without a hard reset.

   PERSISTENCE
   Node statuses saved individually to localStorage on every status change.
   Synthesis textarea: debounced save on input (1000ms), immediate save on blur.
   All saved values restored on init().
   Storage key format:  vtc_[screenId]_[nodeKey]
   Synthesis key:       vtc_[screenId]_pattern

   KEYBOARD
   Tab / Shift+Tab: moves through all interactive elements in DOM order
   Buttons use aria-pressed -- Enter / Space toggle them (native behavior)
   No custom key handling needed for status buttons

   ARIA
   Node status buttons: role="group" aria-label="Status for [Node label]"
   Each button: aria-pressed="true|false"
   Icon SVGs: aria-hidden="true" throughout; state communicated by button text
              and .vtc__node-status-text (visible text, not live region)
   Announcement on status change (into #sr-announcer):
     "[Node label]: Verified."
     "[Node label]: Gap identified."
     "[Node label]: Status cleared."
   Announcement on synthesis save: "Response saved."

   HEADING HIERARCHY
   config.heading renders as <h2>.
   Node labels render as <h3> -- requires config.heading or equivalent
   <h2> to be present in surrounding context.
   Synthesis prompt renders as <h3> inside <section aria-labelledby>.

   ICON APPROACH
   All SVG icons use currentColor for both fill and stroke.
   Color is set on the parent .vtc__node-status-icon via CSS data-attribute
   selector on .vtc__node[data-status]. No hardcoded color values in SVGs.

   DOM CONTRACT
   #sr-announcer must exist before init() is called.
   Safe reinit: data-vtc-ready="true" guards against double-init.
   ============================================================================= */

import { getItem, setItem } from '../storage.js';

const ANNOUNCER_ID = 'sr-announcer';

const STATUS = Object.freeze({
  UNREVIEWED: 'unreviewed',
  VERIFIED:   'verified',
  GAP:        'gap',
});

const DEFAULT_NODES = [
  { key: 'goal',       label: 'Goal',             description: '' },
  { key: 'competency', label: 'Competency',        description: '' },
  { key: 'assessment', label: 'Assessment',        description: '' },
  { key: 'evidence',   label: 'Evidence',          description: '' },
  { key: 'governance', label: 'Governance Record', description: '' },
];

const DEFAULT_PROMPT = 'Where does the chain break?';

let _uidCounter = 0;

/* ---- Live region ---- */
function _announce(message) {
  const region = document.getElementById(ANNOUNCER_ID);
  if (!region || !message) return;
  region.textContent = '';
  requestAnimationFrame(() => { region.textContent = message; });
}

/* ---- Storage key ---- */
function _storageKey(screenId, suffix) {
  return 'vtc_' + screenId + '_' + suffix;
}

/* ================================================================
   STATUS ICONS
   All use currentColor. CSS on .vtc__node[data-status] sets the color
   on .vtc__node-status-icon, which SVGs inherit via currentColor.
   ================================================================ */

function _iconUnreviewed() {
  return '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" ' +
    'focusable="false" aria-hidden="true">' +
    '<circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5" ' +
    'stroke-dasharray="4 2.5"/></svg>';
}

function _iconVerified() {
  return '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" ' +
    'focusable="false" aria-hidden="true">' +
    '<circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.12"/>' +
    '<circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5"/>' +
    '<path d="M7.5 12l3 3 6-6" stroke="currentColor" stroke-width="2" ' +
    'stroke-linecap="round" stroke-linejoin="round"/></svg>';
}

function _iconGap() {
  return '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" ' +
    'focusable="false" aria-hidden="true">' +
    '<circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.12"/>' +
    '<circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5"/>' +
    '<path d="M8.5 8.5l7 7M15.5 8.5l-7 7" stroke="currentColor" stroke-width="2" ' +
    'stroke-linecap="round"/></svg>';
}

/* ---- Connector arrow SVG (aria-hidden, rotated on mobile via CSS) ---- */
function _connectorSVG() {
  return '<svg class="vtc__connector-arrow" width="24" height="24" ' +
    'viewBox="0 0 24 24" fill="none" focusable="false" aria-hidden="true">' +
    '<path d="M5 12h14" stroke="currentColor" stroke-width="1.5" ' +
    'stroke-linecap="round"/>' +
    '<path d="M14 7l5 5-5 5" stroke="currentColor" stroke-width="1.5" ' +
    'stroke-linecap="round" stroke-linejoin="round"/></svg>';
}

/* ================================================================
   STATE APPLICATION
   Central function -- updates DOM to reflect the given status.
   Called on click and on init() restoration.
   ================================================================ */

function _applyStatus(nodeEl, statusIconEl, statusTextEl, verifyBtn, gapBtn, status) {
  nodeEl.dataset.status = status;

  if (status === STATUS.VERIFIED) {
    statusIconEl.innerHTML = _iconVerified();
    statusTextEl.textContent = 'Verified';
    verifyBtn.setAttribute('aria-pressed', 'true');
    gapBtn.setAttribute('aria-pressed', 'false');
  } else if (status === STATUS.GAP) {
    statusIconEl.innerHTML = _iconGap();
    statusTextEl.textContent = 'Gap identified';
    verifyBtn.setAttribute('aria-pressed', 'false');
    gapBtn.setAttribute('aria-pressed', 'true');
  } else {
    statusIconEl.innerHTML = _iconUnreviewed();
    statusTextEl.textContent = 'Not reviewed yet';
    verifyBtn.setAttribute('aria-pressed', 'false');
    gapBtn.setAttribute('aria-pressed', 'false');
  }
}

/* ================================================================
   BUILD: CHAIN NODE
   ================================================================ */

function _buildNode(node, screenId, labelId) {
  const nodeEl = document.createElement('div');
  nodeEl.className = 'vtc__node';
  nodeEl.dataset.status = STATUS.UNREVIEWED;

  /* -- Status icon (top of card, changes with state) -- */
  const statusIconEl = document.createElement('div');
  statusIconEl.className = 'vtc__node-status-icon';
  statusIconEl.innerHTML = _iconUnreviewed();

  /* -- Label -- */
  const labelEl = document.createElement('h3');
  labelEl.className = 'vtc__node-label';
  labelEl.id = labelId;
  labelEl.textContent = node.label;

  /* -- Optional description -- */
  let descEl = null;
  if (node.description) {
    descEl = document.createElement('p');
    descEl.className = 'vtc__node-description';
    descEl.textContent = node.description;
  }

  /* -- Status text (visible label, not a live region) -- */
  const statusTextEl = document.createElement('p');
  statusTextEl.className = 'vtc__node-status-text';
  statusTextEl.textContent = 'Not reviewed yet';

  /* -- Action buttons -- */
  const actionsEl = document.createElement('div');
  actionsEl.className = 'vtc__node-actions';
  actionsEl.setAttribute('role', 'group');
  actionsEl.setAttribute('aria-label', 'Status for ' + node.label);

  const verifyBtn = document.createElement('button');
  verifyBtn.type = 'button';
  verifyBtn.className = 'vtc__btn vtc__btn--verify';
  verifyBtn.setAttribute('aria-pressed', 'false');
  verifyBtn.textContent = 'Mark Verified';

  const gapBtn = document.createElement('button');
  gapBtn.type = 'button';
  gapBtn.className = 'vtc__btn vtc__btn--gap';
  gapBtn.setAttribute('aria-pressed', 'false');
  gapBtn.textContent = 'Identify Gap';

  actionsEl.appendChild(verifyBtn);
  actionsEl.appendChild(gapBtn);

  /* -- Assemble node -- */
  nodeEl.appendChild(statusIconEl);
  nodeEl.appendChild(labelEl);
  if (descEl) nodeEl.appendChild(descEl);
  nodeEl.appendChild(statusTextEl);
  nodeEl.appendChild(actionsEl);

  /* -- Restore saved status (silent, no announcement) -- */
  const saved = getItem(_storageKey(screenId, node.key));
  if (saved && Object.values(STATUS).includes(saved)) {
    _applyStatus(nodeEl, statusIconEl, statusTextEl, verifyBtn, gapBtn, saved);
  }

  /* -- Click: Mark Verified (toggle on/off) -- */
  verifyBtn.addEventListener('click', () => {
    const current = nodeEl.dataset.status;
    const next    = current === STATUS.VERIFIED ? STATUS.UNREVIEWED : STATUS.VERIFIED;
    _applyStatus(nodeEl, statusIconEl, statusTextEl, verifyBtn, gapBtn, next);
    setItem(_storageKey(screenId, node.key), next);
    const msg = next === STATUS.VERIFIED
      ? node.label + ': Verified.'
      : node.label + ': Status cleared.';
    _announce(msg);
  });

  /* -- Click: Identify Gap (toggle on/off) -- */
  gapBtn.addEventListener('click', () => {
    const current = nodeEl.dataset.status;
    const next    = current === STATUS.GAP ? STATUS.UNREVIEWED : STATUS.GAP;
    _applyStatus(nodeEl, statusIconEl, statusTextEl, verifyBtn, gapBtn, next);
    setItem(_storageKey(screenId, node.key), next);
    const msg = next === STATUS.GAP
      ? node.label + ': Gap identified.'
      : node.label + ': Status cleared.';
    _announce(msg);
  });

  return nodeEl;
}

/* ================================================================
   BUILD: CONNECTOR
   ================================================================ */

function _buildConnector() {
  const connector = document.createElement('div');
  connector.className = 'vtc__connector';
  connector.setAttribute('aria-hidden', 'true');
  connector.innerHTML = _connectorSVG();
  return connector;
}

/* ================================================================
   BUILD: SYNTHESIS PROMPT
   ================================================================ */

function _wireSave(textarea, key, announcement) {
  let saveTimer = null;
  textarea.addEventListener('input', () => {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => { setItem(key, textarea.value); }, 1000);
  });
  textarea.addEventListener('blur', () => {
    clearTimeout(saveTimer);
    setItem(key, textarea.value);
    _announce(announcement);
  });
}

function _buildPrompt(promptText, screenId, uid) {
  const headingId  = uid + '-prompt-heading';
  const textareaId = uid + '-prompt-input';

  const section = document.createElement('section');
  section.className = 'vtc__prompt';
  section.setAttribute('aria-labelledby', headingId);

  const heading = document.createElement('h3');
  heading.className = 'vtc__prompt-heading';
  heading.id = headingId;
  heading.textContent = promptText;

  const fieldLabel = document.createElement('label');
  fieldLabel.className = 'sr-only';
  fieldLabel.htmlFor = textareaId;
  fieldLabel.textContent = 'Your response: ' + promptText;

  const textarea = document.createElement('textarea');
  textarea.className = 'vtc__prompt-textarea';
  textarea.id = textareaId;
  textarea.rows = 4;
  textarea.placeholder = 'Identify the link where the chain breaks and explain why...';

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
 * Builds the chain visual with five nodes, connectors between them,
 * and a synthesis prompt. Restores all saved statuses and responses.
 * Idempotent -- safe to call multiple times on the same element.
 *
 * @param {HTMLElement} containerEl
 * @param {Object}      config
 * @param {string}      config.screenId          -- localStorage namespace (required)
 * @param {string}      [config.heading]         -- optional <h2> panel heading
 * @param {Array}       [config.nodes]           -- array of { key, label, description }
 *                                                  defaults to five standard chain nodes
 * @param {string}      [config.prompt]          -- synthesis question
 *                                                  (default: 'Where does the chain break?')
 */
function init(containerEl, config = {}) {
  if (!containerEl || containerEl.dataset.vtcReady === 'true') return;

  const screenId = config.screenId || 'screen_4_3_3';
  const nodes    = (config.nodes && config.nodes.length) ? config.nodes : DEFAULT_NODES;
  const prompt   = config.prompt || DEFAULT_PROMPT;

  _uidCounter += 1;
  const uid = 'vtc-' + _uidCounter;

  /* Optional panel heading */
  if (config.heading) {
    const heading = document.createElement('h2');
    heading.className = 'vtc__heading';
    heading.textContent = config.heading;
    containerEl.appendChild(heading);
  }

  /* Chain: nodes interleaved with connectors */
  const chainEl = document.createElement('div');
  chainEl.className = 'vtc__chain';
  chainEl.setAttribute('aria-label', 'Verification chain: ' + nodes.map(n => n.label).join(', '));

  nodes.forEach((node, i) => {
    chainEl.appendChild(_buildNode(node, screenId, uid + '-node-' + i));
    if (i < nodes.length - 1) {
      chainEl.appendChild(_buildConnector());
    }
  });

  containerEl.appendChild(chainEl);
  containerEl.appendChild(_buildPrompt(prompt, screenId, uid));

  containerEl.dataset.vtcReady = 'true';
}

export { init };
