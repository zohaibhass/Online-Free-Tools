import type { Metadata } from 'next'
import { SITE_URL, OG_IMAGE } from '@/lib/config'
import ToolsPageClient from './ToolsPageClient'

export const metadata: Metadata = {
  title: 'All Tools',
  description: 'Browse all free online tools and calculators with easy access and no signup required.',
  openGraph: {
    title: 'All Tools',
    description: 'Browse all free online tools and calculators with easy access and no signup required.',
    url: `${SITE_URL}/tools`,
    type: 'website',
    images: [{
      url: OG_IMAGE,
      width: 1200,
      height: 630,
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'All Tools',
    description: 'Browse all free online tools and calculators.',
    images: [OG_IMAGE],
  },
  alternates: {
    canonical: `${SITE_URL}/tools`,
  },
}

export default async function ToolsPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>
}) {
  const params = await searchParams

  return (
    <ToolsPageClient initialSearch={params.search ?? ''} />
  )
}
