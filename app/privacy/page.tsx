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
              We collect minimal information. Most of our tools process data entirely in your browser, and we do not store any personal data on our servers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">2. How We Use Information</h2>
            <p className="text-muted-foreground">
              Any data you process through our tools is handled locally in your browser. We may collect anonymous usage statistics to improve our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">3. Cookies</h2>
            <p className="text-muted-foreground">
              We use cookies for authentication and to remember your preferences. You can disable cookies in your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">4. Third-Party Services</h2>
            <p className="text-muted-foreground">
              We use Google AdSense for advertising. Google may use cookies to serve personalized ads. Please refer to Google's privacy policy for more information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">5. Security</h2>
            <p className="text-muted-foreground">
              We take security seriously. However, no method of transmission over the Internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">6. Contact Us</h2>
            <p className="text-muted-foreground">
              If you have any questions about this privacy policy, please contact us at privacy@tools.example.com
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">7. Changes to This Policy</h2>
            <p className="text-muted-foreground">
              We may update this policy from time to time. We will notify users of any significant changes via email or through a prominent notice on our website.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
