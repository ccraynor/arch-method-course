/* retrievalPrompt.js — cold retrieval warm-up and principle extraction (items 15, 19)
   Autosaves a short free-text answer to namespaced localStorage and reveals a
   reference answer on demand. No evaluation, no scoring. */

import { getItem, setItem } from '../storage.js';

export function initRetrievalPrompts() {
  document.querySelectorAll('[data-retrieval]').forEach(box => {
    const key    = box.dataset.storageKey;
    const input  = box.querySelector('.retrieval-warmup__input');
    const reveal = box.querySelector('.retrieval-warmup__reveal');
    const answer = box.querySelector('.retrieval-warmup__answer');
    const saved  = box.querySelector('.retrieval-warmup__saved');

    if (input && key) {
      const prior = getItem(key);
      if (prior !== null) input.value = prior;
      let t;
      input.addEventListener('input', () => {
        setItem(key, input.value);
        if (saved) {
          saved.hidden = false;
          clearTimeout(t);
          t = setTimeout(() => { saved.hidden = true; }, 1500);
        }
      });
    }

    if (reveal && answer) {
      reveal.addEventListener('click', () => {
        answer.hidden = false;
        reveal.setAttribute('hidden', '');
      });
    }
  });
}
