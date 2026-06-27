# ARCH Method Practitioner Credential
## Proof Point Learning — Claude Code Build Instructions

### What We Are Building
A 22-26 hour self-paced HTML practitioner credential for instructional designers 
in higher education. Course teaches the ARCH Method: a constraint-governed 
workflow for course architecture design. Deployed to Vercel.

### Brand
- Primary color (Navy): #1B3A5C
- Secondary color (Teal): #2E7D8C
- Font: system sans-serif stack (no external font dependencies)
- Voice: calm, professional, evidence-based

### Course Scenario
All examples, worked examples, decision points, and performance tasks use 
Meridian Regional Health Network — a multi-site healthcare organization 
developing a Cybersecurity Incident Response course for healthcare IT professionals.

### Architecture

Module 1 is built. Modules 2-4 are planned. The course also has a
9-screen introduction and a landing page (index.html).

- 21 lessons total across the four modules
- 9 introduction screens (intro-0.1 through intro-0.9)
- Module 1: Bound the Course (Lessons 1.1a, 1.1b, 1.2, 1.3, 1.4a, 1.4b + Gate 1.TG.1)
  - Lesson 1.1b has 8 screens: s5 = Tasks 1+2, s6 = Task 3, s7 = reflection; s4b = faded example (Output Style Gate) inserted between s4 and s5
  - Lesson 1.4a has 6 screens: s3b = faded example (complete the SI-09 decomposition) inserted between s3 and s4
  - Lesson 1.4b has 7 screens (split from 6: s4 = Step 7 optimization, s5 = Step 8 trace audit, s6 = calibration, s7 = reflection)
- Module 2: Engineer the Learning (Lessons 2.1, 2.2, 2.3, 2.4)
- Module 3: Stress-Test the Design (Lessons 3.1, 3.2, 3.3, 3.4)
  - Lesson 3.3 has 7 screens. Section Alignment Check (Step 16) spans both 
    Lesson 3.3 and Lesson 3.4. Step 17 belongs to Module 4 Lesson 4.1 only.
- Module 4: Structural Freeze (Lessons 4.1, 4.2, 4.3, 4.4, 4.5)

#### Current Screen Counts (verified, Module 1 built)
- Lesson 1 (1.1a): 5 screens
- Lesson 2 (1.1b): 8 screens (includes s4b faded example)
- Lesson 3 (1.2): 7 screens (m1-l2-s5.html is a redirect stub, not a learner screen)
- Lesson 4 (1.3): 5 screens
- Lesson 5 (1.4a): 6 screens (includes s3b faded example)
- Lesson 6 (1.4b): 7 screens
- Gate: 1 screen
- Total lesson screens: 39 (38 lesson screens + 1 gate)
- Hub screens: 7 (m1-hub-l1 through m1-hub-l6 and m1-hub-gate)
- Module overview: 1 (m1-overview.html)
- Introduction screens: 9 (intro-0.1 through intro-0.9)
- Landing page: 1 (index.html)
- Total learner-facing screens built: 56 (9 introduction + 39 lesson and gate + 7 hub + 1 module overview), plus the landing page

#### Lesson Template (required sequence, final version after Prompts C-E)
Screen count varies per lesson. Element sequence does not vary.

1. Lesson introduction screen, in order: prediction prompt (stored
   archMethod_prediction_l[N]); retrieval warm-up "Before You Begin"
   (Lessons 2 onward); scaffolding level badge; prior knowledge activation
   callout (Lessons 2 onward); commitment note callout; purpose statement;
   forward-looking purpose statement; ARCH Method mindset callout; New in
   This Lesson vocabulary callout; spaced repetition callback (Modules 2-4);
   Priya Okonkwo email where the narrative requires it.
2. Worked example: curiosity gap opener, progressive disclosure, discovery
   moment framing at counterintuitive steps, In a Different Context callout,
   In Your Context callout, gradual-release Show Expert Reasoning toggle in
   Monitored Practice tier.
