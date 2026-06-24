/* panelManager.js — centralized activeSupportPanel state manager */

const ALLOWED_PANELS = [
  'artifactDrawer',
  'decisionHistory',
  'glossary',
  'supportPanel',
  'annotationPanel',
  'briefPanel',
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
  _announce(`${_label(name)} panel opened`);
}

function closeAll() {
  if (activeSupportPanel === null) return;
  _deactivate(activeSupportPanel);
  activeSupportPanel = null;
  _announce('Panel closed');

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

function _label(name) {
  return {
    artifactDrawer:  'Artifact drawer',
    decisionHistory: 'Decision history',
    glossary:        'Glossary',
    supportPanel:    'Support',
    annotationPanel: 'Annotation',
    briefPanel:      'Meridian brief',
  }[name] ?? name;
}

/* Escape closes any open panel — attached once at module load */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeAll();
});

export { openPanel, closeAll, getActivePanel };
