# Google Search Console (GSC) Performance & Recovery Tracking Guide — onlinefreetools.online

Step-by-step framework for tracking the organic recovery and growth of `onlinefreetools.online` after re-targeting toward long-tail, high-intent keyword clusters.

---

## 1. Baseline Snapshot (take this first)

Before measuring progress, record the current baseline in GSC:

| Metric | Current value |
|---|---|
| Total impressions (last 90 days) | 5,554 |
| Total clicks (last 90 days) | 4 |
| CTR | ~0.07% |
| Average position | 60–90 |

### GSC filters to save as shared reports
- **Performance → Search results**, set date range to **Last 90 days**.
- **Pages → filter** to the 5 re-targeted tool page groups:
  - `/tools/pixels-to-inches`
  - `/tools/bmi-calculator`
  - `/tools/cron-expression-generator`
  - `/tools/base64-encoder`
  - `/tools/slug-generator`
- Save each as a **shared report** so you can compare week over week.

---

## 2. Weekly Query Tracking (positions ≤ 20)

The single most important routine: find queries already earning impressions that you can win.

**Weekly routine (every Monday, ~15 min):**

1. GSC → Performance → **Queries**.
2. Date range: **Last 28 days** (rolling window smooths noise).
3. Sort by **Impressions** descending; export to CSV.
4. Filter/flag queries where **average position is between 5 and 20** — these are "winnable" because the page is already ranking, just not in the top 5.
5. Track the list in a spreadsheet with columns:
   - Query
   - Current position (28-day avg)
   - Clicks, impressions, CTR
   - Tool/page it maps to
   - **Weeks to move from position X to ≤3** (set a target, e.g., 6–8 weeks)
6. Create a "winnable queries" report and **re-check each week** to see movement.

**Action on rising queries:** if a long-tail query climbs into the top 10, reinforce the page (title, H1, or FAQ that matches that query's intent) — this is how you bank wins.

---

## 3. CTR Recovery Milestones

CTR tracks with position. Set realistic, staged targets:

| Stage | Target CTR | Notes |
|---|---|---|
| 30 days | 0.5–1% | From long-tail clusters starting to rank top 20 |
| 60 days | 1.5–3% | Queries settling into positions 8–15 |
| 90 days | 3–6% | Head of the long-tail clusters reaching positions 3–10 |

**How to improve CTR (not just position):**
- Ensure the **SEO title** front-loads the exact long-tail query the user typed (already applied to the 5 core tools).
- Write a **meta description** that restates the query and promises a concrete answer.
- Add schema that earns rich results — **HowTo** step lists (now added to every tool page), **FAQPage** (added to tools + the FAQ page), **WebApplication** with `offers.price=0` ("free" can surface as a rich result element).
- Use **free** / **online** / **calculator** in titles where the query implies it.

---

## 4. Indexation Status (preventing "Discovered – currently not indexed" / "Crawled – currently not indexed")

A common cause of suppressed impressions is pages that are discovered but never indexed.

**Check:** GSC → **Pages** report → Status column.

**If you see Discovered/Crawled – currently not indexed:**
1. Confirm the page is in the **sitemap** and returns **200**.
2. Confirm the canonical points to itself and there's no duplicate canonical.
3. Ensure **no `noindex`** and it's not blocked by `robots.txt`.
4. Improve **internal linking** to the page (add it to related-tools and related-articles sections of neighbors).
5. Use **URL Inspection → Request Indexing** after confirming it renders correctly.
6. Add **real, indexed content** — pages with thin content are the most likely to sit "Crawled, not indexed." The enriched guide sections added to tools (cron cheat sheet, BMI height-weight lookup, DPI tables) are exactly the depth Google needs to justify indexing.

**Audit cadence:** run the Pages report monthly and re-request indexing for any page stuck for 2+ weeks.

---

## 5. Impressions Recovery (the July 23 drop)

The impressions spike (to ~606/day) during July 3–22 was the fresh-content trial window; the drop from July 23 onward reflects the site competing head-on for high-competition head terms. Recovery = winning where authority threshold is low.

**Monitor:**
- Split impressions by **query category**: developer, calculator, conversion, utility.
- Confirm the **long-tail cluster** impression share is growing even if total impressions are flat.
- Track **clicks** — this is the business metric that matters; impressions without clicks are a discovery problem, clicks are a rank + CTR problem.

---

## 6. 30 / 60 / 90-Day Progress Report Format

Produce a short report at each milestone:

**30 days (content + technical shipped)**
- [ ] Build/tests green, sitemap valid, no 404s on canonical URLs.
- [ ] 5 core tools re-targeted (titles, H1s, descriptions, keywords).
- [ ] HowTo/FAQ/WebApplication schema verified valid in Rich Results Test.
- [ ] Mobile usability collision fixed (cookie + chat FAB).
- [ ] Baseline recorded; winnable-query report created.

**60 days (authority building)**
- [ ] 15+ directory submissions live.
- [ ] Product Hunt + Show HN + 2 community posts published.
- [ ] 30 outreach emails sent; replies logged.
- [ ] First long-tail queries moving into top 20 → top 10.
- [ ] CTR trending toward 1.5–3% on the 5 core tools.

**90 days (compounding)**
- [ ] Queries in positions ≤20 growing week over week.
- [ ] Indexation clean (no stuck pages).
- [ ] First earned backlinks appearing in GSC Links report.
- [ ] Decide next batch of tools to re-target based on the strongest impression clusters.

---

## 7. Key GSC Reports to Revisit

| Report | What it tells you |
|---|---|
| Performance → Queries | Which queries to win next |
| Performance → Pages | Which URLs need work; indexation status |
| Performance → Countries / Devices | Where impressions come from; mobile vs desktop split |
| Links | Earned backlinks as authority builds |
| URL Inspection | Indexation of a specific page |
| Core Web Vitals | Mobile usability + speed signals (CLS, LCP, INP) |
