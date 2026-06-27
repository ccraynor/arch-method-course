# ARCH Method — Punch List for Next Session

Captured 2026-06-26 from screenshot review plus a code audit. Twelve raised
items, organized into a few systemic fixes plus targeted one-offs, with three
additional flags surfaced by the audit (Section F). Threads carried over from
today are at the bottom, so this is the single source of truth for tomorrow.

---

## Read this first

**Update 2026-06-27:** Several items shipped today — F1 (dead module links,
commit 27c4db8), Section A's decision-record + merge-card wraps (commit 5ffdbf1),
and item B (Success Criteria + Expected Evidence uncollapse, commits 12a1eaa +
654c34b). What remains is a few audits plus a handful of one-offs.

**Pre-Module-2 GATES — do these BEFORE building Module 2.** Module 1 is the
pattern source for Modules 2-4, so any gap in a reusable Module 1 pattern
propagates 3x. Two gates remain:
- **G. Accessibility pattern-conformance check** (full section directly below) —
  BLOCKS the Module 2 build.
- **F3. Eyebrow-label color standard** — land before new screens inherit the
  wrong color.
(Item B was the third gate and is now done.)

Remaining audits / one-offs: **C** (bullet audit), **D** (one-offs), **E**
(structure), **F2/F4** (counts, disabled-link standard), and **A5** (decision-record
CSS consolidation).

**Suggested order (remaining):** G → F3 → C → D one-offs → E → F2/F4 → A5.

---

## G. Accessibility pattern-conformance check  (BLOCKS Module 2 build)

Source: Docs/Accessibility & Inclusion Plan.docx (Master Accessibility Spec
v5.0). Why now: Module 1 is the pattern source for Modules 2-4. The spec's
Section 0 flags requirements that "cannot be deferred or retrofitted after
component development begins." Any conformance gap in a Module 1 reusable pattern
would propagate 3x, so this runs BEFORE Module 2 is built, not after.

This is the STATIC, read-only, Claude-Code-doable check — NOT the formal AT audit.

- **G1. Static conformance scan + gap list.** Scan Module 1's reusable components
  against spec Sections 1-14:
  - landmark roles/regions and the 5 skip links;
  - heading order (no skipped levels);
  - the ARIA-per-component-type standard (Section 3);
  - focus order + Escape-closes + focus-return-to-trigger (Section 7);
  - announcement wiring + the required announcement strings (Section 8);
  - progress-tracker states (Section 5);
  - save/persistence behaviors (Section 6: autosave 30s, timestamp, Save button,
    failure-recovery actions);
  - the six component contracts (Sections 9-14).
  Produce a GAP LIST tagged conformant / gap / missing-feature, distinguishing
  polish gaps from missing spec-required behaviors.
- **G2. Record the verified patterns** as an "Accessibility Build Standard"
  section in CLAUDE.md so Modules 2-4 are built against it (same discipline as the
  disabled-module-link standard). Record each pattern against its spec section.

**NOT in scope for G (recorded so it is not confused as done):** the formal
Accessibility Launch Gate — manual testing on NVDA / JAWS / VoiceOver / TalkBack /
keyboard-only / 200% zoom / 400% reflow. The spec defines this as a mandatory
PRE-DEPLOYMENT milestone requiring real assistive tech and a human; it cannot be
validated by Claude Code and is NOT part of item G. It stays a separate
end-state launch gate.

---

## Accessibility (from G1 scan)

G1 has been run. The conformant patterns and resolved decisions are now recorded
as the Accessibility Build Standard in CLAUDE.md (commit efbf165). The concrete
fixes the scan surfaced are routed below. (Contrast, real SR output, keyboard
traversal, zoom/reflow, and touch targets are NOT here — they stay
REQUIRES-AT-GATE items for the pre-deployment launch gate, not punch-list fixes.)

Caveat on G1 (static scan): the G1 scan reads source files and CANNOT see
JS-injected heading structure (innerHTML assignments, template literals). A
heading that appears at one source position may render somewhere else entirely.
Any G1 finding that touches dynamically-injected DOM must be verified against the
RENDERED structure before acting (AX1 below is a case in point). True
rendered-structure verification belongs to the AT launch gate, not to a static
pass.

