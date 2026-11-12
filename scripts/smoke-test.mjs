import assert from 'node:assert/strict'

const origin = process.env.SMOKE_ORIGIN || 'http://127.0.0.1:3100'
const checks = [
  ['/', 200, 'Free Online Tools'],
  ['/tools/bmi-calculator', 200, 'BMI'],
  ['/blog/bmi-chart-men-women', 200, 'Adult BMI'],
  ['/sitemap.xml', 200, 'onlinefreetools.online'],
  ['/robots.txt', 200, 'Sitemap:'],
  ['/definitely-missing', 404, ''],
]

for (const [path, expectedStatus, text] of checks) {
  const response = await fetch(`${origin}${path}`, { redirect: 'manual' })
  assert.equal(response.status, expectedStatus, `${path} status`)
  if (text) assert.match(await response.text(), new RegExp(text, 'i'), `${path} body`)
}

for (const [source, destination] of [
  ['/blog/what-is-jwt-token', '/blog/what-is-a-jwt-token'],
  ['/blog/healthy-weight-by-height', '/blog/bmi-chart-by-height'],
  ['/tools/unit-calculator', '/tools/unit-converter'],
]) {
  const response = await fetch(`${origin}${source}`, { redirect: 'manual' })
  assert.ok([301, 308].includes(response.status), `${source} must redirect permanently`)
  assert.equal(new URL(response.headers.get('location'), origin).pathname, destination)
}

console.log(`Smoke checks passed against ${origin}`)

const sitemapXml = await fetch(`${origin}/sitemap.xml`).then((response) => response.text())
const sitemapUrls = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1])
assert.equal(new Set(sitemapUrls).size, sitemapUrls.length, 'Sitemap URLs must be unique')

const titles = new Map()
const descriptions = new Map()
const discoveredPaths = new Set()
for (const absoluteUrl of sitemapUrls) {
  const productionUrl = new URL(absoluteUrl)
  const response = await fetch(`${origin}${productionUrl.pathname}`)
  assert.equal(response.status, 200, `${productionUrl.pathname} sitemap status`)
  const html = await response.text()
  assert.doesNotMatch(html, /<meta[^>]+name=["']robots["'][^>]+noindex/i, `${productionUrl.pathname} must be indexable`)
  const canonical = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)/i)?.[1]
  assert.ok(canonical, `${productionUrl.pathname} canonical`)
  const normalizedCanonical = new URL(canonical)
  assert.equal(normalizedCanonical.origin, productionUrl.origin, `${productionUrl.pathname} canonical origin`)
  assert.equal(normalizedCanonical.pathname.replace(/\/$/, '') || '/', productionUrl.pathname.replace(/\/$/, '') || '/', `${productionUrl.pathname} canonical path`)
  const title = html.match(/<title>(.*?)<\/title>/is)?.[1]?.trim()
  const description = html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)/i)?.[1]?.trim()
  assert.ok(title, `${productionUrl.pathname} title`)
  assert.ok(description, `${productionUrl.pathname} description`)
  assert.ok(!titles.has(title), `Duplicate title on ${productionUrl.pathname} and ${titles.get(title)}`)
  titles.set(title, productionUrl.pathname)
  if (descriptions.has(description)) {
    throw new Error(`Duplicate description on ${productionUrl.pathname} and ${descriptions.get(description)}`)
  }
  descriptions.set(description, productionUrl.pathname)
  for (const match of html.matchAll(/href=["']([^"'#?]+)["']/gi)) {
    try {
      const link = new URL(match[1], 'https://onlinefreetools.online')
      if (link.origin === 'https://onlinefreetools.online') discoveredPaths.add(link.pathname)
    } catch {}
  }
}

for (const pathname of discoveredPaths) {
  if (pathname.startsWith('/_next/') || pathname === '/sitemap.xml') continue
  const response = await fetch(`${origin}${pathname}`, { redirect: 'manual' })
  assert.ok(response.status >= 200 && response.status < 400, `Internal link ${pathname} returned ${response.status}`)
  assert.ok(![301, 308].includes(response.status), `Internal link ${pathname} points to a redirect`)
}

console.log(`Full sitemap/rendered-link checks passed: ${sitemapUrls.length} canonical pages and ${discoveredPaths.size} internal paths.`)
