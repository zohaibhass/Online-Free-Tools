import type { Metadata } from 'next'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { SITE_URL, OG_IMAGE } from '@/lib/config'
import HomePageClient from './HomePageClient'
import { LazyAdSenseAd } from './LazyComponents'
import { Rocket, ShieldCheck, Eye, Globe, Zap, Laptop, Lock, BadgeCheck } from 'lucide-react'
import AuthorCard from '@/components/AuthorCard'

export const metadata: Metadata = {
  title: { absolute: 'Free Online Tools - 38+ Free Browser Utilities' },
  description: 'Free online tools for developers, students, and creators. Format JSON, compress images, decode JWT, generate UUIDs, and more - in your browser, no signup.',
  openGraph: {
    title: 'Free Online Tools - 38+ Free Browser Utilities',
    description: 'Format JSON, compress images, decode JWT tokens, generate UUIDs, and more - all in your browser. No signup required.',
    url: SITE_URL,
    type: 'website',
    images: [{
      url: OG_IMAGE,
      width: 1200,
      height: 630,
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Online Tools - 38+ Free Browser Utilities',
    description: 'Format JSON, compress images, decode JWT tokens, generate UUIDs, and more - all in your browser.',
    images: [OG_IMAGE],
  },
  alternates: {
    canonical: SITE_URL,
  },
}

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-b from-background to-card/50 flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 lg:pt-8 pb-16 sm:pb-20 md:pb-24">
          <HomePageClient />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-16">
            <div className="rounded-3xl border border-border bg-card p-6 text-center">
              <Rocket className="mx-auto mb-3 h-6 w-6 text-primary" />
              <h3 className="font-semibold mb-2">No signup required</h3>
              <p className="text-sm text-muted-foreground">All 40 tools work instantly — open a tool and start using it.</p>
            </div>
            <div className="rounded-3xl border border-border bg-card p-6 text-center">
              <ShieldCheck className="mx-auto mb-3 h-6 w-6 text-primary" />
              <h3 className="font-semibold mb-2">Privacy focused</h3>
              <p className="text-sm text-muted-foreground">Most tools process data in your browser — your inputs never leave your device.</p>
            </div>
            <div className="rounded-3xl border border-border bg-card p-6 text-center">
              <Eye className="mx-auto mb-3 h-6 w-6 text-primary" />
              <h3 className="font-semibold mb-2">100% free</h3>
              <p className="text-sm text-muted-foreground">No subscriptions, no hidden costs. All tools are free to use.</p>
            </div>
            <div className="rounded-3xl border border-border bg-card p-6 text-center">
              <Globe className="mx-auto mb-3 h-6 w-6 text-primary" />
              <h3 className="font-semibold mb-2">Works in browser</h3>
              <p className="text-sm text-muted-foreground">No downloads or installs — run on Windows, macOS, Linux, Android, or iPhone.</p>
            </div>
          </div>
          <div className="mt-12">
            <LazyAdSenseAd slot="1111111111" format="auto" />
          </div>

          <div className="mb-16 space-y-8">
            <div className="bg-card border border-border rounded-3xl p-8">
              <h2 className="text-2xl font-semibold mb-4">Your Complete Online Toolkit for Everyday Tasks</h2>
              <p className="text-muted-foreground leading-7 mb-4">
                OnlineFreeTools.online is a curated platform offering <strong>40 free online tools</strong> organized into four categories: <a href="/category/developer" className="text-primary hover:underline">Developer Tools</a> (13 tools including JSON Formatter, JWT Decoder, Regex Tester, SQL Formatter, Hash Generator, and Cron Expression Generator), <a href="/category/calculator" className="text-primary hover:underline">Calculators</a> (11 tools including Loan Calculator, Mortgage Calculator, BMI Calculator, Percentage Calculator, and Unit Converter), <a href="/category/document" className="text-primary hover:underline">Document &amp; Media</a> (7 tools including Word Counter, Image Compressor, Markdown Editor, QR Code Generator, and Text to Speech), and <a href="/category/utility" className="text-primary hover:underline">Utilities</a> (9 tools including Password Generator, Dice Roller, Todo List, and Timer &amp; Stopwatch).
              </p>
              <p className="text-muted-foreground leading-7 mb-4">
                The majority of these tools — including the JSON Formatter, Hash Generator, Image Compressor, Password Generator, all calculators, and all text processing tools — process your data entirely within your browser using JavaScript. Your inputs never leave your device. The only exception is the <a href="/tools/qr-code-generator" className="text-primary hover:underline">QR Code Generator</a>, which uses a third-party service to render QR code images.
              </p>
              <p className="text-muted-foreground leading-7 mb-4">
                Every tool comes with a step-by-step guide and practical examples, making it easy for beginners to get started while still being powerful enough for experienced users. We regularly update our collection based on user feedback and emerging needs.
              </p>
            </div>

            <div className="bg-card border border-border rounded-3xl p-8">
              <div className="space-y-6">
                    <div>
                      <p className="text-sm uppercase tracking-[0.3em] text-primary font-semibold">Built for Speed & Privacy</p>
                      <h2 className="mt-3 text-2xl font-semibold text-foreground">Powerful tools that run entirely in your browser.</h2>
                      <p className="mt-4 text-muted-foreground leading-7">
                        OnlineFreeTools.online uses modern web technologies — React, Next.js, and the Web Platform APIs (Canvas, Web Speech, Crypto, localStorage) — to deliver fast, private tools that process your data locally. No server uploads, no data retention, no accounts required.
                      </p>
                    </div>

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-2">
                  <div className="rounded-3xl border border-border bg-background/90 p-5 transition duration-200 hover:shadow-lg hover:-translate-y-0.5">
                    <div className="flex items-center justify-center rounded-2xl bg-primary/10 p-3 text-primary w-12 h-12 mb-4">
                      <Zap className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">Fast Performance</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">Tools like the JSON Formatter and Code Minifier produce results instantly as you type, with no server round-trip.</p>
                  </div>

                  <div className="rounded-3xl border border-border bg-background/90 p-5 transition duration-200 hover:shadow-lg hover:-translate-y-0.5">
                    <div className="flex items-center justify-center rounded-2xl bg-primary/10 p-3 text-primary w-12 h-12 mb-4">
                      <ShieldCheck className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">Privacy Focused</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">The Image Compressor, Hash Generator, Password Generator, and all calculators process data in your browser — never on a server.</p>
                  </div>

                  <div className="rounded-3xl border border-border bg-background/90 p-5 transition duration-200 hover:shadow-lg hover:-translate-y-0.5">
                    <div className="flex items-center justify-center rounded-2xl bg-primary/10 p-3 text-primary w-12 h-12 mb-4">
                      <Laptop className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">Cross Platform</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">All 40 tools work on Windows, macOS, Linux, Android, and iPhone in Chrome, Firefox, Safari, and Edge.</p>
                  </div>

                  <div className="rounded-3xl border border-border bg-background/90 p-5 transition duration-200 hover:shadow-lg hover:-translate-y-0.5">
                    <div className="flex items-center justify-center rounded-2xl bg-primary/10 p-3 text-primary w-12 h-12 mb-4">
                      <Globe className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">No Installation</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">Open any tool page and start working immediately — no downloads, no extensions, no setup.</p>
                  </div>

                  <div className="rounded-3xl border border-border bg-background/90 p-5 transition duration-200 hover:shadow-lg hover:-translate-y-0.5">
                    <div className="flex items-center justify-center rounded-2xl bg-primary/10 p-3 text-primary w-12 h-12 mb-4">
                      <Lock className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">Secure Experience</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">HTTPS encryption, browser-side processing, and no data storage make these tools safe for everyday use.</p>
                  </div>

                  <div className="rounded-3xl border border-border bg-background/90 p-5 transition duration-200 hover:shadow-lg hover:-translate-y-0.5">
                    <div className="flex items-center justify-center rounded-2xl bg-primary/10 p-3 text-primary w-12 h-12 mb-4">
                      <BadgeCheck className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">Completely Free</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">All 40 tools across 4 categories are free to use with no subscriptions, limits, or hidden costs.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-3xl p-8">
              <AuthorCard
                name="Zohaib Hassan"
                bio={`This website was built and is maintained by Zohaib Hassan, a software engineer from Pakistan with extensive experience in Angular, React, Next.js, Java spring boot, Node.js, and modern web performance optimization. Zohaib has been developing web applications since 2020 and specializes in creating fast, accessible, and user-friendly digital tools. He is committed to delivering high-quality online utilities that respect user privacy and follow Google's E-E-A-T guidelines.`}
              />
              <p className="mt-4 text-sm text-muted-foreground">For inquiries or suggestions, reach out at <a href="mailto:onlinefreetools@zohomail.com" className="text-primary underline hover:text-primary/80">onlinefreetools@zohomail.com</a>.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
