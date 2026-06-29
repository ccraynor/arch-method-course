# ARCH Method — Punch List for Next Session

Captured 2026-06-26 from screenshot review plus a code audit. Twelve raised
items, organized into a few systemic fixes plus targeted one-offs, with four
additional flags surfaced by the audit (Section F: F1-F4). Threads carried over
from today are at the bottom, so this is the single source of truth for tomorrow.

**Scope marker (current stop line):** finish ALL Module 1 visual/structural
polish, then Task 3 (Module 2 pre-build checklist), then Task 4 (reading
enrichment cards, Modules 2-4), then HALT before building any Module 2 screen.
Task 3 and Task 4 are both IN SCOPE before the stop; the post-Module-2 cluster
(AX4 Stages 3-6 and the dead-import cleanup) is OUT of scope.
D-item status: D5 and D6 are IN SCOPE (part of the Module 1 visual/structural polish to finish before halt); D7 (F3 carryovers) and D8 (template list-style trio) are deferred/logged-only.

---

## Read this first

**Update 2026-06-27:** Several items shipped today — F1 (dead module links,
commit 27c4db8), Section A's decision-record + merge-card wraps (commit 5ffdbf1),
and item B (Success Criteria + Expected Evidence uncollapse, commits 12a1eaa +
654c34b). What remains is a few audits plus a handful of one-offs.

**Punch-list hygiene.** When marking an item DONE: (1) confirm the commit hash
exists in `git log` before writing it; (2) rewrite the item body to resolved
(past) tense so it no longer reads as open; (3) update any gate-status or
"remaining"/"suggested order" summary line affected. When an item is reversed,
mark it SUPERSEDED with the superseding commit, not DONE.

**Pre-Module-2 GATES — ALL CLEAR.** No Module 2 blocker gates remain. The four
gates are done: item B (uncollapse), the G1/G2 accessibility scan + build
standard (commit efbf165), F3 eyebrow-label color standard (commits 7cdac3e +
419a361), and AX2 hub-map aria-current (commit 323271b, which closed the last
residue of G). Module 1 is the pattern source for Modules 2-4, so these had to
land before any Module 2 screen build; they now have.

Remaining audits / one-offs (non-blocking polish): **D5** (H2 content-heading
size), **E1** (split m1-l2-s5b), and **A5** (decision-record CSS consolidation);
plus logged/optional **D11** (numbering audit) and **D12** (dead ARCH-ID
plumbing), and the **F2 L6 follow-ups**. (B, C, F2, F3, F4, G, AX2 are done.)

**Suggested order (remaining):** D5 → E1 → A5.

---

## G. Accessibility pattern-conformance check  (BLOCKS Module 2 build)

Source: Docs/Accessibility & Inclusion Plan.docx (Master Accessibility Spec
v5.0). Why now: Module 1 is the pattern source for Modules 2-4. The spec's
Section 0 flags requirements that "cannot be deferred or retrofitted after
component development begins." Any conformance gap in a Module 1 reusable pattern
would propagate 3x, so this runs BEFORE Module 2 is built, not after.

This is the STATIC, read-only, Claude-Code-doable check — NOT the formal AT audit.

**G1 + G2: DONE** (commit efbf165). The static scan ran and the conformant
patterns are recorded as the Accessibility Build Standard in CLAUDE.md; the AX1-AX6
findings it surfaced were routed below and are resolved. The formal AT launch gate
(next section, manual NVDA/JAWS/VoiceOver/keyboard/zoom) remains out of scope.

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
- **AX2: aria-current on the HUB MODULE-MAP only. DONE** (commit 323271b).
  lessonHub.js now sets `aria-current="step"` programmatically on the current
  node inside the existing `.module-map__node[data-map-lesson]` loop (where
  `isCurrent` is already computed), with an else-branch that removes it from
  non-current nodes so a moved `data-current` can never leave a stale value.
  Exactly one node per hub page carries it; the header progress tracker and the
  nav links (which own `aria-current="page"`) are untouched. This closes the last
  residue of the G accessibility gate, so **G is now fully complete.**
  Re-scoped 2026-06-27 to align with the v5.2 breadcrumb ratification (commit
  5fb6932); the original scoping notes are retained below.
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
- **AX5 (decision/amend): RESOLVED.** The accessibility spec was amended to
  v5.1 (commit 606aa03): the non-modal reference-panel contract (Sections 3, 10)
  and the always-visible guided-practice blocks (Section 15) are now in the spec,
  and the Section 6 save tiering is ratified by the spec owner. The CLAUDE.md
  Accessibility Build Standard no longer marks the tiering provisional.
