# ARCH Method — Punch List for Next Session

Captured 2026-06-26 from screenshot review plus a code audit. Twelve raised
items, organized into a few systemic fixes plus targeted one-offs, with three
additional flags surfaced by the audit (Section F). Threads carried over from
today are at the bottom, so this is the single source of truth for tomorrow.

---

## Read this first

The single most urgent item is **F1 (dead module links → 404 on 63 screens)** —
do that first; it is a live bug, not cosmetic. After that, most of the rest are
not separate jobs. They collapse into three audits plus a handful of one-offs:

1. **Narrow first column / title wrap (Section A)** — almost certainly one root
   cause in the shared card/table CSS. Fix the pattern once, then spot-check.
   The highest-leverage cosmetic item; Carrie flagged it as "rampant."
2. **Uncollapse short callouts (Section B)** — convert Success Criteria and
   Expected Evidence from accordions to always-open, course-wide. This reverses a
   Prompt-F decision, so it carries a governance update.
3. **Bullet audit redo (Section C)** — find list content rendered without bullet
   markers.

Then four targeted one-offs (D), three structure items (E), and three audit flags
(F).

**Suggested order:** F1 → A → B → C → D one-offs → E → F2/F3. Lead with F1
(live 404), then A (most screens, shared fix).

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

- **A1. Decision Record tables** — left column too narrow; "Decision Statement,"
  "Constraint Reference," "Rationale" wrap. Widen so titles are one line.
  Course-wide (every MRHN-D-### record). *(Images 4/6)*
- **A2. DC-07 / DC-08 merge cards** — title wraps as "DC-07 and DC-" / "08."
  Widen the title cell so it stays on one line. Carrie flags this as rampant
  across tables course-wide — audit all tables for the same wrap. *(Image 9)*
- **A3. Teachability / Assessability question table** — left column ("Can this be
  taught as one instructional unit?") stretched thin. *(Image 1)*
- **A4. General two-column audit** — every two-column card/table: widen the left
  column so row headers fit one line where reasonable. A1–A3 are instances of
  this; fixing the shared pattern should resolve most of them at once.

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
- **Governance + cleanup notes:**
  - This reverses the Prompt-F decision "Success Criteria and Expected Evidence:
    collapsible by default." Update CLAUDE.md Visual Standards accordingly.
  - The `_criteriaOpen` / `_evidenceOpen` and `.success-criteria` open/closed
    persistence keys go vestigial once these are always-open. Remove them from
    the localStorage namespace in CLAUDE.md and the governance doc (same sync
    discipline as the task-1 cleanup).
  - This revisits the exact elements task 1 touched on the 5 GP screens — expect
    overlap there; the other 5 Success Criteria screens are new ground.

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
- **D3. SI-09 bucket analysis labels too small** — the teal section labels
  ("CALIBRATION ANNOTATION," "BUCKET 2 ARC CONSTRAINT," "WHAT YOU KNOW") are
  undersized. Increase the font a little. *(Image 8)*
  - **Color decision (from audit, see F3):** these same labels (`.ws-box-label`)
    are still teal, while today's pass moved the callout-label family to navy.
    Decide in this same pass whether they should go navy for consistency or stay
    teal as a distinct annotation tier.

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

- **F1. Dead "Coming Soon" module links → live 404 (do first).** The course nav
  links to `module-2.html` / `module-3.html` / `module-4.html`, which do not
  exist, via `<a href="module-2.html" aria-disabled="true" ...>`. `aria-disabled`
  is advisory only and does NOT stop an anchor from navigating, so clicking
  "Module 2/3/4" lands the learner on a 404. Footprint: **63 screens** (every
  learner-facing screen with the nav, including the 9 intro screens). Fix the one
  repeated pattern: render not-yet-available items as non-navigable (a `<span
  class="module-nav-link is-disabled" aria-disabled="true">` with no `href`, or
  strip `href` and add `tabindex="-1"`) so they announce as disabled and cannot
  be clicked. Highest priority on this list — accessibility + a hard broken link
  on every screen.
- **F2. Stale screen counts (data accuracy).** Two lessons undercount, in two
  places each:
  - Lesson 5 (`m1-l4a-s1`): chip "5 screens" (line ~571) and heading "Lesson 5:
    5 Screens" (line ~866) — actual is **6** (predates the `s3b` faded example).
  - Lesson 6 (`m1-l4b-s1`): chip "6 screens" (line ~575) and heading "Lesson 6:
    6 Screens" (line ~832) — actual is **7** (predates the s4/s5 split).
  - Connects to E2: removing the chips moots the chip half, but the lesson-plan
    *headings* still need correcting (or removing). If you keep counts anywhere,
    fix all four. Governance is the source of truth (6 and 7).
- **F3. Teal labels left behind by today's navy unification (a decision, not a
  defect).** After today's pass, the callout-label family is navy, but two
  uppercase labels in the same idiom are still teal: the module-overview phase
  label (`.overview-phase`) and the SI-09 annotation eyebrows (`.ws-box-label`,
  the Image 8 labels). May be an intentional annotation tier; decide whether to
  unify to navy or keep teal. Handle alongside D3 (same labels).

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
