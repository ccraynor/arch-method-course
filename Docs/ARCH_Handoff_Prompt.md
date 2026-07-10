# HANDOFF PROMPT — paste everything below the line into the new session

---

You are picking up an in-progress build of the **ARCH Method Practitioner Credential** (Proof Point Learning): a self-paced HTML practitioner credential for **senior instructional designers**, Module 1 built and live, deployed to Vercel. Your job in this engagement, in order: (1) close out the uncommitted Module 1 fix work, (2) build **Module 2: Engineer the Learning** to an existing, locked specification. A prior working session produced a complete analysis, validation of all 47 built Module 1 files, and a build-ready Module 2 spec — you are executing, not re-deriving.

## Read first, in this exact order — all binding
1. `CLAUDE.md` (repo root) — build instructions.
2. `Docs/ARCH_Build_Governance.md` — decisions register; read alongside CLAUDE.md every session.
3. `Docs/ARCH_Credential_Comprehensive_Report.md` — the master document from the prior session. **Section 3 is the build-ready Module 2 spec (screen-by-screen). Section 2 = the five decisions. Section 6 = findings, blockers, and the CONFIRM register. Section 8 = task bookmark and ordered plan.**
4. `Docs/ARCH_Module2_Build_Checklist.md` — the per-screen gate; run on every new screen.
5. `Docs/ARCH_Fix_Session_Prompts.md` — prewritten fix prompts; only Prompts 7–9 remain relevant (they are GATED on owner rulings — do not run unprompted).

## Where things stand right now
**The working tree has uncommitted changes** (verified correct by the prior session; review diffs, then commit). **Trust `git status` over this list** — the owner was committing batches in parallel at handoff time, so some of the following may already be in. Files that were changed and verified across the fix sessions:
- `SRC/m1-l2-s5b.html` — H1 canon fix (LC/SI referent corrections). Fully verified including a complete 16-scope-item referent audit against canon; the SI-09/SI-11 inversion flagged in an earlier session is confirmed resolved. Safe to commit under the H1 message.
- `SRC/m1-l1b-s1.html` — artifact copy fix ("begins/first component" instead of "produces" the Task 1 package).
- `SRC/m1-l1b-s4b.html` and `SRC/m1-l3-s2.html` — glossary first-use tags (competency, dependency).
- `CLAUDE.md`, `Docs/ARCH_Build_Governance.md`, `Docs/ARCH_PostLaunch_Roadmap.md`, `Docs/ARCH_Module2-4_Reading_Cards_DRAFT.md` — B3 rulings (callback swap, 25-screen count, Step-11 mapping), citation-authority flip, B5 decision-point restatement, AI-pilot key registration, glossary coverage ruling, and the Session Rulings block.
- Four new untracked docs: the Comprehensive Report, Fix Session Prompts, Verification Checklist, and this handoff prompt (include in the docs commit).

**First task:** show me the diffs, commit in two batches per hygiene (code commit: the two SRC files; docs commit: everything else), run Lighthouse (Desktop → 100) on the two touched screens, then log punch-list Section H entries with the real commit hashes (confirm hashes exist before writing DONE; past-tense bodies).

**Already committed in prior sessions (do not redo):** skip-link docs aligned to the four-link standard; HIPAA 164.404 relabeled Breach Notification Rule; the 72-hour clock reattributed to MRHN's internal IR-2024 protocol (verified against eCFR: HIPAA's actual limit is 60 days from discovery); Stefaniak citation reconciled to the 2025 edition.

