/* contextPanel.js (Prompt E Part 2 item 9)
   Structured external-memory panel. A screen opts in by defining
   window.ARCH_CONTEXT_DATA before the module scripts load. This module then
   injects a Context toggle button into the support bar and a #contextPanel
   aside, renders the screen-specific content, and wires the toggle through
   panelManager (contextPanel is registered in ALLOWED_PANELS).

   Shape of window.ARCH_CONTEXT_DATA:
     { title: 'On-Screen Reference',
       sections: [ { heading: '...', items: ['...', '...'] },
                   { heading: '...', html: '<p>...</p>' } ] } */

import { openPanel, closeAll, getActivePanel } from './panelManager.js';

const CLOSE_SVG = '<svg aria-hidden="true" focusable="false" width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M15 5L5 15M5 5l10 10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';

function buildBody(data) {
  const body = document.createElement('div');
  body.className = 'panel-body';
  (data.sections || []).forEach(sec => {
    const card = document.createElement('section');
    card.className = 'context-card';
    if (sec.heading) {
      const h = document.createElement('h3');
      h.className = 'context-card__heading';
      h.textContent = sec.heading;
      card.appendChild(h);
    }
    if (Array.isArray(sec.items)) {
      const ul = document.createElement('ul');
      ul.className = 'context-card__list';
      sec.items.forEach(it => {
        const li = document.createElement('li');
        li.innerHTML = it;
        ul.appendChild(li);
      });
      card.appendChild(ul);
    } else if (sec.html) {
      const div = document.createElement('div');
      div.className = 'context-card__html';
      div.innerHTML = sec.html;
      card.appendChild(div);
    }
    body.appendChild(card);
  });
  return body;
}

function initContextPanel() {
  const data = window.ARCH_CONTEXT_DATA;
  if (!data) return;
  if (document.getElementById('contextPanel')) return;

  /* Find the support toggle bar (the container holding existing toggles). */
  const sampleToggle = document.querySelector('.support-toggle');
  if (!sampleToggle) return;
  const bar = sampleToggle.parentNode;

  /* Inject the Context toggle button. */
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'support-toggle';
  btn.dataset.panel = 'contextPanel';
  btn.setAttribute('aria-controls', 'contextPanel');
  btn.setAttribute('aria-expanded', 'false');
  btn.textContent = 'Context';
  bar.appendChild(btn);

  /* Inject the panel shell. */
  const aside = document.createElement('aside');
  aside.id = 'contextPanel';
  aside.setAttribute('aria-label', data.title || 'On-screen reference');
  aside.hidden = true;
  const header = document.createElement('div');
  header.className = 'panel-header';
  const title = document.createElement('h2');
  title.className = 'panel-title';
  title.textContent = data.title || 'On-Screen Reference';
  const close = document.createElement('button');
  close.type = 'button';
  close.className = 'panel-close';
  close.setAttribute('data-panel-focus', '');
  close.setAttribute('aria-label', 'Close reference panel');
  close.innerHTML = CLOSE_SVG;
  header.appendChild(title);
  header.appendChild(close);
  aside.appendChild(header);
  aside.appendChild(buildBody(data));

  /* Place the aside alongside the other panel asides (end of body). */
  document.body.appendChild(aside);

  function syncOthers(activeName) {
    document.querySelectorAll('.support-toggle').forEach(b => {
      b.setAttribute('aria-expanded', b.dataset.panel === activeName ? 'true' : 'false');
    });
  }

  btn.addEventListener('click', () => {
    if (getActivePanel() === 'contextPanel') {
      closeAll();
      syncOthers(null);
    } else {
      openPanel('contextPanel', btn);
      syncOthers('contextPanel');
    }
  });

  close.addEventListener('click', () => {
    closeAll();
    syncOthers(null);
  });

  /* If another toggle opens its panel, reflect that on the Context button. */
  document.querySelectorAll('.support-toggle').forEach(other => {
    if (other === btn) return;
    other.addEventListener('click', () => {
      if (getActivePanel() !== 'contextPanel') btn.setAttribute('aria-expanded', 'false');
    });
  });
}

export { initContextPanel };
