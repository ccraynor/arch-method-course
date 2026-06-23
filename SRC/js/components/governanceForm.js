/* =============================================================================
   governanceForm.js
   Component Contract — Governance Form
   Implements Section 13 of the Master Accessibility, Usability, and Inclusive
   Design Specification (Version 5.0).

   SPEC REFERENCE
   Section 13  — Component Contract: Governance Form
   Section 15  — Screen Type: Governance Form — Progress Indicator, Error Summary, Autosave
   Section 16  — Governance Forms: Tab, Enter, autosave on field exit.
                  Save status announced. Section progress announced.
                  Instant save confirmation — no animation.
   Section 19  — Error Recovery: Error Summary at top, Linked Errors, Focus Return.
                  Error message structure: Problem + Location + Resolution.
   Announcement — 'Section three of five complete.'

   INPUTS
   • Fields          — form controls (input / textarea / select / radio / checkbox)
                       authored in governance-form-template.html
   • Required Fields — declared via section config required[] array
   • Progress Status — computed from SECTIONS config on every field interaction

   OUTPUTS
   • Saved Governance Record  — JSON serialised to localStorage on autosave / blur /
                                 manual save / submit
   • Progress Indicator       — per-section status list + overall progressbar
                                 (updated on every focusout)

   STATES
   • incomplete   — no section has all required fields filled
   • in-progress  — at least one section is complete; others are not
   • complete     — all sections have all required fields filled
   • error        — submit was attempted and the error summary is visible

   ARIA REQUIREMENTS
   • Per-field inline errors:
       aria-invalid="true" on invalid fields
       field-error <p> revealed via hidden attribute (linked via aria-describedby)
   • Error summary (spec Section 19):
       role="group" aria-labelledby="error-summary-heading" on #error-summary
       #error-summary-heading tabindex="-1" receives focus on failed submit
       Each <li> is an <a href="#field-id"> linking directly to the field
   • Progress announcements via #sr-announcer (not aria-live on progress element):
       "Section [ordinal] of [total] complete." on every section completion milestone
       "All sections complete." appended when the final section completes
   • Save status:
       aria-live="off" for blur / auto / exit saves (silent)
       aria-live="polite" for manual saves (announced)
   • Submit success:
       role="status" tabindex="-1" on #submit-success; receives focus after submission

   PERFORMANCE
   • init() completes synchronously; draft restore happens before first interaction
   • Autosave fires on 30-second interval — does not announce unless manual
   • All progress + error DOM writes complete before requestAnimationFrame fires

   DOM CONTRACT
   The following elements must exist before init() is called.
   These IDs are set in governance-form-template.html — do not rename them.

   Required elements (IDs):
     #governance-form          <form novalidate> — all fields must be descendants
     #error-summary            <div role="group" aria-labelledby="error-summary-heading" hidden>
     #error-summary-heading    <h2 tabindex="-1">
     #error-summary-list       <ul>
     #form-progress            progress group container
     #progress-bar-fill        <div> — style.width set to percentage string
     #progress-bar-role        <span role="progressbar"> — aria-valuenow / aria-label updated
     #progress-complete-count  <span> — receives integer text
     #progress-total-count     <span> — receives total integer text (set by init)
     #form-save-status         <p aria-live="polite"> — save status display
     #btn-save-form            <button> — manual save trigger
     #btn-submit-form          <button type="submit">
     #submit-success           <div role="status" tabindex="-1" hidden>
     #submit-success-timestamp <p> — receives "Submitted at HH:MM" text
     #sr-announcer             <div role="status" aria-live="polite" aria-atomic="true">

   Per-section progress elements:
     #progress-section-N       <li> — progress list item; N = 1-based section index
     .progress-section__status within each — receives status label text + data-status attr

   Per-field error elements:
     #[field-id]-error         <p class="field-error" hidden> — inline field error

   SECTIONS CONFIG SHAPE
   Each section object:
     id         (string) — matches <fieldset id="section-N">
     progressId (string) — matches <li id="progress-section-N">
     name       (string) — human-readable section name used in announcements
     required   (Array)  — descriptors for required fields in this section:
                           string               → input/textarea/select id
                           { name: 'X' }        → radio group name (any checked = filled)
                           { id: 'X', type: 'checkbox' } → required single checkbox

   USAGE
   ─────────────────────────────────────────────────────────────────────────────
   import { init, save, getState } from './components/governanceForm.js';

   init({
     screenId: 'module1_lesson3_governance1',
     sections: [
       {
         id:         'section-1',
         progressId: 'progress-section-1',
         name:       'Course Identification',
         required:   ['course-title', 'target-audience']
       },
       {
         id:         'section-2',
         progressId: 'progress-section-2',
         name:       'Scope Declaration',
         required:   ['scope-in', 'scope-out']
       },
       {
         id:         'section-3',
         progressId: 'progress-section-3',
         name:       'Constraint Documentation',
         required:   [{ name: 'delivery-modality' }, 'course-duration']
       },
       {
         id:         'section-4',
         progressId: 'progress-section-4',
         name:       'Stakeholder Acknowledgment',
         required:   ['stakeholder-name', 'review-date', { id: 'accuracy-confirm', type: 'checkbox' }]
       }
     ]
   });
   ─────────────────────────────────────────────────────────────────────────────
   ============================================================================= */

