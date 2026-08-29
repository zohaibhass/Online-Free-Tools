import { Metadata } from 'next'
import { SITE_URL, OG_IMAGE, SITE_NAME } from './config'

export function generateToolMetadata(tool: {
  name: string
  description: string
  slug: string
  keywords: string[]
  seoTitle?: string
  seoDescription?: string
}): Metadata {
  const canonicalUrl = `${SITE_URL}/tools/${tool.slug}`
  const rawTitle = tool.seoTitle ?? tool.name
  const seoTitle = rawTitle.replace(/\s*\|\s*OnlineFreeTools\s*$/i, '').trim()
  const seoDescription = tool.seoDescription ?? tool.description

  return {
    title: { absolute: seoTitle },
    description: seoDescription,
    keywords: [...tool.keywords, 'free tool', 'online', 'utility'],
    authors: [{ name: 'Zohaib Hassan' }],
    creator: 'Zohaib Hassan',
    publisher: 'Zohaib Hassan',
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: canonicalUrl,
      type: 'website',
      siteName: SITE_NAME,
      images: [{
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: `${tool.name} preview image`,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: seoDescription,
      images: [OG_IMAGE],
    },
    alternates: {
      canonical: canonicalUrl,
    },
  }
}

export function generateCategoryMetadata(category: {
  name: string
  description: string
  id: string
}): Metadata {
  const canonicalUrl = `${SITE_URL}/category/${category.id}`
  
  return {
    title: category.name,
    description: `Browse ${category.name.toLowerCase()} - ${category.description}`,
    openGraph: {
      title: category.name,
      description: category.description,
      url: canonicalUrl,
      type: 'website',
    },
    alternates: {
      canonical: canonicalUrl,
    },
  }
}

export function generateStructuredData(type: 'Tool' | 'WebPage' | 'BreadcrumbList', data: any) {
  switch (type) {
    case 'Tool':
      return {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: data.name,
        description: data.description,
        url: data.url,
        applicationCategory: data.applicationCategory || 'UtilityApplication',
        operatingSystem: data.operatingSystem ?? 'All',
        browserRequirements: data.browserRequirements || 'Requires JavaScript',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD'
        },
        ...(data.author ? { author: data.author } : {}),
      }
    
    case 'BreadcrumbList':
      return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: data.items.map((item: any, index: number) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: item.url
        }))
      }
    
    default:
      return {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: data.name,
        description: data.description,
        url: data.url
      }
  }
}

interface HowToStep {
  name: string
  text: string
  url?: string
  image?: string
}

export function generateHowToSchema(data: {
  name: string
  description: string
  url: string
  image?: string
  steps: HowToStep[]
  totalTime?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: data.name,
    description: data.description,
    url: data.url,
    ...(data.image ? { image: data.image } : {}),
    ...(data.totalTime ? { totalTime: data.totalTime } : {}),
    step: data.steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      ...(step.text ? { text: step.text } : {}),
      ...(step.url ? { url: step.url } : {}),
    })),
  }
}

export function generateFaqSchema(questions: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}