3. Faded example: highest ZPD-risk lessons only (Module 1: Lesson 2 and
   Lesson 5). Identify equivalents in Modules 2-4 via ZPD analysis.
4. Guided practice: Success Criteria callout, articulation requirement,
   confidence rating, cognitive mode transition banner (on arrival from the
   worked example), developmental feedback, error type label on limited-tier
   feedback, Bloom's bridge activity on highest-risk screens. Submission
   gates removed: the Next control is always available; expert feedback stays
   hidden until submission.
5. Calibration or decision point: three-tier feedback, expert comparison
   after commit, self-check prompt.
6. Reflection screen: prediction callback, four-question transfer framework,
   Lesson Complete block, permission-to-stop statement; Continue links to the
   next lesson hub.

#### Module Overview Screen (required first screen)
Every module must open with a module overview screen (m[N]-overview.html) before Lesson 1 begins. Required content: ARCH Method phase name, lessons in this module with lesson names and estimated times, artifacts produced with one-sentence descriptions, estimated total module time, connection backward to prior module output, and connection forward to next module input. Build this screen first when starting each new module build.

#### Spaced Repetition Map (required before Module 2 build)
Each Module 2-4 lesson introduction screen must include one explicit callback to a Module 1 concept at increasing Bloom's level. Draft callbacks are in Docs/ARCH_Build_Governance.md. Verify callbacks against actual Module 2-4 lesson content before building.

Module 1 concept reappearance schedule (Prompt E Part 2 item 17). Each row names the Module 1 concept, the lesson that introduces it, and where it must reappear at a higher Bloom's level. Verify each callback against actual lesson content before building.

| Module 1 concept | Introduced in | Reappears at higher Bloom's level |
| --- | --- | --- |
| Constraint identification | Lesson 2 (1.1b) | 2.1 Analysis, 3.2 Evaluation |
| Bucket/scope organization | Lesson 3 (1.2) | 2.2 Analysis, 3.3 Evaluation |
| Calibration (domain + taxonomy) | Lesson 4 (1.3) | 2.3 Evaluation |
| Decomposition | Lesson 5 (1.4a) | 2.4 Evaluation, 4.2 Creation |
| Governance records | Lesson 2 and Lesson 6 | 3.1 Evaluation, 4.3 Evaluation |
| Traceability / scope trace audit | Lesson 6 (1.4b) | 3.4 Evaluation |
| Full Phase 1 workflow | Module 1 whole | 4.1 Evaluation/Creation |
| Transfer to new context | Module 1 worked examples | 4.4 Creation, 4.5 is the transfer activity itself |

Pattern for each callback: In Module 1 you [established/identified/produced X]. This lesson asks you to apply that same concept at a higher level of complexity: [specific demand].

#### Recurring Patterns (monitor across all modules)
Four patterns surfaced during Module 1 (Prompt E Part 2 item 22). Monitor each in Modules 2-4 and reapply the response if the pattern recurs.

| Pattern | Evidence (where it showed) | Cumulative effect | Response | Verification criterion |
| --- | --- | --- | --- | --- |
| 1. Cognitive mode transitions | Learners shift from observation to production with no structural signal, seen across all guided practice screens | Learners arrive at production tasks still in passive reading mode | Cognitive mode transition banner on all guided practice screens (cognitiveModeBanner.js) | Flag if Guessing confidence exceeds 30 percent on any lesson |
| 2. Passive worked examples | All expert reasoning visible at once on early worked example screens | Learners skim rather than engage step by step | Progressive disclosure on all worked example screens | Confidence ratings higher in lessons with progressive disclosure |
| 3. Confidence gap before submission | No mechanism to flag uncertainty before submitting, all guided practice screens | Uncertainty stays invisible until after a weak attempt | Confidence rating and articulation requirement on all guided practice screens | Flag if Guessing exceeds 30 percent |
| 4. Commitment note disconnection | Commitment note collected in intro 0.9 but never referenced again | Learners do not see the course connect to their stated goal | Commitment note callout on every lesson introduction screen | Compare completion rates for learners with substantive commitment notes versus those who skipped |

