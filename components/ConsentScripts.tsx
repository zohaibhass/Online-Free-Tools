'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/next'

const CONSENT_KEY = 'cookie-consent-v1'

export function ConsentScripts() {
  const [accepted, setAccepted] = useState(false)

  useEffect(() => {
    const sync = () => setAccepted(window.localStorage.getItem(CONSENT_KEY) === 'accepted')
    sync()
    window.addEventListener('cookie-consent-accepted', sync)
    window.addEventListener('cookie-consent-rejected', sync)
    return () => {
      window.removeEventListener('cookie-consent-accepted', sync)
      window.removeEventListener('cookie-consent-rejected', sync)
    }
  }, [])

  if (!accepted) return null

  const gaId = process.env.NEXT_PUBLIC_GA_ID || 'G-BKCT5KC2W4'
  const adsenseClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || 'ca-pub-3491641485391296'

  return <>
    <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
    <Script id="google-analytics" strategy="afterInteractive">
      {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)};gtag('js',new Date());gtag('consent','update',{'analytics_storage':'granted','ad_storage':'granted','ad_user_data':'granted','ad_personalization':'granted'});gtag('config','${gaId}',{page_path:window.location.pathname});`}
    </Script>
    <Script src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClientId}`} strategy="afterInteractive" crossOrigin="anonymous" />
    <Analytics />
  </>
}
