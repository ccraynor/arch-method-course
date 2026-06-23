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
      { label: 'Module 1', href: 'm1-l1a-s1.html' },
      { label: 'Module Gate', current: true },
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
      { label: 'Module 1', href: 'm1-l1a-s1.html' },
      { label: lessonName, href: lessonHref },
      { label: position, current: true },
    ];
  }

  return [];
}

function initBreadcrumb() {
  const filename = window.location.pathname.split('/').pop().replace('.html', '');
  const crumbs = buildCrumbs(filename);
  if (!crumbs.length) return;

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

  const h1 = document.querySelector('#current-activity h1');
  if (h1) {
    h1.parentNode.insertBefore(nav, h1);
  }
}

initBreadcrumb();
