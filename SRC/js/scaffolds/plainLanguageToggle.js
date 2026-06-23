/* =============================================================================
   plainLanguageToggle.js
   Scaffold Component 7 of 10 -- Plain-Language Summary Toggle
   Section 18 -- Working Memory Supports

   SPEC REFERENCE
   Section 18 -- Course-wide. Button labeled "Simplify Instructions."
   Toggles between standard and simplified instructional text.
   Simplified content is a post-build authoring task -- this scaffold
   provides the mechanism with clearly marked TODO placeholder text.

   USAGE
   ─────────────────────────────────────────────────────────────────────────────
   HTML (wrap instructional text in .plst on each screen that needs the toggle):

     <div class="plst">
       <div class="plst__standard">
         <p>In this activity, you will analyze the MRHN scenario to identify
            constraints that affect the course scope. Review the scope statement,
            then apply each constraint category to determine which apply.</p>
       </div>
       <!-- .plst__simplified is optional here.
            If omitted, initAll() injects a TODO placeholder automatically.
            To author simplified content, add this div before calling initAll():
            <div class="plst__simplified">
              <p>Read the MRHN scenario. Find the rules and limits that affect
                 the course. Check each type of limit.</p>
            </div>
       -->
     </div>

   JavaScript (in each lesson's screen script, after DOM ready):

     import { initAll } from './js/scaffolds/plainLanguageToggle.js';
     initAll();

   CSS (link in <head> of every screen using this component, after tokens.css):

     <link rel="stylesheet" href="css/scaffolds/plainLanguageToggle.css">
   ─────────────────────────────────────────────────────────────────────────────

   COURSE-WIDE SYNC
   All .plst blocks on a single page are initialized as a coordinated group.
   When any toggle button is pressed, ALL .plst blocks on the page update
   simultaneously. One button controls all instructional blocks on the screen.
   This matches the expected behavior: "Simplify Instructions" is a page-level
   mode, not a block-level preference.

   PERSISTENCE
   The simplified/standard preference is saved to localStorage via storage.js
   under key 'plst_simplified'. When a new screen loads and initAll() is called,
   all .plst blocks initialize in the stored preference mode. Learners who prefer
   simplified instructions see them consistently across all screens.

   TODO PLACEHOLDER
   If .plst__simplified is absent from a .plst container, the scaffold injects:
     <div class="plst__simplified plst__simplified--todo">
       <p class="plst__todo-text">[TODO: ...]</p>
     </div>
   The .plst__simplified--todo class applies warning-colored styles so the
   placeholder is visually obvious during review. Remove the class (and replace
   the placeholder text) when simplified content is authored.

   BUTTON LABEL PATTERN
   The button label communicates the action (what will happen on press),
   not the current state:
     Standard mode active → button reads "Simplify Instructions"
     Simplified mode active → button reads "Show Standard Instructions"
   No aria-pressed is used -- the changing label is self-descriptive.
   The #sr-announcer announcement covers the immediate state change for AT.

   ANNOUNCEMENTS
   "Instructions simplified."         -- on switch to simplified mode
   "Standard instructions restored."  -- on switch to standard mode
   Fires into #sr-announcer within one rAF tick (~16ms).

   DOM CONTRACT
   Each .plst must contain a .plst__standard child element.
   .plst__simplified is optional -- scaffold injects placeholder if absent.
   #sr-announcer must exist before initAll() / init() is called.
   Safe reinit: .plst--ready class guards against double-init.
   ============================================================================= */

import { getItem, setItem } from '../storage.js';

const ANNOUNCER_ID = 'sr-announcer';
const STORAGE_KEY  = 'plst_simplified';
const TODO_CLASS   = 'plst__simplified--todo';

const TODO_TEXT    = '[TODO: Simplified version of the instructions above. '
                   + 'Replace this placeholder with plain-language content '
                   + 'before launch. Write at an 8th-grade reading level. '
                   + 'Use short sentences, active voice, and common words. '
                   + 'Do not deploy this placeholder text.]';

/* Module-level registry: all instances on the current page.
   Reset per page load (fresh module context on each HTML file load). */
