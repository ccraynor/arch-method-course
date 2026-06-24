# ARCH Method Practitioner Credential
## Complete Build Governance Document
### Proof Point Learning

Last updated: June 2026
Status: Module 1 complete. Prompts B-E in progress.
Read alongside CLAUDE.md at the start of every
build session.

---

## How to Use This Document

This document has two purposes:

1. Pre-build reference -- read before starting any
   Module 2, 3, or 4 build session alongside CLAUDE.md.
   It captures every decision made during Module 1
   that governs all subsequent builds.

2. Post-Prompt F record -- after the final CLAUDE.md
   update pass (Prompt F) this document becomes the
   permanent build record for the credential. Archive
   it in Docs/ and do not delete it.

---

## Session Startup Checklist

At the start of every new Claude Code build session:

1. Tell Claude Code: Read CLAUDE.md first.
2. Tell Claude Code: Read Docs/ARCH_Build_Governance.md.
3. Verify current screen count before building hub
   screens:
   ls SRC/m[N]-l*.html SRC/m[N]-gate-s*.html | wc -l
4. Verify current localStorage keys before adding
   new ones.
5. Confirm which module and lesson you are building.
6. Complete the Module Pre-Build Checklist for the
   current module before writing any code.
7. Do not build any screen until steps 1-6 are done.

---

## Lesson Template (Required Sequence)

Every lesson in every module follows this exact element
sequence. Screen count varies. Element sequence does not.

LESSON INTRODUCTION SCREEN:
- Prediction prompt: Before this lesson begins -- what
  do you expect to find most difficult about [lesson
  topic]? Stored in localStorage key
  archMethod_prediction_l[N]. Revisited in reflection
  screen with callback: At the start of this lesson
  you predicted [stored text]. Was that accurate?
- Retrieval warm-up (Before You Begin section): one
  cold retrieval question recalling content from two
  lessons prior. Autosaved to archMethod_retrieval_l[N].
  Reference answer revealed after submission. No
  scoring. Lessons 2 onward only within each module.
- Scaffolding level badge: Full Support / Guided
  Support / Monitored Practice. See Scaffolding
  Architecture section for tier definitions and
  assignment process.
- Prior knowledge activation callout: two-sentence
  connection to what learners already know from the
  previous lesson. Teal left-border callout. Lessons
  2 onward only.
- Commitment note callout: reads
  archMethod_learnerCommitmentNote from localStorage.
  If note exists: Your commitment: [note text]. How
  does this lesson connect to the challenge you
  identified? If empty or skipped: You have not yet
  written your commitment note. Consider writing it
  now. Link to intro-0.9.html.
- Purpose statement: one sentence explaining what
  this lesson makes possible professionally. Format:
  After this lesson you will [specific professional
  capability].
- ARCH Method mindset callout: one sentence naming
  the design thinking principle being practiced in
  this lesson. Navy italic callout below purpose
  statement.
- New in This Lesson vocabulary callout: small teal
  card listing glossary terms that first appear in
  this lesson as hover glossary triggers. Label:
  Key terms in this lesson: [term 1], [term 2].
- Spaced repetition callback: one sentence connecting
  new content to a Module 1 concept at a higher
  Bloom's level. Format: In Module 1 you [established/
  identified/produced X]. This lesson asks you to
  apply that same concept at a higher level of
  complexity: [specific demand]. See Spaced Repetition
  Callbacks section for assignments per lesson.
- Priya Okonkwo email where narrative requires it:
  teal-bordered message card. Sender: Priya Okonkwo
  -- Chief Learning Officer, Meridian Regional Health
  Network. Collapsible after first read. localStorage
  open/closed state per email.

WORKED EXAMPLE SCREEN:
- Curiosity gap opener: 1-2 sentences posing a
  question or contradiction before the first expert
  step. Makes learner want to read the analysis.
- Progressive disclosure: each expert step hidden
  until previous step is read. Show Next Step button
  at bottom of each completed step. Show All Steps
  option always available. All steps visible on print.
- In a Different Context callout: collapsed by default
  after first view. 3-4 sentences showing the same
  ARCH principle in a different institutional context.
  Label: In a Different Context. Positioned after the
  final expert step before the navigation button. See
  Transfer Context Rotation section for assignments.
- Discovery moment framing at counterintuitive expert
  decisions: This next finding surprised most IDs
  who reviewed the Meridian brief. Read carefully.
  After the finding: This is the kind of finding that
  changes how you read project briefs. It is worth
  noting in your reflection.
