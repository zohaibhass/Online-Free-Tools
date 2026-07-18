import type { Metadata } from 'next'
import ContactPageClient from './ContactPageClient'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact Free Online Tools for support, feedback, and questions about our free online utilities.',
}

export default function ContactPage() {
  return <ContactPageClient />
}
