/* panelInit.js
   Populates support panels with first-use descriptions, wires the
   commitment section into the supplementary sidebar, groups artifact
   and decision sections under a "Your Progress" heading (Item 18),
   adds a decision count badge to the Decision History header button (Item 19),
   and injects the Meridian brief into the Brief panel (Section 4, item 27).
   Also initializes the hover glossary course-wide (Section 6, item 32). */

import { initBriefPanel } from './components/briefPanel.js';
import { initAll as initGlossary, TERMS } from './scaffolds/hoverGlossary.js';
import { getItem, setItem } from './storage.js';

const PANEL_DESCRIPTIONS = {
  glossary: 'Eighteen key ARCH Method terms are available here. Hover over any highlighted term in the course to see its definition, or browse all terms below.',
  supportPanel: 'Context-sensitive guidance appears here as you work through each unit.',
  annotationPanel: 'Your personal notes are saved here automatically as you type.',
};

function initPanelDescriptions() {
  Object.entries(PANEL_DESCRIPTIONS).forEach(([id, text]) => {
    const panel = document.getElementById(id);
    if (!panel) return;
    const body = panel.querySelector('.panel-body');
    if (!body) return;

    /* Only inject if body is empty or has only a textarea */
    const hasOnlyTextarea = body.children.length === 0 ||
      (body.children.length === 1 && body.children[0].tagName === 'LABEL') ||
      (body.children.length <= 2 && body.querySelector('textarea'));

    if (body.children.length === 0 || hasOnlyTextarea) {
      const desc = document.createElement('p');
      desc.className = 'panel-description';
      desc.textContent = text;
      body.insertBefore(desc, body.firstChild);
    }
  });
}

function initCommitmentSidebar() {
  const decisionSection = document.getElementById('decision-history');
  if (!decisionSection) return;

  const commitmentNote = localStorage.getItem('archMethod_learnerCommitmentNote') || '';

  /* Create commitment section */
  const section = document.createElement('section');
  section.id = 'sidebar-commitment';
  section.setAttribute('aria-label', 'Your commitment');
  section.style.display = 'flex';
  section.style.flexDirection = 'column';

  const heading = document.createElement('h2');
  heading.className = 'aside-heading';
  heading.textContent = 'Your Commitment';
  section.appendChild(heading);

  if (commitmentNote) {
    const text = document.createElement('p');
    text.className = 'aside-commitment__text';
    /* Truncate to ~200 chars for sidebar display */
    text.textContent = commitmentNote.length > 200
      ? commitmentNote.slice(0, 200).trim() + '…'
      : commitmentNote;
    section.appendChild(text);
  } else {
    const empty = document.createElement('p');
    empty.className = 'aside-empty';
    empty.innerHTML = 'Not yet written. <a href="intro-0.9.html" class="aside-commitment__link">Write your commitment note</a> in Screen 0.9.';
    section.appendChild(empty);
  }

  /* Insert after artifact-reference section */
  const artifactSection = document.getElementById('artifact-reference');
  const sidebar = document.getElementById('supplementary-resources');
  if (sidebar) {
    if (artifactSection?.nextSibling) {
      sidebar.insertBefore(section, artifactSection.nextSibling);
    } else {
      sidebar.appendChild(section);
    }
  }
}

/* Item 18: Group artifact-reference and decision-history under "Your Progress" */
function initYourProgressGroup() {
  const sidebar = document.getElementById('supplementary-resources');
  const artifactSection = document.getElementById('artifact-reference');
  const decisionSection = document.getElementById('decision-history');
  if (!sidebar || !artifactSection || !decisionSection) return;

  const group = document.createElement('div');
  group.className = 'sidebar-progress-group';

  const groupHeading = document.createElement('h2');
  groupHeading.className = 'sidebar-progress-group__heading';
  groupHeading.textContent = 'Your Progress';
  group.appendChild(groupHeading);

  sidebar.insertBefore(group, artifactSection);
  group.appendChild(artifactSection);
  group.appendChild(decisionSection);

  /* Remove the H2 headings inside each section since the group heading
     provides the context -- downgrade them to visually styled divs */
  [artifactSection, decisionSection].forEach(sec => {
    const h2 = sec.querySelector('h2.aside-heading');
    if (h2) {
      const label = document.createElement('p');
      label.className = 'aside-sublabel';
      label.textContent = h2.textContent;
      h2.replaceWith(label);
    }
  });
}

/* Item 19: Hide the Artifacts overlay toggle (artifacts are sidebar-only);
   add a decision count badge to the Decision History button. */
function initDecisionHistoryButton() {
  /* Remove Artifacts overlay button from header -- artifact content lives in sidebar */
  const artifactsBtn = document.querySelector('[data-panel="artifactDrawer"]');
  if (artifactsBtn) {
    artifactsBtn.hidden = true;
    artifactsBtn.setAttribute('aria-hidden', 'true');
  }

  /* Add count badge to Decision History button */
  const dhBtn = document.querySelector('[data-panel="decisionHistory"]');
  if (!dhBtn) return;

  const count = countDecisions();
  const badge = document.createElement('span');
  badge.className = 'decision-badge';
  badge.setAttribute('aria-label', count > 0 ? `${count} decisions logged` : '');
  badge.textContent = count > 0 ? String(count) : '';
  badge.hidden = count === 0;
  dhBtn.appendChild(badge);
}

function countDecisions() {
  try {
    let n = 0;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('archMethod_decision_')) n++;
    }
    return n;
  } catch {
    return 0;
  }
}

/* Item 11: list glossary terms in the Glossary panel, Module 1 terms first,
   then foundation and general terms. */
