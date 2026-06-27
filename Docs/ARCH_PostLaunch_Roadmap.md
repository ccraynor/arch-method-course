# ARCH Method Practitioner Credential
## Post-Launch Development Roadmap
### Proof Point Learning

Last updated: June 2026
Status: Module 1 live. Modules 2-4 in build. 
Prompts B-E in progress.

---

## Pre-Module 2 Build Tasks

Complete these before starting the Module 2 build session.

1. Reading Enrichment Build -- add two reading enrichment cards
   per module to the appropriate lesson screens. Sources already
   locked in Stage 3 Section 11 Addendum document:
   - Module 1: Stefaniak task analysis (EdTech Books) +
     Drysdale 2019 (ERIC/OLC)
   - Module 2: Weinstein et al. 2018 (PMC CC-BY) + MIT Open
     Learning spaced/interleaved practice
   - Module 3: Jahnke et al. 2021 (OLC CC-BY) + Smith and
     Luo 2024 (TechTrends CC-BY)
   - Module 4: Lachheb and Boling 2021 (EdTech Books) +
     Totino and Kessler 2024 (JAID)

   Format: no hyperlinks. Each card shows author, year, title,
   and publication with a plain-text search instruction: To find
   this article search [Author Last Name] [Year] [key title words]
   in Google Scholar or your institution's library database. It is
   openly accessible.

   Cards are optional enrichment, collapsible, labeled Skip
   (optional) in Focused Practice mode. Place at the end of the
   relevant lesson reflection screen or as a new optional screen.
   Build after Prompt E Part 2 and Prompt F commit.

### Module 2 build target (confirmed from Stage 1-3 UbD docs)

Module 2: Engineer the Learning -- 4 lessons (2.1 Sequencing Logic
Fundamentals, 2.2 Competency Progression and Spiral Reinforcement,
2.3 Unit Architecture Engineering, 2.4 Learning Science Integration),
25 screens, Phases 3-4. Deliverable: Sequenced Unit Architecture
Package (Performance Task 2, builds on Task 1 Bucket Map). Artifact
name MRHN_UnitArchitecture_v1. The SME Approval Gate (1 screen) is
Module 2's entry gate; a Sequencing Governance Record follows L2.4.

Each task below populates a Module 2 placeholder in
ARCH_Build_Governance.md from the Stage docs. The populated content
lives in the governance doc; this roadmap just tracks the to-do.

2. ZPD tier assignments for 2.1-2.4 -- run the ZPD Tier Assignment
   Process (governance) and record assignments plus any faded
   examples. Source: Stage 3 lesson complexity (2.3 Unit Architecture
   is the high-load lesson, about 12 min; 2.1-2.2 lighter). Fill the
   "Module 2 tier assignments: [complete before build]" placeholder.

3. Institutional contexts -- RESOLVED. Module 2 spotlight scenarios
   are LOCKED in Docs/ARCH_Scenario_Architecture.md (2.1 State
   Education Agency, 2.2 Community College, 2.3 Corporate, 2.4
   Hospital; sectors reused from Module 1 to reduce extraneous load
   while increasing reasoning demand).

4. Artifacts -- populate "Module 2 artifacts: [add from Stage 2 docs]"
   from Stage 2 Performance Task 2 (Sequenced Unit Architecture
   Package): organize and sequence the architecture using ARCH
   sequencing logic plus learning science; document sequencing
   constraints and rationale; builds on the approved Task 1 Bucket Map.
   Detailed sub-components are specified in Stage 3 (Unit Architecture
   Map across six units including Unit 6 Integrated Simulation,
   Sequencing Logic Explanation, Learning Science Application Notes,
   Sequencing Decision Log, Spiral Reinforcement Map, Sequencing
   Governance Record). Use artifact name MRHN_UnitArchitecture_v1.

5. Glossary terms -- identify Module 2's new terms, verify against
   actual lesson content, then add to hoverGlossary.js and the
   governance terms list. Stage 3 candidates: sequencing, progression,
   spiral reinforcement, spacing, interleaving. Do not repeat Module
   1's 20: cognitive load and prerequisite dependency (and dependency)
   are already defined there, so exclude them as new terms.

6. Verify the drafted Module 2 callbacks (2.1-2.4 already in
   governance) against actual Module 1 lesson content before building.

7. Inherited build standards. Building Module 2 includes the SME
   Approval Gate screen (Phase 2 Gate, 1 screen) as the entry point.
   Already governed and inherited: F1 disabled-link spans and item B
   always-visible Success Criteria / Expected Evidence. Pending pre-
   Module-2 gates that must land first, then Module 2 inherits them
   too: item G accessibility build standard and F3 navy eyebrow-label
   standard (see ARCH_PunchList_NextSession.md).