## Owner rulings — settled, do not reopen
- **Audience:** senior IDs (Apply/Analyze; can apply frameworks, not merely recognize them). Overrides older wider-audience language in Stage 1. A separate course for junior/mid-level IDs may exist later.
- **Citation authority:** built course citations > tracker xlsx > companion guide. Correct the tracker to match the course, never the reverse.
- **Spaced-repetition callback swap (2026-07-09):** 2.3 ← decomposition/bucket-to-unit at Evaluation; 2.4 ← calibration/cognitive-load at Evaluation. Both CLAUDE.md and governance are updated and must never diverge. Verify final wording against actual M2 content at build.
- **Module 2 = 25 lesson screens** (2.1=5, 2.2=6, 2.3=6 incl. faded s2b, 2.4=8); **2.3/2.4 = Phase 4, Step 11** (canonical dictionary governs; the Decision Point Catalog's Step 12/13 labels are stale).
- **AI workflow = portfolio strategy:** assessed tasks stay 100% tool-agnostic; the AI story lives in a "Behind the Build" case study and a scrubbed prompt-library artifact (outlines/drafts exist outside this repo). A single optional AI-practice disclosure on the Lesson 2.1 reflection screen is RECOMMENDED but not yet decided (see open decisions).
- **Register rule for M2 prose (critical):** Module 2's subject is learning science — the highest expertise-reversal risk for this audience. Model the DECISION (where/when/why-here on the Meridian architecture), never tutor the principle (what spacing is). The template is m1-l3-s3's taxonomy handling: one-line operational key per lever, all remaining words on population-relative judgment. Definitions live ONLY in `span.gls` hover-glossary markup, never as definitional sentences in instructional prose.

## Rulings added 2026-07-09 (same-day follow-up; recorded in governance "Session Rulings" section — do not reopen)
- **B5 RULED — Module 1 pattern:** decision points stay embedded in guided practice with per-option branching feedback; no discrete Decision Point screen type; Template 4 retired. CLAUDE.md's decision-point rule is already restated. 2.1.4/2.2.4 are unblocked.
- **AI-practice pilot RULED IN:** one optional disclosure on m2-l1-s5 (optional-reading card pattern; key `archMethod_aiPractice_m2l1_open` already registered in CLAUDE.md + governance). Content is owner-drafted.
- **Glossary DONE:** competency tagged at m1-l1b-s4b (first design-sense use), dependency at m1-l3-s2; CBE / formative assessment / summative assessment / scope creep deferred to first verbatim use in M2–4 (governance note exists). These two SRC edits are part of the pending code commit.
- **FK remediation APPROVED:** run Fix Pack Prompt 9 on the nine-screen cluster, full per-screen diff review; expert-exempt content untouchable.

## Remaining open decisions — ASK ME before building the affected screens (report §6.4)
1. localStorage key scheme for M2 lesson-scoped keys (continue l7–l10 vs module-scoped).
2. Lesson 2.2 sixth-screen allocation (spec recommends a second guided practice: the Spiral Reinforcement Map).
3. Lesson 2.4 eight-screen composition, incl. how Task 2 onboarding/submit maps to M1's Task 1 pattern.
4. Show Expert Reasoning toggle × Layered Architecture Annotation Panel interplay on m2-l3-s2 (panel routes through panelManager.js as `annotationPanel` — already an allowed value).
5. Reading-card hosts (recommended split: Weinstein et al. 2018 on the 2.2 reflection; MIT Open Learning on the 2.4 reflection; snippets are ready in `Docs/ARCH_Module2-4_Reading_Cards_DRAFT.md`).
6. Provisional celebration text overriding the PathPoint deferral.
7. Retrieval warm-up two-lessons-prior convention at the module boundary.

## Module 2 build
Follow report **Section 3 exactly** — screen-by-screen tables per lesson, approved ZPD tiers (2.1 Full Support → 2.2 Guided → 2.3 Monitored + faded example → 2.4 Monitored), locked spotlight contexts (State Ed Agency / Community College / Corporate / Hospital), narrative beats (SME character introduced via Priya email in 2.1; SME hours are 2.5 everywhere in M2), and the hard content lock: **Lesson 2.3's worked example builds the canonical six-unit architecture (Units 1–5 + Unit 6 Integrated Simulation) — Module 3's diagnostics depend on that exact shape; it is locked content, not discretion.**

Build order: complete the 18-item Module 2 Pre-Build Checklist in governance → `m2-overview.html` FIRST (with the Performance Task 2 preview) → verify SME gate 1.TG.1 status → lessons 2.1 → 2.2 → 2.3 → 2.4 (complex branching screens first within their lessons) → hubs after all lesson screens (verify counts) → `m2-gate-s1` last.

**Never invent (ask me for):** PT2 preview exemplar excerpt, celebration text, Priya email content, retrieval warm-up questions, prediction prompts, final callback wording, Context Panel content per lesson tier, gate governance-record review criteria, and the AI-practice disclosure content if adopted. The full drafting list is report §3.6.

## Standing working rules
Diff before every commit; code and docs in separate commits; Lighthouse (Desktop) → 100 before any screen is done; build only from the verified `*-template.html` files; register every new localStorage key in CLAUDE.md + governance BEFORE use; four skip links (Decision History deferred per Accessibility Spec v5.2); no em dashes, no double hyphens in learner-facing text, never "Stage" terminology or "IRMA" in learner-facing content; expert think-aloud text stays at practitioner register — never rewrite it for reading level.

**Out of scope for the M2 engagement** (launch gates, tracked in report §6.4 items 15–16): the credential-verification/artifact-export decision and the scoring-anchor development — do not let these block the build.
