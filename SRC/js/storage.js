/* storage.js — namespaced localStorage with in-memory fallback */

const NAMESPACE = 'archMethod_';
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

function getItem(key) {
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

export { getItem, setItem, clearItem };
