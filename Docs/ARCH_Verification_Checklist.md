# Verification Checklist — Factual Claims to Independently Check
**Companion to:** ARCH_Credential_Comprehensive_Report.md (r2) · 2026-07-09 · updated same day for owner rulings

> **Owner rulings applied (2026-07-09):** (1) Built course citations are authoritative; the tracker and Enrichment Companion carry the errors — items 2–3 below are now *correction tasks*, not open verifications. (2) Item 1 (HIPAA label) is confirmed as a bookmarked fix task (B4 in the report).

Every claim below appears in (or underpins) the report and brief. Organized by risk: what ships to learners and portfolio reviewers first, then the theory claims your design decisions lean on, then my assertions you should treat as hypotheses, then corpus-derived facts to spot-check in your repo.

---

## Tier 1 — Ships publicly. Verify against primary sources before launch.

### Regulatory citations in your course narrative (highest priority)
1. **"HIPAA Security Rule 45 CFR 164.308 and 164.404" — SCOPE REVISED after the full-module sweep (2026-07-09):** the built screens handle this *correctly* — 164.308(a)(5) is labeled Security Rule / workforce training; 164.404 is consistently cited as the Breach Notification "discovery" trigger ("reasonably should have known"), never as Security Rule; 164.408 (notice to the Secretary) is also used correctly. **The mislabel exists only in the governance doc's established-facts line** (and CLAUDE.md if mirrored). B4 is a docs-only fix; no screen edits needed.
1a. **NEW — "HIPAA 72-hour breach notification clock" (appears in 9 built files: m1-l2-s2/s3, m1-l3-s2/s3/s4, m1-l4a-s2/s4, m1-l4b-s2/s3; SI-10 is premised on it).** To my knowledge HIPAA has **no 72-hour clock**: 45 CFR 164.404(b) requires individual notification "without unreasonable delay and in no case later than **60 days** after discovery." A 72-hour window belongs to other regimes (GDPR Art. 33; NYDFS; CIRCIA reporting to CISA). Verify against the eCFR/HHS. If I'm right, the cheapest fix preserves all the pedagogy: attribute the 72-hour clock to **MRHN's internal IR-2024 protocol** ("stricter than HIPAA's 60-day outer limit") — the actual teaching point (the 164.404 "discovery" trigger) is correct and survives unchanged. A healthcare-literate reviewer would catch "HIPAA 72-hour" instantly, so this outranks item 1 in priority.

### The eight reading-card citations (your tracker says "confirmed June 2025" — 13 months stale)
Re-verify each is live, open-access, and bibliographically exact. Specific things to check, not just link-rot:

2. **Drysdale (2019)** — RULED: the live m1-l2-s6 card is authoritative (*Online Learning, 23*(3), 56–71, "…Relationship-centered **instructional** design…"). Task: correct the tracker and Enrichment Companion to match the card; do one DOI sanity check (10.24059/olj.v23i3.2058) while editing.
3. **Stefaniak task-analysis chapter** — RULED: course card is authoritative. Task: align the tracker and Companion (which says "n.d.") to the card's edition/year; sanity-check the current EdTech Books page while editing. Also flip the "the xlsx governs if they ever diverge" authority statements in the roadmap and reading-cards draft, and record the new authority order (built course > tracker > companion) in governance.
4. **Weinstein, Madan & Sumeracki (2018)**, *Cognitive Research: Principles & Implications* 3(1), Art. 2, DOI 10.1186/s41235-017-0087-y — confirm live at PMC; your card's APA is complete, just re-verify volume/article number.
5. **MIT Open Learning, "Spaced and interleaved practice" (n.d.)** — institutional pages move or get retired; confirm the URL and that the page still contains the course examples your designer note references (genetics, physics, materials science).
6. **Jahnke, Riedel, Singh & Moore (2021)**, *Online Learning* 25(4), DOI 10.24059/olj.v25i4.2439 — confirm. Also verify two characterizations from your docs before they ship in a designer note: "analyzed **195 problems** in two online courses," "**14** sociotechnical-pedagogical heuristics," and the "Scopus 87th percentile" credibility claim (percentiles drift yearly — either date it or drop it).
7. **Smith & Luo (2024)**, *TechTrends* 68(2), DOI 10.1007/s11528-024-00947-0 — confirm, plus the Companion's claim they "interviewed **six** practicing IDs and design managers."
8. **Lachheb & Boling (2021)**, EdTech Books — confirm chapter and the **core/instrumental/framing** judgment-types characterization in your designer note matches the chapter's actual typology.
9. **Totino & Kessler (2024)**, *JAID* 13(2), DOI 10.59668/1269.15630 — confirm, plus that **LEED** ("Learning Engineering Evidence and Decision tracker") is the tool's actual name and it is accurately attributed to MIT Open Learning.

