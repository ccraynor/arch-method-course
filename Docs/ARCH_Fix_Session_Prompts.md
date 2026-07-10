# ARCH Module 1 Fix Session — Claude Code Prompt Pack
**Companion to:** ARCH_Credential_Comprehensive_Report.md (r2) §6 · 2026-07-09
**Covers:** blockers B1–B5, directed edits, minor items, and two post-ruling remediation prompts. Launch gates (CONFIRM 15–16) are decisions, not edits — they are not in this pack.

**How to use:** run prompts in order, one at a time, in a Claude Code session opened on the repo. Each prompt is self-contained: paste it verbatim, review the diff, commit per your hygiene rules (code and docs in SEPARATE commits; confirm hashes exist before logging DONE in the punch list). Where a prompt depends on a ruling you haven't made, it says so at the top — skip until ruled.

---

## Prompt 0 — Session setup (paste first, every session)

```
Read CLAUDE.md first. Then read Docs/ARCH_Build_Governance.md.
Do not build or edit anything yet. Confirm: current branch, clean working
tree, and the current Module 1 screen count via:
ls SRC/m1-*.html | wc -l ; ls SRC/intro-*.html | wc -l
This session is a Module 1 fix session (no new screens). Rules for the
whole session: show me a diff before every commit; code changes and
documentation changes go in separate commits; do not touch expert
think-aloud or expert-analysis content anywhere; never use em dashes or
double hyphens in learner-facing text; all colors from tokens.
```

---

## Prompt 1 — B1: m1-l2-s5b canon referent fix (code commit)

```
Open SRC/m1-l2-s5b.html. This screen's "Expert Analysis: All 16 Decisions"
prose was drafted against an earlier constraint/scope-item naming pass and
contradicts the Meridian canon. Make REFERENT-ONLY corrections; do not
rewrite, shorten, or restructure the analysis. The canon (verify each
against Docs/ARCH_Build_Governance.md established facts and the Lesson 2
constraint map in SRC/m1-l1b-s2.html / s3.html before editing):
- LC-1 = the 4-hour SME access cap (NOT a "seat time ceiling"). Fix every
  gloss of LC-1 on this screen accordingly, adjusting surrounding grammar.
- LC-3/LC-4 = SCORM self-paced delivery, 90-day window (NOT "blended
  delivery"). The course canon EXCLUDES synchronous delivery. Rewrite the
  sentence fragments "blend of asynchronous scenario work and synchronous
  debrief" and "the LC-4 blended model keeps simulations out of active
  clinical systems" to be consistent with self-paced online delivery,
  preserving each sentence's analytical point (budget fit; simulations
  kept out of live clinical systems).
- SI-01 = Tier 1 Protocol Execution (NOT "reporting triggers").
- SI-09 = Network Segmentation Procedures (NOT "evidence handling" --
  evidence preservation is SI-11).
- SI-16 = Incident Severity Classification (NOT "scope classification").
Search the ENTIRE file for: "seat time", "blended", "synchronous",
"reporting triggers", "evidence handling", "scope classification" and fix
every instance. Then run the same six searches across ALL SRC/m1-*.html
files and report any hits outside this file (expected: none; the
community-college spotlight in m1-l1b-s4b legitimately uses its own LC-1
"under 5 hours weekly" -- leave that alone).
Show me the full diff before committing.
```

---

## Prompt 2 — B2: skip-link documentation fix (docs commit)

```
Do not change any HTML. The BUILT standard is four skip links (Main
Content, Current Activity, Progress Tracker, Artifact Reference) because
Decision History was deferred in Accessibility Spec v5.2. Two governing
documents still say five. Fix the DOCS to match the build:
1. Docs/ARCH_Module2_Build_Checklist.md: the "five semantic landmarks /
   all five skip links" items -- change the skip-link item to the
   four-link set and remove "Decision History" from it.
2. CLAUDE.md Accessibility Build Standard: same change to the skip-link
   list; also update the artifactDrawer note that calls Decision History
   "the only header-triggered overlay for that group" so it reflects the
   v5.2 deferral (Decision History is deferred, not present).
3. Add one line to each edited section: "Four skip links per Accessibility
   Spec v5.2 (Decision History deferred; restore to five only if a future
   module reintroduces it)."
Verify afterwards: grep -rn "Decision History" CLAUDE.md Docs/ -- every
remaining mention should be about the deferral, not a requirement.
Show me the diff before committing.
```

---

## Prompt 3 — B3: Stage 3 reconciliation rulings (docs commit)

