/* lessonHub.js - renders completion status, self-regulation flags, and the
   module progress map on lesson hub screens (Section 5, item 30).

   Reads localStorage (via storage.js) and never writes. Status logic:
   - Complete:    archMethod_lesson_<N>_complete is true, OR the learner
                  clicked Continue from that screen (continued_<screenId>).
   - In Progress: the screen was visited (visited_<screenId>).
   - Not Started: neither.

   Self-regulation flag values (archMethod_flag_<screenId>): mastered,
   review, confused. Rendered as a labeled dot (never color alone). */

import { getItem } from '../storage.js';

const FLAG_LABELS = {
  mastered: { cls: 'is-mastered', text: 'Mastered' },
  review:   { cls: 'is-review',   text: 'Needs Review' },
  confused: { cls: 'is-confused', text: 'Confused' },
};

function unitStatus(screenId, lessonNum) {
  if (getItem('lesson_' + lessonNum + '_complete') === 'true') return 'complete';
  if (getItem('continued_' + screenId) === 'true') return 'complete';
  if (getItem('visited_' + screenId) === 'true') return 'inprogress';
  return 'notstarted';
}

const STATUS_TEXT = {
  complete:   'Complete',
  inprogress: 'In Progress',
  notstarted: 'Not Started',
};
const STATUS_CLASS = {
  complete:   'is-complete',
  inprogress: 'is-inprogress',
  notstarted: '',
};

export function initLessonHub() {
  /* Unit cards: status + flag */
  document.querySelectorAll('.unit-card[data-screen-id]').forEach(card => {
    const sid       = card.dataset.screenId;
    const lessonNum = card.dataset.lessonNum;

    const statusEl = card.querySelector('.unit-status');
    if (statusEl) {
      const s = unitStatus(sid, lessonNum);
      statusEl.textContent = STATUS_TEXT[s];
      if (STATUS_CLASS[s]) statusEl.classList.add(STATUS_CLASS[s]);
    }

    const flagEl = card.querySelector('.unit-flag');
    if (flagEl) {
      const val = getItem('flag_' + sid);
      const meta = val && FLAG_LABELS[val];
      if (meta) {
        flagEl.classList.add(meta.cls);
        flagEl.hidden = false;
        const dot = document.createElement('span');
        dot.className = 'unit-flag__dot';
        dot.setAttribute('aria-hidden', 'true');
        const text = document.createElement('span');
        text.textContent = meta.text;
        flagEl.append(dot, text);
        flagEl.setAttribute('aria-label', 'Your flag: ' + meta.text);
      } else {
        flagEl.hidden = true;
      }
    }
  });

  /* Module progress map: completed / current / upcoming / gate */
  document.querySelectorAll('.module-map__node[data-map-lesson]').forEach(node => {
    const key = node.dataset.mapLesson;          // '1'..'6' or 'gate'
    const isCurrent = node.hasAttribute('data-current');
    const complete = key === 'gate'
      ? getItem('lesson_gate_complete') === 'true'
      : getItem('lesson_' + key + '_complete') === 'true';

    const srEl = node.querySelector('.module-map__sr');
    let state = 'upcoming';
    if (isCurrent) { node.classList.add('is-current'); state = 'current'; }
    else if (complete) { node.classList.add('is-complete'); state = 'complete'; }

    if (srEl) {
      const label = node.dataset.mapName || (key === 'gate' ? 'Gate' : 'Lesson ' + key);
      srEl.textContent = label + ': ' + state;
    }
  });
}
