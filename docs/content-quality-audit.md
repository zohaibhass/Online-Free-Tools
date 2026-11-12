# Content quality audit and complete route inventory

Audit date: 2026-11-12. Inventory is derived from App Router files and the two source catalogs. Query strings do not create separate canonical routes.

## Assessment profiles

Each URL below inherits every field in its profile; exceptions are stated inline.

| Code | Type | Indexability/canonical | Metadata/content/tool/internal links/schema | Recommendation |
|---|---|---|---|---|
| S1 | Home/directory | Index; self-canonical | Unique metadata; useful catalog introduction; HTML navigation; WebSite/WebApplication at root | Keep; refine root schema after operator review |
| D1 | Directory/category | Index; self-canonical | Unique route metadata; crawlable cards; content is concise; no route-specific schema | Keep/improve with non-templated category guidance |
| T1 | Functional tool | Index; self-canonical | Unique catalog metadata; 37 published mapped components; guide/FAQ/related links; WebApplication + breadcrumbs | Keep/improve and regression-test |
| A1 | Distinct article | Index; self-canonical | Unique catalog metadata; long-form HTML, author, related content; Article and conditional FAQ | Keep, fact-check, remove filler/dates when stale |
| A2 | Overlapping article | Redirect source; excluded from sitemap | Same-intent source now permanently redirects directly to a stronger published page | Keep redirect and monitor production/GSC migration |
| A3 | Health/YMYL article | Three indexable destinations; three redirect sources | Surviving content is narrower, sourced, and explicit about limitations/no clinical review | Keep; seek qualified review before expanding medical guidance |
| L1 | Trust/legal | Index; self-canonical | Unique metadata and footer links; no special schema | Keep; owner/legal review |
| N1 | API endpoint | `X-Robots-Tag: noindex`; no canonical needed | JSON health response; no content/navigation/schema | Keep noindex; omit from sitemap |

## Static, directory, trust, and API routes

| URL | Profile | Route-specific note |
|---|---|---|
| `/` | S1 | Primary catalog landing page |
| `/tools` | D1 | Search/filter state stays canonical to `/tools` |
| `/blog` | D1 | Article directory |
| `/category/developer` | D1 | Valid category |
| `/category/document` | D1 | Valid category |
| `/category/calculator` | D1 | Valid category |
| `/category/utility` | D1 | Valid but absent from primary header; footer/category discovery still applies |
| `/about` | L1 | Operator/mission page |
| `/contact` | L1 | Fixed: opens mail client rather than claiming server receipt |
| `/privacy` | L1 | Fixed contact/retention/analytics wording; consent behavior still needs review |
| `/terms` | L1 | Owner/legal review required |
| `/disclaimer` | L1 | Important for calculators/health content |
| `/faq` | L1 | General site FAQ |
| `/api/ping` | N1 | Deliberately excluded from sitemap |
| `/sitemap.xml` | system | Generated discovery file; not a content page |
| `/robots.txt` | system | Allows `/`, disallows `/api/`, declares sitemap |

Unknown `/tools/*`, `/blog/*`, and `/category/*` values return a real 404; fallback metadata is now noindex.

## Tool routes

All are T1. Privacy caveat: QR generation sends entered content to `api.qrserver.com`; the other audited implementations are browser components, but network behavior should be rechecked after every dependency/tool change.

| URL | URL | URL |
|---|---|---|
| `/tools/json-formatter` | `/tools/jwt-decoder` | `/tools/regex-tester` |
| `/tools/sql-formatter` | `/tools/base64-encoder` | `/tools/url-encoder` |
| `/tools/hash-generator` | `/tools/color-converter` | `/tools/code-minifier` |
| `/tools/diff-checker` | `/tools/xml-formatter` | `/tools/uuid-generator` |
| `/tools/word-counter` | `/tools/qr-code-generator` | `/tools/markdown-editor` |
| `/tools/image-compressor` | `/tools/text-to-speech` | `/tools/json-to-csv` |
| `/tools/text-to-html` | `/tools/unit-converter` | `/tools/loan-calculator` |
| `/tools/percentage-calculator` | `/tools/mortgage-calculator` | `/tools/age-calculator` |
| `/tools/bmi-calculator` | `/tools/discount-calculator` | `/tools/tip-calculator` |
| `/tools/pixels-to-inches` | `/tools/password-generator` | `/tools/random-name-generator` |
| `/tools/todo-list` | `/tools/timer-stopwatch` | `/tools/dice-roller` |
| `/tools/coin-flipper` | `/tools/morse-code-translator` | `/tools/unit-calculator` → 308 `/tools/unit-converter` |
| `/tools/slug-generator` | `/tools/cron-expression-generator` |  |

Priority functional review: `/tools/pixels-to-inches` (historical demand), `/tools/bmi-calculator` (health/YMYL), loan/mortgage calculations, client-side image handling, JWT security wording, QR external transmission, and browser-dependent text-to-speech. The source mapping proves existence, not mathematical correctness in every edge case.

## Article routes

### Distinct articles (A1)