```
Record three reconciliation rulings. The Stage 3 source is a Word document
maintained outside the repo, so record the rulings in the repo's governing
docs; I will correct the Stage 3 docx separately by hand.
1. Module 2 screen count: RULED 25 lesson screens (2.1=5, 2.2=6, 2.3=6
   including the faded example, 2.4=8). The Stage 3 screen-inventory
   table's "24" is superseded. Update the Module 2 build target in
   Docs/ARCH_PostLaunch_Roadmap.md if it disagrees, and add the ruling to
   the Module 2 artifacts section of Docs/ARCH_Build_Governance.md.
2. Step mapping: RULED that the canonical Phase/Step dictionary governs.
   Lessons 2.3 and 2.4 are Phase 4, Step 11. The Decision Point Catalog's
   "Step 12"/"Step 13" labels for L2.3/L2.4 are stale. Record in
   governance.
3. Spaced-repetition callback swap: RULED. 2.3 <- decomposition /
   bucket-to-unit traceability at Evaluation level; 2.4 <- calibration /
   cognitive-load management at Evaluation level. Update the callback
   drafts in Docs/ARCH_Build_Governance.md AND the Module 1 concept
   reappearance schedule table in CLAUDE.md IN THE SAME COMMIT (they are
   dual-sourced and must not diverge). Keep the standing caveat: verify
   against actual Module 2 content at build.
Show me the diff before committing.
```

---

