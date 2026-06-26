/* optionalEnrichment.js (pre-Module 2 reading enrichment)
   Optional reading enrichment cards are collapsed by default and always
   available in Deep Dive mode. In Focused Practice mode they are skippable,
   so this module reveals the "Skip (optional)" label on each card. Mode is
   read from localStorage key archMethod_pacingMode via storage.js. */

import { getItem } from '../storage.js';

function initOptionalEnrichment() {
  if (getItem('pacingMode') !== 'FocusedPractice') return;
  document
    .querySelectorAll('[data-optional-enrichment] .optional-reading__skip')
    .forEach(el => { el.hidden = false; });
}

export { initOptionalEnrichment };
