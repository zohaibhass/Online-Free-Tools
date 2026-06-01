'use client'

import { useEffect, useState } from 'react'

interface AdSenseAdProps {
  slot: string
  format?: 'auto' | 'horizontal' | 'vertical' | 'rectangle'
  responsive?: boolean
  className?: string
}

export function AdSenseAd({
  slot,
  format = 'auto',
  responsive = true,
  className = '',
}: AdSenseAdProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && typeof window !== 'undefined' && (window as any).adsbygoogle) {
      try {
        (window as any).adsbygoogle.push({})
      } catch (e) {
        // AdSense might not be loaded yet or already processed
      }
    }
  }, [mounted])

  // Don't render until after hydration to prevent mismatch
  if (!mounted) {
    return null
  }

  return (
    <div className={`${className} flex justify-center`} suppressHydrationWarning>
      <ins
        className="adsbygoogle"
        style={{
          display: 'block',
          textAlign: 'center',
        }}
        data-ad-layout={format}
        data-ad-format={format}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || 'ca-pub-5508801810212450'}
        data-ad-slot={slot}
        data-ad-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  )
}