- **AX1 (heading-level skip H2 → H4): RESOLVED 2026-06-27 — verified false
  positive.** The flagged h4s on m1-l1a-s4 and m1-l1b-s3 (`reference-section__heading`
  / `ref-type-heading`) live inside a `REFERENCE_HTML` template literal in a
  `<script>` block, so a flat source scan places them after the support-panel h2s
  (apparent h2 → h4). At runtime they are injected via
  `refBody.innerHTML = REFERENCE_HTML` into `#feedback-reference-body`, which sits
  directly under an H3 (`feedback-reference__heading`). The rendered outline is
  therefore H3 → H4 — valid, no skip. No code change: releveling h4 → h3 would
  flatten the reference subsections to the same level as the "Expert reference" H3
  that contains them, breaking the nesting. These are the only two screens with
  any `<h4>`.
- **AX2 (re-scoped 2026-06-27): aria-current on the HUB MODULE-MAP only.**
  Re-scoped to align with the v5.2 breadcrumb ratification (commit 5fb6932).
  - The header progress tracker is a breadcrumb readout (`role="group"
    aria-label="Course progress"`); `aria-current="step"` does NOT apply to it
    per v5.2 (Sections 3 / 5 / 9). Do NOT add it there.
  - The hub module-map IS a stepper-like timeline — it currently marks the
    current node with `data-current` + sr-only text. Add the appropriate
    `aria-current` to make the current step programmatic.
  - Now a small build fix scoped to the hub map, not the course-wide tracker.
    See v5.2 / commit 5fb6932 for the breadcrumb rationale.
- **AX3 (announcement strings): RESOLVED 2026-06-27 (commit efcb08e).**
  panelManager.js now maps each panel to its spec Section 8 string: artifact
  drawer open/close → "Artifact reference drawer opened." / "Returned to course
  content."; decision history → "Decision history opened." / "Decision history
  closed."; all other panels → generic "Expanded." / "Collapsed." The old generic
  wording ("… panel opened" / "Panel closed") is gone. Note: other Section 8
  events outside panelManager (e.g. "Work saved." — see AX4 Tier-1 save work,
  "Decision recorded.", "Submission complete.") are separate wiring, not part of
  AX3.
- **AX4 (build, Tier 1): shared autosave module + full Section 6 contract.**
  Promote autosave out of per-screen inline JS into a shared module, and implement
  the full contract (autosave 30s + on field-exit + manual Save + timestamp +
  failure-recovery actions + save announcements) on Tier-1 authored-text screens.
  Sized by the tiered save decision in the CLAUDE.md Accessibility Build Standard.
- **AX5 (decision/amend): RESOLVED.** The accessibility spec was amended to
  v5.1 (commit 606aa03): the non-modal reference-panel contract (Sections 3, 10)
  and the always-visible guided-practice blocks (Section 15) are now in the spec,
  and the Section 6 save tiering is ratified by the spec owner. The CLAUDE.md
  Accessibility Build Standard no longer marks the tiering provisional.

---

## A. Narrow first column / awkward title wrap  (systemic — "rampant")

Likely one root cause: two-column cards/tables with a first column too narrow,
forcing labels to wrap. Fix the shared CSS once (a sensible min-width or column
ratio so row headers sit on one line where reasonable), then verify per instance.
Carrie's note: some long labels may legitimately wrap — use judgment, "some may
not be reasonable."

**Audit caveat:** the narrow-column problem spans several *distinct* two-column
card styles — the Q&A table (Image 1), the Decision Record table (Image 4), and
the merge card (Image 9) each have different header markup. So this is likely a
few components to fix, not one shared rule. Scope accordingly.

- **A1. Decision Record tables** — RESOLVED 2026-06-27 (commit 5ffdbf1). Widened
  the wrapping `.gov-record__row` variants (9.5rem ×4, 10rem ×1) to 11rem across
  m1-l4a-s2, m1-l4a-s3, m1-l4b-s2, m1-l4b-s3, m1-l3-s4 so "Constraint Reference"
  sits on one line; "Calibration Constraints Applied" still wraps by design.
  *(Images 4/6)*