### Chunking and Pacing (Prompt D)
- Chunking rules: maximum three cognitive activities per screen; maximum four scroll depths at a 1080px viewport.
- Time estimates required on every screen, driven by SCREEN_TIME_MAP in trackerRedesign.js (hub and module-overview screens render Est. 3-5 min in their own header).
- Lesson completion signals required on all reflection screens: a Lesson Complete block (success banner, two-sentence production summary, permission-to-stop statement, divider) before the transition note.
- Permission to stop statement required before every lesson transition note.
- Prior knowledge activation required on all lesson introduction screens from Lesson 2 onward (already in the lesson template -- confirmed present).
- New in This Lesson vocabulary callout required on all lesson introduction screens (already in the lesson template -- confirmed present; Lesson 6 introduces no new glossary terms, so it carries no callout).
- Module progress map required on all hub screens (already built in Prompt C Section 5 -- confirmed present), driven by archMethod_lesson_[N]_complete.
- Reflection screen Continue writes archMethod_lesson_[N]_complete (lessons 1 through 6), which drives the hub progress map and the artifact progression display.
- localStorage namespace additions: archMethod_lastVisited and archMethod_lastVisitDate (resume prompt), archMethod_visited_[screenId] and archMethod_continued_[screenId] (hub unit status), archMethod_lesson_[N]_complete (lesson completion).

### State Persistence (localStorage and sessionStorage)
All keys use the archMethod_ prefix, applied automatically by storage.js.
Collapsible persistence and autosave attributes carry the UNPREFIXED key
(e.g. data-persist-key="calTable2Open" is stored as archMethod_calTable2Open).
Never add a key without listing it here and in Docs/ARCH_Build_Governance.md.

localStorage keys:
- archMethod_learnerCommitmentNote
- archMethod_lesson_[N]_complete
- archMethod_lastVisited, archMethod_lastVisitDate
- archMethod_visited_[screenId], archMethod_continued_[screenId]
- archMethod_pacingMode (DeepDive or FocusedPractice)
- archMethod_diag_q1, archMethod_diag_q2
- archMethod_retrieval_l[N]
- archMethod_prediction_l[N]
- archMethod_reasoning_[screenId]
- archMethod_confidence_[screenId]
- archMethod_flag_[screenId]
- archMethod_showExpert_[screenId]
- archMethod_bloom_[screenId]
- archMethod_selfreview_[dimension] (clarity, consistency, usability, support)
- archMethod_transfer_l[N]_q1 through _q4
- archMethod_[screenId]_submission, m1_l4b_s4_submission
- archMethod_briefPanelOpen, archMethod_contextPanelOpen
- archMethod_convRefOpen, archMethod_lensRefOpen, archMethod_constraintRefOpen
- archMethod_priyaEmail_l3_open, archMethod_priyaEmail_l5_open,
  archMethod_priyaEmail_gate_open
- archMethod_sme_update_note
- archMethod_transferContext_[lesson]_open
- archMethod_calTable2Open, archMethod_calTable3Open
- archMethod_optReading_l1_open, archMethod_optReading_l3_open
- archMethod_gatePhase1RecordsOpen, archMethod_gatePhase2RecordsOpen
  (Phase 1 and Phase 2 governance record groups on m1-gate-s1)
- archMethod_calibration_[screenId]_notes (calibration reflection
  notes content; unchanged across the AX4 migration)
- archMethod_calibration_[screenId]_notes_savedAt (timestamp companion
  the shared autosave module writes; new <key>_savedAt form)
- archMethod_calibration_[screenId]_savedAt (legacy inline timestamp
  key; SUPERSEDED by _notes_savedAt for AX4-migrated calibration screens.
  Content key is unchanged, so drafts restore intact; learners see a
  one-time cosmetic timestamp reset)

