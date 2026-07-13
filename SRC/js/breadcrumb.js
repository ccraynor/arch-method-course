/* breadcrumb.js
   Generates breadcrumb nav above the first H1 in #current-activity.
   Position numbers come from SCREEN_MAP in trackerRedesign.js (single source
   of truth shared with the header tracker), so breadcrumb and tracker never
   diverge, including inserted faded examples and split screens. */

import { SCREEN_MAP } from './trackerRedesign.js';

/* Lesson display names, keyed by MODULE + lesson token.

   Module-scoped by necessity: the bare lesson token is NOT unique across
   modules. Module 1's l2 is "Lesson 3" (ARCH 1.2) while Module 2's l2 is
   "Lesson 2" (ARCH 2.2). A bare-token map silently mislabels Module 2.
   Learner-facing ordinals restart at 1 in each module. */
const LESSON_NAMES = {
  'm1-l1a': 'Lesson 1', 'm1-l1b': 'Lesson 2', 'm1-l2': 'Lesson 3',
  'm1-l3':  'Lesson 4', 'm1-l4a': 'Lesson 5', 'm1-l4b': 'Lesson 6',
  'm2-l1':  'Lesson 1', 'm2-l2':  'Lesson 2', 'm2-l3': 'Lesson 3',
  'm2-l4':  'Lesson 4',
};

/* Lesson token -> hub ordinal. Hub files are m[N]-hub-l[ordinal].html, so
   Module 1's l4b maps to hub 6, while Module 2's l4 maps to hub 4. */
const LESSON_HUB_NUM = {
  'm1-l1a': '1', 'm1-l1b': '2', 'm1-l2': '3',
  'm1-l3':  '4', 'm1-l4a': '5', 'm1-l4b': '6',
  'm2-l1':  '1', 'm2-l2':  '2', 'm2-l3': '3', 'm2-l4': '4',
};

function buildCrumbs(filename) {
  /* Intro screens */
  const introMatch = filename.match(/^intro-(0\.\d)$/);
  if (introMatch) {
    return [
      { label: 'Introduction', href: 'intro-0.1.html' },
      { label: introMatch[1], current: true },
    ];
  }

  /* Gate screen, any module */
  const gateMatch = filename.match(/^m(\d+)-gate-s\d+$/);
  if (gateMatch) {
    const moduleNum = gateMatch[1];
    return [
      { label: `Module ${moduleNum}`, href: `m${moduleNum}-overview.html` },
      { label: 'Module Gate', current: true },
    ];
  }

  /* Lesson screens, any module (including lettered variants s4b, s3b, s5a, s5b).
     Position is read from SCREEN_MAP so it always matches the header tracker. */
  const lessonMatch = filename.match(/^m(\d+)-(l\d+[ab]?)-s(\d+[ab]?)$/);
  if (lessonMatch) {
    const moduleNum  = lessonMatch[1];
    const lessonKey  = `m${moduleNum}-${lessonMatch[2]}`;
    const lessonName = LESSON_NAMES[lessonKey] || lessonMatch[2].toUpperCase();
    const lessonHref = `${lessonKey}-s1.html`;
    const entry      = SCREEN_MAP[filename];
    const position   = entry ? entry[1] : '';
    return [
      { label: `Module ${moduleNum}`, href: `m${moduleNum}-overview.html` },
      { label: lessonName, href: lessonHref },
      { label: position, current: true },
    ];
  }

  return [];
}

/* Section 5: Return to Lesson Hub link target per unit screen, any module. */
function hubFor(filename) {
  const gateMatch = filename.match(/^m(\d+)-gate-s\d+$/);
  if (gateMatch) {
    return {
      href: `m${gateMatch[1]}-hub-gate.html`,
      label: 'Return to Module Gate Hub',
    };
  }
  const m = filename.match(/^m(\d+)-(l\d+[ab]?)-s/);
  if (!m) return null;
  const lessonNum = LESSON_HUB_NUM[`m${m[1]}-${m[2]}`];
  if (!lessonNum) return null;
  return { href: `m${m[1]}-hub-l${lessonNum}.html`, label: 'Return to Lesson Hub' };
}

function initBreadcrumb() {
  const filename = window.location.pathname.split('/').pop().replace('.html', '');
  const h1 = document.querySelector('#current-activity h1');
  if (!h1) return;

  /* Breadcrumb (skipped on screens with no crumb mapping, e.g. faded examples) */
  const crumbs = buildCrumbs(filename);
  if (crumbs.length) {
    const nav = document.createElement('nav');
    nav.setAttribute('aria-label', 'Breadcrumb');
    nav.className = 'breadcrumb';

    const ol = document.createElement('ol');
    ol.className = 'breadcrumb__list';

    crumbs.forEach(crumb => {
      const li = document.createElement('li');
      li.className = 'breadcrumb__item';

      if (crumb.current) {
        const span = document.createElement('span');
        span.setAttribute('aria-current', 'page');
        span.textContent = crumb.label;
        li.appendChild(span);
      } else {
        const a = document.createElement('a');
        a.href = crumb.href;
        a.textContent = crumb.label;
        li.appendChild(a);
      }

      ol.appendChild(li);
    });

    nav.appendChild(ol);
    h1.parentNode.insertBefore(nav, h1);
  }

  /* Return to Lesson Hub link, placed directly below the breadcrumb
     (Section 5, item 30). Inserted before the H1, after the breadcrumb. */
  const hub = hubFor(filename);
  if (hub) {
    const p = document.createElement('p');
    p.className = 'return-hub';
    const a = document.createElement('a');
    a.href = hub.href;
    a.innerHTML = '<span aria-hidden="true">← </span>Return to Lesson Hub';
    p.appendChild(a);
    h1.parentNode.insertBefore(p, h1);
  }
}

initBreadcrumb();
