# Module 2 Per-Screen Build Checklist

Run this for EVERY new Module 2-4 screen before considering it done. Rules are
extracted from CLAUDE.md + Docs/ARCH_Build_Governance.md (the WCAG build standard, the
settled numbering/structure decisions, the standing content rules, the lesson
template) — this is a build-time gate, not new policy.

- **EVERY-SCREEN GATE** below = check every box on every screen (no judgment).
- **APPLIES-WHEN (BY SCREEN TYPE)** = conditional items; run only the type that matches.
- **MODULE 2 CONTENT** = M2-4-specific governance content requirements.

---

# EVERY-SCREEN GATE

## Accessibility (the WCAG build standard — keep M2-4 at AA without re-auditing)
- [ ] Bare-`<div>` `aria-label` decision rule: decorative-only marker → `role="img"` +
  aria-label (glyph in an `aria-hidden` child); readable-prose container → NO aria-label
  on the bare div (let prose read); controls/form container → `role="group"`/`region`
  with the label as its name.
- [ ] No focusable control inside an `aria-hidden="true"` subtree.
- [ ] Honor `[hidden]`: never override a `[hidden]` control's `display` with a class rule.
- [ ] Module-nav: disabled/upcoming tabs use `--color-text-muted` (≥4.5:1) on a
  non-navigable `<span ... aria-disabled="true">`, never `--color-text-disabled` or a
  live `<a href="module-N.html">`.
- [ ] Active module-nav tab TEXT uses `--color-text-link`; `--color-brand-teal` only on
  underline/decorative.
- [ ] Any teal TEXT on a bg-subtle nav/panel background uses `--color-text-link`, never
  `--color-brand-teal`.
- [ ] No `role="group"` on a `<ul>`/`<ol>` (it overrides list semantics).
- [ ] All images inline SVG or carry meaningful `alt`; no external icon/font libraries.
- [ ] SVGs with `aria-label`/`role="img"` do NOT also carry `aria-hidden="true"`; only
  purely decorative SVGs get `aria-hidden`.
- [ ] Every input/textarea/select labeled (`<label for=>`, wrapping `<label>`, or
  `aria-label`/`aria-labelledby`; radios in `<fieldset>/<legend>`).
- [ ] Five semantic landmarks: header (role="banner"), nav, main, aside (complementary),
  footer (role="contentinfo").
- [ ] All four skip links first in focus order: Main Content, Current Activity, Progress
  Tracker, and Artifact Reference. (Decision History deferred per Accessibility Plan v5.2;
  do not add a fifth skip link.)
- [ ] Exactly one H1; heading levels never skip. Context-block headings are H2 directly
  (no sr-only H2 wrappers; section gets `aria-label="Activity Context"`).
- [ ] Support panels route through panelManager.js (single-open); expandable triggers
  carry `aria-expanded` + `aria-controls`; state changes announce via `#sr-announcer`.
- [ ] No `#artifactDrawer` overlay added (sidebar-only; panelInit.js hides the button).
- [ ] All colors from CSS tokens — no hard-coded hex (allowed only inside @media print).
- [ ] No `user-scalable=no` on the viewport meta tag.
- [ ] Lighthouse (Desktop) → 100 before the screen is considered done.

## Structure / numbering (M1 settled conventions)
- [ ] Breadcrumb is the SINGLE content-area lesson number (JS-injected, increments per
  screen); add no other content-area lesson number.
- [ ] No `.lesson-label` eyebrow on the screen.
- [ ] Learner-facing prose uses "Page N", never "Screen N" ("Screen N of M" lives only in
  the runtime-replaced tracker fallback).
- [ ] Header tracker shows the ordinal scheme ("Lesson X · X.Y of N") via trackerRedesign.js.
- [ ] File named `m[module]-l[lesson]-s[screen].html`; ARCH designations in filenames
  only, not learner-facing text.

## Content / style (standing rules)
- [ ] No em dashes anywhere in course content.
- [ ] No double hyphens (`--`) in learner-facing visible text (use colon/comma/period);
  `--` allowed only in title tags, HTML comments, scripts, CSS.
- [ ] Never "Stage" terminology in learner-facing content (use Phase/Step); never "IRMA
  Mapping" (use "Outcome Mapping").
- [ ] Instructional prose at Grade 8 FK (active voice, 2nd person, ≤20-word sentences);
  expert think-aloud annotation text is exempt (practitioner level).
- [ ] Glossary terms marked `span.gls[data-gls-term]` on first use per module; define
  Bloom's/CBE/cognitive-load/prerequisite on first use per module.
- [ ] Reuse shared modules — autosave.js, srAnnounce.js, panelManager.js,
  trackerRedesign.js + breadcrumb.js. Do not reinvent inline.
- [ ] Time estimate present (driven by SCREEN_TIME_MAP); ≤3 cognitive activities and
  ≤4 scroll depths at a 1080px viewport.
- [ ] No developer-documentation language in learner-facing content.