sessionStorage keys (session-scoped, not localStorage):
- archMethod_previewMode (Preview Mode flag)
- archMethod_exitedWorkedExample_[lessonId] (drives cognitive mode banner)
- archMethod_cogBannerShown_[screenId] (suppresses banner on return visits)
- archMethod_sessionStart, archMethod_pacingAlertShown (90-minute pacing alert)

### Pacing Mode System
Two modes stored in archMethod_pacingMode, chosen on the landing page,
changeable anytime: Deep Dive (default, 22-26 hours, all screens including
optional enrichment) and Focused Practice (14-18 hours; introduction, one
worked example per lesson, all guided practice and calibration; skips optional
enrichment). In Focused Practice, optional enrichment screens show a
"Skip (optional)" label and are excluded from the progress-tracker unit count.
Identify and document optional enrichment screens during the ZPD analysis
before each module build.

### Self-Regulation Flag System
A three-option flag control is injected on every screen by flagControl.js:
Mastered, Needs Review, Confused. Selection is stored in
archMethod_flag_[screenId] and is private. Hub unit cards display the saved
flag status (teal/amber/red dot) alongside completion status, read from the
same key.

### Navigation Architecture (after gate removal)
- Every screen has Previous and Next controls except intro-0.1.html, which has
  no Previous.
