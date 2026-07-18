import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for Free Online Tools. Learn how we collect, use, and protect your data, including cookies and GDPR compliance.',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground mb-8 italic">Last Updated: June 2026</p>

        <div className="prose prose-invert max-w-none space-y-6 text-foreground">
          <section>
            <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
            <p className="text-muted-foreground">
              Welcome to Online Free Tools ("we", "us", "our", or "Site"). We are committed to protecting your privacy and ensuring you have a positive experience on our website. This Privacy Policy explains what information we collect, how we use it, how we protect it, and your rights regarding your data. Please read this policy carefully. By accessing and using Online Free Tools, you acknowledge that you have read and understood this Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">2. Information We Collect</h2>
            <p className="text-muted-foreground">
              <strong>Personal Information:</strong> We collect minimal personal information. When you contact us via the contact form, we collect your name, email address, and message. This information is used solely to respond to your inquiry.
            </p>
            <p className="text-muted-foreground">
              <strong>Tool Data Processing:</strong> Most tools process data directly in your browser without storing it on our servers. For example, when you use the JSON Formatter, image compression, or code minifier tools, all processing happens locally on your device. We do not collect or store the content you enter into these tools unless you explicitly save it to your account (if you create one).
            </p>
            <p className="text-muted-foreground">
              <strong>Usage Information:</strong> We automatically collect certain information about how you use the Site, including IP address, browser type, operating system, referring URL, and pages visited. This information helps us understand user behavior and improve our services.
            </p>
            <p className="text-muted-foreground">
              <strong>Cookies and Similar Technologies:</strong> We use cookies and similar tracking technologies to remember your preferences, track site usage, and serve personalized content. You can control cookies through your browser settings. Some tools may not function properly if cookies are disabled.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">3. How We Use Your Information</h2>
            <p className="text-muted-foreground">
              We use the information we collect for the following purposes:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>To respond to your inquiries and provide customer support</li>
              <li>To improve and optimize our website and tools</li>
              <li>To send you updates about new tools or features (only if you opt-in)</li>
              <li>To analyze website traffic and user engagement</li>
              <li>To detect and prevent fraud, abuse, and security incidents</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">4. Third-Party Services and Data Sharing</h2>
            <p className="text-muted-foreground">
              <strong>Google AdSense:</strong> We use Google AdSense to display advertisements on our website. Google may use cookies and web beacons to collect information about your visits to this and other websites to create personalized ads. Google's use of cookies is subject to <a href="https://policies.google.com/privacy" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Google's Privacy Policy</a>.
            </p>
            <p className="text-muted-foreground">
              <strong>Google Analytics:</strong> We use GA4 (Google Analytics 4) to track anonymous usage patterns and website performance. This helps us understand how our tools are used and make improvements. All data collected is anonymized and aggregated. See <a href="https://google.com/privacy" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">google.com/privacy</a> for more information.
            </p>
            <p className="text-muted-foreground">
              <strong>Data Sharing:</strong> We do not sell, rent, or share your personal information with third parties for marketing purposes. We only share information as necessary to provide our services and comply with legal obligations.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">5. Data Security</h2>
            <p className="text-muted-foreground">
              We implement appropriate technical and organizational security measures to protect your personal information from unauthorized access, alteration, disclosure, and destruction. Our website uses HTTPS encryption to protect data in transit. However, no security measure is 100% secure, and we cannot guarantee absolute security. You are responsible for maintaining the confidentiality of your credentials and for all activities that occur under your account.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">6. Your Data Rights (GDPR and Privacy Laws)</h2>
            <p className="text-muted-foreground">
              If you are a resident of the European Union or have rights under privacy laws like GDPR, you have the following rights:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li><strong>Right to Access:</strong> You can request a copy of the personal data we hold about you</li>
              <li><strong>Right to Rectification:</strong> You can request that we correct inaccurate information</li>
              <li><strong>Right to Erasure:</strong> You can request that we delete your personal data (right to be forgotten)</li>
              <li><strong>Right to Restrict Processing:</strong> You can request that we limit how we process your data</li>
              <li><strong>Right to Data Portability:</strong> You can request your data in a portable format</li>
              <li><strong>Right to Withdraw Consent:</strong> You can withdraw consent for cookies and tracking at any time</li>
              <li><strong>Right to Lodge a Complaint:</strong> You can file a complaint with your local data protection authority</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              To exercise any of these rights, contact us at <a href="mailto:onlinefreetools@zohomail.com" className="text-primary hover:underline">onlinefreetools@zohomail.com</a>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">7. Cookies and Tracking</h2>
            <p className="text-muted-foreground">
              <strong>Necessary Cookies:</strong> Required for the website to function (authentication, theme preferences, tool state).
            </p>
            <p className="text-muted-foreground">
              <strong>Analytical Cookies:</strong> Used by Google Analytics to understand user behavior.
            </p>
            <p className="text-muted-foreground">
              <strong>Advertising Cookies:</strong> Used by Google AdSense to serve personalized advertisements.
            </p>
            <p className="text-muted-foreground">
              You can manage your cookie preferences using our cookie consent banner (displayed on your first visit), or through your browser settings at any time. Your choice is remembered via local storage.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">8. Children's Privacy</h2>
            <p className="text-muted-foreground">
              <strong>Children:</strong> We do not collect personal data from users under 13 years of age. Our website is not intended for children under 13. If we become aware that a child under 13 has provided personal information, we will delete it promptly. If you believe we have collected information from a child under 13, please contact us immediately at <a href="mailto:onlinefreetools@zohomail.com" className="text-primary hover:underline">onlinefreetools@zohomail.com</a>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">9. Data Retention</h2>
            <p className="text-muted-foreground">
              We retain your personal information only for as long as necessary to fulfill the purposes for which it was collected or as required by law. Contact form submissions are retained for one year unless you request deletion. Analytics data is retained by Google according to their retention policies. You can request deletion of your data at any time.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">10. International Data Transfers</h2>
            <p className="text-muted-foreground">
              Our website is hosted on servers that may be located outside your country of residence. By using our website, you consent to the transfer of your information to countries outside your country of residence, which may have data protection laws different from your home country. We take appropriate safeguards to ensure your information remains protected.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">11. Links to Third-Party Websites</h2>
            <p className="text-muted-foreground">
              Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to review the privacy policies of any third-party websites before providing your information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">12. Contact Information</h2>
            <p className="text-muted-foreground">
              If you have questions about this Privacy Policy, wish to exercise your data rights, or have privacy concerns, please contact us at:
            </p>
            <div className="mt-4 p-4 bg-muted/50 rounded-lg border border-border">
              <p className="text-sm text-muted-foreground"><strong>Email:</strong> <a href="mailto:onlinefreetools@zohomail.com" className="text-primary hover:underline">onlinefreetools@zohomail.com</a></p>
              <p className="text-sm text-muted-foreground"><strong>Website:</strong> <a href="https://onlinefreetools.online" className="text-primary hover:underline">https://onlinefreetools.online</a></p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">13. Policy Updates</h2>
            <p className="text-muted-foreground">
              We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. We will notify you of significant changes by posting the updated policy on this page and updating the "Last Updated" date below. Your continued use of the website after such changes indicates your acceptance of the updated Privacy Policy.
            </p>
            <p className="text-muted-foreground mt-4 text-sm">
              <strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
