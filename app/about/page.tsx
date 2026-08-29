import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import Script from 'next/script'
import type { Metadata } from 'next'
import { SITE_URL, SITE_NAME, AUTHOR_NAME, AUTHOR_EMAIL } from '@/lib/config'

export const metadata: Metadata = {
  title: { absolute: 'About Free Online Tools' },
  description: 'Learn about Free Online Tools, our editorial and calculation verification standards, and our commitment to 100% client-side, privacy-friendly tools built and maintained by Zohaib Hassan.',
  authors: [{ name: AUTHOR_NAME }],
  creator: AUTHOR_NAME,
  publisher: AUTHOR_NAME,
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
}

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-8">
          <section className="bg-card border border-border rounded-3xl p-10 shadow-sm">
            <h1 className="text-4xl font-bold tracking-tight">About Online Free Tools</h1>
            <p className="mt-4 text-lg text-muted-foreground leading-8">
              Hi, I'm Zohaib, a software engineer from Pakistan. I built OnlineFreeTools to help developers, students, and creators get everyday tasks done faster — without installing software or creating accounts. Every tool is hand-picked and tested.
            </p>

            <div className="mt-6 p-4 bg-muted/50 rounded-lg border border-border">
              <p className="text-sm text-muted-foreground"><strong>Founder:</strong> Zohaib Hassan</p>
              <p className="text-sm text-muted-foreground"><strong>Location:</strong> Pakistan</p>
              <p className="text-sm text-muted-foreground"><strong>Year Founded:</strong> 2024</p>
              <p className="text-sm text-muted-foreground"><strong>Contact:</strong> <a href="mailto:onlinefreetools@zohomail.com" className="text-primary hover:underline">onlinefreetools@zohomail.com</a></p>
            </div>
          </section>

          <section className="grid gap-8 lg:grid-cols-2">
            <div className="bg-card border border-border rounded-3xl p-8">
              <h2 className="text-2xl font-semibold mb-4">What we offer</h2>
              <ul className="space-y-3 text-muted-foreground">
                <li>• A curated library of free web tools for productivity and development.</li>
                <li>• Fast, mobile-friendly interfaces that work in any browser.</li>
                <li>• No login, no ads blocking your workflow, and no unnecessary friction.</li>
                <li>• Helpful content for converting, formatting, calculating, and testing data instantly.</li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-3xl p-8">
              <h2 className="text-2xl font-semibold mb-4">Why choose us</h2>
              <p className="text-muted-foreground leading-7">
                Our goal is to empower people with easy access to useful online utilities. Whether you need to
                generate a QR code, decode a JWT, compress an image, or calculate loan payments, our tools are designed
                to save time and support reliable results.
              </p>
              <p className="mt-4 text-muted-foreground leading-7">
                We focus on clean design, privacy-friendly usage, and tools that work immediately without extra setup.
              </p>
            </div>
          </section>

          <section className="bg-card border border-border rounded-3xl p-8">
            <h2 className="text-2xl font-semibold mb-4">About the author</h2>
            <p className="text-muted-foreground leading-7">
              Zohaib Hassan is a software engineer specializing in Angular, React, Next.js, and modern web performance. He builds and maintains the tools on this site, applies the formulas behind each calculator by hand against known-good references, and tests every transformer (Base64, slug, cron, JSON, regex) against a fixture suite before release.
            </p>
            <p className="mt-4 text-muted-foreground leading-7">
              Zohaib is reachable by email at <a href={`mailto:${AUTHOR_EMAIL}`} className="text-primary hover:underline">{AUTHOR_EMAIL}</a> and maintains public profiles on GitHub and LinkedIn, linked at the bottom of this page.
            </p>
          </section>

          <section className="bg-card border border-border rounded-3xl p-8">
            <h2 className="text-2xl font-semibold mb-4">Editorial & calculation verification standards</h2>
            <p className="text-muted-foreground leading-7">
              Every calculation and conversion on this site is verified against an authoritative source before publication:
            </p>
            <ul className="mt-4 space-y-3 text-muted-foreground">
              <li>• <strong>BMI</strong> — ratios are cross-checked against the WHO BMI classification table (underweight, normal, overweight, obese thresholds).</li>
              <li>• <strong>Pixels to Inches</strong> — conversions use a fixed DPI scale (inches = pixels ÷ DPI) and are spot-checked against 72/96/150/300 DPI reference values.</li>
              <li>• <strong>Cron</strong> — generated expressions are validated and their next run times are computed against documented Unix and Quartz field rules.</li>
              <li>• <strong>Loan/Mortgage</strong> — amortization outputs are compared against standard payment formulas and sample calculators.</li>
              <li>• <strong>Base64/URL/Hash</strong> — encoder-decoder round-trips are verified in automated tests so encode then decode always returns the original.</li>
            </ul>
            <p className="mt-4 text-muted-foreground leading-7">
              Where a tool is an estimate (for example financial calculators), the output is clearly labeled and we advise reviewing results with a professional for binding decisions.
            </p>
          </section>

          <section className="bg-card border border-border rounded-3xl p-8">
            <h2 className="text-2xl font-semibold mb-4">Privacy commitment</h2>
            <p className="text-muted-foreground leading-7">
              Our privacy model is simple: <strong>the tools run 100% client-side in your browser.</strong> Your JSON, images, passwords, hashes, text, and calculations are processed locally and never uploaded to any server. Only the QR Code Generator uses a third-party rendering API (and you should avoid encoding sensitive data there), and standard analytics and advertising cookies are used as described on our{' '}
              <a href="/privacy" className="text-primary hover:underline">privacy policy</a> page.
            </p>
          </section>

          <section className="bg-card border border-border rounded-3xl p-8">
            <h2 className="text-2xl font-semibold mb-4">Our mission</h2>
            <p className="text-muted-foreground leading-7">
              We want to provide a dependable online toolbox for anyone who wants to solve problems quickly.
              This website is about giving you the right tool at the right time, with a focus on accessibility,
              usefulness, and speed.
            </p>
            <p className="mt-4 text-muted-foreground leading-7">
              If you have ideas for new tools or improvements, feel free to reach out via the Contact page.
            </p>
          </section>

          <section className="bg-card border border-border rounded-3xl p-8">
            <h2 className="text-2xl font-semibold mb-4">PWA-ready experience</h2>
            <p className="text-muted-foreground leading-7">
              This application is a Progressive Web App (PWA), which means it can be installed on your device,
              launch like a native app, and keep working even when your connection is slow or offline.
            </p>
            <ul className="mt-4 space-y-3 text-muted-foreground">
              <li>• Install the app from your browser to get fast access from your home screen.</li>
              <li>• Offline support for previously visited tools and pages.</li>
              <li>• Better performance thanks to cached assets and quicker loading.</li>
              <li>• Native-like behavior on mobile and desktop with an app-style experience.</li>
            </ul>
          </section>
        </div>
      </main>
      <Script
        id="about-person-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: AUTHOR_NAME,
            url: `${SITE_URL}/about`,
            email: AUTHOR_EMAIL,
            jobTitle: 'Software Engineer',
            sameAs: [
              'https://github.com/zohaibhassan',
              'https://www.linkedin.com/in/zohaib-hassan',
            ],
          }),
        }}
      />
      <Script
        id="about-org-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: SITE_NAME,
            url: SITE_URL,
            logo: `${SITE_URL}/icon.svg`,
            sameAs: [
              'https://github.com/zohaibhassan',
              'https://www.linkedin.com/in/zohaib-hassan',
            ],
            founder: {
              '@type': 'Person',
              name: AUTHOR_NAME,
            },
          }),
        }}
      />
      <Footer />
    </div>
  )
}
