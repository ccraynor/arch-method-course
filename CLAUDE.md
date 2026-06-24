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
- 115 screens total across 4 modules plus introduction
- 21 lessons
- 9 introduction screens (0.1 through 0.9)
- Module 1: Bound the Course (Lessons 1.1a, 1.1b, 1.2, 1.3, 1.4a, 1.4b + Gate 1.TG.1)
  - Lesson 1.1b has 8 screens: s5 = Tasks 1+2, s6 = Task 3, s7 = reflection; s4b = faded example (Output Style Gate) inserted between s4 and s5
  - Lesson 1.4a has 6 screens: s3b = faded example (complete the SI-09 decomposition) inserted between s3 and s4
  - Lesson 1.4b has 7 screens (split from 6: s4 = Step 7 optimization, s5 = Step 8 trace audit, s6 = calibration, s7 = reflection)
- Module 2: Engineer the Learning (Lessons 2.1, 2.2, 2.3, 2.4)
- Module 3: Stress-Test the Design (Lessons 3.1, 3.2, 3.3, 3.4)
  - Lesson 3.3 has 7 screens. Section Alignment Check (Step 16) spans both 
    Lesson 3.3 and Lesson 3.4. Step 17 belongs to Module 4 Lesson 4.1 only.
- Module 4: Structural Freeze (Lessons 4.1, 4.2, 4.3, 4.4, 4.5)

### File Naming Convention
- m[module]-l[lesson]-s[screen].html
- Examples: m1-l1a-s1.html, m1-l1b-s3.html, m2-l2-s1.html
- Transition gate: m1-gate-s1.html
- Introduction screens: intro-0.[screen].html (already built)

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
   glossary, supportPanel, annotationPanel
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

### Do Not Do These Things
- Do not use em dashes anywhere in course content
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