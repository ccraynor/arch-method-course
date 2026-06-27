/* srAnnounce.js — the single shared screen-reader announce path.

   Every SR announcement in the build routes through #sr-announcer via
   announce(). It clears textContent then sets it on the next animation frame
   so assistive tech reliably re-reads repeated or identical messages.

   The live region must exist in the page (present in global HTML on every
   screen):
     <div id="sr-announcer" role="status" aria-live="polite" aria-atomic="true"
          class="sr-only"></div>

   Announcement fires within one rAF tick (~16ms), well within the 500ms spec
   requirement (Master Accessibility Spec Section 8). */

const ANNOUNCER_ID = 'sr-announcer';

export function announce(message) {
  const region = document.getElementById(ANNOUNCER_ID);
  if (!region) return;
  region.textContent = '';
  requestAnimationFrame(() => {
    region.textContent = message;
  });
}