- Parallel practice connection prompt: on highest
  ZPD-risk worked example screens. In Your Context
  teal italic callout with one question connecting
  the expert decision to the learner's own practice.
  Minimum three screens per module.
- Gradual release in Monitored Practice tier: wrap
  worked example content in Show Expert Reasoning
  toggle. Collapsed by default. Stored in localStorage
  key archMethod_showExpert_[screenId].
- On exit: set sessionStorage flag
  archMethod_exitedWorkedExample_[lessonId] = true
  so the guided practice screen detects arrival.

FADED EXAMPLE SCREEN (highest ZPD-risk lessons only):
- Identify via ZPD analysis session before building
  each module. See ZPD Tier Assignment Process below.
- In Module 1: Lesson 2 (m1-l1b-s4b) and Lesson 5
  (m1-l4a-s3b) were the faded example screens.
- Shows partial expert work with reasoning gaps for
  learner to complete before full expert reveal.
- No confidence widget on this screen type.
- No amber failure callouts on this screen type.
- Reveal full expert version with Why it is strong
  annotations after learner submits all gaps.
- Screen type label: Faded Example.
- File naming: m[N]-l[lesson]-s[screen]b.html.

GUIDED PRACTICE SCREEN:
- Success criteria callout: collapsed by default,
  above Submit button. 2-3 observable indicators of
  strong reasoning quality for this specific task.
  Expandable before submitting. Label: Success
  Criteria.
- Articulation requirement: one sentence completion
  field before Submit button. Prompt: My reasoning
  for this decision is [blank]. Stored in localStorage
  key archMethod_reasoning_[screenId]. Shown read-only
  in expert comparison feedback. Feedback addresses
  the reasoning, not just the answer.
- Confidence rating: three-point rating before Submit.
  Options: Confident / Unsure / Guessing. Stored in
  localStorage key archMethod_confidence_[screenId].
  Shown alongside expert feedback after submission.
- Cognitive mode transition banner: appears only when
  arriving from the worked example screen. Detect via
  sessionStorage flag archMethod_exitedWorkedExample_
  [lessonId]. Banner: You have just observed how an
  expert approached this problem. Now it is your turn.
  Teal styling. Dismissible. Does not appear on return
  visits.
- Developmental feedback Your Development section:
  after expert comparison. Two sentences in second
  person: What your response reveals: [observation].
  What to carry forward: [most important thing].
  Not a score. A developmental observation.
- Error type label: on every limited-tier feedback
  response. Apply most relevant error type from the
  Error Taxonomy section. Format: This response
  reflects a [error type name]: [one-sentence
  description].
- Bloom's bridge activity: on highest ZPD-risk guided
  practice screens per module. One Analysis-level
  question between completion and navigation to next
  screen. Question: Why does this decision produce a
  stronger architecture than the most common
  alternative? Short text field. Autosaved. No
  evaluation.
- Progress celebration: when an artifact finalization
  button is clicked show a two-sentence artifact-
  specific celebration. See Artifact System section.

CALIBRATION OR DECISION POINT SCREEN:
- Three-tier feedback: strong / adequate / limited.
- Expert comparison reveals only after learner commits.
- Self-check prompt after expert comparison.
- No changes from Module 1 template.

REFLECTION SCREEN:
- Prediction callback above transfer framework:
  At the start of this lesson you predicted [stored
  archMethod_prediction_l[N]]. Was that accurate?
  Omit if no prediction was stored.
- Four-question transfer framework (required on all
  reflection screens):
  1. What changed in my thinking during this lesson?
  2. What informed that change -- which expert
     decision or evidence most shifted my reasoning?
  3. What improved in my understanding of the ARCH
     Method?
  4. What will I carry forward into my next course
     design project?
  Short text fields. Autosaved. No evaluation.
- Lesson complete block after autosave confirmation:
  Success-colored banner: Lesson [N] Complete.
  Two-sentence summary of what was produced in this
  lesson. Permission to stop statement in teal
  italics: This is a natural stopping point. Close
  the course here and return when you are ready to
  continue. Horizontal divider. Then transition note.
- Natural stopping point signal on Continue button:
  label reads Continue to Lesson [N+1] -- next
  session start.
- Lesson completion flag: write
  archMethod_lesson_[N]_complete = true to localStorage
  on Continue click.

---

## Module Overview Screen (Required First Screen)

Every module must open with a module overview screen
(m[N]-overview.html) before Lesson 1 begins.
Build this screen first in every module build session.

Required content:
- Module number and name
- ARCH Method phase name
- All lessons in this module with lesson names and
  estimated times
