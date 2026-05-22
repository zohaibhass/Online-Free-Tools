import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy - Free Online Tools',
  description: 'Privacy policy for Free Online Tools',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

        <div className="prose prose-invert max-w-none space-y-6 text-foreground">
          <section>
            <h2 className="text-2xl font-bold mb-4">1. Information We Collect</h2>
            <p className="text-muted-foreground">
              Most of the tools on Free Online Tools process data directly in your browser. We do not store the content you enter into each tool unless a specific feature explicitly requires it.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">2. How We Use Information</h2>
            <p className="text-muted-foreground">
              Input and processing happen locally whenever possible. The site may collect anonymous usage information to help improve tool performance and user experience.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">3. Cookies</h2>
            <p className="text-muted-foreground">
              We use cookies to remember preferences and support site features. You can disable cookies in your browser if you prefer, but some functionality may be reduced.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">4. Third-Party Services</h2>
            <p className="text-muted-foreground">
              We use Google AdSense for advertising. Google may use cookies and anonymous identifiers to serve relevant ads. We do not share your personal login credentials or private data with AdSense.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">5. Data Security</h2>
            <p className="text-muted-foreground">
              We follow standard security practices to protect the website and its infrastructure. However, no internet service is completely risk-free, so please avoid sharing highly sensitive personal data.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">6. Contact Us</h2>
            <p className="text-muted-foreground">
              If you have questions about our privacy practices, contact us at <a href="mailto:zohaibdev121@gmail.com" className="text-primary hover:underline">zohaibdev121@gmail.com</a>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">7. Policy Updates</h2>
            <p className="text-muted-foreground">
              We may update this policy periodically. We encourage users to review it regularly for any changes.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
