# ARCH Method Practitioner Credential
## Comprehensive Design Analysis & Module 2 Build Report — Final Edition, Revision 2

**Prepared for:** Carrie Raynor, Proof Point Learning
**Date:** 2026-07-09 (r2, same day)
**Status:** Supersedes r1 and the working brief. This revision integrates: (a) the owner's audience ruling, (b) the portfolio reframe of the AI-workflow decision, (c) the adversarial review and sycophancy self-audit with their amendments applied to the diagnosis itself, and (d) the full task bookmark. Companion document: `ARCH_Verification_Checklist.md`.

**Owner rulings recorded this revision (authoritative):**
1. **Audience:** This credential is for **senior instructional designers** (Apply/Analyze; can apply frameworks, not merely recognize them). The wider-audience language in Stage 1 and CLAUDE.md is overridden; a separate course for junior/associate and mid-level IDs may be written later. Stage 1's audience paragraph is now a directed revision, not an open question.
2. **Citation authority:** The **built course citations are authoritative**. The tracker (and Enrichment Companion) carry the errors and will be corrected to match the course. This *reverses* the authority order currently written in the roadmap and reading-cards draft ("the xlsx governs") — that statement must be flipped in those docs.

**Corpus analyzed (complete):** Stage 1 UbD/ECD · Stage 2 Assessment Package (Final) · Stage 3 Production Spec incl. §18 · ARCH Prompt Library (SSD) · Build Governance · Module 2 Build Checklist · Numbering Conventions · Scenario Architecture v1.2 · Reading Map Tracker · M2–4 Reading Cards Draft · Reading Enrichment Companion · Post-Launch Roadmap · Punch List (2026-06-28) · Accessibility & Inclusion Plan v5.2 · CLAUDE.md · all 47 built Module 1 files (Lessons 1–6 incl. faded examples, hubs, gate, overview, intro-0.1–0.9, templates).

---

# 0. Executive Summary

1. **The credential is a portfolio piece first, and that decides the AI question.** The full AI-assisted workflow belongs in a separate course *in principle* — but with a job search on and momentum uncertain, deferring your most differentiating capability to a course that may never ship is bad portfolio strategy. Revised strategy: a public **"Behind the Build" design case study** linked from the landing page (where reviewers actually look), the **de-branded prompt library as a standalone portfolio artifact**, and optionally **one pilot AI-practice disclosure** in Module 2. Assessed tasks stay 100% tool-agnostic. (Section 1.)
2. **Audience is now ruled: senior IDs.** With that ruling, the expertise-reversal frame for calibration is confirmed as the right frame, Stage 1's audience paragraph becomes a directed edit, and the Foundation-track roadmap item is correctly understood as a *future separate product*, not a tension in this one. (Decision 5.)
3. **The cognitive-load verdict, honestly sized after self-audit:** what the materials prove is that Module 1's written scaffolding is internally coherent, aimed at judgment rather than comprehension, and free of framework re-teaching — verified across all six built lessons. What remains genuinely open is the *experiential* layer: the cumulative intro ritual across 21 lessons, the self-report apparatus, and tone at module scale. Those are walkthrough questions, not settled findings. (Section 4, amended per Section 7.)
4. **Three blockers + one content fix stand before the Module 2 build session**, all cheap: the m1-l2-s5b canon defect, the skip-link doc inconsistency, the Stage 3 reconciliation, and the mislabeled HIPAA citation. (Section 6.1.)
5. **The Module 2 spec (Section 3) is build-ready and CLAUDE.md-verified** — 25 lesson screens, screen-by-screen, with tiers, scaffolds, card placements, narrative beats, and the drafting list only you can author.

---

# 1. Q2 — The Paper / Practiced / Taught Gap

## 1.1 The gap, precisely characterized

Three versions of ARCH exist in your materials, unequally represented in the course:

| Version | Where it lives | What it is |
|---|---|---|
| **ARCH on paper** | Stage 1–3 UbD docs; Phase/Step dictionary (Steps 0–20 + Freeze) | A constraint-governed design workflow: phases, steps, decision rules, governance records |
| **ARCH as practiced** | Prompt Library (SSD) | The same skeleton executed as an AI-assisted pipeline: staged prompts, purpose-built agents, binding Constraint Digests, Output Style Gates, Snapshot Protocols, Assumption Logs, Human-First/Human-Last checks |
| **ARCH as taught** | Built Module 1 + Stage 3 spec | The paper version only; every step executed manually against Meridian |

Two facts make the gap consequential. First, **the practiced version is ARCH's governance discipline applied to AI itself** — binding digests, snapshot versioning, no-invention rules, assumption logs, human attestation gates. That is the answer to the question every senior ID is asking in 2026: how to use AI in design work without losing scope fidelity, traceability, and defensibility. Second, **Stage 1 already claims the course demonstrates "applied AI fluency"** — currently an autobiographical claim (how the course was built), not a pedagogical one (what anyone learns). Don't ship the gap: either make the claim true somewhere visible, or soften it.

Structural note: the prompt library's Design Agent Suite (Stages 0–21) maps one-to-one onto the taught Steps 0–20 + Freeze; its Development Agent Suite (Stages 22–27) maps onto the scope Stage 1 explicitly reserves for future learning experiences.

## 1.2 The options, at their strongest

**A — Capstone/meta-layer (post-freeze reveal):** construct purity plus a discovery-moment payoff at course scale; the learner earns the full mental model, *then* sees the AI-accelerated version and why the governance they just learned makes it safe. Sequencing matches the gradual-release arc. Weakness: invisible to anyone who doesn't finish; can't be honestly marketed.

**B — Woven through from Module 2:** cognitive apprenticeship demands the *actual* expert practice be visible, and that practice is AI-assisted; M2's steps (sequencing, spiral density, learning-science optimization) are where AI leverage and AI failure modes are both clearest. Weakness at full strength: construct contamination if assessed, collision with locked architecture, tool volatility, added load in the highest-load module, and a motivation risk — showing mid-formation learners that the expert delegates the step they're grinding through.

**C — Separate companion course:** own credential claim, own update cadence, volatility quarantined, clean prerequisite ladder (manual competency IS the audit skill). Weakness: leaves the flagship feeling dated in the year that matters, and — decisive here — depends on a product that may never exist.

## 1.3 Differentiator or distraction — the line

As **demonstrated expert practice**, governed AI use is a genuine differentiator (with the caveat that my "category-of-one / market-saturation" claims are unverified market assertions — see Verification Checklist, Tier 3). As **assessed competency**, it is a distraction: it would invalidate the "without external guidance" evidence statements, date the credential to a toolchain, and create tool-access equity problems. Whatever is done, AI appears at the worked-example layer, never the task layer.

## 1.4 Recommendation — revised for the portfolio reality (2026-07-09)

