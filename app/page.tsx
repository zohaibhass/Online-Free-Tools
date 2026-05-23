import type { Metadata } from 'next'
import { SITE_URL, OG_IMAGE } from '@/lib/config'
import HomePageClient from './HomePageClient'

export const metadata: Metadata = {
  title: 'Free Online Tools for Developers, Students & Creators',
  description: 'Access 30+ free online tools for formatting, converting, calculating, and generating content directly in your browser — no signup required.',
  openGraph: {
    title: 'Free Online Tools for Developers, Students & Creators',
    description: 'Access 30+ free online tools for formatting, converting, calculating, and generating content directly in your browser — no signup required.',
    url: SITE_URL,
    type: 'website',
    images: [{
      url: OG_IMAGE,
      width: 1200,
      height: 630,
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Online Tools',
    description: 'Access 30+ free online tools for formatting, converting, calculating, and generating content.',
    images: [OG_IMAGE],
  },
  alternates: {
    canonical: SITE_URL,
  },
}

export default function Home() {
  return <HomePageClient />
}
