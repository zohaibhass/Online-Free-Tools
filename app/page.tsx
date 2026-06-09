import type { Metadata } from 'next'
import { SITE_URL, OG_IMAGE } from '@/lib/config'
import HomePageClient from './HomePageClient'

export const metadata: Metadata = {
  title: 'Free Online Tools for Developers, Students & Creators',
  description: 'Free browser tools for developers & creators — format JSON, compress images, decode JWTs and more. No signup, instant results.',
  openGraph: {
    title: 'Free Online Tools for Developers, Students & Creators',
    description: 'Free browser tools for developers & creators — format JSON, compress images, decode JWTs and more. No signup, instant results.',
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
    description: 'Free browser tools for developers & creators — format JSON, compress images, decode JWTs and more. No signup, instant results.',
    images: [OG_IMAGE],
  },
  alternates: {
    canonical: SITE_URL,
  },
}

export default function Home() {
  return <HomePageClient />
}