const _instances = [];

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
   One call per .plst container. Each instance:
   -- Creates and inserts the toggle button
   -- Finds or creates .plst__simplified
   -- Returns a { setMode } object registered in _instances
   ================================================================ */

function _createInstance(containerEl) {
  const standardEl = containerEl.querySelector('.plst__standard');
  if (!standardEl) {
    console.warn('plainLanguageToggle: .plst__standard not found in container. Skipping.');
    return null;
  }

  /* Find or inject simplified content slot */
  let simplifiedEl = containerEl.querySelector('.plst__simplified');
  if (!simplifiedEl) {
    simplifiedEl = document.createElement('div');
    simplifiedEl.className = 'plst__simplified ' + TODO_CLASS;

    const todoText = document.createElement('p');
    todoText.className = 'plst__todo-text';
    todoText.textContent = TODO_TEXT;

    simplifiedEl.appendChild(todoText);
    standardEl.after(simplifiedEl);
  }
  /* Always start hidden -- setMode() will reveal if stored pref is simplified */
  simplifiedEl.setAttribute('hidden', '');

  /* ---- Toggle button ---- */
  _uidCounter += 1;
  const btnId = 'plst-toggle-' + _uidCounter;

  const toggleBtn = document.createElement('button');
  toggleBtn.type = 'button';
  toggleBtn.className = 'plst__toggle';
  toggleBtn.id = btnId;
  toggleBtn.textContent = 'Simplify Instructions';

  /* Insert button as first child of container (before instructional text) */
  containerEl.insertBefore(toggleBtn, containerEl.firstChild);

  /* ---- Per-instance state ---- */
  let _isSimplified = false;

  function setMode(simplified) {
    _isSimplified = simplified;

    if (simplified) {
      standardEl.setAttribute('hidden', '');
      simplifiedEl.removeAttribute('hidden');
      toggleBtn.textContent = 'Show Standard Instructions';
      containerEl.classList.add('plst--simplified');
    } else {
      standardEl.removeAttribute('hidden');
      simplifiedEl.setAttribute('hidden', '');
      toggleBtn.textContent = 'Simplify Instructions';
      containerEl.classList.remove('plst--simplified');
    }
  }

  /* ---- Toggle click: update all instances on the page ---- */
  toggleBtn.addEventListener('click', () => {
    const next = !_isSimplified;

    /* Sync every .plst block on this page */
    _instances.forEach(inst => inst.setMode(next));

    /* Persist preference course-wide */
    setItem(STORAGE_KEY, next ? 'true' : 'false');

    /* Announce state change */
    _announce(next ? 'Instructions simplified.' : 'Standard instructions restored.');
  });

  containerEl.classList.add('plst--ready');

  const instance = { setMode };
  _instances.push(instance);
  return instance;
}

/* ================================================================
   RESTORE STORED PREFERENCE
   Called after all instances are created so that all blocks on the
   page initialize in the correct mode simultaneously.
   ================================================================ */

function _restorePreference() {
  const saved = getItem(STORAGE_KEY);
  if (saved === 'true') {
    _instances.forEach(inst => inst.setMode(true));
  }
}

/* ============================================================
   PUBLIC API
   ============================================================ */

/**
 * initAll(selector)
 * Initializes all .plst containers on the page as a coordinated group.
 * Restores the stored language preference after all instances are created.
 * Safe to call when zero elements match.
 * Idempotent -- already-initialized elements (.plst--ready) are skipped.
 *
 * @param {string} [selector='.plst']
 */
function initAll(selector = '.plst') {
  document.querySelectorAll(selector).forEach(el => {
    if (!el.classList.contains('plst--ready')) {
      _createInstance(el);
    }
  });
  _restorePreference();
}

/**
 * init(containerEl)
 * Initializes a single .plst container.
 * Restores the stored preference immediately after initialization.
 * Idempotent -- safe to call on an already-initialized element.
 *
 * @param {HTMLElement} containerEl
 */
function init(containerEl) {
  if (!containerEl || containerEl.classList.contains('plst--ready')) return;
  _createInstance(containerEl);
  _restorePreference();
}

export { init, initAll };