import { getItem, setItem } from '../storage.js';

const AUTOSAVE_MS = 30000;

const STATE = Object.freeze({
  INCOMPLETE:   'incomplete',
  IN_PROGRESS:  'in-progress',
  COMPLETE:     'complete',
  ERROR:        'error',
});

/* Ordinal words for section announcements — spec: 'Section three of five complete.' */
const ORDINALS = [
  'one','two','three','four','five',
  'six','seven','eight','nine','ten',
];

function _ordinal(n) {
  return ORDINALS[n - 1] || String(n);
}

/* Internal state */
let _ready          = false;
let _screenId       = null;
let _sections       = [];
let _autoSaveTimer  = null;
let _lastSaved      = null;     /* serialised JSON of last saved data */
let _prevStatus     = {};       /* { sectionId: 'not-started'|'in-progress'|'complete' } */
let _hasErrors      = false;
let _submitted      = false;

/* Cached element references */
let _formEl            = null;
let _errorSummaryEl    = null;
let _errorHdgEl        = null;
let _errorListEl       = null;
let _progressBarFillEl = null;
let _progressBarRoleEl = null;
let _progressCountEl   = null;
let _saveStatusEl      = null;
let _successEl         = null;
let _successTsEl       = null;

/* ---- DOM helper ---- */
function _el(id) { return document.getElementById(id); }

/* ---- Global announcer ---- */
function _announce(message) {
  const region = _el('sr-announcer');
  if (!region || !message) return;
  region.textContent = '';
  requestAnimationFrame(() => { region.textContent = message; });
}

/* ---- Clean label text — strips SR-only and aria-hidden spans ---- */
function _labelText(fieldId) {
  const label = _formEl.querySelector('label[for="' + fieldId + '"]') ||
                _formEl.querySelector('#field-group-' + fieldId + ' legend');
  if (!label) return fieldId;
  const clone = label.cloneNode(true);
  clone.querySelectorAll('.sr-only, [aria-hidden="true"]').forEach(n => n.remove());
  return clone.textContent.replace(/\s+/g, ' ').trim();
}

/* ---- Read the current value of a field descriptor ---- */
function _readField(descriptor) {
  if (typeof descriptor === 'string') {
    const el = _el(descriptor);
    return el ? el.value.trim() : '';
  }
  if (descriptor.type === 'checkbox') {
    const el = _el(descriptor.id);
    return (el && el.checked) ? 'checked' : '';
  }
  if (descriptor.name) {
    const checked = _formEl.querySelector('[name="' + descriptor.name + '"]:checked');
    return checked ? checked.value : '';
  }
  return '';
}

/* ---- Compute a section's completion status ---- */
function _sectionStatus(section) {
  const values = section.required.map(_readField);
  const filled = values.filter(v => v !== '').length;
  if (filled === 0) return 'not-started';
  if (filled < section.required.length) return 'in-progress';
  return 'complete';
}

