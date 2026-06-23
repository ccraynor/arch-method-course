/* =============================================================================
   expandableReasoningPanel.js
   Scaffold Component 1 of 10 — Expandable Reasoning Panel
   Section 18 — Working Memory Supports

   SPEC REFERENCE
   Section 18 — Scaffold component used on all eight decision point screens.
   Provides a collapsible panel for instructor reasoning / rationale.
   Learner sees the heading; opens the panel to read the reasoning.

   USAGE
   ─────────────────────────────────────────────────────────────────────────────
   HTML (one block per panel needed on the screen):

     <div class="erp">
       <!-- Author places reasoning content here before calling init().
            init() migrates existing children into .erp__content. -->
       <p>The preferred approach prioritizes governance traceability...</p>
     </div>

   JavaScript (in each decision point screen's module script):

     import { initAll } from './js/scaffolds/expandableReasoningPanel.js';
     initAll();                      // processes all .erp elements on page

   CSS (link in <head> before screen-specific scripts):

     <link rel="stylesheet" href="css/scaffolds/expandableReasoningPanel.css">

   To initialize a single panel with a custom label:

     import { init } from './js/scaffolds/expandableReasoningPanel.js';
     init(document.querySelector('.erp'), { label: 'Expert Reasoning' });
   ─────────────────────────────────────────────────────────────────────────────

   INPUTS
   • containerEl      (HTMLElement) — .erp wrapper
   • options.label    (string)      — trigger button visible label
                                      (default: 'Reasoning')

   STATES
   • collapsed — body hidden; trigger aria-expanded="false"
   • expanded  — body visible; trigger aria-expanded="true"

   DEFAULT STATE
   • Collapsed — the panel body carries [hidden] on page load.

   KEYBOARD
   • Enter / Space — toggle (native <button> behavior, no extra code required)
   • Escape        — collapse from anywhere within the panel; focus returns to
                     trigger. e.stopPropagation() prevents this Escape from
                     propagating to panelManager.js's document-level handler,
                     which would otherwise close an open support panel.

   ARIA
   • trigger: aria-expanded="false|true", aria-controls="[body-id]"
   • body:    id="[uid]-body"
   • Screen reader announcement fires within one rAF tick (~16ms) after toggle:
       "[Label] expanded."   — on open
       "[Label] collapsed."  — on close
   • Announcement fires into #sr-announcer (aria-live="polite", aria-atomic="true")

   ACCESSIBILITY NOTES
   • Touch targets: .erp__trigger min-height 44px (enforced in CSS)
   • Color: no color-only communication — state conveyed by aria-expanded and
     chevron direction, not color alone
   • Reduced motion: chevron rotation transition suppressed via
     prefers-reduced-motion: reduce in CSS
   • Zoom: percentage-based font sizing; no pixel-locked widths on the trigger

   DOM CONTRACT
   The following element must exist in the DOM before initAll() / init() runs:
     #sr-announcer   <div role="status" aria-live="polite" aria-atomic="true">

   This scaffold does NOT require any other pre-existing DOM elements.
   It builds trigger and body elements inside containerEl on init().

   MULTIPLE INSTANCES
   Multiple .erp panels on the same screen are fully independent.
   Each gets its own uid, body id, trigger, and event listeners.
   Module-level state is limited to a uid counter (_uidCounter).

   SAFE REINIT
   init() is idempotent — calling it twice on the same element is a no-op.
   Detection uses data-erp-ready="true" on containerEl.
   ============================================================================= */

const ANNOUNCER_ID = 'sr-announcer';
let _uidCounter = 0;

/* ---- Live region announcement ---- */
function _announce(message) {
  const region = document.getElementById(ANNOUNCER_ID);
  if (!region || !message) return;
  region.textContent = '';
  requestAnimationFrame(() => { region.textContent = message; });
}

/* ---- Chevron SVG (decorative; aria-hidden) ---- */
function _chevronSVG() {
  return '<svg class="erp__chevron" width="16" height="16" viewBox="0 0 16 16" ' +
    'fill="none" focusable="false" aria-hidden="true">' +
    '<path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" ' +
    'stroke-linecap="round" stroke-linejoin="round"/></svg>';
}

/* ---- Expand a panel ---- */
function _expand(trigger, body, label) {
  trigger.setAttribute('aria-expanded', 'true');
  trigger.classList.add('erp__trigger--expanded');
  body.removeAttribute('hidden');
  _announce(label + ' expanded.');
}

