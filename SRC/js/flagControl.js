/* flagControl.js (Prompt E Part 2 item 7)
   Self-regulation flag control injected on every screen. Three states:
   Mastered, Needs Review, Confused. Stored in localStorage key
   archMethod_flag_[screenId]. Hub screens additionally render the saved
   flag status alongside each unit card's completion status. */

import { getItem, setItem } from './storage.js';

const STATES = [
  { value: 'mastered', label: 'Mastered' },
  { value: 'review',   label: 'Needs Review' },
  { value: 'confused', label: 'Confused' },
];

function screenIdFromUrl() {
  return window.location.pathname.split('/').pop().replace('.html', '');
}

function flagKey(id) {
  return 'flag_' + id;
}

/* Inject the flag control once into the current screen. */
function initFlagControl() {
  if (document.querySelector('.flag-control')) return;
  const host = document.getElementById('current-activity')
    || document.getElementById('main-content')
    || document.querySelector('main');
  if (!host) return;

  const id = screenIdFromUrl();
  const key = flagKey(id);

  const section = document.createElement('section');
  section.className = 'flag-control';
  section.setAttribute('aria-label', 'Self-regulation flag for this screen');

  const label = document.createElement('p');
  label.className = 'flag-control__label';
  label.textContent = 'How is this screen going for you? Your answer is private and saves automatically.';
  section.appendChild(label);

  const group = document.createElement('div');
  group.className = 'flag-control__options';
  group.setAttribute('role', 'group');
  group.setAttribute('aria-label', 'Flag this screen');

  const status = document.createElement('p');
  status.className = 'flag-control__status';
  status.setAttribute('role', 'status');
  status.setAttribute('aria-live', 'polite');

  function render(active) {
    group.querySelectorAll('.flag-control__btn').forEach(btn => {
      btn.setAttribute('aria-pressed', btn.dataset.flag === active ? 'true' : 'false');
    });
    const match = STATES.find(s => s.value === active);
    status.textContent = match ? 'Flagged as: ' + match.label + '.' : '';
  }

  STATES.forEach(s => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'flag-control__btn flag-control__btn--' + s.value;
    btn.dataset.flag = s.value;
    btn.innerHTML = '<span class="flag-dot" aria-hidden="true"></span>' + s.label;
    btn.addEventListener('click', () => {
      const current = getItem(key);
      if (current === s.value) {
        setItem(key, '');
        render(null);
      } else {
        setItem(key, s.value);
        render(s.value);
      }
    });
    group.appendChild(btn);
  });

  section.appendChild(group);
  section.appendChild(status);
  host.appendChild(section);

  render(getItem(key) || null);
}

/* On hub screens, show each unit card's saved flag alongside its status. */
function initHubFlags() {
  const cards = document.querySelectorAll('.unit-card[data-screen-id]');
  if (!cards.length) return;
  cards.forEach(card => {
    if (card.querySelector('.unit-flag')) return;
    const sid = card.getAttribute('data-screen-id');
    const flag = getItem(flagKey(sid));
    const match = STATES.find(s => s.value === flag);
    if (!match) return;
    const aside = card.querySelector('.unit-card__aside') || card;
    const tag = document.createElement('span');
    tag.className = 'unit-flag unit-flag--' + match.value;
    tag.innerHTML = '<span class="flag-dot" aria-hidden="true"></span>' + match.label;
    aside.appendChild(tag);
  });
}

export { initFlagControl, initHubFlags };
