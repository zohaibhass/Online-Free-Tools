import { getToolDetails, tools } from '@/lib/tools'
import { blogPosts } from '@/lib/blog-posts'

const stripHtml = (value: string) => value.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()

describe('published catalog quality', () => {
  it.each(tools.map((tool) => [tool.slug, tool] as const))('%s has useful unique catalog content', (_slug, tool) => {
    const details = getToolDetails(tool)
    expect(tool.name.length).toBeGreaterThan(2)
    expect(tool.description.length).toBeGreaterThan(40)
    expect(details.howToUse.length).toBeGreaterThanOrEqual(3)
    expect(details.faq.length).toBeGreaterThanOrEqual(2)
    expect(details.exampleInput).toBeTruthy()
    expect(details.exampleOutput).toBeTruthy()
    for (const related of details.relatedTools) {
      expect(tools.some(({ slug }) => slug === related.slug)).toBe(true)
    }
  })

  it('has unique tool titles and descriptions', () => {
    expect(new Set(tools.map(({ seoTitle, name }) => seoTitle ?? name)).size).toBe(tools.length)
    expect(new Set(tools.map(({ seoDescription, description }) => seoDescription ?? description)).size).toBe(tools.length)
  })

  it.each(blogPosts.map((post) => [post.slug, post] as const))('%s has substantive content and valid related tool links', (_slug, post) => {
    expect(stripHtml(post.content).split(' ').length).toBeGreaterThan(250)
    expect(post.description.length).toBeGreaterThan(50)
    expect(post.content).not.toMatch(/lorem ipsum|>\s*coming soon\s*<|>\s*placeholder\s*</i)
    for (const related of post.relatedTools) {
      expect(related.url).toMatch(/^\/tools\//)
      expect(tools.some(({ slug }) => related.url === `/tools/${slug}`)).toBe(true)
    }
  })

  it('has unique article metadata', () => {
    expect(new Set(blogPosts.map(({ title }) => title)).size).toBe(blogPosts.length)
    expect(new Set(blogPosts.map(({ description }) => description)).size).toBe(blogPosts.length)
  })
})
