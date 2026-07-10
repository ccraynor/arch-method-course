# Module 2-4 Reading-Enrichment Cards — DRAFT (Task 4)

Six ready-to-place reading-enrichment card snippets (2 per module × M2/M3/M4). **Markup
matches the live, corrected Module 1 cards** (m1-l1a-s5, m1-l2-s6); **citation content is
transcribed from the tracker** Docs/ARCH_Method_Reading_Map_Tracker.xlsx (commit 08e3c0e).
Nothing invented. Citation authority (ruled 2026-07-09): built course citations >
tracker > companion guide — before placing each card, verify its citation against the
built course convention and the DOI once; if the tracker diverges, correct the tracker.

**PLACEMENT happens during each module's build** — these are drafts to drop in, not
screen changes. Module 1's two cards are already built and live.

## Format conventions (from the M1 template + decisions)
- Exact M1 markup: `<details class="table-disclosure optional-reading"
  data-optional-enrichment data-persist-key="optReading_…_open" open>` → `summary`
  (`Optional` / `Optional Reading` / hidden `Skip (optional)`) → `__body` with
  `__citation` + `__search`.
- APA 7: author `Lastname, F. M. (Year).`; sentence-case titles; source title in `<em>`;
  `&amp;` for ampersands.
- **Journal DOIs kept as PLAIN TEXT** (decision, this task): APA-correct for journal
  articles and not an `<a href>` hyperlink, so it honors the no-hyperlinks rule. (M1's
  cards omit DOIs only because both are book chapters, which don't carry one — not a
  "drop DOIs" rule.) Journal format: `<em>Journal, Vol</em>(Issue), pp–pp.` + DOI.
- Search instruction (M1 phrasing, composed from the citation's author/year/title/source,
  not a tracker field): `To find this resource, search [terms] in Google. It is openly
  accessible.`
- `data-persist-key` is a `[SET AT PLACEMENT]` placeholder — set it to the real host
  lesson and register the key in CLAUDE.md + governance before use.

## Flags
- **No ambiguous/missing tracker fields** for the 6 M2-4 cards — all "Ready", full APA,
  URL, access type, reading time.
- **M1 Lens-2 (Drysdale) citation conflict** — the live m1-l2-s6 card cites a *different*
  Drysdale work than the tracker. That is an **M1 fix**, logged separately in the punch
  list; it does not affect these M2-4 drafts (M2-4 use their own tracker sources).
- URLs (non-DOI) are intentionally NOT rendered (no-hyperlinks rule); DOIs are kept as
  plain text per the decision above. Full URLs remain in the tracker for verification.

---

# Module 2 — Engineer the Learning
<!-- Theme: Pedagogical sequencing, spiral reinforcement, learning-science optimization.
     Phase: supports Phases 3-4 (Engineer the Learning). -->

## M2 — Lens 1 (Research Anchor)
<!-- Module 2 | Lens 1 research anchor | Weinstein et al. 2018 | Phase 3-4 |
     Focus: spacing/interleaving/retrieval as architectural decisions (Steps 9-11), not
     study tips | ~25-30 min | peer-reviewed, PMC CC-BY 4.0.
     Suggested host: end of an M2 lesson reflection screen. -->
```html
<details class="table-disclosure optional-reading" data-optional-enrichment data-persist-key="optReading_[SET AT PLACEMENT]_open" open>
  <summary class="table-disclosure__summary">
    <span class="screen-type-label">Optional</span>
    <span class="optional-reading__title">Optional Reading</span>
    <span class="optional-reading__skip" hidden>Skip (optional)</span>
  </summary>
  <div class="optional-reading__body">
    <p class="optional-reading__citation">Weinstein, Y., Madan, C. R., &amp; Sumeracki, M. A. (2018). Teaching the science of learning. <em>Cognitive Research: Principles and Implications, 3</em>(1), Article 2. https://doi.org/10.1186/s41235-017-0087-y</p>
    <p class="optional-reading__search">To find this resource, search Weinstein Madan Sumeracki 2018 Teaching the science of learning Cognitive Research in Google. It is openly accessible.</p>
  </div>
</details>
```

## M2 — Lens 2 (Practitioner Example)
<!-- Module 2 | Lens 2 practitioner example | MIT Open Learning (n.d.) | Phase 3-4 |
     Focus: what spacing/interleaving look like applied | ~8-10 min | MIT institutional
     resource, public. Suggested host: same/adjacent M2 reflection screen as Lens 1. -->
```html
<details class="table-disclosure optional-reading" data-optional-enrichment data-persist-key="optReading_[SET AT PLACEMENT]_open" open>
  <summary class="table-disclosure__summary">
    <span class="screen-type-label">Optional</span>
    <span class="optional-reading__title">Optional Reading</span>
    <span class="optional-reading__skip" hidden>Skip (optional)</span>
  </summary>
  <div class="optional-reading__body">
    <p class="optional-reading__citation">MIT Open Learning. (n.d.). Spaced and interleaved practice. Massachusetts Institute of Technology.</p>
    <p class="optional-reading__search">To find this resource, search MIT Open Learning spaced and interleaved practice in Google. It is openly accessible.</p>
  </div>
</details>
```

---

# Module 3 — Stress-Test the Design
<!-- Theme: Structural diagnostic review, constraint validation, pre-development audit.
     Phase: supports Phases 5-6 (Stress-Test the Design). -->

## M3 — Lens 1 (Research Anchor)
<!-- Module 3 | Lens 1 research anchor | Jahnke et al. 2021 | Phase 5-6 |
     Focus: why systematic diagnostic review before development is professionally
     necessary | ~20-25 min | peer-reviewed, OLC CC-BY 4.0.
     Suggested host: end of an M3 lesson reflection screen. -->
