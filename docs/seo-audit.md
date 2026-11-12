# Technical SEO audit

Audit date: 2026-11-12. Scope: repository at `1c04e1b` plus the uncommitted remediation, all App Router routes, 37 published tools, 55 published articles, eight direct article redirects, one consolidated tool redirect, four categories, trust pages, configuration, and available Git history.

## Executive finding

The visibility decline cannot be attributed to one confirmed indexing failure. Public pages are crawlable, canonical URLs use HTTPS, and `robots.txt` allows crawling. The strongest confirmed problems were inaccurate sitemap freshness, unnecessary runtime rendering of all articles, build-time dependence on Google Fonts, weak quality control, misleading contact behavior, and substantial topic overlap. Historical average position 67 and CTR 0.07% are more consistent with weak relevance/quality and low rankings than a CTR-only problem. Current indexing and manual-action status require Search Console URL Inspection/Coverage data.

No Search Console XLSX or CSV export exists in the workspace. The supplied aggregates are therefore treated as context; no query-level conclusion is invented.

## Architecture and inventory summary

- Next.js 16.2.6, React 19, TypeScript, App Router.
- Static/prerendered: home, directories, categories, trust pages, all known tool and article slugs after remediation. `/api/ping` is dynamic and returns `X-Robots-Tag: noindex`.
- Catalogs: `lib/tools.ts` (37 published tools; the misleading Unit Calculator is redirected), `lib/blog-posts.ts` (55 published articles; eight source articles redirect to consolidated destinations).
- Metadata: route exports plus `lib/seo.ts`; canonical origin comes from `lib/config.ts`.
- Discovery: HTML header/footer links, category/tool/article links, `app/sitemap.ts`, and `public/robots.txt`.
- Structured data: site-wide WebApplication/WebSite; WebApplication and BreadcrumbList on tools; Article and conditional FAQPage on articles. No fake ratings/reviews found.
- Analytics/ads: Vercel Analytics, GA4, AdSense loader, `ads.txt`, and ad components. Consent currently records a choice but scripts load before that choice; this remains a privacy/compliance action, not a search-indexing diagnosis.
- Deployment target is consistent with Vercel/Next.js, but no deployment workflow is present. No deployment was attempted.

## Findings

| Priority | Status | Evidence and impact | Action |
|---|---|---|---|
| P0 | Fixed | Contact form set success without sending anything; privacy claimed submissions were collected/retained. This undermined trust. | Form now opens a transparent email draft; claims and retention text match behavior. |
| P0 | Fixed | `next.config.mjs` ignored TypeScript build errors. Broken production behavior could ship. | Removed bypass; added `typecheck` script. |
| P1 | Fixed | Sitemap assigned `new Date()` to static/tools/categories on every generation, falsely reporting all content as freshly changed. | Stable reviewed date; article publication dates retained. |
| P1 | Fixed | Every article used `force-dynamic`, increasing server work and making delivery less deterministic despite local static content. | Added `generateStaticParams`; removed forced runtime rendering. Tools/categories also expose static params. |
| P1 | Fixed | Production build downloaded Inter/Geist from Google. Restricted/offline builds failed. | Preserved typography through a system-font stack; build compilation is now network-independent. |
| P1 | Fixed | Five developer-content pairs and three BMI pages duplicated the destination search intent. | Removed sources from the published catalog; added direct permanent redirects; sitemap/static params now contain destinations only. |
| P1 | Fixed with review caveat | Health pages contained sex-specific adult BMI implications, “ideal” targets, and unsupported risk/frame claims. | Replaced three surviving pages with focused sourced copy; redirected three redundant pages; corrected calculator categories/copy. Qualified clinical review remains advisable and is not claimed. |
| P1 | Partially fixed; external blocker | GA4/AdSense scripts loaded before the banner choice. | All analytics/ad scripts and slots are now opt-in. A Google-certified TCF CMP is still required for personalized ads in the EEA, UK, and Switzerland and cannot be truthfully fabricated in code. |
| P2 | Fixed | Unknown dynamic paths lacked explicit robots metadata in metadata fallback. | Added `noindex, nofollow`; runtime still returns a real 404 through `notFound()`. |
| P2 | Fixed | `og-image.jpg` was referenced but absent. | Added an original 1200×630, 78 KB social preview asset. |
| P2 | Fixed | Root schema classified the entire directory as one WebApplication. | Root now uses WebSite with the verified operator name; individual tools retain WebApplication schema. |
| P2 | Fixed | The service worker could show cached home content for an unavailable deep URL. | Offline cache miss now returns 503 instead of unrelated home HTML. |
| P3 | Fixed | Global `Cache-Control: public, max-age=0, must-revalidate` overrode platform defaults broadly. | Removed the blanket override; Next/platform defaults apply. |

## Decline diagnosis

Confirmed code issues are the freshness signal, runtime rendering choice, quality overlap, and weak trust behavior above. Git history shows a dense sequence of design, performance, metadata, content, duplicate-data, and content-enhancement changes from 2026-07-18 through 2026-08-02. No later commit exists locally, so this repository cannot establish what production deployed after August or what changed when the recent decline occurred.

Hypotheses requiring Search Console verification:

1. Google reevaluated a large, quickly expanded set of similar articles as low-value or redundant.
2. Competing canonical/duplicate URLs diluted topic signals.
3. Some URLs are crawled/discovered but not indexed, or indexed with a Google-selected canonical different from the declared one.
4. Ranking loss, rather than deindexing, explains the near-zero recent impressions.

Required evidence: Page Indexing export, Sitemaps report, Manual Actions/Security Issues, URL Inspection for the five historical-opportunity pages, query/page/date performance export, crawl stats, and production HTTP/rendered HTML samples.

## Verification criteria

The repository check `npm run test:seo` validates catalog uniqueness, all 37 published tool/component mappings, eight direct article consolidations without chains, HTTPS canonical origin, crawlable robots rules, sitemap declaration, OG asset presence, and stable sitemap dates. Full results are in `seo-implementation-report.md`.

## Phase 2 evidence

- Removed obsolete `lib/blog-posts.js`, which shadowed the maintained TypeScript catalog in Jest resolution.
- Consolidated five generic developer article pairs and three redundant health articles with permanent redirects.
- Consolidated the falsely advertised Unit Calculator into the functional Unit Converter.
- Corrected overclaims on Code Minifier and Text to Speech.
- Production build now generates 109 static pages: 55 article paths, 37 tool paths, and four category paths plus static pages.
- Search Console exports remain absent, so production index selection, backlinks, and manual-action status remain external checks.
