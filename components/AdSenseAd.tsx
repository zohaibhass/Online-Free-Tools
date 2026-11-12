'use client'

import { useEffect, useState } from 'react'

interface AdSenseAdProps {
  slot: string
  format?: 'auto' | 'horizontal' | 'vertical' | 'rectangle'
  responsive?: boolean
  className?: string
  minHeight?: number
}

function defaultMinHeight(format: NonNullable<AdSenseAdProps['format']>): number {
  switch (format) {
    case 'rectangle':
      return 250
    case 'vertical':
      return 320
    case 'horizontal':
      return 90
    default:
      return 100
  }
}

export function AdSenseAd({
  slot,
  format = 'auto',
  responsive = true,
  className = '',
  minHeight,
}: AdSenseAdProps) {
  const [mounted, setMounted] = useState(false)
  const [hasConsent, setHasConsent] = useState(false)

  useEffect(() => {
    setMounted(true)
    const syncConsent = () => setHasConsent(window.localStorage.getItem('cookie-consent-v1') === 'accepted')
    syncConsent()
    window.addEventListener('cookie-consent-accepted', syncConsent)
    window.addEventListener('cookie-consent-rejected', syncConsent)
    return () => {
      window.removeEventListener('cookie-consent-accepted', syncConsent)
      window.removeEventListener('cookie-consent-rejected', syncConsent)
    }
  }, [])

  useEffect(() => {
    if (mounted && hasConsent && typeof window !== 'undefined' && (window as any).adsbygoogle) {
      try {
        (window as any).adsbygoogle.push({})
      } catch (e) {
        // AdSense might not be loaded yet or already processed
      }
    }
  }, [mounted, hasConsent])

  if (!hasConsent) return null

  // Reserve the minimum ad space in SSR HTML too, so the post-hydration
  // <ins> insertion does not shift the layout (CLS). The <ins> itself only
  // mounts on the client to avoid hydration mismatches.
  return (
    <div
      className={`${className} flex justify-center overflow-hidden`}
      style={{ minHeight: minHeight ?? defaultMinHeight(format) }}
      suppressHydrationWarning
    >
      {mounted && (
        <ins
          className="adsbygoogle"
          style={{
            display: 'block',
            textAlign: 'center',
            width: '100%',
          }}
          data-ad-format={format}
          data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || 'ca-pub-3491641485391296'}
          data-ad-slot={slot}
          data-ad-responsive={responsive ? 'true' : 'false'}
        />
      )}
    </div>
  )
}