- All artifacts produced with one-sentence descriptions
- Estimated total module time
- Connection backward: what the previous module
  produced and how this module uses it
- Connection forward: what this module produces and
  what the next module does with it
- Begin Lesson 1 button
- No JavaScript required beyond standard progress
  tracker

Link from the module nav bar and from the prior
module gate screen clearance button.

---

## Hub Screens (Required per Module)

One hub screen per lesson plus one gate hub per module.
Build hub screens after all lesson screens are complete
so unit counts are accurate.

Verify counts before building:
ls SRC/m[N]-l[lesson]-s*.html | wc -l

Required content:
- Lesson title and purpose at top
- Unit cards: unit number, activity type, screen type
  label, estimated time, completion status (Not
  Started / In Progress / Complete)
- Self-regulation flag indicator per unit card:
  Mastered (teal dot), Needs Review (amber dot),
  Confused (red dot), No flag (no indicator). Read
  from archMethod_flag_[screenId].
- Lesson jump menu: direct link to each unit so
  learners can jump without clicking through
  sequentially
- Return to hub link on every lesson unit screen:
  text link below breadcrumb back to this hub screen
- Module progress map: horizontal timeline. Completed:
  filled teal circle with checkmark. Current: filled
  navy circle. Upcoming: hollow circle. Gate: diamond.
  Status driven by archMethod_lesson_[N]_complete.
  Horizontal on desktop, vertical on mobile.
- Module at-a-glance summary: total lessons, total
  units (verify count), estimated total time,
  artifacts produced, governance records

File naming: m[N]-hub-l[lesson].html and
m[N]-hub-gate.html

Module 1 hub screens built:
m1-hub-l1.html through m1-hub-l6.html and
m1-hub-gate.html

---

## Gate Screen Structure (Required per Module)

Build gate screens last after all lesson screens in
that module are confirmed complete.

Required content:
- Governance record confirmation cards: one per
  governance record produced in this module. Each
  card shows record ID, decision statement summary,
  and a specific one-sentence review criterion
  telling the learner exactly what quality indicator
  to check.
- Four completion checkboxes: I have reviewed all
  governance records / I can trace every component
  to its parent scope item / Every governance record
  has a genuine risk note / This architecture is
  ready for SME review.
- Priya Okonkwo email: module-specific. Teal-bordered
  card. Collapsible.
- Architecture self-review checklist (four questions
  using Course 3 dimensions):
  1. Is the sequence of activities clear to a learner
     encountering it for the first time? (Clarity)
  2. Does each lesson follow a consistent and
     predictable structure? (Consistency)
  3. Can a learner locate required tasks and support
     without guesswork? (Usability)
  4. Is support visibly available at the points where
     learners are most likely to need it? (Support
     Visibility)
  Short text field per question. Autosaved. No
  evaluation. Label: Architecture Self-Review.
- Narrative consequence paragraph: what happened at
  Meridian as a result of this module's work. 3-4
  sentences. Frame as: Here is what happened next.
- Module completion celebration: two-sentence
  acknowledgment of what was produced in this module.
- Forward pointer: what the next module does with
  this output. Button linking to next module overview.

Gate file naming: m[N]-gate-s1.html

---

## Performance Task Previews

Each module includes one performance task preview
screen showing the rubric and an annotated strong
response excerpt for the performance task assessed
in that module.

Performance Task 1 preview: built in Module 1
introduction sequence.

Performance Tasks 2, 3, and 4: build as part of
the Module 2, 3, and 4 introduction or overview
sequences respectively.

Required content:
- Performance task description in learner-facing
  language
- Five ARCH-specific scoring dimensions as a visible
  rubric
- One annotated strong response excerpt: 200 words
  maximum with annotations explaining what makes
  it strong
- Label: This is where Module [N] leads. You will
  not be asked to produce this yet. You are seeing
  it now so every lesson has a destination.

Draft the annotated excerpt before the build session.
Do not ask Claude Code to invent exemplar content.

---

## Component Library

All components built during Module 1. Use these.
Do not build new patterns without checking here first.

JavaScript components (SRC/js/components/):
- retrievalPrompt.js: retrieval warm-up autosave
  and reveal. Also handles principle extraction step.
- confidenceRating.js: three-point rating, saves to
  localStorage, echoes with feedback. Supports per-
  item feedback via data-feedback-match.
- hoverGlossary.js: hover term definitions. 18 terms
  as of Module 1 completion.
- briefPanel.js: injects five collapsible Meridian
  brief sections into #briefPanel .panel-body.
  Idempotent via data-briefLoaded guard.

