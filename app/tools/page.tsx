import type { Metadata } from 'next'
import ToolsPageClient from './ToolsPageClient'

export const metadata: Metadata = {
  title: 'All Tools - Free Online Tools',
  description: 'Browse all free online tools and calculators with easy access and no signup required.',
}

export default function ToolsPage() {
  return <ToolsPageClient />
}
