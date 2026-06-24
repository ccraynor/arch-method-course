/* workedExampleDisclosure.js
   Progressive step reveal for worked example screens.
   - Step 1 shown on load; subsequent steps hidden until revealed.
   - "Show Next Step" button injected at the end of each step body.
   - "Show All Steps" button injected before the worked-example layout.
   - Right-column annotation items for hidden steps are also hidden.
   - All steps visible on print (CSS handles this via @media print).
   - Screen reader live region announces each new step. */

function initWorkedExampleDisclosure() {
  const steps = Array.from(document.querySelectorAll('.example-step'));
  if (steps.length < 2) return;

  const annotations = Array.from(document.querySelectorAll('.annotation-item[data-step]'));
  const layout = document.querySelector('.worked-example__layout');
  if (!layout) return;

  const totalSteps = steps.length;
  let currentMax = 1;

  /* ---- Live region for SR announcements ---- */
  const live = document.createElement('div');
  live.className = 'sr-only';
  live.setAttribute('aria-live', 'polite');
  live.setAttribute('aria-atomic', 'true');
  live.id = 'wex-announce';
  document.body.appendChild(live);

  function announce(msg) {
    live.textContent = '';
    requestAnimationFrame(() => { live.textContent = msg; });
  }

  /* ---- "Show All Steps" button ---- */
  const controlsBar = document.createElement('div');
  controlsBar.className = 'wex-controls';
  controlsBar.setAttribute('aria-label', 'Worked example options');

  const showAllBtn = document.createElement('button');
  showAllBtn.type = 'button';
  showAllBtn.className = 'wex-show-all-btn';
  showAllBtn.setAttribute('aria-label', 'Show all steps at once');
  showAllBtn.innerHTML =
    '<svg aria-hidden="true" focusable="false" width="14" height="14" viewBox="0 0 16 16" fill="none">' +
      '<path d="M2 4h12M2 8h12M2 12h12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>' +
    '</svg>' +
    ' Show All Steps';
  controlsBar.appendChild(showAllBtn);

  /* Insert controls bar immediately before the two-column layout */
  layout.parentNode.insertBefore(controlsBar, layout);

  /* ---- Apply initial hidden state ---- */
  steps.forEach((step, i) => {
    if (i > 0) step.classList.add('step-hidden');
  });
  annotations.forEach(ann => {
    const n = parseInt(ann.dataset.step, 10);
    if (n > 1) ann.classList.add('step-hidden');
  });

  /* ---- Inject "Show Next Step" buttons into each step except the last ---- */
  const revealBtns = [];
  steps.forEach((step, i) => {
    const stepNum = i + 1;
    if (stepNum === totalSteps) return;

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'step-reveal-btn';
    btn.dataset.revealsStep = String(stepNum + 1);
    btn.setAttribute('aria-label', `Show step ${stepNum + 1} of ${totalSteps}`);
    btn.innerHTML =
      'Show Step ' + (stepNum + 1) + ' of ' + totalSteps +
      '<svg aria-hidden="true" focusable="false" width="14" height="14" viewBox="0 0 16 16" fill="none">' +
        '<path d="M8 3v10M3 8l5 5 5-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>' +
      '</svg>';
    btn.hidden = stepNum !== 1; /* Only step 1's button visible initially */

    const body = step.querySelector('.step-body');
    if (body) body.appendChild(btn);
    revealBtns.push({ btn, stepNum });

    btn.addEventListener('click', () => {
      revealUpTo(stepNum + 1, true);
    });
  });

  /* ---- Core reveal function ---- */
  function revealUpTo(n, focusNewStep) {
    currentMax = n;

    steps.forEach((step, i) => {
      if (i < n) step.classList.remove('step-hidden');
      else step.classList.add('step-hidden');
    });

    annotations.forEach(ann => {
      const stepN = parseInt(ann.dataset.step, 10);
      if (stepN <= n) ann.classList.remove('step-hidden');
      else ann.classList.add('step-hidden');
    });

    /* Update which "Show Next Step" button is active */
    revealBtns.forEach(({ btn, stepNum }) => {
      btn.hidden = stepNum !== n - 1;
    });

    /* Hide "Show All Steps" once everything is revealed */
    if (n >= totalSteps) {
      controlsBar.hidden = true;
    }

    if (focusNewStep) {
      const newStep = steps[n - 1];
      if (newStep) {
        newStep.setAttribute('tabindex', '-1');
        newStep.focus({ preventScroll: false });
        announce('Step ' + n + ' of ' + totalSteps + ' revealed.');
      }
    }
  }

  showAllBtn.addEventListener('click', () => {
    revealUpTo(totalSteps, false);
    announce('All ' + totalSteps + ' steps revealed.');
    /* Move focus to first previously-hidden step */
    const firstHidden = steps[1];
    if (firstHidden) {
      firstHidden.setAttribute('tabindex', '-1');
      firstHidden.focus({ preventScroll: false });
    }
  });
}

document.addEventListener('DOMContentLoaded', initWorkedExampleDisclosure);
