/* panelInit.js
   Populates support panels with first-use descriptions and wires the
   commitment section into the supplementary sidebar. */

const PANEL_DESCRIPTIONS = {
  glossary: 'Eight key ARCH Method™ terms are available here. Hover over any highlighted term in the course to see its definition, or browse all terms below.',
  supportPanel: 'Context-sensitive guidance appears here as you work through each unit.',
  artifactDrawer: 'Your current working artifact is tracked here. It updates as you complete governance records and design decisions.',
  decisionHistory: 'Every design decision you make in this credential is logged here automatically. Use search to find specific decisions.',
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

initPanelDescriptions();
initCommitmentSidebar();