## Process (build discipline)
- [ ] Build from the verified-clean `*-template.html` — do NOT copy an older built screen.
- [ ] Register any new localStorage key in CLAUDE.md + governance before using it.
- [ ] New keys are MODULE-SCOPED (H12/H24, ruled 2026-07-13): `archMethod_lesson_m2l1_complete`,
      `archMethod_prediction_m2l1`, `archMethod_transfer_m2l1_q1`, etc. Never extend the
      Module 1 global counter (no `lesson_7`). Never write `archMethod_decision_[screenId]` — retired.
- [ ] Adding a Module 2 lesson? Its label must exist in BOTH `LESSON_LABEL_MAP`
      (trackerRedesign.js) and `LESSON_NAMES` (breadcrumb.js), and its hub ordinal in
      `LESSON_HUB_NUM` (breadcrumb.js). These are module-scoped (`m2-l1`, not `l1`) and must
      stay in sync — the tracker and breadcrumb are required never to diverge. m2-l1..m2-l4
      are pre-registered; verify they render before building further.
- [ ] Add each new screen to `SCREEN_MAP` (trackerRedesign.js) — it drives both the tracker
      position and the breadcrumb position.
- [ ] Diff before commit; code and docs in SEPARATE commits.
- [ ] Run Lighthouse (Desktop) → 100 before the screen is done.

---

# APPLIES-WHEN (BY SCREEN TYPE)

## Module overview (`m[N]-overview.html`, first screen of the module)
- [ ] Built FIRST, before Lesson 1.
- [ ] Contains: ARCH phase name; lessons with names + estimated times; artifacts produced
  (one-sentence each); total module time; backward link to prior module output; forward
  link to next module input.
- [ ] "Begin Lesson 1" links to the lesson hub (`m[N]-hub-l1.html`), not the first screen.

## Lesson introduction screen
- [ ] Required elements in order: prediction prompt (`archMethod_prediction_l[N]`);
  retrieval warm-up "Before You Begin" (Lessons 2 onward); scaffolding level badge; prior
  knowledge activation callout (Lessons 2 onward); commitment note callout; purpose
  statement; forward-looking purpose statement; ARCH Method mindset callout; New in This
  Lesson vocabulary callout; spaced repetition callback (see MODULE 2 CONTENT); Priya
  Okonkwo email where the narrative requires it.
- [ ] New in This Lesson callout present (omit only if the lesson introduces no new
  glossary terms).

## Worked example screen
- [ ] Curiosity-gap opener; progressive disclosure; discovery-moment framing at
  counterintuitive steps; In a Different Context callout; In Your Context callout;
  gradual-release Show Expert Reasoning toggle in the Monitored Practice tier.

## Guided practice / activity screen
- [ ] Success Criteria + Expected Evidence as always-visible static blocks; articulation
  requirement; confidence rating; cognitive-mode transition banner on arrival from the
  worked example; developmental feedback; error-type label on limited-tier feedback.
- [ ] Forward control always available (submission gates removed); expert feedback hidden
  until submit.

## Decision-point screen
- [ ] Use the fixed option count from the Stage 3 Decision Point Catalog — do not add or
  remove options. Check the catalog before building.

## Calibration screen
- [ ] Three-tier feedback; expert comparison after commit; self-check prompt.

## Reflection screen
- [ ] Prediction callback; four-question transfer framework; Lesson Complete block
  (success banner, two-sentence production summary, permission-to-stop statement, divider)
  before the transition note; Continue links to the NEXT lesson hub.

## Hub / gate screens
- [ ] Module progress map present (driven by `archMethod_lesson_[N]_complete`).
- [ ] Disabled module-nav links rendered as non-navigable spans (no 404).

---

# MODULE 2 CONTENT (M2-4-specific governance requirements)

- [ ] Spaced repetition callback on each M2-4 lesson intro: one explicit callback to a
  Module 1 concept at a higher Bloom's level, per the Spaced Repetition Map in
  Docs/ARCH_Build_Governance.md. Verify the callback against actual lesson content before
  building (pattern: "In Module 1 you [established X]. This lesson asks you to apply that
  at a higher level: [specific demand].").
- [ ] Reading enrichment cards: two per module, optional enrichment, no hyperlinks
  (plain-text search instructions only). Source from the authoritative tracker
  Docs/ARCH_Method_Reading_Map_Tracker.xlsx (not invented at build time); excluded from
  Focused Practice and from the progress-tracker unit count.
- [ ] Optional enrichment screens identified during the ZPD analysis: show a "Skip
  (optional)" label and are excluded from the Focused Practice unit count.
- [ ] Faded example only on highest-ZPD-risk lessons (identify per module via ZPD
  analysis); gradual-release tier (Full / Guided / Monitored) assigned per lesson via the
  same analysis.
- [ ] Monitor the four recurring M1 patterns (cognitive-mode transitions, passive worked
  examples, confidence gap, commitment-note disconnection) and reapply the response if a
  pattern recurs.
