/* panelManager.js — centralized activeSupportPanel state manager */

const ALLOWED_PANELS = [
  'artifactDrawer',
  'glossary',
  'supportPanel',
  'annotationPanel',
  'briefPanel',
  'contextPanel',
];

let activeSupportPanel = null;
let _lastTrigger = null;

function openPanel(name, triggerElement = null) {
  if (!ALLOWED_PANELS.includes(name)) {
    console.warn(`panelManager: "${name}" is not an allowed panel.`);
    return;
  }
  if (activeSupportPanel === name) return;

  if (activeSupportPanel !== null) {
    _deactivate(activeSupportPanel);
  }

  _lastTrigger = triggerElement;
  activeSupportPanel = name;
  _activate(name);
  _announce(_openMessage(name));
}

function closeAll() {
  if (activeSupportPanel === null) return;
  const closing = activeSupportPanel;
  _deactivate(activeSupportPanel);
  activeSupportPanel = null;
  _announce(_closeMessage(closing));

  if (_lastTrigger) {
    _lastTrigger.focus();
    _lastTrigger = null;
  }
}

function getActivePanel() {
  return activeSupportPanel;
}

/* ---- private ---- */

function _activate(name) {
  const el = document.getElementById(name);
  if (!el) return;
  el.removeAttribute('hidden');
  el.classList.add('is-open');
  const focusTarget = el.querySelector('[data-panel-focus]') ?? el;
  focusTarget.focus();
}

function _deactivate(name) {
  const el = document.getElementById(name);
  if (!el) return;
  el.classList.remove('is-open');
  el.setAttribute('hidden', '');
}

function _announce(message) {
  /* Live region must exist in global HTML as:
     <div id="sr-announcer" role="status" aria-live="polite" aria-atomic="true" class="sr-only"></div>
     Announcement fires within one rAF tick (~16ms), well within the 500ms spec requirement. */
  const region = document.getElementById('sr-announcer');
  if (!region) return;
  region.textContent = '';
  requestAnimationFrame(() => {
    region.textContent = message;
  });
}

/* Spec Section 8 announcement strings. The two overlay-style panels carry
   bespoke open/close wording; every other reference panel uses the generic
   Expanded./Collapsed. pair. */
const PANEL_ANNOUNCE = {
  artifactDrawer:  { open: 'Artifact reference drawer opened.', close: 'Returned to course content.' },
};

function _openMessage(name) {
  return PANEL_ANNOUNCE[name]?.open ?? 'Expanded.';
}

function _closeMessage(name) {
  return PANEL_ANNOUNCE[name]?.close ?? 'Collapsed.';
}

/* Escape closes any open panel — attached once at module load */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeAll();
});

export { openPanel, closeAll, getActivePanel };