- **AX6 (announcement-wiring family): RESOLVED 2026-06-27.** Consolidated all
  live screen-reader announcements onto one shared path and filled the spec
  Section 8 gaps the reconciliation pass found. Commits:
  - 3147ca7 Phase 1: shared SRC/js/srAnnounce.js; migrated panelManager.js and
    completionSignal.js onto the single announce() path.
  - 42691b9 group 1 (compare-expert): standardized m1-l4a-s4 to verbatim "Expert
    comparison available."; submit-confirmation strings on m1-l2-s3 / m1-l2-s5a
    left unchanged (ratified -- submit events, more informative); routed through
    srAnnounce.
  - 17e6aa3 group 2 (decision-template): verbatim "Decision recorded. Feedback
    available below." (submit) / "Decision updated." (revise) via srAnnounce.
  - bffcac9 group 3 (checklists): verbatim spelled-out completion count on
    m1-gate-s1 toggles; intro-0.7 and m1-l3-s2 excluded (no interactive
    checklist).
  - Two Section-8 strings intentionally NOT in AX6, carried forward:
    "Work saved." belongs to AX4 (Tier-1 shared autosave, Section 6) and must
    route through srAnnounce.js when wired; "Submission complete." is deferred to
    Module 2 (documented comment in decision-point-template.html; no genuine M1
    submission action exists to fire it).
  - Principle banked: Module 2's decision points, checklists, and compare screens
    inherit the single srAnnounce path rather than re-cloning bespoke announce
    helpers.
