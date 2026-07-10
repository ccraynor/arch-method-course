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

Remaining visible work: **D5** (H2 content-heading size -- scoped, optional given
cost) and **A5** (decision-record CSS consolidation -- invisible refactor); plus
the logged audits (**D11** numbering, the structural-drift audit) and the reviewer
walkthrough. Logged/optional carryovers: **D12** (ARCH-ID plumbing -- verified not-dead, no cleanup) and the
**F2 L6 follow-ups**. (B, C, E1, E2, E3, F2, F3, F4, G, AX2 are done/closed.)

**Suggested order (remaining):** D5 (last active polish item). A5 is OPTIONAL/DEFERRED (see Section A); D11/D12/D13-manual are logged; then Task 4 + Module 2 build.

**Update 2026-07-09:** A Fable design-analysis pass (Q1-Q3 + Module 2 spec)
plus two independent verification sweeps are now logged as **Section H**, at
the end of this file. Nothing in H has been fixed yet. H.1 (six items) is
verified and ready to action before the Module 2 build — treat it as
equivalent in priority to B1-B4 above. H.2 (fourteen items) is Carrie's-call
decisions, not commitments. H.4 surfaces real Grade-8 FK drift on an
8-screen cluster, independently confirmed. H.5 closes out citation and
font/icon checks with no action needed. H.6 is hypotheses to verify before
citing them anywhere public, not settled facts.

---

## Walkthrough round (2026-06-28)

A manual reviewer walkthrough of Module 1 surfaced a batch of alignment/formatting
bugs. Recorded here so the round survives to next session.

**DONE (committed + pushed):**
- **Alignment Batch 1** (commit 0591325): BUG1 m1-l2-s2 `.si-entry__id` nowrap;
  BUG3 m1-l3-s2 `.bs-bucket-label` left-align; BUG4 m1-l3-s3 `.lens-card__outputs`
  bullets; BUG6 m1-l4a-s1 + BUG7b m1-l4b-s1 `.lesson-plan-item__body`
  `align-items: flex-start`; BUG9 m1-l4b-s2 `.resolved-component__id` nowrap.
- **BUG8** (commit 81d613b): m1-l4b-s2 `.criteria-card` "Question N" labels -- key
  column 6rem->7rem + `.criteria-card__key-label` nowrap.
- **Screen -> Page rename -- DONE** (commits e02b29d + f9fd976 + 5f882d0, ~45
  files). Renamed all learner-facing "screen" -> "page" across visible prose,
  learner-facing JS strings, and AT-announced aria-labels (using "on Page N", not
  "in Page N"). Scope decisions: INCLUDED visible prose, the "Lesson N: X Screens"
  -> "X Pages" headings, scope-plan labels, artifact-flow labels, lesson-plan-num
  aria, gate record-log aria (provenance coordinates renamed for consistency), nav
  aria ("Page navigation", "Go to next/previous page"), and learner-facing JS
  (banners, announcers, feedback, compareExpert labels). EXCLUDED (deliberately
  left as "screen"): the runtime-replaced "Screen N of M" progress-tracker markup
  (invisible FOUC fallback -- trackerRedesign.js renders "N.n of M" with no unit
  word), "screen reader" family, all code identifiers (screen-type-label,
  pt-screen, SCREEN_MAP, screenId, .screen-nav, filenames), comments, <meta>
  descriptions, and template-instruction placeholders. The visible/AT-announced
  consistency supports the logged WCAG AA validation item. Note: group-2 caught a
  residual-scan lesson -- run the scan for prose variants ("this/the/each screen",
  not just "Screen N") BEFORE committing.
- **Accordions: default-open read-through disclosures -- DONE** (commit c6a2414).
  Added `open` to 8 `<details>` (6 "In a Different Context" + 2 Optional Reading);
  emails were already open; persistence (panelInit `data-persist-key`) left intact
  so a learner who collapses one keeps that on return.
- **BUG5: cal-table bucket-title size -- DONE** (commit 1c4d657). Bumped the
  calibration-table bucket-title rows 0.6875 -> 0.8125rem on m1-l3-s3
  (`.cal-table` + `.cal-output-table .bucket-row td`) and m1-l3-s4
  (`.full-cal-table .bucket-row td`). The "What You Will Do / What You Will
  Produce" headers were LEFT AS-IS: they are `.lesson-intro__section-heading`, a
  deliberate eyebrow on D5's DON'T-GROW list and a shared course-wide class;
  restyling them is a separate D5-scale design decision, not a scoped bump.

**CLOSED -- no change:**
- **BUG2** (m1-l2-s2 bucket-summary count alignment): REVIEWED, REVERTED. Five
  layout attempts (fixed name column, `auto`, `subgrid`/`max-content`) all clipped
  the count at narrow width and 150% zoom -- the 3-across row genuinely can't fit a
  narrow card. Original right-aligned layout kept (never clips). Not worth further
  effort.
- **BUG7a** (m1-l4b-s1 continuation box): CLOSED -- no change needed. NOT superseded
  by BUG7b: different component (`.continuation-banner` / `.continuation-items` vs
  `.lesson-plan-item__body`), no shared CSS. The continuation box was already
  correctly aligned in its own right (`display: flex` + `align-items: flex-start`,
  `flex-shrink:0` on the icon and the `::before` bullets, `flex:1; min-width:0` body,
  clean `role="note"` + `<ul>/<li>` markup). The "messy" walkthrough symptom actually
  belonged to the adjacent lesson-plan table that BUG7b fixed -- i.e. BUG7a was a
  mis-attribution of BUG7b's symptom to the neighbouring box.

