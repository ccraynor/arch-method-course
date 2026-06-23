/* =============================================================================
   hoverGlossary.js
   Scaffold Component 6 of 10 -- Hover Glossary System
   Section 18 -- Working Memory Supports

   SPEC REFERENCE
   Section 18 -- Course-wide. Applied to any .gls[data-gls-term] span
   in lesson content. Eight defined terms:
   Architecture | Calibration | Competency | Constraint |
   Dependency | Governance | Traceability | Tradeoff

   USAGE
   ─────────────────────────────────────────────────────────────────────────────
   HTML (authored in lesson content wherever a term should be interactive):

     The learner must identify each
     <span class="gls" data-gls-term="constraint">constraint</span>
     before proposing a course structure.

   JavaScript (in base script or each lesson's module script):

     import { initAll } from './js/scaffolds/hoverGlossary.js';
     initAll();   // processes all .gls elements on the page after DOM ready

   CSS (link in <head> of every screen that includes glossary terms,
        after tokens.css):

     <link rel="stylesheet" href="css/scaffolds/hoverGlossary.css">
   ─────────────────────────────────────────────────────────────────────────────

   TERMS
   Eight terms are defined in the TERMS constant below. Each has:
     label       string -- canonical term name
     definition  string -- one- to two-sentence definition
   The data-gls-term attribute on the span must match a key in TERMS.
   Elements with unrecognized keys are left unchanged.

   INTERACTION MODEL
   ─────────────────────────────────────────────────────────────────────────────
   Hover (mouse):
     mouseenter on .gls container → open
     mouseleave from .gls container → close (unless keyboard-focused)
     The popover is part of the .gls container, so moving the mouse from
     the trigger to the popover does NOT close the definition.
     This satisfies WCAG 2.1 SC 1.4.13 (Content on Hover or Focus).

   Keyboard:
     Tab to trigger → focus → open (auto-show on focus)
     Tab away → blur → close (unless hovered)
     Enter / Space → toggle: closes if open, opens if closed
     Escape → always closes; e.stopPropagation() prevents panelManager
              from also firing
   ─────────────────────────────────────────────────────────────────────────────

   STATE
   Each term instance maintains two booleans: _hovered and _focused.
   _update() opens the popover when either is true; closes when both are false.
   This decouples hover and keyboard state so neither can close when
   the other is still active.

   ARIA
   trigger: aria-expanded="false|true"
   trigger: aria-controls="[popover-id]"
   popover: no role (supplemental definition, not a landmark or dialog)
   Announcement on open (into #sr-announcer, within one rAF tick ~16ms):
     "[Label]: [definition]. Press Escape to close."
   No announcement on close (the definition disappearing is self-evident).

   POPOVER PERSISTENCE (WCAG 1.4.13)
   The popover remains visible until:
   a) The mouse leaves the entire .gls container (including the popover), OR
   b) The trigger loses keyboard focus AND the mouse is not over the container, OR
   c) The user presses Escape or Enter/Space to explicitly dismiss.

   ENTER / SPACE BEHAVIOR
   Focus auto-opens the definition. If the user presses Enter or Space while
   focused, this is treated as an explicit dismiss (closes the definition).
   Pressing Enter or Space again while still focused re-opens it.
   This provides a predictable toggle for keyboard users who prefer explicit
   control.

   HEADING HIERARCHY
   This component does not render any headings.
   The popover is inline supplemental content.

   DOM CONTRACT
   The following element must exist before initAll() / init() is called:
     #sr-announcer   <div role="status" aria-live="polite" aria-atomic="true">
   ============================================================================= */

const ANNOUNCER_ID = 'sr-announcer';

/* ---- Eight defined terms ---- */
const TERMS = {
  architecture: {
    label:      'Architecture',
    definition: 'The planned structure of a course, including its scope, sequence, and the relationships between its components.',
  },
  calibration: {
    label:      'Calibration',
    definition: 'The process of comparing your design decisions to an expert model to identify gaps and misalignments before the course is built.',
  },
  competency: {
    label:      'Competency',
    definition: 'A bounded, observable performance capability that learners must demonstrate by the end of a course.',
  },
  constraint: {
    label:      'Constraint',
    definition: 'A condition that limits design choices, such as a regulatory requirement, technology restriction, or resource boundary.',
  },
  dependency: {
    label:      'Dependency',
    definition: 'A relationship in which one design decision cannot be resolved until another element has been confirmed or completed.',
  },
  governance: {
    label:      'Governance',
    definition: 'The documented record of design decisions, their rationale, and the constraints that governed them.',
  },
  traceability: {
    label:      'Traceability',
    definition: 'The ability to follow a direct line from a learning goal through competencies, assessments, and evidence to a governance record.',
  },
  tradeoff: {
    label:      'Tradeoff',
    definition: 'A design choice in which gaining one benefit requires accepting a corresponding limitation or cost.',
  },
};

