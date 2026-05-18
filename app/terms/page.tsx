import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service - Free Online Tools',
  description: 'Terms of Service for Free Online Tools',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>

        <div className="prose prose-invert max-w-none space-y-6 text-foreground">
          <section>
            <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground">
              By using Free Online Tools, you agree to comply with these terms and conditions. If you do not agree with any part of these terms, please do not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">2. Use License</h2>
            <p className="text-muted-foreground">
              Permission is granted to temporarily download one copy of the materials (information or software) from Free Online Tools for personal, non-commercial transitory viewing only.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">3. Disclaimer</h2>
            <p className="text-muted-foreground">
              The materials on Free Online Tools are provided on an &apos;as is&apos; basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">4. Limitations</h2>
            <p className="text-muted-foreground">
              In no event shall Free Online Tools or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit) arising out of the use or inability to use the materials on Free Online Tools.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">5. Accuracy of Materials</h2>
            <p className="text-muted-foreground">
              The materials appearing on Free Online Tools could include technical, typographical, or photographic errors. We do not warrant that any of the materials on Free Online Tools are accurate, complete, or current.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">6. Modifications</h2>
            <p className="text-muted-foreground">
              We may revise these terms of service for Free Online Tools at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">7. Governing Law</h2>
            <p className="text-muted-foreground">
              These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction in which the service is provided.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">8. Contact Information</h2>
            <p className="text-muted-foreground">
              If you have any questions about these Terms of Service, please contact us at support@tools.example.com
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
