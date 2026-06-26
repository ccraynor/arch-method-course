/* pacingAlert.js (Prompt E Part 2 item 13)
   Monitors continuous session length. After 90 minutes it shows a subtle,
   dismissible amber banner suggesting a break. Appears once per session.
   Session start time and the shown flag live in sessionStorage so the alert
   resets when the learner starts a fresh session. */

const THRESHOLD_MS = 90 * 60 * 1000;
const START_KEY = 'archMethod_sessionStart';
const SHOWN_KEY = 'archMethod_pacingAlertShown';

function ssGet(key) {
  try { return sessionStorage.getItem(key); } catch (e) { return null; }
}
function ssSet(key, val) {
  try { sessionStorage.setItem(key, val); } catch (e) { /* private mode */ }
}

function showBanner() {
  if (ssGet(SHOWN_KEY) === 'true') return;
  if (document.querySelector('.pacing-alert')) return;
  const host = document.getElementById('current-activity')
    || document.getElementById('main-content')
    || document.querySelector('main');
  if (!host) return;

  const banner = document.createElement('div');
  banner.className = 'pacing-alert';
  banner.setAttribute('role', 'status');
  banner.setAttribute('aria-live', 'polite');

  const text = document.createElement('p');
  text.className = 'pacing-alert__text';
  text.textContent = 'You have been working for 90 minutes. Research suggests taking a break now will improve retention.';
  banner.appendChild(text);

  const dismiss = document.createElement('button');
  dismiss.type = 'button';
  dismiss.className = 'pacing-alert__dismiss';
  dismiss.setAttribute('aria-label', 'Dismiss this message');
  dismiss.innerHTML = '<svg aria-hidden="true" focusable="false" width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M13.5 4.5l-9 9M4.5 4.5l9 9" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
  dismiss.addEventListener('click', () => banner.remove());
  banner.appendChild(dismiss);

  host.insertBefore(banner, host.firstChild);
  ssSet(SHOWN_KEY, 'true');
}

function initPacingAlert() {
  if (ssGet(SHOWN_KEY) === 'true') return;

  let start = parseInt(ssGet(START_KEY) || '', 10);
  const now = Date.now();
  if (!start || isNaN(start)) {
    start = now;
    ssSet(START_KEY, String(start));
  }

  const elapsed = now - start;
  if (elapsed >= THRESHOLD_MS) {
    showBanner();
  } else {
    setTimeout(showBanner, THRESHOLD_MS - elapsed);
  }
}

export { initPacingAlert };
