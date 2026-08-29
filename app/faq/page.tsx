import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import Script from 'next/script'
import Link from 'next/link'
import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/config'
import { generateFaqSchema } from '@/lib/seo'

export const metadata: Metadata = {
    title: { absolute: 'Frequently Asked Questions | Free Online Tools' },
    description: 'Frequently asked questions about Free Online Tools, privacy practices, data handling, and how individual tools work.',
    alternates: {
        canonical: `${SITE_URL}/faq`,
    },
}

const faqCategories = [
    {
        title: 'General',
        questions: [
            {
                q: 'Is this website really free?',
                a: 'Yes. All 40 tools on Free Online Tools are available to use for free without any required signup or subscription. We support the service through advertising and keep the experience lightweight and accessible.',
            },
            {
                q: 'Are there any downloads or software installs required?',
                a: 'No downloads are required. All tools work directly in your browser, so you can use them on desktop, tablet, or mobile without installing additional software. Just open a tool page and start working.',
            },
            {
                q: 'Can I use the results commercially?',
                a: 'Yes. You may use the output from these tools — formatted JSON, compressed images, generated UUIDs, QR codes, hashed values, formatted SQL, and any other output — in your projects, documents, or creative work. Please review the Terms of Service for any legal disclaimers.',
            },
            {
                q: 'How do I find the right tool quickly?',
                a: 'Use the search bar on the homepage or the /tools page to type tool names, keywords, or formats. You can also browse by category: Developer Tools (13 tools), Document & Media (7 tools), Calculators (11 tools), and Utilities (9 tools).',
            },
            {
                q: 'Who built this site?',
                a: 'Free Online Tools was built and is maintained by Zohaib Hassan, a software engineer specializing in Angular, React, Next.js, and modern web performance. You can reach out via the contact page or email onlinefreetools@zohomail.com.',
            },
        ],
    },
    {
        title: 'Privacy & Data',
        questions: [
            {
                q: 'Do you store my data?',
                a: 'Most tools process your input directly in your browser and do not store it on our servers. Your JSON, images, passwords, hashes, calculations, and other inputs never leave your device. The one exception is the QR Code Generator, which sends your text or URL to a third-party API (api.qrserver.com) to render the image.',
            },
            {
                q: 'Is my data safe when I use the JSON Formatter or Hash Generator?',
                a: 'Yes. Both the JSON Formatter and Hash Generator process data entirely in your browser using JavaScript. No data is transmitted to any server. You can safely work with sensitive configuration data, API responses, or any other content.',
            },
            {
                q: 'Does the QR Code Generator send my data to a server?',
                a: 'Yes. The QR Code Generator is the only tool on this site that uses an external service. When you enter text or a URL, it is sent to api.qrserver.com to render the QR code image. We do not control what that service does with the data it receives. Do not encode sensitive information (passwords, private keys) as QR codes using this tool.',
            },
            {
                q: 'How does advertising affect my privacy?',
                a: 'We use Google AdSense to display ads. AdSense may use cookies and anonymous identifiers to serve relevant ads, but we do not share your personal data beyond normal ad serving processes. You can manage ad personalization through Google\'s ad settings. See the Privacy Policy for more details.',
            },
            {
                q: 'Where is my todo list or dice roll history stored?',
                a: 'Your Todo List tasks and Dice Roller history are stored in your browser\'s local storage. This data stays on your device and is never sent to any server. However, it will be lost if you clear your browser data or switch to a different device.',
            },
        ],
    },
    {
        title: 'Tool-Specific Questions',
        questions: [
            {
                q: 'Does the Image Compressor upload my photos to a server?',
                a: 'No. The Image Compressor uses the browser\'s Canvas API to process images entirely on your device. It reads the file using FileReader, draws it on an offscreen canvas, and exports the compressed version using canvas.toDataURL(). Your images never leave your computer.',
            },
            {
                q: 'Does the Text to Speech tool send my text to a server?',
                a: 'No. The Text to Speech tool uses the browser\'s built-in Web Speech API (speechSynthesis) to generate audio from your text. All processing happens locally. If you use the recording feature, it uses the MediaRecorder API to capture the audio output in your browser.',
            },
            {
                q: 'Can I use the Password Generator for sensitive accounts?',
                a: 'Yes, the Password Generator creates cryptographically random passwords using your browser\'s random number generator. The passwords are generated locally and never sent to any server. For best results, use at least 16 characters with all character types enabled, and store the password in a reputable password manager.',
            },
            {
                q: 'How accurate are the Loan and Mortgage Calculators?',
                a: 'The calculators produce estimates based on the loan amount, interest rate, and term you enter. They calculate monthly payments, total interest, and amortization schedules using standard amortization formulas. Actual loan terms from lenders may differ due to fees, insurance, taxes, and individual credit factors. Use these as educational estimates, not binding financial commitments.',
            },
            {
                q: 'Does the Dice Roller produce truly random results?',
                a: 'The Dice Roller uses the browser\'s random number generator to produce results. It simulates 1 to 5 polyhedral dice (d4 through d100) with 3D animation. While the animation is purely visual, the underlying result is randomly generated by your browser.',
            },
            {
                q: 'What hash algorithms does the Hash Generator support?',
                a: 'The Hash Generator supports MD5 (32-character output, deprecated for security), SHA-1 (40 characters, deprecated for security), SHA-256 (64 characters, industry standard), and SHA-512 (128 characters, highest security). For new projects, use SHA-256 or higher. MD5 and SHA-1 should only be used for non-security purposes like file checksums.',
            },
            {
                q: 'Does the Markdown Editor save my work?',
                a: 'The Markdown Editor provides a split-pane interface where you write Markdown on the left and see the rendered preview on the right. Your content is processed locally in the browser. For persistent storage, copy the output to your own notes or document system.',
            },
            {
                q: 'Can the Cron Expression Generator handle Quartz format?',
                a: 'Yes. The Cron Expression Generator supports both standard Unix cron (5-field format: minute, hour, day-of-month, month, day-of-week) and Quartz cron (6-7 field format with seconds and year). It also shows the next 5 run times so you can verify your schedule is correct.',
            },
        ],
    },
    {
        title: 'Account & Access',
        questions: [
            {
                q: 'Do I need to create an account?',
                a: 'No. All tools on Free Online Tools work without any account, login, or personal information. Simply open a tool and start using it immediately.',
            },
            {
                q: 'Does the site work on mobile devices?',
                a: 'Yes. All tools are responsive and work on mobile browsers. The calculators, text tools, and formatters adapt to smaller screens. Some tools with larger interfaces, like the Markdown Editor, work best on tablets or desktop screens but are still functional on phones.',
            },
            {
                q: 'What browsers are supported?',
                a: 'The tools work in all modern browsers including Chrome, Firefox, Safari, and Edge. Some tools use specific browser APIs (like the Web Speech API for Text to Speech or Canvas API for Image Compressor) that may not be available in very old browser versions. We recommend keeping your browser up to date for the best experience.',
            },
        ],
    },
]

