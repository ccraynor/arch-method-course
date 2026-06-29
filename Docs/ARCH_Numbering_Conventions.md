# Numbering & Structure Conventions — Rationale / Reference

The "why" behind the settled numbering and structure decisions, so a future builder
understands the DECISIONS and does not re-derive or accidentally reverse them. This is
reference, not operational rules — the per-screen check-as-you-build rules live in
**Docs/ARCH_Module2_Build_Checklist.md**; this doc records rule + rationale + what was
rejected/changed. Sourced from CLAUDE.md, Docs/ARCH_Build_Governance.md, and the D-item
history (D6 / D9 / D10) in Docs/ARCH_PunchList_NextSession.md.

---

## 1. The breadcrumb is the SINGLE content-area lesson number
**Rule:** The per-screen breadcrumb ("Module N > Lesson N > N.n", e.g. "Module 1 >
Lesson 5 > 5.2", JS-injected by breadcrumb.js, incrementing per screen) is the only
lesson number in the content area.

**Rationale:** It increments per screen (sourced from SCREEN_MAP, shared with the
tracker so they never diverge), gives clean ordinal wayfinding, and is a single source
of truth a learner reads in one place.

**What was rejected / changed (D6 arc):** Module 1 reached a state with **three
conflicting numbers on one screen** — the content eyebrow said "Lesson 5", the header
tracker said "1.4a", the breadcrumb said "5.2". D6 first *combined* the eyebrow with the
ARCH ID ("Lesson 5 • 1.4a", commit 9d0d2a4) to stop the eyebrow and tracker reading as
unrelated. A screenshot review showed that still left three numbers. The decision was
**reversed**: remove the eyebrow entirely (D9, commit 82a4b58), leave the breadcrumb
as the one content-area number, and let the tracker show the ordinal. (D6 is the
mismatch finding and decision-reversal; D9 is the removal that resolved it.) Do not
reintroduce a second content-area lesson number.

## 2. Learner-facing lesson numbers are sequential; ARCH designations live in filenames
**Rule:** Learners see sequential numbers (Lesson 1-6). The internal ARCH designations
(1.1a, 1.1b, 1.2, 1.3, 1.4a, 1.4b) appear only in filenames and the build crosswalk.

**Rationale:** The ARCH structure splits some lessons (1.1→1.1a/1.1b, 1.4→1.4a/1.4b for
distinct screen-sets); exposing "1.4a" to learners is noise. Sequential ordinals are
the clean learner-facing scheme; the lettered ARCH IDs stay where the build needs them
(filenames + the numbering crosswalk in CLAUDE.md / governance).

**Crosswalk (single source of truth):** Lesson 1=1.1a (m1-l1a), 2=1.1b (m1-l1b),
3=1.2 (m1-l2), 4=1.3 (m1-l3), 5=1.4a (m1-l4a), 6=1.4b (m1-l4b). Modules 2-4 have no
split, so ordinal and ARCH ID coincide (2.1-2.4 etc.) and the question disappears.

## 3. No `.lesson-label` eyebrow
**Rule:** Screens carry no `.lesson-label` content-area eyebrow.

**Rationale:** It was the *third* conflicting number in the D6 episode and duplicated
what the breadcrumb already says.

**What was changed (D9, commit 82a4b58):** Removed from all 38 Module 1 screens + 7
templates, along with the dead CSS (per-screen `.lesson-label` rules + the global
`.lesson-label` / `.lesson-label__id` rules), plus the 7 template "update lesson label"
comments so Module 2 screens built from templates cannot reintroduce it. The `<title>`
"Lesson [X.X]" metadata placeholders were deliberately KEPT (legitimate page-title
field, not the eyebrow).

## 4. "Page N" in learner-facing prose, not "Screen N"
**Rule:** Learner-facing prose, learner-facing JS strings, and AT-announced aria-labels
use "Page N" / "page". "Screen" is retained only where it is not learner-facing copy.

**Rationale:** "Page" is the natural unit word for a learner; "Screen N" read as
developer/internal language. The rename covered visible prose, learner-facing JS
(banners, announcers, feedback, compareExpert labels), and aria-labels for
visible/AT-announced consistency (supports the AA claim).

**Deliberately LEFT as "screen" — do not "fix" these:**
- Code identifiers: `screen-type-label`, `pt-screen`/`pt-screen-total`, `SCREEN_MAP`,
  `screenId`, `data-screen-id`, `.screen-nav`, filenames.
- The runtime-replaced **"Screen N of M" tracker fallback markup** — invisible to JS
  users (trackerRedesign.js rebuilds it as "N.n of M" with no unit word); renaming it
  changes nothing visible.
- The **"screen reader"** term (accessibility vocabulary).
- HTML comments, `<meta name="description">`, and template-instruction placeholders.

## 5. Header tracker uses the ordinal scheme
**Rule:** The header progress tracker shows the ordinal ("Lesson X" + position
"X.Y of N", e.g. "Lesson 5 · 5.2 of 6"), rendered by trackerRedesign.js from
LESSON_LABEL_MAP + SCREEN_MAP.

**Rationale:** Matches the breadcrumb's ordinal scheme; no ARCH ID is visible to clash
with it. At runtime trackerRedesign.js re-appends the old `#pt-lesson` "1.4a" span as
`class="sr-only" aria-hidden="true"` backward-compat plumbing — invisible to both
sighted users and AT, but on a LIVE code path: trackerRedesign.js reads `#pt-lesson`
to preserve it (lesson screens), and `components/progressTracker.js` writes it on the
intro screens (which import it via persistentStepTracker.js). Not dead — see D12.

**What was found (D10):** the "switch the tracker from ARCH ID to ordinal" task turned
out to be **already satisfied** by trackerRedesign.js — no code change was needed; the
ARCH ID had not been visible since the redesign. (The `#pt-lesson` plumbing is
live backward-compat, not dead -- D12 verified there is no safe cleanup.)

## 6. File naming + ARCH-designations-in-filenames-only
**Rule:** `m[module]-l[lesson]-s[screen].html` (e.g. m2-l1-s1.html; transition gate
m1-gate-s1.html; intros intro-0.N.html). Lettered ARCH suffixes (l1a/l1b) are used in
filenames where a lesson is split; Module 2 uses unsplit m2-l1..m2-l4 (the Nth lesson is
2.N), adding an a/b suffix only if a future lesson is split.

**Rationale:** Filenames carry the precise ARCH structure for the build; the learner
never sees them, so the lettered IDs do no learner-facing harm there. This is the one
place ARCH designations are allowed.

---

## Cross-references
- Operational per-screen rules (the check-as-you-build gate): **ARCH_Module2_Build_Checklist.md**
- Numbering crosswalk (single source of truth) + lesson-numbering note: **CLAUDE.md**
  (Module 1 Lesson-Numbering Crosswalk) and **ARCH_Build_Governance.md**
- D-item decision history (D6 reversal, D9 removal, D10 resolution, D12 cleanup):
  **ARCH_PunchList_NextSession.md**

## Reconciliation note
- The CLAUDE.md + governance crosswalk paragraphs were reconciled to the resolved state
  (tracker shows the ordinal; ARCH ID "1.x" sr-only/aria-hidden). Convention 5 here
  matches them; no stale "open Phase-2" copy remains in either doc.
