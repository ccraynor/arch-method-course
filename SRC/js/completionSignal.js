/* completionSignal.js
   When the learner clicks the Next button, the current progress dot
   fills with success color and a 300ms transition plays before navigation.
   Also records lightweight per-screen progress for the lesson hub screens
   (Section 5): archMethod_visited_<screenId> on load and
   archMethod_continued_<screenId> when Next is clicked. */

import { setItem } from './storage.js';

/* Reflection screen -> lesson number (Prompt D item 3). Clicking Continue
   from a reflection screen marks that lesson complete, which drives the hub
   module progress map and the artifact progression display. */
const REFLECTION_LESSON = {
  'm1-l1a-s5': '1',
  'm1-l1b-s7': '2',
  'm1-l2-s6':  '3',
  'm1-l3-s5':  '4',
  'm1-l4a-s5': '5',
  'm1-l4b-s7': '6',
};

function currentScreenId() {
  const file = location.pathname.split('/').pop() || '';
  return file.replace(/\.html$/, '');
}

export function initCompletionSignal() {
  /* Mark this screen visited (drives the In Progress status on the hub) */
  const screenId = currentScreenId();
  if (screenId) {
    try { setItem('visited_' + screenId, 'true'); } catch { /* storage unavailable */ }
  }

  document.querySelectorAll('.btn--next').forEach(btn => {
    const href = btn.getAttribute('href');
    if (!href || btn.getAttribute('aria-disabled') === 'true') return;

    btn.addEventListener('click', e => {
      /* Skip if modifier key held (open in new tab, etc.) */
      if (e.metaKey || e.ctrlKey || e.shiftKey) return;

      e.preventDefault();

      /* Record that the learner advanced from this screen (drives Complete) */
      if (screenId) {
        try { setItem('continued_' + screenId, 'true'); } catch { /* storage unavailable */ }
        /* Reflection screen Continue marks the lesson complete (item 3) */
        if (REFLECTION_LESSON[screenId]) {
          try { setItem('lesson_' + REFLECTION_LESSON[screenId] + '_complete', 'true'); }
          catch { /* storage unavailable */ }
        }
      }

      /* Visual signal on button */
      btn.classList.add('is-completing');

      /* Fill the current progress dot (pt-step--current) */
      const currentDot = document.querySelector('.pt-step--current .pt-step__icon');
      if (currentDot) {
        currentDot.style.backgroundColor = 'var(--color-success-bg)';
        currentDot.style.borderColor     = 'var(--color-success-border)';
        currentDot.style.transition      = 'background-color 0.3s, border-color 0.3s';
      }

      /* Announce to screen readers */
      const announcer = document.getElementById('sr-announcer');
      if (announcer) {
        announcer.textContent = '';
        requestAnimationFrame(() => {
          announcer.textContent = 'Screen complete. Moving to next screen.';
        });
      }

      /* Navigate after 300ms */
      setTimeout(() => {
        window.location.href = href;
      }, 300);
    });
  });
}