- **AX4 (shared autosave + Tier-1 save contract): Stages 1-2 DONE; Stages 3-6
  deferred to the post-Module-2 cluster.** Option 1 (full consolidation),
  staged. Scope decision 2026-06-27: Stages 1-2 (Module-2-gating consolidation)
  are complete; Stages 3-6 are deferred to a **post-Module-2 cluster**. Stage 1
  built the shared SRC/js/autosave.js module; Stage 2 migrated the Tier-1 screens
  onto it.
  - **Stage 1: DONE** (commit 6cf6ae1). Built SRC/js/autosave.js (group blob mode + light
    per-field path + dormant onSaveError Stage-4 hook), announcing via
    srAnnounce.js; pilot-wired reflection-template.html. Storage byte-compatible
    with the legacy inline format (same key + JSON shape + _savedAt).
  - **Stage 2 (Tier-1 screen migration): DONE.** All Tier-1 authored-text
    screens migrated (the four .reflection-writing screens and both
    .calibration-panel--reflection screens; verified as the complete
    inventory). The governance form is dispositioned in place, not migrated
    (see below), so no Tier-1 screen remains.
    - **Batch 1 (blob reflections): DONE** (commit 69d5ce6). Migrated
      m1-l1a-s5, m1-l4a-s5, m1-l4b-s7 .reflection-writing groups onto the
      module (JSON blob, key reflection_<id>); transfer-framework fields left
      on the light path via the exclude-`data-autosave-key` filter (disposition
      (i): they are Tier 2).
    - **Batch 2 (calibration pair): DONE** (commit c49598a). Added
      data-autosave-format="text" to autosave.js (single raw-string field,
      no JSON wrap); migrated calibration-template.html and m1-l4b-s6.html
      notes onto it (key calibration_<id>_notes, byte-compatible). Three
      behavior deltas vs the removed inline code: manual Save routes "Work
      saved." through srAnnounce; blur/30s saves are silent (status only);
      timestamp key moved to <key>_savedAt (cosmetic one-time reset, content
      key unchanged). Recorded in CLAUDE.md (Accessibility Build Standard) and
      the governance namespace.
    - **governance-form-template: NOT a Stage-2 migration; left in place by
      decision.** governanceForm.js (governance-form-template inline) already
      satisfies the Tier-1 behavioral contract in its own component, so Stage 2
      is COMPLETE without it. It is intentionally NOT migrated onto the shared
      module because: (a) the module's collect() excludes radio/checkbox, so
      migrating would drop the delivery-modality and accuracy-confirm inputs and
      break byte-compat on governance_<id>; and (b) its save is interwoven with
      progress milestones, field validation, and the submit/error-summary flow.
      Any real consolidation is a separate post-Module-2 refactor (see the new
      Stage-6 item), not unfinished Stage-2 work.
  Deferred stages:
  - **AX4 Stage 3 (post-Module-2):** consolidate the 5 status-UI variants
    (`.save-status-text`, `.autosave-dot`, `.autosave-bar`, `.notes-save-status`,
    `.form-save-status`) into the one canonical `.save-status`; extend global.css
    for saving/saved/error states (mind the responsive rule at ~line 2141).
  - **AX4 Stage 4 (post-Module-2), two sequenced steps:**
    - **Step 4a (prerequisite):** add a failure signal to storage.js. Today
      setItem swallows quota failures into an in-memory fallback and never throws
      or signals failure, so the Stage-1 onSaveError hook cannot fire. Step 4a
      makes setItem report failure (e.g. return a boolean, or export a
      fallback-state query). This MUST land before 4b -- sequencing, not optional.
    - **Step 4b:** build the failure-recovery UI (Retry Save / Download Draft /
      Copy Response / Return to Editing) on caught save failure + "Save failed."
      announce, driven by the Step-4a signal through the Stage-1 hook. Real v5.2
      Tier-1 conformance. Low fire-rate (memory fallback), safe to defer, tracked.
  - **AX4 Stage 5 (post-Module-2):** retire initSceneAutosave from panelInit.js
    once all data-autosave-key screens run through autosave.js; migrate the ~23
    light screens' attributes.
  - **AX4 Stage 6 (post-Module-2): consolidate governanceForm.js onto the
    shared module.** Optional refactor, not conformance work -- the governance
    form already meets the Tier-1 contract in its own component. Prerequisites
    the shared module lacks today: (a) teach autosave.js radio/checkbox-aware
    collection so delivery-modality and accuracy-confirm survive (and preserve
    byte-compat on governance_<id>); (b) expose a callable save primitive so the
    form's progress-milestone, field-validation, and submit/error-summary flow
    can drive saves instead of the module owning blur/interval timing. Only
    after both land is migration safe.
  - **AX4 cleanup (post-Module-2): remove the dead storage.js import left by
    the calibration migration.** In BOTH SRC/m1-l4b-s6.html and
    SRC/calibration-template.html the *base* `<script type="module">` block
    still carries `import { getItem, setItem } from './js/storage.js';` but uses
    neither -- the only getItem() call lives in the separate calibration block
    (which has its own `import { getItem }`), and there are zero setItem() calls
    anywhere in either file after Batch 2. So the entire base-block import line
    is dead, not just setItem; remove the whole line in both files. Pre-existing
    (the base-block import predates Batch 2); harmless, deferred, tracked.

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

## B. Uncollapse short critical callouts  (course-wide + governance) — DONE (commits 12a1eaa + 654c34b)

**DONE (commits 12a1eaa + 654c34b):** Success Criteria and Expected Evidence are
now always-visible static blocks on the affected GP screens; the CLAUDE.md and
governance build-spec wording was synced and `archMethod_[screenId]_evidenceOpen`
retired. The B1/B2 detail below is kept as the as-built record.

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