- **A2. DC-07 / DC-08 merge card** — RESOLVED 2026-06-27 (commit 5ffdbf1).
  `.component-card__header` flex-wrap + `.component-id` white-space:nowrap
  (m1-l4b-s2); the "Merge Required" chip now drops to its own line instead of
  breaking the title. It was a flex header, not a narrow column. *(Image 9)*
- **A3. Teachability / Assessability question card** — REVIEWED, intentionally
  LEFT. The real component is `.criteria-card` (m1-l4b-s2), with siblings
  `.test-card` (m1-l4a-s2) and `.audit-pass-card` (m1-l4b-s3) — NOT
  `diagnostic-check` (that is intro-0.9 only). The left column holds a full
  question, not a short label, so widening it would steal width from the answer
  column. Wrapping here is by design. Recorded so it is not re-opened. *(Image 1)*
- **A4. General two-column audit** — the known instances (A1–A3) are now resolved
  or triaged; spot-check any other two-column card for the same wrap as it comes up.
- **A5. Decision-record style CONSOLIDATION (follow-up, its own pass).** The
  decision-record component is duplicated across ~9 per-screen `<style>` blocks
  under three class names (`.gov-record__row`, `.gov-field`, `.gov-record__field`).
  A1 widened the wrapping variants but left the duplication in place. Follow-up:
  promote the shared styles into global.css under one class so width and behavior
  are set once.

---

## B. Uncollapse short critical callouts  (course-wide + governance)

These are short and important; collapsing them adds friction. Convert from
disclosure/accordion to always-open.

- **B1. Expected Evidence** — currently an accordion ("EXPECTED EVIDENCE … Show").
  Make always-open. Footprint: 5 guided-practice screens (m1-l1a-s4, m1-l1b-s3,
  m1-l4a-s4, m1-l4b-s4, m1-l4b-s5). *(Image 3; e.g. /m1-l1a-s4.html)*
- **B2. Success Criteria** — uncollapse all. Footprint is larger than B1:
  **10 screens** carry a `.success-criteria` collapsible — m1-l1a-s4, m1-l1b-s3,
  m1-l1b-s5, m1-l1b-s6, m1-l2-s3, m1-l2-s5a, m1-l3-s4, m1-l4a-s4, m1-l4b-s4,
  m1-l4b-s5. This is why the course-wide audit matters.
