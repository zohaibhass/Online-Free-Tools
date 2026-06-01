import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About - Free Online Tools',
  description: 'Learn more about Free Online Tools and our mission to provide fast, browser-based utilities for developers and creators.',
  authors: [{ name: 'Zohaib' }],
  creator: 'Zohaib',
  publisher: 'Zohaib',
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
              Hi, I'm Zohaib, a web developer from Pakistan. I built OnlineFreeTools to help developers, students, and creators get everyday tasks done faster — without installing software or creating accounts. Every tool is hand-picked and tested.
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
      <Footer />
    </div>
  )
}
