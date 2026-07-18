import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { SITE_NAME, AUTHOR_NAME } from '@/lib/config'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Disclaimer',
  description: `Disclaimer, limitations of liability, and terms of use for tools and content on ${SITE_NAME}.`,
}

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-8">Disclaimer</h1>
        <p className="text-sm text-muted-foreground mb-8 italic">Last Updated: June 2026</p>

        <div className="space-y-6 text-muted-foreground leading-7">
          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">1. General Information</h2>
            <p>
              The tools, content, and services provided on {SITE_NAME} (the &quot;Website&quot;) are for general informational
              and educational purposes only. The Website is operated by {AUTHOR_NAME}. While we strive to keep the information
              accurate and up to date, we make no representations or warranties of any kind, express or implied, about the
              completeness, accuracy, reliability, suitability, or availability of the tools or information provided.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">2. No Professional Advice</h2>
            <p>
              The tools and content on this Website are not a substitute for professional advice. You should not rely solely
              on the information or results provided by our tools for making financial, legal, medical, or other professional
              decisions. Always consult a qualified professional for advice tailored to your specific situation.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">3. Tool Accuracy and Limitations</h2>
            <p>
              While we test our tools thoroughly, no software is guaranteed to be error-free. Tool outputs may vary depending
              on input data, browser configuration, and other factors. We recommend verifying important results through
              alternative methods. We are not liable for any loss or damage arising from the use or inability to use any tool
              on this Website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">4. External Links</h2>
            <p>
              This Website may contain links to external websites that are not provided or maintained by us. We do not
              guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites.
              The inclusion of any link does not imply endorsement by us.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">5. Limitation of Liability</h2>
            <p>
              In no event shall {SITE_NAME}, its operators, or affiliates be liable for any direct, indirect, incidental,
              consequential, or punitive damages arising out of your access to, use of, or inability to use this Website or
              any tools provided herein. This includes, but is not limited to, damages for loss of profits, data, or other
              intangible losses.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">6. Changes to This Disclaimer</h2>
            <p>
              We reserve the right to update or change this Disclaimer at any time. Any changes will be posted on this page
              with an updated revision date. Your continued use of the Website after any changes constitutes acceptance of
              the new terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">7. Contact Us</h2>
            <p>
              If you have any questions about this Disclaimer, please contact us at{' '}
              <a href="mailto:onlinefreetools@zohomail.com" className="text-primary hover:underline">
                onlinefreetools@zohomail.com
              </a>.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
