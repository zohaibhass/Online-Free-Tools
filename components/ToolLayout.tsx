'use client'

import { ReactNode } from 'react'
import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'
import { AdSenseAd } from '@/components/AdSenseAd'

interface Breadcrumb {
  name: string
  href?: string
}

interface ToolLayoutProps {
  children: ReactNode
  title: string
  description: string
  breadcrumbs?: Breadcrumb[]
  showAds?: boolean
}

export function ToolLayout({
  children,
  title,
  description,
  breadcrumbs = [],
  showAds = true,
}: ToolLayoutProps) {
  const defaultBreadcrumbs: Breadcrumb[] = [
    { name: 'Home', href: '/' },
    { name: 'Tools', href: '/tools' },
    { name: title },
  ]

  const finalBreadcrumbs = breadcrumbs.length > 0 ? breadcrumbs : defaultBreadcrumbs

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
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{title}</h1>
          <p className="text-lg text-muted-foreground">{description}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Tool Content */}
          <div className="lg:col-span-2">
            <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
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
