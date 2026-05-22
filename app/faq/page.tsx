import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'FAQ - Free Online Tools',
    description: 'Frequently asked questions about Free Online Tools, privacy, usage, and tool access.',
}

export default function FAQPage() {
    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Header />
            <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="space-y-10">
                    <section className="bg-card border border-border rounded-3xl p-10 shadow-sm">
                        <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
                        <p className="text-lg text-muted-foreground">
                            Answers to the most common questions about using Free Online Tools, our privacy practices, and how the site works.
                        </p>
                    </section>

                    <section className="grid gap-6">
                        <div className="bg-card border border-border rounded-3xl p-8">
                            <h2 className="text-2xl font-semibold mb-3">Is this website really free?</h2>
                            <p className="text-muted-foreground leading-7">
                                Yes. All tools on Free Online Tools are available to use for free without any required signup or subscription. We support the service through advertising and keep the experience lightweight and accessible.
                            </p>
                        </div>
                        <div className="bg-card border border-border rounded-3xl p-8">
                            <h2 className="text-2xl font-semibold mb-3">Do you store my data?</h2>
                            <p className="text-muted-foreground leading-7">
                                Most tools process your input directly in your browser and do not store it on our servers. If a tool requires network access for a specific feature, it will be indicated in its description.
                            </p>
                        </div>
                        <div className="bg-card border border-border rounded-3xl p-8">
                            <h2 className="text-2xl font-semibold mb-3">Can I use the results commercially?</h2>
                            <p className="text-muted-foreground leading-7">
                                Yes. You may use the output from these tools in your projects, documents, or creative work. Please review the Terms of Service for any legal disclaimers and usage limitations.
                            </p>
                        </div>
                        <div className="bg-card border border-border rounded-3xl p-8">
                            <h2 className="text-2xl font-semibold mb-3">Are there any downloads or software installs required?</h2>
                            <p className="text-muted-foreground leading-7">
                                No downloads are required. All tools work directly in your browser, so you can use them on desktop, tablet, or mobile without installing additional software.
                            </p>
                        </div>
                        <div className="bg-card border border-border rounded-3xl p-8">
                            <h2 className="text-2xl font-semibold mb-3">How does advertising affect my privacy?</h2>
                            <p className="text-muted-foreground leading-7">
                                We use Google AdSense to display ads. AdSense may use cookies and anonymous identifiers to serve relevant ads, but we do not share your personal data beyond normal ad serving processes. See the Privacy Policy for more details.
                            </p>
                        </div>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    )
}