/* ---- Update progress bar, per-section labels, and announce milestones ---- */
function _updateProgress(announce) {
  const total          = _sections.length;
  let   completedCount = 0;
  const milestones     = [];

  _sections.forEach((section, idx) => {
    const status   = _sectionStatus(section);
    const prev     = _prevStatus[section.id];
    const liEl     = _el(section.progressId);
    const statusEl = liEl && liEl.querySelector('.progress-section__status');

    if (statusEl) {
      const label = status === 'complete'    ? 'Complete'
                  : status === 'in-progress' ? 'In progress'
                  : 'Not started';
      statusEl.textContent    = label;
      statusEl.dataset.status = status;
    }

    if (status === 'complete') completedCount++;

    /* Milestone: this section just reached complete */
    if (announce && status === 'complete' && prev !== 'complete') {
      milestones.push('Section ' + _ordinal(idx + 1) + ' of ' + total + ' complete.');
    }

    _prevStatus[section.id] = status;
  });

  /* Progress bar */
  const pct = total > 0 ? Math.round((completedCount / total) * 100) : 0;
  if (_progressBarFillEl) _progressBarFillEl.style.width = pct + '%';
  if (_progressBarRoleEl) {
    _progressBarRoleEl.setAttribute('aria-valuenow', String(completedCount));
    _progressBarRoleEl.setAttribute('aria-label',
      completedCount + ' of ' + total + ' sections complete');
  }
  if (_progressCountEl) _progressCountEl.textContent = String(completedCount);

  /* Announce milestones via #sr-announcer */
  if (milestones.length) {
    let msg = milestones.join(' ');
    if (completedCount === total) msg += ' All sections complete.';
    _announce(msg);
  }
}

/* ---- Collect all form data as a flat object ---- */
function _collectData() {
  const data = {};
  _formEl.querySelectorAll('input, textarea, select').forEach(el => {
    const key = el.id || el.name;
    if (!key) return;
    if (el.type === 'radio') {
      if (el.checked) data[el.name] = el.value;
    } else if (el.type === 'checkbox') {
      data[key] = el.checked ? el.value : '';
    } else {
      data[key] = el.value;
    }
  });
  return data;
}

/* ---- Save draft to localStorage ----
   source: 'auto' | 'blur' | 'manual' | 'submit' | 'exit'
   auto + blur skip if content unchanged.
   Only manual saves announce globally. */
function _saveDraft(source) {
  if (!_screenId) return;
  const serialized = JSON.stringify(_collectData());
  if ((source === 'auto' || source === 'blur') && serialized === _lastSaved) return;

  try {
    setItem('governance_' + _screenId, serialized);
    const ts = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setItem('governance_' + _screenId + '_savedAt', ts);
    _lastSaved = serialized;

    const msg      = 'Draft saved at ' + ts;
    const announce = source === 'manual';

    if (_saveStatusEl) {
      _saveStatusEl.setAttribute('aria-live', announce ? 'polite' : 'off');
      _saveStatusEl.textContent = '';
      requestAnimationFrame(() => { _saveStatusEl.textContent = msg; });
    }

    if (announce) _announce(msg);
  } catch (_) {
    if (_saveStatusEl) {
      _saveStatusEl.setAttribute('aria-live', 'polite');
      _saveStatusEl.textContent = 'Save failed. Storage may be unavailable.';
    }
  }
}

/* ---- Restore draft from localStorage ---- */
function _restoreDraft() {
  if (!_screenId) return;
  const stored = getItem('governance_' + _screenId);
  if (!stored) return;
  try {
    const data = JSON.parse(stored);
    Object.entries(data).forEach(([key, value]) => {
      const byId = _el(key);
      if (byId) {
        if (byId.type === 'checkbox') {
          byId.checked = value === byId.value;
        } else if (byId.type !== 'radio') {
          byId.value = value;
        }
      } else {
        /* Radio group — match by name + value */
        const radio = _formEl.querySelector('[name="' + key + '"][value="' + value + '"]');
        if (radio) radio.checked = true;
      }
    });
    _lastSaved = stored;
    const savedAt = getItem('governance_' + _screenId + '_savedAt');
    if (_saveStatusEl) {
      _saveStatusEl.textContent = savedAt ? 'Last saved at ' + savedAt : 'Draft restored';
    }
    _updateProgress(false);
  } catch (_) { /* corrupted storage — start fresh */ }
}

/* ---- Validate a single field on blur ---- */
function _validateField(el) {
  /* Find this field's inline error element */
  const errorEl = _el(el.id + '-error') ||
    (el.closest('fieldset') &&
      el.closest('fieldset').querySelector('.field-error'));

  let valid = true;

  if (el.type === 'checkbox' && el.required && !el.checked) {
    valid = false;
  } else if (el.required && !el.value.trim()) {
    valid = false;
  }

  el.setAttribute('aria-invalid', valid ? 'false' : 'true');
  if (errorEl) errorEl.hidden = valid;
  return valid;
}

