import { tools, toolGuideContent } from './tools'
import { blogPosts } from './blog-posts'

export interface KnowledgeBaseEntry {
  type: 'tool' | 'blog'
  name?: string
  title?: string
  slug: string
  url: string
  description: string
  keywords?: string[]
  faq?: { question: string; answer: string }[]
}

export function buildKnowledgeBase(): KnowledgeBaseEntry[] {
  const entries: KnowledgeBaseEntry[] = []

  for (const tool of tools) {
    const guide = toolGuideContent[tool.slug]
    entries.push({
      type: 'tool',
      name: tool.name,
      slug: tool.slug,
      url: `/tools/${tool.slug}`,
      description: tool.description,
      keywords: tool.keywords,
      faq: guide?.faq,
    })
  }

  for (const post of blogPosts) {
    entries.push({
      type: 'blog',
      title: post.title,
      slug: post.slug,
      url: `/blog/${post.slug}`,
      description: post.description,
    })
  }

  return entries
}

const cached = buildKnowledgeBase()

export function getKnowledgeBase(): KnowledgeBaseEntry[] {
  return cached
}

export function getFeaturedTools(): KnowledgeBaseEntry[] {
  return cached.filter(
    (e) => e.type === 'tool' && tools.find((t) => t.slug === e.slug)?.featured
  )
}
