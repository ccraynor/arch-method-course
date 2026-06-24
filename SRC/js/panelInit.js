/* panelInit.js
   Populates support panels with first-use descriptions, wires the
   commitment section into the supplementary sidebar, groups artifact
   and decision sections under a "Your Progress" heading (Item 18),
   adds a decision count badge to the Decision History header button (Item 19),
   and injects the Meridian brief into the Brief panel (Section 4, item 27). */

import { initBriefPanel } from './components/briefPanel.js';

const PANEL_DESCRIPTIONS = {
  glossary: 'Eight key ARCH Method terms are available here. Hover over any highlighted term in the course to see its definition, or browse all terms below.',
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

initPanelDescriptions();
initCommitmentSidebar();
initYourProgressGroup();
initDecisionHistoryButton();
initBriefPanel();
