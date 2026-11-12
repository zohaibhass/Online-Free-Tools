import { blogPosts, consolidatedBlogRedirects, getBlogPostBySlug } from '@/lib/blog-posts'

describe('published blog catalog', () => {
  it('does not publish redirect sources', () => {
    for (const source of Object.keys(consolidatedBlogRedirects)) {
      expect(getBlogPostBySlug(source)).toBeUndefined()
    }
  })

  it('has valid direct redirect destinations', () => {
    for (const destination of Object.values(consolidatedBlogRedirects)) {
      expect(getBlogPostBySlug(destination)).toBeDefined()
      expect(consolidatedBlogRedirects[destination]).toBeUndefined()
    }
  })

  it('publishes distinct reviewed BMI resources with limitations and sources', () => {
    for (const slug of ['bmi-chart-men-women', 'bmi-chart-by-height', 'bmi-health-metrics-developers']) {
      const post = getBlogPostBySlug(slug)
      expect(post?.content).toContain('cdc.gov/bmi')
      expect(post?.content.toLowerCase()).toMatch(/not (a diagnosis|medical advice|a clinical protocol)/)
    }
  })

  it('keeps published slugs unique', () => {
    expect(new Set(blogPosts.map(({ slug }) => slug)).size).toBe(blogPosts.length)
  })
})