- Hub screens carry Previous plus a "Begin Lesson N" Next (gate hub: "Begin
  Gate Review" to m1-gate-s1.html).
- Module overview "Begin Lesson 1" links to m1-hub-l1.html (the lesson hub),
  not the first lesson screen.
- Lesson reflection Continue buttons link to the NEXT lesson hub (m1-hub-l2
  through m1-hub-l6, then m1-hub-gate), not the next lesson's first screen.
- Breadcrumb crumbs are navigable; the Return to Lesson Hub link is injected
  on every lesson and gate unit screen by breadcrumb.js.
- All guided practice screens have a persistent Next button always visible in
  the screen-nav regardless of submission state.
- Gate screen has a disabled Module 2 Coming Soon forward pointer.

### Visual Standards and Busyness Reduction
Decisions made after Prompt F. Apply these patterns to Modules 2-4.

- Learning Objective callout: wrapped in a .learning-objective-callout div with
  a teal left border, placed first after H1 on all lesson intro screens. Label
  and text in navy (var(--color-brand-navy)), not teal.
- Key terms callout: label in navy; term links (.gls) stay teal with dotted
  underlines.
- Cognitive mode banner: simplified to a single italic secondary text line, no
  box, no border, no dismiss button.
- Success Criteria and Expected Evidence: always visible on guided practice
  screens, like Purpose and Instructions. Success Criteria is a static
  .success-criteria card with an H2 .success-criteria__summary heading (navy);
  Expected Evidence is a static .context-block context-block--evidence block.
  Neither is collapsible. (Item B uncollapsed these; the prior collapsible
  pattern is retired.)
- Gate governance records: split into Phase 1 Records (MRHN-D-001 through
  MRHN-D-004) and Phase 2 Records (MRHN-D-005 through MRHN-D-008), both
  collapsed by default.
- Bucket diagram boxes: use min-height: 3.5rem with flex centering
  (.sequence-node__box on m1-l2-s4) for equal sizing.

### Submission Gates Removed (Soft Navigation)
All guided-practice submission gates are removed: the forward control is always
visible and functional regardless of submission state (persistent Next in the
screen-nav). Expert feedback regions stay hidden until the learner submits. The
m1-l2-s5b "complete the evaluation first" content gate is removed; the expert
comparison always renders. The four gate confirmation checkboxes on
m1-gate-s1.html remain as a deliberate review checkpoint, not a navigation lock.

### Preview Mode
Activated via the ?preview=true URL parameter on ANY screen, including the
landing page (index.html sets archMethod_previewMode in sessionStorage). The
flag persists through the full credential without the parameter on later URLs.
An amber Preview Mode banner displays on all course screens; submitted-state
keys read as absent so forms load fresh. Exit via the banner button.

### Gradual Release Operationalization (status)
Monitored Practice tier wraps worked-example content in a Show Expert Reasoning
toggle, collapsed by default, stored in archMethod_showExpert_[screenId].
Operationalized in Module 1 on m1-l4a-s3 and m1-l4b-s3. Full operationalization
across Modules 2-4 is assigned per lesson via the ZPD analysis before each
module build (Full Support / Guided Support / Monitored Practice tiers).

### Reading Enrichment (pre-Module 2 build task)
Reading enrichment cards are a pre-Module 2 build task: two cards per module,
no hyperlinks, plain-text search instructions only (e.g. search terms and
source titles the learner can look up). Optional in all modules and excluded
from Focused Practice. Sources are documented in
Docs/ARCH_PostLaunch_Roadmap.md. Draft card content before the module build;
do not invent sources at build time.

### File Naming Convention
- m[module]-l[lesson]-s[screen].html
- Examples: m1-l1a-s1.html, m1-l1b-s3.html, m2-l2-s1.html
- Transition gate: m1-gate-s1.html
- Introduction screens: intro-0.[screen].html (already built)
- Module 2 (task 9, decided 2026-06-27): four unsplit lessons use
  m2-l1, m2-l2, m2-l3, m2-l4 mapped to 2.1, 2.2, 2.3, 2.4 (the Nth
  lesson is 2.N). If a future lesson is split, use the a/b suffix as
  Module 1 did (m2-l3a / m2-l3b for 2.3a / 2.3b).

#### Module 1 Lesson-Numbering Crosswalk
Module 1 is labeled by three surfaces. This table is the single source
of truth; the bare token "1.x" is reserved for the ARCH ID column only.
The scenario spec v1.2 and the on-screen eyebrow use the plain ordinal
(Lesson 1-6) so they no longer collide with the ARCH IDs. Modules 2-4
have no collision (scenario spec and ARCH IDs coincide: 2.1-2.4 etc.).

| Ordinal (scenario spec v1.2 + eyebrow) | ARCH ID (progress tracker, Stage 3) | File prefix | Sector |
| --- | --- | --- | --- |
| Lesson 1 | 1.1a | m1-l1a | K-12 State Education Agency |
| Lesson 2 | 1.1b | m1-l1b | Community College |
| Lesson 3 | 1.2  | m1-l2  | Corporate |
| Lesson 4 | 1.3  | m1-l3  | Hospital |
| Lesson 5 | 1.4a | m1-l4a | Nonprofit |
| Lesson 6 | 1.4b | m1-l4b | Doctoral |

### Build Order (FOLLOW THIS EXACTLY)
1. Global state architecture
2. CSS design token system
3. Global HTML structure and skip links
4. Seven screen templates
5. Six component contracts (from accessibility spec)
6. Ten scaffold components (from Section 18)
7. Introduction screens 0.1 through 0.9
8. Module 1 through Module 4 sequentially
9. Deploy to Vercel

### Three Build-Start Decisions (Resolve Before Any Screen)
1. PERSISTENCE: learnerCommitmentNote — use localStorage
2. STATE: activeSupportPanel — centralized state manager, 
   allowed values: null, artifactDrawer, decisionHistory, 
   glossary, supportPanel, annotationPanel, briefPanel, contextPanel
3. CSS TOKENS: eight token categories — Background, Surface, Text, 
   Border, Focus, Success, Warning, Error — must support 
   prefers-color-scheme: dark and prefers-contrast: more

### Accessibility Requirements
- WCAG 2.1 AA throughout
- All functionality keyboard accessible
- Screen reader announcements on all state changes (within 500ms)
- No color-only communication
- Touch targets minimum 44px
- Zoom support at 200%
- Reduced motion honored

### Accessibility Build Standard
Derived from the G1 static conformance scan of Module 1 against the Master
Accessibility Spec v5.0 (Docs/Accessibility & Inclusion Plan.docx). Build every
Module 2-4 screen to inherit the conformant patterns below, and follow the
resolved decisions. The formal Accessibility Launch Gate (manual AT testing) is a
separate pre-deployment milestone, not covered here.

Conformant patterns (build every Module 2+ screen this way):
- Five semantic landmarks on every screen: header (role="banner"), nav, main,
  aside (complementary), footer (role="contentinfo").
- All five skip links as the first focusable elements: Skip to Main Content,
  Skip to Current Activity, Skip to Progress Tracker, Skip to Artifact Reference,
  Skip to Decision History.
- Exactly one H1 per screen. Heading levels must not skip (H1 to H2 to H3, never
  H2 to H4).
- All support panels route through panelManager.js (activeSupportPanel,
  single-open enforced). Never manage panel visibility independently.
- Expandable triggers carry aria-expanded and aria-controls.
- #sr-announcer (role="status" aria-live="polite" aria-atomic="true") is present;
  announce state changes through it.
- Screen UI colors come from tokens only. Hex literals are allowed solely inside
  @media print.

Resolved decisions (standards):
- Support panels are NON-MODAL reference panels by design. They are not
  role="dialog" aria-modal. Required behaviors instead: Escape closes the panel,
  focus returns to the originating trigger, single-panel-open is enforced, the
  trigger-to-panel relationship is programmatic, and the panel has an accessible
  name plus an open/close announcement. Rationale: these are reference tools
  consulted alongside content, so trapping focus is pedagogically wrong. This
  supersedes the spec's dialog/modal requirement (Section 3 dialog row and
  Section 10), amended in spec v5.1 (commit 606aa03).