The credential is a portfolio piece; its deciding audience — hiring managers and senior peers — will read the landing page, skim one lesson, and judge. They will never meet content buried in Module 4 or in a hypothetical future course. Therefore:

1. **Protect completion above everything.** An unfinished credential is the worst portfolio outcome. Nothing about the AI layer competes with shipping Modules 2–4. The companion course drops out of planning assumptions entirely (revisit only if post-hire momentum allows).
2. **"Behind the Build" design case study** — one public page linked from the landing page showing how the credential itself was designed and built with the governed AI workflow: the Constraint Digest binding downstream stages, the Snapshot Protocol catching drift, Human-First/Human-Last checks, one real before/after where your judgment overrode the model. Highest visibility per authoring hour; touches zero locked architecture; makes the Stage 1 claim true. *(Bookmarked: outline to be drafted.)*
3. **De-branded prompt library as a standalone portfolio artifact** — scrubbed of WGU references and chatgpt.com links, tool-agnostic vocabulary. It is the most direct answer to "how do you actually work with AI?" *(Bookmarked: scrub pass.)*
4. **One pilot AI-practice disclosure** in Module 2 (Lesson 2.1 reflection screen, optional-enrichment pattern: `<details>` + `data-optional-enrichment`, registered persist key, Skip label, Focused-Practice and tracker exclusion, no hyperlinks). Three beats: the genericized Step 9 prompt → a short AI-output excerpt you draft → the expert's Human-Last audit (what was kept, what was rejected, which governance control caught it). One instance proves the integration pattern to a reviewer at a quarter of the authoring cost; extension to more lessons/modules is a post-pilot decision informed by the walkthrough. `[CONFIRM — the case study and scrub are adopted; the pilot disclosure is recommended but not yet your decision.]`

Pre-conditions for items 2–4: WGU scrub (CCW, "WGU Equivalent," QA/Cloud Academy labs, IRMA), no live agent links anywhere learner- or public-facing, tool-agnostic vocabulary throughout.

---

# 2. The Five Decisions (Final)

**Decision 1 — AI-workflow strategy.** *Adopted direction:* portfolio-first per §1.4 — Behind the Build case study + scrubbed prompt library + tool-agnostic assessed tasks; companion course removed from planning assumptions. *Open sub-decision:* the single pilot disclosure in 2.1 (recommended; cheap; walkthrough-testable).

**Decision 2 — Scaffolding calibration policy.** *(a) Codify* (adopted direction): framework/theory definitions live only in the hover glossary and optional enrichment — never in instructional prose ("teach the decision, not the principle"). Built M1 already complies; the amendment protects M2's learning-science content. Requires the wording edit in **both** CLAUDE.md's Do-Not list and the build checklist. *(b) The lesson-intro metacognitive stack:* **restored to OPEN, walkthrough-gated** (amended per the self-audit, §7): my earlier downgrade rested on a text-extraction method that cannot measure experiential density. No build change for M2; the walkthrough carries the question.

**Decision 3 — Stage 3 reconciliation (blocking, ~30 min).** Rule 25 screens for M2 (the inventory's 24 is the outlier); rule the canonical Phase/Step dictionary governs 2.3/2.4 (= Step 11; Decision Point Catalog's 12/13 labels stale); lock the callback swap (2.3 ← decomposition/bucket-to-unit at Evaluation; 2.4 ← calibration/cognitive-load at Evaluation) and update the spaced-repetition map in **CLAUDE.md and governance in the same commit** (dual-sourced; will diverge silently otherwise). Verify callbacks against actual M2 content at build per the standing rule.

**Decision 4 — Senior-ID walkthrough (parallel, before Module 3).** Now carries the questions this analysis cannot settle (see §7.3): after the reviewer completes two full lessons *doing* every interaction — "Which recurring elements did you start skipping?" "Which self-report moments felt like they were for you versus about you?" "Where did the course explain something you already apply?" "Did any celebration or feedback line read as flattery?" Plus reaction to the pilot AI disclosure if built. If the walkthrough contradicts this report anywhere, trust the walkthrough.

**Decision 5 — Audience. RESOLVED BY OWNER 2026-07-09.** This credential serves senior IDs (Apply/Analyze). Directed edits that follow: revise Stage 1's audience paragraph to the senior-ID framing (CLAUDE.md's "Senior instructional designer primary" line already agrees); read the roadmap's three-track/Foundation item as a *future separate course* for junior and mid-level IDs, not a tension in this product. This ruling confirms expertise-reversal as the right calibration frame for Modules 2–4 and closes the audience question the self-audit raised.

---

# 3. Module 2 — Build-Ready Specification

Consistent with: the lesson template (CLAUDE.md + governance), the per-screen checklist, numbering conventions (unsplit `m2-l1…m2-l4` ↔ 2.1–2.4), approved ZPD tiers (2026-06-27), locked spotlight scenarios, Stage 3 catalogs, and Decisions 1–3 and 5. Verified against CLAUDE.md directly. Hand this section plus `ARCH_Module2_Build_Checklist.md`, `ARCH_Build_Governance.md`, and `CLAUDE.md` to the build model — after clearing Section 6.1.

## 3.0 Module facts

| Item | Value | Source |
|---|---|---|
| Title / Phase | Engineer the Learning — Phases 3–4, Steps 9–11 | Stage 3 §2 |
| Lessons | 2.1 Sequencing Logic Fundamentals · 2.2 Competency Progression and Spiral Reinforcement · 2.3 Unit Architecture Engineering · 2.4 Learning Science Integration | Stage 3 §5 |
| Lesson screens | **25** (2.1=5, 2.2=6, 2.3=6 incl. faded s2b, 2.4=8) per Decision 3; overview/hubs/gate additional | Governance |
| Entry gate | SME Structural Approval Gate (1.TG.1, 1 screen, 5 min) — verify build status; CLAUDE.md counts it in M1's 39 `[CONFIRM]` | CLAUDE.md / roadmap task 7 |
| Deliverable | Performance Task 2: Sequenced Unit Architecture Package, `MRHN_UnitArchitecture_v1` | Stage 2 / Stage 3 |
| Learner identity / narrative | Learning Architect; SME character introduced; first SME review; Priya forwards SME questions | Scenario spec; governance |
| Scaffolding tiers (approved) | 2.1 Full Support · 2.2 Guided Support · 2.3 Monitored Practice + faded example · 2.4 Monitored Practice | Governance ZPD 2026-06-27 |
| Transfer contexts (locked) | 2.1 State Education Agency · 2.2 Community College · 2.3 Corporate · 2.4 Hospital (governed exception to the no-repeat rule) | Scenario spec |
| New glossary terms | sequencing, spiral reinforcement, spacing, interleaving (net-new; chunking/retrieval practice/feedback timing/progression stay prose-only) | Governance |
| Time budget | 4.0–4.5 hrs + Task 2; per-screen times via SCREEN_TIME_MAP | Stage 3 §6 |
| Established narrative facts (do not contradict) | Priya Okonkwo, CLO, MRHN; ransomware March 2024, three sites; OCR audit; **HIPAA Security Rule 45 CFR 164.308 + Breach Notification Rule 45 CFR 164.404 (label per bookmarked fix)**; IR-2024; 18-month window; 90-day deadline; 120 healthcare IT professionals; **SME availability 2.5 hours** (reduced from 4 in the M1 L5 evolution event — M2 content must use 2.5); self-paced online | Governance narrative thread + bookmarked HIPAA fix |