/* ---- Full form validation — returns array of { fieldId, label, message } ---- */
function _validateAll() {
  const errors = [];

  /* text / textarea / select / date */
  _formEl
    .querySelectorAll('input:not([type="radio"]):not([type="checkbox"]), textarea, select')
    .forEach(el => {
      if (!el.required) return;
      const valid = el.value.trim() !== '';
      el.setAttribute('aria-invalid', valid ? 'false' : 'true');
      const errorEl = _el(el.id + '-error');
      if (errorEl) {
        errorEl.hidden = valid;
        if (!valid) {
          errorEl.textContent = el.tagName === 'SELECT'
            ? 'Please make a selection.'
            : 'This field is required.';
        }
      }
      if (!valid) {
        errors.push({
          fieldId: el.id,
          label:   _labelText(el.id),
          message: el.tagName === 'SELECT'
            ? 'Please make a selection.'
            : 'This field is required.',
        });
      }
    });

  /* Checkboxes */
  _formEl.querySelectorAll('input[type="checkbox"][required]').forEach(el => {
    const valid = el.checked;
    el.setAttribute('aria-invalid', valid ? 'false' : 'true');
    const errorEl = _el(el.id + '-error');
    if (errorEl) {
      errorEl.hidden = valid;
      if (!valid) errorEl.textContent = 'This confirmation is required.';
    }
    if (!valid) {
      errors.push({
        fieldId: el.id,
        label:   _labelText(el.id),
        message: 'This confirmation is required.',
      });
    }
  });

  /* Radio groups — check each unique group name exactly once */
  const seenNames = new Set();
  _formEl.querySelectorAll('input[type="radio"]').forEach(radio => {
    if (seenNames.has(radio.name)) return;
    seenNames.add(radio.name);

    const groupFieldset = radio.closest('fieldset[aria-required="true"]');
    if (!groupFieldset) return;

    const checked  = _formEl.querySelector('[name="' + radio.name + '"]:checked');
    const errorEl  = _el(radio.name + '-error') ||
                     groupFieldset.querySelector('.field-error');
    const valid    = !!checked;

    if (errorEl) {
      errorEl.hidden = valid;
      if (!valid) errorEl.textContent = 'Please select one option.';
    }
    if (!valid) {
      const legendEl = groupFieldset.querySelector('legend');
      const clone    = legendEl ? legendEl.cloneNode(true) : null;
      if (clone) clone.querySelectorAll('.sr-only,[aria-hidden="true"]').forEach(n => n.remove());
      errors.push({
        fieldId: radio.id,
        label:   clone ? clone.textContent.replace(/\s+/g, ' ').trim() : radio.name,
        message: 'Please select one option.',
      });
    }
  });

  return errors;
}

/* ---- Show error summary (spec Section 19) ---- */
function _showErrorSummary(errors) {
  const count = errors.length;
  _errorHdgEl.textContent =
    'Your record has ' + count + ' error' + (count === 1 ? '' : 's') +
    '. Please correct the following:';

  _errorListEl.innerHTML = errors
    .map(e => '<li><a href="#' + e.fieldId + '">' +
               e.label + ': ' + e.message + '</a></li>')
    .join('');

  _errorSummaryEl.removeAttribute('hidden');
  _hasErrors = true;
  _errorHdgEl.focus();

  _announce(count + ' error' + (count === 1 ? '' : 's') +
    ' found. Review the error summary at the top of the form.');
}

/* ---- Clear error summary ---- */
function _clearErrorSummary() {
  _errorSummaryEl.setAttribute('hidden', '');
  _errorListEl.innerHTML = '';
  _errorHdgEl.textContent = '';
  _hasErrors = false;
}

/* ---- Form submit handler ---- */
function _onSubmit(e) {
  e.preventDefault();
  _clearErrorSummary();
  const errors = _validateAll();

  if (errors.length) {
    _showErrorSummary(errors);
    return;
  }

  /* Valid — save as final record */
  _saveDraft('submit');
  _submitted = true;

  const ts = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  if (_successTsEl) _successTsEl.textContent = 'Submitted at ' + ts;

  if (_successEl) {
    _successEl.removeAttribute('hidden');
    _successEl.focus();
  }

  const submitBtn = _el('btn-submit-form');
  if (submitBtn) submitBtn.setAttribute('disabled', '');

  _announce('Governance record submitted successfully.');
}

/* ---- focusout handler — validates, saves, updates progress ---- */
function _onFocusOut(e) {
  const el = e.target;
  if (!el.matches('input, textarea, select')) return;
  const isRequired = el.required || el.getAttribute('aria-required') === 'true';
  if (isRequired) _validateField(el);
  _saveDraft('blur');
  _updateProgress(true);
}