**OPEN -- high-visibility, to do next** (chose "high-visibility only, then reassess"):
- (none) -- all high-visibility walkthrough items are done: Alignment Batch 1,
  BUG8, Screen->Page rename, Accordions default-open, BUG5, and BUG7a (closed --
  no change needed). Remaining Module-1 work is non-blocking polish (A5, optional/
  deferred) plus the logged audits (D11, D13).

**DEFERRED -- optional, lower-visibility** (deprioritized):
- Layout decisions: remove "Your Progress" until there is progress; trim "Module 1
  at a glance"; more padding between header and learning objective.

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
- **A5. Decision-record style CONSOLIDATION -- OPTIONAL / DEFERRED (not a Module 2
  blocker; cards render fine as-is).** Discovery (2026-06-29) found this is bigger
  and riskier than "promote shared styles to global.css":
  - **NOT simple duplication -- it's two parallel implementations, built twice:**
    `.gov-record__row` (CSS grid `11rem 1fr`) on 5 screens (m1-l3-s4, m1-l4a-s2,
    m1-l4a-s3, m1-l4b-s2, m1-l4b-s3) vs `.gov-field` / `.gov-record__field` (a
    different structure) on 4 screens (m1-l1b-s4b, m1-l1b-s6, m1-l2-s4, m1-l3-s2).
  - **Breakpoint divergence in the `__row` group:** mobile collapse fires at 480px
    (l4a-s2/s3, l4b-s2/s3), 500px (l3-s4), 540px (l1b-s6), and 900px (l2-s4,
    l3-s2) -- four different collapse points, all `11rem 1fr -> 1fr`.
  - **LIVE on 9 learner-facing screens** (distinct from the dormant Decision
    History component) -- consolidation carries visible-regression risk and needs
    per-screen render-verify.
  - **Full consolidation =** reconcile the two schemes + pick one breakpoint +
    markup rewrites on the 4 `.gov-field` screens + move canonical rules into
    global.css + render-check 9 screens. A multi-step discovery -> decide -> apply
    -> verify task (BUG2-scale), with ZERO learner-facing improvement.
  - **Cheaper partial option if ever wanted:** standardize the `.gov-record__row`
    breakpoint only (one value), without unifying the two schemes or moving to
    global.css -- a smaller, lower-risk consistency win.
  - **Status: OPTIONAL / DEFERRED.** (Supersedes the earlier "promote shared
    styles to global.css under one class" framing, which underestimated the scope.)

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
  - **NOT the double-hyphen item (2026-06-29 confirmation).** D5 is the H2 *font-size*
    bump only; it is unrelated to the no-double-hyphen content rule. The double-hyphen
    work (m1-l4b-s6 JS strings, commit b03e624; template placeholders, D16) is separate
    and did NOT close, fold in, or supersede D5. D5 remains its own OPEN item.
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
    AT -- but it is on a LIVE code path (trackerRedesign.js:137 reads it to preserve;
    progressTracker.js:294 writes it on intro screens). Verified live (screenshot): tracker
    "Module 1 · Lesson 5 / Worked Example · 5.2 of 6", breadcrumb "Module 1 >
    Lesson 5 > 5.2" -- all ordinal, no "1.4a" anywhere, fully consistent.
  - Part 2 ("Screen" -> "Page"): MOOT. The visible counter ("5.2 of 6") carries no
    "Screen" unit word, so there is nothing to rename. Counter kept as-is by
    decision. (The "screen reader" term and all code identifiers were out of scope
    regardless.)
- **D11. Redundancy & numbering-consistency audit (Module 1) -- DONE / ABSORBED**
  by the D6/D9/D10 conventions work. Surfaced by the D6 episode (three conflicting
  lesson numbers on one screen). The audit ran (2026-06-29) and is clean:
  - 0 `.lesson-label` eyebrows anywhere (content-area lesson number = breadcrumb only).
  - Breadcrumb and header tracker cannot diverge -- both sourced from the same
    SCREEN_MAP positions (spot-checked L5: 5.1->5.6 increments cleanly).
  - Every lesson-plan-heading count matches its SCREEN_MAP total (L3 5/5, L5 6/6,
    L6 7/7; L1a/L1b/L2 carry no heading).
  - No "N Screens" headings remain (all "N Pages" post Screen->Page rename).
  - ARCH IDs ("Lesson 1.4a") appear only in `<title>` / `<meta>` / HTML+CSS comments
    (non-content-area, legitimately keep them).
  - ONE residual found and FIXED: m1-l4b-s6 `fallbackLabel` rendered "Return to
    Lesson 1.4b Page 4" (a content-area ARCH ID in empty-state link text) -> changed
    to "Lesson 6" for convention-2 consistency. The sibling `label:` carried no ARCH
    ID (already clean). No other visible label/fallbackLabel carries an ARCH ID.
  (The structural-drift audit remains a separate sibling item for the final
  reviewer-readiness sweep.)
- **D12. ARCH-ID plumbing -- VERIFIED NOT-DEAD / NO CLEANUP (closed).** Discovery
  (2026-06-29) checked whether the suspected deadwood is actually dead; it is not:
  - `components/progressTracker.js` is LIVE -- imported and called (ptInit/ptUpdate)
    by `scaffolds/persistentStepTracker.js`, which all 9 intro screens import. (The
    earlier "imported by no screen" claim confused "no LESSON screen imports it
    directly" with unused; lesson screens use trackerRedesign.js, intro screens use
    progressTracker.js via persistentStepTracker.)
  - `#pt-lesson` and the other `pt-*` hiddenIds are on a LIVE read/write path:
    trackerRedesign.js:137 READS `#pt-lesson.textContent` (preserve) and re-renders
    it; progressTracker.js:294 WRITES it on intro screens. Rendered sr-only/
    aria-hidden (invisible) but NOT dead.
  - `LESSON_LABEL_MAP` / `SCREEN_MAP` are the ACTIVE ordinal source (heavily live).
  - No safe deletions exist. The invisible `#pt-lesson` is by-design backward-compat,
    not deadwood. IF anyone ever wants the invisible span gone, that is a deliberate
    ~55-file refactor (remove the hiddenIds preserve mechanism + intro writes + static
    spans + inline setters across ~46 lesson screens + 9 intro screens), NOT a cleanup
    -- logged here as the scope, not an action.
- **D13. WCAG 2.1 AA validation pass -- for the portfolio claim. AUTOMATED PASS
  COMPLETE (Lighthouse 100); manual AT spot-check deferred.**
  The AX1-AX6 work + G1/G2 build standard hardened accessibility
  substantially but did NOT produce a formal WCAG conformance audit. To credibly
  claim "WCAG 2.1 AA, validated with automated + manual testing" to employers, run a
  validation pass:
  1. Automated scan (axe-core / Lighthouse / WAVE) across all Module 1 screens --
     catches contrast, missing labels, heading order, ARIA misuse. Fix what it flags.
  2. Manual checks automation can't catch: keyboard-only navigation through a
     representative flow (intro -> lesson -> activity -> gate), and a screen-reader
     spot-check of the key interactions (autosave announcements, panel reveals,
     accordions, the tracker/breadcrumb).
  Run AFTER the current visible-polish round is complete (validate finished screens,
  not in-progress ones -- eyebrow removal, accordion + heading changes all touch a11y
  markup). The automated scan is largely a user-run-in-own-browser task (Lighthouse
  in DevTools / axe extension) with Claude Code fixing flagged issues. Slot it just
  before the final reviewer walkthrough. Scope = validation for a defensible AA
  claim, NOT a full per-criterion VPAT.
  - **Static pre-scan: DONE (this session).** The code-checkable layer is clean:
    no `<img>` (all inline SVG), 0 unlabeled form controls (all use `label for=` /
    wrapping label / fieldset-legend / aria), no broken ARIA references, `<html
    lang>` on all screens, no non-native interactive elements, contrast tokens
    documented and passing (secondary 5.6:1, link 6.5:1, status 5.8-6.7:1; disabled
    #9BAFC2 exempt). Two low-severity items to confirm at RENDER: (a) the
    JS-populated empty `<h2 id="feedback-heading">` on guided-practice screens --
    confirm it is non-empty once feedback shows and not exposed empty in the a11y
    tree while hidden; (b) `opacity: 0.7/0.75` on the m1-l2-s4 sequence-diagram text
    -- confirm the faded white-on-navy labels still clear 4.5:1.
  - **Automated scan: DONE (commit 980c333).** The user's Lighthouse run surfaced
    5 issues; all fixed: (1) nav-disabled contrast -> new `--color-text-muted`
    (1.4.3); (2) `.support-toggle[hidden]{display:none}` -> no focusable aria-hidden
    (4.1.2); (3) `.step-marker` `role="img"` -> prohibited-ARIA cleared (4.1.2);
    (4) `transfer-context__summary` -> `--color-text-link` for 4.5:1 on bg-subtle
    (1.4.3); (5) gate `.confirmation-list` `role="group"` removed -> list semantics
    restored (1.3.1). Findings 1-4 are [PATTERN] (global CSS / tokens / template,
    propagated to the build standard in CLAUDE.md + governance so Modules 2-4
    inherit them); finding 5 is a gate-only [INSTANCE]. **Follow-up (commit
    8fd3556):** the ACTIVE module-nav tab text was also failing (brand-teal 4.41:1
    on the bg-subtle nav bar) -- moved to `--color-text-link` (6.08:1), plus the 2
    sibling teal-on-subtle labels (`.gate-review-note__label`, `.prefilled-label`);
    the active-tab underline stays brand-teal (non-text indicator, 1.4.11 3:1).
    [PATTERN].
  - **Automated pass: COMPLETE.** Re-scan confirms **Lighthouse 100**; all 6
    findings fixed (the 5 above + the active-tab follow-up, 8fd3556), and the 4
    PATTERN fixes are written into the CLAUDE.md + governance WCAG build standard
    so Modules 2-4 inherit them.
  - **Template-conformance sweep: DONE (commits 672d11f + governance follow-up).**
    Pre-Module-2 verification of the 7 templates + global.css found one residual
    bare-`<div>` `aria-label` pattern (`aria-prohibited-attr`): `.annotation-item`
    (worked-example) had `aria-label="Annotation for step N"` on a generic div.
    Swept the fix across the template + **11 built screens** (m1-l1a-s3, m1-l1b-s2,
    m1-l1b-s4, m1-l2-s2, m1-l2-s4, m1-l3-s2, m1-l3-s3, m1-l4a-s2, m1-l4a-s3,
    m1-l4b-s2, m1-l4b-s3 -- 65 instances): removed the redundant label so the
    expert `<p>` prose reads (NOT `role="img"`, which would swallow it). Also fixed
    3 container labels: `.expert-gate` (label removed), `.drag-item-controls` and
    `.reflection-prompts` (`role="group"` + label kept). The generalized bare-div
    decision rule (img / remove / group) is now in the CLAUDE.md + governance build
    standard, so Modules 2-4 inherit it. All 7 templates now clean.
  - **DEFERRED (not done): manual AT spot-check.** A manual keyboard-only pass +
    screen-reader spot-check (the non-automatable layer -- real focus order, SR
    announcements, reflow/zoom) was NOT performed. **Honest scope of the validated
    claim:** "WCAG 2.1 AA, automated validation, Lighthouse 100." Do NOT claim
    "manually tested with assistive technology." The manual AT layer is a future
    optional enhancement (and remains distinct from the formal pre-deployment
    Accessibility Launch Gate, which needs real AT + a human).
  - **NEW SCOPE -- propagate to Modules 2-4.** This pass is NOT Module-1-only.
    Classify each finding **[PATTERN]** (from a shared template / global CSS /
    reused structure) vs **[INSTANCE]** (one-off). PATTERN fixes must be written
    into the 7 *-template.html files AND the Master Accessibility Spec / governance
    (the G1/G2 mechanism) so Modules 2-4 are BUILT to the standard and inherit the
    fix -- accessibility becomes a build standard, not an end-of-project retrofit.
    INSTANCE fixes are Module-1-only. Goal: validate Module 1 AND finalize the
    credential-wide accessibility build standard in one pass.
- **D14. M1 Lens-2 reading card cited the WRONG Drysdale publication -- DONE**
  (commit 0c62226). The live m1-l2-s6
  optional-reading card currently reads "Drysdale, J. S. (2019). Instructional
  design models (Chapter 22). In R. E. West (Ed.), Foundations of learning and
  instructional design technology. EdTech Books." -- a book chapter that does NOT
  match the intended source. Surfaced during the Task 4 draft (the live card
  conflicts with the authoritative tracker). CORRECT citation, verified against the
  journal source (and matching the tracker):
  - Drysdale, J. T. (2019). The collaborative mapping model: Relationship-centered
    instructional design for higher education. Online Learning, 23(3), 56-71.
    https://doi.org/10.24059/olj.v23i3.2058
  - APA-7 format for the fix: sentence-case title; "Online Learning, 23" italic with
    "(3)" roman; en-dash page range 56-71; plain-text DOI (matches the M2-4 card
    format decided in Task 4). Also update the card's search-instruction line to the
    correct work (the current one references "Foundations of Learning EdTech Books").
  - FIXED (commit 0c62226): replaced the m1-l2-s6 __citation + __search with the
    J.T. journal version (en-dash 56-71, plain-text DOI, `<em>` on "Online Learning,
    23" only) -- now matches the tracker. Single-screen [INSTANCE], done.
- **D15. Stefaniak citation reconcile -- DONE** (card commit 2514e5a; tracker in this
  docs commit). Became a 2-SURFACE fix, not tracker-only: the year decision flipped the
  card too. The card had read "Stefaniak, J. E. (2021). ... (Chapter 7). ... praxis.
  EdTech Books." and the TRACKER (Reading_Map_Tracker.xlsx, References row 3 + Credential
  row 2) had the less-complete "Stefaniak, J. (n.d.). ..." (no middle initial, no year,
  no chapter; Credential cell also title-cased the title and omitted the editors). Both
  surfaces now carry the SAME citation, verified identical by normalized string equality:
  "Stefaniak, J. E. (2025). Using task analysis to inform instructional design. In
  J. K. McDonald & R. E. West (Eds.), *Design for learning: Principles, processes, and
  praxis* (2025 updated ed.). EdTech Books." Decisions: year is 2025 (current updated
  edition); kept "(2025 updated ed.)"; DROPPED "(Chapter 7)" and did NOT re-add it (the
  updated edition may renumber -- do not re-add unless verified against the source).
  Search line on the card updated 2021 -> 2025. Unlike D14 (wrong publication), this was
  a same-work edition/metadata reconcile.
- **D16. Template placeholder double-hyphens -- DONE** (commit 4cbb2ab). The 5 build
  templates had `--` in bracketed `[placeholder]` prose (e.g. `[Option A -- defensible
  but not optimal]`). Not learner-facing themselves (placeholders, replaced at build
  time), but if a Module 2 builder copied the bracket prose literally the `--` would
  propagate into Module 2 learner-facing content. Replaced each `--` with the punctuation
  that fits the phrase (all 25 were `Label -- description` separations, so colon fit every
  one; none was a mid-sentence clause needing comma/en-dash), so Module 2 inherits clean
  text (same rule applied to m1-l4b-s6 in commit b03e624). Fixed 25 total: 24 visible
  placeholder prose + 1 AT-announced `aria-label`:
  - `decision-point-template.html` (8): Meridian situation line; scenario paragraphs 1-2;
    decision question; Option A/B/C/D text.
  - `reflection-template.html` (10): questions 1-3; tips 1-3; short labels for Q1/Q2/Q3;
    writing hint.
  - `calibration-template.html` (3): expert response paragraphs 1-2; specific prompt.
  - `guided-practice-template.html` (3): drag-activity instruction; input prompt; plus the
    `aria-label="[Items to reorder -- TEMPLATE: replace]"` listbox placeholder, fixed to
    `[Items to reorder: TEMPLATE replace]` (AT-announced, so the most learner-facing of the
    placeholder instances).
  - `worked-example-template.html` (1): Meridian situation line.
  DELIBERATELY LEFT: the 5 `<meta name="description">` lines that carry `--` -- page
  metadata, not learner-facing body text, treated like the title-tag exemption. Post-fix
  scan: 0 visible-text `--` across all 7 templates. (Surfaced 2026-06-29 during the
  m1-l4b-s6 double-hyphen verification, which found built screens otherwise clean.)

---

## E. Page length / structure

- **E1. m1-l2-s5b too long: REVIEWED — NO CHANGE NEEDED** (no commit; design
  decision, not a fix). Discovery found the prescribed "break into accordions" was
  WRONG for this screen. The long block is the "Expert Analysis: All 16 Decisions"
  content -- a READ-THROUGH expert comparison the learner is explicitly told to
  review for where their judgment differed (4 `.fb-bucket-card` units x 5 criterion
  rows, with JS-filled per-criterion agreement chips). Collapsing it by default
  would HIDE the exact comparison the screen exists to deliver and bury the
  difference-chips. The page is long because the comparison is thorough, which is
  appropriate for an expert-analysis screen. Options weighed: one big accordion and
  per-criterion collapsibles both defeat the screen's purpose; 4 per-bucket
  `<details>` defaulting open were possible but add interaction the per-criterion
  content doesn't cleanly support; prose-tightening is the only real length lever
  and is high-effort, low-visibility content authoring. Decision: leave the screen
  as-is. For the record: if a future content pass wants to trim length, the lever
  is tightening the `.fb-criterion-analysis` paragraphs (NOT accordions) -- logged
  as optional, not required. *(/m1-l2-s5b.html)*
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

---

## H. Fable Design-Analysis Follow-Up (2026-07-09)

Source: a Fable design-analysis session covering (1) the AI-workflow paper/
practiced/taught gap, (2) an M1 cognitive-load diagnosis, (3) a four-module
backward-design arc, (4) a build-ready Module 2 spec, plus two follow-up
sweeps (a systematic text-rule pass and a four-check pass: FK reading level,
glossary coverage, font/icon libraries, decision-point option counts).
Every item below was cross-checked against the live repo, CLAUDE.md,
governance, or a primary source before being logged here — nothing from
Fable's report was carried over on its word alone. Verification method is
noted per item. Status (updated 2026-07-10): the H.1 confirmed-fix items are
DONE — H1 (812e325), H2/H3 (efe19cd), H4 (f8eec0d), H5 (25a8bef), H6
(031e1c8), and H16 (c4b223e); each carries its commit hash and a past-tense
body. H.2 items remain explicitly Carrie's call, not commitments.

### H.1 Confirmed fixes — verified independently, ready to action

- **H1. m1-l2-s5b canon defect. DONE** (commit 812e325). The "Expert
  Analysis: All 16 Decisions" prose was corrected to Meridian canon: the LC-1
  "four-hour seat time ceiling" gloss was reconciled to "the four-hour SME
  access cap"; the LC-3/LC-4 "blended delivery"/"synchronous debrief" glosses
  were removed to honor the SCORM self-paced/no-synchronous canon; and the SI
  referent drift (SI-01/SI-09/SI-16, incl. the SI-09 vs SI-11 evidence-handling
  referent) was fixed. The analysis itself was left intact. Verified live:
  grep for "seat time|blended|synchronous debrief" in SRC/m1-*.html returns 0.
- **H2. Skip-link doc/code mismatch. DONE** (commit efe19cd). CLAUDE.md's
  Accessibility Build Standard and Docs/ARCH_Module2_Build_Checklist.md were
  amended to state four skip links, dropping "Skip to Decision History" to
  match Accessibility Plan v5.2 and the as-built screens (already four).
  Verified live: the only remaining "Skip to Decision History" strings are
  historical/requirement notes in docs; 0 appear as a live skip link in SRC.
- **H3. HIPAA citation label. DONE** (commit efe19cd). 45 CFR 164.404 was
  relabeled from "Security Rule" to "Breach Notification Rule" everywhere the
  narrative fact appears (governance established-facts list and the built
  screens). 164.308 remains correctly labeled Security Rule; the pairing was
  always narratively correct, only the label was wrong. Verified live: grep
  for "Security Rule 45 CFR 164.404" returns 0.
- **H4. HIPAA "72-hour" factual error — bigger than H3. DONE** (commit
  f8eec0d). The 72-hour breach clock was reattributed from HIPAA/OCR to
  MRHN's own internal IR-2024 protocol across the built screens, framed as
  stricter than HIPAA's 60-day outer limit (45 CFR 164.404), with 164.404
  cited only as the "reasonably should have known" discovery standard. This
  preserved the pedagogy (SI-10 placement rationale and the worked-example
  discovery-moment beat) without leaning on GDPR/NYDFS/CIRCIA, none of which
  fit MRHN's March 2024 story. Verified live: grep for "HIPAA 72|72-hour OCR|
  72-hour HIPAA" in SRC returns 0; the ~45 remaining "72-hour" strings are all
  the correct MRHN IR-2024 internal-deadline framing.
- **H5. hoverGlossary.js stale header comment. DONE** (commit 25a8bef). The
  header comment was updated from "Eight defined terms" and the 8-term list to
  "Twenty defined terms" with the full list, matching the 20-entry TERMS
  object. Comment-only change, no behavior impact.
- **H6. Citation-authority statement. DONE** (commit 031e1c8). The reversed
  sentence was flipped: ARCH_PostLaunch_Roadmap.md now states the built-course
  citations are authoritative and the tracker is corrected to match the course,
  with the authority order (built course > tracker > companion) recorded in
  governance. The tracker's own Drysdale (D14), Stefaniak (D15), and
  Weinstein/MIT Open Learning citations were already correct; this item was the
  authority *statement* only. Verified live: roadmap now reads "BUILT COURSE
  CITATIONS are authoritative ... authority order: built course >".

### H.2 Decision-needed — Carrie's call, not logged as commitments

- **H7. Pilot AI-practice disclosure (Lesson 2.1 reflection screen). RULED IN**
  (2026-07-09; governance "Session Rulings" item 2, ratified in commit e72ac20).
  The pilot was adopted: one optional "ARCH in AI Practice" disclosure on the
  Lesson 2.1 reflection screen (m2-l1-s5), built to the optional-reading card
  pattern (details element, data-optional-enrichment, Skip (optional) label,
  excluded from Focused Practice and the tracker unit count, no hyperlinks). The
  key archMethod_aiPractice_m2l1_open is registered in CLAUDE.md and governance;
  content is owner-drafted (do-not-invent rule applies). No open decision
  remains here: the disclosure is built with m2-l1-s5 during the Module 2 build,
  and assessed tasks stay 100 percent tool-agnostic.
- **H8. M1 celebration-text flattery.** Verified real and live (governance
  line 858 / built into the artifact system): "This is the kind of
  architecture package most IDs never produce." Fable's fix only targets M2's
  *future* celebration text; it doesn't touch this existing M1 line despite
  citing it as the problem example. Decide: revise the live M1 text now, or
  leave it and only apply the register caution going forward.
- **H9. Stage 3 2.3/2.4 callback swap.** Not a new idea — governance already
  flags this itself (lines 740-747: "possible swap... revisit at build") and
  already states "do not lock 2.3 and 2.4 callbacks until M2 content exists."
  Fable's Decision 3 proposes locking the swap *direction* pre-build (2.3 ←
  decomposition/bucket-to-unit at Evaluation; 2.4 ← calibration/cognitive-load
  at Evaluation) while still verifying final wording at build. Decide whether
  locking the direction now is acceptable under the standing rule, or whether
  it stays genuinely open until Module 2 content exists.