### Course-content realism claims (fictional scenario, real-world referents)
10. **SCORM 1.2** as the stated delivery constraint — fictional but reviewers know SCORM; confirm you're comfortable with 1.2 (vs 2004/xAPI) as a realistic 2024-era client requirement. It is plausible; just deliberate.
11. **"OCR audit," "18-month compliance window," 90-day build** — plausible-fiction check only: no verification needed, but a healthcare-compliance reviewer shouldn't find them absurd. (OCR investigates and issues resolution agreements; "audit finding" phrasing is acceptable shorthand.)

---

## Tier 2 — Framework and theory claims your design decisions lean on. Verify against the literature before repeating them in designer notes, marketing, or interviews.

12. **Expertise reversal effect — my specific interpretation.** The report's Q1 logic rests on: *expertise reversal punishes redundant instruction on familiar content, but worked examples of a novel method are safe even for domain experts because the method is novel procedural knowledge (high element interactivity).* The first half is standard (Kalyuga et al., 2003; Sweller, Ayres & Kalyuga). The second half is **my synthesis** — defensible via element-interactivity reasoning, but not a settled finding you can cite as-is. Check Kalyuga's work on learner-tailored instruction before putting this argument in anyone else's mouth.
13. **Worked-example effect and its fade (guidance fading).** Your faded-example design assumes the observation→completion→production bridge (Renkl's example-based learning research). Solid literature; verify you're comfortable citing Renkl/Atkinson if asked.
14. **Spacing/interleaving/retrieval as architecture-level (not study-skill) decisions.** Your Module 2 designer note claims interleaving improves *discrimination and transfer* vs blocking. Accurate to the literature (e.g., Rohrer's interleaving work; Weinstein et al. summarizes), but the "architecture finding, not study-skills finding" framing is your extension — rhetorically strong, worth owning as interpretation.
15. **Cognitive apprenticeship** (Collins, Brown & Newman) as your pedagogical frame — your Stage 1 uses it correctly (making expert thinking visible, gradual release). My extension "cognitive apprenticeship applied to the tool layer" is **my inference**, not literature. Fine as design rationale; don't cite it as established.
16. **ZPD / gradual release of responsibility** (Vygotsky; Pearson & Gallagher) — used conventionally in your tier system; no concerns, but note "ZPD analysis" as you practice it is a design heuristic, not a measurement procedure — a picky interviewer might probe that.
17. **Metacognitive prompting and habituation.** My claim that repeated identical reflection/prediction prompts risk habituation and skimming across 21 lessons is **plausible-but-uncited** — I know of no direct study on prompt fatigue at this grain. Treat as hypothesis; your walkthrough is the test.
18. **Desirable difficulties** (Bjork) — referenced in your prompt library's Stage 18 ("calibrate desirable difficulty"). Standard; fine.
19. **Grade-8 reading level for expert audiences.** The plain-language accessibility rationale is defensible (plain-language guidelines), but there is no literature I'd cite saying Grade-8 FK is *optimal for senior professionals* — your exemption structure (expert think-alouds at practitioner level) is the defensible design position. Frame it that way if asked.

---

## Tier 3 — My assertions. Not verifiable from your materials; treat as hypotheses until you test them.

20. **"The 2026 market is saturated with prompt-tips for IDs; nobody else teaches constraint-governed, auditable AI-assisted architecture."** Category-of-one is a competitive claim I cannot substantiate — I did no market scan. Before any marketing copy uses it, do a real competitive scan (LXD credential landscape, IDOL, ATD offerings, university micro-credentials).
21. **"Buyers/employers choose credentials partly on AI relevance in 2026."** Plausible; unverified. Your job-search experience will generate better evidence than any source I could cite.
22. **"High-conscientiousness learners complete optional content / 'optional' is weakly protective."** My behavioral claim, uncited. Testable with your own pacing-mode and enrichment-open telemetry once learners exist.
23. **"Senior IDs are a population selected for high self-regulation."** Assumption underlying my intro-stack critique and its downgrade. A reviewer walkthrough can probe it; no citation exists for this population specifically.
24. **Time/effort estimates:** "+20–30 min optional AI thread," "~2–3 hours blocker fixes," "case study ≈ 90% of differentiation value at 10% of cost." The last is rhetoric, not measurement. Use none of these numbers in planning documents without your own estimate.

---

## Tier 4 — Corpus-derived facts I verified in your uploads. Spot-check in the live repo before acting (uploads may lag the repo).

25. **m1-l2-s5b canon defect** — LC-1 "seat time" gloss, LC-3/LC-4 "blended/synchronous" language, SI-01/SI-09/SI-16 referent drift. Confirm in the repo copy before editing (grep: `seat time`, `blended`, `synchronous debrief`).
26. **Skip links: built = 4, docs say 5.** Verify in repo (`grep -c 'class="skip-link"'` across SRC) and against Accessibility Spec v5.2's Decision-History deferral before amending CLAUDE.md + checklist.
27. **Module 2 = 25 lesson screens** (Stage 3 lesson table + governance + roadmap) vs Stage 3 inventory's 24 — recount from the Stage 3 lesson table yourself before ruling.
28. **Steps for 2.3/2.4 = Step 11** per canonical dictionary (Decision Point Catalog's 12/13 stale) — reread Stage 3 §4 vs §7 before ruling.
29. **1.TG.1 (SME gate) build status** — CLAUDE.md counts it in Module 1's 39; roadmap task 7 assigns it to the M2 session. `ls SRC/m1-gate*.html SRC/*TG*` and settle it.
30. **m1-l2-s5.html is a redirect stub** (CLAUDE.md) — confirm in repo; it anchors the Lesson-3 count.
31. **Drysdale live card matches tracker** — my file comparison; re-diff in repo if you touch that screen.
32. **Stage 2 quoted language** ("without external guidance"; mastery threshold criteria; "selected-response formats intentionally excluded") — I paraphrased faithfully, but re-read Stage 2 §2, §7 before quoting in any public artifact.
33. **SME hours = 2.5 established** (reduced from 4 in the M1 L5 evolution event) — note the L1 worked example and l1b retrieval answer still say "4 hours," which is *correct in-narrative timing* (pre-reduction), but verify Module 2 content consistently uses 2.5 going forward.

---

## Suggested verification order
1. Item 1 (HIPAA label) — five minutes, highest embarrassment-avoidance value.
2. Items 2–9 (citations) — one sitting with the DOIs; fix the two internal discrepancies (2, 3) while you're there.
3. Items 25–30 (repo spot-checks) — fold into the pre-build blocker session; they're the same working session as B1–B3.
4. Tier 2 — before the Behind the Build case study is drafted (it will invoke several of these frameworks by name).
5. Tier 3 — before any marketing copy; item 20 needs an actual competitive scan.