| URL | URL |
|---|---|
| `/blog/how-jwt-authentication-works` | `/blog/sha256-vs-md5` |
| `/blog/url-encoding-explained` | `/blog/what-is-json` |
| `/blog/free-developer-tools` | `/blog/sql-formatting-best-practices` |
| `/blog/color-formats-hex-rgb-hsl` | `/blog/secure-password-storage-practices` |
| `/blog/save-time-with-browser-tool-workflows` | `/blog/real-world-regex-testing-tips` |
| `/blog/base64-encoding-beyond-the-basics` | `/blog/color-theory-for-web-developers` |
| `/blog/javascript-code-minification-guide` | `/blog/how-to-compare-files-like-a-pro` |
| `/blog/uuid-best-practices-2026` | `/blog/xml-vs-json-vs-yaml-choosing-right-format` |
| `/blog/text-analysis-for-seo` | `/blog/qr-codes-modern-marketing` |
| `/blog/mastering-markdown-technical-documentation` | `/blog/text-to-speech-web-accessibility` |
| `/blog/json-to-csv-data-migration` | `/blog/plain-text-to-semantic-html` |
| `/blog/unit-conversion-pitfalls-software` | `/blog/loan-mathematics-every-developer-should-know` |
| `/blog/percentage-calculations-developers-get-wrong` | `/blog/mortgage-calculator-total-cost-homeownership` |
| `/blog/age-verification-web-applications` | `/blog/building-ecommerce-discount-systems` |
| `/blog/tipping-calculator-logic-pos-systems` | `/blog/pixels-to-inches-conversion-guide` |
| `/blog/dpi-vs-ppi-explained` | `/blog/convert-image-pixels-to-inches-for-print` |
| `/blog/common-screen-resolutions-in-inches` | `/blog/what-is-a-url-slug` |
| `/blog/seo-friendly-url-slug-best-practices` | `/blog/bulk-slug-generation-for-content-migration` |
| `/blog/guid-vs-uuid-difference` | `/blog/when-to-use-uuid-guid-in-development` |
| `/blog/can-you-decode-jwt-without-secret` | `/blog/what-is-a-cron-expression` |
| `/blog/cron-vs-quartz-cron-difference` | `/blog/common-cron-expression-examples` |
| `/blog/dice-roll-vs-coin-flip-random-decision-tools` | `/blog/timeboxing-pomodoro-simple-productivity-tools` |
| `/blog/how-morse-code-works-guide` | `/blog/how-to-generate-names-for-projects-characters-brands` |
| `/blog/dice-probability-explained` | `/blog/task-prioritization-methods-gtd-eisenhower` |

`/blog/common-screen-resolutions-in-inches` and `/blog/cron-vs-quartz-cron-difference` had historical impressions and should receive manual accuracy/intent review before lower-demand articles.

### Consolidated overlap clusters (A2)

| URLs | Evidence/recommendation |
|---|---|
| `/blog/what-is-jwt-token` → `/blog/what-is-a-jwt-token` | Same introductory intent; destination has broader structure/security coverage. |
| `/blog/base64-encoding-explained` → `/blog/what-is-base64-encoding` | Same explanatory intent; destination retains the direct definition/use-case intent. |
| `/blog/md5-vs-sha256` → `/blog/sha256-vs-md5` | Reversed-title comparison; destination foregrounds the current algorithm. |
| `/blog/image-compression-guide` → `/blog/how-to-compress-images-for-web` | Same workflow intent; destination states the user task directly. |
| `/blog/regex-guide-beginners` → `/blog/what-is-regex` | Same beginner intent; destination is the broader concept URL. |

All redirects are permanent, direct, excluded from static params/sitemap, and tested against chains. Source copy remains in Git history/source data for editorial traceability, not as public routes.

### Health/YMYL cluster (A3)

| URL | Primary concern/action |
|---|---|
| `/blog/bmi-chart-men-women` | Rewritten as the standard adult category/limitations destination; explicitly explains same adult categories regardless of sex and cites CDC/NHLBI. |
| `/blog/bmi-health-metrics-developers` | Rewritten as a developer implementation/testing guide with full-precision boundary guidance. |
| `/blog/what-is-a-healthy-bmi-for-men` | 308 to `/blog/bmi-chart-men-women`; no separate adult male thresholds. |
| `/blog/what-is-a-healthy-bmi-for-women` | 308 to `/blog/bmi-chart-men-women`; no separate adult female thresholds. |
| `/blog/bmi-chart-by-height` | Rewritten as arithmetic threshold-by-height reference with rounding methodology. |
| `/blog/healthy-weight-by-height` | 308 to `/blog/bmi-chart-by-height`; unsupported “ideal weight” intent removed. |

## Individual-review outcome

- 55 published articles: 52 retain a distinct developer, workflow, conversion, productivity, or technical-education intent; three BMI destinations were fully rewritten.
- Eight same-intent article sources are permanently redirected as listed above.
- 37 tools remain published. Unit Calculator is the only tool removed from the catalog because its four-function implementation contradicted dimensional-calculation claims and duplicated Unit Converter.
- Code Minifier now discloses its regex/whitespace limitations; Text to Speech distinguishes synthesized playback from microphone recording; BMI uses six CDC adult categories and non-diagnostic language.
- The original source catalog still contains formulaic passages in otherwise distinct articles. These remain an editorial-quality risk for future human review, but no additional URL was removed solely for style or low traffic.

## Major-change justification

- Keep all functional tools because each maps to an implementation and provides direct utility; low traffic alone is not a removal reason.
- Do not broadly noindex weak content. Consolidation is limited to demonstrably overlapping intent and awaits external performance/link evidence.
- Health content needs revision because accuracy and harm avoidance matter more than retaining keyword coverage.
- Trust pages remain indexable and sitewide-linked because they help users understand ownership, data behavior, and limitations.