## 3.1 Build order

1. Clear Section 6.1 blockers; complete the 18-item Module 2 Pre-Build Checklist in governance (drafting list: §3.6).
2. `m2-overview.html` — always first.
3. Verify/build SME gate 1.TG.1.
4. Lessons 2.1 → 2.2 → 2.3 → 2.4; build the complex branching screens (2.1.4, 2.2.4 per Stage 3 §12) first within their lessons.
5. Hubs `m2-hub-l1…l4` + `m2-hub-gate` after all lesson screens (`ls SRC/m2-l*-s*.html | wc -l`).
6. Module gate `m2-gate-s1` last.
7. Per-screen checklist + Lighthouse 100 on every screen; code and docs in separate commits; build only from the verified-clean `*-template.html` files (validated as matching built patterns).

## 3.2 Module overview screen (`m2-overview.html`)

Standard required content (phase name; lessons + times; artifacts with one-sentence descriptions; total time; backward link to the Task 1 Bucket Map; forward link to Module 3 diagnostics; "Begin Lesson 1" → `m2-hub-l1.html`), plus:

- **Performance Task 2 preview:** learner-facing task description, the five ARCH scoring dimensions as a visible rubric, one annotated strong-response excerpt ≤200 words with the "This is where Module 2 leads…" label. **The excerpt does not exist (PathPoint deferred) — you draft it; the build model must not invent it.**
- If the pilot disclosure is adopted: one sentence noting the optional AI-practice feature exists in Lesson 2.1 and is excluded from Focused Practice.

## 3.3 Screen-level structure per lesson

Stage 3 gives lesson-level counts plus worked-example/decision-point/scaffold catalogs, not per-screen enumeration; this allocation is reconstruction. `[CONFIRM — especially 2.2's sixth screen and 2.4's composition — against M1's Task 1 onboarding/submit implementation.]`

### Lesson 2.1 — Sequencing Logic Fundamentals (5 screens, 40 min, FULL SUPPORT)
Spotlight: State Education Agency, Science of Reading sequencing. Core question: "What should learners learn first?"

| Screen | Type | Content focus + required elements |
|---|---|---|
| m2-l1-s1 | Lesson intro | Full template. No retrieval warm-up or prior-knowledge activation (Lessons 2 onward within each module). Badge: Full Support. Callback: **constraint identification at Analysis** (CONFIRMED source m1-l1b-s1/s2/s3). **Priya email introducing the SME + first SME review** (draft pre-build; register key). New in This Lesson: *sequencing*. Prediction prompt — key scheme decision first `[CONFIRM: continue l7–l10 vs module-scoped]`. |
| m2-l1-s2 | Worked example (9 min) | Why incident identification precedes escalation; principle: *dependencies determine progression*. Progressive disclosure; curiosity-gap opener; discovery-moment framing at the counterintuitive dependency; In a Different Context: State Ed Agency; In Your Context. Full Support: reasoning visible by default. |
| m2-l1-s3 | Guided practice | Dependency-mapping interaction (custom component; keyboard alternative). Anchor content: one pre-assigned dependency. Success Criteria + Expected Evidence static; articulation; confidence rating; cognitive-mode line (single italic, per busyness standard) on arrival from s2. |
| m2-l1-s4 | Decision point (complex branching — build/test first) | "What should come first in the Meridian sequence?" Fixed option count per Stage 3 catalog. Reasoning panel before decision: prerequisite value, dependencies, constraint alignment, downstream effects, traceability. Dimension: Prerequisite Dependency Management. ARCH Decision Log. |
| m2-l1-s5 | Reflection | Prediction callback; four-question transfer framework; **PILOT AI-practice disclosure** (if adopted — Step 9 prompt + output excerpt + expert audit; persist key `archMethod_aiPractice_m2l1_open`, registered before use); Lesson Complete block; Continue → `m2-hub-l2.html`. |

### Lesson 2.2 — Competency Progression and Spiral Reinforcement (6 screens, 50 min, GUIDED SUPPORT)
Spotlight: Community College FYE spiral design. Core question: "What should learners revisit and when?"

| Screen | Type | Content focus |
|---|---|---|
| m2-l2-s1 | Lesson intro | Retrieval warm-up (two-lessons-prior convention `[CONFIRM module-boundary handling; recommend M1 L6 scope-trace content]`); prior-knowledge activation from 2.1; callback: **bucket mapping at Analysis** (CONFIRMED m1-l2-s1/s2/s3); badge: Guided Support; New in This Lesson: *spiral reinforcement*. |
| m2-l2-s2 | Worked example (10 min) | Competencies sequenced recognition → coordination; principle: *competency order mirrors performance logic*. Reference cards collapsed (Guided tier). In a Different Context: Community College. |
| m2-l2-s3 | Guided practice | Progression construction on the Meridian competency set; no anchor content; expert comparison after one attempt. |
| m2-l2-s4 | Guided practice 2 — Spiral Reinforcement Map | Place **three** reinforcement opportunities (Task 2 artifact spec) with intrinsic-load-reduction + cognitive-advancement rationale each. ≤25% density rule surfaces in the Context Panel, not prose. `[CONFIRM sixth-screen allocation.]` |
| m2-l2-s5 | Decision point (complex branching — build/test first) | "Should compliance reporting precede or follow incident triage?" Reasoning panel: authentic-workflow logic, learner readiness, governance impact, triage↔reporting dependencies, coherence. |
| m2-l2-s6 | Reflection | Transfer framework; **Optional Reading card — Weinstein et al. 2018** (§3.4); Lesson Complete block. |

### Lesson 2.3 — Unit Architecture Engineering (6 screens, 65–75 min, MONITORED PRACTICE + FADED EXAMPLE — the module's highest-ZPD lesson)
Spotlight: Corporate cybersecurity. Core question: "How should learning be organized?"

