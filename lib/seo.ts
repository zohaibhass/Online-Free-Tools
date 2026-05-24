import { Metadata } from 'next'
import { SITE_URL, OG_IMAGE, SITE_NAME } from './config'

export function generateToolMetadata(tool: {
  name: string
  description: string
  slug: string
  keywords: string[]
}): Metadata {
  const canonicalUrl = `${SITE_URL}/tools/${tool.slug}`
  
  return {
    title: `${tool.name} | ${SITE_NAME}`,
    description: tool.description,
    keywords: [...tool.keywords, 'free tool', 'online', 'utility'],
    openGraph: {
      title: `${tool.name} | ${SITE_NAME}`,
      description: tool.description,
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
      title: `${tool.name} | ${SITE_NAME}`,
      description: tool.description,
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
    title: `${category.name} - Free Online Tools`,
    description: `Browse ${category.name.toLowerCase()} - ${category.description}`,
    openGraph: {
      title: `${category.name} - Free Online Tools`,
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
        applicationCategory: 'UtilityApplication',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD'
        }
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
