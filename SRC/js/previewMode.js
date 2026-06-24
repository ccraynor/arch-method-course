/* previewMode.js
   Injects amber preview-mode banner when sessionStorage preview flag is set.
   Preview is activated via ?preview=true (detected in storage.js) and persists
   across same-session navigation via sessionStorage. */

import { isPreviewMode } from './storage.js';

if (isPreviewMode()) {
  document.addEventListener('DOMContentLoaded', () => {
    const banner = document.createElement('div');
    banner.id = 'preview-mode-banner';
    banner.className = 'preview-mode-banner';
    banner.setAttribute('role', 'status');
    banner.innerHTML =
      '<svg aria-hidden="true" focusable="false" width="16" height="16" viewBox="0 0 16 16" fill="none">' +
        '<path d="M8 2L14.5 13H1.5L8 2Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>' +
        '<path d="M8 6.5v3M8 11v.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>' +
      '</svg>' +
      '<span class="preview-mode-banner__text">' +
        '<strong>Preview Mode</strong> -- forms are active and submissions are not saved.' +
      '</span>' +
      '<button type="button" class="preview-mode-banner__exit" id="preview-exit-btn">' +
        'Exit preview' +
      '</button>';

    const courseNav = document.getElementById('course-nav');
    const main = document.getElementById('main-content');
    const anchor = courseNav ? courseNav.nextSibling : main;
    if (anchor) {
      anchor.parentNode.insertBefore(banner, anchor);
    } else {
      document.body.appendChild(banner);
    }

    document.getElementById('preview-exit-btn').addEventListener('click', () => {
      try { sessionStorage.removeItem('archMethod_previewMode'); } catch { /* ignore */ }
      location.href = location.pathname;
    });
  });
}