- **C1. DONE** (commit 95c2b2f). Seven learner-facing content lists were
  rendering markerless under the global `ul, ol { list-style: none }` reset
  (global.css:55-59), starting with the "Required Performance" list ("By the end
  of training, IT staff must be able to: …", Image 2). Markers restored via
  per-screen `list-style`: m1-l1a-s2 `.document-section__numbered-list`
  (decimal), m1-l1b-s4 `.version-rule__steps` (decimal) and the inline convention-
  card `<ol>` (decimal added to the existing `style=""`), m1-l2-s1
  `.artifact-contents` (disc), m1-l3-s5 `.recap-step-card__body ul` (disc, added
  to the existing rule rather than duplicating it; covers both lists), m1-l4a-s4
  `.compare-guide ol` (decimal), and intro-0.2's bare `<ul>` (fixed by reusing the
  existing `lesson-intro__list` class rather than adding a new rule). No div/p
  pseudo-lists existed; no markup-to-list conversion was needed.
  - Audit key finding (carry forward): "padding but no `list-style`" is NOT proof
    of a markerless bug under the global reset. Several list families are already
    covered by global rules that re-add markers — `.context-block ol/ul`
    (global.css:1455-1456), `.gov-record__val ul` (2992), and
    `.brief-section__body ul/ol` (1447-1448) — so lists under those render
    correctly even when a per-screen rule sets padding only. Those were verified
    against the rendered cascade and correctly left alone (the static scan flagged
    them as false positives). Intentional single-paragraph annotations (Calibration
    Annotation, Bucket 2 Arc Constraint, Image 8 boxes) stay prose, bullet-free.

---

## D. Targeted one-offs

- **D1. Confidence-rating legend overflow. DONE** (commit 2c1f941). The legend
  ("HOW CONFIDENT ARE YOU IN YOUR ANSWERS?", Image 5) was a `<legend>` straddling
  the top border of the `.confidence-rating` fieldset. Fixed globally on the
  shared component (10 screens, one rule in global.css — no per-screen edits) by
  floating the legend into normal flow inside the padding:
  `.confidence-rating__legend { float: left; width: 100%; margin-bottom: 0.5rem; }`
  PLUS `.confidence-rating__options { clear: both; }`.
  - **Lesson (preserve for any future floated-legend fix here):** the single-rule
    float pattern (`float: left; width: 100%`) alone is INSUFFICIENT when the
    content after the legend is a flex container. `.confidence-rating__options` is
    `display: flex`; beside a 100%-width float it collapses to zero size and the
    radios VANISH. The `clear: both` on the flex sibling is REQUIRED to drop it
    below the float. (`.form-section__legend` gets away with float-only because its
    following content is not a flex BFC.) Render-verified before commit.
- **D2. Bucket diagram equal-height. DONE** (commit c1be184). The m1-l2-s4
  "Instructional Sequence and Prerequisite Logic" diagram (`.sequence-flow`) had
  Bucket 2 and Bucket 4 boxes shorter than their neighbors (Image 7). Fixed with
  `.sequence-nodes { align-items: stretch }` (was `flex-start`) + `.sequence-node__box
  { height: 100% }` so all four boxes equalize to the tallest, plus
  `.sequence-arrow { align-self: center }` so the connector arrows sit at box
  midline after the stretch (without it the stretched arrows pinned to the top).
  CSS-only, render-verified.
  - **Correction to the original premise:** D2 is the SAME component/screen as the
    earlier min-height patch (m1-l2-s4 `.sequence-node__box`), NOT a different one.
    The earlier `min-height: 3.5rem` set a floor but never equalized heights, which
    is exactly why it did not resolve the misalignment.
- **D3. SI-09 bucket analysis labels too small. DONE — folded into F3** (commit
  7cdac3e). The SI-09 eyebrows are `.expert-insight__label` (m1-l4a-s3b,
  m1-l4a-s4); the F3 pass sized them to `var(--font-size-label)` and recolored them
  navy in the same edit. No separate D3 work remains. *(Image 8)*
