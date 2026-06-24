/* breadcrumb.js
   Generates breadcrumb nav above the first H1 in #current-activity.
   Derives crumb values from the page URL -- no per-screen config needed. */

const LESSON_NAMES = {
  'l1a': 'Lesson 1', 'l1b': 'Lesson 2', 'l2': 'Lesson 3',
  'l3':  'Lesson 4', 'l4a': 'Lesson 5', 'l4b': 'Lesson 6',
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

  /* Gate screen */
  if (filename === 'm1-gate-s1') {
    return [
      { label: 'Module 1', href: 'm1-overview.html' },
      { label: 'Module Gate', current: true },
    ];
  }

  /* Overrides for lettered screen variants (e.g. s5a, s5b) */
  const POSITION_OVERRIDE = {
    'm1-l2-s5a': '3.5',
    'm1-l2-s5b': '3.6',
  };
  if (POSITION_OVERRIDE[filename]) {
    const lessonKey  = 'l2';
    const lessonName = LESSON_NAMES[lessonKey];
    return [
      { label: 'Module 1', href: 'm1-overview.html' },
      { label: lessonName, href: 'm1-l2-s1.html' },
      { label: POSITION_OVERRIDE[filename], current: true },
    ];
  }

  /* Module 1 lesson screens */
  const m1Match = filename.match(/^m1-(l\d+[ab]?)-s(\d+)$/);
  if (m1Match) {
    const [, lessonKey, screenNum] = m1Match;
    const lessonName = LESSON_NAMES[lessonKey] || lessonKey.toUpperCase();
    const lessonHref = `m1-${lessonKey}-s1.html`;
    /* Position in new numbering */
    const lessonNums = {
      l1a: 1, l1b: 2, l2: 3, l3: 4, l4a: 5, l4b: 6
    };
    const lessonNum = lessonNums[lessonKey] || 0;
    const position  = `${lessonNum}.${screenNum}`;
    return [
      { label: 'Module 1', href: 'm1-overview.html' },
      { label: lessonName, href: lessonHref },
      { label: position, current: true },
    ];
  }

  return [];
}

/* Section 5: Return to Lesson Hub link target per Module 1 unit screen. */
function hubFor(filename) {
  if (filename === 'm1-gate-s1') {
    return { href: 'm1-hub-gate.html', label: 'Return to Module Gate Hub' };
  }
  const m = filename.match(/^m1-(l1a|l1b|l2|l3|l4a|l4b)-s/);
  if (!m) return null;
  const lessonNum = { l1a: '1', l1b: '2', l2: '3', l3: '4', l4a: '5', l4b: '6' }[m[1]];
  return { href: 'm1-hub-l' + lessonNum + '.html', label: 'Return to Lesson Hub' };
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
    a.textContent = hub.label;
    p.appendChild(a);
    h1.parentNode.insertBefore(p, h1);
  }
}

initBreadcrumb();
