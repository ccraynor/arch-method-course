/* autosave.js — shared autosave module (AX4 Stage 1).

   One module for all learner-input autosave, built on storage.js (persistence)
   and srAnnounce.js (the single SR announce path established in AX6). Does NOT
   modify either.

   TIER MODEL (via data-attributes; tier defaults to light when absent):

   Tier 1 — substantial authored text (artifacts, reflections, long-text).
     Markup contract: a container element carrying
       data-autosave-group
       data-autosave-tier="1"
       data-autosave-status="<id of the visible status element>"
       data-autosave-key="<storage key>"   (may be assigned at runtime, e.g.
                                            reflection_<SCREEN_ID>, before init)
     containing one or more <textarea>/<input> fields (collected by id|name and
     serialized together as one JSON value), and optionally
       <button data-autosave-save>   (manual Save)
     Behavior: restore on init (+ "Previous work restored." once via srAnnounce);
     30s interval + on-blur SILENT save (updates the visible "Saved at <time>"
     status, no SR announce — announcing every tick would be hostile); manual
     Save -> save + "Work saved." (verbatim spec Section 8, via srAnnounce). Each
     save is wrapped in a recovery hook (onSaveError).
     NOTE (AX4 Stage 4): the recovery hook is DORMANT in Stage 1. storage.js
     swallows quota failures into an in-memory fallback and never throws/signals
     failure, so the catch never fires today. Stage 4 adds a failure signal to
     storage.js (prerequisite) and the Retry/Download/Copy/Return recovery UI +
     "Save failed." announce on top of this hook.

   Tier 2/3 — light inputs (short responses, scene notes, toggles).
     Per-field data-autosave-key (+ optional data-autosave-status). Save-on-input
     + status text only; no interval, manual Save, timestamp, announce, or
     recovery. Mirrors the legacy panelInit initSceneAutosave; NOT activated
     globally until AX4 Stage 5 (initSceneAutosave still serves those screens
     until then). initAutosave only wires light fields NOT inside a Tier-1 group.

   Verbatim spec strings (Section 6/8): "Work saved." (manual), "Previous work
   restored." (restore). Visible status: "Saved at <time>", "Not yet saved",
   "Unable to save.". */

import { getItem, setItem } from './storage.js';
import { announce } from './srAnnounce.js';

const INTERVAL_MS = 30000;

function nowTime() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function isEditableField(el) {
  const t = (el.type || '').toLowerCase();
  return t !== 'checkbox' && t !== 'radio' && t !== 'button' && t !== 'submit' && t !== 'reset';
}

/* ---- Tier 1: grouped authored-text autosave ---- */
function initGroup(group) {
  const key = group.getAttribute('data-autosave-key');
  if (!key) {
    console.warn('autosave: Tier-1 group has no data-autosave-key yet; skipping.', group);
    return;
  }
  if (group.dataset.autosaveWired === 'true') return;   /* idempotent */
  group.dataset.autosaveWired = 'true';

  const statusEl = document.getElementById(group.getAttribute('data-autosave-status') || '');
  const fields = Array.from(group.querySelectorAll('textarea, input')).filter(isEditableField);
  const saveBtn = group.querySelector('[data-autosave-save]');

  let lastSerialized = null;

  function collect() {
    const data = {};
    fields.forEach(el => { data[el.id || el.name] = el.value; });
    return JSON.stringify(data);
  }

  /* Visible status only (aria-live off). All SR announcements route through
     srAnnounce, so the status element never double-announces. */
  function setStatus(message) {
    if (!statusEl) return;
    statusEl.setAttribute('aria-live', 'off');
    statusEl.hidden = false;
    statusEl.textContent = message;
  }

  /* Stage 1 stub — dormant until AX4 Stage 4 (storage.js failure signal +
     recovery UI). Kept as the single attach-point so Stage 4 wires here. */
  function onSaveError() {
    /* Stage 4: render Retry Save / Download Draft / Copy Response / Return to
       Editing, and announce('Save failed.'). */
  }

  function save(source) {
    const serialized = collect();
    if ((source === 'auto' || source === 'blur') && serialized === lastSerialized) return;
    try {
      const ts = nowTime();
      setItem(key, serialized);
      setItem(key + '_savedAt', ts);
      lastSerialized = serialized;
      setStatus('Saved at ' + ts);
      if (source === 'manual') announce('Work saved.');
    } catch {
      setStatus('Unable to save.');
      onSaveError();
    }
  }

  function restore() {
    const stored = getItem(key);
    if (stored == null) { setStatus('Not yet saved'); return; }
    try {
      const data = JSON.parse(stored);
      fields.forEach(el => {
        const id = el.id || el.name;
        if (Object.prototype.hasOwnProperty.call(data, id)) el.value = data[id];
      });
      lastSerialized = stored;
      const ts = getItem(key + '_savedAt');
      setStatus(ts ? 'Saved at ' + ts : 'Draft restored');
      announce('Previous work restored.');
    } catch {
      /* corrupted storage — start fresh, do not block the learner */
    }
  }

  fields.forEach(el => el.addEventListener('blur', () => save('blur')));
  if (saveBtn) saveBtn.addEventListener('click', () => save('manual'));

  restore();
  setInterval(() => save('auto'), INTERVAL_MS);
}

/* ---- Tier 2/3: light per-field autosave (save-on-input + status) ---- */
function initLightField(el) {
  if (el.closest('[data-autosave-group]')) return;      /* groups own their fields */
  if (el.dataset.autosaveWired === 'true') return;
  el.dataset.autosaveWired = 'true';
  const key = el.getAttribute('data-autosave-key');
  if (!key) return;
  const saved = getItem(key);
  if (saved != null) el.value = saved;
  const statusEl = document.getElementById(el.getAttribute('data-autosave-status') || '');
  el.addEventListener('input', () => {
    setItem(key, el.value);
    if (statusEl) { statusEl.hidden = false; statusEl.textContent = 'Saved'; }
  });
}

/* Wire all autosave fields under `root`. Call after any runtime keys are set
   (e.g. a reflection screen sets the group's data-autosave-key first). */
export function initAutosave(root = document) {
  root.querySelectorAll('[data-autosave-group]').forEach(initGroup);
  root.querySelectorAll('textarea[data-autosave-key], input[data-autosave-key]').forEach(initLightField);
}