## Prompt 4 — B4: HIPAA fixes
**Pre-step (yours, not Claude Code's): verify both claims against the eCFR** — (a) 45 CFR 164.404 sits under the Breach Notification Rule (Subpart D), not the Security Rule; (b) HIPAA's individual-notification outer limit is 60 days from discovery, and no 72-hour federal HIPAA clock exists. Only proceed once you've confirmed.

```
Part A (docs commit): In Docs/ARCH_Build_Governance.md established facts
(and CLAUDE.md if mirrored), the line "HIPAA Security Rule 45 CFR 164.308
and 164.404" mislabels 164.404. Change to: "HIPAA Security Rule 45 CFR
164.308(a)(5); HIPAA Breach Notification Rule 45 CFR 164.404". Do not
change any screen for Part A -- the built screens already label these
correctly.

Part B (code commit): The phrase "HIPAA 72-hour breach notification
clock" (and variants attributing a 72-hour clock to HIPAA) appears in
these files: m1-l2-s2, m1-l2-s3, m1-l3-s2, m1-l3-s3, m1-l3-s4, m1-l4a-s2,
m1-l4a-s4, m1-l4b-s2, m1-l4b-s3. HIPAA's actual outer limit is 60 days
from discovery; the 72-hour clock must be re-attributed to Meridian's
internal IR-2024 protocol. For EACH instance:
- Keep the 72-hour clock itself (it is a legitimate internal-protocol
  requirement and SI-10's premise).
- Re-attribute: e.g. "the IR-2024 72-hour internal notification clock"
  or "IR-2024's 72-hour notification requirement (stricter than HIPAA's
  60-day outer limit)". Use the parenthetical ONCE per lesson at the
  first mention, not on every instance.
- Preserve untouched everything about the 164.404 "discovery /
  reasonably should have known" trigger -- that content is correct.
- Do not edit expert think-aloud blocks' reading level; referent fixes
  only.
List every instance with before/after before committing. After the edit,
verify: grep -rn "HIPAA 72" SRC/ returns nothing, and grep -rn "72-hour"
SRC/ shows only IR-2024-attributed instances.
Also update the SI-10 title/description wherever it names the clock
(check m1-l3-s3's calibration table) to the IR-2024 attribution.
```

---

## Prompt 5 — Citation authority reconciliation (docs commit + one manual task)

```
RULED: built course citations are authoritative; the tracker and companion
carry errors.
1. Docs/ARCH_PostLaunch_Roadmap.md and any reading-cards draft doc: find
   the statements that say the xlsx tracker "governs if they ever
   diverge" and invert them: "The built course citations are
   authoritative; the tracker is a convenience index and must be
   corrected to match the course."
2. Add to Docs/ARCH_Build_Governance.md reading-enrichment section the
   authority order: built course > tracker > companion guide.
3. If python3+openpyxl is available, correct
   Docs/ARCH_Method_Reading_Map_Tracker.xlsx Drysdale row to match the
   live m1-l2-s6 card exactly: "Drysdale, J. T. (2019). The collaborative
   mapping model: Relationship-centered instructional design for higher
   education. Online Learning, 23(3), 56-71." Keep the DOI. If the
   companion guide markdown is in the repo, fix its Drysdale entry
   (23(4) -> 23(3), title) and its Stefaniak entry ((n.d.) -> the
   edition/year the live card uses).
Show me every change before committing.
```

---

## Prompt 6 — Minor items (one small code commit + one docs commit)

```
1. SRC/m1-l1b-s1.html "What You Will Produce": this lesson produces the
   constraint map and Output Style Gate conventions -- the full "MRHN
   Bucket Map and Scope Organization Package" is the Task 1 package that
   accretes across the module (the Bucket Map artifact itself is Lesson
   3). Rewrite the block to say the learner BEGINS the package here and
   names the constraint map as this lesson's output. Keep it to the same
   length and reading level.
2. m1-l3-s3 time label reads "20-25 min" but SCREEN_TIME_MAP's worked
   example range is 12-18. Decision: [PICK ONE BEFORE RUNNING --
   (a) record it in governance as a named exception for the double-lens
   worked example, or (b) re-derive the estimate]. Implement whichever I
   marked.
3. m1-overview.html carries one skip link where lesson screens carry
   four. Check whether the overview has the four target regions; if yes,
   add the standard four; if intentionally reduced, record the exception
   in governance instead.
```

---

## Prompt 7 — B5: decision-point ruling (RUN ONLY AFTER YOU RULE)
**The ruling:** Template 4 (discrete Decision Point With Branching screens, option counts fixed now) **vs** M1's absorb-into-guided-practice pattern. Pack includes both variants — delete the one you don't use.

```
VARIANT A (Template 4): Record in Docs/ARCH_Build_Governance.md and
CLAUDE.md: Module 2 decision points 2.1.4 and 2.2.4 are built as discrete
Decision Point screens per Stage 3 Template 4 (never built in Module 1).
Option counts are fixed NOW as: 2.1.4 = [N] options, 2.2.4 = [N] options
[SET BEFORE RUNNING]. Update the CLAUDE.md rule "fixed option count per
the Stage 3 Decision Point Catalog" to reference this governance table
instead, since the catalog carries no counts.

VARIANT B (M1 pattern): Record in both docs: decision points continue the
Module 1 pattern (decision interactions embedded in guided practice with
branching feedback; no discrete Decision Point screen type). Restate the
CLAUDE.md rule as: "Decision interactions must implement the catalog's
decision question and scoring dimension exactly; interaction format
follows the Module 1 guided-practice pattern." Note that Stage 3
Template 4 is retired unless a future module revives it.
```

---

## Prompt 8 — Glossary fixes (RUN ONLY AFTER CONFIRM #12 RULING; code commit)

```
Per the Module 1 glossary sweep: three of the 20 governed terms appear in
visible prose with no span.gls tag anywhere in Module 1, and three never
appear at all.
1. Tag first INSTRUCTIONAL uses (not artifact-document text, not expert
   think-aloud):
   - competency: first instructional use (candidate m1-l1a-s3; the
     m1-l1a-s2 hit is inside the Meridian brief artifact -- do not tag
     artifact text). Also check m1-l4b-s2 (14 occurrences) -- tag the
     first on that screen only if no earlier instructional use exists.
   - dependency: first use m1-l3-s2 (bare "dependency", distinct from the
     already-tagged prerequisiteDependency).
   - formative assessment: m1-gate-s1 ("formative checkpoint
     architecture") -- tag "formative" there or waive with a governance
     note if artifact-adjacent [I will mark which].
   Use the exact data-gls-term keys from js/scaffolds/hoverGlossary.js;
   confirm each key exists in the TERMS object before tagging; confirm
   TERMS contains all 20 governed terms and report any missing.
2. CBE, summative assessment, scope creep never appear in Module 1 prose:
   add a note to the governance glossary section that their first tagged
   use is deferred to Modules 2-4, so future builders don't think it was
   missed.
One tag per term per module (first use only). Show diffs before commit.
```

---

## Prompt 9 — FK remediation pass (RUN ONLY AFTER CONFIRM #13 RULING; code commit)

```
Reading-level pass on a FIXED list of screens only -- do not expand scope:
m1-l4b-s4 (worst: four task-instruction paragraphs ~FK 19-22),
m1-l1b-s4b (scenario-context paragraphs), m1-overview, m1-l1a-s1,
m1-l1b-s1, m1-l3-s1 (intro purpose/preview paragraphs), m1-l4a-s4,
m1-l4a-s5, m1-l4b-s6 (instruction/prompt paragraphs).
Rules:
- Sentence-splitting and simplification of INSTRUCTIONAL prose only:
  target <=20-word sentences, active voice, second person.
- NEVER touch: expert think-aloud/annotation blocks, expert-analysis
  content (fb-* classes), the Meridian brief artifact text (m1-l1a-s2),
  reference-answer content, citations.
- Do not remove identifiers (DC-xx, RC-x, SI-xx) or criteria names (Q1
  Teachability etc.) -- split around them.
- Preserve meaning exactly; where a sentence resists splitting without
  changing meaning, leave it and list it for my manual pass.
Work one screen at a time; show me each screen's diff before moving on.
After all screens: report before/after FK per screen (compute on the
same instructional-prose extraction basis, excluding expert blocks).
```

---

## Acceptance sweep (paste after all commits, end of session)

```
Run and report:
1. grep -rn "seat time\|blended\|synchronous debrief" SRC/m1-*.html  (expect: none)
2. grep -rn "HIPAA 72" SRC/  (expect: none)
3. grep -rln "Skip to Decision History" SRC/ CLAUDE.md Docs/  (expect: none as a requirement)
4. grep -c 'class="skip-link"' SRC/m1-l1a-s1.html  (expect: 4)
5. Confirm CLAUDE.md and governance spaced-repetition tables agree on 2.3/2.4.
6. Lighthouse (Desktop) on every touched screen -> 100.
7. Update ARCH_PunchList_NextSession.md: mark each item DONE with its real
   commit hash, past-tense body, per punch-list hygiene.
```