- **D4. `<p aria-label>` pattern. DONE** (commit 3dd6625). Full audit of all 54
  `.lesson-label` instances found only ONE real inert-substitution case that
  survived the E2/E3 chip removal: m1-l3-s5, whose `aria-label` read "Lesson 4 --
  final screen" while the visible text read "Lesson 4: Final Screen" (a
  punctuation/case substitution on a non-interactive `<p>`, inert for AT). Fixed by
  aligning the aria-label to the visible text exactly. The other 53 are NOT bugs:
  24 built-screen + 7 template labels have `aria-label` identical to the visible
  text (harmless redundancy); 11 carry no `aria-label`; and 9 were the intro
  position labels removed by E3 (the bullet-to-comma cases, mooted). LEFT AS-IS by
  decision: the 2 "of Module 1" augmentation labels (m1-l4a-s1, m1-l4b-s1) — they
  add context rather than substitute punctuation, harmless (possibly inert on a
  non-interactive element), and not the bullet-to-comma bug.
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
  - **Discovery (2026-06-28; D5 still OPEN, now SCOPED).** It is NOT a one-token
    bump -- outcome (b) contaminated + (c) scattered: the 16 GROW classes use 13
    hardcoded values (0.75-1.375rem) + 3 token users, and `--font-size-heading` is
    contaminated (consumed by `panel-title` [DON'T-CHANGE] + 6 unrelated elements
    -- lesson-done__banner, lens-section__heading, error-summary__heading,
    form-section__legend, submit-success__heading, narrative-resolution__heading --
    and only 1 GROW class, hub-section-heading).
  - **The GROW list as written is internally inconsistent.** Several "GROW"
    classes are label/eyebrow-sized and would FLATTEN the hierarchy the DON'T-CHANGE
    rule protects if grown: `retrieval-warmup__heading`, `hub-glance__heading`,
    `gp-feedback__section-heading` (0.75rem); `lesson-intro__section-heading`,
    `lesson-section__heading` (eyebrow-styled). Others are already at/above target:
    `landing-section__heading` 1.375, `hub-section-heading` 1.25, `feedback-heading`
    1.25, `step-heading` 1.0625.
  - **Proposed approach when done:** a NEW `--font-size-section-heading` (~1.125rem;
    keeps H1 1.75 > content-H2 1.125 > body 1.0 > eyebrow 0.875), assigned ONLY to
    the true content-section headings (the ~0.875rem ones genuinely styled as
    headings: `calibration-panel__heading`, `think-aloud__heading`,
    `prompt-guidance__heading`, `prompt-block__heading`), leaving
    `--font-size-heading` for panel-title/banners. Exclude the label-size/eyebrow
    classes and the already-large ones. Also fix the `feedback-heading` 1.0625/1.25
    inconsistency to one value. GROW membership finalized at apply time.
- **D6. Eyebrow vs tracker lesson-number mismatch: SUPERSEDED by eyebrow removal
  (82a4b58).** Arc, recorded honestly: D6 first COMBINED the content eyebrow with
  the ARCH ID ("Lesson 5 • 1.4a", commit 9d0d2a4) to stop the two numbers reading
  as unrelated. A screenshot review then found THREE conflicting numbers on one
  screen -- eyebrow "Lesson 5", header tracker "1.4a", breadcrumb "5.1". The
  decision was reversed: the `.lesson-label` eyebrow was REMOVED entirely from all
  38 screens + 7 templates (commit 82a4b58), leaving the per-screen breadcrumb as
  the single content-area lesson number. D6's combined-label work is therefore
  superseded by that removal. See D9 (eyebrow removal) and D10 (resolved --
  tracker already ordinal) below.
- **D7. F3 carryovers (polish, surfaced during the F3 pass; non-blockers).**
  - `brief-subhead` uses a literal `font-size: 0.6875rem`, not the
    `--font-size-label` token; align to the token when convenient.
  - Governance build-spec (~line 174) still describes the cognitive-mode banner
    as "teal"; the banner is now plain italic (no box/border). Reconcile in a
    later governance-doc pass.
  - Status: the F3 eyebrow-label color standard is now governed in both CLAUDE.md
    (Visual Standards) and the governance doc, and the stale build-spec teal
    label wording (In Your Context callout) was corrected (commit 419a361). No
    action; logged for traceability.
- **D8. Template list-style trio (deferred from C1; scaffolding hygiene, NOT
  learner-facing).** Built screens already render correctly; only the templates
  lack list-style, so a future screen built from them would inherit a markerless
  list unless the builder re-adds it (as Module 1 builders did inline).
  - reflection-template `.prompt-questions` (ol) and `.guidance-list` (ul): no
    list-style in the template; built reflection screens add `list-style: disc`
    inline. Add the rules to the template (or promote to global.css).
  - calibration-template `.criteria-list` (ol): no list-style in the template.
    MUST NOT get a blanket `disc`/`decimal`: built calibration screens style it
    with `list-style: none` + CSS counters, and a plain list-style would collide
    with the counters. Match the built-screen counter pattern instead.
  - Resolve when templatizing for the Module 2 build.
- **D9. Lesson-label eyebrow removed entirely. DONE** (commit 82a4b58; supersedes
  D6). Removed the `.lesson-label` content-area eyebrow from all 38 Module 1 lesson
  screens + 7 *-template.html files, plus the dead CSS: each screen's per-screen
  `.lesson-label` rule and the global `.lesson-label` + `.lesson-label__id` rules
  (incl. 4 surgical grouped-selector edits that preserved the high-contrast siblings
  `.lesson-intro__section-heading` / `.step-heading__type` / `.constraint-field__type`
  / `.lesson-transition__label`). Also removed the 7 template "update lesson label"
  comments so Module 2 screens built from templates do not reintroduce the eyebrow.
  Left the `<title>` "Lesson [X.X]" metadata placeholders intact (legitimate
  page-title field, not the eyebrow). The per-screen breadcrumb is now the single
  content-area lesson number.
- **D10. Phase-2 numbering + terminology -- DONE/RESOLVED** (no commit needed;
  already satisfied by trackerRedesign.js). Discovery found both display goals were
  already met:
  - Part 1 (tracker "1.4a" -> ordinal): already true. The active visible tracker is
    rebuilt by `trackerRedesign.js`, which shows `LESSON_LABEL_MAP` ordinal
    ("Lesson 5") + position "N.n of M" ("5.2 of 6"). The old `#pt-lesson` "1.4a"
    span is re-appended `sr-only aria-hidden` -- invisible to sighted users AND to
    AT -- and is read by nothing active (only the dormant
    `components/progressTracker.js`). Verified live (screenshot): tracker
    "Module 1 · Lesson 5 / Worked Example · 5.2 of 6", breadcrumb "Module 1 >
    Lesson 5 > 5.2" -- all ordinal, no "1.4a" anywhere, fully consistent.
  - Part 2 ("Screen" -> "Page"): MOOT. The visible counter ("5.2 of 6") carries no
    "Screen" unit word, so there is nothing to rename. Counter kept as-is by
    decision. (The "screen reader" term and all code identifiers were out of scope
    regardless.)
- **D11. Redundancy & numbering-consistency audit (Module 1) -- LOGGED, not
  started.** Surfaced by the D6 episode: one screen showed three conflicting lesson
  numbers (eyebrow / tracker / breadcrumb) that no per-item discovery caught. Sweep
  every learner-facing surface that shows a lesson number, screen position, or count
  and verify they agree and use one scheme. Report conflicts, do NOT auto-fix.
  Sibling to the structural-drift audit; run both in the final reviewer-readiness
  sweep.
- **D12. Dead ARCH-ID plumbing -- OPTIONAL cleanup, not started.** Surfaced by the
  D10 discovery: the ARCH ID ("1.4a") is no longer displayed anywhere (D10), but its
  plumbing lingers -- the hidden `#pt-lesson` "1.4a" static spans, the 46 per-screen
  inline `getElementById('pt-lesson').textContent = '1.x'` setters, and the dormant
  `components/progressTracker.js` writer (imported by no lesson screen). All
  sr-only/aria-hidden, harmless, and not reviewer-facing. Optional hygiene only;
  defer to a post-polish cleanup pass.

---

## E. Page length / structure

- **E1. m1-l2-s5b too long** — break into accordions. (Note the contrast with
  Section B: accordions are the right tool for managing one long page;
  always-open is right for short critical callouts. Different jobs, not a
  contradiction.) *(/m1-l2-s5b.html)*
- **E2. Lesson-intro chip removal. DONE** (commit ed94878). Removed the redundant
  "Lesson Introduction / N screens" chip across the lesson-intro screens: deleted
  the `.lesson-intro__meta` wrapper (chip spans) on m1-l4a-s1, m1-l4b-s1, m1-l3-s1,
  and on m1-l2-s1 deleted the "6 screens" `.meta-chip` while keeping the time chip
  and the row. The header progress tracker already shows screen type + position.
  m1-l1a-s1 / m1-l1b-s1 carried no chip (unchanged). The ready-to-run prompt below
  is retained as a record.
- **E3. Intro-screen position label. DONE** (commit ed94878). Removed the
  "Introduction · Screen X of 9" position-label `<p>` from all 9 intro screens
  (intro-0.1 through 0.9; 0.7-0.9 used a multi-line variant). Same header-tracker
  redundancy as E2. This also mooted 9 of the inert-`aria-label` D4 cases (the
  bullet-to-comma `<p aria-label>` substitution lived on exactly these labels).

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
  <span class="screen-type-label">N screens</span>
The count span differs per file (verified live): m1-l4a-s1 reads "5 screens",
m1-l4b-s1 reads "6 screens". Remove the full three-span row on both screens.

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
- **F2. Stale screen counts (data accuracy). DONE** (commits 89b30cd + fa390fb). Three lessons had undercounted screen totals, each in
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
  - **Update (commit ed94878):** E2 deleted the count CHIPS (incl. the m1-l2-s1
    "6 screens" meta-chip and the m1-l4a-s1 "5 screens" / m1-l4b-s1 "6 screens"
    screen-type-label spans), so all the stale CHIP counts — including the
    m1-l4a-s1 "5 screens" value that conflicted with governance's Lesson-5 count —
    were GONE. The running-text lesson-plan HEADINGS still needed correcting at
    that point; that was done next in 89b30cd (see Resolved below). Removal touched
    chips only, not running-text counts.
  - **Resolved (commits 89b30cd + fa390fb):** bigger than a count tweak. The
    lesson-plan LISTS were stale too -- L5 omitted the s3b faded example, L6 the
    s4/s5 split screen -- reconciled so heading = list = header total on both
    (89b30cd). And m1-l2-s6 had BOTH position and total wrong ("Screen 6 of 6" ->
    "Screen 7 of 7", fa390fb). Lesson 3 had no running-text heading to fix. Two L6
    follow-ups remain OPEN (from the s4/s5 split): the Compare-to-Expert plan item
    is typed "Calibration" (the screen labels it "Compare to Expert"), and that
    item's title "Expert review of Screen 4 guided practice decisions" is now stale
    (the split made it Screens 4 and 5).
- **F3. Eyebrow-label color standard. DONE** (commits 7cdac3e + 419a361). The
  standard was established and applied: **non-interactive eyebrow labels are navy,
  with named accent exceptions.** It is now governed in CLAUDE.md Visual Standards
  and the governance doc, the per-class recolor landed (7cdac3e), and the stale
  build-spec teal wording (In Your Context callout) was corrected (419a361). The
  original plan detail is kept below as the as-built record. Governance deliverable (do this in the same pass):
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

- **F4. Disabled module-nav-link build standard. DONE.** Disabled /
  not-yet-available module-nav links must be non-navigable: `<span
  class="module-nav-link is-disabled" aria-disabled="true">` carrying the link
  text, never a live `<a href="module-N.html">` (aria-disabled does not stop
  anchor navigation → 404, the F1 bug). This closes the parity gap that would
  otherwise let Module 2-4 hub/overview/nav re-introduce F1. Verified present in
  both registries: CLAUDE.md "Do Not Do These Things" (the module-nav-link
  is-disabled rule, commit 27c4db8) and the governance doc's "DISABLED
  MODULE-NAVIGATION LINK STANDARD" section.

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
- **Task 4 — reading enrichment cards** for Modules 2–4 (two per module). Single
  source of truth: Docs/ARCH_Method_Reading_Map_Tracker.xlsx (commit 08e3c0e;
  two sheets, all 8 sources Modules 1-4 marked Ready, all open-access, APA 7 with
  DOIs/URLs). This supersedes the bare source list in ARCH_PostLaunch_Roadmap.md.

---

## A note on the common thread

Sections A and E (chip + intro label) are both "the header/first-column real
estate is being used inefficiently," and A2 + A4 are the same wrap bug seen on
different components. If you fix the shared two-column card/table CSS first,
several screenshot items (A1–A4, and the DC-07/08 case) should resolve together
rather than one at a time. E2 and E3 are the same redundancy-with-header
decision and should be made together.
