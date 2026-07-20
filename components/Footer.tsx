import Link from 'next/link'
import { Logo } from '@/components/Logo'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border/70 bg-card/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.8fr_1fr_1fr_1fr]">
          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <Logo size={38} hideText />
              <div>
                <p className="font-semibold text-lg text-foreground">Free Tools</p>
                <p className="text-sm uppercase tracking-[0.32em] text-muted-foreground">Online toolkit</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground max-w-sm">
              A premium collection of browser-first utilities for developers, creators, and teams who want fast, private workflows without signup.
            </p>
            <p className="text-xs text-muted-foreground">
              Built by Zohaib Hassan — trusted web tools designed for speed, precision, and privacy.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-[0.3em] text-muted-foreground">Explore</h3>
            <nav aria-label="Explore">
              <ul className="space-y-3 text-sm text-foreground/80">
                <li><Link href="/tools" className="transition hover:text-foreground hover:underline">All Tools</Link></li>
                <li><Link href="/blog" className="transition hover:text-foreground hover:underline">Blog</Link></li>
                <li><Link href="/category/developer" className="transition hover:text-foreground hover:underline">Developer Tools</Link></li>
                <li><Link href="/category/document" className="transition hover:text-foreground hover:underline">Document Tools</Link></li>
                <li><Link href="/category/calculator" className="transition hover:text-foreground hover:underline">Calculators</Link></li>
              </ul>
            </nav>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-[0.3em] text-muted-foreground">Resources</h3>
            <nav aria-label="Resources">
              <ul className="space-y-3 text-sm text-foreground/80">
                <li><Link href="/privacy" className="transition hover:text-foreground hover:underline">Privacy Policy</Link></li>
                <li><Link href="/terms" className="transition hover:text-foreground hover:underline">Terms of Service</Link></li>
                <li><Link href="/disclaimer" className="transition hover:text-foreground hover:underline">Disclaimer</Link></li>
                <li><Link href="/faq" className="transition hover:text-foreground hover:underline">FAQ</Link></li>
                <li><Link href="/contact" className="transition hover:text-foreground hover:underline">Contact</Link></li>
              </ul>
            </nav>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-[0.3em] text-muted-foreground">Company</h3>
            <nav aria-label="Company">
              <ul className="space-y-3 text-sm text-foreground/80">
                <li><Link href="/about" className="transition hover:text-foreground hover:underline">About</Link></li>
                <li><Link href="/sitemap.xml" className="transition hover:text-foreground hover:underline">Sitemap</Link></li>
                <li><Link href="/contact" className="transition hover:text-foreground hover:underline">Request a tool</Link></li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="mt-12 border-t border-border/60 pt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-sm text-muted-foreground">
          <p>&copy; {year} Free Online Tools. All rights reserved.</p>
          <p>
            Crafted for developers, students, and teams who value private browser-first utilities.
          </p>
        </div>
      </div>
    </footer>
  )
}