| Screen | Type | Content focus |
|---|---|---|
| m2-l3-s1 | Lesson intro | Retrieval warm-up (targets 2.1); prior-knowledge activation from 2.2; callback (per Decision 3): **decomposition / bucket-to-unit traceability at Evaluation** (verify at build); badge: Monitored Practice. Omit New in This Lesson if no new glossary terms. |
| m2-l3-s2 | Worked example (12 min — highest-load screen in M2) | Expert builds the complete **six-unit architecture (Units 1–5 + Unit 6 Integrated Simulation)**; principle: *units are architecture containers, not topic piles*. **Scaffold: Layered Architecture Annotation Panel** (right side; expert actions: reviewing constraints, sequencing competencies, testing dependencies, verifying traceability, recording rationale; pause prompt: "What architecture decision would you make next?"). **Route through panelManager.js as `annotationPanel`** (already an allowed value in CLAUDE.md). Monitored tier: Show Expert Reasoning toggle, collapsed by default. `[CONFIRM toggle × panel interplay: recommend toggle governs content visibility; panel renders whenever content is open.]` |
| m2-l3-s2b | Faded example | Partial expert unit architecture with reasoning gaps, completed before full reveal with "Why it is strong" annotations. No confidence widget; no amber failure callouts. File: `m2-l3-s2b.html`. |
| m2-l3-s3 | Guided practice | **First independent unit-architecture attempt** — the module's cognitive summit. **Scaffold: Architecture Build Guide** (identify competency → review constraints → check prerequisites → build sequence → verify traceability → record rationale; before task). **Bloom's bridge here.** Governance Risk Notes per unit; Unit 6 Simulation Coverage Matrix seeded. |
| m2-l3-s4 | Decision point | "How should units be structured?" Dimension: Bucket-to-Unit Traceability. |
| m2-l3-s5 | Reflection | Transfer framework; Lesson Complete block. |

### Lesson 2.4 — Learning Science Integration (8 screens, 40 min content + task activities, MONITORED PRACTICE, no faded example)
Spotlight: Hospital nursing communication. Core question: "How should the architecture be optimized?" **Reuses the 2.3 artifact — do not rebuild it.**

