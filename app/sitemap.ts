import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/config'
import { tools, categories } from '@/lib/tools'
import { blogPosts } from '@/lib/blog-posts'

const staticPages: { path: string; priority: number; changeFreq: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
  { path: '', priority: 1.0, changeFreq: 'weekly' },
  { path: 'tools', priority: 0.9, changeFreq: 'weekly' },
  { path: 'blog', priority: 0.8, changeFreq: 'weekly' },
  { path: 'about', priority: 0.5, changeFreq: 'monthly' },
  { path: 'contact', priority: 0.5, changeFreq: 'monthly' },
  { path: 'faq', priority: 0.5, changeFreq: 'monthly' },
  { path: 'privacy', priority: 0.3, changeFreq: 'monthly' },
  { path: 'terms', priority: 0.3, changeFreq: 'monthly' },
  { path: 'disclaimer', priority: 0.3, changeFreq: 'monthly' },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const today = new Date()
  const todayStr = today.toISOString().split('T')[0]

  const staticEntries: MetadataRoute.Sitemap = staticPages.map(({ path, priority, changeFreq }) => ({
    url: `${SITE_URL}/${path}`,
    lastModified: today,
    changeFrequency: changeFreq,
    priority,
  }))

  const toolEntries: MetadataRoute.Sitemap = tools.map(tool => ({
    url: `${SITE_URL}/tools/${tool.slug}`,
    lastModified: today,
    changeFrequency: 'monthly',
    priority: 0.9,
  }))

  const blogEntries: MetadataRoute.Sitemap = blogPosts.map(post => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : today,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const categoryEntries: MetadataRoute.Sitemap = categories.map(cat => ({
    url: `${SITE_URL}/category/${cat.id}`,
    lastModified: today,
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  return [...staticEntries, ...toolEntries, ...blogEntries, ...categoryEntries]
}
