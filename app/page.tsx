import type { Metadata } from 'next'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { SITE_URL, OG_IMAGE } from '@/lib/config'
import HomePageClient from './HomePageClient'
import { LazyAdSenseAd } from './LazyComponents'
import { Rocket, ShieldCheck, Eye, Globe, Zap, Laptop, Lock, BadgeCheck } from 'lucide-react'
import AuthorCard from '@/components/AuthorCard'

export const metadata: Metadata = {
  title: 'Free Online Tools for Developers, Students & Creators',
  description: 'Free online tools for developers — decode JWT tokens, format JSON, compress images and more. No signup required.',
  openGraph: {
    title: 'Free Online Tools for Developers, Students & Creators',
    description: 'Free online tools for developers — decode JWT tokens, format JSON, compress images and more. No signup required.',
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
    title: 'Free Online Tools',
    description: 'Free online tools for developers — decode JWT tokens, format JSON, compress images and more. No signup required.',
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
              <p className="text-sm text-muted-foreground">Use any tool instantly with no account or subscription.</p>
            </div>
            <div className="rounded-3xl border border-border bg-card p-6 text-center">
              <ShieldCheck className="mx-auto mb-3 h-6 w-6 text-primary" />
              <h3 className="font-semibold mb-2">Privacy focused</h3>
              <p className="text-sm text-muted-foreground">Most tools process data locally and do not store personal inputs.</p>
            </div>
            <div className="rounded-3xl border border-border bg-card p-6 text-center">
              <Eye className="mx-auto mb-3 h-6 w-6 text-primary" />
              <h3 className="font-semibold mb-2">100% free</h3>
              <p className="text-sm text-muted-foreground">All tools are free to use and accessible in any modern browser.</p>
            </div>
            <div className="rounded-3xl border border-border bg-card p-6 text-center">
              <Globe className="mx-auto mb-3 h-6 w-6 text-primary" />
              <h3 className="font-semibold mb-2">Works in browser</h3>
              <p className="text-sm text-muted-foreground">No downloads required — tools run directly in your device&apos;s browser.</p>
            </div>
          </div>
          <div className="mt-12">
            <LazyAdSenseAd slot="1111111111" format="auto" />
          </div>

          <section className="mb-16 space-y-8">
            <div className="bg-card border border-border rounded-3xl p-8">
              <h2 className="text-2xl font-semibold mb-4">Your Complete Online Toolkit for Everyday Tasks</h2>
              <p className="text-muted-foreground leading-7 mb-4">
                OnlineFreeTools.online is a thoughtfully curated platform offering <strong>30+ free online tools</strong> designed to help developers, students, content creators, and professionals get their work done faster. Whether you need to format JSON for an API integration, compress an image for your website, decode a JWT token during development, or calculate a mortgage payment - every tool here works directly in your browser with no installation, no signup, and no data stored on our servers.
              </p>
              <p className="text-muted-foreground leading-7 mb-4">
                What sets our collection apart is the attention to <strong>usability, accuracy, and speed</strong>. Each tool is built with modern web technologies (React, Next.js, and Tailwind CSS) to ensure a smooth, responsive experience across all devices - from desktop workstations to mobile phones. The interface is clean, distraction-free, and designed to help you complete your task in seconds.
              </p>
              <p className="text-muted-foreground leading-7 mb-4">
                Our tool categories include <strong>Developer Tools</strong> (JSON formatter, JWT decoder, regex tester, SQL formatter, Base64 encoder, hash generator, code minifier, UUID generator, and more), <strong>Calculator Tools</strong> (BMI calculator, loan calculator, mortgage calculator, discount calculator, tip calculator, percentage calculator, age calculator), <strong>Document Tools</strong> (word counter, markdown editor, text-to-HTML converter, diff checker), and <strong>Utility Tools</strong> (QR code generator, unit converter, password generator, dice roller, coin flipper, Morse code translator, and more).
              </p>
              <p className="text-muted-foreground leading-7">
                Every tool comes with a step-by-step guide and practical examples, making it easy for beginners to get started while still being powerful enough for experienced users. We regularly update our collection based on user feedback and emerging needs. If there is a tool you would like to see, feel free to reach out through our contact page.
              </p>
            </div>

            <div className="bg-card border border-border rounded-3xl p-8">
              <div className="space-y-6">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-primary font-semibold">Built for Speed & Privacy</p>
                  <h2 className="mt-3 text-2xl font-semibold text-foreground">We make powerful tools fast, secure, and effortless.</h2>
                  <p className="mt-4 text-muted-foreground leading-7">
                    We believe online tools should be fast, secure, and effortless. That's why OnlineFreeTools.online focuses on delivering high-performance utilities that respect your privacy and help you get work done faster.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-2">
                  <div className="rounded-3xl border border-border bg-background/90 p-5 transition duration-200 hover:shadow-lg hover:-translate-y-0.5">
                    <div className="flex items-center justify-center rounded-2xl bg-primary/10 p-3 text-primary w-12 h-12 mb-4">
                      <Zap className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">Fast Performance</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">Optimized for quick loading and instant results.</p>
                  </div>

                  <div className="rounded-3xl border border-border bg-background/90 p-5 transition duration-200 hover:shadow-lg hover:-translate-y-0.5">
                    <div className="flex items-center justify-center rounded-2xl bg-primary/10 p-3 text-primary w-12 h-12 mb-4">
                      <ShieldCheck className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">Privacy Focused</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">Most tools process data locally in your browser whenever possible.</p>
                  </div>

                  <div className="rounded-3xl border border-border bg-background/90 p-5 transition duration-200 hover:shadow-lg hover:-translate-y-0.5">
                    <div className="flex items-center justify-center rounded-2xl bg-primary/10 p-3 text-primary w-12 h-12 mb-4">
                      <Laptop className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">Cross Platform</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">Works seamlessly on Windows, macOS, Linux, Android, and iPhone.</p>
                  </div>

                  <div className="rounded-3xl border border-border bg-background/90 p-5 transition duration-200 hover:shadow-lg hover:-translate-y-0.5">
                    <div className="flex items-center justify-center rounded-2xl bg-primary/10 p-3 text-primary w-12 h-12 mb-4">
                      <Globe className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">No Installation</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">Use every tool instantly without downloading software or browser extensions.</p>
                  </div>

                  <div className="rounded-3xl border border-border bg-background/90 p-5 transition duration-200 hover:shadow-lg hover:-translate-y-0.5">
                    <div className="flex items-center justify-center rounded-2xl bg-primary/10 p-3 text-primary w-12 h-12 mb-4">
                      <Lock className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">Secure Experience</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">Built using modern web technologies with a privacy-first approach.</p>
                  </div>

                  <div className="rounded-3xl border border-border bg-background/90 p-5 transition duration-200 hover:shadow-lg hover:-translate-y-0.5">
                    <div className="flex items-center justify-center rounded-2xl bg-primary/10 p-3 text-primary w-12 h-12 mb-4">
                      <BadgeCheck className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">Completely Free</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">Access dozens of professional online tools without subscriptions or hidden costs.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-3xl p-8">
              <AuthorCard
                name="Zohaib Hassan"
                bio={`This website was built and is maintained by Zohaib Hassan, a full-stack web developer from Pakistan with extensive experience in React, Next.js, Node.js, and modern web performance optimization. Zohaib has been developing web applications since 2020 and specializes in creating fast, accessible, and user-friendly digital tools. He is committed to delivering high-quality online utilities that respect user privacy and follow Google's E-E-A-T guidelines.`}
              />
              <p className="mt-4 text-sm text-muted-foreground">For inquiries or suggestions, reach out at <a href="mailto:onlinefreetools@zohomail.com" className="text-primary hover:underline">onlinefreetools@zohomail.com</a>.</p>
            </div>
          </section>
        </section>
      </main>
      <Footer />
    </div>
  )
}
