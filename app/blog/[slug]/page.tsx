import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { SITE_URL, OG_IMAGE } from '@/lib/config'
import { blogPosts, getBlogPostBySlug, getRelatedPosts } from '@/lib/blog-posts'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Card } from '@/components/ui/card'
import { ArrowLeft, ArrowRight } from 'lucide-react'

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

export function generateStaticParams() {
    return blogPosts.map((post) => ({ slug: post.slug }))
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const post = getBlogPostBySlug(slug)
    if (!post) {
        notFound()
    }

    const relatedPosts = getRelatedPosts(slug, 3)

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Header />

            <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="mb-10">
                    <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-foreground transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Blog
                    </Link>
                </div>

                <article className="bg-card border border-border rounded-3xl p-10 shadow-sm">
                    <div className="mb-10">
                        <p className="text-sm uppercase tracking-[0.3em] text-primary font-semibold">{post.category}</p>
                        <h1 className="text-4xl font-bold tracking-tight mt-2">{post.title}</h1>
                        <p className="text-lg text-muted-foreground mt-4">{post.description}</p>
                        <div className="mt-6 flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <span>{post.date}</span>
                            <span>{post.readTime}</span>
                        </div>
                    </div>

                    <div className="prose prose-slate dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
                </article>

                {post.relatedTools.length > 0 && (
                    <section className="mt-16">
                        <h2 className="text-2xl font-semibold mb-4">Try related tools</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {post.relatedTools.map((tool) => (
                                <Card key={tool.url} className="border border-border p-6">
                                    <div>
                                        <h3 className="text-lg font-semibold mb-2">{tool.name}</h3>
                                        <p className="text-sm text-muted-foreground mb-4">Open the tool and apply this article&apos;s ideas immediately.</p>
                                        <Link href={tool.url} className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-foreground transition-colors">
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
                    <section className="mt-16">
                        <div className="flex items-center justify-between gap-4 mb-6">
                            <div>
                                <p className="text-sm uppercase tracking-[0.3em] text-primary font-semibold">Related posts</p>
                                <h2 className="text-2xl font-semibold">More articles you may like</h2>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {relatedPosts.map((related) => (
                                <Card key={related.slug} className="group h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 p-6">
                                    <div className="flex flex-col h-full">
                                        <div className="mb-3 text-xs uppercase tracking-[0.3em] text-primary font-semibold">{related.category}</div>
                                        <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">{related.title}</h3>
                                        <p className="text-sm text-muted-foreground flex-1">{related.description}</p>
                                        <Link href={`/blog/${related.slug}`} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-foreground transition-colors">
                                            Read article
                                            <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </section>
                )}
            </main>

            <Footer />
        </div>
    )
}
