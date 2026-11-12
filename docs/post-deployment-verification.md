# Production deployment and post-deployment verification

Date: 2026-11-12
Release branch: `SEO-FIX-11-11-2026`
Production branch observed on the remote: `ONLINE-FREE-TOOLS-PRODUCTION`
Production origin: `https://onlinefreetools.online`

## Current checkpoint

**STOPPED BEFORE DEPLOYMENT APPROVAL.** No commit, push, merge, Vercel deployment, DNS change, domain change, or production-environment mutation was performed. Live checks in this document are pending by design.

## Pre-deployment checks

### Working tree and diff review

- Reviewed the complete tracked diff, untracked file inventory, dependency manifest/lockfile changes, application configuration, redirect rules, consent implementation, public SEO files, and Phase 1-3 reports.
- The working tree contains the combined Phase 1-3 remediation plus this Phase 4 documentation/README correction. The obsolete `lib/blog-posts.js` is intentionally removed in favor of the TypeScript catalog.
- The large `package-lock.json` change is explained by restoring Jest, Testing Library, and ESLint tooling and their transitive development dependencies.
- `git diff --check` passes. Git reports only expected LF-to-CRLF conversion notices on Windows.
- No unrelated change was overwritten or discarded.

### Secrets and environment

- `.env` is tracked. It contains three `NEXT_PUBLIC_*` values only: the production base URL, Google Analytics measurement ID, and AdSense client ID. These are public browser configuration values, not server secrets.
- A diff/repository pattern scan found no added private key, API secret, password, bearer credential, client secret, or private access token.
- `NEXT_PUBLIC_BASE_URL` equals `https://onlinefreetools.online`.
- The GA value has the expected `G-...` measurement-ID format.
- The AdSense value has the expected `ca-pub-...` format and matches the publisher number declared by `public/ads.txt`.
- **Owner confirmation required:** local consistency cannot prove ownership of the GA property or AdSense account. Confirm the same three values in the Vercel Production environment and confirm that publisher `pub-3491641485391296` belongs to the active AdSense account.
- Do not add server secrets to `NEXT_PUBLIC_*` variables; those values are embedded in browser bundles.

### SEO and application configuration

- Canonical origin is centralized through `NEXT_PUBLIC_BASE_URL`/`SITE_URL` and resolves locally to the production HTTPS origin.
- `public/robots.txt` allows public routes and declares `https://onlinefreetools.online/sitemap.xml`.
- The generated sitemap contains 105 unique canonical URLs: static pages, 37 tools, 55 published articles, and four categories.
- Eight consolidated article URLs and the retired `unit-calculator` route use direct permanent redirects. Existing pixel-converter aliases also redirect directly. The production crawl found no internal redirect hops.
- Missing dynamic pages return 404 and use noindex metadata fallbacks.
- `public/og-image.jpg` exists and is 1200 x 630 as previously validated.
- `public/ads.txt` contains `google.com, pub-3491641485391296, DIRECT, f08c47fec0942fa0`.

### Automated validation performed

| Check | Result |
|---|---|
| `npm run build` | PASS; 109 pages generated |
| `npm run typecheck` | PASS |
| `npm run lint` | PASS; 0 errors and 0 warnings |
| `npm test -- --runInBand` | PASS; 4 suites and 115 tests |
| `npm run test:seo` | PASS; 37 tools, 55 articles, 8 direct article redirects |
| `npm run test:smoke` | PASS against local production server; 105 canonical pages and 112 internal paths |
| `git diff --check` | PASS; no whitespace errors |

Phase 3 headless-browser QA also passed seven representative pages at 390, 768, and 1280 px, including BMI interaction, overflow, runtime exceptions, and consent gating.

### Deployment and monetization blockers

No code/build/test blocker was found. The following owner-controlled checks must be resolved at the approval checkpoint:

1. Confirm in Vercel that this GitHub repository is connected, `ONLINE-FREE-TOOLS-PRODUCTION` is the Production Branch, and `onlinefreetools.online` is assigned to that production project.
2. Confirm the Vercel Production environment contains the reviewed public base URL, GA measurement ID, and AdSense client ID. Do not change them merely to perform this release.
3. Confirm ownership of AdSense publisher `pub-3491641485391296` and the GA property.
4. The local consent banner is not a Google-certified CMP. Before serving personalized ads in the EEA, UK, or Switzerland, configure a Google-certified CMP supporting the required TCF flow, or keep AdSense disabled for affected traffic. This blocks an AdSense resubmission and may block enabling ads in those jurisdictions; it does not invalidate the application build.
5. Approve the generated Open Graph image and final legal/operator/health wording.

## Existing deployment workflow

No `vercel.json`, `.vercel/project.json`, or repository GitHub Actions workflow exists. The remote default/production branch and project dependencies indicate a Git-connected Vercel workflow, but the repository alone cannot prove the current Vercel project mapping.

The safest release path is a pull request into `ONLINE-FREE-TOOLS-PRODUCTION`, use the connected Vercel Preview deployment for verification, and merge only after approval. Do not use `vercel --prod` from this checkout unless the owner deliberately links and verifies the correct Vercel project first.

## Exact deployment instructions — not executed

After the owner confirms the blockers above and explicitly approves the release:

