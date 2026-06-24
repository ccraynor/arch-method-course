/* submitBanner.js - guided practice feedback separation (Prompt D item 6).
   When a guided practice screen reveals its expert feedback, scroll to the
   top of the page and show a full-width banner announcing the submission,
   so the learner clearly transitions from "doing" to "reviewing".

   Detection mirrors confidenceRating.js: it watches the known feedback
   containers for becoming visible, plus the per-item feedback used on
   m1-l3-s4. No per-screen configuration is required. */

export function initSubmitBanner() {
  let shown = false;

  function showBanner() {
    if (shown) return;
    shown = true;
    const main = document.getElementById('main-content') || document.body;
    const banner = document.createElement('div');
    banner.className = 'submit-banner';
    banner.setAttribute('role', 'status');
    banner.setAttribute('tabindex', '-1');
    banner.textContent = 'Your response has been submitted. Expert analysis below.';
    main.insertBefore(banner, main.firstChild);
    window.scrollTo({ top: 0, behavior: 'auto' });
    banner.focus();
  }

  const isVisible = el =>
    el &&
    !el.hasAttribute('hidden') &&
    getComputedStyle(el).display !== 'none' &&
    el.offsetParent !== null;

  /* Standard feedback containers */
  document.querySelectorAll('#feedback-region, #feedback-section, #result-section').forEach(fb => {
    const mo = new MutationObserver(() => {
      if (isVisible(fb)) { showBanner(); mo.disconnect(); }
    });
    mo.observe(fb, { attributes: true, attributeFilter: ['hidden', 'class', 'style'] });
  });

  /* Per-item feedback (m1-l3-s4) */
  const itemList = document.getElementById('gp-items-list');
  if (itemList) {
    const mo = new MutationObserver(() => {
      if (itemList.querySelector('.gp-feedback.is-visible')) { showBanner(); mo.disconnect(); }
    });
    mo.observe(itemList, { attributes: true, childList: true, subtree: true });
  }
}