- **H10. Decision-point architecture for Module 2.** NEW, verified two ways:
  (a) grepped all built m1-*.html for the `decision-point` class that
  SRC/decision-point-template.html defines — zero matches; (b) direct
  screen-type-label audit across all 48 files found Worked Example (11),
  Guided Practice (10), Faded Example (2), Reflection variants (6), Expert/
  Compare-to-Expert (2), Intake Document (1) — zero screens labeled "Decision
  Point." The template exists (and was touched by D16's double-hyphen fix)
  but was never used to build an M1 screen; guided-practice interactions
  absorbed that role instead (m1-l2-s3's 8 native selects, m1-l3-s4's radio
  groups, etc.). Module 2's spec calls for genuine decision-point screens
  (2.1.4, 2.2.4, "complex branching, build/test first") with no M1 pattern to
  copy. Decide: build M2's decision points as the never-yet-built Template 4
  ("Decision Point With Branching"), or continue M1's absorb-into-
  guided-practice pattern.
- **H11. Decision Point Catalog spec gap. RULED** (B5, 2026-07-09; governance
  "Session Rulings" item 1, ratified in commit e72ac20). Resolved by restating
  the CLAUDE.md rule rather than inventing catalog option counts that the Stage
  3 UBD docx never specified: Module 2-4 decision points continue the Module 1
  guided-practice pattern (embedded, with per-option branching feedback), there
  is no discrete Decision Point screen type, and Stage 3 Template 4 is retired.
  Each interaction must implement the catalog's decision question and scoring
  dimension exactly; because the catalog specifies no numeric option counts, the
  old "fixed option count per the catalog" rule was superseded in CLAUDE.md.
  This ruling also governs the tied H10 build-pattern question (M1 pattern, not
  Template 4) — H10's entry is left as-is pending the owner's review.
