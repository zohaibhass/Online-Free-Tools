import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'
// First, add this import at the top of the file
import Script from 'next/script';

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://tools.example.com'
const adsenseClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID

export const metadata: Metadata = {
  title: {
    default: 'Free Online Tools - Developer & Productivity Tools',
    template: '%s | Free Online Tools'
  },
  description: 'Access 30+ free online tools for developers, content creators, and productivity. JSON formatter, image compression, code generators, calculators, and more.',
  keywords: ['free tools', 'online tools', 'developer tools', 'productivity', 'converters', 'generators'],
  authors: [{ name: 'Tools Team' }],
  creator: 'Tools Team',
  publisher: 'Tools',
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
    url: baseUrl,
    siteName: 'Free Online Tools',
    title: 'Free Online Tools - 30+ Developer & Productivity Tools',
    description: 'Discover 30+ free online tools for developers and content creators. Fast, reliable, and browser-based.',
    images: [{
      url: `${baseUrl}/og-image.jpg`,
      width: 1200,
      height: 630,
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Online Tools',
    description: 'Access 30+ free online tools for developers and productivity.',
    images: [`${baseUrl}/og-image.jpg`],
  },
  alternates: {
    canonical: baseUrl,
  },
  generator: 'Next.js',
  applicationName: 'Free Online Tools',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
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
    <html lang="en" className="bg-background">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'Free Online Tools',
              description: 'Access 30+ free online tools for developers and content creators',
              url: baseUrl,
              applicationCategory: 'UtilityApplication',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD'
              }
            })
          }}
        />

        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

        {process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION && (
          <meta
            name="google-site-verification"
            content={process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION}
          />
        )}

        {/* Google AdSense - Proper Next.js way */}
        {adsenseClientId && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClientId}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          {process.env.NODE_ENV === 'production' && <Analytics />}
        </ThemeProvider>
      </body>
    </html>
  )
}