8. Reconcile a minor Stage 3 internal inconsistency before building:
   lessons 2.3 and 2.4 are mapped to Step 11 in one table and Steps
   12/13 in another. Confirm the correct step numbers and make Stage 3
   consistent (same kind of fix as the existing Module 3 "Correction
   Notes"). 2-minute reconciliation, not a redesign.

9. Module 2 lesson-ID / file-naming convention -- RESOLVED
   2026-06-27. Decision: Module 2's four unsplit lessons use
   m2-l1..m2-l4 mapped to 2.1-2.4 (with an a/b split rule for any
   future split). The Module 1 dual-numbering was reconciled via a
   crosswalk rather than forced convergence: the scenario spec
   (now v1.2) and the on-screen eyebrow use the plain ordinal
   Lesson 1-6, and the bare token "1.x" is reserved for the ARCH ID.
   The Module 2 convention and the Module 1 lesson-numbering crosswalk
   are recorded in ARCH_Build_Governance.md and CLAUDE.md. Still open
   (tracked separately, not part of task 9): the learner-facing
   eyebrow-vs-progress-tracker mismatch, punch-list item D6.

---

## Priority 1 -- Build After First Ten Learners Complete Module 1

These items require real learner data to implement well.
Do not build before the first cohort completes Module 1.

1. Annotated exemplar screen -- one complete ARCH Method
   application in a fictional non-Meridian scenario with
   five annotated artifacts. Build after learner data
   reveals which artifacts are consistently weakest.
   Equivalent to Course 2 Module 5 exemplar. Highest
   single pedagogical impact item in the post-launch
   roadmap.

2. End-of-module retrieval quiz -- ten no-stakes questions
   before Gate 1.TG.1 covering key terms and principles
   from all six lessons. Build after identifying actual
   knowledge gaps from learner data.

3. Contextual brief excerpts -- pull specific Meridian
   brief sections inline on eight high-difficulty screens
   as collapsible callouts. Brief panel button covers 80
   percent of the need now. Add excerpts to highest-
   difficulty screens first: m1-l1b-s2.html,
   m1-l2-s2.html, m1-l3-s3.html.

4. Peer exemplar simulation -- two anonymized fictional
   peer exemplar responses per performance task: one
   strong, one adequate. Build after real learner
   responses exist to inform what plausible peer work
   looks like.

5. Self-monitoring dashboard -- full learning dashboard
   showing lessons completed, artifacts produced,
   confidence ratings, flags, estimated time remaining.
   Build after Modules 2-4 are complete so the full
   data picture exists.

6. Email re-engagement sequence -- optional email
   collection on Screen 0.9. Re-engagement email after
   seven days of inactivity. Requires infrastructure
   beyond static HTML.

---

## Priority 2 -- Build During Module 2-4 Development

These items can be built incrementally during the
Modules 2-4 build sessions.

7. Gradual release operationalization -- full 34-screen
   pass applying three scaffolding tiers across all
   Module 1 lessons. Simplified version (two screens)
   added to Prompt E. Full operationalization builds
   naturally as Modules 2-4 establish the deeper arc.
   By Module 3 the scaffolding withdrawal should be
   architecturally visible across the full credential.

8. Spaced repetition callbacks -- each Module 2-4 lesson
   introduction must include one explicit callback to a
   Module 1 concept at increasing cognitive level.
   Governed by spaced repetition map in CLAUDE.md.
   Build into each module as it is developed.

9. Cross-lesson artifact links -- when a governance
   record or artifact name appears in a screen link
   directly to the screen where it was produced. Build
   after all four modules are complete so the full
   artifact system exists.

10. Performance-responsive feedback -- track three
    submissions per lesson and generate pattern-based
    encouragement or redirect. Requires JavaScript logic
    across multiple screens. Build after Module 2
    establishes the full guided practice pattern.

11. Coaching simulation -- branching feedback that
    responds to the most common learner reasoning
    patterns per guided practice screen. Requires
    knowing actual learner reasoning patterns from
    Module 1 data before it can be designed.

12. Autonomy choice points -- let learners choose which
    practice items to complete, which reflection format
    to use, which exemplar scenario to study. Build
    after Module 2-4 practice item patterns are
    established.

13. Course-wide search -- search screen titles, lesson
    names, artifact names, glossary terms. Returns
    direct navigation links. Build after full course
    is deployed so search index covers all four modules.

14. Recently visited history panel -- last ten screens
    visited with direct navigation links. Build after
    full course is deployed so history covers all four
    modules.

15. Initiation warm-up on non-first-unit screens --
    collapsible Before You Continue callout showing
    previous unit summary and next unit preview. Build
    after resume prompt is verified working across all
    four modules.

---

## Priority 3 -- Polish Pass After Full Course Launch

These items improve the experience but are not critical
for initial launch or Module 2-4 build.

16. Worked example step completion language -- add What
    did you notice? pause prompt before Show Next Step
    button on each worked example step. High authoring
    burden. Do after progressive disclosure is verified
    working across all modules.

17. Artifact dependency arrows -- visual arrows between
    artifact items in the progression display showing
    which feeds which. Post-launch visual polish.
    Simple addition once the full artifact arc exists.

18. Cultural relevance full integration -- expand the
    one-sentence annotation added in Prompt E into a
    full calibration question across Modules 2-4.
    The annotation in Module 1 establishes the lens.
    Full integration happens in later modules.

19. Table/list toggle for remaining two tables --
    Prompt E applies the toggle to m1-l3-s3.html only.
    Apply to m1-l4a-s3.html DC component table and
    m1-l2-s5.html balance evaluation grid in a
    post-launch polish pass.

20. Completion rate interventions beyond current build:
    - Cohort launch model: six to eight week cohorts
      with shared start date. Higher completion rates
      than always-open enrollment.
    - Accountability partner feature: share progress
      URL with a colleague or mentor.
    Both require infrastructure decisions beyond
    static HTML.

---

## Deferred Architecture Items

These require back-end infrastructure beyond static HTML.

21. True adaptive learning -- content selection based
    on performance modeling. Requires a back-end
    system. Consider for a future LMS-hosted version.

22. Peer comparison and community features -- shared
    decision logs, cohort progress comparison,
    community of practice integration. Requires user
    accounts and a back-end system.

23. Instructor feedback mode -- allow an instructor to
    review learner governance records and provide
    personalized coaching. Requires a submission and
    review system.

24. Three-track learner system -- Foundation, Standard,
    Advanced tracks with different annotation layers,
    scaffolding levels, and pacing recommendations.
    Requires Foundation track content authoring -- a
    separate curriculum design project. Build after
    learner data reveals where Associate IDs
    consistently struggle.

---

## Module 4 Build Specifications

These items go into the Module 4 build plan, not the
post-launch roadmap. Recorded here for traceability.

25. Transfer module (Lesson 4.5) -- three sub-lessons:
    (a) learners review their complete Module 1-4
    artifact archive and identify three reasoning moves
    to preserve and one to revise; (b) given a two-
    paragraph brief in a new domain (K-12 or corporate)
    identify the five constraint categories most likely
    to govern the design and explain why; (c) transfer
    reflection using the four-question framework (what
    changed in my thinking, what informed that change,
    what improved, what will I carry forward).

26. Narrative resolution epilogue -- brief paragraph on
    the Gate screen or Module 4 completion describing
    what happened at Meridian after the course was
    built. OCR audit satisfied. One site reported
    faster response time on simulated incident.

---

## Pattern Documentation (Course 4 Framework)

Four recurring patterns identified in Module 1 and
their planned responses. Use this for post-launch
pattern-based review.

Pattern 1 -- Cognitive mode transitions:
Across all six lessons, learners shift from observation
to production mode without explicit structural signals.
Cumulative effect: progressive disorientation at guided
practice entry points.
Response: cognitive mode transition banner added in
Prompt E item 38.
Verification: check whether learners report confusion
at the start of guided practice screens in any
post-launch feedback.

Pattern 2 -- Passive worked examples:
Across six worked example screens, all expert reasoning
is visible simultaneously before learner engagement.
Cumulative effect: passive reading habit may develop,
reducing activation before guided practice.
Response: progressive disclosure added in Prompt C
item 11.
Verification: check whether confidence ratings are
higher in lessons with progressive disclosure than
in lessons without it.

Pattern 3 -- Confidence gap before submission:
Across every guided practice screen, learners who are
unsure must either submit or stop with no intermediate
option.
Cumulative effect: repeated binary choice may suppress
genuine engagement from uncertain learners.
Response: confidence rating added in Prompt C item 20,
articulation requirement added in Prompt E item 16.
Verification: check distribution of confidence ratings
across lessons. Flag any lesson where Guessing exceeds
30 percent.

Pattern 4 -- Commitment note disconnection:
Across all six lessons, the commitment note is not
referenced. Personal anchor decays across the module.
Cumulative effect: progressive loss of personal
connection and motivation.
Response: commitment note connection per lesson added
in Prompt E item 13.
Verification: check whether learners who wrote
substantive commitment notes have higher completion
rates than those who skipped.

---

## Completed Items

Move items here when built and verified.

(None yet -- credential in active build.)

---

## Notes

- All deferred items are logged with the source
  analysis that generated them for traceability.
- Priority 1 items should be reviewed after the
  first ten learners complete Module 1.
- Priority 2 items build in parallel with
  Modules 2-4 development.
- Priority 3 items batch into a single polish
  session after full course launch.
- Pattern documentation should be updated after
  each learner cohort completes Module 1.