- Save and recovery is TIERED by input type (a reinterpretation of spec Section
  6). Ratified by spec owner 2026-06-27 (spec v5.1).
  - Tier 1, substantial authored text (artifacts, reflections, long-text):
    full contract. Autosave every 30s, autosave on field exit, manual Save
    button, save timestamp, failure-recovery actions (Retry Save, Download Draft,
    Copy Response, Return to Editing), and the spec save announcements.
  - Tier 2, structured input (decision points, guided-practice fields, short
    responses): autosave on field exit, persistence, and a save indicator. No
    Download/Copy recovery suite.
  - Tier 3, trivial or ephemeral input (confidence radios, single toggles):
    silent persistence on change plus a live-region confirmation. No Save button
    or recovery suite.
  - Autosave is to be promoted into a SHARED module, not per-screen inline JS.
  - Shared module (SRC/js/autosave.js, AX4): Tier-1 groups are declared with
    data-autosave-group + data-autosave-tier="1" + data-autosave-status +
    data-autosave-key (key may be assigned at runtime before initAutosave()),
    plus an optional <button data-autosave-save>. Two storage formats:
    data-autosave-format="json" (default) serializes all group fields to a blob
    keyed by id|name; data-autosave-format="text" stores a single field's raw
    string, byte-compatible with legacy single-field keys (e.g.
    calibration_<id>_notes). A field carrying its own data-autosave-key is
    excluded from the group blob and stays on the light path. Behavior deltas
    when migrating inline save code onto the module: (1) save announcements
    route through srAnnounce.js -- manual Save announces "Work saved.", restore
    announces "Previous work restored."; (2) 30s-interval and on-blur saves are
    SILENT (visible "Saved at <time>" status only, no SR announce); (3) the
    timestamp companion key is <key>_savedAt (so a screen migrated off a legacy
    <id>_savedAt key shows a one-time cosmetic timestamp reset -- the content
    key is unchanged).

### Naming Conventions
- ARCH Steps: use Phase and Step terminology only (never Stage)
- Artifact naming: MRHN_[ArtifactName]_v[Version]_[Date]
- Scope items: SI-01 through SI-16
- Decomposition components: DC-01 through DC-48
- Step 13 rename: IRMA Mapping is now Outcome Mapping (Assessment Alignment 
  Stress Test). Use "Outcome Mapping" in all screen content, lesson labels, 
  and learner-facing text. The plain language explanation is: does the 
  architecture prepare learners for what they are being asked to demonstrate? 
  This applies in CBE and non-CBE contexts equally.