- **H12. localStorage key scheme for Module 2.** Continue the l7-l10
  numbering convention, or move to module-scoped keys (e.g.
  archMethod_aiPractice_m2l1_open, as drafted)? Affects every new M2 key.
- **H13. Reading-card split placement (2.2 / 2.4).** Same-screen (the draft's
  current default) or split across two screens, as Fable's placement
  suggestion proposes? Flagged by Fable itself as [CONFIRM].
- **H14. Senior-ID walkthrough.** Schedule now (parallel track before Module
  3, per Fable's Decision 4), and decide whether to use Fable's authored
  probe questions verbatim ("Which recurring elements did you start
  skipping?" etc.) or write your own.
- **H15. Tier-toggle × annotation-panel interplay (m2-l3-s2).** Fable
  recommends "toggle governs content visibility; panel renders whenever
  content is open" — a recommendation, not yet a settled spec.
- **H16. Glossary: 3 untagged first-uses.** Verified (direct read of
  hoverGlossary.js + grep). `competency` (m1-l1a-s2:469, "general IT
  competency" — arguably the learner-population sense, not the CBE design
  sense; first *design*-sense use is m1-l1a-s3), `dependency` bare
  (m1-l3-s2:98, appears untagged across 4 files), `formativeAssessment`
  (m1-gate-s1:1038, as "formative checkpoint architecture" — a loose phrase
  match worth confirming it's even the same concept). Decide whether to tag
  each, and whether the m1-l1a-s2 hit is exempt as non-design usage.
- **H17. Glossary: 3 unused terms.** `cbe`, `summativeAssessment`,
  `scopeCreep` are defined in hoverGlossary.js's TERMS object but never
  appear in Module 1 visible prose at all. Decide: seed a first use in
  Module 1, or document them as Module 2-4 vocabulary (in which case note
  that in the governance glossary section so it isn't re-flagged as a gap).
- **H18. m1-l1a-s2 Meridian-brief FK classification.** The Meridian brief
  itself scores FK 14.3 (see H.4). Is this exempt as an authentic
  artifact-register document (like expert think-aloud text), or does it need
  to meet the Grade-8 instructional-prose standard? A classification ruling,
  not yet covered by CLAUDE.md's existing exemption language.
- **H19. Behind-the-Build case study + de-branded prompt library — scope
  and timing.** Fable's report calls these "adopted," but they're
  substantial new authoring work (a public case-study page, a full
  scrub-and-rebrand pass on the prompt library) competing with Module 2 build
  time — which cuts against Fable's own top-line "protect completion above
  everything" principle. Confirm these are in scope now, alongside Module 2,
  or deferred until Modules 2-4 ship.
- **H20. "Enrichment Companion" — locate before acting.** Fable's report
  repeatedly references correcting "the Enrichment Companion" alongside the
  tracker. No file by that name exists in Docs/ as currently listed. Confirm
  what this refers to (a section of the roadmap? a doc not yet created?)
  before treating "correct the Companion" as an actionable item.

### H.3 Module 2 build-prep (open, deferred to the actual build session unless noted)

- **H21. Complete the 18-item Module 2 Pre-Build Checklist** already logged
  in governance.
- **H22. Verify/build SME gate 1.TG.1 status.** CLAUDE.md counts it inside
  Module 1's 39 screens; the roadmap assigns building it to the Module 2
  session (task 7). Settle which is true before the build (`ls
  SRC/m1-gate*.html SRC/*TG*`).
- **H23. The 8 §3.6 "do-not-invent" content-drafting items** (Carrie's
  authoring, not a build task): PT2 preview excerpt, MRHN_UnitArchitecture_v1
  celebration text, 2 Priya emails, Context Panel content per lesson tier,
  retrieval warm-ups + prediction prompts, final callback wording ×4, gate
  governance-record review criteria, and the pilot-disclosure content if H7
  is adopted.
- **H24. Register all new M2 localStorage keys** (prediction/retrieval/
  transfer/optReading, plus aiPractice + priyaEmail if H7 is adopted) in
  CLAUDE.md and governance before use. Depends on H12.
- **H25. Stage 1 audience paragraph revision.** Owner-ruled (senior IDs) in
  the Fable session; needs an actual edit to Stage 1 UBD (1).docx, which is
  outside the Docs/*.md set — flag for manual edit, not a Claude Code task.
- **H26. Roadmap Foundation/three-track item (line 279) reframe.** Verified
  the item exists as described. Add a note that it's a future separate
  course for junior/mid-level IDs, not a tension in this credential, per the
  audience ruling.
- **H27. CLAUDE.md Do-Not list wording amendment (Decision 2a).** CLAUDE.md's
  existing language ("do not assume prior knowledge... define on first use
  per module") doesn't yet state the stronger rule Fable's Decision 2a
  proposes: framework/theory definitions live only in the hover glossary and
  optional enrichment, never as definitional sentences in instructional
  prose. M1 already complies in practice (verified: the one near-hit found in
  the FK/prose scan was ARCH-native content, not framework re-teaching) — this
  is a wording amendment to protect M2's learning-science content, not a
  behavior change.

### H.4 Grade-8 FK reading-level drift — verified, actionable cluster

Verified two ways: Fable ran DOM-aware extraction (excluding expert-exempt
containers) across all 40 scoreable M1 screens; I independently recalculated
FK on 3 of the flagged paragraphs with an offline heuristic method and landed
in the same range (19.3, 17.7, 21.3 against Fable's claimed 19.3-22.0 for that
cluster). 21 of 40 screens exceed FK 9.0 on instructional prose; 65 individual
paragraphs exceed FK 10. Actionable cluster, worst first:

| Screen | Aggregate FK | Worst paragraphs |
| --- | --- | --- |
| m1-l4b-s4 (guided practice) | 13.1 | Q1-Teachability/Q2-Assessability task setups, FK 19.3-22.0 |
| m1-overview | 12.8 | module-overview prose |
| m1-l1b-s4b (faded example) | 11.6 | scenario-context paragraphs, FK 15.8-20.5 (learner-facing setup, NOT expert-exempt) |
| m1-l1a-s1, m1-l1b-s1, m1-l3-s1 (lesson intros) | 11.6 each | purpose/step-preview paragraphs |
| m1-l4a-s4, m1-l4a-s5, m1-l4b-s6 | 10.5-10.6 | instruction/prompt paragraphs, FK 16-19 |

Diagnostic pattern: the worst screens are disproportionately content added
*after* the Prompt B reading-level rewrite (s4b faded examples from Prompt
C3, the l4b-s4/l4a-s4 practice tasks, the overview from C5) — Prompt B's
pass appears not to have been re-run on later additions. When actioned:
paragraph-level sentence-splitting on the flagged cluster only (the
≤20-word rule is the cheapest lever), never touching expert-exempt blocks,
then re-score. m1-l1a-s2's FK 14.3 is the Meridian brief itself — see H18
for the classification ruling on whether it's exempt by nature.

### H.5 Verified clean or already resolved this session — no action needed

- **Weinstein, Madan & Sumeracki (2018) and MIT Open Learning reading-card
  citations.** Verified against primary sources (search + direct page fetch)
  and against both ARCH_Method_Reading_Map_Tracker.xlsx and
  ARCH_Module2-4_Reading_Cards_DRAFT.md: both already carry the correct APA 7
  form (title-case journal name, "Article 2" locator, correct DOI; MIT page
  confirmed live with all three named course examples — Genetics 7.03,
  Physics 8.591, Materials Science 3.039). No edit needed.
- **External font/icon libraries (course-wide).** Verified clean across all
  48 HTML files AND global.css (the file Fable's own sweep couldn't reach):
  zero external `<link>`/`@import`/`@font-face`/CDN/icon-font references;
  only `system-ui`, `inherit`, and `monospace` font-family values.
- **Glossary term count and tagging arithmetic.** Verified by direct read of
  hoverGlossary.js: exactly 20 terms in TERMS. 14 tagged + 3 untagged
  violations (H16) + 3 unused (H17) = 20, confirmed.

### H.6 Verification flags — treat as hypotheses, not settled facts

From the companion ARCH_Verification_Checklist.md (now uploaded and read in
full):

- **Tier 2 (framework/theory claims to verify before repeating in designer
  notes, marketing, or interviews):** the expertise-reversal-effect
  extension ("a novel method's worked examples are safe even for domain
  experts" is Fable's synthesis, not a settled finding — verify against
  Kalyuga before attributing); the "architecture finding, not study-skills
  finding" framing of spacing/interleaving (an extension, not literature);
  "cognitive apprenticeship applied to the tool layer" (Fable's inference);
  "ZPD analysis as a design heuristic, not a measurement procedure" (fine,
  but a picky reviewer might probe it); the metacognitive-habituation-risk
  claim (uncited, walkthrough is the actual test); the Grade-8-for-experts
  rationale (defensible as a design position, not as a literature claim).
- **Tier 3 (Fable's own hypotheses, explicitly not verifiable from your
  materials):** "the 2026 market is saturated with prompt-tips... nobody
  else teaches constraint-governed, auditable AI-assisted architecture"
  (category-of-one — needs a real competitive scan, e.g. IDOL, ATD,
  university micro-credentials, before any marketing use); "employers choose
  credentials partly on AI relevance in 2026" (plausible, unverified);
  "optional is weakly protective for high-conscientiousness learners"
  (testable later with real telemetry, not now); the specific time/cost
  estimates in the report (+20-30 min, ~2-3 hrs, "90% of differentiation
  value at 10% of cost") — rhetoric, not measurement; do not use these
  numbers in planning documents.
- **Tier 1 reading-card claims not yet independently verified (M3/M4 only —
  M1 and M2 citations are cleared, see H.5):** Jahnke, Riedel, Singh & Moore
  (2021) — confirm the "195 problems in two online courses," "14
  sociotechnical-pedagogical heuristics," and "Scopus 87th percentile"
  characterizations before they ship in a designer note (percentiles drift
  yearly; date it or drop it); Smith & Luo (2024) — confirm the "interviewed
  six practicing IDs and design managers" claim; Lachheb & Boling (2021) —
  confirm the core/instrumental/framing judgment-types characterization
  matches the chapter's actual typology; Totino & Kessler (2024) — confirm
  "LEED" is the tool's actual name and its MIT Open Learning attribution.
- **Stage 2 quoted language** ("without external guidance," mastery
  threshold criteria, "selected-response formats intentionally excluded") —
  Fable paraphrased faithfully by its own account, but re-read Stage 2 §2 and
  §7 before quoting any of it in a public-facing artifact.