| Screen | Type | Content focus |
|---|---|---|
| m2-l4-s1 | Lesson intro | Retrieval warm-up (targets 2.2 spirals); callback (per Decision 3): **calibration / cognitive-load management at Evaluation**; badge: Monitored Practice; New in This Lesson: *spacing*, *interleaving*. |
| m2-l4-s2 | Worked example (10 min) | Chunking, load-management, and transfer-support decisions on the Meridian architecture; principle: *learning science choices must be explicit and justified*. **Register rule (critical): model the DECISION (where/when/why-here), never tutor the principle (what spacing is). Template: m1-l3-s3's taxonomy handling — one-line operational key per lever, all remaining words on population-relative judgment. Principle refreshers live in glossary hovers and reading cards only.** |
| m2-l4-s3 | Guided practice | Apply the optimization layer to the learner's own 2.3 architecture: name and place interleaving, spacing, feedback-timing decisions; Learning Science Decision Log (8-field template). |
| m2-l4-s4 | Decision point | "How should cognitive load be managed?" Dimension: Prerequisite Dependency Management. |
| m2-l4-s5 | Calibration (the module's one) | Attempt → Reflect → Compare to Expert → Revise → Continue against Task 2 dimensions; three-tier feedback; expert comparison after commit; self-check prompt. Before task submission per Stage 3. |
| m2-l4-s6 | Governance record form | **Sequencing Governance Record**: sequence decision, dependency, learning-science rationale, risk, traceability + **Governance Outcome field**. Micro-prompts per Stage 3 §18.2. Stays on its own component — NOT migrated to shared autosave (AX4 decision). |
| m2-l4-s7 | Reflection | Transfer framework; **Optional Reading card — MIT Open Learning** (§3.4); Lesson Complete block. |
| m2-l4-s8 | Task 2 submission | Submission checklist; assemble `MRHN_UnitArchitecture_v1` (Unit Architecture Map w/ Governance Risk Notes + Unit 6 Coverage Matrix; Sequencing Logic Explanation; Learning Science Application Notes w/ interleaving, spacing, feedback timing named and placed; Sequencing Decision Log w/ Governance Outcome; Spiral Reinforcement Map ×3; Learning Science Decision Notes; Sequencing Governance Record). Layered exemplar release: full exemplar after submission only. `[CONFIRM Task 2 onboarding = overview preview + this screen.]` |

### Gate (`m2-gate-s1`, build last)
Governance record confirmation cards (records + one-sentence review criteria — you choose and write, pre-build item 15); four completion checkboxes; module-specific Priya email (SME review outcome — draft pre-build); architecture self-review (clarity/consistency/usability/support visibility); narrative consequence paragraph (what the SME review changed at Meridian); module completion celebration (register per §3.5.6); forward pointer to Module 3 overview.

## 3.4 Reading enrichment cards

Use the snippets in `ARCH_Module2-4_Reading_Cards_DRAFT.md` (markup matches live M1 cards; DOIs plain text; no hyperlinks). Citation authority: **the built course governs** (owner ruling); before placement, confirm the two M2 card citations against the DOI once, then treat as settled.

- **Lens 1, Weinstein et al. 2018 → m2-l2-s6** (retrieval/spacing lands right after the spiral map; primes 2.4 without loading the heaviest lesson).
- **Lens 2, MIT Open Learning → m2-l4-s7** (applied examples after the learner performs the optimization). `[CONFIRM split vs the draft's same-screen default.]`
- Persist keys `archMethod_optReading_m2l2_open` / `archMethod_optReading_m2l4_open`; register in CLAUDE.md + governance **before** use; confirm `optionalEnrichment.js` on hosts; verify Focused Practice + tracker exclusion.

## 3.5 Cognitive-load calibration applied to this module

1. **Register rule (the one that matters most):** M2's subject matter is learning science — the highest expertise-reversal-risk content in the credential for a senior-ID audience (now ruled, Decision 5). Every instructional paragraph must pass: *does this tell a senior ID what to decide about the Meridian architecture, or does it re-teach what the concept is?* The second kind gets cut or moved to hover/reading card. Grade-8 FK applies to instructional prose; expert think-aloud stays practitioner-level (CLAUDE.md hard-protects this).
2. **No prose re-definitions:** "define on first use per module" is satisfied by `span.gls` hover markup, never definitional sentences (Decision 2a; matches as-built M1; requires the two-document wording amendment).
3. **Lesson-intro metacognitive stack:** build to the M1 pattern as-is; the cumulative-load question is open and walkthrough-gated (Decision 2b) — do not add elements, do not remove them.
4. **All application scaffolds at full strength:** faded example on 2.3, Architecture Build Guide, annotation panel, reasoning panels, calibration, error-taxonomy labels on limited-tier feedback (recast #1 scope conflation and #3 taxonomy miscalibration for sequencing: "topic familiarity is not a prerequisite structure").
5. **Density caps:** ≤3 cognitive activities, ≤4 scroll depths at 1080px. m2-l3-s2 is the at-risk screen — if it busts the cap, split disclosure sections; never trim the annotation scaffold.
6. **Tone standard — with an explicit caution (self-audit §7):** the register model is the *built* Module 1 ("This is not a gap in your expertise. It is a gap in your process"; consequence-grounded completion blocks). **Do NOT use governance's Module 1 celebration examples as the register model** — several are peer-comparison flattery ("the kind of architecture package most IDs never produce"), and governance examples are what build sessions copy. Draft M2 celebration text fresh to the built register: name what the artifact governs next.

## 3.6 Content YOU must draft before the build session (do-not-invent list)

1. PT2 preview annotated excerpt (≤200 words + annotations).
2. `MRHN_UnitArchitecture_v1` celebration text (two sentences; consequence-grounded per §3.5.6; supersedes the PathPoint deferral `[CONFIRM]`).
3. Priya emails ×2 (2.1 intro: SME introduction + forwarded questions; M2 gate: SME review outcome) + register keys.
4. The pilot AI-practice disclosure (if adopted): genericized Step 9 prompt + output excerpt + expert audit note.
5. Context Panel content per lesson tier: 2.1 dependency-mapping criteria + four M1 bucket names; 2.2 spiral rules (≤25%, three opportunities, per-spiral fields); 2.3 unit-container rules + six-unit target incl. Unit 6 + error-taxonomy card; 2.4 the five learning-science levers + feedback-timing rules.
6. Retrieval warm-ups (2.2, 2.3, 2.4) and prediction prompts (×4).
7. Final callback wording ×4 (post-swap), verified against built M1 content.
8. Gate governance-record review criteria (one sentence per record).

---

# 4. Q1 — Cognitive Load Diagnosis of Module 1 (Final, With Self-Audit Amendments Applied)

All six built lessons, intros, overview, gate, hubs, and templates were reviewed directly. With the audience now ruled (senior IDs, Decision 5), the expertise-reversal frame is confirmed as the right frame. The self-audit (§7) resized three conclusions; this section states the final, honestly-sized versions.

## 4.1 What the materials prove (high confidence — content-level, verifiable claims)

- **No framework re-teaching anywhere in six lessons.** Zero definitional sentences for practitioner-standard terms in instructional prose; definitions are exclusively `data-gls-term` hover markup (pull, not push). The one near-hit ("Cognitive load is execution speed, not analytical complexity") is an expert annotation *using* CLT in application — exactly right.
- **The scaffold spine targets judgment, not comprehension:** worked examples with progressive disclosure plus always-available Show All Steps; faded examples only on the two highest-ZPD screens; three-tier gradual release with documented logic; a five-type *professional* error taxonomy; calibration against expert exemplars on ARCH-specific dimensions; articulation assessing reasoning; decision-point reasoning panels scaffolding evaluation criteria.
- **The register model exists in the built content:** m1-l3-s3 handles the four-level taxonomy as a one-line-per-level operational key applied population-relatively — Analyze-level content about taxonomy judgment, not a Bloom's tutorial. This is the explicit template for Module 2's learning-science prose.
- **Per-screen density is actively governed** (caps; the D6→D9 and E2/E3 pruning history; the E1 keep decision) — with the caveat that my text-based review cannot certify *visual* density; the punch list's walkthrough round is the evidence stream for that layer.
- **ARCH-novelty logic:** ARCH is novel procedural knowledge even for experts, so worked examples and judgment scaffolds of the *method* are not expertise reversal. (Note: the underlying interpretation of the expertise-reversal literature is my synthesis — Verification Checklist item 12.)

## 4.2 What remains genuinely open (moderate confidence at best — experiential claims; walkthrough- or data-gated)

1. **Cumulative intro-ritual load across 21 lessons.** Restored to open (self-audit): my "renders lean" judgment came from text extraction, which cannot measure experiential density, and sampled the earliest, most-polished lessons. No build change; walkthrough question.
2. **The self-report apparatus** (prediction + retrieval + confidence + articulation + flags + four reflection questions + decision logs, every lesson). Never analyzed against the Apply/Analyze lens — my "equity infrastructure, leave it alone" was assertion. A senior ID might experience relentless mandatory self-report as the real condescension even while the prose respects them. Walkthrough question ("for you vs about you").
3. **Tone at module scale — unresolved for M2–4 specifically.** The built M1 register is right where sampled, but governance's celebration examples (the actual build source for M2–4) contain the peer-comparison flattery I originally flagged. Mitigated by §3.5.6's explicit caution; verified by the walkthrough question on flattery.
4. **Under-scaffolding risk is live too:** with zero learner data, the >30% Guessing instrumentation could yet reveal that first-encounter high-load screens (first governance form; first independent decomposition) need *more* application support, not less. One cohort of data outranks this entire section.

## 4.3 What is not a problem

Support panels, autosave tiers, skip links, and EF supports (task initiation, pacing alerts, permission-to-stop) serve tired professionals doing a 22–26 hour credential in evening sessions and are consistent with the accessibility plan's identity-safety stance. The open question in §4.2.2 is about *mandatory self-report frequency*, not about the support infrastructure.

## 4.4 Final confidence statement

**High (~90%) on content-level claims** (what the course contains: §4.1 — grep-verified, document-based). **Moderate on the experiential calibration verdict** (what the course does to a person over hours: §4.2 — no behavioral evidence exists yet). The earlier flat "well-calibrated, high confidence" claim was oversized; this split is the defensible version.

---

# 5. Q3 — Four-Module Backward-Design Arc (Outcome Level)

## 5.1 The arc

| Module | ARCH coverage | Competency landed | Terminal evidence | Cognitive target |
|---|---|---|---|---|
| M1 Bound the Course | Phases 1–2, Steps 0–8 + SME Gate | C1 Course Architecture Development (foundation) | Task 1: Bucket Map & Scope Organization Package | Apply, DOK 2–3 |
| M2 Engineer the Learning | Phases 3–4, Steps 9–11 | **C2 Instructional Sequence Engineering** | Task 2: Sequenced Unit Architecture Package | Apply, DOK 3 |
| M3 Stress-Test the Design | Phases 5–6, Steps 12–16 | C3 Structural Diagnostics & Design Integrity | Task 3: Audit & Governance Package | Analyze, DOK 3 |
| M4 Structural Freeze | Phases 7–8, Steps 17–20 + Freeze | C4 Design Governance & Decision Traceability (+ C1 culmination) | Task 4: Structural Freeze Declaration Package | Apply+Analyze, DOK 3 |

C4 is deliberately longitudinal — practiced every module via records and logs, assessed cumulatively, landed in M4. LG5 (learning science) is cross-cutting: decision notes in Task 1, the explicit subject of M2, a required layer in Tasks 3–4. M2 is the hinge of both arcs: professional identity (ID → **Learning Architect** → Lead ID → Architecture Owner) and gradual release ("balanced support, building independence") — which is why M2's internal tier progression matters beyond the module.

## 5.2 What Module 2 must set up for Modules 3–4 (handoff obligations)

1. **The artifact M3 will wound and M4 will defend.** M3's diagnostics find *specific* faults (Unit 3→4 transition gap; Unit 6 simulation-prep gap — Task 3 exemplar); M4's revision adds Unit 5A (Task 4 exemplar). M2 must produce the canonical six-unit shape (Units 1–5 + Unit 6 Integrated Simulation) with the Coverage Matrix — locked content, not builder discretion. The hardest dependency in the credential.
2. **The governance chain.** The Sequencing Governance Record (with Governance Outcome field) is link two of Boundary → Sequencing → Diagnostic → Freeze; M3 adds Reason Codes on top; M4 cites all prior outcomes. M2 must make the Outcome field habitual.
3. **Spaced-repetition geometry, both directions.** Backward: M2's four callbacks per Decision 3. Forward: M3's callbacks (governance records, constraint ranking, bucket balance, scope trace — Evaluation) assume M2 exercised those concepts; M4's (full Phase-1 workflow; artifact dependency chain at Creation) assume a legible M2–3 artifact chain. Practical rule: every M2 lesson *uses* at least one M1 artifact by name (Bucket Map in 2.1–2.2, Decomposition Map in 2.3, calibration annotations in 2.4).
4. **Vocabulary and representational prerequisites.** M3 assumes fluency with sequencing/spiral/spacing/interleaving (defined once in M2) and assumes learners can *read* dependency and spiral maps — M3's diagnostics consist of finding faults in exactly those representations.
5. **Scaffolding fade continuity.** M2 must end on two genuinely Monitored Practice lessons so M3's reduced support is a step, not a cliff.
6. **Narrative escalation.** M2 establishes the SME as a *reasonable challenger*; M3's stakeholder conflict and M4's executive defense escalate the same pressure. SME hours = 2.5 in all M2 content.
7. **AI-thread continuity — now contingent.** If the pilot disclosure ships in 2.1 and the walkthrough supports it, the extension pattern is: M3 = AI as diagnostic auditor (Stage 13/15/16 prompts); M4 = AI as freeze-package assembler and defense rehearsal (Stage 21), converging with the credential's Human-Last theme. If the pilot is skipped or fails, the Behind the Build case study carries the whole AI story and no in-course obligation exists.

**Modules 3–4 internals remain at skeleton** by design; the seven obligations above are the only M3/M4 pre-decisions M2 forces.

---

# 6. Verification Findings & Flags

## 6.1 Blockers — clear before the Module 2 build session

**B1. m1-l2-s5b content-canon defect (isolated; referent-only fix).** The "Expert Analysis: All 16 Decisions" prose contradicts Meridian canon: LC-1 glossed as "four-hour seat time ceiling" (canon: 4-hour SME access cap); LC-3/LC-4 as "blended delivery"/"synchronous debrief" (canon: SCORM self-paced, synchronous explicitly excluded); SI drift ("reporting triggers (SI-01)" vs Tier 1 Protocol Execution; "SI-09 (evidence handling)" vs Network Segmentation — evidence is SI-11; "scope classification (SI-16)" vs Incident Severity Classification). This screen is the expert model learners calibrate Task 1 judgment against, and M2's 2.1 callback points back at it. Lesson 6 verified clean — one-screen fix: correct glosses and the two delivery sentences; don't rewrite the analysis. (m1-l1b-s4b's "LC-1: under 5 hours weekly" is fine — the community-college spotlight's own constraint set; style note: M2 spotlight content should avoid reusing the LC-x prefix across scenarios.)

**B2. Skip-link doc inconsistency (build-breaking if unfixed).** CLAUDE.md + the M2 checklist require five skip links incl. "Skip to Decision History"; Accessibility Spec v5.2 deferred Decision History (5→4) and every built screen carries four. A build model following the checklist verbatim adds a dead skip link to ~25 screens. Amend the checklist, CLAUDE.md's list, and CLAUDE.md's "Decision History overlay" note to the four-link state.

**B3. Stage 3 reconciliation (~30 min; Decision 3).** 25 screens; canonical dictionary governs 2.3/2.4 (= Step 11); callback swap locked with the dual-doc map update (CLAUDE.md + governance, same commit).

**B4. HIPAA fixes — scope revised after the full-module sweep.** (a) *Label fix, docs only:* the built screens already cite 164.404 correctly (Breach Notification "discovery" trigger) and 164.308(a)(5) correctly (Security Rule / workforce training); the "Security Rule …164.404" mislabel exists only in the governance established-facts line (and CLAUDE.md if mirrored). Fix the doc line; no screen edits. (b) **NEW and higher priority — "HIPAA 72-hour breach notification clock" (9 built files; SI-10 is premised on it):** HIPAA's actual outer limit is 60 days from discovery (45 CFR 164.404(b)); no 72-hour federal HIPAA clock exists to my knowledge (72 hours belongs to GDPR/NYDFS/CIRCIA). Verify against eCFR/HHS; if confirmed, the minimal fix preserves all pedagogy — attribute the 72-hour clock to **MRHN's internal IR-2024 protocol**, stricter than HIPAA's 60-day limit. The teaching point (the "reasonably should have known" discovery trigger) is correct and survives unchanged. See Verification Checklist items 1/1a.

**B5. Decision-point implementation ruling (from the systematic sweep — needed before 2.1.4/2.2.4 can be built).** Two linked findings: (a) *the Stage 3 Decision Point Catalog contains no numeric option counts* — it specifies decision questions, scoring dimensions, and the reasoning process, but CLAUDE.md's rule ("fixed option count per the catalog; check before building") references numbers that do not exist anywhere in Stage 3; (b) *built Module 1 contains no discrete decision-point screens* — zero screens carry the "Decision Point" type label; the catalog's five M1 decisions were absorbed into guided-practice interactions (de facto inventory: m1-l2-s3 selects 4-option ×8; m1-l3-s4 radios 2-opt/4-opt templated; m1-l4a-s4 radios 3-opt + one 5-opt select; m1-l4b-s4 verdict radios 3-opt ×3; m1-l4b-s5 trace radios 2-opt + 16-opt parent-SI selects). Stage 3's Template 4 ("Decision Point With Branching") was never built. **Ruling needed:** build M2's decision points (2.1.4, 2.2.4 — catalog-listed branching screens) as the never-yet-built Template 4 with option counts you fix now, or continue M1's absorb-into-guided-practice pattern and restate the CLAUDE.md rule accordingly.

## 6.2 Directed edits from owner rulings

- **Citation authority flip:** built course citations govern. Correct the tracker (Drysdale issue/title; Stefaniak edition/year) and the Enrichment Companion to match the live cards; flip the "xlsx governs if they diverge" statements in the roadmap and reading-cards draft; record the authority order in governance. (Bookmarked task.)
- **Stage 1 audience paragraph:** revise to the senior-ID framing per Decision 5. Note in the roadmap that the Foundation/three-track item is a future separate course for junior and mid-level IDs.

## 6.3 Minor items (fix opportunistically)

- m1-l1b-s1 "What You Will Produce" copy: change "produce" to "begin" and name the constraint map as the lesson's actual output (the full Package name belongs to Task 1 / Lesson 3's Bucket Map artifact).
- m1-l3-s3 time label (20–25 min) vs SCREEN_TIME_MAP worked-example range (12–18): deliberate exception or drift — decide and record.
- m1-overview skip-link count (1 vs 4): confirm intended for the screen type.
- Resolved during validation: Lesson 3 count (m1-l2-s5 is a documented redirect stub); Drysdale live card correct (authority now formalized by ruling); Lesson 2 "of 8" (s7 exists).

## 6.3a Systematic sweep results (checks 1–4, 2026-07-09 — all 48 m1-* files)

**Check 3, external fonts/icons: VERIFIED CLEAN.** Zero external links/imports/font-faces/CDN references; zero `<img>` elements (all-inline SVG); all font-family values are system stacks (`inherit`, `monospace`, ui-monospace stack). Residual: run the same greps on global.css (not in the reviewed set).

**Check 2, hover-glossary coverage: 14 of 20 terms tagged.** Three terms used in visible prose with no `span.gls` tag anywhere: *competency* (first untagged use m1-l1a-s2:469, heaviest m1-l4b-s2 ×14), *dependency* bare (first m1-l3-s2:981; 4 files), *formative assessment* (m1-gate-s1:1038). Three terms never appear in M1 prose at all — *CBE, summative assessment, scope creep* (inventory without a trigger; seed a use or note as M2–4 vocabulary). Prose-definition scan effectively clean: one genuine definition (m1-l3-s1 retrieval reference answer, binding vs negotiable constraint) is ARCH-native content, acceptable under the register rule. One tone instance logged for the walkthrough probe: m1-l3-s4:1134 `div.social-proof` ("the skill most IDs say changed how they think"). hoverGlossary.js itself not in reviewed set — confirm its TERMS object matches the 20-term list.

**Check 4, decision-point option counts: NOT VERIFIABLE AS SPECIFIED** — elevated to blocker **B5** above (no counts exist in Stage 3; no decision-point screens exist in built M1).

**Check 1, Grade-8 FK on instructional prose: real drift in post-Prompt-B content.** Method: DOM-aware extraction excluding expert-exempt containers (example-step, annotation-*, think-aloud, show-expert, fb-*, exemplar/citation), blockquotes, UI chrome; caveats: ARCH's polysyllabic vocabulary and identifier-dense task strings inflate FK. Results: 21 of 40 scoreable screens exceed FK 9.0 aggregate; 65 paragraphs exceed FK 10. Actionable cluster: **m1-l4b-s4** (13.1 aggregate; four instruction paragraphs FK 19.3–22.0), **m1-l1b-s4b** (11.6; scenario paragraphs to 20.5 — learner-facing, not expert-exempt), **m1-overview** (12.8), lesson intros m1-l1a-s1 / m1-l1b-s1 / m1-l3-s1 (11.6 each), m1-l4a-s4 / m1-l4a-s5 / m1-l4b-s6 (10.5–10.6). m1-l1a-s2's 14.3 is the Meridian brief artifact — exempt-by-nature `[CONFIRM classification]`. Diagnostic: the worst screens are disproportionately content added *after* the Prompt B reading-level rewrite (C3 faded examples, C-era practice tasks, overview) — the rewrite was never re-run over later additions. Remediation: paragraph-level sentence-splitting on the flagged cluster only (the ≤20-word rule is the cheapest lever); never touch expert-exempt blocks; re-score after.

## 6.4 `[CONFIRM]` register — remaining open items

1. Pilot AI disclosure in 2.1: adopt or skip (Decision 1 sub-item).
2. Governance wording amendment for hover-only definitions (CLAUDE.md + checklist) — Decision 2a execution.
3. Stage 3 rulings executed (B3).
4. 1.TG.1 build status.
5. localStorage key scheme for M2 (l7–l10 vs module-scoped).
6. Per-lesson screen allocation (§3.3) — 2.2's sixth screen; 2.4 composition vs M1's Task 1 onboarding/submit pattern.
7. Reading-card split placement (2.2 + 2.4).
8. Tier-toggle × annotation-panel interplay on m2-l3-s2.
9. Provisional celebration text superseding the PathPoint deferral.
10. m1-l3-s3 time label; m1-overview skip links (§6.3).
11. **Decision-point implementation ruling (B5):** Template 4 with fixed counts vs M1's absorb-into-guided-practice pattern — gates 2.1.4/2.2.4.
12. Glossary fixes: tag or waive the three untagged terms (competency, dependency, formative assessment); disposition of the three unused terms (CBE, summative assessment, scope creep); confirm hoverGlossary.js TERMS object = 20 (§6.3a).
13. FK remediation scope: approve the flagged-cluster sentence-splitting pass + the m1-l1a-s2 exempt-by-nature classification (§6.3a).
14. Run the check-3 font/icon greps on global.css (not in reviewed set) (§6.3a).
15. **Credential-claim integrity (from the master review; launch gate, not pre-M2):** the course claims a "Practitioner credential" but a static-HTML/localStorage build has no way to verify anyone produced the evidence. Ruling needed among: (a) **artifact-export model (recommended)** — an "Export your ARCH Design Package" feature compiling the learner's saved artifacts (bucket map, logs, governance records, freeze declaration) into a downloadable, third-party-reviewable portfolio; feasible in static HTML, and it converts the credential from asserted to evidence-carrying, which also strengthens *learners'* portfolios; (b) adjust the credential language to an honest self-verified framing; (c) defer to a future submission/review system (roadmap item 23) with interim language. Whichever ruling: the landing page and Stage 1 credential-summary language must match what the build can actually support at launch.
16. **Scoring anchors as a Module 4 launch gate (elevated from the PathPoint deferral):** the rubric cannot be reliably applied — even by its author — until the Strong/Developing/Emerging anchors and the calibration guide exist. Currently deferred "until PathPoint exemplars"; the master review elevates it from pipeline item to **launch gate**: no credential award language ships before the anchors exist, because the mastery threshold ("Strong Evidence in three criteria") is unadjudicable without them. Sequence: PathPoint exemplars → anchors + calibration guide → Stage 2 revision → then M4's Task 4 submission screen may reference the mastery threshold.

*(Resolved and removed from the register: audience definition — Decision 5; citation authority — owner ruling; missing materials — none remain.)*

---

# 7. Self-Audit — Adversarial Review & Sycophancy Check

Retained in full because the report's conclusions should carry their own rebuttal. Amendments from this section are already applied above (Decision 2b restored to open; §4 restructured into proven-vs-open; §3.5.6 tone caution; confidence split in §4.4).

## 7.1 The case against the AI-integration recommendation (as originally made)

The strongest objections to the original four-disclosure hybrid: it was the weakest form of the strongest claim (optional collapsibles excluded from Focused Practice — the time-pressed practitioners most likely to want AI never see them; full costs, no marketable claim); it contradicted my own load analysis (four content beats added to the module I called the cognitive hinge, with "optional" weakly protective for a high-conscientiousness population); its timing may be pedagogically wrong (showing mid-formation learners that the expert delegates the step they're grinding through — the capstone option sequences the reveal after competence, which is how the course's own gradual-release arc handles everything else); the expert-audit beat presumes the evaluation skill still forming, risking prompt cargo-culting; and it leaned on a companion product that did not exist. **Disposition:** substantially accepted. The portfolio reframe (§1.4) replaced the four-disclosure thread with the case study + scrubbed library + a single pilot; the companion course was dropped from planning assumptions.

## 7.2 The case against the cognitive-load conclusion, including the sycophancy findings

Where the original diagnosis likely bent toward what the owner wanted to hear:

1. **One-directional walk-backs.** Every revision to the calibration judgment across three validation batches was a softening, while critical energy migrated to safe, grep-able factual defects. Real evidence streams cut both ways on the same question; mine never did on this one.
2. **Method double-standard.** The intro-stack downgrade was certified with text extraction — the same method later conceded (in the adversarial pass) to be blind to experiential density, and sampled on the earliest, most-polished lessons. Cannot use the method's blindness against the critique and its readings for the praise. → Decision 2b restored to open.
3. **Tone withdrawal on one good quote — and a backwards reframe.** "The effusive celebration variants live only in governance examples, not built screens" was offered as reassurance; governance examples are the *build instructions* for Modules 2–4, so the risk lives exactly where it was waved off. → §3.5.6 caution; walkthrough probe.
4. **Confidence inflation.** 65%→~90% was licensed only for the definitional-prose claim (one of four original concerns), not the whole diagnosis; the concession that 85–90% was generous surfaced only when invited. → §4.4 split confidence.
5. **Premise adoption over document testimony.** The conversational audience framing was treated as more authoritative than Stage 1/CLAUDE.md/roadmap where they disagreed, and the conflict was resolved in the owner's favor without surfacing the alternative. **Disposition: resolved by owner ruling (Decision 5)** — the owner has explicitly overridden the documents: this credential serves senior IDs; a separate course may later serve junior/mid-level IDs. The methodological lesson stands for future analyses: surface premise-vs-document conflicts as decisions, don't silently resolve them.
6. **The frictionless-exit problem.** The prompt pre-authorized the "well-calibrated" verdict, making "your specs looked risky, your execution is excellent" the zero-cost answer — consistent with the evidence, but its convenience should discount it.

**What survives regardless of motivation:** the grep-verified content claims (§4.1), the factual defects (§6.1), and the record of unwelcome findings delivered without invitation (s5b, skip links, the case against my own recommendation).

## 7.3 What only a real senior-ID reviewer can settle vs what the materials defend

**Materials-defensible (documentary):** the three-versions gap; the Stage 1 positioning mismatch; construct-contamination risk if AI were assessed; optional-enrichment pattern feasibility; Stages 22–27 mapping; element inventories; absence of definitional prose; scaffold classification; tier-logic consistency; m1-l3-s3 as register model; all §6.1 defects.

**Human-only (experiential/behavioral):** whether the intro ritual compounds (spaced retrieval working) or decays (skimming); whether mandatory self-report reads as respect or surveillance; pacing and fatigue across the arc; register whiplash between Grade-8 prose and practitioner think-alouds; whether faded examples bridge the ZPD gap they were placed for; whether mid-formation AI exposure demotivates or energizes; whether the disclosures read as differentiator or gimmick; whether "optional" is respected by this population.

**Verifiable by neither (market claims — treat as hypotheses):** "category-of-one," "2026 market saturated with prompt tips," "employers select on AI relevance." Require a real competitive scan before marketing use (Verification Checklist, Tier 3).

---

# 8. Task Bookmark & Ordered Action Plan

## Bookmarked tasks (this session's register)

| # | Task | Status |
|---|---|---|
| 1 | Verification checklist (33 claims, 4 tiers) | **Done** — `ARCH_Verification_Checklist.md` |
| 2 | Fold adversarial review + sycophancy audit into report | **Done** — this revision (§7 + amendments throughout) |
| 3 | Behind the Build case-study outline | **Done** — `ARCH_BehindTheBuild_Outline.md` |
| 4 | Prompt-library scrub pass (de-brand, de-link, Phase/Step renaming per owner ruling) | **Done** — `ARCH_Prompt_Library_Practitioner_Edition.md` |
| 5 | Fix mislabeled HIPAA citation — scope revised to docs-only + the 72-hour attribution fix (B4) | Queued (B4) |
| 6 | Reconcile tracker + Companion citations to course authority; flip the "xlsx governs" statements | Queued |
| 7 | Module 1 systematic sweep, checks 1–4 (FK, glossary, fonts/icons, decision points) | **Done** — findings in §6.3a + blocker B5 |
| 8 | M1 remediation work arising from the sweep (glossary tags, FK cluster pass) | Queued — pending CONFIRM items 12–13 |

## Ordered pre-build plan

**Blocking (one working session, ~2–3 hrs):** B1 s5b referent fix → B2 skip-link doc amendment → B3 Stage 3 rulings + dual-doc map update → B4 HIPAA relabel → record Decisions 1, 2a, 5 in governance (incl. the AI-practice pattern paragraph if the pilot is adopted, and the Stage 1 audience revision).

**Content drafting (yours):** the eight §3.6 items.

**Administrative:** register all new localStorage keys (prediction/retrieval/transfer/optReading — and aiPractice + priyaEmail for M2) in CLAUDE.md + governance; complete the 18-item Pre-Build Checklist; verify M1 screen count and 1.TG.1.

**Parallel (non-gating):** senior-ID walkthrough with the §7.3/Decision 4 probes; Behind the Build outline; prompt-library scrub; citation reconciliation; §6.3 minor items.

---

*End of report, revision 2. Companion: ARCH_Verification_Checklist.md (updated same day for the owner rulings). The r1 report and working brief are superseded; this document is self-contained.*