JavaScript modules (SRC/js/):
- storage.js: localStorage with in-memory fallback
  for private browsing
- panelManager.js: all support panel open/close state.
  ALLOWED_PANELS includes: glossaryPanel, briefPanel,
  contextPanel, supportPanel, artifactsPanel,
  decisionHistoryPanel, notesPanel.
- trackerRedesign.js: progress tracker via SCREEN_MAP.
  Handles s[N]b screen keys via regex.
- breadcrumb.js: navigable breadcrumbs with
  POSITION_OVERRIDE for non-standard screen keys
- previewMode.js: Preview Mode system. Activated via
  ?preview=true URL parameter or header toggle.
  sessionStorage only. Does not write to localStorage.

CSS:
- tokens.css: all design tokens. No hard-coded colors.
  --color-text-link is #1C6676 (not #2E7D8C which
  failed WCAG AA contrast).
- global.css: all component styles including retrieval
  warm-up, confidence rating, scaffold badge, connect
  callout, failure callout, gate review note, anchor
  labels, prefilled labels, screen-type-label unified,
  brief panel sections.

Support panels (all wired to panelManager.js):
- Glossary (glossaryPanel)
- Brief (briefPanel): full Meridian brief, five
  collapsible sections. Available on all intro and
  Module 1 screens.
- Context Panel (contextPanel): pre-populates per
  screen via contextData object in screen script block
- Support (supportPanel)
- Artifacts (artifactsPanel)
- Decision History (decisionHistoryPanel)
- Notes (notesPanel)

Context Panel content by lesson tier (Module 1):
- Lesson 2 screens: five Output Style Gate conventions
- Lesson 3 screens: four bucket names and SI item lists
- Lesson 4 screens: two calibration lenses and four
  taxonomy levels
- Lesson 5 screens: MRHN_PerformanceArc_v1 statement
  and flagged calibration annotations
- Lesson 6 screens: two optimization questions and
  three audit pass methodology
- Governance record screens: relevant governing
  constraints for the current decision

Design equivalent context content for each Module
2-4 lesson tier before the build session.

---

## localStorage Namespace

All keys use archMethod_ prefix. Never create a new
key without adding it to this list first.

Core keys:
- archMethod_learnerCommitmentNote
- archMethod_lesson_[N]_complete
- archMethod_lastVisited
- archMethod_lastVisitDate
- archMethod_pacingMode (DeepDive or FocusedPractice)

Diagnostic keys:
- archMethod_diag_q1
- archMethod_diag_q2

Learning activity keys:
- archMethod_retrieval_l[N]
- archMethod_confidence_[screenId]
- archMethod_reasoning_[screenId]
- archMethod_prediction_l[N]
- archMethod_flag_[screenId]
- archMethod_convRefOpen
- archMethod_lensRefOpen
- archMethod_constraintRefOpen
- archMethod_showExpert_[screenId]

Submission keys:
- archMethod_[screenId]_submission
- m1_l4b_s4_submission (optimization + audit combined)

Panel state keys:
- archMethod_briefPanelOpen
- archMethod_contextPanelOpen

Progress tracking keys (Prompt C Section 5):
- archMethod_visited_[screenId] (written on screen load;
  drives the In Progress status on lesson hub screens)
- archMethod_continued_[screenId] (written when the
  learner clicks Next; drives the Complete status on
  lesson hub screens)

Note: Prompt D adds archMethod_lastVisitDate.
Note: Prompt E adds archMethod_pacingMode,
archMethod_diag_q1/q2, archMethod_reasoning_[screenId],
archMethod_prediction_l[N], archMethod_flag_[screenId],
archMethod_showExpert_[screenId].
Note: Prompt C Section 5 adds archMethod_visited_[screenId]
and archMethod_continued_[screenId].
Verify all keys present in CLAUDE.md after Prompt F.

---

## Scaffolding Architecture

Three tiers. Apply to each module's lessons based on
ZPD analysis before building.

FULL SUPPORT (Module 1 Lessons 1-2 equivalent):
- Worked examples displayed by default
- Reference cards pre-opened by default
- Partially completed practice items with anchor
  content (one pre-assigned item per category)
- All scaffolding visible without learner action

GUIDED SUPPORT (Module 1 Lessons 3-4 equivalent):
- Worked examples displayed by default
- Reference cards collapsed by default
- No anchor content in practice items
- Expert comparison available after one attempt

MONITORED PRACTICE (Module 1 Lessons 5-6 equivalent):
- Worked example behind Show Expert Reasoning toggle
  stored in archMethod_showExpert_[screenId]
