'use client'

import { useEffect } from 'react'

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
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
        (window as any).adsbygoogle.push({})
      }
    } catch (e) {
      // AdSense might not be loaded yet
    }
  }, [])

  return (
    <div className={`${className} flex justify-center`}>
      <ins
        className="adsbygoogle"
        style={{
          display: 'block',
          textAlign: 'center',
        }}
        data-ad-layout={format}
        data-ad-format={format}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || 'ca-pub-xxxxxxxxxxxxxxxx'}
        data-ad-slot={slot}
        data-ad-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  )
}
