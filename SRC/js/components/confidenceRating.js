/* confidenceRating.js — three-point confidence rating for guided practice (item 20)
   Learner rates confidence (Confident / Unsure / Guessing) before submitting.
   The choice is saved to archMethod_confidence_<screenId> and echoed back when
   the screen reveals expert feedback. No scoring. */

import { getItem, setItem } from '../storage.js';

export function initConfidenceRatings() {
  document.querySelectorAll('[data-confidence]').forEach(widget => {
    const screenId = widget.dataset.screenId;
    if (!screenId) return;
    const key    = 'confidence_' + screenId;
    const radios = [...widget.querySelectorAll('input[type="radio"]')];
    const echo   = widget.querySelector('.confidence-rating__echo');

    /* Restore prior selection */
    const prior = getItem(key);
    if (prior) radios.forEach(r => { if (r.value === prior) r.checked = true; });

    /* Persist on change */
    radios.forEach(r => r.addEventListener('change', () => {
      if (r.checked) setItem(key, r.value);
    }));

    /* Reveal the echo line alongside the expert feedback */
    let revealed = false;
    const reveal = () => {
      if (revealed) return;
      revealed = true;
      const val = getItem(key);
      if (echo) {
        echo.textContent = val
          ? 'Your confidence before checking: ' + val
          : 'You did not rate your confidence before checking.';
        echo.hidden = false;
      }
    };

    /* Trigger 1: the screen locks form controls on a successful submit. */
    if (radios.length) {
      const mo = new MutationObserver(muts => {
        for (const m of muts) {
          if (m.attributeName === 'disabled' && radios[0].disabled) {
            reveal();
            mo.disconnect();
            break;
          }
        }
      });
      mo.observe(radios[0], { attributes: true });
    }

    /* Trigger 2: a feedback container becomes visible (covers screens that do
       not disable the rating radios). An optional data-feedback-match watches a
       descendant (used where feedback is rendered per item). */
    const sel   = widget.dataset.feedbackSelector || '#feedback-region, #feedback-section';
    const match = widget.dataset.feedbackMatch || null;
    const fb    = document.querySelector(sel);
    if (fb) {
      const isVisible = el =>
        el &&
        !el.hasAttribute('hidden') &&
        getComputedStyle(el).display !== 'none' &&
        el.offsetParent !== null;
      const check = () => match ? !!fb.querySelector(match) : isVisible(fb);
      const mo2 = new MutationObserver(() => {
        if (check()) { reveal(); mo2.disconnect(); }
      });
      mo2.observe(fb, {
        attributes: true,
        attributeFilter: ['hidden', 'class', 'style'],
        subtree: !!match,
        childList: !!match
      });
    }
  });
}
