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
- 111 screens total across 4 modules plus introduction
- 21 lessons
- 9 introduction screens (0.1 through 0.9)
- Module 1: Bound the Course (Lessons 1.1a, 1.1b, 1.2, 1.3, 1.4a, 1.4b + Gate 1.TG.1)
- Module 2: Engineer the Learning (Lessons 2.1, 2.2, 2.3, 2.4)
- Module 3: Stress-Test the Design (Lessons 3.1, 3.2, 3.3, 3.4)
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

### Do Not Do These Things
- Do not use em dashes anywhere in course content
- Do not use hard-coded color values — use CSS tokens only
- Do not build screens before the seven templates are complete
- Do not add external font or icon libraries — use system fonts and inline SVG
- Do not reference Stage terminology in any learner-facing content
- Do not reference IRMA Mapping anywhere -- use Outcome Mapping instead
- Do not add or remove options from decision point screens -- each 
  screen has a fixed option count per the Stage 3 Decision Point 
  Catalog. Check the catalog before building any decision point screen.
```