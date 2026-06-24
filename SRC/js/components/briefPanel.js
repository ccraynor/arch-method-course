/* briefPanel.js - injects the full Meridian project brief into the Brief
   support panel (Prompt C Section 4, item 27). Content is sourced verbatim
   from the brief document on m1-l1a-s2.html and organized into five
   collapsible sections. Injecting at runtime keeps the brief in one place
   instead of duplicating it across every Module 1 screen. */

const BRIEF_SECTIONS = [
  {
    id: 'brief-background',
    title: 'Organization Background',
    html: `
      <p>In Q3 2024, Meridian Regional Health Network experienced a ransomware intrusion that partially encrypted systems at its main hospital campus. The incident was contained after 14 hours. Post-incident review found that IT staff could not execute the documented incident response protocol (IR-2024) without supervisor escalation for every decision. Staff also could not make appropriate isolation calls within their role authority or communicate status to clinical leadership without scripted guidance.</p>
      <p>An OCR audit in 2023 had already recommended documented improvement to incident response workforce training within 18 months. This project addresses both the internal gap and the compliance timeline.</p>`
  },
  {
    id: 'brief-request',
    title: 'Course Request',
    html: `
      <p>Meridian requests the design and development of a self-paced online course in Cybersecurity Incident Response for healthcare IT professionals. This is not a compliance checkbox course. They need staff who can act independently and correctly during a cyber incident.</p>`
  },
  {
    id: 'brief-learners',
    title: 'Target Learners',
    html: `
      <ul>
        <li>Approximately 120 healthcare IT professionals across Meridian's three sites (main hospital campus plus two regional clinics).</li>
        <li>Roles: systems administrators, network engineers, help desk staff, and IT managers.</li>
        <li>Prior knowledge: general IT competency; limited formal incident response training; all completed a basic HIPAA awareness module in 2022.</li>
        <li>Technology access: all learners have LMS access and complete training on company-managed devices.</li>
      </ul>`
  },
  {
    id: 'brief-performance',
    title: 'Required Performance',
    html: `
      <p>By the end of training, IT staff must be able to:</p>
      <ol>
        <li>Recognize early indicators of a cybersecurity incident and initiate the IR-2024 protocol without supervisor prompting.</li>
        <li>Execute Tier 1 and Tier 2 IR-2024 protocol decisions independently, within their role authority.</li>
        <li>Make appropriate system isolation decisions without escalating every call to a supervisor.</li>
        <li>Document incident activity accurately and in real time in the SIEM event log.</li>
        <li>Communicate incident status to clinical leadership using the approved Meridian communication templates.</li>
      </ol>`
  },
  {
    id: 'brief-constraints',
    title: 'Project Constraints and Regulatory Context',
    html: `
      <p class="brief-subhead">Regulatory and compliance context</p>
      <ul>
        <li>HIPAA Security Rule (45 CFR 164.308(a)(5)): workforce training requirement for covered entities.</li>
        <li>IR-2024: Meridian's internal incident response protocol, adopted January 2024 and currently active. The course must align to this protocol, not to generic frameworks.</li>
        <li>OCR audit finding (2023): recommended documented improvement to incident response workforce training within 18 months of the audit date.</li>
      </ul>
      <p class="brief-subhead">Project constraints</p>
      <ul>
        <li><strong>Budget:</strong> fixed; no travel, no in-person delivery.</li>
        <li><strong>Timeline:</strong> delivery-ready within 90 days of project start.</li>
        <li><strong>Format:</strong> self-paced online; SCORM 1.2 for LMS deployment; estimated learner-facing time 4 to 6 hours.</li>
        <li><strong>SME access:</strong> limited to 4 hours total with Meridian's IR team lead; schedule set in advance.</li>
        <li><strong>Existing content:</strong> IR-2024 protocol document (full text provided); no prior course content or existing training materials.</li>
      </ul>
      <p class="brief-subhead">Deliverable request</p>
      <p>Before content development begins, Meridian requires a course architecture document for review, with sign-off on scope and sequence before any content is written. The architecture document should include a defined scope, learning sequence, and alignment between required performance and planned instruction.</p>`
  }
];

export function initBriefPanel() {
  const panel = document.getElementById('briefPanel');
  if (!panel) return;
  const body = panel.querySelector('.panel-body');
  if (!body || body.dataset.briefLoaded === 'true') return;

  const intro = document.createElement('p');
  intro.className = 'brief-intro';
  intro.textContent = 'The full Meridian Regional Health Network project brief, as submitted by Priya Okonkwo. Expand any section.';
  body.appendChild(intro);

  BRIEF_SECTIONS.forEach((section, i) => {
    const details = document.createElement('details');
    details.className = 'brief-section';
    if (i === 0) details.setAttribute('open', '');

    const summary = document.createElement('summary');
    summary.className = 'brief-section__summary';
    summary.textContent = section.title;
    details.appendChild(summary);

    const content = document.createElement('div');
    content.className = 'brief-section__body';
    content.innerHTML = section.html;
    details.appendChild(content);

    body.appendChild(details);
  });

  body.dataset.briefLoaded = 'true';
}
