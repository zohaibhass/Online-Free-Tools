import type { Metadata, Viewport } from 'next'
import { ThemeProvider } from '@/components/theme-provider'
import { LazyLayoutComponents } from './LazyComponents'
import { SITE_URL, OG_IMAGE, SITE_NAME, AUTHOR_NAME } from '@/lib/config'
import './globals.css'
import Script from 'next/script'

export const metadata: Metadata = {
  title: {
    default: 'Free Online Tools - Developer & Productivity Tools',
    template: '%s | Free Online Tools'
  },
  description: 'Access 37 free online tools for developers, content creators, and productivity. JSON formatting, image compression, code generators, calculators, and more.',
  keywords: ['free tools', 'online tools', 'developer tools', 'productivity', 'converters', 'generators'],
  authors: [{ name: AUTHOR_NAME, url: SITE_URL }],
  creator: AUTHOR_NAME,
  publisher: AUTHOR_NAME,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: 'Free Online Tools - 37 Developer & Productivity Tools',
    description: 'Discover 37 free online tools for developers and content creators. Fast, reliable, and browser-based.',
    images: [{
      url: OG_IMAGE,
      width: 1200,
      height: 630,
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Online Tools - 37 Free Tools',
    description: 'Access 37 free online tools for developers and productivity.',
    images: [OG_IMAGE],
  },
  alternates: {
    canonical: SITE_URL,
  },
  generator: 'Next.js',
  applicationName: 'Free Online Tools',
  icons: {
    icon: '/icon.svg',
    apple: '/apple-icon.png',
    other: [
      {
        rel: 'manifest',
        url: '/site.webmanifest',
      },
    ],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
    <html lang="en" className="bg-background" suppressHydrationWarning>
      <head>
        {/* Content-Security-Policy meta tag (fallback for environments without header support) */}
        <meta
          httpEquiv="Content-Security-Policy"
          content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://pagead2.googlesyndication.com https://www.googletagmanager.com https://www.google-analytics.com https://*.google.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net https://tpc.googlesyndication.com https://www.google-analytics.com https://*.google.com https://*.googleapis.com; font-src 'self' data:; frame-src 'self' https://googleads.g.doubleclick.net https://*.google.com;           connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://*.vercel-insights.com https://*.adtrafficquality.google https://fundingchoicesmessages.google.com; manifest-src 'self';"
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: SITE_NAME,
              url: SITE_URL,
              description: 'Access 37 free online tools for developers and content creators',
              publisher: {
                '@type': 'Person',
                name: AUTHOR_NAME,
                url: `${SITE_URL}/about`,
              },
              potentialAction: {
                '@type': 'SearchAction',
                target: {
                  '@type': 'EntryPoint',
                  urlTemplate: `${SITE_URL}/tools?search={search_term_string}`
                },
                'query-input': 'required name=search_term_string'
              }
            })
          }}
        />

        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="manifest" href="/site.webmanifest" />

        <Script id="theme-init" strategy="beforeInteractive">
          {`(function () {
            try {
              var theme = window.localStorage.getItem('theme')
              if (theme === 'light' || theme === 'dark') {
                document.documentElement.classList.toggle('dark', theme === 'dark')
              } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                document.documentElement.classList.add('dark')
              } else {
                document.documentElement.classList.remove('dark')
              }
            } catch (e) {
              console.warn('Theme init failed', e)
            }
          })()`}
        </Script>

        {process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION && (
          <meta
            name="google-site-verification"
            content={process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION}
          />
        )}

        {/* Google AdSense — loads after page is interactive */}
        {process.env.NODE_ENV === 'production' && (
          <Script id="register-service-worker" strategy="lazyOnload">
            {`if ('serviceWorker' in navigator) {
              window.addEventListener('load', function () {
                navigator.serviceWorker.register('/sw.js').then(function (reg) {
                  if (reg.active && !navigator.serviceWorker.controller) {
                    window.location.reload()
                  }
                  reg.addEventListener('updatefound', function () {
                    var installing = reg.installing
                    installing && installing.addEventListener('statechange', function () {
                      if (installing.state === 'activated') {
                        window.location.reload()
                      }
                    })
                  })
                }).catch(function (error) {
                  console.error('Service worker registration failed:', error)
                })
              })
            }`}
          </Script>
        )}
      </head>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <LazyLayoutComponents />
        </ThemeProvider>
      </body>
    </html>
  </>
  )
}
