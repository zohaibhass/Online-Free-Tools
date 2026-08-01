'use client'

import dynamic from 'next/dynamic'

const CookieConsent = dynamic(() => import('@/components/CookieConsent').then(m => ({ default: m.CookieConsent })), { ssr: false })
const ChatWidget = dynamic(() => import('@/components/ChatWidget').then(m => ({ default: m.ChatWidget })), { ssr: false })

export function LazyLayoutComponents() {
  return (
    <>
      <CookieConsent />
      <ChatWidget />
    </>
  )
}

export const LazyAdSenseAd = dynamic(() => import('@/components/AdSenseAd').then(m => ({ default: m.AdSenseAd })))
