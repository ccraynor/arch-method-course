/* trackerRedesign.js
   Restructures the #progress-tracker into a three-line format:
   Line 1: Module X · Lesson Y   (lesson suppressed on intro screens)
   Line 2: Activity Type · X.Y of Z
   Line 3: Est. N min            (per-screen time estimate, Prompt D item 1)
   Must be imported AFTER the screen-specific inline script sets pt-* values.

   SCREEN_MAP is kept current with the built screens (Prompt C added s4b,
   s3b, the s5a/s5b split, and the reflection renumbering). */

const SCREEN_MAP = {
  /* intro */
  'intro-0.1': ['Course Introduction', '0.1', '9'],
  'intro-0.2': ['Course Introduction', '0.2', '9'],
  'intro-0.3': ['Course Introduction', '0.3', '9'],
  'intro-0.4': ['Course Introduction', '0.4', '9'],
  'intro-0.5': ['Course Introduction', '0.5', '9'],
  'intro-0.6': ['Course Introduction', '0.6', '9'],
  'intro-0.7': ['Course Introduction', '0.7', '9'],
  'intro-0.8': ['Course Introduction', '0.8', '9'],
  'intro-0.9': ['Course Introduction', '0.9', '9'],
  /* gate */
  'm1-gate-s1': ['Module Gate', '1.1', '1'],
  /* lesson 1 -- l1a (5 screens) */
  'm1-l1a-s1': ['Lesson Introduction', '1.1', '5'],
  'm1-l1a-s2': ['Worked Example',      '1.2', '5'],
  'm1-l1a-s3': ['Worked Example',      '1.3', '5'],
  'm1-l1a-s4': ['Guided Practice',     '1.4', '5'],
  'm1-l1a-s5': ['Reflection',          '1.5', '5'],
  /* lesson 2 -- l1b (8 screens, includes s4b faded example) */
  'm1-l1b-s1':  ['Lesson Introduction', '2.1', '8'],
  'm1-l1b-s2':  ['Worked Example',      '2.2', '8'],
  'm1-l1b-s3':  ['Guided Practice',     '2.3', '8'],
  'm1-l1b-s4':  ['Worked Example',      '2.4', '8'],
  'm1-l1b-s4b': ['Faded Example',       '2.5', '8'],
  'm1-l1b-s5':  ['Guided Practice',     '2.6', '8'],
  'm1-l1b-s6':  ['Guided Practice',     '2.7', '8'],
  'm1-l1b-s7':  ['Reflection',          '2.8', '8'],
  /* lesson 3 -- l2 (7 screens after split of s5 into s5a + s5b) */
  'm1-l2-s1':  ['Lesson Introduction', '3.1', '7'],
  'm1-l2-s2':  ['Worked Example',      '3.2', '7'],
  'm1-l2-s3':  ['Guided Practice',     '3.3', '7'],
  'm1-l2-s4':  ['Worked Example',      '3.4', '7'],
  'm1-l2-s5a': ['Guided Practice',     '3.5', '7'],
  'm1-l2-s5b': ['Expert Comparison',   '3.6', '7'],
  'm1-l2-s6':  ['Reflection',          '3.7', '7'],
  /* lesson 4 -- l3 (5 screens) */
  'm1-l3-s1':  ['Lesson Introduction', '4.1', '5'],
  'm1-l3-s2':  ['Worked Example',      '4.2', '5'],
  'm1-l3-s3':  ['Worked Example',      '4.3', '5'],
  'm1-l3-s4':  ['Guided Practice',     '4.4', '5'],
  'm1-l3-s5':  ['Reflection',          '4.5', '5'],
  /* lesson 5 -- l4a (6 screens, includes s3b faded example) */
  'm1-l4a-s1':  ['Lesson Introduction', '5.1', '6'],
  'm1-l4a-s2':  ['Worked Example',      '5.2', '6'],
  'm1-l4a-s3':  ['Worked Example',      '5.3', '6'],
  'm1-l4a-s3b': ['Faded Example',       '5.4', '6'],
  'm1-l4a-s4':  ['Guided Practice',     '5.5', '6'],
  'm1-l4a-s5':  ['Reflection',          '5.6', '6'],
  /* lesson 6 -- l4b (7 screens) */
  'm1-l4b-s1': ['Lesson Introduction', '6.1', '7'],
  'm1-l4b-s2': ['Worked Example',      '6.2', '7'],
  'm1-l4b-s3': ['Worked Example',      '6.3', '7'],
  'm1-l4b-s4': ['Guided Practice',     '6.4', '7'],
  'm1-l4b-s5': ['Guided Practice',     '6.5', '7'],
  'm1-l4b-s6': ['Calibration',         '6.6', '7'],
  'm1-l4b-s7': ['Reflection',          '6.7', '7'],
};