function initGlossaryList() {
  const panel = document.getElementById('glossary');
  if (!panel) return;
  const body = panel.querySelector('.panel-body');
  if (!body || body.dataset.glsListLoaded === 'true') return;

  const MODULE1 = ['constraint', 'scope', 'governance', 'traceability',
                   'architecture', 'calibration', 'decomposition', 'tradeoff'];
  const FOUNDATION = ['bloomsTaxonomy', 'cognitiveLoad', 'prerequisiteDependency',
                      'transfer', 'cbe', 'formativeAssessment', 'summativeAssessment',
                      'scopeCreep', 'sme', 'learningObjective', 'competency', 'dependency'];

  function group(title, keys) {
    const section = document.createElement('div');
    section.className = 'gls-list-group';
    const h = document.createElement('p');
    h.className = 'gls-list-group__heading';
    h.textContent = title;
    section.appendChild(h);
    const dl = document.createElement('dl');
    dl.className = 'gls-list';
    keys.forEach(k => {
      const t = TERMS[k];
      if (!t) return;
      const dt = document.createElement('dt');
      dt.className = 'gls-list__term';
      dt.textContent = t.label;
      const dd = document.createElement('dd');
      dd.className = 'gls-list__def';
      dd.textContent = t.definition;
      dl.append(dt, dd);
    });
    section.appendChild(dl);
    return section;
  }

  body.appendChild(group('Module 1 terms', MODULE1));
  body.appendChild(group('Foundation and general terms', FOUNDATION));
  body.dataset.glsListLoaded = 'true';
}

/* Item 7: artifact progression in the Your Progress sidebar group. */
function initArtifactProgression() {
  const group = document.querySelector('.sidebar-progress-group');
  if (!group || group.dataset.artifactProgLoaded === 'true') return;

  const ARTIFACTS = [
    { name: 'MRHN_BucketMap_v1',          lesson: '3' },
    { name: 'MRHN_CalibratedScopeMap_v1', lesson: '4' },
    { name: 'MRHN_PerformanceArc_v1',     lesson: '5' },
    { name: 'MRHN_DecompositionMap_v1',   lesson: '5' },
    { name: 'MRHN_DecompositionMap_v2',   lesson: '6' },
  ];
  const isComplete = n => getItem('lesson_' + n + '_complete') === 'true';

  const details = document.createElement('details');
  details.className = 'artifact-prog';
  const summary = document.createElement('summary');
  summary.className = 'artifact-prog__summary';
  summary.textContent = 'Artifact Progression';
  details.appendChild(summary);

  const list = document.createElement('ol');
  list.className = 'artifact-prog__list';

  let currentMarked = false;
  ARTIFACTS.forEach(a => {
    const complete = isComplete(a.lesson);
    const priorDone = a.lesson === '3' ? isComplete('2') : isComplete(String(Number(a.lesson) - 1));
    let status = 'Upcoming', cls = 'is-upcoming';
    if (complete) { status = 'Complete'; cls = 'is-complete'; }
    else if (priorDone) { status = 'In Progress'; cls = 'is-inprogress'; }

    const li = document.createElement('li');
    li.className = 'artifact-prog__item ' + cls;
    if (!complete && !currentMarked) { li.classList.add('is-current'); currentMarked = true; }

    li.innerHTML =
      '<span class="artifact-prog__name">' + a.name + '</span>' +
      '<span class="artifact-prog__meta">Lesson ' + a.lesson + '</span>' +
      '<span class="artifact-prog__status">' + status + '</span>';
    list.appendChild(li);
  });

  details.appendChild(list);
  group.appendChild(details);
  group.dataset.artifactProgLoaded = 'true';
}

/* Item 14: record the last visited content screen for the resume prompt.
   Skipped on hub and module-overview navigation screens. */
function recordLastVisited() {
  const file = location.pathname.split('/').pop() || '';
  const screenId = file.replace(/\.html$/, '');
  if (!screenId) return;
  if (screenId.startsWith('m1-hub-') || screenId === 'm1-overview') return;
  try {
    setItem('lastVisited', screenId);
    setItem('lastVisitDate', new Date().toISOString());
  } catch { /* storage unavailable */ }
}

/* Prompt E Part 1 Section 2: Priya Okonkwo email cards persist their
   open/closed state. data-persist-key is namespaced by storage.js. */
function initPriyaEmails() {
  document.querySelectorAll('details.priya-email[data-persist-key]').forEach(d => {
    const key = d.getAttribute('data-persist-key');
    const saved = getItem(key);
    if (saved === 'closed') d.open = false;
    else if (saved === 'open') d.open = true;
    d.addEventListener('toggle', () => setItem(key, d.open ? 'open' : 'closed'));
  });
}

/* Prompt E Part 1 Section 2: generic autosave for narrative scene textareas
   (for example the scenario evolution note). data-autosave-key is namespaced
   by storage.js; data-autosave-status points to a status element id. */
function initSceneAutosave() {
  document.querySelectorAll('textarea[data-autosave-key]').forEach(t => {
    const key = t.getAttribute('data-autosave-key');
    const saved = getItem(key);
    if (saved != null) t.value = saved;
    const status = document.getElementById(t.getAttribute('data-autosave-status') || '');
    t.addEventListener('input', () => {
      setItem(key, t.value);
      if (status) { status.hidden = false; status.textContent = 'Saved'; }
    });
  });
}

initPanelDescriptions();
initCommitmentSidebar();
initYourProgressGroup();
initDecisionHistoryButton();
initBriefPanel();
initGlossary();
initGlossaryList();
initArtifactProgression();
initPriyaEmails();
initSceneAutosave();
recordLastVisited();