/* ---- Collapse a panel ---- */
function _collapse(trigger, body, label) {
  trigger.setAttribute('aria-expanded', 'false');
  trigger.classList.remove('erp__trigger--expanded');
  body.setAttribute('hidden', '');
  _announce(label + ' collapsed.');
}

/* ---- Build DOM inside containerEl ---- */
function _build(containerEl, label) {
  _uidCounter += 1;
  const bodyId = 'erp-' + _uidCounter + '-body';

  /* Trigger button */
  const trigger = document.createElement('button');
  trigger.type = 'button';
  trigger.className = 'erp__trigger';
  trigger.setAttribute('aria-expanded', 'false');
  trigger.setAttribute('aria-controls', bodyId);

  const labelSpan = document.createElement('span');
  labelSpan.className = 'erp__trigger-label';
  labelSpan.textContent = label;

  const iconSpan = document.createElement('span');
  iconSpan.className = 'erp__trigger-icon';
  iconSpan.innerHTML = _chevronSVG();

  trigger.appendChild(labelSpan);
  trigger.appendChild(iconSpan);

  /* Body — starts hidden (default collapsed state) */
  const body = document.createElement('div');
  body.className = 'erp__body';
  body.id = bodyId;
  body.setAttribute('hidden', '');

  /* Content wrapper — receives any pre-existing children from containerEl */
  const content = document.createElement('div');
  content.className = 'erp__content';

  while (containerEl.firstChild) {
    content.appendChild(containerEl.firstChild);
  }

  body.appendChild(content);
  containerEl.appendChild(trigger);
  containerEl.appendChild(body);

  /* ---- Toggle on trigger click ---- */
  trigger.addEventListener('click', () => {
    const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
    if (isExpanded) {
      _collapse(trigger, body, label);
    } else {
      _expand(trigger, body, label);
    }
  });

  /* ---- Escape collapses from anywhere within the container ----
     stopPropagation prevents panelManager.js from also receiving
     this Escape and closing an open support panel. */
  containerEl.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    if (trigger.getAttribute('aria-expanded') !== 'true') return;
    e.stopPropagation();
    _collapse(trigger, body, label);
    trigger.focus();
  });

  containerEl.dataset.erpReady = 'true';
}

/* ============================================================
   PUBLIC API
   ============================================================ */

/**
 * init(containerEl, options)
 * Initializes a single expandable reasoning panel.
 * Idempotent — safe to call multiple times on the same element.
 *
 * @param {HTMLElement} containerEl
 * @param {Object}      [options]
 * @param {string}      [options.label='Reasoning']  — trigger button label
 */
function init(containerEl, options = {}) {
  if (!containerEl || containerEl.dataset.erpReady === 'true') return;
  const label = options.label || 'Reasoning';
  _build(containerEl, label);
}

/**
 * initAll(selector, options)
 * Initializes all matching elements on the page.
 * Safe to call when zero elements match.
 *
 * @param {string} [selector='.erp']
 * @param {Object} [options]           — passed through to each init() call
 */
function initAll(selector = '.erp', options = {}) {
  document.querySelectorAll(selector).forEach(el => init(el, options));
}

/**
 * expand(containerEl)
 * Programmatically expands a panel.
 *
 * @param {HTMLElement} containerEl
 */
function expand(containerEl) {
  const trigger = containerEl.querySelector('.erp__trigger');
  const body    = containerEl.querySelector('.erp__body');
  if (!trigger || !body) return;
  const label = containerEl.querySelector('.erp__trigger-label')?.textContent ?? 'Reasoning';
  _expand(trigger, body, label);
}

/**
 * collapse(containerEl)
 * Programmatically collapses a panel.
 *
 * @param {HTMLElement} containerEl
 */
function collapse(containerEl) {
  const trigger = containerEl.querySelector('.erp__trigger');
  const body    = containerEl.querySelector('.erp__body');
  if (!trigger || !body) return;
  const label = containerEl.querySelector('.erp__trigger-label')?.textContent ?? 'Reasoning';
  _collapse(trigger, body, label);
}

/**
 * isExpanded(containerEl)
 * Returns true if the panel is currently expanded.
 *
 * @param   {HTMLElement} containerEl
 * @returns {boolean}
 */
function isExpanded(containerEl) {
  const trigger = containerEl.querySelector('.erp__trigger');
  return trigger ? trigger.getAttribute('aria-expanded') === 'true' : false;
}

export { init, initAll, expand, collapse, isExpanded };
