 'use client'

import { ReactNode, useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import Script from 'next/script'
import { ChevronRight, Maximize2, Minimize2 } from 'lucide-react'
import { AdSenseAd } from '@/components/AdSenseAd'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import type { ToolDetails } from '@/lib/tools'

interface Breadcrumb {
  name: string
  href?: string
}

interface ToolLayoutProps {
  children: ReactNode
  title: string
  h1?: string
  description: string
  breadcrumbs?: Breadcrumb[]
  showAds?: boolean
  toolDetails?: ToolDetails
  relatedPosts?: { title: string; url: string }[]
}

export function ToolLayout({
  children,
  title,
  h1,
  description,
  breadcrumbs = [],
  showAds = true,
  toolDetails,
  relatedPosts = [],
}: ToolLayoutProps) {
  const defaultBreadcrumbs: Breadcrumb[] = [
    { name: 'Home', href: '/' },
    { name: 'Tools', href: '/tools' },
    { name: title },
  ]

  const finalBreadcrumbs = breadcrumbs.length > 0 ? breadcrumbs : defaultBreadcrumbs

  const containerRef = useRef<HTMLDivElement | null>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    function onFullChange() {
      const fs = !!document.fullscreenElement
      setIsFullscreen(fs)
    }

    document.addEventListener('fullscreenchange', onFullChange)
    return () => document.removeEventListener('fullscreenchange', onFullChange)
  }, [])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape' && isFullscreen) {
        exitFullscreen()
      }
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isFullscreen])

  const enterFullscreen = async () => {
    try {
      if (containerRef.current && containerRef.current.requestFullscreen) {
        await containerRef.current.requestFullscreen()
      }
    } catch (e) {
      // ignore
    }
  }

  const exitFullscreen = async () => {
    try {
      if (document.exitFullscreen) await document.exitFullscreen()
    } catch (e) {
      // ignore
    }
  }

  const toggleFullscreen = () => {
    if (isFullscreen) exitFullscreen()
    else enterFullscreen()
  }

  return (
    <div className="min-h-screen bg-background">

      {/* Breadcrumb Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 py-3 text-sm overflow-x-auto">
            {finalBreadcrumbs.map((breadcrumb, index) => (
              <div key={index} className="flex items-center gap-2 whitespace-nowrap">
                {index > 0 && <ChevronRight className="w-4 h-4 text-muted-foreground" />}
                {breadcrumb.href ? (
                  <Link
                    href={breadcrumb.href}
                    className="text-primary hover:underline transition-colors"
                  >
                    {breadcrumb.name}
                  </Link>
                ) : (
                  <span className="text-foreground font-medium">{breadcrumb.name}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </nav>

      {/* Top Ad */}
      {showAds && (
        <div className="border-b border-border bg-card/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <AdSenseAd slot="1234567890" format="auto" className="mb-4" />
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">{h1 || title}</h1>
            <p className="text-lg text-muted-foreground">{description}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              aria-pressed={isFullscreen}
              onClick={toggleFullscreen}
              title={isFullscreen ? 'Exit full screen' : 'Full screen'}
              className="inline-flex items-center justify-center rounded-md p-2 text-sm hover:bg-accent/50"
            >
              {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
              <span className="sr-only">Toggle full screen</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Tool Content */}
          <div className="lg:col-span-2">
            <div ref={containerRef} className="bg-card border border-border rounded-lg p-6 overflow-auto shadow-sm" tabIndex={-1}>
              {children}
            </div>
          </div>

          {/* Right Sidebar for Ads */}
          {showAds && (
            <div className="space-y-4">
              <div className="bg-card border border-border rounded-lg p-4 sticky top-20">
                <AdSenseAd slot="0987654321" format="vertical" />
              </div>
            </div>
          )}
        </div>

        {toolDetails && (
          <section className="mt-10 space-y-10">
            <div className="bg-card border border-border rounded-3xl p-8">
              <h2 className="text-2xl font-semibold mb-4">About {title}</h2>
              <p className="text-muted-foreground leading-7">{toolDetails.aboutBlurb}</p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="bg-card border border-border rounded-3xl p-8">
                <h2 className="text-2xl font-semibold mb-4">How to use this tool</h2>
                <ol className="list-decimal list-inside space-y-3 text-muted-foreground">
                  {toolDetails.howToUse.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </div>

              <div className="bg-card border border-border rounded-3xl p-8">
                <h2 className="text-2xl font-semibold mb-4">Example</h2>
                <p className="text-muted-foreground mb-4">Input</p>
                <pre className="rounded-2xl bg-slate-950/60 p-4 text-sm text-slate-100 overflow-x-auto whitespace-pre-wrap">
                  {toolDetails.exampleInput}
                </pre>
                <p className="text-muted-foreground mt-6 mb-4">Output</p>
                <pre className="rounded-2xl bg-slate-950/60 p-4 text-sm text-slate-100 overflow-x-auto whitespace-pre-wrap">
                  {toolDetails.exampleOutput}
                </pre>
              </div>
            </div>

            <div className="bg-card border border-border rounded-3xl p-8">
              <h2 className="text-2xl font-semibold mb-4">Tool guide</h2>
              <article aria-label="Tool guide" className="space-y-6 text-muted-foreground">
                {toolDetails.guideSections.map((section, sectionIndex) => (
                  <section key={sectionIndex}>
                    <h3 className="text-lg font-semibold mb-3">{section.heading}</h3>
                    {section.paragraphs.map((paragraph, paragraphIndex) => (
                      <p className="mt-3 leading-7" key={paragraphIndex}>
                        {paragraph}
                      </p>
                    ))}
                  </section>
                ))}
              </article>
            </div>

            <div className="bg-card border border-border rounded-3xl p-8">
              <h2 className="text-2xl font-semibold mb-4">Frequently asked questions</h2>

              {toolDetails.faq.length > 0 && (
                <Script
                  id="faq-schema"
                  type="application/ld+json"
                  strategy="beforeInteractive"
                  dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                      "@context": "https://schema.org",
                      "@type": "FAQPage",
                      "mainEntity": toolDetails.faq.map((item) => ({
                        "@type": "Question",
                        "name": item.question,
                        "acceptedAnswer": {
                          "@type": "Answer",
                          "text": item.answer
                        }
                      }))
                    })
                  }}
                />
              )}

              <div className="space-y-6 text-muted-foreground">
                {toolDetails.faq.map((item, index) => (
                  <div key={index}>
                    <h3 className="text-lg font-semibold">{item.question}</h3>
                    <p className="mt-2 leading-7">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>

            {toolDetails.relatedTools.length > 0 && (
              <div className="bg-card border border-border rounded-3xl p-8">
                <h2 className="text-2xl font-semibold mb-4">Related Tools</h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {toolDetails.relatedTools.map((rt) => (
                    <Link
                      key={rt.slug}
                      href={`/tools/${rt.slug}`}
                      className="block p-4 rounded-xl border border-border hover:border-primary/50 hover:bg-accent/30 transition-colors"
                    >
                      <h3 className="font-semibold mb-1">{rt.name}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{rt.description}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {relatedPosts.length > 0 && (
              <div className="bg-card border border-border rounded-3xl p-8">
                <h2 className="text-2xl font-semibold mb-4">Related Reading</h2>
                <ul className="space-y-3">
                  {relatedPosts.map((post, index) => (
                    <li key={index}>
                      <Link
                        href={post.url}
                        className="text-primary hover:underline transition-colors"
                      >
                        {post.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        )}

        {/* Bottom Ad */}
        {showAds && (
          <div className="mt-12 border-t border-border pt-8">
            <AdSenseAd slot="1111111111" format="auto" />
          </div>
        )}
      </main>
    </div>
  )
}