/* ---- Start the 30-second autosave timer ---- */
function _startAutosave() {
  if (_autoSaveTimer) clearInterval(_autoSaveTimer);
  _autoSaveTimer = setInterval(() => {
    _saveDraft('auto');
    _updateProgress(false);
  }, AUTOSAVE_MS);
}

/* ============================================================
   PUBLIC API
   ============================================================ */

/**
 * init(config)
 * Wires all form event handlers, restores any saved draft from localStorage,
 * initialises the progress indicator, and starts the 30-second autosave timer.
 * Must be called once per page from the screen-specific module script, after DOM ready.
 * Safe to call multiple times — only the first call performs setup.
 *
 * @param {Object}   config
 * @param {string}   config.screenId   — unique screen identifier; used as localStorage
 *                                       key prefix: governance_[screenId]
 * @param {Array}    config.sections   — ordered array of section descriptors
 *                                       (see SECTIONS CONFIG SHAPE in header)
 *
 * @throws {Error} If any required DOM element is missing.
 */
function init(config) {
  if (_ready) return;

  const required = [
    'governance-form',
    'error-summary', 'error-summary-heading', 'error-summary-list',
    'form-progress', 'progress-bar-fill', 'progress-bar-role',
    'progress-complete-count', 'progress-total-count',
    'form-save-status', 'btn-save-form', 'btn-submit-form',
    'submit-success', 'submit-success-timestamp',
  ];
  required.forEach(id => {
    if (!_el(id)) throw new Error('governanceForm: #' + id + ' not found in DOM.');
  });

  _screenId          = config.screenId || null;
  _sections          = config.sections  || [];
  _formEl            = _el('governance-form');
  _errorSummaryEl    = _el('error-summary');
  _errorHdgEl        = _el('error-summary-heading');
  _errorListEl       = _el('error-summary-list');
  _progressBarFillEl = _el('progress-bar-fill');
  _progressBarRoleEl = _el('progress-bar-role');
  _progressCountEl   = _el('progress-complete-count');
  _saveStatusEl      = _el('form-save-status');
  _successEl         = _el('submit-success');
  _successTsEl       = _el('submit-success-timestamp');

  /* Set the total count display */
  const totalCountEl = _el('progress-total-count');
  if (totalCountEl) totalCountEl.textContent = String(_sections.length);

  /* Update progressbar max */
  if (_progressBarRoleEl) {
    _progressBarRoleEl.setAttribute('aria-valuemax', String(_sections.length));
  }

  /* Initialise previous-status tracking */
  _sections.forEach(s => { _prevStatus[s.id] = 'not-started'; });

  /* Wire submit */
  _formEl.addEventListener('submit', _onSubmit);

  /* Wire blur validation + autosave + progress */
  _formEl.addEventListener('focusout', _onFocusOut);

  /* Wire manual save */
  const btnSave = _el('btn-save-form');
  if (btnSave) {
    btnSave.addEventListener('click', () => {
      _saveDraft('manual');
      _updateProgress(true);
    });
  }

  /* Wire navigation save */
  document.querySelectorAll('.btn--nav').forEach(link => {
    link.addEventListener('click', () => _saveDraft('exit'));
  });

  /* Restore draft, start timer, draw initial progress */
  _restoreDraft();
  _startAutosave();
  _updateProgress(false);

  _ready = true;
}

/**
 * save()
 * Triggers a manual save of the current form state and announces the result.
 * Equivalent to clicking the Save Draft button.
 */
function save() {
  if (!_ready) {
    console.warn('governanceForm.save() called before init().');
    return;
  }
  _saveDraft('manual');
  _updateProgress(true);
}

/**
 * getState()
 * Returns the current form state.
 * Safe to call before init() — returns 'incomplete'.
 *
 * @returns {'incomplete'|'in-progress'|'complete'|'error'}
 */
function getState() {
  if (!_ready) return STATE.INCOMPLETE;
  if (_hasErrors) return STATE.ERROR;
  const completedCount = _sections.filter(s => _sectionStatus(s) === 'complete').length;
  if (completedCount === _sections.length && _sections.length > 0) return STATE.COMPLETE;
  if (completedCount > 0) return STATE.IN_PROGRESS;
  return STATE.INCOMPLETE;
}

export { init, save, getState };