```html
<details class="table-disclosure optional-reading" data-optional-enrichment data-persist-key="optReading_[SET AT PLACEMENT]_open" open>
  <summary class="table-disclosure__summary">
    <span class="screen-type-label">Optional</span>
    <span class="optional-reading__title">Optional Reading</span>
    <span class="optional-reading__skip" hidden>Skip (optional)</span>
  </summary>
  <div class="optional-reading__body">
    <p class="optional-reading__citation">Jahnke, I., Riedel, N., Singh, K., &amp; Moore, J. (2021). Advancing sociotechnical-pedagogical heuristics for the usability evaluation of online courses for adult learners. <em>Online Learning, 25</em>(4). https://doi.org/10.24059/olj.v25i4.2439</p>
    <p class="optional-reading__search">To find this resource, search Jahnke 2021 sociotechnical-pedagogical heuristics usability online courses Online Learning in Google. It is openly accessible.</p>
  </div>
</details>
```

## M3 — Lens 2 (Practitioner Example)
<!-- Module 3 | Lens 2 practitioner example | Smith & Luo 2024 | Phase 5-6 |
     Focus: why structured review beats informal checking (culture of feedback) |
     ~20-25 min | peer-reviewed, Springer TechTrends CC-BY 4.0.
     Suggested host: same/adjacent M3 reflection screen as Lens 1. -->
```html
<details class="table-disclosure optional-reading" data-optional-enrichment data-persist-key="optReading_[SET AT PLACEMENT]_open" open>
  <summary class="table-disclosure__summary">
    <span class="screen-type-label">Optional</span>
    <span class="optional-reading__title">Optional Reading</span>
    <span class="optional-reading__skip" hidden>Skip (optional)</span>
  </summary>
  <div class="optional-reading__body">
    <p class="optional-reading__citation">Smith, S., &amp; Luo, T. (2024). Identifying support structures associated with informal formative evaluation in instructional design. <em>TechTrends, 68</em>(2). https://doi.org/10.1007/s11528-024-00947-0</p>
    <p class="optional-reading__search">To find this resource, search Smith Luo 2024 informal formative evaluation instructional design TechTrends in Google. It is openly accessible.</p>
  </div>
</details>
```

---

# Module 4 — Structural Freeze
<!-- Theme: Learner-experience stress testing, micro-optimization, the Structural Freeze
     Declaration. Phase: supports Phases 7-8 (Structural Freeze). -->

## M4 — Lens 1 (Research Anchor)
<!-- Module 4 | Lens 1 research anchor | Lachheb & Boling 2021 | Phase 7-8 |
     Focus: why explicit, traceable design decisions are a professional discipline
     (rationale behind the Freeze Declaration) | ~15-20 min | EdTech Books CC-BY-NC.
     Suggested host: end of an M4 lesson reflection screen. -->
```html
<details class="table-disclosure optional-reading" data-optional-enrichment data-persist-key="optReading_[SET AT PLACEMENT]_open" open>
  <summary class="table-disclosure__summary">
    <span class="screen-type-label">Optional</span>
    <span class="optional-reading__title">Optional Reading</span>
    <span class="optional-reading__skip" hidden>Skip (optional)</span>
  </summary>
  <div class="optional-reading__body">
    <p class="optional-reading__citation">Lachheb, A., &amp; Boling, E. (2021). The role of design judgment and reflection in instructional design. In J. K. McDonald &amp; R. E. West (Eds.), <em>Design for learning: Principles, processes, and praxis</em>. EdTech Books.</p>
    <p class="optional-reading__search">To find this resource, search Lachheb Boling 2021 design judgment reflection instructional design Design for Learning EdTech Books in Google. It is openly accessible.</p>
  </div>
</details>
```

## M4 — Lens 2 (Practitioner Example)
<!-- Module 4 | Lens 2 practitioner example | Totino & Kessler 2024 | Phase 7-8 |
     Focus: what traceable decision documentation looks like in practice | ~12-15 min |
     peer-reviewed, JAID / EdTech Books CC.
     Suggested host: same/adjacent M4 reflection screen as Lens 1. -->
```html
<details class="table-disclosure optional-reading" data-optional-enrichment data-persist-key="optReading_[SET AT PLACEMENT]_open" open>
  <summary class="table-disclosure__summary">
    <span class="screen-type-label">Optional</span>
    <span class="optional-reading__title">Optional Reading</span>
    <span class="optional-reading__skip" hidden>Skip (optional)</span>
  </summary>
  <div class="optional-reading__body">
    <p class="optional-reading__citation">Totino, L., &amp; Kessler, A. (2024). "Why did we do that?" A systematic approach to tracking decisions in the design and iteration of learning experiences. <em>Journal of Applied Instructional Design, 13</em>(2). https://doi.org/10.59668/1269.15630</p>
    <p class="optional-reading__search">To find this resource, search Totino Kessler 2024 tracking decisions design iteration learning experiences Journal of Applied Instructional Design in Google. It is openly accessible.</p>
  </div>
</details>
```

---

## Placement checklist (per card, at module-build time)
- [ ] Drop the snippet onto the chosen host screen (lesson reflection or a new optional screen).
- [ ] Replace `optReading_[SET AT PLACEMENT]_open` with the real host-lesson key; register it in CLAUDE.md + governance localStorage list.
- [ ] Confirm optionalEnrichment.js is imported on the host screen (Skip-label + Focused-Practice exclusion).
- [ ] Verify the citation renders, no `<a href>` hyperlink is present, and the card is excluded from the progress-tracker unit count.
