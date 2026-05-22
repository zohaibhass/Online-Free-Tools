import type { Metadata } from 'next'
import HomePageClient from './HomePageClient'

export const metadata: Metadata = {
  title: 'Free Online Tools for Developers, Students & Creators',
  description: 'Access 30+ free online tools for formatting, converting, calculating, and generating content directly in your browser — no signup required.',
}

export default function Home() {
  return <HomePageClient />
}
