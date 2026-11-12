import assert from 'node:assert/strict'
import fs from 'node:fs'

const read = (path) => fs.readFileSync(path, 'utf8')
const extractSlugs = (source, marker) => {
  const section = source.slice(source.indexOf(marker))
  return [...section.matchAll(/\n\s+slug:\s*['"]([^'"]+)/g)].map((match) => match[1])
}

const toolsSource = read('lib/tools.ts')
const blogsSource = read('lib/blog-posts.ts')
const toolPage = read('app/tools/[slug]/page.tsx')
const sitemap = read('app/sitemap.ts')
const robots = read('public/robots.txt')
const config = read('lib/config.ts')

const allTools = extractSlugs(toolsSource, 'const allTools')
const tools = allTools.filter((slug) => slug !== 'unit-calculator')
const allBlogs = extractSlugs(blogsSource, 'const allBlogPosts')
const redirectPairs = [...blogsSource.matchAll(/^\s{2}'([^']+)': '([^']+)',$/gm)]
  .map(([, source, destination]) => ({ source, destination }))
const componentSlugs = [...toolPage.matchAll(/^\s+['"]([^'"]+)['"]:\s+dynamic/gm)].map((match) => match[1])

assert.equal(tools.length, 37, 'Expected 37 published tools after unit-calculator consolidation')
assert.equal(new Set(tools).size, tools.length, 'Tool slugs must be unique')
assert.equal(new Set(allBlogs).size, allBlogs.length, 'Blog slugs must be unique')
assert.equal(redirectPairs.length, 8, 'Expected eight reviewed article consolidations')
for (const { source, destination } of redirectPairs) {
  assert.notEqual(source, destination)
  assert.ok(allBlogs.includes(destination), `${source} destination must exist`)
  assert.ok(!redirectPairs.some((pair) => pair.source === destination), `${source} must not create a redirect chain`)
}
assert.deepEqual([...componentSlugs].sort(), [...tools].sort(), 'Every catalog tool needs exactly one component mapping')
assert.match(config, /https:\/\/onlinefreetools\.online/, 'Canonical origin must use the production HTTPS URL')
assert.match(robots, /Allow:\s*\//, 'robots.txt must allow public crawling')
assert.match(robots, /Sitemap:\s*https:\/\/onlinefreetools\.online\/sitemap\.xml/, 'robots.txt must advertise the canonical sitemap')
assert.doesNotMatch(sitemap, /new Date\(\)/, 'Sitemap must not claim every request time as last modification')
assert.match(sitemap, /CONTENT_LAST_REVIEWED/, 'Sitemap needs a stable reviewed date for undated routes')

assert.ok(fs.existsSync('public/og-image.jpg'), 'Open Graph image must exist')

console.log(`SEO audit checks passed: ${tools.length} tools, ${allBlogs.length - redirectPairs.length} published articles, ${redirectPairs.length} direct article redirects, component parity, canonical origin, robots, OG asset, and stable sitemap dates.`)