- **Governance + cleanup — B owns all four, do not fix any of them separately:**
  1. **Code:** make Success Criteria AND Expected Evidence always-visible on the
     affected GP screens (remove the disclosure wrapper; keep the always-open
     Purpose/Instructions pattern).
  2. **CLAUDE.md line 207** is stale ("Success Criteria and Expected Evidence:
     collapsible by default") — rewrite to the final always-visible state.
  3. **Governance build-spec line ~151** ("Success criteria callout: collapsed by
     default") — rewrite to always-visible so the build spec matches the code, not
     just the CSS.
  4. **localStorage namespace:** retire `archMethod_[screenId]_evidenceOpen` from
     BOTH CLAUDE.md and the governance doc (~line 525). (`_criteriaOpen` is already
     gone — removed with the duplicate Success Criteria in commit ea37c96.)
  - Overlap note: B revisits the 5 GP screens task 1 touched; the other 5 Success
    Criteria screens (m1-l1b-s5, m1-l1b-s6, m1-l2-s3, m1-l2-s5a, m1-l3-s4) are new
    ground.

---

## C. Bullet audit redo  (comprehensive)

The earlier bullet audit missed cases. Re-audit all cards and boxes for list
content rendered as indented lines with no bullet markers.

- **C1.** "Required Performance" list ("By the end of training, IT staff must be
  able to: …") renders as indented lines, no bullets. *(Image 2)* Find all
  similar pseudo-lists (list items without `list-style`, or div-based lists) and
  restore bullets. Leave intentional single-paragraph annotations alone — those
  are prose, not lists (e.g. the Calibration Annotation / Bucket 2 Arc Constraint
  boxes in Image 8 are correctly bullet-free).

---

## D. Targeted one-offs

- **D1. Confidence-rating legend overflow** — "HOW CONFIDENT ARE YOU IN YOUR
  ANSWERS?" bleeds over the top border of its box. Global fix to the fieldset
  legend / box (legend sitting on the border instead of inside the padding).
  *(Image 5)*
- **D2. Bucket diagram alignment (re-fix)** — Bucket 2 and Bucket 4 not aligned.
  The earlier min-height fix (`.sequence-node__box`, m1-l2-s4) did not resolve
  this graphic. This is the "Instructional Sequence and Prerequisite Logic"
  diagram, which looks like a different component/screen than the one patched —
  identify the actual screen and apply equal-height alignment so the right-column
  buckets line up with their neighbors. *(Image 7)*
- **D3. SI-09 bucket analysis labels too small** — the section eyebrow labels
  ("CALIBRATION ANNOTATION," "BUCKET 2 ARC CONSTRAINT," "WHAT YOU KNOW") are
  undersized. Increase the font a little. *(Image 8)*
  - **Color decision (from audit, see F3):** the teal SI-09 eyebrows are
    `.expert-insight__label` (m1-l4a-s3b, m1-l4a-s4), NOT `ws-box-label` (which is
    gray, and amber inside the calibration box). Today's pass moved the
    callout-label family to navy; fold this color decision into F3's label-color
    standard rather than deciding it here.
- **D4. `<p aria-label>` pattern (tidiness, not a live failure).** The
  `<p class="lesson-label" aria-label="…">` on ~40 files carries an aria-label
  that screen readers do not reliably announce on a non-interactive `<p>`, so the
  bullet-to-comma substitution it attempts is effectively inert (generalizes E3).
  When reached: drop the aria-label and handle the bullet→comma with a
  visually-hidden separator. Bundle with E2/E3.
- **D5. H2 content-heading size bump (course-wide, scoped).** Polish/systemic,
  sibling to the H1-to-callout padding item; NOT a Module 2 build-blocker.
  - Diagnosis (refined): H1 titles are fine. The H2s that read too small are the
    CONTENT SECTION headings. `<h2>` spans ~20 visual treatments in two groups —
    only one group should change.
  - GROW (true content-section headings, currently too small): `step-heading`,
    `hub-section-heading`, `lesson-intro__section-heading`, `lesson-section__heading`,
    `feedback-heading`, `gp-feedback__section-heading`, `task-section__title`,
    `landing-section__heading`, `lesson-plan-heading`, and the topical `__heading`
    section titles (transfer-framework, retrieval-warmup, calibration-panel,
    think-aloud, prompt-guidance, prompt-block, hub-glance).
  - DO NOT CHANGE (H2 by semantics, but small eyebrow LABELS by design):
    `context-block__heading` (the PURPOSE / Instructions / Expected Evidence
    labels) and `success-criteria__summary`. Raising these would flatten hierarchy.
  - DO NOT CHANGE (different context): `panel-title` and `aside-heading` (support
    panels / sidebars) unless reviewed separately.
  - Fix approach: if the content-section headings share a token
    (`--font-size-heading`), bump the token and confirm only the GROW group
    consumes it; if some use hardcoded sizes, align them to the token. Keep the
    result clearly H1 > content-section H2 > body, and content-section H2 >
    eyebrow labels. Propose current → proposed value for review before applying.
    CSS/token-only; no markup.
- **D6. Eyebrow vs progress-tracker lesson-number mismatch (learner-facing).**
  On built Module 1 screens, the content eyebrow shows the plain ordinal
  ("Lesson 5") while the header progress tracker shows the ARCH ID ("1.4a") on
  the same screen — two different lesson numbers visible at once. Clearest on
  m1-l4a (Lesson 5 / 1.4a); also m1-l1a (Lesson 1 / 1.1a) and m1-l1b (Lesson 2 /
  1.1b). Decide ONE learner-facing scheme and align the eyebrow and tracker to
  it (the numbering crosswalk in CLAUDE.md / governance maps both). Separate from
  task 9's doc reconciliation; this is a built-screen markup pass. Polish, not a
  Module 2 build-blocker.

---

## E. Page length / structure

- **E1. m1-l2-s5b too long** — break into accordions. (Note the contrast with
  Section B: accordions are the right tool for managing one long page;
  always-open is right for short critical callouts. Different jobs, not a
  contradiction.) *(/m1-l2-s5b.html)*
- **E2. Lesson-intro chip removal** — remove the "LESSON INTRODUCTION · N screens"
  chip; it duplicates the header progress tracker. Prompt below.
- **E3. Intro-screen position label (decide alongside E2).** The introduction
  screens carry a content-header label reading "Introduction · Screen X of 9,"
  which duplicates the header progress tracker's "Screen X of 9" on the same
  screen — the same redundancy as E2, one screen type over. Confirmed on at least
  6 of the 9 intro screens (intro-0.1 through intro-0.9; the other 3 may use a
  variant — confirm with a grep). Decide together with E2: remove for
  consistency, or keep as deliberate in-content wayfinding. Minor accessibility
  note: that label sets `aria-label` on a `<p>`, which screen readers do not
  reliably announce, so the bullet-to-comma substitution it attempts may be
  inert — moot if the label is removed. *(Surfaced in the intro-0.5 review.)*

### Ready-to-run: chip removal prompt (E2)

```
Task: Remove the redundant "Lesson Introduction / N screens" chip row from the
lesson introduction screens. The header progress tracker already shows the screen
type and position, so this chip duplicates it. HTML edit; show me the diff before
committing.

The chip is a row of .screen-type-label spans reading the screen type, a bullet,
and the screen count, e.g. on SRC/m1-l4a-s1.html and SRC/m1-l4b-s1.html:
  <span class="screen-type-label">Lesson Introduction</span>
  <span class="screen-type-label" aria-hidden="true">&bull;</span>
  <span class="screen-type-label">6 screens</span>
Remove the full three-span row on both of those screens.

The same logical chip appears with VARIANT markup elsewhere — find and remove the
equivalent on:
  - SRC/m1-l2-s1.html  (a count with aria-label "6 screens in this lesson")
  - SRC/m1-l3-s1.html  (a lone <span class="screen-type-label">Lesson
    Introduction</span> near the title; remove just that chip, not the lesson
    scope heading lower down)
m1-l1a-s1.html and m1-l1b-s1.html do not carry the chip.

DO NOT touch:
  - The single screen-type label on activity/practice screens (e.g. "Guided
    Practice") — that is a different, legitimate use.
  - Any lesson plan / scope heading that states the screen count in running text
    lower on the page.
  - The header progress tracker.

Verify before committing:
  - No lesson intro screen shows a "Lesson Introduction / N screens" chip near
    the title.
  - The header still shows screen type and position.
  - Activity-screen screen-type labels are untouched.
  - Eyeball m1-l4a-s1 and m1-l2-s1 (they had different markup) — the area above
    the title should look clean.

Show me the diff and do not commit until I approve.
```

**Decision for E2/E3:** full removal is the recommendation, since the header
already carries screen type + position. If you want to keep the position cue at a
glance, the alternative is keep-count-only on the lesson intros (drop the "Lesson
Introduction" half and the bullet, keep "N screens," applied consistently). Note
one stale value if you keep counts: m1-l4a-s1 reads "5 screens" but governance
lists Lesson 5 as 6 screens (see F2).

---

## F. Audit findings (not raised in review — verified against the code)

- **F1. Dead "Coming Soon" module links → live 404.** RESOLVED 2026-06-27
  (commit 27c4db8). Converted the disabled Module 2/3/4 `<a href="module-N.html">`
  to non-navigable `<span class="module-nav-link is-disabled" aria-disabled="true">`
  across all 63 files and the 7 templates, so they cannot be clicked and announce
  as disabled. The build-standard that prevents reintroduction is captured in F4
  and recorded in governance + CLAUDE.md (Task 3).
- **F2. Stale screen counts (data accuracy).** Three lessons undercount, each in
  two visible places, all from the same cause (a screen split the chip/heading
  never caught up to). The header `pt-screen-total` is correct everywhere; the
  chips and lesson-plan headings are the stale surfaces.
  - Lesson 3 (`m1-l2-s1`): meta-chip aria-label "6 screens in this lesson"
    (~line 471) and visible chip "6 screens" (~line 480) — actual is **7** (header
    "of 7"; 8 files minus the `m1-l2-s5.html` redirect stub). NEW vs the original
    F2, which only named 5 and 6.
  - Lesson 5 (`m1-l4a-s1`): chip "5 screens" (~line 571) and heading "Lesson 5:
    5 Screens" (~line 866) — actual is **6** (predates the `s3b` faded example).
  - Lesson 6 (`m1-l4b-s1`): chip "6 screens" (~line 575) and heading "Lesson 6:
    6 Screens" (~line 832) — actual is **7** (predates the s4/s5 split).
  - Decide holistically with E2/E3: removing the chips moots the chip counts, but
    the L5/L6 lesson-plan HEADINGS still need correcting regardless. Lesson 4
    (`m1-l3-s1`) heading "Lesson 4: 5 Screens" is already correct. Governance is
    the source of truth (7 / 6 / 7).
- **F3. Eyebrow-label color standard (ESTABLISH a new rule — does not reverse
  one).** Per current CLAUDE.md there is NO governed rule for non-interactive
  eyebrow/label color yet; the navy callout-label decisions so far were per-class.
  F3 establishes the standard: **non-interactive eyebrow labels are navy, with
  named accent exceptions.** Governance deliverable (do this in the same pass):
  add that rule to BOTH CLAUDE.md Visual Standards and the governance doc, AND
  update the governance BUILD-SPEC wording that still describes teal callout labels
  (e.g. `in-your-context__label` and any "teal … callout" label language) so the
  spec matches the standard, not just the CSS. Resolution plan to capture:
  - **Navy now:** `overview-phase`, `expert-insight__label`.
  - **Give `failure-callout__label` an explicit navy color** (it currently sets
    none and inherits).
  - **Accent-tier group** (`bloom-bridge__label`, `your-development__label`,
    `in-your-context__label`, `transfer-context__summary`, `project-update__label`,
    `exemplar-contrast__label`, `context-card__heading`, `diagnostic-check__heading`,
    `retrieval-warmup__answer-label`, `brief-subhead`): navy across the group,
    exempting any deliberately kept as a teal accent. Look-at-it-rendered, not
    tonight.
  - **Defer `success-criteria__summary`:** item B changes that element anyway.
  - **Leave the gray/secondary tier as-is.**
  - Handle the D3 SI-09 sizing alongside, since it touches the same eyebrows.

- **F4. Disabled module-nav-link build standard.** Disabled / not-yet-available
  module-nav links must be non-navigable: `<span class="module-nav-link
  is-disabled" aria-disabled="true">` carrying the link text, never a live
  `<a href="module-N.html">` (aria-disabled does not stop anchor navigation → 404,
  the F1 bug). This closes the parity gap that would otherwise let Module 2-4
  hub/overview/nav re-introduce F1. Status: being recorded in the governance doc
  and CLAUDE.md this session (see Task 3). Mark resolved once that commit lands.

### Verified clean (audit negative space)

So the audit's "all clear" is trustworthy too:
- Em dashes appear only in HTML comments and CSS, never in visible learner text.
- No per-screen `.screen-type-label` style duplicates (that cleanup rule is met).
- No duplicate IDs or `aria-hidden` on meaningful SVGs in sampled high-traffic
  screens.
- The intro-0.5 Gradual Release SVG is exemplary: redundant solid/dashed +
  filled/open-dot encoding (survives grayscale and color blindness), proper
  title/desc/role. Use it as the reference for any future chart.

---

## Carried over from today (don't lose these)

- **Item 2 — header consolidation** (Reading A, CSS-only). Prompt already
  written and ready to paste.
- **Item 6 — think-aloud persistence.** Decision pending — recommendation: keep
  it open by default, add persistence under the reserved
  `archMethod_thinkAloudOpen_[screenId]` key, and clean up the 11 redundant
  inline toggle scripts.
- **Item 5 — transfer callout.** Parked on tabs-vs-tighten. Recommendation:
  tighten the stacked layout, do not tab (tabbing would hide the active "In Your
  Context" reflection prompt).
- **Task 3 — Module 2 pre-build checklist** (18 items in the governance doc).
- **Task 4 — reading enrichment cards** for Modules 2–4 (two per module; sources
  in ARCH_PostLaunch_Roadmap.md).

---

## A note on the common thread

Sections A and E (chip + intro label) are both "the header/first-column real
estate is being used inefficiently," and A2 + A4 are the same wrap bug seen on
different components. If you fix the shared two-column card/table CSS first,
several screenshot items (A1–A4, and the DC-07/08 case) should resolve together
rather than one at a time. E2 and E3 are the same redundancy-with-header
decision and should be made together.
