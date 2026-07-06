import type { Metadata } from 'next'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { SITE_URL, OG_IMAGE } from '@/lib/config'
import HomePageClient from './HomePageClient'
import { LazyAdSenseAd } from './LazyComponents'
import { Rocket, ShieldCheck, Eye, Globe } from 'lucide-react'

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
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24">
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
              <h2 className="text-2xl font-semibold mb-4">Privacy-First, No-Install Approach</h2>
              <p className="text-muted-foreground leading-7 mb-4">
                Unlike many online tool websites, we prioritize your privacy. Most of our tools process data entirely in your browser using <strong>client-side JavaScript</strong>, which means your sensitive data - whether it is a JWT token, a JSON payload, or personal text - never leaves your device. We do not store, log, or share any data you enter into the tools.
              </p>
              <p className="text-muted-foreground leading-7 mb-4">
                For tools that require server-side processing (such as QR code generation or text-to-speech), we implement minimal data handling with strict no-logging policies. Our privacy policy explains exactly what data we collect (primarily anonymous analytics via Google Analytics and cookie-based ad personalization via Google AdSense) and how you can control it through your cookie preferences.
              </p>
              <p className="text-muted-foreground leading-7">
                We believe that <strong>powerful tools should be accessible to everyone</strong> without compromising on privacy or requiring complex setups. Whether you are a developer debugging an API, a student calculating a loan payment, or a creator compressing images for a blog post, our tools are here to help - instantly, freely, and privately.
              </p>
            </div>

            <div className="bg-card border border-border rounded-3xl p-8">
              <h2 className="text-2xl font-semibold mb-4">About the Author</h2>
              <p className="text-muted-foreground leading-7">
                This website was built and is maintained by <strong>Zohaib Hassan</strong>, a full-stack web developer from Pakistan with extensive experience in React, Next.js, Node.js, and modern web performance optimization. Zohaib has been developing web applications since 2020 and specializes in creating fast, accessible, and user-friendly digital tools. He is committed to delivering high-quality online utilities that respect user privacy and follow Google&apos;s E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) guidelines. For inquiries or suggestions, reach out at{' '}
                <a href="mailto:onlinefreetools@zohomail.com" className="text-primary hover:underline">onlinefreetools@zohomail.com</a>.
              </p>
            </div>
          </section>
        </section>
      </main>
      <Footer />
    </div>
  )
}
