/* cognitiveModeBanner.js (Prompt E Part 2 item 10)
   Marks the transition from observation to production. On a worked example
   screen it records a per-lesson sessionStorage flag. On a guided practice
   screen, if that flag is set and the banner has not already been shown this
   session, it injects a dismissible teal banner. The banner does not reappear
   on return visits within the same session. */

const WE_LABELS = ['worked example'];
const GP_LABELS = ['guided practice'];

function screenId() {
  return window.location.pathname.split('/').pop().replace('.html', '');
}

function lessonKey() {
  const m = screenId().match(/^m1-(l1a|l1b|l2|l3|l4a|l4b)-/);
  return m ? m[1] : null;
}

function screenTypeText() {
  const el = document.querySelector('.screen-type-label');
  return el ? el.textContent.trim().toLowerCase() : '';
}

function ssGet(key) {
  try { return sessionStorage.getItem(key); } catch (e) { return null; }
}
function ssSet(key, val) {
  try { sessionStorage.setItem(key, val); } catch (e) { /* private mode */ }
}

function initCognitiveModeBanner() {
  const key = lessonKey();
  if (!key) return;
  const type = screenTypeText();
  const exitedKey = 'archMethod_exitedWorkedExample_' + key;

  if (WE_LABELS.some(l => type.includes(l))) {
    ssSet(exitedKey, 'true');
    return;
  }

  if (!GP_LABELS.some(l => type.includes(l))) return;

  if (ssGet(exitedKey) !== 'true') return;

  const shownKey = 'archMethod_cogBannerShown_' + screenId();
  if (ssGet(shownKey) === 'true') return;

  const host = document.getElementById('current-activity');
  if (!host) return;

  const banner = document.createElement('div');
  banner.className = 'cog-banner';
  banner.setAttribute('role', 'note');

  const text = document.createElement('p');
  text.className = 'cog-banner__text';
  text.textContent = 'You have just observed how an expert approached this. Now it is your turn.';
  banner.appendChild(text);

  host.insertBefore(banner, host.firstChild);
  ssSet(shownKey, 'true');
}

export { initCognitiveModeBanner };
