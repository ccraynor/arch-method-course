/* =============================================================================
   persistentStepTracker.js
   Scaffold Component 9 of 10 -- Persistent Step Tracker
   Section 18 -- Working Memory Supports

   SPEC REFERENCE
   Section 18 -- Course-wide. Displays current module, lesson, phase, step,
   and screen position. Three states per step dot: current, completed, upcoming.
   Updates on every screen transition.

   ROLE OF THIS SCAFFOLD
   ─────────────────────────────────────────────────────────────────────────────
   This is a header-only wrapper. The visible display IS the existing
   #progress-tracker in base.html, managed by progressTracker.js.

   This scaffold owns exactly two things that progressTracker.js does not:

     1. completedScreens PERSISTENCE
        progressTracker.js accepts completedScreens as a parameter but has
        no opinion about where it comes from or how it persists across page
        loads. This scaffold maintains that state in localStorage via storage.js,
        keyed per lesson. Visiting a screen records it as completed for that
        lesson.

     2. SINGLE-CALL SCREEN API
        Each screen script calls: import { init } from './persistentStepTracker.js'
        then init({ module, lesson, phase, step, screen, total }).
        That one call handles ptInit() + storage read/write + ptUpdate().
        Screen scripts never call progressTracker.js directly.

   WHAT THIS SCAFFOLD DOES NOT OWN
   -- DOM structure: lives in base.html (#progress-tracker and its children)
   -- Header text spans: written by progressTracker.update()
   -- Step dot markup: injected by progressTracker.js (_renderSteps)
   -- Step dot styles: defined in persistentStepTracker.css (the companion file)
   -- Screen reader announcements: handled by progressTracker.update()
   -- Focus management: #progress-tracker tabindex="-1" is a skip-link target;
                        that tabindex is set in base.html, not by this scaffold

   COMPLETED SCREENS LOGIC
   ─────────────────────────────────────────────────────────────────────────────
   Storage key: pst_visited_[lesson]   e.g., pst_visited_1.1
   Value:       JSON array of screen numbers (integers)

   On each page load:
     1. Load the stored visited set for this lesson
     2. Add the current screen number if not already present
     3. Save the updated set
     4. Pass the full visited set to ptUpdate() as completedScreens

   progressTracker._stepState() checks screenNum === currentScreen FIRST,
   so including the current screen in completedScreens is safe -- the current
   screen always renders as "current," never as "completed," regardless of
   whether it appears in the array.

   Result: when a learner returns to a screen they have already visited,
   all other previously visited screens show as completed, and the current
   screen shows as current. No visited screen ever shows as "upcoming" again.

   USAGE
   ─────────────────────────────────────────────────────────────────────────────
   JavaScript (in each screen's module script, after DOM ready):

     import { init } from './js/scaffolds/persistentStepTracker.js';

     init({
       module: 2,
       lesson: '2.3',
       phase:  4,
       step:   11,
       screen: 3,
       total:  6,
     });

   That is the complete call. No imports of progressTracker.js are needed
   in screen scripts.

   CSS (link in <head> of every screen, after tokens.css):

     <link rel="stylesheet" href="css/scaffolds/persistentStepTracker.css">

   This CSS file defines the visual states for all progress tracker elements,
   including the step dot states that progressTracker.js generates.
   ─────────────────────────────────────────────────────────────────────────────

   DOM CONTRACT (inherited from progressTracker.js)
   The following elements must exist before init() is called (base.html sets them):
     #progress-tracker   <div role="group" aria-label="Course progress" tabindex="-1">
     #pt-module          <span>
     #pt-lesson          <span>
     #pt-phase           <span>
     #pt-step            <span>
     #pt-screen          <span>
     #pt-screen-total    <span>
     #sr-announcer       <div role="status" aria-live="polite" aria-atomic="true">
   ============================================================================= */

import { init as ptInit, update as ptUpdate, getState } from '../components/progressTracker.js';
import { getItem, setItem } from '../storage.js';

/* ---- Storage key for visited screens per lesson ---- */
function _storageKey(lesson) {
  return 'pst_visited_' + lesson;
}

/* ---- Load visited screen numbers for a lesson ---- */
function _loadVisited(lesson) {
  const raw = getItem(_storageKey(lesson));
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.map(Number).filter(n => !isNaN(n)) : [];
  } catch (_) {
    return [];
  }
}

/* ---- Persist visited screen numbers for a lesson ---- */
function _saveVisited(lesson, screens) {
  setItem(_storageKey(lesson), JSON.stringify(screens));
}

/* ============================================================
   PUBLIC API
   ============================================================ */

/**
 * init(config)
 * The single entry point for all screen scripts.
 *
 * Sequence:
 *   1. ptInit()        -- validates DOM contract, appends #pt-steps-nav (idempotent)
 *   2. Load visited    -- reads stored completedScreens for this lesson
 *   3. Record current  -- adds current screen to visited set if not present
 *   4. Save visited    -- persists updated set to localStorage
 *   5. ptUpdate()      -- writes header text spans, re-renders step dots, announces
 *
 * @param {Object}  config
 * @param {number}  config.module   - Current module (1-4)
 * @param {string}  config.lesson   - Lesson identifier, e.g. '1.1', '2.3'
 * @param {number}  config.phase    - Current ARCH Phase number
 * @param {number}  config.step     - Current ARCH Step number
 * @param {number}  config.screen   - Current screen number within lesson (1-based)
 * @param {number}  config.total    - Total screens in this lesson
 * @param {boolean} [config.announce=true] - Pass false to suppress AT announcement
 *                                           (useful for screens that announce their
 *                                           own h1 on load and want to avoid overlap)
 */
function init(config) {
  const {
    module,
    lesson,
    phase,
    step,
    screen,
    total,
    announce = true,
  } = config;

  /* Step 1: initialize progressTracker (idempotent -- safe on every page) */
  ptInit();

  /* Step 2: load visited screens for this lesson */
  const visited = _loadVisited(lesson);

  /* Step 3: record the current screen as visited */
  if (!visited.includes(screen)) {
    visited.push(screen);
  }

  /* Step 4: persist the updated visited set */
  _saveVisited(lesson, visited);

  /* Step 5: update the header tracker with full state.
     Passing the full visited array as completedScreens is intentional.
     progressTracker._stepState() checks currentScreen first, so the
     current screen always renders as "current" even if it's in the array. */
  ptUpdate({
    module,
    lesson,
    phase,
    step,
    screen,
    total,
    completedScreens: visited,
    announce,
  });
}

/* Re-export getState so screen scripts that need to read tracker state
   can do so without importing progressTracker.js directly. */
export { init, getState };