/* Per-screen time estimates keyed by activity type (Prompt D item 1).
   Values are minute ranges. Module overview and hub screens are handled
   in their own page scripts (they do not use this tracker). */
const SCREEN_TIME_MAP = {
  'Course Introduction': '5-8',
  'Lesson Introduction': '5-8',
  'Worked Example':      '12-18',
  'Faded Example':       '10-15',
  'Guided Practice':     '15-25',
  'Expert Comparison':   '15-20',
  'Calibration':         '15-20',
  'Reflection':          '10-15',
  'Module Gate':         '20-30',
};

const LESSON_LABEL_MAP = {
  'l1a': 'Lesson 1', 'l1b': 'Lesson 2',
  'l2':  'Lesson 3', 'l3':  'Lesson 4',
  'l4a': 'Lesson 5', 'l4b': 'Lesson 6',
};

function getScreenKey() {
  return window.location.pathname.split('/').pop().replace('.html', '');
}

function getModuleLabel(key) {
  if (key.startsWith('intro-')) return 'Introduction';
  const match = key.match(/^m(\d+)-/);
  return match ? `Module ${match[1]}` : '';
}

function getLessonLabel(key) {
  /* Intro screens: suppress lesson -- Row 1 shows only "Introduction" */
  if (key.startsWith('intro-')) return '';
  if (key === 'm1-gate-s1') return 'Module Gate';
  const match = key.match(/^m\d+-(l\d+[ab]?)-s\d+[ab]?$/);
  return match ? (LESSON_LABEL_MAP[match[1]] || '') : '';
}

export function redesignTracker() {
  const tracker = document.getElementById('progress-tracker');
  if (!tracker) return;

  const key = getScreenKey();
  const entry = SCREEN_MAP[key];

  const moduleLabel  = getModuleLabel(key);
  const lessonLabel  = getLessonLabel(key);
  const activityType = entry?.[0] || '';
  const position     = entry ? `${entry[1]} of ${entry[2]}` : '';
  const est          = activityType ? (SCREEN_TIME_MAP[activityType] || '') : '';
  const estAria      = est.replace('-', ' to ');

  /* Intro screens render a persistent 9-dot step strip (#pt-steps-nav) via
     persistentStepTracker.js, which runs before this. redesignTracker owns the
     tracker, so capture that node before the innerHTML rebuild and re-append it
     afterward. This keeps Est. N min on every screen and the dots on intro. */
  const stepsNav = document.getElementById('pt-steps-nav');

  /* Preserve hidden IDs for backward-compat (other JS reads these) */
  const hiddenIds = ['pt-module', 'pt-lesson', 'pt-phase', 'pt-step',
                     'pt-screen', 'pt-screen-total',
                     'pt-phase-item', 'pt-step-item',
                     'pt-phase-divider', 'pt-step-divider'];
  const preserved = {};
  hiddenIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) preserved[id] = el.textContent;
  });

  tracker.innerHTML = `
    <div class="pt-row pt-row--location">
      <span class="pt-item pt-item--module">${moduleLabel}</span>
      ${lessonLabel ? `<span class="pt-divider" aria-hidden="true">&middot;</span>
      <span class="pt-item pt-item--lesson">${lessonLabel}</span>` : ''}
    </div>
    <div class="pt-row pt-row--activity">
      ${activityType ? `<span class="pt-item pt-item--type">${activityType}</span>` : ''}
      ${activityType && position
        ? `<span class="pt-divider" aria-hidden="true">&middot;</span>` : ''}
      ${position ? `<span class="pt-item pt-item--position">${position}</span>` : ''}
    </div>
    ${est ? `<div class="pt-row pt-row--time">
      <span class="pt-est" aria-label="Estimated time: ${estAria} minutes">Est. ${est} min</span>
    </div>` : ''}
    ${hiddenIds.map(id =>
      `<span id="${id}" class="sr-only" aria-hidden="true">${preserved[id] || ''}</span>`
    ).join('\n    ')}
  `;

  /* Re-append the intro step-dot strip removed by the innerHTML rebuild above. */
  if (stepsNav) tracker.appendChild(stepsNav);
}