export default function FAQPage() {
    const allQuestions = faqCategories.flatMap((category) =>
        category.questions.map((item) => ({ question: item.q, answer: item.a }))
    )

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Header />
            <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="space-y-10">
                    <section className="bg-card border border-border rounded-3xl p-10 shadow-sm">
                        <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
                        <p className="text-lg text-muted-foreground">
                            Answers to common questions about Free Online Tools — how the tools work, what happens to your data, and how to get the most from the site.
                        </p>
                    </section>

                    {faqCategories.map((category) => (
                        <section key={category.title}>
                            <h2 className="text-xl font-semibold mb-4 text-primary">{category.title}</h2>
                            <div className="grid gap-4">
                                {category.questions.map((item) => (
                                    <div key={item.q} className="bg-card border border-border rounded-3xl p-8">
                                        <h3 className="text-lg font-semibold mb-3">{item.q}</h3>
                                        <p className="text-muted-foreground leading-7">{item.a}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    ))}

                    <section className="bg-card border border-border rounded-3xl p-8 text-center">
                        <h2 className="text-2xl font-semibold mb-3">Still have questions?</h2>
                        <p className="text-muted-foreground mb-6">
                            If your question is not covered above, feel free to reach out.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
                        >
                            Contact Us
                        </Link>
                    </section>
                </div>
            </main>
            <Script
                id="faq-page-schema"
                type="application/ld+json"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(generateFaqSchema(allQuestions)),
                }}
            />
            <Footer />
        </div>
    )
}