- Step 16 note: Section Alignment Check spans Lessons 3.3 and 3.4. 
  Step 17 belongs to Module 4 Lesson 4.1 only -- never Lesson 3.3.

### Grade 8 Flesch-Kincaid Reading Level
All learner-facing instructional prose must target Grade 8 FK level:
active voice, second person, sentences 20 words or fewer.
This applies to: lesson purpose paragraphs, What You Will Do lists, 
artifact card descriptions, reflection prompts, guided practice 
instructions, feedback text, empty state descriptions, callout boxes, 
and transition notes.
This does NOT apply to: expert think-aloud annotation text in worked 
example step divs. Expert analysis sections stay at expert reading level.
Do not rewrite expert analysis content for reading level.

Audience: Senior instructional designer primary; accessible to an 
experienced instructional designer with appropriate scaffolding.

Glossary: 20 terms in js/scaffolds/hoverGlossary.js. Every term must be 
marked with the hover glossary trigger class (span.gls[data-gls-term]) 
on first use per module.

### Do Not Do These Things
- Do not use em dashes anywhere in course content
- Do not use double hyphens (the `--` sequence) in learner-facing visible 
  text. Use a colon, comma, or period instead. Double hyphens remain 
  allowed only in title tags, HTML comments, script blocks, and CSS.
- Do not use hard-coded color values -- use CSS tokens only
- Do not build screens before the seven templates are complete
- Do not add external font or icon libraries -- use system fonts and inline SVG
- Do not reference Stage terminology in any learner-facing content
- Do not reference IRMA Mapping anywhere -- use Outcome Mapping instead
- Do not add or remove options from decision point screens -- each 
  screen has a fixed option count per the Stage 3 Decision Point 
  Catalog. Check the catalog before building any decision point screen.
- Images: SVG diagrams do not need click-to-expand. 
  If screenshots or complex images are added in Modules 2-4, 
  use a lightbox component.
- Do not add `aria-hidden="true"` to SVGs that have an `aria-label` 
  attribute or `role="img"` -- those are meaningful and must keep their 
  text alternative. Only add `aria-hidden="true"` to purely decorative SVGs.
- Do not define `.screen-type-label` styles in per-screen `<style>` blocks. 
  The canonical definition lives in `global.css`. Remove any per-screen 
  duplicates found when editing existing screens.
- Do not use sr-only H2 elements as invisible wrappers for H3 context 
  block headings. Context block headings (Purpose, Instructions, Success 
  Criteria, Expected Evidence) must be H2 directly. Remove sr-only H2 
  wrappers and set `aria-label="Activity Context"` on the section instead.
- Do not add the `#artifactDrawer` overlay panel to screens in Modules 2-4. 
  Artifacts display in the sidebar only. The HTML button for artifactDrawer 
  stays in templates for backward compatibility; panelInit.js hides it at 
  runtime. Decision History is the only header-triggered overlay for that group.
- Do not rewrite expert think-aloud annotation text in worked example steps 
  to Grade 8 level. Expert analysis sections are intentionally written at 
  practitioner reading level. Grade 8 rewrites apply only to instructional 
  prose (see Grade 8 FK section above).
- Do not add a click-to-expand lightbox on SVG diagrams -- browser zoom 
  handles this. (Lightbox is only for screenshots or complex raster images.)
- Do not add `user-scalable=no` to the viewport meta tag.
- Do not write developer documentation language in learner-facing content.
- Do not assume prior knowledge of Bloom's taxonomy, CBE, cognitive load, 
  or prerequisite dependency -- define on first use per module.
- Do not render a disabled or not-yet-available module-nav link as a live 
  `<a href="module-N.html">`. aria-disabled does not stop anchor navigation 
  and produces a 404. Use a non-navigable `<span class="module-nav-link 
  is-disabled" aria-disabled="true" title="Module N not yet available">` 
  carrying the link text, on the course nav, hub, and module-overview screens 
  (commit 27c4db8). See the disabled module-navigation link standard in 
  Docs/ARCH_Build_Governance.md.