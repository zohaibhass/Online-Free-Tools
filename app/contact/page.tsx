import type { Metadata } from 'next'
import ContactPageClient from './ContactPageClient'
import { SITE_URL } from '@/lib/config'

export const metadata: Metadata = {
  title: { absolute: 'Contact Us | Free Online Tools' },
  description: 'Contact Free Online Tools for support, feedback, and questions about our free online utilities.',
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
}

export default function ContactPage() {
  return <ContactPageClient />
}