- No reference cards
- No anchor content
- Full independent production before any scaffolding

ZPD TIER ASSIGNMENT PROCESS:
Before building each module run a ZPD analysis:
1. List all lessons with content complexity and
   prerequisite depth.
2. Assign Full Support to lessons introducing
   genuinely new frameworks or multi-step procedures.
3. Assign Guided Support to lessons applying known
   frameworks in new contexts.
4. Assign Monitored Practice to lessons requiring
   independent synthesis or judgment.
5. Identify which Guided Support and Monitored
   Practice lessons need faded examples based on the
   ZPD gap between observation and independent
   production.
6. Document tier assignments in this file before
   the build session begins.

Module 2 tier assignments: [complete before build]
Module 3 tier assignments: [complete before build]
Module 4 tier assignments: [complete before build]

---

## Pacing Mode Behavior

Two modes stored in archMethod_pacingMode.

DEEP DIVE MODE (default):
- Complete every screen including optional enrichment
- Estimated 22-26 hours total credential time
- All screens in progress tracker

FOCUSED PRACTICE MODE:
- Complete introduction, one worked example per
  lesson, all guided practice and calibration, skip
  optional enrichment
- Estimated 14-18 hours total credential time
- Optional enrichment screens show Skip (optional)
  label and excluded from progress tracker unit count

Identifying optional enrichment screens per module:
- Reading enrichment links are optional in all modules
- Identify and document optional screens during ZPD
  analysis session before building each module

Mode set on landing page. Stored persistently.
Can be changed at any time.

---

## Spaced Repetition Callbacks (Required)

Every Module 2-4 lesson introduction screen must
include one explicit callback to a Module 1 concept
at an increasing Bloom's level.

IMPORTANT: draft callbacks below are based on
anticipated lesson content. Verify against actual
lesson content before building. The concept referenced
must appear in the lesson it calls back from. Revise
if actual content differs from the draft.

Pattern: In Module 1 you [established/identified/
produced X]. This lesson asks you to apply that same
concept at a higher level of complexity: [demand].

Module 2 callbacks (draft -- verify before building):
- 2.1: constraint identification at Analysis level
- 2.2: bucket mapping at Analysis level
- 2.3: calibration at Evaluation level
- 2.4: decomposition at Evaluation level

Module 3 callbacks (draft -- verify before building):
- 3.1: governance records at Evaluation level
- 3.2: constraint ranking at Evaluation level
- 3.3: bucket balance criteria at Evaluation level
- 3.4: scope trace audit at Evaluation level

Module 4 callbacks (draft -- verify before building):
- 4.1: full Phase 1 workflow at Evaluation/Creation
- 4.2: artifact dependency chain at Creation level
- 4.3: governance documentation at Evaluation level
- 4.4: transfer in new context at Creation level
- 4.5: transfer module -- no callback, this IS the
  transfer activity

---

## Transfer Context Rotation

One collapsible In a Different Context callout per
worked example screen per lesson.

FORMAT (required on all modules):
- 3-4 sentences
- Collapsed by default after first view
- Positioned after the final expert step before
  the navigation button
- Label: In a Different Context
- Same ARCH principle as the lesson applied in the
  assigned institutional context

Module 1 contexts used (do not repeat):
- Lesson 1: K-12 state education agency, reading
  instruction professional development
- Lesson 2: Community college FYE for underprepared
  students
- Lesson 3: Corporate cybersecurity awareness for
  non-technical employees
- Lesson 4: Hospital patient communication skills
  for nursing staff
- Lesson 5: Nonprofit financial literacy for adult
  learners
- Lesson 6: Doctoral research methods course

Module 2 suggested contexts (confirm before building):
- K-12 curriculum coordinator
- Corporate onboarding for new hires
- Higher education graduate seminar
- Healthcare clinical simulation design
- Government agency training
- Military or public safety training

Module 3 contexts: [assign before building]
Module 4 contexts: [assign before building]

---

## Error Taxonomy

Five named ARCH Method error types. Apply the most
relevant label to every limited-tier guided practice
feedback response across all modules.

Format: This response reflects a [error type name]:
[one-sentence description of what this error looks
like in practice].

Add compact error taxonomy reference card to the
Context Panel on all guided practice screens.

1. Scope conflation: grouping scope items by topic
   familiarity rather than authentic performance
   sequence
2. Constraint underweighting: failing to identify
   binding constraints or misclassifying binding
   constraints as negotiable
3. Taxonomy miscalibration: assigning Application
   level when the performance requires Analysis or
   Evaluation
