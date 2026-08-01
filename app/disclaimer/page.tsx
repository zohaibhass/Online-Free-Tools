import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { SITE_NAME, AUTHOR_NAME, SITE_URL } from '@/lib/config'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: { absolute: 'Disclaimer | Free Online Tools' },
  description: `Disclaimer, limitations of liability, and terms of use for tools and content on ${SITE_NAME}.`,
  alternates: {
    canonical: `${SITE_URL}/disclaimer`,
  },
}

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-8">Disclaimer</h1>
        <p className="text-sm text-muted-foreground mb-8 italic">Last Updated: July 2026</p>

        <div className="space-y-6 text-muted-foreground leading-7">
          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">1. General Information</h2>
            <p>
              The tools, content, and services provided on {SITE_NAME} at onlinefreetools.online (the &quot;Website&quot;) are for general informational and educational purposes only. The Website offers a collection of browser-based utilities including developer tools (JSON Formatter, JWT Decoder, Regex Tester, SQL Formatter, Base64 Encoder, Hash Generator, Code Minifier, UUID Generator, Cron Expression Generator, and others), calculators (BMI Calculator, Loan Calculator, Mortgage Calculator, Percentage Calculator, Age Calculator, and others), document and media tools (Word Counter, Image Compressor, Markdown Editor, QR Code Generator, Text to Speech, and others), and general utilities (Password Generator, Dice Roller, Coin Flipper, Todo List, Timer &amp; Stopwatch, and others).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">2. No Professional Advice</h2>
            <p>
              The tools and content on this Website are not a substitute for professional advice. You should not rely solely on the information or results provided by our tools for making financial, legal, medical, or other professional decisions. Specifically:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li>The <strong>BMI Calculator</strong> provides general estimates and is not a medical diagnostic tool. Consult a healthcare professional for health assessments.</li>
              <li>The <strong>Loan Calculator</strong> and <strong>Mortgage Calculator</strong> produce estimates for educational purposes. Actual loan terms, interest rates, and payments depend on your lender, creditworthiness, and specific agreement terms.</li>
              <li>The <strong>Password Generator</strong> creates random passwords, but secure password management also requires using a reputable password manager and following security best practices.</li>
              <li>The <strong>Hash Generator</strong> produces standard hash digests suitable for checksums and data verification. For production password storage, use dedicated libraries like bcrypt or Argon2.</li>
            </ul>
            <p className="mt-2">
              Always consult a qualified professional for advice tailored to your specific situation.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">3. Tool Accuracy and Limitations</h2>
            <p>
              While we test our tools thoroughly, no software is guaranteed to be error-free. Tool outputs may vary depending on input data, browser configuration, and other factors. We recommend verifying important results through alternative methods. We are not liable for any loss or damage arising from the use or inability to use any tool on this Website.
            </p>
            <p className="mt-2">
              Most of our tools process data entirely within your browser — your inputs never leave your device. The one exception is our QR Code Generator, which sends the text or URL you enter to a third-party service (api.qrserver.com) to render the QR code image. All other tools, including the JSON Formatter, Image Compressor, Hash Generator, UUID Generator, and all calculators, are 100% client-side.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">4. External Links</h2>
            <p>
              This Website may contain links to external websites that are not provided or maintained by us. We do not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites. The inclusion of any link does not imply endorsement by us. Our blog posts may link to related tools on this site and reference external resources for educational context.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">5. Limitation of Liability</h2>
            <p>
              In no event shall {SITE_NAME}, its operator, or affiliates be liable for any direct, indirect, incidental, consequential, or punitive damages arising out of your access to, use of, or inability to use this Website or any tools provided herein. This includes, but is not limited to, damages for loss of profits, data, or other intangible losses.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">6. Changes to This Disclaimer</h2>
            <p>
              We reserve the right to update or change this Disclaimer at any time. Any changes will be posted on this page with an updated revision date. Your continued use of the Website after any changes constitutes acceptance of the new terms.
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
