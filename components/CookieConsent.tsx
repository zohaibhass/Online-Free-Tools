'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import Link from 'next/link'

type ConsentChoice = 'accepted' | 'rejected' | null

const CONSENT_KEY = 'cookie-consent-v1'

function getStoredConsent(): ConsentChoice {
  if (typeof window === 'undefined') return null
  try {
    const stored = localStorage.getItem(CONSENT_KEY)
    if (stored === 'accepted' || stored === 'rejected') return stored
  } catch {
    // localStorage unavailable
  }
  return null
}

function setStoredConsent(value: ConsentChoice) {
  try {
    if (value) {
      localStorage.setItem(CONSENT_KEY, value)
    } else {
      localStorage.removeItem(CONSENT_KEY)
    }
  } catch {
    // localStorage unavailable
  }
}

export function CookieConsent() {
  const [consent, setConsent] = useState<ConsentChoice>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const stored = getStoredConsent()
    setConsent(stored)
    if (!stored) {
      const timer = setTimeout(() => setVisible(true), 500)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAccept = () => {
    setStoredConsent('accepted')
    setConsent('accepted')
    setVisible(false)
    window.dispatchEvent(new Event('cookie-consent-accepted'))
  }

  const handleReject = () => {
    setStoredConsent('rejected')
    setConsent('rejected')
    setVisible(false)
    window.dispatchEvent(new Event('cookie-consent-rejected'))
  }

  const handleDismiss = () => {
    setVisible(false)
  }

  if (consent !== null || !visible) return null

  return (
    <div
      role="alert"
      aria-live="polite"
      className="fixed bottom-0 left-0 right-0 z-[9999] border-t border-border bg-background/95 backdrop-blur-xl shadow-2xl"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1 text-sm text-muted-foreground leading-relaxed">
            <p>
              We use cookies and similar technologies to improve your experience, analyze traffic, and serve personalized ads.{' '}
              <Link href="/privacy" className="text-primary underline hover:no-underline font-medium">
                Learn more
              </Link>
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Button variant="outline" size="sm" onClick={handleReject}>
              Reject
            </Button>
            <Button size="sm" onClick={handleAccept}>
              Accept All
            </Button>
            <button
              onClick={handleDismiss}
              className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
              aria-label="Dismiss cookie notice"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