```powershell
git status --short
git diff --check
npm ci
npm run typecheck
npm run lint
npm test -- --runInBand
npm run test:seo
npm run build
git add -A
git diff --cached --stat
git diff --cached --check
git commit -m "Complete SEO recovery and production readiness remediation"
git push -u origin SEO-FIX-11-11-2026
```

Then:

1. Open a pull request from `SEO-FIX-11-11-2026` to `ONLINE-FREE-TOOLS-PRODUCTION`.
2. Confirm the PR contains only the reviewed release inventory and that Vercel creates a Preview deployment for the correct project.
3. Run the post-deployment checklist below against the Preview URL. `SMOKE_ORIGIN=https://preview-host npm run test:smoke` can automate the canonical/status/link checks, but canonical expectations intentionally remain the production origin.
4. Review the Preview deployment logs and browser console. Confirm no production environment value was unintentionally overridden.
5. After explicit merge approval, merge through the repository's normal protected-branch process.
6. Monitor the Vercel production deployment to completion. Do not change DNS or domains.
7. Run the live checks below against `https://onlinefreetools.online`. If a release-critical check fails, use Vercel's previous known-good deployment rollback rather than changing DNS.

## Live checks actually performed

None in Phase 4. The user explicitly required stopping at the deployment approval checkpoint. Prior local production-server checks are recorded above and must not be confused with live verification.

## Checks pending deployment

All items below are **PENDING**, not passed:

- `GET /` returns 200 over HTTPS with the expected production version.
- `GET /robots.txt`, `/sitemap.xml`, `/ads.txt`, and `/og-image.jpg` return 200 and correct content types.
- Homepage, representative tool/article/category pages, and legal pages declare self-referencing production canonicals.
- Each retired article/tool URL returns a single 301/308 to its intended destination without a chain.
- Representative tools function in the live browser, including BMI calculation, JSON formatting, image handling, and the QR tool's external rendering dependency.
- Representative articles and `/privacy`, `/terms`, `/disclaimer`, `/about`, and `/contact` are accessible.
- Layout has no horizontal overflow at 390, 768, and 1280 px.
- Open Graph metadata resolves to the 1200 x 630 image.
- WebSite, tool, article, breadcrumb, and FAQ structured data are present where expected and parse without errors.
- Before consent, no GA/AdSense scripts or ad slots load. Acceptance persists and enables configured scripts; rejection persists and leaves them absent after a fresh navigation.
- Browser console has no application runtime exceptions. Third-party network failures must be recorded separately rather than hidden.
- Live output matches the validated local build and the deployed commit SHA matches the approved release.

## Search Console owner actions

Do not infer indexing from a successful deployment or sitemap response.

1. In the Search Console property for `https://onlinefreetools.online/`, open **Sitemaps**, submit `https://onlinefreetools.online/sitemap.xml`, and record the submitted/read dates and discovered URL count.
2. Use **URL Inspection** for `/`, `/tools`, `/blog`, one tool in each category, `bmi-chart-men-women`, `bmi-chart-by-height`, and at least two consolidated redirect destinations. Run **Test live URL** after deployment.
3. For each inspected canonical page, compare **User-declared canonical** and **Google-selected canonical**. Record mismatches; do not request indexing for a URL whose live canonical/status/content is wrong.
4. Inspect representative retired URLs and confirm Google observes the permanent redirect and destination rather than a redirect error or old canonical.
5. In **Page indexing**, export the report and review `Duplicate without user-selected canonical`, `Alternate page with proper canonical`, `Crawled - currently not indexed`, `Discovered - currently not indexed`, `Soft 404`, `Not found`, and redirect errors.
6. In **Performance > Search results**, compare page and query data for the last 28 days with the previous 28 days, then repeat with a three-month comparison. Sort by impression difference to identify declining pages; separate ranking loss from reduced query demand by examining position, CTR, and query mix.
7. Track weekly clicks, impressions, CTR, and average position for the homepage, tool directory, article directory, health pages, and historically important tool/article groups. Annotate the deployment date externally.
8. Check **Manual actions**, **Security issues**, **Core Web Vitals**, and crawl statistics. Export evidence before any AdSense resubmission.

## AdSense owner actions

1. Confirm `pub-3491641485391296` in the active AdSense account and verify the live `/ads.txt` status inside AdSense after recrawl.
2. Confirm the production client ID equals `ca-pub-3491641485391296` and that every configured ad slot belongs to the same account.
3. Configure a Google-certified CMP/TCF flow where required; do not describe the current custom banner as certified.
4. Verify the live privacy policy accurately lists enabled analytics, advertising, hosting, chat, external QR, and consent behavior.
5. Test the mailto contact workflow on desktop and mobile and confirm the mailbox is monitored.
6. Review About, Terms, Privacy, Disclaimer, and health content with the responsible owner/legal or qualified medical reviewer where appropriate.
7. Confirm there are no placeholder, inaccessible, empty, or broken pages in the live deployment and retain the catalog-wide test results as supporting evidence.
8. Complete Search Console checks and allow the deployed pages to be crawled before manually requesting a new AdSense review. Do not assume or promise approval.

## Approval checkpoint

Release preparation is complete locally. Deployment remains blocked on explicit user approval plus confirmation of the Vercel production mapping/environment and the owner-controlled publisher/legal/CMP decisions above.
