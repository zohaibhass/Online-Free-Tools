export const dynamic = 'force-dynamic'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Script from 'next/script'
import { SITE_URL, OG_IMAGE } from '@/lib/config'
import { getBlogPostBySlug, getRelatedPosts } from '@/lib/blog-posts'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import AuthorCard from '@/components/AuthorCard'
import { Card } from '@/components/ui/card'
import { ArrowLeft, ArrowRight } from 'lucide-react'

function extractFaqItems(html: string) {
    const faqSectionMatch = html.match(/<h2>Frequently Asked Questions<\/h2>([\s\S]*?)(?:<h2>|$)/i)
    if (!faqSectionMatch) return []

    const sectionHtml = faqSectionMatch[1]
    const parts = sectionHtml.split(/<h3>(.*?)<\/h3>/i).slice(1)
    const faqItems: { question: string; answer: string }[] = []

    for (let index = 0; index < parts.length; index += 2) {
        const question = parts[index]?.trim()
        const answerHtml = parts[index + 1] || ''
        const answer = answerHtml.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()

        if (question && answer) {
            faqItems.push({ question, answer })
        }
    }

    return faqItems
}

function contentIncludesEmbeddedAuthor(html: string) {
    return /About the Author/i.test(html)
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params
    const post = getBlogPostBySlug(slug)

    if (!post) {
        return {
            title: 'Blog article not found',
            description: 'The requested blog article could not be found on Free Online Tools.',
            alternates: {
                canonical: `${SITE_URL}/blog`,
            },
        }
    }

    const url = `${SITE_URL}/blog/${slug}`

    return {
        title: post.title,
        description: post.description,
        keywords: post.keywords,
        openGraph: {
            title: post.title,
            description: post.description,
            url,
            type: 'article',
            images: [{
                url: OG_IMAGE,
                width: 1200,
                height: 630,
            }],
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.description,
            images: [OG_IMAGE],
        },
        alternates: {
            canonical: url,
        },
    }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const post = getBlogPostBySlug(slug)
    if (!post) {
        notFound()
    }

    const relatedPosts = getRelatedPosts(slug, 3)
    const extractedFaq = extractFaqItems(post.content)
    const originalFaqExists = (post.faq && post.faq.length > 0) || extractedFaq.length > 0
    const faqItems = post.faq ?? extractedFaq
    const faqToRender = faqItems.length > 0 ? faqItems : [
        {
            question: 'Where can I try the examples from this article?',
            answer: 'Open the related tools listed in the sidebar to apply this article\'s ideas immediately.'
        }
    ]

    const hasIntro = /<h2>Introduction<\/h2>/i.test(post.content)
    const firstParagraphMatch = post.content.match(/<p>([\s\S]*?)<\/p>/i)
    const firstParagraphHtml = firstParagraphMatch ? firstParagraphMatch[1] : ''

    // remove any embedded 'About the Author' blocks from the HTML content
    const sanitizedContent = post.content.replace(/<div[^>]*>\s*<h3>About the Author[\s\S]*?<\/div>/gi, '')

    const showAuthorCard = true

    return (
        <div className="min-h-screen flex flex-col bg-background text-foreground">
            <Header />

            <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="mb-8">
                    <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-foreground transition-colors underline underline-offset-4">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Blog
                    </Link>
                </div>

                {originalFaqExists && (
                    <Script
                        id="blog-faq-schema"
                        type="application/ld+json"
                        strategy="beforeInteractive"
                        dangerouslySetInnerHTML={{
                            __html: JSON.stringify({
                                "@context": "https://schema.org",
                                "@type": "FAQPage",
                                "mainEntity": faqItems.map((item) => ({
                                    "@type": "Question",
                                    "name": item.question,
                                    "acceptedAnswer": {
                                        "@type": "Answer",
                                        "text": item.answer,
                                    },
                                })),
                            }),
                        }}
                    />
                )}

                <article className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr]">
                    <div className="space-y-10">
                        <section className="rounded-3xl border border-border bg-card p-8 shadow-sm">
                            <div className="space-y-6">
                                <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.3em] text-primary font-semibold">
                                    <span>{post.category}</span>
                                    <span>{post.readTime}</span>
                                </div>
                                <div className="space-y-4">
                                    <h1 className="text-4xl font-bold tracking-tight text-foreground">{post.title}</h1>
                                    <p className="text-lg leading-8 text-muted-foreground">{post.description}</p>
                                </div>
                                <div className="flex flex-wrap gap-4 items-center text-sm text-muted-foreground">
                                    <span>By <strong>Zohaib Hassan</strong></span>
                                    <span className="text-muted-foreground">{post.date}</span>
                                    <span className="ml-auto inline-flex items-center gap-2">
                                        <a href="https://github.com/zohaibhass" target="_blank" rel="noopener noreferrer" aria-label="Zohaib on GitHub" className="inline-flex items-center justify-center rounded-full border border-border bg-card p-2 hover:bg-primary/10">
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 .5C5.73.5.75 5.48.75 11.75c0 4.95 3.21 9.14 7.67 10.62.56.1.77-.24.77-.54 0-.27-.01-1-.02-1.95-3.12.68-3.78-1.5-3.78-1.5-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.16 1.72 1.16 1 .17 1.54-.75 1.54-.75.95-1.63 2.5-1.16 3.12-.89.1-.7.39-1.16.71-1.43-2.49-.28-5.11-1.25-5.11-5.56 0-1.23.44-2.24 1.16-3.03-.12-.29-.5-1.46.11-3.04 0 0 .95-.3 3.12 1.16a10.8 10.8 0 0 1 2.84-.38c.96 0 1.93.13 2.84.38 2.16-1.46 3.11-1.16 3.11-1.16.62 1.58.24 2.75.12 3.04.72.79 1.16 1.8 1.16 3.03 0 4.32-2.62 5.27-5.12 5.55.4.34.76 1.02.76 2.06 0 1.49-.01 2.69-.01 3.06 0 .3.2.65.78.54 4.46-1.48 7.66-5.67 7.66-10.62C23.25 5.48 18.27.5 12 .5z" fill="currentColor" /></svg>
                                        </a>
                                        <a href="https://www.linkedin.com/in/zohaib-hassan-811310252/" target="_blank" rel="noopener noreferrer" aria-label="Zohaib on LinkedIn" className="inline-flex items-center justify-center rounded-full border border-border bg-card p-2 hover:bg-primary/10">
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8.5h4V24h-4V8.5zM8.5 8.5h3.84v2.07h.05c.54-1.02 1.86-2.07 3.83-2.07C20.8 8.5 22 10.22 22 13.7V24h-4v-9.48c0-2.26-.04-5.17-3.15-5.17-3.15 0-3.63 2.46-3.63 5V24H8.5V8.5z" fill="currentColor" /></svg>
                                        </a>
                                    </span>
                                </div>
                            </div>
                        </section>

                        <section className="rounded-3xl border border-border bg-card p-8 shadow-sm">
                            {!hasIntro && firstParagraphHtml ? (
                                <div className="mb-6">
                                    <h2 className="text-2xl font-semibold mb-3">Introduction</h2>
                                    <div className="prose prose-slate prose-lg dark:prose-invert max-w-none leading-8" dangerouslySetInnerHTML={{ __html: `<p>${firstParagraphHtml}</p>` }} />
                                </div>
                            ) : null}

                            <div className="prose prose-slate prose-lg dark:prose-invert max-w-none leading-8" dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
                        </section>

                        <section className="rounded-3xl border border-border bg-card p-8 shadow-sm">
                            <h2 className="text-2xl font-semibold mb-4">Frequently asked questions</h2>
                            <div className="space-y-4 text-muted-foreground">
                                {faqToRender.map((item, index) => (
                                    <div key={index}>
                                        <h3 className="text-lg font-semibold">{item.question}</h3>
                                        <p className="mt-2 leading-7">{item.answer}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="rounded-3xl border border-border bg-card p-8 shadow-sm">
                            <AuthorCard name="Zohaib Hassan" bio={`Zohaib Hassan writes practical developer and productivity guides for Free Online Tools. Each article is built to help you learn faster and apply new concepts immediately with tools, examples, and clear explanations.`} date={post.date} />
                        </section>
                    </div>

                    <aside className="space-y-6">
                        {post.relatedTools.length > 0 && (
                            <section className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                                <h2 className="text-2xl font-semibold mb-4">Try related tools</h2>
                                <div className="space-y-4">
                                    {post.relatedTools.map((tool) => (
                                        <Card key={tool.url} className="rounded-3xl border border-border p-5 transition hover:border-primary/60 hover:shadow-lg">
                                            <div className="space-y-3">
                                                <h3 className="text-lg font-semibold text-foreground">{tool.name}</h3>
                                                <p className="text-sm text-muted-foreground">Open the tool and apply this article&apos;s ideas immediately.</p>
                                                <Link href={tool.url} className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-foreground transition-colors underline underline-offset-4">
                                                    Open tool
                                                    <ArrowRight className="w-4 h-4" />
                                                </Link>
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            </section>
                        )}

                        {relatedPosts.length > 0 && (
                            <section className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                                <p className="text-sm uppercase tracking-[0.3em] text-primary font-semibold mb-4">Related posts</p>
                                <div className="space-y-4">
                                    {relatedPosts.map((related) => (
                                        <Card key={related.slug} className="rounded-3xl border border-border p-5 transition hover:border-primary/60 hover:shadow-lg">
                                            <div className="space-y-3">
                                                <div className="text-xs uppercase tracking-[0.3em] text-primary font-semibold">{related.category}</div>
                                                <h3 className="text-lg font-semibold text-foreground">{related.title}</h3>
                                                <p className="text-sm text-muted-foreground line-clamp-2">{related.description}</p>
                                                <Link href={`/blog/${related.slug}`} className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-foreground transition-colors underline underline-offset-4">
                                                    Read article
                                                    <ArrowRight className="w-4 h-4" />
                                                </Link>
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            </section>
                        )}
                    </aside>
                </article>
            </main>

            <Footer />
        </div>
    )
}