import Link from 'next/link'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="font-semibold mb-4">About</h3>
            <p className="text-sm text-muted-foreground">
              Free Online Tools offers a curated collection of 30+ browser-based utilities plus a blog with practical guides, quick tips, and tool tutorials.
            </p>
          </div>

          {/* Tools */}
          <div>
            <h3 className="font-semibold mb-4">Tools</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/tools" className="hover:text-foreground transition-colors">
                  All Tools
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-foreground transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/category/developer" className="hover:text-foreground transition-colors">
                  Developer Tools
                </Link>
              </li>
              <li>
                <Link href="/category/document" className="hover:text-foreground transition-colors">
                  Document Tools
                </Link>
              </li>
              <li>
                <Link href="/category/calculator" className="hover:text-foreground transition-colors">
                  Calculators
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/privacy" className="hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-foreground transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Follow */}
          {/* <div>
            <h3 className="font-semibold mb-4">Follow</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Stay updated with new tools and features.
            </p>
            <div className="flex gap-2">
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Twitter
              </Link>
              <span className="text-muted-foreground">•</span>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                GitHub
              </Link>
            </div>
          </div> */}
        </div>

        {/* Bottom */}
        <div className="border-t border-border pt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>&copy; {year} Free Online Tools. All rights reserved.</p>
          <p className="mt-4 sm:mt-0"></p>
        </div>
      </div>
    </footer>
  )
}