4. Traceability gap: producing DC components that
   cannot be traced to a parent SI item
5. Governance underwriting: writing governance records
   without genuine risk notes or with risk notes that
   do not name a concrete failure condition

---

## Artifact System

CELEBRATION FORMAT:
When each artifact finalization button is clicked
show a two-sentence celebration specific to that
artifact. Format: You have [specific description of
what was produced]. [One sentence on why this
artifact matters for what comes next].

Draft celebration text before each module build
session for all new artifacts. Do not ask Claude
Code to invent celebration text.

Module 1 artifacts and celebration texts:
- MRHN_BucketMap_v1: You have organized 16 scope
  items into four workflow-based buckets with
  documented rationale and governance records. This
  is the kind of architecture package most IDs
  never produce.
- MRHN_CalibratedScopeMap_v1: You have calibrated
  16 scope items for domain authenticity and taxonomy
  level. Every annotation you wrote will govern a
  decomposition decision in Lesson 5.
- MRHN_PerformanceArc_v1: You have validated the
  performance arc for the Meridian course. This arc
  will govern every component decision in
  decomposition.
- MRHN_DecompositionMap_v1: You have decomposed all
  16 scope items into teachable, assessable components
  with full governance documentation. 48 components.
  8 governance records.
- MRHN_DecompositionMap_v2: You have a defensible,
  traceable course architecture ready for development
  handoff. This is what the ARCH Method produces.

Module 2 artifacts: [add from Stage 2 docs before
  build]
Module 3 artifacts: [add from Stage 2 docs before
  build]
Module 4 artifacts: [add from Stage 2 docs before
  build]

---

## Glossary Expansion Process

Current glossary: 18 terms as of Module 1 completion.

Before building each new module:
1. Identify new domain terms introduced in that
   module that learners may not know.
2. Add new terms to hoverGlossary.js TERMS object
   with plain-language definitions.
3. Mark new terms with hover glossary trigger class
   on first use per module.
4. List new terms in the New in This Lesson callout
   on the lesson introduction screen where they
   first appear.
5. Do not repeat terms already defined in prior
   modules.
6. Add new terms to this document under the module
   where they were introduced.

Module 1 terms (18 total):
constraint, scope, governance, traceability,
architecture, calibration, decomposition, tradeoff,
Bloom's taxonomy, cognitive load, prerequisite
dependency, transfer, CBE, formative assessment,
summative assessment, scope creep, SME, learning
objective

Module 2 new terms: [identify before build]
Module 3 new terms: [identify before build]
Module 4 new terms: [identify before build]

---

## Narrative Thread

Maintain internal consistency on all established
facts throughout all four modules.

ESTABLISHED FACTS (do not contradict):
- Client: Priya Okonkwo, Chief Learning Officer, MRHN
- Incident: Ransomware, March 2024, three sites,
  patient data exposed
- Regulatory: OCR audit finding, HIPAA Security Rule
  45 CFR 164.308 and 164.404, IR-2024 protocol
- Compliance window: 18-month OCR audit timeline
- Course deadline: 90 days from incident
- Learner population: 120 healthcare IT professionals
- SME availability: 2.5 hours (reduced from 4 hours
  in Module 1 Lesson 5 scenario evolution event)
- Course delivery: self-paced online

PRIYA EMAIL PATTERN (all modules):
- Teal-bordered message card
- Sender label: Priya Okonkwo -- Chief Learning
  Officer, Meridian Regional Health Network
- Collapsible after first read
- localStorage open/closed state per email
- One paragraph. Professional tone.

NARRATIVE ARC BY MODULE:
- Module 1: constraint extraction and scope
  architecture. SME availability revealed as binding
  constraint. Gate epilogue: SME review scheduled,
  OCR response filed, one site improved simulated
  incident response time.
- Module 2: introduce the SME character. First SME
  review meeting. Priya forwards SME questions about
  the architecture. Design decisions get challenged
  by domain expertise.
- Module 3: a stakeholder challenges one design
  decision during stress-testing. Structural
  diagnostic reveals a gap. The architecture must
  be defended.
- Module 4: Structural Freeze Declaration. Final
  narrative resolution: OCR audit satisfied, training
  delivered, outcome data from the field. The
  credential ends with consequence, not just
  completion.

---

## Recurring Patterns (Monitor Across All Modules)

Four patterns identified in Module 1. Monitor in
Modules 2-4 and address if they recur.