let _uidCounter = 0;

/* ---- Live region ---- */
function _announce(message) {
  const region = document.getElementById(ANNOUNCER_ID);
  if (!region || !message) return;
  region.textContent = '';
  requestAnimationFrame(() => { region.textContent = message; });
}

/* ================================================================
   INSTANCE FACTORY
   One closure per term element -- each has its own _hovered, _focused.
   ================================================================ */

function _createInstance(containerEl, termData) {
  const { label, definition } = termData;

  _uidCounter += 1;
  const popoverId = 'gls-def-' + _uidCounter;

  /* Capture original visible text (may differ in case from label) */
  const triggerText = containerEl.textContent.trim() || label;
  containerEl.textContent = '';

  /* ---- Trigger button ---- */
  const trigger = document.createElement('button');
  trigger.type = 'button';
  trigger.className = 'gls__trigger';
  trigger.setAttribute('aria-expanded', 'false');
  trigger.setAttribute('aria-controls', popoverId);
  trigger.textContent = triggerText;

  /* ---- Popover ---- */
  const popover = document.createElement('div');
  popover.className = 'gls__popover';
  popover.id = popoverId;
  popover.setAttribute('hidden', '');

  const defText = document.createElement('p');
  defText.className = 'gls__def-text';
  defText.textContent = definition;

  /* Visual-only close hint -- AT users hear this via the sr-announcer message */
  const hint = document.createElement('span');
  hint.className = 'gls__close-hint';
  hint.setAttribute('aria-hidden', 'true');
  hint.textContent = 'Press Esc to close';

  popover.appendChild(defText);
  popover.appendChild(hint);

  containerEl.appendChild(trigger);
  containerEl.appendChild(popover);
  containerEl.classList.add('gls--ready');

  /* ---- Per-instance state ---- */
  let _hovered = false;
  let _focused  = false;
  let _open     = false;

  function _show() {
    if (_open) return;
    _open = true;
    popover.removeAttribute('hidden');
    trigger.setAttribute('aria-expanded', 'true');
    _announce(label + ': ' + definition + ' Press Escape to close.');
  }

  function _hide() {
    if (!_open) return;
    _open = false;
    popover.setAttribute('hidden', '');
    trigger.setAttribute('aria-expanded', 'false');
  }

  /* Open when either condition is true; close when both are false */
  function _update() {
    if (_hovered || _focused) _show(); else _hide();
  }

  /* ---- Hover (on container so popover is also hoverable) ---- */
  containerEl.addEventListener('mouseenter', () => { _hovered = true;  _update(); });
  containerEl.addEventListener('mouseleave', () => { _hovered = false; _update(); });

  /* ---- Focus / blur ---- */
  trigger.addEventListener('focus', () => { _focused = true;  _update(); });
  trigger.addEventListener('blur',  () => { _focused = false; _update(); });

  /* ---- Keyboard ---- */
  trigger.addEventListener('keydown', e => {

    /* Enter / Space: toggle open/closed.
       preventDefault stops the native button click from also firing.
       When open (auto-opened by focus), this acts as an explicit dismiss.
       When closed (after a previous Escape), this reopens. */
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      if (_open) {
        _focused = false;
        _hovered = false;
        _hide();
      } else {
        _focused = true;
        _show();
      }
      return;
    }

    /* Escape: always close.
       stopPropagation prevents panelManager's document-level handler
       from closing an open support panel at the same time. */
    if (e.key === 'Escape') {
      if (!_open) return;
      e.stopPropagation();
      _focused = false;
      _hovered = false;
      _hide();
    }
  });
}

/* ============================================================
   PUBLIC API
   ============================================================ */

/**
 * initAll(selector)
 * Finds all matching elements and enhances them with trigger + popover.
 * Elements whose data-gls-term does not match a key in TERMS are skipped.
 * Safe to call multiple times -- already-initialized elements are skipped.
 *
 * @param {string} [selector='.gls']
 */
function initAll(selector = '.gls') {
  document.querySelectorAll(selector).forEach(el => {
    if (el.classList.contains('gls--ready')) return;
    const key = el.dataset.glsTerm;
    if (!key || !TERMS[key]) return;
    _createInstance(el, TERMS[key]);
  });
}

/**
 * init(containerEl)
 * Enhances a single .gls element.
 * Safe to call on an already-initialized element -- silently skips.
 *
 * @param {HTMLElement} containerEl
 */
function init(containerEl) {
  if (!containerEl || containerEl.classList.contains('gls--ready')) return;
  const key = containerEl.dataset.glsTerm;
  if (!key || !TERMS[key]) return;
  _createInstance(containerEl, TERMS[key]);
}

export { init, initAll, TERMS };
