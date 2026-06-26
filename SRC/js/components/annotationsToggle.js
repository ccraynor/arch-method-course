/* annotationsToggle.js
   Authoritative Show/Hide Annotations control for worked example screens.

   The right-column expert annotations were previously gated by the step-by-step
   disclosure of the left-column steps, so most commentary stayed hidden and the
   per-screen inline toggle only showed/hid a near-empty container. This shared
   control takes ownership of the annotation list: when expanded it reveals ALL
   expert commentary (removing any residual .step-hidden), and when collapsed it
   hides the whole list. The left-column step disclosure is unaffected.

   It replaces the toggle button node first, which drops the per-screen inline
   click handler, so this is the single authoritative handler with no 11 inline
   edits required. */

export function initAnnotationsToggle() {
  const existing = document.getElementById('annotations-toggle');
  const list = document.getElementById('annotations-list');
  if (!existing || !list) return;

  /* Replace the node to drop any inline-attached click handler. */
  const btn = existing.cloneNode(true);
  existing.replaceWith(btn);
  const label = btn.querySelector('.toggle-label');

  function apply(expanded) {
    btn.setAttribute('aria-expanded', String(expanded));
    if (label) label.textContent = expanded ? 'Hide Annotations' : 'Show Annotations';
    if (expanded) {
      list.removeAttribute('hidden');
      list.querySelectorAll('.annotation-item.step-hidden')
        .forEach(item => item.classList.remove('step-hidden'));
    } else {
      list.setAttribute('hidden', '');
    }
  }

  /* Honor the authored default (aria-expanded="true" -> reveal all on load). */
  apply(btn.getAttribute('aria-expanded') === 'true');

  btn.addEventListener('click', () => {
    apply(btn.getAttribute('aria-expanded') !== 'true');
  });
}