Pattern 1 -- Cognitive mode transitions:
Learners shift from observation to production without
explicit structural signals.
Response: cognitive mode transition banner on all
guided practice screens.
Verification: flag if Guessing confidence rating
exceeds 30 percent on any lesson.

Pattern 2 -- Passive worked examples:
All expert reasoning visible simultaneously before
learner engagement.
Response: progressive disclosure on all worked
example screens.
Verification: confidence ratings higher in lessons
with progressive disclosure.

Pattern 3 -- Confidence gap before submission:
No mechanism to flag uncertainty before submitting.
Response: confidence rating and articulation
requirement on all guided practice screens.
Verification: flag if Guessing exceeds 30 percent.

Pattern 4 -- Commitment note disconnection:
Commitment note collected but not referenced.
Response: commitment note callout on every lesson
introduction screen.
Verification: completion rates for learners with
substantive commitment notes versus those who skipped.

---

## Time Estimates by Screen Type

Implement via SCREEN_TIME_MAP in a shared JS module.
Do not hard-code time estimates in individual screens.

- Module overview screens: Est. 3-5 min
- Introduction screens (intro-0.x): Est. 5-8 min
- Lesson introduction screens: Est. 5-8 min
- Worked example screens: Est. 12-18 min
- Faded example screens: Est. 10-15 min
- Guided practice screens: Est. 15-25 min
- Decision point screens: Est. 8-12 min
- Reflection screens: Est. 10-15 min
- Calibration screens: Est. 15-20 min
- Governance form screens: Est. 20-30 min
- Gate screens: Est. 20-30 min
- Hub screens: Est. 3-5 min

---

## File Naming Conventions

Standard screens: m[N]-l[lesson]-s[screen].html
Faded examples: m[N]-l[lesson]-s[screen]b.html
Hub screens: m[N]-hub-l[lesson].html
Gate hub: m[N]-hub-gate.html
Module overview: m[N]-overview.html
Gate: m[N]-gate-s1.html
All files in SRC/ directory.

---

## Screen Count Reference

MODULE 1 FINAL COUNTS (after Prompt C Section 3):
- Lesson 1 (1.1a): 5 screens
- Lesson 2 (1.1b): 8 screens (includes s4b)
- Lesson 3 (1.2): 7 screens
- Lesson 4 (1.3): 5 screens
- Lesson 5 (1.4a): 6 screens (includes s3b)
- Lesson 6 (1.4b): 7 screens
- Gate: 1 screen
- Total lesson screens: 39

Note: this count reflects Prompt C Section 3
completion. Final count will increase after Prompts
C Sections 4-9, D, and E add hub screens, module
overview screen, new introduction screens, and
other additions. Run verification before Module 2:
ls SRC/m1-*.html | wc -l
ls SRC/intro-*.html | wc -l

Add verified final counts here after Prompt F.

MODULE 2 COUNTS: [add before build]
MODULE 3 COUNTS: [add before build]
MODULE 4 COUNTS: [add before build]

---

## Do Not Do These Things

In addition to everything in CLAUDE.md:

BUILD PROCESS:
- Do not build any screen before reading CLAUDE.md
  and this document
- Do not skip the module overview screen -- build
  it first in every module session
- Do not skip any element in the lesson template
  sequence
- Do not omit spaced repetition callbacks on lesson
  introduction screens
- Do not build hub screens without verifying current
  screen counts first
- Do not build gate screens before all lesson screens
  in that module are complete

TECHNICAL:
- Do not hard-code colors -- use tokens.css only
- Do not use em dashes anywhere in learner-facing
  content
- Do not add user-scalable=no to viewport meta
- Do not create a new localStorage key without
  adding it to the namespace list in this document
- Do not introduce new component patterns without
  checking the component library above and
  documenting the new pattern here

CONTENT:
- Do not use IRMA Mapping -- use Outcome Mapping
- Do not use Stage terminology -- use Phase and Step
- Do not write developer documentation language in
  learner-facing content
- Do not assume prior knowledge of Bloom's taxonomy,
  CBE, cognitive load, or prerequisite dependency --
  define on first use per module
- Do not use the same transfer context in two
  different lessons or modules
- Do not invent artifact celebration text -- draft
  it before the build session
- Do not invent performance task exemplar content --
  draft it before the build session
- Do not invent narrative details that contradict
  established Meridian scenario facts
- Do not use the persona name IRMA -- use Priya
  Okonkwo

---

## Prompt F -- Final CLAUDE.md Update Pass

Run Prompt F after Prompt E Part 2 commits and
before Module 2 build begins.

