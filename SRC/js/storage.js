/* storage.js — namespaced localStorage with in-memory fallback */

const NAMESPACE = 'archMethod_';
const PREVIEW_KEY = 'archMethod_previewMode';
const memoryFallback = {};
let storageAvailable = true;

(function probe() {
  try {
    const k = '__archProbe__';
    localStorage.setItem(k, '1');
    localStorage.removeItem(k);
  } catch {
    storageAvailable = false;
  }
}());

/* Detect ?preview=true / ?preview=false and update sessionStorage flag. */
(function detectPreview() {
  try {
    const p = new URLSearchParams(location.search).get('preview');
    if (p === 'true')  sessionStorage.setItem(PREVIEW_KEY, 'true');
    if (p === 'false') sessionStorage.removeItem(PREVIEW_KEY);
  } catch { /* sessionStorage unavailable */ }
}());

function isPreviewMode() {
  try { return sessionStorage.getItem(PREVIEW_KEY) === 'true'; }
  catch { return false; }
}

function getItem(key) {
  /* In preview mode, treat all submitted-state keys as absent so forms load fresh. */
  if (isPreviewMode() && key.startsWith('submitted_')) return null;
  const k = NAMESPACE + key;
  if (storageAvailable) {
    return localStorage.getItem(k);
  }
  return Object.prototype.hasOwnProperty.call(memoryFallback, k)
    ? memoryFallback[k]
    : null;
}

function setItem(key, value) {
  const k = NAMESPACE + key;
  if (storageAvailable) {
    try {
      localStorage.setItem(k, value);
      return;
    } catch {
      /* quota exceeded — demote to memory for remainder of session */
      storageAvailable = false;
    }
  }
  memoryFallback[k] = value;
}

function clearItem(key) {
  const k = NAMESPACE + key;
  if (storageAvailable) {
    localStorage.removeItem(k);
  } else {
    delete memoryFallback[k];
  }
}

export { getItem, setItem, clearItem, isPreviewMode };