Prompt F instruction:
Read CLAUDE.md. Read Docs/ARCH_Build_Governance.md.
Update CLAUDE.md to reflect all decisions made in
Prompts A through E that are not yet documented.
Specifically add or update: final screen count after
all Prompts A-E, all new localStorage keys from
Prompts D and E, pacing mode system documentation,
self-regulation flag system documentation, gradual
release operationalization status, pattern
documentation section, spaced repetition map,
lesson template final version, module overview
screen specification, context panel content
reference, performance task preview process, gate
screen structure specification. Show me the complete
updated sections before committing. Do not commit
until I approve.

After Prompt F commits update the Completed Prompts
Record below to reflect all prompts as complete.
Then update this document to add final verified
screen counts for Module 1.

---

## Completed Prompts Record

Prompt A: Visual styling, progress tracker redesign,
navigation fixes, mobile, breadcrumbs, trademark,
module nav links. COMMITTED.

Prompt B: Content quality, reading level rewrite,
accessibility fixes, Preview Mode, heading hierarchy,
Your Progress sidebar panel, CSS unification, print
stylesheet, storage fallback, CLAUDE.md updates.
COMMITTED.

Prompt C Section 1: Skipped (completed in Prompt B).
Prompt C Section 2: Screen splits, progressive
disclosure on six worked example screens, reference
cards. COMMITTED.
Prompt C Section 3: Retrieval warm-ups, faded
examples (m1-l1b-s4b, m1-l4a-s3b), confidence
ratings, scaffolding badges, prior knowledge
activation, commitment surfacing, partially completed
practice items, gate review criteria, failure
scenario grounding. COMMITTED.
Prompt C Section 4: Brief panel on all Module 1
and introduction screens. COMMITTED.
Prompt C Sections 5-9: NOT YET RUN.

Prompt D: Chunking, pacing, time estimates, lesson
completion signals, module progress map, artifact
relationship map, feedback separation, resume prompt,
pacing alert. NOT YET RUN.

Prompt E Part 1: Voice rewrite, narrative activation,
Priya emails, learner-centeredness, engagement,
motivation, transfer contexts, portfolio alignment.
NOT YET RUN.

Prompt E Part 2: Architecture, navigation, UX,
executive functioning, learning science, portfolio
additions. NOT YET RUN.

Prompt F: CLAUDE.md final governance update.
NOT YET RUN.

---

## Module Pre-Build Checklists

MODULE 2 PRE-BUILD CHECKLIST:
Complete every item before starting the Module 2
build session:

1. Confirm Prompt F is committed
2. Add Module 2 artifact list from Stage 2 documents
   to Artifact System section above
3. Draft two-sentence celebration text for each
   Module 2 artifact
4. Confirm Module 2 lesson architecture from Stage
   3 documents
5. Run ZPD analysis -- assign scaffolding tiers to
   each Module 2 lesson and document here
6. Identify which Module 2 lessons need faded
   examples based on ZPD analysis
7. Assign transfer contexts to Module 2 lessons
   (do not repeat Module 1 contexts)
8. Write spaced repetition callbacks for Module 2
   lessons -- verify draft above against actual
   lesson content before building
9. Identify which Module 2 lessons get Priya emails
   and draft email content before building
10. Identify which Module 2 guided practice screens
    need Bloom's bridge activities
11. Design Context Panel content for each Module 2
    lesson tier
12. Identify optional enrichment screens for Focused
    Practice mode
13. Identify new glossary terms for Module 2 and
    add to hoverGlossary.js before building
14. Draft performance task preview content for
    Performance Task 2
15. Identify Module 2 gate governance records and
    write specific one-sentence review criteria per
    record
16. Assign transfer contexts to Module 2 lessons
    (no repeats from Module 1)
17. Verify final Module 1 screen count:
    ls SRC/m1-*.html | wc -l
18. Build m2-overview.html first

MODULE 3 PRE-BUILD CHECKLIST:
Complete the same 18 steps for Module 3 before
starting the Module 3 build session.

MODULE 4 PRE-BUILD CHECKLIST:
Complete the same 18 steps for Module 4 plus:
19. Design three transfer module sub-lessons for
    Lesson 4.5:
    a. Exemplar study: learners review their complete
       Module 1-4 artifact archive and identify three
       reasoning moves to preserve and one to revise
    b. New context application: given a two-paragraph
       brief in a new domain identify the five
       constraint categories most likely to govern
       the design and explain why
    c. Transfer reflection using the four-question
       framework
20. Draft final narrative resolution for Module 4
    gate: OCR audit satisfied, training delivered,
    outcome data from the field, credential complete.
